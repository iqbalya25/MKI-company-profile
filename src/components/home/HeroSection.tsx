// src/components/home/HeroSection.tsx - PERFORMANCE OPTIMIZED VERSION
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
//import { SITE_CONFIG } from "@/lib/contants";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center">
      {/* Optimized Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/industrial-automation-bg.jpg" // Add your image to public/images/
          alt="Industrial Automation Background"
          fill
          quality={85}
          priority // Loads this image first
          className="object-cover"
          sizes="100vw"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ..." // Generate with plaiceholder
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/70" />
      </div>

      {/* Alternative: CSS Gradient Background (No Image) */}
      {/* <div 
        className="absolute inset-0 z-0"
        style={{
          background: `
            linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%),
            radial-gradient(circle at 20% 50%, rgba(20, 184, 166, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(30, 58, 138, 0.3) 0%, transparent 50%)
          `
        }}
      /> */}

      {/* Content - Same as before */}
      <div className="container mx-auto px-4 relative z-10 pt-32 pb-28">
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

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Button
              size="lg"
              asChild
              className="bg-teal-600 hover:bg-teal-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-6 text-lg"
            >
              <Link href="/quote" className="gap-2">
                Get Quote Now
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>

            <Button
              size="lg"
              variant="outline"
              asChild
              className="bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white hover:bg-white/20 transition-all duration-300 px-8 py-6 text-lg"
            >
              <Link href="/products">Browse Products</Link>
            </Button>
          </div>

          {/* Quick Contact */}
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

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
