import { TaxSavingsSimulator } from '@/components/tools/TaxSavingsSimulator';
import { Metadata } from 'next';
import { siteConfig } from '@/site.config';

export const metadata: Metadata = {
  title: '세금 절약 시뮬레이터 | 다양한 공제 조합으로 최대 절세 - Biz-Wallet',
  description: '세금 절약 시뮬레이터로 노란우산공제, IRP, 연금저축, 주택자금 등 다양한 공제 항목을 조합하여 최대 절세 효과를 시뮬레이션하세요. 2025년 최신 세법 반영.',
  keywords: ['세금 절약 시뮬레이터', '절세 시뮬레이션', '세액공제 조합', '소득공제 조합', '최대 절세'],
  alternates: {
    canonical: `${siteConfig.url}/tax-savings-simulator`,
  },
  openGraph: {
    title: '세금 절약 시뮬레이터 | 최대 절세 효과 시뮬레이션',
    description: '다양한 공제 항목을 조합하여 최대 절세 효과를 시뮬레이션하세요.',
    type: 'website',
    url: `${siteConfig.url}/tax-savings-simulator`,
  },
  twitter: {
    card: 'summary_large_image',
    title: '세금 절약 시뮬레이터',
    description: '최대 절세 효과를 시뮬레이션하세요.',
  },
};

export default function TaxSavingsSimulatorPage() {
  return (
    <div className="min-h-screen py-8">
      <TaxSavingsSimulator />
    </div>
  );
}

