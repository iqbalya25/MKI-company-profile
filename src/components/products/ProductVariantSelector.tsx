"use client";

import { ProductFamily, ProductVariant } from "@/types/product";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface ProductVariantSelectorProps {
  family: ProductFamily;
  currentVariant: ProductVariant;
  onVariantChange: (variant: ProductVariant) => void;
}

export default function ProductVariantSelector({
  family,
  currentVariant, 
  onVariantChange
}: ProductVariantSelectorProps) {
  
  const handleVariantChange = (variant: ProductVariant) => {
    onVariantChange(variant);
    
    // Update URL without page reload
    const newUrl = `${window.location.pathname}?variant=${variant.sku}`;
    window.history.replaceState({}, '', newUrl);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold text-gray-900 mb-4">
          Available Configurations:
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
          {family.variants.map((variant) => (
            <button
              key={variant.sku}
              onClick={() => handleVariantChange(variant)}
              className={`p-4 border-2 rounded-lg transition-all text-left ${
                currentVariant.sku === variant.sku
                  ? 'border-teal-600 bg-teal-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-gray-900">
                  {variant.name}
                </span>
                <Badge className={variant.inStock ? "bg-green-500" : "bg-orange-500"}>
                  {variant.inStock ? "Available" : "Quote"}
                </Badge>
              </div>
              
              <div className="text-sm text-gray-600 mb-1">
                Model: {variant.model}
              </div>
              
              {variant.ioPoints && (
                <div className="text-sm text-gray-600 mb-2">
                  I/O Points: {variant.ioPoints}
                </div>
              )}
              
              {variant.price && (
                <div className="text-sm font-semibold text-teal-600">
                  Rp {variant.price.toLocaleString('id-ID')}
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Selected Variant Details */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h4 className="font-semibold text-gray-900 mb-3">
          Selected: {currentVariant.name}
        </h4>
        <p className="text-sm text-gray-600 mb-4">
          Model: {currentVariant.model}
        </p>
        
        {/* Key Specifications */}
        {currentVariant.specifications.length > 0 && (
          <div className="grid grid-cols-2 gap-4 text-sm mb-4">
            {currentVariant.specifications.slice(0, 6).map((spec, index) => (
              <div key={index} className="flex justify-between">
                <span className="text-gray-600">{spec.name}:</span>
                <span className="font-medium">{spec.value} {spec.unit}</span>
              </div>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3">
          <Button className="flex-1" asChild>
            <Link href={`/quote?product=${family.slug}&variant=${currentVariant.sku}`}>
              Request Quote - {currentVariant.model}
            </Link>
          </Button>
          
          {currentVariant.datasheet && (
            <Button variant="outline" asChild>
              <a href={currentVariant.datasheet} target="_blank" rel="noopener noreferrer">
                Datasheet
              </a>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}