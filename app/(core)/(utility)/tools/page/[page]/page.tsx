import Link from 'next/link';
import { getAllPublishedTools, getTotalToolPages } from '@/lib/tools';
import { siteConfig } from '@/site.config';

interface ToolsPageProps {
  params: Promise<{
    page: string;
  }>;
}

export async function generateStaticParams() {
  const totalPages = getTotalToolPages(siteConfig.tools.postsPerPage);
  return Array.from({ length: totalPages }, (_, i) => ({
    page: String(i + 1),
  }));
}

export const dynamicParams = false;

export default async function ToolsPage({ params }: ToolsPageProps) {
  const { page } = await params;
  const currentPage = parseInt(page, 10);
  
  if (isNaN(currentPage) || currentPage < 1) {
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">도구</h1>
        <div className="text-center py-12">
          <p className="text-foreground/60 text-lg mb-4">
            잘못된 페이지 번호입니다.
          </p>
        </div>
      </div>
    );
  }

  const tools = getAllPublishedTools();
  const totalPages = getTotalToolPages(siteConfig.tools.postsPerPage);
  const startIndex = (currentPage - 1) * siteConfig.tools.postsPerPage;
  const endIndex = startIndex + siteConfig.tools.postsPerPage;
  const paginatedTools = tools.slice(startIndex, endIndex);

  if (paginatedTools.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">도구</h1>
        <div className="text-center py-12">
          <p className="text-foreground/60 text-lg mb-4">
            아직 등록된 도구가 없습니다.
          </p>
          <p className="text-foreground/40">
            곧 유용한 도구들이 추가될 예정입니다.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">도구</h1>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3" role="list">
        {paginatedTools.map((tool) => (
          <article
            key={tool.slug}
            className="border rounded-lg p-6 hover:shadow-lg transition-shadow"
            role="listitem"
          >
            <Link
              href={`/tools/${tool.slug}`}
              className="focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
              aria-label={`${tool.title} 도구 사용하기`}
            >
              <h2 className="text-2xl font-semibold mb-2 hover:text-blue-600 transition-colors">
                {tool.title}
              </h2>
            </Link>
            <p className="text-foreground/80 mb-4">{tool.description}</p>
            {tool.tags && tool.tags.length > 0 && (
              <div className="flex gap-2 flex-wrap" role="list" aria-label="태그">
                {tool.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm"
                    role="listitem"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
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
              href={`/tools/page/${currentPage - 1}`}
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
              href={`/tools/page/${currentPage + 1}`}
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

export async function generateMetadata({ params }: ToolsPageProps) {
  const { page } = await params;
  const currentPage = parseInt(page, 10);
  const baseUrl = `${siteConfig.url}/tools${currentPage > 1 ? `/page/${currentPage}` : ''}`;
  
  return {
    title: currentPage > 1
      ? `도구 - 페이지 ${currentPage} - ${siteConfig.name}`
      : `도구 - ${siteConfig.name}`,
    description: '유용한 온라인 도구 모음',
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
        ? `도구 - 페이지 ${currentPage} - ${siteConfig.name}`
        : `도구 - ${siteConfig.name}`,
      description: '유용한 온라인 도구 모음',
      url: baseUrl,
    },
    twitter: {
      card: 'summary_large_image',
      title: currentPage > 1
        ? `도구 - 페이지 ${currentPage} - ${siteConfig.name}`
        : `도구 - ${siteConfig.name}`,
      description: '유용한 온라인 도구 모음',
    },
  };
}

