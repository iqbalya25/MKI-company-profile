/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/sitemap.ts
import { MetadataRoute } from "next";
import { getProducts, getBlogPosts } from "@/lib/contentful";
import {
  SITE_CONFIG,
  PRODUCT_CATEGORIES,
  LOCATIONS,
  SERVICES,
} from "@/lib/contants";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE_CONFIG.url;

  // Fetch dynamic content
  const [products, blogPosts] = await Promise.all([
    getProducts({ limit: 500 }),
    getBlogPosts(100),
  ]);

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/quote`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ];

  // Product category pages
  const categoryPages: MetadataRoute.Sitemap = PRODUCT_CATEGORIES.map(
    (category) => ({
      url: `${baseUrl}/products?category=${category.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    })
  );

  // Individual product pages
  const productPages: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${baseUrl}/products/${product.slug}`,
    lastModified: new Date(product.updateAt),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  // Blog post pages
  const blogPages: MetadataRoute.Sitemap = blogPosts.map((post: any) => ({
    url: `${baseUrl}/blog/${post.fields.slug}`,
    lastModified: new Date(post.sys.updatedAt),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  // Location pages
  const locationPages: MetadataRoute.Sitemap = LOCATIONS.map((location) => ({
    url: `${baseUrl}/location/${location.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  // Service pages
  const servicePages: MetadataRoute.Sitemap = SERVICES.map((service) => ({
    url: `${baseUrl}/services#${service.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    ...staticPages,
    ...categoryPages,
    ...productPages,
    ...blogPages,
    ...locationPages,
    ...servicePages,
  ];
}
