import { NextRequest, NextResponse } from 'next/server';
import { checkAdminAuth } from '@/lib/admin-auth';
import { createPostFile, getPostBySlugForAdmin, validatePublish } from '@/lib/admin';
import type { BlogPostFrontmatter } from '@/types/blog';

export async function POST(request: NextRequest) {
  if (!checkAdminAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();

    // 필수 필드 검증
    if (!body.slug || !body.title || !body.date) {
      return NextResponse.json(
        { error: 'slug, title, date are required' },
        { status: 400 }
      );
    }

    // 이미 존재하는지 확인
    const existingPost = getPostBySlugForAdmin(body.slug);
    if (existingPost) {
      return NextResponse.json(
        { error: 'Post with this slug already exists' },
        { status: 409 }
      );
    }

    // frontmatter 생성
    const frontmatter: BlogPostFrontmatter = {
      title: body.title,
      description: body.description || '',
      date: body.date,
      author: body.author,
      category: body.category,
      tags: body.tags || [],
      metaTitle: body.metaTitle || body.title,
      metaDescription: body.metaDescription || body.description || '',
      keywords: body.keywords || [],
      canonicalUrl: body.canonicalUrl,
      published: body.published !== undefined ? body.published : false,
      status: body.status || 'draft',
      index: body.index !== undefined ? body.index : true,
      sitemap: body.sitemap !== undefined ? body.sitemap : true,
      h1: body.h1 || body.title,
      cta: body.ctaText && body.ctaUrl
        ? { text: body.ctaText, url: body.ctaUrl }
        : undefined,
      internalLinks: body.internalLinks || [],
      externalLinks: body.externalLinks || [],
    };

    // published 상태로 생성 시 검증
    if (frontmatter.status === 'published') {
      const validation = validatePublish({
        slug: body.slug,
        ...frontmatter,
        content: body.content || '',
      } as any);

      if (!validation.valid) {
        return NextResponse.json(
          { error: 'Validation failed', errors: validation.errors },
          { status: 400 }
        );
      }
    }

    // MDX 파일 생성
    const content = body.content || '';
    createPostFile(body.slug, frontmatter, content);

    return NextResponse.json({
      success: true,
      post: {
        slug: body.slug,
        ...frontmatter,
        content,
      },
    });
  } catch (error: any) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error creating post:', error);
    }
    return NextResponse.json(
      { error: error.message || 'Failed to create post' },
      { status: 500 }
    );
  }
}

