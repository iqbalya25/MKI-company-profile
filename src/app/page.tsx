/* eslint-disable react/no-unescaped-entities */
// File: src/app/test-contentful/page.tsx
import {
  getProducts,
  getFeaturedProducts,
  getProductCategories,
} from "@/lib/contentful";

export default async function TestContentfulPage() {
  // Test fetching data from Contentful
  try {
    console.log("Testing Contentful connection...");

    const [products, featuredProducts, categories] = await Promise.all([
      getProducts({ limit: 5 }),
      getFeaturedProducts(3),
      getProductCategories(),
    ]);

    console.log("Fetched:", {
      products: products.length,
      featured: featuredProducts.length,
      categories: categories.length,
    });

    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Contentful Connection Test</h1>

        {/* Connection Status */}
        <div className="mb-8 p-4 rounded-lg bg-green-50 border border-green-200">
          <h2 className="text-xl font-semibold text-green-800 mb-2">
            ✅ Connection Successful!
          </h2>
          <p className="text-green-600">
            Successfully connected to Contentful CMS
          </p>
          <p className="text-sm text-green-500 mt-1">
            Space ID: {process.env.CONTENTFUL_SPACE_ID}
          </p>
        </div>

        {/* All Products */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            All Products ({products.length})
          </h2>
          {products.length > 0 ? (
            <div className="grid gap-4">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="border rounded-lg p-4 bg-white shadow-sm"
                >
                  <h3 className="font-semibold text-lg">{product.name}</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mt-2">
                    <p>
                      <strong>Brand:</strong> {product.brand}
                    </p>
                    <p>
                      <strong>Category:</strong> {product.category}
                    </p>
                    <p>
                      <strong>Model:</strong> {product.model}
                    </p>
                    <p>
                      <strong>In Stock:</strong>{" "}
                      {product.inStock ? "Yes" : "No"}
                    </p>
                    <p>
                      <strong>Featured:</strong>{" "}
                      {product.feature ? "Yes" : "No"}
                    </p>
                    <p>
                      <strong>Images:</strong> {product.images.length}
                    </p>
                  </div>
                  {product.description && (
                    <p className="text-sm text-gray-500 mt-2">
                      <strong>Description:</strong>{" "}
                      {product.description.substring(0, 100)}
                      {product.description.length > 100 ? "..." : ""}
                    </p>
                  )}
                  {product.price && (
                    <p className="text-sm text-green-600 mt-1">
                      <strong>Price:</strong> Rp{" "}
                      {product.price.toLocaleString("id-ID")}
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-yellow-700">
                No products found. Add some products in Contentful!
              </p>
              <div className="text-sm text-yellow-600 mt-2">
                <p>
                  <strong>To add products:</strong>
                </p>
                <ol className="list-decimal list-inside mt-1">
                  <li>Go to Contentful dashboard</li>
                  <li>Click "Content" → "Add entry" → "Product"</li>
                  <li>
                    Fill in the required fields (Name, Slug, Brand, Category,
                    Model)
                  </li>
                  <li>Click "Publish"</li>
                </ol>
              </div>
            </div>
          )}
        </section>

        {/* Featured Products */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            Featured Products ({featuredProducts.length})
          </h2>
          {featuredProducts.length > 0 ? (
            <div className="grid gap-4">
              {featuredProducts.map((product) => (
                <div
                  key={product.id}
                  className="border rounded-lg p-4 bg-blue-50"
                >
                  <h3 className="font-semibold text-lg">{product.name}</h3>
                  <p className="text-gray-600">
                    {product.brand} - {product.model}
                  </p>
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mt-2">
                    Featured Product
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-blue-700">
                No featured products. Mark some products as featured in
                Contentful!
              </p>
              <p className="text-sm text-blue-600 mt-1">
                Edit a product → Set "Featured" to True → Publish
              </p>
            </div>
          )}
        </section>

        {/* Categories */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            Product Categories ({categories.length})
          </h2>
          {categories.length > 0 ? (
            <div className="grid gap-2">
              {categories.map((category) => (
                <div
                  key={category.slug}
                  className="flex justify-between items-center p-3 bg-gray-50 rounded"
                >
                  <span className="font-medium">{category.name}</span>
                  <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-sm">
                    {category.count} products
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No categories found.</p>
          )}
        </section>

        {/* Environment Variables Check */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Environment Variables</h2>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span
                className={`w-3 h-3 rounded-full ${
                  process.env.CONTENTFUL_SPACE_ID
                    ? "bg-green-500"
                    : "bg-red-500"
                }`}
              ></span>
              <span>
                CONTENTFUL_SPACE_ID:{" "}
                {process.env.CONTENTFUL_SPACE_ID ? "✅ Set" : "❌ Missing"}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span
                className={`w-3 h-3 rounded-full ${
                  process.env.CONTENTFUL_ACCESS_TOKEN
                    ? "bg-green-500"
                    : "bg-red-500"
                }`}
              ></span>
              <span>
                CONTENTFUL_ACCESS_TOKEN:{" "}
                {process.env.CONTENTFUL_ACCESS_TOKEN ? "✅ Set" : "❌ Missing"}
              </span>
            </div>
          </div>
        </section>

        {/* Quick Test Data */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Quick Test</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-green-50 rounded-lg text-center">
              <h3 className="font-semibold text-green-800">Total Products</h3>
              <p className="text-2xl font-bold text-green-600">
                {products.length}
              </p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg text-center">
              <h3 className="font-semibold text-blue-800">Featured Products</h3>
              <p className="text-2xl font-bold text-blue-600">
                {featuredProducts.length}
              </p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg text-center">
              <h3 className="font-semibold text-purple-800">Categories</h3>
              <p className="text-2xl font-bold text-purple-600">
                {categories.length}
              </p>
            </div>
          </div>
        </section>

        {/* Next Steps */}
        <section className="p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h2 className="text-xl font-semibold text-blue-800 mb-2">
            🎉 Day 2 Complete!
          </h2>
          <p className="text-blue-600 mb-2">
            Your Contentful CMS is successfully connected!
          </p>
          <div className="text-sm text-blue-600">
            <p>
              <strong>Next Steps for Day 3:</strong>
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Build responsive header with navigation</li>
              <li>Create footer with company info</li>
              <li>Implement mobile menu</li>
              <li>Set up basic page layouts</li>
            </ul>
          </div>
        </section>
      </div>
    );
  } catch (error) {
    console.error("Contentful connection error:", error);

    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-red-600">
          Contentful Connection Error
        </h1>

        <div className="mb-8 p-4 rounded-lg bg-red-50 border border-red-200">
          <h2 className="text-xl font-semibold text-red-800 mb-2">
            ❌ Connection Failed
          </h2>
          <p className="text-red-600">Error connecting to Contentful CMS</p>
          <pre className="mt-2 text-sm text-red-500 bg-red-100 p-2 rounded overflow-auto">
            {error instanceof Error ? error.message : String(error)}
          </pre>
        </div>

        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h3 className="font-semibold text-yellow-800 mb-2">
            Troubleshooting Steps:
          </h3>
          <ol className="list-decimal list-inside text-yellow-700 space-y-1">
            <li>Check your .env.local file exists in the root directory</li>
            <li>
              Verify CONTENTFUL_SPACE_ID and CONTENTFUL_ACCESS_TOKEN are correct
            </li>
            <li>
              Restart your development server:{" "}
              <code className="bg-yellow-100 px-1 rounded">npm run dev</code>
            </li>
            <li>
              Make sure you have at least one published product in Contentful
            </li>
            <li>Check Contentful dashboard for any API issues</li>
          </ol>
        </div>

        {/* Environment Debug */}
        <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <h3 className="font-semibold text-gray-800 mb-2">
            Environment Debug:
          </h3>
          <div className="text-sm text-gray-600 space-y-1">
            <p>
              CONTENTFUL_SPACE_ID:{" "}
              {process.env.CONTENTFUL_SPACE_ID ? "Set ✅" : "Missing ❌"}
            </p>
            <p>
              CONTENTFUL_ACCESS_TOKEN:{" "}
              {process.env.CONTENTFUL_ACCESS_TOKEN ? "Set ✅" : "Missing ❌"}
            </p>
          </div>
        </div>
      </div>
    );
  }
}
