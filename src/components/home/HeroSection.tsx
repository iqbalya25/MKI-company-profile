/* eslint-disable @typescript-eslint/no-unused-vars */
// src/components/home/HeroSection.tsx - IMPROVED VERSION
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
// import { SITE_CONFIG } from "@/lib/constants";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/industrial-automation-bg.jpg"
          alt="Industrial Automation Background"
          fill
          quality={85}
          priority
          className="object-cover"
          sizes="100vw"
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/70" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 pt-24 pb-16">
        <div className="max-w-3xl">
          {/* Main Headline */}
          <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Industrial
            <span className="block bg-gradient-to-r from-teal-400 via-cyan-500 to-blue-600 bg-clip-text text-transparent">
              Automation Excellence
            </span>
          </h1>

          <p className="text-xl lg:text-2xl text-gray-200 mb-8 leading-relaxed max-w-2xl">
            Premium automation parts with comprehensive engineering support.
            <span className="font-semibold text-white">
              {" "}
              PLC, HMI, Inverter, Safety Systems
            </span>{" "}
            - all backed by our expert technical team.
          </p>

          {/* CTA Buttons - Enhanced with Hover Animations */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8 w-full">
            {/* Primary Button - Get Quote Now with Shine Effect */}
            <div className="relative group w-full sm:w-auto">
              <Link
                href="/quote"
                className="group relative flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 px-6 py-4 text-lg font-medium rounded-lg transform hover:-translate-y-0.5 overflow-hidden w-full sm:inline-flex sm:w-auto"
              >
                <span className="relative z-10">Get Quote Now</span>
                <ArrowRight className="h-5 w-5 relative z-10 transition-transform duration-300 group-hover:translate-x-2" />

                {/* Shine effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              </Link>
            </div>

            {/* Secondary Button - Browse Products with Enhanced Hover */}
            <div className="relative group w-full sm:w-auto">
              <Link
                href="/products"
                className="group relative flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white hover:bg-white/20 hover:border-white/50 transition-all duration-300 px-6 py-4 text-lg font-medium rounded-lg transform hover:-translate-y-0.5 w-full sm:inline-flex sm:w-auto"
              >
                <span>Browse Products</span>
                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-2" />
              </Link>
            </div>
          </div>

          {/* Quick Contact - Optional */}
          {/* <div className="inline-flex items-center gap-3 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
            <div className="p-3 bg-white/20 rounded-lg">
              <Phone className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-300">Quick Response Hotline</p>
              <p className="font-bold text-white text-lg">
                {SITE_CONFIG.company.phone}
              </p>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
