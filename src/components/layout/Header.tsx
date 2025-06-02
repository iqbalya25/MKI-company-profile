/* eslint-disable @typescript-eslint/no-explicit-any */
// File: src/components/layout/Header.tsx
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
import { Menu, X, Phone, Mail, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PRODUCT_CATEGORIES, SITE_CONFIG } from "@/lib/contants";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "Services", href: "/services" },
    { name: "About", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Top Bar */}
      <div className="hidden md:block bg-primary-600 text-white py-2">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Phone className="h-3 w-3" />
              <span>{SITE_CONFIG.company.phone}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="h-3 w-3" />
              <span>{SITE_CONFIG.company.email}</span>
            </div>
          </div>
          <div className="text-right">
            <span>{SITE_CONFIG.company.tagline}</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3">
              <div className="bg-primary-600 text-white p-2 rounded-lg">
                <span className="font-bold text-lg">MKI</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="font-bold text-lg text-primary-900">
                  Mederi Karya Indonesia
                </h1>
                <p className="text-xs text-muted-foreground">
                  Industrial Automation Solutions
                </p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => (
              <div key={item.name} className="relative group">
                <Link
                  href={item.href}
                  className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary-600 transition-colors rounded-md hover:bg-accent"
                >
                  {item.name}
                </Link>

                {/* Products Dropdown */}
                {item.name === "Products" && (
                  <div className="absolute top-full left-0 mt-1 w-72 bg-white border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="py-2">
                      <div className="px-3 py-2 text-xs font-semibold text-muted-foreground border-b">
                        Product Categories
                      </div>
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
                            className="block px-3 py-3 hover:bg-accent hover:text-primary-600 transition-colors"
                          >
                            <div className="font-medium text-sm">
                              {category.name}
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">
                              {category.description.split(" - ")[0]}
                            </div>
                          </Link>
                        )
                      )}
                      <div className="border-t mt-2 pt-2">
                        <Link
                          href="/products"
                          className="block px-3 py-2 text-sm font-medium text-primary-600 hover:bg-accent"
                        >
                          View All Products →
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
            <Button variant="ghost" size="sm" asChild>
              <Link href="/products">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/quote">Get Quote</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <div className="container mx-auto px-4 py-4 space-y-3">
            {navigation.map((item) => (
              <div key={item.name}>
                <Link
                  href={item.href}
                  className="block py-2 text-base font-medium text-foreground hover:text-primary-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>

                {/* Mobile Products Submenu */}
                {item.name === "Products" && (
                  <div className="ml-4 mt-2 space-y-1">
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
                          className="block py-1 text-sm text-muted-foreground hover:text-primary-600 transition-colors"
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
            <div className="pt-4 border-t space-y-2">
              <Button variant="outline" className="w-full" asChild>
                <Link href="/products" onClick={() => setIsMenuOpen(false)}>
                  <Search className="h-4 w-4 mr-2" />
                  Search Products
                </Link>
              </Button>
              <Button className="w-full" asChild>
                <Link href="/quote" onClick={() => setIsMenuOpen(false)}>
                  Get Quote
                </Link>
              </Button>
            </div>

            {/* Mobile Contact Info */}
            <div className="pt-4 border-t">
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span>{SITE_CONFIG.company.phone}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>{SITE_CONFIG.company.email}</span>
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
