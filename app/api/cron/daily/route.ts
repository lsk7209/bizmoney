import { NextRequest, NextResponse } from 'next/server';
import { siteConfig } from '@/site.config';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  // Vercel Cron은 자동으로 Authorization 헤더를 추가합니다
  // Vercel Cron Secret은 환경 변수에서 확인 가능하지만, Vercel이 자동으로 처리합니다
  const authHeader = request.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;
  
  // Vercel Cron의 경우 자동 인증 (user-agent에 'vercel-cron' 포함)
  // 또는 Authorization 헤더에 'Bearer' 토큰이 있는 경우
  const isVercelCron = 
    request.headers.get('user-agent')?.includes('vercel-cron') ||
    request.headers.get('x-vercel-cron') === '1';
  
  // Vercel Cron이 아닌 경우에만 Bearer 토큰 검증
  if (!isVercelCron) {
    if (!cronSecret) {
      return NextResponse.json(
        { error: 'Cron secret not configured' },
        { status: 500 }
      );
    }
    
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


