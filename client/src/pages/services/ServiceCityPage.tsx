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
import { ArrowRight, CheckCircle, Phone, MapPin, Home, Star, ChevronRight } from "lucide-react";
import { generateServiceCityContent } from "@shared/serviceCityContent";
import { SERVICES } from "@shared/servicesData";
import { CITIES } from "@shared/contentData";
import { Link } from "wouter";
import { generateBreadcrumbSchema } from "@/lib/seo";

interface ServiceCityPageProps {
  serviceSlug: string;
  citySlug: string;
}

export function ServiceCityPage({ serviceSlug, citySlug }: ServiceCityPageProps) {
  const content = generateServiceCityContent(serviceSlug, citySlug);
  const service = SERVICES.find(s => s.slug === serviceSlug);
  const city = CITIES.find(c => c.slug === citySlug);
  
  if (!service || !city) {
    return <div>Service or city not found</div>;
  }

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Services", url: "/services" },
    { name: service.name, url: `/services/${serviceSlug}` },
    { name: `${city.name}, ID`, url: `/services/${serviceSlug}/${citySlug}` },
  ]);

  return (
    <>
      <Helmet>
        <title>{content.title}</title>
        <meta name="description" content={content.metaDescription} />
        <meta name="keywords" content={content.keywords.join(", ")} />
        <link rel="canonical" href={content.canonical} />
        
        <meta property="og:title" content={content.title} />
        <meta property="og:description" content={content.metaDescription} />
        <meta property="og:url" content={content.canonical} />
        <meta property="og:type" content="website" />
        
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      </Helmet>

      <div className="min-h-screen">
        {/* Breadcrumb Navigation */}
        <section className="bg-muted/30 py-4 border-b">
          <div className="container px-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
              <ChevronRight className="h-4 w-4" />
              <Link href="/services" className="hover:text-foreground transition-colors">Services</Link>
              <ChevronRight className="h-4 w-4" />
              <Link href={`/services/${serviceSlug}`} className="hover:text-foreground transition-colors">{service.name}</Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground font-medium">{city.name}, ID</span>
            </div>
          </div>
        </section>

        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-accent/5 py-16 md:py-24">
          <div className="container px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Badge variant="secondary" className="bg-[hsl(var(--gold))]/10 text-[hsl(var(--gold))] border-[hsl(var(--gold))]/30">
                  <MapPin className="h-3 w-3 mr-1" />
                  {city.name}, Idaho
                </Badge>
                <Badge>
                  {service.name}
                </Badge>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6" data-testid="heading-service-city">
                {content.h1}
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

        {/* City-Specific Introduction */}
        <section className="py-16">
          <div className="container px-4">
            <div className="max-w-4xl mx-auto">
              <p className="text-lg leading-relaxed text-muted-foreground mb-8" data-testid="text-intro">
                {content.citySpecificIntro}
              </p>
            </div>
          </div>
        </section>

        {/* Local Market Insights */}
        <section className="py-16 bg-gradient-to-br from-muted/20 via-background to-muted/10">
          <div className="container px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <Badge className="mb-4">Local Market</Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">{city.name} Real Estate Market</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Market Stats */}
                <Card className="border-primary/20">
                  <CardContent className="pt-6 pb-6">
                    <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
                      <Star className="h-5 w-5 text-[hsl(var(--gold))]" />
                      Market Overview
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Average Home Value</p>
                        <p className="text-lg font-semibold text-foreground">{content.marketInsights.averageHomeValue}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Popular Neighborhoods</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {content.marketInsights.popularNeighborhoods.slice(0, 4).map((neighborhood, idx) => (
                            <Badge key={idx} variant="secondary">{neighborhood}</Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Property Types */}
                <Card className="border-primary/20">
                  <CardContent className="pt-6 pb-6">
                    <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
                      <Home className="h-5 w-5 text-primary" />
                      Common Property Types
                    </h3>
                    <ul className="space-y-2">
                      {content.marketInsights.commonPropertyTypes.map((type, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mt-1" />
                          <span className="text-sm text-muted-foreground">{type}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-6">
                <p className="text-muted-foreground leading-relaxed text-center max-w-3xl mx-auto">
                  {content.marketInsights.localConsiderations}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us - Local Benefits */}
        <section className="py-16 bg-muted/30">
          <div className="container px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">Why Choose Us in {city.name}</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {content.whyChooseLocal.map((item, index) => (
                  <div key={index} className="flex items-start gap-3" data-testid={`benefit-${index}`}>
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                    <span className="text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Local Success Story */}
        {content.localSuccessStory && (
          <section className="py-16 bg-gradient-to-br from-muted/10 to-background">
            <div className="container px-4">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                  <Badge className="mb-4">Success Story</Badge>
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">Recent {city.name} Sale</h2>
                </div>

                <Card className="border-primary/30 bg-gradient-to-br from-background to-secondary/10">
                  <CardContent className="pt-8 pb-8">
                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <Badge variant="secondary" className="mb-3">
                          <MapPin className="h-3 w-3 mr-1" />
                          {content.localSuccessStory.neighborhood}
                        </Badge>
                        <h3 className="font-bold text-2xl mb-4">{content.localSuccessStory.title}</h3>
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm font-semibold text-muted-foreground mb-1">Situation:</p>
                            <p className="text-foreground">{content.localSuccessStory.situation}</p>
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-primary mb-1">Solution:</p>
                            <p className="text-foreground">{content.localSuccessStory.solution}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col justify-center">
                        <div className="bg-muted/50 p-6 rounded-lg border border-border/50">
                          <p className="text-lg italic text-muted-foreground leading-relaxed mb-4">
                            "{content.localSuccessStory.quote}"
                          </p>
                          <div className="flex items-center gap-2 text-sm">
                            <Badge variant="secondary" className="bg-[hsl(var(--gold))]/10 text-[hsl(var(--gold))] border-[hsl(var(--gold))]/30">
                              Timeline: {content.localSuccessStory.timeline}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        )}

        {/* City-Specific FAQs */}
        <section className="py-16 bg-gradient-to-b from-background to-muted/20">
          <div className="container px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <Badge className="mb-4">FAQ</Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">{city.name} Frequently Asked Questions</h2>
                <p className="text-lg text-muted-foreground">
                  Common questions about {service.name.toLowerCase()} in {city.name}
                </p>
              </div>

              <Accordion type="single" collapsible className="w-full space-y-4">
                {content.cityFaqs.map((faq, index) => (
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
            </div>
          </div>
        </section>

        {/* Cross-Links to Parent Pages & Other Cities */}
        <section className="py-16 bg-muted/20">
          <div className="container px-4">
            <div className="max-w-6xl mx-auto">
              {/* Other Cities for This Service */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold mb-6 text-center">
                  {service.name} in Other Treasure Valley Locations
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {CITIES.filter(c => c.slug !== citySlug).map((otherCity) => (
                    <Button key={otherCity.slug} variant="outline" size="sm" asChild className="h-auto py-3">
                      <Link href={`/services/${serviceSlug}/${otherCity.slug}`}>
                        <div className="text-center">
                          <div className="font-semibold">{otherCity.name}</div>
                          <div className="text-xs text-muted-foreground">Idaho</div>
                        </div>
                      </Link>
                    </Button>
                  ))}
                </div>
              </div>

              {/* Parent Pages */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="outline" asChild>
                  <Link href={`/services/${serviceSlug}`}>
                    All {service.name} Information
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href={`/areas/${citySlug}`}>
                    All Services in {city.name}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 bg-gradient-to-br from-primary/10 via-background to-accent/5">
          <div className="container px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">{content.ctaText}</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Join dozens of {city.name} homeowners who've sold their houses with HomeBuyerBoise.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild data-testid="button-get-offer-final">
                  <Link href="/get-quote">
                    Get Your Free Cash Offer
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild data-testid="button-contact-final">
                  <Link href="/contact">Contact Us</Link>
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

export default ServiceCityPage;
