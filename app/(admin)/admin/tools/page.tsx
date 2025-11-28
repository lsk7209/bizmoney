import { getAllTools } from '@/data/items';
import Link from 'next/link';

export default async function AdminToolsPage() {
  const tools = getAllTools();

  const stats = {
    total: tools.length,
    published: tools.filter((t) => t.published).length,
    unpublished: tools.filter((t) => !t.published).length,
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">도구 관리</h1>
          <p className="mt-2 text-gray-600">
            전체 {stats.total}개 (발행: {stats.published}, 미발행: {stats.unpublished})
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm font-medium text-gray-500">전체 도구</div>
          <div className="mt-2 text-3xl font-bold text-gray-900">{stats.total}</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm font-medium text-green-600">발행됨</div>
          <div className="mt-2 text-3xl font-bold text-green-600">{stats.published}</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm font-medium text-gray-600">미발행</div>
          <div className="mt-2 text-3xl font-bold text-gray-600">{stats.unpublished}</div>
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
                SEO 상태
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                작업
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {tools.map((tool) => {
              const seoComplete =
                !!tool.metaTitle &&
                !!tool.metaDescription &&
                !!tool.keywords &&
                tool.keywords.length > 0;

              return (
                <tr key={tool.slug} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{tool.title}</div>
                    <div className="text-sm text-gray-500">/{tool.slug}</div>
                    {tool.description && (
                      <div className="text-sm text-gray-400 mt-1">{tool.description}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        tool.published
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {tool.published ? '발행됨' : '미발행'}
                    </span>
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
                      href={`/tools/${tool.slug}`}
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
        {tools.length === 0 && (
          <div className="px-6 py-12 text-center">
            <p className="text-gray-500">등록된 도구가 없습니다.</p>
            <p className="text-sm text-gray-400 mt-2">
              도구는 <code className="px-2 py-1 bg-gray-100 rounded">data/items.ts</code> 파일에
              추가하세요.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

