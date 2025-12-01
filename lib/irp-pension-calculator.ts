/**
 * IRP/연금저축 절세 효과 계산기 로직
 */

export interface IrpPensionInput {
  irp: number; // IRP 납입금액 (최대 400만원)
  pensionSavings: number; // 연금저축 납입금액 (최대 400만원)
  annualIncome: number;
}

export interface IrpPensionOutput {
  irpTaxCredit: number; // IRP 세액공제액
  pensionTaxCredit: number; // 연금저축 세액공제액
  totalTaxCredit: number; // 총 세액공제액
  totalContribution: number; // 총 납입금액
  netBenefit: number; // 순이익
  breakdown: {
    irp: {
      contribution: number;
      taxCredit: number;
      rate: number;
    };
    pension: {
      contribution: number;
      taxCredit: number;
      rate: number;
    };
  };
}

const MAX_IRP = 4000000; // 최대 400만원
const MAX_PENSION = 4000000; // 최대 400만원
const TAX_CREDIT_RATE = 0.165; // 세액공제율 16.5%

export function calculateIrpPension(input: IrpPensionInput): IrpPensionOutput {
  const irpContribution = Math.min(input.irp, MAX_IRP);
  const pensionContribution = Math.min(input.pensionSavings, MAX_PENSION);
  
  const irpTaxCredit = irpContribution * TAX_CREDIT_RATE;
  const pensionTaxCredit = pensionContribution * TAX_CREDIT_RATE;
  const totalTaxCredit = irpTaxCredit + pensionTaxCredit;
  const totalContribution = irpContribution + pensionContribution;
  const netBenefit = totalTaxCredit; // 세액공제는 순이익
  
  return {
    irpTaxCredit,
    pensionTaxCredit,
    totalTaxCredit,
    totalContribution,
    netBenefit,
    breakdown: {
      irp: {
        contribution: irpContribution,
        taxCredit: irpTaxCredit,
        rate: TAX_CREDIT_RATE,
      },
      pension: {
        contribution: pensionContribution,
        taxCredit: pensionTaxCredit,
        rate: TAX_CREDIT_RATE,
      },
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

