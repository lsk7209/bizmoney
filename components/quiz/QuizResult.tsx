'use client';

import { useMemo } from 'react';
import { useQuiz } from './QuizProvider';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter } from 'next/navigation';

export function QuizResult() {
  const { getResult, resetQuiz, answers } = useQuiz();
  const router = useRouter();
  const result = getResult();

  const totalScore = useMemo(
    () => answers.reduce((sum, answer) => sum + answer.score, 0),
    [answers]
  );

  const correctCount = useMemo(
    () => answers.filter((a) => a.score > 0).length,
    [answers]
  );

  if (!result) {
    return null;
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Lv.1':
        return 'text-red-500';
      case 'Lv.2':
        return 'text-yellow-500';
      case 'Lv.3':
        return 'text-green-500';
      default:
        return 'text-gray-500';
    }
  };

  const getLevelBgColor = (level: string) => {
    switch (level) {
      case 'Lv.1':
        return 'bg-red-50 border-red-200 dark:bg-red-950 dark:border-red-900';
      case 'Lv.2':
        return 'bg-yellow-50 border-yellow-200 dark:bg-yellow-950 dark:border-yellow-900';
      case 'Lv.3':
        return 'bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-900';
      default:
        return 'bg-gray-50 border-gray-200 dark:bg-gray-950 dark:border-gray-900';
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-6 md:py-10">
      {/* 페이지 제목 (H1) */}
      <header className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
          세금 방어력 테스트 결과
        </h1>
        <p className="text-lg text-foreground/70">
          나의 세금 지식 수준을 확인했습니다!
        </p>
      </header>
      
      <Card className={`${getLevelBgColor(result.level)} border-2 shadow-xl`}>
        <CardHeader className="text-center pb-6">
          <div className="mb-4">
            <div className={`inline-block text-5xl md:text-6xl mb-4 ${getLevelColor(result.level)}`}>
              {result.level === 'Lv.1' ? '😰' : result.level === 'Lv.2' ? '😊' : '🛡️'}
            </div>
          </div>
          <CardTitle className={`text-3xl md:text-4xl font-bold mb-3 ${getLevelColor(result.level)}`}>
            {result.level} {result.title}
          </CardTitle>
          <CardDescription className="text-base md:text-lg leading-relaxed max-w-xl mx-auto">
            {result.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* 점수 표시 - 유익 강조 */}
          <div className="text-center space-y-3 p-6 bg-white/60 dark:bg-gray-900/60 rounded-xl border-2 border-gray-200 dark:border-gray-700">
            <div className="text-4xl md:text-5xl font-bold text-foreground">
              {totalScore}점
            </div>
            <div className="text-base font-medium text-muted-foreground">
              정답: <span className="text-green-600 dark:text-green-400 font-bold">{correctCount}</span> / {answers.length}개
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mt-4">
              <div 
                className={`h-3 rounded-full transition-all ${
                  result.level === 'Lv.1' ? 'bg-red-500' : 
                  result.level === 'Lv.2' ? 'bg-yellow-500' : 
                  'bg-green-500'
                }`}
                style={{ width: `${(totalScore / (answers.length * 20)) * 100}%` }}
              />
            </div>
          </div>

          {/* CTA 버튼 - 집중 강화 */}
          <div className="space-y-4">
            <div className="p-4 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg">
              <p className="text-sm text-center text-foreground/80 mb-3">
                💡 <strong>이제 실제 환급금을 확인해보세요!</strong>
              </p>
              <Button
                onClick={() => router.push('/calculator')}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all text-lg py-6"
                size="lg"
                aria-label="세금 계산기로 이동하여 환급금 조회하기"
              >
                💰 내 진짜 환급금 조회하기 →
              </Button>
            </div>
            <Button
              onClick={resetQuiz}
              variant="outline"
              className="w-full border-2 hover:bg-gray-50 dark:hover:bg-gray-800 font-semibold"
              size="lg"
              aria-label="세금 방어력 테스트 다시 시작하기"
            >
              🔄 다시 테스트하기
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

