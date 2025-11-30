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
    }
  }, [hasAnswered, answerQuestion]);

  const handleNext = useCallback(() => {
    if (hasAnswered) {
      nextQuestion();
    }
  }, [hasAnswered, nextQuestion]);

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
        <Progress value={progress} className="h-3 bg-gray-200 dark:bg-gray-800" />
      </div>

      <Card className="focus-card border-2 border-blue-200 dark:border-blue-800 shadow-xl">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-white dark:from-blue-950/20 dark:to-gray-900 pb-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center flex-shrink-0">
              <span className="text-xl">❓</span>
            </div>
            <CardTitle className="text-xl md:text-2xl leading-relaxed">{currentQuestion.question}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
          {currentQuestion.type === 'ox' ? (
            <div className="grid grid-cols-2 gap-4">
              <Button
                variant={selectedAnswer === 'O' ? 'default' : 'outline'}
                size="lg"
                className={`h-24 text-2xl font-bold transition-all ${
                  selectedAnswer === 'O' 
                    ? 'bg-green-600 hover:bg-green-700 text-white shadow-lg' 
                    : 'border-2 hover:border-green-300 hover:bg-green-50 dark:hover:bg-green-950/20'
                }`}
                onClick={() => handleAnswer('O')}
                disabled={hasAnswered}
                aria-pressed={selectedAnswer === 'O'}
                aria-label="정답: O"
              >
                ✓ O
              </Button>
              <Button
                variant={selectedAnswer === 'X' ? 'default' : 'outline'}
                size="lg"
                className={`h-24 text-2xl font-bold transition-all ${
                  selectedAnswer === 'X' 
                    ? 'bg-red-600 hover:bg-red-700 text-white shadow-lg' 
                    : 'border-2 hover:border-red-300 hover:bg-red-50 dark:hover:bg-red-950/20'
                }`}
                onClick={() => handleAnswer('X')}
                disabled={hasAnswered}
                aria-pressed={selectedAnswer === 'X'}
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
                  className={`flex items-center space-x-3 p-5 border-2 rounded-xl transition-all cursor-pointer ${
                    selectedAnswer === index
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

          {hasAnswered && (
            <div className="space-y-3">
              {/* 정답/오답 즉시 피드백 */}
              {(() => {
                const userAnswer = answers.find((a) => a.questionId === currentQuestion.id);
                const isCorrect = userAnswer && userAnswer.score > 0;
                const question = currentQuestion;
                
                return (
                  <div className={`p-4 rounded-lg border-2 ${
                    isCorrect
                      ? 'bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800'
                      : 'bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800'
                  }`}>
                    <div className="flex items-start gap-3">
                      <span className={`text-2xl ${isCorrect ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                        {isCorrect ? '✅' : '❌'}
                      </span>
                      <div className="flex-1">
                        <p className={`font-bold text-base mb-2 ${isCorrect ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}`}>
                          {isCorrect ? '정답이에요! 🎉' : '아쉽네요! 😅'}
                        </p>
                        {question.explanation && (
                          <p className="text-sm text-foreground/80 leading-relaxed mb-2">
                            {question.explanation}
                          </p>
                        )}
                        {question.tip && (
                          <div className="mt-2 p-2 bg-blue-50 dark:bg-blue-950/30 rounded border border-blue-200 dark:border-blue-800">
                            <p className="text-xs text-blue-700 dark:text-blue-300 leading-relaxed">
                              {question.tip}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })()}
              
              <Button
                onClick={handleNext}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all"
                size="lg"
                aria-label={
                  currentQuestionIndex < questions.length - 1 
                    ? '다음 문제로 이동' 
                    : '테스트 결과 보기'
                }
              >
                {currentQuestionIndex < questions.length - 1 ? '다음 문제 →' : '결과 보기 →'}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

