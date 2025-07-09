/* eslint-disable @typescript-eslint/no-unused-vars */
// src/app/robots.ts - OPTIMIZED FOR SEO & PERFORMANCE
import { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/lib/contants";

export default function robots(): MetadataRoute.Robots {
  const isProduction = process.env.NODE_ENV === "production";
  
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/admin/",
          "/_next/",
          "/static/",
          "/private/",
          "/temp/",
          "/draft/",
          "/*.json$",
          "/*.xml$",
          "/*.txt$",
          // Allow specific query parameters for SEO
          "/*?*",
        ],
        // Add crawl delay to prevent server overload
        crawlDelay: 1,
      },
      {
        userAgent: "Googlebot",
        allow: [
          "/",
          "/products",
          "/products/",
          "/products?category=*",
          "/products/*/", // Allow product detail pages
          "/blog",
          "/blog/",
          "/blog/*/", // Allow blog post pages
          "/services",
          "/about",
          "/contact",
          "/quote",
          "/location/*",
        ],
        disallow: [
          "/api/",
          "/admin/",
          "/_next/",
          "/static/",
          "/private/",
          "/*?sort=*", // Prevent duplicate sorting URLs
          "/*?page=*", // Prevent pagination indexing
          "/*?search=*", // Prevent search result indexing
        ],
      },
      {
        userAgent: "Bingbot",
        allow: [
          "/",
          "/products",
          "/products/",
          "/products?category=*",
          "/products/*/",
          "/blog",
          "/blog/",
          "/blog/*/",
          "/services",
          "/about",
          "/contact",
          "/quote",
          "/location/*",
        ],
        disallow: [
          "/api/",
          "/admin/",
          "/_next/",
          "/static/",
          "/private/",
        ],
        crawlDelay: 2,
      },
      // Block aggressive crawlers
      {
        userAgent: [
          "CCBot",
          "ChatGPT-User",
          "GPTBot",
          "Google-Extended",
          "FacebookBot",
          "facebookexternalhit",
        ],
        disallow: "/",
      },
    ],
    sitemap: `${SITE_CONFIG.url}/sitemap.xml`,
    host: SITE_CONFIG.url,
  };
}