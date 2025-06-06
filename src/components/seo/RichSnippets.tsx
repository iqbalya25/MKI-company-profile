/* eslint-disable @typescript-eslint/no-explicit-any */
import { SITE_CONFIG } from '@/lib/contants';

interface RichSnippetsProps {
  type: 'product' | 'article' | 'organization' | 'faq';
  data: any;
}

export default function RichSnippets({ type, data }: RichSnippetsProps) {
  const generateSchema = () => {
    switch (type) {
      case 'product':
        return {
          "@context": "https://schema.org",
          "@type": "Product",
          name: data.name,
          description: data.description,
          sku: data.model,
          brand: {
            "@type": "Brand",
            name: data.brand
          },
          offers: {
            "@type": "Offer",
            url: `${SITE_CONFIG.url}/products/${data.slug}`,
            priceCurrency: "IDR",
            price: data.price || "Contact for price",
            availability: data.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
            seller: {
              "@type": "Organization",
              name: SITE_CONFIG.company.name
            }
          },
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.8",
            reviewCount: "25"
          },
          review: [
            {
              "@type": "Review",
              reviewRating: {
                "@type": "Rating",
                ratingValue: "5"
              },
              author: {
                "@type": "Person",
                name: "Engineering Manager"
              },
              reviewBody: "Excellent technical support and quality products. Parameter setting service was very helpful."
            }
          ]
        };

      case 'organization':
        return {
          "@context": "https://schema.org",
          "@type": "Organization",
          name: SITE_CONFIG.company.name,
          url: SITE_CONFIG.url,
          logo: `${SITE_CONFIG.url}/logo.png`,
          description: SITE_CONFIG.description,
          address: {
            "@type": "PostalAddress",
            addressLocality: "Bekasi",
            addressRegion: "West Java",
            addressCountry: "ID"
          },
          contactPoint: {
            "@type": "ContactPoint",
            telephone: SITE_CONFIG.company.phone,
            contactType: "customer service",
            areaServed: "ID",
            availableLanguage: ["id", "en"]
          },
          sameAs: [
            // Add social media URLs when available
          ]
        };

      default:
        return null;
    }
  };

  const schema = generateSchema();
  if (!schema) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema)
      }}
    />
  );
}