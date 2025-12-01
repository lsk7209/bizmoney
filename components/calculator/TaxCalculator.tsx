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

export function TaxCalculator() {
  const [input, setInput] = useState<TaxCalculatorInput>({
    businessType: BUSINESS_TYPES[0].code,
    annualIncome: 0,
    dependents: 0,
  });

  const [result, setResult] = useState<TaxCalculatorOutput | null>(null);
  const [hasCalculated, setHasCalculated] = useState(false);
  const annualIncomeInputRef = useRef<HTMLInputElement>(null);
  const resultSectionRef = useRef<HTMLDivElement>(null);

  // LocalStorage에서 복구
  useEffect(() => {
    const stored = loadCalculatorInput();
    if (stored) {
      setInput({
        businessType: stored.businessType,
        annualIncome: stored.annualIncome,
        dependents: stored.dependents,
      });
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
            <br />
            <span className="text-sm text-foreground/70 mt-2 block">
              💡 단순경비율을 적용하여 예상 세액을 계산합니다. 실제 세액과는 차이가 있을 수 있어요.
            </span>
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

      {/* 결과 섹션 - 유익 강조 및 바이럴 요소 */}
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
            {/* 핵심 결과 - 눈에 띄게 */}
            <div className="p-8 bg-gradient-to-br from-blue-50 via-green-50 to-emerald-50 dark:from-blue-950/40 dark:via-green-950/40 dark:to-emerald-950/40 rounded-2xl border-4 border-green-400 dark:border-green-600 shadow-2xl text-center">
              <div className="mb-4">
                <span className="text-4xl">🎯</span>
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-4 text-foreground">
                내가 내야 할 예상 세액은?
              </h3>
              <div className="text-4xl md:text-5xl font-bold text-red-600 dark:text-red-400 mb-2">
                {formatRange(result.totalTaxRange.min, result.totalTaxRange.max)}
              </div>
              <p className="text-base text-foreground/70 mt-3">
                💡 원천징수된 3.3%와 비교하면 환급받을 수도 있어요!
              </p>
            </div>

            {/* 상세 내역 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 bg-white dark:bg-gray-900 rounded-xl border-2 border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">📊</span>
                  <div className="text-base font-semibold text-muted-foreground">소득금액</div>
                </div>
                <div className="text-xl font-bold text-foreground">
                  {formatRange(result.incomeAmountRange.min, result.incomeAmountRange.max)}
                </div>
                <p className="text-xs text-foreground/60 mt-2">단순경비율 적용 후 금액</p>
              </div>

              <div className="p-5 bg-white dark:bg-gray-900 rounded-xl border-2 border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">📋</span>
                  <div className="text-base font-semibold text-muted-foreground">과세표준</div>
                </div>
                <div className="text-xl font-bold text-foreground">{formatCurrency(result.taxableBase)}</div>
                <p className="text-xs text-foreground/60 mt-2">세율 적용 기준 금액</p>
              </div>

              <div className="p-5 bg-white dark:bg-gray-900 rounded-xl border-2 border-blue-200 dark:border-blue-800 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">💵</span>
                  <div className="text-base font-semibold text-muted-foreground">예상 소득세</div>
                </div>
                <div className="text-xl font-bold text-blue-600 dark:text-blue-400">
                  {formatRange(result.calculatedTaxRange.min, result.calculatedTaxRange.max)}
                </div>
                <p className="text-xs text-foreground/60 mt-2">누진세율 적용</p>
              </div>

              <div className="p-5 bg-white dark:bg-gray-900 rounded-xl border-2 border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">🏛️</span>
                  <div className="text-base font-semibold text-muted-foreground">지방소득세</div>
                </div>
                <div className="text-xl font-bold text-foreground">
                  {formatRange(result.localTaxRange.min, result.localTaxRange.max)}
                </div>
                <p className="text-xs text-foreground/60 mt-2">소득세의 10%</p>
              </div>
            </div>

            {/* 절세 팁 섹션 - 바이럴 요소 */}
            <div className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 rounded-xl border-2 border-purple-200 dark:border-purple-800">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-2xl">💡</span>
                <span>이 금액을 더 줄일 수 있는 방법은?</span>
              </h3>
              <div className="space-y-3">
                <div className="p-4 bg-white/80 dark:bg-gray-900/80 rounded-lg border border-purple-200 dark:border-purple-800">
                  <p className="text-base font-semibold text-foreground mb-2">
                    ✅ 노란우산공제 가입하기 (2025년 최신!)
                  </p>
                  <p className="text-sm text-foreground/70 leading-relaxed">
                    연간 최대 500만원까지 소득공제! 프리랜서를 위한 퇴직금 제도예요. 2025년부터 더 많은 혜택이 있어요!
                  </p>
                </div>
                <div className="p-4 bg-white/80 dark:bg-gray-900/80 rounded-lg border border-purple-200 dark:border-purple-800">
                  <p className="text-base font-semibold text-foreground mb-2">
                    ✅ 개인형 퇴직연금(IRP) 활용하기
                  </p>
                  <p className="text-sm text-foreground/70 leading-relaxed">
                    세액공제 혜택으로 세금을 더 줄일 수 있어요. 노후 대비도 되고 일석이조! 2025년 세액공제 한도가 늘어났어요.
                  </p>
                </div>
                <div className="p-4 bg-white/80 dark:bg-gray-900/80 rounded-lg border border-purple-200 dark:border-purple-800">
                  <p className="text-base font-semibold text-foreground mb-2">
                    ✅ 실제 경비가 많다면 간편장부 신고
                  </p>
                  <p className="text-sm text-foreground/70 leading-relaxed">
                    단순경비율보다 실제 경비가 많다면 간편장부로 신고하면 더 유리할 수 있어요! 2025년 기준금액이 7,500만원으로 상향됐어요.
                  </p>
                </div>
                <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 rounded-lg border-2 border-blue-300 dark:border-blue-700">
                  <p className="text-base font-bold text-blue-700 dark:text-blue-300 mb-2">
                    🎁 2025년 신규! 국세청 &quot;원클릭&quot; 무료 환급 서비스
                  </p>
                  <p className="text-sm text-foreground/80 leading-relaxed mb-2">
                    홈택스에서 &quot;원클릭 환급 신고&quot; 메뉴를 찾아보세요! 최대 5년치 환급금을 <strong className="text-blue-600 dark:text-blue-400">완전 무료</strong>로 확인하고 신청할 수 있어요. 삼쩜삼 같은 민간 서비스는 수수료가 있지만, 원클릭은 수수료 0원!
                  </p>
                  <p className="text-xs text-foreground/60">
                    * 원클릭은 국세청이 자동으로 계산해주지만, 미리 계산기로 예상 세액을 확인하면 더 확실해요!
                  </p>
                </div>
              </div>
            </div>

            {/* 실제 사례 비교 - 바이럴 요소 */}
            <div className="p-6 bg-blue-50 dark:bg-blue-950/30 rounded-xl border-2 border-blue-200 dark:border-blue-800">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-2xl">📊</span>
                <span>실제 사례 비교 (2025년 기준)</span>
              </h3>
              <div className="space-y-3 text-sm mb-4">
                <div className="flex justify-between items-center p-3 bg-white dark:bg-gray-900 rounded-lg border border-blue-200 dark:border-blue-800">
                  <span className="font-medium">연봉 3,000만원 프리랜서</span>
                  <span className="font-bold text-blue-600 dark:text-blue-400">약 50~80만원</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white dark:bg-gray-900 rounded-lg border border-blue-200 dark:border-blue-800">
                  <span className="font-medium">연봉 5,000만원 프리랜서</span>
                  <span className="font-bold text-blue-600 dark:text-blue-400">약 150~200만원</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white dark:bg-gray-900 rounded-lg border border-blue-200 dark:border-blue-800">
                  <span className="font-medium">연봉 8,000만원 프리랜서</span>
                  <span className="font-bold text-blue-600 dark:text-blue-400">약 400~500만원</span>
                </div>
              </div>
              <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 rounded-lg border-2 border-green-300 dark:border-green-700">
                <p className="text-sm font-semibold text-green-700 dark:text-green-300 mb-2">
                  💰 환급 후기 스타일
                </p>
                <p className="text-xs text-foreground/70 leading-relaxed">
                  &quot;원천징수된 3.3%와 비교하면 실제로는 환급받을 수도 있어요! 실제로 많은 분들이 예상보다 더 많이 받는다고 하네요. 홈택스 원클릭으로 확인해보세요!&quot;
                </p>
              </div>
              <p className="text-xs text-foreground/60 mt-3">
                * 실제 세액은 공제 항목, 부양가족 수 등에 따라 달라질 수 있어요.
              </p>
            </div>

            {/* 공유 버튼 - 바이럴 요소 */}
            <div className="p-5 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 rounded-xl border-2 border-green-200 dark:border-green-800">
              <p className="text-center font-semibold text-base mb-4 text-foreground">
                🎉 친구들도 계산해보라고 공유해보세요!
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Button
                  onClick={async () => {
                    try {
                      await navigator.clipboard.writeText(
                        `프리랜서 세금 계산기로 내 예상 세액을 확인했어요! 💰\n\n${typeof window !== 'undefined' ? window.location.href : ''}`
                      );
                      alert('링크가 클립보드에 복사되었습니다!');
                    } catch (err) {
                      alert('복사에 실패했습니다.');
                    }
                  }}
                  variant="outline"
                  className="border-2 hover:bg-green-50 dark:hover:bg-green-950/50"
                  size="lg"
                >
                  📋 링크 복사
                </Button>
                <Button
                  onClick={() => {
                    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
                      `프리랜서 세금 계산기로 내 예상 세액을 확인했어요! 💰\n\n${typeof window !== 'undefined' ? window.location.href : ''}`
                    )}`;
                    window.open(twitterUrl, '_blank');
                  }}
                  variant="outline"
                  className="border-2 hover:bg-blue-50 dark:hover:bg-blue-950/50"
                  size="lg"
                >
                  🐦 트위터 공유
                </Button>
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


      {/* SEO 콘텐츠 래퍼 - 재미있고 유익하게 개선 */}
      <article className="prose prose-sm max-w-none dark:prose-invert mt-12">
        <div className="bg-gradient-to-r from-blue-50 to-white dark:from-blue-950/20 dark:to-gray-900 rounded-2xl p-8 md:p-10 border-2 border-blue-200 dark:border-blue-800">
          <h2 className="text-3xl font-bold mb-6 text-foreground">프리랜서 종합소득세 계산기 완벽 가이드 (2025년 최신!)</h2>
          <p className="text-lg leading-relaxed mb-8 text-foreground/80">
            프리랜서와 소상공인을 위한 종합소득세 계산기는 단순경비율을 적용하여 예상 세액을 계산합니다.
            본 계산기는 간편장부대상자를 기준으로 하며, 실제 세액과는 차이가 있을 수 있습니다.
            <strong className="text-blue-600 dark:text-blue-400"> 2025년 최신 세법</strong>을 반영하여 계산합니다.
          </p>
          
          <div className="space-y-8">
            <section className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <span className="text-2xl">💡</span>
                <span>단순경비율이란? (프리랜서 필수 지식!)</span>
              </h3>
              <div className="space-y-3 text-base leading-relaxed text-foreground/80">
                <p>
                  단순경비율은 실제 지출한 경비를 일일이 증빙하지 않고도 <strong className="text-blue-600 dark:text-blue-400">매출의 일정 비율을 경비로 인정받을 수 있는 제도</strong>예요.
                  업종별로 다른 비율이 적용되며, 프리랜서의 경우 일반적으로 <strong className="text-green-600 dark:text-green-400">64.1%</strong>의 경비율이 적용됩니다.
                </p>
                <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800 mt-4">
                  <p className="text-sm font-semibold text-blue-700 dark:text-blue-300 mb-2">
                    💰 예시: 연봉 3,000만원 프리랜서
                  </p>
                  <p className="text-sm text-foreground/80">
                    매출 3,000만원 × 64.1% = <strong>1,923만원</strong>이 경비로 인정되고,<br />
                    과세소득은 <strong>1,077만원</strong>이에요! 이 금액에 세율을 적용해요.
                  </p>
                </div>
              </div>
            </section>

            <section className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <span className="text-2xl">👨‍👩‍👧‍👦</span>
                <span>기본 공제와 부양가족 공제 (세금 줄이는 핵심!)</span>
              </h3>
              <div className="space-y-3 text-base leading-relaxed text-foreground/80">
                <p>
                  종합소득세 계산 시 본인과 부양가족에 대해 기본 공제가 적용됩니다.
                  기본 공제액은 <strong className="text-green-600 dark:text-green-400">연 150만원</strong>이며, 부양가족이 많을수록 공제액이 증가하여 세액이 줄어듭니다.
                </p>
                <div className="p-4 bg-green-50 dark:bg-green-950/30 rounded-lg border border-green-200 dark:border-green-800 mt-4">
                  <p className="text-sm font-semibold text-green-700 dark:text-green-300 mb-2">
                    💡 부양가족 공제 효과
                  </p>
                  <p className="text-sm text-foreground/80">
                    부양가족 1명 추가 = <strong>150만원 추가 공제</strong> = 세액 약 <strong>10~20만원 절감</strong>!<br />
                    부양가족이 많을수록 세금이 크게 줄어들어요.
                  </p>
                </div>
              </div>
            </section>

            <section className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <span className="text-2xl">📊</span>
                <span>누진세율 구조 (소득이 많을수록 세율도 올라가요!)</span>
              </h3>
              <div className="space-y-3 text-base leading-relaxed text-foreground/80">
                <p>
                  종합소득세는 과세표준에 따라 <strong className="text-blue-600 dark:text-blue-400">6%부터 45%까지의 누진세율</strong>이 적용됩니다.
                  소득이 높을수록 높은 세율이 적용되며, 각 구간별로 누진공제액이 차등 적용됩니다.
                </p>
                <div className="p-4 bg-purple-50 dark:bg-purple-950/30 rounded-lg border border-purple-200 dark:border-purple-800 mt-4">
                  <p className="text-sm font-semibold text-purple-700 dark:text-purple-300 mb-2">
                    📈 세율 구간 예시 (2025년 기준)
                  </p>
                  <ul className="text-sm text-foreground/80 space-y-1 list-disc list-inside">
                    <li>1,200만원 이하: <strong>6%</strong></li>
                    <li>1,200만원 ~ 4,600만원: <strong>15%</strong></li>
                    <li>4,600만원 ~ 8,800만원: <strong>24%</strong></li>
                    <li>8,800만원 이상: <strong>35~45%</strong></li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <span className="text-2xl">🏛️</span>
                <span>지방소득세 (소득세의 10% 추가 납부)</span>
              </h3>
              <p className="text-base leading-relaxed text-foreground/80">
                지방소득세는 소득세의 <strong className="text-blue-600 dark:text-blue-400">10%에 해당하는 세액</strong>을 추가로 납부해야 합니다.
                따라서 총 세액은 소득세와 지방소득세를 합한 금액입니다.
              </p>
            </section>

            <section className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 rounded-xl p-6 border-2 border-green-300 dark:border-green-700">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-3 text-green-700 dark:text-green-300">
                <span className="text-2xl">🎁</span>
                <span>2025년 신규! 국세청 &quot;원클릭&quot; 무료 환급 서비스</span>
              </h3>
              <div className="space-y-3 text-base leading-relaxed text-foreground/90">
                <p>
                  <strong className="text-green-600 dark:text-green-400">홈택스에서 &quot;원클릭 환급 신고&quot;</strong> 메뉴를 찾아보세요!
                  최대 <strong>5년치 환급금</strong>을 <strong className="text-green-600 dark:text-green-400">완전 무료</strong>로 확인하고 신청할 수 있어요.
                </p>
                <p>
                  삼쩜삼 같은 민간 서비스는 환급액의 <strong>10~20% 수수료</strong>가 있지만, 원클릭은 <strong className="text-green-600 dark:text-green-400">수수료 0원</strong>!
                  국세청이 빅데이터로 자동 계산해주기 때문에 과다 환급 위험도 없어요.
                </p>
                <div className="p-4 bg-white/80 dark:bg-gray-900/80 rounded-lg border border-green-200 dark:border-green-800 mt-4">
                  <p className="text-sm font-semibold text-green-700 dark:text-green-300 mb-2">
                    💡 원클릭 사용 팁
                  </p>
                  <p className="text-sm text-foreground/80">
                    미리 계산기로 예상 세액을 확인한 후 원클릭으로 실제 환급금을 확인하면 더 확실해요!
                    원클릭은 클릭 한 번으로 1분 안에 환급 신청까지 완료할 수 있어요.
                  </p>
                </div>
              </div>
            </section>

            <section className="bg-yellow-50 dark:bg-yellow-950/30 rounded-xl p-6 border-2 border-yellow-200 dark:border-yellow-800">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-3 text-yellow-800 dark:text-yellow-200">
                <span className="text-2xl">⚠️</span>
                <span>주의사항 (반드시 확인하세요!)</span>
              </h3>
              <div className="space-y-3 text-base leading-relaxed text-foreground/90">
                <p>
                  본 계산기는 <strong>참고용</strong>이며, 실제 세액과는 차이가 있을 수 있습니다.
                  정확한 세액 계산을 위해서는 <strong className="text-blue-600 dark:text-blue-400">홈택스</strong>에서 직접 계산하거나 <strong className="text-blue-600 dark:text-blue-400">세무 전문가</strong>의 도움을 받으시기 바랍니다.
                </p>
                <p>
                  또한 원천징수된 세액, 소득공제, 특별공제 등 다양한 요소가 실제 세액에 영향을 미칩니다.
                  특히 <strong>노란우산공제, IRP, 연금저축</strong> 등을 활용하면 세액을 더 줄일 수 있어요!
                </p>
              </div>
            </section>
          </div>
        </div>
      </article>

    </div>
  );
}

