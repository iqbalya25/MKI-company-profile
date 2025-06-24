/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
// src/components/products/ProductGrid.tsx - CLEAN VERSION
"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Grid, List } from "lucide-react";
import { Product } from "@/types/product";
import ProductCard from "./ProductCard";
import { Button } from "@/components/ui/button";

interface ProductGridProps {
  products: Product[];
  currentPage: number;
  totalPages: number;
  totalProducts: number;
  baseUrl: string;
  searchParams: Record<string, string | undefined>;
}

type SortOption = "name" | "brand" | "category" | "newest" | "oldest";
type ViewMode = "grid" | "list";

const ProductGrid = ({
  products,
  currentPage,
  totalPages,
  totalProducts,
  baseUrl,
  searchParams,
}: ProductGridProps) => {
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  // Sort products
  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return String(a.name).localeCompare(String(b.name));
      case "brand":
        return String(a.brand).localeCompare(String(b.brand));
      case "category":
        return String(a.category).localeCompare(String(b.category));
      case "oldest":
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      case "newest":
      default:
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
    }
  });

  // Generate pagination URL
  const getPaginationUrl = (page: number) => {
    const params = new URLSearchParams();
    Object.entries(searchParams).forEach(([key, value]) => {
      if (value && key !== "page") {
        params.set(key, value);
      }
    });
    if (page > 1) {
      params.set("page", page.toString());
    }
    const queryString = params.toString();
    return queryString ? `${baseUrl}?${queryString}` : baseUrl;
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const showPages = 5;

    if (totalPages <= showPages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const startPage = Math.max(1, currentPage - 2);
      const endPage = Math.min(totalPages, currentPage + 2);

      if (startPage > 1) {
        pages.push(1);
        if (startPage > 2) pages.push("...");
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (endPage < totalPages) {
        if (endPage < totalPages - 1) pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="max-w-md mx-auto">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Grid className="h-12 w-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            No Products Found
          </h3>
          <p className="text-gray-600 mb-6">
            We couldn't find any products matching your criteria. Try adjusting
            your filters or search terms.
          </p>
          <div className="space-y-3">
            <Button asChild>
              <Link href="/products">View All Products</Link>
            </Button>
            <p className="text-sm text-gray-500">
              Or{" "}
              <Link
                href="/contact"
                className="text-teal-600 hover:text-teal-700"
              >
                contact us
              </Link>{" "}
              for custom product sourcing
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 p-4 bg-white border border-gray-200 rounded-lg">
        {/* Results Info */}
        <div className="text-sm text-gray-600">
          Showing <span className="font-semibold">{products.length}</span> of{" "}
          <span className="font-semibold">{totalProducts}</span> products
          {currentPage > 1 && (
            <span className="ml-2 text-gray-500">
              (Page {currentPage} of {totalPages})
            </span>
          )}
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4">
          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600">Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="text-sm border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="name">Name A-Z</option>
              <option value="brand">Brand A-Z</option>
              <option value="category">Category</option>
            </select>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 text-sm ${
                viewMode === "grid"
                  ? "bg-teal-50 text-teal-600"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
              title="Grid view"
            >
              <Grid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 text-sm ${
                viewMode === "list"
                  ? "bg-teal-50 text-teal-600"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
              title="List view"
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Product Grid/List */}
      <div
        className={
          viewMode === "grid"
            ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
            : "space-y-4"
        }
      >
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} viewMode={viewMode} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Page Info */}
          <div className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </div>

          {/* Pagination Controls */}
          <div className="flex items-center gap-2">
            {/* Previous Button */}
            <Link
              href={getPaginationUrl(currentPage - 1)}
              className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-md border ${
                currentPage === 1
                  ? "border-gray-200 text-gray-400 cursor-not-allowed"
                  : "border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
              {...(currentPage === 1 && {
                onClick: (e) => e.preventDefault(),
                tabIndex: -1,
              })}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Link>

            {/* Page Numbers */}
            <div className="hidden sm:flex items-center gap-1">
              {getPageNumbers().map((page, index) => (
                <span key={index}>
                  {page === "..." ? (
                    <span className="px-3 py-2 text-sm text-gray-500">...</span>
                  ) : (
                    <Link
                      href={getPaginationUrl(page as number)}
                      className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                        currentPage === page
                          ? "bg-teal-600 text-white"
                          : "border border-gray-300 text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {page}
                    </Link>
                  )}
                </span>
              ))}
            </div>

            {/* Next Button */}
            <Link
              href={getPaginationUrl(currentPage + 1)}
              className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-md border ${
                currentPage === totalPages
                  ? "border-gray-200 text-gray-400 cursor-not-allowed"
                  : "border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
              {...(currentPage === totalPages && {
                onClick: (e) => e.preventDefault(),
                tabIndex: -1,
              })}
            >
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
        </div>
      )}

      {/* Load More Button (Alternative to pagination for mobile) */}
      {totalPages > 1 && currentPage < totalPages && (
        <div className="mt-8 text-center sm:hidden">
          <Button variant="outline" asChild>
            <Link href={getPaginationUrl(currentPage + 1)}>
              Load More Products
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
