// src/components/blog/RelatedPosts.tsx
import Link from "next/link";
import Image from "next/image";
import { Calendar, ArrowRight, BookOpen } from "lucide-react";
import { formatDate } from "@/lib/utils";


interface RelatedPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  featuredImage: string | null;
  author: string;
  publishDate: string;
  tags: string[];
}

interface RelatedPostsProps {
  posts: RelatedPost[];
}

const RelatedPosts = ({ posts }: RelatedPostsProps) => {
  if (!posts || posts.length === 0) {
    return null;
  }

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
        Related Articles
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {posts.map((post) => (
          <article
            key={post.id}
            className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 group"
          >
            {/* Featured Image */}
            <Link href={`/blog/${post.slug}`} className="block aspect-video relative bg-gray-100 overflow-hidden">
              {post.featuredImage ? (
                <Image
                  src={post.featuredImage}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <BookOpen className="h-12 w-12 text-gray-300" />
                </div>
              )}
            </Link>

            {/* Content */}
            <div className="p-6">
              {/* Date */}
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                <Calendar className="h-3 w-3" />
                <time dateTime={post.publishDate}>
                  {formatDate(post.publishDate)}
                </time>
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2 group-hover:text-teal-600 transition-colors">
                <Link href={`/blog/${post.slug}`}>
                  {post.title}
                </Link>
              </h3>

              {/* Excerpt */}
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {post.excerpt}
              </p>

              {/* Read More Link */}
              <Link
                href={`/blog/${post.slug}`}
                className="inline-flex items-center text-teal-600 hover:text-teal-700 font-medium text-sm group/link"
              >
                Read More
                <ArrowRight className="h-3 w-3 ml-1 group-hover/link:translate-x-1 transition-transform" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default RelatedPosts;