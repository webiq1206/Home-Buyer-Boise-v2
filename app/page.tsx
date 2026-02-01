import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Clock, DollarSign, CheckCircle2, Phone, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Sell Your House Fast for Cash in Boise | Home Buyer Boise",
  description: "Get a fair cash offer for your Boise home in 24 hours. No fees, no commissions, no repairs needed. We buy houses in any condition. Close on your timeline.",
  keywords: "sell house fast Boise, cash home buyers Boise, we buy houses Boise, sell house as is Idaho",
};

const trustIndicators = [
  {
    icon: Shield,
    title: "Licensed & Insured",
    description: "Fully licensed Idaho real estate investors with comprehensive coverage",
  },
  {
    icon: Clock,
    title: "Close in 7 Days",
    description: "Get cash in hand quickly or choose your own closing date",
  },
  {
    icon: DollarSign,
    title: "Fair Cash Offers",
    description: "Transparent pricing with no hidden fees or commissions",
  },
  {
    icon: CheckCircle2,
    title: "Any Condition",
    description: "We buy houses as-is. No repairs or cleaning required",
  },
];

const benefits = [
  "No realtor commissions (save 5-6%)",
  "No repairs or cleaning needed",
  "No showings or open houses",
  "No buyer financing delays",
  "We pay all closing costs",
  "Close in as little as 7 days",
];

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <section className="relative py-24 md:py-32 lg:py-40 overflow-hidden bg-primary">
        <div className="container px-4 md:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
              <Shield className="h-4 w-4 text-white" />
              <span className="text-sm font-medium text-white">Licensed & Insured Cash Home Buyers</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-tight">
              Sell Your Boise House
              <br />
              <span className="text-accent">Fast for Cash</span>
            </h1>
            
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
              Get a fair cash offer in 24 hours. No fees, no commissions, no repairs needed. Close on your timeline.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Button size="lg" variant="secondary" asChild data-testid="button-get-offer">
                <Link href="/get-quote">
                  Get Your Cash Offer
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white/30 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20"
                asChild
                data-testid="button-phone"
              >
                <a href="tel:2084052275">
                  <Phone className="mr-2 h-5 w-5" />
                  (208) 405-2275
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container px-4 md:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {trustIndicators.map((indicator, index) => (
                <Card key={index} className="text-center" data-testid={`card-trust-${index}`}>
                  <CardContent className="pt-6 pb-6 space-y-3 px-6">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
                      <indicator.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold">{indicator.title}</h3>
                    <p className="text-sm text-muted-foreground">{indicator.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-muted/30">
        <div className="container px-4 md:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold">Why Sell to Home Buyer Boise?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left max-w-2xl mx-auto">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
            <div className="pt-4">
              <Button size="lg" asChild>
                <Link href="/get-quote">
                  Get Your Free Cash Offer
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container px-4 md:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-4">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary text-white font-bold text-xl">
                  1
                </div>
                <h3 className="text-xl font-semibold">Contact Us</h3>
                <p className="text-muted-foreground">
                  Fill out our simple form or call us. Tell us about your property.
                </p>
              </div>
              <div className="space-y-4">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary text-white font-bold text-xl">
                  2
                </div>
                <h3 className="text-xl font-semibold">Get Your Offer</h3>
                <p className="text-muted-foreground">
                  We&apos;ll evaluate your property and present a fair, no-obligation cash offer.
                </p>
              </div>
              <div className="space-y-4">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary text-white font-bold text-xl">
                  3
                </div>
                <h3 className="text-xl font-semibold">Close & Get Paid</h3>
                <p className="text-muted-foreground">
                  Accept our offer and close on your timeline. Get cash in hand.
                </p>
              </div>
            </div>
            <div className="pt-4">
              <Button variant="outline" size="lg" asChild>
                <Link href="/how-it-works">
                  Learn More About Our Process
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-primary text-white">
        <div className="container px-4 md:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">Ready to Sell Your House?</h2>
            <p className="text-lg text-white/90">
              Get a fair cash offer today. No obligations, no pressure.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/get-quote">Get Your Cash Offer</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10" asChild>
                <a href="tel:2084052275">
                  <Phone className="mr-2 h-5 w-5" />
                  Call (208) 405-2275
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
