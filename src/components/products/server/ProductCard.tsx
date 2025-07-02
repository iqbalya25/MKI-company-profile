/* eslint-disable @typescript-eslint/no-unused-vars */
// src/components/products/server/ProductCard.tsx
// 🖥️ PURE SERVER COMPONENT - Zero JavaScript, Perfect SEO
// ✅ No useState/useEffect - No hydration errors
// ✅ Static image rendering - Fast loading
// ✅ Rich text handling - Server-safe
// ✅ Uses shared design system - Consistent styling

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
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";
import { extractPlainTextFromRichText } from "@/components/common/RichTextRenderer";
import { productStyles, getCardClasses, getStatusClasses } from "../shared/ProductStyles";
import type { ProductCardServerProps } from "../shared/ProductTypes";

export default function ProductCardServer({ 
  product, 
  viewMode = "grid",
  showServices = true,
  className = "",
  preloadImage = false,
  staticMode = true
}: ProductCardServerProps) {
  
  // 🔧 SAFE DATA EXTRACTION
  const hasImage = product.images && product.images.length > 0;
  const primaryImage = hasImage ? product.images[0] : null;

  // 🔧 SAFE TEXT PROCESSING - Server-side only
  const plainTextDescription = extractPlainTextFromRichText(product.description) || 'No description available';
  const truncatedDescription = plainTextDescription.length > 120 
    ? plainTextDescription.substring(0, 120) + "..."
    : plainTextDescription;

  // 🔧 SAFE STRING CONVERSION
  const safeName = String(product.name || 'Unnamed Product');
  const safeBrand = String(product.brand || 'Unknown Brand');
  const safeCategory = String(product.category || 'Uncategorized');
  const safeModel = String(product.model || 'Unknown Model');
  const safeSlug = String(product.slug || '');

  // 🎨 DYNAMIC STYLING
  const cardClasses = getCardClasses(viewMode, product.feature);
  const containerClasses = `${cardClasses} ${className}`;

  // 📱 LIST VIEW LAYOUT
  if (viewMode === "list") {
    return (
      <div className={containerClasses}>
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Image Section */}
          <div className="lg:w-48 lg:flex-shrink-0">
            <div className={productStyles.card.image.container}>
              {hasImage ? (
                <Image
                  src={primaryImage!}
                  alt={safeName}
                  fill
                  className={productStyles.card.image.img}
                  priority={preloadImage}
                  sizes="(max-width: 1024px) 100vw, 192px"
                />
              ) : (
                <div className={productStyles.card.image.placeholder}>
                  <Package className={productStyles.card.image.placeholderIcon} />
                </div>
              )}
              
              {/* Stock Status Badge */}
              <div className="absolute top-3 right-3">
                <Badge className={getStatusClasses(product.inStock ? 'inStock' : 'outStock')}>
                  {product.inStock ? "Available" : "Quote"}
                </Badge>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className={productStyles.card.content.containerList}>
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="mb-4">
                {/* Brand & Category */}
                <div className={productStyles.card.header.brandContainer}>
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
                <h3 className={productStyles.card.header.titleList}>
                  <Link href={`/products/${safeSlug}`}>
                    {safeName}
                  </Link>
                </h3>

                {/* Model */}
                <p className={productStyles.card.header.model}>
                  Model: <span className="font-medium">{safeModel}</span>
                </p>
              </div>

              {/* Description */}
              <p className={productStyles.card.description.textList}>
                {plainTextDescription}
              </p>

              {/* Services & Actions Row */}
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                {/* Services Available */}
                {showServices && (
                  <div className={productStyles.card.services.list}>
                    <div className={productStyles.card.services.item}>
                      <Settings className={`${productStyles.card.services.icon} text-teal-600`} />
                      <span>Parameter Setting</span>
                    </div>
                    <div className={productStyles.card.services.item}>
                      <Headphones className={`${productStyles.card.services.icon} text-blue-600`} />
                      <span>Tech Support</span>
                    </div>
                  </div>
                )}

                {/* Price & Actions */}
                <div className="flex items-center gap-3">
                  {/* Price */}
                  <div className="text-right">
                    {product.showPrice && product.price ? (
                      <div className={productStyles.card.price.amountList}>
                        {formatPrice(Number(product.price))}
                      </div>
                    ) : (
                      <div className={productStyles.card.price.contact}>
                        Contact for pricing
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className={productStyles.card.actions.containerList}>
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

  // 📱 GRID VIEW LAYOUT (Default)
  return (
    <div className={containerClasses}>
      {/* Image Section */}
      <div className={productStyles.card.image.container}>
        {hasImage ? (
          <Image
            src={primaryImage!}
            alt={safeName}
            fill
            className={productStyles.card.image.img}
            priority={preloadImage}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
        ) : (
          <div className={productStyles.card.image.placeholder}>
            <Package className={productStyles.card.image.placeholderIcon} />
          </div>
        )}

        {/* Overlay Badges */}
        <div className={productStyles.card.badges.container}>
          {/* Featured Badge */}
          {product.feature && (
            <Badge className={productStyles.card.badges.featured}>
              <Star className="h-3 w-3 mr-1" />
              Featured
            </Badge>
          )}
          
          {/* Stock Status */}
          <Badge className={getStatusClasses(product.inStock ? 'inStock' : 'outStock')}>
            {product.inStock ? (
              <CheckCircle className="h-3 w-3 mr-1" />
            ) : (
              <AlertCircle className="h-3 w-3 mr-1" />
            )}
            {product.inStock ? "Available" : "Quote"}
          </Badge>
        </div>

        {/* Quick Actions Overlay - CSS Only (No JavaScript) */}
        <div className={productStyles.card.overlay.container}>
          <div className={productStyles.card.overlay.actions}>
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
      <div className={productStyles.card.content.container}>
        {/* Brand & Category */}
        <div className={productStyles.card.header.brandContainer}>
          <Badge variant="outline" className="text-xs">
            {safeBrand}
          </Badge>
          <Badge variant="secondary" className="text-xs">
            {safeCategory}
          </Badge>
        </div>

        {/* Product Name */}
        <h3 className={productStyles.card.header.title}>
          <Link href={`/products/${safeSlug}`}>
            {safeName}
          </Link>
        </h3>

        {/* Model */}
        <p className={productStyles.card.header.model}>
          Model: <span className="font-medium">{safeModel}</span>
        </p>

        {/* Description */}
        <p className={productStyles.card.description.text}>
          {truncatedDescription}
        </p>

        {/* Services Available */}
        {showServices && (
          <div className={productStyles.card.services.container}>
            <div className={productStyles.card.services.title}>
              Services Available:
            </div>
            <div className={productStyles.card.services.list}>
              <div className={productStyles.card.services.item}>
                <Settings className={`${productStyles.card.services.icon} text-teal-600`} />
                <span>Parameter Setting</span>
              </div>
              <div className={productStyles.card.services.item}>
                <Headphones className={`${productStyles.card.services.icon} text-blue-600`} />
                <span>Tech Support</span>
              </div>
            </div>
          </div>
        )}

        {/* Price */}
        <div className={productStyles.card.price.container}>
          {product.showPrice && product.price ? (
            <div className={productStyles.card.price.amount}>
              {formatPrice(Number(product.price))}
            </div>
          ) : (
            <div className={productStyles.card.price.contact}>
              Contact for competitive pricing
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className={productStyles.card.actions.container}>
          <Button size="sm" className={productStyles.card.actions.primary} asChild>
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
}