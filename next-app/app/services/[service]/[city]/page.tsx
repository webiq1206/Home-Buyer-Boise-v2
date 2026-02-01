import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SERVICES, getServiceBySlug, getAllServiceSlugs } from "@/shared/servicesData";
import { CITIES, getCityBySlug, getAllCitySlugs } from "@/shared/contentData";
import { CheckCircle, MapPin } from "lucide-react";

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
  
  if (!service || !city) {
    return {
      title: "Page Not Found | Home Buyer Boise",
    };
  }

  return {
    title: `${service.name} in ${city.name}, ID | Home Buyer Boise`,
    description: `${service.metaDescription.replace("Boise", city.name)} We serve homeowners throughout ${city.name} and the Treasure Valley.`,
    alternates: {
      canonical: `https://homebuyerboise.com/services/${service.slug}/${city.slug}`,
    },
  };
}

export default function ServiceCityPage({ params }: PageProps) {
  const service = getServiceBySlug(params.service);
  const city = getCityBySlug(params.city);

  if (!service || !city) {
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
                <span>{city.name}, {city.county === "ada" ? "Ada County" : "Canyon County"}</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                {service.name} in {city.name}, Idaho
              </h1>
              <p className="text-xl text-white/90 mb-8">
                {service.metaDescription.replace(/Boise/g, city.name).replace(/Boise area/g, city.name)}
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

        {/* Content */}
        <section className="py-16 lg:py-24">
          <div className="container px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">
                {service.h1.replace(/Boise/g, city.name)}
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Home Buyer Boise helps {city.name} homeowners {service.name.toLowerCase()} their properties quickly and easily. 
                Whether you&apos;re dealing with {service.keywords[0]}, {service.keywords[1]}, or any other situation, 
                we&apos;re here to provide a fair cash offer with no obligations.
              </p>

              <div className="grid sm:grid-cols-2 gap-6 mb-8">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">Local {city.name} Experts</p>
                    <p className="text-muted-foreground">We know the {city.name} real estate market</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">Cash Offer in 24 Hours</p>
                    <p className="text-muted-foreground">Fast, fair offers on your {city.name} home</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">No Repairs Needed</p>
                    <p className="text-muted-foreground">Sell your {city.name} house as-is</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">No Fees or Commissions</p>
                    <p className="text-muted-foreground">Keep more of your equity</p>
                  </div>
                </div>
              </div>

              {city.neighborhoods && city.neighborhoods.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-3">
                    We Buy Houses in These {city.name} Neighborhoods
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {city.neighborhoods.map((neighborhood) => (
                      <span key={neighborhood} className="bg-muted px-3 py-1 rounded-full text-sm">
                        {neighborhood}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <Button size="lg" asChild>
                <Link href="/get-quote">Get Your Free Cash Offer</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Other Cities */}
        <section className="py-16 lg:py-24 bg-muted">
          <div className="container px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">
              {service.name} in Other Areas
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {CITIES.filter((c) => c.slug !== city.slug).map((otherCity) => (
                <Link
                  key={otherCity.slug}
                  href={`/services/${service.slug}/${otherCity.slug}`}
                  className="bg-background rounded-lg p-4 text-center hover:shadow-md transition-shadow"
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
            <h2 className="text-3xl font-bold mb-4">
              Ready to {service.name.replace("Sale", "Sell")} in {city.name}?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Get a free, no-obligation cash offer today on your {city.name} property.
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
