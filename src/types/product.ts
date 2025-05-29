export interface Product {
  id: string;
  name: string;
  slug: string;
  brand: string;
  category: string;
  model: string;
  description: string;
  specification: ProductSpecification[];
  images: string[];
  datasheet?: string;
  price?: number;
  priceNote?: string;
  showPrice?: boolean;
  inStock: boolean;
  feature: boolean;
  seoTitle?: string;
  seoDescription?: string;
  createdAt: string;
  updateAt: string;
}

export interface ProductSpecification {
  name: string;
  value: string;
  unit?: string;
}

export interface ProductCategory {
    slug: string
    name: string
    description: string
    image?: string
    productCount : number
}

export interface QuoteRequest {
    id?: string
    companyName : string
    contactPerson : string
    email: string
    phone: string
    product : QouteProduct[]
    message?: string
    urgency: "low" | "medium" | "high"
    status?: "pending" | "quoted" | "closed"
    createdAt?: string
}

export interface QouteProduct {
    productId: string
    productName: string
    quantity: number
    specifications?: string
}