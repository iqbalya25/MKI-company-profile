/* eslint-disable @typescript-eslint/no-explicit-any */
// File: src/components/layout/Header.tsx - ENHANCED WITH PROFESSIONAL STYLING
"use client";

import {
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactNode,
  ReactPortal,
  useState,
} from "react";
import Link from "next/link";
import { Menu, X, Phone, Mail, Search, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PRODUCT_CATEGORIES, SITE_CONFIG } from "@/lib/contants";

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
    <header className="sticky top-0 z-50 w-full bg-white shadow-lg border-b border-slate-200">
      {/* Top Bar */}
      <div className="hidden md:block bg-gradient-to-r from-primary-600 to-primary-700 text-white py-3">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2 hover:text-primary-200 transition-colors">
              <Phone className="h-4 w-4" />
              <span className="font-medium">{SITE_CONFIG.company.phone}</span>
            </div>
            <div className="flex items-center space-x-2 hover:text-primary-200 transition-colors">
              <Mail className="h-4 w-4" />
              <span className="font-medium">{SITE_CONFIG.company.email}</span>
            </div>
          </div>
          <div className="text-right">
            <span className="font-semibold">{SITE_CONFIG.company.tagline}</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-4 group">
              <div className="bg-gradient-to-br from-primary-600 to-primary-700 text-white p-3 rounded-xl shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                <span className="font-bold text-xl">MKI</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="font-bold text-2xl text-slate-900 group-hover:text-primary-600 transition-colors">
                  Mederi Karya Indonesia
                </h1>
                <p className="text-sm text-slate-500 font-medium">
                  Industrial Automation Solutions
                </p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            {navigation.map((item) => (
              <div key={item.name} className="relative group">
                <Link
                  href={item.href}
                  className="flex items-center px-4 py-3 text-sm font-semibold text-slate-700 hover:text-primary-600 transition-colors rounded-lg hover:bg-slate-50 group"
                >
                  {item.name}
                  {item.hasDropdown && (
                    <ChevronDown className="ml-1 h-4 w-4 group-hover:rotate-180 transition-transform duration-200" />
                  )}
                </Link>

                {/* Enhanced Products Dropdown */}
                {item.name === "Products" && (
                  <div className="absolute top-full left-0 mt-2 w-80 bg-white border border-slate-200 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                    <div className="p-6">
                      <div className="mb-4">
                        <h3 className="text-sm font-bold text-slate-900 mb-2">Product Categories</h3>
                        <p className="text-xs text-slate-500">Automation parts dengan technical support</p>
                      </div>
                      
                      <div className="space-y-3">
                        {PRODUCT_CATEGORIES.map(
                          (category: {
                            slug: Key | null | undefined;
                            name:
                              | string
                              | number
                              | bigint
                              | boolean
                              | ReactElement<
                                  unknown,
                                  string | JSXElementConstructor<any>
                                >
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
                            description: string;
                          }) => (
                            <Link
                              key={category.slug}
                              href={`/products?category=${category.slug}`}
                              className="block p-3 hover:bg-primary-50 hover:text-primary-700 transition-colors rounded-lg border border-transparent hover:border-primary-200"
                            >
                              <div className="font-semibold text-sm text-slate-900">
                                {category.name}
                              </div>
                              <div className="text-xs text-slate-500 mt-1 line-clamp-1">
                                {category.description.split(" - ")[0]}
                              </div>
                            </Link>
                          )
                        )}
                      </div>
                      
                      <div className="border-t border-slate-200 mt-4 pt-4">
                        <Link
                          href="/products"
                          className="flex items-center justify-between p-3 text-sm font-semibold text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                        >
                          <span>View All Products</span>
                          <span>→</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="sm" asChild className="text-slate-600 hover:text-primary-600 hover:bg-primary-50">
              <Link href="/products">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Link>
            </Button>
            <Button 
              size="sm" 
              asChild 
              className="bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-semibold px-6 shadow-md hover:shadow-lg transition-all duration-300"
            >
              <Link href="/quote">Get Quote</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-slate-700 hover:text-primary-600 hover:bg-primary-50"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Enhanced Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-200 shadow-lg">
          <div className="container mx-auto px-4 py-6 space-y-4">
            {navigation.map((item) => (
              <div key={item.name}>
                <Link
                  href={item.href}
                  className="block py-3 px-4 text-lg font-semibold text-slate-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>

                {/* Mobile Products Submenu */}
                {item.name === "Products" && (
                  <div className="ml-4 mt-2 space-y-2 pl-4 border-l-2 border-primary-200">
                    {PRODUCT_CATEGORIES.map(
                      (category: {
                        slug: Key | null | undefined;
                        name:
                          | string
                          | number
                          | bigint
                          | boolean
                          | ReactElement<
                              unknown,
                              string | JSXElementConstructor<any>
                            >
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
                      }) => (
                        <Link
                          key={category.slug}
                          href={`/products?category=${category.slug}`}
                          className="block py-2 px-3 text-sm text-slate-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {category.name}
                        </Link>
                      )
                    )}
                  </div>
                )}
              </div>
            ))}

            {/* Mobile Actions */}
            <div className="pt-6 border-t border-slate-200 space-y-4">
              <Button variant="outline" className="w-full justify-center" asChild>
                <Link href="/products" onClick={() => setIsMenuOpen(false)}>
                  <Search className="h-4 w-4 mr-2" />
                  Search Products
                </Link>
              </Button>
              <Button 
                className="w-full justify-center bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-semibold shadow-md" 
                asChild
              >
                <Link href="/quote" onClick={() => setIsMenuOpen(false)}>
                  Get Quote
                </Link>
              </Button>
            </div>

            {/* Mobile Contact Info */}
            <div className="pt-6 border-t border-slate-200">
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-primary-50 rounded-lg">
                  <Phone className="h-5 w-5 text-primary-600" />
                  <div>
                    <p className="text-xs text-slate-500 font-medium">Call Us</p>
                    <p className="text-sm font-semibold text-slate-900">{SITE_CONFIG.company.phone}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-primary-50 rounded-lg">
                  <Mail className="h-5 w-5 text-primary-600" />
                  <div>
                    <p className="text-xs text-slate-500 font-medium">Email Us</p>
                    <p className="text-sm font-semibold text-slate-900">{SITE_CONFIG.company.email}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;