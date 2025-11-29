import Link from 'next/link';
import { getAllPosts, getTotalPages } from '@/lib/blog';
import { siteConfig } from '@/site.config';
import { formatDate } from '@/lib/utils';

interface BlogPageProps {
  params: {
    page: string;
  };
}

export async function generateStaticParams() {
  const totalPages = getTotalPages(siteConfig.blog.postsPerPage);
  return Array.from({ length: totalPages }, (_, i) => ({
    page: String(i + 1),
  }));
}

export const dynamicParams = false;

export default async function BlogPage({ params }: BlogPageProps) {
  const { page } = await params;
  const currentPage = parseInt(page, 10);
  
  if (isNaN(currentPage) || currentPage < 1) {
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">블로그</h1>
        <div className="text-center py-12">
          <p className="text-foreground/60 text-lg mb-4">
            잘못된 페이지 번호입니다.
          </p>
        </div>
      </div>
    );
  }

  const posts = getAllPosts();
  const totalPages = getTotalPages(siteConfig.blog.postsPerPage);
  const startIndex = (currentPage - 1) * siteConfig.blog.postsPerPage;
  const endIndex = startIndex + siteConfig.blog.postsPerPage;
  const paginatedPosts = posts.slice(startIndex, endIndex);

  if (paginatedPosts.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">블로그</h1>
        <div className="text-center py-12">
          <p className="text-foreground/60 text-lg mb-4">
            아직 작성된 포스트가 없습니다.
          </p>
          <p className="text-foreground/40">
            곧 새로운 콘텐츠가 추가될 예정입니다.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">블로그</h1>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {paginatedPosts.map((post) => (
          <article
            key={post.slug}
            className="border rounded-lg p-6 hover:shadow-lg transition-shadow"
          >
            <Link href={`/blog/${post.slug}`}>
              <h2 className="text-2xl font-semibold mb-2 hover:text-blue-600 transition-colors">
                {post.title}
              </h2>
            </Link>
            <p className="text-foreground/80 mb-4">{post.description}</p>
            <div className="flex items-center justify-between text-sm text-foreground/60">
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              {post.tags && post.tags.length > 0 && (
                <div className="flex gap-2">
                  {post.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </article>
        ))}
      </div>

      {totalPages > 1 && (
        <nav
          className="mt-12 flex justify-center gap-4"
          aria-label="페이지 네비게이션"
        >
          {currentPage > 1 && (
            <Link
              href={`/blog/page/${currentPage - 1}`}
              className="px-4 py-2 border rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              aria-label={`이전 페이지 (페이지 ${currentPage - 1})`}
            >
              이전
            </Link>
          )}
          <span className="px-4 py-2" aria-current="page" aria-label={`현재 페이지 ${currentPage} / 전체 ${totalPages}페이지`}>
            {currentPage} / {totalPages}
          </span>
          {currentPage < totalPages && (
            <Link
              href={`/blog/page/${currentPage + 1}`}
              className="px-4 py-2 border rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              aria-label={`다음 페이지 (페이지 ${currentPage + 1})`}
            >
              다음
            </Link>
          )}
        </nav>
      )}
    </div>
  );
}

export async function generateMetadata({ params }: BlogPageProps) {
  const { page } = await params;
  const currentPage = parseInt(page, 10);
  const totalPages = getTotalPages(siteConfig.blog.postsPerPage);
  const baseUrl = `${siteConfig.url}/blog${currentPage > 1 ? `/page/${currentPage}` : ''}`;
  
  return {
    title: currentPage > 1 
      ? `블로그 - 페이지 ${currentPage} - ${siteConfig.name}`
      : `블로그 - ${siteConfig.name}`,
    description: siteConfig.seo.defaultDescription,
    keywords: siteConfig.seo.defaultKeywords,
    alternates: {
      canonical: baseUrl,
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: currentPage > 1 
        ? `블로그 - 페이지 ${currentPage} - ${siteConfig.name}`
        : `블로그 - ${siteConfig.name}`,
      description: siteConfig.seo.defaultDescription,
      url: baseUrl,
    },
    twitter: {
      card: 'summary_large_image',
      title: currentPage > 1 
        ? `블로그 - 페이지 ${currentPage} - ${siteConfig.name}`
        : `블로그 - ${siteConfig.name}`,
      description: siteConfig.seo.defaultDescription,
    },
  };
}


