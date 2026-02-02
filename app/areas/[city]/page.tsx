import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CITIES, getCityBySlug, getAllCitySlugs, type CityData } from "@/shared/contentData";
import { SERVICES } from "@/shared/servicesData";
import { HeroAddressLookup } from "@/components/HeroAddressLookup";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { generateLocalBusinessSchema, generateFAQSchema, generateBreadcrumbSchema } from "@/lib/schema";
import { getBaseUrl } from "@/lib/seo";
import { 
  CheckCircle, 
  MapPin, 
  Home, 
  DollarSign, 
  Clock, 
  Users,
  Building,
  TrendingUp,
  Calendar,
  Phone,
  Zap,
  Wrench,
  Shield,
  Award,
  FileText,
  BadgeCheck,
  X,
  Check,
  ArrowRight,
  Key,
  Heart,
  Plane,
  Receipt,
  Flame,
  Package,
  XCircle,
  AlertCircle,
  AlertTriangle,
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
  params: { city: string };
}

export function generateStaticParams() {
  return getAllCitySlugs().map((city) => ({
    city,
  }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const city = getCityBySlug(params.city);
  const baseUrl = getBaseUrl();
  
  if (!city) {
    return {
      title: "City Not Found | Home Buyer Boise",
    };
  }

  const title = `Sell Your ${city.name} House Fast for Cash | Home Buyer Boise`;
  const description = `Sell your ${city.name} house fast for cash. We buy houses in any condition in ${city.name}, Idaho. No repairs, no fees, close on your timeline. Get a free cash offer today!`;

  return {
    title,
    description,
    keywords: [
      `sell house fast ${city.name}`,
      `cash home buyers ${city.name}`,
      `we buy houses ${city.name}`,
      `${city.name} cash buyers`,
      `sell house for cash ${city.name}`,
      `${city.name} house buyers`,
      `sell my house ${city.name}`,
      `cash for houses ${city.name}`,
      `${city.name} Idaho real estate`,
    ],
    alternates: {
      canonical: `${baseUrl}/areas/${city.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `${baseUrl}/areas/${city.slug}`,
      siteName: "Home Buyer Boise",
      type: "website",
      images: [
        {
          url: `${baseUrl}/og-image.png`,
          width: 1200,
          height: 630,
          alt: `Sell Your ${city.name} House Fast for Cash - Home Buyer Boise`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${baseUrl}/og-image.png`],
    },
  };
}

// Process steps for selling
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

// Trust features
const trustFeatures = [
  {
    icon: MapPin,
    title: "Local Market Expertise",
    description: "We know the Treasure Valley inside and out. Our local knowledge means better offers for you."
  },
  {
    icon: DollarSign,
    title: "Fair Cash Offers",
    description: "Transparent pricing based on current market data. No lowball tactics or hidden deductions."
  },
  {
    icon: Shield,
    title: "Licensed & Insured",
    description: "Professional, legitimate business you can trust. We're accountable to you and our community."
  },
  {
    icon: Clock,
    title: "Flexible Timeline",
    description: "Close in 7 days or 60+ days - whatever works for your situation. You're in control."
  },
  {
    icon: Award,
    title: "Professional Service",
    description: "Courteous, respectful service from start to finish. We treat every homeowner with dignity."
  },
  {
    icon: FileText,
    title: "No Hidden Costs",
    description: "Zero fees, zero commissions, we pay closing costs. The offer is what you get."
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

// Why sell benefits
const whySellBenefits = [
  {
    icon: Zap,
    title: "Need to Sell Fast",
    description: "Close in as little as 7 days. Job relocation, financial hardship, or any urgent situation - we can help.",
    points: ["Close in 7-14 days", "No waiting for buyers", "Cash in hand quickly"]
  },
  {
    icon: Wrench,
    title: "Any Condition",
    description: "We buy houses exactly as they are. No repairs, no cleaning, no updates needed.",
    points: ["No repairs needed", "No cleaning required", "Foundation to roof issues OK"]
  },
  {
    icon: BadgeCheck,
    title: "Zero Fees",
    description: "Keep more money in your pocket. No commissions, no closing costs, no hidden fees.",
    points: ["No agent commissions", "No closing costs", "No hidden fees"]
  }
];

export default function AreaPage({ params }: PageProps) {
  const city = getCityBySlug(params.city);

  if (!city) {
    notFound();
  }

  // Schema.org structured data
  const localBusinessSchema = generateLocalBusinessSchema(city.name);
  const faqSchema = city.faqs ? generateFAQSchema(city.faqs) : null;
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Areas", url: "/areas" },
    { name: city.name, url: `/areas/${city.slug}` },
  ]);

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
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

      {/* Hero Section with Address Form */}
      <section className="bg-gradient-to-br from-navy to-primary text-white py-12 lg:py-20">
        <div className="container px-4">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4 text-white/80">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">{city.county === "ada" ? "Ada County" : "Canyon County"}, Idaho</span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                Sell Your {city.name} House Fast for Cash
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-6">
                Get a fair cash offer in 24 hours. No repairs, no fees, no commissions. Close on your timeline. Trust us with your {city.name} home.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button size="lg" className="bg-gold text-black hover:bg-gold/90 font-semibold" asChild>
                  <Link href="/get-quote">Get Your Cash Offer</Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
                  <a href="tel:2084052275">(208) 405-2275</a>
                </Button>
              </div>
            </div>
            <div className="lg:pl-4">
              <HeroAddressLookup />
            </div>
          </div>
        </div>
      </section>

      {/* Local Cash Home Buyers Section */}
      <section className="py-12 lg:py-16">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
              Local {city.name} Cash Home Buyers You Can Trust
            </h2>
            <div className="prose prose-lg max-w-none text-muted-foreground">
              <p className="text-base md:text-lg leading-relaxed">
                {city.extendedDescription}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Real Estate Market Overview */}
      <section className="py-12 lg:py-16 bg-muted/50">
        <div className="container px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
            {city.name} Real Estate Market Overview
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
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
                <p className="text-2xl md:text-3xl font-bold text-primary">{city.marketStats?.medianPrice || city.facts?.find(f => f.label === 'Median Home Price')?.value}</p>
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
        </div>
      </section>

      {/* Local Economy Section */}
      {city.serviceConsiderations && (
        <section className="py-12 lg:py-16">
          <div className="container px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
                {city.name} Local Economy
              </h2>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed text-center">
                {city.serviceConsiderations}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Neighborhoods We Serve */}
      {city.neighborhoods && city.neighborhoods.length > 0 && (
        <section className="py-12 lg:py-16 bg-muted/50">
          <div className="container px-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
              {city.name} Neighborhoods We Serve
            </h2>
            <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
              We buy houses throughout all of {city.name}, including these popular neighborhoods:
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

      {/* Notable Landmarks */}
      {city.landmarks && city.landmarks.length > 0 && (
        <section className="py-12 lg:py-16">
          <div className="container px-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
              Notable {city.name} Landmarks & Areas
            </h2>
            <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
              {city.landmarks.map((landmark) => (
                <span 
                  key={landmark} 
                  className="bg-primary/10 text-primary px-4 py-2 rounded-lg text-sm font-medium"
                >
                  {landmark}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Why Sell Section - 3 Columns */}
      <section className="py-12 lg:py-16 bg-muted/50">
        <div className="container px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">
            Why Sell to Home Buyer Boise in {city.name}?
          </h2>
          <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
            We make selling your {city.name} house simple, fast, and hassle-free with no fees or repairs.
          </p>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {whySellBenefits.map((benefit, index) => (
              <Card key={index} className="h-full">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4 mx-auto">
                    <benefit.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-center mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground text-center text-sm mb-4">{benefit.description}</p>
                  <ul className="space-y-2">
                    {benefit.points.map((point, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Cash Offer vs Traditional Listing Comparison */}
      <section className="py-12 lg:py-16">
        <div className="container px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">
            Cash Offer vs. Traditional Listing in {city.name}
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
                      Traditional Listing
                    </div>
                  </th>
                  <th className="text-center p-4 bg-primary/10 font-semibold text-primary">
                    <div className="flex items-center justify-center gap-2">
                      <Home className="h-5 w-5" />
                      Cash Offer from Us
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, index) => (
                  <tr key={index} className="border-b border-border">
                    <td className="p-4 font-medium">{row.feature}</td>
                    <td className="p-4 text-center text-muted-foreground">
                      <div className="flex items-center justify-center gap-2">
                        {row.traditional.toLowerCase().includes("yes") || row.traditional.toLowerCase().includes("high") || row.traditional.toLowerCase().includes("required") || row.traditional.toLowerCase().includes("fall") ? (
                          <X className="h-4 w-4 text-red-500" />
                        ) : null}
                        {row.traditional}
                      </div>
                    </td>
                    <td className="p-4 text-center bg-primary/5 font-medium text-primary">
                      <div className="flex items-center justify-center gap-2">
                        <Check className="h-4 w-4 text-green-600" />
                        {row.cashOffer}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* How to Sell Process */}
      <section className="py-12 lg:py-16 bg-muted/50">
        <div className="container px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">
            How to Sell Your {city.name} House Fast
          </h2>
          <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
            Our streamlined 4-step process gets you from contact to cash in as little as 7 days
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

      {/* Trust Badges - Why Homeowners Trust Us */}
      <section className="py-12 lg:py-16">
        <div className="container px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">
            Why {city.name} Homeowners Trust Home Buyer Boise
          </h2>
          <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
            We've helped hundreds of homeowners sell their properties quickly and fairly
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {trustFeatures.map((feature, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold mb-1">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Makes City Special CTA */}
      <section className="py-12 lg:py-16 bg-primary text-white">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              What Makes {city.name} Special?
            </h2>
            <p className="text-lg text-white/90 mb-6">
              {city.name} is a wonderful place to live with its {city.localFactors.climate.toLowerCase()} climate and strong community. Whether you're relocating, downsizing, or simply need to sell quickly, Home Buyer Boise is here to help {city.name} homeowners with fair cash offers and hassle-free closings.
            </p>
            <Button size="lg" className="bg-gold text-black hover:bg-gold/90 font-semibold" asChild>
              <Link href="/get-quote">Get Your Free Cash Offer <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Cash Home Buying Services */}
      <section className="py-12 lg:py-16 bg-muted/50">
        <div className="container px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">
            Cash Home Buying Services in {city.name}
          </h2>
          <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
            We help {city.name} homeowners in all situations
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {SERVICES.slice(0, 12).map((service) => {
              const ServiceIcon = SERVICE_ICONS[service.icon] || Home;
              return (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}/${city.slug}`}
                  className="group bg-white border border-border rounded-xl p-5 hover:shadow-lg hover:border-primary/30 transition-all duration-200"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <ServiceIcon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-semibold group-hover:text-primary transition-colors">{service.name}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground pl-11">in {city.name}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      {city.faqs && city.faqs.length > 0 && (
        <section className="py-12 lg:py-16">
          <div className="container px-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">
              Frequently Asked Questions About Selling in {city.name}
            </h2>
            <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
              Got questions about selling your {city.name} home? We've got answers.
            </p>
            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="w-full">
                {city.faqs.map((faq, index) => (
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

      {/* Buying Houses Throughout the Treasure Valley */}
      <section className="py-12 lg:py-16 bg-muted/50">
        <div className="container px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">
            Buying Houses Throughout the Treasure Valley
          </h2>
          <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
            In addition to {city.name}, we buy houses throughout the Treasure Valley. Get your cash offer today, no matter which city you&apos;re in.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {CITIES.filter((c) => c.slug !== city.slug).map((otherCity) => (
              <Link
                key={otherCity.slug}
                href={`/areas/${otherCity.slug}`}
                className="group bg-white border border-border rounded-xl p-5 text-center hover:shadow-lg hover:border-primary/30 transition-all duration-200"
              >
                <div className="flex items-center justify-center mb-3">
                  <div className="p-2.5 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <h3 className="font-semibold group-hover:text-primary transition-colors">{otherCity.name}</h3>
                <p className="text-xs text-muted-foreground mt-1">{otherCity.county === "ada" ? "Ada County" : "Canyon County"}</p>
                {otherCity.population && (
                  <p className="text-xs text-muted-foreground mt-1">Pop. {otherCity.population}</p>
                )}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Homeowners Choose Us */}
      <section className="py-12 lg:py-16">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
              Why {city.name} Homeowners Choose Us
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {city.localFactors.commonNeeds.map((need, index) => (
                <div key={index} className="flex items-center gap-3 bg-muted/50 rounded-lg p-4">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <span className="font-medium">{need}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-navy to-primary text-white">
        <div className="container px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Sell Your {city.name} House?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Get a free, no-obligation cash offer today. We buy houses in any condition and close on your timeline.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="bg-gold text-black hover:bg-gold/90 font-semibold" asChild>
              <Link href="/get-quote">Get Your Cash Offer</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
              <a href="tel:2084052275">Call (208) 405-2275</a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
