/* eslint-disable @typescript-eslint/no-explicit-any */
// src/types/blog.ts
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: any; // Rich text content from Contentful
  featuredImage: string | null;
  author: string;
  publishDate: string;
  tags: string[];
  seoTitle?: string;
  seoDescription?: string;
  createdAt: string;
  updatedAt: string;
}

export interface BlogCategory {
  name: string;
  slug: string;
  description?: string;
  postCount: number;
}