import type { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Savings Calculator | Compare Cash Sale vs Traditional Listing",
  description: "Use our calculator to compare how much you could save by selling your house for cash versus listing with a realtor. See your potential net proceeds.",
  alternates: {
    canonical: "https://homebuyerboise.com/savings-calculator",
  },
};

export default function SavingsCalculatorPage() {
  return (
    <>
        {/* Hero */}
        <section className="bg-gradient-to-br from-navy to-primary text-white py-16 lg:py-24">
          <div className="container px-4">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Savings Calculator</h1>
              <p className="text-xl text-white/90">
                Compare how much you could save by selling your house for cash versus listing with a realtor.
              </p>
            </div>
          </div>
        </section>

        {/* Calculator */}
        <section className="py-16 lg:py-24">
          <div className="container px-4">
            <div className="max-w-3xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle>Compare Your Options</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6">
                    Our interactive calculator helps you understand the true costs of selling your home. Compare a direct cash sale with traditional realtor listing to see your potential net proceeds.
                  </p>
                  <div className="bg-muted rounded-lg p-8 text-center">
                    <p className="text-lg font-semibold mb-2">Calculator Coming Soon</p>
                    <p className="text-muted-foreground mb-6">
                      In the meantime, call us for a free consultation and detailed breakdown of your options.
                    </p>
                    <a 
                      href="tel:2084052275" 
                      className="text-2xl font-bold text-primary hover:underline block mb-4"
                    >
                      (208) 405-2275
                    </a>
                    <Button asChild>
                      <Link href="/get-quote">Get Your Free Cash Offer</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <div className="mt-12 grid md:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Traditional Sale Costs</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• 5-6% Realtor Commission</li>
                      <li>• 2-3% Closing Costs</li>
                      <li>• Repair & Staging Costs</li>
                      <li>• Holding Costs (mortgage, utilities)</li>
                      <li>• Potential Price Reductions</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Cash Sale Benefits</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• $0 Realtor Commission</li>
                      <li>• $0 Closing Costs (we pay)</li>
                      <li>• $0 Repair Costs (sell as-is)</li>
                      <li>• Minimal Holding Costs (fast close)</li>
                      <li>• Guaranteed Offer</li>
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
