export interface AuthorData {
  slug: string;
  name: string;
  jobTitle: string;
  bio: string;
  expertise: string[];
  credentials?: string[];
}

export const AUTHORS: AuthorData[] = [
  {
    slug: "home-buyer-boise-team",
    name: "Home Buyer Boise Team",
    jobTitle: "Cash Home Buying Specialists",
    bio:
      "The Home Buyer Boise team has helped hundreds of Treasure Valley homeowners sell fast for cash since 2018. We specialize in as-is purchases, inherited properties, pre-foreclosure sales, and landlord exits across Ada and Canyon Counties.",
    expertise: [
      "Cash home acquisitions",
      "Probate and inherited property sales",
      "Pre-foreclosure solutions",
      "As-is property evaluation",
      "Treasure Valley market analysis",
    ],
    credentials: [
      "Certified Real Estate Investor",
      "Cash Buyer Network Member",
      "Serving Idaho since 2018",
    ],
  },
  {
    slug: "jared-brost",
    name: "Jared Brost",
    jobTitle: "Founder & Acquisitions Director",
    bio:
      "Jared founded Home Buyer Boise to give Idaho homeowners a transparent alternative to stressful traditional listings. He oversees property evaluations and ensures every offer is manually reviewed — never automated.",
    expertise: [
      "Residential acquisitions",
      "Distressed property evaluation",
      "Treasure Valley real estate markets",
      "Seller advocacy and education",
    ],
  },
];

export function getAuthorBySlug(slug: string): AuthorData | undefined {
  return AUTHORS.find((a) => a.slug === slug);
}

export function getAllAuthorSlugs(): string[] {
  return AUTHORS.map((a) => a.slug);
}

export function getAuthorSlugForName(name: string): string {
  if (name.toLowerCase().includes("jared")) return "jared-brost";
  return "home-buyer-boise-team";
}
