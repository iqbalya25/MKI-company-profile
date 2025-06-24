/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/products/[slug]/page.tsx - UPDATED TO SUPPORT RICH TEXT
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { 
  ArrowRight, 
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
  Mail
} from "lucide-react";
import { getProductBySlug, getProducts } from "@/lib/contentful";
import { generateProductSchema, generateBreadcrumbSchema } from "@/lib/schema";
import { SITE_CONFIG } from "@/lib/contants";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Breadcrumb from "@/components/common/Breadcrumb";
import RelatedProducts from "@/app/products/RelatedProducts";
import ProductSpecs from "@/app/products/ProductSpecs";
// NEW IMPORT: Import the new RichTextRenderer component
import RichTextRenderer from "@/components/common/RichTextRenderer";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  
  if (!product) {
    return {
      title: "Product Not Found | Mederi Karya Indonesia",
      description: "The requested product could not be found.",
    };
  }

  const title = product.seoTitle || `${product.name} + Technical Support | Mederi Karya Indonesia`;
  const description = product.seoDescription || 
    `${product.name} - ${product.brand} ${product.model}. ${product.description.substring(0, 120)}... Parameter setting, technical support available.`;

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
      images: product.images.length > 0 ? [
        {
          url: product.images[0],
          width: 800,
          height: 600,
          alt: product.name,
        }
      ] : [],
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
    limit: 4 
  });
  
  // Filter out current product from related
  const filteredRelated = relatedProducts.filter(p => p.id !== product.id);

  // Breadcrumb data
  const breadcrumbItems = [
    { name: "Home", url: "/" },
    { name: "Products", url: "/products" },
    { name: product.category, url: `/products?category=${product.category.toLowerCase().replace(/\s+/g, '-')}` },
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

      {/* Page Header */}
      <div className="bg-white py-6 mt-20 border-b">
        <div className="container mx-auto px-4">
          <Breadcrumb items={breadcrumbItems} />
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <div>
            <ProductImageGallery images={product.images} productName={product.name} />
          </div>

          {/* Product Info */}
          <div>
            <ProductInfo product={product} />
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mb-16">
          {/* UPDATED: Pass the product to the new component */}
          <ProductDetailsTabs product={product} />
        </div>

        {/* Technical Support Section */}
        <div className="mb-16">
          <TechnicalSupportSection />
        </div>

        {/* Related Products */}
        {filteredRelated.length > 0 && (
          <RelatedProducts products={filteredRelated} />
        )}
      </div>
    </>
  );
}

// Product Image Gallery Component - NO CHANGES
function ProductImageGallery({ images, productName }: { images: string[]; productName: string }) {
  if (images.length === 0) {
    return (
      <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
        <Package className="h-24 w-24 text-gray-300" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="aspect-square relative bg-gray-50 rounded-lg overflow-hidden">
        <Image
          src={images[0]}
          alt={productName}
          fill
          className="object-cover hover:scale-105 transition-transform duration-300"
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      {/* Thumbnail Images */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {images.slice(1, 5).map((image, index) => (
            <div key={index} className="aspect-square relative bg-gray-50 rounded-md overflow-hidden">
              <Image
                src={image}
                alt={`${productName} view ${index + 2}`}
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

// Product Info Component - NO CHANGES
function ProductInfo({ product }: { product: any }) {
  return (
    <div className="space-y-6">
      {/* Brand & Category */}
      <div className="flex items-center gap-2">
        <Badge variant="outline">{product.brand}</Badge>
        <Badge variant="secondary">{product.category}</Badge>
        {product.feature && (
          <Badge className="bg-yellow-500">
            <Star className="h-3 w-3 mr-1" />
            Featured
          </Badge>
        )}
      </div>

      {/* Product Name */}
      <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
        {product.name}
      </h1>

      {/* Model */}
      <p className="text-lg text-gray-600">
        Model: <span className="font-semibold text-gray-900">{product.model}</span>
      </p>

      {/* Stock Status */}
      <div className="flex items-center gap-2">
        {product.inStock ? (
          <div className="flex items-center gap-2 text-green-600">
            <CheckCircle className="h-5 w-5" />
            <span className="font-medium">Available for immediate shipping</span>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-orange-600">
            <AlertCircle className="h-5 w-5" />
            <span className="font-medium">Contact for availability & lead time</span>
          </div>
        )}
      </div>

      {/* Price */}
      <div className="p-4 bg-gray-50 rounded-lg">
        {product.showPrice && product.price ? (
          <div>
            <div className="text-3xl font-bold text-gray-900 mb-2">
              {formatPrice(product.price)}
            </div>
            <p className="text-sm text-gray-600">
              Price includes basic technical consultation
            </p>
          </div>
        ) : (
          <div>
            <div className="text-lg font-semibold text-gray-900 mb-2">
              Contact for Competitive Pricing
            </div>
            <p className="text-sm text-gray-600">
              We offer the best prices with comprehensive technical support
            </p>
          </div>
        )}
      </div>

      {/* Services Included */}
      <div className="p-4 bg-teal-50 rounded-lg border border-teal-200">
        <h3 className="font-semibold text-teal-900 mb-3">Services Included:</h3>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-teal-800">
            <Settings className="h-4 w-4" />
            <span>Parameter Setting & Configuration</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-teal-800">
            <Headphones className="h-4 w-4" />
            <span>24/7 Technical Support</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-teal-800">
            <FileText className="h-4 w-4" />
            <span>Installation Documentation</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <Button size="lg" className="w-full" asChild>
          <Link href={`/quote?product=${product.slug}`}>
            <ShoppingCart className="h-5 w-5 mr-2" />
            Request Quote
          </Link>
        </Button>
        <div className="grid grid-cols-2 gap-3">
          <Button size="lg" variant="outline" asChild>
            <Link href="/contact">
              Technical Consultation
            </Link>
          </Button>
          {product.datasheet && (
            <Button size="lg" variant="outline" asChild>
              <a href={product.datasheet} target="_blank" rel="noopener noreferrer">
                <Download className="h-4 w-4 mr-2" />
                Datasheet
              </a>
            </Button>
          )}
        </div>
      </div>

      {/* Quick Contact */}
      <div className="p-4 bg-gray-50 rounded-lg border">
        <h4 className="font-semibold text-gray-900 mb-3">Need Immediate Help?</h4>
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
  );
}

// UPDATED: Product Details Tabs Component - Now uses RichTextRenderer
function ProductDetailsTabs({ product }: { product: any }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      {/* Tab Content */}
      <div className="p-6">
        {/* Description - UPDATED: Now handles rich text properly */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Product Description</h2>
          <div className="bg-gray-50 rounded-lg p-6">
            {/* NEW: Use RichTextRenderer for proper rich text display */}
            {product.description && typeof product.description === 'object' ? (
              // If description is rich text object from Contentful
              <RichTextRenderer 
                content={product.description} 
                className="text-gray-700"
              />
            ) : (
              // Fallback for plain text descriptions
              <div className="prose max-w-none text-gray-700">
                <p>{product.description || 'No description available.'}</p>
              </div>
            )}
          </div>
        </div>

        {/* Specifications */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Technical Specifications</h2>
          <ProductSpecs specifications={product.specification} />
        </div>

        {/* Applications */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Applications</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["Manufacturing", "Pharmaceutical", "Food Processing", "Automotive"].map((app) => (
              <div key={app} className="p-3 bg-gray-50 rounded-lg text-center">
                <span className="text-sm font-medium text-gray-700">{app}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Technical Support Section Component - NO CHANGES
function TechnicalSupportSection() {
  return (
    <div className="bg-gradient-to-br from-teal-600 to-teal-700 rounded-2xl p-8 text-white">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-2xl font-bold mb-4">Need Technical Support?</h2>
        <p className="text-teal-100 mb-6">
          Our engineering team provides comprehensive technical support including parameter setting, 
          commissioning, troubleshooting, and training services.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-white text-teal-600 hover:bg-gray-100" asChild>
            <Link href="/contact">
              Free Technical Consultation
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-teal-600" asChild>
            <Link href="/services">
              View All Services
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}