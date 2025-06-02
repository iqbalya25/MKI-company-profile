// File: src/components/home/HeroSection.tsx
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
    { icon: Settings, title: "Parameter Setting", desc: "Inverter & PLC configuration" },
    { icon: Headphones, title: "Technical Support", desc: "Engineering consultation" },
    { icon: Wrench, title: "Commissioning", desc: "Installation & testing" },
  ];

  return (
    <section className="relative bg-gradient-to-br from-primary-50 to-accent-50 py-16 lg:py-24">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="container mx-auto px-4 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column - Content */}
          <div className="max-w-xl">
            {/* Badge */}
            <div className="inline-flex items-center bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <CheckCircle className="h-4 w-4 mr-2" />
              Supplier Automation Parts + Technical Support
            </div>

            {/* Main Headline - Indonesian + Technical English Mix */}
            <h1 className="text-4xl lg:text-5xl font-bold text-primary-900 mb-6 leading-tight">
              Supplier <span className="text-primary-600">PLC, HMI, Inverter</span> dengan Engineering Services
            </h1>

            {/* Subheadline */}
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Solusi lengkap automation parts dengan <strong className="text-primary-700">technical support profesional</strong>. 
              Parameter setting, commissioning, troubleshooting untuk brand terpercaya: 
              <strong className="text-primary-700"> Mitsubishi, Schneider, Omron, Siemens</strong>.
            </p>

            {/* Trust Points */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {trustPoints.map((point, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-success-500 flex-shrink-0" />
                  <span className="text-sm font-medium text-foreground">{point}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button size="lg" asChild className="bg-primary-600 hover:bg-primary-700">
                <Link href="/quote">
                  Get Quote Sekarang
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              
              <Button size="lg" variant="outline" asChild>
                <Link href="/products">
                  Lihat Products
                </Link>
              </Button>
            </div>

            {/* Contact Info */}
            <div className="p-4 bg-white/70 backdrop-blur rounded-lg border">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary-600" />
                <div>
                  <p className="text-sm text-muted-foreground">Engineering Consultation</p>
                  <p className="font-semibold text-primary-900">{SITE_CONFIG.company.phone}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Services Showcase */}
          <div className="relative">
            {/* Main Services Card */}
            <div className="relative bg-white rounded-2xl shadow-2xl p-8 transform rotate-1 hover:rotate-0 transition-transform duration-500">
              <div className="bg-primary-50 rounded-lg p-6 mb-6">
                <h3 className="font-bold text-lg text-primary-900 mb-4">Our Services</h3>
                <div className="space-y-4">
                  {services.map((service, index) => {
                    const IconComponent = service.icon;
                    return (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="bg-primary-100 p-2 rounded-lg">
                          <IconComponent className="h-4 w-4 text-primary-600" />
                        </div>
                        <div>
                          <div className="font-medium text-sm text-primary-900">{service.title}</div>
                          <div className="text-xs text-muted-foreground">{service.desc}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              {/* Product Categories Preview */}
              <div className="grid grid-cols-2 gap-3">
                {['PLC', 'Inverter', 'HMI', 'Safety'].map((category) => (
                  <div key={category} className="bg-primary-100 text-primary-700 text-center py-3 rounded-lg text-sm font-medium">
                    {category}
                  </div>
                ))}
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -left-4 bg-accent-500 text-white p-3 rounded-lg shadow-lg animate-bounce">
              <span className="text-sm font-semibold">Quality Products</span>
            </div>
            
            <div className="absolute -bottom-4 -right-4 bg-success-500 text-white p-3 rounded-lg shadow-lg">
              <span className="text-sm font-semibold">Fast Response</span>
            </div>

            <div className="absolute top-1/2 -left-6 bg-primary-600 text-white p-2 rounded-lg shadow-lg">
              <span className="text-xs font-semibold">8+ Years</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Stats Bar */}
      <div className="mt-16 bg-white/80 backdrop-blur border-t">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-primary-900">8+</div>
              <div className="text-sm text-muted-foreground">Years Experience</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary-900">500+</div>
              <div className="text-sm text-muted-foreground">Products Available</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary-900">15+</div>
              <div className="text-sm text-muted-foreground">Trusted Brands</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary-900">100+</div>
              <div className="text-sm text-muted-foreground">Happy Customers</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;