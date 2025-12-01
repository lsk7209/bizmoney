/**
 * 노란우산공제 수익 계산기 로직
 */

export interface YellowUmbrellaInput {
  annualIncome: number;
  contribution: number; // 납입금액 (최대 500만원)
  years: number; // 가입 기간
}

export interface YellowUmbrellaOutput {
  annualTaxSavings: number; // 연간 절세액
  totalTaxSavings: number; // 총 절세액 (기간 동안)
  totalContribution: number; // 총 납입금액
  netBenefit: number; // 순이익 (총 절세액 - 총 납입금액)
  returnRate: number; // 수익률
  breakdown: {
    taxCredit: number; // 세액공제액
    contribution: number; // 납입금액
  };
}

const MAX_CONTRIBUTION = 5000000; // 최대 500만원
const TAX_CREDIT_RATE = 0.165; // 세액공제율 16.5%

export function calculateYellowUmbrella(input: YellowUmbrellaInput): YellowUmbrellaOutput {
  const contribution = Math.min(input.contribution, MAX_CONTRIBUTION);
  const annualTaxCredit = contribution * TAX_CREDIT_RATE;
  const totalContribution = contribution * input.years;
  const totalTaxSavings = annualTaxCredit * input.years;
  const netBenefit = totalTaxSavings - totalContribution;
  const returnRate = totalContribution > 0 ? (netBenefit / totalContribution) * 100 : 0;
  
  return {
    annualTaxSavings: annualTaxCredit,
    totalTaxSavings,
    totalContribution,
    netBenefit,
    returnRate,
    breakdown: {
      taxCredit: annualTaxCredit,
      contribution,
    },
  };
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: 'KRW',
    maximumFractionDigits: 0,
  }).format(amount);
}

