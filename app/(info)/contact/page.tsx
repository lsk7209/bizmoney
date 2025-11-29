import { siteConfig } from '@/site.config';

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">문의하기</h1>
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">연락처 정보</h2>
          <p className="text-foreground/80 mb-4">
            {siteConfig.name}에 대한 문의사항, 제안사항, 또는 피드백이 있으시면 아래 연락처로 연락주시기 바랍니다.
          </p>
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 mb-6">
            <p className="text-foreground/80 mb-2">
              <strong className="text-foreground">이메일:</strong>{' '}
              <a
                href={`mailto:${siteConfig.author.email}`}
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                {siteConfig.author.email}
              </a>
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">문의 유형</h2>
          <ul className="list-disc list-inside space-y-2 text-foreground/80">
            <li>콘텐츠 관련 문의</li>
            <li>기술 지원 및 버그 리포트</li>
            <li>제휴 및 협업 제안</li>
            <li>광고 및 마케팅 문의</li>
            <li>기타 일반 문의</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">응답 시간</h2>
          <p className="text-foreground/80">
            일반적으로 영업일 기준 1-2일 이내에 답변드리도록 노력하고 있습니다. 
            주말 및 공휴일에는 응답이 지연될 수 있습니다.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">개인정보 보호</h2>
          <p className="text-foreground/80">
            문의 시 제공해주신 개인정보는 문의 응답 목적으로만 사용되며, 
            관련 법령에 따라 보관 후 파기됩니다. 자세한 내용은{' '}
            <a
              href="/privacy"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              개인정보 처리방침
            </a>
            을 참고해주세요.
          </p>
        </section>
      </div>
    </div>
  );
}

export function generateMetadata() {
  return {
    title: `문의하기 - ${siteConfig.name}`,
    description: `${siteConfig.name}에 대한 문의사항을 남겨주세요. 이메일을 통해 연락드립니다.`,
    keywords: siteConfig.seo.defaultKeywords,
    alternates: {
      canonical: `${siteConfig.url}/contact`,
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: `문의하기 - ${siteConfig.name}`,
      description: `${siteConfig.name}에 대한 문의사항을 남겨주세요. 이메일을 통해 연락드립니다.`,
      url: `${siteConfig.url}/contact`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `문의하기 - ${siteConfig.name}`,
      description: `${siteConfig.name}에 대한 문의사항을 남겨주세요. 이메일을 통해 연락드립니다.`,
    },
  };
}

