import { Inter } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";
import { SITE_CONFIG } from "@/lib/contants";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: SITE_CONFIG.name,
    template: `%s | ${SITE_CONFIG.name}`,
  },

  description: SITE_CONFIG.description,
  keywords: [
    "PLC Indonesia",
    "HMI Proface",
    "VFD Indonesia",
    "Safety Relay Pilz",
    "Power Meter Schneider",
    "Industrial Automation Jakarta",
    "Distributor PLC Murah",
    "Supplier Automation Indonesia",
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
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
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
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">{children}</div>
      </body>
    </html>
  );
}
