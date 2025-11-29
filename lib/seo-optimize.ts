import { siteConfig } from '@/site.config';
import type { BlogPost } from '@/types/blog';

/**
 * Meta Title에 키워드를 앞쪽에 배치
 */
export function optimizeMetaTitle(title: string, keywords?: string[]): string {
  if (!keywords || keywords.length === 0) {
    return title;
  }

  // 이미 키워드가 포함되어 있는지 확인
  const firstKeyword = keywords[0];
  if (title.toLowerCase().includes(firstKeyword.toLowerCase())) {
    return title;
  }

  // 키워드를 앞쪽에 추가 (최대 60자)
  const keywordPrefix = `${firstKeyword} `;
  const maxLength = 60;
  
  if (keywordPrefix.length + title.length <= maxLength) {
    return `${keywordPrefix}${title}`;
  }

  // 제목이 너무 길면 키워드만 앞에 추가하고 나머지 자름
  const remainingLength = maxLength - keywordPrefix.length - 3; // '...' 공간
  return `${keywordPrefix}${title.slice(0, remainingLength)}...`;
}

/**
 * Meta Description에 키워드를 앞쪽에 배치
 */
export function optimizeMetaDescription(
  description: string,
  keywords?: string[]
): string {
  if (!keywords || keywords.length === 0) {
    return description;
  }

  // 이미 키워드가 포함되어 있는지 확인
  const firstKeyword = keywords[0];
  if (description.toLowerCase().includes(firstKeyword.toLowerCase())) {
    return description;
  }

  // 키워드를 앞쪽에 추가 (최대 160자)
  const keywordPrefix = `${firstKeyword} `;
  const maxLength = 160;
  
  if (keywordPrefix.length + description.length <= maxLength) {
    return `${keywordPrefix}${description}`;
  }

  // 설명이 너무 길면 키워드만 앞에 추가하고 나머지 자름
  const remainingLength = maxLength - keywordPrefix.length - 3; // '...' 공간
  return `${keywordPrefix}${description.slice(0, remainingLength)}...`;
}

/**
 * 키워드가 없으면 기본 키워드 사용
 */
export function getOptimizedKeywords(keywords?: string[]): string[] {
  if (keywords && keywords.length > 0) {
    return keywords;
  }
  
  // 기본 키워드를 배열로 변환
  const defaultKeywords = siteConfig.seo.defaultKeywords;
  if (typeof defaultKeywords === 'string') {
    return defaultKeywords.split(',').map((k) => k.trim()).filter(Boolean);
  }
  
  return [];
}

/**
 * 블로그 포스트의 메타데이터 자동 최적화
 */
export function optimizeBlogPostMeta(post: BlogPost): {
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  h1: string;
} {
  const keywords = getOptimizedKeywords(post.keywords);
  
  // Meta Title 최적화
  const metaTitle = optimizeMetaTitle(
    post.metaTitle || post.title,
    keywords
  );

  // Meta Description 최적화
  const metaDescription = optimizeMetaDescription(
    post.metaDescription || post.description || '',
    keywords
  );

  // H1 최적화 (없으면 title 사용)
  const h1 = post.h1 || post.title;

  return {
    metaTitle,
    metaDescription,
    keywords,
    h1,
  };
}

/**
 * 도구의 메타데이터 자동 최적화
 */
export function optimizeToolMeta(tool: {
  title: string;
  description?: string;
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
}): {
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
} {
  const keywords = getOptimizedKeywords(tool.keywords);
  
  // Meta Title 최적화
  const metaTitle = optimizeMetaTitle(
    tool.metaTitle || tool.title,
    keywords
  );

  // Meta Description 최적화
  const metaDescription = optimizeMetaDescription(
    tool.metaDescription || tool.description || '',
    keywords
  );

  return {
    metaTitle,
    metaDescription,
    keywords,
  };
}

