'use client';

import { useState, useCallback, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { calculateIrpPension, formatCurrency, IrpPensionInput } from '@/lib/irp-pension-calculator';

export function IrpPensionCalculator() {
  const [input, setInput] = useState<IrpPensionInput>({
    irp: 0,
    pensionSavings: 0,
    annualIncome: 0,
  });

  const [result, setResult] = useState<ReturnType<typeof calculateIrpPension> | null>(null);
  const [hasCalculated, setHasCalculated] = useState(false);
  const resultSectionRef = useRef<HTMLDivElement>(null);

  const handleCalculate = useCallback(() => {
    if (input.irp <= 0 && input.pensionSavings <= 0) {
      alert('IRP 또는 연금저축 납입금액을 입력해주세요.');
      return;
    }

    try {
      const calculated = calculateIrpPension(input);
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
      irp: 0,
      pensionSavings: 0,
      annualIncome: 0,
    });
    setResult(null);
    setHasCalculated(false);
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6 md:py-10 space-y-8">
      <header className="text-center mb-10">
        <div className="mb-4">
          <span className="inline-block px-5 py-2 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-full text-base font-semibold mb-4">
            💎 IRP/연금저축 절세 효과 계산기
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
          IRP/연금저축 절세 효과 계산기
        </h1>
        <p className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto leading-relaxed">
          <span className="empathy-text">&ldquo;IRP와 연금저축, 얼마나 절세될까?&rdquo;</span>
          <br />
          IRP와 연금저축의 <strong>세액공제 효과</strong>를 계산하여<br />
          <strong className="text-green-600 dark:text-green-400">절세 금액</strong>을 확인해보세요!
        </p>
        <div className="mt-6 p-5 bg-purple-50 dark:bg-purple-950/30 border-2 border-purple-300 dark:border-purple-700 rounded-xl max-w-xl mx-auto shadow-sm">
          <p className="text-base font-medium text-foreground/90">
            ✅ <strong>세액공제율 16.5%</strong> · ✅ <strong>최대 400만원씩 납입</strong> · ✅ <strong>노후 대비도 함께</strong>
          </p>
        </div>
      </header>

      <Card className="focus-card border-2 border-purple-200 dark:border-purple-800 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-white dark:from-purple-950/20 dark:to-gray-900 pb-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
              <span className="text-xl">📝</span>
            </div>
            <CardTitle className="text-2xl md:text-3xl">납입금액 입력</CardTitle>
          </div>
          <CardDescription className="text-base">
            IRP와 연금저축 납입금액을 입력하세요.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <Label htmlFor="irp" className="text-base font-semibold flex items-center gap-2">
              <span className="text-lg">💎</span>
              <span>IRP 납입금액 (최대 400만원)</span>
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
              placeholder="예: 4000000"
            />
            <p className="text-sm text-foreground/70">
              💡 세액공제율 16.5%로 최대 66만원까지 절세 가능해요!
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
              placeholder="예: 4000000"
            />
            <p className="text-sm text-foreground/70">
              💡 세액공제율 16.5%로 최대 66만원까지 절세 가능해요!
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <Button
          onClick={handleCalculate}
          className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all text-lg py-6"
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
          <Card className="border-2 border-purple-300 dark:border-purple-700 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/40 dark:to-pink-950/40">
              <CardTitle className="text-3xl font-bold text-center text-purple-700 dark:text-purple-300">
                💰 절세 효과 결과
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {input.irp > 0 && (
                  <div className="p-6 bg-blue-50 dark:bg-blue-950/30 rounded-xl border-2 border-blue-200 dark:border-blue-800">
                    <div className="text-base font-semibold text-muted-foreground mb-2">IRP 절세액</div>
                    <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{formatCurrency(result.irpTaxCredit)}</div>
                    <p className="text-sm text-foreground/70 mt-2">납입 {formatCurrency(result.breakdown.irp.contribution)}</p>
                  </div>
                )}
                {input.pensionSavings > 0 && (
                  <div className="p-6 bg-green-50 dark:bg-green-950/30 rounded-xl border-2 border-green-200 dark:border-green-800">
                    <div className="text-base font-semibold text-muted-foreground mb-2">연금저축 절세액</div>
                    <div className="text-3xl font-bold text-green-600 dark:text-green-400">{formatCurrency(result.pensionTaxCredit)}</div>
                    <p className="text-sm text-foreground/70 mt-2">납입 {formatCurrency(result.breakdown.pension.contribution)}</p>
                  </div>
                )}
              </div>

              <div className="p-8 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/40 dark:to-pink-950/40 rounded-xl border-2 border-purple-300 dark:border-purple-700">
                <div className="text-center">
                  <div className="text-base font-semibold text-foreground/70 mb-2">총 절세액</div>
                  <div className="text-5xl font-bold text-purple-600 dark:text-purple-400 mb-2">{formatCurrency(result.totalTaxCredit)}</div>
                  <div className="text-xl font-semibold text-foreground/80">총 납입 {formatCurrency(result.totalContribution)}</div>
                </div>
              </div>

              <div className="p-6 bg-yellow-50 dark:bg-yellow-950/30 rounded-xl border-2 border-yellow-200 dark:border-yellow-800">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <span className="text-2xl">💡</span>
                  <span>IRP/연금저축 핵심 정보</span>
                </h3>
                <ul className="space-y-2 text-base text-foreground/80">
                  <li>✅ 세액공제율 16.5%로 매년 절세 가능해요!</li>
                  <li>✅ IRP와 연금저축 각각 최대 400만원까지 납입 가능해요!</li>
                  <li>✅ 노후 대비도 되고 절세도 되는 일석이조!</li>
                  <li>✅ 두 가지를 모두 활용하면 최대 132만원까지 절세 가능해요!</li>
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
                          `IRP/연금저축으로 ${formatCurrency(result.totalTaxCredit)} 절세 효과를 확인했어요! 💰\n\n${typeof window !== 'undefined' ? window.location.href : ''}`
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
                        `IRP/연금저축으로 ${formatCurrency(result.totalTaxCredit)} 절세 효과를 확인했어요! 💰\n\n${typeof window !== 'undefined' ? window.location.href : ''}`
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

