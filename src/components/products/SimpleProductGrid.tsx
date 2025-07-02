/* eslint-disable react/no-unescaped-entities */
// src/components/products/SimpleProductGrid.tsx - PURE SERVER COMPONENT
import Link from "next/link";
import { ChevronLeft, ChevronRight, Grid } from "lucide-react";
import { Product } from "@/types/product";
import SimpleProductCard from "./SimpleProductCard";

interface SimpleProductGridProps {
  products: Product[];
  currentPage: number;
  totalPages: number;
  totalProducts: number;
  searchParams: Record<string, string | undefined>;
}

const SimpleProductGrid = ({
  products,
  currentPage,
  totalPages,
  totalProducts,
  searchParams,
}: SimpleProductGridProps) => {
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
    return queryString ? `/products?${queryString}` : "/products";
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
            <Link 
              href="/products"
              className="inline-block bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-colors"
            >
              View All Products
            </Link>
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
      {/* Results Info */}
      <div className="flex items-center justify-between mb-6 p-4 bg-white border border-gray-200 rounded-lg">
        <div className="text-sm text-gray-600">
          Showing <span className="font-semibold">{products.length}</span> of{" "}
          <span className="font-semibold">{totalProducts}</span> products
          {currentPage > 1 && (
            <span className="ml-2 text-gray-500">
              (Page {currentPage} of {totalPages})
            </span>
          )}
        </div>
        
        {/* Simple Sort Links */}
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-500">Sort:</span>
          <Link 
            href={getPaginationUrl(1) + (getPaginationUrl(1).includes('?') ? '&' : '?') + 'sort=name'}
            className="text-teal-600 hover:text-teal-700"
          >
            Name
          </Link>
          <span className="text-gray-300">•</span>
          <Link 
            href={getPaginationUrl(1) + (getPaginationUrl(1).includes('?') ? '&' : '?') + 'sort=brand'}
            className="text-teal-600 hover:text-teal-700"
          >
            Brand
          </Link>
          <span className="text-gray-300">•</span>
          <Link 
            href={getPaginationUrl(1) + (getPaginationUrl(1).includes('?') ? '&' : '?') + 'sort=newest'}
            className="text-teal-600 hover:text-teal-700"
          >
            Newest
          </Link>
        </div>
      </div>

      {/* ✅ SIMPLE 4-COLUMN GRID - No state, no hydration issues */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {products.map((product) => (
          <SimpleProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-white border border-gray-200 rounded-lg">
          {/* Page Info */}
          <div className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </div>

          {/* Pagination Controls */}
          <div className="flex items-center gap-2">
            {/* Previous Button */}
            {currentPage > 1 ? (
              <Link
                href={getPaginationUrl(currentPage - 1)}
                className="inline-flex items-center px-3 py-2 text-sm font-medium rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Previous
              </Link>
            ) : (
              <span className="inline-flex items-center px-3 py-2 text-sm font-medium rounded-md border border-gray-200 text-gray-400 cursor-not-allowed">
                <ChevronLeft className="h-4 w-4 mr-1" />
                Previous
              </span>
            )}

            {/* Page Numbers */}
            <div className="hidden sm:flex items-center gap-1">
              {getPageNumbers().map((page, index) => (
                <span key={index}>
                  {page === "..." ? (
                    <span className="px-3 py-2 text-sm text-gray-500">...</span>
                  ) : (
                    <Link
                      href={getPaginationUrl(page as number)}
                      className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
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
            {currentPage < totalPages ? (
              <Link
                href={getPaginationUrl(currentPage + 1)}
                className="inline-flex items-center px-3 py-2 text-sm font-medium rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            ) : (
              <span className="inline-flex items-center px-3 py-2 text-sm font-medium rounded-md border border-gray-200 text-gray-400 cursor-not-allowed">
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </span>
            )}
          </div>
        </div>
      )}

      {/* Mobile Load More */}
      {totalPages > 1 && currentPage < totalPages && (
        <div className="mt-6 text-center sm:hidden">
          <Link
            href={getPaginationUrl(currentPage + 1)}
            className="inline-block bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-colors"
          >
            Load More Products
          </Link>
        </div>
      )}
    </div>
  );
};

export default SimpleProductGrid;