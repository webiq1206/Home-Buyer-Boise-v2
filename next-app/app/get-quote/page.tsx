import type { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Get a Free Cash Offer | Home Buyer Boise",
  description: "Get a free, no-obligation cash offer on your Boise area home in 24 hours. Fill out our simple form and we'll contact you with a fair offer.",
  alternates: {
    canonical: "https://homebuyerboise.com/get-quote",
  },
};

export default function GetQuotePage() {
  return (
    <>
        {/* Hero */}
        <section className="bg-gradient-to-br from-navy to-primary text-white py-16">
          <div className="container px-4">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Get Your Free Cash Offer</h1>
              <p className="text-xl text-white/90">
                Fill out the form below to receive a fair, no-obligation cash offer on your property within 24 hours.
              </p>
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section className="py-16 lg:py-24">
          <div className="container px-4">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Form Placeholder */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Property Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-6">
                      Our quick quote form will be displayed here. In the meantime, call us at{" "}
                      <a href="tel:2084052275" className="text-primary font-semibold hover:underline">
                        (208) 405-2275
                      </a>{" "}
                      to get started.
                    </p>
                    <div className="bg-muted rounded-lg p-8 text-center">
                      <p className="text-lg font-semibold mb-2">Quote Form Coming Soon</p>
                      <p className="text-muted-foreground">
                        Call or text us at (208) 405-2275 for immediate assistance
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>What to Expect</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      <li className="flex gap-3">
                        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold">Cash Offer in 24 Hours</p>
                          <p className="text-sm text-muted-foreground">We&apos;ll present you with a fair offer fast</p>
                        </div>
                      </li>
                      <li className="flex gap-3">
                        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold">No Obligation</p>
                          <p className="text-sm text-muted-foreground">You&apos;re free to accept or decline our offer</p>
                        </div>
                      </li>
                      <li className="flex gap-3">
                        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold">Sell As-Is</p>
                          <p className="text-sm text-muted-foreground">No repairs, cleaning, or staging needed</p>
                        </div>
                      </li>
                      <li className="flex gap-3">
                        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold">No Fees</p>
                          <p className="text-sm text-muted-foreground">We cover all closing costs</p>
                        </div>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="mt-6">
                  <CardContent className="pt-6">
                    <p className="font-semibold mb-2">Questions?</p>
                    <p className="text-muted-foreground mb-4">
                      Call us directly to speak with a local expert.
                    </p>
                    <a 
                      href="tel:2084052275" 
                      className="text-2xl font-bold text-primary hover:underline"
                    >
                      (208) 405-2275
                    </a>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
    </>
  );
}
