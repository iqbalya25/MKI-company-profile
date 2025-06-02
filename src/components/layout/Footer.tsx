// File: src/components/layout/Footer.tsx
import Link from "next/link";
import { Phone, Mail, MapPin, ExternalLink } from "lucide-react";
import { BRANDS, LOCATIONS, PRODUCT_CATEGORIES, SERVICES, SITE_CONFIG } from "@/lib/contants";


const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Blog", href: "/blog" },
    { name: "Get Quote", href: "/quote" },
    { name: "Services", href: "/services" },
  ];

  const topBrands = BRANDS.slice(0, 8); // Show first 8 brands

  return (
    <footer className="bg-primary-900 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-white text-primary-900 p-2 rounded-lg">
                <span className="font-bold text-lg">MKI</span>
              </div>
              <div>
                <h3 className="font-bold text-lg">Mederi Karya Indonesia</h3>
                <p className="text-primary-200 text-sm">{SITE_CONFIG.company.tagline}</p>
              </div>
            </div>
            <p className="text-primary-200 mb-6 text-sm leading-relaxed">
              Supplier automation parts terpercaya dengan technical support komprehensif. 
              Melayani PLC, HMI, Inverter, Safety Relay dengan engineering expertise 
              dan competitive pricing.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm">
                <Phone className="h-4 w-4 text-primary-300" />
                <span className="text-primary-200">{SITE_CONFIG.company.phone}</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Mail className="h-4 w-4 text-primary-300" />
                <span className="text-primary-200">{SITE_CONFIG.company.email}</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <MapPin className="h-4 w-4 text-primary-300" />
                <span className="text-primary-200">{SITE_CONFIG.company.address}</span>
              </div>
            </div>
          </div>

          {/* Product Categories */}
          <div>
            <h4 className="font-semibold text-lg mb-4 text-white">Product Categories</h4>
            <ul className="space-y-2">
              {PRODUCT_CATEGORIES.map((category) => (
                <li key={category.slug}>
                  <Link 
                    href={`/products?category=${category.slug}`}
                    className="text-primary-200 hover:text-white transition-colors text-sm flex items-center group"
                  >
                    <span>{category.name}</span>
                    <ExternalLink className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
            
            {/* Quick Links */}
            <h5 className="font-semibold text-white mt-6 mb-3">Quick Links</h5>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-primary-200 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services & Brands */}
          <div>
            <h4 className="font-semibold text-lg mb-4 text-white">Our Services</h4>
            <ul className="space-y-2 mb-6">
              {SERVICES.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services#${service.slug}`}
                    className="text-primary-200 hover:text-white transition-colors text-sm"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>

            <h5 className="font-semibold text-white mb-3">Top Brands</h5>
            <div className="grid grid-cols-2 gap-2">
              {topBrands.map((brand) => (
                <Link
                  key={brand}
                  href={`/products?brand=${brand.toLowerCase()}`}
                  className="text-primary-200 hover:text-white transition-colors text-sm py-1"
                >
                  {brand}
                </Link>
              ))}
            </div>
          </div>

          {/* Locations & Business Info */}
          <div>
            <h4 className="font-semibold text-lg mb-4 text-white">Service Areas</h4>
            <ul className="space-y-2 mb-6">
              {LOCATIONS.map((location) => (
                <li key={location.slug}>
                  <Link 
                    href={`/location/${location.slug}`}
                    className="text-primary-200 hover:text-white transition-colors text-sm"
                  >
                    {location.city}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Business Hours */}
            <div className="mb-6">
              <h5 className="font-medium text-white mb-2">Business Hours</h5>
              <div className="text-primary-200 text-sm space-y-1">
                <p>Monday - Friday: 8:00 - 17:00 WIB</p>
                <p>Saturday: 8:00 - 13:00 WIB</p>
                <p>Sunday: Closed</p>
              </div>
            </div>

            {/* Trust Signals */}
            <div>
              <h5 className="font-medium text-white mb-2">Why Choose MKI</h5>
              <ul className="text-primary-200 text-sm space-y-1">
                <li>✓ 8+ Years Experience</li>
                <li>✓ Engineering Expertise</li>
                <li>✓ Competitive Pricing</li>
                <li>✓ Technical Support</li>
                <li>✓ Fast Response</li>
                <li>✓ Local Support</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-primary-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-primary-200 text-sm">
              <p>&copy; {currentYear} {SITE_CONFIG.company.name}. All rights reserved.</p>
            </div>
            
            <div className="flex items-center space-x-6 text-sm">
              <Link href="/privacy" className="text-primary-200 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-primary-200 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="/sitemap" className="text-primary-200 hover:text-white transition-colors">
                Sitemap
              </Link>
            </div>

            {/* SEO Keywords Footer */}
            <div className="text-xs text-primary-300 text-center md:text-right">
              <p>Supplier Automation Jakarta | Technical Support PLC | Parameter Setting Inverter</p>
            </div>
          </div>
        </div>
      </div>

      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": SITE_CONFIG.company.name,
            "url": SITE_CONFIG.url,
            "logo": `${SITE_CONFIG.url}/logo.png`,
            "description": SITE_CONFIG.description,
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": SITE_CONFIG.company.phone,
              "contactType": "Customer Service",
              "areaServed": "ID",
              "availableLanguage": ["Indonesian", "English"]
            },
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "ID",
              "addressRegion": "West Java",
              "addressLocality": "Bekasi"
            },
            "sameAs": [
              // Add social media URLs when available
            ]
          })
        }}
      />
    </footer>
  );
};

export default Footer;