import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowRight, CheckCircle, Phone, MapPin, Plane, DollarSign, HeartCrack, Home, Clock, Tag, Calendar, TrendingUp, Quote, Star, Check, X, type LucideIcon } from "lucide-react";
import { CITIES } from "@shared/contentData";
import { SERVICE_CONTENT } from "@shared/servicesData";
import type { Service } from "@shared/servicesData";
import { generateSEOMetadata, BUSINESS_INFO, generateFAQSchema } from "@/lib/seo";
import { generateServicePageSchema, generateBreadcrumbSchema } from "@/lib/seo";
import { Link } from "wouter";

interface ServiceSuccessStory {
  title: string;
  location: string;
  situation: string;
  solution: string;
  quote: string;
}

interface ServiceProcessStep {
  step: number;
  title: string;
  description: string;
  timeline: string;
}

interface ServiceComparisonData {
  traditional: {
    timeline: string;
    repairs: string;
    commissions: string;
    closingCosts: string;
    certainty: string;
    convenience: string;
  };
  cashOffer: {
    timeline: string;
    repairs: string;
    commissions: string;
    closingCosts: string;
    certainty: string;
    convenience: string;
  };
}

interface ServiceFAQ {
  question: string;
  answer: string;
}

interface ServiceContentData {
  heroSubtitle: string;
  intro: string;
  whyChoose: string[];
  situations: { title: string; description: string }[];
  process?: string;
  detailedProcess?: ServiceProcessStep[];
  faqs?: ServiceFAQ[];
  successStories?: ServiceSuccessStory[];
  comparisonData?: ServiceComparisonData;
  cta: string;
}

// Icon mapping for situation cards
const SITUATION_ICONS: Record<string, LucideIcon> = {
  "Job Relocation": Plane,
  "Company Relocation": Plane,
  "Financial Hardship": DollarSign,
  "Divorce": HeartCrack,
  "Downsizing": Home,
  "Any Condition": Home,
  "Any Situation": CheckCircle,
  "Any Timeline": Clock,
  "Any Price Range": Tag,
  "Short Notice Transfer": Calendar,
  "Already Moved": MapPin,
  "Can't Wait for Traditional Sale": TrendingUp,
};

interface ServiceTemplateProps {
  service: Service;
}

export function ServiceTemplate({ service }: ServiceTemplateProps) {
  const content = SERVICE_CONTENT[service.slug as keyof typeof SERVICE_CONTENT] as ServiceContentData;
  
  if (!content) {
    throw new Error(`Service content not found for slug: ${service.slug}`);
  }
  
  const seoMetadata = generateSEOMetadata({
    serviceName: service.name,
    serviceSlug: service.slug,
    customCanonical: `https://homebuyerboise.com/services/${service.slug}`,
  });

  const serviceSchema = generateServicePageSchema(
    service.name,
    service.metaDescription,
    service.slug
  );
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Services", url: "/services" },
    { name: service.name, url: `/services/${service.slug}` },
  ]);
  
  const faqSchema = content.faqs ? generateFAQSchema(content.faqs) : null;

  return (
    <>
      <Helmet>
        <title>{service.title}</title>
        <meta name="description" content={service.metaDescription} />
        <meta name="keywords" content={service.keywords.join(", ")} />
        <link rel="canonical" href={seoMetadata.canonical} />
        
        <meta property="og:title" content={service.title} />
        <meta property="og:description" content={service.metaDescription} />
        <meta property="og:url" content={seoMetadata.canonical} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={seoMetadata.ogImage} />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={service.title} />
        <meta name="twitter:description" content={service.metaDescription} />

        <script type="application/ld+json">
          {JSON.stringify(serviceSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
        {faqSchema && (
          <script type="application/ld+json">
            {JSON.stringify(faqSchema)}
          </script>
        )}
      </Helmet>

      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-accent/5 py-16 md:py-24">
          <div className="container px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4" data-testid="badge-service-category">
                {service.name}
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6" data-testid="heading-service">
                {service.h1}
              </h1>
              <p className="text-xl text-muted-foreground mb-8" data-testid="text-hero-subtitle">
                {content.heroSubtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild data-testid="button-get-offer">
                  <Link href="/get-quote">
                    Get Your Cash Offer
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild data-testid="button-call">
                  <a href="tel:2084052275">
                    <Phone className="mr-2 h-5 w-5" />
                    (208) 405-2275
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-16">
          <div className="container px-4">
            <div className="max-w-4xl mx-auto">
              <p className="text-lg leading-relaxed text-muted-foreground mb-8" data-testid="text-intro">
                {content.intro}
              </p>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 bg-muted/30">
          <div className="container px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">Why Choose HomeBuyerBoise</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {content.whyChoose.map((item, index) => (
                  <div key={index} className="flex items-start gap-3" data-testid={`benefit-${index}`}>
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                    <span className="text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Success Stories */}
        {content.successStories && content.successStories.length > 0 && (
          <section className="py-16 bg-gradient-to-br from-muted/20 via-background to-muted/10">
            <div className="container px-4">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                  <Badge className="mb-4">Real Results</Badge>
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">Success Stories from the Treasure Valley</h2>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Real homeowners, real situations, real solutions
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  {content.successStories.map((story, index) => (
                    <Card 
                      key={index}
                      className="hover-elevate transition-all duration-300 border-primary/20 bg-gradient-to-br from-background to-secondary/10 relative overflow-hidden"
                      data-testid={`success-story-${index}`}
                    >
                      {/* Quote decoration */}
                      <div className="absolute top-4 right-4 opacity-5">
                        <Quote className="h-16 w-16 text-primary" />
                      </div>

                      <CardContent className="pt-6 pb-6 relative">
                        {/* Location Badge */}
                        <Badge variant="secondary" className="mb-4 bg-[hsl(var(--gold))]/10 text-[hsl(var(--gold))] border-[hsl(var(--gold))]/30">
                          <MapPin className="h-3 w-3 mr-1" />
                          {story.location}
                        </Badge>

                        {/* Title */}
                        <h3 className="font-bold text-lg mb-3 text-foreground">{story.title}</h3>

                        {/* Situation */}
                        <div className="mb-3">
                          <p className="text-sm font-semibold text-muted-foreground mb-1">Situation:</p>
                          <p className="text-sm text-muted-foreground">{story.situation}</p>
                        </div>

                        {/* Solution */}
                        <div className="mb-4">
                          <p className="text-sm font-semibold text-primary mb-1">Solution:</p>
                          <p className="text-sm text-foreground">{story.solution}</p>
                        </div>

                        {/* Quote */}
                        <div className="pt-4 border-t border-border/50">
                          <Quote className="h-4 w-4 text-primary/40 mb-2" />
                          <p className="text-sm italic text-muted-foreground leading-relaxed">"{story.quote}"</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Common Situations */}
        <section className="py-16 bg-gradient-to-b from-muted/30 to-background">
          <div className="container px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold mb-12 text-center">Common Situations We Help With</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {content.situations.map((situation, index) => {
                  const IconComponent = SITUATION_ICONS[situation.title] || Home;
                  
                  // Customize trust footer per scenario
                  const trustCues: Record<string, { icon: LucideIcon; text: string }> = {
                    "Job Relocation": { icon: Clock, text: "Close in 7-14 days" },
                    "Company Relocation": { icon: Clock, text: "Fast closings available" },
                    "Financial Hardship": { icon: DollarSign, text: "No upfront fees" },
                    "Divorce": { icon: CheckCircle, text: "Confidential process" },
                    "Downsizing": { icon: Calendar, text: "Flexible timeline" },
                    "Any Condition": { icon: Home, text: "Buy as-is guaranteed" },
                    "Any Situation": { icon: CheckCircle, text: "No judgment zone" },
                    "Any Timeline": { icon: Clock, text: "You pick closing date" },
                    "Any Price Range": { icon: Tag, text: "All offers considered" },
                    "Short Notice Transfer": { icon: Clock, text: "7-day closings" },
                    "Already Moved": { icon: MapPin, text: "Remote closings OK" },
                    "Can't Wait for Traditional Sale": { icon: TrendingUp, text: "No listing needed" },
                  };
                  
                  const trustCue = trustCues[situation.title] || { icon: Clock, text: "Fast & reliable" };
                  const TrustIcon = trustCue.icon;
                  
                  return (
                    <Card 
                      key={index} 
                      className="hover-elevate transition-all duration-300 border-primary/30 bg-gradient-to-br from-secondary/30 via-background to-primary/8 relative overflow-hidden group"
                      data-testid={`situation-card-${index}`}
                    >
                      {/* Decorative corner accent */}
                      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary/20 to-transparent rounded-bl-[3rem] transition-all duration-300 group-hover:from-primary/30" />
                      
                      <CardContent className="pt-6 pb-5 relative flex flex-col h-full">
                        {/* Gold Scenario Badge */}
                        <Badge variant="secondary" className="absolute top-3 left-3 text-[10px] font-semibold px-2 py-0.5 bg-[hsl(var(--gold))] text-[hsl(var(--gold-foreground))] border-[hsl(var(--gold-border))] shadow-sm">
                          Seller Scenario
                        </Badge>
                        
                        {/* Icon */}
                        <div className="mb-4 mt-6">
                          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-primary/8 flex items-center justify-center shadow-sm border border-primary/10">
                            <IconComponent className="h-7 w-7 text-primary" strokeWidth={2.5} />
                          </div>
                        </div>
                        
                        {/* Title */}
                        <h3 className="font-bold text-xl mb-2 text-foreground leading-tight">{situation.title}</h3>
                        
                        {/* Description */}
                        <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-grow">{situation.description}</p>
                        
                        {/* Trust Footer - Customized per scenario */}
                        <div className="pt-3 border-t border-border/50">
                          <p className="text-xs text-muted-foreground font-medium flex items-center gap-1.5">
                            <TrustIcon className="h-3 w-3 text-primary" />
                            {trustCue.text}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Process Timeline */}
        {content.detailedProcess && (
          <section className="py-16 bg-gradient-to-b from-background to-muted/30">
            <div className="container px-4">
              <div className="max-w-5xl mx-auto">
                <div className="text-center mb-12">
                  <Badge className="mb-4">Our Process</Badge>
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    From first contact to closing, here's our simple 7-step process
                  </p>
                </div>

                <div className="space-y-6">
                  {content.detailedProcess.map((step, index) => (
                    <Card 
                      key={index}
                      className="hover-elevate transition-all duration-300 border-primary/20 bg-gradient-to-r from-secondary/20 via-background to-background relative overflow-hidden group"
                      data-testid={`process-step-${index}`}
                    >
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-primary to-primary/50" />
                      
                      <CardContent className="pt-6 pb-6 pl-8">
                        <div className="grid md:grid-cols-[auto_1fr_auto] gap-4 md:gap-8 items-start">
                          {/* Step Number */}
                          <div className="flex items-center justify-center">
                            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg border-4 border-background">
                              <span className="text-2xl font-bold text-white">{step.step}</span>
                            </div>
                          </div>

                          {/* Content */}
                          <div className="flex-1">
                            <h3 className="font-bold text-xl mb-2 text-foreground">{step.title}</h3>
                            <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                          </div>

                          {/* Timeline Badge */}
                          <div className="md:text-right">
                            <Badge variant="secondary" className="bg-[hsl(var(--gold))]/10 text-[hsl(var(--gold))] border-[hsl(var(--gold))]/30">
                              <Clock className="h-3 w-3 mr-1" />
                              {step.timeline}
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="mt-12 text-center">
                  <p className="text-lg font-semibold mb-4">Total Timeline: As Fast as 7 Days or As Long as You Need</p>
                  <Button size="lg" asChild>
                    <Link href="/get-quote">
                      Get Started Now
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Simple Process Fallback (for services without detailed process) */}
        {!content.detailedProcess && (
          <section className="py-16 bg-muted/30">
            <div className="container px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold mb-8 text-center">Our Process</h2>
                <p className="text-lg leading-relaxed text-muted-foreground mb-8" data-testid="text-process">
                  {content.process}
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Comparison Table */}
        {content.comparisonData && (
          <section className="py-16 bg-gradient-to-br from-muted/20 to-background">
            <div className="container px-4">
              <div className="max-w-5xl mx-auto">
                <div className="text-center mb-12">
                  <Badge className="mb-4">The Difference</Badge>
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">Cash Offer vs. Traditional Listing</h2>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    See how selling to us compares to listing with a realtor
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Traditional Sale */}
                  <Card className="border-2 border-muted/50">
                    <CardContent className="pt-6 pb-6">
                      <div className="text-center mb-6">
                        <div className="w-12 h-12 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-3">
                          <Home className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <h3 className="font-bold text-xl text-muted-foreground">Traditional Listing</h3>
                      </div>

                      <div className="space-y-3">
                        {[
                          { label: "Timeline", value: content.comparisonData.traditional.timeline, negative: true },
                          { label: "Repairs", value: content.comparisonData.traditional.repairs, negative: true },
                          { label: "Commissions", value: content.comparisonData.traditional.commissions, negative: true },
                          { label: "Closing Costs", value: content.comparisonData.traditional.closingCosts, negative: true },
                          { label: "Certainty", value: content.comparisonData.traditional.certainty, negative: true },
                          { label: "Convenience", value: content.comparisonData.traditional.convenience, negative: true },
                        ].map((item, index) => (
                          <div key={index} className="flex items-start gap-2 pb-3 border-b border-border/30">
                            <X className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                            <div className="flex-1">
                              <p className="font-semibold text-sm text-foreground">{item.label}</p>
                              <p className="text-sm text-muted-foreground">{item.value}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Cash Offer */}
                  <Card className="border-2 border-primary/50 bg-gradient-to-br from-primary/5 to-background shadow-lg">
                    <CardContent className="pt-6 pb-6">
                      <div className="text-center mb-6">
                        <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-3">
                          <DollarSign className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="font-bold text-xl text-primary">Cash Offer from Us</h3>
                      </div>

                      <div className="space-y-3">
                        {[
                          { label: "Timeline", value: content.comparisonData.cashOffer.timeline },
                          { label: "Repairs", value: content.comparisonData.cashOffer.repairs },
                          { label: "Commissions", value: content.comparisonData.cashOffer.commissions },
                          { label: "Closing Costs", value: content.comparisonData.cashOffer.closingCosts },
                          { label: "Certainty", value: content.comparisonData.cashOffer.certainty },
                          { label: "Convenience", value: content.comparisonData.cashOffer.convenience },
                        ].map((item, index) => (
                          <div key={index} className="flex items-start gap-2 pb-3 border-b border-primary/10">
                            <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                            <div className="flex-1">
                              <p className="font-semibold text-sm text-foreground">{item.label}</p>
                              <p className="text-sm text-primary font-medium">{item.value}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="mt-8 text-center">
                  <Button size="lg" asChild>
                    <Link href="/savings-calculator">
                      Calculate Your Savings
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Service Areas */}
        <section className="py-16">
          <div className="container px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">
                {service.name} Services Across the Treasure Valley
              </h2>
              <p className="text-center text-muted-foreground mb-8">
                We provide {service.name.toLowerCase()} services throughout the Boise metro area:
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {CITIES.map((city) => (
                  <Link
                    key={city.slug}
                    href={`/areas/${city.slug}`}
                    data-testid={`link-city-${city.slug}`}
                  >
                    <Card className="hover-elevate active-elevate-2 cursor-pointer transition-all duration-300 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent relative overflow-hidden group">
                      {/* Decorative corner accent */}
                      <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-[2rem] transition-all duration-300 group-hover:from-primary/20" />
                      
                      <CardContent className="pt-5 pb-5 text-center relative">
                        {/* Icon */}
                        <div className="mb-3">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/15 to-primary/5 flex items-center justify-center mx-auto shadow-sm border border-primary/10">
                            <MapPin className="h-5 w-5 text-primary" strokeWidth={2.5} />
                          </div>
                        </div>
                        
                        {/* City Name */}
                        <h3 className="font-bold text-base mb-1 text-foreground">{city.name}</h3>
                        <p className="text-xs text-muted-foreground font-medium">Idaho</p>
                        
                        {/* Arrow indicator */}
                        <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                          <ArrowRight className="h-4 w-4 mx-auto text-primary" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Comprehensive FAQs */}
        {content.faqs && content.faqs.length > 0 && (
          <section className="py-16 bg-gradient-to-b from-background to-muted/20">
            <div className="container px-4">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                  <Badge className="mb-4">FAQ</Badge>
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
                  <p className="text-lg text-muted-foreground">
                    Everything you need to know about {service.name.toLowerCase()}
                  </p>
                </div>

                <Accordion type="single" collapsible className="w-full space-y-4">
                  {content.faqs.map((faq, index) => (
                    <AccordionItem 
                      key={index} 
                      value={`item-${index}`}
                      className="border border-border/50 rounded-lg px-6 bg-card hover:border-primary/30 transition-colors"
                      data-testid={`faq-${index}`}
                    >
                      <AccordionTrigger className="text-left hover:no-underline py-4">
                        <span className="font-semibold text-base pr-4">{faq.question}</span>
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground leading-relaxed pb-4 pt-2">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>

                <div className="mt-12 text-center">
                  <p className="text-muted-foreground mb-4">Still have questions?</p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button variant="outline" asChild>
                      <a href="tel:2084052275">
                        <Phone className="mr-2 h-4 w-4" />
                        Call (208) 405-2275
                      </a>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link href="/contact">Contact Us Online</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Final CTA */}
        <section className="py-16 bg-gradient-to-br from-primary/10 via-background to-accent/5">
          <div className="container px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">{content.cta}</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Join hundreds of satisfied homeowners who sold their houses with HomeBuyerBoise.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild data-testid="button-get-offer-final">
                  <Link href="/get-quote">
                    Get Your Free Cash Offer
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild data-testid="button-contact-final">
                  <Link href="/contact">Learn More</Link>
                </Button>
              </div>
              <div className="mt-8 flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>Or call us directly:</span>
                <a href="tel:2084052275" className="font-semibold text-primary hover:underline">
                  (208) 405-2275
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
