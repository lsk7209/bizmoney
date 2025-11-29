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
  name: 'Growth Engine Starter',
  description: '고성능 한국어 웹사이트를 위한 자동 블로깅 시스템',
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
    defaultTitle: 'Growth Engine Starter',
    defaultDescription: '고성능 한국어 웹사이트를 위한 자동 블로깅 시스템',
    defaultKeywords: '블로그, 유틸리티, 도구',
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


