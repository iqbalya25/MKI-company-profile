/* eslint-disable @typescript-eslint/no-explicit-any */
// File: src/components/home/TrustSignals.tsx
import { BRANDS, TRUST_SIGNALS } from "@/lib/contants";
import {
  Shield,
  Truck,
  Users,
  Award,
  Clock,
  Headphones,
  Settings,
  Wrench,
  Cog,
  MapPin,
} from "lucide-react";

import {
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
  Key,
} from "react";

const TrustSignals = () => {
  const iconMap = {
    Shield,
    Award,
    Truck,
    Users,
    Headphones,
    Clock,
    Settings,
    Wrench,
    Cog,
    MapPin,
  };

  const certifications = [
    "Engineering Expertise",
    "Quality Assurance",
    "Technical Certification",
    "Professional Service",
  ];

  const brandLogos = BRANDS.slice(0, 6).map((brand: any) => ({
    name: brand,
    width: "w-20",
  }));

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary-900 mb-4">
            Kenapa Pilih Mederi Karya Indonesia?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Engineering excellence dan customer satisfaction adalah prioritas
            utama kami dalam menyediakan solusi industrial automation
          </p>
        </div>

        {/* Trust Points Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {TRUST_SIGNALS.map(
            (
              point: {
                icon: string;
                title:
                  | string
                  | number
                  | bigint
                  | boolean
                  | ReactElement<unknown, string | JSXElementConstructor<any>>
                  | Iterable<ReactNode>
                  | ReactPortal
                  | Promise<
                      | string
                      | number
                      | bigint
                      | boolean
                      | ReactPortal
                      | ReactElement<
                          unknown,
                          string | JSXElementConstructor<any>
                        >
                      | Iterable<ReactNode>
                      | null
                      | undefined
                    >
                  | null
                  | undefined;
                description:
                  | string
                  | number
                  | bigint
                  | boolean
                  | ReactElement<unknown, string | JSXElementConstructor<any>>
                  | Iterable<ReactNode>
                  | ReactPortal
                  | Promise<
                      | string
                      | number
                      | bigint
                      | boolean
                      | ReactPortal
                      | ReactElement<
                          unknown,
                          string | JSXElementConstructor<any>
                        >
                      | Iterable<ReactNode>
                      | null
                      | undefined
                    >
                  | null
                  | undefined;
              },
              index: Key | null | undefined
            ) => {
              const IconComponent =
                iconMap[point.icon as keyof typeof iconMap] || Shield;
              return (
                <div
                  key={index}
                  className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start space-x-4">
                    <div className="p-3 rounded-lg bg-primary-50 text-primary-600">
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-primary-900 mb-2">
                        {point.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {point.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            }
          )}
        </div>

        {/* Brand Partners */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-center text-primary-900 mb-8">
            Trusted Brand Partners
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-70">
            {brandLogos.map(
              (
                brand: {
                  width: any;
                  name:
                    | string
                    | number
                    | bigint
                    | boolean
                    | ReactElement<unknown, string | JSXElementConstructor<any>>
                    | Iterable<ReactNode>
                    | ReactPortal
                    | Promise<
                        | string
                        | number
                        | bigint
                        | boolean
                        | ReactPortal
                        | ReactElement<
                            unknown,
                            string | JSXElementConstructor<any>
                          >
                        | Iterable<ReactNode>
                        | null
                        | undefined
                      >
                    | null
                    | undefined;
                },
                index: Key | null | undefined
              ) => (
                <div
                  key={index}
                  className={`bg-white p-4 rounded-lg shadow-sm ${brand.width} h-16 flex items-center justify-center hover:opacity-100 transition-opacity`}
                >
                  <span className="text-gray-600 font-semibold text-sm">
                    {brand.name}
                  </span>
                </div>
              )
            )}
          </div>
          <div className="text-center mt-4">
            <span className="text-sm text-muted-foreground">
              Dan brand terpercaya lainnya...
            </span>
          </div>
        </div>

        {/* Services Highlight */}
        <div className="bg-white rounded-xl p-8 shadow-sm mb-12">
          <h3 className="text-xl font-bold text-center text-primary-900 mb-6">
            Engineering Services
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-primary-50 rounded-lg">
              <Settings className="h-8 w-8 text-primary-600 mx-auto mb-2" />
              <span className="text-sm font-medium text-primary-900 block">
                Parameter Setting
              </span>
              <span className="text-xs text-muted-foreground">
                Inverter, PLC, HMI
              </span>
            </div>
            <div className="text-center p-4 bg-success-50 rounded-lg">
              <Wrench className="h-8 w-8 text-success-600 mx-auto mb-2" />
              <span className="text-sm font-medium text-primary-900 block">
                Commissioning
              </span>
              <span className="text-xs text-muted-foreground">
                Installation & Testing
              </span>
            </div>
            <div className="text-center p-4 bg-accent-50 rounded-lg">
              <Headphones className="h-8 w-8 text-accent-600 mx-auto mb-2" />
              <span className="text-sm font-medium text-primary-900 block">
                Technical Support
              </span>
              <span className="text-xs text-muted-foreground">
                Troubleshooting 24/7
              </span>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <Cog className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <span className="text-sm font-medium text-primary-900 block">
                Training
              </span>
              <span className="text-xs text-muted-foreground">
                Operator & Maintenance
              </span>
            </div>
          </div>
        </div>

        {/* Certifications */}
        <div className="bg-white rounded-xl p-8 shadow-sm mb-12">
          <h3 className="text-xl font-bold text-center text-primary-900 mb-6">
            Our Credentials
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {certifications.map((cert, index) => (
              <div
                key={index}
                className="text-center p-4 bg-primary-50 rounded-lg"
              >
                <Shield className="h-8 w-8 text-primary-600 mx-auto mb-2" />
                <span className="text-sm font-medium text-primary-900">
                  {cert}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="text-3xl font-bold text-primary-600 mb-2">8+</div>
            <div className="text-sm text-muted-foreground">
              Years Experience
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="text-3xl font-bold text-success-600 mb-2">500+</div>
            <div className="text-sm text-muted-foreground">
              Products Available
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="text-3xl font-bold text-accent-600 mb-2">15+</div>
            <div className="text-sm text-muted-foreground">Brand Partners</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="text-3xl font-bold text-purple-600 mb-2">100+</div>
            <div className="text-sm text-muted-foreground">Happy Customers</div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <div className="bg-primary-600 text-white p-8 rounded-2xl">
            <h3 className="text-2xl font-bold mb-4">
              Ready untuk Engineering Excellence?
            </h3>
            <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
              Dapatkan automation parts berkualitas dengan technical support
              terbaik. Tim engineering kami siap membantu project Anda dari
              consultation hingga commissioning.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                Konsultasi Gratis
              </button>
              <button className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors">
                Lihat Products
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSignals;
