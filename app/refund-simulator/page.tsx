import { RefundSimulator } from '@/components/tools/RefundSimulator';
import { Metadata } from 'next';
import { siteConfig } from '@/site.config';

export const metadata: Metadata = {
  title: '환급금 예상 시뮬레이터 | 다양한 시나리오별 환급금 예상 - Biz-Wallet',
  description: '다양한 시나리오별로 예상 환급금을 계산하여 최대 환급금을 확인하세요. 원천징수세액과 공제 항목을 고려한 환급금 시뮬레이션.',
  keywords: ['환급금 시뮬레이터', '환급금 예상', '세금 환급', '환급금 계산'],
  alternates: {
    canonical: `${siteConfig.url}/refund-simulator`,
  },
  openGraph: {
    title: '환급금 예상 시뮬레이터',
    description: '다양한 시나리오별 환급금을 확인하세요.',
    type: 'website',
    url: `${siteConfig.url}/refund-simulator`,
  },
  twitter: {
    card: 'summary_large_image',
    title: '환급금 예상 시뮬레이터',
    description: '환급금을 확인하세요.',
  },
};

export default function RefundSimulatorPage() {
  return (
    <div className="min-h-screen py-8">
      <RefundSimulator />
    </div>
  );
}

