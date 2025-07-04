/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/blog/[slug]/page.tsx - FIXED VERSION WITH ORIGINAL RICH TEXT RENDERER
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
  ArrowRight,
} from "lucide-react";
import { getBlogPostBySlug, getBlogPosts } from "@/lib/contentful";
import { generateBreadcrumbSchema } from "@/lib/schema";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Breadcrumb from "@/components/common/Breadcrumb";
import { SITE_CONFIG } from "@/lib/contants";
import ShareButton from "./shareButton";
import {
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
  Key,
} from "react";

interface BlogPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Helper function to safely extract fields from Contentful entry
function extractBlogFields(entry: any) {
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
    featuredImage: fields.featuredImage
      ? {
          url: fields.featuredImage.fields?.file?.url
            ? `https:${fields.featuredImage.fields.file.url}`
            : null,
          title: fields.featuredImage.fields?.title || "",
          width:
            fields.featuredImage.fields?.file?.details?.image?.width || 800,
          height:
            fields.featuredImage.fields?.file?.details?.image?.height || 600,
        }
      : null,
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

export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = await getBlogPostBySlug(slug);

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
  const description =
    blog.seoDescription ||
    blog.excerpt ||
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
      images: blog.featuredImage?.url
        ? [
            {
              url: blog.featuredImage.url,
              width: blog.featuredImage.width,
              height: blog.featuredImage.height,
              alt: blog.title,
            },
          ]
        : [],
    },
    alternates: {
      canonical: `/blog/${blog.slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const entry = await getBlogPostBySlug(slug);

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
    .filter(
      (post): post is NonNullable<typeof post> =>
        post !== null && post.slug !== blog.slug
    )
    .slice(0, 3);

  // Calculate reading time
  const readingTime = calculateReadingTime(blog.content);

  // FIXED: Correct breadcrumb data
  const breadcrumbItems = [
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog" }, // FIXED: This now correctly links to /blog
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

      {/* FIXED: Page Header with Solid Color and Correct Breadcrumb */}
      <div className="bg-teal-600 py-8 mt-20 text-white">
        <div className="container mx-auto px-4">
          <Breadcrumb
            items={breadcrumbItems}
            className="[&_a]:text-teal-200 [&_a:hover]:text-white [&_span]:text-white [&_svg]:text-teal-200"
          />
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
                  {blog.tags.map(
                    (
                      tag:
                        | string
                        | number
                        | bigint
                        | boolean
                        | ReactElement<
                            unknown,
                            string | JSXElementConstructor<any>
                          >
                        | Iterable<ReactNode>
                        | ReactPortal
                        | Promise<
                            | string
                            | number
                            | bigint
                            | boolean
                            | ReactPortal
                            | ReactElement<
                                unknown,
                                string | JSXElementConstructor<any>
                              >
                            | Iterable<ReactNode>
                            | null
                            | undefined
                          >
                        | null
                        | undefined,
                      index: Key | null | undefined
                    ) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="text-xs"
                      >
                        <Tag className="h-3 w-3 mr-1" />
                        {tag}
                      </Badge>
                    )
                  )}
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
                    {new Date(blog.publishDate).toLocaleDateString("id-ID", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
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

            {/* FIXED: Featured Image - Smaller Size with Border */}
            {blog.featuredImage?.url && (
              <div className="mb-12">
                <div className="max-w-2xl mx-auto">
                  {" "}
                  {/* FIXED: Smaller container */}
                  <div className="relative bg-gray-100 rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                    {" "}
                    {/* FIXED: Added border */}
                    <Image
                      src={blog.featuredImage.url}
                      alt={blog.featuredImage.title || blog.title}
                      width={800}
                      height={500}
                      className="w-full h-auto object-contain" /* FIXED: object-contain to show full image */
                      priority
                      sizes="(max-width: 768px) 100vw, 800px"
                    />
                  </div>
                  {/* Image Caption */}
                  {blog.featuredImage.title && (
                    <p className="text-center text-sm text-gray-500 mt-3 italic">
                      {blog.featuredImage.title}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Article Content - USING YOUR ORIGINAL BlogContent COMPONENT */}
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
      <section className="py-16 bg-teal-600">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Need Technical Support?</h2>
            <p className="text-xl text-teal-100 mb-8">
              Our engineering team provides direct technical consultation and
              troubleshooting services for your automation projects.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 bg-white text-teal-600 font-semibold rounded-lg hover:bg-teal-50 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Contact Engineers
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-teal-600 hover:scale-105 transition-all duration-300"
              >
                Technical Services
              </Link>
            </div>
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

// Component for rendering rich text content - YOUR ORIGINAL WORKING VERSION
function BlogContent({ content }: { content: any }) {
  if (!content) {
    return (
      <div className="text-center py-8">
        <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600">Content not available</p>
      </div>
    );
  }

  // Simple rich text rendering - YOUR ORIGINAL VERSION
  return (
    <div className="space-y-4">
      {content.content?.map((node: any, index: number) => (
        <RenderNode key={index} node={node} />
      )) || (
        <p className="text-gray-600">
          {typeof content === "string" ? content : "Content not available"}
        </p>
      )}
    </div>
  );
}

// Simple rich text node renderer - YOUR ORIGINAL WORKING VERSION
function RenderNode({ node }: { node: any }) {
  if (!node) return null;

  switch (node.nodeType) {
    case "paragraph":
      return (
        <p className="mb-4">
          {node.content?.map((child: any, index: number) => (
            <RenderNode key={index} node={child} />
          ))}
        </p>
      );

    case "heading-1":
      return (
        <h1 className="text-3xl font-bold mt-8 mb-4">
          {node.content?.map((child: any, index: number) => (
            <RenderNode key={index} node={child} />
          ))}
        </h1>
      );

    case "heading-2":
      return (
        <h2 className="text-2xl font-bold mt-6 mb-3">
          {node.content?.map((child: any, index: number) => (
            <RenderNode key={index} node={child} />
          ))}
        </h2>
      );

    case "heading-3":
      return (
        <h3 className="text-xl font-bold mt-4 mb-2">
          {node.content?.map((child: any, index: number) => (
            <RenderNode key={index} node={child} />
          ))}
        </h3>
      );

    case "unordered-list":
      return (
        <ul className="list-disc pl-6 mb-4">
          {node.content?.map((child: any, index: number) => (
            <RenderNode key={index} node={child} />
          ))}
        </ul>
      );

    case "ordered-list":
      return (
        <ol className="list-decimal pl-6 mb-4">
          {node.content?.map((child: any, index: number) => (
            <RenderNode key={index} node={child} />
          ))}
        </ol>
      );

    case "list-item":
      return (
        <li className="mb-1">
          {node.content?.map((child: any, index: number) => (
            <RenderNode key={index} node={child} />
          ))}
        </li>
      );

    case "text":
      let text = node.value || "";

      // Apply text formatting
      if (node.marks?.length > 0) {
        node.marks.forEach((mark: any) => {
          switch (mark.type) {
            case "bold":
              text = <strong key="bold">{text}</strong>;
              break;
            case "italic":
              text = <em key="italic">{text}</em>;
              break;
            case "code":
              text = (
                <code key="code" className="bg-gray-100 px-1 rounded">
                  {text}
                </code>
              );
              break;
          }
        });
      }

      return text;

    default:
      return null;
  }
}

// Related post card component
function RelatedPostCard({
  post,
}: {
  post: NonNullable<ReturnType<typeof extractBlogFields>>;
}) {
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
            {new Date(post.publishDate).toLocaleDateString("id-ID")}
          </time>
        </div>
      </div>
    </Link>
  );
}
