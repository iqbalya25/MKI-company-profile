/* eslint-disable @typescript-eslint/no-unused-vars */
import { Metadata } from "next";
import { getServices } from "@/lib/contentful";
import ServiceCard from "@/components/services/ServiceCard";
import Breadcrumb from "@/components/common/Breadcrumb";
import { TARGET_KEYWORDS } from "@/lib/contants";
import Link from "next/link";
import { ArrowRight, Clock, Settings, Shield, Users } from "lucide-react";
import { getCanonicalUrl } from "@/lib/url";

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
    title: "Engineering Services + Technical Support | Mederi Karya",
    description:
      "Professional automation services with expert technical support for industrial applications.",
    url: "/services",
    type: "website",
  },
  alternates: {
    canonical: getCanonicalUrl("/services"),
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
              + Technical Support & Consultation
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
            <h2 className="text-3xl font-semibold mb-6 py-8 text-center">
              Featured Services
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredServices.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Enhanced CTA Section - Products Page Style */}
      <section className="py-16 bg-teal-600 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 20% 50%, white 1px, transparent 1px),
                               radial-gradient(circle at 80% 80%, white 1px, transparent 1px)`,
              backgroundSize: "50px 50px",
            }}
          />
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-10 right-10 w-64 h-64 bg-teal-500 rounded-full blur-3xl opacity-20 animate-pulse" />
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-teal-400 rounded-full blur-3xl opacity-20 animate-pulse" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Need Custom Engineering Solutions?
            </h2>
            <p className="text-xl text-teal-100 mb-10 leading-relaxed">
              Our experienced engineers provide tailored automation solutions
              for your specific industrial requirements. Get expert consultation
              today.
            </p>

            {/* Enhanced Single Button */}
            <Link
              href="/contact"
              className="group relative inline-flex items-center justify-center px-8 py-4 bg-white text-teal-600 font-semibold rounded-lg hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <Settings className="h-5 w-5 mr-2" />
              <span>Get Expert Consultation</span>
              <ArrowRight className="h-5 w-5 ml-2 transition-transform duration-300 group-hover:translate-x-2" />

              {/* Shine effect on hover */}
              <div className="absolute inset-0 rounded-lg overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              </div>
            </Link>

            {/* Trust Indicators */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mt-12 text-teal-100">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <span className="text-sm">Response within 2 hours</span>
              </div>
              {/* <div className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                <span className="text-sm">8+ Years Experience</span>
              </div> */}
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                <span className="text-sm">Experienced Engineer</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
