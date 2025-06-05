// src/components/layout/Header.tsx - CLEAN & SIMPLE DROPDOWN
"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Menu,
  X,
  Phone,
  Mail,
  Search,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PRODUCT_CATEGORIES, SITE_CONFIG } from "@/lib/contants";
import Image from "next/image";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products", hasDropdown: true },
    { name: "Services", href: "/services" },
    { name: "About", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="fixed top-0 z-50 w-full bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100">
      {/* Main Header */}
      <div className="container mx-auto px-4">
        <div className="flex h-16 lg:h-20 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 group focus:outline-none"
            tabIndex={-1}
          >
            <div className="relative w-52 h-52 lg:w-64 lg:h-64 pointer-events-none select-none">
              <Image
                src="/Images/mkilogo.png"
                alt="MKI Logo"
                fill
                className="object-contain"
                priority
                draggable={false}
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navigation.map((item) => (
              <div key={item.name} className="relative group">
                <Link
                  href={item.href}
                  className="flex items-center px-4 py-2 text-sm font-medium text-slate-700 hover:text-teal-600 transition-colors rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                >
                  {item.name}
                  {item.hasDropdown && (
                    <ChevronDown className="ml-1 h-4 w-4 transition-transform group-hover:rotate-180" />
                  )}
                </Link>

                {/* Products Dropdown - SIMPLIFIED */}
                {item.name === "Products" && (
                  <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-xl shadow-2xl border border-slate-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                    <div className="py-3 max-h-[70vh] overflow-y-auto">
                      {/* View All Products Link */}
                      <Link
                        href="/products"
                        className="flex items-center justify-between px-4 py-2 text-sm font-semibold text-teal-600 hover:bg-teal-50 mx-2 rounded-lg mb-2"
                      >
                        <span>All Products</span>
                        <ChevronRight className="h-4 w-4" />
                      </Link>

                      <div className="h-px bg-slate-100 mb-2" />

                      {/* Category Links */}
                      {PRODUCT_CATEGORIES.map((category, index) => (
                        <Link
                          key={category.slug}
                          href={`/products?category=${category.slug}`}
                          className="block px-4 py-2.5 text-sm text-slate-700 hover:text-teal-600 hover:bg-slate-50 transition-colors mx-2 rounded-lg"
                        >
                          {category.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="text-slate-600"
            >
              <Link href="/products">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Link>
            </Button>
            <Button
              size="sm"
              asChild
              className="bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-700 hover:to-teal-600 text-white shadow-md hover:shadow-lg transition-all"
            >
              <Link href="/quote">Get Quote</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-100 max-h-[calc(100vh-64px)] overflow-y-auto">
          <div className="container mx-auto px-4 py-6 space-y-4">
            {navigation.map((item) => (
              <div key={item.name}>
                <Link
                  href={item.href}
                  className="block py-3 px-4 text-base font-medium text-slate-700 hover:text-teal-600 hover:bg-slate-50 rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>

                {/* Mobile Products Submenu */}
                {item.name === "Products" && (
                  <div className="ml-4 mt-2 space-y-2 pl-4 border-l-2 border-teal-100">
                    {PRODUCT_CATEGORIES.map((category) => (
                      <Link
                        key={category.slug}
                        href={`/products?category=${category.slug}`}
                        className="block py-2 px-3 text-sm text-slate-600 hover:text-teal-600"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Mobile Actions */}
            <div className="pt-6 space-y-3 border-t border-slate-100">
              <Button variant="outline" className="w-full" asChild>
                <Link href="/products" onClick={() => setIsMenuOpen(false)}>
                  <Search className="h-4 w-4 mr-2" />
                  Search Products
                </Link>
              </Button>
              <Button
                className="w-full bg-gradient-to-r from-teal-600 to-teal-500"
                asChild
              >
                <Link href="/quote" onClick={() => setIsMenuOpen(false)}>
                  Get Quote
                </Link>
              </Button>
            </div>

            {/* Mobile Contact Info */}
            <div className="pt-6 space-y-3 border-t border-slate-100">
              <a
                href={`tel:${SITE_CONFIG.company.phone}`}
                className="flex items-center gap-3 text-sm text-slate-600"
              >
                <Phone className="h-4 w-4 text-teal-600" />
                {SITE_CONFIG.company.phone}
              </a>
              <a
                href={`mailto:${SITE_CONFIG.company.email}`}
                className="flex items-center gap-3 text-sm text-slate-600"
              >
                <Mail className="h-4 w-4 text-teal-600" />
                {SITE_CONFIG.company.email}
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
