'use client';

import { useState, useCallback, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { simulateRefund, formatCurrency, RefundSimulatorInput } from '@/lib/refund-simulator';

export function RefundSimulator() {
  const [input, setInput] = useState<RefundSimulatorInput>({
    annualIncome: 0,
    withholdingTax: 0,
    dependents: 0,
    deductions: {
      yellowUmbrella: 0,
      irp: 0,
      pensionSavings: 0,
      housingFund: 0,
      creditCard: 0,
      insurancePremium: 0,
      medicalExpenses: 0,
      educationExpenses: 0,
      donationAmount: 0,
    },
  });

  const [result, setResult] = useState<ReturnType<typeof simulateRefund> | null>(null);
  const [hasCalculated, setHasCalculated] = useState(false);
  const resultSectionRef = useRef<HTMLDivElement>(null);

  const handleCalculate = useCallback(() => {
    if (input.annualIncome <= 0) {
      alert('연간 소득을 입력해주세요.');
      return;
    }

    try {
      const calculated = simulateRefund(input);
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
      withholdingTax: 0,
      dependents: 0,
      deductions: {
        yellowUmbrella: 0,
        irp: 0,
        pensionSavings: 0,
        housingFund: 0,
        creditCard: 0,
        insurancePremium: 0,
        medicalExpenses: 0,
        educationExpenses: 0,
        donationAmount: 0,
      },
    });
    setResult(null);
    setHasCalculated(false);
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6 md:py-10 space-y-8">
      <header className="text-center mb-10">
        <div className="mb-4">
          <span className="inline-block px-5 py-2 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full text-base font-semibold mb-4">
            💰 환급금 예상 시뮬레이터
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
          환급금 예상 시뮬레이터
        </h1>
        <p className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto leading-relaxed">
          <span className="empathy-text">&ldquo;내가 받을 환급금은 얼마일까?&rdquo;</span>
          <br />
          다양한 시나리오별로 <strong>예상 환급금</strong>을 계산하여<br />
          <strong className="text-green-600 dark:text-green-400">최대 환급금</strong>을 확인해보세요!
        </p>
        <div className="mt-6 p-5 bg-green-50 dark:bg-green-950/30 border-2 border-green-300 dark:border-green-700 rounded-xl max-w-xl mx-auto shadow-sm">
          <p className="text-base font-medium text-foreground/90">
            ✅ <strong>다양한 시나리오 비교</strong> · ✅ <strong>최대/최소 환급금 확인</strong> · ✅ <strong>2025년 최신 세법</strong>
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
            연간 소득과 원천징수세액을 입력하세요.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <Label htmlFor="annualIncome" className="text-base font-semibold flex items-center gap-2">
              <span className="text-lg">💵</span>
              <span>연간 총수입금액</span>
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
            <Label htmlFor="withholdingTax" className="text-base font-semibold">
              원천징수세액
            </Label>
            <Input
              id="withholdingTax"
              type="number"
              min="0"
              step="1000"
              value={input.withholdingTax === 0 ? '' : input.withholdingTax}
              onChange={(e) => setInput({ ...input, withholdingTax: Number(e.target.value) || 0 })}
              className="h-12 text-base"
              placeholder="예: 1650000"
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

      <div className="flex gap-4">
        <Button
          onClick={handleCalculate}
          className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all text-lg py-6"
          size="lg"
        >
          💰 환급금 시뮬레이션하기
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
                💰 환급금 시뮬레이션 결과
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              <div className="p-8 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/40 dark:to-emerald-950/40 rounded-xl border-2 border-green-300 dark:border-green-700">
                <div className="text-center">
                  <div className="text-base font-semibold text-foreground/70 mb-2">최대 예상 환급금</div>
                  <div className="text-5xl font-bold text-green-600 dark:text-green-400 mb-2">{formatCurrency(result.bestScenario.refund)}</div>
                  <div className="text-xl font-semibold text-foreground/80">{result.bestScenario.name}</div>
                  <p className="text-sm text-foreground/70 mt-2">{result.bestScenario.description}</p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-bold mb-4">📊 시나리오별 환급금</h3>
                {result.scenarios.map((scenario, index) => (
                  <div
                    key={index}
                    className={`p-6 rounded-xl border-2 ${
                      scenario.refund > 0
                        ? 'bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800'
                        : 'bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-semibold text-lg mb-1">{scenario.name}</div>
                        <p className="text-sm text-foreground/70">{scenario.description}</p>
                      </div>
                      <div className="text-right">
                        <div className={`text-2xl font-bold ${
                          scenario.refund > 0
                            ? 'text-green-600 dark:text-green-400'
                            : 'text-red-600 dark:text-red-400'
                        }`}>
                          {scenario.refund > 0 ? '+' : ''}{formatCurrency(scenario.refund)}
                        </div>
                        <div className="text-sm text-foreground/70">
                          {scenario.refund > 0 ? '환급' : '추가납부'}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-6 bg-blue-50 dark:bg-blue-950/30 rounded-xl border-2 border-blue-200 dark:border-blue-800">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <span className="text-2xl">💡</span>
                  <span>환급금 늘리는 팁</span>
                </h3>
                <ul className="space-y-2 text-base text-foreground/80">
                  <li>✅ 노란우산공제, IRP, 연금저축 등 세액공제 활용하기</li>
                  <li>✅ 신용카드, 보험료, 의료비 등 소득공제 활용하기</li>
                  <li>✅ 경비 증빙을 잘 챙기기</li>
                  <li>✅ 국세청 원클릭으로 최대 5년치 환급금 확인하기</li>
                </ul>
              </div>

              <div className="p-5 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 rounded-xl border-2 border-green-200 dark:border-green-800">
                <p className="text-center font-semibold text-base mb-4 text-foreground">
                  🎉 친구들도 환급금을 확인해보라고 공유해보세요!
                </p>
                <div className="flex flex-wrap gap-3 justify-center">
                  <Button
                    onClick={async () => {
                      try {
                        await navigator.clipboard.writeText(
                          `환급금 시뮬레이터로 최대 ${formatCurrency(result.bestScenario.refund)} 환급금을 확인했어요! 💰\n\n${typeof window !== 'undefined' ? window.location.href : ''}`
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
                        `환급금 시뮬레이터로 최대 ${formatCurrency(result.bestScenario.refund)} 환급금을 확인했어요! 💰\n\n${typeof window !== 'undefined' ? window.location.href : ''}`
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
          <strong className="font-semibold">⚠️ 면책 조항:</strong> 본 계산기는 참고용이며, 실제 환급금과는 차이가 있을 수 있습니다.
          정확한 환급금은 홈택스 원클릭으로 확인하거나 세무 전문가의 도움을 받으시기 바랍니다.
        </p>
      </div>
    </div>
  );
}

