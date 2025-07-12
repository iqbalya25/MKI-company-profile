import { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/lib/contants";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Main rule for all crawlers
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
          // Block only problematic query params that create duplicate content
          "/*?search=*", // Search results pages
          "/*?sort=*", // Sorting variations
          "/*?view=*", // View mode variations (grid/list)
          "/*?utm_*", // Marketing tracking parameters
        ],
      },

      // Specific rules for Google (most important)
      {
        userAgent: "Googlebot",
        allow: [
          "/",
          "/products*", // All product pages, categories, pagination, slugs
          "/blog*", // All blog pages and posts
          "/services*", // All service pages and slugs
          "/about",
          "/contact",
          "/quote",
          "/location/*", // Location-based pages
        ],
        disallow: [
          "/api/",
          "/admin/",
          "/_next/",
          "/static/",
          "/private/",
          "/*?search=*", // Avoid indexing search results
          "/*?sort=*", // Avoid duplicate sorted content
          "/*?utm_*", // Block tracking parameters
        ],
      },

      // Specific rules for Bing
      {
        userAgent: "Bingbot",
        allow: [
          "/",
          "/products*",
          "/blog*",
          "/services*",
          "/about",
          "/contact",
          "/quote",
          "/location/*",
        ],
        disallow: ["/api/", "/admin/", "/_next/", "/static/", "/private/"],
        crawlDelay: 1,
      },

      // Block AI training crawlers (protect your content)
      {
        userAgent: [
          "CCBot",
          "ChatGPT-User",
          "GPTBot",
          "Google-Extended",
          "anthropic-ai",
          "Claude-Web",
        ],
        disallow: "/",
      },

      // Block aggressive/problematic crawlers
      {
        userAgent: ["SemrushBot", "AhrefsBot", "MJ12bot", "DotBot"],
        disallow: "/",
      },
    ],

    // Sitemap and host declaration
    sitemap: `${SITE_CONFIG.url}/sitemap.xml`,
    host: SITE_CONFIG.url,
  };
}
