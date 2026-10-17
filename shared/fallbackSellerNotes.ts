// Server-only seller notes. Loaded only when SHOW_UNVERIFIED_TRUST is on.
import "server-only";

export interface SellerNote {
  id: number;
  customerName: string;
  city: string;
  rating: string;
  situation: string;
  testimonial: string;
}

export const FALLBACK_TESTIMONIALS: SellerNote[] = [
  {
    id: 1,
    customerName: "Michael R.",
    city: "boise",
    rating: "5",
    situation: "Inherited Property",
    testimonial: "After inheriting my parents' home, I didn't know what to do. Home Buyer Boise made the process simple and stress-free. They gave me a fair cash offer and closed in just 10 days."
  },
  {
    id: 2,
    customerName: "Sarah & Tom K.",
    city: "meridian",
    rating: "5",
    situation: "Relocating",
    testimonial: "We had to relocate for work with only 3 weeks notice. Traditional selling wasn't an option. Home Buyer Boise bought our house quickly and we were able to move without the stress of showings."
  },
  {
    id: 3,
    customerName: "Jennifer L.",
    city: "nampa",
    rating: "5",
    situation: "Avoiding Foreclosure",
    testimonial: "I was behind on payments and facing foreclosure. Home Buyer Boise helped me sell quickly, pay off my mortgage, and walk away with cash in my pocket. They truly saved me."
  },
  {
    id: 4,
    customerName: "David M.",
    city: "eagle",
    rating: "5",
    situation: "Tired Landlord",
    testimonial: "After years of dealing with difficult tenants, I was done. Home Buyer Boise purchased my rental property as-is. No repairs, no cleaning, just a fair cash offer."
  },
  {
    id: 5,
    customerName: "Linda & James P.",
    city: "kuna",
    rating: "5",
    situation: "Downsizing",
    testimonial: "We needed to downsize quickly after retirement. Home Buyer Boise gave us a competitive offer and worked around our schedule. The whole team was professional and caring."
  },
  {
    id: 6,
    customerName: "Robert H.",
    city: "caldwell",
    rating: "5",
    situation: "Divorce Settlement",
    testimonial: "Going through a divorce is hard enough. Home Buyer Boise made selling our shared property easy. They handled everything and we both got our share quickly."
  }
];
