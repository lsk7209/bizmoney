'use client';

import { useState, useCallback, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { calculateYellowUmbrella, formatCurrency, YellowUmbrellaInput } from '@/lib/yellow-umbrella-calculator';

export function YellowUmbrellaCalculator() {
  const [input, setInput] = useState<YellowUmbrellaInput>({
    annualIncome: 0,
    contribution: 0,
    years: 1,
  });

  const [result, setResult] = useState<ReturnType<typeof calculateYellowUmbrella> | null>(null);
  const [hasCalculated, setHasCalculated] = useState(false);
  const resultSectionRef = useRef<HTMLDivElement>(null);

  const handleCalculate = useCallback(() => {
    if (input.contribution <= 0) {
      alert('납입금액을 입력해주세요.');
      return;
    }

    try {
      const calculated = calculateYellowUmbrella(input);
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
      contribution: 0,
      years: 1,
    });
    setResult(null);
    setHasCalculated(false);
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6 md:py-10 space-y-8">
      <header className="text-center mb-10">
        <div className="mb-4">
          <span className="inline-block px-5 py-2 bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300 rounded-full text-base font-semibold mb-4">
            ☂️ 노란우산공제 수익 계산기
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-600 to-yellow-800 bg-clip-text text-transparent">
          노란우산공제 수익 계산기
        </h1>
        <p className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto leading-relaxed">
          <span className="empathy-text">&ldquo;노란우산공제 가입하면 얼마나 절세될까?&rdquo;</span>
          <br />
          프리랜서를 위한 퇴직금 제도인 <strong>노란우산공제</strong>의<br />
          <strong className="text-green-600 dark:text-green-400">절세 효과와 수익률</strong>을 계산해보세요!
        </p>
        <div className="mt-6 p-5 bg-yellow-50 dark:bg-yellow-950/30 border-2 border-yellow-300 dark:border-yellow-700 rounded-xl max-w-xl mx-auto shadow-sm">
          <p className="text-base font-medium text-foreground/90">
            ✅ <strong>2025년 최신 세법 반영</strong> · ✅ <strong>세액공제율 16.5%</strong> · ✅ <strong>최대 500만원 납입</strong>
          </p>
        </div>
      </header>

      <Card className="focus-card border-2 border-yellow-200 dark:border-yellow-800 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-yellow-50 to-white dark:from-yellow-950/20 dark:to-gray-900 pb-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-yellow-100 dark:bg-yellow-900 flex items-center justify-center">
              <span className="text-xl">📝</span>
            </div>
            <CardTitle className="text-2xl md:text-3xl">기본 정보 입력</CardTitle>
          </div>
          <CardDescription className="text-base">
            납입금액과 가입 기간을 입력하세요.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <Label htmlFor="contribution" className="text-base font-semibold flex items-center gap-2">
              <span className="text-lg">💰</span>
              <span>연간 납입금액 (최대 500만원)</span>
              <span className="text-red-500">*</span>
            </Label>
            <Input
              id="contribution"
              type="number"
              min="0"
              max="5000000"
              step="10000"
              value={input.contribution === 0 ? '' : input.contribution}
              onChange={(e) => setInput({ ...input, contribution: Math.min(5000000, Number(e.target.value) || 0) })}
              className="h-12 text-base"
              placeholder="예: 5000000"
            />
            <p className="text-sm text-foreground/70">
              💡 세액공제율 16.5%로 최대 82.5만원까지 절세 가능해요!
            </p>
          </div>

          <div className="space-y-3">
            <Label htmlFor="years" className="text-base font-semibold">
              가입 기간 (년)
            </Label>
            <Input
              id="years"
              type="number"
              min="1"
              max="30"
              value={input.years}
              onChange={(e) => setInput({ ...input, years: Math.max(1, Math.min(30, Number(e.target.value) || 1)) })}
              className="h-12 text-base"
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <Button
          onClick={handleCalculate}
          className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all text-lg py-6"
          size="lg"
        >
          💰 수익 계산하기
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
          <Card className="border-2 border-yellow-300 dark:border-yellow-700 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-950/40 dark:to-orange-950/40">
              <CardTitle className="text-3xl font-bold text-center text-yellow-700 dark:text-yellow-300">
                💰 수익 계산 결과
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-green-50 dark:bg-green-950/30 rounded-xl border-2 border-green-200 dark:border-green-800">
                  <div className="text-base font-semibold text-muted-foreground mb-2">연간 절세액</div>
                  <div className="text-3xl font-bold text-green-600 dark:text-green-400">{formatCurrency(result.annualTaxSavings)}</div>
                  <p className="text-sm text-foreground/70 mt-2">세액공제율 16.5%</p>
                </div>
                <div className="p-6 bg-blue-50 dark:bg-blue-950/30 rounded-xl border-2 border-blue-200 dark:border-blue-800">
                  <div className="text-base font-semibold text-muted-foreground mb-2">총 절세액 ({input.years}년)</div>
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{formatCurrency(result.totalTaxSavings)}</div>
                </div>
              </div>

              <div className="p-8 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-950/40 dark:to-orange-950/40 rounded-xl border-2 border-yellow-300 dark:border-yellow-700">
                <div className="text-center">
                  <div className="text-base font-semibold text-foreground/70 mb-2">순이익 (총 절세액 - 총 납입금액)</div>
                  <div className="text-5xl font-bold text-yellow-600 dark:text-yellow-400 mb-2">{formatCurrency(result.netBenefit)}</div>
                  <div className="text-xl font-semibold text-foreground/80">수익률 {result.returnRate.toFixed(1)}%</div>
                </div>
              </div>

              <div className="p-6 bg-blue-50 dark:bg-blue-950/30 rounded-xl border-2 border-blue-200 dark:border-blue-800">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <span className="text-2xl">💡</span>
                  <span>노란우산공제 핵심 정보</span>
                </h3>
                <ul className="space-y-2 text-base text-foreground/80">
                  <li>✅ 프리랜서를 위한 퇴직금 제도예요!</li>
                  <li>✅ 세액공제율 16.5%로 매년 절세 가능해요!</li>
                  <li>✅ 최대 500만원까지 납입 가능해요!</li>
                  <li>✅ 퇴직 시에도 혜택을 받을 수 있어요!</li>
                  <li>✅ 2025년부터 더 많은 혜택이 있어요!</li>
                </ul>
              </div>

              <div className="p-5 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 rounded-xl border-2 border-green-200 dark:border-green-800">
                <p className="text-center font-semibold text-base mb-4 text-foreground">
                  🎉 친구들도 수익을 계산해보라고 공유해보세요!
                </p>
                <div className="flex flex-wrap gap-3 justify-center">
                  <Button
                    onClick={async () => {
                      try {
                        await navigator.clipboard.writeText(
                          `노란우산공제로 연간 ${formatCurrency(result.annualTaxSavings)} 절세 효과를 확인했어요! 💰\n\n${typeof window !== 'undefined' ? window.location.href : ''}`
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
                        `노란우산공제로 연간 ${formatCurrency(result.annualTaxSavings)} 절세 효과를 확인했어요! 💰\n\n${typeof window !== 'undefined' ? window.location.href : ''}`
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

