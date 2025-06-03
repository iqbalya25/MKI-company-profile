/* eslint-disable react/no-unescaped-entities */
// File: src/components/home/FeaturedProducts.tsx
import Link from "next/link";
import { ArrowRight, ExternalLink, Settings, Headphones } from "lucide-react";
import { Product } from "@/types/product";
import { Button } from "@/components/ui/button";

interface FeaturedProductsProps {
  products: Product[];
}

const FeaturedProducts = ({ products }: FeaturedProductsProps) => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary-900 mb-4">
            Featured Products + Technical Support
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Produk automation pilihan dengan <strong>engineering services</strong> komprehensif - 
            parameter setting, commissioning, troubleshooting
          </p>
        </div>

        {/* Products Grid */}
        {products.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white border rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group"
                >
                  {/* Product Image */}
                  <div className="aspect-square bg-gray-100 relative overflow-hidden">
                    {product.images.length > 0 ? (
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-primary-50">
                        <span className="text-primary-400 text-sm">No Image Available</span>
                      </div>
                    )}
                    
                    {/* Featured Badge */}
                    <div className="absolute top-3 left-3">
                      <span className="bg-accent-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                        Featured
                      </span>
                    </div>

                    {/* Stock Status */}
                    <div className="absolute top-3 right-3">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                        product.inStock 
                          ? 'bg-success-100 text-success-700' 
                          : 'bg-orange-100 text-orange-700'
                      }`}>
                        {product.inStock ? 'Available' : 'Quote'}
                      </span>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-6">
                    {/* Brand */}
                    <div className="text-xs text-primary-600 font-medium mb-1">
                      {product.brand}
                    </div>

                    {/* Product Name */}
                    <h3 className="font-semibold text-lg text-primary-900 mb-2 line-clamp-2">
                      {product.name}
                    </h3>

                    {/* Model */}
                    <p className="text-sm text-muted-foreground mb-3">
                      Model: {product.model}
                    </p>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {product.description}
                    </p>

                    {/* Services Available */}
                    <div className="mb-4 p-3 bg-primary-50 rounded-lg">
                      <div className="text-xs font-semibold text-primary-900 mb-2">Services Available:</div>
                      <div className="flex items-center gap-4 text-xs text-primary-700">
                        <div className="flex items-center gap-1">
                          <Settings className="h-3 w-3" />
                          <span>Parameter Setting</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Headphones className="h-3 w-3" />
                          <span>Tech Support</span>
                        </div>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="mb-4">
                      {product.showPrice && product.price ? (
                        <span className="text-lg font-bold text-primary-600">
                          Rp {product.price.toLocaleString('id-ID')}
                        </span>
                      ) : (
                        <span className="text-sm text-muted-foreground">
                          Hubungi untuk harga kompetitif
                        </span>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <Button size="sm" asChild className="flex-1">
                        <Link href={`/products/${product.slug}`}>
                          View Details
                        </Link>
                      </Button>
                      <Button size="sm" variant="outline" asChild>
                        <Link href={`/quote?product=${product.slug}`}>
                          Quote
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* View All Products CTA */}
            <div className="text-center">
              <Button size="lg" variant="outline" asChild>
                <Link href="/products">
                  View All Products + Services
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </>
        ) : (
          /* No Products State */
          <div className="text-center py-12">
            <div className="bg-gray-50 rounded-lg p-8 max-w-md mx-auto">
              <ExternalLink className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Featured Products Coming Soon
              </h3>
              <p className="text-gray-500 mb-4">
                Tambahkan produk sebagai featured di Contentful CMS untuk menampilkannya disini
              </p>
              <div className="text-sm text-gray-600 mb-4">
                <p><strong>Cara menambahkan:</strong></p>
                <ol className="list-decimal list-inside text-left mt-2 space-y-1">
                  <li>Login ke Contentful</li>
                  <li>Edit produk yang ada</li>
                  <li>Set field "Featured" = True</li>
                  <li>Publish produk</li>
                </ol>
              </div>
              <Button variant="outline" asChild>
                <Link href="/products">
                  Browse All Products
                </Link>
              </Button>
            </div>
          </div>
        )}

        {/* Engineering Services CTA */}
        <div className="mt-16 bg-primary-50 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-primary-900 mb-4">
            Butuh Technical Support?
          </h3>
          <p className="text-primary-700 mb-6 max-w-2xl mx-auto">
            Tim engineering kami siap membantu parameter setting, commissioning, dan troubleshooting 
            untuk semua produk automation. Konsultasi gratis!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/services">
                Engineering Services
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/contact">
                Konsultasi Gratis
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;