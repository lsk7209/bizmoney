import Link from 'next/link';
import { siteConfig } from '@/site.config';
import { getAllPosts } from '@/lib/blog';
import { getAllPublishedTools } from '@/lib/tools';
import { formatDate } from '@/lib/utils';

export default function HomePage() {
  const latestPosts = getAllPosts().slice(0, 3);
  const featuredTools = getAllPublishedTools().slice(0, 3);

  return (
    <div className="container mx-auto px-4 py-12">
      <section className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-6">{siteConfig.name}</h1>
        <p className="text-xl text-foreground/80 mb-8 max-w-2xl mx-auto">
          {siteConfig.description}
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/blog"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-label="블로그 페이지로 이동"
          >
            블로그 보기
          </Link>
          <Link
            href="/tools"
            className="px-6 py-3 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-label="도구 페이지로 이동"
          >
            도구 보기
          </Link>
        </div>
      </section>

      <section className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16">
        <div className="border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold">최신 블로그</h2>
            <Link
              href="/blog"
              className="text-sm text-blue-600 hover:underline"
            >
              전체 보기 →
            </Link>
          </div>
          {latestPosts.length > 0 ? (
            <div className="space-y-4">
              {latestPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="block p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <h3 className="font-semibold mb-2 hover:text-blue-600 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm text-foreground/60 mb-2 line-clamp-2">
                    {post.description}
                  </p>
                  <time className="text-xs text-foreground/40">
                    {formatDate(post.date)}
                  </time>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-foreground/60">아직 작성된 포스트가 없습니다.</p>
          )}
        </div>

        <div className="border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold">인기 도구</h2>
            <Link
              href="/tools"
              className="text-sm text-blue-600 hover:underline"
            >
              전체 보기 →
            </Link>
          </div>
          {featuredTools.length > 0 ? (
            <div className="space-y-4" role="list">
              {featuredTools.map((tool) => (
                <article
                  key={tool.slug}
                  role="listitem"
                >
                  <Link
                    href={`/tools/${tool.slug}`}
                    className="block p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    aria-label={`${tool.title} 도구 사용하기`}
                  >
                    <h3 className="font-semibold mb-2 hover:text-blue-600 transition-colors">
                      {tool.title}
                    </h3>
                    <p className="text-sm text-foreground/60 mb-2 line-clamp-2">
                      {tool.description}
                    </p>
                    {tool.tags && tool.tags.length > 0 && (
                      <div className="flex gap-1 flex-wrap" role="list" aria-label="태그">
                        {tool.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded"
                            role="listitem"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </Link>
                </article>
              ))}
            </div>
          ) : (
            <p className="text-foreground/60" role="status" aria-live="polite">
              아직 등록된 도구가 없습니다.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}

export function generateMetadata() {
  return {
    title: siteConfig.seo.defaultTitle,
    description: siteConfig.seo.defaultDescription,
    keywords: siteConfig.seo.defaultKeywords,
    alternates: {
      canonical: siteConfig.url,
    },
    openGraph: {
      title: siteConfig.seo.defaultTitle,
      description: siteConfig.seo.defaultDescription,
      url: siteConfig.url,
      siteName: siteConfig.name,
    },
    twitter: {
      card: 'summary_large_image',
      title: siteConfig.seo.defaultTitle,
      description: siteConfig.seo.defaultDescription,
    },
  };
}


