'use client';

import { useState, useCallback, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { compareExpenseRate, formatCurrency, ExpenseRateComparisonInput } from '@/lib/expense-rate-comparison';

export function ExpenseRateComparison() {
  const [input, setInput] = useState<ExpenseRateComparisonInput>({
    annualIncome: 0,
    actualExpenses: 0,
    dependents: 0,
  });

  const [result, setResult] = useState<ReturnType<typeof compareExpenseRate> | null>(null);
  const [hasCalculated, setHasCalculated] = useState(false);
  const resultSectionRef = useRef<HTMLDivElement>(null);

  const handleCalculate = useCallback(() => {
    if (input.annualIncome <= 0) {
      alert('연간 소득을 입력해주세요.');
      return;
    }

    try {
      const calculated = compareExpenseRate(input);
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
      actualExpenses: 0,
      dependents: 0,
    });
    setResult(null);
    setHasCalculated(false);
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6 md:py-10 space-y-8">
      <header className="text-center mb-10">
        <div className="mb-4">
          <span className="inline-block px-5 py-2 bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 rounded-full text-base font-semibold mb-4">
            📊 단순경비율 vs 간편장부 비교
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-indigo-800 bg-clip-text text-transparent">
          단순경비율 vs 간편장부 비교 계산기
        </h1>
        <p className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto leading-relaxed">
          <span className="empathy-text">&ldquo;단순경비율과 간편장부, 어떤 게 더 유리할까?&rdquo;</span>
          <br />
          두 가지 신고 방식을 비교하여<br />
          <strong className="text-green-600 dark:text-green-400">어떤 게 더 유리한지</strong> 확인해보세요!
        </p>
        <div className="mt-6 p-5 bg-indigo-50 dark:bg-indigo-950/30 border-2 border-indigo-300 dark:border-indigo-700 rounded-xl max-w-xl mx-auto shadow-sm">
          <p className="text-base font-medium text-foreground/90">
            ✅ <strong>2025년 최신 세법 반영</strong> · ✅ <strong>실제 경비 vs 단순경비율 비교</strong> · ✅ <strong>맞춤형 추천</strong>
          </p>
        </div>
      </header>

      <Card className="focus-card border-2 border-indigo-200 dark:border-indigo-800 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-indigo-50 to-white dark:from-indigo-950/20 dark:to-gray-900 pb-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
              <span className="text-xl">📝</span>
            </div>
            <CardTitle className="text-2xl md:text-3xl">기본 정보 입력</CardTitle>
          </div>
          <CardDescription className="text-base">
            연간 소득과 실제 경비를 입력하세요.
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
            <Label htmlFor="actualExpenses" className="text-base font-semibold">
              실제 경비 지출액 (간편장부 시)
            </Label>
            <Input
              id="actualExpenses"
              type="number"
              min="0"
              step="1000"
              value={input.actualExpenses === 0 ? '' : input.actualExpenses}
              onChange={(e) => setInput({ ...input, actualExpenses: Number(e.target.value) || 0 })}
              className="h-12 text-base"
              placeholder="예: 35000000"
            />
            <p className="text-sm text-foreground/70">
              💡 실제 경비가 단순경비율(64.1%)보다 많으면 간편장부가 유리해요!
            </p>
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
          className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all text-lg py-6"
          size="lg"
        >
          📊 비교하기
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
          <Card className="border-2 border-indigo-300 dark:border-indigo-700 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/40 dark:to-purple-950/40">
              <CardTitle className="text-3xl font-bold text-center text-indigo-700 dark:text-indigo-300">
                📊 비교 결과
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-orange-50 dark:bg-orange-950/30 rounded-xl border-2 border-orange-200 dark:border-orange-800">
                  <h3 className="text-xl font-bold mb-4 text-orange-700 dark:text-orange-300">단순경비율 (64.1%)</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="text-sm text-foreground/70 mb-1">경비</div>
                      <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">{formatCurrency(result.simpleExpenseRate.expenses)}</div>
                    </div>
                    <div>
                      <div className="text-sm text-foreground/70 mb-1">과세소득</div>
                      <div className="text-2xl font-bold text-foreground">{formatCurrency(result.simpleExpenseRate.taxableIncome)}</div>
                    </div>
                    <div>
                      <div className="text-sm text-foreground/70 mb-1">세액</div>
                      <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">{formatCurrency(result.simpleExpenseRate.tax)}</div>
                    </div>
                    <p className="text-sm text-foreground/70 mt-3">{result.simpleExpenseRate.description}</p>
                  </div>
                </div>

                <div className="p-6 bg-green-50 dark:bg-green-950/30 rounded-xl border-2 border-green-200 dark:border-green-800">
                  <h3 className="text-xl font-bold mb-4 text-green-700 dark:text-green-300">간편장부 (실제 경비)</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="text-sm text-foreground/70 mb-1">경비</div>
                      <div className="text-2xl font-bold text-green-600 dark:text-green-400">{formatCurrency(result.simplifiedBookkeeping.expenses)}</div>
                    </div>
                    <div>
                      <div className="text-sm text-foreground/70 mb-1">과세소득</div>
                      <div className="text-2xl font-bold text-foreground">{formatCurrency(result.simplifiedBookkeeping.taxableIncome)}</div>
                    </div>
                    <div>
                      <div className="text-sm text-foreground/70 mb-1">세액</div>
                      <div className="text-2xl font-bold text-green-600 dark:text-green-400">{formatCurrency(result.simplifiedBookkeeping.tax)}</div>
                    </div>
                    <p className="text-sm text-foreground/70 mt-3">{result.simplifiedBookkeeping.description}</p>
                  </div>
                </div>
              </div>

              <div className={`p-8 rounded-xl border-2 ${
                result.difference.taxSavings > 0
                  ? 'bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/40 dark:to-emerald-950/40 border-green-300 dark:border-green-700'
                  : 'bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/40 dark:to-purple-950/40 border-indigo-300 dark:border-indigo-700'
              }`}>
                <div className="text-center mb-4">
                  <div className="text-base font-semibold text-foreground/70 mb-2">절세 효과</div>
                  <div className={`text-5xl font-bold mb-2 ${
                    result.difference.taxSavings > 0
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-indigo-600 dark:text-indigo-400'
                  }`}>
                    {result.difference.taxSavings > 0 ? '+' : ''}{formatCurrency(result.difference.taxSavings)}
                  </div>
                  <div className="text-xl font-semibold text-foreground/80">{result.difference.recommendation}</div>
                </div>

                {result.difference.benefits.length > 0 && (
                  <div className="mt-6 p-4 bg-white/80 dark:bg-gray-900/80 rounded-lg">
                    <h4 className="font-semibold mb-3">💡 주요 혜택</h4>
                    <ul className="space-y-2">
                      {result.difference.benefits.map((benefit, index) => (
                        <li key={index} className="text-sm text-foreground/80 flex items-start gap-2">
                          <span>✅</span>
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="p-6 bg-yellow-50 dark:bg-yellow-950/30 rounded-xl border-2 border-yellow-200 dark:border-yellow-800">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <span className="text-2xl">💡</span>
                  <span>선택 가이드</span>
                </h3>
                <ul className="space-y-2 text-base text-foreground/80">
                  <li>✅ 실제 경비가 단순경비율보다 많다면 간편장부가 유리해요!</li>
                  <li>✅ 간편장부는 증빙을 잘 챙겨야 해요!</li>
                  <li>✅ 2025년 기준금액이 7,500만원으로 상향됐어요!</li>
                  <li>✅ 경비가 적다면 단순경비율이 더 간편해요!</li>
                </ul>
              </div>

              <div className="p-5 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 rounded-xl border-2 border-green-200 dark:border-green-800">
                <p className="text-center font-semibold text-base mb-4 text-foreground">
                  🎉 친구들도 비교해보라고 공유해보세요!
                </p>
                <div className="flex flex-wrap gap-3 justify-center">
                  <Button
                    onClick={async () => {
                      try {
                        await navigator.clipboard.writeText(
                          `단순경비율 vs 간편장부 비교 결과: ${result.difference.recommendation} 💰\n\n${typeof window !== 'undefined' ? window.location.href : ''}`
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
                        `단순경비율 vs 간편장부 비교 결과: ${result.difference.recommendation} 💰\n\n${typeof window !== 'undefined' ? window.location.href : ''}`
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

