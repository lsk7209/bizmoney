import { BusinessRegistrationComparison } from '@/components/tools/BusinessRegistrationComparison';
import { Metadata } from 'next';
import { siteConfig } from '@/site.config';

export const metadata: Metadata = {
  title: '사업자등록 vs 프리랜서 비교 계산기 | 어떤 게 유리한지 비교 - Biz-Wallet',
  description: '사업자등록과 프리랜서 활동의 세액과 실수령액을 비교하여 어떤 방식이 더 유리한지 확인하세요. 실제 경비 vs 단순경비율 비교 포함.',
  keywords: ['사업자등록 비교', '프리랜서 세금', '사업자등록 세금', '프리랜서 vs 사업자'],
  alternates: {
    canonical: `${siteConfig.url}/business-registration-comparison`,
  },
  openGraph: {
    title: '사업자등록 vs 프리랜서 비교 계산기',
    description: '어떤 방식이 더 유리한지 비교하세요.',
    type: 'website',
    url: `${siteConfig.url}/business-registration-comparison`,
  },
  twitter: {
    card: 'summary_large_image',
    title: '사업자등록 vs 프리랜서 비교',
    description: '어떤 방식이 더 유리한지 비교하세요.',
  },
};

export default function BusinessRegistrationComparisonPage() {
  return (
    <div className="min-h-screen py-8">
      <BusinessRegistrationComparison />
    </div>
  );
}

