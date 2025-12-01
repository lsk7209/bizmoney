'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { getTaxSavingIdeas, TaxSavingInput, TaxSavingIdea } from '@/lib/tax-saving-ideas';

export function TaxSavingIdeas() {
  const [input, setInput] = useState<TaxSavingInput>({
    annualIncome: 0,
    dependents: 0,
    hasBusinessRegistration: false,
    actualExpenses: 0,
    currentDeductions: {
      yellowUmbrella: false,
      irp: false,
      pensionSavings: false,
      housingFund: false,
      creditCard: false,
    },
  });

  const ideas = useMemo(() => getTaxSavingIdeas(input), [input]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'text-green-600 dark:text-green-400';
      case 'medium':
        return 'text-yellow-600 dark:text-yellow-400';
      case 'hard':
        return 'text-red-600 dark:text-red-400';
      default:
        return 'text-gray-600';
    }
  };

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return '쉬움';
      case 'medium':
        return '보통';
      case 'hard':
        return '어려움';
      default:
        return '';
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6 md:py-10 space-y-8">
      <header className="text-center mb-10">
        <div className="mb-4">
          <span className="inline-block px-5 py-2 bg-pink-100 dark:bg-pink-900 text-pink-700 dark:text-pink-300 rounded-full text-base font-semibold mb-4">
            💡 세금 절약 아이디어 추천기
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-pink-800 bg-clip-text text-transparent">
          세금 절약 아이디어 추천기
        </h1>
        <p className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto leading-relaxed">
          <span className="empathy-text">&ldquo;어떻게 하면 더 많이 절세할 수 있을까?&rdquo;</span>
          <br />
          나의 상황에 맞는 <strong>맞춤형 절세 아이디어</strong>를 추천받고,<br />
          <strong className="text-green-600 dark:text-green-400">절세 금액</strong>까지 확인해보세요!
        </p>
        <div className="mt-6 p-5 bg-pink-50 dark:bg-pink-950/30 border-2 border-pink-300 dark:border-pink-700 rounded-xl max-w-xl mx-auto shadow-sm">
          <p className="text-base font-medium text-foreground/90">
            ✅ <strong>맞춤형 추천</strong> · ✅ <strong>우선순위 정렬</strong> · ✅ <strong>실용적인 팁</strong>
          </p>
        </div>
      </header>

      <Card className="focus-card border-2 border-pink-200 dark:border-pink-800 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-pink-50 to-white dark:from-pink-950/20 dark:to-gray-900 pb-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-pink-100 dark:bg-pink-900 flex items-center justify-center">
              <span className="text-xl">📝</span>
            </div>
            <CardTitle className="text-2xl md:text-3xl">나의 상황 입력</CardTitle>
          </div>
          <CardDescription className="text-base">
            현재 상황을 입력하면 맞춤형 절세 아이디어를 추천해드려요!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <Label htmlFor="annualIncome" className="text-base font-semibold">
              연간 소득
            </Label>
            <Input
              id="annualIncome"
              type="number"
              min="0"
              step="1000"
              value={input.annualIncome === 0 ? '' : input.annualIncome}
              onChange={(e) => setInput({ ...input, annualIncome: Number(e.target.value) || 0 })}
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

          <div className="space-y-3">
            <Label className="text-base font-semibold">현재 활용 중인 공제</Label>
            <div className="space-y-2">
              {Object.entries(input.currentDeductions).map(([key, value]) => (
                <label key={key} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={(e) => setInput({
                      ...input,
                      currentDeductions: {
                        ...input.currentDeductions,
                        [key]: e.target.checked,
                      },
                    })}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">
                    {key === 'yellowUmbrella' && '노란우산공제'}
                    {key === 'irp' && 'IRP'}
                    {key === 'pensionSavings' && '연금저축'}
                    {key === 'housingFund' && '주택자금'}
                    {key === 'creditCard' && '신용카드 사용액'}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={input.hasBusinessRegistration}
                onChange={(e) => setInput({ ...input, hasBusinessRegistration: e.target.checked })}
                className="w-4 h-4"
              />
              <span className="text-sm">사업자등록 완료</span>
            </label>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-center">💡 추천 절세 아이디어</h2>
        {ideas.length > 0 ? (
          <div className="space-y-4">
            {ideas.map((idea, index) => (
              <Card
                key={idea.id}
                className={`border-2 ${
                  index === 0
                    ? 'border-pink-300 dark:border-pink-700 bg-pink-50/50 dark:bg-pink-950/20'
                    : 'border-gray-200 dark:border-gray-800'
                }`}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-2xl">#{index + 1}</span>
                        <CardTitle className="text-xl">{idea.title}</CardTitle>
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${getDifficultyColor(idea.difficulty)}`}>
                          {getDifficultyLabel(idea.difficulty)}
                        </span>
                      </div>
                      <CardDescription className="text-base">{idea.description}</CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-green-600 dark:text-green-400">{idea.savings}</div>
                      <div className="text-xs text-foreground/70">절세액</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
                    <h4 className="font-semibold mb-2">💡 실용 팁</h4>
                    <ul className="space-y-1">
                      {idea.tips.map((tip, tipIndex) => (
                        <li key={tipIndex} className="text-sm text-foreground/80 flex items-start gap-2">
                          <span>✅</span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="border-2 border-gray-200 dark:border-gray-800">
            <CardContent className="p-8 text-center">
              <p className="text-foreground/70">이미 모든 절세 아이디어를 활용하고 계시네요! 🎉</p>
            </CardContent>
          </Card>
        )}
      </div>

      <div className="p-5 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 rounded-xl border-2 border-green-200 dark:border-green-800">
        <p className="text-center font-semibold text-base mb-4 text-foreground">
          🎉 친구들도 절세 아이디어를 확인해보라고 공유해보세요!
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Button
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(
                  `세금 절약 아이디어 추천기로 ${ideas.length}개의 맞춤형 아이디어를 받았어요! 💰\n\n${typeof window !== 'undefined' ? window.location.href : ''}`
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
                `세금 절약 아이디어 추천기로 ${ideas.length}개의 맞춤형 아이디어를 받았어요! 💰\n\n${typeof window !== 'undefined' ? window.location.href : ''}`
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
        <p className="text-sm text-foreground/80 leading-relaxed">
          <strong className="font-semibold">⚠️ 면책 조항:</strong> 본 추천은 참고용이며, 실제 절세 효과는 개인 상황에 따라 달라질 수 있습니다.
          정확한 절세 전략은 세무 전문가의 도움을 받으시기 바랍니다.
        </p>
      </div>
    </div>
  );
}

