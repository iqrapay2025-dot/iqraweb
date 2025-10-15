export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  image?: string;
  author: {
    name: string;
    role: string;
  };
  publishedAt: string;
  readTime: string;
  status: 'draft' | 'published';
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
}
