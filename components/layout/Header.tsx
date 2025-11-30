import Link from 'next/link';
import { siteConfig } from '@/site.config';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 bg-white/95 dark:bg-gray-950/95 backdrop-blur-md supports-[backdrop-filter]:bg-white/80 dark:supports-[backdrop-filter]:bg-gray-950/80 shadow-sm">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        본문으로 건너뛰기
      </a>
      <div className="container mx-auto flex h-16 md:h-18 items-center justify-between px-4">
        <Link
          href="/"
          className="flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg px-2 py-1 transition-all hover:opacity-80"
          aria-label={`${siteConfig.name} 홈으로 이동`}
        >
          <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            💼 {siteConfig.name}
          </span>
        </Link>
        <nav
          className="flex items-center space-x-2 md:space-x-4"
          aria-label="주요 네비게이션"
        >
          <Link
            href="/calculator"
            className="text-base font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 bg-blue-50 dark:bg-blue-950 px-4 py-2 rounded-lg transition-all hover:bg-blue-100 dark:hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 hidden sm:block"
            aria-label="세금 계산기 페이지로 이동"
          >
            💰 계산기
          </Link>
          <Link
            href="/quiz"
            className="text-base font-semibold text-foreground/80 hover:text-foreground px-4 py-2 rounded-lg transition-all hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-label="세금 방어력 테스트 페이지로 이동"
          >
            📊 테스트
          </Link>
          <Link
            href="/blog"
            className="text-base font-medium text-foreground/70 hover:text-foreground px-4 py-2 rounded-lg transition-all hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 hidden sm:block"
            aria-label="블로그 페이지로 이동"
          >
            블로그
          </Link>
          <Link
            href="/tools"
            className="text-base font-medium text-foreground/70 hover:text-foreground px-4 py-2 rounded-lg transition-all hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 hidden sm:block"
            aria-label="도구 페이지로 이동"
          >
            도구
          </Link>
        </nav>
      </div>
    </header>
  );
}


