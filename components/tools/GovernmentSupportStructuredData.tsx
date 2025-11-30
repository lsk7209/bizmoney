import { siteConfig } from '@/site.config';

export function GovernmentSupportStructuredData() {
  const baseUrl = siteConfig.url;
  const toolUrl = `${baseUrl}/government-support`;

  const webApplicationSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: '정부지원금 매칭 도구',
    description: '업종과 규모에 맞는 맞춤형 정부지원금을 찾는 무료 도구.',
    url: toolUrl,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Web Browser',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'KRW',
    },
    featureList: [
      '업종별 지원금 매칭',
      '규모별 지원금 매칭',
      '지역별 지원금 매칭',
      '신청 링크 제공',
    ],
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: '홈',
        item: baseUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: '정부지원금 매칭',
        item: toolUrl,
      },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: '정부지원금 매칭 도구는 어떻게 사용하나요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '업종, 사업 규모, 지역을 입력하면 조건에 맞는 정부지원금이 자동으로 추천됩니다. 각 지원금의 신청 자격과 마감일을 확인하고 신청할 수 있습니다.',
        },
      },
      {
        '@type': 'Question',
        name: '프리랜서도 정부지원금을 받을 수 있나요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '네, 프리랜서도 조건에 맞는 정부지원금을 받을 수 있습니다. 창업지원금, 고용지원금, 디지털 전환 지원금 등 다양한 지원금이 있습니다.',
        },
      },
      {
        '@type': 'Question',
        name: '지원금 정보는 언제 업데이트되나요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '지원금 정보는 수시로 변경될 수 있습니다. 최신 정보는 각 기관 공식 사이트를 확인하시기 바랍니다.',
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webApplicationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
    </>
  );
}

