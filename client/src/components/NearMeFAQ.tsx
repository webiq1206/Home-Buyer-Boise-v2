import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

interface NearMeFAQProps {
  city?: string;
  serviceName?: string;
}

export function NearMeFAQ({ city = "Boise", serviceName = "cash home buying" }: NearMeFAQProps) {
  const faqs = [
    {
      question: `How fast can you buy my house in ${city}?`,
      answer: `HomeBuyerBoise can close on your ${city} property in as little as 7 days. We're local cash buyers serving ${city} and all Treasure Valley cities. Unlike traditional sales that take 30-60 days, we can move at your pace - whether that's a week or 90 days. Call (208) 352-2011 for your free cash offer today.`,
    },
    {
      question: `Do you buy houses in any condition in ${city}?`,
      answer: `Yes! We buy houses in any condition throughout ${city} and the Treasure Valley. Whether your home needs major repairs, has foundation issues, outdated interiors, or is move-in ready - we'll make you a fair cash offer. You don't need to fix anything or even clean. We buy as-is.`,
    },
    {
      question: `How do I get a cash offer for my ${city} home?`,
      answer: `Getting your cash offer is simple! Fill out our online form or call (208) 352-2011. Tell us about your property and situation. We'll research comparable sales and present you with a fair, no-obligation cash offer within 24 hours - often the same day.`,
    },
    {
      question: `What areas do you serve in the Treasure Valley?`,
      answer: `We buy houses throughout the entire Treasure Valley including ${city}, Boise, Meridian, Eagle, Kuna, Star, and Middleton. As local Idaho cash home buyers, we're committed to serving all these communities with fast, fair offers and flexible closing timelines.`,
    },
    {
      question: `Why choose HomeBuyerBoise over listing with a realtor?`,
      answer: `When you need to sell fast in ${city}, cash buyers offer major advantages: no realtor commissions (save 5-6%), no repairs or cleaning needed, no showings or open houses, close in days not months, and we pay all closing costs. You receive your offer amount minus nothing - what we offer is what you get at closing.`,
    },
    {
      question: `Are there any fees when selling to HomeBuyerBoise?`,
      answer: `Absolutely zero fees! Unlike traditional sales where you pay 5-6% realtor commissions plus 2-3% closing costs, we cover everything. No commissions, no closing costs, no inspection fees, no appraisal fees. The cash offer we present is exactly what you'll receive at closing - 100% of it.`,
    },
  ];

  return (
    <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20" data-testid="near-me-faq">
      <CardHeader>
        <div className="flex items-center gap-2">
          <HelpCircle className="h-6 w-6 text-primary" />
          <CardTitle className="text-2xl">Frequently Asked Questions</CardTitle>
        </div>
        <CardDescription className="text-base">
          Common questions about selling your house for cash in {city}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full" data-testid="near-me-faq-accordion">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} data-testid={`faq-item-${index}`}>
              <AccordionTrigger className="text-left text-base font-semibold hover:text-primary" data-testid={`faq-trigger-${index}`}>
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed" data-testid={`faq-content-${index}`}>
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}
