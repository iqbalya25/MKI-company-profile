/* eslint-disable react/no-unescaped-entities */
// src/components/products/server/ProductSearch.tsx - FIXED VERSION
// 🔍 PURE SERVER COMPONENT - Native HTML Form Search
// ✅ No JavaScript required - Works with disabled JS
// ✅ Server-side form handling - SEO friendly
// ✅ URL-based state - Bookmarkable searches
// ✅ NO EVENT HANDLERS - Pure server component

import Link from "next/link";
import { Search, ChevronDown, X, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PRODUCT_CATEGORIES, BRANDS } from "@/lib/contants";
import { productStyles } from "../shared/ProductStyles";
import type { ProductSearchServerProps } from "../shared/ProductTypes";

export default function ProductSearchServer({
  totalProducts,
  currentCategory,
  currentBrand,
  currentSearch,
  formMethod = "GET",
  className = "",
}: ProductSearchServerProps) {
  // 🔧 HELPER FUNCTIONS
  const hasActiveFilters = Boolean(
    currentCategory || currentBrand || currentSearch
  );

  // Generate URL for removing specific filter
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

  // Find display names for filters
  const getCategoryDisplayName = (slug: string) => {
    const category = PRODUCT_CATEGORIES.find((cat) => cat.slug === slug);
    return category?.name || slug;
  };

  const getBrandDisplayName = (slug: string) => {
    const brand = BRANDS.find(
      (brand) => brand.toLowerCase().replace(/\s+/g, "-") === slug
    );
    return brand || slug;
  };

  return (
    <div className={`${productStyles.search.container} ${className}`}>
      {/* 📊 HEADER */}
      <div className={productStyles.search.header.container}>
        <div className={productStyles.search.header.info}>
          <div className={productStyles.search.header.icon}>
            <Search className={productStyles.search.header.iconSvg} />
          </div>
          <div>
            <h3 className={productStyles.search.header.title}>
              Search Products
            </h3>
            <p className={productStyles.search.header.subtitle}>
              Find automation parts by name, brand, model, or description
            </p>
          </div>
        </div>
        <div className={productStyles.search.header.stats}>
          <div className={productStyles.search.header.statsNumber}>
            {totalProducts}
          </div>
          <div className={productStyles.search.header.statsLabel}>
            Products found
          </div>
        </div>
      </div>

      {/* 🏷️ ACTIVE FILTERS DISPLAY */}
      {hasActiveFilters && (
        <div className={productStyles.search.filters.container}>
          <div className={productStyles.search.filters.header}>
            <div className={productStyles.search.filters.label}>
              <Filter className={productStyles.search.filters.labelIcon} />
              <span className={productStyles.search.filters.labelText}>
                Active Filters:
              </span>
              <div className={productStyles.search.filters.list}>
                {/* Category Filter */}
                {currentCategory && (
                  <span className={productStyles.search.filters.badge}>
                    Category: {getCategoryDisplayName(currentCategory)}
                    <Link
                      href={buildRemoveFilterUrl("category")}
                      className={productStyles.search.filters.removeButton}
                      title="Remove category filter"
                    >
                      <X className={productStyles.search.filters.removeIcon} />
                    </Link>
                  </span>
                )}

                {/* Brand Filter */}
                {currentBrand && (
                  <span className={productStyles.search.filters.badge}>
                    Brand: {getBrandDisplayName(currentBrand)}
                    <Link
                      href={buildRemoveFilterUrl("brand")}
                      className={productStyles.search.filters.removeButton}
                      title="Remove brand filter"
                    >
                      <X className={productStyles.search.filters.removeIcon} />
                    </Link>
                  </span>
                )}

                {/* Search Filter */}
                {currentSearch && (
                  <span className={productStyles.search.filters.badge}>
                    Search: "{currentSearch}"
                    <Link
                      href={buildRemoveFilterUrl("search")}
                      className={productStyles.search.filters.removeButton}
                      title="Remove search filter"
                    >
                      <X className={productStyles.search.filters.removeIcon} />
                    </Link>
                  </span>
                )}
              </div>
            </div>

            {/* Clear All Button */}
            <Button
              variant="outline"
              size="sm"
              asChild
              className={productStyles.search.filters.clearButton}
            >
              <Link href="/products">
                <X className="h-4 w-4 mr-1" />
                Clear All
              </Link>
            </Button>
          </div>
        </div>
      )}

      {/* 🔍 SEARCH FORM - NATIVE HTML (NO EVENT HANDLERS) */}
      <form
        method={formMethod}
        action="/products"
        className={productStyles.search.form.container}
      >
        {/* 🔤 SEARCH INPUT */}
        <div className={productStyles.search.form.inputGroup}>
          <Search className={productStyles.search.form.inputIcon} />
          <input
            type="text"
            name="search"
            defaultValue={currentSearch || ""}
            placeholder="Search by product name, brand, model, specifications..."
            className={productStyles.search.form.input}
            autoComplete="off"
          />
        </div>

        {/* 📊 FILTER DROPDOWNS */}
        <div className={productStyles.search.form.selectGroup}>
          {/* Category Dropdown */}
          <div className="relative">
            <select
              name="category"
              defaultValue={currentCategory || ""}
              className={productStyles.search.form.select}
              // ✅ REMOVED onChange - Pure server component
            >
              <option value="">All Categories</option>
              {PRODUCT_CATEGORIES.map((category) => (
                <option key={category.slug} value={category.slug}>
                  {category.name}
                </option>
              ))}
            </select>
            <ChevronDown className={productStyles.search.form.selectIcon} />
          </div>

          {/* Brand Dropdown */}
          <div className="relative">
            <select
              name="brand"
              defaultValue={currentBrand || ""}
              className={productStyles.search.form.select}
              // ✅ REMOVED onChange - Pure server component
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
            <ChevronDown className={productStyles.search.form.selectIcon} />
          </div>
        </div>

        {/* 🔍 SEARCH BUTTON */}
        <Button type="submit" className={productStyles.search.form.button}>
          <Search className={productStyles.search.form.buttonIcon} />
          Search Products
        </Button>
      </form>

      {/* 💡 SEARCH TIPS */}
      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h4 className="text-sm font-semibold text-blue-900 mb-2">
          🔍 Search Tips:
        </h4>
        <ul className="text-xs text-blue-800 space-y-1">
          <li>• Try specific model numbers: "FX5U-32MR", "ATV320U15N4"</li>
          <li>• Search by application: "pump control", "safety relay"</li>
          <li>• Use brand names: "Mitsubishi PLC", "Schneider Inverter"</li>
          <li>• Include specifications: "24VDC", "5.5kW", "Ethernet"</li>
        </ul>
      </div>

      {/* 🏷️ POPULAR SEARCHES (if no active filters) */}
      {!hasActiveFilters && (
        <div className="mt-6">
          <h4 className="text-sm font-semibold text-gray-900 mb-3">
            Popular Searches:
          </h4>
          <div className="flex flex-wrap gap-2">
            {[
              { term: "PLC Mitsubishi", category: "plc", brand: "mitsubishi" },
              {
                term: "Inverter Schneider",
                category: "inverter",
                brand: "schneider",
              },
              { term: "HMI Proface", category: "hmi", brand: "proface" },
              { term: "Safety Relay", category: "safety-relay" },
              { term: "Power Meter", category: "power-meter" },
              { term: "Servo Motor", category: "servo" },
            ].map((item, index) => (
              <Link
                key={index}
                href={`/products?${
                  item.category ? `category=${item.category}` : ""
                }${item.brand ? `&brand=${item.brand}` : ""}${
                  item.term && !item.category && !item.brand
                    ? `search=${encodeURIComponent(item.term)}`
                    : ""
                }`}
                className="inline-flex items-center px-3 py-1 bg-white border border-gray-300 rounded-full text-xs text-gray-700 hover:bg-gray-50 hover:border-teal-300 hover:text-teal-700 transition-colors"
              >
                {item.term}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* 📞 QUICK CONTACT (if no results) */}
      {totalProducts === 0 && hasActiveFilters && (
        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h4 className="text-sm font-semibold text-yellow-900 mb-2">
            Can't find what you're looking for?
          </h4>
          <p className="text-xs text-yellow-800 mb-3">
            We can source almost any automation part. Contact our engineering
            team for custom product sourcing and technical consultation.
          </p>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button size="sm" variant="outline" asChild>
              <Link href="/contact">Contact Engineering Team</Link>
            </Button>
            <Button size="sm" variant="outline" asChild>
              <Link href="/quote">Request Custom Quote</Link>
            </Button>
          </div>
        </div>
      )}

      {/* 🎯 SEO ENHANCEMENT: Hidden semantic markup */}
      <div className="sr-only" aria-hidden="true">
        <h2>Industrial Automation Parts Search</h2>
        <p>
          Search through our extensive catalog of {totalProducts} automation
          products including PLCs, HMIs, Inverters, Safety Relays, and Power
          Meters from leading brands like Mitsubishi, Schneider, Omron, and
          Siemens.
        </p>
        {hasActiveFilters && (
          <div>
            <h3>Current Search Filters:</h3>
            {currentCategory && (
              <p>Category: {getCategoryDisplayName(currentCategory)}</p>
            )}
            {currentBrand && <p>Brand: {getBrandDisplayName(currentBrand)}</p>}
            {currentSearch && <p>Search term: {currentSearch}</p>}
          </div>
        )}
      </div>

      {/* 🔧 DEBUG INFO (Development only) */}
      {/* {process.env.NODE_ENV === "development" && (
        <div className="mt-4 p-2 bg-gray-100 rounded text-xs text-gray-600">
          <strong>Search Debug:</strong> 
          {totalProducts} products | 
          Category: {currentCategory || "none"} | 
          Brand: {currentBrand || "none"} | 
          Search: {currentSearch || "none"}
        </div>
      )} */}
    </div>
  );
}
