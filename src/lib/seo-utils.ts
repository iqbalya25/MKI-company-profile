// src/lib/seo-utils.ts - SEO utilities for 404 pages
import { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/contants";

export interface NotFoundMetadataProps {
  title: string;
  description: string;
  canonical?: string;
  noindex?: boolean;
}

export function generateNotFoundMetadata({
  title,
  description,
  canonical,
  noindex = true,
}: NotFoundMetadataProps): Metadata {
  return {
    title: `${title} | ${SITE_CONFIG.name}`,
    description,
    robots: noindex ? "noindex, nofollow" : "index, follow",
    alternates: canonical ? { canonical } : undefined,
    openGraph: {
      title: `${title} | ${SITE_CONFIG.name}`,
      description,
      type: "website",
      siteName: SITE_CONFIG.name,
      images: [
        {
          url: `${SITE_CONFIG.url}/api/og?title=${encodeURIComponent(title)}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE_CONFIG.name}`,
      description,
    },
  };
}

// Specific metadata generators for each 404 type
export const NOT_FOUND_METADATA = {
  global: generateNotFoundMetadata({
    title: "Page Not Found",
    description: "The page you're looking for doesn't exist. Explore our automation products, engineering services, and technical resources.",
  }),
  
  product: generateNotFoundMetadata({
    title: "Product Not Found",
    description: "The automation product you're looking for could not be found. Browse our complete catalog of PLCs, HMIs, and industrial components.",
  }),
  
  service: generateNotFoundMetadata({
    title: "Service Not Found",
    description: "The automation service you're looking for could not be found. Explore our engineering services and technical support options.",
  }),
  
  blog: generateNotFoundMetadata({
    title: "Article Not Found",
    description: "The technical article you're looking for could not be found. Browse our engineering blog for automation tutorials and insights.",
  }),
};

// Structured data for 404 pages
export function generate404StructuredData(pageType: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `${pageType} Not Found`,
    description: `The requested ${pageType.toLowerCase()} could not be found.`,
    url: `${SITE_CONFIG.url}/404`,
    mainEntity: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+62-21-123-4567",
        contactType: "customer service",
        availableLanguage: ["Indonesian", "English"],
      },
    },
  };
}