import { siteConfig } from '@/site.config';

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">개인정보 처리방침</h1>
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <p className="text-foreground/80 mb-4">
          최종 업데이트: {new Date().toLocaleDateString('ko-KR')}
        </p>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. 개인정보의 처리 목적</h2>
          <p className="text-foreground/80">
            {siteConfig.name}은(는) 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 개인정보 보호법 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.
          </p>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. 개인정보의 처리 및 보유기간</h2>
          <p className="text-foreground/80">
            개인정보는 원칙적으로 개인정보의 처리목적이 달성되면 지체없이 파기합니다.
          </p>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. 정보주체의 권리·의무 및 행사방법</h2>
          <p className="text-foreground/80">
            정보주체는 개인정보 열람·정정·삭제·처리정지 요구 등의 권리를 행사할 수 있습니다.
          </p>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. 처리하는 개인정보의 항목</h2>
          <p className="text-foreground/80">
            본 웹사이트는 방문자의 개인정보를 수집하지 않습니다. 다만, Google AdSense를 통한 광고 서비스 제공을 위해 쿠키가 사용될 수 있습니다.
          </p>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. 개인정보의 파기</h2>
          <p className="text-foreground/80">
            개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체없이 해당 개인정보를 파기합니다.
          </p>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. 문의처</h2>
          <p className="text-foreground/80">
            개인정보 처리에 관한 문의사항이 있으시면 아래로 연락주시기 바랍니다.
          </p>
          <p className="text-foreground/80 mt-2">
            이메일: {siteConfig.author.email}
          </p>
        </section>
      </div>
    </div>
  );
}

export function generateMetadata() {
  return {
    title: `개인정보 처리방침 - ${siteConfig.name}`,
    description: `${siteConfig.name}의 개인정보 처리방침입니다.`,
    keywords: siteConfig.seo.defaultKeywords,
    alternates: {
      canonical: `${siteConfig.url}/privacy`,
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: `개인정보 처리방침 - ${siteConfig.name}`,
      description: `${siteConfig.name}의 개인정보 처리방침입니다.`,
      url: `${siteConfig.url}/privacy`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `개인정보 처리방침 - ${siteConfig.name}`,
      description: `${siteConfig.name}의 개인정보 처리방침입니다.`,
    },
  };
}


