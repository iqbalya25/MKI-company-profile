/* eslint-disable react/no-unescaped-entities */
// src/components/products/ProductSearchCard.tsx
"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { 
  Search, 
  X, 
  Filter,
  TrendingUp,
  Clock,
  Package
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { PRODUCT_CATEGORIES } from "@/lib/contants";

interface ProductSearchCardProps {
  currentSearch?: string;
  totalResults: number;
  searchParams: Record<string, string | undefined>;
}

const ProductSearchCard = ({ 
  currentSearch, 
  totalResults, 
  searchParams 
}: ProductSearchCardProps) => {
  const [searchTerm, setSearchTerm] = useState(currentSearch || "");
  const [isExpanded, setIsExpanded] = useState(false);
  const router = useRouter();
  const urlSearchParams = useSearchParams();

  // Popular search terms (you can make this dynamic later)
  const popularSearches = [
    "Mitsubishi PLC",
    "Schneider Inverter", 
    "Proface HMI",
    "Safety Relay",
    "Power Meter"
  ];

  // Recent searches (you can implement localStorage later)
  const recentSearches = [
    "FX5U PLC",
    "ATV320",
    "GP4000"
  ];

  // Handle search form submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch(searchTerm.trim());
  };

  // Perform search with URL update
  const performSearch = (term: string) => {
    const params = new URLSearchParams(urlSearchParams.toString());
    
    if (term) {
      params.set('search', term);
    } else {
      params.delete('search');
    }
    
    // Reset to first page when searching
    params.delete('page');
    
    router.push(`/products?${params.toString()}`);
  };

  // Handle quick search (popular/recent terms)
  const handleQuickSearch = (term: string) => {
    setSearchTerm(term);
    performSearch(term);
  };

  // Clear search
  const clearSearch = () => {
    setSearchTerm("");
    const params = new URLSearchParams(urlSearchParams.toString());
    params.delete('search');
    params.delete('page');
    router.push(`/products?${params.toString()}`);
  };

  // Get active filters count
  const activeFiltersCount = Object.entries(searchParams).filter(
    ([key, value]) => value && key !== 'page' && key !== 'search'
  ).length;

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
      {/* Main Search Section */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-teal-100 rounded-lg">
              <Search className="h-5 w-5 text-teal-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Search Products
              </h2>
              <p className="text-sm text-gray-600">
                Find automation parts by name, brand, model, or description
              </p>
            </div>
          </div>
          
          {/* Results Summary */}
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-900">
              {totalResults.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">
              Products found
            </div>
          </div>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search by product name, brand, model, specifications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-12 py-3 text-base border-gray-300 focus:border-teal-500 focus:ring-teal-500"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm("")}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button type="submit" className="bg-teal-600 hover:bg-teal-700 px-8">
              <Search className="h-4 w-4 mr-2" />
              Search Products
            </Button>
            
            {currentSearch && (
              <Button 
                type="button" 
                variant="outline" 
                onClick={clearSearch}
                className="border-gray-300"
              >
                <X className="h-4 w-4 mr-2" />
                Clear Search
              </Button>
            )}
            
            <Button
              type="button"
              variant="ghost"
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-gray-600"
            >
              <Filter className="h-4 w-4 mr-2" />
              {isExpanded ? 'Hide' : 'Show'} Quick Filters
              {activeFiltersCount > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>
          </div>
        </form>

        {/* Current Search Display */}
        {currentSearch && (
          <div className="mt-4 p-3 bg-teal-50 border border-teal-200 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Package className="h-4 w-4 text-teal-600" />
                <span className="text-sm font-medium text-teal-900">
                  Searching for: "{currentSearch}"
                </span>
                <Badge variant="secondary" className="bg-teal-100 text-teal-800">
                  {totalResults} results
                </Badge>
              </div>
              <button
                onClick={clearSearch}
                className="text-teal-600 hover:text-teal-700"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Expanded Quick Options */}
      {isExpanded && (
        <div className="border-t border-gray-100 bg-gray-50 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Popular Searches */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="h-4 w-4 text-gray-600" />
                <h3 className="text-sm font-semibold text-gray-900">
                  Popular Searches
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((term) => (
                  <button
                    key={term}
                    onClick={() => handleQuickSearch(term)}
                    className="px-3 py-1.5 text-sm bg-white border border-gray-200 rounded-full hover:border-teal-300 hover:bg-teal-50 transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Category Filters */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Filter className="h-4 w-4 text-gray-600" />
                <h3 className="text-sm font-semibold text-gray-900">
                  Quick Categories
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {PRODUCT_CATEGORIES.slice(0, 4).map((category) => {
                  const isActive = searchParams.category === category.slug;
                  return (
                    <button
                      key={category.slug}
                      onClick={() => {
                        const params = new URLSearchParams(urlSearchParams.toString());
                        if (isActive) {
                          params.delete('category');
                        } else {
                          params.set('category', category.slug);
                        }
                        params.delete('page');
                        router.push(`/products?${params.toString()}`);
                      }}
                      className={`px-3 py-1.5 text-sm border rounded-full transition-colors ${
                        isActive
                          ? 'bg-teal-600 text-white border-teal-600'
                          : 'bg-white border-gray-200 hover:border-teal-300 hover:bg-teal-50'
                      }`}
                    >
                      {category.name.split('(')[0].trim()}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Recent Searches */}
          {recentSearches.length > 0 && !currentSearch && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center gap-2 mb-3">
                <Clock className="h-4 w-4 text-gray-600" />
                <h3 className="text-sm font-semibold text-gray-900">
                  Recent Searches
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((term) => (
                  <button
                    key={term}
                    onClick={() => handleQuickSearch(term)}
                    className="px-3 py-1.5 text-sm bg-white border border-gray-200 rounded-full hover:border-teal-300 hover:bg-teal-50 transition-colors text-gray-600"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Search Tips */}
      <div className="border-t border-gray-100 bg-gray-50 px-6 py-3">
        <div className="flex items-center justify-between text-xs text-gray-600">
          <div className="flex items-center gap-4">
            <span>💡 Try: "Mitsubishi FX5U", "Schneider ATV320", "Safety relay"</span>
          </div>
          <div className="hidden sm:block">
            <kbd className="px-2 py-1 bg-white border border-gray-200 rounded text-xs">
              Enter
            </kbd>
            <span className="ml-1">to search</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSearchCard;