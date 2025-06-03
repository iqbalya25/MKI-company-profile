// File: src/components/home/HeroSection.tsx - CLEAN & PROFESSIONAL DESIGN
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Phone, Settings, Headphones, Wrench } from "lucide-react";
import { SITE_CONFIG } from "@/lib/contants";

const HeroSection = () => {
  const trustPoints = [
    "8+ Years Experience",
    "Engineering Expertise", 
    "Technical Support",
    "Competitive Pricing"
  ];

  const services = [
    { 
      icon: Settings, 
      title: "Parameter Setting", 
      desc: "Inverter & PLC configuration"
    },
    { 
      icon: Headphones, 
      title: "Technical Support", 
      desc: "Engineering consultation"
    },
    { 
      icon: Wrench, 
      title: "Commissioning", 
      desc: "Installation & testing"
    },
  ];

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column - Content */}
          <div className="max-w-xl">
            {/* Badge */}
            <div className="inline-flex items-center bg-teal-50 text-teal-700 px-4 py-2 rounded-lg text-sm font-medium mb-8 border border-teal-200">
              <CheckCircle className="h-4 w-4 mr-2" />
              Supplier Automation Parts + Technical Support
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Supplier{" "}
              <span className="text-teal-600">PLC, HMI, Inverter</span>{" "}
              dengan Engineering Services
            </h1>

            {/* Subheadline */}
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Solusi lengkap automation parts dengan{" "}
              <strong className="text-gray-900">technical support profesional</strong>. 
              Parameter setting, commissioning, troubleshooting untuk brand terpercaya:{" "}
              <strong className="text-teal-600">Mitsubishi, Schneider, Omron, Siemens</strong>.
            </p>

            {/* Trust Points */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {trustPoints.map((point, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-teal-500 flex-shrink-0" />
                  <span className="text-sm font-medium text-gray-700">{point}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button 
                size="lg" 
                asChild 
                className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 font-medium"
              >
                <Link href="/quote">
                  Get Quote Sekarang
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              
              <Button 
                size="lg" 
                variant="outline" 
                asChild
                className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-3 font-medium"
              >
                <Link href="/products">
                  Lihat Products
                </Link>
              </Button>
            </div>

            {/* Contact Info */}
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-teal-100 rounded-lg">
                  <Phone className="h-5 w-5 text-teal-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Engineering Consultation</p>
                  <p className="font-semibold text-gray-900">{SITE_CONFIG.company.phone}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Services Card */}
          <div className="relative">
            <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8">
              {/* Header */}
              <div className="text-center mb-8">
                <h3 className="font-bold text-xl text-gray-900 mb-2">Our Services</h3>
                <p className="text-gray-600 text-sm">Professional engineering support</p>
              </div>

              {/* Services List */}
              <div className="space-y-6 mb-8">
                {services.map((service, index) => {
                  const IconComponent = service.icon;
                  return (
                    <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg border border-gray-100">
                      <div className="p-3 bg-teal-100 rounded-lg">
                        <IconComponent className="h-5 w-5 text-teal-600" />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900">{service.title}</div>
                        <div className="text-sm text-gray-600">{service.desc}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {/* Product Categories */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-teal-600 text-white text-center py-3 rounded-lg font-medium">
                  PLC
                </div>
                <div className="bg-blue-600 text-white text-center py-3 rounded-lg font-medium">
                  Inverter
                </div>
                <div className="bg-gray-600 text-white text-center py-3 rounded-lg font-medium">
                  HMI
                </div>
                <div className="bg-slate-600 text-white text-center py-3 rounded-lg font-medium">
                  Safety
                </div>
              </div>
            </div>

            {/* Simple Badge */}
            <div className="absolute -top-3 -right-3 bg-teal-600 text-white px-3 py-1 rounded-lg text-sm font-medium shadow-lg">
              Quality Service
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Stats */}
      <div className="mt-20 border-t border-gray-200 bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-teal-600 mb-1">8+</div>
              <div className="text-sm text-gray-600">Years Experience</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-1">500+</div>
              <div className="text-sm text-gray-600">Products Available</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-600 mb-1">15+</div>
              <div className="text-sm text-gray-600">Trusted Brands</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-slate-600 mb-1">100+</div>
              <div className="text-sm text-gray-600">Happy Customers</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;