// src/components/common/GoogleAnalytics.tsx
'use client';

import Script from 'next/script';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

interface GoogleAnalyticsProps {
  measurementId: string;
}

export default function GoogleAnalytics({ measurementId }: GoogleAnalyticsProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Track page views on route change
  useEffect(() => {
    if (pathname && window.gtag) {
      const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
      
      window.gtag('config', measurementId, {
        page_path: url,
      });
    }
  }, [pathname, searchParams, measurementId]);

  // Only load in production
  if (process.env.NODE_ENV !== 'production') {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${measurementId}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  );
}

// Helper functions for tracking events
export const GAEvent = {
  // Track form submissions
  trackFormSubmit: (formName: string, formData?: Record<string, unknown>) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'form_submit', {
          event_category: 'engagement',
          event_label: formName,
          ...formData,
          value: 0,
          non_interaction: false
      });
    }
  },

  // Track quote requests
  trackQuoteRequest: (productName: string, quantity: number) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'request_quote', {
          event_category: 'ecommerce',
          event_label: productName,
          value: quantity,
          non_interaction: false
      });
    }
  },

  // Track product views
  trackProductView: (product: {
    id: string;
    name: string;
    category: string;
    brand: string;
    price?: number;
  }) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'view_item', {
        currency: 'IDR',
        value: product.price || 0,
        items: [
          {
            item_id: product.id,
            item_name: product.name,
            item_category: product.category,
            item_brand: product.brand,
            price: product.price || 0,
            currency: 'IDR',
          },
        ],
      });
    }
  },

  // Track search
  trackSearch: (searchTerm: string, resultsCount: number) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'search', {
        search_term: searchTerm,
        results_count: resultsCount,
      });
    }
  },

  // Track contact interactions
  trackContact: (method: 'phone' | 'email' | 'whatsapp') => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'contact', {
          event_category: 'engagement',
          event_label: method,
          value: 0,
          non_interaction: false
      });
    }
  },

  // Track file downloads
  trackDownload: (fileName: string, fileType: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'file_download', {
        event_category: 'engagement',
        event_label: fileName,
        file_type: fileType,
      });
    }
  },
};

// Usage example in your layout.tsx:
// Add this to your RootLayout component:
// <GoogleAnalytics measurementId={process.env.NEXT_PUBLIC_GA_ID || ''} />