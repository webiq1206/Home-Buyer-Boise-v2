import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { QuoteWizard } from "@/components/QuoteWizard";
import { 
  Home,
  Clock,
  Heart,
  Users,
  TrendingDown,
  Briefcase,
  PiggyBank,
  MapPin,
  Shield,
  DollarSign,
  ArrowRight,
  CheckCircle2
} from "lucide-react";
import heroBackground from "@assets/Home Buyer Boise Background Image_1764010277862.png";

const situations = [
  {
    icon: Clock,
    title: "Foreclosure Prevention",
    description: "Facing foreclosure? We can close quickly before the auction date, helping you avoid foreclosure on your credit and potentially walk away with cash."
  },
  {
    icon: Heart,
    title: "Divorce or Separation",
    description: "Going through a divorce? We make selling the marital home simple and fast, allowing both parties to move forward without the stress of traditional selling."
  },
  {
    icon: Users,
    title: "Inherited Property",
    description: "Inherited a house you don't want? We buy inherited properties as-is, handling all the paperwork and letting you settle the estate without hassle."
  },
  {
    icon: Briefcase,
    title: "Job Relocation",
    description: "Transferred to a new city? Close in as little as 7 days so you can start your new job without worrying about your old house sitting on the market."
  },
  {
    icon: TrendingDown,
    title: "Tired Landlord",
    description: "Tired of dealing with tenants, repairs, and property management? Sell your rental property fast and eliminate the landlord headaches."
  },
  {
    icon: Home,
    title: "Major Repairs Needed",
    description: "House needs significant repairs you can't afford? We buy houses in any condition—no need to fix anything before selling."
  },
  {
    icon: PiggyBank,
    title: "Downsizing",
    description: "Kids moved out and house too big? Sell quickly without the long traditional process and move into your ideal space sooner."
  },
  {
    icon: MapPin,
    title: "Out-of-State Ownership",
    description: "Own property in Idaho but live elsewhere? We handle everything remotely so you can sell without making multiple trips."
  },
];

const benefits = [
  "Close in as little as 7 days",
  "No realtor commissions or fees",
  "We buy houses in any condition",
  "No repairs or cleaning required",
  "No showings or open houses",
  "We handle all paperwork",
  "Cash payment at closing",
  "Flexible closing timeline",
];

export default function Services() {
  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Sell Your House Fast in Boise | Cash Home Buyers | HomeBuyerBoise</title>
        <meta 
          name="description" 
          content="We buy houses in any condition across Boise, Meridian, Eagle, Kuna, Star, Middleton and the Treasure Valley. Facing foreclosure, divorce, or inheritance? Get a fair cash offer in 24 hours." 
        />
        <meta property="og:title" content="Sell Your House Fast in Boise | Cash Home Buyers | HomeBuyerBoise" />
        <meta property="og:description" content="We buy houses in any condition across Boise, Meridian, Eagle, Kuna, Star, Middleton and the Treasure Valley. Facing foreclosure, divorce, or inheritance? Get a fair cash offer in 24 hours." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={heroBackground} alt="" className="w-full h-full object-cover opacity-60" width="1920" height="1080" loading="eager" />
        </div>
        <div className="absolute inset-0 z-[1] bg-background/60"></div>
        <div className="container px-4 md:px-8 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Column - Content */}
              <div className="text-center lg:text-left space-y-6">
                <div className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-2">
                  How We Help
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                  We Buy Houses in Any Situation
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground">
                  Whether you're facing foreclosure, going through a divorce, inherited a property, or simply need to sell fast—we provide fair cash offers and close on your timeline. Serving Boise, Meridian, Eagle, Kuna, Star, and Middleton.
                </p>
                <div className="flex flex-wrap gap-4 justify-center lg:justify-start pt-4">
                  <Button size="lg" variant="outline" asChild data-testid="button-contact">
                    <Link href="/contact">
                      Contact Us
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Right Column - Quote Wizard */}
              <div className="lg:block">
                <QuoteWizard />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Situations We Help With */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-8">
          <div className="max-w-6xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                Situations We Help With
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                No matter your situation, we provide fast, fair cash offers that help you move forward
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {situations.map((situation) => {
                const Icon = situation.icon;
                return (
                  <Card key={situation.title} className="hover-elevate transition-all duration-200" data-testid={`situation-card-${situation.title.toLowerCase().replace(/\s+/g, '-')}`}>
                    <CardHeader>
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                          <Icon className="h-6 w-6" />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-lg mb-2">{situation.title}</CardTitle>
                          <CardDescription>
                            {situation.description}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container px-4 md:px-8">
          <div className="max-w-6xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                How It Works
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Our simple 3-step process gets you from offer to cash in hand
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  1
                </div>
                <h3 className="font-semibold text-lg mb-2">Submit Property Info</h3>
                <p className="text-sm text-muted-foreground">
                  Fill out our simple form with your property address and details. Takes less than 60 seconds.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  2
                </div>
                <h3 className="font-semibold text-lg mb-2">Get Your Cash Offer</h3>
                <p className="text-sm text-muted-foreground">
                  Receive a fair, no-obligation cash offer within 24 hours based on current market data.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  3
                </div>
                <h3 className="font-semibold text-lg mb-2">Close on Your Schedule</h3>
                <p className="text-sm text-muted-foreground">
                  Choose your closing date—as fast as 7 days or take more time. Get cash at closing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                Why Homeowners Choose Us
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {benefits.map((benefit) => (
                <div key={benefit} className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                  </div>
                  <div className="text-lg">{benefit}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Property Types We Buy */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container px-4 md:px-8">
          <div className="max-w-6xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                Property Types We Buy
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                We purchase all types of residential properties in any condition
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="hover-elevate">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Home className="h-5 w-5 text-primary" />
                    Single-Family Homes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    We buy single-family houses in any condition, any location across the Treasure Valley.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover-elevate">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Home className="h-5 w-5 text-primary" />
                    Townhomes & Condos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Townhomes, condos, and multi-family properties. We handle HOA requirements.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover-elevate">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Home className="h-5 w-5 text-primary" />
                    Multi-Unit Properties
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Duplexes, triplexes, and small apartment buildings. Even with tenants in place.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Serving Idaho's Treasure Valley
            </h2>
            <p className="text-lg text-muted-foreground">
              We buy houses throughout the greater Boise area
            </p>
            <div className="flex flex-wrap gap-3 justify-center text-sm">
              {['Boise', 'Meridian', 'Eagle', 'Kuna', 'Star', 'Middleton'].map((city) => (
                <div key={city} className="px-4 py-2 bg-card border rounded-md" data-testid={`city-${city.toLowerCase()}`}>
                  {city}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Ready to Sell Your House Fast?
            </h2>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              Get a fair, no-obligation cash offer in less than 24 hours. No fees, no commissions, no hassle.
            </p>
            <div className="flex flex-wrap gap-4 justify-center pt-4">
              <Button size="lg" variant="secondary" asChild data-testid="button-cta-quote">
                <Link href="/get-quote">
                  Get Your Cash Offer
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" data-testid="button-cta-contact">
                <Link href="/contact">
                  Contact Us Today
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
