import { MonthlyTaxCalculator } from '@/components/tools/MonthlyTaxCalculator';
import { Metadata } from 'next';
import { siteConfig } from '@/site.config';

export const metadata: Metadata = {
  title: '월별 세금 납부액 계산기 | 월별 소득에 따른 세금 계산 - Biz-Wallet',
  description: '월별 소득에 따른 누적 세액을 계산하여 월별 납부액을 확인하세요. 누진세율을 고려한 월별 세금 계산기.',
  keywords: ['월별 세금', '월별 납부액', '누적 세액', '월 소득 세금'],
  alternates: {
    canonical: `${siteConfig.url}/monthly-tax-calculator`,
  },
  openGraph: {
    title: '월별 세금 납부액 계산기',
    description: '월별 납부액을 확인하세요.',
    type: 'website',
    url: `${siteConfig.url}/monthly-tax-calculator`,
  },
  twitter: {
    card: 'summary_large_image',
    title: '월별 세금 납부액 계산기',
    description: '월별 납부액을 확인하세요.',
  },
};

export default function MonthlyTaxCalculatorPage() {
  return (
    <div className="min-h-screen py-8">
      <MonthlyTaxCalculator />
    </div>
  );
}

