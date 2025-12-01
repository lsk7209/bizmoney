import { TaxSavingIdeas } from '@/components/tools/TaxSavingIdeas';
import { Metadata } from 'next';
import { siteConfig } from '@/site.config';

export const metadata: Metadata = {
  title: '세금 절약 아이디어 추천기 | 맞춤형 절세 팁 추천 - Biz-Wallet',
  description: '나의 상황에 맞는 맞춤형 절세 아이디어를 추천받고 절세 금액까지 확인하세요. 노란우산공제, IRP, 연금저축, 주택자금 등 다양한 절세 방법.',
  keywords: ['세금 절약 아이디어', '절세 팁', '맞춤형 절세', '절세 추천'],
  alternates: {
    canonical: `${siteConfig.url}/tax-saving-ideas`,
  },
  openGraph: {
    title: '세금 절약 아이디어 추천기',
    description: '맞춤형 절세 아이디어를 추천받으세요.',
    type: 'website',
    url: `${siteConfig.url}/tax-saving-ideas`,
  },
  twitter: {
    card: 'summary_large_image',
    title: '세금 절약 아이디어 추천기',
    description: '맞춤형 절세 아이디어를 확인하세요.',
  },
};

export default function TaxSavingIdeasPage() {
  return (
    <div className="min-h-screen py-8">
      <TaxSavingIdeas />
    </div>
  );
}

