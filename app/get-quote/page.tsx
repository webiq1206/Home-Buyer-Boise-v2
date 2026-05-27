import type { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Clock, Shield, DollarSign, Phone } from "lucide-react";
import { QuoteForm } from "@/components/QuoteForm";
import { JsonLd } from "@/components/JsonLd";
import {
  generateWebPageSchema,
  generateBreadcrumbSchema,
} from "@/lib/schema";

export const metadata: Metadata = {
  title: "Get a Free Cash Offer | Home Buyer Boise",
  description: "Get a free, no-obligation cash offer on your Boise area home in 24 hours. Fill out our simple form and we'll contact you with a fair offer.",
  alternates: {
    canonical: "https://homebuyerboise.com/get-quote",
  },
};

export default function GetQuotePage() {
  const webPageSchema = generateWebPageSchema({
    name: "Get a Free Cash Offer | Home Buyer Boise",
    description:
      "Request a free, no-obligation cash offer on your Boise area home in 24 hours.",
    url: "/get-quote",
    breadcrumbs: [
      { name: "Home", url: "/" },
      { name: "Get Quote", url: "/get-quote" },
    ],
  });
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Get Quote", url: "/get-quote" },
  ]);

  return (
    <>
        <JsonLd data={[webPageSchema, breadcrumbSchema]} />
        {/* Hero */}
        <section className="bg-gradient-to-br from-navy to-primary text-white py-12 md:py-16">
          <div className="container px-4">
            <div className="max-w-3xl">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">Get Your Free Cash Offer</h1>
              <p className="text-lg md:text-xl text-white/90">
                Complete the form below to receive a fair, no-obligation cash offer on your property within 24 hours.
              </p>
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section className="py-8 md:py-12 lg:py-16">
          <div className="container px-4">
            <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
              {/* Form */}
              <div className="lg:col-span-2">
                <QuoteForm />
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>What to Expect</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      <li className="flex gap-3">
                        <Clock className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold">Cash Offer in 24 Hours</p>
                          <p className="text-sm text-muted-foreground">We&apos;ll present you with a fair offer fast</p>
                        </div>
                      </li>
                      <li className="flex gap-3">
                        <Shield className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold">No Obligation</p>
                          <p className="text-sm text-muted-foreground">You&apos;re free to accept or decline our offer</p>
                        </div>
                      </li>
                      <li className="flex gap-3">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold">Sell As-Is</p>
                          <p className="text-sm text-muted-foreground">No repairs, cleaning, or staging needed</p>
                        </div>
                      </li>
                      <li className="flex gap-3">
                        <DollarSign className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold">No Fees or Commissions</p>
                          <p className="text-sm text-muted-foreground">We cover all closing costs</p>
                        </div>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-muted/50">
                  <CardContent className="pt-6">
                    <p className="font-semibold mb-2">Prefer to Talk?</p>
                    <p className="text-muted-foreground mb-4">
                      Call us directly to speak with a local expert.
                    </p>
                    <a 
                      href="tel:2084052275" 
                      className="inline-flex items-center text-xl font-bold text-primary hover:underline"
                    >
                      <Phone className="mr-2 h-5 w-5" />
                      (208) 405-2275
                    </a>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <h4 className="font-semibold mb-3">Why Home Buyer Boise?</h4>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li>✓ Local, family-owned company</li>
                      <li>✓ Over 500 homes purchased</li>
                      <li>✓ Close in as fast as 7 days</li>
                      <li>✓ We buy in any condition</li>
                      <li>✓ Transparent, honest process</li>
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
