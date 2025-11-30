import { MetadataRoute } from 'next';
import { siteConfig } from '@/site.config';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
      // 검색 엔진별 최적화
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    // 중복 콘텐츠 방지를 위한 host 설정
    host: siteConfig.url,
  };
}
