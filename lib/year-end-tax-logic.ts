/**
 * 연말정산 계산 로직
 * 
 * 계산 공식:
 * 1. 종합소득금액 = 급여 + 기타소득 - 소득공제
 * 2. 과세표준 = 종합소득금액 - 기본공제 - 부양가족공제 - 추가공제
 * 3. 산출세액 = 과세표준 * 세율 - 누진공제
 * 4. 결정세액 = 산출세액 - 세액공제
 * 5. 환급금(추가납부) = 원천징수세액 - 결정세액
 */

export interface YearEndTaxInput {
  annualSalary: number; // 연봉 (원천징수 전)
  withholdingTax: number; // 원천징수세액
  dependents: number; // 부양가족 수
  // 소득공제
  insurancePremium?: number; // 보험료
  medicalExpenses?: number; // 의료비
  educationExpenses?: number; // 교육비
  donationAmount?: number; // 기부금
  // 세액공제
  retirementSavings?: number; // 퇴직연금
  housingFund?: number; // 주택자금
  creditCard?: number; // 신용카드 사용액
}

export interface YearEndTaxOutput {
  totalIncome: number; // 종합소득금액
  taxableBase: number; // 과세표준
  calculatedTax: number; // 산출세액
  finalTax: number; // 결정세액
  refundAmount: number; // 환급금 (음수일 경우 추가납부)
  withholdingTax: number; // 원천징수세액
}

const BASIC_DEDUCTION = 1500000; // 기본공제 150만원
const DEPENDENT_DEDUCTION = 1500000; // 부양가족 공제 150만원
const TAX_BRACKETS = [
  { minIncome: 0, maxIncome: 12000000, rate: 0.06, deduction: 0 },
  { minIncome: 12000000, maxIncome: 46000000, rate: 0.15, deduction: 1080000 },
  { minIncome: 46000000, maxIncome: 88000000, rate: 0.24, deduction: 5220000 },
  { minIncome: 88000000, maxIncome: 150000000, rate: 0.35, deduction: 14900000 },
  { minIncome: 150000000, maxIncome: 300000000, rate: 0.38, deduction: 19400000 },
  { minIncome: 300000000, maxIncome: 500000000, rate: 0.40, deduction: 25400000 },
  { minIncome: 500000000, maxIncome: 1000000000, rate: 0.42, deduction: 35400000 },
  { minIncome: 1000000000, maxIncome: Infinity, rate: 0.45, deduction: 65400000 },
];

/**
 * 과세표준에 맞는 세율 구간 찾기
 */
function findTaxBracket(taxableBase: number) {
  return TAX_BRACKETS.find(
    (bracket) =>
      taxableBase >= bracket.minIncome && taxableBase < bracket.maxIncome
  ) || TAX_BRACKETS[TAX_BRACKETS.length - 1];
}

/**
 * 연말정산 계산
 */
export function calculateYearEndTax(input: YearEndTaxInput): YearEndTaxOutput {
  const {
    annualSalary,
    withholdingTax,
    dependents,
    insurancePremium = 0,
    medicalExpenses = 0,
    educationExpenses = 0,
    donationAmount = 0,
    retirementSavings = 0,
    housingFund = 0,
    creditCard = 0,
  } = input;

  if (annualSalary < 0) {
    throw new Error('Invalid annual salary');
  }

  // 1. 소득공제 계산
  const incomeDeduction = insurancePremium + medicalExpenses + educationExpenses + donationAmount;

  // 2. 종합소득금액
  const totalIncome = Math.max(0, annualSalary - incomeDeduction);

  // 3. 기본공제 + 부양가족공제
  const basicDeduction = BASIC_DEDUCTION * (1 + dependents);

  // 4. 과세표준
  const taxableBase = Math.max(0, totalIncome - basicDeduction);

  // 5. 산출세액
  const bracket = findTaxBracket(taxableBase);
  const calculatedTax = Math.max(0, taxableBase * bracket.rate - bracket.deduction);

  // 6. 세액공제 (간소화: 각 항목별 최대 공제액 적용)
  const retirementCredit = Math.min(retirementSavings * 0.15, 200000); // 최대 20만원
  const housingCredit = Math.min(housingFund * 0.4, 300000); // 최대 30만원
  const creditCardCredit = Math.min(creditCard * 0.15, 300000); // 최대 30만원
  const totalTaxCredit = retirementCredit + housingCredit + creditCardCredit;

  // 7. 결정세액
  const finalTax = Math.max(0, calculatedTax - totalTaxCredit);

  // 8. 환급금(추가납부)
  const refundAmount = withholdingTax - finalTax;

  return {
    totalIncome: Math.round(totalIncome),
    taxableBase: Math.round(taxableBase),
    calculatedTax: Math.round(calculatedTax),
    finalTax: Math.round(finalTax),
    refundAmount: Math.round(refundAmount),
    withholdingTax,
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

