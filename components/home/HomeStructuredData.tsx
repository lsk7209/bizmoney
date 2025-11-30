import { siteConfig } from '@/site.config';

export function HomeStructuredData() {
  const baseUrl = siteConfig.url;

  // Organization 스키마
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    url: baseUrl,
    description: siteConfig.seo.defaultDescription,
    logo: {
      '@type': 'ImageObject',
      url: `${baseUrl}/logo.png`,
    },
    sameAs: [
      siteConfig.links.twitter,
      siteConfig.links.github,
    ].filter(Boolean),
  };

  // WebSite 스키마
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: baseUrl,
    description: siteConfig.seo.defaultDescription,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${baseUrl}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
    </>
  );
}

