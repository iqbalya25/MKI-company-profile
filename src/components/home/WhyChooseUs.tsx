/* eslint-disable react/no-unescaped-entities */
// src/components/home/WhyChooseUs.tsx
import { CheckCircle, Truck, HeadphonesIcon, ShieldCheck, Clock, Users } from "lucide-react";

const WhyChooseUs = () => {
  const benefits = [
    {
      icon: CheckCircle,
      title: "Quality Products",
      description: "Premium automation parts from trusted manufacturers",
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      icon: HeadphonesIcon,
      title: "24/7 Technical Support",
      description: "Expert engineering team ready to assist anytime",
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      description: "Quick shipping to all major Indonesian cities",
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      icon: ShieldCheck,
      title: "Warranty Protection",
      description: "All products come with manufacturer warranty",
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
    {
      icon: Clock,
      title: "8+ Years Experience",
      description: "Proven track record in industrial automation",
      color: "text-teal-600",
      bgColor: "bg-teal-100",
    },
    {
      icon: Users,
      title: "Expert Consultation",
      description: "Free engineering consultation for your projects",
      color: "text-indigo-600",
      bgColor: "bg-indigo-100",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Why Choose Mederi Karya Indonesia?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            More than just a supplier - we're your automation partner with comprehensive technical support
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg ${benefit.bgColor}`}>
                    <Icon className={`h-6 w-6 ${benefit.color}`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;