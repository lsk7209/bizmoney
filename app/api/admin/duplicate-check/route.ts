import { NextRequest, NextResponse } from 'next/server';
import { checkAllDuplicateContent } from '@/lib/duplicate-check';
import { checkAdminAuth } from '@/lib/admin-auth';

export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  if (!checkAdminAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const result = checkAllDuplicateContent();
    return NextResponse.json(result);
  } catch (error) {
    console.error('Failed to check duplicate content:', error);
    return NextResponse.json(
      { error: '중복 컨텐츠 검사에 실패했습니다.' },
      { status: 500 }
    );
  }
}

