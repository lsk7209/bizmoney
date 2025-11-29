import { DuplicateCheck } from '@/components/admin/DuplicateCheck';

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">대시보드</h1>
        <p className="mt-2 text-gray-600">콘텐츠 관리 및 SEO 설정</p>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <DuplicateCheck />
      </div>
    </div>
  );
}
