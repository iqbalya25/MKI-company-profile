// src/app/page.tsx - OPTIMIZED HOMEPAGE STRUCTURE
import { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import {
  getFeaturedProducts,
  getProductCategories,
  getServices,
} from "@/lib/contentful";
import { TARGET_KEYWORDS } from "@/lib/contants";
import CategoryShowcase from "@/components/home/CategoryShowcase";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import ServicesHighlight from "@/components/home/ServicesHighlight";
// import ClientLogos from "@/components/home/ClientLogos";
import CTASection from "@/components/home/CTASection";
import BrandShowcase from "@/components/home/BrandShowcase";

export const metadata: Metadata = {
  title:
    "Supplier Industrial Automation Parts + Technical Support | Mederi Karya Indonesia",
  description:
    "Supplier automation parts terpercaya: PLC Mitsubishi, Inverter Schneider, HMI Proface, Safety Relay dengan technical support. Parameter setting, commissioning, engineering consultation Jakarta.",
  keywords: [
    ...TARGET_KEYWORDS.primary,
    ...TARGET_KEYWORDS.secondary.slice(0, 3),
    "mederi karya indonesia",
    "automation parts bekasi",
  ],
};

export default async function HomePage() {
  // Fetch data
  const [featuredProducts, categories, services] = await Promise.all([
    getFeaturedProducts(6),
    getProductCategories(),
    getServices({ limit: 10 }), // ADD THIS LINE
  ]);

  return (
    <>
      {/* SECTION 1: Hero Section */}
      <HeroSection />

      {/* SECTION 2: Trust Indicators (Move up for credibility) */}
      {/* <section className="py-8 bg-gray-50 border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-teal-600">8+</div>
              <div className="text-sm text-gray-600">Years Experience</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-teal-600">500+</div>
              <div className="text-sm text-gray-600">Products Available</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-teal-600">24/7</div>
              <div className="text-sm text-gray-600">Technical Support</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-teal-600">100+</div>
              <div className="text-sm text-gray-600">Happy Clients</div>
            </div>
          </div>
        </div>
      </section> */}

      {/* SECTION 2: brand Showcase */}
      <BrandShowcase />

      {/* SECTION 3: Product Categories (Primary focus) */}
      <CategoryShowcase categories={categories} />

      {/* SECTION 4: Why Choose Us (Value Proposition) */}
      <WhyChooseUs />

      {/* SECTION 5: Services Highlight */}
      <ServicesHighlight services={services} />

      {/* SECTION 6: Featured Products (Only if available) */}
      {featuredProducts.length > 0 && (
        <FeaturedProducts products={featuredProducts} />
      )}

      {/* SECTION 7: Client Logos (Social Proof) */}
      {/* <ClientLogos /> */}

      {/* SECTION 8: Final CTA */}
      <CTASection />

      {/* SEO Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Supplier Industrial Automation Parts + Technical Support",
            description:
              "Supplier automation parts terpercaya dengan engineering services: PLC, HMI, Inverter, Safety Relay. Technical support, parameter setting, commissioning.",
            url: "https://mederikaryaindonesia.com",
            mainEntity: {
              "@type": "Organization",
              name: "Mederi Karya Indonesia",
              description:
                "Supplier automation parts dengan technical support profesional",
              serviceArea: "Indonesia",
              areaServed: ["Jakarta", "Surabaya", "Bandung", "Tangerang"],
            },
          }),
        }}
      />
    </>
  );
}
