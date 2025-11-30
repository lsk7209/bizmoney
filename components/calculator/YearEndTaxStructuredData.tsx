import { siteConfig } from '@/site.config';

export function YearEndTaxStructuredData() {
  const baseUrl = siteConfig.url;
  const calculatorUrl = `${baseUrl}/year-end-tax`;

  const webApplicationSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: '연말정산 계산기',
    description: '연말정산 환급금을 계산하는 무료 계산기. 소득공제와 세액공제를 반영한 정확한 계산.',
    url: calculatorUrl,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Web Browser',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'KRW',
    },
    featureList: [
      '연말정산 환급금 계산',
      '소득공제 반영',
      '세액공제 반영',
      '원천징수세액 비교',
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
        name: '연말정산 계산기',
        item: calculatorUrl,
      },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: '연말정산 계산기는 어떻게 사용하나요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '연봉과 원천징수세액을 입력하고, 소득공제와 세액공제 항목을 입력하면 예상 환급금이 자동으로 계산됩니다.',
        },
      },
      {
        '@type': 'Question',
        name: '소득공제와 세액공제의 차이는 무엇인가요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '소득공제는 소득금액에서 차감되어 과세표준을 낮추고, 세액공제는 산출세액에서 직접 차감됩니다. 세액공제가 더 유리한 경우가 많습니다.',
        },
      },
      {
        '@type': 'Question',
        name: '환급금은 언제 받을 수 있나요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '연말정산 신고 후 약 2-3주 후에 환급금이 입금됩니다. 홈택스에서 신고 일정을 확인하세요.',
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

