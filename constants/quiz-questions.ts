export type QuizQuestionType = 'ox' | 'multiple';

export interface QuizQuestion {
  id: number;
  question: string;
  type: QuizQuestionType;
  options?: string[]; // 객관식일 경우
  correctAnswer: string | number; // 'O', 'X' 또는 옵션 인덱스
  score: number; // 정답 시 점수
}

export interface QuizAnswer {
  questionId: number;
  answer: string | number;
  score: number;
}

export type QuizResultLevel = 'Lv.1' | 'Lv.2' | 'Lv.3';

export interface QuizResult {
  level: QuizResultLevel;
  title: string;
  description: string;
  minScore: number;
  maxScore: number;
}

// 샘플 퀴즈 문항 (5개)
export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: '프리랜서도 사업자등록을 해야 세금 혜택을 받을 수 있다.',
    type: 'ox',
    correctAnswer: 'O',
    score: 20,
  },
  {
    id: 2,
    question: '단순경비율을 적용하면 실제 지출한 경비와 관계없이 매출의 일정 비율을 경비로 인정받을 수 있다.',
    type: 'ox',
    correctAnswer: 'O',
    score: 20,
  },
  {
    id: 3,
    question: '연간 소득이 1,200만원 이하인 프리랜서는 종합소득세를 납부하지 않아도 된다.',
    type: 'ox',
    correctAnswer: 'X',
    score: 20,
  },
  {
    id: 4,
    question: '부양가족이 많을수록 세금이 줄어든다.',
    type: 'ox',
    correctAnswer: 'O',
    score: 20,
  },
  {
    id: 5,
    question: '프리랜서가 세금을 절약하는 가장 좋은 방법은?',
    type: 'multiple',
    options: [
      '소득을 숨기는 것',
      '적법한 경비 인정과 공제 활용',
      '세금 신고를 하지 않는 것',
      '사업자등록을 하지 않는 것',
    ],
    correctAnswer: 1, // 두 번째 옵션
    score: 20,
  },
];

// 결과 레벨 정의
export const QUIZ_RESULTS: QuizResult[] = [
  {
    level: 'Lv.1',
    title: '구멍난 지갑',
    description: '세금에 대한 기본 지식이 부족합니다. 지금 바로 세금 계산기를 통해 실제 환급금을 확인해보세요!',
    minScore: 0,
    maxScore: 40,
  },
  {
    level: 'Lv.2',
    title: '평범한 사장님',
    description: '세금에 대한 기본 지식은 있지만, 더 많은 혜택을 받을 수 있는 방법이 있습니다.',
    minScore: 41,
    maxScore: 80,
  },
  {
    level: 'Lv.3',
    title: '철벽 방어',
    description: '세금에 대한 이해도가 높습니다! 하지만 실제 환급금은 얼마나 될까요? 계산기로 확인해보세요.',
    minScore: 81,
    maxScore: 100,
  },
];

