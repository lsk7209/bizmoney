import fs from 'fs';
import path from 'path';
import Link from 'next/link';

interface Topic {
  id: string;
  title: string;
  description?: string;
  keywords?: string[];
  status: 'pending' | 'processing' | 'completed' | 'failed';
  createdAt: string;
  error?: string;
}

function getTopics(): Topic[] {
  try {
    const topicsPath = path.join(process.cwd(), 'data', 'topics.json');
    if (!fs.existsSync(topicsPath)) {
      return [];
    }
    const fileContents = fs.readFileSync(topicsPath, 'utf8');
    const data = JSON.parse(fileContents);
    return data.topics || [];
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error reading topics:', error);
    }
    return [];
  }
}

export default async function AdminTopicsPage() {
  const topics = getTopics();

  const stats = {
    total: topics.length,
    pending: topics.filter((t) => t.status === 'pending').length,
    processing: topics.filter((t) => t.status === 'processing').length,
    completed: topics.filter((t) => t.status === 'completed').length,
    failed: topics.filter((t) => t.status === 'failed').length,
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">토픽 관리</h1>
          <p className="mt-2 text-gray-600">
            AI 작성 대기열 관리 (전체 {stats.total}개)
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm font-medium text-gray-500">전체</div>
          <div className="mt-2 text-3xl font-bold text-gray-900">{stats.total}</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm font-medium text-yellow-600">대기 중</div>
          <div className="mt-2 text-3xl font-bold text-yellow-600">{stats.pending}</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm font-medium text-blue-600">처리 중</div>
          <div className="mt-2 text-3xl font-bold text-blue-600">{stats.processing}</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm font-medium text-green-600">완료</div>
          <div className="mt-2 text-3xl font-bold text-green-600">{stats.completed}</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm font-medium text-red-600">실패</div>
          <div className="mt-2 text-3xl font-bold text-red-600">{stats.failed}</div>
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
                키워드
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                생성일
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {topics.map((topic) => (
              <tr key={topic.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">{topic.title}</div>
                  {topic.description && (
                    <div className="text-sm text-gray-500 mt-1">{topic.description}</div>
                  )}
                  {topic.error && (
                    <div className="text-sm text-red-600 mt-1">오류: {topic.error}</div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      topic.status === 'completed'
                        ? 'bg-green-100 text-green-800'
                        : topic.status === 'failed'
                        ? 'bg-red-100 text-red-800'
                        : topic.status === 'processing'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {topic.status === 'completed'
                      ? '완료'
                      : topic.status === 'failed'
                      ? '실패'
                      : topic.status === 'processing'
                      ? '처리 중'
                      : '대기 중'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">
                    {topic.keywords && topic.keywords.length > 0
                      ? topic.keywords.join(', ')
                      : '-'}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(topic.createdAt).toLocaleDateString('ko-KR')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {topics.length === 0 && (
          <div className="px-6 py-12 text-center">
            <p className="text-gray-500">등록된 토픽이 없습니다.</p>
            <p className="text-sm text-gray-400 mt-2">
              토픽은 <code className="px-2 py-1 bg-gray-100 rounded">data/topics.json</code> 파일에
              추가하세요.
            </p>
          </div>
        )}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">토픽 추가 방법</h3>
        <p className="text-sm text-blue-800 mb-4">
          <code className="px-2 py-1 bg-blue-100 rounded">data/topics.json</code> 파일을 열고 다음
          형식으로 토픽을 추가하세요:
        </p>
        <pre className="bg-blue-100 p-4 rounded text-sm overflow-x-auto">
          {JSON.stringify(
            {
              topics: [
                {
                  id: 'unique-id',
                  title: '블로그 포스트 제목',
                  description: '설명 (선택)',
                  keywords: ['키워드1', '키워드2'],
                  status: 'pending',
                  createdAt: new Date().toISOString(),
                },
              ],
            },
            null,
            2
          )}
        </pre>
        <p className="text-sm text-blue-800 mt-4">
          GitHub Actions가 4시간마다 자동으로 처리하거나, Actions 탭에서 수동 실행할 수 있습니다.
        </p>
      </div>
    </div>
  );
}

