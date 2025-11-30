/**
 * 세금 계산 로직
 * 
 * 계산 공식:
 * 1. 소득금액 = 매출 - (매출 * 단순경비율)
 * 2. 과세표준 = 소득금액 - (기본공제 * 가족수)
 * 3. 산출세액 = 과세표준 * 세율(6%~45% 누진세) - 누진공제액
 * 4. 지방소득세 = 산출세액 * 10%
 * 5. 총 세액 = 산출세액 + 지방소득세
 */

import { TaxCalculatorInput, TaxCalculatorOutput } from '@/types/tax';
import {
  EXPENSE_RATE,
  BASIC_DEDUCTION,
  TAX_BRACKETS,
  LOCAL_TAX_RATE,
} from '@/constants/tax-rates';

/**
 * 과세표준에 맞는 세율 구간 찾기
 */
function findTaxBracket(taxableBase: number) {
  return TAX_BRACKETS.find(
    (bracket) =>
      taxableBase >= bracket.minIncome && taxableBase < bracket.maxIncome
  ) || TAX_BRACKETS[TAX_BRACKETS.length - 1]; // 마지막 구간 (최고세율)
}

/**
 * 세액 계산 (면책을 위해 ±5% 범위 적용)
 */
function calculateTaxWithRange(
  taxableBase: number
): { tax: number; min: number; max: number } {
  const bracket = findTaxBracket(taxableBase);
  const calculatedTax = taxableBase * bracket.rate - bracket.deduction;
  
  // 면책을 위한 ±5% 범위
  const range = calculatedTax * 0.05;
  
  return {
    tax: Math.max(0, calculatedTax),
    min: Math.max(0, calculatedTax - range),
    max: calculatedTax + range,
  };
}

/**
 * 세금 계산 메인 함수
 */
export function calculateTax(
  input: TaxCalculatorInput
): TaxCalculatorOutput {
  const { annualIncome, dependents } = input;
  
  // 입력값 검증
  if (annualIncome < 0 || annualIncome > 10000000000) {
    throw new Error('Invalid annual income');
  }
  if (dependents < 0 || dependents > 20) {
    throw new Error('Invalid dependents count');
  }
  
  // 1. 소득금액 계산
  const expenseAmount = annualIncome * EXPENSE_RATE;
  const incomeAmount = annualIncome - expenseAmount;
  
  // 2. 과세표준 계산
  const totalDeduction = BASIC_DEDUCTION * (1 + dependents); // 본인 + 부양가족
  const taxableBase = Math.max(0, incomeAmount - totalDeduction);
  
  // 3. 산출세액 계산 (범위 포함)
  const { tax: calculatedTax, min: taxMin, max: taxMax } =
    calculateTaxWithRange(taxableBase);
  
  // 4. 지방소득세 계산
  const localTax = calculatedTax * LOCAL_TAX_RATE;
  const localTaxMin = taxMin * LOCAL_TAX_RATE;
  const localTaxMax = taxMax * LOCAL_TAX_RATE;
  
  // 5. 총 세액 계산
  const totalTax = calculatedTax + localTax;
  const totalTaxMin = taxMin + localTaxMin;
  const totalTaxMax = taxMax + localTaxMax;
  
  // 6. 환급액 계산 (음수일 경우 납부액)
  // 실제로는 원천징수된 세액과 비교해야 하지만, MVP에서는 0으로 가정
  const refundAmount = -totalTax; // 음수 = 납부해야 할 세액
  const refundAmountMin = -totalTaxMax;
  const refundAmountMax = -totalTaxMin;
  
  // 소득금액 범위 (±3%)
  const incomeRange = incomeAmount * 0.03;
  
  return {
    incomeAmount,
    taxableBase,
    calculatedTax,
    localTax,
    totalTax,
    refundAmount,
    incomeAmountRange: {
      min: Math.max(0, incomeAmount - incomeRange),
      max: incomeAmount + incomeRange,
    },
    calculatedTaxRange: {
      min: taxMin,
      max: taxMax,
    },
    localTaxRange: {
      min: localTaxMin,
      max: localTaxMax,
    },
    totalTaxRange: {
      min: totalTaxMin,
      max: totalTaxMax,
    },
    refundAmountRange: {
      min: refundAmountMin,
      max: refundAmountMax,
    },
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

/**
 * 범위를 문자열로 포맷팅 (면책 조항용)
 */
export function formatRange(min: number, max: number): string {
  const minFormatted = formatCurrency(min);
  const maxFormatted = formatCurrency(max);
  return `약 ${minFormatted} ~ ${maxFormatted}`;
}

