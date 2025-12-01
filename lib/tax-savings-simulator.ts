/**
 * 세금 절약 시뮬레이터 로직
 * 다양한 공제 항목 조합으로 최대 절세 효과 시뮬레이션
 */

export interface TaxSavingsInput {
  annualIncome: number;
  dependents: number;
  // 공제 항목
  yellowUmbrella: number; // 노란우산공제 (최대 500만원)
  irp: number; // IRP (최대 400만원)
  pensionSavings: number; // 연금저축 (최대 400만원)
  housingFund: number; // 주택자금 (최대 300만원)
  creditCard: number; // 신용카드 사용액 (최대 300만원)
  insurancePremium: number; // 보험료
  medicalExpenses: number; // 의료비
  educationExpenses: number; // 교육비
  donationAmount: number; // 기부금
}

export interface TaxSavingsOutput {
  // 기본 세액 (공제 없음)
  baseTax: number;
  // 공제 적용 후 세액
  finalTax: number;
  // 절세액
  savings: number;
  // 절세율
  savingsRate: number;
  // 상세 내역
  details: {
    incomeDeduction: number; // 소득공제액
    taxCredit: number; // 세액공제액
    breakdown: Array<{
      name: string;
      amount: number;
      type: 'income' | 'tax';
      savings: number;
    }>;
  };
}

const BASIC_DEDUCTION = 1500000; // 기본공제 150만원
const TAX_BRACKETS = [
  { min: 0, max: 12000000, rate: 0.06, deduction: 0 },
  { min: 12000000, max: 46000000, rate: 0.15, deduction: 1080000 },
  { min: 46000000, max: 88000000, rate: 0.24, deduction: 5220000 },
  { min: 88000000, max: Infinity, rate: 0.35, deduction: 14900000 },
];

// 세액공제율
const TAX_CREDIT_RATES = {
  yellowUmbrella: 0.165, // 16.5%
  irp: 0.165, // 16.5%
  pensionSavings: 0.165, // 16.5%
  housingFund: 0.40, // 40%
  creditCard: 0.15, // 15% (소득공제)
};

// 한도
const LIMITS = {
  yellowUmbrella: 5000000,
  irp: 4000000,
  pensionSavings: 4000000,
  housingFund: 3000000,
  creditCard: 3000000,
};

function calculateBaseTax(income: number, dependents: number): number {
  const expenseRate = 0.641; // 단순경비율 64.1%
  const taxableIncome = income * (1 - expenseRate);
  const basicDeduction = BASIC_DEDUCTION * (1 + dependents);
  const taxableBase = Math.max(0, taxableIncome - basicDeduction);
  
  const bracket = TAX_BRACKETS.find(b => taxableBase >= b.min && taxableBase < b.max) || TAX_BRACKETS[TAX_BRACKETS.length - 1];
  const tax = taxableBase * bracket.rate - bracket.deduction;
  const localTax = tax * 0.1;
  
  return Math.max(0, tax + localTax);
}

export function calculateTaxSavings(input: TaxSavingsInput): TaxSavingsOutput {
  // 기본 세액 계산
  const baseTax = calculateBaseTax(input.annualIncome, input.dependents);
  
  // 소득공제액 계산
  const incomeDeductions = {
    creditCard: Math.min(input.creditCard, LIMITS.creditCard) * 0.15, // 신용카드는 소득공제
    insurancePremium: input.insurancePremium,
    medicalExpenses: input.medicalExpenses,
    educationExpenses: input.educationExpenses,
    donationAmount: input.donationAmount,
  };
  
  const totalIncomeDeduction = Object.values(incomeDeductions).reduce((sum, val) => sum + val, 0);
  
  // 세액공제액 계산
  const taxCredits = {
    yellowUmbrella: Math.min(input.yellowUmbrella, LIMITS.yellowUmbrella) * TAX_CREDIT_RATES.yellowUmbrella,
    irp: Math.min(input.irp, LIMITS.irp) * TAX_CREDIT_RATES.irp,
    pensionSavings: Math.min(input.pensionSavings, LIMITS.pensionSavings) * TAX_CREDIT_RATES.pensionSavings,
    housingFund: Math.min(input.housingFund, LIMITS.housingFund) * TAX_CREDIT_RATES.housingFund,
  };
  
  const totalTaxCredit = Object.values(taxCredits).reduce((sum, val) => sum + val, 0);
  
  // 소득공제 적용 후 세액 재계산
  const expenseRate = 0.641;
  const taxableIncome = input.annualIncome * (1 - expenseRate);
  const basicDeduction = BASIC_DEDUCTION * (1 + input.dependents);
  const adjustedTaxableBase = Math.max(0, taxableIncome - basicDeduction - totalIncomeDeduction);
  
  const bracket = TAX_BRACKETS.find(b => adjustedTaxableBase >= b.min && adjustedTaxableBase < b.max) || TAX_BRACKETS[TAX_BRACKETS.length - 1];
  const adjustedTax = adjustedTaxableBase * bracket.rate - bracket.deduction;
  const adjustedLocalTax = adjustedTax * 0.1;
  const taxAfterIncomeDeduction = Math.max(0, adjustedTax + adjustedLocalTax);
  
  // 세액공제 적용
  const finalTax = Math.max(0, taxAfterIncomeDeduction - totalTaxCredit);
  
  const savings = baseTax - finalTax;
  const savingsRate = baseTax > 0 ? (savings / baseTax) * 100 : 0;
  
  // 상세 내역
  const breakdown = [
    { name: '노란우산공제', amount: Math.min(input.yellowUmbrella, LIMITS.yellowUmbrella), type: 'tax' as const, savings: taxCredits.yellowUmbrella },
    { name: 'IRP', amount: Math.min(input.irp, LIMITS.irp), type: 'tax' as const, savings: taxCredits.irp },
    { name: '연금저축', amount: Math.min(input.pensionSavings, LIMITS.pensionSavings), type: 'tax' as const, savings: taxCredits.pensionSavings },
    { name: '주택자금', amount: Math.min(input.housingFund, LIMITS.housingFund), type: 'tax' as const, savings: taxCredits.housingFund },
    { name: '신용카드 사용액', amount: Math.min(input.creditCard, LIMITS.creditCard), type: 'income' as const, savings: incomeDeductions.creditCard * 0.15 },
    { name: '보험료', amount: input.insurancePremium, type: 'income' as const, savings: incomeDeductions.insurancePremium * 0.15 },
    { name: '의료비', amount: input.medicalExpenses, type: 'income' as const, savings: incomeDeductions.medicalExpenses * 0.15 },
    { name: '교육비', amount: input.educationExpenses, type: 'income' as const, savings: incomeDeductions.educationExpenses * 0.15 },
    { name: '기부금', amount: input.donationAmount, type: 'income' as const, savings: incomeDeductions.donationAmount * 0.15 },
  ].filter(item => item.amount > 0);
  
  return {
    baseTax,
    finalTax,
    savings,
    savingsRate,
    details: {
      incomeDeduction: totalIncomeDeduction,
      taxCredit: totalTaxCredit,
      breakdown,
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

