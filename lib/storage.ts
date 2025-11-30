/**
 * LocalStorage 유틸리티 함수
 * 세금 계산기 입력값을 브라우저에 저장/복구
 */

const STORAGE_KEY = 'biz-wallet-calculator-input';

export interface StoredCalculatorInput {
  businessType: string;
  annualIncome: number;
  dependents: number;
}

/**
 * 계산기 입력값을 LocalStorage에 저장
 */
export function saveCalculatorInput(input: StoredCalculatorInput): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(input));
  } catch (error) {
    // 개발 환경에서만 에러 로그 출력
    if (process.env.NODE_ENV === 'development') {
      console.error('Failed to save calculator input:', error);
    }
  }
}

/**
 * LocalStorage에서 계산기 입력값 복구
 */
export function loadCalculatorInput(): StoredCalculatorInput | null {
  if (typeof window === 'undefined') return null;
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;
    
    const parsed = JSON.parse(stored) as StoredCalculatorInput;
    
    // 유효성 검증
    if (
      typeof parsed.businessType === 'string' &&
      typeof parsed.annualIncome === 'number' &&
      typeof parsed.dependents === 'number' &&
      parsed.annualIncome >= 0 &&
      parsed.dependents >= 0
    ) {
      return parsed;
    }
    
    return null;
  } catch (error) {
    // 개발 환경에서만 에러 로그 출력
    if (process.env.NODE_ENV === 'development') {
      console.error('Failed to load calculator input:', error);
    }
    return null;
  }
}

/**
 * LocalStorage에서 계산기 입력값 삭제
 */
export function clearCalculatorInput(): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    // 개발 환경에서만 에러 로그 출력
    if (process.env.NODE_ENV === 'development') {
      console.error('Failed to clear calculator input:', error);
    }
  }
}

