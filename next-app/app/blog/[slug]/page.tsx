import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface PageProps {
  params: { slug: string };
}

// Sample blog posts - in production, these would come from the database or CMS
const blogPosts: Record<string, {
  title: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  author: string;
}> = {
  "how-to-sell-house-fast-boise": {
    title: "How to Sell Your House Fast in Boise",
    excerpt: "Learn the best strategies for selling your house quickly in the Boise real estate market.",
    content: `
      <p>Selling a house in Boise can be challenging, especially if you're on a tight timeline. Whether you're relocating for work, dealing with a financial hardship, or simply need to move quickly, there are several strategies you can use to sell your house fast.</p>
      
      <h2>1. Price It Right from the Start</h2>
      <p>One of the most important factors in selling your house quickly is pricing it correctly from day one. Overpriced homes sit on the market longer, while competitively priced homes generate more interest and often sell faster.</p>
      
      <h2>2. Consider a Cash Buyer</h2>
      <p>Cash home buyers like Home Buyer Boise can close in as little as 7 days. This is ideal if you need to sell quickly without the uncertainty of traditional financing falling through.</p>
      
      <h2>3. Make Necessary Repairs</h2>
      <p>While you don't need to renovate your entire home, addressing obvious issues can help your home sell faster. However, if you're short on time or funds, selling to a cash buyer as-is is always an option.</p>
      
      <h2>Ready to Sell Fast?</h2>
      <p>Contact Home Buyer Boise today for a free, no-obligation cash offer on your Boise area home. We can close on your timeline - as fast as 7 days or up to 60+ days if you need more time.</p>
    `,
    category: "Selling Tips",
    date: "January 15, 2026",
    author: "Home Buyer Boise Team",
  },
  "cash-offer-vs-traditional-sale": {
    title: "Cash Offer vs Traditional Sale: Which is Right for You?",
    excerpt: "Compare the pros and cons of accepting a cash offer versus listing your home traditionally.",
    content: `
      <p>When selling your home, you have two main options: accept a cash offer from an investor or list your home traditionally with a realtor. Both have their pros and cons, and the right choice depends on your situation.</p>
      
      <h2>Cash Offer Benefits</h2>
      <ul>
        <li>Close in as little as 7 days</li>
        <li>No repairs or staging needed</li>
        <li>No realtor commissions (save 5-6%)</li>
        <li>No showings or open houses</li>
        <li>Guaranteed sale - no financing fall-through</li>
      </ul>
      
      <h2>Traditional Sale Benefits</h2>
      <ul>
        <li>Potentially higher sale price</li>
        <li>Exposure to more buyers</li>
        <li>Agent guidance through the process</li>
      </ul>
      
      <h2>Which is Right for You?</h2>
      <p>A cash sale is ideal if you need to sell quickly, don't want to make repairs, or want to avoid the uncertainty of a traditional sale. A traditional sale may be better if you have time to wait and want to maximize your sale price.</p>
    `,
    category: "Buyer Education",
    date: "January 10, 2026",
    author: "Home Buyer Boise Team",
  },
  "selling-inherited-property-idaho": {
    title: "Selling an Inherited Property in Idaho",
    excerpt: "A complete guide to selling inherited real estate in Idaho, including probate considerations.",
    content: `
      <p>Inheriting a property can be both a blessing and a burden. If you've inherited a house in Idaho and need to sell it, there are several important considerations to keep in mind.</p>
      
      <h2>Understanding Probate in Idaho</h2>
      <p>Most inherited properties in Idaho must go through probate, the legal process of transferring ownership from the deceased to the heirs. This process typically takes 4-6 months.</p>
      
      <h2>Selling Before Probate is Complete</h2>
      <p>In some cases, you may be able to sell the property before probate is complete with court approval. Cash buyers like Home Buyer Boise are experienced in these transactions.</p>
      
      <h2>Tax Considerations</h2>
      <p>When you inherit a property, you receive a "stepped-up" basis, meaning your cost basis is the fair market value at the time of inheritance. This can significantly reduce capital gains taxes if you sell.</p>
      
      <h2>Need to Sell an Inherited Property?</h2>
      <p>Home Buyer Boise specializes in purchasing inherited properties. We can help navigate the complexities of probate sales and close on your timeline.</p>
    `,
    category: "Legal",
    date: "January 5, 2026",
    author: "Home Buyer Boise Team",
  },
  "avoid-foreclosure-boise": {
    title: "How to Avoid Foreclosure in Boise",
    excerpt: "If you're facing foreclosure, here are your options for protecting your credit and equity.",
    content: `
      <p>Facing foreclosure is stressful, but you have options. If you're behind on your mortgage in Boise, here's what you can do to protect your credit and potentially save some equity.</p>
      
      <h2>Contact Your Lender</h2>
      <p>Your first step should be contacting your lender. They may offer forbearance, loan modification, or other options to help you catch up on payments.</p>
      
      <h2>Sell Your Home</h2>
      <p>If you can't catch up on payments, selling your home before foreclosure can help you avoid the damage to your credit and potentially walk away with some equity.</p>
      
      <h2>Cash Sale Advantages</h2>
      <p>A cash sale to Home Buyer Boise can close in as little as 7 days, making it possible to sell before your foreclosure date. This can help you avoid the foreclosure on your credit report.</p>
      
      <h2>Get Help Today</h2>
      <p>If you're facing foreclosure in Boise, contact Home Buyer Boise for a confidential consultation. We can often close fast enough to stop foreclosure proceedings.</p>
    `,
    category: "Financial",
    date: "December 28, 2025",
    author: "Home Buyer Boise Team",
  },
};

const blogSlugs = Object.keys(blogPosts);

export function generateStaticParams() {
  return blogSlugs.map((slug) => ({ slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const post = blogPosts[params.slug];
  
  if (!post) {
    return {
      title: "Blog Post Not Found | Home Buyer Boise",
    };
  }

  return {
    title: `${post.title} | Home Buyer Boise Blog`,
    description: post.excerpt,
    alternates: {
      canonical: `https://homebuyerboise.com/blog/${params.slug}`,
    },
  };
}

export default function BlogPostPage({ params }: PageProps) {
  const post = blogPosts[params.slug];

  if (!post) {
    notFound();
  }

  return (
    <>
        {/* Hero */}
        <section className="bg-gradient-to-br from-navy to-primary text-white py-16">
          <div className="container px-4">
            <div className="max-w-3xl">
              <Link href="/blog" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4">
                <ArrowLeft className="h-4 w-4" />
                Back to Blog
              </Link>
              <div className="text-primary-foreground/80 mb-2">{post.category}</div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>
              <div className="flex items-center gap-4 text-white/80">
                <span>{post.author}</span>
                <span>•</span>
                <span>{post.date}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 lg:py-24">
          <div className="container px-4">
            <div className="max-w-3xl mx-auto">
              <div 
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
              
              {/* CTA */}
              <div className="mt-12 p-8 bg-muted rounded-lg text-center">
                <h3 className="text-2xl font-bold mb-4">Ready to Sell Your House?</h3>
                <p className="text-muted-foreground mb-6">
                  Get a free, no-obligation cash offer on your Boise area home today.
                </p>
                <Button size="lg" asChild>
                  <Link href="/get-quote">Get Your Cash Offer</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
    </>
  );
}
