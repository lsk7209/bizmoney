'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { calculateWithholdingTax, formatCurrency, WithholdingTaxInput } from '@/lib/withholding-tax-logic';
import { AdModal } from '@/components/ads/AdModal';
import { AdSlot } from '@/components/ads/AdSlot';

const BUSINESS_TYPES = [
  { code: 'freelancer', name: '프리랜서' },
  { code: 'consulting', name: '컨설팅' },
  { code: 'design', name: '디자인' },
  { code: 'education', name: '교육/강사' },
  { code: 'other', name: '기타' },
] as const;

export function WithholdingTaxCalculator() {
  const [input, setInput] = useState<WithholdingTaxInput>({
    contractAmount: 0,
    businessType: 'freelancer',
    isVATIncluded: true,
  });

  const [result, setResult] = useState<ReturnType<typeof calculateWithholdingTax> | null>(null);
  const [hasCalculated, setHasCalculated] = useState(false);
  const [showAdModal, setShowAdModal] = useState(false);
  const contractAmountInputRef = useRef<HTMLInputElement>(null);
  const resultSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hasSeenAd = sessionStorage.getItem('biz-wallet-withholding-ad-seen');
    if (!hasSeenAd) {
      setTimeout(() => {
        setShowAdModal(true);
        sessionStorage.setItem('biz-wallet-withholding-ad-seen', 'true');
      }, 1000);
    }
  }, []);

  const handleCalculate = useCallback(() => {
    try {
      if (input.contractAmount <= 0) {
        alert('계약금액을 입력해주세요.');
        if (contractAmountInputRef.current) {
          contractAmountInputRef.current.focus();
        }
        return;
      }

      const calculated = calculateWithholdingTax(input);
      setResult(calculated);
      setHasCalculated(true);

      setTimeout(() => {
        resultSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } catch (error) {
      console.error('Calculation error:', error);
      alert('계산 중 오류가 발생했습니다. 입력값을 확인해주세요.');
    }
  }, [input]);

  const handleReset = useCallback(() => {
    setInput({
      contractAmount: 0,
      businessType: 'freelancer',
      isVATIncluded: true,
    });
    setResult(null);
    setHasCalculated(false);
    if (contractAmountInputRef.current) {
      contractAmountInputRef.current.focus();
    }
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6 md:py-10 space-y-8">
      <header className="text-center mb-10">
        <div className="mb-4">
          <span className="inline-block px-4 py-1.5 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-sm font-semibold mb-4">
            💰 무료 원천징수세 계산기
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
          원천징수세 계산기
        </h1>
        <p className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto leading-relaxed">
          <span className="empathy-text">&ldquo;원천징수세가 얼마나 될까요?&rdquo;</span>
          <br />
          계약금액을 입력하면 <strong>원천징수세액</strong>과 <strong className="text-green-600 dark:text-green-400">실수령액</strong>을 계산합니다.
        </p>
        <div className="mt-6 p-4 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg max-w-xl mx-auto">
          <p className="text-sm text-foreground/80">
            ✅ <strong>100% 무료</strong> · ✅ <strong>개인정보 보호</strong> · ✅ <strong>즉시 결과 확인</strong>
          </p>
        </div>
      </header>

      <Card className="focus-card border-2 border-blue-200 dark:border-blue-800 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-white dark:from-blue-950/20 dark:to-gray-900 pb-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
              <span className="text-xl">📝</span>
            </div>
            <CardTitle className="text-2xl md:text-3xl">계산기 입력</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <Label htmlFor="businessType" className="text-base font-semibold flex items-center gap-2">
              <span className="text-lg">🏢</span>
              <span>업종</span>
            </Label>
            <select
              id="businessType"
              value={input.businessType}
              onChange={(e) => setInput({ ...input, businessType: e.target.value as WithholdingTaxInput['businessType'] })}
              className="w-full h-14 px-4 text-lg font-medium border-2 border-gray-300 dark:border-gray-700 rounded-xl bg-background focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            >
              {BUSINESS_TYPES.map((type) => (
                <option key={type.code} value={type.code}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-3">
            <Label htmlFor="contractAmount" className="text-base font-semibold flex items-center gap-2">
              <span className="text-lg">💵</span>
              <span>계약금액</span>
              <span className="text-red-500">*</span>
            </Label>
            <Input
              ref={contractAmountInputRef}
              id="contractAmount"
              type="number"
              min="0"
              step="1000"
              value={input.contractAmount === 0 ? '' : input.contractAmount}
              onChange={(e) => {
                const value = Number(e.target.value) || 0;
                setInput({ ...input, contractAmount: Math.max(0, value) });
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleCalculate();
                }
              }}
              placeholder="예: 10000000"
              className="h-14 text-lg font-medium border-2 border-gray-300 dark:border-gray-700 rounded-xl px-4 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              aria-required="true"
            />
          </div>

          <div className="space-y-3">
            <Label className="text-base font-semibold flex items-center gap-2">
              <span className="text-lg">📋</span>
              <span>부가세 포함 여부</span>
            </Label>
            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  checked={input.isVATIncluded}
                  onChange={() => setInput({ ...input, isVATIncluded: true })}
                  className="w-4 h-4"
                />
                <span>부가세 포함</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  checked={!input.isVATIncluded}
                  onChange={() => setInput({ ...input, isVATIncluded: false })}
                  className="w-4 h-4"
                />
                <span>부가세 별도</span>
              </label>
            </div>
            <p className="text-sm text-foreground/60">
              💡 계약서에 명시된 금액 기준으로 선택하세요.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button 
              onClick={handleCalculate} 
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all" 
              size="lg"
            >
              💰 원천징수세 계산하기
            </Button>
            <Button 
              onClick={handleReset} 
              variant="outline" 
              size="lg"
              className="border-2 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              🔄 초기화
            </Button>
          </div>
        </CardContent>
      </Card>

      {result && hasCalculated && (
        <Card 
          ref={resultSectionRef}
          className="border-2 border-green-300 dark:border-green-700 bg-gradient-to-br from-green-50 to-white dark:from-green-950/40 dark:to-gray-900 shadow-xl"
        >
          <CardHeader className="bg-gradient-to-r from-green-100 to-green-50 dark:from-green-900/30 dark:to-green-950/20 pb-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center shadow-lg">
                <span className="text-2xl">💰</span>
              </div>
              <div>
                <CardTitle className="text-2xl md:text-3xl font-bold text-green-700 dark:text-green-400">
                  계산 결과
                </CardTitle>
                <CardDescription className="text-sm mt-1">
                  면책 조항: 본 계산 결과는 모의 계산이며 법적 효력이 없습니다.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 bg-white dark:bg-gray-900 rounded-xl border-2 border-gray-200 dark:border-gray-700">
                <div className="text-sm font-medium text-muted-foreground mb-2">계약금액</div>
                <div className="text-xl font-bold">{formatCurrency(result.contractAmount)}</div>
              </div>
              {result.vatAmount > 0 && (
                <div className="p-5 bg-white dark:bg-gray-900 rounded-xl border-2 border-gray-200 dark:border-gray-700">
                  <div className="text-sm font-medium text-muted-foreground mb-2">부가세액</div>
                  <div className="text-xl font-bold">{formatCurrency(result.vatAmount)}</div>
                </div>
              )}
              <div className="p-5 bg-white dark:bg-gray-900 rounded-xl border-2 border-gray-200 dark:border-gray-700">
                <div className="text-sm font-medium text-muted-foreground mb-2">공급가액</div>
                <div className="text-xl font-bold">{formatCurrency(result.supplyAmount)}</div>
              </div>
              <div className="p-5 bg-white dark:bg-gray-900 rounded-xl border-2 border-blue-200 dark:border-blue-800">
                <div className="text-sm font-medium text-muted-foreground mb-2">원천징수세액</div>
                <div className="text-xl font-bold text-blue-600 dark:text-blue-400">{formatCurrency(result.withholdingTax)}</div>
              </div>
              <div className={`p-6 rounded-xl border-2 shadow-lg md:col-span-2 ${
                'bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/40 dark:to-green-900/20 border-green-300 dark:border-green-700'
              }`}>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">💰</span>
                  <div className="text-sm font-semibold text-green-700 dark:text-green-400">실수령액</div>
                </div>
                <div className="text-3xl md:text-4xl font-bold text-green-600 dark:text-green-400">
                  {formatCurrency(result.netAmount)}
                </div>
                <p className="text-xs text-green-600/80 dark:text-green-400/80 mt-2">
                  * 계약금액에서 원천징수세액을 제외한 실제 받을 금액입니다.
                </p>
              </div>
            </div>

            <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-900 rounded-lg">
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                <strong>⚠️ 면책 조항:</strong> 본 계산 결과는 모의 계산이며 법적 효력이 없습니다. 정확한 원천징수세는 세무 전문가의 도움을 받으시기 바랍니다.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {result && hasCalculated && (
        <div className="my-8 flex justify-center">
          <AdSlot slotId="slot-b" format="auto" className="w-full" style={{ minHeight: '250px' }} />
        </div>
      )}

      <article className="prose prose-lg max-w-none dark:prose-invert mt-16">
        <div className="bg-gradient-to-r from-blue-50 to-white dark:from-blue-950/20 dark:to-gray-900 rounded-2xl p-8 md:p-10 border-2 border-blue-200 dark:border-blue-800">
          <h2 className="text-3xl font-bold mb-6">원천징수세 계산기 사용 가이드</h2>
          <p className="text-lg leading-relaxed mb-8 text-foreground/80">
            원천징수세는 프리랜서가 계약금액을 받을 때 의뢰인이 미리 징수하는 세금입니다. 본 계산기로 예상 원천징수세액과 실수령액을 확인하세요.
          </p>
          
          <div className="space-y-8">
            <section className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <span className="text-2xl">💡</span>
                <span>원천징수세란?</span>
              </h3>
              <p className="text-base leading-relaxed text-foreground/80">
                원천징수세는 프리랜서가 받는 계약금액에서 의뢰인이 미리 징수하는 세금입니다. 
                일반적으로 <strong className="text-blue-600 dark:text-blue-400">3.3%</strong>의 원천징수율이 적용되며, 
                연말정산 시 실제 세액과 비교하여 정산됩니다.
              </p>
            </section>

            <section className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <span className="text-2xl">💰</span>
                <span>실수령액 계산</span>
              </h3>
              <p className="text-base leading-relaxed text-foreground/80">
                실수령액 = 계약금액 - 원천징수세액입니다. 부가세 포함 계약의 경우 부가세를 제외한 공급가액 기준으로 원천징수세가 계산됩니다.
              </p>
            </section>

            <div className="my-8 flex justify-center">
              <AdSlot slotId="slot-c" format="auto" className="w-full" style={{ minHeight: '250px' }} />
            </div>

            <section className="bg-yellow-50 dark:bg-yellow-950/30 rounded-xl p-6 border-2 border-yellow-200 dark:border-yellow-800">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-3 text-yellow-800 dark:text-yellow-200">
                <span className="text-2xl">⚠️</span>
                <span>주의사항</span>
              </h3>
              <p className="text-base leading-relaxed text-foreground/90">
                본 계산기는 참고용이며, 실제 원천징수세와는 차이가 있을 수 있습니다. 
                정확한 원천징수세는 <strong>세무 전문가</strong>의 도움을 받으시기 바랍니다.
              </p>
            </section>
          </div>
        </div>
      </article>

      <AdModal isOpen={showAdModal} onClose={() => setShowAdModal(false)} slotId="slot-a" />
    </div>
  );
}

