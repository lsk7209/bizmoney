export interface TaxCalculatorInput {
  businessType: string; // 업종 코드
  annualIncome: number; // 연간 총수입금액 (매출)
  dependents: number; // 본인 외 부양가족 수
}

export interface TaxCalculatorOutput {
  incomeAmount: number; // 소득금액
  taxableBase: number; // 과세표준
  calculatedTax: number; // 산출세액
  localTax: number; // 지방소득세
  totalTax: number; // 총 세액
  refundAmount: number; // 환급액 (음수일 경우 납부액)
  incomeAmountRange: { min: number; max: number };
  calculatedTaxRange: { min: number; max: number };
  localTaxRange: { min: number; max: number };
  totalTaxRange: { min: number; max: number };
  refundAmountRange: { min: number; max: number };
}

