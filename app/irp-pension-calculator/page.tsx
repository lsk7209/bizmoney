import { IrpPensionCalculator } from '@/components/tools/IrpPensionCalculator';
import { Metadata } from 'next';
import { siteConfig } from '@/site.config';

export const metadata: Metadata = {
  title: 'IRP/연금저축 절세 효과 계산기 | 세액공제 효과 시뮬레이션 - Biz-Wallet',
  description: 'IRP와 연금저축의 세액공제 효과를 계산하여 절세 금액을 확인하세요. 각각 최대 400만원까지 납입 가능, 세액공제율 16.5%.',
  keywords: ['IRP 계산기', '연금저축 계산기', 'IRP 절세', '연금저축 절세', '세액공제 16.5%'],
  alternates: {
    canonical: `${siteConfig.url}/irp-pension-calculator`,
  },
  openGraph: {
    title: 'IRP/연금저축 절세 효과 계산기',
    description: '절세 효과를 계산하세요.',
    type: 'website',
    url: `${siteConfig.url}/irp-pension-calculator`,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IRP/연금저축 절세 효과 계산기',
    description: '절세 효과를 확인하세요.',
  },
};

export default function IrpPensionCalculatorPage() {
  return (
    <div className="min-h-screen py-8">
      <IrpPensionCalculator />
    </div>
  );
}

