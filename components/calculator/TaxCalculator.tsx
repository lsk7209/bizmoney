'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { calculateTax, formatCurrency, formatRange } from '@/lib/tax-logic';
import { saveCalculatorInput, loadCalculatorInput, clearCalculatorInput } from '@/lib/storage';
import { TaxCalculatorInput, TaxCalculatorOutput } from '@/types/tax';
import { BUSINESS_TYPES } from '@/constants/tax-rates';
import { AdModal } from '@/components/ads/AdModal';
import { AdSlot } from '@/components/ads/AdSlot';

export function TaxCalculator() {
  const [input, setInput] = useState<TaxCalculatorInput>({
    businessType: BUSINESS_TYPES[0].code,
    annualIncome: 0,
    dependents: 0,
  });

  const [result, setResult] = useState<TaxCalculatorOutput | null>(null);
  const [hasCalculated, setHasCalculated] = useState(false);
  const [showAdModal, setShowAdModal] = useState(false);
  const annualIncomeInputRef = useRef<HTMLInputElement>(null);
  const resultSectionRef = useRef<HTMLDivElement>(null);

  // LocalStorage에서 복구 및 Slot A 광고 모달 표시
  useEffect(() => {
    const stored = loadCalculatorInput();
    if (stored) {
      setInput({
        businessType: stored.businessType,
        annualIncome: stored.annualIncome,
        dependents: stored.dependents,
      });
    }
    
    // Slot A: 계산기 로딩 시 전면 모달 (한 번만 표시)
    const hasSeenAd = sessionStorage.getItem('biz-wallet-ad-seen');
    if (!hasSeenAd) {
      setTimeout(() => {
        setShowAdModal(true);
        sessionStorage.setItem('biz-wallet-ad-seen', 'true');
      }, 1000); // 1초 후 표시
    }
  }, []);

  // 입력값 변경 시 LocalStorage에 자동 저장 (PRD 요구사항: onChange 이벤트 발생 시)
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  
  useEffect(() => {
    // 초기 로드 완료 후 플래그 설정
    if (isInitialLoad) {
      setIsInitialLoad(false);
      return;
    }
    
    // 사용자가 입력값을 변경한 경우에만 저장
    const timer = setTimeout(() => {
      saveCalculatorInput({
        businessType: input.businessType,
        annualIncome: input.annualIncome,
        dependents: input.dependents,
      });
    }, 300); // 디바운싱: 300ms 후 저장

    return () => clearTimeout(timer);
  }, [input, isInitialLoad]);

  const handleCalculate = useCallback(() => {
    // 입력값 검증
    if (input.annualIncome <= 0) {
      if (annualIncomeInputRef.current) {
        annualIncomeInputRef.current.focus();
        annualIncomeInputRef.current.setAttribute('aria-invalid', 'true');
      }
      setHasCalculated(true);
      return;
    }

    // 최대값 제한 (100억원)
    const MAX_INCOME = 10000000000;
    if (input.annualIncome > MAX_INCOME) {
      if (annualIncomeInputRef.current) {
        annualIncomeInputRef.current.focus();
        annualIncomeInputRef.current.setAttribute('aria-invalid', 'true');
      }
      setHasCalculated(true);
      return;
    }

    // 부양가족 수 검증 (최대 20명)
    if (input.dependents < 0 || input.dependents > 20) {
      setHasCalculated(true);
      return;
    }

    try {
      const calculated = calculateTax(input);
      setResult(calculated);
      setHasCalculated(true);
      
      // 결과로 스크롤
      setTimeout(() => {
        if (resultSectionRef.current) {
          resultSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } catch (error) {
      // 계산 오류 처리
      if (process.env.NODE_ENV === 'development') {
        console.error('Tax calculation error:', error);
      }
      setHasCalculated(true);
    }
  }, [input]);

  const handleReset = useCallback(() => {
    setInput({
      businessType: BUSINESS_TYPES[0].code,
      annualIncome: 0,
      dependents: 0,
    });
    setResult(null);
    setHasCalculated(false);
    clearCalculatorInput();
    // 입력 필드 포커스 및 에러 상태 초기화
    if (annualIncomeInputRef.current) {
      annualIncomeInputRef.current.setAttribute('aria-invalid', 'false');
      annualIncomeInputRef.current.focus();
    }
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6 md:py-10 space-y-8">
      {/* 페이지 제목 (H1) - 공감 메시지 강화 */}
      <header className="text-center mb-10">
        <div className="mb-4">
          <span className="inline-block px-5 py-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-base font-semibold mb-4">
            💰 무료 세금 계산기
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
          종합소득세 계산기
        </h1>
        <p className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto leading-relaxed">
          <span className="empathy-text">&ldquo;세금 때문에 걱정되시나요?&rdquo;</span>
          <br />
          프리랜서와 소상공인을 위한 <strong>무료 계산기</strong>로<br />
          내가 받을 수 있는 <strong className="text-green-600 dark:text-green-400">환급금</strong>을 확인해보세요.
        </p>
        <div className="mt-6 p-5 bg-green-50 dark:bg-green-950/30 border-2 border-green-300 dark:border-green-700 rounded-xl max-w-xl mx-auto shadow-sm">
          <p className="text-base font-medium text-foreground/90">
            ✅ <strong>100% 무료</strong> · ✅ <strong>개인정보 보호</strong> · ✅ <strong>즉시 결과 확인</strong>
          </p>
        </div>
      </header>

      {/* 입력 섹션 - 집중을 위한 디자인 */}
      <Card className="focus-card border-2 border-blue-200 dark:border-blue-800 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-white dark:from-blue-950/20 dark:to-gray-900 pb-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
              <span className="text-xl">📝</span>
            </div>
            <CardTitle className="text-2xl md:text-3xl">계산기 입력</CardTitle>
          </div>
          <CardDescription className="text-base">
            프리랜서/소상공인을 위한 세금 계산기입니다. 입력값은 자동으로 저장됩니다.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="businessType" className="text-base">
              업종
            </Label>
            <select
              id="businessType"
              value={input.businessType}
              onChange={(e) => setInput({ ...input, businessType: e.target.value })}
              className="w-full h-12 px-4 text-base border rounded-md bg-background"
            >
              {BUSINESS_TYPES.map((type) => (
                <option key={type.code} value={type.code}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-3">
            <Label htmlFor="annualIncome" className="text-base font-semibold flex items-center gap-2">
              <span className="text-lg">💵</span>
              <span>연간 총수입금액 (매출)</span>
              <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <Input
                ref={annualIncomeInputRef}
                id="annualIncome"
                type="number"
                min="0"
                step="1000"
                value={input.annualIncome === 0 ? '' : input.annualIncome}
                onChange={(e) => {
                  const rawValue = e.target.value;
                  // 빈 문자열 허용 (사용자가 삭제 중일 수 있음)
                  if (rawValue === '') {
                    setInput({ ...input, annualIncome: 0 });
                    if (annualIncomeInputRef.current) {
                      annualIncomeInputRef.current.setAttribute('aria-invalid', 'false');
                    }
                    return;
                  }
                  const value = Number(rawValue) || 0;
                  // 최대값 제한 (100억원)
                  const MAX_INCOME = 10000000000;
                  const clampedValue = Math.min(Math.max(0, value), MAX_INCOME);
                  setInput({ ...input, annualIncome: clampedValue });
                  // 에러 상태 초기화
                  if (annualIncomeInputRef.current && clampedValue > 0 && clampedValue <= MAX_INCOME) {
                    annualIncomeInputRef.current.setAttribute('aria-invalid', 'false');
                  }
                }}
                onKeyDown={(e) => {
                  // Enter 키로 계산하기
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleCalculate();
                  }
                }}
                placeholder="예: 50000000"
                className={`h-14 text-lg font-medium border-2 rounded-xl px-4 ${
                  ((input.annualIncome <= 0 || input.annualIncome > 10000000000) && hasCalculated)
                    ? 'border-red-500 focus-visible:ring-red-500'
                    : 'border-gray-300 dark:border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500'
                }`}
                aria-invalid={
                  (input.annualIncome <= 0 || input.annualIncome > 10000000000) && hasCalculated 
                    ? 'true' 
                    : 'false'
                }
                aria-describedby={
                  `annualIncome-help${
                    input.annualIncome <= 0 && hasCalculated ? ' annualIncome-error' : ''
                  }${
                    input.annualIncome > 10000000000 && hasCalculated ? ' annualIncome-error-max' : ''
                  }`.trim()
                }
                aria-required="true"
              />
            </div>
            <p id="annualIncome-help" className="text-base text-foreground/70 leading-relaxed">
              💡 원 단위로 입력해주세요 (예: 5천만원 → <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm font-mono">50000000</code>)
              {input.annualIncome > 0 && (
                <span className="ml-2 text-blue-600 dark:text-blue-400 font-semibold">
                  ({new Intl.NumberFormat('ko-KR').format(input.annualIncome)}원)
                </span>
              )}
            </p>
            {input.annualIncome <= 0 && hasCalculated && (
              <p id="annualIncome-error" className="text-base font-medium text-red-600 dark:text-red-400" role="alert" aria-live="polite">
                ⚠️ 연간 총수입금액을 입력해주세요.
              </p>
            )}
            {input.annualIncome > 10000000000 && hasCalculated && (
              <p id="annualIncome-error-max" className="text-base font-medium text-red-600 dark:text-red-400" role="alert" aria-live="polite">
                ⚠️ 연간 총수입금액은 100억원을 초과할 수 없습니다.
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="dependents" className="text-base">
              본인 외 부양가족 수
            </Label>
            <Input
              id="dependents"
              type="number"
              min="0"
              max="20"
              value={input.dependents || ''}
              onChange={(e) => {
                const value = Number(e.target.value) || 0;
                const clampedValue = Math.min(Math.max(0, value), 20);
                setInput({ ...input, dependents: clampedValue });
              }}
              placeholder="0"
              className="h-12 text-base"
              aria-describedby="dependents-help"
            />
            <p id="dependents-help" className="text-base text-foreground/70">
              본인을 제외한 부양가족 수를 입력하세요 (최대 20명)
            </p>
          </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button 
                  onClick={handleCalculate} 
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all" 
                  size="lg"
                  aria-label="세금 계산하기"
                >
                  💰 환급금 계산하기
                </Button>
                <Button 
                  onClick={handleReset} 
                  variant="outline" 
                  size="lg"
                  className="border-2 hover:bg-gray-50 dark:hover:bg-gray-800"
                  aria-label="입력값 초기화"
                >
                  🔄 초기화
                </Button>
              </div>
        </CardContent>
      </Card>

      {/* 결과 섹션 - 유익 강조 */}
      {result && hasCalculated && (
        <Card 
          ref={resultSectionRef}
          data-result-section
          className="border-2 border-green-300 dark:border-green-700 bg-gradient-to-br from-green-50 to-white dark:from-green-950/40 dark:to-gray-900 shadow-xl"
          role="region"
          aria-labelledby="result-title"
        >
          <CardHeader className="bg-gradient-to-r from-green-100 to-green-50 dark:from-green-900/30 dark:to-green-950/20 pb-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center shadow-lg">
                <span className="text-2xl">💰</span>
              </div>
              <div>
                <CardTitle id="result-title" className="text-2xl md:text-3xl font-bold text-green-700 dark:text-green-400">
                  계산 결과
                </CardTitle>
                <CardDescription className="text-base mt-2 font-medium text-foreground/80">
                  ⚠️ 면책 조항: 본 계산 결과는 모의 계산이며 법적 효력이 없습니다.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
              <CardContent className="space-y-6 pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-5 bg-white dark:bg-gray-900 rounded-xl border-2 border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg">📊</span>
                      <div className="text-base font-semibold text-muted-foreground">소득금액</div>
                    </div>
                    <div className="text-xl font-bold text-foreground">
                      {formatRange(result.incomeAmountRange.min, result.incomeAmountRange.max)}
                    </div>
                  </div>

                  <div className="p-5 bg-white dark:bg-gray-900 rounded-xl border-2 border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg">📋</span>
                      <div className="text-base font-semibold text-muted-foreground">과세표준</div>
                    </div>
                    <div className="text-xl font-bold text-foreground">{formatCurrency(result.taxableBase)}</div>
                  </div>

                  <div className="p-5 bg-white dark:bg-gray-900 rounded-xl border-2 border-blue-200 dark:border-blue-800 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg">💵</span>
                      <div className="text-base font-semibold text-muted-foreground">예상 소득세</div>
                    </div>
                    <div className="text-xl font-bold text-blue-600 dark:text-blue-400">
                      {formatRange(result.calculatedTaxRange.min, result.calculatedTaxRange.max)}
                    </div>
                  </div>

                  <div className="p-5 bg-white dark:bg-gray-900 rounded-xl border-2 border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg">🏛️</span>
                      <div className="text-base font-semibold text-muted-foreground">지방소득세</div>
                    </div>
                    <div className="text-xl font-bold text-foreground">
                      {formatRange(result.localTaxRange.min, result.localTaxRange.max)}
                    </div>
                  </div>

                  <div className="p-6 bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950/40 dark:to-red-900/20 rounded-xl border-2 border-red-300 dark:border-red-700 shadow-lg md:col-span-2">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-2xl">⚠️</span>
                      <div className="text-base font-bold text-red-700 dark:text-red-400">총 세액 (납부 예상액)</div>
                    </div>
                    <div className="text-3xl md:text-4xl font-bold text-red-600 dark:text-red-400">
                      {formatRange(result.totalTaxRange.min, result.totalTaxRange.max)}
                    </div>
                    <p className="text-sm text-red-600/90 dark:text-red-400/90 mt-3 font-medium">
                      * 위 금액은 납부해야 할 예상 세액입니다.
                    </p>
                  </div>
                </div>

            <div className="mt-8 p-6 bg-yellow-50 dark:bg-yellow-950/50 border-2 border-yellow-300 dark:border-yellow-700 rounded-xl shadow-md">
              <p className="text-base font-semibold text-yellow-900 dark:text-yellow-100 leading-relaxed">
                <span className="text-xl mr-2">⚠️</span>
                <strong>면책 조항:</strong> 본 계산 결과는 모의 계산이며 법적 효력이 없습니다. 정확한 세액은 홈택스 또는 세무 전문가를 통해 확인하세요.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Slot B: 계산 결과값 바로 하단 (네이티브 배너 형태) */}
      {result && hasCalculated && (
        <div className="my-8 flex justify-center">
          <AdSlot 
            slotId="slot-b" 
            format="horizontal"
            className="w-full max-w-728"
            style={{ minHeight: '90px' }}
          />
        </div>
      )}

      {/* SEO 콘텐츠 래퍼 (광고 슬롯 포함) */}
      <article className="prose prose-sm max-w-none dark:prose-invert mt-12">
        <h2 className="text-2xl font-bold mb-4">프리랜서 종합소득세 계산기 사용 가이드</h2>
        <p className="text-base leading-relaxed mb-6">
          프리랜서와 소상공인을 위한 종합소득세 계산기는 단순경비율을 적용하여 예상 세액을 계산합니다.
          본 계산기는 간편장부대상자를 기준으로 하며, 실제 세액과는 차이가 있을 수 있습니다.
        </p>
        
        <h3 className="text-xl font-semibold mb-3 mt-6">단순경비율이란?</h3>
        <p className="text-base leading-relaxed mb-4">
          단순경비율은 실제 지출한 경비를 일일이 증빙하지 않고도 매출의 일정 비율을 경비로 인정받을 수 있는 제도입니다.
          업종별로 다른 비율이 적용되며, 프리랜서의 경우 일반적으로 64.1%의 경비율이 적용됩니다.
        </p>
        
        <h3 className="text-xl font-semibold mb-3 mt-6">기본 공제와 부양가족 공제</h3>
        <p className="text-base leading-relaxed mb-4">
          종합소득세 계산 시 본인과 부양가족에 대해 기본 공제가 적용됩니다.
          기본 공제액은 연 150만원이며, 부양가족이 많을수록 공제액이 증가하여 세액이 줄어듭니다.
        </p>
        
        <h3 className="text-xl font-semibold mb-3 mt-6">누진세율 구조</h3>
        <p className="text-base leading-relaxed mb-4">
          종합소득세는 과세표준에 따라 6%부터 45%까지의 누진세율이 적용됩니다.
          소득이 높을수록 높은 세율이 적용되며, 각 구간별로 누진공제액이 차등 적용됩니다.
        </p>
        
        <h3 className="text-xl font-semibold mb-3 mt-6">지방소득세</h3>
        <p className="text-base leading-relaxed mb-4">
          지방소득세는 소득세의 10%에 해당하는 세액을 추가로 납부해야 합니다.
          따라서 총 세액은 소득세와 지방소득세를 합한 금액입니다.
        </p>

        {/* Slot C: 하단 정보성 아티클 중간 */}
        <div className="my-8 flex justify-center">
          <AdSlot 
            slotId="slot-c" 
            format="auto"
            className="w-full"
            style={{ minHeight: '250px' }}
          />
        </div>

        <h3 className="text-xl font-semibold mb-3 mt-6">주의사항</h3>
        <p className="text-base leading-relaxed mb-4">
          본 계산기는 참고용이며, 실제 세액과는 차이가 있을 수 있습니다.
          정확한 세액 계산을 위해서는 홈택스에서 직접 계산하거나 세무 전문가의 도움을 받으시기 바랍니다.
          또한 원천징수된 세액, 소득공제, 특별공제 등 다양한 요소가 실제 세액에 영향을 미칩니다.
        </p>
      </article>

      {/* Slot A: 계산기 로딩 시 전면 모달 */}
      <AdModal
        isOpen={showAdModal}
        onClose={() => setShowAdModal(false)}
        slotId="slot-a"
      />
    </div>
  );
}

