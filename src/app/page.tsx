// File: src/app/page.tsx - COMPLETE HOMEPAGE
import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import HeroSection from "@/components/home/HeroSection";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import TrustSignals from "@/components/home/TrustSignals";
import { getFeaturedProducts, getProductCategories } from "@/lib/contentful";
import { PRODUCT_CATEGORIES, TARGET_KEYWORDS } from "@/lib/contants";


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
  openGraph: {
    title:
      "Mederi Karya Indonesia - Supplier Automation Parts + Engineering Services",
    description:
      "Supplier PLC, HMI, Inverter, Safety Relay terpercaya di Indonesia. Technical support, parameter setting, commissioning service. Jakarta, Surabaya, Bandung.",
    type: "website",
  },
};

export default async function HomePage() {
  // Fetch data for the homepage
  const [featuredProducts, categories] = await Promise.all([
    getFeaturedProducts(6),
    getProductCategories(),
  ]);

  return (
    <>
      {/* Hero Section */}
      <HeroSection />

      {/* Featured Products Section */}
      <FeaturedProducts products={featuredProducts} />

      {/* Product Categories Showcase */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary-900 mb-4">
              Product Categories + Engineering Services
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Lengkapi kebutuhan industrial automation Anda dengan produk
              berkualitas dan technical support profesional dari tim engineering
              berpengalaman
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {PRODUCT_CATEGORIES.map((category) => {
              const categoryData = categories.find(
                (cat) => cat.slug === category.slug
              );
              const productCount = categoryData?.count || 0;

              return (
                <div
                  key={category.slug}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="font-semibold text-lg text-primary-900 group-hover:text-primary-600 transition-colors">
                      {category.name}
                    </h3>
                    <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary-600 transition-colors" />
                  </div>

                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                    {category.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      {productCount > 0
                        ? `${productCount} products`
                        : "Products available"}
                    </span>
                    <Link
                      href={`/products?category=${category.slug}`}
                      className="text-primary-600 hover:text-primary-700 font-medium text-sm flex items-center group-hover:gap-2 transition-all"
                    >
                      View Products
                      <ArrowRight className="h-3 w-3 ml-1 group-hover:ml-0 transition-all" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Categories CTA */}
          <div className="text-center">
            <Button size="lg" variant="outline" asChild>
              <Link href="/products">
                Explore All Categories
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <TrustSignals />

      {/* Services Highlight Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary-900 mb-4">
              Engineering Services
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Bukan hanya supplier parts, kami juga menyediakan engineering
              services komprehensif untuk mendukung project automation Anda
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="text-center p-6 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors">
              <div className="bg-primary-600 text-white p-3 rounded-lg w-fit mx-auto mb-4">
                <span className="text-2xl">⚙️</span>
              </div>
              <h3 className="font-semibold text-primary-900 mb-2">
                Parameter Setting
              </h3>
              <p className="text-sm text-muted-foreground">
                Konfigurasi inverter, PLC programming, HMI setup sesuai aplikasi
              </p>
            </div>

            <div className="text-center p-6 bg-success-50 rounded-lg hover:bg-success-100 transition-colors">
              <div className="bg-success-600 text-white p-3 rounded-lg w-fit mx-auto mb-4">
                <span className="text-2xl">🔧</span>
              </div>
              <h3 className="font-semibold text-primary-900 mb-2">
                Commissioning
              </h3>
              <p className="text-sm text-muted-foreground">
                Installation, testing, startup dan validation system automation
              </p>
            </div>

            <div className="text-center p-6 bg-accent-50 rounded-lg hover:bg-accent-100 transition-colors">
              <div className="bg-accent-600 text-white p-3 rounded-lg w-fit mx-auto mb-4">
                <span className="text-2xl">🎧</span>
              </div>
              <h3 className="font-semibold text-primary-900 mb-2">
                Technical Support
              </h3>
              <p className="text-sm text-muted-foreground">
                Troubleshooting, maintenance, dan consultation engineering 24/7
              </p>
            </div>

            <div className="text-center p-6 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors">
              <div className="bg-orange-600 text-white p-3 rounded-lg w-fit mx-auto mb-4">
                <span className="text-2xl">🎓</span>
              </div>
              <h3 className="font-semibold text-primary-900 mb-2">Training</h3>
              <p className="text-sm text-muted-foreground">
                Operator training dan knowledge transfer untuk tim maintenance
              </p>
            </div>
          </div>

          <div className="text-center">
            <Button size="lg" asChild>
              <Link href="/services">
                Learn More About Our Services
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 bg-primary-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Siap untuk Meningkatkan Automation System Anda?
          </h2>
          <p className="text-primary-100 text-lg mb-8 max-w-2xl mx-auto">
            Dapatkan consultation gratis dari tim engineering kami. Kami siap
            membantu memilih automation parts yang tepat dan menyediakan
            technical support terbaik untuk project industri Anda.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/quote">
                Get Quote Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-primary-600"
              asChild
            >
              <Link href="/contact">Engineering Consultation</Link>
            </Button>
          </div>

          {/* Contact Information */}
          <div className="mt-8 p-6 bg-primary-700 rounded-lg max-w-md mx-auto">
            <h3 className="text-white font-semibold mb-2">
              Hubungi Engineering Team
            </h3>
            <p className="text-primary-100 text-sm mb-2">
              Fast response untuk technical consultation
            </p>
            <p className="text-white font-bold">+62-852-1006-7755</p>
          </div>
        </div>
      </section>

      {/* SEO Schema for HomePage */}
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
