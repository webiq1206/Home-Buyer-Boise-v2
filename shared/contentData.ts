// City content data for Treasure Valley area pages
import { unverifiedTrustText } from "@/lib/seo";

export interface CityData {
  slug: string;
  name: string;
  county: 'ada' | 'canyon'; // County for assessor routing
  isPrimary: boolean; // Kuna is primary
  population?: string;
  zipCodes?: string[];
  neighborhoods?: string[];
  extendedDescription?: string; // 250-300 word SEO-rich description for geo pages
  landmarks?: string[]; // Notable local landmarks
  serviceConsiderations?: string; // City-specific lawn care considerations
  localFactors: {
    climate: string;
    soil: string;
    commonNeeds: string[];
  };
  facts?: Array<{label: string; value: string}>;
  marketStats?: {
    medianPrice?: string;
    daysOnMarket?: string;
    priceGrowth?: string;
  };
  faqs?: Array<{question: string; answer: string}>;
  // Optional per-city pinned internal links. Same shape as BlogPostData.relatedLinks.
  relatedLinks?: Array<string | { url: string; anchor?: string }>;
}

// Cities we serve
export const CITIES: CityData[] = [
  {
    slug: 'kuna',
    name: 'Kuna',
    county: 'ada',
    isPrimary: true,
    population: '25,000+',
    zipCodes: ['83634'],
    neighborhoods: ['Teed Farms', 'Swan Falls', 'Crimson Point', 'Indian Creek'],
    extendedDescription: 'Kuna, Idaho, known as the "Gateway to the Birds of Prey" conservation area, is a rapidly growing community in Ada County just 20 minutes southwest of Boise. With a population exceeding 25,000 residents, Kuna has evolved from its agricultural roots into a thriving suburban city while maintaining its small-town charm and community values. Home Buyer Boise specializes in purchasing homes throughout Kuna, providing fast cash offers to homeowners in popular neighborhoods like Crimson Point, Indian Creek, Swan Falls, and Teed Farms. The Kuna real estate market features predominantly single-family homes ranging from established properties built in the 1990s-2000s to brand-new construction in growing subdivisions. Many homeowners in Kuna need to sell quickly due to job relocation, downsizing, divorce, inherited properties, or financial hardship. We buy houses in any condition throughout Kuna - whether your property needs repairs, has deferred maintenance, or is move-in ready. From older homes near Kuna Caves to newer developments along Black Cat Road, we provide fair cash offers with flexible closing timelines. Kuna sellers appreciate our straightforward process: no repairs needed, no realtor commissions, no lengthy financing contingencies, and the ability to close in as little as 7 days or wait 60+ days if needed. ' + unverifiedTrustText('As local cash buyers serving the Treasure Valley since 2018, ', '') + 'we understand Kuna\'s strong community values and treat every homeowner with respect and transparency throughout the selling process.',
    landmarks: ['Kuna Caves', 'Swan Falls Dam', 'Indian Creek Plaza', 'Kuna Aquatic Center', 'Teed Winery', 'Birds of Prey National Conservation Area'],
    serviceConsiderations: 'Kuna real estate market features strong demand with median home prices around $400,000. Many properties are family homes (3-4 bedrooms) on quarter-acre+ lots. Common seller situations include: job relocation to Boise or out of state, downsizing after retirement, inherited properties from family estates, divorce property settlements, and financial hardship. Properties range from well-maintained move-in ready homes to fixer-uppers needing significant repairs. We purchase all property types and conditions.',
    localFactors: {
      climate: 'Semi-arid with cold winters and hot, dry summers',
      soil: 'N/A',
      commonNeeds: ['Fast home sales', 'No-repair sales', 'Inherited property sales', 'Divorce property settlements']
    },
    facts: [
      { label: 'Population', value: '25,000+' },
      { label: 'Median Home Price', value: '$400,000' },
      { label: 'County', value: 'Ada' },
      { label: 'Distance to Boise', value: '20 miles' },
      { label: 'Typical Lot Size', value: '0.25+ acres' },
      { label: 'Common Home Type', value: 'Single-family' }
    ]
  },
  {
    slug: 'boise',
    name: 'Boise',
    county: 'ada',
    isPrimary: false,
    population: '230,000+',
    zipCodes: ['83702', '83703', '83704', '83705', '83706', '83709', '83712', '83713', '83714', '83716'],
    neighborhoods: ['North End', 'Bench', 'Southwest Boise', 'Southeast Boise', 'Harris Ranch', 'Barber Valley'],
    extendedDescription: 'Boise, Idaho\'s capital and largest city with over 230,000 residents, is consistently ranked among America\'s most livable cities thanks to its outdoor recreation opportunities, growing economy, and high quality of life. Home Buyer Boise is the premier cash home buyer serving all Boise neighborhoods, from the historic North End with its charming bungalows and tree-lined streets, to the Boise Bench with mid-century homes and modern updates, to newer master-planned communities like Harris Ranch and Barber Valley. The Boise real estate market is diverse and dynamic, with property values ranging from affordable starter homes to luxury estates near the foothills. We purchase homes across all price points and conditions - whether you own a charming North End cottage needing updates, a Bench-area ranch home requiring repairs, a Southwest Boise family home in pristine condition, or a downtown condo you inherited and want to sell quickly. Common seller situations in Boise include: job relocations (Micron, HP, and Boise State create frequent transfers), downsizing retirees moving to smaller homes or senior communities, divorce property settlements, inherited homes from family estates, landlords tired of managing rental properties, and homeowners facing financial hardship or foreclosure. As Idaho\'s economic hub, Boise attracts families and professionals who sometimes need to sell quickly without the hassle of traditional listings, repairs, showings, and uncertain buyer financing. Home Buyer Boise provides the solution with guaranteed cash offers, flexible closing dates, and the ability to sell your house as-is.',
    landmarks: ['Idaho State Capitol', 'Boise River Greenbelt', 'Table Rock', 'Hyde Park', 'Boise Depot', 'Julia Davis Park', 'Bogus Basin'],
    serviceConsiderations: 'Boise real estate market is competitive with median home prices around $475,000. Diverse property types include historic homes (North End), mid-century ranches (Bench), newer subdivisions (Harris Ranch, Barber Valley), downtown condos, and multi-family properties. Common seller needs: quick sales for job relocations, estate sales, divorce settlements, rental property liquidation, and foreclosure avoidance. We buy all property types and conditions throughout Boise.',
    localFactors: {
      climate: 'Four distinct seasons with hot summers and cold winters',
      soil: 'N/A',
      commonNeeds: ['Quick job relocation sales', 'Estate property sales', 'Rental property liquidation', 'As-is home sales']
    },
    facts: [
      { label: 'Population', value: '230,000+' },
      { label: 'Median Home Price', value: '$475,000' },
      { label: 'County', value: 'Ada' },
      { label: 'Major Employers', value: 'Micron, HP, St. Luke\'s' },
      { label: 'Market Type', value: 'Diverse urban' },
      { label: 'Common Home Type', value: 'Single-family, condos' }
    ]
  },
  {
    slug: 'meridian',
    name: 'Meridian',
    county: 'ada',
    isPrimary: false,
    population: '130,000+',
    zipCodes: ['83642', '83646'],
    neighborhoods: ['Meridian Ranch', 'Tuscany', 'Paramount', 'Lochsa Falls', 'Discovery Park'],
    extendedDescription: 'Meridian is Idaho\'s second-largest city with over 130,000 residents and one of the fastest-growing communities in the United States. Located in Ada County between Boise and Nampa, Meridian has transformed from agricultural land into a modern suburban city filled with new master-planned communities, excellent schools, and abundant shopping and dining options at The Village at Meridian. Home Buyer Boise purchases homes throughout Meridian, specializing in newer subdivision properties in popular neighborhoods like Tuscany, Paramount, Lochsa Falls, Meridian Ranch, and Discovery Park. The city\'s explosive growth creates unique selling situations - homeowners who purchased new construction but need to relocate before establishing roots, families outgrowing starter homes after just a few years, investors liquidating rental properties, and divorcing couples splitting newly-purchased assets. Meridian\'s real estate market features predominantly modern single-family homes built since 2000, with many properties less than 10 years old offering contemporary floor plans, attached garages, and HOA-managed communities. We buy homes in any condition throughout Meridian - from brand-new construction you never moved into, to well-maintained family homes, to properties needing updates or repairs. The city attracts young families and professionals who sometimes face unexpected life changes requiring quick home sales. Home Buyer Boise provides fast cash offers with flexible closing timelines, no repair requirements, and the ability to avoid lengthy traditional listings. We understand Meridian sellers value efficiency, transparency, and fair market value offers.',
    landmarks: ['The Village at Meridian', 'Kleiner Memorial Park', 'Eagle Island State Park', 'Settlers Park', 'Wahooz Family Fun Zone', 'Roaring Springs Water Park'],
    serviceConsiderations: 'Meridian real estate market features newer homes with median prices around $480,000. Predominantly single-family homes in HOA communities. Common seller situations: job relocations, upsizing/downsizing, divorce settlements, new construction buyers who need to sell before moving in, rental property liquidation. Many properties less than 15 years old. We purchase homes in all conditions including brand-new, well-maintained, and those needing updates.',
    localFactors: {
      climate: 'Hot, dry summers and cold winters',
      soil: 'N/A',
      commonNeeds: ['Fast relocation sales', 'New construction sales', 'Divorce settlements', 'Rental liquidation']
    },
    facts: [
      { label: 'Population', value: '130,000+' },
      { label: 'Median Home Price', value: '$480,000' },
      { label: 'County', value: 'Ada' },
      { label: 'Distance to Boise', value: '10 miles' },
      { label: 'Market Type', value: 'Modern suburban' },
      { label: 'Common Home Age', value: 'Built 2000-present' }
    ]
  },
  {
    slug: 'eagle',
    name: 'Eagle',
    county: 'ada',
    isPrimary: false,
    population: '35,000+',
    zipCodes: ['83616', '83646'],
    neighborhoods: ['Eagle Hills', 'Banbury', 'Silver Wing', 'Floating Feather'],
    extendedDescription: 'Eagle is one of the Treasure Valley\'s most affluent and desirable communities, combining small-town character with upscale amenities and easy access to outdoor recreation. With over 35,000 residents in Ada County just northwest of Boise, Eagle is known for its premium real estate, excellent schools, championship golf courses, and proximity to Eagle Island State Park and the Boise River. Home Buyer Boise serves Eagle homeowners who need to sell quickly, discreetly, and without the hassle of traditional listings. Eagle properties range from luxury estates on large acreage to upscale family homes in prestigious subdivisions like Banbury, Silver Wing, and Eagle Hills. We purchase high-end properties throughout Eagle, providing fair market value cash offers on homes of all price points. Common selling situations in Eagle include: executive relocations to other states, estate sales of luxury properties, downsizing empty-nesters moving from large family homes, divorce property settlements involving high-value assets, and pre-foreclosure situations for homeowners seeking confidential solutions. Eagle homeowners value discretion, professionalism, and respect for their privacy. We provide white-glove service with confidential evaluations, fair cash offers, and flexible closing timelines. Whether your Eagle property is a meticulously maintained luxury home, an estate requiring updates, or a high-end property with deferred maintenance, Home Buyer Boise offers a straightforward selling solution without repairs, showings, or realtor commissions.',
    landmarks: ['Eagle Island State Park', 'Eagle Hills Golf Course', 'Heritage Park', 'Eagle Farmers Market', 'Eagle Historical Museum', 'Wildlife Reserve', 'Boise River'],
    serviceConsiderations: 'Eagle real estate features upscale properties with median prices around $575,000-$650,000. Larger lots and estate homes common. Discretion and professionalism essential. Common seller situations: executive relocations, estate liquidations, divorce settlements, downsizing, confidential pre-foreclosure solutions. We purchase luxury and high-end properties providing fair market value offers and white-glove service.',
    localFactors: {
      climate: 'Four seasons with mild winters',
      soil: 'N/A',
      commonNeeds: ['Executive relocation sales', 'Estate property sales', 'Luxury home sales', 'Confidential transactions']
    },
    facts: [
      { label: 'Population', value: '35,000+' },
      { label: 'Median Home Price', value: '$575,000+' },
      { label: 'County', value: 'Ada' },
      { label: 'Distance to Boise', value: '12 miles' },
      { label: 'Market Type', value: 'Upscale suburban' },
      { label: 'Typical Lot Size', value: '0.25+ acres' }
    ]
  },
  {
    slug: 'star',
    name: 'Star',
    county: 'ada',
    isPrimary: false,
    population: '12,000+',
    zipCodes: ['83669'],
    neighborhoods: ['Star Meadows', 'Riverside Village', 'Willow Creek', 'Pearl District'],
    extendedDescription: 'Star, Idaho is a rapidly growing small city in Ada County with over 12,000 residents, located along State Highway 44 between Eagle and Middleton. Known for its rural character and strong sense of community, Star offers residents a peaceful small-town lifestyle with convenient access to Boise metro area amenities just 20 minutes east. Home Buyer Boise purchases homes throughout Star, serving homeowners who value the city\'s spacious lots, rural atmosphere, and tight-knit community. The city features a mix of established horse properties on acreage, newer residential subdivisions with modern homes, and rural properties transitioning from agricultural to residential use. Star\'s real estate market appeals to families seeking larger lots and a more rural lifestyle while maintaining proximity to Boise employment centers. We buy all property types in Star - from horse properties and rural acreage to suburban family homes in newer subdivisions like Star Meadows and Riverside Village. Common seller situations include: relocating families moving out of state, empty-nesters downsizing from large rural properties, inherited acreage or horse properties, divorce settlements involving rural real estate, and sellers tired of maintaining larger properties. Star homeowners appreciate straightforward, honest service from local buyers who understand rural property values and unique characteristics. Home Buyer Boise provides fair cash offers on properties of all sizes - whether your Star home is a small-town charmer, a modern subdivision property, or a multi-acre rural estate. No repairs, no showings, no waiting for buyer financing.',
    landmarks: ['Star Town Hall', 'Star Community Park', 'Riverside Park', 'Highway 44 Corridor', 'Star Elementary School', 'Pearl District'],
    serviceConsiderations: 'Star real estate features larger lots with median prices around $425,000. Mix of rural properties, horse properties, and suburban homes. Common seller situations: relocations, downsizing from rural properties, inherited acreage, divorce settlements, buyers seeking hassle-free sales of larger properties. We purchase all property types from small-town homes to multi-acre rural estates.',
    localFactors: {
      climate: 'Hot, dry summers and cold winters',
      soil: 'N/A',
      commonNeeds: ['Rural property sales', 'Horse property sales', 'Acreage sales', 'Downsizing from large lots']
    },
    facts: [
      { label: 'Population', value: '12,000+' },
      { label: 'Median Home Price', value: '$425,000' },
      { label: 'County', value: 'Ada' },
      { label: 'Distance to Boise', value: '20 miles' },
      { label: 'Market Type', value: 'Rural/suburban mix' },
      { label: 'Typical Lot Size', value: '0.25-1+ acres' }
    ]
  },
  {
    slug: 'middleton',
    name: 'Middleton',
    county: 'canyon',
    isPrimary: false,
    population: '10,000+',
    zipCodes: ['83644'],
    neighborhoods: ['Heights', 'Middleton Mill', 'Ustick Corridor', 'Purple Sage'],
    extendedDescription: 'Middleton, Idaho is a charming small city in Canyon County with over 10,000 residents, strategically located between Caldwell and Star along Highway 44. This growing community offers an appealing blend of rural character, modern amenities, and affordable housing options that attract young families and professionals seeking small-town living with easy commute access to Boise, Nampa, and Caldwell. Home Buyer Boise purchases homes throughout Middleton, serving sellers who value honest, straightforward dealings and fair pricing. The city features a mix of older established neighborhoods with mature homes, newer subdivisions with contemporary designs, and transitional areas where agricultural properties are converting to residential development. Middleton\'s real estate market offers more affordable options compared to Boise and Meridian, making it attractive to first-time homebuyers, young families, and investors. We buy homes in all conditions throughout Middleton - from charming older homes with character, to well-maintained family residences, to properties needing updates or repairs. Common seller situations in Middleton include: job relocations, inherited properties from family estates, rental property liquidation, divorce settlements, downsizing, and homeowners seeking quick sales to avoid foreclosure. Middleton residents value honest communication, fair pricing, and reliable follow-through. Home Buyer Boise provides exactly that - straightforward cash offers, transparent processes, and the flexibility to close on your timeline. Whether your Middleton property is move-in ready or needs significant work, we make fair offers and treat you with respect.',
    landmarks: ['Middleton Place Park', 'Kleiner Park', 'Boise River Wildlife Management Area', 'Middleton Mill', 'Highway 44 Business District', 'Middleton Schools Complex'],
    serviceConsiderations: 'Middleton real estate features affordable homes with median prices around $385,000. Mix of older established homes and newer construction. Common seller situations: relocations, inherited properties, rental liquidation, divorce, downsizing, foreclosure avoidance. Budget-conscious market values fair pricing and honest dealing. We purchase homes in all conditions from well-maintained to fixer-uppers.',
    localFactors: {
      climate: 'Hot summers and cold winters',
      soil: 'N/A',
      commonNeeds: ['Affordable quick sales', 'Inherited property sales', 'Rental liquidation', 'Foreclosure avoidance']
    },
    facts: [
      { label: 'Population', value: '10,000+' },
      { label: 'Median Home Price', value: '$385,000' },
      { label: 'County', value: 'Canyon' },
      { label: 'Distance to Boise', value: '25 miles' },
      { label: 'Market Type', value: 'Affordable small-town' },
      { label: 'Common Home Age', value: 'Mixed vintage' }
    ]
  },
  {
    slug: 'nampa',
    name: 'Nampa',
    county: 'canyon',
    isPrimary: false,
    population: '100,000+',
    zipCodes: ['83651', '83686', '83687'],
    neighborhoods: ['Centennial', 'Southridge', 'Deer Flat', 'Greenhurst', 'Painted Ridge'],
    extendedDescription: 'Nampa is Idaho\'s third-largest city with over 100,000 residents, located in Canyon County just west of Meridian. As a major hub of the Treasure Valley, Nampa offers affordable housing options, growing employment opportunities, and a strong sense of community. The city features diverse neighborhoods ranging from historic downtown areas to modern suburban developments. Nampa\'s real estate market appeals to first-time homebuyers, growing families, and investors seeking rental properties. With ongoing development and infrastructure improvements, Nampa continues to grow as an integral part of the Boise metropolitan area.',
    landmarks: ['Nampa Civic Center', 'Lake Lowell', 'Ford Idaho Center', 'Nampa Recreation Center', 'Warhawk Air Museum', 'Northwest Nazarene University'],
    serviceConsiderations: 'Nampa offers diverse property types from historic homes to new construction. Affordable housing market attracts first-time buyers and investors. Growing employment centers and retail development drive housing demand.',
    localFactors: {
      climate: 'Semi-arid with hot summers and cold winters. USDA Zone 6a.',
      soil: 'Clay soil common throughout area.',
      commonNeeds: ['Affordable housing', 'First-time buyer properties', 'Investment opportunities', 'Growing neighborhoods']
    },
    facts: [
      { label: 'Population', value: '100,000+' },
      { label: 'Median Home Price', value: '$375,000' },
      { label: 'County', value: 'Canyon' },
      { label: 'Distance to Boise', value: '20 miles' },
      { label: 'Market Type', value: 'Affordable suburban' },
      { label: 'Growth Rate', value: 'Rapid' }
    ]
  },
  {
    slug: 'caldwell',
    name: 'Caldwell',
    county: 'canyon',
    isPrimary: false,
    population: '60,000+',
    zipCodes: ['83605', '83607'],
    neighborhoods: ['Indian Creek', 'Purple Sage', 'Ustick West', 'Deer Flat'],
    extendedDescription: 'Caldwell is Canyon County\'s seat with over 60,000 residents, located west of Nampa in the Treasure Valley. Known for its agricultural heritage, affordable housing, and growing economy, Caldwell offers family-friendly neighborhoods and strong community values. The city features a revitalized downtown, excellent schools including the College of Idaho, and expanding retail and employment centers. Caldwell\'s real estate market provides opportunities for homebuyers seeking affordability combined with good schools and community amenities. As the western anchor of the Treasure Valley, Caldwell continues to attract families and businesses.',
    landmarks: ['College of Idaho', 'Caldwell Event Center', 'Indian Creek Plaza', 'Canyon Hill', 'Memorial Park', 'Caldwell Downtown District'],
    serviceConsiderations: 'Caldwell features affordable family homes with good school access. Mix of established and new neighborhoods. Growing west Treasure Valley market with development opportunities.',
    localFactors: {
      climate: 'Semi-arid with hot, dry summers and cold winters. USDA Zone 6a.',
      soil: 'Clay soil predominant.',
      commonNeeds: ['Family housing', 'Affordability', 'School proximity', 'Community amenities']
    },
    facts: [
      { label: 'Population', value: '60,000+' },
      { label: 'Median Home Price', value: '$360,000' },
      { label: 'County', value: 'Canyon' },
      { label: 'Distance to Boise', value: '25 miles' },
      { label: 'Market Type', value: 'Affordable family' },
      { label: 'Growth Rate', value: 'Steady' }
    ]
  }
];

export const ALL_CITIES = CITIES;

export const CITY_SLUG_MAP = new Map(
  CITIES.map((city) => [city.slug, city])
);

export function getCityBySlug(slug: string): CityData | undefined {
  return CITY_SLUG_MAP.get(slug);
}

export function getAllCitySlugs(): string[] {
  return CITIES.map((city) => city.slug);
}

export function getPrimaryCitySlug(): string {
  return "kuna";
}
