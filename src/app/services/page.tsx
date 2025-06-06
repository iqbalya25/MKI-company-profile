// src/app/services/page.tsx - COMPLETE SERVICES PAGE
import { Metadata } from "next";
import Link from "next/link";
import {
  Settings,
  Wrench,
  GraduationCap,
  PlayCircle,
  CheckCircle,
  ArrowRight,
  Phone,
  Clock,
  Award,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE_CONFIG } from "@/lib/contants";

export const metadata: Metadata = {
  title:
    "Engineering Services - Technical Support & Training | Mederi Karya Indonesia",
  description:
    "Professional automation services: parameter setting, commissioning, technical support, training. Expert engineering consultation for PLC, HMI, Inverter, Safety Systems Indonesia.",
  keywords: [
    "parameter setting service indonesia",
    "plc commissioning jakarta",
    "automation technical support",
    "inverter configuration service",
    "hmi programming training",
    "automation training indonesia",
    "engineering consultation jakarta",
    "troubleshooting automation",
  ],
  openGraph: {
    title: "Professional Automation Engineering Services | MKI",
    description:
      "Parameter setting, commissioning, technical support, and training for industrial automation systems",
    url: "/services",
    type: "website",
  },
};

export default function ServicesPage() {
  const mainServices = [
    {
      icon: Settings,
      title: "Parameter Setting & Configuration",
      description:
        "Expert configuration of automation devices for optimal performance",
      features: [
        "Inverter frequency and parameter setup",
        "PLC programming and logic configuration",
        "HMI screen design and communication setup",
        "Safety relay wiring and configuration",
        "Power meter installation and monitoring setup",
        "System integration and communication protocols",
      ],
      applications: [
        "Manufacturing",
        "HVAC Systems",
        "Pump Control",
        "Conveyor Systems",
      ],
      pricing: "Starting from consultation - competitive rates",
      deliverables: [
        "Configured systems",
        "Parameter documentation",
        "User manual",
        "Warranty support",
      ],
    },
    {
      icon: PlayCircle,
      title: "Commissioning & Startup",
      description: "Complete system testing and validation for safe operation",
      features: [
        "Pre-commissioning inspection and testing",
        "System startup and performance validation",
        "Safety system testing and certification",
        "Performance optimization and fine-tuning",
        "Documentation and reporting",
        "Staff training during commissioning",
      ],
      applications: [
        "New Installations",
        "System Upgrades",
        "Plant Relocations",
        "Safety Compliance",
      ],
      pricing: "Project-based pricing - contact for quote",
      deliverables: [
        "Commissioning report",
        "Test certificates",
        "As-built documentation",
        "Training records",
      ],
    },
    {
      icon: Wrench,
      title: "Technical Support & Troubleshooting",
      description: "24/7 engineering support for all your automation needs",
      features: [
        "Remote diagnostic and troubleshooting",
        "On-site technical support and repair",
        "Emergency response for critical systems",
        "Preventive maintenance programs",
        "System health monitoring",
        "Spare parts and replacement services",
      ],
      applications: [
        "Production Lines",
        "Critical Systems",
        "Emergency Repairs",
        "Maintenance",
      ],
      pricing: "Hourly rates or annual contracts available",
      deliverables: [
        "Problem resolution",
        "Maintenance reports",
        "Recommendations",
        "System optimization",
      ],
    },
    {
      icon: GraduationCap,
      title: "Training & Knowledge Transfer",
      description: "Comprehensive training programs for your technical team",
      features: [
        "Operator training for automation systems",
        "Maintenance technician certification",
        "Engineering team advanced training",
        "Safety procedures and protocols",
        "Hands-on practical sessions",
        "Customized training materials",
      ],
      applications: [
        "New Systems",
        "Staff Development",
        "Safety Compliance",
        "Skill Upgrades",
      ],
      pricing: "Per session or training package pricing",
      deliverables: [
        "Training materials",
        "Certificates",
        "Competency assessments",
        "Ongoing support",
      ],
    },
  ];

  const processSteps = [
    {
      step: "1",
      title: "Initial Consultation",
      description:
        "Free consultation to understand your requirements and challenges",
    },
    {
      step: "2",
      title: "Technical Assessment",
      description:
        "Detailed analysis of your systems and development of solution plan",
    },
    {
      step: "3",
      title: "Implementation",
      description: "Professional execution of services with minimal disruption",
    },
    {
      step: "4",
      title: "Testing & Validation",
      description: "Comprehensive testing to ensure optimal performance",
    },
    {
      step: "5",
      title: "Documentation & Training",
      description:
        "Complete documentation and staff training for ongoing success",
    },
    {
      step: "6",
      title: "Ongoing Support",
      description:
        "Continued support and maintenance to ensure long-term reliability",
    },
  ];

  const benefits = [
    {
      icon: Award,
      title: "Expert Engineering",
      description: "8+ years of hands-on automation experience",
    },
    {
      icon: Clock,
      title: "Rapid Response",
      description: "24/7 emergency support for critical systems",
    },
    {
      icon: Users,
      title: "Skilled Team",
      description: "Certified engineers and technicians",
    },
    {
      icon: CheckCircle,
      title: "Quality Assured",
      description: "All work backed by warranty and documentation",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-teal-600 to-teal-700 text-white py-20 mt-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Professional Engineering
              <span className="block text-teal-200">Services</span>
            </h1>
            <p className="text-xl text-teal-100 mb-8 leading-relaxed">
              Complete technical support for your automation systems. From
              parameter setting to commissioning, training, and ongoing support
              - we ensure your systems run at peak performance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-teal-600 hover:bg-gray-100"
                asChild
              >
                <Link href="/contact">
                  Free Consultation
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-teal-600"
                asChild
              >
                <Link href="/quote">Request Service Quote</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Overview */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-8 w-8 text-teal-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-gray-600">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Engineering Services
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive technical support for all your automation needs
            </p>
          </div>

          <div className="space-y-16">
            {mainServices.map((service, index) => {
              const Icon = service.icon;
              const isEven = index % 2 === 0;

              return (
                <div
                  key={index}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                    !isEven ? "lg:grid-flow-col-dense" : ""
                  }`}
                >
                  {/* Content */}
                  <div className={!isEven ? "lg:col-start-2" : ""}>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center">
                        <Icon className="h-8 w-8 text-teal-600" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900">
                        {service.title}
                      </h3>
                    </div>

                    <p className="text-gray-600 mb-6 text-lg">
                      {service.description}
                    </p>

                    <div className="space-y-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">
                          Key Services:
                        </h4>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {service.features.map((feature, idx) => (
                            <li
                              key={idx}
                              className="flex items-start gap-2 text-sm text-gray-600"
                            >
                              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">
                            Applications:
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {service.applications.map((app, idx) => (
                              <span
                                key={idx}
                                className="px-3 py-1 bg-teal-100 text-teal-700 text-xs rounded-full"
                              >
                                {app}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">
                            Pricing:
                          </h4>
                          <p className="text-sm text-gray-600">
                            {service.pricing}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Visual */}
                  <div
                    className={!isEven ? "lg:col-start-1 lg:row-start-1" : ""}
                  >
                    <div className="bg-white p-8 rounded-xl shadow-lg">
                      <h4 className="font-semibold text-gray-900 mb-4">
                        What You Get:
                      </h4>
                      <ul className="space-y-3">
                        {service.deliverables.map((item, idx) => (
                          <li key={idx} className="flex items-center gap-3">
                            <CheckCircle className="h-5 w-5 text-green-500" />
                            <span className="text-gray-700">{item}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-6 pt-6 border-t border-gray-200">
                        <Button className="w-full" asChild>
                          <Link href="/contact">
                            Get Quote for This Service
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Service Process
            </h2>
            <p className="text-lg text-gray-600">
              Professional, structured approach to ensure project success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-gray-50 p-6 rounded-xl hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 bg-teal-600 text-white rounded-full flex items-center justify-center font-bold text-lg mb-4">
                    {step.step}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{step.description}</p>
                </div>

                {/* Arrow for larger screens */}
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="h-6 w-6 text-gray-400" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Support */}
      <section className="py-16 bg-red-50 border-l-4 border-red-500">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              🚨 Emergency Technical Support
            </h2>
            <p className="text-gray-600 mb-6">
              Critical system failure? Our emergency response team is available
              24/7 for urgent automation issues that impact production.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-red-600 hover:bg-red-700" asChild>
                <a href={`tel:${SITE_CONFIG.company.phone}`}>
                  <Phone className="mr-2 h-5 w-5" />
                  Emergency Hotline: {SITE_CONFIG.company.phone}
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a
                  href="https://wa.me/6285210067755?text=EMERGENCY: Critical automation system failure - need immediate support"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp Emergency Support
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-teal-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">
              Ready to Optimize Your Automation Systems?
            </h2>
            <p className="text-xl text-teal-100 mb-8">
              Get professional engineering services that ensure your automation
              systems perform at their best. Free consultation available.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-teal-600 hover:bg-gray-100"
                asChild
              >
                <Link href="/contact">
                  Schedule Free Consultation
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-teal-600"
                asChild
              >
                <Link href="/quote">Get Service Quote</Link>
              </Button>
            </div>

            <div className="mt-8 pt-8 border-t border-teal-500">
              <p className="text-teal-100 mb-4">Or contact us directly:</p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <a
                  href={`tel:${SITE_CONFIG.company.phone}`}
                  className="flex items-center gap-2 text-white hover:text-teal-200"
                >
                  <Phone className="h-5 w-5" />
                  <span>{SITE_CONFIG.company.phone}</span>
                </a>
                <a
                  href={`mailto:${SITE_CONFIG.company.email}`}
                  className="flex items-center gap-2 text-white hover:text-teal-200"
                >
                  <ArrowRight className="h-5 w-5" />
                  <span>{SITE_CONFIG.company.email}</span>
                </a>
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
            "@type": "Service",
            name: "Industrial Automation Engineering Services",
            description:
              "Professional automation services including parameter setting, commissioning, technical support, and training",
            provider: {
              "@type": "Organization",
              name: "Mederi Karya Indonesia",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Bekasi",
                addressRegion: "West Java",
                addressCountry: "ID",
              },
            },
            serviceType: "Industrial Automation Services",
            areaServed: "Indonesia",
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: "Automation Engineering Services",
              itemListElement: [
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Parameter Setting & Configuration",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Commissioning & Startup",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Technical Support & Troubleshooting",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Training & Knowledge Transfer",
                  },
                },
              ],
            },
          }),
        }}
      />
    </>
  );
}
