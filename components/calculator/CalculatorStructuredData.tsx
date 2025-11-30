import { siteConfig } from '@/site.config';

export function CalculatorStructuredData() {
  const baseUrl = siteConfig.url;
  const calculatorUrl = `${baseUrl}/calculator`;

  // WebApplication 스키마
  const webApplicationSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: '프리랜서 종합소득세 계산기',
    description: '프리랜서와 소상공인을 위한 종합소득세 계산기. 단순경비율을 적용한 예상 세액을 계산합니다.',
    url: calculatorUrl,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Web Browser',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'KRW',
    },
    featureList: [
      '단순경비율 적용 세금 계산',
      '누진세율 자동 계산',
      '부양가족 공제 적용',
      'LocalStorage 자동 저장',
    ],
  };

  // SoftwareApplication 스키마
  const softwareApplicationSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Biz-Wallet 세금 계산기',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Web Browser',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'KRW',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '1',
    },
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
        name: '종합소득세 계산기',
        item: calculatorUrl,
      },
    ],
  };

  // FAQPage 스키마 (AEO 최적화 - 계산기 관련 FAQ)
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: '종합소득세 계산기는 어떻게 사용하나요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '종합소득세 계산기는 연간 총수입금액과 부양가족 수를 입력하면 자동으로 예상 세액을 계산합니다. 단순경비율을 적용하여 간편장부대상자 기준으로 계산되며, 입력값은 자동으로 저장됩니다.',
        },
      },
      {
        '@type': 'Question',
        name: '단순경비율이란 무엇인가요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '단순경비율은 실제 지출한 경비를 일일이 증빙하지 않고도 매출의 일정 비율을 경비로 인정받을 수 있는 제도입니다. 프리랜서의 경우 일반적으로 64.1%의 경비율이 적용됩니다.',
        },
      },
      {
        '@type': 'Question',
        name: '계산 결과는 정확한가요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '본 계산기는 참고용이며, 실제 세액과는 차이가 있을 수 있습니다. 정확한 세액 계산을 위해서는 홈택스에서 직접 계산하거나 세무 전문가의 도움을 받으시기 바랍니다.',
        },
      },
      {
        '@type': 'Question',
        name: '부양가족 수는 어떻게 계산하나요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '부양가족 수는 본인을 제외한 부양가족 수를 입력하시면 됩니다. 기본 공제액은 연 150만원이며, 부양가족이 많을수록 공제액이 증가하여 세액이 줄어듭니다.',
        },
      },
      {
        '@type': 'Question',
        name: '프리랜서 세금 계산 시 주의사항은 무엇인가요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '프리랜서 세금 계산 시 원천징수된 세액, 소득공제, 특별공제 등 다양한 요소가 실제 세액에 영향을 미칩니다. 본 계산기는 기본적인 계산만 제공하므로, 정확한 세액은 홈택스에서 확인하거나 세무 전문가의 도움을 받으시기 바랍니다.',
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

