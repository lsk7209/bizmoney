'use client';

import { useMemo } from 'react';
import { useQuiz } from './QuizProvider';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { QUIZ_QUESTIONS } from '@/constants/quiz-questions';

export function QuizResult() {
  const { getResult, resetQuiz, answers, questions } = useQuiz();
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

  // 정답/오답 상세 정보
  const answerDetails = useMemo(() => {
    return answers.map((answer) => {
      const question = questions.find((q) => q.id === answer.questionId);
      const isCorrect = answer.score > 0;
      return {
        question,
        answer,
        isCorrect,
      };
    });
  }, [answers, questions]);

  if (!result) {
    return null;
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Lv.1':
        return 'text-red-600 dark:text-red-400';
      case 'Lv.2':
        return 'text-yellow-600 dark:text-yellow-400';
      case 'Lv.3':
        return 'text-green-600 dark:text-green-400';
      default:
        return 'text-gray-500';
    }
  };

  const getLevelBgColor = (level: string) => {
    switch (level) {
      case 'Lv.1':
        return 'bg-gradient-to-br from-red-50 to-red-100 border-red-300 dark:from-red-950/40 dark:to-red-900/20 dark:border-red-800';
      case 'Lv.2':
        return 'bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-300 dark:from-yellow-950/40 dark:to-yellow-900/20 dark:border-yellow-800';
      case 'Lv.3':
        return 'bg-gradient-to-br from-green-50 to-green-100 border-green-300 dark:from-green-950/40 dark:to-green-900/20 dark:border-green-800';
      default:
        return 'bg-gray-50 border-gray-200 dark:bg-gray-950 dark:border-gray-900';
    }
  };

  // SNS 공유 함수
  const handleShare = async (platform: 'kakao' | 'twitter' | 'copy') => {
    const shareText = result.shareMessage;
    const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

    if (platform === 'copy') {
      try {
        await navigator.clipboard.writeText(`${shareText}\n\n${shareUrl}`);
        alert('링크가 클립보드에 복사되었습니다!');
      } catch (err) {
        alert('복사에 실패했습니다.');
      }
    } else if (platform === 'twitter') {
      const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
      window.open(twitterUrl, '_blank');
    } else if (platform === 'kakao') {
      // 카카오톡 공유는 카카오 SDK 필요 (추후 구현)
      alert('카카오톡 공유는 준비 중입니다.');
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-6 md:py-10 space-y-8">
      {/* 페이지 제목 (H1) */}
      <header className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
          세금 방어력 테스트 결과
        </h1>
        <p className="text-lg md:text-xl text-foreground/70">
          나의 세금 지식 수준을 확인했습니다! 🎯
        </p>
      </header>
      
      {/* 결과 카드 */}
      <Card className={`${getLevelBgColor(result.level)} border-2 shadow-xl`}>
        <CardHeader className="text-center pb-6">
          <div className="mb-4">
            <div className={`inline-block text-6xl md:text-7xl mb-4`}>
              {result.emoji}
            </div>
          </div>
          <CardTitle className={`text-3xl md:text-4xl font-bold mb-3 ${getLevelColor(result.level)}`}>
            {result.level} {result.title}
          </CardTitle>
          <CardDescription className="text-base md:text-lg leading-relaxed max-w-xl mx-auto font-medium">
            {result.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* 점수 표시 - 유익 강조 */}
          <div className="text-center space-y-4 p-6 bg-white/80 dark:bg-gray-900/80 rounded-xl border-2 border-gray-200 dark:border-gray-700 shadow-md">
            <div className="text-5xl md:text-6xl font-bold text-foreground">
              {totalScore}점
            </div>
            <div className="text-lg font-semibold text-muted-foreground">
              정답: <span className="text-green-600 dark:text-green-400 font-bold text-xl">{correctCount}</span> / {answers.length}개
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 mt-4">
              <div 
                className={`h-4 rounded-full transition-all ${
                  result.level === 'Lv.1' ? 'bg-red-500' : 
                  result.level === 'Lv.2' ? 'bg-yellow-500' : 
                  'bg-green-500'
                }`}
                style={{ width: `${(totalScore / (answers.length * 20)) * 100}%` }}
              />
            </div>
          </div>

          {/* 맞춤 팁 섹션 */}
          {result.tips && result.tips.length > 0 && (
            <div className="p-6 bg-blue-50 dark:bg-blue-950/30 rounded-xl border-2 border-blue-200 dark:border-blue-800">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-2xl">💡</span>
                <span>나에게 맞는 세금 절감 팁 (2025년 최신!)</span>
              </h3>
              <ul className="space-y-3">
                {result.tips.map((tip, index) => (
                  <li key={index} className="text-base leading-relaxed text-foreground/90 flex items-start gap-2">
                    <span className="text-blue-600 dark:text-blue-400 font-bold mt-1">{index + 1}.</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 rounded-lg border-2 border-green-300 dark:border-green-700">
                <p className="text-sm font-bold text-green-700 dark:text-green-300 mb-2">
                  🎁 2025년 신규! 국세청 &quot;원클릭&quot; 무료 환급 서비스
                </p>
                <p className="text-xs text-foreground/80 leading-relaxed">
                  홈택스에서 &quot;원클릭 환급 신고&quot;로 최대 5년치 환급금을 <strong className="text-green-600 dark:text-green-400">완전 무료</strong>로 확인할 수 있어요! 삼쩜삼 같은 민간 서비스는 수수료가 있지만, 원클릭은 수수료 0원!
                </p>
              </div>
            </div>
          )}

          {/* 정답/오답 상세 */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="text-2xl">📋</span>
              <span>문제별 정답 확인</span>
            </h3>
            {answerDetails.map((detail, index) => {
              if (!detail.question) return null;
              const isCorrect = detail.isCorrect;
              return (
                <div
                  key={detail.question.id}
                  className={`p-4 rounded-lg border-2 ${
                    isCorrect
                      ? 'bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800'
                      : 'bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800'
                  }`}
                >
                  <div className="flex items-start gap-3 mb-2">
                    <span className={`text-lg font-bold ${isCorrect ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                      {isCorrect ? '✓' : '✗'}
                    </span>
                    <div className="flex-1">
                      <p className="font-semibold text-base mb-1">
                        문제 {index + 1}: {detail.question.question}
                      </p>
                      {detail.question.explanation && (
                        <p className="text-sm text-foreground/70 mb-2 leading-relaxed">
                          {detail.question.explanation}
                        </p>
                      )}
                      {detail.question.tip && (
                        <div className="mt-2 p-2 bg-blue-50 dark:bg-blue-950/30 rounded border border-blue-200 dark:border-blue-800">
                          <p className="text-sm text-blue-700 dark:text-blue-300 leading-relaxed">
                            {detail.question.tip}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* SNS 공유 버튼 - 바이럴 요소 */}
          <div className="p-5 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 rounded-xl border-2 border-purple-200 dark:border-purple-800">
            <p className="text-center font-semibold text-base mb-4 text-foreground">
              🎉 친구들에게도 테스트해보라고 공유해보세요!
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Button
                onClick={() => handleShare('copy')}
                variant="outline"
                className="border-2 hover:bg-purple-50 dark:hover:bg-purple-950/50"
                size="lg"
              >
                📋 링크 복사
              </Button>
              <Button
                onClick={() => handleShare('twitter')}
                variant="outline"
                className="border-2 hover:bg-blue-50 dark:hover:bg-blue-950/50"
                size="lg"
              >
                🐦 트위터 공유
              </Button>
              <Button
                onClick={() => handleShare('kakao')}
                variant="outline"
                className="border-2 hover:bg-yellow-50 dark:hover:bg-yellow-950/50"
                size="lg"
              >
                💬 카카오톡 공유
              </Button>
            </div>
          </div>

          {/* CTA 버튼 - 집중 강화 */}
          <div className="space-y-4">
            <div className="p-5 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/40 dark:to-emerald-950/40 border-2 border-green-300 dark:border-green-700 rounded-xl shadow-md">
              <p className="text-center font-bold text-lg mb-4 text-foreground">
                💰 이제 실제 환급금을 확인해보세요!
              </p>
              <p className="text-center text-sm text-foreground/70 mb-4">
                계산기로 확인하면 예상보다 더 많이 받을 수도 있어요! 🎁
              </p>
              <Button
                onClick={() => router.push('/calculator')}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold shadow-lg hover:shadow-xl transition-all text-lg py-7"
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
