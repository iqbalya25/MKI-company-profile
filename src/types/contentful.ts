import { ProductSpecification } from "./product";

export interface ContentfulSys {
  id: string
  createdAt: string
  updatedAt: string // Fixed: was "updateAt"
  contentType?: {
    sys: {
      id: string
    }
  }
}

export interface ContentfulAsset {
  sys: {
    id: string;
  };
  fields: {
    title: string;
    file: {
      url: string;
      details: {
        size: number;
        image?: {
          width: number;
          height: number;
        };
      };
      fileName: string;
      contentType: string;
    };
  };
}

export interface ContentfulProduct {
    sys: {
        id: string
        createdAt: string
        updatedAt: string // Fixed: was "updateAt"
    }
    fields: {
        name: string
        slug: string
        brand: string
        category: string
        model: string
        description: string
        specifications?: ProductSpecification[] // Made optional
        images?: ContentfulAsset[] // Made optional
        datasheet?: ContentfulAsset
        price?: number
        priceNote?: string
        showPrice?: boolean
        inStock?: boolean // Made optional
        featured?: boolean // Made optional
        seoTitle?: string
        seoDescription?: string
    }
}

export interface ContentfulBlogPost {
    sys: {
        id: string
        createdAt: string
        updatedAt: string // Fixed: was "updateAt"
    }
    fields: {
        title: string
        slug: string
        excerpt: string
        content: RichTextContent
        featuredImage?: ContentfulAsset
        author: string
        publishDate: string
        tags?: string[] // Made optional
        seoTitle?: string
        seoDescription?: string
    }
}

export interface RichTextContent {
  nodeType: string
  content: RichTextNode[]
}

export interface RichTextNode {
  nodeType: string
  content?: RichTextNode[]
  value?: string
  marks?: Array<{
    type: string
  }>
}

export interface ContentfulPage {
  sys: ContentfulSys
  fields: {
    title: string
    slug: string
    content: RichTextContent
    seoTitle?: string
    seoDescription?: string
  }
}

// Contentful API Response Types
export interface ContentfulCollection<T> {
  total: number
  skip: number
  limit: number
  items: T[]
}

export interface ContentfulQuery {
  content_type?: string
  'fields.slug'?: string
  'fields.category'?: string
  'fields.featured'?: boolean
  order?: string[]
  limit?: number
  skip?: number
  query?: string
}