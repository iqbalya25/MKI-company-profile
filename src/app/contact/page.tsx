/* eslint-disable react/no-unescaped-entities */
// src/app/contact/page.tsx - COMPLETE CONTACT PAGE
import { Metadata } from "next";
import { Phone, Mail, MapPin, Clock, MessageSquare, Users } from "lucide-react";
import ContactForm from "@/components/forms/ContactForm";
import { SITE_CONFIG } from "@/lib/contants";
import { generateLocalBusinessSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Contact Engineering Team - Technical Support | Mederi Karya Indonesia",
  description: "Hubungi tim engineering MKI untuk technical support, parameter setting, commissioning automation. Konsultasi gratis tersedia Jakarta, Surabaya, Bandung.",
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
      action: "https://wa.me/6285210067755?text=Halo MKI, saya membutuhkan technical support untuk automation",
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
              Get professional technical support for your automation needs. 
              Free consultation, parameter setting, and commissioning services available.
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
              Multiple ways to reach our engineering team. Choose what's most convenient for you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {contactMethods.map((method, index) => {
              const Icon = method.icon;
              return (
                <a
                  key={index}
                  href={method.action}
                  target={method.action.startsWith('http') ? '_blank' : undefined}
                  rel={method.action.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="group relative bg-white border border-gray-200 rounded-xl p-8 hover:shadow-xl transition-all duration-300 text-center"
                >
                  <div className={`w-16 h-16 ${method.bgColor} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className={`h-8 w-8 ${method.color}`} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {method.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {method.description}
                  </p>
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
                    <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
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
                    <strong>Emergency Support:</strong> Available 24/7 for critical automation issues
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

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Contact us today for free consultation on your automation project. 
            Our engineering team is ready to help you succeed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`tel:${SITE_CONFIG.company.phone}`}
              className="bg-teal-600 text-white px-8 py-3 rounded-lg hover:bg-teal-700 transition-colors font-medium"
            >
              Call Now: {SITE_CONFIG.company.phone}
            </a>
            <a
              href="/quote"
              className="border border-teal-600 text-teal-600 px-8 py-3 rounded-lg hover:bg-teal-50 transition-colors font-medium"
            >
              Request Quote
            </a>
          </div>
        </div>
      </section>
    </>
  );
}