import { siteConfig } from '@/site.config';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '개인정보 처리방침 | Biz-Wallet 프리랜서 세금 계산기',
  description: 'Biz-Wallet 프리랜서 세금 계산기 서비스의 개인정보 처리방침입니다. 100% 클라이언트 사이드 연산으로 개인정보를 보호합니다.',
  keywords: ['개인정보 처리방침', '프라이버시 정책', '개인정보 보호'],
  alternates: {
    canonical: `${siteConfig.url}/privacy`,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: '개인정보 처리방침 | Biz-Wallet',
    description: 'Biz-Wallet의 개인정보 처리방침입니다.',
    type: 'website',
    url: `${siteConfig.url}/privacy`,
  },
  twitter: {
    card: 'summary_large_image',
    title: '개인정보 처리방침',
    description: 'Biz-Wallet의 개인정보 처리방침입니다.',
  },
};

export default function PrivacyPage() {
  const lastUpdated = '2025-01-15';

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">개인정보 처리방침</h1>
        <p className="text-foreground/70">
          최종 업데이트: {lastUpdated}
        </p>
      </header>

      <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
        <section className="bg-white dark:bg-gray-900 rounded-xl p-8 border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold mb-4">1. 개인정보의 처리 목적</h2>
          <p className="text-foreground/80 leading-relaxed mb-4">
            <strong>{siteConfig.name}</strong>(이하 &quot;회사&quot;)은(는) 다음의 목적을 위하여 개인정보를 처리합니다. 
            처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 
            개인정보 보호법 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.
          </p>
          <div className="space-y-3">
            <div>
              <h3 className="font-semibold mb-2">1.1 서비스 제공</h3>
              <p className="text-foreground/80 text-sm leading-relaxed">
                세금 계산기, 정부지원금 매칭 등 서비스 제공을 위한 목적으로 개인정보를 처리합니다.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">1.2 광고 서비스 제공</h3>
              <p className="text-foreground/80 text-sm leading-relaxed">
                Google AdSense를 통한 광고 서비스 제공을 위해 쿠키가 사용될 수 있습니다.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">1.3 문의 응대</h3>
              <p className="text-foreground/80 text-sm leading-relaxed">
                문의사항 응대 및 피드백 처리를 위한 목적으로 개인정보를 처리합니다.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white dark:bg-gray-900 rounded-xl p-8 border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold mb-4">2. 개인정보의 처리 및 보유기간</h2>
          <div className="space-y-4">
            <p className="text-foreground/80 leading-relaxed">
              개인정보는 원칙적으로 개인정보의 처리목적이 달성되면 지체없이 파기합니다. 다만, 다음의 정보에 대해서는 아래의 이유로 명시한 기간 동안 보존합니다.
            </p>
            <div>
              <h3 className="font-semibold mb-2">2.1 법령에 따른 보존</h3>
              <p className="text-foreground/80 text-sm leading-relaxed">
                관련 법령에 따라 일정 기간 보존이 필요한 경우, 해당 기간 동안 보존합니다.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">2.2 쿠키 정보</h3>
              <p className="text-foreground/80 text-sm leading-relaxed">
                Google AdSense를 통한 광고 서비스를 위해 사용되는 쿠키는 Google의 개인정보 처리방침에 따라 관리됩니다.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white dark:bg-gray-900 rounded-xl p-8 border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold mb-4">3. 정보주체의 권리·의무 및 행사방법</h2>
          <p className="text-foreground/80 leading-relaxed mb-4">
            정보주체는 개인정보 열람·정정·삭제·처리정지 요구 등의 권리를 행사할 수 있습니다.
          </p>
          <div className="space-y-3">
            <div>
              <h3 className="font-semibold mb-2">3.1 권리 행사 방법</h3>
              <p className="text-foreground/80 text-sm leading-relaxed">
                개인정보 열람·정정·삭제·처리정지 요구는 아래 연락처로 요청하실 수 있습니다.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">3.2 권리 행사 기한</h3>
              <p className="text-foreground/80 text-sm leading-relaxed">
                요청 접수 후 10일 이내에 처리 결과를 통지합니다.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white dark:bg-gray-900 rounded-xl p-8 border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold mb-4">4. 처리하는 개인정보의 항목</h2>
          <div className="space-y-4">
            <p className="text-foreground/80 leading-relaxed">
              본 웹사이트는 방문자의 개인정보를 수집하지 않습니다. 다만, 다음의 경우에 한하여 정보가 수집될 수 있습니다.
            </p>
            <div>
              <h3 className="font-semibold mb-2">4.1 자동 수집 정보</h3>
              <ul className="list-disc list-inside space-y-1 text-foreground/80 text-sm ml-4">
                <li>IP 주소, 쿠키, 방문 일시, 서비스 이용 기록 등이 자동으로 수집될 수 있습니다.</li>
                <li>이러한 정보는 서비스 개선 및 통계 목적으로만 사용됩니다.</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">4.2 Google AdSense</h3>
              <p className="text-foreground/80 text-sm leading-relaxed">
                Google AdSense를 통한 광고 서비스 제공을 위해 Google의 쿠키가 사용될 수 있습니다. 
                Google의 개인정보 처리방침은{' '}
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                  Google 개인정보 처리방침
                </a>
                을 참고하시기 바랍니다.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">4.3 계산기 사용 정보</h3>
              <p className="text-foreground/80 text-sm leading-relaxed">
                모든 계산은 100% 클라이언트 사이드(브라우저)에서 이루어지며, 계산에 사용된 정보는 서버에 전송되거나 저장되지 않습니다. 
                사용자의 세금 정보는 완전히 프라이버시가 보장됩니다.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white dark:bg-gray-900 rounded-xl p-8 border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold mb-4">5. 개인정보의 파기</h2>
          <p className="text-foreground/80 leading-relaxed mb-4">
            개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체없이 해당 개인정보를 파기합니다.
          </p>
          <div className="space-y-3">
            <div>
              <h3 className="font-semibold mb-2">5.1 파기 방법</h3>
              <p className="text-foreground/80 text-sm leading-relaxed">
                전자적 파일 형태의 정보는 기록을 재생할 수 없는 기술적 방법을 사용하여 삭제합니다.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">5.2 파기 시점</h3>
              <p className="text-foreground/80 text-sm leading-relaxed">
                개인정보 보유기간의 경과 또는 처리목적 달성 후 지체없이 파기합니다.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white dark:bg-gray-900 rounded-xl p-8 border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold mb-4">6. 개인정보 보호책임자</h2>
          <p className="text-foreground/80 leading-relaxed mb-4">
            개인정보 처리에 관한 문의사항이 있으시면 아래로 연락주시기 바랍니다.
          </p>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
            <p className="text-foreground/90 mb-2">
              <strong className="text-foreground">이메일:</strong>{' '}
              <a
                href={`mailto:${siteConfig.author.email}`}
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                {siteConfig.author.email}
              </a>
            </p>
            <p className="text-sm text-foreground/60">
              일반적으로 영업일 기준 1-2일 이내에 답변드리도록 노력하고 있습니다.
            </p>
          </div>
        </section>

        <section className="bg-white dark:bg-gray-900 rounded-xl p-8 border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold mb-4">7. 개인정보 처리방침 변경</h2>
          <p className="text-foreground/80 leading-relaxed">
            본 개인정보 처리방침은 법령, 정책 또는 보안기술의 변경에 따라 내용의 추가, 삭제 및 수정이 있을 시에는 
            변경사항의 시행 7일 전부터 홈페이지의 공지사항을 통하여 고지할 것입니다.
          </p>
        </section>

        <section className="bg-yellow-50 dark:bg-yellow-950/30 rounded-xl p-8 border-2 border-yellow-200 dark:border-yellow-800">
          <h2 className="text-2xl font-bold mb-4 text-yellow-800 dark:text-yellow-200">8. 쿠키 정책</h2>
          <p className="text-foreground/90 leading-relaxed mb-4">
            본 웹사이트는 Google AdSense를 통한 광고 서비스 제공을 위해 쿠키를 사용합니다.
          </p>
          <div className="space-y-3">
            <div>
              <h3 className="font-semibold mb-2 text-yellow-800 dark:text-yellow-200">8.1 쿠키 사용 목적</h3>
              <p className="text-foreground/90 text-sm leading-relaxed">
                광고 서비스 제공, 사용자 경험 개선, 통계 수집 등을 위해 쿠키가 사용됩니다.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-yellow-800 dark:text-yellow-200">8.2 쿠키 거부</h3>
              <p className="text-foreground/90 text-sm leading-relaxed">
                쿠키 사용을 거부하실 수 있으나, 이 경우 일부 서비스 이용에 제한이 있을 수 있습니다.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
