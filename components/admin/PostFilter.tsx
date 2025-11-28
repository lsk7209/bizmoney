'use client';

import { useRouter, useSearchParams } from 'next/navigation';

export function PostFilter({ currentStatus }: { currentStatus: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const status = e.target.value;
    const params = new URLSearchParams(searchParams.toString());
    
    if (status === 'all') {
      params.delete('status');
    } else {
      params.set('status', status);
    }

    router.push(`/admin/posts?${params.toString()}`);
  };

  return (
    <select
      value={currentStatus}
      onChange={handleChange}
      className="px-4 py-2 border border-gray-300 rounded-md text-sm"
    >
      <option value="all">전체</option>
      <option value="published">발행됨</option>
      <option value="review">검수 대기</option>
      <option value="draft">초안</option>
    </select>
  );
}

