import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { CheckCircle, XCircle, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "How It Works | Sell Your House Fast to Home Buyer Boise",
  description: "Learn how to sell your house fast for cash with Home Buyer Boise. Our simple 3-step process makes selling easy. No repairs, no fees, close on your timeline.",
  alternates: {
    canonical: "https://homebuyerboise.com/pricing",
  },
};

export default function HowItWorksPage() {
  return (
    <>
        {/* Hero */}
        <section className="bg-gradient-to-br from-navy to-primary text-white py-16 lg:py-24">
          <div className="container px-4">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">How It Works</h1>
              <p className="text-xl text-white/90">
                Selling your house for cash is simple. Here&apos;s exactly what to expect when you work with Home Buyer Boise.
              </p>
            </div>
          </div>
        </section>

        {/* Steps */}
        <section className="py-16 lg:py-24">
          <div className="container px-4">
            <div className="max-w-4xl mx-auto">
              <div className="space-y-12">
                <div className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xl">1</div>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold mb-3">Tell Us About Your Property</h2>
                    <p className="text-muted-foreground mb-4">
                      Fill out our simple online form or give us a call at (208) 405-2275. We&apos;ll ask a few basic questions about your property - the address, condition, and your timeline. It takes less than 5 minutes.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span>No commitment required</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span>Takes less than 5 minutes</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xl">2</div>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold mb-3">Get Your Cash Offer</h2>
                    <p className="text-muted-foreground mb-4">
                      Within 24 hours, we&apos;ll analyze your property and present you with a fair, no-obligation cash offer. We base our offers on local market data, property condition, and recent comparable sales.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span>Offer within 24 hours</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span>Fair market-based pricing</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span>No obligation to accept</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xl">3</div>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold mb-3">Close on Your Timeline</h2>
                    <p className="text-muted-foreground mb-4">
                      If you accept our offer, you choose the closing date. We can close in as little as 7 days or wait 60+ days if you need more time. We pay all closing costs and handle all the paperwork.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span>Close as fast as 7 days</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span>We pay closing costs</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span>You choose your closing date</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison */}
        <section className="py-16 lg:py-24 bg-muted">
          <div className="container px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Cash Sale vs. Traditional Listing</h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-4 text-primary">Sell to Home Buyer Boise</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                      <span>Close in as little as 7 days</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                      <span>No repairs needed - sell as-is</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                      <span>No realtor commissions or fees</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                      <span>We pay closing costs</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                      <span>No showings or open houses</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                      <span>Guaranteed cash offer</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-4">Traditional Listing</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2">
                      <XCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                      <span>Average 60-90 days on market</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <XCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                      <span>Repairs and staging required</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <XCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                      <span>5-6% realtor commissions</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <XCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                      <span>Closing costs add up</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <XCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                      <span>Multiple showings and disruptions</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <XCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                      <span>Deals can fall through</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 lg:py-24 bg-primary text-white">
          <div className="container px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Get your free, no-obligation cash offer today.
            </p>
            <Button size="lg" className="bg-gold text-black hover:bg-gold/90" asChild>
              <Link href="/get-quote">
                Get Your Cash Offer
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>
    </>
  );
}
