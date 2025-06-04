/* eslint-disable @typescript-eslint/no-unused-vars */
// src/components/home/BrandShowcase.tsx
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
      logo: "/images/brands/schneider.jpg",
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
      logo: "/images/brands/proface.jpg",
      slug: "proface",
      description: "HMI technology expert",
    },
  ];

  return (
    <section className="mt-12 py-16 bg-white relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-[0.01]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(90deg, #e5e7eb 1px, transparent 1px),
              linear-gradient(180deg, #e5e7eb 1px, transparent 1px)
            `,
            backgroundSize: "100px 100px",
          }}
        />
      </div>

      {/* Top Gradient Line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-teal-500 to-transparent opacity-20" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header - Enhanced */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-teal-500" />
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Products
              <span className="text-teal-600"> Brand</span>
            </h2>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-teal-500" />
          </div>
        </div>

        {/* Brands Container with Border */}
        <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
          {/* Inner Border Decoration */}
          <div className="relative">
            {/* Corner Accents */}
            <div className="absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 border-teal-500 rounded-tl-lg" />
            <div className="absolute -top-4 -right-4 w-8 h-8 border-t-2 border-r-2 border-teal-500 rounded-tr-lg" />
            <div className="absolute -bottom-4 -left-4 w-8 h-8 border-b-2 border-l-2 border-teal-500 rounded-bl-lg" />
            <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b-2 border-r-2 border-teal-500 rounded-br-lg" />

            {/* Brand Logos Grid - Enhanced */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6 p-4">
              {brands.map((brand, index) => (
                <Link
                  key={brand.slug}
                  href={`/products?brand=${brand.slug}`}
                  className="group relative"
                >
                  <div className="bg-white rounded-xl p-6 h-28 flex items-center justify-center transition-all duration-300 border border-gray-100 hover:border-teal-200 hover:shadow-lg hover:-translate-y-1 relative overflow-hidden">
                    {/* Hover Background Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-teal-50 to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Logo */}
                    <Image
                      src={brand.logo}
                      alt={brand.name}
                      width={100}
                      height={50}
                      className="max-h-10 w-auto object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300 relative z-10"
                    />

                    {/* Hover Tooltip */}
                    <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 group-hover:-bottom-8 transition-all duration-300 whitespace-nowrap pointer-events-none">
                      {brand.description}
                      <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
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

      {/* Bottom Gradient Line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-20" />
    </section>
  );
};

export default BrandShowcase;
