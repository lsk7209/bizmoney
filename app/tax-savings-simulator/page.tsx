import { TaxSavingsSimulator } from '@/components/tools/TaxSavingsSimulator';
import { ToolContent } from '@/components/tools/ToolContent';
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
  const toolInfo = {
    title: '세금 절약 시뮬레이터',
    description: `세금 절약 시뮬레이터는 프리랜서와 소상공인 사장님들이 놓치기 쉬운 다양한 소득공제 및 세액공제 항목들을 한눈에 확인하고, 이를 조합했을 때 실제로 얼마의 세금을 아낄 수 있는지 계산해주는 강력한 도구입니다.

    노란우산공제, 연금저축, IRP(개인형 퇴직연금) 등 대표적인 절세 상품부터 의료비, 교육비, 기부금 등 특별세액공제 항목까지 모두 포함하여 2025년 최신 세법 기준으로 정확한 절세액을 시뮬레이션합니다.`,
    howToUse: [
      '연간 총 수입금액(매출액)을 입력합니다.',
      '부양가족 수(본인 포함)를 입력합니다.',
      '노란우산공제, 연금저축 등 가입한 절세 상품의 연간 납입액을 입력합니다.',
      '의료비, 교육비 등 지출 내역이 있다면 해당 금액을 입력합니다.',
      '"절세 효과 확인하기" 버튼을 눌러 예상 절세액을 확인합니다.',
      '다양한 조합을 시도해보며 나에게 맞는 최적의 절세 전략을 찾습니다.'
    ],
    faqs: [
      {
        question: '이 시뮬레이터의 결과는 정확한가요?',
        answer: '본 시뮬레이터는 2025년 최신 세법과 국세청 기준을 반영하여 최대한 정확한 값을 제공하려 노력했습니다. 하지만 개개인의 구체적인 상황(타 소득 유무, 중복 공제 배제 등)에 따라 실제 세액과는 차이가 있을 수 있으므로, 참고용으로 활용하시고 정확한 신고는 세무 전문가와 상담하시기 바랍니다.'
      },
      {
        question: '노란우산공제는 얼마나 공제되나요?',
        answer: '노란우산공제는 사업소득금액에 따라 공제 한도가 달라집니다. \n- 4천만원 이하: 최대 500만원\n- 4천만원 초과 ~ 1억원 이하: 최대 300만원\n- 1억원 초과: 최대 200만원\n본 시뮬레이터는 입력하신 소득에 맞춰 자동으로 한도를 적용하여 계산합니다.'
      },
      {
        question: '연금저축과 IRP는 같이 가입해야 하나요?',
        answer: '연금저축과 IRP를 합산하여 연간 최대 900만원(연금저축은 최대 600만원)까지 세액공제를 받을 수 있습니다. 여유 자금이 있다면 두 상품을 적절히 조합하여 한도를 꽉 채우는 것이 절세에 가장 효과적입니다.'
      }
    ]
  };

  return (
    <div className="min-h-screen py-8 bg-gray-50/50 dark:bg-gray-950/50">
      <div className="container mx-auto px-4">
        <TaxSavingsSimulator />
        <ToolContent {...toolInfo} />
      </div>
    </div>
  );
}

