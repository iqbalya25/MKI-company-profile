// src/components/home/ServicesHighlight.tsx
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Settings,
  Wrench,
  PlayCircle,
  GraduationCap,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Service } from "@/types/service";

interface ServicesHighlightProps {
  services: Service[];
}

const ServicesHighlight = ({ services }: ServicesHighlightProps) => {
  // Default services if none from Contentful
  const defaultServices = [
    {
      id: "1",
      name: "Parameter Setting",
      slug: "parameter-setting",
      shortDescription:
        "Professional configuration for inverters, PLCs, and HMIs",
      description: "Expert parameter configuration and optimization services",
      image: "/images/parameter-setting.jpg",
      features: [
        "Inverter frequency setup",
        "PLC programming",
        "HMI configuration",
        "System optimization",
      ],
      icon: Settings,
    },
    {
      id: "2",
      name: "Commissioning Service",
      slug: "commissioning",
      shortDescription:
        "Complete testing, startup, and validation for automation systems",
      description: "End-to-end commissioning for industrial automation",
      image: "/images/commissioning.jpg",
      features: [
        "System installation",
        "Function testing",
        "Performance validation",
        "Documentation",
      ],
      icon: PlayCircle,
    },
    {
      id: "3",
      name: "Technical Support",
      slug: "technical-support",
      shortDescription:
        "24/7 engineering consultation and troubleshooting assistance",
      description: "Round-the-clock technical support from experts",
      image: "/images/tech-support.jpg",
      features: [
        "Remote assistance",
        "On-site support",
        "Emergency response",
        "Preventive maintenance",
      ],
      icon: Wrench,
    },
    {
      id: "4",
      name: "Training Program",
      slug: "training",
      shortDescription:
        "Comprehensive operator and maintenance training programs",
      description: "Professional training for your technical team",
      image: "/images/training.jpg",
      features: [
        "Operator training",
        "Maintenance procedures",
        "Safety protocols",
        "Best practices",
      ],
      icon: GraduationCap,
    },
  ];

  // Use default services if none from Contentful
  const displayServices = services.length > 0 ? services : defaultServices;

  return (
    <section className="py-20 bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden">
      {/* Background Pattern - Diagonal Lines */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              #14b8a6,
              #14b8a6 1px,
              transparent 1px,
              transparent 15px
            )`,
          }}
        />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-40 left-0 w-72 h-72 bg-blue-100 rounded-full blur-3xl opacity-10" />
      <div className="absolute bottom-40 right-0 w-96 h-96 bg-teal-100 rounded-full blur-3xl opacity-10" />

      {/* Floating Tech Elements */}
      <div className="absolute top-32 right-20 w-16 h-16 border-2 border-teal-200 rounded-lg opacity-20 rotate-12" />
      <div className="absolute bottom-32 left-20 w-20 h-20 border-2 border-blue-200 rounded-full opacity-20" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header - Premium Design */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Engineering
            <span className="text-teal-600"> Services</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Complete technical support from initial setup to ongoing
            maintenance. Our expert team ensures your automation systems run at
            peak performance.
          </p>
        </div>

        {/* Services Grid - Premium Card Design */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {displayServices.slice(0, 4).map((service, index) => {
            const IconComponent = defaultServices[index]?.icon || Settings;
            const isEven = index % 2 === 0;

            return (
              <div key={service.slug} className="group relative">
                {/* Card */}
                <div className="bg-white rounded-2xl overflow-hidden h-full shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-gray-200 transform hover:-translate-y-2">
                  {/* Service Number Badge */}
                  <div className="absolute top-4 right-4 z-20">
                    <div
                      className={`w-10 h-10 ${
                        isEven ? "bg-teal-600" : "bg-blue-600"
                      } text-white rounded-lg flex items-center justify-center font-bold text-sm shadow-lg`}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </div>
                  </div>

                  {/* Image Section with Overlay */}
                  <div className="h-48 relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-50">
                    {service.image ? (
                      <Image
                        src={service.image}
                        alt={service.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <IconComponent
                          className={`h-16 w-16 ${
                            isEven ? "text-teal-200" : "text-blue-200"
                          }`}
                        />
                      </div>
                    )}

                    {/* Gradient Overlay */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-t ${
                        isEven ? "from-teal-900/50" : "from-blue-900/50"
                      } to-transparent opacity-40 group-hover:opacity-60 transition-opacity`}
                    />
                  </div>

                  {/* Content Section */}
                  <div className="p-6">
                    {/* Icon & Title */}
                    <div className="flex items-start gap-3 mb-4">
                      <div
                        className={`p-2 ${
                          isEven ? "bg-teal-50" : "bg-blue-50"
                        } rounded-lg`}
                      >
                        <IconComponent
                          className={`h-5 w-5 ${
                            isEven ? "text-teal-600" : "text-blue-600"
                          }`}
                        />
                      </div>
                      <h3 className="font-bold text-lg text-gray-900 group-hover:text-teal-600 transition-colors flex-1">
                        {service.name}
                      </h3>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {service.shortDescription}
                    </p>

                    {/* Features List */}
                    {service.features && service.features.length > 0 && (
                      <ul className="space-y-2 mb-4">
                        {service.features.slice(0, 3).map((feature, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2 text-xs text-gray-600"
                          >
                            <CheckCircle
                              className={`h-3 w-3 mt-0.5 ${
                                isEven ? "text-teal-500" : "text-blue-500"
                              }`}
                            />
                            <span className="line-clamp-1">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* CTA Link */}
                    <Link
                      href={`/services/${service.slug}`}
                      className={`inline-flex items-center text-sm font-medium ${
                        isEven
                          ? "text-teal-600 hover:text-teal-700"
                          : "text-blue-600 hover:text-blue-700"
                      } group/link`}
                    >
                      <span>Learn More</span>
                      <ArrowRight className="h-3 w-3 ml-1 group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </div>

                  {/* Bottom Accent Line */}
                  <div
                    className={`absolute bottom-0 left-0 right-0 h-1 ${
                      isEven ? "bg-teal-600" : "bg-blue-600"
                    } transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Section - Premium Design */}
        <div className="bg-gradient-to-br from-teal-600 to-teal-700 rounded-2xl p-10 text-center relative overflow-hidden">
          {/* Pattern Overlay */}
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 1px)`,
                backgroundSize: "30px 30px",
              }}
            />
          </div>

          <div className="relative z-10">
            <h3 className="text-3xl font-bold text-white mb-4">
              Need Technical Assistance?
            </h3>
            <p className="text-teal-100 mb-8 max-w-2xl mx-auto text-lg">
              Our engineering team is ready to help with your automation
              challenges. Get free consultation for your project.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-teal-600 hover:bg-gray-100 font-semibold shadow-lg"
                asChild
              >
                <Link href="/contact">
                  Get Free Consultation
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-teal-600 hover:bg-gray-200 font-semibold shadow-lg hover:text-teal-600 font-semibold"
                asChild
              >
                <Link href="/services">View All Services</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesHighlight;
