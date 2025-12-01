/**
 * 환급금 예상 시뮬레이터 로직
 */

export interface RefundSimulatorInput {
  annualIncome: number;
  withholdingTax: number; // 원천징수세액
  dependents: number;
  deductions: {
    yellowUmbrella: number;
    irp: number;
    pensionSavings: number;
    housingFund: number;
    creditCard: number;
    insurancePremium: number;
    medicalExpenses: number;
    educationExpenses: number;
    donationAmount: number;
  };
}

export interface RefundSimulatorOutput {
  scenarios: Array<{
    name: string;
    tax: number;
    refund: number;
    description: string;
  }>;
  bestScenario: {
    name: string;
    refund: number;
    description: string;
  };
  worstScenario: {
    name: string;
    refund: number;
    description: string;
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

function calculateTax(income: number, expenses: number, dependents: number, taxCredit: number): number {
  const taxableIncome = income - expenses;
  const basicDeduction = BASIC_DEDUCTION * (1 + dependents);
  const taxableBase = Math.max(0, taxableIncome - basicDeduction);
  
  const bracket = TAX_BRACKETS.find(b => taxableBase >= b.min && taxableBase < b.max) || TAX_BRACKETS[TAX_BRACKETS.length - 1];
  const tax = taxableBase * bracket.rate - bracket.deduction;
  const localTax = tax * 0.1;
  const finalTax = Math.max(0, tax + localTax - taxCredit);
  
  return finalTax;
}

export function simulateRefund(input: RefundSimulatorInput): RefundSimulatorOutput {
  const expenses = input.annualIncome * EXPENSE_RATE;
  
  // 세액공제 계산
  const taxCredit = 
    Math.min(input.deductions.yellowUmbrella, 5000000) * 0.165 +
    Math.min(input.deductions.irp, 4000000) * 0.165 +
    Math.min(input.deductions.pensionSavings, 4000000) * 0.165 +
    Math.min(input.deductions.housingFund, 3000000) * 0.40;
  
  // 시나리오별 계산
  const scenarios = [
    {
      name: '기본 시나리오',
      tax: calculateTax(input.annualIncome, expenses, input.dependents, taxCredit),
      refund: 0,
      description: '현재 입력값 기준',
    },
    {
      name: '최대 공제 활용',
      tax: calculateTax(input.annualIncome, expenses, input.dependents, taxCredit * 1.5),
      refund: 0,
      description: '모든 공제 항목 최대 활용',
    },
    {
      name: '최소 공제',
      tax: calculateTax(input.annualIncome, expenses, input.dependents, 0),
      refund: 0,
      description: '공제 없이 계산',
    },
  ];
  
  scenarios.forEach(scenario => {
    scenario.refund = input.withholdingTax - scenario.tax;
  });
  
  const bestScenario = scenarios.reduce((best, current) => 
    current.refund > best.refund ? current : best
  );
  
  const worstScenario = scenarios.reduce((worst, current) => 
    current.refund < worst.refund ? current : worst
  );
  
  return {
    scenarios,
    bestScenario: {
      name: bestScenario.name,
      refund: bestScenario.refund,
      description: bestScenario.description,
    },
    worstScenario: {
      name: worstScenario.name,
      refund: worstScenario.refund,
      description: worstScenario.description,
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

