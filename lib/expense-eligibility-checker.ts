/**
 * 경비 인정 가능 여부 체크리스트 로직
 */

export interface ExpenseItem {
  id: string;
  category: string;
  name: string;
  description: string;
  eligible: boolean;
  conditions: string[];
  tips: string[];
}

export const EXPENSE_CATEGORIES: ExpenseItem[] = [
  {
    id: 'office-rent',
    category: '사무실',
    name: '사무실 임대료',
    description: '업무용 사무실 임대료',
    eligible: true,
    conditions: [
      '업무용으로 실제 사용하는 사무실',
      '임대계약서와 영수증 필요',
      '거주용과 구분되어야 함',
    ],
    tips: [
      '홈오피스는 일부만 인정 가능',
      '거주지와 사무실이 같은 경우 주의',
    ],
  },
  {
    id: 'communication',
    category: '통신비',
    name: '인터넷/전화 요금',
    description: '업무용 통신비',
    eligible: true,
    conditions: [
      '업무용으로 사용하는 통신비',
      '영수증 필요',
      '개인용과 구분 필요',
    ],
    tips: [
      '업무용 전화번호로 구분',
      '인터넷은 업무용으로 사용하는 부분만',
    ],
  },
  {
    id: 'transportation',
    category: '교통비',
    name: '업무용 교통비',
    description: '출장, 미팅 등 업무 관련 교통비',
    eligible: true,
    conditions: [
      '업무 목적의 이동',
      '교통비 영수증 필요',
      '출장일지 작성 권장',
    ],
    tips: [
      '택시비는 출장일지와 함께',
      '주유비는 업무용 차량만',
    ],
  },
  {
    id: 'equipment',
    category: '장비',
    name: '업무용 장비 구매',
    description: '노트북, 모니터, 카메라 등',
    eligible: true,
    conditions: [
      '업무에 직접 사용하는 장비',
      '구매 영수증 필요',
      '자산으로 등록 가능',
    ],
    tips: [
      '고가 장비는 감가상각',
      '개인용과 구분 필요',
    ],
  },
  {
    id: 'supplies',
    category: '소모품',
    name: '업무용 소모품',
    description: '문구류, 인쇄비 등',
    eligible: true,
    conditions: [
      '업무에 사용하는 소모품',
      '구매 영수증 필요',
    ],
    tips: [
      '일상용과 구분 필요',
      '영수증 잘 챙기기',
    ],
  },
  {
    id: 'education',
    category: '교육비',
    name: '업무 관련 교육비',
    description: '업무 스킬 향상 교육',
    eligible: true,
    conditions: [
      '업무와 직접 관련된 교육',
      '교육비 영수증 필요',
      '수료증 권장',
    ],
    tips: [
      '온라인 강의도 인정 가능',
      '자격증 취득 교육비 포함',
    ],
  },
  {
    id: 'meal',
    category: '식대',
    name: '업무 관련 식대',
    description: '고객 접대, 회식 등',
    eligible: true,
    conditions: [
      '업무 목적의 식대',
      '영수증 필요',
      '접대비 한도 주의',
    ],
    tips: [
      '접대비는 소득의 0.1% 한도',
      '회식은 업무 관련성 명시',
    ],
  },
  {
    id: 'personal-meal',
    category: '식대',
    name: '개인 식대',
    description: '개인 식사비',
    eligible: false,
    conditions: [
      '개인 식사는 경비 인정 불가',
    ],
    tips: [
      '업무 관련 식대만 인정',
      '개인 식사는 경비 처리 불가',
    ],
  },
  {
    id: 'personal-clothing',
    category: '의류',
    name: '개인 의류 구매',
    description: '일상복, 신발 등',
    eligible: false,
    conditions: [
      '개인 의류는 경비 인정 불가',
    ],
    tips: [
      '업무용 유니폼만 인정 가능',
      '일상복은 경비 처리 불가',
    ],
  },
  {
    id: 'entertainment',
    category: '오락',
    name: '오락비',
    description: '개인 오락, 취미 활동',
    eligible: false,
    conditions: [
      '개인 오락비는 경비 인정 불가',
    ],
    tips: [
      '업무와 무관한 오락비 불가',
      '고객 접대는 별도 기준',
    ],
  },
];

export function getExpenseByCategory(category: string): ExpenseItem[] {
  return EXPENSE_CATEGORIES.filter(item => item.category === category);
}

export function getEligibleExpenses(): ExpenseItem[] {
  return EXPENSE_CATEGORIES.filter(item => item.eligible);
}

export function getIneligibleExpenses(): ExpenseItem[] {
  return EXPENSE_CATEGORIES.filter(item => !item.eligible);
}

