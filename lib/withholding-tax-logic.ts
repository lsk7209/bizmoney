/**
 * 원천징수세 계산 로직
 * 
 * 계산 공식:
 * 1. 원천징수 대상 소득 = 계약금액
 * 2. 원천징수세액 = 원천징수 대상 소득 × 원천징수율
 * 3. 실수령액 = 계약금액 - 원천징수세액
 */

export interface WithholdingTaxInput {
  contractAmount: number; // 계약금액
  businessType: 'freelancer' | 'consulting' | 'design' | 'education' | 'other'; // 업종
  isVATIncluded: boolean; // 부가세 포함 여부
}

export interface WithholdingTaxOutput {
  contractAmount: number; // 계약금액
  vatAmount: number; // 부가세액 (부가세 포함인 경우)
  supplyAmount: number; // 공급가액
  withholdingTax: number; // 원천징수세액
  netAmount: number; // 실수령액
}

// 업종별 원천징수율 (2025년 기준)
const WITHHOLDING_RATES: Record<string, number> = {
  freelancer: 0.033, // 3.3% (프리랜서)
  consulting: 0.033, // 3.3% (컨설팅)
  design: 0.033, // 3.3% (디자인)
  education: 0.033, // 3.3% (교육)
  other: 0.033, // 3.3% (기타)
};

const VAT_RATE = 0.1; // 부가가치세율 10%

/**
 * 원천징수세 계산
 */
export function calculateWithholdingTax(input: WithholdingTaxInput): WithholdingTaxOutput {
  const { contractAmount, businessType, isVATIncluded } = input;

  if (contractAmount < 0) {
    throw new Error('Invalid contract amount');
  }

  const withholdingRate = WITHHOLDING_RATES[businessType] || 0.033;

  let supplyAmount = 0;
  let vatAmount = 0;
  let withholdingBase = 0;

  if (isVATIncluded) {
    // 부가세 포함인 경우
    supplyAmount = contractAmount / (1 + VAT_RATE);
    vatAmount = contractAmount - supplyAmount;
    withholdingBase = supplyAmount; // 원천징수는 공급가액 기준
  } else {
    // 부가세 별도인 경우
    supplyAmount = contractAmount;
    vatAmount = 0;
    withholdingBase = supplyAmount;
  }

  // 원천징수세액 계산
  const withholdingTax = Math.round(withholdingBase * withholdingRate);

  // 실수령액 = 계약금액 - 원천징수세액
  const netAmount = contractAmount - withholdingTax;

  return {
    contractAmount: Math.round(contractAmount),
    vatAmount: Math.round(vatAmount),
    supplyAmount: Math.round(supplyAmount),
    withholdingTax,
    netAmount: Math.round(netAmount),
  };
}

/**
 * 숫자를 원화 형식으로 포맷팅
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: 'KRW',
    maximumFractionDigits: 0,
  }).format(amount);
}

