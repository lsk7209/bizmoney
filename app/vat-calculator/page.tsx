import { VATCalculator } from '@/components/calculator/VATCalculator';
import { VATStructuredData } from '@/components/calculator/VATStructuredData';
import { Metadata } from 'next';
import { siteConfig } from '@/site.config';

export const metadata: Metadata = {
  title: '부가가치세 계산기 | VAT 계산기 - Biz-Wallet',
  description: '부가가치세 계산기로 과세/면세/영세율을 구분하여 공급가액과 부가세를 계산하고 환급금을 확인하세요. 100% 무료, 개인정보 보호.',
  keywords: ['부가가치세 계산기', 'VAT 계산기', '부가세 계산', '환급금 계산', '공급가액 계산'],
  alternates: {
    canonical: `${siteConfig.url}/vat-calculator`,
  },
  openGraph: {
    title: '부가가치세 계산기 | VAT 계산기 - Biz-Wallet',
    description: '부가가치세 계산기로 과세/면세/영세율을 구분하여 공급가액과 부가세를 계산하고 환급금을 확인하세요.',
    type: 'website',
    url: `${siteConfig.url}/vat-calculator`,
  },
  twitter: {
    card: 'summary_large_image',
    title: '부가가치세 계산기 | VAT 계산기',
    description: '부가가치세 계산기로 공급가액과 부가세를 계산하세요.',
  },
};

export default function VATCalculatorPage() {
  return (
    <>
      <VATStructuredData />
      <div className="min-h-screen py-8">
        <VATCalculator />
      </div>
    </>
  );
}

