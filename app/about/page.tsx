import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CheckCircle, Users, Home, Award } from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import {
  generateWebPageSchema,
  generateBreadcrumbSchema,
} from "@/lib/schema";

export const metadata: Metadata = {
  title: "About Home Buyer Boise | Local Cash Home Buyers Since 2018",
  description: "Learn about Home Buyer Boise, your trusted local cash home buyers serving the Treasure Valley since 2018. We buy houses fast with no fees or repairs needed.",
  alternates: {
    canonical: "https://homebuyerboise.com/about",
  },
};

export default function AboutPage() {
  const webPageSchema = generateWebPageSchema({
    name: "About Home Buyer Boise",
    description:
      "Local cash home buyers serving the Treasure Valley since 2018.",
    url: "/about",
    breadcrumbs: [
      { name: "Home", url: "/" },
      { name: "About", url: "/about" },
    ],
  });
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "About", url: "/about" },
  ]);

  return (
    <>
        <JsonLd data={[webPageSchema, breadcrumbSchema]} />
        {/* Hero */}
        <section className="bg-gradient-to-br from-navy to-primary text-white py-16 lg:py-24">
          <div className="container px-4">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">About Home Buyer Boise</h1>
              <p className="text-xl text-white/90">
                We&apos;re local cash home buyers who&apos;ve been helping Treasure Valley homeowners sell their houses fast since 2018.
              </p>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-16 lg:py-24">
          <div className="container px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <div className="prose prose-lg max-w-none">
                <p>
                  Home Buyer Boise was founded with a simple mission: to provide homeowners with a fast, fair, and hassle-free way to sell their houses. We understand that life circumstances often require quick decisions, and traditional real estate transactions don&apos;t always fit those needs.
                </p>
                <p>
                  Since 2018, we&apos;ve helped hundreds of families throughout the Treasure Valley sell their homes quickly and move on to the next chapter of their lives. Whether you&apos;re facing foreclosure, going through a divorce, dealing with an inherited property, or simply need to relocate fast - we&apos;re here to help.
                </p>
                <p>
                  As local Boise residents ourselves, we take pride in serving our community with integrity, transparency, and respect. Every homeowner we work with receives a fair cash offer based on honest market analysis, not pressure tactics or lowball offers.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 lg:py-24 bg-muted">
          <div className="container px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Why Homeowners Choose Us</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Home className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Local Expertise</h3>
                <p className="text-muted-foreground">We know the Treasure Valley market inside and out</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Fair Offers</h3>
                <p className="text-muted-foreground">Honest market analysis, no lowball tactics</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Personal Service</h3>
                <p className="text-muted-foreground">Work directly with decision-makers, not salespeople</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Trusted Reputation</h3>
                <p className="text-muted-foreground">A+ BBB rating with hundreds of happy sellers</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 lg:py-24 bg-primary text-white">
          <div className="container px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Get a free, no-obligation cash offer on your house today.
            </p>
            <Button size="lg" className="bg-gold text-black hover:bg-gold/90" asChild>
              <Link href="/get-quote">Get Your Cash Offer</Link>
            </Button>
          </div>
        </section>
    </>
  );
}
