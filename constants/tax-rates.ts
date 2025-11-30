// 단순경비율 (업종별 상이하나 MVP는 대표값 적용)
export const EXPENSE_RATE = 0.641; // 64.1%

// 기본 공제
export const BASIC_DEDUCTION = 1500000; // 150만원

// 종합소득세 세율 (누진세)
export interface TaxBracket {
  minIncome: number;
  maxIncome: number;
  rate: number; // 세율 (소수점)
  deduction: number; // 누진공제액
}

export const TAX_BRACKETS: TaxBracket[] = [
  { minIncome: 0, maxIncome: 12000000, rate: 0.06, deduction: 0 }, // 6%
  { minIncome: 12000000, maxIncome: 46000000, rate: 0.15, deduction: 1080000 }, // 15%
  { minIncome: 46000000, maxIncome: 88000000, rate: 0.24, deduction: 5220000 }, // 24%
  { minIncome: 88000000, maxIncome: 150000000, rate: 0.35, deduction: 14900000 }, // 35%
  { minIncome: 150000000, maxIncome: 300000000, rate: 0.38, deduction: 19400000 }, // 38%
  { minIncome: 300000000, maxIncome: 500000000, rate: 0.40, deduction: 25400000 }, // 40%
  { minIncome: 500000000, maxIncome: 1000000000, rate: 0.42, deduction: 35400000 }, // 42%
  { minIncome: 1000000000, maxIncome: Infinity, rate: 0.45, deduction: 65400000 }, // 45%
];

// 지방소득세율 (소득세의 10%)
export const LOCAL_TAX_RATE = 0.1;

// 업종 코드 (간단화)
export const BUSINESS_TYPES = [
  { code: '940909', name: '프리랜서 (기타 전문서비스)' },
] as const;

