import { Metadata } from "next";
import { getServices } from "@/lib/contentful";
import ServiceCard from "@/components/services/ServiceCard";
import Breadcrumb from "@/components/common/Breadcrumb";
import { TARGET_KEYWORDS } from "@/lib/contants";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Engineering Services + Technical Support | Mederi Karya Indonesia",
  description:
    "Professional automation services: Parameter setting, commissioning, technical training, troubleshooting. Expert engineering support for industrial automation Jakarta, Surabaya.",
  keywords: [
    ...TARGET_KEYWORDS.primary,
    "automation services indonesia",
    "parameter setting service",
    "commissioning plc hmi",
    "technical training automation",
    "engineering consultation jakarta",
    "troubleshooting support",
    "industrial automation service",
  ],
  openGraph: {
    title: "Engineering Services + Technical Support | Mederi Karya Indonesia",
    description:
      "Professional automation services with expert technical support for industrial applications.",
    url: "/services",
    type: "website",
  },
  alternates: {
    canonical: "/services",
  },
};

export default async function ServicesPage() {
  const services = await getServices();
  const featuredServices = services.filter((service) => service.featured);
  const regularServices = services.filter((service) => !service.featured);

  return (
    <div className="mt-20">
      {/* Header Section - Teal Background like Products page */}
      <div className="bg-teal-600 text-white py-8">
        <div className="container mx-auto px-4">
          <Breadcrumb
            items={[
              { name: "Home", url: "/" },
              { name: "Services", url: "/services" },
            ]}
            className="mb-8 [&_a]:text-teal-200 [&_a:hover]:text-white [&_span]:text-white"
          />

          <div className="max-w-4xl">
            <h1 className="text-3xl lg:text-4xl font-bold mb-4">
              Engineering Services
            </h1>
            <p className="text-xl text-teal-100 mb-4">
              + Technical Support & Engineering Services
            </p>
            <p className="text-lg text-teal-200 max-w-2xl">
              Professional automation services with expert technical support.
              From parameter setting to complete commissioning, we ensure your
              systems perform optimally.
            </p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-8">
        {/* Featured Services */}
        {featuredServices.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 text-center">
              Featured Services
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredServices.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </div>
        )}

        {/* All Services */}
        <div>
          <h2 className="text-2xl font-semibold mb-6 text-center">
            {featuredServices.length > 0 ? "All Services" : "Our Services"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center bg-gray-50 rounded-lg p-8">
          <h3 className="text-2xl font-semibold mb-4">
            Need Custom Engineering Solutions?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Our experienced engineers provide tailored automation solutions for
            your specific industrial requirements.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-colors"
          >
            Get Expert Consultation
          </Link>
        </div>
      </div>
    </div>
  );
}
