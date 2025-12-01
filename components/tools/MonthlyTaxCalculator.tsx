'use client';

import { useState, useCallback, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { calculateMonthlyTax, formatCurrency, MonthlyTaxInput } from '@/lib/monthly-tax-calculator';

export function MonthlyTaxCalculator() {
  const [input, setInput] = useState<MonthlyTaxInput>({
    monthlyIncome: 0,
    months: 12,
    dependents: 0,
  });

  const [result, setResult] = useState<ReturnType<typeof calculateMonthlyTax> | null>(null);
  const [hasCalculated, setHasCalculated] = useState(false);
  const resultSectionRef = useRef<HTMLDivElement>(null);

  const handleCalculate = useCallback(() => {
    if (input.monthlyIncome <= 0) {
      alert('월 소득을 입력해주세요.');
      return;
    }

    try {
      const calculated = calculateMonthlyTax(input);
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
      monthlyIncome: 0,
      months: 12,
      dependents: 0,
    });
    setResult(null);
    setHasCalculated(false);
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6 md:py-10 space-y-8">
      <header className="text-center mb-10">
        <div className="mb-4">
          <span className="inline-block px-5 py-2 bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300 rounded-full text-base font-semibold mb-4">
            📅 월별 세금 납부액 계산기
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-orange-800 bg-clip-text text-transparent">
          월별 세금 납부액 계산기
        </h1>
        <p className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto leading-relaxed">
          <span className="empathy-text">&ldquo;매월 얼마씩 세금을 내야 할까?&rdquo;</span>
          <br />
          월별 소득에 따른 <strong>누적 세액</strong>을 계산하여<br />
          <strong className="text-green-600 dark:text-green-400">월별 납부액</strong>을 확인해보세요!
        </p>
        <div className="mt-6 p-5 bg-orange-50 dark:bg-orange-950/30 border-2 border-orange-300 dark:border-orange-700 rounded-xl max-w-xl mx-auto shadow-sm">
          <p className="text-base font-medium text-foreground/90">
            ✅ <strong>누적 소득 기준 계산</strong> · ✅ <strong>월별 납부액 확인</strong> · ✅ <strong>2025년 최신 세법</strong>
          </p>
        </div>
      </header>

      <Card className="focus-card border-2 border-orange-200 dark:border-orange-800 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-orange-50 to-white dark:from-orange-950/20 dark:to-gray-900 pb-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-orange-100 dark:bg-orange-900 flex items-center justify-center">
              <span className="text-xl">📝</span>
            </div>
            <CardTitle className="text-2xl md:text-3xl">기본 정보 입력</CardTitle>
          </div>
          <CardDescription className="text-base">
            월 소득과 계산할 월 수를 입력하세요.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <Label htmlFor="monthlyIncome" className="text-base font-semibold flex items-center gap-2">
              <span className="text-lg">💵</span>
              <span>월 소득 (매출)</span>
              <span className="text-red-500">*</span>
            </Label>
            <Input
              id="monthlyIncome"
              type="number"
              min="0"
              step="1000"
              value={input.monthlyIncome === 0 ? '' : input.monthlyIncome}
              onChange={(e) => setInput({ ...input, monthlyIncome: Number(e.target.value) || 0 })}
              className="h-12 text-base"
              placeholder="예: 5000000"
            />
          </div>

          <div className="space-y-3">
            <Label htmlFor="months" className="text-base font-semibold">
              계산할 월 수
            </Label>
            <Input
              id="months"
              type="number"
              min="1"
              max="12"
              value={input.months}
              onChange={(e) => setInput({ ...input, months: Math.max(1, Math.min(12, Number(e.target.value) || 1)) })}
              className="h-12 text-base"
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
          className="flex-1 bg-orange-600 hover:bg-orange-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all text-lg py-6"
          size="lg"
        >
          📅 월별 세금 계산하기
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
          <Card className="border-2 border-orange-300 dark:border-orange-700 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-950/40 dark:to-yellow-950/40">
              <CardTitle className="text-3xl font-bold text-center text-orange-700 dark:text-orange-300">
                📅 월별 세금 납부액 결과
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="p-6 bg-blue-50 dark:bg-blue-950/30 rounded-xl border-2 border-blue-200 dark:border-blue-800">
                  <div className="text-base font-semibold text-muted-foreground mb-2">총 소득</div>
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{formatCurrency(result.total.income)}</div>
                </div>
                <div className="p-6 bg-green-50 dark:bg-green-950/30 rounded-xl border-2 border-green-200 dark:border-green-800">
                  <div className="text-base font-semibold text-muted-foreground mb-2">총 세액</div>
                  <div className="text-3xl font-bold text-green-600 dark:text-green-400">{formatCurrency(result.total.tax)}</div>
                </div>
                <div className="p-6 bg-purple-50 dark:bg-purple-950/30 rounded-xl border-2 border-purple-200 dark:border-purple-800">
                  <div className="text-base font-semibold text-muted-foreground mb-2">월평균 세액</div>
                  <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">{formatCurrency(result.total.averageMonthlyTax)}</div>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-xl font-bold mb-4">📊 월별 상세 내역</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-100 dark:bg-gray-800">
                        <th className="border p-3 text-left">월</th>
                        <th className="border p-3 text-right">누적 소득</th>
                        <th className="border p-3 text-right">월 납부액</th>
                        <th className="border p-3 text-right">누적 세액</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.monthly.map((item) => (
                        <tr key={item.month} className="hover:bg-gray-50 dark:hover:bg-gray-900">
                          <td className="border p-3 font-semibold">{item.month}월</td>
                          <td className="border p-3 text-right">{formatCurrency(item.cumulativeIncome)}</td>
                          <td className="border p-3 text-right font-semibold text-orange-600 dark:text-orange-400">{formatCurrency(item.tax)}</td>
                          <td className="border p-3 text-right">{formatCurrency(item.cumulativeTax)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="p-6 bg-blue-50 dark:bg-blue-950/30 rounded-xl border-2 border-blue-200 dark:border-blue-800">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <span className="text-2xl">💡</span>
                  <span>월별 세금 계산 팁</span>
                </h3>
                <ul className="space-y-2 text-base text-foreground/80">
                  <li>✅ 누진세율 때문에 소득이 많을수록 세율이 올라가요!</li>
                  <li>✅ 월별로 세금을 미리 준비하면 부담이 줄어들어요!</li>
                  <li>✅ 공제 항목을 활용하면 세액을 줄일 수 있어요!</li>
                  <li>✅ 원천징수세는 다음 해 5월에 정산돼요!</li>
                </ul>
              </div>

              <div className="p-5 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 rounded-xl border-2 border-green-200 dark:border-green-800">
                <p className="text-center font-semibold text-base mb-4 text-foreground">
                  🎉 친구들도 월별 세금을 확인해보라고 공유해보세요!
                </p>
                <div className="flex flex-wrap gap-3 justify-center">
                  <Button
                    onClick={async () => {
                      try {
                        await navigator.clipboard.writeText(
                          `월별 세금 계산기로 월평균 ${formatCurrency(result.total.averageMonthlyTax)} 세금을 확인했어요! 💰\n\n${typeof window !== 'undefined' ? window.location.href : ''}`
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
                        `월별 세금 계산기로 월평균 ${formatCurrency(result.total.averageMonthlyTax)} 세금을 확인했어요! 💰\n\n${typeof window !== 'undefined' ? window.location.href : ''}`
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

