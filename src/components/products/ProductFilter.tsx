/* eslint-disable react/no-unescaped-entities */
// src/components/products/ProductFilter.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { 
  Filter, 
  Search, 
  X, 
  ChevronDown, 
  ChevronUp,
  Package,
  Tag
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PRODUCT_CATEGORIES, BRANDS } from "@/lib/contants";

interface ProductFilterProps {
  categories: Array<{
    slug: string;
    name: string;
    count: number;
  }>;
  currentCategory?: string;
  currentBrand?: string;
  currentSearch?: string;
  totalResults: number;
}

const ProductFilter = ({ 
  categories, 
  currentCategory, 
  currentBrand, 
  currentSearch,
  totalResults 
}: ProductFilterProps) => {
  const [searchTerm, setSearchTerm] = useState(currentSearch || "");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Handle search form submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    
    if (searchTerm.trim()) {
      params.set('search', searchTerm.trim());
    } else {
      params.delete('search');
    }
    
    // Reset to first page when searching
    params.delete('page');
    
    router.push(`/products?${params.toString()}`);
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm("");
    router.push('/products');
  };

  // Check if any filters are active
  const hasActiveFilters = currentCategory || currentBrand || currentSearch;

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold text-gray-900 flex items-center gap-2">
          <Filter className="h-5 w-5 text-teal-600" />
          Filter Products
        </h3>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="lg:hidden p-1 text-gray-500 hover:text-gray-700"
        >
          {isCollapsed ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
        </button>
      </div>

      {/* Results Summary */}
      <div className="mb-6 p-3 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600">
          <span className="font-semibold text-gray-900">{totalResults}</span> products found
        </p>
      </div>

      {/* Filter Content */}
      <div className={`space-y-6 ${isCollapsed ? 'hidden lg:block' : ''}`}>
        
        {/* Search */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Search Products
          </label>
          <form onSubmit={handleSearch} className="space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search by name, brand, model..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button type="submit" size="sm" className="w-full">
              Search
            </Button>
          </form>
        </div>

        {/* Active Filters */}
        {hasActiveFilters && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-medium text-gray-700">
                Active Filters
              </label>
              <button
                onClick={clearFilters}
                className="text-xs text-teal-600 hover:text-teal-700 flex items-center gap-1"
              >
                <X className="h-3 w-3" />
                Clear All
              </button>
            </div>
            <div className="space-y-2">
              {currentCategory && (
                <div className="flex items-center justify-between p-2 bg-teal-50 rounded-lg">
                  <span className="text-sm text-teal-800">
                    Category: {PRODUCT_CATEGORIES.find(cat => cat.slug === currentCategory)?.name}
                  </span>
                  <Link
                    href={`/products?${new URLSearchParams(
                      Object.fromEntries(
                        Array.from(searchParams.entries()).filter(([key]) => key !== 'category')
                      )
                    ).toString()}`}
                    className="text-teal-600 hover:text-teal-700"
                  >
                    <X className="h-4 w-4" />
                  </Link>
                </div>
              )}
              
              {currentBrand && (
                <div className="flex items-center justify-between p-2 bg-blue-50 rounded-lg">
                  <span className="text-sm text-blue-800">
                    Brand: {currentBrand.charAt(0).toUpperCase() + currentBrand.slice(1)}
                  </span>
                  <Link
                    href={`/products?${new URLSearchParams(
                      Object.fromEntries(
                        Array.from(searchParams.entries()).filter(([key]) => key !== 'brand')
                      )
                    ).toString()}`}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    <X className="h-4 w-4" />
                  </Link>
                </div>
              )}
              
              {currentSearch && (
                <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-800">
                    Search: "{currentSearch}"
                  </span>
                  <Link
                    href={`/products?${new URLSearchParams(
                      Object.fromEntries(
                        Array.from(searchParams.entries()).filter(([key]) => key !== 'search')
                      )
                    ).toString()}`}
                    className="text-gray-600 hover:text-gray-700"
                  >
                    <X className="h-4 w-4" />
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Categories */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
            <Package className="h-4 w-4 text-teal-600" />
            Categories
          </label>
          <div className="space-y-2">
            {/* All Categories Link */}
            <Link
              href="/products"
              className={`block p-2 text-sm rounded-lg transition-colors ${
                !currentCategory 
                  ? 'bg-teal-50 text-teal-700 font-medium' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span>All Categories</span>
                <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                  {categories.reduce((sum, cat) => sum + cat.count, 0)}
                </span>
              </div>
            </Link>

            {/* Individual Categories */}
            {PRODUCT_CATEGORIES.map((category) => {
              const categoryData = categories.find(cat => cat.slug === category.slug);
              const productCount = categoryData?.count || 0;
              const isActive = currentCategory === category.slug;

              return (
                <Link
                  key={category.slug}
                  href={`/products?category=${category.slug}`}
                  className={`block p-2 text-sm rounded-lg transition-colors ${
                    isActive
                      ? 'bg-teal-50 text-teal-700 font-medium'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="line-clamp-1">{category.name}</span>
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded-full ml-2">
                      {productCount}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Popular Brands */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
            <Tag className="h-4 w-4 text-blue-600" />
            Popular Brands
          </label>
          <div className="space-y-2">
            {/* All Brands Link */}
            <Link
              href="/products"
              className={`block p-2 text-sm rounded-lg transition-colors ${
                !currentBrand 
                  ? 'bg-blue-50 text-blue-700 font-medium' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              All Brands
            </Link>

            {/* Popular Brands - Show top 8 */}
            {BRANDS.slice(0, 8).map((brand) => {
              const brandSlug = brand.toLowerCase().replace(/\s+/g, '-');
              const isActive = currentBrand === brandSlug;

              return (
                <Link
                  key={brand}
                  href={`/products?brand=${brandSlug}`}
                  className={`block p-2 text-sm rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 font-medium'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {brand}
                </Link>
              );
            })}

            {/* Show more brands link */}
            <Link
              href="/brands"
              className="block p-2 text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
            >
              View all brands →
            </Link>
          </div>
        </div>

        {/* Support CTA */}
        <div className="p-4 bg-gradient-to-br from-teal-50 to-blue-50 rounded-lg border border-teal-100">
          <h4 className="font-semibold text-sm text-gray-900 mb-2">
            Can't Find What You Need?
          </h4>
          <p className="text-xs text-gray-600 mb-3">
            Our engineering team can source any automation part and provide technical support.
          </p>
          <div className="space-y-2">
            <Button size="sm" className="w-full text-xs" asChild>
              <Link href="/contact">
                Contact Engineers
              </Link>
            </Button>
            <Button size="sm" variant="outline" className="w-full text-xs" asChild>
              <Link href="/quote">
                Request Quote
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductFilter;