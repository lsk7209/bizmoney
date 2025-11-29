import { siteConfig } from '@/site.config';

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">소개</h1>
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">우리에 대해</h2>
          <p className="text-foreground/80 mb-4">
            {siteConfig.name}은(는) 고품질의 유틸리티 도구와 정보성 콘텐츠를 제공하여 사용자들에게 실질적인 가치를 전달하는 것을 목표로 합니다.
          </p>
          <p className="text-foreground/80">
            우리는 사용자 경험을 최우선으로 생각하며, 지속 가능한 서비스 운영을 통해 장기적으로 신뢰할 수 있는 정보 제공처가 되고자 합니다.
          </p>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">서비스 목적</h2>
          <ul className="list-disc list-inside text-foreground/80 space-y-2">
            <li>실용적인 온라인 도구 제공</li>
            <li>유용한 정보와 가이드 콘텐츠 제공</li>
            <li>사용자 중심의 서비스 운영</li>
          </ul>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">연락처</h2>
          <p className="text-foreground/80">
            문의사항이 있으시면 아래로 연락주시기 바랍니다.
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
    title: `소개 - ${siteConfig.name}`,
    description: siteConfig.description,
    keywords: siteConfig.seo.defaultKeywords,
    alternates: {
      canonical: `${siteConfig.url}/about`,
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: `소개 - ${siteConfig.name}`,
      description: siteConfig.description,
      url: `${siteConfig.url}/about`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `소개 - ${siteConfig.name}`,
      description: siteConfig.description,
    },
  };
}


