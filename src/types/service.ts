export interface Service {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  image: string;
  features?: string[];
  featured: boolean;
  seoTitle?: string;
  seoDescription?: string;
  createdAt: string;
  updatedAt: string;
}