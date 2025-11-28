import { getAllPostsForAdmin } from '@/lib/admin';
import Link from 'next/link';

export default async function AdminPostsPage() {
  const posts = getAllPostsForAdmin();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">블로그 포스트 관리</h1>
          <p className="mt-2 text-gray-600">전체 {posts.length}개의 포스트</p>
        </div>
        <div className="flex space-x-4">
          <select className="px-4 py-2 border border-gray-300 rounded-md text-sm">
            <option value="all">전체</option>
            <option value="published">발행됨</option>
            <option value="review">검수 대기</option>
            <option value="draft">초안</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
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
                SEO 상태
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                작업
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {posts.map((post) => {
              const seoComplete =
                !!post.metaTitle &&
                !!post.metaDescription &&
                !!post.keywords &&
                post.keywords.length > 0 &&
                !!post.h1;

              return (
                <tr key={post.slug} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{post.title}</div>
                    <div className="text-sm text-gray-500">/{post.slug}</div>
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
                    {!post.index && (
                      <span className="ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                        noindex
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(post.date).toLocaleDateString('ko-KR')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {seoComplete ? (
                      <span className="text-green-600 text-sm font-medium">완료</span>
                    ) : (
                      <span className="text-red-600 text-sm font-medium">미완료</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link
                      href={`/admin/posts/${post.slug}`}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      편집
                    </Link>
                    <Link
                      href={`/blog/${post.slug}`}
                      target="_blank"
                      className="text-gray-600 hover:text-gray-900"
                    >
                      보기
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

