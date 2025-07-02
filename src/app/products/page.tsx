/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
// src/app/products/page.tsx - UPDATED WITH SERVER COMPONENTS
// 🎯 PURE SERVER COMPONENT ARCHITECTURE - Zero Hydration Errors
// ✅ 4-column responsive grid implemented
// ✅ Server-side filtering and pagination
// ✅ Perfect SEO and performance
// ✅ Uses new server components

import { Metadata } from "next";
import { Suspense } from "react";
import { getProducts, getProductCategories } from "@/lib/contentful";
import { PRODUCT_CATEGORIES, TARGET_KEYWORDS } from "@/lib/contants";
import { generateBreadcrumbSchema } from "@/lib/schema";
import { extractPlainTextFromRichText } from "@/components/common/RichTextRenderer";
import Breadcrumb from "@/components/common/Breadcrumb";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// ✅ NEW SERVER COMPONENTS - No hydration issues!
import ProductGridServer from "@/components/products/server/ProductGrid";
import ProductSearchServer from "@/components/products/server/ProductSearch";

interface ProductsPageProps {
  searchParams: Promise<{
    category?: string;
    brand?: string;
    search?: string;
    page?: string;
    sort?: string;
    view?: string;
  }>;
}

export async function generateMetadata({
  searchParams,
}: ProductsPageProps): Promise<Metadata> {
  const params = await searchParams;
  const { category, brand, search } = params;

  let title = "Industrial Automation Products + Technical Support | MKI";
  let description =
    "Complete catalog automation parts: PLC, HMI, Inverter, Safety Relay dengan technical support. Parameter setting, commissioning, engineering consultation.";

  if (category) {
    const categoryData = PRODUCT_CATEGORIES.find(
      (cat) => cat.slug === category
    );
    if (categoryData) {
      title = `${categoryData.name} + Technical Support | Mederi Karya Indonesia`;
      description = `${categoryData.description}. Competitive pricing dengan engineering services komprehensif.`;
    }
  }

  if (brand) {
    title = `${
      brand.charAt(0).toUpperCase() + brand.slice(1)
    } Products + Technical Support | MKI`;
    description = `${brand} automation products dengan parameter setting dan commissioning service. Engineering consultation available.`;
  }

  if (search) {
    title = `Search: "${search}" - Automation Parts + Technical Support | MKI`;
    description = `Search results for "${search}" - automation parts dengan engineering services. Parameter setting, troubleshooting, consultation.`;
  }

  return {
    title,
    description,
    keywords: [
      ...TARGET_KEYWORDS.primary,
      category ? `${category} automation` : null,
      brand ? `${brand} automation products` : null,
      search ? `${search} automation parts` : null,
      "technical support automation",
      "parameter setting service",
      "engineering consultation indonesia",
    ].filter((k): k is string => Boolean(k)),
    openGraph: {
      title,
      description,
      url: "/products",
      type: "website",
    },
    alternates: {
      canonical: category
        ? `/products?category=${category}`
        : brand
        ? `/products?brand=${brand}`
        : "/products",
    },
  };
}

// 🎯 MAIN SERVER COMPONENT - Pure server rendering
export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const params = await searchParams;
  const {
    category,
    brand,
    search,
    page = "1",
    sort = "newest",
    view = "grid",
  } = params;
  const currentPage = parseInt(page);
  const itemsPerPage = 12;

  // ✅ SERVER-SIDE DATA FETCHING
  const [allProducts, categories] = await Promise.all([
    getProducts({ limit: 500 }),
    getProductCategories(),
  ]);

  // ✅ SERVER-SIDE FILTERING
  let filteredProducts = allProducts;

  // Filter by category
  if (category) {
    filteredProducts = filteredProducts.filter(
      (product) =>
        product.category.toLowerCase().replace(/\s+/g, "-") === category
    );
  }

  // Filter by brand
  if (brand) {
    filteredProducts = filteredProducts.filter(
      (product) => product.brand.toLowerCase().replace(/\s+/g, "-") === brand
    );
  }

  // Filter by search term
  if (search) {
    const searchLower = search.toLowerCase();
    filteredProducts = filteredProducts.filter((product) => {
      const plainDescription =
        typeof product.description === "string"
          ? product.description
          : extractPlainTextFromRichText(product.description) || "";

      return (
        String(product.name).toLowerCase().includes(searchLower) ||
        String(product.brand).toLowerCase().includes(searchLower) ||
        String(product.model).toLowerCase().includes(searchLower) ||
        String(product.category).toLowerCase().includes(searchLower) ||
        plainDescription.toLowerCase().includes(searchLower)
      );
    });
  }

  // ✅ SERVER-SIDE SORTING
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sort) {
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

  // ✅ SERVER-SIDE PAGINATION
  const totalProducts = sortedProducts.length;
  const totalPages = Math.ceil(totalProducts / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = sortedProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // ✅ BREADCRUMB DATA
  const breadcrumbItems = [
    { name: "Home", url: "/" },
    { name: "Products", url: "/products" },
  ];

  if (category) {
    const categoryData = PRODUCT_CATEGORIES.find(
      (cat) => cat.slug === category
    );
    if (categoryData) {
      breadcrumbItems.push({
        name: categoryData.name,
        url: `/products?category=${category}`,
      });
    }
  }

  return (
    <>
      {/* ✅ SERVER-RENDERED SCHEMA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBreadcrumbSchema(breadcrumbItems)),
        }}
      />

      {/* ✅ HERO HEADER SECTION */}
      <div className="bg-gradient-to-br from-teal-600 to-teal-700 text-white py-8 mt-20">
        <div className="container mx-auto px-4">
          <Breadcrumb
            items={breadcrumbItems}
            className="mb-6 [&_a]:text-teal-200 [&_a:hover]:text-white [&_span]:text-white"
          />

          <div className="max-w-4xl">
            <h1 className="text-3xl lg:text-4xl font-bold mb-4">
              {category
                ? PRODUCT_CATEGORIES.find((cat) => cat.slug === category)
                    ?.name || "Products"
                : brand
                ? `${brand.charAt(0).toUpperCase() + brand.slice(1)} Products`
                : search
                ? `Search Results`
                : "Industrial Automation Products"}
              <span className="block text-teal-200 text-lg lg:text-xl font-normal mt-2">
                + Technical Support & Engineering Services
              </span>
            </h1>

            <p className="text-base text-teal-100 leading-relaxed max-w-3xl">
              {category
                ? PRODUCT_CATEGORIES.find((cat) => cat.slug === category)
                    ?.description ||
                  "Quality automation parts with comprehensive engineering support."
                : search
                ? `Search results for "${search}" with technical support included`
                : "Complete range of automation parts with comprehensive engineering support. Parameter setting, commissioning, troubleshooting services available."}
            </p>
          </div>
        </div>
      </div>

      {/* ✅ MAIN CONTENT AREA */}
      <div className="container mx-auto px-4 py-8">
        {/* ✅ SEARCH COMPONENT - Server rendered */}
        <Suspense fallback={<SearchCardSkeleton />}>
          <ProductSearchServer
            totalProducts={totalProducts}
            currentCategory={category}
            currentBrand={brand}
            currentSearch={search}
            enableAutoSubmit={false} // Can be enabled for progressive enhancement
          />
        </Suspense>

        {/* ✅ PRODUCT GRID - Server rendered with 4-column layout */}
        <div className="mt-8">
          <Suspense fallback={<ProductGridSkeleton />}>
            <ProductGridServer
              products={paginatedProducts}
              currentPage={currentPage}
              totalPages={totalPages}
              totalProducts={totalProducts}
              baseUrl="/products"
              searchParams={params}
              viewMode={view as "grid" | "list"}
              enablePagination={true}
              itemsPerPage={itemsPerPage}
            />
          </Suspense>
        </div>
      </div>

      {/* ✅ TECHNICAL SUPPORT CTA */}
      {totalProducts > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Need Technical Support?
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Our engineering team provides parameter setting, commissioning,
                and troubleshooting services for all products. Get free
                consultation for your automation project.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link href="/contact">Request Technical Support</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/services">Engineering Consultation</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ✅ NO RESULTS STATE */}
      {totalProducts === 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <div className="text-4xl">🔍</div>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                No Products Found
              </h2>
              <p className="text-gray-600 mb-8">
                We couldn't find any products matching your search criteria. Try
                adjusting your filters or contact us for custom product
                sourcing.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild>
                  <Link href="/products">View All Products</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/contact">Contact for Custom Sourcing</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ✅ SEO STRUCTURED DATA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: category
              ? PRODUCT_CATEGORIES.find((cat) => cat.slug === category)?.name
              : "Industrial Automation Products",
            description:
              "Complete catalog of automation parts with technical support",
            url: "/products",
            breadcrumb: {
              "@type": "BreadcrumbList",
              itemListElement: breadcrumbItems.map((item, index) => ({
                "@type": "ListItem",
                position: index + 1,
                name: item.name,
                item: `https://mederikaryaindonesia.com${item.url}`,
              })),
            },
            mainEntity: {
              "@type": "ItemList",
              numberOfItems: totalProducts,
              itemListElement: paginatedProducts
                .slice(0, 10)
                .map((product, index) => ({
                  "@type": "ListItem",
                  position: index + 1,
                  item: {
                    "@type": "Product",
                    name: product.name,
                    url: `https://mederikaryaindonesia.com/products/${product.slug}`,
                    brand: {
                      "@type": "Brand",
                      name: product.brand,
                    },
                    category: product.category,
                    description:
                      extractPlainTextFromRichText(product.description) ||
                      "Product description available",
                    offers: {
                      "@type": "Offer",
                      availability: product.inStock
                        ? "https://schema.org/InStock"
                        : "https://schema.org/PreOrder",
                      seller: {
                        "@type": "Organization",
                        name: "Mederi Karya Indonesia",
                      },
                    },
                  },
                })),
            },
            provider: {
              "@type": "Organization",
              name: "Mederi Karya Indonesia",
              description:
                "Industrial automation parts supplier with technical support",
              url: "https://mederikaryaindonesia.com",
            },
          }),
        }}
      />
    </>
  );
}

// ✅ LOADING SKELETONS - Server-safe components
function SearchCardSkeleton() {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 mb-8 animate-pulse">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-gray-200 rounded-lg" />
          <div>
            <div className="h-4 bg-gray-200 rounded w-24 mb-2" />
            <div className="h-3 bg-gray-200 rounded w-40" />
          </div>
        </div>
        <div className="text-right">
          <div className="h-6 bg-gray-200 rounded w-8 mb-1" />
          <div className="h-3 bg-gray-200 rounded w-16" />
        </div>
      </div>
      <div className="space-y-4">
        <div className="h-10 bg-gray-200 rounded" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="h-10 bg-gray-200 rounded" />
          <div className="h-10 bg-gray-200 rounded" />
        </div>
        <div className="h-10 bg-gray-200 rounded" />
      </div>
    </div>
  );
}

function ProductGridSkeleton() {
  return (
    <div>
      {/* Toolbar Skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 p-4 bg-white border border-gray-200 rounded-lg animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-48" />
        <div className="flex items-center gap-4">
          <div className="h-8 bg-gray-200 rounded w-32" />
          <div className="h-8 bg-gray-200 rounded w-16" />
        </div>
      </div>

      {/* 4-Column Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 12 }).map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="bg-gray-200 aspect-square rounded-lg mb-4" />
            <div className="space-y-2">
              <div className="h-3 bg-gray-200 rounded w-1/2" />
              <div className="h-4 bg-gray-200 rounded" />
              <div className="h-3 bg-gray-200 rounded w-3/4" />
              <div className="h-6 bg-gray-200 rounded w-1/2" />
              <div className="grid grid-cols-2 gap-1">
                <div className="h-8 bg-gray-200 rounded" />
                <div className="h-8 bg-gray-200 rounded" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
