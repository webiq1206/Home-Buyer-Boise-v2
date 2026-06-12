import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getSitewideFaqs } from "@/shared/faqData";
import { JsonLd } from "@/components/JsonLd";
import {
  generateWebPageSchema,
  generateBreadcrumbSchema,
  generateFAQSchema,
} from "@/lib/schema";

export const metadata: Metadata = {
  title: "FAQ | Cash Home Buying Questions Answered",
  description:
    "Answers to common questions about selling your Boise area home for cash — timelines, fees, as-is sales, foreclosures, and inherited properties.",
  alternates: {
    canonical: "https://homebuyerboise.com/faq",
  },
};

export default function FaqPage() {
  const faqs = getSitewideFaqs();
  const faqSchema = generateFAQSchema(
    faqs.map((f) => ({ question: f.question, answer: f.answer }))
  );
  const webPageSchema = generateWebPageSchema({
    name: "Frequently Asked Questions",
    description: metadata.description as string,
    url: "/faq",
    breadcrumbs: [
      { name: "Home", url: "/" },
      { name: "FAQ", url: "/faq" },
    ],
  });
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "FAQ", url: "/faq" },
  ]);

  return (
    <>
      <JsonLd data={[webPageSchema, breadcrumbSchema, faqSchema]} />
      <section className="bg-gradient-to-br from-navy to-primary text-white py-12">
        <div className="container px-4 max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-white/90">
            Direct answers about selling your Treasure Valley home for cash.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container px-4 max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                  {faq.source && (
                    <p className="text-xs mt-2 text-muted-foreground/70">
                      Related: {faq.source}
                    </p>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-10 flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/get-quote">Get your free cash offer</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/pricing">See pricing details</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
