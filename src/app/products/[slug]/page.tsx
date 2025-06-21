import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductFamilyBySlug, getProductFamilies } from "@/lib/contentful";
import ProductFamilyPageClient from "@/components/products/ProductFamilyPageClient";

interface ProductFamilyPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ variant?: string }>;
}

export async function generateMetadata({ params }: ProductFamilyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const family = await getProductFamilyBySlug(slug);
  
  if (!family) {
    return {
      title: "Product Family Not Found | Mederi Karya Indonesia",
      description: "The requested product family could not be found.",
    };
  }

  const title = family.seoTitle || `${family.name} + Technical Support | Mederi Karya Indonesia`;
  const description = family.seoDescription || 
    `${family.name} complete series with ${family.variants.length} variants. ${family.description.substring(0, 120)}... Technical support included.`;

  return {
    title,
    description,
    keywords: [
      family.name,
      family.brand,
      family.series,
      family.category,
      ...family.focusKeywords || [],
      "technical support",
      "parameter setting",
      "automation parts indonesia",
    ],
    openGraph: {
      title,
      description,
      type: "website",
      url: `/products/${family.slug}`,
      images: family.heroImage ? [{ url: family.heroImage, width: 800, height: 600, alt: family.name }] : [],
    },
  };
}

export default async function ProductFamilyPage({ params, searchParams }: ProductFamilyPageProps) {
  const { slug } = await params;
  const { variant } = await searchParams;
  
  const family = await getProductFamilyBySlug(slug);
  
  if (!family) {
    notFound();
  }

  // Get related families (same category)
  const relatedFamilies = await getProductFamilies({ 
    category: family.category, 
    limit: 4 
  });
  const filteredRelated = relatedFamilies.filter(f => f.id !== family.id);

  return (
    <ProductFamilyPageClient 
      family={family}
      selectedVariant={variant}
      relatedFamilies={filteredRelated}
    />
  );
}
