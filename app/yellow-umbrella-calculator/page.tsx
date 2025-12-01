import { YellowUmbrellaCalculator } from '@/components/tools/YellowUmbrellaCalculator';
import { Metadata } from 'next';
import { siteConfig } from '@/site.config';

export const metadata: Metadata = {
  title: '노란우산공제 수익 계산기 | 절세 효과 및 수익률 계산 - Biz-Wallet',
  description: '노란우산공제 가입 시 절세 효과와 수익률을 계산하세요. 프리랜서를 위한 퇴직금 제도로 세액공제율 16.5%. 최대 500만원 납입 가능.',
  keywords: ['노란우산공제', '노란우산공제 계산기', '프리랜서 퇴직금', '세액공제 16.5%'],
  alternates: {
    canonical: `${siteConfig.url}/yellow-umbrella-calculator`,
  },
  openGraph: {
    title: '노란우산공제 수익 계산기',
    description: '절세 효과와 수익률을 계산하세요.',
    type: 'website',
    url: `${siteConfig.url}/yellow-umbrella-calculator`,
  },
  twitter: {
    card: 'summary_large_image',
    title: '노란우산공제 수익 계산기',
    description: '절세 효과를 확인하세요.',
  },
};

export default function YellowUmbrellaCalculatorPage() {
  return (
    <div className="min-h-screen py-8">
      <YellowUmbrellaCalculator />
    </div>
  );
}

