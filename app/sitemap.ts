import { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/blog';
import { getAllPostsForAdmin } from '@/lib/admin';
import { getAllPublishedTools } from '@/lib/tools';
import { siteConfig } from '@/site.config';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;
  const allPosts = getAllPostsForAdmin();
  // sitemap에 포함할 포스트만 필터링 (published && sitemap !== false)
  const posts = allPosts.filter((post) => post.published && post.sitemap !== false);
  const tools = getAllPublishedTools();

  const postUrls: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const blogPageUrls: MetadataRoute.Sitemap = [];
  const totalBlogPages = Math.ceil(posts.length / siteConfig.blog.postsPerPage);
  // 첫 페이지만 sitemap에 포함 (중복 콘텐츠 방지)
  if (totalBlogPages > 0) {
    blogPageUrls.push({
      url: `${baseUrl}/blog/page/1`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.7,
    });
  }

  const toolUrls: MetadataRoute.Sitemap = tools.map((tool) => ({
    url: `${baseUrl}/tools/${tool.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const toolPageUrls: MetadataRoute.Sitemap = [];
  const totalToolPages = Math.ceil(tools.length / siteConfig.tools.postsPerPage);
  // 첫 페이지만 sitemap에 포함 (중복 콘텐츠 방지)
  if (totalToolPages > 0) {
    toolPageUrls.push({
      url: `${baseUrl}/tools/page/1`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    });
  }

  const staticUrls: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/calculator`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
        {
          url: `${baseUrl}/quiz`,
          lastModified: new Date(),
          changeFrequency: 'weekly',
          priority: 0.9,
        },
        {
          url: `${baseUrl}/vat-calculator`,
          lastModified: new Date(),
          changeFrequency: 'weekly',
          priority: 0.9,
        },
        {
          url: `${baseUrl}/year-end-tax`,
          lastModified: new Date(),
          changeFrequency: 'weekly',
          priority: 0.9,
        },
        {
          url: `${baseUrl}/withholding-tax`,
          lastModified: new Date(),
          changeFrequency: 'weekly',
          priority: 0.9,
        },
        {
          url: `${baseUrl}/government-support`,
          lastModified: new Date(),
          changeFrequency: 'weekly',
          priority: 0.9,
        },
        {
          url: `${baseUrl}/tax-checklist`,
          lastModified: new Date(),
          changeFrequency: 'weekly',
          priority: 0.9,
        },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/tools`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
        {
          url: `${baseUrl}/terms`,
          lastModified: new Date(),
          changeFrequency: 'yearly',
          priority: 0.3,
        },
        {
          url: `${baseUrl}/sitemap-page`,
          lastModified: new Date(),
          changeFrequency: 'weekly',
          priority: 0.5,
        },
      ];

  return [...staticUrls, ...postUrls, ...blogPageUrls, ...toolUrls, ...toolPageUrls];
}


