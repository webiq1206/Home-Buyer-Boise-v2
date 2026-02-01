// Services Data for Home Buyer Boise
// This drives service pages and SEO

export interface ServiceData {
  slug: string;
  name: string;
  shortName: string;
  title: string;
  metaDescription: string;
  h1: string;
  keywords: string[];
  icon: string;
}

export const SERVICES: ServiceData[] = [
  {
    slug: "sell-house-fast",
    name: "Sell House Fast",
    shortName: "Sell Fast",
    title: "Sell Your House Fast in Boise Metro | Cash Offer in 24 Hours",
    metaDescription: "Need to sell your house fast in Boise, Meridian, Eagle, or Kuna? Get a fair cash offer in 24 hours. No fees, no repairs, close on your timeline.",
    h1: "Sell Your House Fast for Cash",
    keywords: ["sell house fast", "sell my house fast", "quick house sale", "fast home sale"],
    icon: "Zap",
  },
  {
    slug: "we-buy-houses",
    name: "We Buy Houses",
    shortName: "We Buy Houses",
    title: "We Buy Houses for Cash in Boise Metro | Any Condition",
    metaDescription: "We buy houses in any condition across Boise, Meridian, Eagle, Kuna, Star, and Middleton. Fair cash offers, no realtor fees, close fast.",
    h1: "We Buy Houses in the Treasure Valley",
    keywords: ["we buy houses", "buy my house", "house buyers", "cash for houses"],
    icon: "Home",
  },
  {
    slug: "cash-offer",
    name: "Cash Offer",
    shortName: "Cash Offer",
    title: "Get a Cash Offer on Your House | Boise Cash Home Buyers",
    metaDescription: "Get a fair, no-obligation cash offer on your Boise area home in 24 hours. No repairs, no fees, close when you're ready.",
    h1: "Get a Fair Cash Offer Today",
    keywords: ["cash offer", "cash home offer", "instant cash offer", "fair cash offer"],
    icon: "DollarSign",
  },
  {
    slug: "sell-as-is",
    name: "Sell As-Is",
    shortName: "Sell As-Is",
    title: "Sell Your House As-Is in Boise | No Repairs Needed",
    metaDescription: "Sell your house as-is in Boise without making any repairs. We buy houses in any condition - foundation issues, outdated kitchens, fire damage, and more.",
    h1: "Sell Your House As-Is - No Repairs Required",
    keywords: ["sell as is", "sell house as is", "no repairs needed", "any condition"],
    icon: "Wrench",
  },
  {
    slug: "inherited-property",
    name: "Inherited Property",
    shortName: "Inherited",
    title: "Sell Inherited Property Fast | Boise Estate Home Buyers",
    metaDescription: "Inherited a house in Boise? Sell it quickly without repairs or clean-out. Fair cash offers for inherited properties. Probate assistance available.",
    h1: "Sell Your Inherited Property Quickly",
    keywords: ["inherited property", "inherited house", "estate sale", "probate house sale"],
    icon: "Key",
  },
  {
    slug: "avoid-foreclosure",
    name: "Avoid Foreclosure",
    shortName: "Foreclosure",
    title: "Stop Foreclosure in Boise | Sell Your House to Avoid Foreclosure",
    metaDescription: "Facing foreclosure in Boise? Sell your house fast and avoid the damage to your credit. We can close quickly to help you move forward.",
    h1: "Avoid Foreclosure - Sell Your House Fast",
    keywords: ["avoid foreclosure", "stop foreclosure", "foreclosure help", "pre-foreclosure sale"],
    icon: "ShieldAlert",
  },
  {
    slug: "sell-house-divorce",
    name: "Sell House in Divorce",
    shortName: "Divorce",
    title: "Sell House During Divorce in Boise | Quick Cash Sale",
    metaDescription: "Going through a divorce and need to sell your house fast in Boise? We offer fair cash offers and a quick, private closing process.",
    h1: "Sell Your House Fast During Divorce",
    keywords: ["divorce house sale", "sell house divorce", "sell home divorce", "split assets quickly"],
    icon: "Users",
  },
  {
    slug: "relocation-sale",
    name: "Relocation Sale",
    shortName: "Relocating",
    title: "Selling Your Boise Home for Relocation | Fast Cash Sale",
    metaDescription: "Relocating for work and need to sell your Boise home fast? Get a cash offer today and close on your timeline - even if you've already moved.",
    h1: "Relocating? Sell Your Boise Home Fast",
    keywords: ["relocation home sale", "job transfer sale", "sell house relocating", "moving quickly"],
    icon: "Plane",
  },
  {
    slug: "problem-tenants",
    name: "Problem Tenants",
    shortName: "Tenants",
    title: "Sell Rental Property with Problem Tenants | Boise",
    metaDescription: "Tired of dealing with problem tenants in your Boise rental property? Sell it fast for cash - we handle the tenants so you don't have to.",
    h1: "Sell Your Rental Property with Problem Tenants",
    keywords: ["problem tenants", "rental property sale", "bad tenants", "sell with tenants"],
    icon: "AlertTriangle",
  },
  {
    slug: "probate-sale",
    name: "Probate Sale",
    shortName: "Probate",
    title: "Probate House Sale in Boise | Sell Estate Property Fast",
    metaDescription: "Need to sell a house in probate in Boise? We buy probate properties for cash. Flexible timelines, no repairs needed.",
    h1: "Sell Probate Property Fast in Boise",
    keywords: ["probate sale", "probate house", "estate property", "probate property sale"],
    icon: "FileText",
  },
  {
    slug: "tax-liens",
    name: "Tax Liens",
    shortName: "Tax Liens",
    title: "Sell House with Tax Liens in Boise | Get Cash Fast",
    metaDescription: "Have tax liens on your Boise property? We buy houses with tax liens and handle the lien payoff at closing. Get a fair cash offer today.",
    h1: "Sell Your House with Tax Liens",
    keywords: ["tax liens", "sell house tax liens", "property tax debt", "IRS liens"],
    icon: "Receipt",
  },
  {
    slug: "downsizing",
    name: "Downsizing",
    shortName: "Downsizing",
    title: "Downsizing Your Boise Home | Sell Fast for Cash",
    metaDescription: "Ready to downsize your Boise home? Sell quickly for cash without the hassle of repairs, showings, or staging. Close when you're ready.",
    h1: "Downsizing? Sell Your Boise Home Fast",
    keywords: ["downsizing", "sell large home", "empty nesters", "retire downsizing"],
    icon: "TrendingDown",
  },
  {
    slug: "fire-water-damage",
    name: "Fire & Water Damage",
    shortName: "Damage",
    title: "Sell Fire or Water Damaged House in Boise | As-Is Cash Offer",
    metaDescription: "Have a fire or water damaged house in Boise? Sell it as-is for cash. No repairs needed, no insurance claims to wait for.",
    h1: "Sell Your Fire or Water Damaged House",
    keywords: ["fire damage house", "water damage house", "sell damaged home", "flood damage"],
    icon: "Flame",
  },
  {
    slug: "hoarder-house",
    name: "Hoarder House",
    shortName: "Hoarder",
    title: "Sell Hoarder House in Boise | No Clean-Out Needed",
    metaDescription: "Selling a hoarder house in Boise? We buy houses in any condition. No clean-out needed - sell as-is and we handle everything.",
    h1: "Sell a Hoarder House in Boise",
    keywords: ["hoarder house", "sell cluttered home", "no clean out", "as is condition"],
    icon: "Package",
  },
  {
    slug: "expired-listing",
    name: "Expired Listing",
    shortName: "Expired",
    title: "Expired Listing in Boise? Sell Direct for Cash",
    metaDescription: "Your Boise home listing expired without a sale? Skip the frustration and sell directly to us for cash. No more showings or waiting.",
    h1: "Expired Listing? Sell Your House Fast",
    keywords: ["expired listing", "home didn't sell", "MLS expired", "sell without realtor"],
    icon: "Clock",
  },
  {
    slug: "behind-mortgage",
    name: "Behind on Mortgage",
    shortName: "Behind",
    title: "Behind on Mortgage Payments in Boise? Sell Fast",
    metaDescription: "Falling behind on mortgage payments in Boise? Sell your house fast for cash before foreclosure. We can close quickly to help you move forward.",
    h1: "Behind on Mortgage? Sell Your House Fast",
    keywords: ["behind on mortgage", "late payments", "missed payments", "mortgage help"],
    icon: "Calendar",
  },
  {
    slug: "code-violations",
    name: "Code Violations",
    shortName: "Violations",
    title: "Sell House with Code Violations in Boise | As-Is Cash Offer",
    metaDescription: "Have code violations on your Boise property? We buy houses with code violations as-is. No need to make repairs before selling.",
    h1: "Sell Your House with Code Violations",
    keywords: ["code violations", "sell with violations", "city code issues", "building violations"],
    icon: "AlertCircle",
  },
];

// Helper function to get a service by slug
export function getServiceBySlug(slug: string): ServiceData | undefined {
  return SERVICES.find(s => s.slug === slug);
}

// Get all service slugs
export function getAllServiceSlugs(): string[] {
  return SERVICES.map(s => s.slug);
}
