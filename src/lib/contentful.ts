/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// File: src/lib/contentful.ts - CLEAN VERSION (NO DEBUG LOGS)
import { createClient } from "contentful";
import { Product } from "@/types/product";
import { Service } from "@/types/service";

// Create Contentful client
const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
});

// UTILITY: Extract plain text from Contentful rich text
function extractTextFromRichText(richText: any): string {
  if (!richText || !richText.content) return "";

  let text = "";
  const traverse = (nodes: any[]) => {
    if (!Array.isArray(nodes)) return;

    nodes.forEach((node) => {
      // Handle text nodes
      if (node.nodeType === "text" && node.value) {
        text += node.value + " ";
      }
      // Handle paragraph and other block nodes
      if (node.content && Array.isArray(node.content)) {
        traverse(node.content);
      }
    });
  };

  if (Array.isArray(richText.content)) {
    traverse(richText.content);
  }

  return text.trim();
}

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
    return response.items.map((item) => transformProduct(item, "list"));
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
    return transformProduct(response.items[0], "detail");
  } catch (error) {
    console.error("Error fetching product by slug:", error);
    return null;
  }
}

export async function getFeaturedProducts(
  limit: number = 6
): Promise<Product[]> {
  try {
    let response;
    try {
      response = await client.getEntries({
        content_type: "product",
        "fields.featured": true,
        order: ["-sys.createdAt"],
        limit,
      });
    } catch (error) {
      try {
        response = await client.getEntries({
          content_type: "product",
          "fields.isFeatured": true,
          order: ["-sys.createdAt"],
          limit,
        });
      } catch (error2) {
        response = await client.getEntries({
          content_type: "product",
          order: ["-sys.createdAt"],
          limit: limit * 3,
        });
      }
    }

    const products = response.items.map((item) =>
      transformProduct(item, "list")
    );
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

    return response.items.map((item) => transformProduct(item, "list"));
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

// Transform Contentful entry to our Product type with context-aware rich text handling
function transformProduct(
  item: any,
  context: "list" | "detail" = "list"
): Product {
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
      return extractTextFromRichText(value);
    }
    return defaultValue;
  };

  // Context-aware description handling
  const getDescriptionField = () => {
    const value = fields.description;

    if (!value) return "No description available";

    if (typeof value === "string") return value;

    if (value && typeof value === "object" && value.nodeType && value.content) {
      if (context === "detail") {
        return value; // Preserve rich text object for detail pages
      } else {
        return extractTextFromRichText(value) || "No description available";
      }
    }

    if (value && typeof value === "object") {
      try {
        return JSON.stringify(value).substring(0, 200) + "...";
      } catch {
        return "Description available";
      }
    }

    return String(value || "No description available");
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
    id: String(item.sys?.id || ""),
    name: String(getStringField("name", "Unnamed Product")),
    slug: String(getStringField("slug", "")),
    brand: String(getStringField("brand", "")),
    category: String(getStringField("category", "")),
    model: String(getStringField("model", "")),
    description: getDescriptionField(),
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
}

// Search function for products
export async function searchProducts(searchTerm: string): Promise<Product[]> {
  try {
    const response = await client.getEntries({
      content_type: "product",
      query: searchTerm,
    });

    return response.items.map((item) => transformProduct(item, "list"));
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

    const categoryCounts: Record<string, number> = {};
    response.items.forEach((item) => {
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
    console.log("🔍 Fetching services from Contentful...");
    console.log("Environment:", process.env.NODE_ENV);
    console.log(
      "Space ID:",
      process.env.CONTENTFUL_SPACE_ID ? "Set ✅" : "Missing ❌"
    );
    console.log(
      "Access Token:",
      process.env.CONTENTFUL_ACCESS_TOKEN ? "Set ✅" : "Missing ❌"
    );

    const query: any = {
      content_type: "services",
      limit: options.limit || 100,
      include: 1, // Include linked assets
    };

    if (options.featured !== undefined) {
      query["fields.featured"] = options.featured;
    }

    const response = await client.getEntries(query);

    console.log(`📊 Found ${response.items.length} services in Contentful`);
    console.log(
      "Services:",
      response.items.map((item) => ({
        id: item.sys.id,
        name: item.fields.name,
        slug: item.fields.slug,
      }))
    );

    const transformedServices = response.items.map(transformService).filter(
      (service) => service.name && service.slug // Only include services with required fields
    );

    console.log(`✅ Returning ${transformedServices.length} valid services`);

    return transformedServices;
  } catch (error) {
    console.error("❌ Error fetching services:", error);
    console.error("Error details:", {
      message: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
    });

    // Return fallback services for development
    if (process.env.NODE_ENV === "development") {
      console.log("🔄 Using fallback services for development");
      return getFallbackServices();
    }

    return [];
  }
}

// ADD this function to contentful.ts
export async function getServiceBySlug(slug: string): Promise<Service | null> {
  try {
    const response = await client.getEntries({
      content_type: "services",
      "fields.slug": slug,
      limit: 1,
    });

    if (response.items.length === 0) return null;
    return transformService(response.items[0]);
  } catch (error) {
    console.error("Error fetching service by slug:", error);
    return null;
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

function getFallbackServices(): Service[] {
  return [
    {
      id: "fallback-1",
      name: "System Monitoring Energy",
      slug: "system-monitoring-energy",
      shortDescription: "Sistem monitoring energi",
      description:
        "Professional energy monitoring system configuration and optimization",
      image: "/images/services/energy-monitoring.jpg",
      features: ["System monitoring", "Energy Monitoring", "Efficiency Energy"],
      featured: true,
      seoTitle: "Energy Monitoring Services | MKI",
      seoDescription: "Professional energy monitoring system services",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "fallback-2",
      name: "New Panel System",
      slug: "new-panel-system",
      shortDescription: "New Panel System services",
      description: "Complete panel system design and installation services",
      image: "/images/services/panel-system.jpg",
      features: ["Perakitan Panel", "Panel Control PLC", "Panel Inverter"],
      featured: true,
      seoTitle: "Panel System Services | MKI",
      seoDescription: "Professional panel system installation services",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "fallback-3",
      name: "Inverter Setting / VSD Programming",
      slug: "inverter-setting-vsd-programming",
      shortDescription: "Inverter Programming services",
      description: "Expert inverter and VSD programming services",
      image: "/images/services/inverter-programming.jpg",
      features: ["Sistem Baru", "Troubleshooting", "Migrasi Sistem"],
      featured: true,
      seoTitle: "Inverter Programming Services | MKI",
      seoDescription: "Professional inverter and VSD programming services",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "fallback-4",
      name: "PLC Programming",
      slug: "plc-programming",
      shortDescription: "PLC Programming services",
      description: "Complete PLC programming and automation services",
      image: "/images/services/plc-programming.jpg",
      features: ["Sistem Baru", "Troubleshooting", "Migrasi Sistem"],
      featured: true,
      seoTitle: "PLC Programming Services | MKI",
      seoDescription: "Professional PLC programming and automation services",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];
}
