/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
// src/app/blog/page.tsx - SEO OPTIMIZED BLOG LISTING
import { Metadata } from "next";
import { Suspense } from "react";
import { getBlogPosts } from "@/lib/contentful";

import Breadcrumb from "@/components/common/Breadcrumb";
import { generateBreadcrumbSchema } from "@/lib/schema";
import { Search, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import BlogGrid from "@/components/blog/BlogGrid";

interface BlogPageProps {
  searchParams: {
    page?: string;
    tag?: string;
    search?: string;
  };
}

export async function generateMetadata({
  searchParams,
}: BlogPageProps): Promise<Metadata> {
  const tag = searchParams.tag;
  const search = searchParams.search;

  let title = "Technical Blog - Automation Tutorials & Guides | Mederi Karya Indonesia";
  let description =
    "Expert automation tutorials, troubleshooting guides, and technical articles. Learn PLC programming, HMI configuration, inverter parameter setting from professionals.";

  if (tag) {
    title = `${tag} Articles - Technical Blog | MKI`;
    description = `Technical articles and tutorials about ${tag}. Expert guides from automation professionals at Mederi Karya Indonesia.`;
  }

  if (search) {
    title = `Search: "${search}" - Technical Blog | MKI`;
    description = `Search results for "${search}" in our technical automation blog. Find tutorials, guides, and troubleshooting tips.`;
  }

  return {
    title,
    description,
    keywords: [
      "automation blog indonesia",
      "plc programming tutorial",
      "hmi configuration guide",
      "inverter troubleshooting",
      "technical automation articles",
      "industrial automation tips",
      "engineering tutorials indonesia",
    ],
    openGraph: {
      title,
      description,
      url: "/blog",
      type: "website",
    },
    alternates: {
      canonical: "/blog",
    },
  };
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { page = "1", tag, search } = searchParams;
  const currentPage = parseInt(page);
  const itemsPerPage = 9;

  // Fetch all blog posts
  const allPosts = await getBlogPosts(100);

  // Transform Contentful response to our format
  const transformedPosts = allPosts.map((post: any) => ({
    id: post.sys.id,
    title: post.fields.title || "",
    slug: post.fields.slug || "",
    excerpt: post.fields.excerpt || "",
    content: post.fields.content || {},
    featuredImage: post.fields.featuredImage?.fields?.file?.url
      ? `https:${post.fields.featuredImage.fields.file.url}`
      : null,
    author: post.fields.author || "MKI Engineering Team",
    publishDate: post.fields.publishDate || post.sys.createdAt,
    tags: Array.isArray(post.fields.tags) ? post.fields.tags : [],
    seoTitle: post.fields.seoTitle || "",
    seoDescription: post.fields.seoDescription || "",
    createdAt: post.sys.createdAt,
    updatedAt: post.sys.updatedAt,
  }));

  // Filter posts based on search params
  let filteredPosts = transformedPosts;

  if (tag) {
    filteredPosts = filteredPosts.filter((post) =>
      post.tags.some((t: string) => t.toLowerCase() === tag.toLowerCase())
    );
  }

  if (search) {
    const searchLower = search.toLowerCase();
    filteredPosts = filteredPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(searchLower) ||
        post.excerpt.toLowerCase().includes(searchLower) ||
        post.tags.some((t: string) => t.toLowerCase().includes(searchLower))
    );
  }

  // Pagination
  const totalPosts = filteredPosts.length;
  const totalPages = Math.ceil(totalPosts / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedPosts = filteredPosts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Get all unique tags for filter
  const allTags = Array.from(
    new Set(transformedPosts.flatMap((post) => post.tags))
  ).sort();

  // Breadcrumb data
  const breadcrumbItems = [
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog" },
  ];

  if (tag) {
    breadcrumbItems.push({
      name: tag,
      url: `/blog?tag=${tag}`,
    });
  }

  return (
    <>
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBreadcrumbSchema(breadcrumbItems)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            name: "MKI Technical Blog",
            description:
              "Technical articles and tutorials about industrial automation",
            url: "/blog",
            publisher: {
              "@type": "Organization",
              name: "Mederi Karya Indonesia",
            },
            blogPost: paginatedPosts.slice(0, 5).map((post) => ({
              "@type": "BlogPosting",
              headline: post.title,
              description: post.excerpt,
              datePublished: post.publishDate,
              author: {
                "@type": "Person",
                name: post.author,
              },
              url: `/blog/${post.slug}`,
            })),
          }),
        }}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-teal-600 to-teal-700 text-white py-16 mt-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Technical Blog
              <span className="block text-teal-200 text-2xl font-normal mt-2">
                Automation Tutorials & Engineering Insights
              </span>
            </h1>
            <p className="text-xl text-teal-100 mb-8">
              Learn from our engineering experts. Practical guides, troubleshooting
              tips, and technical tutorials for industrial automation professionals.
            </p>
            <div className="flex items-center justify-center gap-6">
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                <span>{totalPosts} Articles</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-2">
                <span>{allTags.length} Topics</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <Breadcrumb items={breadcrumbItems} className="mb-8" />

          {/* Search and Filters */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Search Form */}
              <div className="flex-1">
                <form action="/blog" method="get" className="flex gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      name="search"
                      placeholder="Search articles..."
                      defaultValue={search}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>
                  <Button type="submit">Search</Button>
                </form>
              </div>

              {/* Tag Filter - Show current filter */}
              {(tag || search) && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Filtered by:</span>
                  {tag && (
                    <Link
                      href="/blog"
                      className="inline-flex items-center gap-1 px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-sm hover:bg-teal-200 transition-colors"
                    >
                      {tag}
                      <span className="text-teal-500">×</span>
                    </Link>
                  )}
                  {search && (
                    <Link
                      href="/blog"
                      className="inline-flex items-center gap-1 px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm hover:bg-gray-300 transition-colors"
                    >
                      "{search}"
                      <span className="text-gray-500">×</span>
                    </Link>
                  )}
                </div>
              )}
            </div>

            {/* Popular Tags */}
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">
                Popular Topics:
              </h3>
              <div className="flex flex-wrap gap-2">
                {allTags.slice(0, 10).map((tagName) => (
                  <Link
                    key={tagName}
                    href={`/blog?tag=${encodeURIComponent(tagName)}`}
                    className="inline-block px-3 py-1 bg-white border border-gray-300 rounded-full text-sm text-gray-700 hover:bg-teal-50 hover:border-teal-300 hover:text-teal-700 transition-colors"
                  >
                    {tagName}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Results Summary */}
          {(tag || search) && (
            <div className="mb-6 text-gray-600">
              Found <span className="font-semibold text-gray-900">{totalPosts}</span> 
              {totalPosts === 1 ? " article" : " articles"}
              {tag && <span> tagged with "{tag}"</span>}
              {search && <span> matching "{search}"</span>}
            </div>
          )}

          {/* Blog Grid */}
          <Suspense fallback={<BlogGridSkeleton />}>
            <BlogGrid
              posts={paginatedPosts}
              currentPage={currentPage}
              totalPages={totalPages}
              totalPosts={totalPosts}
              baseUrl="/blog"
              searchParams={searchParams}
            />
          </Suspense>

          {/* Newsletter CTA */}
          {totalPosts > 0 && (
            <div className="mt-16 bg-gradient-to-br from-teal-600 to-teal-700 rounded-2xl p-10 text-center text-white">
              <h2 className="text-2xl font-bold mb-4">
                Stay Updated with Automation Insights
              </h2>
              <p className="text-teal-100 mb-6 max-w-2xl mx-auto">
                Get the latest technical articles, troubleshooting guides, and
                engineering tips delivered to your inbox.
              </p>
              <Button size="lg" className="bg-white text-teal-600 hover:bg-gray-100" asChild>
                <Link href="/contact">
                  Subscribe to Updates
                </Link>
              </Button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

// Loading skeleton
function BlogGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="animate-pulse">
          <div className="bg-gray-200 h-48 rounded-lg mb-4" />
          <div className="h-4 bg-gray-200 rounded mb-2" />
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
          <div className="h-3 bg-gray-200 rounded w-1/2" />
        </div>
      ))}
    </div>
  );
}