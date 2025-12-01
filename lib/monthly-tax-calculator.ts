/**
 * 월별 세금 납부액 계산기 로직
 */

export interface MonthlyTaxInput {
  monthlyIncome: number;
  months: number; // 계산할 월 수
  dependents: number;
}

export interface MonthlyTaxOutput {
  monthly: Array<{
    month: number;
    cumulativeIncome: number;
    tax: number;
    cumulativeTax: number;
  }>;
  total: {
    income: number;
    tax: number;
    averageMonthlyTax: number;
  };
}

const EXPENSE_RATE = 0.641;
const BASIC_DEDUCTION = 1500000;
const TAX_BRACKETS = [
  { min: 0, max: 12000000, rate: 0.06, deduction: 0 },
  { min: 12000000, max: 46000000, rate: 0.15, deduction: 1080000 },
  { min: 46000000, max: 88000000, rate: 0.24, deduction: 5220000 },
  { min: 88000000, max: Infinity, rate: 0.35, deduction: 14900000 },
];

function calculateTax(cumulativeIncome: number, dependents: number): number {
  const expenses = cumulativeIncome * EXPENSE_RATE;
  const taxableIncome = cumulativeIncome - expenses;
  const basicDeduction = BASIC_DEDUCTION * (1 + dependents);
  const taxableBase = Math.max(0, taxableIncome - basicDeduction);
  
  const bracket = TAX_BRACKETS.find(b => taxableBase >= b.min && taxableBase < b.max) || TAX_BRACKETS[TAX_BRACKETS.length - 1];
  const tax = taxableBase * bracket.rate - bracket.deduction;
  const localTax = tax * 0.1;
  
  return Math.max(0, tax + localTax);
}

export function calculateMonthlyTax(input: MonthlyTaxInput): MonthlyTaxOutput {
  const monthly: MonthlyTaxOutput['monthly'] = [];
  let cumulativeIncome = 0;
  let cumulativeTax = 0;
  
  for (let month = 1; month <= input.months; month++) {
    cumulativeIncome += input.monthlyIncome;
    const tax = calculateTax(cumulativeIncome, input.dependents);
    const monthlyTax = tax - cumulativeTax;
    cumulativeTax = tax;
    
    monthly.push({
      month,
      cumulativeIncome,
      tax: monthlyTax,
      cumulativeTax,
    });
  }
  
  return {
    monthly,
    total: {
      income: cumulativeIncome,
      tax: cumulativeTax,
      averageMonthlyTax: cumulativeTax / input.months,
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

