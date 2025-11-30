import { siteConfig } from '@/site.config';

export function QuizStructuredData() {
  const baseUrl = siteConfig.url;
  const quizUrl = `${baseUrl}/quiz`;

  // WebApplication 스키마
  const webApplicationSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: '세금 방어력 테스트',
    description: '프리랜서와 소상공인을 위한 세금 지식 테스트. 5문항으로 나의 세금 방어력을 확인해보세요!',
    url: quizUrl,
    applicationCategory: 'EducationalApplication',
    operatingSystem: 'Web Browser',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'KRW',
    },
    featureList: [
      '5문항 세금 지식 테스트',
      'OX 및 객관식 문제',
      '3단계 결과 레벨',
      '맞춤형 세금 계산기 추천',
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
        name: '세금 방어력 테스트',
        item: quizUrl,
      },
    ],
  };

  // FAQPage 스키마 (AEO 최적화)
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: '세금 방어력 테스트는 무엇인가요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '세금 방어력 테스트는 프리랜서와 소상공인을 위한 세금 기본 지식을 확인하는 5문항 퀴즈입니다. OX 문제와 객관식 문제로 구성되어 있으며, 결과에 따라 맞춤형 세금 계산기를 사용할 수 있습니다.',
        },
      },
      {
        '@type': 'Question',
        name: '세금 방어력 테스트는 어떻게 진행되나요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '세금 방어력 테스트는 총 5문항으로 구성되어 있으며, 각 문제에 답변하면 자동으로 다음 문제로 이동합니다. 모든 문제를 완료하면 세금 지식 수준에 따라 Lv.1 구멍난 지갑, Lv.2 평범한 사장님, Lv.3 철벽 방어 중 하나의 결과를 받게 됩니다.',
        },
      },
      {
        '@type': 'Question',
        name: '테스트 결과는 어떻게 활용하나요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '테스트 결과에 따라 세금 지식 수준을 확인하고, "내 진짜 환급금 조회하기" 버튼을 통해 종합소득세 계산기로 이동하여 실제 세액을 계산할 수 있습니다. 결과에 따라 맞춤형 세금 절감 팁도 제공됩니다.',
        },
      },
      {
        '@type': 'Question',
        name: '세금 방어력 테스트는 무료인가요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '네, 세금 방어력 테스트는 완전 무료입니다. 별도의 회원가입이나 개인정보 입력 없이 바로 테스트를 시작할 수 있습니다.',
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

