import Link from 'next/link';
import { siteConfig } from '@/site.config';
import { getAllPosts } from '@/lib/blog';
import { getAllPublishedTools } from '@/lib/tools';
import { formatDate } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { HomeStructuredData } from '@/components/home/HomeStructuredData';

export default function HomePage() {
  const latestPosts = getAllPosts().slice(0, 3);
  const featuredTools = getAllPublishedTools().slice(0, 3);

  return (
    <>
      <HomeStructuredData />
      <div className="container mx-auto px-4 py-8 md:py-16">
      {/* 히어로 섹션 - 공감 메시지 강화 */}
      <section className="text-center mb-20">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            Biz-Wallet
          </h1>
          <p className="text-2xl md:text-3xl font-semibold mb-4 text-foreground">
            사장님의 지갑
          </p>
          <p className="text-lg md:text-xl text-foreground/70 mb-6 max-w-3xl mx-auto leading-relaxed">
            <span className="empathy-text">&ldquo;세금 때문에 고민이신가요?&rdquo;</span>
            <br className="hidden md:block" />
            프리랜서와 소상공인을 위한 <strong>무료 세금 계산기</strong>로<br />
            내가 받을 수 있는 <strong className="text-green-600 dark:text-green-400">환급금</strong>을 확인해보세요.
            <br />
            <span className="text-base text-foreground/60 mt-2 block">
              💡 2025년 신규! 국세청 &quot;원클릭&quot;으로 최대 5년치 환급금을 <strong className="text-blue-600 dark:text-blue-400">무료</strong>로 확인하세요!
            </span>
          </p>
        </div>
        
        {/* 주요 기능 카드 - 유익 강조 */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-10">
          <Card className="focus-card border-2 border-blue-200 dark:border-blue-800 bg-gradient-to-br from-blue-50 to-white dark:from-blue-950/20 dark:to-gray-900">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                  <span className="text-2xl">📊</span>
                </div>
                <CardTitle className="text-xl md:text-2xl">세금 방어력 테스트</CardTitle>
              </div>
              <CardDescription className="text-base text-left">
                5문항 퀴즈로 나의 세금 지식 수준을 확인하고, 맞춤형 가이드를 받아보세요.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="benefit-highlight">
                  <p className="text-base font-medium text-foreground mb-2">
                    💡 <strong>무료</strong>로 세금 지식 레벨을 확인하고, <strong>맞춤형 계산기</strong>를 추천받으세요.
                  </p>
                  <p className="text-sm text-foreground/70">
                    ⏱️ 약 2분 소요 · 🎯 즉시 결과 확인 · 📊 5문항 간단 테스트
                  </p>
                </div>
                <Link href="/quiz">
                  <Button size="lg" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all">
                    무료 테스트 시작하기 →
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card className="focus-card border-2 border-green-200 dark:border-green-800 bg-gradient-to-br from-green-50 to-white dark:from-green-950/20 dark:to-gray-900">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                  <span className="text-2xl">💰</span>
                </div>
                <CardTitle className="text-xl md:text-2xl">종합소득세 계산기</CardTitle>
              </div>
              <CardDescription className="text-base text-left">
                단순경비율을 적용한 정확한 세액 계산으로 내가 받을 환급금을 확인하세요.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="benefit-highlight">
                  <p className="text-base font-medium text-foreground mb-2">
                    ✅ <strong>100% 무료</strong> · <strong>개인정보 보호</strong> · <strong>즉시 결과 확인</strong>
                  </p>
                  <p className="text-sm text-foreground/70">
                    💰 단순경비율 자동 계산 · 🎁 환급금 예상 금액 확인 · 📊 2025년 최신 세법 반영
                  </p>
                </div>
                <Link href="/calculator">
                  <Button size="lg" className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all">
                    환급금 계산하기 →
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 빠른 액션 버튼 */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-2xl mx-auto">
          <Link href="/quiz" className="flex-1">
            <Button
              size="lg"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md hover:shadow-lg transition-all"
            >
              📊 세금 방어력 테스트
            </Button>
          </Link>
          <Link href="/calculator" className="flex-1">
            <Button
              size="lg"
              variant="outline"
              className="w-full border-2 border-green-600 text-green-600 hover:bg-green-50 dark:hover:bg-green-950 font-semibold shadow-md hover:shadow-lg transition-all"
            >
              💰 환급금 계산하기
            </Button>
          </Link>
        </div>
      </section>

      {/* 콘텐츠 섹션 - 유익한 정보 제공 */}
      <section className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16">
        <Card className="focus-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                  <span className="text-xl">📝</span>
                </div>
                <CardTitle className="text-2xl font-bold">최신 가이드</CardTitle>
              </div>
              <Link
                href="/blog"
                className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 hover:underline transition-colors"
              >
                전체 보기 →
              </Link>
            </div>
            <CardDescription className="text-base mt-2">
              프리랜서와 소상공인을 위한 실용적인 세금 가이드
            </CardDescription>
          </CardHeader>
          <CardContent>
            {latestPosts.length > 0 ? (
              <div className="space-y-4">
                {latestPosts.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="block p-4 border rounded-lg hover:border-blue-300 dark:hover:border-blue-700 hover:bg-blue-50/50 dark:hover:bg-blue-950/20 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    <h3 className="font-semibold mb-2 text-base hover:text-blue-600 dark:hover:text-blue-400 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-foreground/70 mb-3 line-clamp-2 leading-relaxed">
                      {post.description}
                    </p>
                    <time className="text-sm text-foreground/60 font-medium">
                      {formatDate(post.date)}
                    </time>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-foreground/60 mb-2">아직 작성된 포스트가 없습니다.</p>
                <p className="text-sm text-foreground/50">곧 유용한 가이드를 제공할 예정입니다.</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="focus-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900 flex items-center justify-center">
                  <span className="text-xl">🛠️</span>
                </div>
                <CardTitle className="text-2xl font-bold">유용한 도구</CardTitle>
              </div>
              <Link
                href="/tools"
                className="text-sm font-medium text-green-600 hover:text-green-700 dark:text-green-400 hover:underline transition-colors"
              >
                전체 보기 →
              </Link>
            </div>
            <CardDescription className="text-base mt-2">
              세금 계산과 관리를 위한 무료 도구 모음
            </CardDescription>
          </CardHeader>
          <CardContent>
            {featuredTools.length > 0 ? (
              <div className="space-y-4" role="list">
                {featuredTools.map((tool) => (
                  <article
                    key={tool.slug}
                    role="listitem"
                  >
                    <Link
                      href={`/tools/${tool.slug}`}
                      className="block p-4 border rounded-lg hover:border-green-300 dark:hover:border-green-700 hover:bg-green-50/50 dark:hover:bg-green-950/20 transition-all focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                      aria-label={`${tool.title} 도구 사용하기`}
                    >
                      <h3 className="font-semibold mb-2 text-base hover:text-green-600 dark:hover:text-green-400 transition-colors line-clamp-2">
                        {tool.title}
                      </h3>
                      <p className="text-sm text-foreground/70 mb-3 line-clamp-2 leading-relaxed">
                        {tool.description}
                      </p>
                      {tool.tags && tool.tags.length > 0 && (
                        <div className="flex gap-1 flex-wrap" role="list" aria-label="태그">
                          {tool.tags.slice(0, 2).map((tag) => (
                            <span
                              key={tag}
                              className="text-sm px-2.5 py-1.5 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-md font-medium"
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
              <div className="text-center py-8">
                <p className="text-foreground/60 mb-2" role="status" aria-live="polite">
                  아직 등록된 도구가 없습니다.
                </p>
                <p className="text-sm text-foreground/50">곧 유용한 도구를 제공할 예정입니다.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </section>
    </div>
    </>
  );
}

export function generateMetadata() {
  // 키워드를 앞쪽에 배치한 최적화된 메타 정보
  const optimizedTitle = `프리랜서 세금 계산기 | 종합소득세 계산기 - ${siteConfig.name}`;
  const optimizedDescription = `프리랜서 세금 계산기와 종합소득세 계산기로 세금을 계산하세요. 소상공인을 위한 세금 방어력 테스트와 환급금 조회 가능.`;
  
  return {
    title: optimizedTitle,
    description: optimizedDescription,
    keywords: siteConfig.seo.defaultKeywords,
    alternates: {
      canonical: siteConfig.url,
    },
    openGraph: {
      title: optimizedTitle,
      description: optimizedDescription,
      url: siteConfig.url,
      siteName: siteConfig.name,
      type: 'website',
      locale: 'ko_KR',
    },
    twitter: {
      card: 'summary_large_image',
      title: optimizedTitle,
      description: optimizedDescription,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}


