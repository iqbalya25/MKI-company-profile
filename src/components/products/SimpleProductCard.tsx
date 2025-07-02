// src/components/products/SimpleProductCard.tsx - PURE SERVER COMPONENT
import Link from "next/link";
import Image from "next/image";
import { 
  ShoppingCart, 
  Settings, 
  Headphones,
  Star,
  CheckCircle,
  AlertCircle,
  Package,
  ExternalLink
} from "lucide-react";
import { Product } from "@/types/product";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";

interface SimpleProductCardProps {
  product: Product;
}

const SimpleProductCard = ({ product }: SimpleProductCardProps) => {
  const hasImage = product.images && product.images.length > 0;
  const primaryImage = hasImage ? product.images[0] : null;

  // ✅ SAFE: Convert description to simple string
  const getSimpleDescription = () => {
    if (typeof product.description === 'string') {
      return product.description;
    }
    
    if (product.description && typeof product.description === 'object') {
      // Simple text extraction for rich text
      try {
        const text = JSON.stringify(product.description).replace(/[{}[\]"]/g, ' ').trim();
        return text.length > 120 ? text.substring(0, 120) + '...' : text;
      } catch {
        return 'Product description available on detail page';
      }
    }
    
    return 'No description available';
  };

  const description = getSimpleDescription();

  // ✅ SAFE: Ensure all fields are strings
  const safeName = String(product.name || 'Unnamed Product');
  const safeBrand = String(product.brand || 'Unknown Brand');
  const safeCategory = String(product.category || 'Uncategorized');
  const safeModel = String(product.model || 'Unknown Model');
  const safeSlug = String(product.slug || '');

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
      {/* ✅ SIMPLE Image Section - No loading states, no complex interactions */}
      <Link href={`/products/${safeSlug}`} className="block">
        <div className="aspect-square relative bg-gray-50 overflow-hidden">
          {hasImage && primaryImage ? (
            <Image
              src={primaryImage}
              alt={safeName}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Package className="h-16 w-16 text-gray-300" />
            </div>
          )}

          {/* ✅ SIMPLE Status Badges - No complex state */}
          <div className="absolute top-3 left-3 right-3 flex items-start justify-between">
            {/* Featured Badge */}
            {product.feature && (
              <Badge className="bg-yellow-500 text-white text-xs">
                <Star className="h-3 w-3 mr-1" />
                Featured
              </Badge>
            )}
            
            {/* Stock Status */}
            <Badge 
              variant={product.inStock ? "default" : "secondary"}
              className={`text-xs ${product.inStock ? "bg-green-500" : "bg-orange-500"}`}
            >
              {product.inStock ? (
                <CheckCircle className="h-3 w-3 mr-1" />
              ) : (
                <AlertCircle className="h-3 w-3 mr-1" />
              )}
              {product.inStock ? "Available" : "Quote"}
            </Badge>
          </div>

          {/* ✅ SIMPLE Hover Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
            <div className="bg-white bg-opacity-90 px-3 py-2 rounded-lg text-sm font-medium text-gray-900">
              <ExternalLink className="h-4 w-4 inline mr-1" />
              View Details
            </div>
          </div>
        </div>
      </Link>

      {/* ✅ SIMPLE Content Section */}
      <div className="p-4">
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

        {/* ✅ SIMPLE Description */}
        <p className="text-sm text-gray-600 mb-4 line-clamp-3">
          {description}
        </p>

        {/* ✅ SIMPLE Services Available */}
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

        {/* ✅ SIMPLE Price */}
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

        {/* ✅ SIMPLE Action Buttons */}
        <div className="space-y-2">
          <Link
            href={`/products/${safeSlug}`}
            className="block w-full bg-teal-600 text-white text-center py-2 px-4 rounded-lg hover:bg-teal-700 transition-colors text-sm font-medium"
          >
            View Details
          </Link>
          <Link
            href={`/quote?product=${safeSlug}`}
            className="block w-full border border-teal-600 text-teal-600 text-center py-2 px-4 rounded-lg hover:bg-teal-50 transition-colors text-sm font-medium"
          >
            <ShoppingCart className="h-4 w-4 inline mr-1" />
            Request Quote
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SimpleProductCard;