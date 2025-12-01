import { ExpenseEligibilityChecker } from '@/components/tools/ExpenseEligibilityChecker';
import { Metadata } from 'next';
import { siteConfig } from '@/site.config';

export const metadata: Metadata = {
  title: '경비 인정 가능 여부 체크리스트 | 업무 지출 경비 인정 확인 - Biz-Wallet',
  description: '업무 관련 지출의 경비 인정 여부를 확인하고 절세 팁을 알아보세요. 사무실 임대료, 통신비, 교통비, 장비 구매 등 다양한 경비 항목 체크리스트.',
  keywords: ['경비 인정', '경비 체크리스트', '업무 경비', '세금 경비', '경비 증빙'],
  alternates: {
    canonical: `${siteConfig.url}/expense-eligibility-checker`,
  },
  openGraph: {
    title: '경비 인정 가능 여부 체크리스트',
    description: '경비 인정 여부를 확인하고 절세 팁을 알아보세요.',
    type: 'website',
    url: `${siteConfig.url}/expense-eligibility-checker`,
  },
  twitter: {
    card: 'summary_large_image',
    title: '경비 인정 가능 여부 체크리스트',
    description: '경비 인정 여부를 확인하세요.',
  },
};

export default function ExpenseEligibilityCheckerPage() {
  return (
    <div className="min-h-screen py-8">
      <ExpenseEligibilityChecker />
    </div>
  );
}

