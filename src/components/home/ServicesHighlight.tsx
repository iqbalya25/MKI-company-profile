// src/components/home/ServicesHighlight.tsx
import Link from "next/link";
import { Settings, Wrench, Headphones, GraduationCap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const ServicesHighlight = () => {
  const services = [
    {
      icon: Settings,
      title: "Parameter Setting",
      description: "Professional configuration for inverters, PLCs, and HMIs",
      features: [
        "Inverter parameter optimization",
        "PLC programming",
        "HMI configuration",
        "System integration"
      ],
    },
    {
      icon: Wrench,
      title: "Commissioning",
      description: "Complete installation and testing services",
      features: [
        "On-site installation",
        "System testing",
        "Performance validation",
        "Documentation"
      ],
    },
    {
      icon: Headphones,
      title: "Technical Support",
      description: "24/7 engineering support for all your needs",
      features: [
        "Remote troubleshooting",
        "Phone consultation",
        "WhatsApp support",
        "Emergency response"
      ],
    },
    {
      icon: GraduationCap,
      title: "Training",
      description: "Comprehensive training for your team",
      features: [
        "Operator training",
        "Maintenance procedures",
        "Safety protocols",
        "Best practices"
      ],
    },
  ];

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

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 bg-teal-600 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="h-6 w-6 text-white" />
                </div>
                
                <h3 className="font-semibold text-lg text-gray-900 mb-2">
                  {service.title}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4">
                  {service.description}
                </p>
                
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="text-teal-600 mt-0.5">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* CTA */}
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
              <Link href="/services">Learn More</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesHighlight;