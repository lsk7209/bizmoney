import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { BlogPost, BlogPostFrontmatter } from '@/types/blog';

const postsDirectory = path.join(process.cwd(), 'content/blog');

export function getAllPosts(): BlogPost[] {
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
          } as BlogPost;
        } catch (error) {
          if (process.env.NODE_ENV === 'development') {
            console.error(`Error reading post file ${fileName}:`, error);
          }
          return null;
        }
      })
      .filter((post): post is BlogPost => post !== null && post.published)
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

export function getPostBySlug(slug: string, includeUnpublished = false): BlogPost | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`);
    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    const post = {
      slug,
      content,
      ...(data as BlogPostFrontmatter),
      published: data.published !== false,
      status: data.status || (data.published ? 'published' : 'draft'),
      index: data.index !== false,
      sitemap: data.sitemap !== false,
    } as BlogPost;

    // published가 false이고 includeUnpublished가 false면 null 반환
    if (!includeUnpublished && !post.published) {
      return null;
    }

    return post;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error reading blog post:', error);
    }
    return null;
  }
}

export function getTotalPages(postsPerPage: number): number {
  const posts = getAllPosts();
  return Math.ceil(posts.length / postsPerPage);
}


