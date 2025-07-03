/* eslint-disable @typescript-eslint/no-unused-vars */
import Image from "next/image";
import { Service } from "@/types/service";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  Phone,
  Mail,
  Calendar,
  Settings,
  Headphones,
  FileText,
} from "lucide-react";
import Link from "next/link";
import RichTextRenderer from "@/components/common/RichTextRenderer";

interface ServiceDetailProps {
  service: Service;
}

export default function ServiceDetail({ service }: ServiceDetailProps) {
  return (
    <div className="container mx-auto px-4 py-6">
      {" "}
      {/* Reduced padding */}
      {/* Main Product Layout - Optimized for 1366x768 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {" "}
        {/* Reduced gaps */}
        {/* Left Side - Image */}
        <div className="space-y-3">
          {service.image && (
            <div className="relative h-100 bg-gray-50 rounded-lg overflow-hidden">
              {" "}
              {/* Fixed height instead of aspect-square */}
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
                  <Badge className="bg-blue-600 text-white">Featured</Badge>
                </div>
              )}
            </div>
          )}
        </div>
        {/* Right Side - Service Info */}
        <div className="space-y-4">
          {" "}
          {/* Reduced spacing */}
          {/* Breadcrumb Tags */}
          <div className="flex items-center gap-2 text-sm">
            <Link href="/services" className="text-blue-600 hover:underline">
              Services
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">{service.name}</span>
          </div>
          {/* Service Title */}
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {" "}
              {/* Smaller title */}
              {service.name}
            </h1>
            <p className="text-base text-gray-600">
              {" "}
              {/* Smaller description */}
              {service.shortDescription}
            </p>
          </div>
          {/* Services Included */}
          {service.features && service.features.length > 0 && (
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-sm font-semibold mb-4 text-blue-800">
                Services Included:
              </h3>
              <div className="space-y-2">
                {service.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Settings className="w-5 h-5 text-blue-600" />
                    <span className="text-sm text-blue-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          {/* CTA Button */}
          <Button
            size="lg"
            className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3" /* Reduced padding */
          >
            <Calendar className="w-4 h-4 mr-2" />
            Schedule Consultation
          </Button>
        </div>
      </div>
      {/* Service Description - Same layout as product specs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <div className="bg-white border rounded-lg p-8">
            <h2 className="text-2xl font-semibold mb-6">Service Details</h2>
            <div className="prose prose-lg max-w-none">
              {typeof service.description === "string" ? (
                <div
                  dangerouslySetInnerHTML={{ __html: service.description }}
                />
              ) : (
                <RichTextRenderer content={service.description} />
              )}
            </div>
          </div>
        </div>

        {/* Sidebar - Same as product sidebar */}
        <div className="space-y-6">
          {/* Contact Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="font-semibold mb-4 text-blue-800">
              Get Professional Service
            </h3>
            <p className="text-sm text-blue-600 mb-4">
              Contact our engineering team for consultation
            </p>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Phone className="w-4 h-4 text-blue-600" />
                <span>+62 21 1234 5678</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Mail className="w-4 h-4 text-blue-600" />
                <span>info@mederikarya.com</span>
              </div>
            </div>
          </div>

          {/* Additional Services */}
          <div className="bg-gray-50 border rounded-lg p-6">
            <h3 className="font-semibold mb-4">Additional Services</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <Headphones className="w-4 h-4 text-gray-600" />
                <span>24/7 Technical Support</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-gray-600" />
                <span>Complete Documentation</span>
              </div>
              <div className="flex items-center gap-2">
                <Settings className="w-4 h-4 text-gray-600" />
                <span>System Optimization</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
