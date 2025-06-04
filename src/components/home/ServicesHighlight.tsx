// src/components/home/ServicesHighlight.tsx - SIMPLIFIED VERSION
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Service } from "@/types/service";

interface ServicesHighlightProps {
  services: Service[];
}

const ServicesHighlight = ({ services }: ServicesHighlightProps) => {
  // If no services from Contentful, show default message
  if (!services || services.length === 0) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Engineering Services
          </h2>
          <p className="text-gray-600">
            Our services information will be available soon...
          </p>
        </div>
      </section>
    );
  }

  // Show only featured services or first 4
  const featuredServices = services.filter(service => service.featured);
  const displayServices = featuredServices.length > 0 
    ? featuredServices.slice(0, 4)
    : services.slice(0, 4);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Engineering Services
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Complete technical support from initial setup to ongoing maintenance. 
            Our expert team ensures your automation systems run at peak performance.
          </p>
        </div>

        {/* Services Grid - Similar to Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {displayServices.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              {/* Image Section - Half of the card */}
              <div className="h-48 relative overflow-hidden bg-gradient-to-br from-teal-50 to-blue-50">
                <Image
                  src={service.image}
                  alt={service.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Content Section - Half of the card */}
              <div className="p-6">
                {/* Service Name */}
                <h3 className="font-semibold text-lg text-gray-900 mb-2 group-hover:text-teal-600 transition-colors">
                  {service.name}
                </h3>

                {/* Short Description */}
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {service.shortDescription}
                </p>

                {/* Features - Show first 3 */}
                {service.features && service.features.length > 0 && (
                  <ul className="space-y-1 mb-4">
                    {service.features.slice(0, 3).map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-gray-600">
                        <span className="text-teal-600 mt-0.5">•</span>
                        <span className="line-clamp-1">{feature}</span>
                      </li>
                    ))}
                    {service.features.length > 3 && (
                      <li className="text-xs text-gray-500 pl-4">
                        +{service.features.length - 3} more...
                      </li>
                    )}
                  </ul>
                )}

                {/* Learn More Link */}
                <div className="flex items-center text-sm text-teal-600 group-hover:text-teal-700 font-medium">
                  <span>Learn More</span>
                  <ArrowRight className="h-3 w-3 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Services - If more than 4 */}
        {services.length > 4 && (
          <div className="text-center mb-12">
            <Button variant="outline" asChild>
              <Link href="/services">
                View All Services ({services.length})
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        )}

        {/* CTA Section */}
        <div className="bg-teal-50 rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Need Technical Assistance?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Our engineering team is ready to help with your automation challenges. 
            Get free consultation for your project.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/contact">
                Get Free Consultation
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/services">Our Services</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesHighlight;