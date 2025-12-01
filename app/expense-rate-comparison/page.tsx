import { ExpenseRateComparison } from '@/components/tools/ExpenseRateComparison';
import { Metadata } from 'next';
import { siteConfig } from '@/site.config';

export const metadata: Metadata = {
  title: '단순경비율 vs 간편장부 비교 계산기 | 어떤 신고 방식이 유리한지 비교 - Biz-Wallet',
  description: '단순경비율과 간편장부 신고 방식을 비교하여 어떤 방식이 더 유리한지 확인하세요. 실제 경비 vs 단순경비율 비교. 2025년 기준금액 7,500만원 반영.',
  keywords: ['단순경비율 비교', '간편장부 비교', '단순경비율 vs 간편장부', '신고 방식 비교'],
  alternates: {
    canonical: `${siteConfig.url}/expense-rate-comparison`,
  },
  openGraph: {
    title: '단순경비율 vs 간편장부 비교 계산기',
    description: '어떤 신고 방식이 더 유리한지 비교하세요.',
    type: 'website',
    url: `${siteConfig.url}/expense-rate-comparison`,
  },
  twitter: {
    card: 'summary_large_image',
    title: '단순경비율 vs 간편장부 비교',
    description: '어떤 방식이 더 유리한지 비교하세요.',
  },
};

export default function ExpenseRateComparisonPage() {
  return (
    <div className="min-h-screen py-8">
      <ExpenseRateComparison />
    </div>
  );
}

