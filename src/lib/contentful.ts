/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// File: src/lib/contentful.ts - UPDATED transformProduct function
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

// UPDATED: Transform Contentful entry to our Product type - Now properly handles rich text
// UPDATED: Transform Contentful entry to our Product type - FIXED FOR RICH TEXT
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
      // Handle rich text content by extracting plain text for fallback
      return extractTextFromRichText(value);
    }
    return defaultValue;
  };

  // UPDATED: Helper function to get rich text or string field - ENSURES CLEAN OUTPUT
  const getRichTextOrStringField = (
    fieldName: string,
    defaultValue: any = ""
  ) => {
    const value = fields[fieldName];

    // If it's a rich text object (has nodeType and content) - PRESERVE IT
    if (value && typeof value === "object" && value.nodeType && value.content) {
      // IMPORTANT: Return the rich text object AS-IS for the detail page
      // The ProductCard component will handle extracting plain text when needed
      return value;
    }

    // If it's a plain string
    if (typeof value === "string") {
      return value;
    }

    // Handle any other object types by converting to string
    if (value && typeof value === "object") {
      console.warn(
        `[Contentful] Field ${fieldName} contains unexpected object:`,
        value
      );
      try {
        return JSON.stringify(value);
      } catch {
        return String(defaultValue);
      }
    }

    return defaultValue;
  };

  // Helper function to extract text from Contentful rich text (for SEO/fallback purposes)
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

  // SAFE: Ensure all critical fields are properly typed
  const productData = {
    id: String(item.sys?.id || ""),
    name: String(getStringField("name", "Unnamed Product")),
    slug: String(getStringField("slug", "")),
    brand: String(getStringField("brand", "")),
    category: String(getStringField("category", "")),
    model: String(getStringField("model", "")),
    // IMPORTANT: Description can be rich text object OR string
    description: getRichTextOrStringField("description", ""),
    specification: getField("specifications", []),
    images: getImages(getField("images", [])),
    datasheet: getField("datasheets")
      ? getAssetUrl(getField("datasheets"))
      : undefined,
    price: getField("price") ? Number(getField("price")) : undefined,
    priceNote: String(getStringField("priceNote", "")),
    showPrice: Boolean(getField("showPrice", false)),
    inStock: Boolean(getField("inStock", false)),
    feature: Boolean(
      getField("featured", false) || getField("isFeatured", false)
    ),
    seoTitle: String(getStringField("seoTitle", "")),
    seoDescription: String(getStringField("seoDescription", "")),
    createdAt: String(item.sys?.createdAt || new Date().toISOString()),
    updateAt: String(
      item.sys?.updatedAt || item.sys?.createdAt || new Date().toISOString()
    ),
  };

  // DEBUG: Log the final product data (remove this after debugging)
  console.log("[transformProduct] Final product data:", {
    id: productData.id,
    name: productData.name,
    descriptionType: typeof productData.description,
    description: productData.description,
  });

  return productData;
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
