import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminPassword } from '@/lib/admin-auth';

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();

    if (!password) {
      return NextResponse.json(
        { error: '비밀번호가 필요합니다' },
        { status: 400 }
      );
    }

    if (!verifyAdminPassword(password)) {
      return NextResponse.json(
        { error: '비밀번호가 올바르지 않습니다' },
        { status: 401 }
      );
    }

    // 세션 토큰 생성
    const sessionToken = crypto.randomUUID();
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24시간

    const response = NextResponse.json({ success: true });
    response.cookies.set('admin_session', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      expires: expiresAt,
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { error: '로그인 처리 중 오류가 발생했습니다' },
      { status: 500 }
    );
  }
}

