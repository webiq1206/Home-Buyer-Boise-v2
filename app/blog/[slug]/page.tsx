import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  getBlogPostBySlug, 
  getAllBlogSlugs,
  getRecentBlogPosts,
} from "@/shared/blogContent";
import { RelatedContent } from "@/components/RelatedContent";
import { ArrowLeft, Calendar, Clock, User, Tag } from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import {
  generateBlogPostingSchema,
  generateBreadcrumbSchema,
  generateFAQSchema,
} from "@/lib/schema";
import { getAuthorSlugForName } from "@/shared/authorsData";
import { generateBlogSeoTitle, truncateMetaDescription } from "@/lib/seo";

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const post = getBlogPostBySlug(params.slug);
  
  if (!post) {
    return {
      title: "Blog Post Not Found | Home Buyer Boise",
    };
  }

  const seoTitle = generateBlogSeoTitle(post);
  const description = truncateMetaDescription(post.metaDescription || post.excerpt);

  return {
    title: seoTitle,
    description,
    alternates: {
      canonical: `https://homebuyerboise.com/blog/${params.slug}`,
    },
    openGraph: {
      title: seoTitle,
      description,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author],
      tags: post.tags,
    },
  };
}

// Format date for display
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// Estimate reading time
function getReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

export default function BlogPostPage({ params }: PageProps) {
  const post = getBlogPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const recentPosts = getRecentBlogPosts(4).filter(p => p.slug !== post.slug).slice(0, 3);

  const authorSlug = getAuthorSlugForName(post.author);

  const blogPostingSchema = generateBlogPostingSchema({
    title: post.title,
    description: post.metaDescription || post.excerpt,
    slug: post.slug,
    datePublished: post.publishedAt,
    dateModified: (post as { updatedAt?: string }).updatedAt || post.publishedAt,
    author: post.author,
    authorSlug,
    keywords: post.tags,
    articleSection: post.category,
  });
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog" },
    { name: post.title, url: `/blog/${post.slug}` },
  ]);
  const schemas: Record<string, any>[] = [blogPostingSchema, breadcrumbSchema];
  if (post.faqs && post.faqs.length > 0) {
    schemas.push(generateFAQSchema(post.faqs));
  }

  return (
    <>
      <JsonLd data={schemas} />
      {/* Hero */}
      <section className="bg-gradient-to-br from-navy to-primary text-white py-12 lg:py-16">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto">
            <Link 
              href="/blog" 
              className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 text-sm"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Link>
            
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <Badge className="bg-gold text-black">
                {post.category}
              </Badge>
              <span className="text-white/70 text-sm flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {getReadingTime(post.content)} min read
              </span>
            </div>
            
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 leading-tight">
              {post.title}
            </h1>
            
            <p className="text-lg text-white/90 mb-6">
              {post.excerpt}
            </p>
            
            <div className="flex flex-wrap items-center gap-4 text-white/70 text-sm">
              <Link
                href={`/authors/${authorSlug}`}
                className="flex items-center gap-1 hover:text-white"
              >
                <User className="h-4 w-4" />
                {post.author}
              </Link>
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {formatDate(post.publishedAt)}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <section className="py-4 border-b bg-muted/30">
          <div className="container px-4">
            <div className="max-w-4xl mx-auto flex flex-wrap items-center gap-2">
              <Tag className="h-4 w-4 text-muted-foreground" />
              {post.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Content */}
      <section className="py-12 lg:py-16">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-[1fr_280px] gap-12">
              {/* Main Content */}
              <article>
                <div 
                  className="prose prose-lg max-w-none 
                    prose-headings:font-bold prose-headings:text-foreground
                    prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
                    prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                    prose-p:text-muted-foreground prose-p:leading-relaxed
                    prose-ul:text-muted-foreground prose-ol:text-muted-foreground
                    prose-li:my-1
                    prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                    prose-strong:text-foreground
                    prose-blockquote:border-l-primary prose-blockquote:text-muted-foreground"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />

                {/* FAQ Section */}
                {post.faqs && post.faqs.length > 0 && (
                  <div className="mt-12 pt-8 border-t">
                    <h2 className="text-2xl font-bold mb-6">
                      Frequently Asked Questions
                    </h2>
                    <Accordion type="single" collapsible className="w-full">
                      {post.faqs.map((faq, index) => (
                        <AccordionItem key={index} value={`faq-${index}`}>
                          <AccordionTrigger className="text-left font-medium">
                            {faq.question}
                          </AccordionTrigger>
                          <AccordionContent className="text-muted-foreground">
                            {faq.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                )}
                
                {/* CTA Box */}
                <Card className="mt-12 bg-primary/5 border-primary/20">
                  <CardContent className="p-8 text-center">
                    <h3 className="text-xl font-bold mb-2">Ready to Sell Your House?</h3>
                    <p className="text-muted-foreground mb-6">
                      Get a free, no-obligation cash offer on your Boise area home today.
                    </p>
                    <Button size="lg" asChild>
                      <Link href="/get-quote">Get Your Cash Offer</Link>
                    </Button>
                  </CardContent>
                </Card>
              </article>

              {/* Sidebar */}
              <aside className="space-y-8">
                {/* About the Author */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-bold mb-3">About the Author</h3>
                    <p className="text-sm text-muted-foreground">
                      The {post.author} are local cash home buyers serving the Boise metro area. 
                      We help homeowners sell their properties quickly for fair cash offers.
                    </p>
                    <Button variant="outline" size="sm" className="mt-4 w-full" asChild>
                      <Link href="/about">Learn About Us</Link>
                    </Button>
                  </CardContent>
                </Card>

                {/* Quick Contact */}
                <Card className="bg-primary text-white">
                  <CardContent className="p-6">
                    <h3 className="font-bold mb-2">Need to Sell Fast?</h3>
                    <p className="text-sm text-white/80 mb-4">
                      Get a cash offer in 24 hours. Close in as little as 7 days.
                    </p>
                    <Button className="w-full bg-gold text-black hover:bg-gold/90" asChild>
                      <Link href="/get-quote">Get Offer</Link>
                    </Button>
                    <div className="mt-3 text-center">
                      <a href="tel:2084052275" className="text-sm text-white/80 hover:text-white">
                        or call (208) 405-2275
                      </a>
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Posts */}
                {recentPosts.length > 0 && (
                  <div>
                    <h3 className="font-bold mb-4">Recent Articles</h3>
                    <div className="space-y-4">
                      {recentPosts.map((recentPost) => (
                        <Link 
                          key={recentPost.slug}
                          href={`/blog/${recentPost.slug}`}
                          className="block group"
                        >
                          <h4 className="text-sm font-medium group-hover:text-primary transition-colors line-clamp-2">
                            {recentPost.title}
                          </h4>
                          <p className="text-xs text-muted-foreground mt-1">
                            {formatDate(recentPost.publishedAt)}
                          </p>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </aside>
            </div>
          </div>
        </div>
      </section>

      {/* Related Content (algorithmic) */}
      <RelatedContent
        sourceUrl={`/blog/${params.slug}`}
        count={3}
        heading="Related Resources"
        subheading="Hand-picked guides, services, and tools related to this article"
      />


      {/* Final CTA */}
      <section className="py-12 lg:py-16 bg-primary text-white">
        <div className="container px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Sell Your House Fast?
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Skip the hassle of traditional home selling. Get a fair cash offer on your Boise area home today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="bg-gold text-black hover:bg-gold/90 font-semibold" asChild>
              <Link href="/get-quote">Get Your Cash Offer</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
              <a href="tel:2084052275">Call (208) 405-2275</a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
