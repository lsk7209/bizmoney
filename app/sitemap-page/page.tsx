import { Metadata } from 'next';
import { siteConfig } from '@/site.config';
import { getAllPosts } from '@/lib/blog';
import { getAllPublishedTools } from '@/lib/tools';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '사이트맵 | Biz-Wallet 프리랜서 세금 계산기',
  description: 'Biz-Wallet 사이트맵입니다. 모든 페이지와 콘텐츠를 한눈에 확인하세요.',
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: `${siteConfig.url}/sitemap-page`,
  },
};

export default function SitemapPage() {
  const posts = getAllPosts();
  const tools = getAllPublishedTools();

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">사이트맵</h1>
        <p className="text-foreground/70">
          Biz-Wallet의 모든 페이지와 콘텐츠를 한눈에 확인하세요.
        </p>
      </header>

      <div className="space-y-8">
        <section className="bg-white dark:bg-gray-900 rounded-xl p-8 border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold mb-4">주요 페이지</h2>
          <ul className="space-y-2">
            <li>
              <Link href="/" className="text-blue-600 dark:text-blue-400 hover:underline">
                홈
              </Link>
            </li>
            <li>
              <Link href="/about" className="text-blue-600 dark:text-blue-400 hover:underline">
                소개
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-blue-600 dark:text-blue-400 hover:underline">
                문의
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="text-blue-600 dark:text-blue-400 hover:underline">
                개인정보 처리방침
              </Link>
            </li>
            <li>
              <Link href="/terms" className="text-blue-600 dark:text-blue-400 hover:underline">
                이용약관
              </Link>
            </li>
          </ul>
        </section>

        <section className="bg-white dark:bg-gray-900 rounded-xl p-8 border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold mb-4">계산기</h2>
          <ul className="space-y-2">
            <li>
              <Link href="/calculator" className="text-blue-600 dark:text-blue-400 hover:underline">
                종합소득세 계산기
              </Link>
            </li>
            <li>
              <Link href="/vat-calculator" className="text-blue-600 dark:text-blue-400 hover:underline">
                부가가치세 계산기
              </Link>
            </li>
            <li>
              <Link href="/year-end-tax" className="text-blue-600 dark:text-blue-400 hover:underline">
                연말정산 계산기
              </Link>
            </li>
            <li>
              <Link href="/withholding-tax" className="text-blue-600 dark:text-blue-400 hover:underline">
                원천징수세 계산기
              </Link>
            </li>
            <li>
              <Link href="/quiz" className="text-blue-600 dark:text-blue-400 hover:underline">
                세금 방어력 테스트
              </Link>
            </li>
          </ul>
        </section>

        <section className="bg-white dark:bg-gray-900 rounded-xl p-8 border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold mb-4">도구</h2>
          <ul className="space-y-2">
            <li>
              <Link href="/government-support" className="text-blue-600 dark:text-blue-400 hover:underline">
                정부지원금 매칭 도구
              </Link>
            </li>
            <li>
              <Link href="/tax-checklist" className="text-blue-600 dark:text-blue-400 hover:underline">
                세금 신고 체크리스트
              </Link>
            </li>
            {tools.length > 0 && (
              <>
                {tools.map((tool) => (
                  <li key={tool.slug}>
                    <Link href={`/tools/${tool.slug}`} className="text-blue-600 dark:text-blue-400 hover:underline">
                      {tool.title}
                    </Link>
                  </li>
                ))}
              </>
            )}
          </ul>
        </section>

        {posts.length > 0 && (
          <section className="bg-white dark:bg-gray-900 rounded-xl p-8 border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold mb-4">블로그 ({posts.length}개)</h2>
            <ul className="space-y-2">
              {posts.map((post) => (
                <li key={post.slug}>
                  <Link href={`/blog/${post.slug}`} className="text-blue-600 dark:text-blue-400 hover:underline">
                    {post.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="bg-white dark:bg-gray-900 rounded-xl p-8 border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold mb-4">XML 사이트맵</h2>
          <p className="text-foreground/80 mb-4">
            검색 엔진용 XML 사이트맵은 다음 링크에서 확인할 수 있습니다:
          </p>
          <Link href="/sitemap.xml" className="text-blue-600 dark:text-blue-400 hover:underline">
            /sitemap.xml
          </Link>
        </section>
      </div>
    </div>
  );
}

