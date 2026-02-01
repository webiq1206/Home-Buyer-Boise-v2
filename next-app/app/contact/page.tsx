import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Home Buyer Boise | Call (208) 405-2275",
  description: "Contact Home Buyer Boise today for a free cash offer on your house. Call (208) 405-2275 or fill out our form. We serve Boise, Meridian, Eagle, Kuna and more.",
  alternates: {
    canonical: "https://homebuyerboise.com/contact",
  },
};

export default function ContactPage() {
  return (
    <>
        {/* Hero */}
        <section className="bg-gradient-to-br from-navy to-primary text-white py-16 lg:py-24">
          <div className="container px-4">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
              <p className="text-xl text-white/90">
                Ready to sell your house fast? Get in touch with our team today for a free, no-obligation cash offer.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Info */}
        <section className="py-16 lg:py-24">
          <div className="container px-4">
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold mb-8">Get In Touch</h2>
                <div className="space-y-6">
                  <Card>
                    <CardContent className="flex items-start gap-4 pt-6">
                      <Phone className="h-6 w-6 text-primary flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold mb-1">Phone</h3>
                        <a href="tel:2084052275" className="text-primary hover:underline text-lg">
                          (208) 405-2275
                        </a>
                        <p className="text-sm text-muted-foreground mt-1">Call or text anytime</p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="flex items-start gap-4 pt-6">
                      <Mail className="h-6 w-6 text-primary flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold mb-1">Email</h3>
                        <a href="mailto:connect@buymyhouse.co" className="text-primary hover:underline">
                          connect@buymyhouse.co
                        </a>
                        <p className="text-sm text-muted-foreground mt-1">We respond within 24 hours</p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="flex items-start gap-4 pt-6">
                      <MapPin className="h-6 w-6 text-primary flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold mb-1">Office</h3>
                        <p>3024 W Fairview Ave</p>
                        <p>Boise, ID 83702</p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="flex items-start gap-4 pt-6">
                      <Clock className="h-6 w-6 text-primary flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold mb-1">Hours</h3>
                        <p>Monday - Saturday: 8am - 7pm</p>
                        <p>Sunday: By appointment</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Get Your Free Cash Offer</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-6">
                      Fill out our quick form to get started with your free, no-obligation cash offer. We&apos;ll respond within 24 hours.
                    </p>
                    <Button size="lg" className="w-full" asChild>
                      <Link href="/get-quote">Get Your Cash Offer Now</Link>
                    </Button>
                  </CardContent>
                </Card>

                <div className="mt-8">
                  <h3 className="font-semibold text-lg mb-4">Service Areas</h3>
                  <p className="text-muted-foreground">
                    We buy houses throughout the Treasure Valley including Boise, Meridian, Eagle, Kuna, Star, Middleton, Nampa, and Caldwell. If you&apos;re in Ada County or Canyon County, we can help!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
    </>
  );
}
