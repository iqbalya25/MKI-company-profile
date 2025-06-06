// src/app/blog/[slug]/page.tsx - SEO OPTIMIZED BLOG DETAIL
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { 
  Calendar, 
  User, 
  Tag, 
  Clock, 
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  ArrowLeft,
  ArrowRight,
  BookOpen
} from "lucide-react";
import { getBlogPostBySlug, getBlogPosts } from "@/lib/contentful";
import { generateBreadcrumbSchema } from "@/lib/schema";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Breadcrumb from "@/components/common/Breadcrumb";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import RelatedPosts from "@/components/blog/RelatedPosts";

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await getBlogPostBySlug(params.slug);
  
  if (!post) {
    return {
      title: "Article Not Found | Mederi Karya Indonesia",
      description: "The requested article could not be found.",
    };
  }

  const title = post.fields.seoTitle || `${post.fields.title} | MKI Technical Blog`;
  const description = post.fields.seoDescription || 
    post.fields.excerpt || 
    `Read ${post.fields.title} - Technical insights from Mederi Karya Indonesia engineering team.`;

  const featuredImage = post.fields.featuredImage?.fields?.file?.url
    ? `https:${post.fields.featuredImage.fields.file.url}`
    : null;

  return {
    title,
    description,
    keywords: [
      ...(post.fields.tags || []),
      "automation blog",
      "technical tutorial",
      "engineering guide",
      "indonesia automation",
    ],
    authors: [{ name: post.fields.author || "MKI Engineering Team" }],
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: post.fields.publishDate || post.sys.createdAt,
      modifiedTime: post.sys.updatedAt,
      authors: [post.fields.author || "MKI Engineering Team"],
      tags: post.fields.tags || [],
      images: featuredImage ? [
        {
          url: featuredImage,
          width: 1200,
          height: 630,
          alt: post.fields.title,
        }
      ] : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: featuredImage ? [featuredImage] : [],
    },
    alternates: {
      canonical: `/blog/${params.slug}`,
    },
  };
}

// Rich text rendering options
const renderOptions = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node: any, children: any) => (
      <p className="mb-4 text-gray-700 leading-relaxed">{children}</p>
    ),
    [BLOCKS.HEADING_1]: (node: any, children: any) => (
      <h1 className="text-3xl font-bold text-gray-900 mb-4 mt-8">{children}</h1>
    ),
    [BLOCKS.HEADING_2]: (node: any, children: any) => (
      <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">{children}</h2>
    ),
    [BLOCKS.HEADING_3]: (node: any, children: any) => (
      <h3 className="text-xl font-bold text-gray-900 mb-3 mt-6">{children}</h3>
    ),
    [BLOCKS.HEADING_4]: (node: any, children: any) => (
      <h4 className="text-lg font-semibold text-gray-900 mb-3 mt-6">{children}</h4>
    ),
    [BLOCKS.HEADING_5]: (node: any, children: any) => (
      <h5 className="text-base font-semibold text-gray-900 mb-2 mt-4">{children}</h5>
    ),
    [BLOCKS.HEADING_6]: (node: any, children: any) => (
      <h6 className="text-sm font-semibold text-gray-900 mb-2 mt-4">{children}</h6>
    ),
    [BLOCKS.UL_LIST]: (node: any, children: any) => (
      <ul className="list-disc list-inside mb-4 space-y-2 text-gray-700">{children}</ul>
    ),
    [BLOCKS.OL_LIST]: (node: any, children: any) => (
      <ol className="list-decimal list-inside mb-4 space-y-2 text-gray-700">{children}</ol>
    ),
    [BLOCKS.LIST_ITEM]: (node: any, children: any) => (
      <li className="ml-4">{children}</li>
    ),
    [BLOCKS.QUOTE]: (node: any, children: any) => (
      <blockquote className="border-l-4 border-teal-500 pl-4 py-2 mb-4 italic text-gray-600">
        {children}
      </blockquote>
    ),
    [BLOCKS.HR]: () => <hr className="my-8 border-gray-200" />,
    [INLINES.HYPERLINK]: (node: any, children: any) => (
      <a
        href={node.data.uri}
        target={node.data.uri.startsWith("http") ? "_blank" : undefined}
        rel={node.data.uri.startsWith("http") ? "noopener noreferrer" : undefined}
        className="text-teal-600 hover:text-teal-700 underline"
      >
        {children}
      </a>
    ),
    [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
      const { file, title } = node.data.target.fields;
      const imageUrl = `https:${file.url}`;
      return (
        <div className="my-8">
          <Image
            src={imageUrl}
            alt={title || "Blog image"}
            width={800}
            height={450}
            className="rounded-lg w-full"
          />
          {title && (
            <p className="text-sm text-gray-500 text-center mt-2">{title}</p>
          )}
        </div>
      );
    },
  },
};

// Calculate reading time
function calculateReadingTime(content: any): number {
  const text = JSON.stringify(content);
  const wordsPerMinute = 200;
  const wordCount = text.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getBlogPostBySlug(params.slug);
  
  if (!post) {
    notFound();
  }

  // Transform post data
  const postData = {
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
    updatedAt: post.sys.updatedAt,
  };

  const readingTime = calculateReadingTime(postData.content);

  // Fetch related posts (same tags)
  const allPosts = await getBlogPosts(20);
  const relatedPosts = allPosts
    .filter((p: any) => 
      p.fields.slug !== postData.slug && 
      p.fields.tags?.some((tag: string) => postData.tags.includes(tag))
    )
    .slice(0, 3)
    .map((p: any) => ({
      id: p.sys.id,
      title: p.fields.title || "",
      slug: p.fields.slug || "",
      excerpt: p.fields.excerpt || "",
      featuredImage: p.fields.featuredImage?.fields?.file?.url
        ? `https:${p.fields.featuredImage.fields.file.url}`
        : null,
      author: p.fields.author || "MKI Engineering Team",
      publishDate: p.fields.publishDate || p.sys.createdAt,
      tags: Array.isArray(p.fields.tags) ? p.fields.tags : [],
    }));

  // Breadcrumb data
  const breadcrumbItems = [
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog" },
    { name: postData.title, url: `/blog/${postData.slug}` },
  ];

  // Social share URLs
  const shareUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://mederikaryaindonesia.com'}/blog/${postData.slug}`;
  const shareText = `${postData.title} - MKI Technical Blog`;

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
            "@type": "BlogPosting",
            headline: postData.title,
            description: postData.excerpt,
            image: postData.featuredImage,
            datePublished: postData.publishDate,
            dateModified: postData.updatedAt,
            author: {
              "@type": "Person",
              name: postData.author,
            },
            publisher: {
              "@type": "Organization",
              name: "Mederi Karya Indonesia",
              logo: {
                "@type": "ImageObject",
                url: `${process.env.NEXT_PUBLIC_SITE_URL}/logo.png`,
              },
            },
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": shareUrl,
            },
            keywords: postData.tags.join(", "),
          }),
        }}
      />

      {/* Article Header */}
      <div className="bg-white py-8 mt-20 border-b">
        <div className="container mx-auto px-4">
          <Breadcrumb items={breadcrumbItems} />
        </div>
      </div>

      {/* Main Content */}
      <article className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Article Header */}
            <header className="mb-8">
              {/* Tags */}
              {postData.tags.length > 0 && (
                <div className="flex items-center gap-2 mb-4">
                  <Tag className="h-4 w-4 text-gray-400" />
                  <div className="flex flex-wrap gap-2">
                    {postData.tags.map((tag) => (
                      <Link
                        key={tag}
                        href={`/blog?tag=${encodeURIComponent(tag)}`}
                        className="text-sm px-3 py-1 bg-teal-100 text-teal-700 rounded-full hover:bg-teal-200 transition-colors"
                      >
                        {tag}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Title */}
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                {postData.title}
              </h1>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-6 text-gray-600 pb-6 border-b">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{postData.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <time dateTime={postData.publishDate}>
                    {formatDate(postData.publishDate)}
                  </time>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{readingTime} min read</span>
                </div>
              </div>
            </header>

            {/* Featured Image */}
            {postData.featuredImage && (
              <div className="mb-8">
                <Image
                  src={postData.featuredImage}
                  alt={postData.title}
                  width={1200}
                  height={630}
                  className="rounded-lg w-full"
                  priority
                />
              </div>
            )}

            {/* Article Content */}
            <div className="prose prose-lg max-w-none">
              {documentToReactComponents(postData.content, renderOptions)}
            </div>

            {/* Share Section */}
            <div className="mt-12 pt-8 border-t">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                  <Share2 className="h-5 w-5" />
                  Share this article
                </h3>
                <div className="flex items-center gap-2">
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    aria-label="Share on Facebook"
                  >
                    <Facebook className="h-5 w-5" />
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                    aria-label="Share on Twitter"
                  >
                    <Twitter className="h-5 w-5" />
                  </a>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors"
                    aria-label="Share on LinkedIn"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Author Bio */}
            <div className="mt-12 p-6 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-3">About the Author</h3>
              <p className="text-gray-600">
                <strong>{postData.author}</strong> is part of the Mederi Karya Indonesia 
                engineering team, specializing in industrial automation solutions. 
                With years of hands-on experience in PLC programming, HMI configuration, 
                and system integration.
              </p>
            </div>

            {/* Navigation */}
            <div className="mt-12 flex justify-between">
              <Button variant="outline" asChild>
                <Link href="/blog">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Blog
                </Link>
              </Button>
              <Button asChild>
                <Link href="/contact">
                  Get Technical Support
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <RelatedPosts posts={relatedPosts} />
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-teal-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              Need Help with Your Automation Project?
            </h2>
            <p className="text-xl text-teal-100 mb-8">
              Our engineering team is ready to provide technical support, parameter 
              setting, and commissioning services for your automation systems.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-teal-600 hover:bg-gray-100" asChild>
                <Link href="/contact">
                  Get Technical Consultation
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-teal-600" asChild>
                <Link href="/services">View Our Services</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
        </div>
      );
    },
  },
};