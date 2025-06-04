/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
// src/components/home/CategoryShowcase.tsx
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Cpu, Zap, Monitor, Shield, Gauge } from "lucide-react";
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
    servo: "/images/servo.jpg",
  };

  // Category icons mapping
  const categoryIcons: Record<string, any> = {
    plc: Cpu,
    inverter: Zap,
    hmi: Monitor,
    "safety-relay": Shield,
    "power-meter": Gauge,
    servo: Zap,
  };

  // Top categories to highlight
  const topCategories = PRODUCT_CATEGORIES.slice(0, 4).map((cat) => cat.slug);

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      {/* Background Pattern - Subtle dots */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #14b8a6 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-teal-100 rounded-full blur-3xl opacity-20 animate-pulse" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-20 animate-pulse" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header - Enhanced */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Industrial Automation
            <span className="block text-teal-600">Solutions</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Complete range of automation parts with engineering support. From
            PLCs to Safety Systems, we have everything for your industrial
            needs.
          </p>
        </div>

        {/* Main Categories Grid - Enhanced */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {topCategories.map((categorySlug, index) => {
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
            const CategoryIcon = categoryIcons[category.slug] || Cpu;

            return (
              <Link
                key={category.slug}
                href={`/products?category=${category.slug}`}
                className="group relative bg-white rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 border border-gray-100"
              >
                {/* Card Badge */}
                <div className="absolute top-4 left-4 z-20">
                  <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-2 shadow-sm">
                    <CategoryIcon className="h-4 w-4 text-teal-600" />
                    <span className="text-xs font-medium text-gray-700">
                      {productCount > 0 ? `${productCount} Products` : "New"}
                    </span>
                  </div>
                </div>

                {/* Image Section - Enhanced with overlay */}
                <div className="h-52 relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                  <Image
                    src={categoryImage}
                    alt={category.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
                </div>

                {/* Content Section - Enhanced */}
                <div className="p-6 relative">
                  {/* Category Name */}
                  <h3 className="font-bold text-xl text-gray-900 mb-3 group-hover:text-teal-600 transition-colors duration-300">
                    {category.name.split("(")[0].trim()}
                  </h3>

                  {/* Short Description */}
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">
                    {category.description}
                  </p>

                  {/* CTA with Arrow */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-teal-600 group-hover:text-teal-700">
                      Browse Products
                    </span>
                    <div className="bg-teal-50 p-2 rounded-lg group-hover:bg-teal-100 transition-colors">
                      <ArrowRight className="h-4 w-4 text-teal-600 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>

                  {/* Hover Effect Line */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-teal-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* Secondary Categories - Redesigned */}
        {PRODUCT_CATEGORIES.length > 4 && (
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <h3 className="font-semibold text-gray-900 mb-6 text-center text-lg">
              More Specialized Categories
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {PRODUCT_CATEGORIES.slice(4).map((category) => {
                const categoryData = categories.find(
                  (cat) => cat.slug === category.slug
                );
                const productCount = categoryData?.count || 0;
                const CategoryIcon = categoryIcons[category.slug] || Cpu;

                return (
                  <Link
                    key={category.slug}
                    href={`/products?category=${category.slug}`}
                    className="group"
                  >
                    <div className="bg-gray-50 rounded-xl p-5 hover:bg-white hover:shadow-lg transition-all duration-300 text-center border border-transparent hover:border-gray-200">
                      <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:bg-teal-600 transition-colors">
                        <CategoryIcon className="h-6 w-6 text-teal-600 group-hover:text-white transition-colors" />
                      </div>
                      <div className="text-sm font-medium text-gray-900 group-hover:text-teal-600 transition-colors mb-1">
                        {category.name.split("(")[0].trim()}
                      </div>
                      <div className="text-xs text-gray-500">
                        {productCount > 0
                          ? `${productCount} items`
                          : "View all"}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* CTA - Enhanced */}
        <div className="text-center mt-16">
          <p className="text-gray-600 mb-6">
            Can't find what you're looking for? We can source any automation
            part you need.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="outline" asChild className="group" >
              <Link href="/products">
                Browse All Products
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button size="lg" asChild className="bg-teal-600 hover:bg-teal-700">
              <Link href="/contact">Request Custom Part</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom Wave Divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
        >
          <path
            d="M0 40L48 35C96 30 192 20 288 23.3C384 27 480 43 576 51.7C672 60 768 60 864 51.7C960 43 1056 27 1152 23.3C1248 20 1344 30 1392 35L1440 40V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0V120Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
};

export default CategoryShowcase;
