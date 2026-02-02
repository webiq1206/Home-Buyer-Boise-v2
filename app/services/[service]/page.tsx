import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SERVICES, getServiceBySlug, getAllServiceSlugs, SERVICE_CONTENT } from "@/shared/servicesData";
import { CITIES } from "@/shared/contentData";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { TrustBadges, TrustStats } from "@/components/TrustBadges";
import { Testimonials } from "@/components/Testimonials";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { generateServiceSchema, generateFAQSchema, generateBreadcrumbSchema } from "@/lib/schema";
import { getBaseUrl, BUSINESS_INFO } from "@/lib/seo";
import { 
  CheckCircle, 
  ArrowRight, 
  MapPin,
  Phone,
  Home,
  DollarSign,
  Calendar,
  Clock,
  Building,
  X,
  Check,
  Zap,
  Key,
  Shield,
  Heart,
  Plane,
  Users,
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
  params: { service: string };
}

export function generateStaticParams() {
  return getAllServiceSlugs().map((service) => ({
    service,
  }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const service = getServiceBySlug(params.service);
  const baseUrl = getBaseUrl();
  
  if (!service) {
    return {
      title: "Service Not Found | Home Buyer Boise",
    };
  }

  return {
    title: service.title,
    description: service.metaDescription,
    keywords: [...service.keywords],
    alternates: {
      canonical: `${baseUrl}/services/${service.slug}`,
    },
    openGraph: {
      title: service.title,
      description: service.metaDescription,
      url: `${baseUrl}/services/${service.slug}`,
      siteName: "Home Buyer Boise",
      type: "website",
      images: [
        {
          url: `${baseUrl}/og-image.png`,
          width: 1200,
          height: 630,
          alt: `${service.name} - Home Buyer Boise`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: service.title,
      description: service.metaDescription,
      images: [`${baseUrl}/og-image.png`],
    },
  };
}

// Process steps for how it works
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
  { feature: "Appraisal Contingency", traditional: "Yes", cashOffer: "No" },
  { feature: "Financing Fall-Through Risk", traditional: "High", cashOffer: "Zero - we pay cash" },
];

export default function ServicePage({ params }: PageProps) {
  const service = getServiceBySlug(params.service);

  if (!service) {
    notFound();
  }

  // Get service-specific content
  const content = SERVICE_CONTENT[service.slug as keyof typeof SERVICE_CONTENT];
  const ServiceIcon = SERVICE_ICONS[service.icon] || Home;

  // Breadcrumb data
  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/pricing" },
    { name: service.name },
  ];

  // Schema.org structured data
  const serviceSchema = generateServiceSchema(service.name, service.metaDescription);
  const faqSchema = content?.faqs ? generateFAQSchema(content.faqs) : null;
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Services", url: "/pricing" },
    { name: service.name, url: `/services/${service.slug}` },
  ]);

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
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
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-lg bg-white/10">
                <ServiceIcon className="h-6 w-6" />
              </div>
              <span className="text-white/80 text-sm font-medium">Treasure Valley Service</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">{service.h1}</h1>
            <p className="text-xl md:text-2xl text-white/90 mb-4">
              {content?.heroSubtitle || service.metaDescription}
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

      {/* Extended Intro Section */}
      {content?.intro && (
        <section className="py-16 lg:py-20">
          <div className="container px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
                About {service.name}
              </h2>
              <div className="prose prose-lg max-w-none text-muted-foreground">
                <p className="text-base md:text-lg leading-relaxed">
                  {content.intro}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Why Choose Us Section */}
      {content?.whyChoose && (
        <section className="py-16 lg:py-20 bg-muted/50">
          <div className="container px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
                Why Choose Home Buyer Boise
              </h2>
              <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
                Here&apos;s what makes us the best choice for {service.name.toLowerCase()} in the Treasure Valley
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {content.whyChoose.slice(0, 9).map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3 bg-white rounded-lg p-4 shadow-sm">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="font-medium">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Common Situations */}
      {content?.situations && content.situations.length > 0 && (
        <section className="py-16 lg:py-20">
          <div className="container px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
              Common Situations We Help With
            </h2>
            <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
              We help homeowners facing all kinds of situations
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {content.situations.map((situation, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <h3 className="font-bold text-lg mb-2">{situation.title}</h3>
                    <p className="text-muted-foreground text-sm">{situation.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* How It Works Process */}
      <section className="py-16 lg:py-20 bg-muted/50">
        <div className="container px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
            How to {service.name} in 4 Simple Steps
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Our streamlined process gets you from contact to cash in as little as 7 days
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

      {/* Cash Offer vs Traditional Listing Comparison */}
      <section className="py-16 lg:py-20">
        <div className="container px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
            Cash Offer vs. Traditional Listing
          </h2>
          <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
            See how selling to us compares to listing with a real estate agent
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

      {/* Trust Stats Section */}
      <TrustStats />

      {/* Service Areas - Improved Design */}
      <section className="py-16 lg:py-20 bg-muted/50">
        <div className="container px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
            {service.name} in the Treasure Valley
          </h2>
          <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
            We serve homeowners across Ada and Canyon County. Click on a city for location-specific information.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {CITIES.map((city) => (
              <Link
                key={city.slug}
                href={`/services/${service.slug}/${city.slug}`}
                className="group bg-white border border-border rounded-xl p-5 text-center hover:shadow-lg hover:border-primary/30 transition-all duration-200"
              >
                <div className="flex items-center justify-center mb-3">
                  <div className="p-2 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <h3 className="font-semibold group-hover:text-primary transition-colors">{city.name}</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  {city.county === "ada" ? "Ada County" : "Canyon County"}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      {content?.faqs && content.faqs.length > 0 && (
        <section className="py-16 lg:py-20">
          <div className="container px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
              Frequently Asked Questions
            </h2>
            <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
              Got questions about {service.name.toLowerCase()}? We&apos;ve got answers.
            </p>
            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="w-full">
                {content.faqs.slice(0, 10).map((faq, index) => (
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

      {/* Testimonials Section */}
      <section className="py-16 lg:py-20 bg-muted/50">
        <div className="container px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
            What Our Customers Say
          </h2>
          <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
            Real stories from Treasure Valley homeowners we&apos;ve helped
          </p>
          <div className="max-w-6xl mx-auto">
            <Testimonials limit={3} />
          </div>
        </div>
      </section>

      {/* Other Services - Improved Design */}
      <section className="py-16 lg:py-20">
        <div className="container px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">Other Services We Offer</h2>
          <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
            We help homeowners in many different situations
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {SERVICES.filter((s) => s.slug !== service.slug).slice(0, 6).map((otherService) => {
              const OtherServiceIcon = SERVICE_ICONS[otherService.icon] || Home;
              return (
                <Link
                  key={otherService.slug}
                  href={`/services/${otherService.slug}`}
                  className="group bg-white border border-border rounded-xl p-5 hover:shadow-lg hover:border-primary/30 transition-all duration-200"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <OtherServiceIcon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-semibold group-hover:text-primary transition-colors">{otherService.name}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">{otherService.metaDescription.substring(0, 100)}...</p>
                </Link>
              );
            })}
          </div>
          <div className="text-center mt-10">
            <Button variant="outline" size="lg" asChild>
              <Link href="/pricing">
                View All Services
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-navy to-primary text-white">
        <div className="container px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to {service.name.replace("Sale", "Sell")}?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            {content?.cta || "Get a free, no-obligation cash offer today. We buy houses in any condition."}
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
