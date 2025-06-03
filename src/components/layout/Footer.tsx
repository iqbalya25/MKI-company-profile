// File: src/components/layout/FooterMinimal.tsx - MINIMAL ALTERNATIVE
import Link from "next/link";
import { Phone, Mail } from "lucide-react";
import { SITE_CONFIG } from "@/lib/contants";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-gray-300">
      <div className="container mx-auto px-4 py-8">
        {/* Single Row Layout */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Company & Contact */}
          <div className="text-center md:text-left">
            <p className="font-semibold text-white mb-2">
              Mederi Karya Indonesia
            </p>
            <div className="flex flex-col md:flex-row gap-4 text-sm">
              <a
                href={`tel:${SITE_CONFIG.company.phone}`}
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Phone className="h-4 w-4" />
                {SITE_CONFIG.company.phone}
              </a>
              <a
                href={`mailto:${SITE_CONFIG.company.email}`}
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Mail className="h-4 w-4" />
                {SITE_CONFIG.company.email}
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <nav className="flex flex-wrap justify-center gap-6 text-sm">
            <Link
              href="/products"
              className="hover:text-white transition-colors"
            >
              Products
            </Link>
            <Link
              href="/services"
              className="hover:text-white transition-colors"
            >
              Services
            </Link>
            <Link href="/about" className="hover:text-white transition-colors">
              About
            </Link>
            <Link
              href="/contact"
              className="hover:text-white transition-colors"
            >
              Contact
            </Link>
            <Link
              href="/quote"
              className="text-teal-400 hover:text-teal-300 transition-colors font-medium"
            >
              Get Quote
            </Link>
          </nav>

          {/* Copyright */}
          <div className="text-xs text-gray-400 text-center md:text-right">
            <p>&copy; {currentYear} MKI. All rights reserved.</p>
            <p>Industrial Automation Supplier</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
