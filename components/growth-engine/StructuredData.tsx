import type { BlogPost } from '@/types/blog';
import { siteConfig } from '@/site.config';

interface StructuredDataProps {
  post: BlogPost;
  type?: 'Article' | 'BlogPosting';
}

/**
 * JSON-LD 구조화된 데이터 생성 (GenEO 최적화)
 */
export function StructuredData({ post, type = 'Article' }: StructuredDataProps) {
  const baseUrl = siteConfig.url;
  const postUrl = `${baseUrl}/blog/${post.slug}`;

  // Article 스키마
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': type,
    headline: post.h1 || post.title,
    description: post.metaDescription || post.description,
    image: post.ogImage ? `${baseUrl}${post.ogImage}` : `${baseUrl}/og-image.jpg`,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Person',
      name: post.author || siteConfig.author.name,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': postUrl,
    },
    keywords: post.keywords?.join(', ') || '',
  };

  // BreadcrumbList 스키마
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: '홈',
        item: baseUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: '블로그',
        item: `${baseUrl}/blog`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: postUrl,
      },
    ],
  };

  // FAQPage 스키마 (AEO 최적화)
  // FAQ는 콘텐츠에서 자동 추출하거나 frontmatter에 추가 가능
  const faqSchema = post.faq
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: post.faq.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      }
    : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema),
          }}
        />
      )}
    </>
  );
}

