import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { HeroAddressLookup } from "@/components/HeroAddressLookup";
import { CommonSituations } from "@/components/CommonSituations";
import { NearMeFAQ } from "@/components/NearMeFAQ";
import { TrustStats, CompanyCredentials } from "@/components/TrustBadges";
import { ServiceAreaMap } from "@/components/ServiceAreaMap";
import { Testimonials } from "@/components/Testimonials";
import {
  Home as HomeIcon,
  Phone,
  CheckCircle2,
  Shield,
  Award,
  Clock,
  DollarSign,
  ArrowRight,
  Wallet,
  Zap,
  FileCheck,
  HandshakeIcon,
} from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import {
  generateLocalBusinessSchema,
  generateWebPageSchema,
} from "@/lib/schema";
import { SHOW_UNVERIFIED_TRUST } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Home Buyer Boise | Sell Your House Fast for Cash",
  description: "Sell your house fast for cash in Boise & Treasure Valley. No fees, no commissions, close on your timeline. Fair cash offers in 24 hours.",
  alternates: {
    canonical: "https://homebuyerboise.com",
  },
};

const howItWorksSteps = [
  {
    icon: Phone,
    title: "Contact Us",
    description: "Call or fill out our form to tell us about your property. We'll schedule a quick consultation.",
    features: ["Free Consultation", "No Obligation", "Fast Response", "Local Experts"],
    href: "/contact",
  },
  {
    icon: HomeIcon,
    title: "Property Evaluation",
    description: "We'll assess your property and provide a fair, no-obligation cash offer within 24 hours.",
    features: ["Quick Assessment", "Fair Market Value", "As-Is Condition", "24-Hour Offers"],
    href: "/pricing",
  },
  {
    icon: DollarSign,
    title: "Get Paid & Close",
    description: "Accept our offer and choose your closing date. We handle all the paperwork and pay cash.",
    features: ["Close on Your Timeline", "We Pay All Fees", "No Realtor Commissions", "Cash Payment"],
    href: "/get-quote",
  },
];

const trustIndicators = [
  {
    icon: Award,
    title: "Established 2018",
    description: "Six years buying homes in the Treasure Valley",
    unverified: true,
  },
  {
    icon: Shield,
    title: "Licensed & Insured",
    description: "Fully licensed real estate investors",
    unverified: true,
  },
  {
    icon: Wallet,
    title: "No Fees or Commissions",
    description: "We pay all closing costs and fees",
    unverified: false,
  },
  {
    icon: Clock,
    title: "Close on Your Timeline",
    description: "Fast closings or take your time - you choose",
    unverified: false,
  },
].filter((indicator) => SHOW_UNVERIFIED_TRUST || !indicator.unverified);

const benefits = [
  {
    icon: DollarSign,
    title: "Fair Cash Offers",
    description: "We provide competitive cash offers based on current market values, with no hidden fees or deductions.",
  },
  {
    icon: FileCheck,
    title: "No Repairs Needed",
    description: "Sell your house as-is. No need to spend time or money on repairs, cleaning, or staging.",
  },
  {
    icon: HandshakeIcon,
    title: "Simple Process",
    description: "Skip the complexity of traditional home sales. We handle all paperwork and make it hassle-free.",
  },
  {
    icon: Zap,
    title: "Fast Closings",
    description: "Need to sell quickly? We can close in as little as 7 days or work with your preferred timeline.",
  },
];

export default function HomePage() {
  const localBusinessSchema = generateLocalBusinessSchema();
  const webPageSchema = generateWebPageSchema({
    name: "Home Buyer Boise | Sell Your House Fast for Cash",
    description:
      "Sell your house fast for cash in Boise and Treasure Valley. No fees, no commissions, close on your timeline.",
    url: "/",
  });

  return (
    <div className="flex flex-col pb-20">
      <JsonLd data={[localBusinessSchema, webPageSchema]} />
      {/* Hero Section with Background Image */}
      <section className="relative py-24 md:py-32 lg:py-40 overflow-hidden">
        {/* Background Image - LCP element with priority loading */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/hero-background.png"
            alt="Home Buyer Boise - Cash home buyers serving Boise and Treasure Valley Idaho"
            fill
            className="object-cover"
            priority
          />
        </div>
        
        {/* Dark Overlay to ensure text readability */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-br from-primary/70 via-primary/65 to-primary/60"></div>
        
        <div className="container px-4 md:px-8 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Column - Hero Content */}
              <div className="text-center lg:text-left space-y-6 md:space-y-8">
                {SHOW_UNVERIFIED_TRUST && (
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                  <Shield className="h-4 w-4 text-white" />
                  <span className="text-sm font-medium text-white">Licensed & Insured Cash Home Buyers</span>
                </div>
                )}
                
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-tight">
                  Sell Your Boise House
                  <br />
                  <span className="text-accent">Fast for Cash</span>
                </h1>
                
                <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto lg:mx-0">
                  Get a fair cash offer in 24 hours. No fees, no commissions, no repairs needed. Close on your timeline.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center pt-4">
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="border-white/30 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 h-12 px-8 text-base"
                    asChild
                    data-testid="button-phone"
                  >
                    <a href="tel:2084052274">
                      <Phone className="mr-2 h-5 w-5" />
                      (208) 405-2274
                    </a>
                  </Button>
                </div>
              </div>

              {/* Right Column - Address Lookup */}
              <div className="lg:block">
                <HeroAddressLookup />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="relative py-12 md:py-16 overflow-hidden">
        {/* Stars Background */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/stars-background.png"
            alt={SHOW_UNVERIFIED_TRUST ? "Five star rating background representing Home Buyer Boise customer satisfaction" : ""}
            fill
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: 'center center' }}
          />
        </div>
        {/* Light overlay for text readability */}
        <div className="absolute inset-0 z-[1] bg-white/40"></div>
        <div className="container px-4 md:px-8 relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {trustIndicators.map((indicator, index) => (
                <Card key={index} className="text-center" data-testid={`card-trust-${index}`}>
                  <CardContent className="pt-5 pb-5 md:pt-6 md:pb-6 space-y-2 md:space-y-3 px-4 md:px-6">
                    <div className="inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/10">
                      <indicator.icon className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-sm md:text-base">{indicator.title}</h3>
                    <p className="text-xs md:text-sm text-muted-foreground leading-snug">{indicator.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-12 md:py-16 lg:py-24">
        <div className="container px-4 md:px-8">
          <div className="max-w-6xl mx-auto space-y-8 md:space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-3 md:space-y-4">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
                How to Sell Your House for Cash
              </h2>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                Our simple 3-step process makes selling your home fast and hassle-free. No agents, no fees, no stress.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-8">
              {howItWorksSteps.map((step, index) => (
                <Card key={index} className="hover-elevate" data-testid={`card-step-${index + 1}`}>
                  <CardHeader className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold text-sm">
                        {index + 1}
                      </div>
                      <CardTitle className="text-xl">{step.title}</CardTitle>
                    </div>
                    <CardDescription className="leading-relaxed">{step.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-2">
                      {step.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Common Situations We Help With */}
      <CommonSituations />

      {/* Full-Width Dark CTA */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Ready to Sell Your House Fast?
            </h2>
            <p className="text-lg text-primary-foreground leading-relaxed">
              Get your fair cash offer in 24 hours. No obligations, no pressure. 
              See what your home is worth today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button size="lg" variant="secondary" asChild data-testid="button-cta-quote">
                <Link href="/get-quote">
                  Get My Cash Offer
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild data-testid="button-cta-phone">
                <a href="tel:2084052274">
                  <Phone className="mr-2 h-5 w-5" />
                  Call (208) 405-2274
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Sell to Us */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-8">
          <div className="max-w-6xl mx-auto space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                Why Sell Your House to Home Buyer Boise?
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We make selling your house simple, fast, and stress-free. No commissions, no fees, no waiting months for a buyer.
              </p>
            </div>

            {/* Benefits Grid */}
            <div className="grid md:grid-cols-2 gap-8" data-testid="benefits-grid">
              {benefits.map((benefit, index) => (
                <Card key={index} className="hover-elevate" data-testid={`card-benefit-${index}`}>
                  <CardContent className="pt-6 pb-6 space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 flex-shrink-0">
                        <benefit.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-xl font-semibold">{benefit.title}</h3>
                        <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center">
              <Button size="lg" asChild data-testid="button-learn-more">
                <Link href="/pricing">
                  Learn How It Works
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* We Buy Any Condition */}
      <section className="py-16 md:py-24 bg-muted">
        <div className="container px-4 md:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              {/* Left: Content */}
              <div className="space-y-6">
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
                  We Buy Houses in Any Condition
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p className="leading-relaxed">
                    Don&apos;t worry about making repairs or upgrades. We buy houses as-is, regardless of condition.
                  </p>
                  <p className="leading-relaxed">
                    Whether your home needs major repairs, has outdated finishes, or is move-in ready, 
                    we&apos;ll make you a fair offer. You don&apos;t need to fix anything or even clean up.
                  </p>
                  <p className="leading-relaxed">
                    We&apos;re local Boise investors who understand the market and can close quickly on your timeline.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" asChild data-testid="button-condition-quote">
                    <Link href="/get-quote">
                      Get My Offer
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild data-testid="button-condition-about">
                    <Link href="/about">
                      Learn About Us
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Right: Card with Conditions We Buy */}
              <Card className="bg-card border-border">
                <CardContent className="p-8 md:p-10 space-y-6">
                  <h3 className="text-xl md:text-2xl font-bold">
                    Situations We Help With
                  </h3>
                  <ul className="space-y-3">
                    {[
                      "Foreclosure or pre-foreclosure",
                      "Inherited property",
                      "Divorce settlement",
                      "Job relocation",
                      "Downsizing or retirement",
                      "Problem tenants",
                      "Major repairs needed",
                      "Behind on payments",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>


      {/* Testimonials */}
      {SHOW_UNVERIFIED_TRUST && (
      <section className="relative py-16 md:py-24 overflow-hidden">
        {/* Smiley Face Background */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/smiley-background.png"
            alt="Happy customer testimonial background for Home Buyer Boise reviews"
            fill
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: 'right center' }}
          />
        </div>
        {/* Light overlay for text readability */}
        <div className="absolute inset-0 z-[1] bg-white/40"></div>
        <div className="container px-4 md:px-8 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                What Our Clients Say
              </h2>
              <p className="text-lg text-muted-foreground">
                Trusted by homeowners across Boise and the Treasure Valley
              </p>
            </div>
            <Suspense fallback={<div className="h-64 flex items-center justify-center"><div className="animate-pulse text-muted-foreground">Loading testimonials...</div></div>}>
              <Testimonials limit={3} />
            </Suspense>
          </div>
        </div>
      </section>
      )}

      {/* Trust Stats Section */}
      <TrustStats />

      {/* Service Area Map */}
      <section className="py-16 md:py-24 bg-muted">
        <div className="container px-4 md:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                Buying Houses Across the Treasure Valley
              </h2>
              <p className="text-lg text-muted-foreground">
                Cash home buyers serving Boise, Meridian, Eagle, Kuna, Star, Middleton and surrounding Treasure Valley areas
              </p>
            </div>
            <ServiceAreaMap />
          </div>
        </div>
      </section>

      {/* Near Me FAQ Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            <NearMeFAQ city="Boise" serviceName="cash home buying" />
          </div>
        </div>
      </section>

      {/* Company Credentials / Why Trust Us */}
      <CompanyCredentials className="bg-muted/30" />

      {/* Final CTA */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Ready to get started?
            </h2>
            <p className="text-xl text-primary-foreground leading-relaxed">
              Get your free cash offer today{SHOW_UNVERIFIED_TRUST ? " and discover why we're the Treasure Valley's most trusted home buyers" : ""}.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button size="lg" variant="secondary" asChild data-testid="button-final-cta-quote">
                <Link href="/get-quote">
                  Get Free Quote
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" 
                asChild 
                data-testid="button-final-cta-contact"
              >
                <Link href="/contact">
                  Contact Us
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
