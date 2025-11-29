import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getPostBySlug, getAllPosts } from '@/lib/blog';
import { ViewCounter } from '@/components/growth-engine/ViewCounter';
import { formatDate } from '@/lib/utils';
import { siteConfig } from '@/site.config';
import { optimizeBlogPostMeta } from '@/lib/seo-optimize';
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
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export const dynamicParams = false;

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // SEO 자동 최적화 적용
  const optimized = optimizeBlogPostMeta(post);

  return (
    <article className="container mx-auto px-4 py-12 max-w-4xl">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{optimized.h1}</h1>
        <div className="flex items-center gap-4 text-sm text-foreground/60 mb-4">
          <time
            dateTime={post.date}
            aria-label={`게시일: ${formatDate(post.date)}`}
          >
            {formatDate(post.date)}
          </time>
          <ViewCounter slug={post.slug} />
        </div>
        {post.description && (
          <p className="text-xl text-foreground/80">{post.description}</p>
        )}
      </header>

      <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-p:text-foreground/90 prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-foreground prose-code:text-foreground prose-pre:bg-gray-100 dark:prose-pre:bg-gray-800">
        <MDXRemote
          source={post.content}
          components={mdxComponents}
          options={{
            mdxOptions: {
              rehypePlugins: [],
            },
          }}
        />
      </div>

      {/* CTA (Call To Action) */}
      {post.cta && (
        <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <div className="text-center">
            <p className="text-lg font-semibold mb-4 text-foreground">{post.cta.text}</p>
            <Link
              href={post.cta.url}
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              바로가기 →
            </Link>
          </div>
        </div>
      )}

      {/* Internal Links (Inlinks) */}
      {post.internalLinks && post.internalLinks.length > 0 && (
        <section className="mt-12 pt-8 border-t">
          <h2 className="text-2xl font-semibold mb-4">관련 글</h2>
          <ul className="space-y-2">
            {post.internalLinks.map((linkSlug, index) => {
              const linkedPost = getAllPosts().find((p) => p.slug === linkSlug);
              if (!linkedPost) return null;
              return (
                <li key={index}>
                  <Link
                    href={`/blog/${linkSlug}`}
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    {linkedPost.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {/* External Links (Outlinks) */}
      {post.externalLinks && post.externalLinks.length > 0 && (
        <section className="mt-8 pt-8 border-t">
          <h2 className="text-2xl font-semibold mb-4">참고 자료</h2>
          <ul className="space-y-2">
            {post.externalLinks.map((link, index) => (
              <li key={index}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  {link.description || link.url}
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      {post.tags && post.tags.length > 0 && (
        <footer className="mt-12 pt-8 border-t">
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm"
              >
                #{tag}
              </span>
            ))}
          </div>
        </footer>
      )}
    </article>
  );
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: '포스트를 찾을 수 없습니다',
    };
  }

  // SEO 자동 최적화 적용
  const optimized = optimizeBlogPostMeta(post);

  return {
    title: optimized.metaTitle,
    description: optimized.metaDescription,
    keywords: optimized.keywords.join(', '),
    alternates: {
      canonical: post.canonicalUrl || `${siteConfig.url}/blog/${slug}`,
    },
    openGraph: {
      title: optimized.metaTitle,
      description: optimized.metaDescription,
      type: 'article',
      publishedTime: post.date,
      url: `${siteConfig.url}/blog/${slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: optimized.metaTitle,
      description: optimized.metaDescription,
    },
  };
}

