/**
 * 가독성 점수 계산 및 개선 제안
 */

export interface ReadabilityScore {
  score: number; // 0-100
  grade: 'A' | 'B' | 'C' | 'D' | 'F';
  suggestions: string[];
}

/**
 * 텍스트의 가독성 점수 계산
 * - 평균 문장 길이
 * - 평균 단어 길이
 * - 문단 구조
 */
export function calculateReadabilityScore(content: string): ReadabilityScore {
  const suggestions: string[] = [];

  // 문장 수 계산
  const sentences = content.split(/[.!?]\s+/).filter((s) => s.trim().length > 0);
  const sentenceCount = sentences.length;

  // 단어 수 계산
  const words = content.split(/\s+/).filter((w) => w.trim().length > 0);
  const wordCount = words.length;

  // 평균 문장 길이
  const avgSentenceLength = sentenceCount > 0 ? wordCount / sentenceCount : 0;

  // 평균 단어 길이
  const avgWordLength =
    wordCount > 0
      ? words.reduce((sum, word) => sum + word.length, 0) / wordCount
      : 0;

  // 문단 수 계산
  const paragraphs = content.split(/\n\n+/).filter((p) => p.trim().length > 0);
  const paragraphCount = paragraphs.length;

  // 점수 계산 (간단한 알고리즘)
  let score = 100;

  // 문장이 너무 길면 감점 (평균 20단어 이상)
  if (avgSentenceLength > 20) {
    score -= 20;
    suggestions.push('문장이 너무 깁니다. 평균 문장 길이를 15-20단어로 줄이세요.');
  } else if (avgSentenceLength > 15) {
    score -= 10;
    suggestions.push('일부 문장이 길 수 있습니다. 짧은 문장으로 나누는 것을 고려하세요.');
  }

  // 단어가 너무 길면 감점 (평균 5자 이상)
  if (avgWordLength > 5) {
    score -= 15;
    suggestions.push('복잡한 단어가 많습니다. 쉬운 단어로 대체하는 것을 고려하세요.');
  }

  // 문단이 너무 길면 감점
  const avgParagraphLength = paragraphCount > 0 ? wordCount / paragraphCount : 0;
  if (avgParagraphLength > 150) {
    score -= 15;
    suggestions.push('문단이 너무 깁니다. 문단을 나누어 가독성을 높이세요.');
  }

  // 문단이 너무 적으면 감점
  if (paragraphCount < 3 && wordCount > 300) {
    score -= 10;
    suggestions.push('문단이 적습니다. 내용을 논리적으로 나누어 문단을 구성하세요.');
  }

  // 최소 점수 보장
  score = Math.max(0, Math.min(100, score));

  // 등급 결정
  let grade: 'A' | 'B' | 'C' | 'D' | 'F';
  if (score >= 80) {
    grade = 'A';
  } else if (score >= 70) {
    grade = 'B';
  } else if (score >= 60) {
    grade = 'C';
  } else if (score >= 50) {
    grade = 'D';
  } else {
    grade = 'F';
  }

  // 긍정적인 피드백 추가
  if (suggestions.length === 0) {
    suggestions.push('가독성이 우수합니다!');
  }

  return {
    score,
    grade,
    suggestions,
  };
}

