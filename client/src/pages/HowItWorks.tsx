import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { CheckCircle2, Phone, MapPin, DollarSign, FileText, Key, Clock } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      number: 1,
      icon: Phone,
      title: "Contact Us",
      description: "Call (208) 405-CASH or fill out our simple online form. Tell us about your property and situation - the conversation takes just 5 minutes.",
      details: ["No obligation", "Completely confidential", "Available 7 days/week"]
    },
    {
      number: 2,
      icon: MapPin,
      title: "Property Assessment",
      description: "We'll schedule a convenient time to see your property (or provide a remote offer if you prefer). We evaluate condition, location, and current market values.",
      details: ["Quick 15-minute visit", "Remote offers available", "No pressure walkthrough"]
    },
    {
      number: 3,
      icon: DollarSign,
      title: "Receive Your Cash Offer",
      description: "Within 24 hours, we'll present a fair, no-obligation cash offer. We explain exactly how we calculated the price - complete transparency.",
      details: ["24-hour turnaround", "Fair market value", "No hidden deductions"]
    },
    {
      number: 4,
      icon: FileText,
      title: "Review & Accept",
      description: "Take your time reviewing the offer. Ask questions. There's zero pressure. If you accept, we'll start the paperwork process immediately.",
      details: ["No pressure tactics", "Take time to decide", "Professional service"]
    },
    {
      number: 5,
      icon: Key,
      title: "Close on Your Timeline",
      description: "Choose your closing date - as fast as 7 days or take up to 90 days. We handle all paperwork, pay all closing costs, and wire your cash at closing.",
      details: ["You pick closing date", "We pay closing costs", "Cash at closing"]
    }
  ];

  const benefits = [
    { icon: CheckCircle2, text: "No realtor commissions (save 5-6%)" },
    { icon: CheckCircle2, text: "No repairs or cleaning needed" },
    { icon: CheckCircle2, text: "No showings or open houses" },
    { icon: CheckCircle2, text: "No buyer financing delays" },
    { icon: CheckCircle2, text: "We pay all closing costs" },
    { icon: CheckCircle2, text: "Close in as little as 7 days" },
  ];

  return (
    <>
      <Helmet>
        <title>How It Works - Sell Your House for Cash in 5 Simple Steps | HomeBuyerBoise</title>
        <meta 
          name="description" 
          content="Learn how selling your house to HomeBuyerBoise works. Get a fair cash offer in 24 hours, choose your closing date, and get paid. No fees, no repairs, no hassle." 
        />
        <meta name="keywords" content="how to sell house for cash, cash home buying process, sell house fast Boise, home selling steps Idaho" />
        <link rel="canonical" href="https://homebuyerboise.com/how-it-works" />
        
        <meta property="og:title" content="How It Works - Sell Your House for Cash | HomeBuyerBoise" />
        <meta property="og:description" content="Simple 5-step process: Contact us, get assessed, receive cash offer, review, and close on your timeline." />
        <meta property="og:url" content="https://homebuyerboise.com/how-it-works" />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="flex flex-col">
        {/* Hero Section */}
        <section className="relative py-24 md:py-32 bg-gradient-to-br from-primary via-primary/90 to-primary/70">
          <div className="absolute inset-0 bg-grid-white/5"></div>
          
          <div className="container px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white" data-testid="heading-hero">
                How Selling Your House for Cash Works
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
                A simple, transparent 5-step process from first contact to cash in hand
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" asChild data-testid="button-get-offer">
                  <Link href="/get-quote">Get Your Cash Offer</Link>
                </Button>
                <Button size="lg" variant="outline" className="bg-white/10 text-white border-white/30 hover:bg-white/20" asChild data-testid="button-call">
                  <a href="tel:2084052274">
                    <Phone className="mr-2 h-5 w-5" />
                    (208) 405-CASH
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Process Steps */}
        <section className="py-16 md:py-20">
          <div className="container px-4">
            <div className="max-w-5xl mx-auto">
              <div className="space-y-12">
                {steps.map((step, index) => (
                  <Card key={index} className="hover-elevate transition-all duration-300" data-testid={`step-card-${index}`}>
                    <CardContent className="p-8">
                      <div className="flex flex-col md:flex-row gap-6">
                        {/* Step Number & Icon */}
                        <div className="flex-shrink-0">
                          <div className="relative">
                            <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                              <step.icon className="h-10 w-10 text-primary" strokeWidth={2} />
                            </div>
                            <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-white font-bold flex items-center justify-center text-sm">
                              {step.number}
                            </div>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold mb-3 text-foreground">{step.title}</h3>
                          <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
                            {step.description}
                          </p>
                          <div className="flex flex-wrap gap-3">
                            {step.details.map((detail, idx) => (
                              <div key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                                <CheckCircle2 className="h-4 w-4 text-primary" />
                                <span>{detail}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-16 bg-muted/30">
          <div className="container px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-8">Typical Timeline</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <Card>
                  <CardContent className="pt-6">
                    <Clock className="h-12 w-12 text-primary mx-auto mb-4" />
                    <div className="text-3xl font-bold text-primary mb-2">24 Hours</div>
                    <p className="text-muted-foreground">From first contact to cash offer in hand</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <Clock className="h-12 w-12 text-primary mx-auto mb-4" />
                    <div className="text-3xl font-bold text-primary mb-2">7-14 Days</div>
                    <p className="text-muted-foreground">Average time to closing (you choose the date)</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <Clock className="h-12 w-12 text-primary mx-auto mb-4" />
                    <div className="text-3xl font-bold text-primary mb-2">Same Day</div>
                    <p className="text-muted-foreground">Cash wired to your account at closing</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16">
          <div className="container px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-12 text-center">Why Sell to HomeBuyerBoise?</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3" data-testid={`benefit-${index}`}>
                    <benefit.icon className="h-6 w-6 text-primary flex-shrink-0" />
                    <span className="text-lg text-foreground">{benefit.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-gradient-to-br from-primary to-primary/80">
          <div className="container px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                Ready to Get Started?
              </h2>
              <p className="text-xl text-white/90 mb-8">
                Get your no-obligation cash offer in 24 hours
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" asChild data-testid="button-cta-quote">
                  <Link href="/get-quote">Request Your Cash Offer</Link>
                </Button>
                <Button size="lg" variant="outline" className="bg-white/10 text-white border-white/30 hover:bg-white/20" asChild data-testid="button-cta-call">
                  <a href="tel:2084052274">
                    <Phone className="mr-2 h-5 w-5" />
                    Call (208) 405-CASH
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
