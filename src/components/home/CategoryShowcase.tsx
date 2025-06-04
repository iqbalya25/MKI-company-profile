// src/components/home/CategoryShowcase.tsx
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PRODUCT_CATEGORIES } from "@/lib/contants";

interface CategoryShowcaseProps {
  categories: Array<{
    slug: string;
    name: string;
    count: number;
  }>;
}

const CategoryShowcase = ({ categories }: CategoryShowcaseProps) => {
  // Category images mapping
  const categoryImages: Record<string, string> = {
    plc: "/images/plc3.jpeg",
    inverter: "/images/inverter2.jpeg",
    hmi: "/images/hmi2.jpeg",
    "safety-relay": "/images/safetysensor.png",
    "power-meter": "/images/power-meter.jpg",
  };

  // Top categories to highlight - using first 4 from constants
  const topCategories = PRODUCT_CATEGORIES.slice(0, 4).map((cat) => cat.slug);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Industrial Automation Solutions
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Complete range of automation parts with engineering support. From
            PLCs to Safety Systems, we have everything for your industrial
            needs.
          </p>
        </div>

        {/* Main Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {topCategories.map((categorySlug) => {
            const category = PRODUCT_CATEGORIES.find(
              (cat) => cat.slug === categorySlug
            );
            if (!category) return null;

            const categoryData = categories.find(
              (cat) => cat.slug === category.slug
            );
            const productCount = categoryData?.count || 0;
            const categoryImage =
              categoryImages[category.slug] || "/images/default-category.png";

            return (
              <Link
                key={category.slug}
                href={`/products?category=${category.slug}`}
                className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                {/* Image Section - Half of the card */}
                <div className="h-48 relative overflow-hidden bg-gradient-to-br from-teal-50 to-blue-50">
                  <Image
                    src={categoryImage}
                    alt={category.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                  {/* Overlay gradient for better text visibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content Section - Half of the card */}
                <div className="p-6">
                  {/* Category Name */}
                  <h3 className="font-semibold text-lg text-gray-900 mb-2 group-hover:text-teal-600 transition-colors">
                    {category.name.split("(")[0].trim()}
                  </h3>

                  {/* Short Description */}
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {category.description}
                  </p>

                  {/* Product Count & Arrow */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {productCount > 0
                        ? `${productCount} products`
                        : "View products"}
                    </span>
                    <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-teal-600 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Secondary Categories */}
        {PRODUCT_CATEGORIES.length > 4 && (
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="font-semibold text-gray-900 mb-4">
              More Categories
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {PRODUCT_CATEGORIES.slice(4).map((category) => {
                const categoryData = categories.find(
                  (cat) => cat.slug === category.slug
                );
                const productCount = categoryData?.count || 0;

                return (
                  <Link
                    key={category.slug}
                    href={`/products?category=${category.slug}`}
                    className="group"
                  >
                    <div className="bg-white rounded-lg p-4 hover:shadow-md transition-all duration-300 text-center">
                      <div className="text-sm font-medium text-gray-900 group-hover:text-teal-600 transition-colors mb-1">
                        {category.name.split("(")[0].trim()}
                      </div>
                      <div className="text-xs text-gray-500">
                        {productCount > 0 ? `${productCount} products` : "View"}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="text-center mt-12">
          <Button size="lg" variant="outline" asChild>
            <Link href="/products">
              Browse All Products
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CategoryShowcase;
