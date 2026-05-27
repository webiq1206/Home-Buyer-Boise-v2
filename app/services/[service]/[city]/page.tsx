import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SERVICES, getServiceBySlug, getAllServiceSlugs, SERVICE_CONTENT } from "@/shared/servicesData";
import { CITIES, getCityBySlug, getAllCitySlugs } from "@/shared/contentData";
import { generateServiceCityContent } from "@/shared/serviceCityContent";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { RelatedContent } from "@/components/RelatedContent";
import { TrustBadges } from "@/components/TrustBadges";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { generateServiceSchema, generateFAQSchema, generateBreadcrumbSchema, generateLocalBusinessSchema } from "@/lib/schema";
import { getBaseUrl } from "@/lib/seo";
import { 
  CheckCircle, 
  MapPin,
  Phone,
  Home,
  DollarSign,
  Calendar,
  Clock,
  Building,
  X,
  Check,
  Users,
  TrendingUp,
  ArrowRight,
  Quote,
  Zap,
  Key,
  Shield,
  Heart,
  Plane,
  FileText,
  Receipt,
  Flame,
  Package,
  XCircle,
  AlertCircle,
  AlertTriangle,
  Wrench,
} from "lucide-react";

// Icon mapping for services
const SERVICE_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  "Zap": Zap,
  "Home": Home,
  "DollarSign": DollarSign,
  "Wrench": Wrench,
  "Key": Key,
  "Shield": Shield,
  "Heart": Heart,
  "Plane": Plane,
  "Users": Users,
  "FileText": FileText,
  "Receipt": Receipt,
  "Flame": Flame,
  "Package": Package,
  "XCircle": XCircle,
  "AlertCircle": AlertCircle,
  "AlertTriangle": AlertTriangle,
};

interface PageProps {
  params: { service: string; city: string };
}

export function generateStaticParams() {
  const params: { service: string; city: string }[] = [];
  
  for (const serviceSlug of getAllServiceSlugs()) {
    for (const citySlug of getAllCitySlugs()) {
      params.push({
        service: serviceSlug,
        city: citySlug,
      });
    }
  }
  
  return params;
}

export function generateMetadata({ params }: PageProps): Metadata {
  const service = getServiceBySlug(params.service);
  const city = getCityBySlug(params.city);
  const baseUrl = getBaseUrl();
  
  if (!service || !city) {
    return {
      title: "Page Not Found | Home Buyer Boise",
    };
  }

  // Use the generated content for better SEO
  const generatedContent = generateServiceCityContent(params.service, params.city);

  return {
    title: generatedContent.title,
    description: generatedContent.metaDescription,
    keywords: generatedContent.keywords,
    alternates: {
      canonical: generatedContent.canonical,
    },
    openGraph: {
      title: generatedContent.title,
      description: generatedContent.metaDescription,
      url: generatedContent.canonical,
      siteName: "Home Buyer Boise",
      type: "website",
      images: [
        {
          url: `${baseUrl}/og-image.png`,
          width: 1200,
          height: 630,
          alt: `${service.name} in ${city.name} - Home Buyer Boise`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: generatedContent.title,
      description: generatedContent.metaDescription,
      images: [`${baseUrl}/og-image.png`],
    },
  };
}

// Process steps
const processSteps = [
  {
    step: 1,
    icon: Phone,
    title: "Contact Us",
    description: "Call us or fill out our simple form. Tell us about your property and situation."
  },
  {
    step: 2,
    icon: Home,
    title: "Property Visit",
    description: "We'll schedule a quick visit to see your property (or make an offer based on photos)."
  },
  {
    step: 3,
    icon: DollarSign,
    title: "Receive Offer",
    description: "Get a fair, no-obligation cash offer within 24 hours. No hidden fees or surprises."
  },
  {
    step: 4,
    icon: Calendar,
    title: "Close & Get Paid",
    description: "Choose your closing date - as fast as 7 days. Walk away with cash in hand."
  }
];

// Comparison data
const comparisonData = [
  { feature: "Timeline to Close", traditional: "60-90+ days", cashOffer: "7-14 days" },
  { feature: "Repairs Required", traditional: "Usually required", cashOffer: "None - sell as-is" },
  { feature: "Agent Commissions", traditional: "5-6% of sale price", cashOffer: "$0" },
  { feature: "Closing Costs", traditional: "2-3% typically", cashOffer: "We pay them" },
  { feature: "Showings/Open Houses", traditional: "Many required", cashOffer: "None" },
  { feature: "Certainty of Sale", traditional: "Deals fall through", cashOffer: "Guaranteed close" },
];

export default function ServiceCityPage({ params }: PageProps) {
  const service = getServiceBySlug(params.service);
  const city = getCityBySlug(params.city);

  if (!service || !city) {
    notFound();
  }

  // Get generated city-specific content
  const generatedContent = generateServiceCityContent(params.service, params.city);
  const serviceContent = SERVICE_CONTENT[service.slug as keyof typeof SERVICE_CONTENT];
  const ServiceIcon = SERVICE_ICONS[service.icon] || Home;

  // Breadcrumb data
  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/pricing" },
    { name: service.name, href: `/services/${service.slug}` },
    { name: city.name },
  ];

  // Schema.org structured data
  const serviceSchema = generateServiceSchema(service.name, generatedContent.metaDescription, city.name);
  const localBusinessSchema = generateLocalBusinessSchema(city.name);
  const faqSchema = generateFAQSchema(generatedContent.cityFaqs);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Services", url: "/pricing" },
    { name: service.name, url: `/services/${service.slug}` },
    { name: city.name, url: `/services/${service.slug}/${city.slug}` },
  ]);

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Breadcrumbs */}
      <div className="bg-muted/30 border-b">
        <div className="container px-4">
          <Breadcrumbs items={breadcrumbs} />
        </div>
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-br from-navy to-primary text-white py-16 lg:py-24">
        <div className="container px-4">
          <div className="max-w-4xl">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <div className="flex items-center gap-2 bg-white/10 rounded-full px-3 py-1.5">
                <MapPin className="h-4 w-4" />
                <span className="text-sm font-medium">{city.name}, {city.county === "ada" ? "Ada County" : "Canyon County"}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 rounded-full px-3 py-1.5">
                <ServiceIcon className="h-4 w-4" />
                <span className="text-sm font-medium">{service.shortName}</span>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {generatedContent.h1}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-4">
              {generatedContent.heroSubtitle}
            </p>
            <TrustBadges variant="hero" className="mb-8 text-white/90" />
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-gold text-black hover:bg-gold/90 font-semibold text-lg h-14 px-8" asChild>
                <Link href="/get-quote">Get Your Cash Offer</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 h-14 px-8" asChild>
                <a href="tel:2084052275">(208) 405-2275</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* City-Specific Intro */}
      <section className="py-16 lg:py-20">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
              {service.name} in {city.name}, Idaho
            </h2>
            <div className="prose prose-lg max-w-none text-muted-foreground">
              <p className="text-base md:text-lg leading-relaxed">
                {generatedContent.citySpecificIntro}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Local Market Insights */}
      <section className="py-16 lg:py-20 bg-muted/50">
        <div className="container px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
            {city.name} Real Estate Market Overview
          </h2>
          <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
            Understanding the local market helps us give you fair, competitive offers
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-10">
            <Card className="text-center">
              <CardContent className="pt-6">
                <Users className="h-8 w-8 mx-auto mb-2 text-primary" />
                <p className="text-2xl md:text-3xl font-bold text-primary">{city.population}</p>
                <p className="text-sm text-muted-foreground">Population</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <DollarSign className="h-8 w-8 mx-auto mb-2 text-primary" />
                <p className="text-2xl md:text-3xl font-bold text-primary">{generatedContent.marketInsights.averageHomeValue}</p>
                <p className="text-sm text-muted-foreground">Median Home Price</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <Clock className="h-8 w-8 mx-auto mb-2 text-primary" />
                <p className="text-2xl md:text-3xl font-bold text-primary">{city.marketStats?.daysOnMarket || "42 days"}</p>
                <p className="text-sm text-muted-foreground">Avg. Days on Market</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <TrendingUp className="h-8 w-8 mx-auto mb-2 text-green-600" />
                <p className="text-2xl md:text-3xl font-bold text-green-600">{city.marketStats?.priceGrowth || "+5%"}</p>
                <p className="text-sm text-muted-foreground">YoY Price Growth</p>
              </CardContent>
            </Card>
          </div>
          
          {/* Common Property Types */}
          {generatedContent.marketInsights.commonPropertyTypes.length > 0 && (
            <div className="max-w-4xl mx-auto">
              <h3 className="text-xl font-semibold mb-4 text-center">Common Property Types in {city.name}</h3>
              <div className="flex flex-wrap justify-center gap-3">
                {generatedContent.marketInsights.commonPropertyTypes.map((type, index) => (
                  <span 
                    key={index}
                    className="bg-white border border-border px-4 py-2 rounded-full text-sm font-medium shadow-sm"
                  >
                    {type}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us - City Specific */}
      <section className="py-16 lg:py-20">
        <div className="container px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
              Why {city.name} Homeowners Choose Us
            </h2>
            <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
              Local expertise combined with fair cash offers makes us the best choice for {service.name.toLowerCase()} in {city.name}
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {generatedContent.whyChooseLocal.slice(0, 10).map((benefit, index) => (
                <div key={index} className="flex items-start gap-3 bg-muted/50 rounded-lg p-4">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="font-medium">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Neighborhoods We Serve */}
      {city.neighborhoods && city.neighborhoods.length > 0 && (
        <section className="py-16 lg:py-20 bg-muted/50">
          <div className="container px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
              {city.name} Neighborhoods We Serve
            </h2>
            <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
              We buy houses throughout all of {city.name}, including these popular neighborhoods
            </p>
            <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
              {city.neighborhoods.map((neighborhood) => (
                <span 
                  key={neighborhood} 
                  className="bg-white border border-border px-4 py-2 rounded-full text-sm font-medium shadow-sm hover:shadow-md transition-shadow"
                >
                  {neighborhood}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* How It Works Process */}
      <section className="py-16 lg:py-20">
        <div className="container px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
            How to {service.name} in {city.name}
          </h2>
          <p className="text-center text-muted-foreground mb-4 max-w-2xl mx-auto">
            Our streamlined 4-step process gets you from contact to cash in as little as 7 days
          </p>
          <p className="text-center text-sm text-muted-foreground mb-12 max-w-3xl mx-auto">
            {generatedContent.localProcessNotes}
          </p>
          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {processSteps.map((step) => (
              <div key={step.step} className="text-center">
                <div className="relative">
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary text-white text-2xl font-bold mx-auto mb-4">
                    {step.step}
                  </div>
                  {step.step < 4 && (
                    <div className="hidden md:block absolute top-8 left-[60%] w-full h-0.5 bg-primary/20" />
                  )}
                </div>
                <step.icon className="h-8 w-8 mx-auto mb-3 text-primary" />
                <h3 className="font-bold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Story */}
      {generatedContent.localSuccessStory && (
        <section className="py-16 lg:py-20 bg-primary text-white">
          <div className="container px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Quote className="h-12 w-12 mx-auto mb-6 opacity-50" />
              <h2 className="text-2xl md:text-3xl font-bold mb-6">
                {generatedContent.localSuccessStory.title}
              </h2>
              <blockquote className="text-lg md:text-xl italic text-white/90 mb-6">
                &ldquo;{generatedContent.localSuccessStory.quote}&rdquo;
              </blockquote>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-white/80">
                <span className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  {generatedContent.localSuccessStory.neighborhood}
                </span>
                <span className="hidden sm:inline">|</span>
                <span className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {generatedContent.localSuccessStory.timeline}
                </span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Cash Offer vs Traditional Listing Comparison */}
      <section className="py-16 lg:py-20 bg-muted/50">
        <div className="container px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
            Cash Offer vs. Traditional Listing in {city.name}
          </h2>
          <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
            See how selling to us compares to listing with a {city.name} realtor
          </p>
          <div className="max-w-4xl mx-auto overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="text-left p-4 bg-muted font-semibold"></th>
                  <th className="text-center p-4 bg-muted/50 font-semibold">
                    <div className="flex items-center justify-center gap-2">
                      <Building className="h-5 w-5" />
                      <span className="hidden sm:inline">Traditional Listing</span>
                      <span className="sm:hidden">Traditional</span>
                    </div>
                  </th>
                  <th className="text-center p-4 bg-primary/10 font-semibold text-primary">
                    <div className="flex items-center justify-center gap-2">
                      <Home className="h-5 w-5" />
                      <span className="hidden sm:inline">Cash Offer from Us</span>
                      <span className="sm:hidden">Cash Offer</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, index) => (
                  <tr key={index} className="border-b border-border">
                    <td className="p-4 font-medium text-sm sm:text-base">{row.feature}</td>
                    <td className="p-4 text-center text-muted-foreground text-sm sm:text-base">
                      <div className="flex items-center justify-center gap-2">
                        {(row.traditional.toLowerCase().includes("yes") || row.traditional.toLowerCase().includes("high") || row.traditional.toLowerCase().includes("required") || row.traditional.toLowerCase().includes("fall")) && (
                          <X className="h-4 w-4 text-red-500 flex-shrink-0" />
                        )}
                        <span>{row.traditional}</span>
                      </div>
                    </td>
                    <td className="p-4 text-center bg-primary/5 font-medium text-primary text-sm sm:text-base">
                      <div className="flex items-center justify-center gap-2">
                        <Check className="h-4 w-4 text-green-600 flex-shrink-0" />
                        <span>{row.cashOffer}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* City-Specific FAQs */}
      {generatedContent.cityFaqs && generatedContent.cityFaqs.length > 0 && (
        <section className="py-16 lg:py-20">
          <div className="container px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
              Frequently Asked Questions About {service.name} in {city.name}
            </h2>
            <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
              Got questions about selling your {city.name} home? We&apos;ve got answers.
            </p>
            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="w-full">
                {generatedContent.cityFaqs.map((faq, index) => (
                  <AccordionItem key={index} value={`faq-${index}`}>
                    <AccordionTrigger className="text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>
      )}

      {/* Other Services in This City */}
      <section className="py-16 lg:py-20 bg-muted/50">
        <div className="container px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
            Other Services in {city.name}
          </h2>
          <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
            We help {city.name} homeowners in many different situations
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {SERVICES.filter((s) => s.slug !== service.slug).slice(0, 8).map((otherService) => {
              const OtherServiceIcon = SERVICE_ICONS[otherService.icon] || Home;
              return (
                <Link
                  key={otherService.slug}
                  href={`/services/${otherService.slug}/${city.slug}`}
                  className="group bg-white border border-border rounded-xl p-4 hover:shadow-lg hover:border-primary/30 transition-all duration-200"
                >
                  <div className="flex items-center justify-center mb-2">
                    <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <OtherServiceIcon className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  <h3 className="font-semibold text-center text-sm group-hover:text-primary transition-colors">{otherService.shortName}</h3>
                  <p className="text-xs text-muted-foreground text-center mt-1">in {city.name}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Other Cities */}
      <section className="py-16 lg:py-20">
        <div className="container px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
            {service.name} in Other Areas
          </h2>
          <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
            We also serve homeowners throughout the Treasure Valley
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {CITIES.filter((c) => c.slug !== city.slug).map((otherCity) => (
              <Link
                key={otherCity.slug}
                href={`/services/${service.slug}/${otherCity.slug}`}
                className="group bg-white border border-border rounded-xl p-4 text-center hover:shadow-lg hover:border-primary/30 transition-all duration-200"
              >
                <div className="flex items-center justify-center mb-2">
                  <div className="p-2 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <MapPin className="h-4 w-4 text-primary" />
                  </div>
                </div>
                <h3 className="font-semibold group-hover:text-primary transition-colors">{otherCity.name}</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  {otherCity.county === "ada" ? "Ada County" : "Canyon County"}
                </p>
              </Link>
            ))}
          </div>
          
          {/* Link to Area Page */}
          <div className="text-center mt-10">
            <p className="text-muted-foreground mb-4">
              Learn more about selling your house in {city.name}
            </p>
            <Button variant="outline" size="lg" asChild>
              <Link href={`/areas/${city.slug}`}>
                View {city.name} Area Page
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Related Content (algorithmic) */}
      <RelatedContent
        sourceUrl={`/services/${service.slug}/${city.slug}`}
        count={5}
        heading={`More ${city.name} Resources`}
        subheading={`Other ways we help ${city.name} homeowners and related local services`}
      />

      {/* Final CTA */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-navy to-primary text-white">
        <div className="container px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to {service.name.replace("Sale", "Sell")} in {city.name}?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            {generatedContent.ctaText}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="bg-gold text-black hover:bg-gold/90 font-semibold h-14 px-8" asChild>
              <Link href="/get-quote">Get Your Cash Offer</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 h-14 px-8" asChild>
              <a href="tel:2084052275">Call (208) 405-2275</a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
