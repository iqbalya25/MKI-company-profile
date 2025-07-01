/* eslint-disable @typescript-eslint/no-unused-vars */
// src/components/products/ProductSearchCard.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PRODUCT_CATEGORIES, BRANDS } from "@/lib/contants";

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
  currentSearch 
}: ProductSearchCardProps) => {
  const [searchTerm, setSearchTerm] = useState(currentSearch || "");
  const [selectedCategory, setSelectedCategory] = useState(currentCategory || "");
  const [selectedBrand, setSelectedBrand] = useState(currentBrand || "");
  
  const router = useRouter();
  const searchParams = useSearchParams();

  // Auto-trigger search when dropdowns change
  useEffect(() => {
    if (selectedCategory !== (currentCategory || "") || 
        selectedBrand !== (currentBrand || "")) {
      handleFilterChange();
    }
  }, [selectedCategory, selectedBrand]);

  const handleFilterChange = () => {
    const params = new URLSearchParams();
    
    // Add search term if exists
    if (searchTerm.trim()) {
      params.set('search', searchTerm.trim());
    }
    
    // Add category if selected
    if (selectedCategory) {
      params.set('category', selectedCategory);
    }
    
    // Add brand if selected
    if (selectedBrand) {
      params.set('brand', selectedBrand);
    }
    
    // Reset to first page when filtering
    params.delete('page');
    
    const queryString = params.toString();
    router.push(queryString ? `/products?${queryString}` : '/products');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    handleFilterChange();
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
            <h3 className="font-semibold text-gray-900">Search Products</h3>
            <p className="text-sm text-gray-600">Find automation parts by name, brand, model, or description</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-teal-600">{totalProducts}</div>
          <div className="text-xs text-gray-500">Products found</div>
        </div>
      </div>

      {/* Search Form */}
      <form onSubmit={handleSearch} className="space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search by product name, brand, model, specifications..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-12"
          />
        </div>

        {/* Dropdown Filters Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Category Dropdown */}
          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full h-12 pl-4 pr-10 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent appearance-none cursor-pointer"
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

          {/* Brand Dropdown */}
          <div className="relative">
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="w-full h-12 pl-4 pr-10 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent appearance-none cursor-pointer"
            >
              <option value="">All Brands</option>
              {BRANDS.map((brand) => (
                <option key={brand} value={brand.toLowerCase().replace(/\s+/g, '-')}>
                  {brand}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Search Button */}
        <Button 
          type="submit" 
          className="w-full h-12 bg-teal-600 hover:bg-teal-700 text-white font-medium"
        >
          <Search className="h-4 w-4 mr-2" />
          Search Products
        </Button>
      </form>
    </div>
  );
};

export default ProductSearchCard;