import { SERVICE_CONTENT, SERVICES } from "./servicesData";
import { CITIES } from "./contentData";

export interface FaqItem {
  question: string;
  answer: string;
  source?: string;
}

export function getSitewideFaqs(): FaqItem[] {
  const faqs: FaqItem[] = [
    {
      question: "How fast can you buy my house in the Treasure Valley?",
      answer:
        "We can close in as little as 7 days when title is clear. Most sellers choose 10–14 days. Every offer is reviewed by a real person on our team — we do not publish automated binding offers.",
      source: "General",
    },
    {
      question: "Do I need to make repairs before selling?",
      answer:
        "No. We buy houses as-is throughout Boise, Meridian, Eagle, Kuna, Nampa, Caldwell, and surrounding areas. Take what you want and leave the rest.",
      source: "General",
    },
    {
      question: "Are there any fees or commissions?",
      answer:
        "Zero. We pay standard seller closing costs and charge no realtor commissions. The agreed cash price is your net unless you choose to clear optional liens from proceeds.",
      source: "Pricing",
    },
    {
      question: "Is Home Buyer Boise a local company?",
      answer:
        "Yes. We are local Idaho cash buyers serving the Treasure Valley since 2018 — not a national call-center franchise.",
      source: "About",
    },
  ];

  const sellFast = SERVICE_CONTENT["sell-house-fast"];
  if (sellFast?.faqs) {
    faqs.push(
      ...sellFast.faqs.slice(0, 3).map((f) => ({
        ...f,
        source: "Sell House Fast",
      }))
    );
  }

  const boise = CITIES.find((c) => c.slug === "boise");
  if (boise?.faqs) {
    faqs.push(
      ...boise.faqs.slice(0, 2).map((f) => ({
        ...f,
        source: "Boise",
      }))
    );
  }

  for (const service of SERVICES.slice(0, 3)) {
    const content = SERVICE_CONTENT[service.slug];
    if (content?.faqs?.[0]) {
      faqs.push({ ...content.faqs[0], source: service.name });
    }
  }

  return faqs;
}
