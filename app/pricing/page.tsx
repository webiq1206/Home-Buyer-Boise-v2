import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { CheckCircle, XCircle, ArrowRight, DollarSign } from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import {
  generateWebPageSchema,
  generateBreadcrumbSchema,
  generateFAQSchema,
} from "@/lib/schema";

export const metadata: Metadata = {
  title: "Pricing: What It Costs to Sell Your House to Home Buyer Boise",
  description:
    "Our cash home buying service has no fees, no commissions, and no closing costs. See exactly what you pay (nothing) and what we cover. Transparent pricing for Boise homeowners.",
  alternates: {
    canonical: "https://homebuyerboise.com/pricing",
  },
  openGraph: {
    title: "Pricing: What It Costs to Sell Your House to Home Buyer Boise",
    description:
      "Zero fees, zero commissions, zero closing costs. See exactly what our cash offer pricing covers.",
    url: "https://homebuyerboise.com/pricing",
    type: "website",
  },
};

const pricingFaqs = [
  {
    question: "How much does it cost to sell my house to Home Buyer Boise?",
    answer:
      "Nothing. We never charge sellers a fee, commission, or service charge. There is no cost to get an offer, no cost if you accept, and no cost if you decline.",
  },
  {
    question: "Who pays the closing costs?",
    answer:
      "We do. Home Buyer Boise covers all standard closing costs, including title insurance, escrow fees, and recording fees. The cash offer you accept is the amount you walk away with at closing.",
  },
  {
    question: "Do I have to make repairs before selling?",
    answer:
      "No. We buy houses as-is in any condition. You do not pay for inspections, cleaning, repairs, or staging. We factor the property condition into our offer up front.",
  },
  {
    question: "Are there any hidden fees later in the process?",
    answer:
      "No. The cash offer you accept in writing is what you receive at closing. There are no surprise deductions, processing charges, or back-end fees.",
  },
  {
    question: "How does your pricing compare to a traditional listing?",
    answer:
      "On a traditional sale, sellers typically pay 5-6 percent in realtor commissions, 1-3 percent in closing costs, plus repair and staging expenses. On a cash sale to us, those line items are all zero.",
  },
];

export default function PricingPage() {
  const webPageSchema = generateWebPageSchema({
    name: "Pricing: What It Costs to Sell Your House to Home Buyer Boise",
    description:
      "Transparent cash offer pricing. No fees, no commissions, no closing costs.",
    url: "/pricing",
    breadcrumbs: [
      { name: "Home", url: "/" },
      { name: "Pricing", url: "/pricing" },
    ],
  });
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Pricing", url: "/pricing" },
  ]);
  const faqSchema = generateFAQSchema(pricingFaqs);

  return (
    <>
      <JsonLd data={[webPageSchema, breadcrumbSchema, faqSchema]} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-navy to-primary text-white py-16 lg:py-24">
        <div className="container px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6" data-testid="text-pricing-title">
              Our Pricing
            </h1>
            <p className="text-xl text-white/90">
              Selling your house to Home Buyer Boise is free. No agent
              commissions, no listing fees, no repair costs, no closing
              fees. Here is exactly what our pricing looks like.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing breakdown */}
      <section className="py-16 lg:py-24">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-3 text-center">
              The Cost Breakdown
            </h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              On a traditional sale, the seller pays for commissions, closing
              costs, and repairs. On a cash sale to us, every one of those
              line items is zero.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              <Card data-testid="card-price-fee">
                <CardContent className="pt-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
                    <DollarSign className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Our Fee</h3>
                  <p className="text-4xl font-bold text-primary mb-3">$0</p>
                  <p className="text-sm text-muted-foreground">
                    We never charge sellers a service fee or commission. Our
                    offer comes from the resale value we calculate, not from
                    a percentage taken out of your proceeds.
                  </p>
                </CardContent>
              </Card>

              <Card data-testid="card-price-closing">
                <CardContent className="pt-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
                    <DollarSign className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Closing Costs</h3>
                  <p className="text-4xl font-bold text-primary mb-3">$0</p>
                  <p className="text-sm text-muted-foreground">
                    Title insurance, escrow fees, and recording fees are all
                    on us. The cash offer you accept is what you receive at
                    closing.
                  </p>
                </CardContent>
              </Card>

              <Card data-testid="card-price-repairs">
                <CardContent className="pt-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
                    <DollarSign className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Repairs</h3>
                  <p className="text-4xl font-bold text-primary mb-3">$0</p>
                  <p className="text-sm text-muted-foreground">
                    We buy your house as-is in any condition. No inspections
                    you need to pay for, no contractor bids, no staging or
                    cleaning costs.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* What is included */}
      <section className="py-16 lg:py-24 bg-muted/40">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">
              What Is Included in Our Offer
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                "Property valuation and offer at no cost",
                "All title and escrow fees covered",
                "All recording and transfer fees covered",
                "Standard closing in 7 to 30 days",
                "Flexible close date you choose",
                "No commissions to any agent",
                "No repair credits deducted",
                "No staging or cleaning required",
                "No showings or open houses",
                "Cash funds wired at closing",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="py-16 lg:py-24">
        <div className="container px-4">
          <h2 className="text-3xl font-bold mb-3 text-center">
            Cash Sale vs Traditional Listing
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Side by side, here is what a typical seller pays each way.
          </p>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card data-testid="card-compare-cash">
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold mb-4 text-primary">
                  Sell to Home Buyer Boise
                </h3>
                <ul className="space-y-3">
                  {[
                    "$0 in agent commissions",
                    "$0 in closing costs",
                    "$0 in repair costs",
                    "$0 in staging or cleaning",
                    "Close in as little as 7 days",
                    "Cash offer you walk away with",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card data-testid="card-compare-traditional">
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold mb-4">Traditional Listing</h3>
                <ul className="space-y-3">
                  {[
                    "5 to 6 percent in realtor commissions",
                    "1 to 3 percent in closing costs",
                    "Average $10,000 plus in repairs and prep",
                    "Staging and cleaning out of pocket",
                    "60 to 90 days average on market",
                    "Sale price minus all of the above",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <XCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-8 bg-muted/30 border-y">
        <div className="container px-4">
          <p className="text-sm text-muted-foreground max-w-3xl mx-auto text-center">
            <strong className="text-foreground">A note on pricing:</strong>{" "}
            Every property is different. The cash offer amount on your house
            depends on its condition, location, comparable sales, and
            after-repair value. Our pricing is reviewed and presented by a
            real person on our team. We do not publish automated estimates.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-24 bg-primary text-white">
        <div className="container px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">See Your Number</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Get your free, no-obligation cash offer in 24 hours.
          </p>
          <Button size="lg" className="bg-gold text-black hover:bg-gold/90" asChild>
            <Link href="/get-quote" data-testid="link-get-offer">
              Get Your Cash Offer
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
