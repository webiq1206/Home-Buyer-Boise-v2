import type { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SavingsCalculator } from "@/components/SavingsCalculator";
import { TrendingDown, TrendingUp, Clock, Shield } from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import {
  generateWebPageSchema,
  generateBreadcrumbSchema,
} from "@/lib/schema";

export const metadata: Metadata = {
  title: "Savings Calculator | Compare Cash Sale vs Traditional Listing",
  description: "Use our calculator to compare how much you could save by selling your house for cash versus listing with a realtor. See your potential net proceeds.",
  alternates: {
    canonical: "https://homebuyerboise.com/savings-calculator",
  },
};

export default function SavingsCalculatorPage() {
  const webPageSchema = generateWebPageSchema({
    name: "Savings Calculator | Compare Cash Sale vs Traditional Listing",
    description:
      "Estimate your potential net proceeds from a cash sale versus a traditional listing.",
    url: "/savings-calculator",
    breadcrumbs: [
      { name: "Home", url: "/" },
      { name: "Savings Calculator", url: "/savings-calculator" },
    ],
  });
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Savings Calculator", url: "/savings-calculator" },
  ]);

  return (
    <>
        <JsonLd data={[webPageSchema, breadcrumbSchema]} />
        {/* Hero */}
        <section className="bg-gradient-to-br from-navy to-primary text-white py-12 lg:py-16">
          <div className="container px-4">
            <div className="max-w-3xl">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">Savings Calculator</h1>
              <p className="text-lg md:text-xl text-white/90">
                Compare how much you could save by selling your house for cash versus listing with a realtor.
              </p>
            </div>
          </div>
        </section>

        {/* Why Compare */}
        <section className="py-8 bg-muted/50 border-b">
          <div className="container px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="flex flex-col items-center">
                <TrendingDown className="h-8 w-8 text-primary mb-2" />
                <p className="font-semibold">No Hidden Fees</p>
                <p className="text-sm text-muted-foreground">See the real costs</p>
              </div>
              <div className="flex flex-col items-center">
                <Clock className="h-8 w-8 text-primary mb-2" />
                <p className="font-semibold">Time Value</p>
                <p className="text-sm text-muted-foreground">Factor in holding costs</p>
              </div>
              <div className="flex flex-col items-center">
                <TrendingUp className="h-8 w-8 text-primary mb-2" />
                <p className="font-semibold">Net Proceeds</p>
                <p className="text-sm text-muted-foreground">What you actually keep</p>
              </div>
              <div className="flex flex-col items-center">
                <Shield className="h-8 w-8 text-primary mb-2" />
                <p className="font-semibold">No Obligation</p>
                <p className="text-sm text-muted-foreground">Just information</p>
              </div>
            </div>
          </div>
        </section>

        {/* Calculator Section */}
        <section className="py-8 md:py-12 lg:py-16">
          <div className="container px-4">
            <div className="max-w-4xl mx-auto">
              <SavingsCalculator />
            </div>
          </div>
        </section>

        {/* Info Section */}
        <section className="py-12 lg:py-16 bg-muted/30">
          <div className="container px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Understanding the Numbers</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Traditional Sale Costs</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-sm text-muted-foreground">
                      <li className="flex justify-between">
                        <span>Realtor Commission</span>
                        <span className="font-medium text-foreground">5-6% of sale price</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Closing Costs</span>
                        <span className="font-medium text-foreground">2-3% of sale price</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Repairs & Updates</span>
                        <span className="font-medium text-foreground">$5,000 - $50,000+</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Staging & Cleaning</span>
                        <span className="font-medium text-foreground">$2,000 - $5,000</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Buyer Concessions</span>
                        <span className="font-medium text-foreground">1-3% typical</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Time on Market</span>
                        <span className="font-medium text-foreground">30-180+ days</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-primary">
                  <CardHeader>
                    <CardTitle className="text-lg text-primary">Cash Sale to Us</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-sm text-muted-foreground">
                      <li className="flex justify-between">
                        <span>Realtor Commission</span>
                        <span className="font-medium text-green-600">$0</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Closing Costs</span>
                        <span className="font-medium text-green-600">$0 (we pay)</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Repairs & Updates</span>
                        <span className="font-medium text-green-600">Built into offer</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Staging & Cleaning</span>
                        <span className="font-medium text-green-600">$0</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Concessions</span>
                        <span className="font-medium text-green-600">$0</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Time to Close</span>
                        <span className="font-medium text-green-600">7-14 days</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
    </>
  );
}
