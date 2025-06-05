/* eslint-disable react/no-unescaped-entities */
// src/app/products/[slug]/not-found.tsx
import Link from "next/link";
import { Package, ArrowLeft, Search, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE_CONFIG } from "@/lib/contants";

export default function ProductNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16 mt-20">
      <div className="max-w-md mx-auto text-center">
        {/* Icon */}
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Package className="h-12 w-12 text-gray-400" />
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Product Not Found
        </h1>

        {/* Description */}
        <p className="text-gray-600 mb-8">
          Sorry, we couldn't find the product you're looking for. It may have
          been moved, discontinued, or the link might be incorrect.
        </p>

        {/* Actions */}
        <div className="space-y-4 mb-8">
          <Button asChild className="w-full">
            <Link href="/products">
              <Search className="h-4 w-4 mr-2" />
              Browse All Products
            </Link>
          </Button>

          <Button variant="outline" asChild className="w-full">
            <Link href="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Homepage
            </Link>
          </Button>
        </div>

        {/* Help Section */}
        <div className="p-4 bg-gray-50 rounded-lg border">
          <h3 className="font-semibold text-gray-900 mb-3">
            Need Help Finding a Specific Product?
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Our engineering team can help you find the right automation parts
            for your project.
          </p>

          <div className="space-y-2">
            <a
              href={`tel:${SITE_CONFIG.company.phone}`}
              className="flex items-center justify-center gap-2 text-sm text-gray-700 hover:text-teal-600 transition-colors p-2 rounded border hover:border-teal-200"
            >
              <Phone className="h-4 w-4" />
              <span>{SITE_CONFIG.company.phone}</span>
            </a>

            <a
              href={`mailto:${SITE_CONFIG.company.email}`}
              className="flex items-center justify-center gap-2 text-sm text-gray-700 hover:text-teal-600 transition-colors p-2 rounded border hover:border-teal-200"
            >
              <Mail className="h-4 w-4" />
              <span>{SITE_CONFIG.company.email}</span>
            </a>
          </div>
        </div>

        {/* Suggestions */}
        <div className="mt-8 text-sm text-gray-500">
          <p className="mb-2">You might be interested in:</p>
          <div className="flex flex-wrap justify-center gap-2">
            <Link
              href="/products?category=plc"
              className="text-teal-600 hover:text-teal-700"
            >
              PLCs
            </Link>
            <span>•</span>
            <Link
              href="/products?category=inverter"
              className="text-teal-600 hover:text-teal-700"
            >
              Inverters
            </Link>
            <span>•</span>
            <Link
              href="/products?category=hmi"
              className="text-teal-600 hover:text-teal-700"
            >
              HMIs
            </Link>
            <span>•</span>
            <Link
              href="/products?category=safety-relay"
              className="text-teal-600 hover:text-teal-700"
            >
              Safety Relays
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
