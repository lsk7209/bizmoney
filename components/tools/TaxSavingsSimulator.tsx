'use client';

import { useState, useCallback, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { calculateTaxSavings, formatCurrency, TaxSavingsInput } from '@/lib/tax-savings-simulator';

export function TaxSavingsSimulator() {
  const [input, setInput] = useState<TaxSavingsInput>({
    annualIncome: 0,
    dependents: 0,
    yellowUmbrella: 0,
    irp: 0,
    pensionSavings: 0,
    housingFund: 0,
    creditCard: 0,
    insurancePremium: 0,
    medicalExpenses: 0,
    educationExpenses: 0,
    donationAmount: 0,
  });

  const [result, setResult] = useState<ReturnType<typeof calculateTaxSavings> | null>(null);
  const [hasCalculated, setHasCalculated] = useState(false);
  const resultSectionRef = useRef<HTMLDivElement>(null);

  const handleCalculate = useCallback(() => {
    if (input.annualIncome <= 0) {
      alert('연간 소득을 입력해주세요.');
      return;
    }

    try {
      const calculated = calculateTaxSavings(input);
      setResult(calculated);
      setHasCalculated(true);

      setTimeout(() => {
        resultSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } catch (error) {
      console.error('Calculation error:', error);
      alert('계산 중 오류가 발생했습니다.');
    }
  }, [input]);

  const handleReset = useCallback(() => {
    setInput({
      annualIncome: 0,
      dependents: 0,
      yellowUmbrella: 0,
      irp: 0,
      pensionSavings: 0,
      housingFund: 0,
      creditCard: 0,
      insurancePremium: 0,
      medicalExpenses: 0,
      educationExpenses: 0,
      donationAmount: 0,
    });
    setResult(null);
    setHasCalculated(false);
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6 md:py-10 space-y-8">
      <header className="text-center mb-10">
        <div className="mb-4">
          <span className="inline-block px-5 py-2 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full text-base font-semibold mb-4">
            💰 세금 절약 시뮬레이터
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
          세금 절약 시뮬레이터
        </h1>
        <p className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto leading-relaxed">
          <span className="empathy-text">&ldquo;어떤 공제를 활용하면 가장 많이 절세할 수 있을까?&rdquo;</span>
          <br />
          다양한 공제 항목을 조합하여 <strong>최대 절세 효과</strong>를 시뮬레이션해보세요!
        </p>
        <div className="mt-6 p-5 bg-green-50 dark:bg-green-950/30 border-2 border-green-300 dark:border-green-700 rounded-xl max-w-xl mx-auto shadow-sm">
          <p className="text-base font-medium text-foreground/90">
            ✅ <strong>2025년 최신 세법 반영</strong> · ✅ <strong>실시간 절세 효과 확인</strong> · ✅ <strong>맞춤형 절세 전략</strong>
          </p>
        </div>
      </header>

      <Card className="focus-card border-2 border-green-200 dark:border-green-800 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-green-50 to-white dark:from-green-950/20 dark:to-gray-900 pb-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900 flex items-center justify-center">
              <span className="text-xl">📝</span>
            </div>
            <CardTitle className="text-2xl md:text-3xl">기본 정보 입력</CardTitle>
          </div>
          <CardDescription className="text-base">
            연간 소득과 부양가족 수를 입력하세요.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <Label htmlFor="annualIncome" className="text-base font-semibold flex items-center gap-2">
              <span className="text-lg">💵</span>
              <span>연간 총수입금액 (매출)</span>
              <span className="text-red-500">*</span>
            </Label>
            <Input
              id="annualIncome"
              type="number"
              min="0"
              step="1000"
              value={input.annualIncome === 0 ? '' : input.annualIncome}
              onChange={(e) => setInput({ ...input, annualIncome: Number(e.target.value) || 0 })}
              className="h-12 text-base"
              placeholder="예: 50000000"
            />
          </div>

          <div className="space-y-3">
            <Label htmlFor="dependents" className="text-base font-semibold">
              부양가족 수 (본인 포함)
            </Label>
            <Input
              id="dependents"
              type="number"
              min="0"
              max="20"
              value={input.dependents}
              onChange={(e) => setInput({ ...input, dependents: Math.max(0, Math.min(20, Number(e.target.value) || 0)) })}
              className="h-12 text-base"
            />
          </div>
        </CardContent>
      </Card>

      <Card className="focus-card border-2 border-blue-200 dark:border-blue-800 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-white dark:from-blue-950/20 dark:to-gray-900 pb-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
              <span className="text-xl">💎</span>
            </div>
            <CardTitle className="text-2xl md:text-3xl">세액공제 항목 (세액을 직접 줄여요!)</CardTitle>
          </div>
          <CardDescription className="text-base">
            세액공제는 계산된 세액에서 바로 차감되어 더 확실한 절세 효과가 있어요!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <Label htmlFor="yellowUmbrella" className="text-base font-semibold flex items-center gap-2">
              <span className="text-lg">☂️</span>
              <span>노란우산공제 가입금액 (최대 500만원)</span>
            </Label>
            <Input
              id="yellowUmbrella"
              type="number"
              min="0"
              max="5000000"
              step="10000"
              value={input.yellowUmbrella === 0 ? '' : input.yellowUmbrella}
              onChange={(e) => setInput({ ...input, yellowUmbrella: Math.min(5000000, Number(e.target.value) || 0) })}
              className="h-12 text-base"
              placeholder="예: 5000000"
            />
            <p className="text-sm text-foreground/70">
              💡 프리랜서를 위한 퇴직금 제도! 세액공제율 16.5% (최대 82.5만원 절세)
            </p>
          </div>

          <div className="space-y-3">
            <Label htmlFor="irp" className="text-base font-semibold">
              IRP 납입금액 (최대 400만원)
            </Label>
            <Input
              id="irp"
              type="number"
              min="0"
              max="4000000"
              step="10000"
              value={input.irp === 0 ? '' : input.irp}
              onChange={(e) => setInput({ ...input, irp: Math.min(4000000, Number(e.target.value) || 0) })}
              className="h-12 text-base"
            />
            <p className="text-sm text-foreground/70">
              💡 세액공제율 16.5% (최대 66만원 절세)
            </p>
          </div>

          <div className="space-y-3">
            <Label htmlFor="pensionSavings" className="text-base font-semibold">
              연금저축 납입금액 (최대 400만원)
            </Label>
            <Input
              id="pensionSavings"
              type="number"
              min="0"
              max="4000000"
              step="10000"
              value={input.pensionSavings === 0 ? '' : input.pensionSavings}
              onChange={(e) => setInput({ ...input, pensionSavings: Math.min(4000000, Number(e.target.value) || 0) })}
              className="h-12 text-base"
            />
            <p className="text-sm text-foreground/70">
              💡 세액공제율 16.5% (최대 66만원 절세)
            </p>
          </div>

          <div className="space-y-3">
            <Label htmlFor="housingFund" className="text-base font-semibold">
              주택자금 납입금액 (최대 300만원)
            </Label>
            <Input
              id="housingFund"
              type="number"
              min="0"
              max="3000000"
              step="10000"
              value={input.housingFund === 0 ? '' : input.housingFund}
              onChange={(e) => setInput({ ...input, housingFund: Math.min(3000000, Number(e.target.value) || 0) })}
              className="h-12 text-base"
            />
            <p className="text-sm text-foreground/70">
              💡 세액공제율 40% (최대 120만원 절세) - 가장 높은 공제율!
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="focus-card border-2 border-purple-200 dark:border-purple-800 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-white dark:from-purple-950/20 dark:to-gray-900 pb-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
              <span className="text-xl">📉</span>
            </div>
            <CardTitle className="text-2xl md:text-3xl">소득공제 항목 (과세표준을 낮춰요!)</CardTitle>
          </div>
          <CardDescription className="text-base">
            소득공제는 과세표준을 낮춰서 세율도 낮아져 이중으로 유리해요!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <Label htmlFor="creditCard" className="text-base font-semibold">
              신용카드/체크카드 사용액 (최대 300만원)
            </Label>
            <Input
              id="creditCard"
              type="number"
              min="0"
              max="3000000"
              step="10000"
              value={input.creditCard === 0 ? '' : input.creditCard}
              onChange={(e) => setInput({ ...input, creditCard: Math.min(3000000, Number(e.target.value) || 0) })}
              className="h-12 text-base"
            />
            <p className="text-sm text-foreground/70">
              💡 일상 지출도 세금 절감에 도움이 돼요! 소득공제 15%
            </p>
          </div>

          <div className="space-y-3">
            <Label htmlFor="insurancePremium" className="text-base font-semibold">
              보험료 납입액
            </Label>
            <Input
              id="insurancePremium"
              type="number"
              min="0"
              step="10000"
              value={input.insurancePremium === 0 ? '' : input.insurancePremium}
              onChange={(e) => setInput({ ...input, insurancePremium: Number(e.target.value) || 0 })}
              className="h-12 text-base"
            />
          </div>

          <div className="space-y-3">
            <Label htmlFor="medicalExpenses" className="text-base font-semibold">
              의료비 지출액
            </Label>
            <Input
              id="medicalExpenses"
              type="number"
              min="0"
              step="10000"
              value={input.medicalExpenses === 0 ? '' : input.medicalExpenses}
              onChange={(e) => setInput({ ...input, medicalExpenses: Number(e.target.value) || 0 })}
              className="h-12 text-base"
            />
          </div>

          <div className="space-y-3">
            <Label htmlFor="educationExpenses" className="text-base font-semibold">
              교육비 지출액
            </Label>
            <Input
              id="educationExpenses"
              type="number"
              min="0"
              step="10000"
              value={input.educationExpenses === 0 ? '' : input.educationExpenses}
              onChange={(e) => setInput({ ...input, educationExpenses: Number(e.target.value) || 0 })}
              className="h-12 text-base"
            />
          </div>

          <div className="space-y-3">
            <Label htmlFor="donationAmount" className="text-base font-semibold">
              기부금 지출액
            </Label>
            <Input
              id="donationAmount"
              type="number"
              min="0"
              step="10000"
              value={input.donationAmount === 0 ? '' : input.donationAmount}
              onChange={(e) => setInput({ ...input, donationAmount: Number(e.target.value) || 0 })}
              className="h-12 text-base"
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <Button
          onClick={handleCalculate}
          className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all text-lg py-6"
          size="lg"
        >
          💰 절세 효과 계산하기
        </Button>
        <Button
          onClick={handleReset}
          variant="outline"
          className="border-2 hover:bg-gray-50 dark:hover:bg-gray-800 font-semibold"
          size="lg"
        >
          초기화
        </Button>
      </div>

      {result && hasCalculated && (
        <div ref={resultSectionRef} className="space-y-6">
          <Card className="border-2 border-green-300 dark:border-green-700 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/40 dark:to-emerald-950/40">
              <CardTitle className="text-3xl font-bold text-center text-green-700 dark:text-green-300">
                💰 절세 효과 결과
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-red-50 dark:bg-red-950/30 rounded-xl border-2 border-red-200 dark:border-red-800">
                  <div className="text-base font-semibold text-muted-foreground mb-2">공제 전 세액</div>
                  <div className="text-3xl font-bold text-red-600 dark:text-red-400">{formatCurrency(result.baseTax)}</div>
                </div>
                <div className="p-6 bg-green-50 dark:bg-green-950/30 rounded-xl border-2 border-green-200 dark:border-green-800">
                  <div className="text-base font-semibold text-muted-foreground mb-2">공제 후 세액</div>
                  <div className="text-3xl font-bold text-green-600 dark:text-green-400">{formatCurrency(result.finalTax)}</div>
                </div>
              </div>

              <div className="p-8 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/40 dark:to-emerald-950/40 rounded-xl border-2 border-green-300 dark:border-green-700">
                <div className="text-center">
                  <div className="text-base font-semibold text-foreground/70 mb-2">총 절세액</div>
                  <div className="text-5xl font-bold text-green-600 dark:text-green-400 mb-2">{formatCurrency(result.savings)}</div>
                  <div className="text-xl font-semibold text-foreground/80">절세율 {result.savingsRate.toFixed(1)}%</div>
                </div>
              </div>

              {result.details.breakdown.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-xl font-bold mb-4">📊 공제 항목별 절세 효과</h3>
                  <div className="space-y-3">
                    {result.details.breakdown.map((item, index) => (
                      <div
                        key={index}
                        className="p-4 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700"
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="font-semibold text-base">{item.name}</div>
                            <div className="text-sm text-foreground/70">
                              {formatCurrency(item.amount)} · {item.type === 'tax' ? '세액공제' : '소득공제'}
                            </div>
                          </div>
                          <div className="text-lg font-bold text-green-600 dark:text-green-400">
                            {formatCurrency(item.savings)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="p-6 bg-blue-50 dark:bg-blue-950/30 rounded-xl border-2 border-blue-200 dark:border-blue-800">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <span className="text-2xl">💡</span>
                  <span>절세 팁</span>
                </h3>
                <ul className="space-y-2 text-base text-foreground/80">
                  <li>✅ 세액공제가 소득공제보다 더 확실한 절세 효과가 있어요!</li>
                  <li>✅ 주택자금 세액공제율(40%)이 가장 높아요!</li>
                  <li>✅ 여러 공제를 조합하면 절세 효과가 배가돼요!</li>
                  <li>✅ 노란우산공제는 프리랜서에게 특히 유리해요!</li>
                </ul>
              </div>

              <div className="p-5 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 rounded-xl border-2 border-green-200 dark:border-green-800">
                <p className="text-center font-semibold text-base mb-4 text-foreground">
                  🎉 친구들도 절세 효과를 확인해보라고 공유해보세요!
                </p>
                <div className="flex flex-wrap gap-3 justify-center">
                  <Button
                    onClick={async () => {
                      try {
                        await navigator.clipboard.writeText(
                          `세금 절약 시뮬레이터로 ${formatCurrency(result.savings)} 절세 효과를 확인했어요! 💰\n\n${typeof window !== 'undefined' ? window.location.href : ''}`
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
                        `세금 절약 시뮬레이터로 ${formatCurrency(result.savings)} 절세 효과를 확인했어요! 💰\n\n${typeof window !== 'undefined' ? window.location.href : ''}`
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
            </CardContent>
          </Card>
        </div>
      )}

      <div className="mt-8 p-6 bg-yellow-50 dark:bg-yellow-950/50 border-2 border-yellow-300 dark:border-yellow-700 rounded-xl shadow-md">
        <p className="text-sm text-foreground/80 leading-relaxed">
          <strong className="font-semibold">⚠️ 면책 조항:</strong> 본 계산기는 참고용이며, 실제 세액과는 차이가 있을 수 있습니다.
          정확한 세액 계산을 위해서는 홈택스에서 직접 계산하거나 세무 전문가의 도움을 받으시기 바랍니다.
        </p>
      </div>
    </div>
  );
}

