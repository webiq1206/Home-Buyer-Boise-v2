import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Link from "next/link";
import { Phone, Mail, MapPin, Clock, MessageSquare } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { JsonLd } from "@/components/JsonLd";
import {
  generateLocalBusinessSchema,
  generateWebPageSchema,
  generateBreadcrumbSchema,
} from "@/lib/schema";

export const metadata: Metadata = {
  title: "Contact Home Buyer Boise | Call (208) 405-2275",
  description: "Contact Home Buyer Boise today for a free cash offer on your house. Call (208) 405-2275 or fill out our form. We serve Boise, Meridian, Eagle, Kuna and more.",
  alternates: {
    canonical: "https://homebuyerboise.com/contact",
  },
};

export default function ContactPage() {
  const webPageSchema = generateWebPageSchema({
    name: "Contact Home Buyer Boise",
    description:
      "Contact Home Buyer Boise for a free cash offer. Call (208) 405-2275 or send us a message.",
    url: "/contact",
    breadcrumbs: [
      { name: "Home", url: "/" },
      { name: "Contact", url: "/contact" },
    ],
  });
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Contact", url: "/contact" },
  ]);
  const localBusinessSchema = generateLocalBusinessSchema();

  return (
    <>
        <JsonLd data={[webPageSchema, breadcrumbSchema, localBusinessSchema]} />
        {/* Hero */}
        <section className="bg-gradient-to-br from-navy to-primary text-white py-12 lg:py-16">
          <div className="container px-4">
            <div className="max-w-3xl">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">Contact Us</h1>
              <p className="text-lg md:text-xl text-white/90">
                Ready to sell your house fast? Get in touch with our team today for a free, no-obligation cash offer.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Info */}
        <section className="py-10 lg:py-16">
          <div className="container px-4">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-6">Get In Touch</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-4">
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

                <div className="mt-8">
                  <h3 className="font-semibold text-lg mb-4">Service Areas</h3>
                  <p className="text-muted-foreground">
                    We buy houses throughout the Treasure Valley including Boise, Meridian, Eagle, Kuna, Star, Middleton, Nampa, and Caldwell. If you&apos;re in Ada County or Canyon County, we can help!
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageSquare className="h-5 w-5" />
                      Send Us a Message
                    </CardTitle>
                    <CardDescription>
                      Have a question? Fill out the form below and we&apos;ll get back to you within 24 hours.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ContactForm source="contact-page" />
                  </CardContent>
                </Card>

                <Card className="bg-primary/5 border-primary/20">
                  <CardContent className="pt-6">
                    <h4 className="font-semibold mb-2">Ready for Your Cash Offer?</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Skip the form and go straight to our quote wizard for a detailed property evaluation.
                    </p>
                    <Button asChild className="w-full bg-gold text-black hover:bg-gold/90">
                      <Link href="/get-quote">Get Your Free Cash Offer</Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
    </>
  );
}
