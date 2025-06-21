"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ProductFamily, ProductVariant } from "@/types/product";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ProductVariantSelector from "./ProductVariantSelector";
import VariantComparisonTable from "./VariantComparisonTable";
import RelatedProductFamilies from "./RelatedProductFamilies";
import Breadcrumb from "@/components/common/Breadcrumb";
import { generateProductFamilySchema } from "@/lib/schema";

interface ProductFamilyPageClientProps {
  family: ProductFamily;
  selectedVariant?: string;
  relatedFamilies: ProductFamily[];
}

export default function ProductFamilyPageClient({ 
  family, 
  selectedVariant, 
  relatedFamilies 
}: ProductFamilyPageClientProps) {
  const [currentVariant, setCurrentVariant] = useState<ProductVariant>(() => {
    if (selectedVariant) {
      return family.variants.find(v => v.sku === selectedVariant) || family.variants[0];
    }
    return family.variants.find(v => v.sku === family.defaultVariant) || family.variants[0];
  });

  // Update URL when variant changes
  useEffect(() => {
    if (selectedVariant && currentVariant.sku !== selectedVariant) {
      const newVariant = family.variants.find(v => v.sku === selectedVariant);
      if (newVariant) {
        setCurrentVariant(newVariant);
      }
    }
  }, [selectedVariant, family.variants, currentVariant.sku]);

  const breadcrumbItems = [
    { name: "Home", url: "/" },
    { name: "Products", url: "/products" },
    { name: family.category, url: `/products?category=${family.category.toLowerCase().replace(/\s+/g, '-')}` },
    { name: family.name, url: `/products/${family.slug}` },
  ];

  return (
    <>
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateProductFamilySchema(family)),
        }}
      />

      {/* Page Header */}
      <div className="bg-white py-6 mt-20 border-b">
        <div className="container mx-auto px-4">
          <Breadcrumb items={breadcrumbItems} />
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <div>
            <ProductFamilyImageGallery 
              family={family} 
              currentVariant={currentVariant}
            />
          </div>

          {/* Product Info */}
          <div>
            <ProductFamilyInfo 
              family={family}
              currentVariant={currentVariant}
              onVariantChange={setCurrentVariant}
            />
          </div>
        </div>

        {/* Variant Comparison Table */}
        <div className="mb-16">
          <VariantComparisonTable variants={family.variants} />
        </div>

        {/* Related Families */}
        {relatedFamilies.length > 0 && (
          <RelatedProductFamilies families={relatedFamilies} />
        )}
      </div>
    </>
  );
}