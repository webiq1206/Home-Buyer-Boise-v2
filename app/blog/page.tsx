import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BLOG_POSTS, 
  getAllBlogCategories, 
  type BlogPostData 
} from "@/shared/blogContent";
import { Calendar, Clock, ArrowRight, Tag } from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import {
  generateWebPageSchema,
  generateBreadcrumbSchema,
} from "@/lib/schema";

export const metadata: Metadata = {
  title: "Blog | Home Buyer Boise - Real Estate Tips & Advice",
  description: "Read our blog for tips on selling your house fast, understanding the Boise real estate market, and making the best decision for your property. Expert advice from local cash home buyers.",
  alternates: {
    canonical: "https://homebuyerboise.com/blog",
  },
};

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

// Group posts by category
function groupPostsByCategory(posts: BlogPostData[]): Record<string, BlogPostData[]> {
  return posts.reduce((acc, post) => {
    if (!acc[post.category]) {
      acc[post.category] = [];
    }
    acc[post.category].push(post);
    return acc;
  }, {} as Record<string, BlogPostData[]>);
}

// Sort posts by date (newest first)
function sortPostsByDate(posts: BlogPostData[]): BlogPostData[] {
  return [...posts].sort((a, b) => 
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export default function BlogPage() {
  const sortedPosts = sortPostsByDate(BLOG_POSTS);
  const categories = getAllBlogCategories();
  const featuredPosts = sortedPosts.slice(0, 3);
  const remainingPosts = sortedPosts.slice(3);
  const postsByCategory = groupPostsByCategory(sortedPosts);

  const webPageSchema = generateWebPageSchema({
    name: "Blog | Home Buyer Boise - Real Estate Tips and Advice",
    description:
      "Tips on selling your house fast, understanding the Boise real estate market, and making the best decision for your property.",
    url: "/blog",
    breadcrumbs: [
      { name: "Home", url: "/" },
      { name: "Blog", url: "/blog" },
    ],
  });
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog" },
  ]);

  return (
    <>
      <JsonLd data={[webPageSchema, breadcrumbSchema]} />
      {/* Hero */}
      <section className="bg-gradient-to-br from-navy to-primary text-white py-12 lg:py-20">
        <div className="container px-4">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Home Selling Tips & Real Estate Advice
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-6">
              Expert insights on selling your house fast, understanding the Boise real estate market, and making informed decisions about your property.
            </p>
            <p className="text-white/70">
              {BLOG_POSTS.length} articles to help you navigate selling your home
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-6 border-b bg-muted/30">
        <div className="container px-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium text-muted-foreground mr-2">Browse by topic:</span>
            {categories.map((category) => (
              <Badge 
                key={category} 
                variant="secondary" 
                className="cursor-pointer hover:bg-primary hover:text-white transition-colors"
              >
                {category} ({postsByCategory[category]?.length || 0})
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-12 lg:py-16">
        <div className="container px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">Featured Articles</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {featuredPosts.map((post, index) => (
              <Card 
                key={post.slug} 
                className={`hover:shadow-lg transition-shadow group ${index === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}
              >
                <CardHeader className={index === 0 ? 'pb-4' : ''}>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="text-xs">
                      {post.category}
                    </Badge>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {getReadingTime(post.content)} min read
                    </span>
                  </div>
                  <CardTitle className={`group-hover:text-primary transition-colors ${index === 0 ? 'text-2xl' : 'text-lg'}`}>
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className={`text-muted-foreground mb-4 ${index === 0 ? 'text-base' : 'text-sm'} line-clamp-3`}>
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {formatDate(post.publishedAt)}
                    </span>
                    <Link 
                      href={`/blog/${post.slug}`}
                      className="text-sm text-primary font-medium flex items-center gap-1 hover:underline"
                    >
                      Read more <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* All Posts by Category */}
      {Object.entries(postsByCategory).map(([category, posts]) => (
        <section key={category} className="py-12 lg:py-16 border-t">
          <div className="container px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Tag className="h-5 w-5 text-primary" />
                {category}
              </h2>
              <span className="text-sm text-muted-foreground">{posts.length} articles</span>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortPostsByDate(posts).slice(0, 6).map((post) => (
                <Card key={post.slug} className="hover:shadow-lg transition-shadow group">
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {getReadingTime(post.content)} min read
                      </span>
                    </div>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                      <Link href={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4 text-sm line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        {formatDate(post.publishedAt)}
                      </span>
                      <Link 
                        href={`/blog/${post.slug}`}
                        className="text-sm text-primary font-medium flex items-center gap-1 hover:underline"
                      >
                        Read <ArrowRight className="h-3 w-3" />
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            {posts.length > 6 && (
              <div className="text-center mt-8">
                <Button variant="outline" asChild>
                  <Link href={`/blog?category=${encodeURIComponent(category)}`}>
                    View all {posts.length} {category} articles
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </section>
      ))}

      {/* CTA Section */}
      <section className="py-12 lg:py-16 bg-primary text-white">
        <div className="container px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Sell Your House Fast?
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Skip the stress of traditional home selling. Get a fair cash offer on your Boise area home in 24 hours.
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
