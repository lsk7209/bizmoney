// Vercel 배포 시 환경 변수 검증
const getSiteUrl = (): string => {
  const url = process.env.NEXT_PUBLIC_SITE_URL;
  
  // NEXT_PUBLIC_SITE_URL이 설정되어 있고 기본값이 아니면 사용
  if (url && url !== 'https://example.com') {
    return url;
  }
  
  // Vercel 배포 환경에서는 VERCEL_URL 자동 사용
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  
  // 기본값 (개발 환경)
  return url || 'https://example.com';
};

export const siteConfig = {
  name: 'Biz-Wallet (사장님의 지갑)',
  description: '프리랜서와 소상공인을 위한 세금 계산 및 정부지원금 매칭 웹 유틸리티',
  url: getSiteUrl(),
  ogImage: '/og-image.jpg',
  links: {
    twitter: '',
    github: '',
  },
  author: {
    name: 'Growth Engine',
    email: 'contact@example.com',
  },
  seo: {
    defaultTitle: 'Biz-Wallet (사장님의 지갑) - 프리랜서 세금 계산기',
    defaultDescription: '프리랜서와 소상공인을 위한 세금 계산기 및 세금 방어력 테스트. 100% 클라이언트 사이드 연산으로 개인정보를 보호합니다.',
    defaultKeywords: '프리랜서 세금, 종합소득세 계산기, 세금 계산, 환급금 계산, 소상공인 세금, 단순경비율',
  },
  blog: {
    postsPerPage: 12,
    pagination: true,
  },
  tools: {
    postsPerPage: 12,
    pagination: true,
  },
  adsense: {
    clientId: process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || '',
    enabled: !!process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID,
  },
  naver: {
    siteVerification: process.env.NEXT_PUBLIC_NAVER_SITE_VERIFICATION || '',
    pingEnabled: true,
  },
} as const;


