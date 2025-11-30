/**
 * 부가가치세 계산 로직
 * 
 * 계산 공식:
 * 1. 공급가액 = 합계금액 / (1 + 부가세율)
 * 2. 부가세 = 합계금액 - 공급가액
 * 3. 환급금 = 매입세액 - 매출세액 (음수일 경우 납부액)
 */

export interface VATCalculatorInput {
  supplyType: 'taxable' | 'exempt' | 'zero'; // 과세/면세/영세
  totalAmount: number; // 합계금액
  inputVAT?: number; // 매입세액 (환급금 계산용)
}

export interface VATCalculatorOutput {
  supplyAmount: number; // 공급가액
  vatAmount: number; // 부가세액
  totalAmount: number; // 합계금액
  refundAmount?: number; // 환급금 (음수일 경우 납부액)
  inputVAT?: number; // 매입세액
  outputVAT?: number; // 매출세액
}

const VAT_RATE = 0.1; // 부가가치세율 10%

/**
 * 부가가치세 계산
 */
export function calculateVAT(input: VATCalculatorInput): VATCalculatorOutput {
  const { supplyType, totalAmount, inputVAT = 0 } = input;

  if (totalAmount < 0) {
    throw new Error('Invalid total amount');
  }

  let supplyAmount = 0;
  let vatAmount = 0;

  switch (supplyType) {
    case 'taxable': // 과세
      // 합계금액 = 공급가액 + 부가세
      // 공급가액 = 합계금액 / 1.1
      supplyAmount = totalAmount / (1 + VAT_RATE);
      vatAmount = totalAmount - supplyAmount;
      break;
    
    case 'exempt': // 면세
      supplyAmount = totalAmount;
      vatAmount = 0;
      break;
    
    case 'zero': // 영세율
      supplyAmount = totalAmount;
      vatAmount = 0; // 영세율은 부가세 0이지만 매입세액 공제 가능
      break;
  }

  // 환급금 계산 (매입세액 - 매출세액)
  const outputVAT = vatAmount;
  const refundAmount = inputVAT - outputVAT;

  return {
    supplyAmount: Math.round(supplyAmount),
    vatAmount: Math.round(vatAmount),
    totalAmount,
    refundAmount: Math.round(refundAmount),
    inputVAT,
    outputVAT: Math.round(outputVAT),
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

