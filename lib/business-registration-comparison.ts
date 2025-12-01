/**
 * 사업자등록 vs 프리랜서 비교 계산기 로직
 */

export interface BusinessComparisonInput {
  annualIncome: number;
  actualExpenses: number; // 실제 경비
  dependents: number;
}

export interface BusinessComparisonOutput {
  freelancer: {
    tax: number;
    netIncome: number;
    description: string;
  };
  registered: {
    tax: number;
    netIncome: number;
    description: string;
  };
  difference: {
    taxSavings: number;
    recommendation: string;
    benefits: string[];
  };
}

const EXPENSE_RATE = 0.641; // 단순경비율 64.1%
const BASIC_DEDUCTION = 1500000;
const WITHHOLDING_RATE = 0.033; // 원천징수 3.3%

const TAX_BRACKETS = [
  { min: 0, max: 12000000, rate: 0.06, deduction: 0 },
  { min: 12000000, max: 46000000, rate: 0.15, deduction: 1080000 },
  { min: 46000000, max: 88000000, rate: 0.24, deduction: 5220000 },
  { min: 88000000, max: Infinity, rate: 0.35, deduction: 14900000 },
];

function calculateTax(income: number, expenses: number, dependents: number): number {
  const taxableIncome = income - expenses;
  const basicDeduction = BASIC_DEDUCTION * (1 + dependents);
  const taxableBase = Math.max(0, taxableIncome - basicDeduction);
  
  const bracket = TAX_BRACKETS.find(b => taxableBase >= b.min && taxableBase < b.max) || TAX_BRACKETS[TAX_BRACKETS.length - 1];
  const tax = taxableBase * bracket.rate - bracket.deduction;
  const localTax = tax * 0.1;
  
  return Math.max(0, tax + localTax);
}

export function compareBusinessRegistration(input: BusinessComparisonInput): BusinessComparisonOutput {
  // 프리랜서 (원천징수 3.3%)
  const freelancerWithholding = input.annualIncome * WITHHOLDING_RATE;
  const freelancerTax = freelancerWithholding; // 원천징수만
  const freelancerNetIncome = input.annualIncome - freelancerTax;
  
  // 사업자등록 (단순경비율 또는 실제 경비)
  const expenseRate = input.actualExpenses / input.annualIncome;
  const useActualExpenses = expenseRate > EXPENSE_RATE;
  const expenses = useActualExpenses ? input.actualExpenses : input.annualIncome * EXPENSE_RATE;
  
  const registeredTax = calculateTax(input.annualIncome, expenses, input.dependents);
  const registeredNetIncome = input.annualIncome - registeredTax;
  
  const taxSavings = freelancerTax - registeredTax;
  const netIncomeDifference = registeredNetIncome - freelancerNetIncome;
  
  let recommendation = '';
  let benefits: string[] = [];
  
  if (taxSavings > 0) {
    recommendation = '사업자등록이 더 유리해요!';
    benefits = [
      '간편장부 작성으로 실제 경비 인정',
      '부가세 환급 가능',
      '각종 세액공제 활용 가능',
      '노란우산공제 가입 가능',
    ];
  } else {
    recommendation = '프리랜서로 활동하는 것이 더 유리할 수 있어요.';
    benefits = [
      '원천징수 3.3%만 납부',
      '사업자등록 비용 없음',
      '간편한 세금 신고',
    ];
  }
  
  return {
    freelancer: {
      tax: freelancerTax,
      netIncome: freelancerNetIncome,
      description: '원천징수 3.3%만 납부하지만, 추가 혜택이 제한적이에요.',
    },
    registered: {
      tax: registeredTax,
      netIncome: registeredNetIncome,
      description: useActualExpenses 
        ? '간편장부로 실제 경비를 인정받아 세액이 줄어들어요!'
        : '단순경비율을 적용하여 계산했어요.',
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

