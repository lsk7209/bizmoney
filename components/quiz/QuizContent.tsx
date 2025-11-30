'use client';

import { useQuiz } from './QuizProvider';
import { QuizStep } from './QuizStep';
import { QuizResult } from './QuizResult';

export function QuizContent() {
  const { isCompleted } = useQuiz();

  if (isCompleted) {
    return <QuizResult />;
  }

  return (
    <>
      {/* 페이지 제목 (H1) - 공감 메시지 강화 */}
      <header className="text-center mb-10 px-4">
        <div className="mb-4">
          <span className="inline-block px-4 py-1.5 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-sm font-semibold mb-4">
            📊 무료 세금 지식 테스트
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
          세금 방어력 테스트
        </h1>
        <p className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto leading-relaxed">
          <span className="empathy-text">&ldquo;내 세금 지식은 어느 정도일까?&rdquo;</span>
          <br />
          5문항의 간단한 퀴즈로 나의 세금 지식을 확인하고,<br />
          <strong className="text-green-600 dark:text-green-400">맞춤형 계산기</strong>를 추천받으세요.
        </p>
        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg max-w-xl mx-auto">
          <p className="text-sm text-foreground/80">
            ⏱️ <strong>약 2분 소요</strong> · ✅ <strong>무료</strong> · 🎯 <strong>맞춤형 결과 제공</strong>
          </p>
        </div>
      </header>
      <QuizStep />
    </>
  );
}

