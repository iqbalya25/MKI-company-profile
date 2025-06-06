/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
// src/app/blog/page.tsx - COMPLETE BLOG LISTING PAGE
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Calendar, User, ArrowRight, BookOpen, Tag, Clock } from "lucide-react";
import { getBlogPosts } from "@/lib/contentful";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Breadcrumb from "@/components/common/Breadcrumb";
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, Key } from "react";

export const metadata: Metadata = {
  title: "Technical Blog & Automation Guides | Mederi Karya Indonesia",
  description: "Expert insights on industrial automation: PLC programming tutorials, troubleshooting guides, parameter setting tips, and engineering best practices from MKI team.",
  keywords: [
    "automation blog indonesia",
    "plc programming tutorial",
    "automation troubleshooting guide",
    "technical blog automation",
    "engineering insights indonesia",
    "parameter setting guide",
    "automation best practices",
    "industrial automation tips"
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
    featuredImage: fields.featuredImage ? {
      url: fields.featuredImage.fields?.file?.url ? 
        `https:${fields.featuredImage.fields.file.url}` : null,
      title: fields.featuredImage.fields?.title || "",
      width: fields.featuredImage.fields?.file?.details?.image?.width || 400,
      height: fields.featuredImage.fields?.file?.details?.image?.height || 300,
    } : null,
    author: fields.author || "MKI Engineering Team",
    publishDate: fields.publishDate || sys.createdAt,
    tags: Array.isArray(fields.tags) ? fields.tags : [],
    id: sys.id || "",
    createdAt: sys.createdAt || new Date().toISOString(),
  };
}

// Calculate reading time helper
function calculateReadingTime(excerpt: string): number {
  const wordCount = excerpt.split(/\s+/).length;
  const wordsPerMinute = 200;
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
}

export default async function BlogPage() {
  const blogEntries = await getBlogPosts(20);
  
  // Transform entries and filter out invalid ones
  const posts = blogEntries
    .map(extractBlogFields)
    .filter((post): post is NonNullable<typeof post> => post !== null)
    .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());

  // Featured post (latest)
  const featuredPost = posts[0];
  const regularPosts = posts.slice(1);

  // Get unique tags for filter
  const allTags = [...new Set(posts.flatMap(post => post.tags))].slice(0, 8);

  // Breadcrumb data
  const breadcrumbItems = [
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog" },
  ];

  return (
    <>
      {/* Page Header */}
      <div className="bg-gradient-to-br from-teal-600 to-teal-700 text-white py-16 mt-20">
        <div className="container mx-auto px-4">
          <Breadcrumb items={breadcrumbItems} className="mb-8 [&_a]:text-teal-200 [&_a:hover]:text-white [&_span]:text-white" />
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Technical Blog & 
              <span className="block text-teal-200">Automation Guides</span>
            </h1>
            <p className="text-xl text-teal-100 mb-8">
              Expert insights, tutorials, and troubleshooting guides from our engineering team. 
              Learn automation best practices and stay updated with industry trends.
            </p>
            <div className="flex items-center justify-center gap-6 text-teal-100">
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                <span>{posts.length} Articles</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-2">
                <User className="h-5 w-5" />
                <span>Expert Authors</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-2">
                <Tag className="h-5 w-5" />
                <span>Technical Topics</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        {posts.length === 0 ? (
          /* No Posts State */
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Coming Soon!
              </h2>
              <p className="text-gray-600 mb-6">
                Our engineering team is preparing technical articles and automation guides. 
                Check back soon for expert insights and tutorials.
              </p>
              <div className="space-y-4">
                <Button asChild>
                  <Link href="/contact">
                    Get Technical Support
                  </Link>
                </Button>
                <p className="text-sm text-gray-500">
                  Need immediate help? Contact our engineering team for consultation.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-6xl mx-auto">
            {/* Featured Post */}
            {featuredPost && (
              <section className="mb-16">
                <h2 className="text-2xl font-bold text-gray-900 mb-8">Featured Article</h2>
                <FeaturedPostCard post={featuredPost} />
              </section>
            )}

            {/* Tags Filter */}
            {allTags.length > 0 && (
              <section className="mb-12">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Browse by Topic</h3>
                <div className="flex flex-wrap gap-2">
                  {allTags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="hover:bg-teal-50 hover:border-teal-300 cursor-pointer">
                      <Tag className="h-3 w-3 mr-1" />
                      {tag}
                    </Badge>
                  ))}
                </div>
              </section>
            )}

            {/* Regular Posts Grid */}
            {regularPosts.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-8">Latest Articles</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {regularPosts.map((post) => (
                    <BlogPostCard key={post.id} post={post} />
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </div>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Need Technical Support?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Can't find what you're looking for? Our engineering team provides 
              direct technical support and consultation services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/contact">
                  Contact Engineers
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/services">Technical Services</Link>
              </Button>
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
            blogPost: posts.slice(0, 10).map(post => ({
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
}

// Featured Post Card Component
function FeaturedPostCard({ post }: { post: NonNullable<ReturnType<typeof extractBlogFields>> }) {
  const readingTime = calculateReadingTime(post.excerpt);

  return (
    <Link 
      href={`/blog/${post.slug}`}
      className="group block bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
        {/* Image */}
        <div className="aspect-video lg:aspect-square relative bg-gray-100">
          {post.featuredImage?.url ? (
            <Image
              src={post.featuredImage.url}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <BookOpen className="h-16 w-16 text-gray-300" />
            </div>
          )}
          <div className="absolute top-4 left-4">
            <Badge className="bg-teal-600">Featured</Badge>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 flex flex-col justify-center">
          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.slice(0, 3).map((tag: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined, index: Key | null | undefined) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          {/* Title */}
          <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 group-hover:text-teal-600 transition-colors">
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="text-gray-600 mb-6 line-clamp-3">
            {post.excerpt}
          </p>

          {/* Meta */}
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <time dateTime={post.publishDate}>
                {new Date(post.publishDate).toLocaleDateString('id-ID', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </time>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{readingTime} min read</span>
            </div>
          </div>

          {/* Read More */}
          <div className="mt-6">
            <span className="inline-flex items-center text-teal-600 font-medium group-hover:text-teal-700">
              Read Full Article
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

// Regular Post Card Component  
function BlogPostCard({ post }: { post: NonNullable<ReturnType<typeof extractBlogFields>> }) {
  const readingTime = calculateReadingTime(post.excerpt);

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
    >
      {/* Image */}
      <div className="aspect-video relative bg-gray-100">
        {post.featuredImage?.url ? (
          <Image
            src={post.featuredImage.url}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <BookOpen className="h-12 w-12 text-gray-300" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {post.tags.slice(0, 2).map((tag: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined, index: Key | null | undefined) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {/* Title */}
        <h3 className="font-bold text-lg text-gray-900 mb-3 group-hover:text-teal-600 transition-colors line-clamp-2">
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {post.excerpt}
        </p>

        {/* Meta */}
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <User className="h-3 w-3" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{readingTime} min</span>
            </div>
          </div>
          <time dateTime={post.publishDate}>
            {new Date(post.publishDate).toLocaleDateString('id-ID', {
              month: 'short',
              day: 'numeric'
            })}
          </time>
        </div>
      </div>
    </Link>
  );
}