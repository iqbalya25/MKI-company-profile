/* eslint-disable react/no-unescaped-entities */
// src/app/contact/page.tsx - COMPLETE CONTACT PAGE
import { Metadata } from "next";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageSquare,
  Users,
  Shield,
  FileText,
  ArrowRight,
} from "lucide-react";
import ContactForm from "@/components/forms/ContactForm";
import { SITE_CONFIG } from "@/lib/contants";
import { generateLocalBusinessSchema } from "@/lib/schema";
import Link from "next/link";

export const metadata: Metadata = {
  title:
    "Contact Engineering Team - Technical Support | Mederi Karya Indonesia",
  description:
    "Hubungi tim engineering MKI untuk technical support, parameter setting, commissioning automation. Konsultasi gratis tersedia Jakarta, Surabaya, Bandung.",
  keywords: [
    "contact automation engineer",
    "technical support jakarta",
    "parameter setting service",
    "automation consultation indonesia",
    "plc troubleshooting support",
    "commissioning service bandung",
  ],
  openGraph: {
    title: "Contact Our Engineering Team | Mederi Karya Indonesia",
    description: "Get professional technical support for your automation needs",
    url: "/contact",
    type: "website",
  },
};

export default function ContactPage() {
  const contactMethods = [
    {
      icon: Phone,
      title: "Call Us",
      description: "Speak directly with our engineers",
      value: SITE_CONFIG.company.phone,
      action: `tel:${SITE_CONFIG.company.phone}`,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      icon: Mail,
      title: "Email Us",
      description: "Send detailed technical questions",
      value: SITE_CONFIG.company.email,
      action: `mailto:${SITE_CONFIG.company.email}`,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      icon: MessageSquare,
      title: "WhatsApp",
      description: "Quick response via WhatsApp",
      value: "+62 852-1006-7755",
      action:
        "https://wa.me/6285210067755?text=Halo MKI, saya membutuhkan technical support untuk automation",
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
  ];

  const services = [
    {
      title: "Parameter Setting",
      description: "Inverter configuration, PLC programming, HMI setup",
      icon: "⚙️",
    },
    {
      title: "Commissioning",
      description: "System testing, startup, and validation",
      icon: "🔧",
    },
    {
      title: "Troubleshooting",
      description: "Problem diagnosis and resolution",
      icon: "🔍",
    },
    {
      title: "Training",
      description: "Operator and maintenance training",
      icon: "📚",
    },
  ];

  return (
    <>
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateLocalBusinessSchema()),
        }}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-teal-600 to-teal-700 text-white py-20 mt-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Contact Our Engineering Team
            </h1>
            <p className="text-xl text-teal-100 mb-8">
              Get professional technical support for your automation needs. Free
              consultation, parameter setting, and commissioning services
              available.
            </p>
            <div className="flex items-center justify-center gap-4 text-teal-100">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <span>24/7 Support</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                <span>8+ Years Experience</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Get In Touch
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Multiple ways to reach our engineering team. Choose what's most
              convenient for you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {contactMethods.map((method, index) => {
              const Icon = method.icon;
              return (
                <a
                  key={index}
                  href={method.action}
                  target={
                    method.action.startsWith("http") ? "_blank" : undefined
                  }
                  rel={
                    method.action.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="group relative bg-white border border-gray-200 rounded-xl p-8 hover:shadow-xl transition-all duration-300 text-center"
                >
                  <div
                    className={`w-16 h-16 ${method.bgColor} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <Icon className={`h-8 w-8 ${method.color}`} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {method.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{method.description}</p>
                  <p className={`font-semibold ${method.color}`}>
                    {method.value}
                  </p>
                </a>
              );
            })}
          </div>

          {/* Contact Form & Info Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white border border-gray-200 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Send Us a Message
              </h3>
              <ContactForm />
            </div>

            {/* Company Info */}
            <div className="space-y-8">
              {/* Services */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Engineering Services
                </h3>
                <div className="space-y-4">
                  {services.map((service, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg"
                    >
                      <span className="text-2xl">{service.icon}</span>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">
                          {service.title}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Business Hours */}
              <div className="bg-teal-50 border border-teal-200 rounded-xl p-6">
                <h4 className="font-semibold text-teal-900 mb-4 flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Business Hours
                </h4>
                <div className="space-y-2 text-sm text-teal-800">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span>08:00 - 17:00 WIB</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span>08:00 - 13:00 WIB</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span>Emergency only</span>
                  </div>
                  <hr className="border-teal-200 my-3" />
                  <p className="text-teal-700">
                    <strong>Emergency Support:</strong> Available 24/7 for
                    critical automation issues
                  </p>
                </div>
              </div>

              {/* Location */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-teal-600" />
                  Service Areas
                </h4>
                <div className="grid grid-cols-2 gap-3 text-sm text-gray-600">
                  <div>Jakarta</div>
                  <div>Bekasi</div>
                  <div>Surabaya</div>
                  <div>Bandung</div>
                  <div>Tangerang</div>
                  <div>Karawang</div>
                </div>
                <p className="text-xs text-gray-500 mt-3">
                  On-site services available. Remote support nationwide.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
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

        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-teal-100 mb-10 max-w-2xl mx-auto leading-relaxed">
            Contact us today for free consultation on your automation project.
            Our engineering team is ready to help you succeed.
          </p>

          {/* Enhanced CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            {/* Primary Button - Call Now */}
            <a
              href={`tel:${SITE_CONFIG.company.phone}`}
              className="group relative inline-flex items-center justify-center px-8 py-4 bg-white text-teal-600 font-semibold rounded-lg hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <Phone className="h-5 w-5 mr-2" />
              <span>Call Now: {SITE_CONFIG.company.phone}</span>
              <ArrowRight className="h-5 w-5 ml-2 transition-transform duration-300 group-hover:translate-x-2" />

              {/* Shine effect on hover */}
              <div className="absolute inset-0 rounded-lg overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              </div>
            </a>

            {/* Secondary Button - Request Quote */}
            <Link
              href="/quote"
              className="group relative inline-flex items-center justify-center px-8 py-4 bg-transparent text-white font-semibold rounded-lg border-2 border-white hover:bg-white hover:text-teal-600 transition-all duration-300 transform hover:-translate-y-0.5"
            >
              <FileText className="h-5 w-5 mr-2" />
              <span>Request Quote</span>
              <ArrowRight className="h-5 w-5 ml-2 transition-transform duration-300 group-hover:translate-x-2" />
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-teal-100">
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
              <span className="text-sm">Free Consultation</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
