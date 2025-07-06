/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
// src/components/home/BrandShowcase.tsx - SIMPLIFIED VERSION
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const BrandShowcase = () => {
  const brands = [
    {
      name: "Mitsubishi",
      logo: "/images/brands/mitsubishi.png",
      slug: "mitsubishi",
      description: "Japanese precision engineering",
    },
    {
      name: "Schneider",
      logo: "/images/brands/schneider.png",
      slug: "schneider",
      description: "Global automation leader",
    },
    {
      name: "Omron",
      logo: "/images/brands/omron.png",
      slug: "omron",
      description: "Innovation in automation",
    },
    {
      name: "Siemens",
      logo: "/images/brands/siemens.png",
      slug: "siemens",
      description: "German engineering excellence",
    },
    {
      name: "Allen-Bradley",
      logo: "/images/brands/allen-bradley.png",
      slug: "allen-bradley",
      description: "American industrial solutions",
    },
    {
      name: "Fuji Electric",
      logo: "/images/brands/Fuji electric.png",
      slug: "fuji-electric",
      description: "Power & energy systems",
    },
    {
      name: "Delta",
      logo: "/images/brands/delta.png",
      slug: "delta",
      description: "Smart green solutions",
    },
    {
      name: "Proface",
      logo: "/images/brands/proface.png",
      slug: "proface",
      description: "HMI technology expert",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Simple Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Products Brand
          </h2>
        </div>

        {/* Simplified Brand Grid - Mobile Optimized */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6 md:gap-8">
          {brands.map((brand, index) => (
            <Link
              key={brand.slug}
              href={`/products?brand=${brand.slug}`}
              className="group"
            >
              <div className="bg-white rounded-xl p-6 md:p-8 h-32 md:h-36 flex items-center justify-center transition-all duration-300 border border-gray-100 hover:border-teal-200 hover:shadow-xl hover:scale-105 hover:-translate-y-1">
                {/* Logo - Mobile Optimized Sizes */}
                <Image
                  src={brand.logo}
                  alt={brand.name}
                  width={160}
                  height={80}
                  className="max-h-12 md:max-h-16 w-auto object-contain transition-all duration-300 group-hover:scale-110 "
                />
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom CTA - Simplified */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Looking for a specific brand or model?
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 font-medium group"
          >
            <span>Contact us for availability</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BrandShowcase;
