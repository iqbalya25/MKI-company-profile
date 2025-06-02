// src/app/page.tsx
import { getFeaturedProducts } from '@/lib/contentful'

interface SimpleProduct {
  sys: { id: string }
  fields: {
    name: string
    brand: string
    category: string
    model: string
  }
}

export default async function HomePage() {
  const products = await getFeaturedProducts()
  
  return (
    <main className="flex-1">
      <div className="container mx-auto py-20">
        <h1 className="text-4xl font-bold text-center mb-8">MKI Automation</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {products.map((product) => {
            const typedProduct = product as unknown as SimpleProduct
            return (
              <div key={typedProduct.sys.id} className="border p-6 rounded">
                <h3 className="text-xl font-semibold">{typedProduct.fields.name}</h3>
                <p>{typedProduct.fields.brand} - {typedProduct.fields.category}</p>
                <p className="text-sm">{typedProduct.fields.model}</p>
              </div>
            )
          })}
        </div>
      </div>
    </main>
  )
}