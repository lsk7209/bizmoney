import { siteConfig } from '@/site.config';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Biz-Wallet 문의하기 | 프리랜서 세금 계산기 고객지원',
  description: 'Biz-Wallet 프리랜서 세금 계산기 서비스에 대한 문의사항을 남겨주세요. 이메일을 통해 빠르게 답변드립니다.',
  keywords: ['문의하기', '고객지원', '연락처', '피드백'],
  alternates: {
    canonical: `${siteConfig.url}/contact`,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Biz-Wallet 문의하기 | 프리랜서 세금 계산기 고객지원',
    description: 'Biz-Wallet에 대한 문의사항을 남겨주세요.',
    type: 'website',
    url: `${siteConfig.url}/contact`,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Biz-Wallet 문의하기',
    description: 'Biz-Wallet에 대한 문의사항을 남겨주세요.',
  },
};

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
          문의하기
        </h1>
        <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
          Biz-Wallet에 대한 문의사항, 제안사항, 또는 피드백을 남겨주세요.
        </p>
      </header>

      <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
        <section className="bg-gradient-to-r from-blue-50 to-white dark:from-blue-950/20 dark:to-gray-900 rounded-2xl p-8 border-2 border-blue-200 dark:border-blue-800">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <span className="text-2xl">📧</span>
            <span>연락처 정보</span>
          </h2>
          <p className="text-foreground/80 leading-relaxed mb-6">
            {siteConfig.name}에 대한 문의사항, 제안사항, 또는 피드백이 있으시면 아래 연락처로 연락주시기 바랍니다.
          </p>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-foreground/60 mb-1">이메일</p>
                <p className="text-lg">
                  <a
                    href={`mailto:${siteConfig.author.email}`}
                    className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                  >
                    {siteConfig.author.email}
                  </a>
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-foreground/60 mb-1">응답 시간</p>
                <p className="text-foreground/80">
                  일반적으로 영업일 기준 <strong>1-2일 이내</strong>에 답변드리도록 노력하고 있습니다.
                </p>
                <p className="text-sm text-foreground/60 mt-2">
                  주말 및 공휴일에는 응답이 지연될 수 있습니다.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white dark:bg-gray-900 rounded-xl p-8 border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <span className="text-2xl">💬</span>
            <span>문의 유형</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                <span>📝</span>
                <span>콘텐츠 관련 문의</span>
              </h3>
              <p className="text-foreground/80 text-sm leading-relaxed">
                블로그 포스트, 가이드, 계산기 등 콘텐츠에 대한 문의사항이나 개선 제안을 남겨주세요.
              </p>
            </div>
            <div className="p-6 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
              <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                <span>🐛</span>
                <span>기술 지원 및 버그 리포트</span>
              </h3>
              <p className="text-foreground/80 text-sm leading-relaxed">
                계산기 오류, 페이지 오류, 기능 개선 등 기술적인 문제를 신고해주세요.
              </p>
            </div>
            <div className="p-6 bg-purple-50 dark:bg-purple-950/20 rounded-lg border border-purple-200 dark:border-purple-800">
              <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                <span>🤝</span>
                <span>제휴 및 협업 제안</span>
              </h3>
              <p className="text-foreground/80 text-sm leading-relaxed">
                비즈니스 제휴, 콘텐츠 협업, 파트너십 제안 등을 남겨주세요.
              </p>
            </div>
            <div className="p-6 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                <span>💡</span>
                <span>피드백 및 제안</span>
              </h3>
              <p className="text-foreground/80 text-sm leading-relaxed">
                서비스 개선 아이디어, 새로운 기능 제안, 사용자 경험 개선 의견을 남겨주세요.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white dark:bg-gray-900 rounded-xl p-8 border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <span className="text-2xl">📋</span>
            <span>문의 시 포함해주세요</span>
          </h2>
          <p className="text-foreground/80 leading-relaxed mb-4">
            빠른 응답을 위해 다음 정보를 포함해주시면 도움이 됩니다:
          </p>
          <ul className="list-disc list-inside space-y-2 text-foreground/80">
            <li>문의 유형 (콘텐츠, 기술 지원, 제휴, 피드백 등)</li>
            <li>구체적인 내용 또는 문제 설명</li>
            <li>발생한 페이지 URL (버그 리포트인 경우)</li>
            <li>브라우저 및 운영체제 정보 (기술 지원인 경우)</li>
            <li>스크린샷 또는 첨부 파일 (가능한 경우)</li>
          </ul>
        </section>

        <section className="bg-white dark:bg-gray-900 rounded-xl p-8 border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <span className="text-2xl">🔒</span>
            <span>개인정보 보호</span>
          </h2>
          <p className="text-foreground/80 leading-relaxed mb-4">
            문의 시 제공해주신 개인정보는 문의 응답 목적으로만 사용되며, 관련 법령에 따라 보관 후 파기됩니다.
          </p>
          <p className="text-foreground/80 leading-relaxed">
            자세한 내용은{' '}
            <a
              href="/privacy"
              className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
            >
              개인정보 처리방침
            </a>
            을 참고해주세요.
          </p>
        </section>

        <section className="bg-yellow-50 dark:bg-yellow-950/30 rounded-xl p-8 border-2 border-yellow-200 dark:border-yellow-800">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-3 text-yellow-800 dark:text-yellow-200">
            <span className="text-2xl">⚠️</span>
            <span>면책 조항</span>
          </h2>
          <p className="text-foreground/90 leading-relaxed">
            Biz-Wallet에서 제공하는 모든 계산 결과는 <strong>모의 계산</strong>이며 <strong>법적 효력이 없습니다</strong>. 
            정확한 세액은 <strong>홈택스</strong>에서 직접 계산하거나 <strong>세무 전문가</strong>의 도움을 받아 확인하시기 바랍니다.
          </p>
        </section>
      </div>
    </div>
  );
}
