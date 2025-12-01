import type { Metadata } from 'next';
import './globals.css';
import { ConditionalHeaderFooter } from '@/components/layout/ConditionalHeaderFooter';
import { GoogleAdSense } from '@/components/growth-engine/GoogleAdSense';
import { CustomBodyStartScripts, CustomBodyEndScripts } from '@/components/layout/CustomScripts';
import { siteConfig } from '@/site.config';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.seo.defaultTitle,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.seo.defaultDescription,
  keywords: siteConfig.seo.defaultKeywords,
  authors: [
    {
      name: siteConfig.author.name,
      url: siteConfig.url,
    },
  ],
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: siteConfig.url,
    title: siteConfig.seo.defaultTitle,
    description: siteConfig.seo.defaultDescription,
    siteName: siteConfig.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.seo.defaultTitle,
    description: siteConfig.seo.defaultDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'noimageindex': false,
    },
    // 중복 콘텐츠 방지
    'noarchive': false,
    'nosnippet': false,
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    other: {
      'naver-site-verification': siteConfig.naver.siteVerification,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="min-h-screen flex flex-col font-pretendard">
        <CustomBodyStartScripts />
        {siteConfig.adsense.enabled && <GoogleAdSense />}
        <ConditionalHeaderFooter>{children}</ConditionalHeaderFooter>
        <CustomBodyEndScripts />
      </body>
    </html>
  );
}
