import { createClient, Entry, EntryFieldTypes } from 'contentful'
import type { 
  ContentfulProduct,
  ContentfulBlogPost,
  ContentfulPage,
  ContentfulQuery,
  ContentfulAsset 
} from '@/types'

// Define Contentful entry skeletons that match our content models
interface ProductSkeleton {
  contentTypeId: 'product'
  fields: {
    name: EntryFieldTypes.Text
    slug: EntryFieldTypes.Text
    brand: EntryFieldTypes.Text
    category: EntryFieldTypes.Text
    model: EntryFieldTypes.Text
    description: EntryFieldTypes.RichText
    specifications?: EntryFieldTypes.Object
    images?: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>
    datasheet?: EntryFieldTypes.AssetLink
    price?: EntryFieldTypes.Number
    priceNote?: EntryFieldTypes.Text
    showPrice?: EntryFieldTypes.Boolean
    inStock?: EntryFieldTypes.Boolean
    featured?: EntryFieldTypes.Boolean
    seoTitle?: EntryFieldTypes.Text
    seoDescription?: EntryFieldTypes.Text
  }
}

interface BlogPostSkeleton {
  contentTypeId: 'blogPost'
  fields: {
    title: EntryFieldTypes.Text
    slug: EntryFieldTypes.Text
    excerpt: EntryFieldTypes.Text
    content: EntryFieldTypes.RichText
    featuredImage?: EntryFieldTypes.AssetLink
    author: EntryFieldTypes.Text
    publishDate: EntryFieldTypes.Date
    tags?: EntryFieldTypes.Array<EntryFieldTypes.Text>
    seoTitle?: EntryFieldTypes.Text
    seoDescription?: EntryFieldTypes.Text
  }
}

interface PageSkeleton {
  contentTypeId: 'page'
  fields: {
    title: EntryFieldTypes.Text
    slug: EntryFieldTypes.Text
    content: EntryFieldTypes.RichText
    seoTitle?: EntryFieldTypes.Text
    seoDescription?: EntryFieldTypes.Text
  }
}

// Initialize Contentful client
const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
})

// Helper function to transform Contentful entry to our type
function transformProduct(entry: Entry<ProductSkeleton>): ContentfulProduct {
  return {
    sys: {
      id: entry.sys.id,
      createdAt: entry.sys.createdAt,
      updatedAt: entry.sys.updatedAt,
    },
    fields: {
      name: entry.fields.name,
      slug: entry.fields.slug,
      brand: entry.fields.brand,
      category: entry.fields.category,
      model: entry.fields.model,
      description: entry.fields.description,
      specifications: entry.fields.specifications,
      images: entry.fields.images,
      datasheet: entry.fields.datasheet,
      price: entry.fields.price,
      priceNote: entry.fields.priceNote,
      showPrice: entry.fields.showPrice,
      inStock: entry.fields.inStock,
      featured: entry.fields.featured,
      seoTitle: entry.fields.seoTitle,
      seoDescription: entry.fields.seoDescription,
    }
  }
}

function transformBlogPost(entry: Entry<BlogPostSkeleton>): ContentfulBlogPost {
  return {
    sys: {
      id: entry.sys.id,
      createdAt: entry.sys.createdAt,
      updatedAt: entry.sys.updatedAt,
    },
    fields: {
      title: entry.fields.title,
      slug: entry.fields.slug,
      excerpt: entry.fields.excerpt,
      content: entry.fields.content,
      featuredImage: entry.fields.featuredImage,
      author: entry.fields.author,
      publishDate: entry.fields.publishDate,
      tags: entry.fields.tags,
      seoTitle: entry.fields.seoTitle,
      seoDescription: entry.fields.seoDescription,
    }
  }
}

function transformPage(entry: Entry<PageSkeleton>): ContentfulPage {
  return {
    sys: {
      id: entry.sys.id,
      createdAt: entry.sys.createdAt,
      updatedAt: entry.sys.updatedAt,
    },
    fields: {
      title: entry.fields.title,
      slug: entry.fields.slug,
      content: entry.fields.content,
      seoTitle: entry.fields.seoTitle,
      seoDescription: entry.fields.seoDescription,
    }
  }
}

// Product Functions
export async function getProducts(query: ContentfulQuery = {}): Promise<ContentfulProduct[]> {
  try {
    const response = await client.getEntries<ProductSkeleton>({
      content_type: 'product',
      ...query,
    })
    return response.items.map(transformProduct)
  } catch (error) {
    console.error('Error fetching products:', error)
    return []
  }
}

export async function getProductBySlug(slug: string): Promise<ContentfulProduct | null> {
  try {
    const response = await client.getEntries<ProductSkeleton>({
      content_type: 'product',
      'fields.slug': slug,
      limit: 1,
    })
    const item = response.items[0]
    return item ? transformProduct(item) : null
  } catch (error) {
    console.error('Error fetching product by slug:', error)
    return null
  }
}

export async function getFeaturedProducts(limit: number = 6): Promise<ContentfulProduct[]> {
  try {
    const response = await client.getEntries<ProductSkeleton>({
      content_type: 'product',
      'fields.featured': true,
      order: ['-sys.createdAt'],
      limit,
    })
    return response.items.map(transformProduct)
  } catch (error) {
    console.error('Error fetching featured products:', error)
    return []
  }
}

export async function getProductsByCategory(category: string): Promise<ContentfulProduct[]> {
  try {
    const response = await client.getEntries<ProductSkeleton>({
      content_type: 'product',
      'fields.category': category,
      order: ['-sys.createdAt'],
    })
    return response.items.map(transformProduct)
  } catch (error) {
    console.error('Error fetching products by category:', error)
    return []
  }
}

// Blog Functions
export async function getBlogPosts(query: ContentfulQuery = {}): Promise<ContentfulBlogPost[]> {
  try {
    const response = await client.getEntries<BlogPostSkeleton>({
      content_type: 'blogPost',
      order: ['-fields.publishDate'],
      ...query,
    })
    return response.items.map(transformBlogPost)
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return []
  }
}

export async function getBlogPostBySlug(slug: string): Promise<ContentfulBlogPost | null> {
  try {
    const response = await client.getEntries<BlogPostSkeleton>({
      content_type: 'blogPost',
      'fields.slug': slug,
      limit: 1,
    })
    const item = response.items[0]
    return item ? transformBlogPost(item) : null
  } catch (error) {
    console.error('Error fetching blog post by slug:', error)
    return null
  }
}

export async function getRecentBlogPosts(limit: number = 5): Promise<ContentfulBlogPost[]> {
  try {
    const response = await client.getEntries<BlogPostSkeleton>({
      content_type: 'blogPost',
      order: ['-fields.publishDate'],
      limit,
    })
    return response.items.map(transformBlogPost)
  } catch (error) {
    console.error('Error fetching recent blog posts:', error)
    return []
  }
}

// Page Functions
export async function getPageBySlug(slug: string): Promise<ContentfulPage | null> {
  try {
    const response = await client.getEntries<PageSkeleton>({
      content_type: 'page',
      'fields.slug': slug,
      limit: 1,
    })
    const item = response.items[0]
    return item ? transformPage(item) : null
  } catch (error) {
    console.error('Error fetching page by slug:', error)
    return null
  }
}

// Search Functions
export async function searchContent(query: string): Promise<{
  products: ContentfulProduct[]
  blogPosts: ContentfulBlogPost[]
}> {
  try {
    const [productsResponse, blogPostsResponse] = await Promise.all([
      client.getEntries<ProductSkeleton>({
        content_type: 'product',
        query,
        limit: 10,
      }),
      client.getEntries<BlogPostSkeleton>({
        content_type: 'blogPost',
        query,
        limit: 5,
      }),
    ])

    return {
      products: productsResponse.items.map(transformProduct),
      blogPosts: blogPostsResponse.items.map(transformBlogPost),
    }
  } catch (error) {
    console.error('Error searching content:', error)
    return {
      products: [],
      blogPosts: [],
    }
  }
}

// Utility Functions
export function getImageUrl(asset: ContentfulAsset, width?: number, height?: number): string {
  if (!asset?.fields?.file?.url) return ''
  
  let url = `https:${asset.fields.file.url}`
  
  // Add image optimization parameters if provided
  const params = new URLSearchParams()
  if (width) params.append('w', width.toString())
  if (height) params.append('h', height.toString())
  params.append('fm', 'webp')
  params.append('q', '80')
  
  if (params.toString()) {
    url += `?${params.toString()}`
  }
  
  return url
}

export function formatContentfulDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

// Export client for advanced usage
export { client }