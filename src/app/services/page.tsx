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
      {" "}
      {/* Fixed navbar overlap */}
      <div className="container mx-auto px-4 py-8">
        <Breadcrumb
          items={[
            { name: "Home", url: "/" },
            { name: "Services", url: "/services" },
          ]}
        />

        {/* Header Section */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mt-6 mb-2">Engineering Services</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Professional automation services with expert technical support. From
            parameter setting to complete commissioning, we ensure your systems
            perform optimally.
          </p>
        </div>

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
            {(featuredServices.length > 0 ? regularServices : services).map(
              (service) => (
                <ServiceCard key={service.id} service={service} />
              )
            )}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-blue-50 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-semibold mb-4">
            Need Custom Engineering Solutions?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Every automation project is unique. Contact our engineering team to
            discuss your specific requirements and get professional
            consultation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
              Schedule Consultation
            </button>
            <Link
              href="/contact"
              className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors"
            >
              Contact Engineering Team
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
