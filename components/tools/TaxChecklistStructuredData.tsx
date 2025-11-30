import { siteConfig } from '@/site.config';

export function TaxChecklistStructuredData() {
  const baseUrl = siteConfig.url;
  const toolUrl = `${baseUrl}/tax-checklist`;

  const webApplicationSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: '세금 신고 체크리스트',
    description: '세금 신고 전 준비사항을 체계적으로 관리하는 무료 체크리스트 도구.',
    url: toolUrl,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Web Browser',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'KRW',
    },
    featureList: [
      '필수 항목 체크',
      '선택 항목 체크',
      '진행률 표시',
      'PDF 다운로드',
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
        name: '세금 신고 체크리스트',
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
        name: '세금 신고 체크리스트는 어떻게 사용하나요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '각 항목을 확인하며 체크하세요. 필수 항목은 반드시 준비하고, 중요 항목은 세금 절감을 위해 준비하세요. 체크리스트를 PDF로 다운로드하여 인쇄할 수도 있습니다.',
        },
      },
      {
        '@type': 'Question',
        name: '필수 항목과 선택 항목의 차이는 무엇인가요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '필수 항목은 세금 신고에 반드시 필요한 서류이고, 선택 항목은 장부기장을 사용하는 경우 필요한 경비 증빙입니다. 중요 항목은 세금 절감을 위해 준비하면 좋은 공제 증빙입니다.',
        },
      },
      {
        '@type': 'Question',
        name: '체크리스트를 다운로드할 수 있나요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '네, 체크리스트를 PDF 형식으로 다운로드할 수 있습니다. 다운로드 버튼을 클릭하면 현재 체크 상태가 포함된 체크리스트가 다운로드됩니다.',
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

