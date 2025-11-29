import type { BlogPost } from '@/types/blog';
import { getAllPostsForAdmin } from '@/lib/admin';

/**
 * 중복 컨텐츠 감지 결과
 */
export interface DuplicateCheckResult {
  hasDuplicates: boolean;
  duplicateKeywords: Array<{
    keyword: string;
    posts: Array<{ slug: string; title: string }>;
  }>;
  similarTitles: Array<{
    post1: { slug: string; title: string };
    post2: { slug: string; title: string };
    similarity: number;
  }>;
  duplicateCanonicals: Array<{
    canonical: string;
    posts: Array<{ slug: string; title: string }>;
  }>;
}

/**
 * 두 문자열의 유사도 계산 (Jaccard 유사도)
 */
function calculateSimilarity(str1: string, str2: string): number {
  const words1 = new Set(str1.toLowerCase().split(/\s+/));
  const words2 = new Set(str2.toLowerCase().split(/\s+/));
  
  const intersection = new Set([...words1].filter((x) => words2.has(x)));
  const union = new Set([...words1, ...words2]);
  
  return intersection.size / union.size;
}

/**
 * 블로그 포스트의 중복 컨텐츠 검사
 */
export function checkDuplicateContent(
  post: BlogPost,
  allPosts?: BlogPost[]
): DuplicateCheckResult {
  const posts = allPosts || getAllPostsForAdmin();
  const otherPosts = posts.filter((p) => p.slug !== post.slug);

  const duplicateKeywords: DuplicateCheckResult['duplicateKeywords'] = [];
  const similarTitles: DuplicateCheckResult['similarTitles'] = [];
  const duplicateCanonicals: DuplicateCheckResult['duplicateCanonicals'] = [];

  // 키워드 중복 검사
  if (post.keywords && post.keywords.length > 0) {
    const keywordMap = new Map<string, Array<{ slug: string; title: string }>>();

    post.keywords.forEach((keyword) => {
      const matchingPosts = otherPosts.filter(
        (p) => p.keywords && p.keywords.includes(keyword)
      );

      if (matchingPosts.length > 0) {
        const posts = matchingPosts.map((p) => ({
          slug: p.slug,
          title: p.title,
        }));
        keywordMap.set(keyword, posts);
      }
    });

    keywordMap.forEach((posts, keyword) => {
      duplicateKeywords.push({
        keyword,
        posts,
      });
    });
  }

  // 제목 유사도 검사
  otherPosts.forEach((otherPost) => {
    const similarity = calculateSimilarity(post.title, otherPost.title);
    if (similarity > 0.5) {
      // 50% 이상 유사하면 경고
      similarTitles.push({
        post1: { slug: post.slug, title: post.title },
        post2: { slug: otherPost.slug, title: otherPost.title },
        similarity: Math.round(similarity * 100),
      });
    }
  });

  // Canonical URL 중복 검사
  if (post.canonicalUrl) {
    const matchingPosts = otherPosts.filter(
      (p) => p.canonicalUrl === post.canonicalUrl
    );

    if (matchingPosts.length > 0) {
      duplicateCanonicals.push({
        canonical: post.canonicalUrl,
        posts: [
          { slug: post.slug, title: post.title },
          ...matchingPosts.map((p) => ({ slug: p.slug, title: p.title })),
        ],
      });
    }
  }

  return {
    hasDuplicates:
      duplicateKeywords.length > 0 ||
      similarTitles.length > 0 ||
      duplicateCanonicals.length > 0,
    duplicateKeywords,
    similarTitles,
    duplicateCanonicals,
  };
}

/**
 * 전체 포스트의 중복 컨텐츠 검사
 */
export function checkAllDuplicateContent(): {
  keywordConflicts: Array<{
    keyword: string;
    posts: Array<{ slug: string; title: string }>;
  }>;
  similarTitles: Array<{
    post1: { slug: string; title: string };
    post2: { slug: string; title: string };
    similarity: number;
  }>;
  duplicateCanonicals: Array<{
    canonical: string;
    posts: Array<{ slug: string; title: string }>;
  }>;
} {
  const posts = getAllPostsForAdmin();
  const keywordMap = new Map<string, Array<{ slug: string; title: string }>>();
  const canonicalMap = new Map<string, Array<{ slug: string; title: string }>>();
  const similarTitles: Array<{
    post1: { slug: string; title: string };
    post2: { slug: string; title: string };
    similarity: number;
  }> = [];

  // 키워드 충돌 검사
  posts.forEach((post) => {
    if (post.keywords && post.keywords.length > 0) {
      post.keywords.forEach((keyword) => {
        if (!keywordMap.has(keyword)) {
          keywordMap.set(keyword, []);
        }
        keywordMap.get(keyword)!.push({
          slug: post.slug,
          title: post.title,
        });
      });
    }

    // Canonical URL 중복 검사
    const canonical = post.canonicalUrl || `${post.slug}`;
    if (!canonicalMap.has(canonical)) {
      canonicalMap.set(canonical, []);
    }
    canonicalMap.get(canonical)!.push({
      slug: post.slug,
      title: post.title,
    });
  });

  // 제목 유사도 검사
  for (let i = 0; i < posts.length; i++) {
    for (let j = i + 1; j < posts.length; j++) {
      const similarity = calculateSimilarity(posts[i].title, posts[j].title);
      if (similarity > 0.5) {
        similarTitles.push({
          post1: { slug: posts[i].slug, title: posts[i].title },
          post2: { slug: posts[j].slug, title: posts[j].title },
          similarity: Math.round(similarity * 100),
        });
      }
    }
  }

  const keywordConflicts = Array.from(keywordMap.entries())
    .filter(([_, posts]) => posts.length > 1)
    .map(([keyword, posts]) => ({ keyword, posts }));

  const duplicateCanonicals = Array.from(canonicalMap.entries())
    .filter(([_, posts]) => posts.length > 1)
    .map(([canonical, posts]) => ({ canonical, posts }));

  return {
    keywordConflicts,
    similarTitles,
    duplicateCanonicals,
  };
}

