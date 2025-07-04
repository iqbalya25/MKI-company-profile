/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
// src/app/blog/page.tsx - COMPLETE BLOG PAGE WITH FIXES
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Calendar,
  User,
  ArrowRight,
  Clock,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { getBlogPosts } from "@/lib/contentful";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Breadcrumb from "@/components/common/Breadcrumb";
import {
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
  Key,
} from "react";

export const metadata: Metadata = {
  title: "Technical Blog & Automation Guides | Mederi Karya Indonesia",
  description:
    "Expert insights on industrial automation: PLC programming tutorials, troubleshooting guides, parameter setting tips, and engineering best practices from MKI team.",
  keywords: [
    "automation blog indonesia",
    "plc programming tutorial",
    "automation troubleshooting guide",
    "technical blog automation",
    "engineering insights indonesia",
    "parameter setting guide",
    "automation best practices",
    "industrial automation tips",
  ],
  openGraph: {
    title: "Technical Blog & Automation Guides | MKI",
    description: "Expert engineering insights and automation tutorials",
    url: "/blog",
    type: "website",
  },
};

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
    featuredImage: fields.featuredImage
      ? {
          url: fields.featuredImage.fields?.file?.url
            ? `https:${fields.featuredImage.fields.file.url}`
            : null,
          title: fields.featuredImage.fields?.title || "",
          width:
            fields.featuredImage.fields?.file?.details?.image?.width || 400,
          height:
            fields.featuredImage.fields?.file?.details?.image?.height || 300,
        }
      : null,
    author: fields.author || "MKI Engineering Team",
    publishDate: fields.publishDate || sys.createdAt,
    tags: Array.isArray(fields.tags) ? fields.tags : [],
    category: fields.category || "Technical Guide",
    readingTime: fields.readingTime || 5,
  };
}

// Calculate reading time from excerpt
function calculateReadingTime(text: string): number {
  const wordsPerMinute = 200;
  const wordCount = text.split(" ").length;
  return Math.ceil(wordCount / wordsPerMinute) || 5;
}

// Main page component
export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; tag?: string; category?: string }>;
}) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;
  const pageSize = 6;

  try {
    const rawPosts = await getBlogPosts(100);
    const posts = rawPosts
      .map(extractBlogFields)
      .filter(Boolean) as NonNullable<ReturnType<typeof extractBlogFields>>[];

    // Filter by tag or category if provided
    let filteredPosts = posts;
    if (params.tag) {
      filteredPosts = posts.filter((post) =>
        post.tags.some((tag: string) =>
          tag.toLowerCase().includes(params.tag!.toLowerCase())
        )
      );
    }
    if (params.category) {
      filteredPosts = posts.filter((post) =>
        post.category.toLowerCase().includes(params.category!.toLowerCase())
      );
    }

    const totalPosts = filteredPosts.length;
    const totalPages = Math.ceil(totalPosts / pageSize);
    const startIndex = (currentPage - 1) * pageSize;
    const paginatedPosts = filteredPosts.slice(
      startIndex,
      startIndex + pageSize
    );

    // Helper for pagination URLs
    const getPaginationUrl = (page: number) => {
      if (page < 1 || page > totalPages) return "/blog";
      const urlParams = new URLSearchParams();
      if (page > 1) urlParams.set("page", page.toString());
      if (params.tag) urlParams.set("tag", params.tag);
      if (params.category) urlParams.set("category", params.category);
      return urlParams.toString() ? `/blog?${urlParams.toString()}` : "/blog";
    };

    return (
      <>
        {/* Header Section with Breadcrumb */}
        <section className="bg-teal-600 py-16 text-white mt-20">
          <div className="container mx-auto px-4">
            {/* Breadcrumb inside header */}
            <div className="mb-8">
              <Breadcrumb
                items={[
                  { name: "Home", url: "/" },
                  { name: "Blog", url: "/blog" },
                ]}
                className="[&_a]:text-teal-200 [&_a:hover]:text-white [&_span]:text-white [&_svg]:text-teal-200"
              />
            </div>

            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                Technical Blog & Automation Guides
              </h1>
              <p className="text-xl text-teal-100 mb-8">
                Expert insights, tutorials, and troubleshooting guides from our
                engineering team. Stay updated with the latest automation
                technologies and best practices.
              </p>

              {/* Active filters display */}
              {(params.tag || params.category) && (
                <div className="flex items-center justify-center gap-4 mb-6">
                  <span className="text-sm text-teal-200">Filtered by:</span>
                  {params.tag && (
                    <Badge
                      variant="secondary"
                      className="flex items-center gap-2 bg-white/10 text-white border-white/20"
                    >
                      Tag: {params.tag}
                      <Link href="/blog" className="hover:text-red-300">
                        ×
                      </Link>
                    </Badge>
                  )}
                  {params.category && (
                    <Badge
                      variant="secondary"
                      className="flex items-center gap-2 bg-white/10 text-white border-white/20"
                    >
                      Category: {params.category}
                      <Link href="/blog" className="hover:text-red-300">
                        ×
                      </Link>
                    </Badge>
                  )}
                </div>
              )}

              <div className="text-lg text-white/90">
                {totalPosts} article{totalPosts !== 1 ? "s" : ""} available
              </div>
            </div>
          </div>
        </section>

        {/* Blog Posts Grid - Card Layout */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            {paginatedPosts.length > 0 ? (
              <div className="grid gap-6 max-w-4xl mx-auto">
                {paginatedPosts.map((post) => (
                  <BlogPostCard key={post.slug} post={post} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="max-w-md mx-auto">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    No articles found
                  </h3>
                  <p className="text-gray-600 mb-8">
                    We couldn't find any articles matching your criteria.
                  </p>
                  <Button asChild>
                    <Link href="/blog">View All Articles</Link>
                  </Button>
                </div>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-4xl mx-auto">
                {/* Page Info */}
                <div className="text-sm text-gray-600">
                  Page {currentPage} of {totalPages} ({totalPosts} articles)
                </div>

                {/* Pagination Controls */}
                <div className="flex items-center gap-2">
                  {/* Previous Button */}
                  <Link
                    href={getPaginationUrl(currentPage - 1)}
                    className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg border transition-colors ${
                      currentPage === 1
                        ? "border-gray-200 text-gray-400 cursor-not-allowed pointer-events-none"
                        : "border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400"
                    }`}
                  >
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Previous
                  </Link>

                  {/* Page Numbers */}
                  <div className="hidden sm:flex items-center gap-1">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }

                      return (
                        <Link
                          key={pageNum}
                          href={getPaginationUrl(pageNum)}
                          className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                            currentPage === pageNum
                              ? "bg-teal-600 text-white"
                              : "text-gray-700 hover:bg-gray-100"
                          }`}
                        >
                          {pageNum}
                        </Link>
                      );
                    })}
                  </div>

                  {/* Next Button */}
                  <Link
                    href={getPaginationUrl(currentPage + 1)}
                    className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg border transition-colors ${
                      currentPage === totalPages
                        ? "border-gray-200 text-gray-400 cursor-not-allowed pointer-events-none"
                        : "border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400"
                    }`}
                  >
                    Next
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-teal-600">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center text-white">
              <h2 className="text-3xl font-bold mb-4">
                Need Technical Support?
              </h2>
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

        {/* Schema Markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Blog",
              name: "Mederi Karya Indonesia Technical Blog",
              description: "Technical insights and automation guides",
              url: "/blog",
              publisher: {
                "@type": "Organization",
                name: "Mederi Karya Indonesia",
              },
              blogPost: paginatedPosts.slice(0, 10).map((post) => ({
                "@type": "BlogPosting",
                headline: post.title,
                description: post.excerpt,
                datePublished: post.publishDate,
                author: {
                  "@type": "Organization",
                  name: post.author,
                },
                url: `/blog/${post.slug}`,
              })),
            }),
          }}
        />
      </>
    );
  } catch (error) {
    console.error("Error loading blog posts:", error);

    return (
      <div className="min-h-screen flex items-center justify-center mt-20">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Blog Currently Unavailable
          </h1>
          <p className="text-gray-600 mb-8">
            We're experiencing technical difficulties. Please try again later.
          </p>
          <Button asChild>
            <Link href="/">Return Home</Link>
          </Button>
        </div>
      </div>
    );
  }
}

// Blog Post Card Component - CONSISTENT HEIGHT VERSION
function BlogPostCard({
  post,
}: {
  post: NonNullable<ReturnType<typeof extractBlogFields>>;
}) {
  const readingTime = post.readingTime || calculateReadingTime(post.excerpt);

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg hover:border-teal-200 transition-all duration-300 overflow-hidden h-80"
    >
      <div className="flex flex-col md:flex-row h-full">
        {/* Image Section - Left Side */}
        <div className="md:w-80 md:flex-shrink-0">
          <div className="aspect-video md:aspect-square relative bg-gray-100">
            {post.featuredImage?.url ? (
              <Image
                src={post.featuredImage.url}
                alt={post.featuredImage.title || post.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, 320px"
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center text-gray-400">
                  <div className="w-16 h-16 mx-auto mb-2 bg-gray-200 rounded-lg flex items-center justify-center">
                    <Calendar className="w-8 h-8" />
                  </div>
                  <span className="text-sm">No Image</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Content Section - Right Side */}
        <div className="flex-1 p-6 flex flex-col">
          {/* Category Badge */}
          <div className="mb-3">
            <Badge variant="secondary" className="text-xs">
              {post.category}
            </Badge>
          </div>

          {/* Title */}
          <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-teal-600 transition-colors">
            {post.title}
          </h2>

          {/* Excerpt */}
          {post.excerpt && (
            <p className="text-gray-600 mb-4 line-clamp-3 text-sm leading-relaxed flex-grow">
              {post.excerpt}
            </p>
          )}

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.slice(0, 3).map((tag: string) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-md"
                >
                  {tag}
                </span>
              ))}
              {post.tags.length > 3 && (
                <span className="text-xs text-gray-400">
                  +{post.tags.length - 3} more
                </span>
              )}
            </div>
          )}

          {/* Meta Info & Read More */}
          <div className="flex items-center justify-between mt-auto">
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <div className="flex items-center gap-1">
                <User className="h-3 w-3" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <time dateTime={post.publishDate}>
                  {new Date(post.publishDate).toLocaleDateString("id-ID", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </time>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{readingTime} min read</span>
              </div>
            </div>

            {/* Read More Link */}
            <span className="inline-flex items-center text-teal-600 font-medium text-sm group-hover:text-teal-700">
              Read More
              <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
