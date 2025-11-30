import { siteConfig } from '@/site.config';

export function VATStructuredData() {
  const baseUrl = siteConfig.url;
  const calculatorUrl = `${baseUrl}/vat-calculator`;

  // WebApplication 스키마
  const webApplicationSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: '부가가치세 계산기',
    description: '과세/면세/영세율을 구분하여 부가가치세를 계산하는 무료 계산기. 환급금 계산 기능 포함.',
    url: calculatorUrl,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Web Browser',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'KRW',
    },
    featureList: [
      '과세/면세/영세율 구분',
      '공급가액 자동 계산',
      '부가세액 계산',
      '환급금 계산',
    ],
  };

  // BreadcrumbList 스키마
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
        name: '부가가치세 계산기',
        item: calculatorUrl,
      },
    ],
  };

  // FAQPage 스키마
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: '부가가치세 계산기는 어떻게 사용하나요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '공급 유형(과세/면세/영세율)을 선택하고 합계금액을 입력하면 공급가액과 부가세액이 자동으로 계산됩니다. 매입세액을 입력하면 환급금도 계산할 수 있습니다.',
        },
      },
      {
        '@type': 'Question',
        name: '과세와 면세의 차이는 무엇인가요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '과세는 부가세 10%가 적용되는 일반 거래이고, 면세는 부가세가 면제되는 거래입니다. 의료비, 교육비, 도서 등이 면세 대상입니다.',
        },
      },
      {
        '@type': 'Question',
        name: '환급금은 어떻게 계산되나요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '환급금 = 매입세액 - 매출세액입니다. 매입세액이 매출세액보다 많으면 환급금을 받을 수 있고, 반대의 경우 납부액이 발생합니다.',
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

