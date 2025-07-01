/* eslint-disable @typescript-eslint/no-unused-vars */
// src/app/products/page.tsx - ENHANCED VERSION
import { Metadata } from "next";
import { Suspense } from "react";
import { getProducts, getProductCategories } from "@/lib/contentful";
import { PRODUCT_CATEGORIES, TARGET_KEYWORDS } from "@/lib/contants";
import ProductGrid from "@/components/products/ProductGrid";
import ProductSearchCard from "@/components/products/ProductSearchCard";
import Breadcrumb from "@/components/common/Breadcrumb";
import { generateBreadcrumbSchema } from "@/lib/schema";
import { extractPlainTextFromRichText } from "@/components/common/RichTextRenderer";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface ProductsPageProps {
  searchParams: Promise<{
    category?: string;
    brand?: string;
    search?: string;
    page?: string;
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

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const params = await searchParams;
  const { category, brand, search, page = "1" } = params;
  const currentPage = parseInt(page);
  const itemsPerPage = 12;

  // Fetch data
  const [allProducts, categories] = await Promise.all([
    getProducts({ limit: 500 }),
    getProductCategories(),
  ]);

  // Filter products based on search params
  let filteredProducts = allProducts;

  if (category) {
    filteredProducts = filteredProducts.filter(
      (product) =>
        product.category.toLowerCase().replace(/\s+/g, "-") === category
    );
  }

  if (brand) {
    filteredProducts = filteredProducts.filter(
      (product) => product.brand.toLowerCase().replace(/\s+/g, "-") === brand
    );
  }

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
        plainDescription.toLowerCase().includes(searchLower)
      );
    });
  }

  // Pagination
  const totalProducts = filteredProducts.length;
  const totalPages = Math.ceil(totalProducts / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // FIXED: Improved breadcrumb data with proper navigation
  const breadcrumbItems = [
    { name: "Home", url: "/" },
    { name: "Products", url: "/products" },
  ];

  // Add category to breadcrumb only if filtering by category
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
      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBreadcrumbSchema(breadcrumbItems)),
        }}
      />

      {/* ENHANCED: Page Header with Teal Background - Optimized for 1366x768 */}
      <div className="bg-gradient-to-br from-teal-600 to-teal-700 text-white py-8 mt-20">
        <div className="container mx-auto px-4">
          {/* Breadcrumb - White styling for dark background */}
          <Breadcrumb 
            items={breadcrumbItems} 
            className="mb-4 [&_a]:text-teal-200 [&_a:hover]:text-white [&_span]:text-white"
          />

          <div className="max-w-4xl">
            <h1 className="text-3xl lg:text-4xl font-bold mb-3">
              {category
                ? PRODUCT_CATEGORIES.find((cat) => cat.slug === category)
                    ?.name || "Products"
                : brand
                ? `${brand.charAt(0).toUpperCase() + brand.slice(1)} Products`
                : search
                ? `Search Results`
                : "Industrial Automation Products"}
              <span className="block text-teal-200 text-lg lg:text-xl font-normal mt-1">
                + Technical Support & Engineering Services
              </span>
            </h1>

            <p className="text-base text-teal-100 leading-relaxed max-w-3xl">
              {category
                ? PRODUCT_CATEGORIES.find((cat) => cat.slug === category)
                    ?.description || "Quality automation parts with comprehensive engineering support."
                : search
                ? `Search results for "${search}"`
                : "Complete range of automation parts with comprehensive engineering support. Parameter setting, commissioning, troubleshooting services available."}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Enhanced Product Search Card */}
        <Suspense>
          <ProductSearchCard
            totalProducts={totalProducts}
            currentCategory={category}
            currentBrand={brand}
            currentSearch={search}
          />
        </Suspense>

        {/* Product Grid */}
        <div className="mt-8">
          <Suspense fallback={<ProductGridSkeleton />}>
            <ProductGrid
              products={paginatedProducts}
              currentPage={currentPage}
              totalPages={totalPages}
              totalProducts={totalProducts}
              baseUrl="/products"
              searchParams={params}
            />
          </Suspense>
        </div>
      </div>

      {/* Technical Support CTA */}
      {totalProducts > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Need Technical Support?
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
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
        </section>
      )}

      {/* Schema Markup */}
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
                    url: `/products/${product.slug}`,
                    brand: product.brand,
                    category: product.category,
                    description:
                      extractPlainTextFromRichText(product.description) ||
                      "Product description available",
                  },
                })),
            },
          }),
        }}
      />
    </>
  );
}

// Loading skeleton
function ProductGridSkeleton() {
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