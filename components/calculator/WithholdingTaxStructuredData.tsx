import { siteConfig } from '@/site.config';

export function WithholdingTaxStructuredData() {
  const baseUrl = siteConfig.url;
  const calculatorUrl = `${baseUrl}/withholding-tax`;

  const webApplicationSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: '원천징수세 계산기',
    description: '프리랜서 계약금액에서 원천징수될 세액과 실수령액을 계산하는 무료 계산기.',
    url: calculatorUrl,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Web Browser',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'KRW',
    },
    featureList: [
      '원천징수세액 계산',
      '실수령액 계산',
      '부가세 포함/별도 구분',
      '업종별 원천징수율 적용',
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
        name: '원천징수세 계산기',
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
        name: '원천징수세는 무엇인가요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '원천징수세는 프리랜서가 계약금액을 받을 때 의뢰인이 미리 징수하는 세금입니다. 일반적으로 3.3%의 원천징수율이 적용됩니다.',
        },
      },
      {
        '@type': 'Question',
        name: '실수령액은 어떻게 계산되나요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '실수령액 = 계약금액 - 원천징수세액입니다. 부가세 포함 계약의 경우 부가세를 제외한 공급가액 기준으로 원천징수세가 계산됩니다.',
        },
      },
      {
        '@type': 'Question',
        name: '원천징수세는 나중에 환급받을 수 있나요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '네, 연말정산 시 실제 세액과 원천징수세액을 비교하여 정산됩니다. 원천징수세액이 실제 세액보다 많으면 환급받을 수 있습니다.',
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

