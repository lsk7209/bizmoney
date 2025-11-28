import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { BlogPost, BlogPostFrontmatter } from '@/types/blog';

const postsDirectory = path.join(process.cwd(), 'content/blog');

// 관리자용: published 여부와 관계없이 포스트 가져오기
export function getPostBySlugForAdmin(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`);
    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      content,
      ...(data as BlogPostFrontmatter),
      published: data.published !== false,
      status: data.status || (data.published ? 'published' : 'draft'),
      index: data.index !== false,
      sitemap: data.sitemap !== false,
    } as BlogPost;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error reading blog post:', error);
    }
    return null;
  }
}

// 관리자용: published 여부와 관계없이 모든 포스트 가져오기
export function getAllPostsForAdmin(): BlogPost[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  try {
    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames
      .filter((fileName) => fileName.endsWith('.mdx'))
      .map((fileName) => {
        try {
          const slug = fileName.replace(/\.mdx$/, '');
          const fullPath = path.join(postsDirectory, fileName);
          const fileContents = fs.readFileSync(fullPath, 'utf8');
          const { data, content } = matter(fileContents);

          return {
            slug,
            content,
            ...(data as BlogPostFrontmatter),
            published: data.published !== false,
            status: data.status || (data.published ? 'published' : 'draft'),
            index: data.index !== false,
            sitemap: data.sitemap !== false,
          } as BlogPost;
        } catch (error) {
          if (process.env.NODE_ENV === 'development') {
            console.error(`Error reading post file ${fileName}:`, error);
          }
          return null;
        }
      })
      .filter((post): post is BlogPost => post !== null)
      .sort((a, b) => {
        if (a.date < b.date) {
          return 1;
        } else {
          return -1;
        }
      });

    return allPostsData;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error reading posts directory:', error);
    }
    return [];
  }
}

// MDX 파일 업데이트
export function updatePostFile(slug: string, frontmatter: BlogPostFrontmatter, content: string): void {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);
  
  if (!fs.existsSync(fullPath)) {
    throw new Error(`Post file not found: ${slug}`);
  }

  // frontmatter를 YAML 형식으로 변환
  const frontmatterYaml = matter.stringify(content, frontmatter, {
    delimiters: '---',
  });

  fs.writeFileSync(fullPath, frontmatterYaml, 'utf8');
}

// 퍼블리시 검증
export function validatePublish(post: BlogPost): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!post.metaTitle) {
    errors.push('metaTitle이 필요합니다');
  }
  if (!post.metaDescription) {
    errors.push('metaDescription이 필요합니다');
  }
  if (!post.keywords || post.keywords.length === 0) {
    errors.push('최소 1개의 키워드가 필요합니다');
  }
  if (!post.h1) {
    errors.push('H1 텍스트가 필요합니다');
  }

  // 블로그/가이드인 경우 추가 검증
  if (post.category || post.tags) {
    if (!post.cta || !post.cta.text || !post.cta.url) {
      errors.push('CTA(버튼 또는 링크)가 필요합니다');
    }
    if (!post.internalLinks || post.internalLinks.length < 2) {
      errors.push('최소 2개의 내부 링크가 필요합니다');
    }
    if (!post.externalLinks || post.externalLinks.length < 1) {
      errors.push('최소 1개의 외부 링크가 필요합니다');
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

