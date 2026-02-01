import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Blog | Home Buyer Boise - Real Estate Tips & Advice",
  description: "Read our blog for tips on selling your house fast, understanding the Boise real estate market, and making the best decision for your property.",
  alternates: {
    canonical: "https://homebuyerboise.com/blog",
  },
};

// Sample blog posts - in production, these would come from the database
const blogPosts = [
  {
    slug: "how-to-sell-house-fast-boise",
    title: "How to Sell Your House Fast in Boise",
    excerpt: "Learn the best strategies for selling your house quickly in the Boise real estate market...",
    category: "Selling Tips",
    date: "January 15, 2026",
  },
  {
    slug: "cash-offer-vs-traditional-sale",
    title: "Cash Offer vs Traditional Sale: Which is Right for You?",
    excerpt: "Compare the pros and cons of accepting a cash offer versus listing your home traditionally...",
    category: "Buyer Education",
    date: "January 10, 2026",
  },
  {
    slug: "selling-inherited-property-idaho",
    title: "Selling an Inherited Property in Idaho",
    excerpt: "A complete guide to selling inherited real estate in Idaho, including probate considerations...",
    category: "Legal",
    date: "January 5, 2026",
  },
  {
    slug: "avoid-foreclosure-boise",
    title: "How to Avoid Foreclosure in Boise",
    excerpt: "If you&apos;re facing foreclosure, here are your options for protecting your credit and equity...",
    category: "Financial",
    date: "December 28, 2025",
  },
];

export default function BlogPage() {
  return (
    <>
        {/* Hero */}
        <section className="bg-gradient-to-br from-navy to-primary text-white py-16 lg:py-24">
          <div className="container px-4">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Blog</h1>
              <p className="text-xl text-white/90">
                Tips, advice, and insights on selling your home in the Treasure Valley.
              </p>
            </div>
          </div>
        </section>

        {/* Blog Posts */}
        <section className="py-16 lg:py-24">
          <div className="container px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <Card key={post.slug} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="text-sm text-primary font-medium mb-2">{post.category}</div>
                    <CardTitle className="text-xl">
                      <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
                        {post.title}
                      </Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                    <p className="text-sm text-muted-foreground">{post.date}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
    </>
  );
}
