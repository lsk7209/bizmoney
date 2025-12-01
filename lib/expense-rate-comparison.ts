/**
 * 단순경비율 vs 간편장부 비교 계산 로직
 */

export interface ExpenseRateComparisonInput {
  annualIncome: number;
  actualExpenses: number; // 실제 경비
  dependents: number;
}

export interface ExpenseRateComparisonOutput {
  simpleExpenseRate: {
    expenseRate: number;
    expenses: number;
    taxableIncome: number;
    tax: number;
    description: string;
  };
  simplifiedBookkeeping: {
    expenses: number;
    taxableIncome: number;
    tax: number;
    description: string;
  };
  difference: {
    taxSavings: number;
    recommendation: string;
    benefits: string[];
  };
}

const SIMPLE_EXPENSE_RATE = 0.641; // 64.1%
const BASIC_DEDUCTION = 1500000;
const TAX_BRACKETS = [
  { min: 0, max: 12000000, rate: 0.06, deduction: 0 },
  { min: 12000000, max: 46000000, rate: 0.15, deduction: 1080000 },
  { min: 46000000, max: 88000000, rate: 0.24, deduction: 5220000 },
  { min: 88000000, max: Infinity, rate: 0.35, deduction: 14900000 },
];

function calculateTax(taxableIncome: number, dependents: number): number {
  const basicDeduction = BASIC_DEDUCTION * (1 + dependents);
  const taxableBase = Math.max(0, taxableIncome - basicDeduction);
  
  const bracket = TAX_BRACKETS.find(b => taxableBase >= b.min && taxableBase < b.max) || TAX_BRACKETS[TAX_BRACKETS.length - 1];
  const tax = taxableBase * bracket.rate - bracket.deduction;
  const localTax = tax * 0.1;
  
  return Math.max(0, tax + localTax);
}

export function compareExpenseRate(input: ExpenseRateComparisonInput): ExpenseRateComparisonOutput {
  // 단순경비율
  const simpleExpenses = input.annualIncome * SIMPLE_EXPENSE_RATE;
  const simpleTaxableIncome = input.annualIncome - simpleExpenses;
  const simpleTax = calculateTax(simpleTaxableIncome, input.dependents);
  
  // 간편장부 (실제 경비)
  const actualExpenses = Math.min(input.actualExpenses, input.annualIncome);
  const bookkeepingTaxableIncome = input.annualIncome - actualExpenses;
  const bookkeepingTax = calculateTax(bookkeepingTaxableIncome, input.dependents);
  
  const taxSavings = simpleTax - bookkeepingTax;
  
  let recommendation = '';
  let benefits: string[] = [];
  
  if (taxSavings > 0) {
    recommendation = '간편장부가 더 유리해요!';
    benefits = [
      '실제 경비를 인정받아 세액 절감',
      '증빙만 잘 챙기면 간편하게 신고',
      '2025년 기준금액 7,500만원으로 상향',
    ];
  } else {
    recommendation = '단순경비율이 더 간편해요!';
    benefits = [
      '증빙 없이 간편하게 신고',
      '경비 계산이 자동으로',
      '초기 사업자에게 유리',
    ];
  }
  
  return {
    simpleExpenseRate: {
      expenseRate: SIMPLE_EXPENSE_RATE,
      expenses: simpleExpenses,
      taxableIncome: simpleTaxableIncome,
      tax: simpleTax,
      description: '증빙 없이 매출의 64.1%를 경비로 인정',
    },
    simplifiedBookkeeping: {
      expenses: actualExpenses,
      taxableIncome: bookkeepingTaxableIncome,
      tax: bookkeepingTax,
      description: '실제 경비를 증빙과 함께 인정받음',
    },
    difference: {
      taxSavings,
      recommendation,
      benefits,
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

