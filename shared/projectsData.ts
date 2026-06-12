export interface ProjectData {
  slug: string;
  title: string;
  metaDescription: string;
  serviceSlug: string;
  citySlug: string;
  neighborhood: string;
  situation: string;
  solution: string;
  timeline: string;
  outcome: string;
  testimonialQuote?: string;
  customerName?: string;
}

export const PROJECTS: ProjectData[] = [
  {
    slug: "boise-inherited-north-end",
    title: "Inherited North End Boise Home — 10-Day Estate Sale",
    metaDescription:
      "How Home Buyer Boise helped siblings sell an inherited North End bungalow in 10 days without repairs or cleanout.",
    serviceSlug: "inherited-property",
    citySlug: "boise",
    neighborhood: "North End",
    situation:
      "Three siblings inherited a 1940s North End bungalow filled with decades of belongings while living out of state.",
    solution:
      "We provided a cash offer based on North End comps, bought as-is with contents included, and coordinated with their probate attorney.",
    timeline: "10 days from accepted offer to closing",
    outcome: "Heirs received net proceeds without traveling to Idaho for repairs or cleanout.",
    testimonialQuote:
      "They made a stressful inheritance simple. We took what we wanted and they handled the rest.",
    customerName: "The M. Family",
  },
  {
    slug: "meridian-relocation-paramount",
    title: "Meridian Relocation Sale — Closed Before Job Start Date",
    metaDescription:
      "Meridian homeowner sold to Home Buyer Boise before an out-of-state relocation with a 14-day closing.",
    serviceSlug: "relocation-sale",
    citySlug: "meridian",
    neighborhood: "Paramount",
    situation:
      "A Micron transfer required the family to report to Austin in three weeks while their Paramount home was still occupied.",
    solution:
      "We closed in 14 days as-is, letting them pack after acceptance without showings or HOA resale delays.",
    timeline: "14 days",
    outcome: "Seller met employer relocation proof-of-sale requirements with funds for their Texas move.",
    customerName: "Relocated Meridian Seller",
  },
  {
    slug: "nampa-foreclosure-lake-lowell",
    title: "Nampa Pre-Foreclosure — Equity Preserved Before Auction",
    metaDescription:
      "Nampa homeowner avoided foreclosure on a Lake Lowell area home with a fast cash sale.",
    serviceSlug: "avoid-foreclosure",
    citySlug: "nampa",
    neighborhood: "Lake Lowell",
    situation:
      "Missed payments after medical leave led to a trustee sale date six weeks out on a Lake Lowell area home.",
    solution:
      "We expedited title, paid off the mortgage at closing, and distributed remaining equity to the owner.",
    timeline: "12 days",
    outcome: "Foreclosure cancelled; credit impact minimized versus completed foreclosure.",
    customerName: "Nampa Homeowner",
  },
  {
    slug: "eagle-divorce-banbury",
    title: "Eagle Divorce Sale — Private Banbury Estate Closing",
    metaDescription:
      "Discrete Eagle divorce property sale with fair proceeds split at closing.",
    serviceSlug: "sell-house-divorce",
    citySlug: "eagle",
    neighborhood: "Banbury",
    situation:
      "Joint owners in a Banbury estate needed a neutral sale without months of public showings during divorce proceedings.",
    solution:
      "We purchased off-market, worked through attorneys, and wired split proceeds per marital settlement.",
    timeline: "18 days",
    outcome: "Both parties moved forward without carrying joint mortgage payments through a listing season.",
    customerName: "Eagle Sellers",
  },
  {
    slug: "kuna-as-is-crimson-point",
    title: "Kuna As-Is Sale — Failed Inspection Turned Cash Closing",
    metaDescription:
      "Kuna seller sold as-is after a retail buyer cancelled over foundation concerns in Crimson Point.",
    serviceSlug: "sell-as-is",
    citySlug: "kuna",
    neighborhood: "Crimson Point",
    situation:
      "A pending Crimson Point sale collapsed when the buyer's inspector flagged foundation and roof age.",
    solution:
      "We repriced the property as-is for investor renovation and closed without seller repairs.",
    timeline: "9 days after prior contract fell through",
    outcome: "Seller avoided restarting a 90-day listing cycle and contractor bids.",
    customerName: "Crimson Point Seller",
  },
  {
    slug: "caldwell-probate-indian-creek",
    title: "Caldwell Probate Sale — Out-of-State Executor",
    metaDescription:
      "Executor sold a Caldwell Indian Creek probate property without traveling from Washington.",
    serviceSlug: "probate-sale",
    citySlug: "caldwell",
    neighborhood: "Indian Creek",
    situation:
      "An executor in Washington managed a vacant Caldwell probate home with overdue utilities and yard maintenance fines.",
    solution:
      "We bought with contents, paid arrears at closing, and coordinated with Canyon County probate counsel remotely.",
    timeline: "21 days",
    outcome: "Estate settled with a single buyer and no contractor spend from heirs.",
    customerName: "Estate Executor",
  },
];

export function getAllProjectSlugs(): string[] {
  return PROJECTS.map((p) => p.slug);
}

export function getProjectBySlug(slug: string): ProjectData | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}
