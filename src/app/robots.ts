// src/app/robots.ts
import { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/lib/contants";

export default function robots(): MetadataRoute.Robots {
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
          "/*.json$",
          "/*?*", // Prevent crawling URLs with query parameters except category filters
        ],
      },
      {
        userAgent: "Googlebot",
        allow: [
          "/",
          "/products?category=*", // Allow category filtering
        ],
      },
    ],
    sitemap: `${SITE_CONFIG.url}/sitemap.xml`,
    host: SITE_CONFIG.url,
  };
}
