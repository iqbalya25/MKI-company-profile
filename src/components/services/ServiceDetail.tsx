import { Service } from "@/types/service";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Settings } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

interface ServiceDetailProps {
  service: Service;
}

export default function ServiceDetail({ service }: ServiceDetailProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Service Header - Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Left Side - Image */}
        <div className="lg:col-span-1">
          {service.image && (
            <div className="relative h-100 lg:h-100 w-full rounded-lg overflow-hidden">
              <Image
                src={
                  service.image.startsWith("//")
                    ? `https:${service.image}`
                    : service.image
                }
                alt={service.name}
                fill
                className="object-cover"
                priority
              />
              {service.featured && (
                <div className="absolute top-4 left-4">
                  <Badge className="bg-teal-600 text-white">Featured</Badge>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Side - Service Info */}
        <div className="lg:col-span-2 space-y-4">
          {/* Breadcrumb Tags */}
          <div className="flex items-center gap-2 text-sm">
            <Link href="/services" className="text-teal-600 hover:underline">
              Services
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">{service.name}</span>
          </div>

          {/* Service Title */}
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {service.name}
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              {service.shortDescription}
            </p>
          </div>

          {/* Services Included */}
          {service.features && service.features.length > 0 && (
            <div className="bg-teal-50 p-6 rounded-lg border border-teal-100">
              <h3 className="text-lg font-semibold mb-4 text-teal-800">
                Services Included:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {service.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Settings className="w-5 h-5 text-teal-600 flex-shrink-0" />
                    <span className="text-sm text-teal-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CTA Button */}
          <div className="pt-4">
            <Button
              size="lg"
              className="w-full lg:w-auto bg-teal-600 hover:bg-teal-700 text-white px-8 py-3"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Schedule Consultation
            </Button>
          </div>
        </div>
      </div>

      {/* Service Description - Full Width */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <div className="bg-white border rounded-lg p-8">
            <h2 className="text-2xl font-semibold mb-6 text-gray-900">
              Service Details
            </h2>
            <div className="prose prose-lg max-w-none">
              {typeof service.description === "string" ? (
                <div className="text-gray-700 leading-relaxed">
                  {service.description.split("\n").map((paragraph, index) => (
                    <p key={index} className="mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>
              ) : service.description &&
                typeof service.description === "object" ? (
                <div className="text-gray-700">
                  {documentToReactComponents(service.description)}
                </div>
              ) : (
                <div className="text-gray-700">
                  <p>No description available</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-gray-50 border rounded-lg p-6 sticky top-8">
            <h3 className="text-lg font-semibold mb-4 text-gray-900">
              Get Started Today
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Settings className="w-4 h-4 text-teal-600" />
                <span>Expert technical consultation</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Calendar className="w-4 h-4 text-teal-600" />
                <span>Flexible scheduling available</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Settings className="w-4 h-4 text-teal-600" />
                <span>Comprehensive support included</span>
              </div>

              <div className="pt-4 border-t">
                <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white">
                  Contact Our Team
                </Button>
                <p className="text-xs text-gray-500 mt-2 text-center">
                  Free consultation available
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
