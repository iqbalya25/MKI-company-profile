/* eslint-disable react/no-unescaped-entities */
// src/components/home/WhyChooseUs.tsx
import {
  CheckCircle,
  Truck,
  HeadphonesIcon,
  ShieldCheck,
  Clock,
  Users,
  Award,
  Wrench,
  Zap,
} from "lucide-react";

const WhyChooseUs = () => {
  const benefits = [
    {
      icon: CheckCircle,
      title: "Quality Products",
      description:
        "Premium automation parts from trusted manufacturers with guaranteed authenticity",
      color: "text-teal-600",
      bgColor: "bg-teal-50",
      borderColor: "border-teal-200",
      stats: "500+ Products",
    },
    {
      icon: HeadphonesIcon,
      title: "24/7 Technical Support",
      description:
        "Expert engineering team ready to assist with parameter setting & troubleshooting",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      stats: "< 2 Hour Response",
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      description:
        "Strategic location in Bekasi for quick shipping to Jakarta & surrounding areas",
      color: "text-teal-600",
      bgColor: "bg-teal-50",
      borderColor: "border-teal-200",
      stats: "Same Day Available",
    },
    {
      icon: ShieldCheck,
      title: "Warranty Protection",
      description:
        "All products come with manufacturer warranty and our service guarantee",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      stats: "100% Protected",
    },
    {
      icon: Clock,
      title: "8+ Years Experience",
      description:
        "Proven track record in industrial automation and electrical engineering",
      color: "text-teal-600",
      bgColor: "bg-teal-50",
      borderColor: "border-teal-200",
      stats: "Since 2016",
    },
    {
      icon: Users,
      title: "Expert Consultation",
      description:
        "Free engineering consultation for system design and product selection",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      stats: "Free Service",
    },
  ];

  const achievements = [
    { number: "8+", label: "Years Experience", icon: Award },
    { number: "500+", label: "Products Ready", icon: Zap },
    { number: "24/7", label: "Technical Support", icon: Wrench },
    { number: "100%", label: "Customer Satisfaction", icon: CheckCircle },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden">
      {/* Background Pattern - Circuit Board Style */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(90deg, #14b8a6 1px, transparent 1px),
              linear-gradient(180deg, #14b8a6 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Decorative Elements */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-teal-100 rounded-full blur-3xl opacity-10" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-10" />

      {/* Floating Shapes */}
      <div className="absolute top-20 left-20 w-20 h-20 bg-teal-500 rounded-lg opacity-5 rotate-45 animate-pulse" />
      <div className="absolute bottom-20 right-20 w-32 h-32 bg-blue-500 rounded-full opacity-5 animate-pulse" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header - Premium Design */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Why Choose
            <span className="text-teal-600"> Mederi Karya</span>
            <span className="block text-3xl lg:text-4xl mt-2 text-gray-700">
              Indonesia?
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            More than just a supplier - we're your trusted automation partner
            with comprehensive technical support and engineering excellence
          </p>
        </div>

        {/* Achievement Stats - New Addition */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-teal-100 to-teal-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Icon className="h-7 w-7 text-teal-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {achievement.number}
                </div>
                <div className="text-sm text-gray-600">{achievement.label}</div>
              </div>
            );
          })}
        </div>

        {/* Benefits Grid - Enhanced Design */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-500 relative overflow-hidden border border-gray-100 hover:border-gray-200"
              >
                {/* Hover Background Effect */}
                <div
                  className={`absolute inset-0 ${benefit.bgColor} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                />

                {/* Corner Accent */}
                <div
                  className={`absolute top-0 right-0 w-24 h-24 ${benefit.bgColor} opacity-10 rounded-bl-full`}
                />

                <div className="relative z-10">
                  {/* Icon Container */}
                  <div className="flex items-start gap-4 mb-4">
                    <div
                      className={`p-4 rounded-xl ${benefit.bgColor} ${benefit.borderColor} border group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className={`h-6 w-6 ${benefit.color}`} />
                    </div>
                    <div
                      className={`text-xs font-semibold ${benefit.color} ${benefit.bgColor} px-3 py-1 rounded-full`}
                    >
                      {benefit.stats}
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="font-bold text-xl text-gray-900 mb-3 group-hover:text-teal-600 transition-colors">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {benefit.description}
                  </p>

                  {/* Bottom Line Accent */}
                  <div
                    className={`absolute bottom-0 left-0 right-0 h-1 ${benefit.bgColor} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA - Simple but Effective */}
        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-2">
            Experience the difference of working with automation experts
          </p>
          <p className="text-2xl font-semibold text-teal-600">
            Your Success is Our Priority
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
