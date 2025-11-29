import { NextRequest, NextResponse } from 'next/server';
import { checkAdminAuth } from '@/lib/admin-auth';
import { getPostBySlugForAdmin, updatePostFile, deletePostFile, validatePublish } from '@/lib/admin';
import type { BlogPostFrontmatter } from '@/types/blog';

// 파일 시스템 접근이 필요하므로 Node.js Runtime 사용
export const runtime = 'nodejs';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  if (!checkAdminAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { slug } = await params;
  const post = getPostBySlugForAdmin(slug);

  if (!post) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 });
  }

  return NextResponse.json(post);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  if (!checkAdminAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { slug } = await params;
    const post = getPostBySlugForAdmin(slug);

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    const body = await request.json();

    // frontmatter 업데이트
    const frontmatter: BlogPostFrontmatter = {
      title: body.title || post.title,
      description: body.description || post.description,
      date: body.date || post.date,
      author: body.author || post.author,
      category: body.category || post.category,
      tags: body.tags || post.tags,
      metaTitle: body.metaTitle || post.metaTitle,
      metaDescription: body.metaDescription || post.metaDescription,
      keywords: body.keywords || post.keywords,
      canonicalUrl: body.canonicalUrl || post.canonicalUrl,
      published: body.published !== undefined ? body.published : post.published,
      status: body.status || post.status || (body.published ? 'published' : 'draft'),
      index: body.index !== undefined ? body.index : post.index !== false,
      sitemap: body.sitemap !== undefined ? body.sitemap : post.sitemap !== false,
      h1: body.h1 || post.h1,
      cta: body.ctaText && body.ctaUrl
        ? { text: body.ctaText, url: body.ctaUrl }
        : post.cta,
      internalLinks: body.internalLinks || post.internalLinks,
      externalLinks: body.externalLinks || post.externalLinks,
    };

    // published 상태로 변경 시 검증
    if (frontmatter.status === 'published') {
      const validation = validatePublish({
        ...post,
        ...frontmatter,
      });

      if (!validation.valid) {
        return NextResponse.json(
          { error: 'Validation failed', errors: validation.errors },
          { status: 400 }
        );
      }
    }

    // MDX 파일 업데이트
    updatePostFile(slug, frontmatter, body.content || post.content);

    return NextResponse.json({ success: true, post: { ...post, ...frontmatter } });
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error updating post:', error);
    }
    return NextResponse.json(
      { error: 'Failed to update post' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  if (!checkAdminAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { slug } = await params;
    const post = getPostBySlugForAdmin(slug);

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    deletePostFile(slug);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error deleting post:', error);
    }
    return NextResponse.json(
      { error: error.message || 'Failed to delete post' },
      { status: 500 }
    );
  }
}
