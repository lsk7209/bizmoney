const createMDX = require('@next/mdx');
const remarkGfm = require('remark-gfm');

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [],
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30일 캐시
  },
  // Vercel 최적화 설정
  // output: 'standalone' - Vercel에서는 자동으로 처리되므로 제거
  poweredByHeader: false,
  compress: true,
  // 번들 최적화
  experimental: {
    optimizePackageImports: [
      '@mdx-js/react',
      'date-fns',
      'gray-matter',
      '@google/generative-ai',
    ],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          // 중복 콘텐츠 방지: Vary 헤더 추가
          {
            key: 'Vary',
            value: 'Accept-Encoding, User-Agent',
          },
          // 캐싱 헤더 추가
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, stale-while-revalidate=86400',
          },
        ],
      },
      // 정적 자산 캐싱
      {
        source: '/:path*\\.(jpg|jpeg|png|gif|ico|svg|webp|avif)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

module.exports = withMDX(nextConfig);


