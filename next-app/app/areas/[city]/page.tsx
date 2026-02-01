import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CITIES, getCityBySlug, getAllCitySlugs } from "@/shared/contentData";
import { SERVICES } from "@/shared/servicesData";
import { CheckCircle, MapPin, Home, DollarSign, Clock } from "lucide-react";

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
  
  if (!city) {
    return {
      title: "City Not Found | Home Buyer Boise",
    };
  }

  return {
    title: `We Buy Houses in ${city.name}, ID | Cash Home Buyers`,
    description: `Sell your ${city.name} house fast for cash. We buy houses in any condition in ${city.name}, Idaho. No repairs, no fees, close on your timeline. Get a free cash offer today!`,
    alternates: {
      canonical: `https://homebuyerboise.com/areas/${city.slug}`,
    },
  };
}

export default function AreaPage({ params }: PageProps) {
  const city = getCityBySlug(params.city);

  if (!city) {
    notFound();
  }

  return (
    <>
        {/* Hero */}
        <section className="bg-gradient-to-br from-navy to-primary text-white py-16 lg:py-24">
          <div className="container px-4">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="h-5 w-5" />
                <span>{city.county === "ada" ? "Ada County" : "Canyon County"}, Idaho</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                We Buy Houses in {city.name}, Idaho
              </h1>
              <p className="text-xl text-white/90 mb-8">
                Sell your {city.name} house fast for cash. No repairs, no fees, no hassle. Get a fair offer in 24 hours and close on your timeline.
              </p>
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

        {/* City Facts */}
        {city.facts && (
          <section className="py-8 bg-muted border-b">
            <div className="container px-4">
              <div className="flex flex-wrap justify-center items-center gap-8 text-sm">
                {city.facts.map((fact, index) => (
                  <div key={index} className="text-center">
                    <p className="font-semibold">{fact.value}</p>
                    <p className="text-muted-foreground">{fact.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* About Area */}
        <section className="py-16 lg:py-24">
          <div className="container px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Sell Your House Fast in {city.name}</h2>
              <p className="text-lg text-muted-foreground mb-6">
                {city.extendedDescription || `Home Buyer Boise is the premier cash home buyer serving ${city.name}, Idaho. We buy houses in any condition and can close on your timeline.`}
              </p>
              
              {city.neighborhoods && city.neighborhoods.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-3">Neighborhoods We Serve</h3>
                  <div className="flex flex-wrap gap-2">
                    {city.neighborhoods.map((neighborhood) => (
                      <span key={neighborhood} className="bg-muted px-3 py-1 rounded-full text-sm">
                        {neighborhood}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">Cash Offer in 24 Hours</p>
                    <p className="text-sm text-muted-foreground">Fast, fair offers on any property</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">No Repairs Needed</p>
                    <p className="text-sm text-muted-foreground">Sell your house as-is</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">No Fees or Commissions</p>
                    <p className="text-sm text-muted-foreground">Keep more of your equity</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">Close on Your Timeline</p>
                    <p className="text-sm text-muted-foreground">7 days to 60+ days - you choose</p>
                  </div>
                </div>
              </div>

              <Button size="lg" asChild>
                <Link href="/get-quote">Get Your Free Cash Offer</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Services in this Area */}
        <section className="py-16 lg:py-24 bg-muted">
          <div className="container px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Our Services in {city.name}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
              {SERVICES.slice(0, 9).map((service) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}/${city.slug}`}
                  className="bg-background rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <h3 className="font-semibold mb-1">{service.name}</h3>
                  <p className="text-sm text-muted-foreground">in {city.name}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Other Areas */}
        <section className="py-16 lg:py-24">
          <div className="container px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Other Areas We Serve</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {CITIES.filter((c) => c.slug !== city.slug).map((otherCity) => (
                <Link
                  key={otherCity.slug}
                  href={`/areas/${otherCity.slug}`}
                  className="bg-muted rounded-lg p-4 text-center hover:shadow-md transition-shadow"
                >
                  <h3 className="font-semibold">{otherCity.name}, ID</h3>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 lg:py-24 bg-primary text-white">
          <div className="container px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Sell Your {city.name} House?</h2>
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
