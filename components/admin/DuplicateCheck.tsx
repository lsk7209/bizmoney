'use client';

import { useState, useEffect } from 'react';
import { checkAllDuplicateContent } from '@/lib/duplicate-check';
import type { DuplicateCheckResult } from '@/lib/duplicate-check';

export function DuplicateCheck() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<{
    keywordConflicts: Array<{ keyword: string; posts: Array<{ slug: string; title: string }> }>;
    similarTitles: Array<{ post1: { slug: string; title: string }; post2: { slug: string; title: string }; similarity: number }>;
    duplicateCanonicals: Array<{ canonical: string; posts: Array<{ slug: string; title: string }> }>;
  } | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/admin/duplicate-check');
        if (response.ok) {
          const result = await response.json();
          setData(result);
        }
      } catch (error) {
        console.error('Error fetching duplicate check:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center py-4">중복 컨텐츠 검사 중...</div>;
  }

  if (!data) {
    return <div className="text-center py-4 text-red-600">검사 실패</div>;
  }

  const hasIssues =
    data.keywordConflicts.length > 0 ||
    data.similarTitles.length > 0 ||
    data.duplicateCanonicals.length > 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">중복 컨텐츠 검사</h2>
        {hasIssues ? (
          <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
            문제 발견
          </span>
        ) : (
          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
            문제 없음
          </span>
        )}
      </div>

      {/* 키워드 충돌 */}
      {data.keywordConflicts.length > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h3 className="font-semibold text-yellow-900 mb-2">
            키워드 충돌 ({data.keywordConflicts.length}개)
          </h3>
          <ul className="space-y-2">
            {data.keywordConflicts.map((conflict, idx) => (
              <li key={idx} className="text-sm">
                <span className="font-medium text-yellow-900">&quot;{conflict.keyword}&quot;</span>
                <span className="text-yellow-700"> - {conflict.posts.length}개 포스트:</span>
                <ul className="ml-4 mt-1 space-y-1">
                  {conflict.posts.map((post) => (
                    <li key={post.slug} className="text-yellow-700">
                      • <a href={`/admin/posts/${post.slug}`} className="hover:underline">{post.title}</a>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 유사한 제목 */}
      {data.similarTitles.length > 0 && (
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <h3 className="font-semibold text-orange-900 mb-2">
            유사한 제목 ({data.similarTitles.length}개)
          </h3>
          <ul className="space-y-2">
            {data.similarTitles.map((item, idx) => (
              <li key={idx} className="text-sm">
                <span className="text-orange-700">
                  {item.similarity}% 유사: &quot;
                  <a href={`/admin/posts/${item.post1.slug}`} className="hover:underline">
                    {item.post1.title}
                  </a>
                  &quot; ↔ &quot;
                  <a href={`/admin/posts/${item.post2.slug}`} className="hover:underline">
                    {item.post2.title}
                  </a>
                  &quot;
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 중복 Canonical */}
      {data.duplicateCanonicals.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h3 className="font-semibold text-red-900 mb-2">
            중복 Canonical URL ({data.duplicateCanonicals.length}개)
          </h3>
          <ul className="space-y-2">
            {data.duplicateCanonicals.map((item, idx) => (
              <li key={idx} className="text-sm">
                <span className="font-medium text-red-900">&quot;{item.canonical}&quot;</span>
                <span className="text-red-700"> - {item.posts.length}개 포스트:</span>
                <ul className="ml-4 mt-1 space-y-1">
                  {item.posts.map((post) => (
                    <li key={post.slug} className="text-red-700">
                      • <a href={`/admin/posts/${post.slug}`} className="hover:underline">{post.title}</a>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      )}

      {!hasIssues && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
          <p className="text-green-800 font-medium">중복 컨텐츠가 발견되지 않았습니다.</p>
        </div>
      )}
    </div>
  );
}

