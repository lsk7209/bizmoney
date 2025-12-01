/**
 * 세금 절약 아이디어 추천기 로직
 */

export interface TaxSavingIdea {
  id: string;
  title: string;
  category: string;
  description: string;
  savings: string; // 예상 절세액
  difficulty: 'easy' | 'medium' | 'hard';
  priority: number;
  tips: string[];
  applicable: boolean; // 현재 상황에 적용 가능한지
}

export interface TaxSavingInput {
  annualIncome: number;
  dependents: number;
  hasBusinessRegistration: boolean;
  actualExpenses: number;
  currentDeductions: {
    yellowUmbrella: boolean;
    irp: boolean;
    pensionSavings: boolean;
    housingFund: boolean;
    creditCard: boolean;
  };
}

const ALL_IDEAS: TaxSavingIdea[] = [
  {
    id: 'yellow-umbrella',
    title: '노란우산공제 가입하기',
    category: '세액공제',
    description: '프리랜서를 위한 퇴직금 제도로 세액공제율 16.5%',
    savings: '최대 82.5만원/년',
    difficulty: 'easy',
    priority: 1,
    tips: [
      '최대 500만원까지 납입 가능',
      '세액공제율 16.5%로 매년 절세',
      '퇴직 시에도 혜택 받을 수 있어요',
    ],
    applicable: true,
  },
  {
    id: 'irp-pension',
    title: 'IRP/연금저축 가입하기',
    category: '세액공제',
    description: 'IRP와 연금저축 각각 최대 400만원까지 세액공제',
    savings: '최대 132만원/년',
    difficulty: 'easy',
    priority: 2,
    tips: [
      'IRP와 연금저축 각각 최대 400만원',
      '세액공제율 16.5%',
      '노후 대비도 되고 절세도 되는 일석이조',
    ],
    applicable: true,
  },
  {
    id: 'housing-fund',
    title: '주택자금 적립하기',
    category: '세액공제',
    description: '가장 높은 세액공제율 40%',
    savings: '최대 120만원/년',
    difficulty: 'medium',
    priority: 3,
    tips: [
      '세액공제율 40%로 가장 높아요',
      '최대 300만원까지 납입 가능',
      '주택 구매 시에도 활용 가능',
    ],
    applicable: true,
  },
  {
    id: 'credit-card',
    title: '신용카드 사용액 늘리기',
    category: '소득공제',
    description: '일상 지출도 세금 절감에 도움',
    savings: '최대 45만원/년',
    difficulty: 'easy',
    priority: 4,
    tips: [
      '연간 최대 300만원까지 소득공제',
      '소득공제율 15%',
      '일상 지출을 카드로 결제',
    ],
    applicable: true,
  },
  {
    id: 'business-registration',
    title: '사업자등록 하기',
    category: '경비 인정',
    description: '실제 경비를 인정받아 세액 절감',
    savings: '상황에 따라 다름',
    difficulty: 'medium',
    priority: 5,
    tips: [
      '실제 경비가 단순경비율보다 많으면 유리',
      '부가세 환급 가능',
      '각종 세액공제 활용 가능',
    ],
    applicable: true,
  },
  {
    id: 'expense-proof',
    title: '경비 증빙 잘 챙기기',
    category: '경비 인정',
    description: '업무 관련 지출 증빙을 체계적으로 관리',
    savings: '상황에 따라 다름',
    difficulty: 'easy',
    priority: 6,
    tips: [
      '세금계산서, 현금영수증 잘 챙기기',
      '출장일지 작성하기',
      '업무용과 개인용 구분하기',
    ],
    applicable: true,
  },
  {
    id: 'general-tax',
    title: '일반과세 전환 고려하기',
    category: '부가가치세',
    description: '매입세액이 많다면 일반과세가 유리',
    savings: '환급금 받을 수 있음',
    difficulty: 'medium',
    priority: 7,
    tips: [
      '매입세액이 많다면 일반과세 고려',
      '매입세액 환급 가능',
      '초기 비용이 많을 때 유리',
    ],
    applicable: true,
  },
];

export function getTaxSavingIdeas(input: TaxSavingInput): TaxSavingIdea[] {
  const ideas = ALL_IDEAS.map(idea => {
    let applicable = true;
    
    // 상황에 맞게 적용 가능 여부 조정
    if (idea.id === 'yellow-umbrella' && input.currentDeductions.yellowUmbrella) {
      applicable = false;
    }
    if (idea.id === 'irp-pension' && input.currentDeductions.irp && input.currentDeductions.pensionSavings) {
      applicable = false;
    }
    if (idea.id === 'housing-fund' && input.currentDeductions.housingFund) {
      applicable = false;
    }
    if (idea.id === 'credit-card' && input.currentDeductions.creditCard) {
      applicable = false;
    }
    if (idea.id === 'business-registration' && input.hasBusinessRegistration) {
      applicable = false;
    }
    
    return {
      ...idea,
      applicable,
    };
  });
  
  // 우선순위와 적용 가능 여부로 정렬
  return ideas
    .filter(idea => idea.applicable)
    .sort((a, b) => {
      if (a.priority !== b.priority) {
        return a.priority - b.priority;
      }
      return a.difficulty === 'easy' ? -1 : 1;
    });
}

export function getIdeaByCategory(category: string): TaxSavingIdea[] {
  return ALL_IDEAS.filter(idea => idea.category === category);
}

