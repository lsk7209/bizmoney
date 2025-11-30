import { TaxCalculator } from '@/components/calculator/TaxCalculator';
import { CalculatorStructuredData } from '@/components/calculator/CalculatorStructuredData';
import { Metadata } from 'next';
import { siteConfig } from '@/site.config';

export const metadata: Metadata = {
  title: '종합소득세 계산기 | 프리랜서 세금 계산기 - Biz-Wallet',
  description: '종합소득세 계산기로 프리랜서와 소상공인 세금을 계산하세요. 단순경비율 적용 예상 세액 계산, 환급금 조회 가능.',
  keywords: ['종합소득세 계산기', '프리랜서 세금', '소상공인 세금', '세금 계산', '환급금 계산', '단순경비율'],
  alternates: {
    canonical: `${siteConfig.url}/calculator`,
  },
  openGraph: {
    title: '종합소득세 계산기 | 프리랜서 세금 계산기 - Biz-Wallet',
    description: '종합소득세 계산기로 프리랜서와 소상공인 세금을 계산하세요. 단순경비율 적용 예상 세액 계산, 환급금 조회 가능.',
    type: 'website',
    url: `${siteConfig.url}/calculator`,
  },
  twitter: {
    card: 'summary_large_image',
    title: '종합소득세 계산기 | 프리랜서 세금 계산기',
    description: '종합소득세 계산기로 프리랜서와 소상공인 세금을 계산하세요.',
  },
};

export default function CalculatorPage() {
  return (
    <>
      <CalculatorStructuredData />
      <div className="min-h-screen py-8">
        <TaxCalculator />
      </div>
    </>
  );
}

