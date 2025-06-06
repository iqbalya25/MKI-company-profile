/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/blog/[slug]/page.tsx - FIXED CLIENT/SERVER COMPONENT ISSUES
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { 
  ArrowLeft, 
  Calendar, 
  User, 
  Clock, 
  Tag,
  BookOpen,
  ArrowRight
} from "lucide-react";
import { getBlogPostBySlug, getBlogPosts } from "@/lib/contentful";
import { generateBreadcrumbSchema } from "@/lib/schema";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Breadcrumb from "@/components/common/Breadcrumb";
import { SITE_CONFIG } from "@/lib/contants";
import ShareButton from "./shareButton";
import { JSX } from "react";

// Define proper types
interface BlogPageProps {
  params: {
    slug: string;
  };
}

interface BlogPost {
  title: string;
  slug: string;
  excerpt: string;
  content: any;
  featuredImage: {
    url: string;
    title: string;
    width: number;
    height: number;
  } | null;
  author: string;
  publishDate: string;
  tags: string[];
  seoTitle: string;
  seoDescription: string;
  id: string;
  createdAt: string;
  updatedAt: string;
}

interface TextMark {
  type: 'bold' | 'italic' | 'code';
}

interface RichTextNode {
  nodeType: string;
  value?: string;
  content?: RichTextNode[];
  marks?: TextMark[];
}

// Helper function to safely extract fields from Contentful entry
function extractBlogFields(entry: any): BlogPost | null {
  if (!entry || !entry.fields) {
    return null;
  }

  const fields = entry.fields;
  const sys = entry.sys || {};

  return {
    title: fields.title || "Untitled Post",
    slug: fields.slug || "",
    excerpt: fields.excerpt || "",
    content: fields.content || null,
    featuredImage: fields.featuredImage ? {
      url: fields.featuredImage.fields?.file?.url ? 
        `https:${fields.featuredImage.fields.file.url}` : "",
      title: fields.featuredImage.fields?.title || "",
      width: fields.featuredImage.fields?.file?.details?.image?.width || 800,
      height: fields.featuredImage.fields?.file?.details?.image?.height || 600,
    } : null,
    author: fields.author || "MKI Engineering Team",
    publishDate: fields.publishDate || sys.createdAt,
    tags: Array.isArray(fields.tags) ? fields.tags : [],
    seoTitle: fields.seoTitle || "",
    seoDescription: fields.seoDescription || "",
    id: sys.id || "",
    createdAt: sys.createdAt || new Date().toISOString(),
    updatedAt: sys.updatedAt || sys.createdAt || new Date().toISOString(),
  };
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const entry = await getBlogPostBySlug(params.slug);
  
  if (!entry) {
    return {
      title: "Blog Post Not Found | Mederi Karya Indonesia",
      description: "The requested blog post could not be found.",
    };
  }

  const blog = extractBlogFields(entry);
  if (!blog) {
    return {
      title: "Blog Post Not Found | Mederi Karya Indonesia", 
      description: "The requested blog post could not be found.",
    };
  }

  const title = blog.seoTitle || `${blog.title} | MKI Technical Blog`;
  const description = blog.seoDescription || blog.excerpt || 
    `${blog.title} - Technical insights and automation guides from Mederi Karya Indonesia engineering team.`;

  return {
    title,
    description,
    keywords: [
      "automation tutorial",
      "plc programming guide", 
      "technical blog indonesia",
      "automation troubleshooting",
      "engineering insights",
      ...blog.tags,
    ],
    authors: [{ name: blog.author }],
    openGraph: {
      title,
      description,
      type: "article",
      url: `/blog/${blog.slug}`,
      publishedTime: blog.publishDate,
      modifiedTime: blog.updatedAt,
      authors: [blog.author],
      images: blog.featuredImage?.url ? [
        {
          url: blog.featuredImage.url,
          width: blog.featuredImage.width,
          height: blog.featuredImage.height,
          alt: blog.title,
        }
      ] : [],
    },
    alternates: {
      canonical: `/blog/${blog.slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPageProps) {
  const entry = await getBlogPostBySlug(params.slug);
  
  if (!entry) {
    notFound();
  }

  const blog = extractBlogFields(entry);
  if (!blog) {
    notFound();
  }

  // Fetch related posts
  const relatedPostsEntries = await getBlogPosts(3);
  const relatedPosts = relatedPostsEntries
    .map(extractBlogFields)
    .filter((post): post is BlogPost => 
      post !== null && post.slug !== blog.slug
    )
    .slice(0, 3);

  // Calculate reading time
  const readingTime = calculateReadingTime(blog.content);

  // Breadcrumb data
  const breadcrumbItems = [
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog" },
    { name: blog.title, url: `/blog/${blog.slug}` },
  ];

  return (
    <>
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: blog.title,
            description: blog.excerpt,
            image: blog.featuredImage?.url ? [blog.featuredImage.url] : [],
            datePublished: blog.publishDate,
            dateModified: blog.updatedAt,
            author: {
              "@type": "Organization",
              name: blog.author,
            },
            publisher: {
              "@type": "Organization",
              name: SITE_CONFIG.company.name,
              logo: {
                "@type": "ImageObject",
                url: `${SITE_CONFIG.url}/logo.png`,
              },
            },
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `${SITE_CONFIG.url}/blog/${blog.slug}`,
            },
            articleSection: "Technical Guides",
            keywords: blog.tags.join(", "),
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBreadcrumbSchema(breadcrumbItems)),
        }}
      />

      {/* Page Header */}
      <div className="bg-white py-6 mt-20 border-b">
        <div className="container mx-auto px-4">
          <Breadcrumb items={breadcrumbItems} />
        </div>
      </div>

      {/* Article Content */}
      <article className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            
            {/* Article Header */}
            <header className="mb-12">
              {/* Tags */}
              {blog.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {blog.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      <Tag className="h-3 w-3 mr-1" />
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}

              {/* Title */}
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                {blog.title}
              </h1>

              {/* Excerpt */}
              {blog.excerpt && (
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  {blog.excerpt}
                </p>
              )}

              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 border-b border-gray-200 pb-6">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{blog.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <time dateTime={blog.publishDate}>
                    {new Date(blog.publishDate).toLocaleDateString('id-ID', {
                      year: 'numeric',
                      month: 'long', 
                      day: 'numeric'
                    })}
                  </time>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{readingTime} min read</span>
                </div>
                <ShareButton title={blog.title} url={`/blog/${blog.slug}`} />
              </div>
            </header>

            {/* Featured Image */}
            {blog.featuredImage?.url && (
              <div className="mb-12">
                <div className="aspect-video relative bg-gray-100 rounded-xl overflow-hidden">
                  <Image
                    src={blog.featuredImage.url}
                    alt={blog.featuredImage.title || blog.title}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                  />
                </div>
              </div>
            )}

            {/* Article Content */}
            <div className="prose prose-lg max-w-none">
              <BlogContent content={blog.content} />
            </div>

            {/* Article Footer */}
            <footer className="mt-16 pt-8 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <p className="text-sm text-gray-600 mb-2">Published by</p>
                  <p className="font-semibold text-gray-900">{blog.author}</p>
                  <p className="text-sm text-gray-600">
                    Mederi Karya Indonesia - Engineering Team
                  </p>
                </div>
                <ShareButton title={blog.title} url={`/blog/${blog.slug}`} />
              </div>
            </footer>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">
                Related Articles
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedPosts.map((post) => (
                  <RelatedPostCard key={post.id} post={post} />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-teal-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              Need Technical Support?
            </h2>
            <p className="text-teal-100 mb-8 text-lg">
              Our engineering team is ready to help with your automation challenges. 
              Get professional consultation and support services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-teal-600 hover:bg-gray-100" asChild>
                <Link href="/contact">
                  Contact Engineers
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-teal-600" asChild>
                <Link href="/services">Our Services</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Back to Blog */}
      <section className="py-8 bg-white border-t">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Button variant="outline" asChild>
              <Link href="/blog">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to All Articles
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

// Helper function to calculate reading time
function calculateReadingTime(content: any): number {
  if (!content) return 1;
  
  // Simple word count estimation for rich text
  const wordCount = JSON.stringify(content).split(/\s+/).length;
  const wordsPerMinute = 200;
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
}

// Component for rendering rich text content
function BlogContent({ content }: { content: any }) {
  if (!content) {
    return (
      <div className="text-center py-8">
        <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600">Content not available</p>
      </div>
    );
  }

  // Simple rich text rendering - you can enhance this with a proper rich text renderer
  return (
    <div className="space-y-4">
      {content.content?.map((node: RichTextNode, index: number) => (
        <RenderNode key={index} node={node} />
      )) || (
        <p className="text-gray-600">
          {typeof content === 'string' ? content : 'Content not available'}
        </p>
      )}
    </div>
  );
}

// Simple rich text node renderer
function RenderNode({ node }: { node: RichTextNode }): JSX.Element | null {
  if (!node) return null;

  switch (node.nodeType) {
    case 'paragraph':
      return (
        <p className="mb-4">
          {node.content?.map((child, index) => (
            <RenderNode key={index} node={child} />
          ))}
        </p>
      );
    
    case 'heading-1':
      return (
        <h1 className="text-3xl font-bold mt-8 mb-4">
          {node.content?.map((child, index) => (
            <RenderNode key={index} node={child} />
          ))}
        </h1>
      );
    
    case 'heading-2':
      return (
        <h2 className="text-2xl font-bold mt-6 mb-3">
          {node.content?.map((child, index) => (
            <RenderNode key={index} node={child} />
          ))}
        </h2>
      );
    
    case 'heading-3':
      return (
        <h3 className="text-xl font-bold mt-4 mb-2">
          {node.content?.map((child, index) => (
            <RenderNode key={index} node={child} />
          ))}
        </h3>
      );
    
    case 'unordered-list':
      return (
        <ul className="list-disc pl-6 mb-4">
          {node.content?.map((child, index) => (
            <RenderNode key={index} node={child} />
          ))}
        </ul>
      );
    
    case 'ordered-list':
      return (
        <ol className="list-decimal pl-6 mb-4">
          {node.content?.map((child, index) => (
            <RenderNode key={index} node={child} />
          ))}
        </ol>
      );
    
    case 'list-item':
      return (
        <li className="mb-1">
          {node.content?.map((child, index) => (
            <RenderNode key={index} node={child} />
          ))}
        </li>
      );
    
    case 'text':
      let textElement: JSX.Element | string = node.value || '';
      
      // Apply text formatting
      if (node.marks?.length) {
        node.marks.forEach((mark, markIndex) => {
          switch (mark.type) {
            case 'bold':
              textElement = <strong key={`bold-${markIndex}`}>{textElement}</strong>;
              break;
            case 'italic':
              textElement = <em key={`italic-${markIndex}`}>{textElement}</em>;
              break;
            case 'code':
              textElement = <code key={`code-${markIndex}`} className="bg-gray-100 px-1 rounded">{textElement}</code>;
              break;
          }
        });
      }
      
      return <>{textElement}</>;
    
    default:
      return null;
  }
}

// Related post card component
function RelatedPostCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
    >
      {post.featuredImage?.url && (
        <div className="aspect-video relative bg-gray-100">
          <Image
            src={post.featuredImage.url}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
      )}
      <div className="p-6">
        <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-teal-600 transition-colors line-clamp-2">
          {post.title}
        </h3>
        {post.excerpt && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
            {post.excerpt}
          </p>
        )}
        <div className="flex items-center gap-4 text-xs text-gray-500">
          <span>{post.author}</span>
          <span>•</span>
          <time dateTime={post.publishDate}>
            {new Date(post.publishDate).toLocaleDateString('id-ID')}
          </time>
        </div>
      </div>
    </Link>
  );
}