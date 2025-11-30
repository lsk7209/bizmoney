/**
 * 정부지원금 매칭 로직
 */

export interface SupportMatchingInput {
  businessType: string; // 업종
  businessScale: 'micro' | 'small' | 'medium'; // 사업 규모
  region: string; // 지역
  employeeCount?: number; // 직원 수
  annualRevenue?: number; // 연 매출
}

export interface GovernmentSupport {
  id: string;
  name: string;
  description: string;
  amount: string; // 지원금액
  eligibility: string[]; // 신청 자격
  deadline: string; // 신청 마감일
  link: string; // 신청 링크
  category: string; // 카테고리
}

// 정부지원금 데이터 (예시)
export const SUPPORT_PROGRAMS: GovernmentSupport[] = [
  {
    id: 'startup-2025',
    name: '2025년 창업지원금',
    description: '신규 창업자를 위한 창업지원금',
    amount: '최대 3,000만원',
    eligibility: ['신규 창업', '사업자 등록 1년 이내'],
    deadline: '2025-12-31',
    link: 'https://www.smba.go.kr',
    category: '창업지원',
  },
  {
    id: 'digital-transformation',
    name: '디지털 전환 지원금',
    description: '중소기업 디지털 전환 지원',
    amount: '최대 2,000만원',
    eligibility: ['중소기업', '디지털화 계획'],
    deadline: '2025-11-30',
    link: 'https://www.smba.go.kr',
    category: '디지털화',
  },
  {
    id: 'employment-support',
    name: '고용창출 지원금',
    description: '신규 고용 창출 시 지원',
    amount: '인당 최대 1,200만원',
    eligibility: ['신규 고용', '6개월 이상 고용'],
    deadline: '상시',
    link: 'https://www.work.go.kr',
    category: '고용지원',
  },
  {
    id: 'rd-support',
    name: 'R&D 지원금',
    description: '연구개발 활동 지원',
    amount: '최대 5,000만원',
    eligibility: ['R&D 계획', '기술개발'],
    deadline: '2025-10-31',
    link: 'https://www.kiat.or.kr',
    category: '연구개발',
  },
];

/**
 * 정부지원금 매칭
 */
export function matchGovernmentSupport(input: SupportMatchingInput): GovernmentSupport[] {
  const matched: GovernmentSupport[] = [];

  for (const program of SUPPORT_PROGRAMS) {
    let isMatch = true;

    // 업종 매칭 (간단한 예시)
    if (input.businessType && !program.eligibility.some(e => e.includes(input.businessType))) {
      // 업종 필터링 로직 (실제로는 더 복잡)
    }

    // 규모 매칭
    if (input.businessScale === 'micro' && program.category === '창업지원') {
      matched.push(program);
      continue;
    }

    // 기본 매칭 (모든 프로그램 표시)
    if (isMatch) {
      matched.push(program);
    }
  }

  return matched;
}

