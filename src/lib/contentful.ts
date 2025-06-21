/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// File: src/lib/contentful.ts
import { createClient } from "contentful";
import { Product } from "@/types/product";
import { Service } from "@/types/service";

// Create Contentful client
const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
});

// Simple approach - let Contentful handle the types automatically
export async function getProducts(
  options: {
    limit?: number;
    skip?: number;
    category?: string;
    featured?: boolean;
  } = {}
): Promise<Product[]> {
  try {
    const query: any = {
      content_type: "product",
      limit: options.limit || 100,
    };

    if (options.category) {
      query["fields.category"] = options.category;
    }

    if (options.featured !== undefined) {
      query["fields.featured"] = options.featured;
    }

    if (options.skip) {
      query.skip = options.skip;
    }

    const response = await client.getEntries(query);
    return response.items.map(transformProduct);
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const response = await client.getEntries({
      content_type: "product",
      "fields.slug": slug,
      limit: 1,
    });

    if (response.items.length === 0) return null;
    return transformProduct(response.items[0]);
  } catch (error) {
    console.error("Error fetching product by slug:", error);
    return null;
  }
}

export async function getFeaturedProducts(
  limit: number = 6
): Promise<Product[]> {
  try {
    // Try different possible field names for featured
    let response;
    try {
      // First try 'featured'
      response = await client.getEntries({
        content_type: "product",
        "fields.featured": true,
        order: ["-sys.createdAt"],
        limit,
      });
    } catch (error) {
      // If 'featured' fails, try other possible names
      console.log("Trying alternative field names for featured...");
      try {
        response = await client.getEntries({
          content_type: "product",
          "fields.isFeatured": true,
          order: ["-sys.createdAt"],
          limit,
        });
      } catch (error2) {
        // If both fail, just get all products and filter manually
        console.log("Getting all products and filtering manually...");
        response = await client.getEntries({
          content_type: "product",
          order: ["-sys.createdAt"],
          limit: limit * 3, // Get more to filter from
        });
      }
    }

    const products = response.items.map(transformProduct);

    // Filter for featured products if we couldn't query directly
    const featuredProducts = products.filter(
      (product) => product.feature === true
    );

    return featuredProducts.slice(0, limit);
  } catch (error) {
    console.error("Error fetching featured products:", error);
    return [];
  }
}

export async function getProductsByCategory(
  category: string
): Promise<Product[]> {
  try {
    const response = await client.getEntries({
      content_type: "product",
      "fields.category": category,
      order: ["-sys.createdAt"],
    });

    return response.items.map(transformProduct);
  } catch (error) {
    console.error("Error fetching products by category:", error);
    return [];
  }
}

export async function getBlogPosts(limit: number = 10) {
  try {
    const response = await client.getEntries({
      content_type: "blogPost",
      order: ["-fields.publishDate"],
      limit,
    });

    return response.items;
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }
}

export async function getBlogPostBySlug(slug: string) {
  try {
    const response = await client.getEntries({
      content_type: "blogPost",
      "fields.slug": slug,
      limit: 1,
    });

    if (response.items.length === 0) return null;
    return response.items[0];
  } catch (error) {
    console.error("Error fetching blog post by slug:", error);
    return null;
  }
}

export async function getPageBySlug(slug: string) {
  try {
    const response = await client.getEntries({
      content_type: "page",
      "fields.slug": slug,
      limit: 1,
    });

    if (response.items.length === 0) return null;
    return response.items[0];
  } catch (error) {
    console.error("Error fetching page by slug:", error);
    return null;
  }
}

// Transform Contentful entry to our Product type
function transformProduct(item: any): Product {
  const fields = item.fields || {};

  // Helper function to safely get field values
  const getField = (fieldName: string, defaultValue: any = "") => {
    return fields[fieldName] ?? defaultValue;
  };

  // Helper function to safely get string field
  const getStringField = (
    fieldName: string,
    defaultValue: string = ""
  ): string => {
    const value = fields[fieldName];
    if (typeof value === "string") return value;
    if (value && typeof value === "object" && value.content) {
      // Handle rich text content
      return extractTextFromRichText(value);
    }
    return defaultValue;
  };

  // Helper function to extract text from Contentful rich text
  const extractTextFromRichText = (richText: any): string => {
    if (!richText || !richText.content) return "";

    let text = "";
    const traverse = (nodes: any[]) => {
      nodes.forEach((node) => {
        if (node.value) {
          text += node.value;
        }
        if (node.content) {
          traverse(node.content);
        }
      });
    };

    traverse(richText.content);
    return text.trim();
  };

  // Helper function to safely get asset URL
  const getAssetUrl = (asset: any): string => {
    if (!asset || !asset.fields || !asset.fields.file) return "";
    return `https:${asset.fields.file.url}`;
  };

  // Helper function to safely get images array
  const getImages = (images: any[]): string[] => {
    if (!Array.isArray(images)) return [];
    return images
      .filter((img) => img && img.fields && img.fields.file)
      .map((img) => `https:${img.fields.file.url}`);
  };

  return {
    id: item.sys?.id || "",
    name: getStringField("name", "Unnamed Product"),
    slug: getStringField("slug", ""),
    brand: getStringField("brand", ""),
    category: getStringField("category", ""),
    model: getStringField("model", ""),
    description: getStringField("description", ""),
    specification: getField("specifications", []),
    images: getImages(getField("images", [])),
    datasheet: getField("datasheets")
      ? getAssetUrl(getField("datasheets"))
      : undefined,
    price: getField("price"),
    priceNote: getStringField("priceNote"),
    showPrice: Boolean(getField("showPrice", false)),
    inStock: Boolean(getField("inStock", false)),
    feature: Boolean(
      getField("featured", false) || getField("isFeatured", false)
    ),
    seoTitle: getStringField("seoTitle"),
    seoDescription: getStringField("seoDescription"),
    createdAt: item.sys?.createdAt || new Date().toISOString(),
    updateAt:
      item.sys?.updatedAt || item.sys?.createdAt || new Date().toISOString(),
  };
}

// Search function for products
export async function searchProducts(searchTerm: string): Promise<Product[]> {
  try {
    const response = await client.getEntries({
      content_type: "product",
      query: searchTerm,
    });

    return response.items.map(transformProduct);
  } catch (error) {
    console.error("Error searching products:", error);
    return [];
  }
}

// Get product categories with counts
export async function getProductCategories() {
  try {
    const response = await client.getEntries({
      content_type: "product",
    });

    // Count products by category
    const categoryCounts: Record<string, number> = {};
    response.items.forEach((item) => {
      // Safely extract category as string
      const categoryField = item.fields?.category;
      const category =
        typeof categoryField === "string" ? categoryField : "Uncategorized";

      categoryCounts[category] = (categoryCounts[category] || 0) + 1;
    });

    return Object.entries(categoryCounts).map(([category, count]) => ({
      name: category,
      slug: category.toLowerCase().replace(/\s+/g, "-"),
      count,
    }));
  } catch (error) {
    console.error("Error fetching product categories:", error);
    return [];
  }
}

export async function getServices(
  options: {
    limit?: number;
    featured?: boolean;
  } = {}
): Promise<Service[]> {
  try {
    const query: any = {
      content_type: "services",
      limit: options.limit || 100,
    };

    if (options.featured !== undefined) {
      query["fields.featured"] = options.featured;
    }

    const response = await client.getEntries(query);
    return response.items.map(transformService);
  } catch (error) {
    console.error("Error fetching services:", error);
    return [];
  }
}

function transformService(item: any): Service {
  const fields = item.fields || {};

  return {
    id: item.sys?.id || "",
    name: fields.name || "",
    slug: fields.slug || "",
    shortDescription: fields.shortDescription || "",
    description: fields.description || "",
    image: fields.image?.fields?.file?.url
      ? `https:${fields.image.fields.file.url}`
      : "",
    features: fields.features || [],
    featured: Boolean(fields.featured || false),
    seoTitle: fields.seoTitle || "",
    seoDescription: fields.seoDescription || "",
    createdAt: item.sys?.createdAt || new Date().toISOString(),
    updatedAt: item.sys?.updatedAt || new Date().toISOString(),
  };
}

import { ProductFamily, ProductVariant } from "@/types/product";

// Transform Contentful entry to ProductFamily
function transformProductFamily(entry: any): ProductFamily {
  const fields = entry.fields || {};
  
  return {
    id: entry.sys?.id || "",
    name: fields.name || "",
    slug: fields.slug || "",
    brand: fields.brand || "",
    category: fields.category || "",
    series: fields.series || "",
    description: fields.description || "",
    keyFeatures: fields.keyFeatures || [],
    applications: fields.applications || [],
    
    variants: (fields.variants || []).map((variant: any) => ({
      model: variant.model || "",
      name: variant.name || "",
      sku: variant.sku || "",
      ioPoints: variant.ioPoints,
      inputPoints: variant.inputPoints,
      outputPoints: variant.outputPoints,
      outputType: variant.outputType,
      powerSupply: variant.powerSupply,
      specifications: variant.specifications || [],
      price: variant.price,
      priceNote: variant.priceNote,
      inStock: variant.inStock || false,
      leadTime: variant.leadTime,
      images: variant.images ? variant.images.map((img: any) => 
        img.fields?.file?.url ? `https:${img.fields.file.url}` : ""
      ).filter(Boolean) : [],
      datasheet: variant.datasheet?.fields?.file?.url ? 
        `https:${variant.datasheet.fields.file.url}` : undefined,
      searchKeywords: variant.searchKeywords || []
    })),
    
    defaultVariant: fields.defaultVariant || "",
    
    heroImage: fields.heroImage?.fields?.file?.url ? 
      `https:${fields.heroImage.fields.file.url}` : undefined,
    gallery: fields.gallery ? fields.gallery.map((img: any) =>
      img.fields?.file?.url ? `https:${img.fields.file.url}` : ""
    ).filter(Boolean) : [],
    brochure: fields.brochure?.fields?.file?.url ?
      `https:${fields.brochure.fields.file.url}` : undefined,
    
    seoTitle: fields.seoTitle || "",
    seoDescription: fields.seoDescription || "",
    focusKeywords: fields.focusKeywords || [],
    featured: fields.featured || false,
    
    createdAt: entry.sys?.createdAt || new Date().toISOString(),
    updatedAt: entry.sys?.updatedAt || new Date().toISOString()
  };
}

// Get all product families
export async function getProductFamilies(options: {
  limit?: number;
  category?: string;
  brand?: string;
  featured?: boolean;
} = {}): Promise<ProductFamily[]> {
  try {
    const query: any = {
      content_type: "productFamily",
      limit: options.limit || 100,
      order: ["-sys.createdAt"]
    };

    if (options.category) {
      query["fields.category"] = options.category;
    }
    if (options.brand) {
      query["fields.brand"] = options.brand;
    }
    if (options.featured !== undefined) {
      query["fields.featured"] = options.featured;
    }

    const response = await client.getEntries(query);
    return response.items.map(transformProductFamily);
  } catch (error) {
    console.error("Error fetching product families:", error);
    return [];
  }
}

// Get single product family by slug
export async function getProductFamilyBySlug(slug: string): Promise<ProductFamily | null> {
  try {
    const response = await client.getEntries({
      content_type: "productFamily",
      "fields.slug": slug,
      limit: 1,
    });

    if (response.items.length === 0) return null;
    return transformProductFamily(response.items[0]);
  } catch (error) {
    console.error("Error fetching product family by slug:", error);
    return null;
  }
}

// Get featured product families
export async function getFeaturedProductFamilies(limit: number = 6): Promise<ProductFamily[]> {
  return getProductFamilies({ featured: true, limit });
}

// Search product families and variants
export async function searchProductFamilies(searchTerm: string): Promise<ProductFamily[]> {
  try {
    const response = await client.getEntries({
      content_type: "productFamily",
      query: searchTerm,
    });

    return response.items.map(transformProductFamily);
  } catch (error) {
    console.error("Error searching product families:", error);
    return [];
  }
}

// Get categories from product families
export async function getProductFamilyCategories() {
  try {
    const families = await getProductFamilies();
    const categoryCounts: Record<string, number> = {};
    
    families.forEach((family) => {
      const category = family.category || "Uncategorized";
      categoryCounts[category] = (categoryCounts[category] || 0) + 1;
    });

    return Object.entries(categoryCounts).map(([category, count]) => ({
      name: category,
      slug: category.toLowerCase().replace(/\s+/g, "-"),
      count,
    }));
  } catch (error) {
    console.error("Error fetching product family categories:", error);
    return [];
  }
}
