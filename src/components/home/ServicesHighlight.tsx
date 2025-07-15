/* eslint-disable @typescript-eslint/no-unused-vars */
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
          {services.slice(0, 4).map((service, index) => {
            // ✅ Use services directly
            const isEven = index % 2 === 0;
            return (
              <div key={service.slug} className="group relative">
                {/* Card */}
                <div className="bg-white rounded-2xl overflow-hidden h-full shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-gray-200 transform hover:-translate-y-2">
                  <div className="h-48 relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-50">
                    {service.images && service.images.length > 0 ? ( // ✅ Updated condition
                      <Image
                        src={
                          service.images[0].startsWith("//")
                            ? `https:${service.images[0]}`
                            : service.images[0]
                        } // ✅ Use first image
                        alt={service.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Settings
                          className={`h-16 w-16 ${isEven ? "text-teal-200" : "text-blue-200"}`}
                        />{" "}
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
                    {/* Title */}
                    <div className="flex items-start gap-3 mb-4">
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
      </div>
    </section>
  );
};

export default ServicesHighlight;
