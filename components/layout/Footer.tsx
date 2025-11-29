import Link from 'next/link';
import { siteConfig } from '@/site.config';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background" role="contentinfo">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold mb-4">법적 정보</h3>
            <ul className="space-y-2 text-sm text-foreground/80" role="list">
              <li>
                <Link
                  href="/privacy"
                  className="hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-1"
                  aria-label="개인정보 처리방침 페이지로 이동"
                >
                  개인정보 처리방침
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-1"
                  aria-label="이용약관 페이지로 이동"
                >
                  이용약관
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-1"
                  aria-label="소개 페이지로 이동"
                >
                  소개
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-1"
                  aria-label="문의 페이지로 이동"
                >
                  문의
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">콘텐츠</h3>
            <ul className="space-y-2 text-sm text-foreground/80" role="list">
              <li>
                <Link
                  href="/blog"
                  className="hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-1"
                  aria-label="블로그 페이지로 이동"
                >
                  블로그
                </Link>
              </li>
              <li>
                <Link
                  href="/tools"
                  className="hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-1"
                  aria-label="도구 페이지로 이동"
                >
                  도구
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-sm text-foreground/60">
          <p>© {currentYear} {siteConfig.name}. All rights reserved.</p>
          <p className="mt-2">
            <a href="/feed.xml" className="hover:underline">RSS 피드</a>
          </p>
        </div>
      </div>
    </footer>
  );
}


