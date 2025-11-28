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
  for (let i = 1; i <= totalBlogPages; i++) {
    blogPageUrls.push({
      url: `${baseUrl}/blog/page/${i}`,
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
  for (let i = 1; i <= totalToolPages; i++) {
    toolPageUrls.push({
      url: `${baseUrl}/tools/page/${i}`,
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
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  return [...staticUrls, ...postUrls, ...blogPageUrls, ...toolUrls, ...toolPageUrls];
}


