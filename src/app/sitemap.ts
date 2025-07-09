/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/sitemap.ts - TYPE-SAFE VERSION
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
  const currentDate = new Date().toISOString();

  try {
    // Fetch dynamic content with error handling
    const [products, blogPosts] = await Promise.all([
      getProducts({ limit: 1000 }).catch(() => []),
      getBlogPosts(200).catch(() => []),
    ]);

    // Static pages with proper priorities and change frequencies
    const staticPages: MetadataRoute.Sitemap = [
      {
        url: baseUrl,
        lastModified: currentDate,
        changeFrequency: "daily",
        priority: 1.0,
      },
      {
        url: `${baseUrl}/products`,
        lastModified: currentDate,
        changeFrequency: "daily",
        priority: 0.9,
      },
      {
        url: `${baseUrl}/services`,
        lastModified: currentDate,
        changeFrequency: "weekly",
        priority: 0.8,
      },
      {
        url: `${baseUrl}/about`,
        lastModified: currentDate,
        changeFrequency: "monthly",
        priority: 0.7,
      },
      {
        url: `${baseUrl}/contact`,
        lastModified: currentDate,
        changeFrequency: "monthly",
        priority: 0.8,
      },
      {
        url: `${baseUrl}/quote`,
        lastModified: currentDate,
        changeFrequency: "weekly",
        priority: 0.9,
      },
      {
        url: `${baseUrl}/blog`,
        lastModified: currentDate,
        changeFrequency: "daily",
        priority: 0.8,
      },
    ];

    // Product category pages - Higher priority for main categories
    const categoryPages: MetadataRoute.Sitemap = PRODUCT_CATEGORIES.map(
      (category) => ({
        url: `${baseUrl}/products?category=${category.slug}`,
        lastModified: currentDate,
        changeFrequency: "weekly" as const,
        priority: 0.85,
      })
    );

    // Individual product pages - Using actual Product type from project
    const productPages: MetadataRoute.Sitemap = products.map((product) => ({
      url: `${baseUrl}/products/${product.slug}`,
      lastModified: product.updateAt || currentDate, // Using updateAt from Product interface
      changeFrequency: "weekly" as const,
      priority: product.feature ? 0.85 : 0.8, // Higher priority for featured products
    }));

    // Blog post pages - Safe handling of Contentful entries
    const blogPages: MetadataRoute.Sitemap = blogPosts
      .filter((post: any) => post?.fields?.slug) // Only include posts with valid slugs
      .map((post: any) => ({
        url: `${baseUrl}/blog/${post.fields.slug}`,
        lastModified: post.sys?.updatedAt || currentDate,
        changeFrequency: "monthly" as const,
        priority: 0.6,
      }));

    // Location pages - Important for local SEO
    const locationPages: MetadataRoute.Sitemap = LOCATIONS.map((location) => ({
      url: `${baseUrl}/location/${location.slug}`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.7, // Higher priority for local SEO
    }));

    // Service detail pages - Full pages, not fragments
    const servicePages: MetadataRoute.Sitemap = SERVICES.map((service) => ({
      url: `${baseUrl}/services/${service.slug}`, // Changed from #anchor to full page
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    }));

    // Additional technical pages for SEO
    const technicalPages: MetadataRoute.Sitemap = [
      {
        url: `${baseUrl}/faq`,
        lastModified: currentDate,
        changeFrequency: "monthly" as const,
        priority: 0.6,
      },
      {
        url: `${baseUrl}/privacy`,
        lastModified: currentDate,
        changeFrequency: "yearly" as const,
        priority: 0.3,
      },
      {
        url: `${baseUrl}/terms`,
        lastModified: currentDate,
        changeFrequency: "yearly" as const,
        priority: 0.3,
      },
    ];

    // Brand-specific pages for better SEO
    const brandPages: MetadataRoute.Sitemap = [
      "mitsubishi",
      "schneider",
      "siemens",
      "omron",
      "fuji",
      "ls",
      "proface",
      "keyence",
    ].map((brand) => ({
      url: `${baseUrl}/products?brand=${brand}`,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 0.75,
    }));

    // Combine all pages
    const allPages = [
      ...staticPages,
      ...categoryPages,
      ...productPages,
      ...blogPages,
      ...locationPages,
      ...servicePages,
      ...technicalPages,
      ...brandPages,
    ];

    // Sort by priority (highest first) for better crawling
    return allPages.sort((a, b) => (b.priority || 0) - (a.priority || 0));
  } catch (error) {
    console.error("Error generating sitemap:", error);

    // Return minimal sitemap on error
    return [
      {
        url: baseUrl,
        lastModified: currentDate,
        changeFrequency: "daily",
        priority: 1.0,
      },
      {
        url: `${baseUrl}/products`,
        lastModified: currentDate,
        changeFrequency: "daily",
        priority: 0.9,
      },
      {
        url: `${baseUrl}/contact`,
        lastModified: currentDate,
        changeFrequency: "monthly",
        priority: 0.8,
      },
    ];
  }
}
