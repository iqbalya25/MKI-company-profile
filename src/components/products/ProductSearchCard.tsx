/* eslint-disable react/no-unescaped-entities */
// src/components/products/ProductSearchCard.tsx - PURE SERVER COMPONENT
import { Search, ChevronDown, X, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PRODUCT_CATEGORIES, BRANDS } from "@/lib/contants";
import Link from "next/link";

interface ProductSearchCardProps {
  totalProducts: number;
  currentCategory?: string;
  currentBrand?: string;
  currentSearch?: string;
}

const ProductSearchCard = ({
  totalProducts,
  currentCategory,
  currentBrand,
  currentSearch,
}: ProductSearchCardProps) => {
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
      {/* Header - EXACT SAME DESIGN */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-teal-100 rounded-lg">
            <Search className="h-5 w-5 text-teal-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Search Products</h3>
            <p className="text-sm text-gray-600">
              Find automation parts by name, brand, model, or description
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

      {/* Active Filters Display - EXACT SAME DESIGN */}
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

      {/* Search Form - Manual submission only */}
      <form method="GET" action="/products" className="space-y-4">
        {/* Search Input - EXACT SAME */}
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

        {/* Dropdowns - Manual submission only */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Category Dropdown - EXACT SAME DESIGN */}
          <div className="relative">
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
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          </div>

          {/* Brand Dropdown - EXACT SAME DESIGN */}
          <div className="relative">
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
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Search Button - EXACT SAME */}
        <Button
          type="submit"
          className="w-full h-10 bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-700 hover:to-teal-600 text-white font-medium shadow-md hover:shadow-lg transition-all"
        >
          <Search className="h-4 w-4 mr-2" />
          Search Products
        </Button>
      </form>
    </div>
  );
};

export default ProductSearchCard;
