import Image from 'next/image';

const brands = [
  { name: 'Omron', logo: '/images/omron-logo.png' },
  { name: 'Mitsubishi', logo: '/images/mitsubishi-logo.png' },
  { name: 'Proface', logo: '/images/proface-logo.png' },
];

export default function BrandShowcase() {
  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Merek Terpercaya Kami</h2>
        <div className="flex flex-wrap justify-center gap-8">
          {brands.map((brand) => (
            <div key={brand.name} className="flex items-center">
              <Image
                src={brand.logo}
                alt={`${brand.name} Logo`}
                width={120}
                height={60}
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
