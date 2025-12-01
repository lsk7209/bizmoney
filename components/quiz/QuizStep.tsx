'use client';

import { useMemo, useCallback } from 'react';
import { useQuiz } from './QuizProvider';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

export function QuizStep() {
  const {
    questions,
    currentQuestionIndex,
    answers,
    answerQuestion,
    nextQuestion,
  } = useQuiz();

  const currentQuestion = useMemo(
    () => questions[currentQuestionIndex],
    [questions, currentQuestionIndex]
  );

  const progress = useMemo(
    () => ((currentQuestionIndex + 1) / questions.length) * 100,
    [currentQuestionIndex, questions.length]
  );

  const hasAnswered = useMemo(
    () => answers.some((a) => a.questionId === currentQuestion.id),
    [answers, currentQuestion.id]
  );

  const selectedAnswer = useMemo(
    () => answers.find((a) => a.questionId === currentQuestion.id)?.answer,
    [answers, currentQuestion.id]
  );

  const handleAnswer = useCallback((answer: string | number) => {
    if (!hasAnswered) {
      answerQuestion(answer);
      // 사용자 경험을 위해 짧은 지연 후 다음 문제로 자동 이동
      setTimeout(() => {
        nextQuestion();
      }, 300);
    }
  }, [hasAnswered, answerQuestion, nextQuestion]);

  if (!currentQuestion) {
    return null;
  }

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-6 md:py-10">
      {/* 진행률 표시 - 집중 강화 */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm font-semibold text-foreground">
            문제 {currentQuestionIndex + 1} / {questions.length}
          </span>
          <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="h-2.5" />
      </div>

      <Card className="border-2 shadow-lg">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl md:text-2xl leading-snug break-keep">
            Q. {currentQuestion.question}
          </CardTitle>
          {currentQuestion.description && (
            <CardDescription className="text-base mt-2">
              {currentQuestion.description}
            </CardDescription>
          )}
        </CardHeader>
        <CardContent className="pt-2">
          {currentQuestion.type === 'ox' ? (
            <div className="grid grid-cols-2 gap-4">
              <Button
                variant={selectedAnswer === 'O' ? 'default' : 'outline'}
                className={`h-32 text-4xl rounded-xl transition-all ${selectedAnswer === 'O'
                  ? 'bg-blue-600 hover:bg-blue-700 ring-4 ring-blue-200 dark:ring-blue-900'
                  : 'hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950'
                  }`}
                onClick={() => !hasAnswered && handleAnswer('O')}
                disabled={hasAnswered}
                aria-label="정답: O"
              >
                ⭕ O
              </Button>
              <Button
                variant={selectedAnswer === 'X' ? 'default' : 'outline'}
                className={`h-32 text-4xl rounded-xl transition-all ${selectedAnswer === 'X'
                  ? 'bg-red-600 hover:bg-red-700 ring-4 ring-red-200 dark:ring-red-900'
                  : 'hover:border-red-400 hover:bg-red-50 dark:hover:bg-red-950'
                  }`}
                onClick={() => !hasAnswered && handleAnswer('X')}
                disabled={hasAnswered}
                aria-label="정답: X"
              >
                ✗ X
              </Button>
            </div>
          ) : (
            <RadioGroup
              value={selectedAnswer?.toString()}
              onValueChange={(value) => handleAnswer(Number(value))}
              disabled={hasAnswered}
              className="space-y-3"
            >
              {currentQuestion.options?.map((option, index) => (
                <div
                  key={index}
                  className={`flex items-center space-x-3 p-5 border-2 rounded-xl transition-all cursor-pointer ${selectedAnswer === index
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/30 shadow-md'
                    : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700 hover:bg-blue-50/50 dark:hover:bg-blue-950/20'
                    }`}
                  onClick={() => !hasAnswered && handleAnswer(index)}
                >
                  <RadioGroupItem value={index.toString()} id={`option-${index}`} className="flex-shrink-0" />
                  <Label
                    htmlFor={`option-${index}`}
                    className="flex-1 cursor-pointer text-base md:text-lg leading-relaxed font-medium"
                  >
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
