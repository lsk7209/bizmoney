/**
 * 간이과세 vs 일반과세 비교 계산 로직
 */

export interface VatComparisonInput {
  annualRevenue: number;
  inputVAT: number; // 매입세액
  useSimpleTax: boolean; // 간이과세 사용 여부
}

export interface VatComparisonOutput {
  simple: {
    tax: number;
    netIncome: number;
    description: string;
  };
  general: {
    tax: number;
    refund: number;
    netIncome: number;
    description: string;
  };
  difference: {
    taxSavings: number;
    recommendation: string;
    benefits: string[];
  };
}

const SIMPLE_TAX_RATES = [
  { min: 0, max: 48000000, rate: 0.01 }, // 1%
  { min: 48000000, max: 80000000, rate: 0.02 }, // 2%
];

const GENERAL_VAT_RATE = 0.10; // 10%

function calculateSimpleTax(revenue: number): number {
  const bracket = SIMPLE_TAX_RATES.find(b => revenue >= b.min && revenue < b.max) || SIMPLE_TAX_RATES[SIMPLE_TAX_RATES.length - 1];
  return revenue * bracket.rate;
}

function calculateGeneralTax(revenue: number, inputVAT: number): { tax: number; refund: number } {
  const outputVAT = revenue / (1 + GENERAL_VAT_RATE) * GENERAL_VAT_RATE;
  const netVAT = outputVAT - inputVAT;
  
  if (netVAT > 0) {
    return { tax: netVAT, refund: 0 };
  } else {
    return { tax: 0, refund: Math.abs(netVAT) };
  }
}

export function compareVatTax(input: VatComparisonInput): VatComparisonOutput {
  const simpleTax = calculateSimpleTax(input.annualRevenue);
  const simpleNetIncome = input.annualRevenue - simpleTax;
  
  const generalResult = calculateGeneralTax(input.annualRevenue, input.inputVAT);
  const generalNetIncome = input.annualRevenue - generalResult.tax;
  
  const taxSavings = simpleTax - generalResult.tax;
  const netIncomeDifference = generalNetIncome - simpleNetIncome;
  
  let recommendation = '';
  let benefits: string[] = [];
  
  if (generalResult.refund > 0 || taxSavings < 0) {
    recommendation = '일반과세가 더 유리해요!';
    benefits = [
      '매입세액 환급 가능',
      '세액공제 활용 가능',
      '장기적으로 더 유리',
    ];
  } else if (input.annualRevenue < 48000000) {
    recommendation = '간이과세가 더 유리할 수 있어요!';
    benefits = [
      '세율이 낮음 (1%)',
      '신고가 간편함',
      '초기 사업자에게 유리',
    ];
  } else {
    recommendation = '일반과세를 고려해보세요!';
    benefits = [
      '매입세액 공제 가능',
      '환급금 받을 수 있음',
      '세액공제 활용 가능',
    ];
  }
  
  return {
    simple: {
      tax: simpleTax,
      netIncome: simpleNetIncome,
      description: '간이과세는 세율이 낮지만 매입세액 공제를 못 받아요.',
    },
    general: {
      tax: generalResult.tax,
      refund: generalResult.refund,
      netIncome: generalNetIncome,
      description: generalResult.refund > 0 
        ? '일반과세는 매입세액 환급을 받을 수 있어요!'
        : '일반과세는 매입세액 공제를 받을 수 있어요.',
    },
    difference: {
      taxSavings: taxSavings,
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

