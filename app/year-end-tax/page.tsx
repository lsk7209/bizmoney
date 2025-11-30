import { YearEndTaxCalculator } from '@/components/calculator/YearEndTaxCalculator';
import { YearEndTaxStructuredData } from '@/components/calculator/YearEndTaxStructuredData';
import { Metadata } from 'next';
import { siteConfig } from '@/site.config';

export const metadata: Metadata = {
  title: '연말정산 계산기 | 환급금 계산기 - Biz-Wallet',
  description: '연말정산 계산기로 예상 환급금을 계산하세요. 원천징수세액과 소득공제, 세액공제를 반영한 정확한 계산. 100% 무료.',
  keywords: ['연말정산 계산기', '연말정산 환급금', '종합소득세 환급', '세액공제 계산', '소득공제 계산'],
  alternates: {
    canonical: `${siteConfig.url}/year-end-tax`,
  },
  openGraph: {
    title: '연말정산 계산기 | 환급금 계산기 - Biz-Wallet',
    description: '연말정산 계산기로 예상 환급금을 계산하세요. 원천징수세액과 소득공제, 세액공제를 반영한 정확한 계산.',
    type: 'website',
    url: `${siteConfig.url}/year-end-tax`,
  },
  twitter: {
    card: 'summary_large_image',
    title: '연말정산 계산기 | 환급금 계산기',
    description: '연말정산 계산기로 예상 환급금을 계산하세요.',
  },
};

export default function YearEndTaxPage() {
  return (
    <>
      <YearEndTaxStructuredData />
      <div className="min-h-screen py-8">
        <YearEndTaxCalculator />
      </div>
    </>
  );
}

