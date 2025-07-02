/* eslint-disable react/no-unescaped-entities */
// src/components/products/SimpleSearchCard.tsx - PURE SERVER COMPONENT
import { Search, ChevronDown, X, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PRODUCT_CATEGORIES, BRANDS } from "@/lib/contants";
import Link from "next/link";

interface SimpleSearchCardProps {
  totalProducts: number;
  currentCategory?: string;
  currentBrand?: string;
  currentSearch?: string;
}

const SimpleSearchCard = ({
  totalProducts,
  currentCategory,
  currentBrand,
  currentSearch,
}: SimpleSearchCardProps) => {
  // Check if any filters are active
  const hasActiveFilters = Boolean(
    currentCategory || currentBrand || currentSearch
  );

  // Helper function to remove specific filter
  const buildRemoveFilterUrl = (
    removeType: "category" | "brand" | "search"
  ) => {
    const params = new URLSearchParams();

    if (removeType !== "category" && currentCategory)
      params.set("category", currentCategory);
    if (removeType !== "brand" && currentBrand)
      params.set("brand", currentBrand);
    if (removeType !== "search" && currentSearch)
      params.set("search", currentSearch);

    const queryString = params.toString();
    return queryString ? `/products?${queryString}` : "/products";
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 mb-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-teal-100 rounded-lg">
            <Search className="h-5 w-5 text-teal-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Search & Filter Products</h3>
            <p className="text-sm text-gray-600">
              Find automation parts by category, brand, or keyword
            </p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-teal-600">
            {totalProducts}
          </div>
          <div className="text-xs text-gray-500">Products found</div>
        </div>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="mb-4 p-3 bg-teal-50 border border-teal-200 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-teal-600" />
              <span className="text-sm font-medium text-teal-900">
                Active Filters:
              </span>
              <div className="flex items-center gap-2">
                {currentCategory && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-teal-100 text-teal-800 text-xs rounded-full">
                    Category:{" "}
                    {
                      PRODUCT_CATEGORIES.find(
                        (cat) => cat.slug === currentCategory
                      )?.name
                    }
                    <Link
                      href={buildRemoveFilterUrl("category")}
                      className="hover:bg-teal-200 rounded-full p-0.5"
                    >
                      <X className="h-3 w-3" />
                    </Link>
                  </span>
                )}
                {currentBrand && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-teal-100 text-teal-800 text-xs rounded-full">
                    Brand:{" "}
                    {BRANDS.find(
                      (brand) =>
                        brand.toLowerCase().replace(/\s+/g, "-") ===
                        currentBrand
                    ) || currentBrand}
                    <Link
                      href={buildRemoveFilterUrl("brand")}
                      className="hover:bg-teal-200 rounded-full p-0.5"
                    >
                      <X className="h-3 w-3" />
                    </Link>
                  </span>
                )}
                {currentSearch && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-teal-100 text-teal-800 text-xs rounded-full">
                    Search: "{currentSearch}"
                    <Link
                      href={buildRemoveFilterUrl("search")}
                      className="hover:bg-teal-200 rounded-full p-0.5"
                    >
                      <X className="h-3 w-3" />
                    </Link>
                  </span>
                )}
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              asChild
              className="text-teal-600 border-teal-300 hover:bg-teal-50"
            >
              <Link href="/products">
                <X className="h-4 w-4 mr-1" />
                Clear All
              </Link>
            </Button>
          </div>
        </div>
      )}

      {/* Search Form - Simple GET form */}
      <form method="GET" action="/products" className="space-y-4">
        {/* Preserve existing filters */}
        {currentCategory && (
          <input type="hidden" name="category" value={currentCategory} />
        )}
        {currentBrand && (
          <input type="hidden" name="brand" value={currentBrand} />
        )}

        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            name="search"
            defaultValue={currentSearch || ""}
            placeholder="Search by product name, brand, model, specifications..."
            className="w-full h-10 pl-10 pr-4 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors"
          />
        </div>

        {/* Quick Category Buttons */}
        <div className="space-y-3">
          <div className="text-sm font-medium text-gray-700">Quick Category Filter:</div>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/products"
              className={`px-3 py-1 text-xs rounded-full transition-colors ${
                !currentCategory
                  ? "bg-teal-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              All Products
            </Link>
            {PRODUCT_CATEGORIES.slice(0, 6).map((category) => (
              <Link
                key={category.slug}
                href={`/products?category=${category.slug}${currentSearch ? `&search=${currentSearch}` : ''}${currentBrand ? `&brand=${currentBrand}` : ''}`}
                className={`px-3 py-1 text-xs rounded-full transition-colors ${
                  currentCategory === category.slug
                    ? "bg-teal-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category.name.split("(")[0].trim()}
              </Link>
            ))}
          </div>
        </div>

        {/* Advanced Filters */}
        <details className="border border-gray-200 rounded-lg">
          <summary className="p-3 cursor-pointer font-medium text-gray-700 hover:bg-gray-50">
            Advanced Filters
          </summary>
          <div className="p-3 border-t border-gray-200 space-y-4">
            {/* Category Dropdown */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                name="category"
                defaultValue={currentCategory || ""}
                className="w-full h-10 pl-4 pr-10 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent appearance-none cursor-pointer transition-colors"
              >
                <option value="">All Categories</option>
                {PRODUCT_CATEGORIES.map((category) => (
                  <option key={category.slug} value={category.slug}>
                    {category.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-9 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>

            {/* Brand Dropdown */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Brand
              </label>
              <select
                name="brand"
                defaultValue={currentBrand || ""}
                className="w-full h-10 pl-4 pr-10 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent appearance-none cursor-pointer transition-colors"
              >
                <option value="">All Brands</option>
                {BRANDS.map((brand) => (
                  <option
                    key={brand}
                    value={brand.toLowerCase().replace(/\s+/g, "-")}
                  >
                    {brand}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-9 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </details>

        {/* Search Button */}
        <Button
          type="submit"
          className="w-full h-10 bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-700 hover:to-teal-600 text-white font-medium shadow-md hover:shadow-lg transition-all"
        >
          <Search className="h-4 w-4 mr-2" />
          Search Products
        </Button>
      </form>

      {/* Help Text */}
      <div className="mt-4 text-xs text-gray-500">
        <p>
          <strong>Tips:</strong> Use specific model numbers for best results. 
          Need help finding something? <Link href="/contact" className="text-teal-600 hover:text-teal-700">Contact our engineers</Link>
        </p>
      </div>
    </div>
  );
};

export default SimpleSearchCard;