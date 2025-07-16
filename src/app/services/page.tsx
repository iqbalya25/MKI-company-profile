/* eslint-disable @typescript-eslint/no-unused-vars */
import { Metadata } from "next";
import { getServices } from "@/lib/contentful";
import ServiceCard from "@/components/services/ServiceCard";
import Breadcrumb from "@/components/common/Breadcrumb";
import { SITE_CONFIG, TARGET_KEYWORDS } from "@/lib/contants";
import Link from "next/link";
import {
  ArrowRight,
  Clock,
  Mail,
  MessageSquare,
  Phone,
  Settings,
  Shield,
  Users,
} from "lucide-react";
import { getCanonicalUrl } from "@/lib/url";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Engineering Services + Technical Support | Mederi Karya Indonesia",
  description:
    "Professional automation services: Parameter setting, commissioning, technical training, troubleshooting. Expert engineering support for industrial automation Jakarta, Surabaya.",
  keywords: [
    ...TARGET_KEYWORDS.primary,
    "automation services indonesia",
    "parameter setting inverter",
    "programming hmi",
    "programming hmi proface",
    "instalasi panel baru",
    "instalasi panel PLC",
    "instalasi panel Inverter",
    "instalasi panel HMI",
    "commissioning plc hmi",
    "programming plc",
     "programming hmi",
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

            {/* Enhanced Single Button with proper spacing */}
            <Link
              href="/contact"
              className="group relative inline-flex items-center justify-center px-8 py-4 bg-white text-teal-600 font-semibold rounded-lg hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 mb-10"
            >
              <Settings className="h-5 w-5 mr-2" />
              <span>Get Engineering Consultation</span>
              <ArrowRight className="h-5 w-5 ml-2 transition-transform duration-300 group-hover:translate-x-2" />

              {/* Shine effect on hover */}
              <div className="absolute inset-0 rounded-lg overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              </div>
            </Link>

            {/* Contact Information Card */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 max-w-5xl mx-auto">
              <h3 className="text-white font-semibold mb-6 text-lg">
                Direct Contact Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Phone Contact */}
                <a
                  href={`tel:${SITE_CONFIG.company.phone}`}
                  className="group flex items-center gap-3 p-4 rounded-lg hover:bg-white/10 transition-all duration-300 transform hover:scale-105"
                >
                  <div className="flex-shrink-0">
                    <Phone className="h-6 w-6 text-teal-200 group-hover:rotate-12 transition-transform duration-300" />
                  </div>
                  <div className="text-left min-w-0">
                    <p className="text-xs text-teal-200 uppercase tracking-wide mb-1">
                      Call Direct
                    </p>
                    <p className="font-semibold text-white text-sm group-hover:text-teal-100 transition-colors">
                      {SITE_CONFIG.company.phone}
                    </p>
                  </div>
                </a>

                {/* Email Contact */}
                <a
                  href={`mailto:${SITE_CONFIG.company.email}`}
                  className="group flex items-center gap-3 p-4 rounded-lg hover:bg-white/10 transition-all duration-300 transform hover:scale-105"
                >
                  <div className="flex-shrink-0">
                    <Mail className="h-6 w-6 text-teal-200 group-hover:rotate-12 transition-transform duration-300" />
                  </div>
                  <div className="text-left min-w-0">
                    <p className="text-xs text-teal-200 uppercase tracking-wide mb-1">
                      Email Us
                    </p>
                    <p className="font-semibold text-white text-sm group-hover:text-teal-100 transition-colors truncate">
                      {SITE_CONFIG.company.email}
                    </p>
                  </div>
                </a>

                {/* WhatsApp Contact */}
                <a
                  href="https://wa.me/6285210067755?text=Halo Mederi Karya, saya membutuhkan technical support untuk automation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 p-4 rounded-lg hover:bg-white/10 transition-all duration-300 transform hover:scale-105"
                >
                  <div className="flex-shrink-0">
                    <MessageSquare className="h-6 w-6 text-teal-200 group-hover:rotate-12 transition-transform duration-300" />
                  </div>
                  <div className="text-left min-w-0">
                    <p className="text-xs text-teal-200 uppercase tracking-wide mb-1">
                      WhatsApp
                    </p>
                    <p className="font-semibold text-white text-sm group-hover:text-teal-100 transition-colors">
                      Iqbal - 085210067755
                    </p>
                  </div>
                </a>
              </div>

              {/* Additional Info */}
              <div className="mt-6 pt-6 border-t border-white/20">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-teal-100">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>Response within 2 hours</span>
                  </div>
                  <div className="hidden sm:block w-1 h-1 bg-teal-200 rounded-full"></div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span>8+ Years Experience</span>
                  </div>
                  <div className="hidden sm:block w-1 h-1 bg-teal-200 rounded-full"></div>
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    <span>Certified Solutions</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
