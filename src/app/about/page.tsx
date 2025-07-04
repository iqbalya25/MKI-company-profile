/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
// src/app/about/page.tsx - COMPLETE ABOUT PAGE
import { Metadata } from "next";
import Link from "next/link";
import {
  Award,
  Users,
  Clock,
  Target,
  CheckCircle,
  Settings,
  Wrench,
  GraduationCap,
  MapPin,
  Phone,
  Mail,
  ArrowRight,
  Shield,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE_CONFIG } from "@/lib/contants";

export const metadata: Metadata = {
  title: "About Mederi Karya Indonesia - 8+ Years Automation Expertise",
  description:
    "Professional automation supplier with 8+ years engineering experience. Technical support, parameter setting, commissioning services. Trusted partner for industrial automation Indonesia.",
  keywords: [
    "about mederi karya indonesia",
    "automation company indonesia",
    "engineering expertise automation",
    "industrial automation supplier",
    "plc programming services",
    "technical support automation",
    "bekasi automation company",
  ],
  openGraph: {
    title: "About Mederi Karya Indonesia - Automation Engineering Excellence",
    description:
      "8+ years of engineering expertise in industrial automation. Professional technical support and quality products.",
    url: "/about",
    type: "website",
  },
};

export default function AboutPage() {
  const achievements = [
    { number: "8+", label: "Years Experience", icon: Clock },
    { number: "500+", label: "Products Available", icon: Settings },
    { number: "100+", label: "Happy Customers", icon: Users },
    { number: "24/7", label: "Technical Support", icon: Wrench },
  ];

  const services = [
    {
      icon: Settings,
      title: "Parameter Setting",
      description:
        "Expert configuration of inverters, PLCs, and HMIs for optimal performance",
    },
    {
      icon: Wrench,
      title: "Commissioning",
      description: "Complete system testing, startup, and validation services",
    },
    {
      icon: GraduationCap,
      title: "Technical Training",
      description: "Operator and maintenance training for your technical team",
    },
    {
      icon: CheckCircle,
      title: "Quality Assurance",
      description: "Rigorous testing and documentation for all installations",
    },
  ];

  const values = [
    {
      title: "Engineering Excellence",
      description:
        "We believe in delivering solutions that exceed expectations through deep technical expertise and attention to detail.",
    },
    {
      title: "Customer Success",
      description:
        "Your success is our priority. We provide comprehensive support to ensure your automation systems perform optimally.",
    },
    {
      title: "Continuous Learning",
      description:
        "We stay current with the latest automation technologies to provide you with cutting-edge solutions.",
    },
    {
      title: "Reliable Partnership",
      description:
        "Building long-term relationships through consistent quality, honest communication, and dependable service.",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="bg-teal-600 text-white py-20 mt-20 relative overflow-hidden">
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
        <div className="absolute top-20 right-10 w-72 h-72 bg-teal-500 rounded-full blur-3xl opacity-20 animate-pulse" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-teal-400 rounded-full blur-3xl opacity-20 animate-pulse" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Engineering Excellence in
              <span className="block text-teal-200">Industrial Automation</span>
            </h1>
            <p className="text-xl text-teal-100 mb-10 leading-relaxed">
              For over 8 years, Mederi Karya Indonesia has been providing
              professional automation solutions with comprehensive technical
              support. We combine quality products with expert engineering
              services.
            </p>

            {/* Enhanced CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              {/* Primary Button - Get Technical Consultation */}
              <Link
                href="/contact"
                className="group relative inline-flex items-center justify-center px-8 py-4 bg-white text-teal-600 font-semibold rounded-lg hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <Users className="h-5 w-5 mr-2" />
                <span>Get Technical Consultation</span>
                <ArrowRight className="h-5 w-5 ml-2 transition-transform duration-300 group-hover:translate-x-2" />

                {/* Shine effect on hover */}
                <div className="absolute inset-0 rounded-lg overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                </div>
              </Link>

              {/* Secondary Button - Our Services */}
              <Link
                href="/services"
                className="group relative inline-flex items-center justify-center px-8 py-4 bg-transparent text-white font-semibold rounded-lg border-2 border-white hover:bg-white hover:text-teal-600 transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <Settings className="h-5 w-5 mr-2" />
                <span>Our Services</span>
                <ArrowRight className="h-5 w-5 ml-2 transition-transform duration-300 group-hover:translate-x-2" />
              </Link>
            </div>

            {/* Trust Indicators */}
            {/* <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-teal-100">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <span className="text-sm">Response within 2 hours</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                <span className="text-sm">8+ Years Experience</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                <span className="text-sm">Certified Solutions</span>
              </div>
            </div> */}
          </div>
        </div>
      </section>

      {/* Achievement Stats */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-8 w-8 text-teal-600" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    {achievement.number}
                  </div>
                  <div className="text-sm text-gray-600">
                    {achievement.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Our Story
              </h2>
              <p className="text-lg text-gray-600">
                Building automation excellence through engineering expertise
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  From Engineering Experience to Automation Excellence
                </h3>
                <div className="space-y-4 text-gray-600">
                  <p>
                    Mederi Karya Indonesia was founded with a simple vision: to
                    provide industrial automation solutions that combine quality
                    products with genuine engineering expertise. With over 8
                    years of hands-on experience in the automation industry, we
                    understand the challenges businesses face.
                  </p>
                  <p>
                    Our founder's background includes 2 years at PT. Prestasi
                    Jaya Maju, a successful automation parts company, where
                    valuable insights were gained into customer needs and
                    technical support requirements.
                  </p>
                  <p>
                    Today, we serve manufacturing companies, pharmaceutical
                    facilities, food processing plants, and automotive
                    manufacturers across Indonesia, providing not just products,
                    but complete technical solutions.
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="bg-white p-8 rounded-xl shadow-lg">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center">
                      <Award className="h-12 w-12 text-teal-600 mx-auto mb-3" />
                      <h4 className="font-semibold text-gray-900 mb-1">
                        Certified
                      </h4>
                      <p className="text-sm text-gray-600">
                        Engineering expertise
                      </p>
                    </div>
                    <div className="text-center">
                      <Target className="h-12 w-12 text-blue-600 mx-auto mb-3" />
                      <h4 className="font-semibold text-gray-900 mb-1">
                        Focused
                      </h4>
                      <p className="text-sm text-gray-600">Customer success</p>
                    </div>
                    <div className="text-center">
                      <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-3" />
                      <h4 className="font-semibold text-gray-900 mb-1">
                        Reliable
                      </h4>
                      <p className="text-sm text-gray-600">Quality assurance</p>
                    </div>
                    <div className="text-center">
                      <Users className="h-12 w-12 text-purple-600 mx-auto mb-3" />
                      <h4 className="font-semibold text-gray-900 mb-1">
                        Trusted
                      </h4>
                      <p className="text-sm text-gray-600">By 100+ companies</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Services */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What Sets Us Apart
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              More than just a supplier - we're your automation engineering
              partner
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index}
                  className="text-center p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow"
                >
                  <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-8 w-8 text-teal-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{service.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-lg text-gray-600">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {values.map((value, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-teal-600 text-white relative overflow-hidden">
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
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Ready to Work Together?
                </h2>
                <p className="text-xl text-teal-100 mb-8 leading-relaxed">
                  Let's discuss your automation needs and how our engineering
                  expertise can help your business succeed.
                </p>

                {/* Contact Information */}
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3 text-teal-100">
                    <MapPin className="w-5 h-5" />
                    <span>Based in Bekasi, serving all Indonesia</span>
                  </div>
                  <div className="flex items-center gap-3 text-teal-100">
                    <Phone className="w-5 h-5" />
                    <a
                      href="tel:+6285210067755"
                      className="hover:text-white transition-colors"
                    >
                      +62-852-1006-7755
                    </a>
                  </div>
                  <div className="flex items-center gap-3 text-teal-100">
                    <Mail className="w-5 h-5" />
                    <a
                      href="mailto:iqbalya25@gmail.com"
                      className="hover:text-white transition-colors"
                    >
                      iqbalya25@gmail.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Enhanced Buttons Section */}
              <div className="space-y-4">
                {/* Primary Button - Get Free Consultation */}
                <Link
                  href="/contact"
                  className="group relative inline-flex items-center justify-center w-full px-8 py-4 bg-white text-teal-600 font-semibold rounded-lg hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  <Users className="h-5 w-5 mr-2" />
                  <span>Get Free Consultation</span>
                  <ArrowRight className="h-5 w-5 ml-2 transition-transform duration-300 group-hover:translate-x-2" />

                  {/* Shine effect on hover */}
                  <div className="absolute inset-0 rounded-lg overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  </div>
                </Link>

                {/* Secondary Button - WhatsApp */}
                <a
                  href="https://wa.me/6285210067755?text=Halo MKI, saya tertarik untuk berdiskusi tentang kebutuhan automation perusahaan kami."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center justify-center w-full px-8 py-4 bg-transparent text-white font-semibold rounded-lg border-2 border-white hover:bg-white hover:text-teal-600 transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  <MessageSquare className="h-5 w-5 mr-2" />
                  <span>WhatsApp Contact</span>
                  <ArrowRight className="h-5 w-5 ml-2 transition-transform duration-300 group-hover:translate-x-2" />
                </a>

                {/* Additional Help Text */}
                <p className="text-center text-teal-100 text-sm">
                  Or WhatsApp us for immediate assistance
                </p>

                {/* Trust Indicators */}
                <div className="flex items-center justify-center gap-8 mt-8 text-teal-100">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    <span className="text-sm">Response within 2 hours</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    <span className="text-sm">8+ Years Experience</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            name: "About Mederi Karya Indonesia",
            description:
              "Professional automation supplier with 8+ years engineering experience",
            url: "/about",
            mainEntity: {
              "@type": "Organization",
              name: "Mederi Karya Indonesia",
              foundingDate: "2016",
              description:
                "Industrial automation parts supplier with comprehensive technical support",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Bekasi",
                addressRegion: "West Java",
                addressCountry: "ID",
              },
              contactPoint: {
                "@type": "ContactPoint",
                telephone: SITE_CONFIG.company.phone,
                contactType: "Customer Service",
              },
              areaServed: "Indonesia",
              serviceArea: ["Jakarta", "Surabaya", "Bandung", "Tangerang"],
            },
          }),
        }}
      />
    </>
  );
}
