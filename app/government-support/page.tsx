import { GovernmentSupportMatcher } from '@/components/tools/GovernmentSupportMatcher';
import { GovernmentSupportStructuredData } from '@/components/tools/GovernmentSupportStructuredData';
import { Metadata } from 'next';
import { siteConfig } from '@/site.config';

export const metadata: Metadata = {
  title: '정부지원금 매칭 | 프리랜서 지원금 찾기 - Biz-Wallet',
  description: '정부지원금 매칭 도구로 업종과 규모에 맞는 맞춤형 정부지원금을 찾아보세요. 창업지원금, 고용지원금, 디지털 전환 지원금 등.',
  keywords: ['정부지원금 매칭', '프리랜서 지원금', '소상공인 지원금', '창업지원금', '고용지원금'],
  alternates: {
    canonical: `${siteConfig.url}/government-support`,
  },
  openGraph: {
    title: '정부지원금 매칭 | 프리랜서 지원금 찾기 - Biz-Wallet',
    description: '정부지원금 매칭 도구로 맞춤형 정부지원금을 찾아보세요.',
    type: 'website',
    url: `${siteConfig.url}/government-support`,
  },
  twitter: {
    card: 'summary_large_image',
    title: '정부지원금 매칭 | 프리랜서 지원금 찾기',
    description: '정부지원금 매칭 도구로 맞춤형 정부지원금을 찾아보세요.',
  },
};

export default function GovernmentSupportPage() {
  return (
    <>
      <GovernmentSupportStructuredData />
      <div className="min-h-screen py-8">
        <GovernmentSupportMatcher />
      </div>
    </>
  );
}

