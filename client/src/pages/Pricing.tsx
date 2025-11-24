import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, DollarSign, Home, Clock, X } from "lucide-react";
import { Link } from "wouter";

const processSteps = [
  {
    step: "1",
    title: "Submit Your Property",
    description: "Fill out our simple form with your property details and situation",
  },
  {
    step: "2",
    title: "Receive Your Offer",
    description: "Get a fair cash offer within 24 hours based on market data",
  },
  {
    step: "3",
    title: "Choose Your Closing Date",
    description: "Close in as little as 7 days or take up to 90 days—it's your choice",
  },
  {
    step: "4",
    title: "Get Paid",
    description: "Walk away with cash at closing—no fees, no commissions deducted",
  },
];

const traditionalSaleItems = [
  { label: "Average Time to Sell", value: "30-60 days" },
  { label: "Realtor Commission (6%)", value: "$18,000*", negative: true },
  { label: "Closing Costs", value: "$3,000-$8,000", negative: true },
  { label: "Repairs & Updates", value: "$5,000-$25,000", negative: true },
  { label: "Staging & Photos", value: "$500-$2,000", negative: true },
  { label: "Inspection Fees", value: "$400-$600", negative: true },
  { label: "Holding Costs", value: "Mortgage, utilities, insurance", negative: true },
  { label: "Showings & Open Houses", value: "Required", negative: true },
];

const cashOfferItems = [
  { label: "Average Time to Sell", value: "7-14 days" },
  { label: "Realtor Commission", value: "$0", positive: true },
  { label: "Closing Costs", value: "$0 - We pay", positive: true },
  { label: "Repairs & Updates", value: "$0 - Sell as-is", positive: true },
  { label: "Staging & Photos", value: "Not needed", positive: true },
  { label: "Inspection Fees", value: "$0", positive: true },
  { label: "Holding Costs", value: "Minimal", positive: true },
  { label: "Showings & Open Houses", value: "Not needed", positive: true },
];

const benefits = [
  "No realtor commissions (save 5-6%)",
  "We cover all closing costs",
  "No repairs or cleaning required",
  "Close in 7-14 days (or your timeline)",
  "Get paid in cash at closing",
  "No showings or open houses",
];

export default function Pricing() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary/10 via-background to-background">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
              How Much Does It Cost?
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Absolutely nothing. We pay all costs—no fees, no commissions, no surprises.
            </p>
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="py-16 md:py-24">
        <div className="container px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Traditional Sale vs. Cash Offer</h2>
              <p className="text-lg text-muted-foreground">
                See how selling to HomeBuyerBoise saves you time and money
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Traditional Sale */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Home className="h-5 w-5" />
                    Traditional Sale
                  </CardTitle>
                  <CardDescription>Listing with a realtor</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {traditionalSaleItems.map((item) => (
                    <div key={item.label} className="flex justify-between items-center pb-2 border-b last:border-0">
                      <div className="text-sm">{item.label}</div>
                      <div className={`text-sm font-semibold whitespace-nowrap ml-4 ${item.negative ? 'text-destructive' : ''}`}>
                        {item.negative && <span className="mr-1">-</span>}
                        {item.value}
                      </div>
                    </div>
                  ))}
                  <div className="pt-4 text-xs text-muted-foreground">
                    * Based on $300,000 home sale price
                  </div>
                </CardContent>
              </Card>

              {/* Cash Offer */}
              <Card className="border-primary">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-primary">
                    <DollarSign className="h-5 w-5" />
                    Sell to HomeBuyerBoise
                  </CardTitle>
                  <CardDescription>Fast cash offer</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {cashOfferItems.map((item) => (
                    <div key={item.label} className="flex justify-between items-center pb-2 border-b last:border-0">
                      <div className="text-sm">{item.label}</div>
                      <div className={`text-sm font-semibold whitespace-nowrap ml-4 ${item.positive ? 'text-primary' : ''}`}>
                        {item.value}
                      </div>
                    </div>
                  ))}
                  <div className="pt-4 text-xs text-muted-foreground">
                    Keep 100% of our cash offer—no deductions
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* How Our Process Works */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">How Our Process Works</h2>
              <p className="text-lg text-muted-foreground">
                Simple, transparent, and fast—close on your timeline
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {processSteps.map((item) => (
                <div key={item.step} className="text-center">
                  <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                    {item.step}
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 md:py-24">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose HomeBuyerBoise?</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {benefits.map((benefit) => (
                <div key={benefit} className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <Check className="h-4 w-4 text-primary" />
                  </div>
                  <div className="text-lg">{benefit}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Cost Breakdown */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">What You Save</h2>
              <p className="text-lg text-muted-foreground">
                On a typical $300,000 home sale, here's what you save selling to us
              </p>
            </div>

            <Card>
              <CardContent className="p-8">
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b">
                    <div>
                      <div className="font-semibold">Realtor Commission (6%)</div>
                      <div className="text-sm text-muted-foreground">Typically split between buyer and seller agents</div>
                    </div>
                    <div className="text-lg font-bold text-primary">$18,000</div>
                  </div>

                  <div className="flex justify-between items-center pb-3 border-b">
                    <div>
                      <div className="font-semibold">Closing Costs</div>
                      <div className="text-sm text-muted-foreground">Title, escrow, transfer taxes</div>
                    </div>
                    <div className="text-lg font-bold text-primary">$5,000</div>
                  </div>

                  <div className="flex justify-between items-center pb-3 border-b">
                    <div>
                      <div className="font-semibold">Repairs & Updates</div>
                      <div className="text-sm text-muted-foreground">Average pre-sale improvements</div>
                    </div>
                    <div className="text-lg font-bold text-primary">$10,000</div>
                  </div>

                  <div className="flex justify-between items-center pb-3 border-b">
                    <div>
                      <div className="font-semibold">Staging, Photos, Marketing</div>
                      <div className="text-sm text-muted-foreground">Professional presentation costs</div>
                    </div>
                    <div className="text-lg font-bold text-primary">$1,500</div>
                  </div>

                  <div className="flex justify-between items-center pb-3 border-b">
                    <div>
                      <div className="font-semibold">Inspection & Appraisal Fees</div>
                      <div className="text-sm text-muted-foreground">Required for traditional sales</div>
                    </div>
                    <div className="text-lg font-bold text-primary">$800</div>
                  </div>

                  <div className="flex justify-between items-center pb-3 border-b">
                    <div>
                      <div className="font-semibold">Holding Costs (2 months avg)</div>
                      <div className="text-sm text-muted-foreground">Mortgage, insurance, utilities, maintenance</div>
                    </div>
                    <div className="text-lg font-bold text-primary">$4,000</div>
                  </div>

                  <div className="flex justify-between items-center pt-4 text-xl font-bold">
                    <div>Total Savings</div>
                    <div className="text-primary">$39,300</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="mt-8 p-6 bg-primary/10 rounded-lg">
              <p className="text-center text-lg">
                <strong>You keep 100% of our offer.</strong> No deductions, no surprises, no hidden fees.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">
              Ready to Get Your Cash Offer?
            </h2>
            <p className="text-lg text-primary-foreground/90">
              Get a fair, no-obligation cash offer in less than 24 hours
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild data-testid="button-get-quote">
                <Link href="/get-quote">Get Your Free Cash Offer</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" data-testid="button-contact">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
