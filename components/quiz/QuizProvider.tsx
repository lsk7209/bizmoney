'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { QuizQuestion, QuizAnswer, QuizResultLevel } from '@/constants/quiz-questions';
import { QUIZ_QUESTIONS, QUIZ_RESULTS } from '@/constants/quiz-questions';

interface QuizContextType {
  questions: QuizQuestion[];
  currentQuestionIndex: number;
  answers: QuizAnswer[];
  isCompleted: boolean;
  result: QuizResultLevel | null;
  answerQuestion: (answer: string | number) => void;
  nextQuestion: () => void;
  resetQuiz: () => void;
  getResult: () => typeof QUIZ_RESULTS[0] | null;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export function QuizProvider({ children }: { children: React.ReactNode }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);

  const questions = QUIZ_QUESTIONS;
  const isCompleted = currentQuestionIndex >= questions.length;

  const answerQuestion = useCallback((answer: string | number) => {
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect =
      currentQuestion.type === 'ox'
        ? answer === currentQuestion.correctAnswer
        : answer === currentQuestion.correctAnswer;

    const score = isCorrect ? currentQuestion.score : 0;

    const newAnswer: QuizAnswer = {
      questionId: currentQuestion.id,
      answer,
      score,
    };

    setAnswers((prev) => [...prev, newAnswer]);
  }, [currentQuestionIndex, questions]);

  const nextQuestion = useCallback(() => {
    setCurrentQuestionIndex((prev) => prev + 1);
  }, []);

  const resetQuiz = useCallback(() => {
    setCurrentQuestionIndex(0);
    setAnswers([]);
  }, []);

  const getResult = useCallback(() => {
    if (!isCompleted) return null;

    const totalScore = answers.reduce((sum, answer) => sum + answer.score, 0);
    const result = QUIZ_RESULTS.find(
      (r) => totalScore >= r.minScore && totalScore <= r.maxScore
    );

    return result || QUIZ_RESULTS[0];
  }, [answers, isCompleted]);

  const value: QuizContextType = {
    questions,
    currentQuestionIndex,
    answers,
    isCompleted,
    result: getResult()?.level || null,
    answerQuestion,
    nextQuestion,
    resetQuiz,
    getResult,
  };

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
}

export function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
}

