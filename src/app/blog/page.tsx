/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
// src/app/blog/page.tsx - SIMPLE BLOG PAGE
import { Metadata } from "next";
import Link from "next/link";
import { Calendar, User, ArrowRight, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getBlogPosts } from "@/lib/contentful";

export const metadata: Metadata = {
  title: "Technical Blog - Automation Tutorials & Guides | Mederi Karya Indonesia",
  description: "Expert tutorials on PLC programming, inverter parameter setting, HMI configuration, troubleshooting guides. Learn automation from industry professionals.",
  keywords: [
    "plc programming tutorial",
    "inverter parameter setting guide", 
    "hmi configuration tutorial",
    "automation troubleshooting",
    "technical blog automation",
    "engineering tutorials indonesia"
  ],
};

export default async function BlogPage() {
  const blogPosts = await getBlogPosts(10);

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-teal-600 to-teal-700 text-white py-16 mt-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Technical Blog
              <span className="block text-teal-200 text-2xl lg:text-3xl font-normal mt-2">
                Expert Automation Tutorials & Guides
              </span>
            </h1>
            <p className="text-xl text-teal-100 mb-8">
              Learn from industry professionals. Practical tutorials, troubleshooting guides, 
              and best practices for industrial automation.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          {blogPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post: any) => (
                <BlogPostCard key={post.sys.id} post={post} />
              ))}
            </div>
          ) : (
            <ComingSoonSection />
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Stay Updated
            </h2>
            <p className="text-gray-600 mb-8">
              Get the latest automation tutorials and industry insights delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="your.email@company.com"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <Button className="bg-teal-600 hover:bg-teal-700">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function BlogPostCard({ post }: { post: any }) {
  const { fields } = post;
  const publishDate = new Date(fields.publishDate || post.sys.createdAt);
  
  return (
    <article className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      {/* Featured Image */}
      {fields.featuredImage && (
        <div className="aspect-video relative bg-gray-100">
          <img
            src={`https:${fields.featuredImage.fields.file.url}?w=400&h=225&fit=fill&f=face`}
            alt={fields.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      {/* Content */}
      <div className="p-6">
        {/* Meta Info */}
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <time dateTime={publishDate.toISOString()}>
              {publishDate.toLocaleDateString('id-ID', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
          </div>
          {fields.author && (
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              <span>{fields.author}</span>
            </div>
          )}
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
          <Link 
            href={`/blog/${fields.slug}`}
            className="hover:text-teal-600 transition-colors"
          >
            {fields.title}
          </Link>
        </h2>

        {/* Excerpt */}
        <p className="text-gray-600 mb-4 line-clamp-3">
          {fields.excerpt}
        </p>

        {/* Tags */}
        {fields.tags && fields.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {fields.tags.slice(0, 3).map((tag: string, index: number) => (
              <span 
                key={index}
                className="px-2 py-1 bg-teal-100 text-teal-700 text-xs rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Read More */}
        <Link 
          href={`/blog/${fields.slug}`}
          className="inline-flex items-center gap-1 text-teal-600 hover:text-teal-700 font-medium text-sm group"
        >
          <span>Read Article</span>
          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </article>
  );
}

function ComingSoonSection() {
  return (
    <div className="text-center py-16">
      <div className="max-w-2xl mx-auto">
        <div className="w-24 h-24 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <BookOpen className="h-12 w-12 text-teal-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Technical Blog Coming Soon
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          We're preparing comprehensive tutorials and guides on industrial automation. 
          Expert content on PLC programming, inverter configuration, and troubleshooting.
        </p>
        
        {/* Preview of upcoming topics */}
        <div className="bg-gray-50 rounded-xl p-8 mb-8">
          <h3 className="font-semibold text-gray-900 mb-4">Upcoming Topics:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-teal-500 rounded-full mt-2"></div>
              <div>
                <h4 className="font-medium text-gray-900">PLC Programming Basics</h4>
                <p className="text-sm text-gray-600">Complete guide to Mitsubishi and Omron PLC programming</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-teal-500 rounded-full mt-2"></div>
              <div>
                <h4 className="font-medium text-gray-900">Inverter Parameter Setting</h4>
                <p className="text-sm text-gray-600">Step-by-step configuration for Schneider and ABB inverters</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-teal-500 rounded-full mt-2"></div>
              <div>
                <h4 className="font-medium text-gray-900">HMI Design Best Practices</h4>
                <p className="text-sm text-gray-600">Creating effective operator interfaces with Proface</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-teal-500 rounded-full mt-2"></div>
              <div>
                <h4 className="font-medium text-gray-900">Troubleshooting Guides</h4>
                <p className="text-sm text-gray-600">Common automation problems and solutions</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-teal-500 rounded-full mt-2"></div>
              <div>
                <h4 className="font-medium text-gray-900">Safety System Implementation</h4>
                <p className="text-sm text-gray-600">Pilz safety relay configuration and wiring</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-teal-500 rounded-full mt-2"></div>
              <div>
                <h4 className="font-medium text-gray-900">Industrial Communication</h4>
                <p className="text-sm text-gray-600">Modbus, Ethernet/IP, and Profinet setup</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild>
            <Link href="/contact">
              Request Specific Tutorial
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/services">
              Get Training Services
            </Link>
          </Button>
        </div>

        <p className="text-sm text-gray-500 mt-6">
          Want to be notified when we publish new content?{" "}
          <Link href="/contact" className="text-teal-600 hover:text-teal-700">
            Contact us
          </Link>{" "}
          to join our mailing list.
        </p>
      </div>
    </div>
  );
}