/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
// src/app/about/page.tsx - REVISED PROFESSIONAL ABOUT PAGE
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
  Shield,
  Building,
  ArrowRight,
  Lightbulb,
  TrendingUp,
  MessageSquare,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE_CONFIG } from "@/lib/contants";

export const metadata: Metadata = {
  title: "About Mederi Karya Indonesia - Professional Automation Solutions",
  description:
    "MKI delivers professional industrial automation solutions with engineering expertise. Trusted partner for PLC, HMI, VFD, and safety systems across Indonesia manufacturing industry.",
  keywords: [
    "about mederi karya indonesia",
    "automation company indonesia",
    "professional automation supplier",
    "industrial automation expertise",
    "plc hmi supplier indonesia",
    "automation technical support",
    "manufacturing automation solutions",
  ],
  openGraph: {
    title: "About Mederi Karya Indonesia - Professional Automation Excellence",
    description:
      "Professional automation solutions with engineering expertise and comprehensive technical support for Indonesian manufacturing industry.",
    url: "/about",
    type: "website",
  },
};

export default function AboutPage() {
  const achievements = [
    { number: "2019", label: "Company Founded", icon: Building },
    { number: "500+", label: "Products Available", icon: Settings },
    { number: "100+", label: "Satisfied Customers", icon: Users },
    { number: "24/7", label: "Technical Support", icon: Wrench },
  ];

  const services = [
    {
      icon: Settings,
      title: "System Integration",
      description:
        "Complete automation system design, configuration, and integration services",
    },
    {
      icon: Wrench,
      title: "Technical Support",
      description:
        "Expert troubleshooting, maintenance, and optimization services",
    },
    {
      icon: GraduationCap,
      title: "Engineering Consultation",
      description:
        "Professional advice for automation system design and improvements",
    },
    {
      icon: Shield,
      title: "Quality Assurance",
      description:
        "Rigorous testing and quality control for all products and services",
    },
  ];

  const coreValues = [
    {
      icon: Target,
      title: "Customer-Centric Solutions",
      description:
        "We prioritize understanding your specific automation needs and delivering tailored solutions that drive real business results.",
    },
    {
      icon: Award,
      title: "Engineering Excellence",
      description:
        "Our team combines deep technical knowledge with practical experience to solve complex automation challenges effectively.",
    },
    {
      icon: TrendingUp,
      title: "Continuous Innovation",
      description:
        "We stay ahead of automation technology trends to provide cutting-edge solutions that future-proof your operations.",
    },
    {
      icon: CheckCircle,
      title: "Reliable Partnership",
      description:
        "Building long-term relationships through consistent quality delivery, transparent communication, and dependable service.",
    },
  ];

  const whyChooseUs = [
    {
      title: "Comprehensive Product Range",
      description:
        "From PLCs and HMIs to safety systems and power monitoring - we supply everything you need for complete automation projects.",
    },
    {
      title: "Engineering Expertise",
      description:
        "Our technical team provides professional consultation, system design, and troubleshooting services backed by years of industry experience.",
    },
    {
      title: "Competitive Pricing",
      description:
        "Direct supplier relationships and efficient operations allow us to offer competitive prices without compromising on quality.",
    },
    {
      title: "Local Support",
      description:
        "Based in Indonesia with local technical support team, ensuring quick response times and understanding of local industry requirements.",
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
              Mederi Karya Indonesia delivers comprehensive industrial
              automation solutions combining quality products, engineering
              expertise, and dedicated technical support to help manufacturing
              companies achieve operational excellence.
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
          </div>
        </div>
      </section>

      {/* Company Stats */}
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

      {/* Company Story */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Empowering Indonesian manufacturing through professional
                automation solutions
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <div className="bg-gradient-to-br from-teal-600 to-teal-700 rounded-2xl p-8 text-white">
                  <Lightbulb className="h-12 w-12 mb-6 text-teal-200" />
                  <h3 className="text-2xl font-bold mb-4">
                    Founded on Industry Insight
                  </h3>
                  <p className="text-teal-100 leading-relaxed">
                    Mederi Karya Indonesia was established in 2019 with a clear
                    vision: to bridge the gap between advanced automation
                    technology and practical industrial applications. We
                    recognized that Indonesian manufacturers needed more than
                    just products - they needed a partner who understands both
                    the technology and the local market.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                  <h4 className="text-xl font-semibold text-gray-900 mb-3">
                    Market Understanding
                  </h4>
                  <p className="text-gray-600">
                    Our deep understanding of Indonesian manufacturing
                    challenges allows us to recommend solutions that truly fit
                    local operational requirements and constraints.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                  <h4 className="text-xl font-semibold text-gray-900 mb-3">
                    Technical Excellence
                  </h4>
                  <p className="text-gray-600">
                    We combine product supply with genuine engineering
                    expertise, ensuring our customers receive not just
                    components, but complete technical solutions.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                  <h4 className="text-xl font-semibold text-gray-900 mb-3">
                    Long-term Partnership
                  </h4>
                  <p className="text-gray-600">
                    Our goal is to build lasting relationships by consistently
                    delivering value through quality products, expert support,
                    and reliable service.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Our Core Values
              </h2>
              <p className="text-lg text-gray-600">
                The principles that guide everything we do
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {coreValues.map((value, index) => {
                const Icon = value.icon;
                return (
                  <div key={index} className="bg-gray-50 rounded-xl p-8">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="h-6 w-6 text-teal-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">
                          {value.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          {value.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Why Choose MKI?</h2>
              <p className="text-xl text-gray-300">
                What sets us apart in the automation industry
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {whyChooseUs.map((item, index) => (
                <div
                  key={index}
                  className="bg-gray-800 rounded-xl p-8 border border-gray-700"
                >
                  <h3 className="text-xl font-semibold mb-4 text-teal-400">
                    {item.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Our Services
              </h2>
              <p className="text-lg text-gray-600">
                Comprehensive support for your automation needs
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-teal-600 to-teal-700 rounded-xl flex items-center justify-center mx-auto mb-6">
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
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

        {/* Enhanced CTA Buttons */}
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
    </>
  );
}
