import Link from 'next/link';
import { siteConfig } from '@/site.config';

export function Footer() {
  // 서버와 클라이언트 간 일관성을 위해 정적 값 사용
  const currentYear = 2025;

  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950" role="contentinfo">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-lg mb-4 text-foreground">법적 정보</h3>
            <ul className="space-y-3 text-base text-foreground/70" role="list">
              <li>
                <Link
                  href="/privacy"
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-1"
                  aria-label="개인정보 처리방침 페이지로 이동"
                >
                  개인정보 처리방침
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-1"
                  aria-label="이용약관 페이지로 이동"
                >
                  이용약관
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-1"
                  aria-label="소개 페이지로 이동"
                >
                  소개
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-1"
                  aria-label="문의 페이지로 이동"
                >
                  문의
                </Link>
              </li>
              <li>
                <Link
                  href="/sitemap-page"
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-1"
                  aria-label="사이트맵 페이지로 이동"
                >
                  사이트맵
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4 text-foreground">주요 기능</h3>
            <ul className="space-y-3 text-base text-foreground/70" role="list">
              <li>
                <Link
                  href="/calculator"
                  className="hover:text-green-600 dark:hover:text-green-400 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 rounded px-1"
                  aria-label="세금 계산기 페이지로 이동"
                >
                  💰 세금 계산기
                </Link>
              </li>
              <li>
                <Link
                  href="/quiz"
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-1"
                  aria-label="세금 방어력 테스트 페이지로 이동"
                >
                  📊 세금 방어력 테스트
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4 text-foreground">콘텐츠</h3>
            <ul className="space-y-3 text-base text-foreground/70" role="list">
              <li>
                <Link
                  href="/blog"
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-1"
                  aria-label="블로그 페이지로 이동"
                >
                  블로그
                </Link>
              </li>
              <li>
                <Link
                  href="/tools"
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-1"
                  aria-label="도구 페이지로 이동"
                >
                  도구
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4 text-foreground">Biz-Wallet</h3>
            <p className="text-sm text-foreground/70 leading-relaxed mb-4">
              프리랜서와 소상공인을 위한<br />
              무료 세금 계산기 서비스
            </p>
            <div className="space-y-2 text-xs text-foreground/60">
              <p>✅ 100% 무료</p>
              <p>🔒 개인정보 보호</p>
              <p>⚡ 즉시 결과 확인</p>
            </div>
          </div>
        </div>
        <div className="mt-10 pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="text-center text-sm text-foreground/60 mb-4">
            <p className="font-medium">© {currentYear} {siteConfig.name}. All rights reserved.</p>
            <p className="mt-2 text-xs text-foreground/50">
              본 사이트의 모든 콘텐츠는 저작권법의 보호를 받습니다. 무단 복제 및 배포를 금지합니다.
            </p>
            <p className="mt-2">
              <a href="/feed.xml" className="hover:text-blue-600 dark:hover:text-blue-400 hover:underline transition-colors">RSS 피드</a>
            </p>
          </div>
          <div className="text-xs text-foreground/50 text-center max-w-4xl mx-auto p-4 bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
            <p>
              <strong>⚠️ 면책 조항:</strong> 본 계산 결과는 모의 계산이며 법적 효력이 없습니다. 정확한 세액은 홈택스 또는 세무 전문가를 통해 확인하세요.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}


