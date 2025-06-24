/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/products/ProductCard.tsx - FINAL FIX FOR RICH TEXT HANDLING
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  ExternalLink, 
  Download, 
  ShoppingCart, 
  Settings, 
  Headphones,
  Star,
  CheckCircle,
  AlertCircle,
  Package
} from "lucide-react";
import { Product } from "@/types/product";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  viewMode?: "grid" | "list";
  showServices?: boolean;
}

// COMPREHENSIVE function to extract plain text from rich text description
const extractPlainText = (description: any): string => {
  // Handle null/undefined
  if (!description) {
    return 'No description available';
  }

  // If it's already a string, return it
  if (typeof description === 'string') {
    return description;
  }
  
  // If it's a rich text object from Contentful
  if (description && typeof description === 'object' && description.nodeType === 'document' && description.content) {
    let text = '';
    
    const extractTextFromNodes = (nodes: any[]): void => {
      if (!Array.isArray(nodes)) return;
      
      nodes.forEach((node) => {
        // Handle text nodes
        if (node.nodeType === 'text' && node.value) {
          text += node.value + ' ';
        }
        
        // Handle paragraph and other block nodes
        if (node.content && Array.isArray(node.content)) {
          extractTextFromNodes(node.content);
        }
      });
    };
    
    if (Array.isArray(description.content)) {
      extractTextFromNodes(description.content);
    }
    
    return text.trim() || 'Rich text content available';
  }
  
  // Handle other object types
  if (typeof description === 'object') {
    // Try to stringify safely
    try {
      return JSON.stringify(description).substring(0, 100) + '...';
    } catch {
      return 'Content available';
    }
  }
  
  // Fallback for any other type
  return String(description || 'No description available');
};

const ProductCard = ({ 
  product, 
  viewMode = "grid",
  showServices = true 
}: ProductCardProps) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const hasImage = product.images && product.images.length > 0 && !imageError;
  const primaryImage = hasImage ? product.images[0] : null;

  // SAFE: Extract plain text from description
  const plainTextDescription = extractPlainText(product.description);
  const truncatedDescription = plainTextDescription.length > 120 
    ? plainTextDescription.substring(0, 120) + "..."
    : plainTextDescription;

  // SAFE: Ensure all text fields are strings
  const safeName = String(product.name || 'Unnamed Product');
  const safeBrand = String(product.brand || 'Unknown Brand');
  const safeCategory = String(product.category || 'Uncategorized');
  const safeModel = String(product.model || 'Unknown Model');
  const safeSlug = String(product.slug || '');

  if (viewMode === "list") {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all duration-300 group">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Image Section */}
          <div className="lg:w-48 lg:flex-shrink-0">
            <div className="aspect-square lg:aspect-video relative bg-gray-50 rounded-lg overflow-hidden">
              {hasImage ? (
                <Image
                  src={primaryImage!}
                  alt={safeName}
                  fill
                  className={`object-cover transition-all duration-300 group-hover:scale-105 ${
                    imageLoading ? 'opacity-0' : 'opacity-100'
                  }`}
                  onLoad={() => setImageLoading(false)}
                  onError={() => setImageError(true)}
                  sizes="(max-width: 1024px) 100vw, 192px"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Package className="h-12 w-12 text-gray-300" />
                </div>
              )}
              
              {/* Stock Status Badge */}
              <div className="absolute top-3 right-3">
                <Badge 
                  variant={product.inStock ? "default" : "secondary"}
                  className={product.inStock ? "bg-green-500" : "bg-orange-500"}
                >
                  {product.inStock ? "Available" : "Quote"}
                </Badge>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="mb-4">
                {/* Brand & Category */}
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline" className="text-xs">
                    {safeBrand}
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    {safeCategory}
                  </Badge>
                  {product.feature && (
                    <Badge className="text-xs bg-yellow-500">
                      <Star className="h-3 w-3 mr-1" />
                      Featured
                    </Badge>
                  )}
                </div>

                {/* Product Name */}
                <h3 className="font-semibold text-lg text-gray-900 group-hover:text-teal-600 transition-colors line-clamp-2">
                  <Link href={`/products/${safeSlug}`}>
                    {safeName}
                  </Link>
                </h3>

                {/* Model */}
                <p className="text-sm text-gray-600 mt-1">
                  Model: <span className="font-medium">{safeModel}</span>
                </p>
              </div>

              {/* Description - SAFE: Using extracted plain text */}
              <p className="text-sm text-gray-600 mb-4 line-clamp-3 flex-grow">
                {plainTextDescription}
              </p>

              {/* Services & Actions Row */}
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                {/* Services Available */}
                {showServices && (
                  <div className="flex items-center gap-4 text-xs text-gray-600">
                    <div className="flex items-center gap-1">
                      <Settings className="h-3 w-3 text-teal-600" />
                      <span>Parameter Setting</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Headphones className="h-3 w-3 text-blue-600" />
                      <span>Tech Support</span>
                    </div>
                  </div>
                )}

                {/* Price & Actions */}
                <div className="flex items-center gap-3">
                  {/* Price */}
                  <div className="text-right">
                    {product.showPrice && product.price ? (
                      <div className="text-lg font-bold text-gray-900">
                        {formatPrice(Number(product.price))}
                      </div>
                    ) : (
                      <div className="text-sm text-gray-600">
                        Contact for pricing
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2">
                    <Button size="sm" asChild>
                      <Link href={`/products/${safeSlug}`}>
                        View Details
                      </Link>
                    </Button>
                    <Button size="sm" variant="outline" asChild>
                      <Link href={`/quote?product=${safeSlug}`}>
                        Quote
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grid View (Default)
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 group">
      {/* Image Section */}
      <div className="aspect-square relative bg-gray-50 overflow-hidden">
        {hasImage ? (
          <Image
            src={primaryImage!}
            alt={safeName}
            fill
            className={`object-cover transition-all duration-300 group-hover:scale-105 ${
              imageLoading ? 'opacity-0' : 'opacity-100'
            }`}
            onLoad={() => setImageLoading(false)}
            onError={() => setImageError(true)}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Package className="h-16 w-16 text-gray-300" />
          </div>
        )}

        {/* Loading Skeleton */}
        {imageLoading && hasImage && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse" />
        )}

        {/* Overlay Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-start justify-between">
          {/* Featured Badge */}
          {product.feature && (
            <Badge className="bg-yellow-500 text-white">
              <Star className="h-3 w-3 mr-1" />
              Featured
            </Badge>
          )}
          
          {/* Stock Status */}
          <Badge 
            variant={product.inStock ? "default" : "secondary"}
            className={product.inStock ? "bg-green-500" : "bg-orange-500"}
          >
            {product.inStock ? (
              <CheckCircle className="h-3 w-3 mr-1" />
            ) : (
              <AlertCircle className="h-3 w-3 mr-1" />
            )}
            {product.inStock ? "Available" : "Quote"}
          </Badge>
        </div>

        {/* Quick Actions Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <div className="flex items-center gap-2">
            <Button size="sm" variant="secondary" asChild>
              <Link href={`/products/${safeSlug}`}>
                <ExternalLink className="h-4 w-4 mr-1" />
                View
              </Link>
            </Button>
            {product.datasheet && (
              <Button size="sm" variant="secondary" asChild>
                <a href={String(product.datasheet)} target="_blank" rel="noopener noreferrer">
                  <Download className="h-4 w-4" />
                </a>
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        {/* Brand & Category */}
        <div className="flex items-center gap-2 mb-3">
          <Badge variant="outline" className="text-xs">
            {safeBrand}
          </Badge>
          <Badge variant="secondary" className="text-xs">
            {safeCategory}
          </Badge>
        </div>

        {/* Product Name */}
        <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2 group-hover:text-teal-600 transition-colors">
          <Link href={`/products/${safeSlug}`}>
            {safeName}
          </Link>
        </h3>

        {/* Model */}
        <p className="text-sm text-gray-600 mb-3">
          Model: <span className="font-medium">{safeModel}</span>
        </p>

        {/* Description - SAFE: Using truncated plain text */}
        <p className="text-sm text-gray-600 mb-4 line-clamp-3">
          {truncatedDescription}
        </p>

        {/* Services Available */}
        {showServices && (
          <div className="mb-4 p-3 bg-gray-50 rounded-lg">
            <div className="text-xs font-semibold text-gray-900 mb-2">
              Services Available:
            </div>
            <div className="flex items-center gap-4 text-xs text-gray-700">
              <div className="flex items-center gap-1">
                <Settings className="h-3 w-3 text-teal-600" />
                <span>Parameter Setting</span>
              </div>
              <div className="flex items-center gap-1">
                <Headphones className="h-3 w-3 text-blue-600" />
                <span>Tech Support</span>
              </div>
            </div>
          </div>
        )}

        {/* Price */}
        <div className="mb-4">
          {product.showPrice && product.price ? (
            <div className="text-xl font-bold text-gray-900">
              {formatPrice(Number(product.price))}
            </div>
          ) : (
            <div className="text-sm text-gray-600">
              Contact for competitive pricing
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button size="sm" className="flex-1" asChild>
            <Link href={`/products/${safeSlug}`}>
              View Details
            </Link>
          </Button>
          <Button size="sm" variant="outline" asChild>
            <Link href={`/quote?product=${safeSlug}`}>
              <ShoppingCart className="h-4 w-4 mr-1" />
              Quote
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
//
export default ProductCard;