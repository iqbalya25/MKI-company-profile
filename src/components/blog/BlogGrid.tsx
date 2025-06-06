/* eslint-disable react/no-unescaped-entities */
// src/components/blog/BlogGrid.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { Calendar, User, Tag, ArrowRight, ChevronLeft, ChevronRight, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";


interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  featuredImage: string | null;
  author: string;
  publishDate: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

interface BlogGridProps {
  posts: BlogPost[];
  currentPage: number;
  totalPages: number;
  totalPosts: number;
  baseUrl: string;
  searchParams: Record<string, string | undefined>;
}

const BlogGrid = ({
  posts,
  currentPage,
  totalPages,
  totalPosts,
  baseUrl,
  searchParams,
}: BlogGridProps) => {
  // Generate pagination URL
  const getPaginationUrl = (page: number) => {
    const params = new URLSearchParams();
    Object.entries(searchParams).forEach(([key, value]) => {
      if (value && key !== "page") {
        params.set(key, value);
      }
    });
    if (page > 1) {
      params.set("page", page.toString());
    }
    const queryString = params.toString();
    return queryString ? `${baseUrl}?${queryString}` : baseUrl;
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const showPages = 5;

    if (totalPages <= showPages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const startPage = Math.max(1, currentPage - 2);
      const endPage = Math.min(totalPages, currentPage + 2);

      if (startPage > 1) {
        pages.push(1);
        if (startPage > 2) pages.push("...");
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (endPage < totalPages) {
        if (endPage < totalPages - 1) pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  if (posts.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="max-w-md mx-auto">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <BookOpen className="h-12 w-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            No Articles Found
          </h3>
          <p className="text-gray-600 mb-6">
            We couldn't find any articles matching your criteria. Try adjusting
            your search or browse all articles.
          </p>
          <Button asChild>
            <Link href="/blog">View All Articles</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <article
            key={post.id}
            className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
          >
            {/* Featured Image */}
            <Link href={`/blog/${post.slug}`} className="block aspect-video relative bg-gray-100 overflow-hidden">
              {post.featuredImage ? (
                <Image
                  src={post.featuredImage}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <BookOpen className="h-12 w-12 text-gray-300" />
                </div>
              )}
            </Link>

            {/* Content */}
            <div className="p-6">
              {/* Meta Info */}
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  <time dateTime={post.publishDate}>
                    {formatDate(post.publishDate)}
                  </time>
                </div>
                <div className="flex items-center gap-1">
                  <User className="h-3 w-3" />
                  <span>{post.author}</span>
                </div>
              </div>

              {/* Title */}
              <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-teal-600 transition-colors">
                <Link href={`/blog/${post.slug}`}>
                  {post.title}
                </Link>
              </h2>

              {/* Excerpt */}
              <p className="text-gray-600 mb-4 line-clamp-3">
                {post.excerpt}
              </p>

              {/* Tags */}
              {post.tags.length > 0 && (
                <div className="flex items-center gap-2 mb-4">
                  <Tag className="h-3 w-3 text-gray-400" />
                  <div className="flex flex-wrap gap-2">
                    {post.tags.slice(0, 3).map((tag) => (
                      <Link
                        key={tag}
                        href={`/blog?tag=${encodeURIComponent(tag)}`}
                        className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded hover:bg-teal-100 hover:text-teal-700 transition-colors"
                      >
                        {tag}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Read More Link */}
              <Link
                href={`/blog/${post.slug}`}
                className="inline-flex items-center text-teal-600 hover:text-teal-700 font-medium group/link"
              >
                Read More
                <ArrowRight className="h-4 w-4 ml-1 group-hover/link:translate-x-1 transition-transform" />
              </Link>
            </div>
          </article>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Page Info */}
          <div className="text-sm text-gray-600">
            Page {currentPage} of {totalPages} ({totalPosts} articles)
          </div>

          {/* Pagination Controls */}
          <div className="flex items-center gap-2">
            {/* Previous Button */}
            <Link
              href={getPaginationUrl(currentPage - 1)}
              className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-md border ${
                currentPage === 1
                  ? "border-gray-200 text-gray-400 cursor-not-allowed pointer-events-none"
                  : "border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
              {...(currentPage === 1 && {
                tabIndex: -1,
                "aria-disabled": true,
              })}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Link>

            {/* Page Numbers */}
            <div className="hidden sm:flex items-center gap-1">
              {getPageNumbers().map((page, index) => (
                <span key={index}>
                  {page === "..." ? (
                    <span className="px-3 py-2 text-sm text-gray-500">...</span>
                  ) : (
                    <Link
                      href={getPaginationUrl(page as number)}
                      className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                        currentPage === page
                          ? "bg-teal-600 text-white"
                          : "border border-gray-300 text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {page}
                    </Link>
                  )}
                </span>
              ))}
            </div>

            {/* Next Button */}
            <Link
              href={getPaginationUrl(currentPage + 1)}
              className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-md border ${
                currentPage === totalPages
                  ? "border-gray-200 text-gray-400 cursor-not-allowed pointer-events-none"
                  : "border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
              {...(currentPage === totalPages && {
                tabIndex: -1,
                "aria-disabled": true,
              })}
            >
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogGrid;