import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CITIES } from "@/shared/contentData";
import { getBaseUrl } from "@/lib/seo";
import { MapPin, ArrowRight, Users, DollarSign } from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import {
  generateWebPageSchema,
  generateBreadcrumbSchema,
  generateItemListSchema,
} from "@/lib/schema";

export function generateMetadata(): Metadata {
  const baseUrl = getBaseUrl();
  const title = "Areas We Serve | Cash Home Buyers in Treasure Valley | Home Buyer Boise";
  const description = "We buy houses throughout the Treasure Valley including Boise, Meridian, Eagle, Kuna, Star, Middleton, Nampa, and Caldwell. Get a fair cash offer today!";

  return {
    title,
    description,
    keywords: [
      "Treasure Valley cash home buyers",
      "Boise house buyers",
      "sell house fast Idaho",
      "we buy houses Treasure Valley",
      "cash for houses Ada County",
      "cash for houses Canyon County",
    ],
    alternates: {
      canonical: `${baseUrl}/areas`,
    },
    openGraph: {
      title,
      description,
      url: `${baseUrl}/areas`,
      siteName: "Home Buyer Boise",
      type: "website",
      images: [
        {
          url: `${baseUrl}/og-image.png`,
          width: 1200,
          height: 630,
          alt: "Areas We Serve - Home Buyer Boise",
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

export default function AreasPage() {
  // Group cities by county
  const adaCountyCities = CITIES.filter(city => city.county === "ada");
  const canyonCountyCities = CITIES.filter(city => city.county === "canyon");

  const webPageSchema = generateWebPageSchema({
    name: "Areas We Serve | Cash Home Buyers in Treasure Valley",
    description:
      "We buy houses throughout the Treasure Valley including Boise, Meridian, Eagle, Kuna, Star, Middleton, Nampa, and Caldwell.",
    url: "/areas",
    breadcrumbs: [
      { name: "Home", url: "/" },
      { name: "Areas", url: "/areas" },
    ],
  });
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Areas", url: "/areas" },
  ]);
  const itemListSchema = generateItemListSchema({
    name: "Treasure Valley Service Areas",
    items: CITIES.map((c) => ({
      name: c.name,
      url: `/areas/${c.slug}`,
    })),
  });

  return (
    <>
      <JsonLd data={[webPageSchema, breadcrumbSchema, itemListSchema]} />
      {/* Hero */}
      <section className="bg-gradient-to-br from-navy to-primary text-white py-16 lg:py-24">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <MapPin className="h-5 w-5" />
              <span className="text-white/80 text-sm font-medium">Treasure Valley, Idaho</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Areas We Serve
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8">
              We buy houses throughout the Treasure Valley. Select your city below for location-specific information and a free cash offer.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" className="bg-gold text-black hover:bg-gold/90 font-semibold h-14 px-8" asChild>
                <Link href="/get-quote">Get Your Cash Offer</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 h-14 px-8" asChild>
                <a href="tel:2084052274">(208) 405-2274</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Ada County Cities */}
      <section className="py-16 lg:py-20">
        <div className="container px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">Ada County</h2>
          <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
            We buy houses throughout Ada County, including these cities
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {adaCountyCities.map((city) => (
              <Link
                key={city.slug}
                href={`/areas/${city.slug}`}
                className="group bg-white border border-border rounded-xl p-6 hover:shadow-lg hover:border-primary/30 transition-all duration-200"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{city.name}</h3>
                    <p className="text-sm text-muted-foreground">Ada County, Idaho</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{city.population}</span>
                  </div>
                  {city.marketStats?.medianPrice && (
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-4 w-4" />
                      <span>{city.marketStats.medianPrice}</span>
                    </div>
                  )}
                </div>
                <div className="flex items-center text-primary font-medium">
                  <span>View {city.name} Area</span>
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Canyon County Cities */}
      <section className="py-16 lg:py-20 bg-muted/50">
        <div className="container px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">Canyon County</h2>
          <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
            We also serve homeowners throughout Canyon County
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {canyonCountyCities.map((city) => (
              <Link
                key={city.slug}
                href={`/areas/${city.slug}`}
                className="group bg-white border border-border rounded-xl p-6 hover:shadow-lg hover:border-primary/30 transition-all duration-200"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{city.name}</h3>
                    <p className="text-sm text-muted-foreground">Canyon County, Idaho</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{city.population}</span>
                  </div>
                  {city.marketStats?.medianPrice && (
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-4 w-4" />
                      <span>{city.marketStats.medianPrice}</span>
                    </div>
                  )}
                </div>
                <div className="flex items-center text-primary font-medium">
                  <span>View {city.name} Area</span>
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-navy to-primary text-white">
        <div className="container px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Sell Your Treasure Valley Home?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Get a free, no-obligation cash offer today. We buy houses in any condition and close on your timeline.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="bg-gold text-black hover:bg-gold/90 font-semibold h-14 px-8" asChild>
              <Link href="/get-quote">Get Your Cash Offer</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 h-14 px-8" asChild>
              <a href="tel:2084052274">Call (208) 405-2274</a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
