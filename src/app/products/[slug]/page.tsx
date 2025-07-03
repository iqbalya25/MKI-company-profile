/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/products/[slug]/page.tsx - UPDATED WITH SERVICE-LIKE LAYOUT
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Download,
  ShoppingCart,
  Settings,
  Headphones,
  FileText,
  CheckCircle,
  AlertCircle,
  Package,
  Star,
  Phone,
  Mail,
  Wrench,
  Shield,
  Clock,
  Users,
} from "lucide-react";
import { getProductBySlug, getProducts } from "@/lib/contentful";
import { generateProductSchema, generateBreadcrumbSchema } from "@/lib/schema";
import { SITE_CONFIG } from "@/lib/contants";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Breadcrumb from "@/components/common/Breadcrumb";
import RelatedProducts from "@/app/products/RelatedProducts";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found | Mederi Karya Indonesia",
      description: "The requested product could not be found.",
    };
  }

  const title =
    product.seoTitle ||
    `${product.name} + Technical Support | Mederi Karya Indonesia`;
  const description =
    product.seoDescription ||
    `${product.name} - ${product.brand} ${product.model}. Professional automation product with technical support. Parameter setting, commissioning service available.`;

  return {
    title,
    description,
    keywords: [
      product.name,
      product.brand,
      product.model,
      product.category,
      "technical support",
      "parameter setting",
      "commissioning service",
      "automation parts indonesia",
    ],
    openGraph: {
      title,
      description,
      type: "website",
      url: `/products/${product.slug}`,
      images:
        product.images.length > 0
          ? [
              {
                url: product.images[0],
                width: 800,
                height: 600,
                alt: product.name,
              },
            ]
          : [],
    },
    alternates: {
      canonical: `/products/${product.slug}`,
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  // Fetch related products (same category)
  const relatedProducts = await getProducts({
    category: product.category,
    limit: 4,
  });

  // Filter out current product from related
  const filteredRelated = relatedProducts.filter((p) => p.id !== product.id);

  // Breadcrumb data
  const breadcrumbItems = [
    { name: "Home", url: "/" },
    { name: "Products", url: "/products" },
    {
      name: product.category,
      url: `/products?category=${product.category
        .toLowerCase()
        .replace(/\s+/g, "-")}`,
    },
    { name: product.name, url: `/products/${product.slug}` },
  ];

  return (
    <>
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateProductSchema(product)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBreadcrumbSchema(breadcrumbItems)),
        }}
      />

      {/* Main Content */}
      <div className="mt-20">
        <div className="container mx-auto px-4 py-8">
          {/* Product Header - Grid Layout like Service Detail */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Left Side - Product Image */}
            <div className="lg:col-span-1">
              <ProductImageSection product={product} />
            </div>

            {/* Right Side - Product Info */}
            <div className="lg:col-span-2 space-y-3">
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 text-sm">
                <Link
                  href="/products"
                  className="text-teal-600 hover:underline"
                >
                  Products
                </Link>
                <span className="text-gray-400">/</span>
                <Link
                  href={`/products?category=${product.category
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`}
                  className="text-teal-600 hover:underline"
                >
                  {product.category}
                </Link>
                <span className="text-gray-400">/</span>
                <span className="text-gray-600">{product.name}</span>
              </div>

              {/* Brand & Category Badges */}
              <div className="flex items-center gap-2 flex-wrap">
                {product.feature && (
                  <Badge className="bg-yellow-500 text-sm">
                    <Star className="h-3 w-3 mr-1" />
                    Featured
                  </Badge>
                )}
              </div>

              {/* Product Title & Model */}
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
                  {product.name}
                </h1>
                {/* <p className="text-lg text-gray-600 mb-4">
                  Model: <span className="font-semibold text-gray-900">{product.model}</span>
                </p> */}
              </div>

              {/* Stock Status */}
              <div className="flex items-center gap-2 mb-4">
                {product.inStock ? (
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle className="h-5 w-5" />
                    <span className="font-medium">
                      Available for immediate shipping
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-orange-600">
                    <AlertCircle className="h-5 w-5" />
                    <span className="font-medium">
                      Contact for availability & lead time
                    </span>
                  </div>
                )}
              </div>

              {/* Price Section */}
              <div className="bg-gray-50 p-4 rounded-lg border">
                <h3 className="text-lg font-semibold mb-2 text-gray-900">
                  Contact for Competitive Pricing
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  We offer the best prices with comprehensive technical support
                </p>
                {product.showPrice && product.price && (
                  <div className="text-2xl font-bold text-teal-600 mb-2">
                    {formatPrice(product.price)}
                  </div>
                )}
                {product.priceNote && (
                  <p className="text-sm text-gray-500">{product.priceNote}</p>
                )}
              </div>

              {/* Services Included */}
              <div className="bg-teal-50 p-6 rounded-lg border border-teal-100">
                <h3 className="text-lg font-semibold mb-4 text-teal-800">
                  Services Option:
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex items-center gap-3">
                    <Settings className="w-5 h-5 text-teal-600 flex-shrink-0" />
                    <span className="text-sm text-teal-700">
                      Programming / Parameter Setting
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-teal-600 flex-shrink-0" />
                    <span className="text-sm text-teal-700">
                      Installation Documentation
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Wrench className="w-5 h-5 text-teal-600 flex-shrink-0" />
                    <span className="text-sm text-teal-700">
                      Commissioning Service
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-teal-600 flex-shrink-0" />
                    <span className="text-sm text-teal-700">
                      Training & Support
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button
                  size="lg"
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white px-8 py-3"
                  asChild
                >
                  <Link href={`/quote?product=${product.slug}`}>
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Request Quote
                  </Link>
                </Button>
                {product.datasheet && (
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full"
                    asChild
                  >
                    <a
                      href={product.datasheet}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Datasheet
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Product Details - Full Width */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="bg-white border rounded-lg p-8">
                <h2 className="text-2xl font-semibold mb-6 text-gray-900">
                  Product Details
                </h2>
                <div className="prose prose-lg max-w-none">
                  {typeof product.description === "string" ? (
                    <div className="text-gray-700 leading-relaxed">
                      {product.description
                        .split("\n")
                        .map((paragraph, index) => (
                          <p key={index} className="mb-4">
                            {paragraph}
                          </p>
                        ))}
                    </div>
                  ) : product.description &&
                    typeof product.description === "object" ? (
                    <div className="text-gray-700">
                      {documentToReactComponents(product.description)}
                    </div>
                  ) : (
                    <div className="text-gray-700">
                      <p>No description available</p>
                    </div>
                  )}
                </div>

                {/* Specifications */}
                {product.specification && product.specification.length > 0 && (
                  <div className="mt-8 pt-8 border-t">
                    <h3 className="text-xl font-semibold mb-4 text-gray-900">
                      Technical Specifications
                    </h3>
                    <div className="bg-gray-50 rounded-lg p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {product.specification.map(
                          (spec: any, index: number) => (
                            <div
                              key={index}
                              className="flex justify-between py-2 border-b border-gray-200 last:border-b-0"
                            >
                              <span className="font-medium text-gray-900">
                                {spec.name || spec.key}
                              </span>
                              <span className="text-gray-600">
                                {spec.value}
                              </span>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 border rounded-lg p-6 sticky top-8">
                <h3 className="text-lg font-semibold mb-4 text-gray-900">
                  Get Expert Support
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Phone className="w-4 h-4 text-teal-600" />
                    <span>Direct engineer consultation</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Clock className="w-4 h-4 text-teal-600" />
                    <span>Fast response time</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Shield className="w-4 h-4 text-teal-600" />
                    <span>Quality guarantee</span>
                  </div>

                  <div className="pt-4 border-t">
                    <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white mb-3">
                      Contact Our Team
                    </Button>
                    <p className="text-xs text-gray-500 text-center mb-4">
                      Free consultation available
                    </p>
                  </div>

                  {/* Quick Contact */}
                  <div className="pt-4 border-t">
                    <h4 className="font-medium text-gray-900 mb-3">
                      Direct Contact:
                    </h4>
                    <div className="space-y-2">
                      <a
                        href={`tel:${SITE_CONFIG.company.phone}`}
                        className="flex items-center gap-2 text-sm text-gray-700 hover:text-teal-600 transition-colors"
                      >
                        <Phone className="h-4 w-4" />
                        <span>{SITE_CONFIG.company.phone}</span>
                      </a>
                      <a
                        href={`mailto:${SITE_CONFIG.company.email}`}
                        className="flex items-center gap-2 text-sm text-gray-700 hover:text-teal-600 transition-colors"
                      >
                        <Mail className="h-4 w-4" />
                        <span>{SITE_CONFIG.company.email}</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Related Products */}
          {filteredRelated.length > 0 && (
            <div className="mt-16">
              <RelatedProducts products={filteredRelated} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

// Product Image Section Component
function ProductImageSection({ product }: { product: any }) {
  const hasImages = product.images && product.images.length > 0;

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative h-64 lg:h-80 w-full rounded-lg overflow-hidden bg-gray-100">
        {hasImages ? (
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover hover:scale-105 transition-transform duration-300"
            priority
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <Package className="h-16 w-16 text-gray-300" />
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-4 left-4 right-4 flex items-start justify-between">
          <div className="flex flex-col gap-2">
            {product.feature && (
              <Badge className="bg-yellow-500 text-white">
                <Star className="h-3 w-3 mr-1" />
                Featured
              </Badge>
            )}
            <Badge
              className={
                product.inStock
                  ? "bg-green-500 text-white"
                  : "bg-orange-500 text-white"
              }
            >
              {product.inStock ? "In Stock" : "Quote"}
            </Badge>
          </div>
        </div>
      </div>

      {/* Thumbnail Images */}
      {hasImages && product.images.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {product.images.slice(1, 5).map((image: string, index: number) => (
            <div
              key={index}
              className="aspect-square relative bg-gray-100 rounded-md overflow-hidden"
            >
              <Image
                src={image}
                alt={`${product.name} view ${index + 2}`}
                fill
                className="object-cover hover:scale-105 transition-transform duration-200"
                sizes="(max-width: 768px) 25vw, 12vw"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
