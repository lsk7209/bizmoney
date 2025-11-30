'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { calculateYearEndTax, formatCurrency, YearEndTaxInput } from '@/lib/year-end-tax-logic';

export function YearEndTaxCalculator() {
  const [input, setInput] = useState<YearEndTaxInput>({
    annualSalary: 0,
    withholdingTax: 0,
    dependents: 0,
    insurancePremium: 0,
    medicalExpenses: 0,
    educationExpenses: 0,
    donationAmount: 0,
    retirementSavings: 0,
    housingFund: 0,
    creditCard: 0,
  });

  const [result, setResult] = useState<ReturnType<typeof calculateYearEndTax> | null>(null);
  const [hasCalculated, setHasCalculated] = useState(false);
  const annualSalaryInputRef = useRef<HTMLInputElement>(null);
  const resultSectionRef = useRef<HTMLDivElement>(null);

  // Slot A 광고 모달 표시

  const handleCalculate = useCallback(() => {
    try {
      if (input.annualSalary <= 0) {
        alert('연봉을 입력해주세요.');
        if (annualSalaryInputRef.current) {
          annualSalaryInputRef.current.focus();
        }
        return;
      }

      const calculated = calculateYearEndTax(input);
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
      annualSalary: 0,
      withholdingTax: 0,
      dependents: 0,
      insurancePremium: 0,
      medicalExpenses: 0,
      educationExpenses: 0,
      donationAmount: 0,
      retirementSavings: 0,
      housingFund: 0,
      creditCard: 0,
    });
    setResult(null);
    setHasCalculated(false);
    if (annualSalaryInputRef.current) {
      annualSalaryInputRef.current.focus();
    }
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6 md:py-10 space-y-8">
      {/* 페이지 제목 */}
      <header className="text-center mb-10">
        <div className="mb-4">
          <span className="inline-block px-4 py-1.5 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full text-sm font-semibold mb-4">
            💰 무료 연말정산 계산기
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
          연말정산 계산기
        </h1>
        <p className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto leading-relaxed">
          <span className="empathy-text">&ldquo;연말정산 환급금이 궁금하신가요?&rdquo;</span>
          <br />
          연봉과 원천징수액을 입력하면 <strong>예상 환급금</strong>을 계산하고,<br />
          <strong className="text-green-600 dark:text-green-400">세액공제 항목</strong>을 활용하여 최적화하세요.
        </p>
        <div className="mt-6 p-4 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg max-w-xl mx-auto">
          <p className="text-sm text-foreground/80">
            ✅ <strong>100% 무료</strong> · ✅ <strong>개인정보 보호</strong> · ✅ <strong>즉시 결과 확인</strong>
          </p>
        </div>
      </header>

      {/* 입력 섹션 */}
      <Card className="focus-card border-2 border-green-200 dark:border-green-800 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-green-50 to-white dark:from-green-950/20 dark:to-gray-900 pb-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900 flex items-center justify-center">
              <span className="text-xl">📝</span>
            </div>
            <CardTitle className="text-2xl md:text-3xl">기본 정보</CardTitle>
          </div>
          <CardDescription className="text-base">
            연말정산 계산을 위한 기본 정보를 입력하세요.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <Label htmlFor="annualSalary" className="text-base font-semibold flex items-center gap-2">
              <span className="text-lg">💵</span>
              <span>연봉 (원천징수 전)</span>
              <span className="text-red-500">*</span>
            </Label>
            <Input
              ref={annualSalaryInputRef}
              id="annualSalary"
              type="number"
              min="0"
              step="1000"
              value={input.annualSalary === 0 ? '' : input.annualSalary}
              onChange={(e) => {
                const value = Number(e.target.value) || 0;
                setInput({ ...input, annualSalary: Math.max(0, value) });
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleCalculate();
                }
              }}
              placeholder="예: 50000000"
              className="h-14 text-lg font-medium border-2 border-gray-300 dark:border-gray-700 rounded-xl px-4 focus:border-green-500 focus:ring-2 focus:ring-green-500"
              aria-required="true"
            />
          </div>

          <div className="space-y-3">
            <Label htmlFor="withholdingTax" className="text-base font-semibold flex items-center gap-2">
              <span className="text-lg">📥</span>
              <span>원천징수세액</span>
              <span className="text-red-500">*</span>
            </Label>
            <Input
              id="withholdingTax"
              type="number"
              min="0"
              step="1000"
              value={input.withholdingTax === 0 ? '' : input.withholdingTax}
              onChange={(e) => {
                const value = Number(e.target.value) || 0;
                setInput({ ...input, withholdingTax: Math.max(0, value) });
              }}
              placeholder="예: 2000000"
              className="h-14 text-lg font-medium border-2 border-gray-300 dark:border-gray-700 rounded-xl px-4 focus:border-green-500 focus:ring-2 focus:ring-green-500"
              aria-required="true"
            />
            <p className="text-sm text-foreground/60">
              💡 연봉에서 원천징수된 세액을 입력하세요.
            </p>
          </div>

          <div className="space-y-3">
            <Label htmlFor="dependents" className="text-base font-semibold flex items-center gap-2">
              <span className="text-lg">👨‍👩‍👧‍👦</span>
              <span>부양가족 수</span>
            </Label>
            <Input
              id="dependents"
              type="number"
              min="0"
              max="20"
              value={input.dependents === 0 ? '' : input.dependents}
              onChange={(e) => {
                const value = Number(e.target.value) || 0;
                setInput({ ...input, dependents: Math.min(Math.max(0, value), 20) });
              }}
              placeholder="0"
              className="h-14 text-lg font-medium border-2 border-gray-300 dark:border-gray-700 rounded-xl px-4 focus:border-green-500 focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* 소득공제 섹션 */}
          <div className="pt-4 border-t">
            <h3 className="text-lg font-semibold mb-4">소득공제 항목 (선택)</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="insurancePremium" className="text-sm">보험료</Label>
                <Input
                  id="insurancePremium"
                  type="number"
                  min="0"
                  step="1000"
                  value={input.insurancePremium === 0 ? '' : input.insurancePremium}
                  onChange={(e) => {
                    const value = Number(e.target.value) || 0;
                    setInput({ ...input, insurancePremium: Math.max(0, value) });
                  }}
                  placeholder="0"
                  className="h-12"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="medicalExpenses" className="text-sm">의료비</Label>
                <Input
                  id="medicalExpenses"
                  type="number"
                  min="0"
                  step="1000"
                  value={input.medicalExpenses === 0 ? '' : input.medicalExpenses}
                  onChange={(e) => {
                    const value = Number(e.target.value) || 0;
                    setInput({ ...input, medicalExpenses: Math.max(0, value) });
                  }}
                  placeholder="0"
                  className="h-12"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="educationExpenses" className="text-sm">교육비</Label>
                <Input
                  id="educationExpenses"
                  type="number"
                  min="0"
                  step="1000"
                  value={input.educationExpenses === 0 ? '' : input.educationExpenses}
                  onChange={(e) => {
                    const value = Number(e.target.value) || 0;
                    setInput({ ...input, educationExpenses: Math.max(0, value) });
                  }}
                  placeholder="0"
                  className="h-12"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="donationAmount" className="text-sm">기부금</Label>
                <Input
                  id="donationAmount"
                  type="number"
                  min="0"
                  step="1000"
                  value={input.donationAmount === 0 ? '' : input.donationAmount}
                  onChange={(e) => {
                    const value = Number(e.target.value) || 0;
                    setInput({ ...input, donationAmount: Math.max(0, value) });
                  }}
                  placeholder="0"
                  className="h-12"
                />
              </div>
            </div>
          </div>

          {/* 세액공제 섹션 */}
          <div className="pt-4 border-t">
            <h3 className="text-lg font-semibold mb-4">세액공제 항목 (선택)</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="retirementSavings" className="text-sm">퇴직연금 납입액</Label>
                <Input
                  id="retirementSavings"
                  type="number"
                  min="0"
                  step="1000"
                  value={input.retirementSavings === 0 ? '' : input.retirementSavings}
                  onChange={(e) => {
                    const value = Number(e.target.value) || 0;
                    setInput({ ...input, retirementSavings: Math.max(0, value) });
                  }}
                  placeholder="0"
                  className="h-12"
                />
                <p className="text-xs text-foreground/60">최대 20만원 공제</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="housingFund" className="text-sm">주택자금 납입액</Label>
                <Input
                  id="housingFund"
                  type="number"
                  min="0"
                  step="1000"
                  value={input.housingFund === 0 ? '' : input.housingFund}
                  onChange={(e) => {
                    const value = Number(e.target.value) || 0;
                    setInput({ ...input, housingFund: Math.max(0, value) });
                  }}
                  placeholder="0"
                  className="h-12"
                />
                <p className="text-xs text-foreground/60">최대 30만원 공제</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="creditCard" className="text-sm">신용카드 사용액</Label>
                <Input
                  id="creditCard"
                  type="number"
                  min="0"
                  step="1000"
                  value={input.creditCard === 0 ? '' : input.creditCard}
                  onChange={(e) => {
                    const value = Number(e.target.value) || 0;
                    setInput({ ...input, creditCard: Math.max(0, value) });
                  }}
                  placeholder="0"
                  className="h-12"
                />
                <p className="text-xs text-foreground/60">최대 30만원 공제</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button 
              onClick={handleCalculate} 
              className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all" 
              size="lg"
            >
              💰 환급금 계산하기
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

      {/* 결과 섹션 */}
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
                <div className="text-sm font-medium text-muted-foreground mb-2">종합소득금액</div>
                <div className="text-xl font-bold">{formatCurrency(result.totalIncome)}</div>
              </div>
              <div className="p-5 bg-white dark:bg-gray-900 rounded-xl border-2 border-gray-200 dark:border-gray-700">
                <div className="text-sm font-medium text-muted-foreground mb-2">과세표준</div>
                <div className="text-xl font-bold">{formatCurrency(result.taxableBase)}</div>
              </div>
              <div className="p-5 bg-white dark:bg-gray-900 rounded-xl border-2 border-gray-200 dark:border-gray-700">
                <div className="text-sm font-medium text-muted-foreground mb-2">산출세액</div>
                <div className="text-xl font-bold">{formatCurrency(result.calculatedTax)}</div>
              </div>
              <div className="p-5 bg-white dark:bg-gray-900 rounded-xl border-2 border-gray-200 dark:border-gray-700">
                <div className="text-sm font-medium text-muted-foreground mb-2">결정세액</div>
                <div className="text-xl font-bold">{formatCurrency(result.finalTax)}</div>
              </div>
              <div className="p-5 bg-white dark:bg-gray-900 rounded-xl border-2 border-gray-200 dark:border-gray-700">
                <div className="text-sm font-medium text-muted-foreground mb-2">원천징수세액</div>
                <div className="text-xl font-bold">{formatCurrency(result.withholdingTax)}</div>
              </div>
              <div className={`p-6 rounded-xl border-2 shadow-lg md:col-span-2 ${
                result.refundAmount > 0
                  ? 'bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/40 dark:to-green-900/20 border-green-300 dark:border-green-700'
                  : 'bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950/40 dark:to-red-900/20 border-red-300 dark:border-red-700'
              }`}>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">{result.refundAmount > 0 ? '💰' : '⚠️'}</span>
                  <div className={`text-sm font-semibold ${
                    result.refundAmount > 0 ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'
                  }`}>
                    {result.refundAmount > 0 ? '환급금' : '추가납부액'}
                  </div>
                </div>
                <div className={`text-3xl md:text-4xl font-bold ${
                  result.refundAmount > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                }`}>
                  {formatCurrency(Math.abs(result.refundAmount))}
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-900 rounded-lg">
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                <strong>⚠️ 면책 조항:</strong> 본 계산 결과는 모의 계산이며 법적 효력이 없습니다. 정확한 연말정산은 홈택스에서 직접 계산하거나 세무 전문가의 도움을 받으시기 바랍니다.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Slot B */}
      {result && hasCalculated && (
        <div className="my-8 flex justify-center">
        </div>
      )}

      {/* SEO 콘텐츠 */}
      <article className="prose prose-lg max-w-none dark:prose-invert mt-16">
        <div className="bg-gradient-to-r from-green-50 to-white dark:from-green-950/20 dark:to-gray-900 rounded-2xl p-8 md:p-10 border-2 border-green-200 dark:border-green-800">
          <h2 className="text-3xl font-bold mb-6">연말정산 계산기 사용 가이드</h2>
          <p className="text-lg leading-relaxed mb-8 text-foreground/80">
            연말정산은 1년간 원천징수된 세액과 실제 납부해야 할 세액을 정산하는 제도입니다. 본 계산기로 예상 환급금을 확인하세요.
          </p>
          
          <div className="space-y-8">
            <section className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <span className="text-2xl">💡</span>
                <span>소득공제 vs 세액공제</span>
              </h3>
              <div className="space-y-3 text-base leading-relaxed text-foreground/80">
                <p><strong className="text-green-600 dark:text-green-400">소득공제</strong>: 소득금액에서 차감되어 과세표준을 낮춥니다. 보험료, 의료비, 교육비, 기부금 등이 해당됩니다.</p>
                <p><strong className="text-green-600 dark:text-green-400">세액공제</strong>: 산출세액에서 직접 차감됩니다. 퇴직연금, 주택자금, 신용카드 사용액 등이 해당됩니다.</p>
              </div>
            </section>

            <section className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <span className="text-2xl">💰</span>
                <span>환급금 계산</span>
              </h3>
              <p className="text-base leading-relaxed text-foreground/80">
                환급금 = 원천징수세액 - 결정세액입니다. 원천징수세액이 결정세액보다 많으면 <strong className="text-green-600 dark:text-green-400">환급금</strong>을 받고, 반대의 경우 <strong className="text-red-600 dark:text-red-400">추가납부</strong>가 발생합니다.
              </p>
            </section>

            <div className="my-8 flex justify-center">
            </div>

            <section className="bg-yellow-50 dark:bg-yellow-950/30 rounded-xl p-6 border-2 border-yellow-200 dark:border-yellow-800">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-3 text-yellow-800 dark:text-yellow-200">
                <span className="text-2xl">⚠️</span>
                <span>주의사항</span>
              </h3>
              <p className="text-base leading-relaxed text-foreground/90">
                본 계산기는 참고용이며, 실제 연말정산과는 차이가 있을 수 있습니다. 정확한 연말정산은 <strong>홈택스</strong>에서 직접 계산하거나 <strong>세무 전문가</strong>의 도움을 받으시기 바랍니다.
              </p>
            </section>
          </div>
        </div>
      </article>

    </div>
  );
}

