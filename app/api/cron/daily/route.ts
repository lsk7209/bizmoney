import { NextRequest, NextResponse } from 'next/server';
import { siteConfig } from '@/site.config';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  // Vercel Cron은 자동으로 Authorization 헤더를 추가합니다
  // 환경 변수에서 Vercel Cron Secret 확인
  const authHeader = request.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;
  
  // Vercel Cron의 경우 자동 인증되지만, 수동 호출을 위한 검증도 포함
  const isVercelCron = request.headers.get('user-agent')?.includes('vercel-cron');
  
  if (!isVercelCron && cronSecret) {
    // 수동 호출인 경우에만 Bearer 토큰 검증
    if (authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  try {
    const results = [];

    if (siteConfig.naver.pingEnabled && siteConfig.url) {
      try {
        const pingUrl = `https://searchadvisor.naver.com/ping?sitemap=${encodeURIComponent(`${siteConfig.url}/sitemap.xml`)}`;
        const pingResponse = await fetch(pingUrl);
        results.push({
          service: 'naver',
          status: pingResponse.ok ? 'success' : 'failed',
        });
      } catch (error) {
        results.push({
          service: 'naver',
          status: 'error',
          error: error instanceof Error ? error.message : 'Unknown error',
        });
      }
    }

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      results,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}


