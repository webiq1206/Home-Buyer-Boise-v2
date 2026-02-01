import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SERVICES, getServiceBySlug, getAllServiceSlugs } from "@/shared/servicesData";
import { CITIES } from "@/shared/contentData";
import { CheckCircle, ArrowRight } from "lucide-react";

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
  
  if (!service) {
    return {
      title: "Service Not Found | Home Buyer Boise",
    };
  }

  return {
    title: service.title,
    description: service.metaDescription,
    keywords: service.keywords,
    alternates: {
      canonical: `https://homebuyerboise.com/services/${service.slug}`,
    },
  };
}

export default function ServicePage({ params }: PageProps) {
  const service = getServiceBySlug(params.service);

  if (!service) {
    notFound();
  }

  return (
    <>
        {/* Hero */}
        <section className="bg-gradient-to-br from-navy to-primary text-white py-16 lg:py-24">
          <div className="container px-4">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">{service.h1}</h1>
              <p className="text-xl text-white/90 mb-8">{service.metaDescription}</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-gold text-black hover:bg-gold/90" asChild>
                  <Link href="/get-quote">Get Your Cash Offer</Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
                  <a href="tel:2084052275">(208) 405-2275</a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16 lg:py-24">
          <div className="container px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-8">Why Choose Home Buyer Boise</h2>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">Cash Offer in 24 Hours</p>
                    <p className="text-muted-foreground">We&apos;ll present you with a fair cash offer fast</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">No Repairs Needed</p>
                    <p className="text-muted-foreground">Sell your house exactly as it is</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">No Fees or Commissions</p>
                    <p className="text-muted-foreground">We pay all closing costs</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">Close on Your Timeline</p>
                    <p className="text-muted-foreground">As fast as 7 days or 60+ days</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Service Areas */}
        <section className="py-16 lg:py-24 bg-muted">
          <div className="container px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">{service.name} in the Treasure Valley</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {CITIES.map((city) => (
                <Link
                  key={city.slug}
                  href={`/services/${service.slug}/${city.slug}`}
                  className="bg-background rounded-lg p-4 text-center hover:shadow-md transition-shadow"
                >
                  <h3 className="font-semibold">{city.name}, ID</h3>
                  <p className="text-sm text-muted-foreground">{service.shortName}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Other Services */}
        <section className="py-16 lg:py-24">
          <div className="container px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Other Services</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
              {SERVICES.filter((s) => s.slug !== service.slug).slice(0, 6).map((otherService) => (
                <Link
                  key={otherService.slug}
                  href={`/services/${otherService.slug}`}
                  className="bg-muted rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <h3 className="font-semibold">{otherService.name}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{otherService.metaDescription.substring(0, 80)}...</p>
                </Link>
              ))}
            </div>
            <div className="text-center mt-8">
              <Button variant="outline" asChild>
                <Link href="/pricing">
                  View All Services
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 lg:py-24 bg-primary text-white">
          <div className="container px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Get a free, no-obligation cash offer today. We buy houses in any condition.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" className="bg-gold text-black hover:bg-gold/90" asChild>
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
