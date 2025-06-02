// File: src/types/contentful.ts
// Simplified types for our project

export interface ContentfulAsset {
  sys: {
    id: string;
  };
  fields: {
    title?: string;
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

export interface RichTextContent {
  nodeType: string;
  content?: RichTextNode[];
}

export interface RichTextNode {
  nodeType: string;
  content?: RichTextNode[];
  value?: string;
  marks?: Array<{
    type: string;
  }>;
}

// We're using `any` types for Contentful entries to avoid TypeScript conflicts
// The transformation happens in the lib/contentful.ts file
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ContentfulEntry = any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ContentfulCollection = any;
