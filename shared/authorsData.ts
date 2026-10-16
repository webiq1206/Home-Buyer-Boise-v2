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
    slug: "luke-caldwell",
    name: "Luke Caldwell",
    jobTitle: "Founder",
    bio: "",
    expertise: [],
  },
];

export function getAuthorBySlug(slug: string): AuthorData | undefined {
  return AUTHORS.find((a) => a.slug === slug);
}

export function getAllAuthorSlugs(): string[] {
  return AUTHORS.map((a) => a.slug);
}

export function getAuthorSlugForName(name: string): string {
  if (name.toLowerCase().includes("luke")) return "luke-caldwell";
  return "home-buyer-boise-team";
}
