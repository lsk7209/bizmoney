'use client';

import { useState, useEffect, Fragment } from 'react';
import { useRouter } from 'next/navigation';
import type { BlogPost } from '@/types/blog';

interface AdminPostEditorProps {
  post: BlogPost;
  allPosts: BlogPost[];
  isNew?: boolean;
}

export function AdminPostEditor({ post, allPosts, isNew = false }: AdminPostEditorProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    title: post.title || '',
    slug: post.slug || '',
    description: post.description || '',
    date: post.date || '',
    author: post.author || '',
    category: post.category || '',
    tags: (post.tags || []).join(', '),
    metaTitle: post.metaTitle || '',
    metaDescription: post.metaDescription || '',
    keywords: (post.keywords || []).join(', '),
    canonicalUrl: post.canonicalUrl || '',
    h1: post.h1 || '',
    status: post.status || (post.published ? 'published' : 'draft'),
    index: post.index !== false,
    sitemap: post.sitemap !== false,
    published: post.published,
    ctaText: post.cta?.text || '',
    ctaUrl: post.cta?.url || '',
    internalLinks: (post.internalLinks || []).join(', '),
    externalLinks: JSON.stringify(post.externalLinks || [], null, 2),
    content: post.content || '',
  });

  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  const validateForm = (): boolean => {
    const errors: string[] = [];

    if (!formData.metaTitle) errors.push('metaTitle이 필요합니다');
    if (!formData.metaDescription) errors.push('metaDescription이 필요합니다');
    if (!formData.keywords) errors.push('키워드가 필요합니다');
    if (!formData.h1) errors.push('H1 텍스트가 필요합니다');

    if (formData.status === 'published') {
      if (formData.category || formData.tags) {
        if (!formData.ctaText || !formData.ctaUrl) {
          errors.push('CTA(버튼 또는 링크)가 필요합니다');
        }
        if (!formData.internalLinks || formData.internalLinks.split(',').filter((l) => l.trim()).length < 2) {
          errors.push('최소 2개의 내부 링크가 필요합니다');
        }
        try {
          const externalLinks = JSON.parse(formData.externalLinks || '[]');
          if (!Array.isArray(externalLinks) || externalLinks.length < 1) {
            errors.push('최소 1개의 외부 링크가 필요합니다');
          }
        } catch {
          errors.push('외부 링크 형식이 올바르지 않습니다');
        }
      }
    }

    setValidationErrors(errors);
    return errors.length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const tags = formData.tags
        .split(',')
        .map((t) => t.trim())
        .filter((t) => t);
      const keywords = formData.keywords
        .split(',')
        .map((k) => k.trim())
        .filter((k) => k);
      const internalLinks = formData.internalLinks
        .split(',')
        .map((l) => l.trim())
        .filter((l) => l);

      let externalLinks: Array<{ url: string; description: string }> = [];
      try {
        externalLinks = JSON.parse(formData.externalLinks || '[]');
      } catch {
        // JSON 파싱 실패 시 무시
      }

      const apiUrl = isNew
        ? '/api/admin/posts'
        : `/api/admin/posts/${post.slug}`;
      const method = isNew ? 'POST' : 'PUT';

      const response = await fetch(apiUrl, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          tags,
          keywords,
          internalLinks,
          externalLinks,
          published: formData.status === 'published',
          content: formData.content,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        if (isNew && data.post?.slug) {
          router.push(`/admin/posts/${data.post.slug}`);
        } else {
          router.refresh();
        }
      } else {
        setError(data.error || '저장에 실패했습니다');
      }
    } catch (err) {
      setError('저장 중 오류가 발생했습니다');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('정말로 이 포스트를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
      return;
    }

    setDeleting(true);
    setError('');

    try {
      const response = await fetch(`/api/admin/posts/${post.slug}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        router.push('/admin/posts');
      } else {
        const data = await response.json();
        setError(data.error || '삭제에 실패했습니다');
      }
    } catch (err) {
      setError('삭제 중 오류가 발생했습니다');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Fragment>
      <form onSubmit={handleSubmit} className="space-y-8">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
            저장되었습니다!
          </div>
        )}
        {validationErrors.length > 0 && (
          <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded">
            <div className="font-semibold mb-2">검증 오류:</div>
            <ul className="list-disc list-inside space-y-1">
              {validationErrors.map((err, idx) => (
                <li key={idx}>{err}</li>
              ))}
            </ul>
          </div>
        )}

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">기본 정보</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              제목 *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              슬러그 *
            </label>
            <input
              type="text"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              설명
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              날짜 *
            </label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              카테고리
            </label>
            <input
              type="text"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              태그 (쉼표로 구분)
            </label>
            <input
              type="text"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              placeholder="태그1, 태그2, 태그3"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">SEO 설정</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Meta Title * (검색 엔진 제목)
            </label>
            <input
              type="text"
              value={formData.metaTitle}
              onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              maxLength={100}
              required
            />
            <p className="mt-1 text-sm text-gray-500">{formData.metaTitle.length}/100</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Meta Description * (검색 엔진 설명)
            </label>
            <textarea
              value={formData.metaDescription}
              onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              maxLength={200}
              required
            />
            <p className="mt-1 text-sm text-gray-500">{formData.metaDescription.length}/200</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              타겟 키워드 * (쉼표로 구분)
            </label>
            <input
              type="text"
              value={formData.keywords}
              onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
              placeholder="키워드1, 키워드2, 키워드3"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              H1 텍스트 * (페이지 제목)
            </label>
            <input
              type="text"
              value={formData.h1}
              onChange={(e) => setFormData({ ...formData, h1: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Canonical URL
            </label>
            <input
              type="url"
              value={formData.canonicalUrl}
              onChange={(e) => setFormData({ ...formData, canonicalUrl: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center space-x-6">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.index}
                onChange={(e) => setFormData({ ...formData, index: e.target.checked })}
                className="mr-2"
              />
              <span className="text-sm text-gray-700">검색 엔진 인덱싱 허용</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.sitemap}
                onChange={(e) => setFormData({ ...formData, sitemap: e.target.checked })}
                className="mr-2"
              />
              <span className="text-sm text-gray-700">Sitemap 포함</span>
            </label>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">상태 및 발행 설정</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              상태 *
            </label>
            <select
              value={formData.status}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  status: e.target.value as 'draft' | 'review' | 'published',
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="draft">초안</option>
              <option value="review">검수 대기</option>
              <option value="published">발행됨</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">콘텐츠 (MDX)</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              MDX 콘텐츠
            </label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              rows={20}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
              placeholder="MDX 콘텐츠를 입력하세요..."
            />
            <p className="mt-1 text-sm text-gray-500">
              MDX 형식으로 작성하세요. 컴포넌트 사용 예: &lt;Callout type="info"&gt;내용&lt;/Callout&gt;
            </p>
          </div>
        </div>
      </div>

      {(formData.category || formData.tags) && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">블로그/가이드 추가 설정</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                CTA 텍스트 * (Call to Action)
              </label>
              <input
                type="text"
                value={formData.ctaText}
                onChange={(e) => setFormData({ ...formData, ctaText: e.target.value })}
                placeholder="예: 관련 도구 바로가기"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                CTA URL * (링크)
              </label>
              <input
                type="url"
                value={formData.ctaUrl}
                onChange={(e) => setFormData({ ...formData, ctaUrl: e.target.value })}
                placeholder="/tools/tool-slug"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                내부 링크 * (최소 2개, 쉼표로 구분)
              </label>
              <input
                type="text"
                value={formData.internalLinks}
                onChange={(e) => setFormData({ ...formData, internalLinks: e.target.value })}
                placeholder="/blog/slug1, /tools/slug2"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="mt-1 text-sm text-gray-500">
                예: /blog/post-1, /tools/calculator
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                외부 링크 * (최소 1개, JSON 형식)
              </label>
              <textarea
                value={formData.externalLinks}
                onChange={(e) => setFormData({ ...formData, externalLinks: e.target.value })}
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                placeholder='[{"url": "https://example.com", "description": "공식 문서"}]'
              />
              <p className="mt-1 text-sm text-gray-500">
                JSON 배열 형식: [{"url": "...", "description": "..."}]
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center">
        {!isNew && (
          <button
            type="button"
            onClick={handleDelete}
            disabled={deleting}
            className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {deleting ? '삭제 중...' : '삭제'}
          </button>
        )}
        <div className="flex justify-end space-x-4 ml-auto">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            취소
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? '저장 중...' : '저장'}
          </button>
        </div>
      </div>
      </form>
    </Fragment>
  );
}

