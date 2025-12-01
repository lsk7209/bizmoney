import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getPostBySlugAsync, getAllPosts } from '@/lib/blog';
import dynamic from 'next/dynamic';

// ViewCounter를 동적 임포트로 최적화 (클라이언트 컴포넌트)
const ViewCounter = dynamic(() => import('@/components/growth-engine/ViewCounter').then((mod) => mod.ViewCounter), {
  ssr: false, // 서버 사이드 렌더링 비활성화 (조회수는 클라이언트에서만 필요)
});
import { formatDate } from '@/lib/utils';
import { siteConfig } from '@/site.config';
import { optimizeBlogPostMeta } from '@/lib/seo-optimize';
import { StructuredData } from '@/components/growth-engine/StructuredData';
import Link from 'next/link';
import { Callout } from '@/components/growth-engine/ui-blocks/Callout';
import { ProsCons } from '@/components/growth-engine/ui-blocks/ProsCons';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeader,
  TableCell,
} from '@/components/growth-engine/ui-blocks/Table';
import { BlogHero } from '@/components/blog/BlogHero';
import { TableOfContents } from '@/components/blog/TableOfContents';
import { ShareButtons } from '@/components/blog/ShareButtons';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

const mdxComponents = {
  Callout,
  ProsCons,
  Table,
  thead: TableHead,
  tbody: TableBody,
  tr: TableRow,
  th: TableHeader,
  td: TableCell,
};

export async function generateStaticParams() {
  // generateStaticParams는 빌드 시 실행되므로 동기 함수 사용
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export const dynamicParams = false;

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlugAsync(slug);

  if (!post) {
    notFound();
  }

  // SEO 자동 최적화 적용
  const optimized = optimizeBlogPostMeta(post);
  const postUrl = `${siteConfig.url}/blog/${slug}`;

  return (
    <>
      <StructuredData post={post} />

      <BlogHero
        title={post.title}
        date={post.date}
        category={post.tags?.[0]}
        slug={slug}
        url={postUrl}
      />

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-12 max-w-7xl mx-auto">
          {/* Main Content */}
          <main className="flex-1 min-w-0">
            <article className="prose prose-lg dark:prose-invert max-w-none 
              prose-headings:font-bold prose-headings:tracking-tight 
              prose-h1:text-3xl prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:pb-2 prose-h2:border-b
              prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4
              prose-p:leading-relaxed prose-p:text-foreground/90
              prose-strong:text-foreground prose-strong:font-bold
              prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
              prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50 dark:prose-blockquote:bg-blue-950/30 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r
              prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-mono prose-code:text-pink-600 dark:prose-code:text-pink-400
              prose-img:rounded-xl prose-img:shadow-lg
              prose-li:marker:text-blue-500
            ">
              <MDXRemote source={post.content} components={mdxComponents} />
            </article>

            {/* Tags Footer */}
            {post.tags && post.tags.length > 0 && (
              <footer className="mt-16 pt-8 border-t">
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-4 py-1.5 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full text-sm font-medium transition-colors cursor-default"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </footer>
            )}

            {/* Share Buttons (Mobile) */}
            <div className="mt-8 lg:hidden">
              <ShareButtons title={post.title} url={postUrl} />
            </div>
          </main>

          {/* Sidebar (TOC) */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24 space-y-8">
              <TableOfContents />
              <div className="pt-8 border-t">
                <p className="text-sm font-semibold mb-4 text-foreground/70">이 글 공유하기</p>
                <ShareButtons title={post.title} url={postUrl} />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlugAsync(slug);

  if (!post) {
    return {
      title: '포스트를 찾을 수 없습니다',
    };
  }

  const optimized = optimizeBlogPostMeta(post);
  const shouldIndex = post.published && post.index !== false;

  return {
    title: optimized.metaTitle,
    description: optimized.metaDescription,
    keywords: optimized.keywords.join(', '),
    alternates: {
      canonical: post.canonicalUrl || `${siteConfig.url}/blog/${slug}`,
    },
    robots: {
      index: shouldIndex,
      follow: true,
      googleBot: {
        index: shouldIndex,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      title: optimized.metaTitle,
      description: optimized.metaDescription,
      type: 'article',
      publishedTime: post.date,
      modifiedTime: post.date,
      url: `${siteConfig.url}/blog/${slug}`,
      siteName: siteConfig.name,
      locale: 'ko_KR',
    },
    twitter: {
      card: 'summary_large_image',
      title: optimized.metaTitle,
      description: optimized.metaDescription,
    },
  };
}
