// src/components/home/CTASection.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone, Mail, MapPin } from "lucide-react";
import { SITE_CONFIG } from "@/lib/contants";

const CTASection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-teal-600 to-teal-700">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Upgrade Your Automation System?
          </h2>
          <p className="text-xl text-teal-100 mb-8">
            Get competitive pricing and expert technical support for all your
            industrial automation needs. Our engineering team is ready to help
            you succeed.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              size="lg"
              className="bg-white text-teal-600 hover:bg-gray-100"
              asChild
            >
              <Link href="/quote">
                Request Quote
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-teal-600"
              asChild
            >
              <Link href="/contact">Contact Our Engineers</Link>
            </Button>
          </div>

          {/* Quick Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-white">
            <div className="flex items-center justify-center gap-3">
              <Phone className="h-5 w-5 text-teal-200" />
              <div className="text-left">
                <p className="text-sm text-teal-200">Call Us</p>
                <p className="font-semibold">{SITE_CONFIG.company.phone}</p>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3">
              <Mail className="h-5 w-5 text-teal-200" />
              <div className="text-left">
                <p className="text-sm text-teal-200">Email Us</p>
                <p className="font-semibold">{SITE_CONFIG.company.email}</p>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3">
              <MapPin className="h-5 w-5 text-teal-200" />
              <div className="text-left">
                <p className="text-sm text-teal-200">Location</p>
                <p className="font-semibold">{SITE_CONFIG.company.address}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
