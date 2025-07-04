// src/components/products/RelatedProducts.tsx
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Package, ShoppingCart } from "lucide-react";
import { Product } from "@/types/product";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";

interface RelatedProductsProps {
  products: Product[];
  title?: string;
  showAll?: boolean;
}

const RelatedProducts = ({
  products,
  title = "Related Products",
  showAll = true,
}: RelatedProductsProps) => {
  if (!products || products.length === 0) {
    return null;
  }

  // Limit to 4 products for display
  const displayProducts = products.slice(0, 4);

  return (
    <section className="py-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        {showAll && (
          <Button variant="outline" asChild>
            <Link href="/products">
              View All Products
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {displayProducts.map((product) => (
          <RelatedProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

// Individual Related Product Card
function RelatedProductCard({ product }: { product: Product }) {
  const hasImage = product.images && product.images.length > 0;

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 group">
      {/* Product Image */}
      <div className="aspect-square relative bg-gray-50 overflow-hidden">
        {hasImage ? (
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
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
            className={`text-xs ${product.inStock ? "bg-green-500" : "bg-orange-500"}`}
          >
            {product.inStock ? "Available" : "Quote"}
          </Badge>
        </div>

        {/* Quick View Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <Button size="sm" variant="secondary" asChild>
            <Link href={`/products/${product.slug}`}>Quick View</Link>
          </Button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Brand */}
        <div className="mb-2">
          <Badge variant="outline" className="text-xs">
            {product.brand}
          </Badge>
        </div>

        {/* Product Name */}
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-teal-600 transition-colors">
          <Link href={`/products/${product.slug}`}>{product.name}</Link>
        </h3>

        {/* Model */}
        <p className="text-xs text-gray-600 mb-3">Model: {product.model}</p>

        {/* Price */}
        <div className="mb-3">
          {product.showPrice && product.price ? (
            <div className="text-lg font-bold text-gray-900">
              {formatPrice(product.price)}
            </div>
          ) : (
            <div className="text-sm text-gray-600">Contact for pricing</div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button size="sm" className="flex-1 text-xs" asChild>
            <Link href={`/products/${product.slug}`}>View Details</Link>
          </Button>
          <Button size="sm" variant="outline" asChild>
            <Link href={`/quote?product=${product.slug}`}>
              <ShoppingCart className="h-3 w-3" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default RelatedProducts;
