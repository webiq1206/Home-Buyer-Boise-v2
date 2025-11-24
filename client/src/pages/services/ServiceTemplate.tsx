import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, CheckCircle, Phone, MapPin } from "lucide-react";
import { CITIES } from "@shared/contentData";
import { SERVICE_CONTENT } from "@shared/servicesData";
import type { Service } from "@shared/servicesData";
import { generateSEOMetadata, BUSINESS_INFO } from "@/lib/seo";
import { generateServicePageSchema, generateBreadcrumbSchema } from "@/lib/seo";
import { Link } from "wouter";

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
        <section className="py-16">
          <div className="container px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold mb-12 text-center">Common Situations We Help With</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {content.situations.map((situation, index) => (
                  <Card key={index} data-testid={`situation-card-${index}`}>
                    <CardContent className="pt-6">
                      <h3 className="font-semibold mb-2">{situation.title}</h3>
                      <p className="text-sm text-muted-foreground">{situation.description}</p>
                    </CardContent>
                  </Card>
                ))}
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
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {CITIES.map((city) => (
                  <Link
                    key={city.slug}
                    href={`/areas/${city.slug}`}
                    data-testid={`link-city-${city.slug}`}
                  >
                    <Card className="hover-elevate active-elevate-2 cursor-pointer transition-all">
                      <CardContent className="pt-6 text-center">
                        <MapPin className="h-5 w-5 mx-auto mb-2 text-primary" />
                        <h3 className="font-semibold">{city.name}</h3>
                        <p className="text-xs text-muted-foreground">Idaho</p>
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
