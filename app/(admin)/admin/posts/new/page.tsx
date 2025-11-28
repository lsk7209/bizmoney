import { getAllPostsForAdmin } from '@/lib/admin';
import { AdminPostEditor } from '@/components/admin/AdminPostEditor';
import type { BlogPost } from '@/types/blog';

export default async function AdminPostNewPage() {
  // 모든 포스트 목록 (내부 링크용)
  const allPosts = getAllPostsForAdmin();

  // 새 포스트 템플릿
  const newPost: BlogPost = {
    slug: '',
    title: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    published: false,
    status: 'draft',
    content: '',
    index: true,
    sitemap: true,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">새 포스트 생성</h1>
        <p className="mt-2 text-gray-600">새로운 블로그 포스트를 생성합니다</p>
      </div>

      <AdminPostEditor post={newPost} allPosts={allPosts} isNew={true} />
    </div>
  );
}

