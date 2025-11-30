import { siteConfig } from '@/site.config';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Biz-Wallet 소개 | 프리랜서 세금 계산기 서비스 - 사장님의 지갑',
  description: 'Biz-Wallet은 프리랜서와 소상공인을 위한 무료 세금 계산기 및 정부지원금 매칭 서비스입니다. 100% 무료, 개인정보 보호, 즉시 결과 확인.',
  keywords: ['Biz-Wallet 소개', '프리랜서 세금 계산기', '소상공인 세금 서비스', '무료 세금 계산'],
  alternates: {
    canonical: `${siteConfig.url}/about`,
  },
  openGraph: {
    title: 'Biz-Wallet 소개 | 프리랜서 세금 계산기 서비스',
    description: 'Biz-Wallet은 프리랜서와 소상공인을 위한 무료 세금 계산기 및 정부지원금 매칭 서비스입니다.',
    type: 'website',
    url: `${siteConfig.url}/about`,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Biz-Wallet 소개',
    description: '프리랜서와 소상공인을 위한 무료 세금 계산기 서비스',
  },
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
          Biz-Wallet 소개
        </h1>
        <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
          사장님의 지갑 - 프리랜서와 소상공인을 위한 세금 계산 및 정부지원금 매칭 서비스
        </p>
      </header>

      <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
        <section className="bg-gradient-to-r from-blue-50 to-white dark:from-blue-950/20 dark:to-gray-900 rounded-2xl p-8 border-2 border-blue-200 dark:border-blue-800">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <span className="text-3xl">💼</span>
            <span>Biz-Wallet이란?</span>
          </h2>
          <p className="text-lg leading-relaxed text-foreground/90 mb-4">
            <strong>Biz-Wallet (사장님의 지갑)</strong>은 프리랜서와 소상공인을 위한 전문 세금 계산 및 정부지원금 매칭 웹 유틸리티 서비스입니다.
          </p>
          <p className="text-lg leading-relaxed text-foreground/90">
            우리는 세금 계산의 복잡함과 불안감을 해소하고, 프리랜서와 소상공인이 자신의 세금 상황을 명확히 이해하고 최적화할 수 있도록 돕는 것을 목표로 합니다.
          </p>
        </section>

        <section className="bg-white dark:bg-gray-900 rounded-xl p-8 border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <span className="text-2xl">🎯</span>
            <span>서비스 목적</span>
          </h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center flex-shrink-0">
                <span className="text-xl">✅</span>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">정확한 세금 계산</h3>
                <p className="text-foreground/80 leading-relaxed">
                  단순경비율을 적용한 종합소득세 계산기, 부가가치세 계산기, 연말정산 계산기 등 다양한 세금 계산 도구를 제공하여 
                  프리랜서와 소상공인이 자신의 세금 상황을 정확히 파악할 수 있도록 돕습니다.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center flex-shrink-0">
                <span className="text-xl">📚</span>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">실용적인 정보 제공</h3>
                <p className="text-foreground/80 leading-relaxed">
                  세금 신고 절차, 세금 절감 방법, 단순경비율 vs 장부기장 비교 등 프리랜서와 소상공인에게 실질적으로 도움이 되는 
                  가이드와 정보를 제공합니다.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center flex-shrink-0">
                <span className="text-xl">💰</span>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">정부지원금 매칭</h3>
                <p className="text-foreground/80 leading-relaxed">
                  업종과 규모에 맞는 정부지원금을 자동으로 매칭하여 프리랜서와 소상공인이 받을 수 있는 지원금을 쉽게 찾을 수 있도록 돕습니다.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-yellow-100 dark:bg-yellow-900 flex items-center justify-center flex-shrink-0">
                <span className="text-xl">🔒</span>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">개인정보 보호</h3>
                <p className="text-foreground/80 leading-relaxed">
                  모든 계산은 100% 클라이언트 사이드에서 이루어지며, 사용자의 개인정보나 세금 정보를 서버에 저장하지 않습니다. 
                  완전한 프라이버시를 보장합니다.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white dark:bg-gray-900 rounded-xl p-8 border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <span className="text-2xl">🛠️</span>
            <span>주요 기능</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                <span>📊</span>
                <span>세금 방어력 테스트</span>
              </h3>
              <p className="text-foreground/80 text-sm leading-relaxed">
                5문항 퀴즈로 나의 세금 지식 수준을 확인하고, 맞춤형 가이드를 받아보세요.
              </p>
            </div>
            <div className="p-6 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
              <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                <span>💰</span>
                <span>종합소득세 계산기</span>
              </h3>
              <p className="text-foreground/80 text-sm leading-relaxed">
                단순경비율을 적용한 정확한 세액 계산으로 내가 받을 환급금을 확인하세요.
              </p>
            </div>
            <div className="p-6 bg-purple-50 dark:bg-purple-950/20 rounded-lg border border-purple-200 dark:border-purple-800">
              <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                <span>📋</span>
                <span>부가가치세 계산기</span>
              </h3>
              <p className="text-foreground/80 text-sm leading-relaxed">
                과세/면세/영세율을 구분하여 공급가액과 부가세를 계산하고 환급금을 확인하세요.
              </p>
            </div>
            <div className="p-6 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                <span>🎯</span>
                <span>정부지원금 매칭</span>
              </h3>
              <p className="text-foreground/80 text-sm leading-relaxed">
                업종과 규모에 맞는 맞춤형 정부지원금을 자동으로 추천해드립니다.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white dark:bg-gray-900 rounded-xl p-8 border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <span className="text-2xl">💡</span>
            <span>Biz-Wallet의 가치</span>
          </h2>
          <div className="space-y-4 text-foreground/90">
            <p className="leading-relaxed">
              <strong className="text-blue-600 dark:text-blue-400">Biz-Wallet</strong>은 단순한 계산기 서비스를 넘어, 
              프리랜서와 소상공인이 자신의 세금 상황을 명확히 이해하고 최적화할 수 있도록 돕는 종합 세금 관리 플랫폼입니다.
            </p>
            <p className="leading-relaxed">
              우리는 다음과 같은 가치를 추구합니다:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>투명성:</strong> 모든 계산 과정을 명확히 공개하고, 면책 조항을 명시하여 사용자가 정확히 이해할 수 있도록 합니다.</li>
              <li><strong>접근성:</strong> 100% 무료로 제공하며, 복잡한 가입 절차 없이 누구나 쉽게 사용할 수 있습니다.</li>
              <li><strong>프라이버시:</strong> 모든 계산은 클라이언트 사이드에서 이루어지며, 사용자의 정보를 수집하거나 저장하지 않습니다.</li>
              <li><strong>실용성:</strong> 실제로 사용할 수 있는 도구와 정보를 제공하여 프리랜서와 소상공인의 실질적인 도움이 되도록 합니다.</li>
            </ul>
          </div>
        </section>

        <section className="bg-yellow-50 dark:bg-yellow-950/30 rounded-xl p-8 border-2 border-yellow-200 dark:border-yellow-800">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-yellow-800 dark:text-yellow-200">
            <span className="text-2xl">⚠️</span>
            <span>면책 조항</span>
          </h2>
          <p className="text-foreground/90 leading-relaxed mb-4">
            Biz-Wallet에서 제공하는 모든 계산 결과는 <strong>모의 계산</strong>이며 <strong>법적 효력이 없습니다</strong>.
          </p>
          <p className="text-foreground/90 leading-relaxed">
            정확한 세액은 <strong>홈택스</strong>에서 직접 계산하거나 <strong>세무 전문가</strong>의 도움을 받아 확인하시기 바랍니다. 
            본 서비스는 참고용으로만 사용하시기 바랍니다.
          </p>
        </section>

        <section className="bg-white dark:bg-gray-900 rounded-xl p-8 border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <span className="text-2xl">📧</span>
            <span>문의하기</span>
          </h2>
          <p className="text-foreground/80 leading-relaxed mb-4">
            Biz-Wallet에 대한 문의사항, 제안사항, 또는 피드백이 있으시면 아래로 연락주시기 바랍니다.
          </p>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
            <p className="text-foreground/90">
              <strong className="text-foreground">이메일:</strong>{' '}
              <a
                href={`mailto:${siteConfig.author.email}`}
                className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
              >
                {siteConfig.author.email}
              </a>
            </p>
            <p className="text-sm text-foreground/60 mt-2">
              일반적으로 영업일 기준 1-2일 이내에 답변드리도록 노력하고 있습니다.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
