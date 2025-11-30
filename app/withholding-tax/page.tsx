import { WithholdingTaxCalculator } from '@/components/calculator/WithholdingTaxCalculator';
import { WithholdingTaxStructuredData } from '@/components/calculator/WithholdingTaxStructuredData';
import { Metadata } from 'next';
import { siteConfig } from '@/site.config';

export const metadata: Metadata = {
  title: '원천징수세 계산기 | 프리랜서 원천징수 계산 - Biz-Wallet',
  description: '원천징수세 계산기로 계약금액에서 원천징수될 세액과 실수령액을 계산하세요. 프리랜서 필수 계산기. 100% 무료.',
  keywords: ['원천징수 계산기', '프리랜서 원천징수', '원천징수세 계산', '실수령액 계산', '계약금액 계산'],
  alternates: {
    canonical: `${siteConfig.url}/withholding-tax`,
  },
  openGraph: {
    title: '원천징수세 계산기 | 프리랜서 원천징수 계산 - Biz-Wallet',
    description: '원천징수세 계산기로 계약금액에서 원천징수될 세액과 실수령액을 계산하세요.',
    type: 'website',
    url: `${siteConfig.url}/withholding-tax`,
  },
  twitter: {
    card: 'summary_large_image',
    title: '원천징수세 계산기 | 프리랜서 원천징수 계산',
    description: '원천징수세 계산기로 실수령액을 계산하세요.',
  },
};

export default function WithholdingTaxPage() {
  return (
    <>
      <WithholdingTaxStructuredData />
      <div className="min-h-screen py-8">
        <WithholdingTaxCalculator />
      </div>
    </>
  );
}

