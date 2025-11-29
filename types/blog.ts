export type PostStatus = 'draft' | 'review' | 'published';

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  author?: string;
  tags?: string[];
  category?: string;
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  canonicalUrl?: string;
  published: boolean;
  status?: PostStatus;
  index?: boolean;
  sitemap?: boolean;
  h1?: string;
  cta?: {
    text: string;
    url: string;
  };
  internalLinks?: string[];
  externalLinks?: Array<{
    url: string;
    description: string;
  }>;
  content: string;
  ogImage?: string;
  faq?: Array<{
    question: string;
    answer: string;
  }>;
}

export interface BlogPostFrontmatter {
  title: string;
  description: string;
  date: string;
  author?: string;
  tags?: string[];
  category?: string;
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  canonicalUrl?: string;
  published?: boolean;
  status?: PostStatus;
  index?: boolean;
  sitemap?: boolean;
  h1?: string;
  cta?: {
    text: string;
    url: string;
  };
  internalLinks?: string[];
  externalLinks?: Array<{
    url: string;
    description: string;
  }>;
  ogImage?: string;
  faq?: Array<{
    question: string;
    answer: string;
  }>;
}


