import { siteConfig } from '@/site.config';
import Link from 'next/link';

export default async function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">사이트 설정</h1>
        <p className="mt-2 text-gray-600">전역 사이트 설정을 확인하고 관리합니다</p>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">기본 정보</h2>
        <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <dt className="text-sm font-medium text-gray-500">사이트 이름</dt>
            <dd className="mt-1 text-sm text-gray-900">{siteConfig.name}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">사이트 URL</dt>
            <dd className="mt-1 text-sm text-gray-900">{siteConfig.url}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">설명</dt>
            <dd className="mt-1 text-sm text-gray-900">{siteConfig.description}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">작성자</dt>
            <dd className="mt-1 text-sm text-gray-900">{siteConfig.author.name}</dd>
          </div>
        </dl>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">SEO 설정</h2>
        <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <dt className="text-sm font-medium text-gray-500">기본 Meta Title</dt>
            <dd className="mt-1 text-sm text-gray-900">{siteConfig.seo.title}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">기본 Meta Description</dt>
            <dd className="mt-1 text-sm text-gray-900">{siteConfig.seo.description}</dd>
          </div>
          <div className="md:col-span-2">
            <dt className="text-sm font-medium text-gray-500">기본 키워드</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {siteConfig.seo.keywords.join(', ')}
            </dd>
          </div>
        </dl>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">AdSense 설정</h2>
        <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <dt className="text-sm font-medium text-gray-500">활성화 상태</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {siteConfig.adsense.enabled ? (
                <span className="text-green-600">활성화됨</span>
              ) : (
                <span className="text-gray-400">비활성화됨</span>
              )}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">클라이언트 ID</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {siteConfig.adsense.clientId || (
                <span className="text-gray-400">설정되지 않음</span>
              )}
            </dd>
          </div>
        </dl>
        <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
          <p className="text-sm text-yellow-800">
            <strong>참고:</strong> 사이트 설정은 <code className="px-2 py-1 bg-yellow-100 rounded">
              site.config.ts
            </code>{' '}
            파일을 직접 수정하여 변경할 수 있습니다.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">환경 변수</h2>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">NEXT_PUBLIC_SITE_URL</span>
            <span className="text-sm text-gray-900">
              {process.env.NEXT_PUBLIC_SITE_URL || '설정되지 않음'}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">VERCEL_URL</span>
            <span className="text-sm text-gray-900">
              {process.env.VERCEL_URL || '설정되지 않음'}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">NEXT_PUBLIC_ADSENSE_CLIENT_ID</span>
            <span className="text-sm text-gray-900">
              {process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID ? '설정됨' : '설정되지 않음'}
            </span>
          </div>
        </div>
        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-md">
          <p className="text-sm text-blue-800">
            <strong>참고:</strong> 환경 변수는 Vercel 대시보드 또는{' '}
            <code className="px-2 py-1 bg-blue-100 rounded">.env.local</code> 파일에서 설정할 수
            있습니다.
          </p>
        </div>
      </div>
    </div>
  );
}

