import { VatSimpleVsGeneral } from '@/components/tools/VatSimpleVsGeneral';
import { Metadata } from 'next';
import { siteConfig } from '@/site.config';

export const metadata: Metadata = {
  title: '간이과세 vs 일반과세 비교 계산기 | 부가가치세 비교 - Biz-Wallet',
  description: '간이과세와 일반과세의 세액을 비교하여 어떤 방식이 더 유리한지 확인하세요. 매입세액 환급 계산 포함. 2025년 최신 세법 반영.',
  keywords: ['간이과세 비교', '일반과세 비교', '부가가치세 비교', '간이과세 vs 일반과세'],
  alternates: {
    canonical: `${siteConfig.url}/vat-simple-vs-general`,
  },
  openGraph: {
    title: '간이과세 vs 일반과세 비교 계산기',
    description: '어떤 부가가치세 방식이 더 유리한지 비교하세요.',
    type: 'website',
    url: `${siteConfig.url}/vat-simple-vs-general`,
  },
  twitter: {
    card: 'summary_large_image',
    title: '간이과세 vs 일반과세 비교',
    description: '어떤 방식이 더 유리한지 비교하세요.',
  },
};

export default function VatSimpleVsGeneralPage() {
  return (
    <div className="min-h-screen py-8">
      <VatSimpleVsGeneral />
    </div>
  );
}

