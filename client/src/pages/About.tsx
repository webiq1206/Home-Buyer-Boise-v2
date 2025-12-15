import { Link } from "wouter";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Shield, Heart, Award, Users, Home, Clock, DollarSign, TrendingUp, MapPin, Handshake, BarChart3 } from "lucide-react";
import { generateSEOMetadata } from "@/lib/seo";
import { generateOrganizationSchema, generateLocalBusinessSchema } from "@/lib/schema";
import heroBackground from "@assets/Home Buyer Boise Background Image_1764010277862.png";

export default function About() {
  const seoData = generateSEOMetadata({
    serviceName: "About Us",
    serviceSlug: "about",
    isHomePage: false,
  });

  const organizationSchema = generateOrganizationSchema();
  const localBusinessSchema = generateLocalBusinessSchema();

  return (
    <div className="flex flex-col">
      <Helmet>
        <title>{seoData.title}</title>
        <meta name="description" content={seoData.description} />
        <link rel="canonical" href={seoData.canonical} />
        
        <meta property="og:title" content={seoData.ogTitle} />
        <meta property="og:description" content={seoData.ogDescription} />
        <meta property="og:image" content={seoData.ogImage} />
        <meta property="og:url" content={seoData.canonical} />
        <meta property="og:type" content="website" />
        
        <meta name="twitter:card" content={seoData.twitterCard} />
        <meta name="twitter:title" content={seoData.ogTitle} />
        <meta name="twitter:description" content={seoData.ogDescription} />
        <meta name="twitter:image" content={seoData.ogImage} />
        
        <script type="application/ld+json">
          {JSON.stringify(organizationSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(localBusinessSchema)}
        </script>
      </Helmet>
      {/* Hero */}
      <section className="relative py-16 md:py-32 lg:py-40 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={heroBackground} alt="About Home Buyer Boise - trusted cash home buyers serving the Treasure Valley since 2017" className="w-full h-full object-cover opacity-60" width="1920" height="1080" loading="eager" />
        </div>
        <div className="absolute inset-0 z-[1] bg-background/60 pt-[40px] pb-[40px]"></div>
        <div className="container px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
              About Home Buyer Boise
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Trusted cash home buyers helping homeowners across the Treasure Valley since 2017
            </p>
          </div>
        </div>
      </section>
      {/* Our Story */}
      <section className="py-16 md:py-24">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-lg text-muted-foreground mb-4">
                Since 2017, Home Buyer Boise has been helping homeowners sell their properties quickly and hassle-free throughout the Treasure Valley. What started as a mission to help families in difficult situations has grown into a trusted cash home buying service serving Boise, Meridian, Eagle, Kuna, Star, and Middleton.
              </p>
              <p className="text-lg text-muted-foreground mb-4">
                We understand that selling a home can be stressful—whether you're facing foreclosure, going through a divorce, dealing with an inherited property, or simply need to relocate quickly. Our team specializes in providing fair cash offers and closing on your timeline, not ours.
              </p>
              <p className="text-lg text-muted-foreground">
                Today, we've helped hundreds of homeowners transition to their next chapter with dignity, speed, and financial fairness. We're proud to be a locally-owned solution serving our Treasure Valley neighbors when they need it most.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Why We're Different */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Why We're Different</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="hover-elevate transition-all duration-200">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <DollarSign className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Fair Cash Offers</h3>
                      <p className="text-muted-foreground">
                        We provide competitive cash offers based on current market conditions, property condition, and recent sales data. No lowball offers—just honest, transparent pricing.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover-elevate transition-all duration-200">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Close on Your Timeline</h3>
                      <p className="text-muted-foreground">
                        Need to close in 7 days? 30 days? 90 days? We work on your schedule. Whether you need to move quickly or need more time, we adapt to your situation.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover-elevate transition-all duration-200">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Home className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Buy As-Is</h3>
                      <p className="text-muted-foreground">
                        We buy houses in any condition. No repairs needed, no cleaning required, no staging. We handle everything—you just bring the keys to closing.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover-elevate transition-all duration-200">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Shield className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">No Fees or Commissions</h3>
                      <p className="text-muted-foreground">
                        Unlike traditional sales, there are no realtor commissions, no closing costs, no inspection fees. The offer we make is the amount you receive at closing.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover-elevate transition-all duration-200">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <TrendingUp className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">7+ Years Experience</h3>
                      <p className="text-muted-foreground">
                        Since 2017, we've successfully purchased hundreds of properties across the Treasure Valley. We understand Idaho's real estate market and close deals efficiently.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover-elevate transition-all duration-200">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Local Market Expertise</h3>
                      <p className="text-muted-foreground">
                        As Treasure Valley locals, we understand the nuances of every neighborhood from Boise to Middleton. Our offers reflect accurate local market knowledge.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
      {/* Our Core Values */}
      <section className="py-16 md:py-24">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Our Core Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="hover-elevate transition-all duration-200">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Heart className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Integrity & Transparency</h3>
                      <p className="text-muted-foreground">
                        We believe in complete transparency. Our cash offers are straightforward with no hidden fees, surprise deductions, or last-minute changes. What we offer is what you get.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover-elevate transition-all duration-200">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Handshake className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Compassionate Service</h3>
                      <p className="text-muted-foreground">
                        We understand that selling your home often comes during challenging times. We treat every homeowner with respect, empathy, and professionalism.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover-elevate transition-all duration-200">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Customer First</h3>
                      <p className="text-muted-foreground">
                        Your situation, your timeline, your needs come first. We're here to provide solutions that work for you, not pressure you into decisions.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover-elevate transition-all duration-200">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Award className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Professional Excellence</h3>
                      <p className="text-muted-foreground">
                        We maintain high standards in every transaction—from our initial offer to closing day. Professional, reliable, and efficient service every time.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
      {/* What Sets Us Apart */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">What Sets Us Apart</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-1">Local Treasure Valley Buyers</h3>
                  <p className="text-muted-foreground">
                    We're not a national franchise or out-of-state investor. We're local Idahoans who know the Boise metro market inside and out, ensuring fair and accurate offers.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-1">Any Situation, Any Condition</h3>
                  <p className="text-muted-foreground">
                    Foreclosure, divorce, inherited property, relocation, downsizing, or simply want to avoid the hassle of traditional selling—we buy houses in any situation.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-1">Fast & Reliable Process</h3>
                  <p className="text-muted-foreground">
                    Get your cash offer within 24 hours. Close in as little as 7 days, or take up to 90 days if you need more time. We're flexible and work around your schedule.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-1">No Hassle, No Repairs Required</h3>
                  <p className="text-muted-foreground">
                    Skip the cleaning, repairs, staging, open houses, and endless showings. Sell your house as-is and move on with your life stress-free.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-1">Real Cash Buyers</h3>
                  <p className="text-muted-foreground">
                    We have the funds ready to close. No waiting for loan approvals or financing contingencies. When we make an offer, we can close.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-1">Proven Track Record</h3>
                  <p className="text-muted-foreground">
                    Hundreds of satisfied homeowners across Boise, Meridian, Eagle, Kuna, Star, and Middleton have successfully sold to us since 2017.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Our Guarantee */}
      <section className="py-16 md:py-24">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Our Guarantee</h2>
            <div className="space-y-6 mb-12">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-1">Fair & Honest Offers</h3>
                  <p className="text-muted-foreground">
                    We provide competitive cash offers based on current market data, comparable sales, and property condition. Our offers reflect real market value, not lowball tactics.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-1">No Obligation Consultation</h3>
                  <p className="text-muted-foreground">
                    Request your free cash offer with absolutely no obligation. Review our offer, take your time, and only proceed if it makes sense for your situation.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-1">Zero Fees or Commissions</h3>
                  <p className="text-muted-foreground">
                    We cover all closing costs. No realtor commissions (typically 5-6%), no inspection fees, no appraisal costs, no repair expenses. You keep the full offer amount.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-1">Transparent Process</h3>
                  <p className="text-muted-foreground">
                    Every step is clearly explained. You'll know exactly what to expect from initial offer through closing. No surprises, no hidden terms, no confusing paperwork.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-1">Close on Your Schedule</h3>
                  <p className="text-muted-foreground">
                    Need to close quickly? We can close in 7-14 days. Need more time? Take 60-90 days. The timeline is entirely up to you.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 rounded-md bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Fair Pricing</h3>
                <p className="text-sm text-muted-foreground">
                  Competitive cash offers based on real market data and honest evaluation
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 rounded-md bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Fast Process</h3>
                <p className="text-sm text-muted-foreground">
                  Get your offer in 24 hours, close in as little as 7 days
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 rounded-md bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">No Fees</h3>
                <p className="text-sm text-muted-foreground">
                  Zero commissions, closing costs, or hidden fees—keep 100% of the offer
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Community Involvement */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Serving the Treasure Valley</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="hover-elevate transition-all duration-200">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Local Since 2017</h3>
                      <p className="text-muted-foreground">
                        Proud to serve our local community for over 7 years. We've helped hundreds of homeowners across Boise, Meridian, Eagle, Kuna, Star, and Middleton.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover-elevate transition-all duration-200">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Heart className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Locally Owned & Operated</h3>
                      <p className="text-muted-foreground">
                        As a local Idaho business, we're invested in our community's success. We treat every homeowner like a neighbor because they are.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover-elevate transition-all duration-200">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Handshake className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Helping Idaho Families</h3>
                      <p className="text-muted-foreground">
                        We specialize in helping homeowners navigate challenging situations with dignity and fair treatment. Every transaction is handled with care and respect.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover-elevate transition-all duration-200">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <BarChart3 className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Market Expertise</h3>
                      <p className="text-muted-foreground">
                        Deep knowledge of Treasure Valley real estate trends, neighborhoods, and values ensures you receive competitive, data-driven offers.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
      {/* CTA */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">
              Ready to Get Your Cash Offer?
            </h2>
            <p className="text-lg text-primary-foreground/90">
              Get a fair, no-obligation cash offer for your house in less than 24 hours
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild data-testid="button-get-offer">
                <Link href="/get-quote">Get Your Cash Offer</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" data-testid="button-contact">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
