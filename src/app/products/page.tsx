import { Metadata } from "next";
import { Suspense } from "react";
import { getProductFamilies, getProductFamilyCategories } from "@/lib/contentful";
import { PRODUCT_CATEGORIES, TARGET_KEYWORDS } from "@/lib/contants";
import ProductFamilyFilter from "@/components/products/ProductFamilyFilter";
import ProductFamilyGrid from "@/components/products/ProductFamilyGrid";
import Breadcrumb from "@/components/common/Breadcrumb";

interface ProductsPageProps {
  searchParams: Promise<{
    category?: string;
    brand?: string;
    search?: string;
    page?: string;
  }>;
}

export async function generateMetadata({ searchParams }: ProductsPageProps): Promise<Metadata> {
  const params = await searchParams;
  const { category, brand, search } = params;

  let title = "Industrial Automation Product Families + Technical Support | MKI";
  let description = "Complete automation product families: PLC, HMI, Inverter, Safety Relay series with variants. Parameter setting, commissioning, engineering consultation.";

  if (category) {
    const categoryData = PRODUCT_CATEGORIES.find(cat => cat.slug === category);
    if (categoryData) {
      title = `${categoryData.name} Series + Technical Support | Mederi Karya Indonesia`;
      description = `${categoryData.description}. Complete product families with variants and engineering services.`;
    }
  }

  return { title, description };
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams;
  const { category, brand, search, page = "1" } = params;
  const currentPage = parseInt(page);
  const itemsPerPage = 12;

  // Fetch product families
  const [allFamilies, categories] = await Promise.all([
    getProductFamilies({ limit: 500 }),
    getProductFamilyCategories(),
  ]);

  // Filter families based on search params
  let filteredFamilies = allFamilies;

  if (category) {
    filteredFamilies = filteredFamilies.filter(
      family => family.category.toLowerCase().replace(/\s+/g, "-") === category
    );
  }

  if (brand) {
    filteredFamilies = filteredFamilies.filter(
      family => family.brand.toLowerCase().replace(/\s+/g, "-") === brand
    );
  }

  if (search) {
    const searchLower = search.toLowerCase();
    filteredFamilies = filteredFamilies.filter(family =>
      family.name.toLowerCase().includes(searchLower) ||
      family.brand.toLowerCase().includes(searchLower) ||
      family.series.toLowerCase().includes(searchLower) ||
      family.description.toLowerCase().includes(searchLower) ||
      family.variants.some(variant => 
        variant.model.toLowerCase().includes(searchLower) ||
        variant.name.toLowerCase().includes(searchLower)
      )
    );
  }

  // Pagination
  const totalFamilies = filteredFamilies.length;
  const totalPages = Math.ceil(totalFamilies / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedFamilies = filteredFamilies.slice(startIndex, startIndex + itemsPerPage);

  const breadcrumbItems = [
    { name: "Home", url: "/" },
    { name: "Products", url: "/products" },
  ];

  return (
    <>
      {/* Page Header */}
      <div className="bg-gradient-to-br from-gray-50 to-white py-12 mt-20">
        <div className="container mx-auto px-4">
          <Breadcrumb items={breadcrumbItems} />
          
          <div className="mt-6">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {category
                ? `${PRODUCT_CATEGORIES.find(cat => cat.slug === category)?.name || "Product"} Series`
                : "Industrial Automation Product Families"}
              <span className="block text-teal-600 text-lg font-normal mt-2">
                + Technical Support & Engineering Services
              </span>
            </h1>
            
            <p className="text-lg text-gray-600 max-w-3xl">
              Complete product families with all variants in one place. Easy comparison, 
              technical support, and engineering services included.
            </p>
            
            <div className="mt-4 text-sm text-gray-500">
              Showing {paginatedFamilies.length} of {totalFamilies} product families
              {(category || brand || search) && (
                <span className="ml-2 text-teal-600">• Filtered results</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          {/* Sidebar Filters */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Suspense fallback={<div className="animate-pulse bg-gray-200 h-96 rounded-lg" />}>
                <ProductFamilyFilter
                  categories={categories}
                  currentCategory={category}
                  currentBrand={brand}
                  currentSearch={search}
                  totalResults={totalFamilies}
                />
              </Suspense>
            </div>
          </div>

          {/* Product Family Grid */}
          <div className="lg:col-span-3 mt-8 lg:mt-0">
            <Suspense fallback={<ProductFamilyGridSkeleton />}>
              <ProductFamilyGrid
                families={paginatedFamilies}
                currentPage={currentPage}
                totalPages={totalPages}
                totalFamilies={totalFamilies}
                baseUrl="/products"
                searchParams={params}
              />
            </Suspense>
          </div>
        </div>
      </div>
    </>
  );
}

function ProductFamilyGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="animate-pulse">
          <div className="bg-gray-200 h-64 rounded-lg mb-4" />
          <div className="h-4 bg-gray-200 rounded mb-2" />
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
          <div className="h-6 bg-gray-200 rounded w-1/2" />
        </div>
      ))}
    </div>
  );
}