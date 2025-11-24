import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, CheckCircle, Phone, MapPin, Plane, DollarSign, HeartCrack, Home, Clock, Tag, Calendar, TrendingUp, type LucideIcon } from "lucide-react";
import { CITIES } from "@shared/contentData";
import { SERVICE_CONTENT } from "@shared/servicesData";
import type { Service } from "@shared/servicesData";
import { generateSEOMetadata, BUSINESS_INFO } from "@/lib/seo";
import { generateServicePageSchema, generateBreadcrumbSchema } from "@/lib/seo";
import { Link } from "wouter";

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
  const content = SERVICE_CONTENT[service.slug as keyof typeof SERVICE_CONTENT];
  
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
                  <a href="tel:2084052274">
                    <Phone className="mr-2 h-5 w-5" />
                    (208) 405-CASH
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

        {/* Process Details */}
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
                <a href="tel:2084052274" className="font-semibold text-primary hover:underline">
                  (208) 405-CASH
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
