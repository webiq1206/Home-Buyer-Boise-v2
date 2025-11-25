import { Helmet } from "react-helmet-async";
import { QuoteWizard } from "@/components/QuoteWizard";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, Clock, Star } from "lucide-react";
import { generateSEOMetadata, BUSINESS_INFO, generateLocalBusinessSchema } from "@/lib/seo";
import { generateOrganizationSchema, generateBreadcrumbSchema } from "@/lib/schema";
import heroBackground from "@assets/Home Buyer Boise Background Image_1764010277862.png";

export default function Contact() {
  const seoData = generateSEOMetadata({
    serviceName: "Contact Us",
    serviceSlug: "contact",
    isHomePage: false,
  });

  const localBusinessSchema = generateLocalBusinessSchema();
  const organizationSchema = generateOrganizationSchema();
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Contact", url: "/contact" },
  ]);

  return (
    <div className="flex flex-col">
      <Helmet>
        <title>Contact Us - Get Your Cash Offer Today | HomeBuyerBoise</title>
        <meta name="description" content="Contact HomeBuyerBoise for a free, no-obligation cash offer on your house. Call (208) 405-CASH or fill out our form. We buy houses in Boise, Meridian, Eagle, Kuna, and throughout the Treasure Valley." />
        <meta name="keywords" content="contact cash home buyer Boise, sell house fast Boise contact, get cash offer for house, Treasure Valley home buyer contact" />
        <link rel="canonical" href="https://homebuyerboise.com/contact" />
        
        <meta property="og:title" content="Contact HomeBuyerBoise - Get Your Cash Offer" />
        <meta property="og:description" content="Ready to sell your house fast? Contact us for a free, no-obligation cash offer within 24 hours." />
        <meta property="og:url" content="https://homebuyerboise.com/contact" />
        <meta property="og:type" content="website" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contact HomeBuyerBoise" />
        <meta name="twitter:description" content="Get your free cash offer today. We buy houses in any condition." />
        
        <script type="application/ld+json">
          {JSON.stringify(localBusinessSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(organizationSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      </Helmet>
      {/* Hero */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={heroBackground} alt="" className="w-full h-full object-cover opacity-60" width="1920" height="1080" loading="eager" />
        </div>
        <div className="absolute inset-0 z-[1] bg-background/60"></div>
        <div className="container px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
              Contact Us
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Get your free, no-obligation cash offer in less than 24 hours
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information & Form */}
      <section className="py-16 md:py-24">
        <div className="container px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Contact Info */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-6">Get In Touch</h2>
                  <p className="text-muted-foreground mb-6">
                    Ready to sell your house fast? Fill out the form or contact us directly for your cash offer.
                  </p>
                </div>

                <Card className="hover-elevate">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Phone className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Phone</h3>
                        <a href="tel:2084052274" className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-phone">
                          (208) 405-CASH
                        </a>
                        <p className="text-xs text-muted-foreground mt-1">
                          Call us for immediate assistance
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover-elevate">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Mail className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Email</h3>
                        <a href="mailto:hello@homebuyerboise.com" className="text-muted-foreground hover:text-primary transition-colors break-all" data-testid="link-email">
                          hello@homebuyerboise.com
                        </a>
                        <p className="text-xs text-muted-foreground mt-1">
                          We respond within 24 hours
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover-elevate">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <MapPin className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Service Area</h3>
                        <p className="text-sm text-muted-foreground">
                          3024 W Fairview Ave<br />
                          Boise, ID 83702
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                          Serving Boise, Meridian, Eagle, Kuna, Star, Middleton & surrounding areas
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover-elevate">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Clock className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Business Hours</h3>
                        <div className="text-sm text-muted-foreground space-y-1">
                          <p>Monday - Friday: 8:00 AM - 6:00 PM</p>
                          <p>Saturday: 9:00 AM - 3:00 PM</p>
                          <p>Sunday: Closed</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Quote Form */}
              <div className="lg:col-span-2">
                <QuoteWizard />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Google Maps Location */}
      <section className="py-16">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="text-3xl font-bold">Our Location</h2>
            <p className="text-muted-foreground">
              Based in Boise, Idaho. We buy houses throughout the Treasure Valley area.
            </p>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps?q=3024+W+Fairview+Ave,+Boise,+ID+83702&output=embed"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="HomeBuyerBoise Location - 3024 W Fairview Ave, Boise, ID 83702"
                data-testid="map-location"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Button
                asChild
                variant="default"
                size="lg"
                data-testid="button-get-directions"
              >
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=3024+W+Fairview+Ave,+Boise,+ID+83702"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MapPin className="h-5 w-5 mr-2" />
                  Get Directions
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                data-testid="button-leave-review"
              >
                <a
                  href="https://share.google/zfTGJIl2GpbrtQ7iR"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Star className="h-5 w-5 mr-2" />
                  Leave a Google Review
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Info */}
      <section className="py-16 bg-muted/30">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="text-3xl font-bold">What Happens Next?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
              <div>
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  1
                </div>
                <h3 className="font-semibold text-lg mb-2">Property Review</h3>
                <p className="text-sm text-muted-foreground">
                  We review your property details and research comparable sales in your area
                </p>
              </div>
              <div>
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  2
                </div>
                <h3 className="font-semibold text-lg mb-2">Cash Offer Presented</h3>
                <p className="text-sm text-muted-foreground">
                  Receive your fair, no-obligation cash offer within 24 hours—no waiting
                </p>
              </div>
              <div>
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  3
                </div>
                <h3 className="font-semibold text-lg mb-2">Close on Your Timeline</h3>
                <p className="text-sm text-muted-foreground">
                  Accept the offer and close in as little as 7 days, or take more time if needed
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
