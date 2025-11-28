import { getAllPostsForAdmin } from '@/lib/admin';
import Link from 'next/link';

export default async function AdminDashboardPage() {
  const posts = getAllPostsForAdmin();

  const stats = {
    total: posts.length,
    published: posts.filter((p) => p.published && p.status === 'published').length,
    draft: posts.filter((p) => p.status === 'draft').length,
    review: posts.filter((p) => p.status === 'review').length,
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">대시보드</h1>
        <p className="mt-2 text-gray-600">콘텐츠 관리 및 SEO 설정</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm font-medium text-gray-500">전체 포스트</div>
          <div className="mt-2 text-3xl font-bold text-gray-900">{stats.total}</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm font-medium text-green-600">발행됨</div>
          <div className="mt-2 text-3xl font-bold text-green-600">{stats.published}</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm font-medium text-yellow-600">검수 대기</div>
          <div className="mt-2 text-3xl font-bold text-yellow-600">{stats.review}</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm font-medium text-gray-600">초안</div>
          <div className="mt-2 text-3xl font-bold text-gray-600">{stats.draft}</div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">최근 포스트</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  제목
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  상태
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  날짜
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  SEO
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  작업
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {posts.slice(0, 10).map((post) => (
                <tr key={post.slug}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{post.title}</div>
                    <div className="text-sm text-gray-500">{post.slug}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        post.status === 'published'
                          ? 'bg-green-100 text-green-800'
                          : post.status === 'review'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {post.status === 'published'
                        ? '발행됨'
                        : post.status === 'review'
                        ? '검수 대기'
                        : '초안'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(post.date).toLocaleDateString('ko-KR')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-2">
                      {post.metaTitle ? (
                        <span className="text-green-500" title="metaTitle 설정됨">
                          ✓
                        </span>
                      ) : (
                        <span className="text-red-500" title="metaTitle 없음">
                          ✗
                        </span>
                      )}
                      {post.metaDescription ? (
                        <span className="text-green-500" title="metaDescription 설정됨">
                          ✓
                        </span>
                      ) : (
                        <span className="text-red-500" title="metaDescription 없음">
                          ✗
                        </span>
                      )}
                      {post.keywords && post.keywords.length > 0 ? (
                        <span className="text-green-500" title="키워드 설정됨">
                          ✓
                        </span>
                      ) : (
                        <span className="text-red-500" title="키워드 없음">
                          ✗
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link
                      href={`/admin/posts/${post.slug}`}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      편집
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 border-t border-gray-200">
          <Link
            href="/admin/posts"
            className="text-blue-600 hover:text-blue-900 text-sm font-medium"
          >
            모든 포스트 보기 →
          </Link>
        </div>
      </div>
    </div>
  );
}

