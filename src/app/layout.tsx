// File: src/app/layout.tsx - SEO OPTIMIZED
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";

import MainLayout from "@/components/layout/MainLayout";
import { SITE_CONFIG } from "@/lib/contants";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: SITE_CONFIG.name,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  keywords: [
    // Primary Indonesian keywords
    "supplier automation parts indonesia",
    "jual inverter jakarta",
    "technical support plc",
    "parameter setting inverter",
    "supplier plc mitsubishi indonesia",
    "hmi proface harga kompetitif",
    "troubleshooting automation jakarta",
    "engineering consultation plc",
    "safety relay pilz indonesia",
    "commissioning inverter service",
    // Technical keywords
    "schneider inverter atv320",
    "mitsubishi plc fx5u",
    "proface hmi gp4000",
    "pilz safety relay pnoz",
    // Location-based
    "automation parts jakarta",
    "technical support surabaya",
    "parameter setting bandung",
    "engineering services tangerang",
  ],
  authors: [{ name: "Mederi Karya Indonesia" }],
  creator: "Mederi Karya Indonesia",
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: SITE_CONFIG.url,
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    siteName: SITE_CONFIG.name,
    images: [
      {
        url: `${SITE_CONFIG.url}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Mederi Karya Indonesia - Supplier Automation Parts + Technical Support",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    images: [`${SITE_CONFIG.url}/og-image.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code", // Replace with actual verification code
  },
  alternates: {
    canonical: SITE_CONFIG.url,
  },
  // Additional SEO meta tags for Indonesian market
  other: {
    "geo.region": "ID",
    "geo.placename": "Indonesia",
    "geo.position": "-6.2088;106.8456", // Jakarta coordinates
    ICBM: "-6.2088, 106.8456",
    language: "id",
    target: "all",
    audience: "all",
    distribution: "global",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="scroll-smooth">
      <head>
        {/* Additional SEO and Performance meta tags */}
        <meta name="theme-color" content="#4338ca" />
        <meta name="msapplication-TileColor" content="#4338ca" />
        <meta name="format-detection" content="telephone=no" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* Structured Data for Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: SITE_CONFIG.company.name,
              url: SITE_CONFIG.url,
              logo: `${SITE_CONFIG.url}/logo.png`,
              description: SITE_CONFIG.description,
              contactPoint: {
                "@type": "ContactPoint",
                telephone: SITE_CONFIG.company.phone,
                contactType: "Customer Service",
                areaServed: "ID",
                availableLanguage: ["Indonesian", "English"],
              },
              address: {
                "@type": "PostalAddress",
                addressCountry: "ID",
                addressRegion: "West Java",
                addressLocality: "Bekasi",
              },
              sameAs: [
                // Add social media URLs when available
                // "https://www.linkedin.com/company/mederi-karya-indonesia",
                // "https://www.facebook.com/mederikaryaindonesia"
              ],
            }),
          }}
        />
      </head>
      <body className={inter.className}>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
