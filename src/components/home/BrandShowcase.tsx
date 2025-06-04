/* eslint-disable react/no-unescaped-entities */
// src/components/home/BrandShowcase.tsx
import Image from "next/image";
import Link from "next/link";

const BrandShowcase = () => {
  const brands = [
    {
      name: "Mitsubishi",
      logo: "/images/brands/mitsubishi.png",
      slug: "mitsubishi",
    },
    {
      name: "Schneider",
      logo: "/images/brands/schneider.jpg",
      slug: "schneider",
    },
    { name: "Omron", logo: "/images/brands/omron.png", slug: "omron" },
    { name: "Siemens", logo: "/images/brands/siemens.png", slug: "siemens" },
    {
      name: "Allen-bradley",
      logo: "/images/brands/allen-bradley.png",
      slug: "allen-bradley",
    },
    {
      name: "Fuji Electric",
      logo: "/images/brands/Fuji electric.png",
      slug: "fuji-electric",
    },
    { name: "Delta", logo: "/images/brands/delta.png", slug: "delta" },
    { name: "Proface", logo: "/images/brands/proface.jpg", slug: "proface" },
  ];

  return (
    <section className="py-12 bg-white border-b">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-5xl font-bold text-gray-900 mb-2">
            Products Brand
          </h2>
        </div>

        {/* Brand Logos Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6 items-center">
          {brands.map((brand) => (
            <Link
              key={brand.slug}
              href={`/products?brand=${brand.slug}`}
              className="group bg-white rounded-lg p-4 h-24 flex items-center justify-center hover:shadow-md transition-all duration-300 border border-gray-200"
            >
              <Image
                src={brand.logo}
                alt={brand.name}
                width={120}
                height={60}
                className="max-h-12 w-auto object-contain filter "
              />
            </Link>
          ))}
        </div>

        {/* Optional: Scrolling text or additional CTA */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            Can't find your preferred brand?
            <Link
              href="/contact"
              className="text-teal-600 hover:underline ml-1"
            >
              Contact us for availability
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default BrandShowcase;
