// File: src/types/product.ts
export interface ProductVariant {
  model: string;           // "FX5U-32MR/ES-A"
  name: string;           // "32 I/O Relay Output"  
  sku: string;            // "FX5U-32MR"
  ioPoints?: number;      // 32
  inputPoints?: number;   // 16
  outputPoints?: number;  // 16
  outputType?: string;    // "Relay" | "Transistor"
  powerSupply?: string;   // "24V DC"
  specifications: ProductSpecification[];
  price?: number;
  priceNote?: string;
  inStock: boolean;
  leadTime?: string;
  images?: string[];      // Asset URLs
  datasheet?: string;     // Asset URL
  manual?: string;        // Asset URL
  searchKeywords?: string[];
}

export interface ProductFamily {
  id: string;
  name: string;           // "Mitsubishi FX5U PLC Series"
  slug: string;           // "mitsubishi-fx5u-plc"
  brand: string;          // "Mitsubishi"
  category: string;       // "PLC"
  series: string;         // "FX5U"
  description: string;    // Rich text content
  keyFeatures?: string[]; // ["Built-in Ethernet", "High-speed processing"]
  applications?: string[]; // ["Manufacturing", "Process Control"]
  
  // Variants
  variants: ProductVariant[];
  defaultVariant: string; // SKU of default variant
  
  // Media
  heroImage?: string;     // Main image URL
  gallery?: string[];     // Additional images
  brochure?: string;      // Brochure PDF URL
  
  // SEO
  seoTitle?: string;
  seoDescription?: string;
  focusKeywords?: string[];
  featured?: boolean;
  
  // Timestamps
  createdAt: string;
  updatedAt: string;
}

// Keep existing Product interface for backward compatibility
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
  showPrice: boolean;
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
    product : QuoteProduct[]
    message?: string
    urgency: "low" | "medium" | "high"
    status?: "pending" | "quoted" | "closed"
    createdAt?: string
}

export interface QuoteProduct {
    productId: string
    productName: string
    quantity: number
    specifications?: string
}