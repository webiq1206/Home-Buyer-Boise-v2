import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { QuoteWizard } from "@/components/QuoteWizard";
import { CheckCircle2, Home, Clock, DollarSign, Shield, ArrowRight, MapPin } from "lucide-react";
import { NearMeFAQ } from "@/components/NearMeFAQ";
import { 
  generateLocalBusinessSchema, 
  generateServiceSchema, 
  generateBreadcrumbSchema,
  injectStructuredData 
} from "@/lib/seo";

interface AreaTemplateProps {
  cityName: string;
  citySlug: string;
}

export default function AreaTemplate({ cityName, citySlug }: AreaTemplateProps) {
  const situations = [
    { 
      icon: Clock, 
      title: "Need to Sell Fast", 
      features: ["Close in as little as 7 days", "No waiting for buyer financing", "Flexible closing dates", "Move on your timeline"] 
    },
    { 
      icon: Home, 
      title: "Any Condition", 
      features: ["No repairs needed", "Sell as-is", "Foundation issues OK", "Fire or water damage accepted"] 
    },
    { 
      icon: DollarSign, 
      title: "Zero Fees", 
      features: ["No realtor commissions", "We pay all closing costs", "No inspection fees", "No appraisal required"] 
    },
  ];

  const citySpecificContent = {
    kuna: `Located just southwest of Boise, Kuna has grown rapidly in recent years. Whether you own a newer home in one of Kuna's expanding subdivisions or an older property near downtown, we buy houses throughout Kuna in any condition. Our local team understands Kuna's real estate market and provides fair cash offers based on current market values.`,
    boise: `As Idaho's capital and largest city, Boise's diverse neighborhoods each have unique characteristics. From the historic North End to the Bench, downtown condos to Boise's foothills, we buy houses throughout all Boise areas. Our team has extensive experience with Boise real estate and provides competitive cash offers regardless of your property's location or condition.`,
    meridian: `Meridian has become one of the fastest-growing cities in America, with new developments alongside established neighborhoods. Whether your home is in a brand new subdivision or one of Meridian's original neighborhoods, we provide fast cash offers. Our local expertise means we understand Meridian's dynamic real estate market and offer fair prices.`,
    eagle: `Eagle's premium properties and beautiful setting attract homeowners seeking quality of life. Whether you're in gated communities, custom homes on larger lots, or Eagle's historic areas, we buy houses of all types and price ranges. Our discreet, professional service matches Eagle's community standards.`,
    star: `Star combines small-town charm with proximity to Boise's amenities. From rural properties on larger acreage to newer suburban developments, we buy all types of homes in Star. Our flexible approach works whether you have a half-acre lot or multiple acres.`,
    middleton: `Middleton offers more affordable housing while maintaining easy access to Boise. Whether your home is near the Boise River, in established neighborhoods, or newer developments, we provide honest cash offers. Our straightforward process and transparent pricing align with Middleton's down-to-earth values.`,
  };

  const benefits = [
    { 
      title: 'Local Market Expertise', 
      description: `Deep understanding of ${cityName}'s real estate market, neighborhood values, and property conditions specific to this area.` 
    },
    { 
      title: 'Fair Cash Offers', 
      description: 'Competitive offers based on current market comps and property condition - no lowball offers.' 
    },
    { 
      title: 'Licensed & Insured', 
      description: 'Fully licensed Idaho real estate buyers with complete liability coverage for your protection.' 
    },
    { 
      title: 'Flexible Timeline', 
      description: 'Close in 7 days or take up to 90 days - we work on your schedule, not ours.' 
    },
    { 
      title: 'Professional Service', 
      description: 'Clear communication, honest assessments, and respectful treatment throughout the entire process.' 
    },
    { 
      title: 'No Hidden Costs', 
      description: 'Our offer is what you get - no deductions, no surprise fees, no commission taken out.' 
    },
  ];

  // Generate structured data for SEO
  const localBusinessSchema = generateLocalBusinessSchema(cityName);
  const serviceSchema = generateServiceSchema(cityName);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Service Areas', url: '/areas' },
    { name: `${cityName}, Idaho`, url: `/areas/${citySlug}` }
  ]);

  return (
    <>
      <Helmet>
        <title>Sell Your House Fast in {cityName} Idaho | Cash Home Buyers | HomeBuyerBoise</title>
        <meta 
          name="description" 
          content={`Need to sell your house fast in ${cityName}? Get a fair cash offer in 24 hours. No fees, no commissions, no repairs needed. We buy houses in any condition throughout ${cityName}, Idaho.`}
        />
        <meta name="keywords" content={`sell house fast ${cityName}, cash home buyers ${cityName}, we buy houses ${cityName} Idaho, sell my house ${cityName}, ${cityName} cash buyers, sell house for cash ${cityName}, cash for houses ${cityName}, ${cityName} house buyers`} />
        <link rel="canonical" href={`https://homebuyerboise.com/areas/${citySlug}`} />
        
        {/* Open Graph / Social Meta Tags */}
        <meta property="og:title" content={`Sell Your House Fast in ${cityName} Idaho | Cash Home Buyers`} />
        <meta property="og:description" content={`Get a fair cash offer in 24 hours for your ${cityName} home. No fees, no commissions, close in 7 days.`} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://homebuyerboise.com/areas/${citySlug}`} />
        <meta property="og:image" content={`https://homebuyerboise.com/og-image-${citySlug}.jpg`} />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`Sell Your House Fast in ${cityName} Idaho`} />
        <meta name="twitter:description" content={`Cash offer in 24 hours for your ${cityName} home. No fees, no commissions.`} />
        <meta name="twitter:image" content={`https://homebuyerboise.com/og-image-${citySlug}.jpg`} />
        
        {/* Structured Data / Schema Markup */}
        <script type="application/ld+json">
          {injectStructuredData(localBusinessSchema)}
        </script>
        <script type="application/ld+json">
          {injectStructuredData(serviceSchema)}
        </script>
        <script type="application/ld+json">
          {injectStructuredData(breadcrumbSchema)}
        </script>
      </Helmet>

      <div className="flex flex-col">
        {/* Hero Section */}
        <section className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/70">
          <div className="absolute inset-0 bg-grid-white/5"></div>
          
          <div className="container px-4 md:px-8 relative z-10">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="text-center lg:text-left space-y-6">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                    <MapPin className="h-4 w-4 text-white" />
                    <span className="text-sm font-medium text-white">Cash Home Buyers in {cityName}</span>
                  </div>
                  
                  <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight">
                    Sell Your {cityName} House
                    <br />
                    <span className="text-accent">Fast for Cash</span>
                  </h1>
                  
                  <p className="text-lg md:text-xl text-white/90">
                    Get a fair cash offer in 24 hours. No fees, no commissions, no repairs needed. Close on your timeline.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                    <Button 
                      size="lg" 
                      className="bg-accent hover:bg-accent/90 text-primary font-semibold px-8 h-12"
                      asChild
                      data-testid="button-get-offer"
                    >
                      <Link href="/get-quote">
                        Get My Cash Offer
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                    <Button 
                      size="lg" 
                      variant="outline" 
                      className="border-white/30 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 h-12 px-8"
                      asChild
                      data-testid="button-call"
                    >
                      <a href="tel:2084052275">(208) 405-2275</a>
                    </Button>
                  </div>
                </div>

                <div className="lg:block">
                  <QuoteWizard preselectedCity={citySlug} defaultCity={citySlug} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Local Expertise Section */}
        <section className="py-16 md:py-20 bg-muted/30">
          <div className="container px-4 md:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6 text-center">
                Local {cityName} Cash Home Buyers
              </h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-lg leading-relaxed text-muted-foreground">
                  {citySpecificContent[citySlug as keyof typeof citySpecificContent]}
                </p>
                <p className="text-lg leading-relaxed text-muted-foreground mt-4">
                  Whether you're facing foreclosure, going through a divorce, dealing with an inherited property, or simply need to sell quickly, HomeBuyerBoise provides fast, fair cash offers for {cityName} homes. We've been buying houses throughout the Treasure Valley since 2017, and we understand the local market inside and out.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How We Help Section */}
        <section className="py-16 md:py-20">
          <div className="container px-4 md:px-8">
            <div className="max-w-5xl mx-auto space-y-12">
              <div className="text-center max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
                  Why Sell to HomeBuyerBoise in {cityName}?
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  We make selling your {cityName} house simple, fast, and hassle-free with no fees or commissions.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {situations.map((situation, index) => (
                  <Card key={index} className="hover-elevate transition-all duration-300" data-testid={`card-situation-${index}`}>
                    <CardHeader className="space-y-4">
                      <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center">
                        <situation.icon className="h-7 w-7 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-xl mb-2">{situation.title}</CardTitle>
                        <CardDescription>For {cityName} homeowners</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2.5">
                        {situation.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm">
                            <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                            <span className="leading-relaxed">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 md:py-20 bg-muted/30">
          <div className="container px-4 md:px-8">
            <div className="max-w-5xl mx-auto">
              <h3 className="text-3xl md:text-4xl font-bold tracking-tight mb-8 text-center">
                Why {cityName} Homeowners Trust HomeBuyerBoise
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {benefits.map((benefit, i) => (
                  <div key={i} className="flex gap-4 p-6 rounded-lg bg-card border hover-elevate transition-all" data-testid={`benefit-${i}`}>
                    <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold mb-2">{benefit.title}</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Service Areas Section */}
        <section className="py-16 md:py-20">
          <div className="container px-4 md:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h3 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
                Buying Houses Throughout the Treasure Valley
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                In addition to {cityName}, we buy houses throughout the Treasure Valley. Get your cash offer today no matter where your property is located.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {['Boise', 'Meridian', 'Eagle', 'Kuna', 'Star', 'Middleton']
                  .filter(city => city !== cityName)
                  .map((city) => (
                    <Button key={city} variant="outline" asChild data-testid={`button-city-${city.toLowerCase()}`}>
                      <Link href={`/areas/${city.toLowerCase()}`}>{city}, ID</Link>
                    </Button>
                  ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 md:py-20 bg-muted/30">
          <div className="container px-4 md:px-8">
            <div className="max-w-4xl mx-auto">
              <NearMeFAQ city={cityName} serviceName="cash home buying" />
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-16 md:py-20">
          <div className="container px-4 md:px-8">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                Ready to Sell Your {cityName} House?
              </h2>
              <p className="text-lg text-muted-foreground">
                Get your free, no-obligation cash offer today. It takes less than 2 minutes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button size="lg" asChild data-testid="button-get-offer-bottom">
                  <Link href="/get-quote">
                    Get My Cash Offer
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild data-testid="button-call-bottom">
                  <a href="tel:2084052275">(208) 405-2275</a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
