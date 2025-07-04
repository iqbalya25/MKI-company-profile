/* eslint-disable react/no-unescaped-entities */
// src/components/products/server/ProductSearch.tsx - MOBILE OPTIMIZED VERSION
// 🔍 PURE SERVER COMPONENT - Native HTML Form Search
// ✅ No JavaScript required - Works with disabled JS
// ✅ Server-side form handling - SEO friendly
// ✅ URL-based state - Bookmarkable searches
// ✅ MOBILE RESPONSIVE - Fixed active filters layout
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
      {/* 📊 HEADER - MOBILE RESPONSIVE */}
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

      {/* 🏷️ ACTIVE FILTERS DISPLAY - MOBILE OPTIMIZED */}
      {hasActiveFilters && (
        <div className={productStyles.search.filters.container}>
          {/* DESKTOP LAYOUT */}
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

            {/* Clear All Button - Desktop */}
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

          {/* MOBILE LAYOUT - NEW OPTIMIZED DESIGN */}
          <div className={productStyles.search.filters.mobileContainer}>
            {/* Mobile Header */}
            <div className={productStyles.search.filters.mobileHeader}>
              <div className={productStyles.search.filters.mobileTitle}>
                <Filter
                  className={productStyles.search.filters.mobileTitleIcon}
                />
                <span className={productStyles.search.filters.mobileTitleText}>
                  Active Filters
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                asChild
                className={productStyles.search.filters.mobileClearButton}
              >
                <Link href="/products">Clear All</Link>
              </Button>
            </div>

            {/* Mobile Filter Cards - Stacked Layout */}
            <div className={productStyles.search.filters.mobileFiltersGroup}>
              {/* Category Filter - Mobile */}
              {currentCategory && (
                <div className={productStyles.search.filters.mobileFilterCard}>
                  <div
                    className={productStyles.search.filters.mobileFilterContent}
                  >
                    <span
                      className={productStyles.search.filters.mobileFilterLabel}
                    >
                      Category:
                    </span>
                    <span
                      className={productStyles.search.filters.mobileFilterValue}
                    >
                      {getCategoryDisplayName(currentCategory)}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    asChild
                    className={productStyles.search.filters.mobileRemoveButton}
                  >
                    <Link href={buildRemoveFilterUrl("category")}>
                      <X
                        className={
                          productStyles.search.filters.mobileRemoveIcon
                        }
                      />
                    </Link>
                  </Button>
                </div>
              )}

              {/* Brand Filter - Mobile */}
              {currentBrand && (
                <div className={productStyles.search.filters.mobileFilterCard}>
                  <div
                    className={productStyles.search.filters.mobileFilterContent}
                  >
                    <span
                      className={productStyles.search.filters.mobileFilterLabel}
                    >
                      Brand:
                    </span>
                    <span
                      className={productStyles.search.filters.mobileFilterValue}
                    >
                      {getBrandDisplayName(currentBrand)}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    asChild
                    className={productStyles.search.filters.mobileRemoveButton}
                  >
                    <Link href={buildRemoveFilterUrl("brand")}>
                      <X
                        className={
                          productStyles.search.filters.mobileRemoveIcon
                        }
                      />
                    </Link>
                  </Button>
                </div>
              )}

              {/* Search Filter - Mobile */}
              {currentSearch && (
                <div className={productStyles.search.filters.mobileFilterCard}>
                  <div
                    className={productStyles.search.filters.mobileFilterContent}
                  >
                    <span
                      className={productStyles.search.filters.mobileFilterLabel}
                    >
                      Search:
                    </span>
                    <span
                      className={productStyles.search.filters.mobileFilterValue}
                    >
                      "{currentSearch}"
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    asChild
                    className={productStyles.search.filters.mobileRemoveButton}
                  >
                    <Link href={buildRemoveFilterUrl("search")}>
                      <X
                        className={
                          productStyles.search.filters.mobileRemoveIcon
                        }
                      />
                    </Link>
                  </Button>
                </div>
              )}
            </div>
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
    </div>
  );
}
