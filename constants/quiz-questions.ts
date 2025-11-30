export type QuizQuestionType = 'ox' | 'multiple';

export interface QuizQuestion {
  id: number;
  question: string;
  type: QuizQuestionType;
  options?: string[]; // 객관식일 경우
  correctAnswer: string | number; // 'O', 'X' 또는 옵션 인덱스
  score: number; // 정답 시 점수
  explanation?: string; // 정답 설명 (결과 페이지에서 표시)
  tip?: string; // 실용적인 팁
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
  emoji: string;
  shareMessage: string; // SNS 공유용 메시지
  tips: string[]; // 레벨별 맞춤 팁
}

// 개선된 퀴즈 문항 (5개) - 신뢰성, 재미, 유익성, 바이럴 요소 강화
export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: '프리랜서가 받는 "삼쩜삼(3.3%)"은 무엇을 의미할까요?',
    type: 'multiple',
    options: [
      '세금을 3.3%만 내면 되는 것',
      '소득 지급 시 미리 떼는 소득세 + 지방소득세',
      '환급받을 수 있는 세금 비율',
      '사업자등록 시 내는 세금',
    ],
    correctAnswer: 1,
    score: 20,
    explanation: '3.3%는 소득세 3% + 지방소득세 0.3%를 합친 원천징수율입니다. 이건 미리 떼는 세금이고, 실제로는 더 많이 내거나 환급받을 수 있어요!',
    tip: '💡 원천징수된 3.3%는 다음 해 5월 종합소득세 신고 시 기납부세액으로 처리됩니다. 실제 세액이 적으면 환급받을 수 있어요!',
  },
  {
    id: 2,
    question: '연봉 3,000만원 프리랜서가 단순경비율 64.1%를 적용하면, 실제로 세금을 내는 금액은?',
    type: 'multiple',
    options: [
      '3,000만원 전액',
      '약 1,077만원 (3,000만원 × 35.9%)',
      '약 1,923만원 (3,000만원 × 64.1%)',
      '세금을 내지 않아도 됨',
    ],
    correctAnswer: 1,
    score: 20,
    explanation: '단순경비율 64.1%는 경비로 인정되는 비율이에요. 따라서 과세소득은 3,000만원 × (1 - 0.641) = 약 1,077만원입니다. 이 금액에 세율을 적용해요!',
    tip: '💡 단순경비율은 실제 지출 증빙 없이도 매출의 일정 비율을 경비로 인정받는 제도예요. 실제 경비가 많다면 간편장부 신고가 더 유리할 수 있어요!',
  },
  {
    id: 3,
    question: '프리랜서가 세금을 가장 많이 절약할 수 있는 방법은?',
    type: 'multiple',
    options: [
      '소득을 숨기는 것 (탈세)',
      '적법한 경비 인정과 공제 항목 최대한 활용',
      '세금 신고를 하지 않는 것',
      '사업자등록을 하지 않는 것',
    ],
    correctAnswer: 1,
    score: 20,
    explanation: '적법한 경비 인정과 공제 항목 활용이 가장 안전하고 효과적인 절세 방법입니다. 노란우산공제, IRP, 연금저축 등 다양한 공제를 활용하세요!',
    tip: '💡 노란우산공제 가입 시 연간 최대 500만원까지 소득공제! 개인형 퇴직연금(IRP)은 세액공제까지 받을 수 있어요. 합법적인 절세는 이렇게 하는 거예요!',
  },
  {
    id: 4,
    question: '프리랜서가 부가가치세를 내지 않으려면 연 매출액이 얼마 이하여야 할까요?',
    type: 'multiple',
    options: [
      '2,400만원 이하',
      '4,800만원 이하',
      '8,000만원 이하 (간이과세 기준)',
      '부가세는 항상 내야 함',
    ],
    correctAnswer: 2,
    score: 20,
    explanation: '간이과세자는 연 매출액 8,000만원 이하일 때 부가가치세를 간이과세로 신고할 수 있어요. 다만 일부 업종(의료, 법률, 회계 등)은 제외됩니다.',
    tip: '💡 간이과세자는 세금계산서 발행 의무가 없고 세금 부담이 적어요. 하지만 매입세액 공제를 받을 수 없으니, 초기 비용이 많다면 일반과세가 유리할 수 있어요!',
  },
  {
    id: 5,
    question: '프리랜서가 종합소득세 신고를 안 하면 어떻게 될까요?',
    type: 'ox',
    correctAnswer: 'X',
    score: 20,
    explanation: '신고를 안 하면 가산세와 체납액이 발생하고, 심하면 형사처벌까지 받을 수 있어요. 반드시 5월 31일까지 신고하세요!',
    tip: '💡 성실신고확인대상자는 6월 30일까지 연장 가능해요. 하지만 미리 계산해서 준비하는 게 좋아요. 지금 바로 계산기로 예상 세액을 확인해보세요!',
  },
];

// 개선된 결과 레벨 정의 - 바이럴 요소 강화
export const QUIZ_RESULTS: QuizResult[] = [
  {
    level: 'Lv.1',
    title: '구멍난 지갑',
    description: '세금에 대한 기본 지식이 부족하시네요! 😰 하지만 걱정 마세요. 지금 바로 계산기로 확인하면 놓치고 있던 환급금을 찾을 수 있어요!',
    minScore: 0,
    maxScore: 40,
    emoji: '😰',
    shareMessage: '세금 방어력 테스트 결과: Lv.1 구멍난 지갑 😰\n\n세금 지식이 부족했지만, 이제 계산기로 내 환급금을 확인해볼게요! 💰\n\n#세금방어력테스트 #프리랜서세금 #환급금',
    tips: [
      '💡 단순경비율만 알아도 세금을 크게 줄일 수 있어요!',
      '💰 원천징수된 3.3%는 환급받을 수도 있어요. 계산기로 확인해보세요!',
      '📚 세금 가이드 블로그를 읽어보면 도움이 될 거예요.',
    ],
  },
  {
    level: 'Lv.2',
    title: '평범한 사장님',
    description: '세금에 대한 기본 지식은 있으시네요! 😊 하지만 더 많은 혜택을 받을 수 있는 방법이 있어요. 계산기로 확인해보면 놀라운 결과가 나올 수도...?',
    minScore: 41,
    maxScore: 80,
    emoji: '😊',
    shareMessage: '세금 방어력 테스트 결과: Lv.2 평범한 사장님 😊\n\n기본은 알지만, 더 많은 환급금을 받을 수 있는 방법이 있다고? 계산기로 확인해볼게요! 💰\n\n#세금방어력테스트 #프리랜서세금 #환급금',
    tips: [
      '💡 노란우산공제, IRP 등 공제 항목을 활용하면 세금을 더 줄일 수 있어요!',
      '📊 실제 경비가 많다면 간편장부 신고가 단순경비율보다 유리할 수 있어요.',
      '💰 계산기로 다양한 시나리오를 비교해보면 최적의 방법을 찾을 수 있어요!',
    ],
  },
  {
    level: 'Lv.3',
    title: '철벽 방어',
    description: '와! 세금에 대한 이해도가 정말 높으시네요! 🛡️ 하지만 실제로 받을 수 있는 환급금은 얼마나 될까요? 계산기로 확인해보면 예상보다 더 많이 받을 수도 있어요!',
    minScore: 81,
    maxScore: 100,
    emoji: '🛡️',
    shareMessage: '세금 방어력 테스트 결과: Lv.3 철벽 방어 🛡️\n\n세금 지식은 완벽! 이제 실제 환급금을 확인해볼 시간이에요. 계산기로 확인해볼게요! 💰\n\n#세금방어력테스트 #프리랜서세금 #환급금',
    tips: [
      '🎯 이미 잘 알고 계시지만, 계산기로 정확한 금액을 확인하면 더 확실해요!',
      '💼 세무 전문가와 상담하면 놓치기 쉬운 공제 항목을 찾을 수 있어요.',
      '📈 매년 세법이 바뀌니 최신 정보를 확인하는 것도 중요해요!',
    ],
  },
];
