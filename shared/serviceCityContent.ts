// Comprehensive content for all 136 service+city combination pages
// Each combination gets unique, SEO-optimized content via serviceCityMatrix

import { SERVICES } from "./servicesData";
import { CITIES } from "./contentData";
import { getServiceCityMatrixEntry, hasMatrixEntry } from "./serviceCityMatrix";
import { generateServiceCityTitle, truncateMetaDescription } from "../lib/seo";

export interface ServiceCityContent {
  // SEO Metadata
  title: string;
  metaDescription: string;
  h1: string;
  keywords: string[];
  canonical: string;
  
  // Hero Section
  heroSubtitle: string;
  
  // Main Content
  citySpecificIntro: string; // 200-300 words combining service + city context
  
  // Why Choose Us (city-specific)
  whyChooseLocal: string[]; // 8-10 items with city context
  
  // Local Market Insights
  marketInsights: {
    averageHomeValue: string;
    commonPropertyTypes: string[];
    popularNeighborhoods: string[];
    localConsiderations: string;
  };
  
  // City-Specific Process
  localProcessNotes: string; // How this service works specifically in this city
  
  // Success Stories (city-specific)
  localSuccessStory?: {
    title: string;
    neighborhood: string;
    situation: string;
    solution: string;
    quote: string;
    timeline: string;
  };
  
  // City-Specific FAQs (10-15 questions)
  cityFaqs: Array<{
    question: string;
    answer: string;
  }>;
  
  // Call to Action
  ctaText: string;

  // Optional pinned internal links from matrix
  relatedLinks?: Array<string | { url: string; anchor?: string }>;
}

// Helper function to generate content for any service+city combination
export function generateServiceCityContent(
  serviceSlug: string,
  citySlug: string
): ServiceCityContent {
  const service = SERVICES.find(s => s.slug === serviceSlug);
  const city = CITIES.find(c => c.slug === citySlug);
  
  if (!service || !city) {
    throw new Error(`Invalid service (${serviceSlug}) or city (${citySlug}) combination`);
  }

  const cityName = city.name;
  const serviceName = service.name;
  
  // Generate SEO-optimized metadata (≤60 char title, ≤160 char description)
  const title = generateServiceCityTitle(service, city);
  const metaDescription = truncateMetaDescription(
    `${service.shortName} in ${cityName}? Fair cash offer in 24 hours. We buy throughout ${cityName} — ${city.neighborhoods?.slice(0, 2).join(", ") || "all neighborhoods"}. No fees, close fast.`
  );
  const h1 = `${serviceName} in ${cityName}, Idaho`;
  
  // City-specific intro combining service context + local market
  const citySpecificIntro = generateCitySpecificIntro(service, city);
  
  // Local market insights
  const marketInsights = {
    averageHomeValue: city.facts?.find(f => f.label === 'Median Home Price')?.value || '$400,000',
    commonPropertyTypes: getCommonPropertyTypes(citySlug),
    popularNeighborhoods: city.neighborhoods || [],
    localConsiderations: city.serviceConsiderations || `${cityName} real estate market features diverse properties across various neighborhoods and price points.`
  };
  
  const matrix = hasMatrixEntry(serviceSlug, citySlug)
    ? getServiceCityMatrixEntry(serviceSlug, citySlug)
    : undefined;

  const cityFaqs = matrix?.cityFaqs ?? generateCitySpecificFAQs(service, city);

  return {
    title,
    metaDescription,
    h1,
    keywords: generateKeywords(serviceName, cityName),
    canonical: `https://homebuyerboise.com/services/${serviceSlug}/${citySlug}`,
    heroSubtitle: `Get a fair cash offer on your ${cityName} home in 24 hours. ${service.metaDescription.split('.')[1] || 'No fees, no repairs, close on your timeline.'}`,
    citySpecificIntro: matrix?.citySpecificIntro ?? citySpecificIntro,
    whyChooseLocal: matrix?.whyChooseLocal ?? generateLocalBenefits(service, city),
    marketInsights: {
      ...marketInsights,
      localConsiderations: matrix?.localConsiderations ?? marketInsights.localConsiderations,
    },
    localProcessNotes: matrix?.localProcessNotes ?? generateLocalProcessNotes(service, city),
    localSuccessStory: matrix?.localSuccessStory ?? generateLocalSuccessStory(service, city),
    cityFaqs,
    ctaText: `Ready to ${serviceName.toLowerCase()} in ${cityName}? Get your cash offer today.`,
    relatedLinks: matrix?.relatedLinks,
  };
}

// Generate comprehensive city-specific intro (200-300 words)
function generateCitySpecificIntro(service: any, city: any): string {
  const cityName = city.name;
  const serviceName = service.name;
  const neighborhoods = city.neighborhoods?.slice(0, 4).join(', ') || 'all neighborhoods';
  const population = city.population || 'thousands of residents';
  
  return `Home Buyer Boise specializes in ${serviceName.toLowerCase()} throughout ${cityName}, Idaho. With ${population}, ${cityName} is ${getCityDescription(city.slug)}. We buy houses in all ${cityName} neighborhoods including ${neighborhoods}, providing fair cash offers regardless of your property's location or condition. Whether you own a newer construction home in ${cityName}'s growing subdivisions or an older property in established neighborhoods, we make selling fast and simple. ${getServiceCityContext(service.slug, city.slug)} Our local team understands ${cityName}'s unique real estate market, including property values, neighborhood characteristics, and common seller situations. We've helped dozens of ${cityName} homeowners ${getServiceAction(service.slug)} without the stress of traditional listings, repairs, or uncertain buyer financing. ${getCityMarketContext(city.slug)} As a local Idaho company, we provide personalized service with deep knowledge of ${cityName} and the surrounding Treasure Valley. Get your no-obligation cash offer today and discover why ${cityName} homeowners trust Home Buyer Boise for ${serviceName.toLowerCase()}.`;
}

// City descriptions
function getCityDescription(citySlug: string): string {
  const descriptions: Record<string, string> = {
    'kuna': 'a rapidly growing community in Ada County known as the "Gateway to the Birds of Prey," located just 20 minutes southwest of Boise',
    'boise': 'Idaho\'s capital and largest city, home to over 230,000 residents and consistently ranked among America\'s most livable cities',
    'meridian': 'Idaho\'s second-largest city and one of the fastest-growing communities in the United States, offering modern amenities and excellent schools',
    'eagle': 'an affluent community known for premium properties, championship golf courses, and proximity to outdoor recreation',
    'star': 'a charming community combining small-town character with proximity to Boise\'s amenities and the Boise River',
    'middleton': 'an affordable community with easy access to Boise, featuring properties near the Boise River and newer developments',
    'nampa': 'Canyon County\'s largest city, offering affordable housing and strong community ties',
    'caldwell': 'a historic Canyon County city with diverse housing options and a growing economy'
  };
  return descriptions[citySlug] || 'a vibrant community in the Treasure Valley';
}

// Service-specific context for each city
function getServiceCityContext(serviceSlug: string, citySlug: string): string {
  // This provides service-specific local context
  if (serviceSlug === 'sell-house-fast' && citySlug === 'kuna') {
    return 'Many Kuna homeowners need to sell quickly due to job relocation to Boise or out of state, company transfers, or family situations.';
  }
  if (serviceSlug === 'inherited-property' && citySlug === 'boise') {
    return 'Boise inherited properties often come from longtime residents whose families need quick estate settlement without the burden of property maintenance.';
  }
  // Add more specific combinations...
  return 'Our streamlined process is designed specifically for this situation in this market.';
}

// Service action descriptions
function getServiceAction(serviceSlug: string): string {
  const actions: Record<string, string> = {
    'sell-house-fast': 'sell their homes quickly',
    'we-buy-houses': 'sell properties in any condition',
    'cash-offer': 'get fair cash offers',
    'sell-as-is': 'sell as-is without repairs',
    'inherited-property': 'sell inherited properties',
    'avoid-foreclosure': 'avoid foreclosure',
    'sell-house-divorce': 'sell during divorce',
    'relocation-sale': 'sell before relocating',
    'problem-tenants': 'exit the landlord business',
    'probate-sale': 'handle probate sales',
    'tax-liens': 'sell properties with liens',
    'downsizing': 'downsize their homes',
    'fire-water-damage': 'sell damaged properties',
    'hoarder-house': 'sell hoarded properties',
    'expired-listing': 'sell after failed listings',
    'behind-mortgage': 'sell before foreclosure starts',
    'code-violations': 'sell properties with code issues'
  };
  return actions[serviceSlug] || 'achieve their real estate goals';
}

// City market context
function getCityMarketContext(citySlug: string): string {
  const contexts: Record<string, string> = {
    'kuna': 'Kuna\'s real estate market has grown significantly with new subdivisions attracting families, while maintaining affordable pricing compared to Boise.',
    'boise': 'Boise\'s diverse neighborhoods range from historic North End bungalows to modern Southeast Boise developments, creating varied selling situations.',
    'meridian': 'Meridian\'s explosive growth means many properties are newer construction, with homeowners often relocating before establishing roots.',
    'eagle': 'Eagle\'s premium market attracts executive relocations and high-value properties requiring discrete, professional service.',
    'star': 'Star offers more affordable pricing while maintaining proximity to Boise, attracting value-conscious buyers and sellers.',
    'middleton': 'Middleton provides affordable alternatives to pricier Treasure Valley markets while offering river access and newer development.',
    'nampa': 'Nampa offers the most affordable housing in the Treasure Valley, with diverse property types and strong rental demand.',
    'caldwell': 'Caldwell combines historic properties with newer developments, serving first-time buyers and growing families.'
  };
  return contexts[citySlug] || '';
}

// Common property types per city
function getCommonPropertyTypes(citySlug: string): string[] {
  const types: Record<string, string[]> = {
    'kuna': ['Single-family homes on quarter-acre+ lots', 'Newer subdivision homes (2000-2020)', 'Older homes near downtown Kuna', 'Properties with horse privileges'],
    'boise': ['Historic North End bungalows', 'Bench-area ranch homes', 'Southeast Boise family homes', 'Downtown condos', 'Foothills properties'],
    'meridian': ['Modern subdivision homes', 'New construction', 'Master-planned community homes', 'HOA properties'],
    'eagle': ['Luxury estates', 'Golf course properties', 'Custom homes on large lots', 'Gated community properties'],
    'star': ['Rural properties on acreage', 'Suburban developments', 'Properties near Boise River', 'Newer family homes'],
    'middleton': ['Affordable family homes', 'River-access properties', 'Newer developments', 'Rural acreage'],
    'nampa': ['Affordable starter homes', 'Rental properties', 'Multi-family properties', 'Historic homes'],
    'caldwell': ['Historic downtown homes', 'Newer subdivisions', 'Agricultural properties', 'First-time buyer homes']
  };
  return types[citySlug] || ['Single-family homes', 'Townhomes', 'Condos'];
}

// Generate local benefits
function generateLocalBenefits(service: any, city: any): string[] {
  const cityName = city.name;
  return [
    `Deep knowledge of ${cityName} real estate market and property values`,
    `Experience with ${cityName} neighborhoods and local market conditions`,
    `Fast closings that work with ${cityName} title companies`,
    `Understanding of ${cityName}-specific seller situations`,
    `Local team familiar with ${cityName} properties and values`,
    `Cash offers based on current ${cityName} market comparables`,
    `Flexible timelines that accommodate ${cityName} sellers`,
    `No fees or commissions - maximize your proceeds`,
    `Licensed and insured Idaho home buyers`,
    `Proven track record in ${cityName} and across Treasure Valley`
  ];
}

// Generate local process notes
function generateLocalProcessNotes(service: any, city: any): string {
  const cityName = city.name;
  return `Our ${service.name.toLowerCase()} process in ${cityName} is streamlined for local efficiency. We work with trusted ${cityName}-area title companies, understand local property values, and can close quickly to meet your timeline. Many ${cityName} sellers appreciate our familiarity with local neighborhoods, property types, and market conditions.`;
}

// Generate local success story
function generateLocalSuccessStory(service: any, city: any) {
  const cityName = city.name;
  const neighborhood = city.neighborhoods?.[0] || `${cityName} area`;
  
  return {
    title: `${cityName} ${service.shortName} Success`,
    neighborhood: neighborhood,
    situation: `${cityName} homeowner needed to ${getServiceAction(service.slug).toLowerCase()}`,
    solution: `Closed in 10 days with fair cash offer, no repairs needed`,
    quote: `Home Buyer Boise made selling in ${cityName} so easy. They understood our neighborhood and gave us a fair offer right away.`,
    timeline: '10 days from contact to closing'
  };
}

// Generate city-specific FAQs
function generateCitySpecificFAQs(service: any, city: any) {
  const cityName = city.name;
  const serviceName = service.name.toLowerCase();
  const neighborhoods = city.neighborhoods?.slice(0, 3).join(', ') || `all ${cityName} neighborhoods`;
  
  return [
    {
      question: `Do you buy houses in all ${cityName} neighborhoods?`,
      answer: `Yes! We buy houses throughout ${cityName} including ${neighborhoods} and all other ${cityName} areas. Every neighborhood has value, and we make offers on properties across all ${cityName} locations regardless of the area or property condition.`
    },
    {
      question: `How fast can you close on a ${cityName} property?`,
      answer: `We can close in as little as 7 days on ${cityName} properties, though most closings occur in 10-14 days to allow for title work and your preferred timeline. If you need more time to coordinate your move out of ${cityName}, we can wait 30-60+ days - whatever works best for you.`
    },
    {
      question: `What types of properties do you buy in ${cityName}?`,
      answer: `We buy all types of properties in ${cityName} including ${getCommonPropertyTypes(city.slug).join(', ')}. Whether your ${cityName} property is move-in ready or needs significant work, we'll make you a fair cash offer.`
    },
    {
      question: `How do you determine the offer price for my ${cityName} home?`,
      answer: `We analyze recent sales of comparable homes in your specific ${cityName} neighborhood, assess your property's condition, and factor in current ${cityName} market conditions. Our offers are based on real data from the ${cityName} real estate market, not arbitrary formulas.`
    },
    {
      question: `Do I have to pay any fees or commissions in ${cityName}?`,
      answer: `No. We pay all closing costs including title fees, escrow costs, and transfer fees. You don't pay realtor commissions (saving you 6%). The cash offer we make is what you receive at closing - no deductions or surprises.`
    },
    {
      question: `Can you help if I'm behind on payments on my ${cityName} property?`,
      answer: `Yes. We've helped many ${cityName} homeowners who are behind on mortgage payments. We'll calculate your exact payoff amount and make an offer accordingly. If there's equity after paying off the mortgage, you receive the difference in cash.`
    },
    {
      question: `What if my ${cityName} house needs repairs?`,
      answer: `That's fine - we buy ${cityName} properties in as-is condition. You don't need to fix anything. Foundation issues, roof problems, outdated systems - we buy it all. We factor repair costs into our offer so you don't spend a penny on fixes.`
    },
    {
      question: `How is selling to you different than listing with a ${cityName} realtor?`,
      answer: `Speed, certainty, and convenience. ${cityName} realtors require repairs, staging, and showings, then you wait 30-90+ days hoping for buyer financing approval. We give you a cash offer in 24 hours, buy as-is, and close on your timeline with 100% certainty.`
    },
    {
      question: `Are you actually local to ${cityName}?`,
      answer: `Yes! We're a local Idaho company that's been buying houses in ${cityName} and across the Treasure Valley since 2018. We're not a national franchise - we're your neighbors who understand the ${cityName} market personally.`
    },
    {
      question: `What happens after I sell my ${cityName} house to you?`,
      answer: `After closing, the ${cityName} property becomes ours. We typically invest in repairs and updates, then resell to a new homeowner or keep as a rental. Your responsibility ends at closing - no callbacks, no issues. You walk away with cash and move forward.`
    },
  ];
}

// Generate keywords
function generateKeywords(serviceName: string, cityName: string): string[] {
  return [
    `${serviceName.toLowerCase()} ${cityName}`,
    `${serviceName.toLowerCase()} ${cityName} Idaho`,
    `${cityName} ${serviceName.toLowerCase()}`,
    `${cityName} cash home buyers`,
    `sell house ${cityName}`,
    `we buy houses ${cityName}`,
    `${cityName} house buyers`,
    `cash for houses ${cityName}`,
    `${cityName} Idaho real estate`,
    `sell my house ${cityName}`
  ];
}

