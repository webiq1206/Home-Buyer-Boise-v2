import { lazy, Suspense } from "react";
import { Link } from "wouter";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { HeroAddressLookup } from "@/components/HeroAddressLookup";
import {
  Home as HomeIcon,
  Phone,
  CheckCircle2,
  Shield,
  Award,
  Clock,
  DollarSign,
  ArrowRight,
  Heart,
  Wallet,
  Users,
  Zap,
  FileCheck,
  HandshakeIcon,
} from "lucide-react";
import { HeroQuoteSection } from "@/components/HeroQuoteSection";
import { NearMeFAQ } from "@/components/NearMeFAQ";
import { CommonSituations } from "@/components/CommonSituations";
import { generateSEOMetadata, generateLogoAltTag, BUSINESS_INFO } from "@/lib/seo";
import { generateLocalBusinessSchema, generateOrganizationSchema, generateBreadcrumbSchema } from "@/lib/schema";
import heroBackground from "@assets/Home Buyer Boise Background Image_1764010277862.png";
import starsBackground from "@assets/Stars_1764013365816.png";
import smileyBackground from "@assets/Smiley Face small_1764092666035.png";

// Lazy load heavy components for better initial page load
const ServiceAreaMap = lazy(() => import("@/components/ServiceAreaMap").then(mod => ({ default: mod.ServiceAreaMap })));
const Testimonials = lazy(() => import("@/components/Testimonials").then(mod => ({ default: mod.Testimonials })));

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
    href: "/how-it-works",
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
  },
  {
    icon: Shield,
    title: "Licensed & Insured",
    description: "Fully licensed real estate investors",
  },
  {
    icon: Wallet,
    title: "No Fees or Commissions",
    description: "We pay all closing costs and fees",
  },
  {
    icon: Clock,
    title: "Close on Your Timeline",
    description: "Fast closings or take your time - you choose",
  },
];

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

export default function Home() {
  const seoParams = { 
    serviceName: "Cash Home Buyer", 
    serviceSlug: "home", 
    isHomePage: true 
  };
  
  const seoData = generateSEOMetadata(seoParams);
  const logoAlt = generateLogoAltTag(seoParams);

  const localBusinessSchema = generateLocalBusinessSchema();
  const organizationSchema = generateOrganizationSchema();
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" }
  ]);

  return (
    <>
      <Helmet>
        <title>{seoData.title}</title>
        <meta name="description" content={seoData.description} />
        <link rel="canonical" href={seoData.canonical} />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content={seoData.ogTitle} />
        <meta property="og:description" content={seoData.ogDescription} />
        <meta property="og:image" content={seoData.ogImage} />
        <meta property="og:image:alt" content={logoAlt} />
        <meta property="og:image:width" content="512" />
        <meta property="og:image:height" content="512" />
        <meta property="og:url" content={seoData.canonical} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={BUSINESS_INFO.name} />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content={seoData.twitterCard} />
        <meta name="twitter:title" content={seoData.ogTitle} />
        <meta name="twitter:description" content={seoData.ogDescription} />
        <meta name="twitter:image" content={seoData.ogImage} />
        <meta name="twitter:image:alt" content={logoAlt} />
        
        {/* JSON-LD Structured Data - LocalBusiness */}
        <script type="application/ld+json">
          {JSON.stringify(localBusinessSchema)}
        </script>
        
        {/* JSON-LD Structured Data - Organization */}
        <script type="application/ld+json">
          {JSON.stringify(organizationSchema)}
        </script>
        
        {/* JSON-LD Structured Data - BreadcrumbList */}
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      </Helmet>

      <div className="flex flex-col pb-20">
        {/* Hero Section with Background Image */}
        <section className="relative py-24 md:py-32 lg:py-40 overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img 
              src={heroBackground} 
              alt="HomeBuyerBoise - Cash home buyers serving Boise and Treasure Valley Idaho"
              className="w-full h-full object-cover"
              width="1920"
              height="1080"
              loading="eager"
            />
          </div>
          
          {/* Dark Overlay to ensure text readability */}
          <div className="absolute inset-0 z-[1] bg-gradient-to-br from-primary/70 via-primary/65 to-primary/60"></div>
          
          <div className="container px-4 md:px-8 relative z-10">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Left Column - Hero Content */}
                <div className="text-center lg:text-left space-y-6 md:space-y-8">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                    <Shield className="h-4 w-4 text-white" />
                    <span className="text-sm font-medium text-white">Licensed & Insured Cash Home Buyers</span>
                  </div>
                  
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
                        (208) 405-CASH
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
            <img 
              src={starsBackground} 
              alt=""
              className="w-full h-full object-cover opacity-30"
              width="1920"
              height="1080"
              loading="lazy"
            />
          </div>
          {/* Overlay for readability */}
          <div className="absolute inset-0 z-[1] bg-background/70"></div>
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
                  Call (208) 405-CASH
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
                Why Sell Your House to HomeBuyerBoise?
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
                <Link href="/how-it-works">
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
                    Don't worry about making repairs or upgrades. We buy houses as-is, regardless of condition.
                  </p>
                  <p className="leading-relaxed">
                    Whether your home needs major repairs, has outdated finishes, or is move-in ready, 
                    we'll make you a fair offer. You don't need to fix anything or even clean up.
                  </p>
                  <p className="leading-relaxed">
                    We're local Boise investors who understand the market and can close quickly on your timeline.
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
      <section className="relative py-16 md:py-24 overflow-hidden">
        {/* Smiley Face Background */}
        <div className="absolute inset-0 z-0">
          <img 
            src={smileyBackground} 
            alt=""
            className="w-full h-full object-cover opacity-60"
            width="1920"
            height="1080"
            loading="lazy"
          />
        </div>
        {/* Overlay for readability */}
        <div className="absolute inset-0 z-[1] bg-background/50"></div>
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
            <Suspense fallback={<div className="h-96 flex items-center justify-center"><div className="animate-pulse text-muted-foreground">Loading map...</div></div>}>
              <ServiceAreaMap />
            </Suspense>
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

      {/* Final CTA */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Ready to get started?
            </h2>
            <p className="text-xl text-primary-foreground leading-relaxed">
              Get your free cash offer today and discover why we're the Treasure Valley's most trusted home buyers.
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
    </>
  );
}
