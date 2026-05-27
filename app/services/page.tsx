import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SERVICES } from "@/shared/servicesData";
import { getBaseUrl } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import {
  generateWebPageSchema,
  generateBreadcrumbSchema,
} from "@/lib/schema";
import { 
  ArrowRight,
  Zap,
  Home,
  DollarSign,
  Wrench,
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

export function generateMetadata(): Metadata {
  const baseUrl = getBaseUrl();
  const title = "Our Services | Cash Home Buying Solutions | Home Buyer Boise";
  const description = "Explore our cash home buying services. Whether you need to sell fast, avoid foreclosure, sell an inherited property, or deal with problem tenants - we can help.";

  return {
    title,
    description,
    keywords: [
      "sell house fast",
      "cash home buyers",
      "we buy houses",
      "sell house as-is",
      "avoid foreclosure",
      "inherited property sale",
      "divorce house sale",
      "tired landlord",
      "probate property",
    ],
    alternates: {
      canonical: `${baseUrl}/services`,
    },
    openGraph: {
      title,
      description,
      url: `${baseUrl}/services`,
      siteName: "Home Buyer Boise",
      type: "website",
      images: [
        {
          url: `${baseUrl}/og-image.png`,
          width: 1200,
          height: 630,
          alt: "Our Services - Home Buyer Boise",
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

export default function ServicesPage() {
  const webPageSchema = generateWebPageSchema({
    name: "Our Services | Cash Home Buying Solutions | Home Buyer Boise",
    description:
      "Explore our cash home buying services. Sell fast, avoid foreclosure, sell an inherited property, and more.",
    url: "/services",
    breadcrumbs: [
      { name: "Home", url: "/" },
      { name: "Services", url: "/services" },
    ],
  });
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Services", url: "/services" },
  ]);

  return (
    <>
      <JsonLd data={[webPageSchema, breadcrumbSchema]} />
      {/* Hero */}
      <section className="bg-gradient-to-br from-navy to-primary text-white py-16 lg:py-24">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Our Cash Home Buying Services
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8">
              No matter your situation, we can help you sell your house fast for cash. Explore our services below.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" className="bg-gold text-black hover:bg-gold/90 font-semibold h-14 px-8" asChild>
                <Link href="/get-quote">Get Your Cash Offer</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 h-14 px-8" asChild>
                <a href="tel:2084052275">(208) 405-2275</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* All Services Grid */}
      <section className="py-16 lg:py-20">
        <div className="container px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">All Services</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            We help homeowners in every situation. Select a service to learn more about how we can help you.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {SERVICES.map((service) => {
              const ServiceIcon = SERVICE_ICONS[service.icon] || Home;
              return (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="group bg-white border border-border rounded-xl p-6 hover:shadow-lg hover:border-primary/30 transition-all duration-200"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <ServiceIcon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold group-hover:text-primary transition-colors">{service.name}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                    {service.metaDescription}
                  </p>
                  <div className="flex items-center text-primary font-medium text-sm">
                    <span>Learn More</span>
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Common Situations */}
      <section className="py-16 lg:py-20 bg-muted/50">
        <div className="container px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">Common Situations We Help With</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            No matter why you need to sell, we&apos;re here to help with a fair cash offer and flexible timeline.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-bold text-lg mb-2">Need to Sell Fast</h3>
              <p className="text-muted-foreground text-sm">
                Job relocation, financial hardship, or any urgent situation - we can close in as little as 7 days.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Wrench className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-bold text-lg mb-2">Property Needs Repairs</h3>
              <p className="text-muted-foreground text-sm">
                Foundation issues, roof damage, outdated interiors - we buy houses in any condition.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Key className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-bold text-lg mb-2">Inherited Property</h3>
              <p className="text-muted-foreground text-sm">
                Skip the clean-out and repairs. We buy inherited properties as-is, even during probate.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-bold text-lg mb-2">Facing Foreclosure</h3>
              <p className="text-muted-foreground text-sm">
                We can help you sell fast to avoid foreclosure and protect your credit.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-bold text-lg mb-2">Going Through Divorce</h3>
              <p className="text-muted-foreground text-sm">
                Sell quickly and split proceeds fairly. We work with both parties for a smooth transaction.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-bold text-lg mb-2">Tired Landlord</h3>
              <p className="text-muted-foreground text-sm">
                Exit the rental business. We buy occupied properties and handle tenant issues.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-navy to-primary text-white">
        <div className="container px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Sell Your House?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Get a free, no-obligation cash offer today. We buy houses in any condition and close on your timeline.
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
