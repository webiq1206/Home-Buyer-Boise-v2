// City Data for Home Buyer Boise
// This drives area pages and geo-targeted content with rich SEO data

export interface CityData {
  slug: string;
  name: string;
  county: 'ada' | 'canyon';
  isPrimary: boolean;
  population?: string;
  zipCodes?: string[];
  neighborhoods?: string[];
  extendedDescription?: string; // 250-300 word SEO-rich description for geo pages
  landmarks?: string[];
  serviceConsiderations?: string; // City-specific considerations
  localFactors: {
    climate: string;
    soil: string;
    commonNeeds: string[];
  };
  facts?: Array<{ label: string; value: string }>;
  // Additional fields for area pages
  marketStats?: {
    medianPrice: string;
    daysOnMarket: string;
    priceGrowth: string;
  };
  faqs?: Array<{ question: string; answer: string }>;
}

// Cities we serve - Rich data for SEO and area pages
export const CITIES: CityData[] = [
  {
    slug: 'kuna',
    name: 'Kuna',
    county: 'ada',
    isPrimary: true,
    population: '25,000+',
    zipCodes: ['83634'],
    neighborhoods: ['Teed Farms', 'Swan Falls', 'Crimson Point', 'Indian Creek', 'Desert Creek', 'Applewood', 'Falcon Crest', 'Deer Crossing', 'Morning Dove', 'Chula Vista'],
    extendedDescription: 'Kuna, Idaho, known as the "Gateway to the Birds of Prey" conservation area, is a rapidly growing community in Ada County just 20 minutes southwest of Boise. With a population exceeding 25,000 residents, Kuna has evolved from its agricultural roots into a thriving suburban city while maintaining its small-town charm and community values. Home Buyer Boise specializes in purchasing homes throughout Kuna, providing fast cash offers to homeowners in popular neighborhoods like Crimson Point, Indian Creek, Swan Falls, and Teed Farms. The Kuna real estate market features predominantly single-family homes ranging from established properties built in the 1990s-2000s to brand-new construction in growing subdivisions. Many homeowners in Kuna need to sell quickly due to job relocation, downsizing, divorce, inherited properties, or financial hardship. We buy houses in any condition throughout Kuna - whether your property needs repairs, has deferred maintenance, or is move-in ready. From older homes near Kuna Caves to newer developments along Black Cat Road, we provide fair cash offers with flexible closing timelines. Kuna sellers appreciate our straightforward process: no repairs needed, no realtor commissions, no lengthy financing contingencies, and the ability to close in as little as 7 days or wait 60+ days if needed. As local cash buyers serving the Treasure Valley since 2018, we understand Kuna\'s strong community values and treat every homeowner with respect and transparency throughout the selling process.',
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
    ],
    marketStats: {
      medianPrice: '$400,000',
      daysOnMarket: '38 days',
      priceGrowth: '+4.2%'
    },
    faqs: [
      { question: 'How quickly can you close on my Kuna house?', answer: 'We can close in as little as 7 days, or on your timeline up to 60+ days. Most Kuna home sales close within 14-21 days.' },
      { question: 'Do you buy houses in any condition in Kuna?', answer: 'Yes! We buy Kuna homes in any condition - no repairs, cleaning, or updates needed. From move-in ready to major repairs, we make fair offers on all properties.' },
      { question: 'Are there any fees or commissions when selling to Home Buyer Boise?', answer: 'No fees, no commissions, and no closing costs for you. The cash offer we make is the amount you receive at closing.' },
      { question: 'What neighborhoods in Kuna do you serve?', answer: 'We buy houses throughout all of Kuna including Crimson Point, Indian Creek, Swan Falls, Teed Farms, Desert Creek, and all surrounding neighborhoods.' },
      { question: 'How do you determine your cash offer for Kuna homes?', answer: 'We analyze recent comparable sales in your Kuna neighborhood, consider current market conditions, and factor in any repairs needed to arrive at a fair cash offer.' }
    ]
  },
  {
    slug: 'boise',
    name: 'Boise',
    county: 'ada',
    isPrimary: false,
    population: '230,000+',
    zipCodes: ['83702', '83703', '83704', '83705', '83706', '83709', '83712', '83713', '83714', '83716'],
    neighborhoods: ['North End', 'Bench', 'Southwest Boise', 'Southeast Boise', 'Harris Ranch', 'Barber Valley', 'Downtown', 'Vista', 'West Boise', 'Warm Springs', 'Hyde Park', 'East End', 'Morris Hill', 'Depot Bench'],
    extendedDescription: 'Boise, Idaho\'s capital and largest city with over 230,000 residents, is consistently ranked among America\'s most livable cities thanks to its outdoor recreation opportunities, growing economy, and high quality of life. Home Buyer Boise is the premier cash home buyer serving all Boise neighborhoods, from the historic North End with its charming bungalows and tree-lined streets, to the Boise Bench with mid-century homes and modern updates, to newer master-planned communities like Harris Ranch and Barber Valley. The Boise real estate market is diverse and dynamic, with property values ranging from affordable starter homes to luxury estates near the foothills. We purchase homes across all price points and conditions - whether you own a charming North End cottage needing updates, a Bench-area ranch home requiring repairs, a Southwest Boise family home in pristine condition, or a downtown condo you inherited and want to sell quickly. Common seller situations in Boise include: job relocations (Micron, HP, and Boise State create frequent transfers), downsizing retirees moving to smaller homes or senior communities, divorce property settlements, inherited homes from family estates, landlords tired of managing rental properties, and homeowners facing financial hardship or foreclosure. As Idaho\'s economic hub, Boise attracts families and professionals who sometimes need to sell quickly without the hassle of traditional listings, repairs, showings, and uncertain buyer financing. Home Buyer Boise provides the solution with guaranteed cash offers, flexible closing dates, and the ability to sell your house as-is.',
    landmarks: ['Idaho State Capitol', 'Boise River Greenbelt', 'Table Rock', 'Hyde Park', 'Boise Depot', 'Julia Davis Park', 'Bogus Basin', 'Zoo Boise', 'JUMP Boise', 'Kathryn Albertson Park', 'Camel\'s Back Park'],
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
    ],
    marketStats: {
      medianPrice: '$475,000',
      daysOnMarket: '42 days',
      priceGrowth: '+5.8%'
    },
    faqs: [
      { question: 'How fast can you buy my Boise house?', answer: 'We can close on your Boise house in as little as 7 days. Most transactions close within 2-3 weeks, but we work on your timeline.' },
      { question: 'Do you buy houses in all Boise neighborhoods?', answer: 'Yes! We purchase homes throughout all Boise neighborhoods including North End, Bench, Southeast, Southwest, Harris Ranch, Barber Valley, and everywhere in between.' },
      { question: 'What types of houses do you buy in Boise?', answer: 'We buy all property types in Boise - single-family homes, condos, townhomes, duplexes, and multi-family properties in any condition.' },
      { question: 'Will you buy my Boise house if it needs repairs?', answer: 'Absolutely! We specialize in buying homes as-is. Whether your home needs minor updates or major repairs, we\'ll make a fair cash offer.' },
      { question: 'How is your cash offer calculated for Boise homes?', answer: 'We analyze comparable sales in your Boise neighborhood, current market conditions, and property condition to provide a fair, transparent cash offer.' }
    ]
  },
  {
    slug: 'meridian',
    name: 'Meridian',
    county: 'ada',
    isPrimary: false,
    population: '130,000+',
    zipCodes: ['83642', '83646'],
    neighborhoods: ['Meridian Ranch', 'Tuscany', 'Paramount', 'Lochsa Falls', 'Discovery Park', 'Spurwing', 'Century Farm', 'Reflection Ridge', 'Bainbridge', 'Sagecrest', 'Southern Rim', 'Heritage Grove'],
    extendedDescription: 'Meridian is Idaho\'s second-largest city with over 130,000 residents and one of the fastest-growing communities in the United States. Located in Ada County between Boise and Nampa, Meridian has transformed from agricultural land into a modern suburban city filled with new master-planned communities, excellent schools, and abundant shopping and dining options at The Village at Meridian. Home Buyer Boise purchases homes throughout Meridian, specializing in newer subdivision properties in popular neighborhoods like Tuscany, Paramount, Lochsa Falls, Meridian Ranch, and Discovery Park. The city\'s explosive growth creates unique selling situations - homeowners who purchased new construction but need to relocate before establishing roots, families outgrowing starter homes after just a few years, investors liquidating rental properties, and divorcing couples splitting newly-purchased assets. Meridian\'s real estate market features predominantly modern single-family homes built since 2000, with many properties less than 10 years old offering contemporary floor plans, attached garages, and HOA-managed communities. We buy homes in any condition throughout Meridian - from brand-new construction you never moved into, to well-maintained family homes, to properties needing updates or repairs. The city attracts young families and professionals who sometimes face unexpected life changes requiring quick home sales. Home Buyer Boise provides fast cash offers with flexible closing timelines, no repair requirements, and the ability to avoid lengthy traditional listings. We understand Meridian sellers value efficiency, transparency, and fair market value offers.',
    landmarks: ['The Village at Meridian', 'Kleiner Memorial Park', 'Eagle Island State Park', 'Settlers Park', 'Wahooz Family Fun Zone', 'Roaring Springs Water Park', 'Meridian Speedway', 'Julius M. Kleiner Memorial Park', 'Lakeview Golf Course', 'Meridian City Hall'],
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
    ],
    marketStats: {
      medianPrice: '$475,000',
      daysOnMarket: '42 days',
      priceGrowth: '+6.8%'
    },
    faqs: [
      { question: 'How quickly can you close on my Meridian house?', answer: 'We can close in as little as 7 days on Meridian properties. Most sellers close within 2-3 weeks, but we accommodate any timeline that works for you.' },
      { question: 'Do you buy newer homes in Meridian subdivisions?', answer: 'Yes! We purchase homes of all ages in Meridian, including newer construction in Tuscany, Paramount, Lochsa Falls, and other modern subdivisions.' },
      { question: 'What if my Meridian home is in an HOA community?', answer: 'No problem! We\'re experienced with HOA properties and handle all the paperwork. HOA status doesn\'t affect our ability to make a cash offer.' },
      { question: 'Will you buy my Meridian home even if I still owe on the mortgage?', answer: 'Absolutely. We buy homes with existing mortgages all the time. The mortgage gets paid off at closing from the sale proceeds.' },
      { question: 'How do I get a cash offer on my Meridian home?', answer: 'Simply fill out our online form or call us. We\'ll gather basic information about your property and provide a no-obligation cash offer within 24 hours.' }
    ]
  },
  {
    slug: 'eagle',
    name: 'Eagle',
    county: 'ada',
    isPrimary: false,
    population: '35,000+',
    zipCodes: ['83616', '83646'],
    neighborhoods: ['Eagle Hills', 'Banbury', 'Silver Wing', 'Floating Feather', 'Lexington Hills', 'Hidden Springs', 'Eagle Springs', 'Avimor', 'Dry Creek Ranch', 'Lakemoor', 'Mill District'],
    extendedDescription: 'Eagle is one of the Treasure Valley\'s most affluent and desirable communities, combining small-town character with upscale amenities and easy access to outdoor recreation. With over 35,000 residents in Ada County just northwest of Boise, Eagle is known for its premium real estate, excellent schools, championship golf courses, and proximity to Eagle Island State Park and the Boise River. Home Buyer Boise serves Eagle homeowners who need to sell quickly, discreetly, and without the hassle of traditional listings. Eagle properties range from luxury estates on large acreage to upscale family homes in prestigious subdivisions like Banbury, Silver Wing, and Eagle Hills. We purchase high-end properties throughout Eagle, providing fair market value cash offers on homes of all price points. Common selling situations in Eagle include: executive relocations to other states, estate sales of luxury properties, downsizing empty-nesters moving from large family homes, divorce property settlements involving high-value assets, and pre-foreclosure situations for homeowners seeking confidential solutions. Eagle homeowners value discretion, professionalism, and respect for their privacy. We provide white-glove service with confidential evaluations, fair cash offers, and flexible closing timelines. Whether your Eagle property is a meticulously maintained luxury home, an estate requiring updates, or a high-end property with deferred maintenance, Home Buyer Boise offers a straightforward selling solution without repairs, showings, or realtor commissions.',
    landmarks: ['Eagle Island State Park', 'Eagle Hills Golf Course', 'Heritage Park', 'Eagle Farmers Market', 'Eagle Historical Museum', 'Wildlife Reserve', 'Boise River', 'BanBury Golf Course', 'Downtown Eagle', 'Eagle Sports Complex'],
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
    ],
    marketStats: {
      medianPrice: '$575,000',
      daysOnMarket: '48 days',
      priceGrowth: '+4.5%'
    },
    faqs: [
      { question: 'Do you buy luxury homes in Eagle?', answer: 'Yes! We purchase Eagle properties at all price points, including luxury homes and estate properties. We provide fair market value offers and discrete service.' },
      { question: 'How quickly can you close on an Eagle property?', answer: 'We can close in as little as 7 days, though luxury properties sometimes take 2-3 weeks for title work. We work on your timeline.' },
      { question: 'Is the selling process confidential?', answer: 'Absolutely. We understand Eagle homeowners often value privacy. There are no yard signs, no public listings, and no parade of strangers through your home.' },
      { question: 'Do you buy Eagle homes with acreage?', answer: 'Yes! We purchase properties of all sizes in Eagle, from standard subdivision lots to larger acreage and estate properties.' },
      { question: 'What areas of Eagle do you serve?', answer: 'We buy homes throughout Eagle including Eagle Hills, Banbury, Silver Wing, Floating Feather, Hidden Springs, Avimor, and all surrounding areas.' }
    ]
  },
  {
    slug: 'star',
    name: 'Star',
    county: 'ada',
    isPrimary: false,
    population: '12,000+',
    zipCodes: ['83669'],
    neighborhoods: ['Star Meadows', 'Riverside Village', 'Willow Creek', 'Pearl District', 'Heron River', 'Landings at Star', 'Star River Ranch', 'Corey Barton Homes'],
    extendedDescription: 'Star, Idaho is a rapidly growing small city in Ada County with over 12,000 residents, located along State Highway 44 between Eagle and Middleton. Known for its rural character and strong sense of community, Star offers residents a peaceful small-town lifestyle with convenient access to Boise metro area amenities just 20 minutes east. Home Buyer Boise purchases homes throughout Star, serving homeowners who value the city\'s spacious lots, rural atmosphere, and tight-knit community. The city features a mix of established horse properties on acreage, newer residential subdivisions with modern homes, and rural properties transitioning from agricultural to residential use. Star\'s real estate market appeals to families seeking larger lots and a more rural lifestyle while maintaining proximity to Boise employment centers. We buy all property types in Star - from horse properties and rural acreage to suburban family homes in newer subdivisions like Star Meadows and Riverside Village. Common seller situations include: relocating families moving out of state, empty-nesters downsizing from large rural properties, inherited acreage or horse properties, divorce settlements involving rural real estate, and sellers tired of maintaining larger properties. Star homeowners appreciate straightforward, honest service from local buyers who understand rural property values and unique characteristics. Home Buyer Boise provides fair cash offers on properties of all sizes - whether your Star home is a small-town charmer, a modern subdivision property, or a multi-acre rural estate. No repairs, no showings, no waiting for buyer financing.',
    landmarks: ['Star Town Hall', 'Star Community Park', 'Riverside Park', 'Highway 44 Corridor', 'Star Elementary School', 'Pearl District', 'Boise River', 'Star Merc'],
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
    ],
    marketStats: {
      medianPrice: '$425,000',
      daysOnMarket: '45 days',
      priceGrowth: '+5.2%'
    },
    faqs: [
      { question: 'Do you buy rural properties and acreage in Star?', answer: 'Yes! We purchase all property types in Star including rural homes on acreage, horse properties, and suburban subdivision homes.' },
      { question: 'How quickly can you close on a Star property?', answer: 'We can close in as little as 7-14 days on most Star properties. Larger acreage may require additional time for title work.' },
      { question: 'Do you buy homes in the newer Star subdivisions?', answer: 'Absolutely! We purchase homes in Star Meadows, Riverside Village, Heron River, and all other Star neighborhoods both new and established.' },
      { question: 'What if my Star home has outbuildings or barns?', answer: 'We buy properties with outbuildings, barns, shops, and other structures. These are factored into our fair cash offer.' },
      { question: 'Is there any obligation if I request a cash offer?', answer: 'None at all. Our cash offers are free and come with no obligation. You\'re free to accept, decline, or take time to consider.' }
    ]
  },
  {
    slug: 'middleton',
    name: 'Middleton',
    county: 'canyon',
    isPrimary: false,
    population: '10,000+',
    zipCodes: ['83644'],
    neighborhoods: ['Heights', 'Middleton Mill', 'Ustick Corridor', 'Purple Sage', 'Somerset', 'Middleton Place', 'Quail Ridge', 'Sunrise Rim'],
    extendedDescription: 'Middleton, Idaho is a charming small city in Canyon County with over 10,000 residents, strategically located between Caldwell and Star along Highway 44. This growing community offers an appealing blend of rural character, modern amenities, and affordable housing options that attract young families and professionals seeking small-town living with easy commute access to Boise, Nampa, and Caldwell. Home Buyer Boise purchases homes throughout Middleton, serving sellers who value honest, straightforward dealings and fair pricing. The city features a mix of older established neighborhoods with mature homes, newer subdivisions with contemporary designs, and transitional areas where agricultural properties are converting to residential development. Middleton\'s real estate market offers more affordable options compared to Boise and Meridian, making it attractive to first-time homebuyers, young families, and investors. We buy homes in all conditions throughout Middleton - from charming older homes with character, to well-maintained family residences, to properties needing updates or repairs. Common seller situations in Middleton include: job relocations, inherited properties from family estates, rental property liquidation, divorce settlements, downsizing, and homeowners seeking quick sales to avoid foreclosure. Middleton residents value honest communication, fair pricing, and reliable follow-through. Home Buyer Boise provides exactly that - straightforward cash offers, transparent processes, and the flexibility to close on your timeline. Whether your Middleton property is move-in ready or needs significant work, we make fair offers and treat you with respect.',
    landmarks: ['Middleton Place Park', 'Kleiner Park', 'Boise River Wildlife Management Area', 'Middleton Mill', 'Highway 44 Business District', 'Middleton Schools Complex', 'Purple Sage Golf Course', 'Middleton Community Center'],
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
    ],
    marketStats: {
      medianPrice: '$385,000',
      daysOnMarket: '40 days',
      priceGrowth: '+4.8%'
    },
    faqs: [
      { question: 'How fast can you close on my Middleton house?', answer: 'We can close in as little as 7 days on Middleton properties. Most transactions complete within 2-3 weeks.' },
      { question: 'Do you buy older homes in Middleton?', answer: 'Yes! We purchase Middleton homes of all ages and conditions, from historic properties to new construction.' },
      { question: 'What if my Middleton home needs major repairs?', answer: 'No problem! We buy houses as-is regardless of condition. Foundation issues, roof problems, outdated systems - we handle it all.' },
      { question: 'Are there any fees when selling to Home Buyer Boise?', answer: 'Zero fees. We cover all closing costs. The cash offer we make is exactly what you receive at closing.' },
      { question: 'How do I start the process?', answer: 'Simply fill out our quick online form or give us a call. We\'ll ask a few questions about your property and provide a no-obligation cash offer within 24 hours.' }
    ]
  },
  {
    slug: 'nampa',
    name: 'Nampa',
    county: 'canyon',
    isPrimary: false,
    population: '100,000+',
    zipCodes: ['83651', '83686', '83687'],
    neighborhoods: ['Centennial', 'Southridge', 'Deer Flat', 'Greenhurst', 'Painted Ridge', 'Lakeshore', 'Canyon Springs', 'Happy Valley', 'Ridgecrest', 'Sage Valley', 'Amity', 'Karcher'],
    extendedDescription: 'Nampa is Idaho\'s third-largest city with over 100,000 residents, located in Canyon County just west of Meridian. As a major hub of the Treasure Valley, Nampa offers affordable housing options, growing employment opportunities, and a strong sense of community. The city features diverse neighborhoods ranging from historic downtown areas to modern suburban developments. Nampa\'s real estate market appeals to first-time homebuyers, growing families, and investors seeking rental properties. With ongoing development and infrastructure improvements, Nampa continues to grow as an integral part of the Boise metropolitan area. Home Buyer Boise serves Nampa homeowners seeking fast, fair cash offers for their properties. Whether you\'re facing foreclosure, inheriting a property, going through divorce, or simply need to sell quickly for any reason, we provide solutions tailored to your situation. We buy homes in all conditions throughout Nampa - from well-maintained properties in established neighborhoods to houses needing significant repairs. The city\'s affordability and growth potential make it attractive to our investment approach, allowing us to make competitive offers on Nampa properties. Our straightforward process eliminates the stress of traditional home selling: no repairs, no cleaning, no showings, no waiting months for a buyer. Just a fair cash offer and a closing date that works for you.',
    landmarks: ['Nampa Civic Center', 'Lake Lowell', 'Ford Idaho Center', 'Nampa Recreation Center', 'Warhawk Air Museum', 'Northwest Nazarene University', 'Lakeview Park', 'Nampa Train Depot Museum', 'Mercy Medical Center', 'Karcher Mall'],
    serviceConsiderations: 'Nampa offers diverse property types from historic homes to new construction. Affordable housing market attracts first-time buyers and investors. Growing employment centers and retail development drive housing demand. We purchase homes in all conditions and price points throughout Nampa.',
    localFactors: {
      climate: 'Semi-arid with hot summers and cold winters',
      soil: 'N/A',
      commonNeeds: ['Affordable housing', 'First-time buyer properties', 'Investment opportunities', 'Growing neighborhoods']
    },
    facts: [
      { label: 'Population', value: '100,000+' },
      { label: 'Median Home Price', value: '$375,000' },
      { label: 'County', value: 'Canyon' },
      { label: 'Distance to Boise', value: '20 miles' },
      { label: 'Market Type', value: 'Affordable suburban' },
      { label: 'Growth Rate', value: 'Rapid' }
    ],
    marketStats: {
      medianPrice: '$375,000',
      daysOnMarket: '38 days',
      priceGrowth: '+5.5%'
    },
    faqs: [
      { question: 'How quickly can you buy my Nampa house?', answer: 'We can close on your Nampa house in as little as 7 days. Most transactions complete within 2-3 weeks, but we work on your timeline.' },
      { question: 'Do you buy houses in all Nampa neighborhoods?', answer: 'Yes! We purchase homes throughout Nampa including Southridge, Deer Flat, Greenhurst, Centennial, and all other areas.' },
      { question: 'What if I\'m behind on my mortgage payments?', answer: 'We can still buy your Nampa home. A quick sale may help you avoid foreclosure and protect your credit. Contact us immediately to discuss options.' },
      { question: 'Do you buy homes with tenants in Nampa?', answer: 'Yes! We purchase rental properties with existing tenants in place. You don\'t need to evict or manage the transition.' },
      { question: 'How much will you pay for my Nampa home?', answer: 'Our cash offers are based on comparable sales, property condition, and current market conditions. Every offer is fair and transparent.' }
    ]
  },
  {
    slug: 'caldwell',
    name: 'Caldwell',
    county: 'canyon',
    isPrimary: false,
    population: '60,000+',
    zipCodes: ['83605', '83606', '83607'],
    neighborhoods: ['Downtown', 'Indian Creek', 'Syringa Valley', 'Lakeshore', 'Canyon Hill', 'Ustick Road', 'Purple Sage', 'Farmway Village', 'Middleton Road'],
    extendedDescription: 'Caldwell is Canyon County\'s seat with over 60,000 residents, located west of Nampa in the Treasure Valley. Known for its agricultural heritage, affordable housing, and growing economy, Caldwell offers family-friendly neighborhoods and strong community values. The city features a revitalized downtown, excellent schools including the College of Idaho, and expanding retail and employment centers. Caldwell\'s real estate market provides opportunities for homebuyers seeking affordability combined with good schools and community amenities. As the western anchor of the Treasure Valley, Caldwell continues to attract families and businesses. Home Buyer Boise purchases homes throughout Caldwell, serving homeowners who need fast, fair cash offers without the hassle of traditional listings. Common selling situations include: inherited properties requiring quick liquidation, divorce settlements needing equitable division, job relocations with tight timelines, and homes requiring repairs that owners can\'t afford or don\'t want to undertake. Caldwell\'s affordable market makes it attractive for investment, allowing us to offer competitive cash prices for properties in any condition. Whether your Caldwell home is in a historic neighborhood near downtown or a newer subdivision on the outskirts, we can provide a cash offer within 24 hours and close on your timeline.',
    landmarks: ['College of Idaho', 'Caldwell Event Center', 'Indian Creek Plaza', 'Canyon Hill', 'Memorial Park', 'Caldwell Downtown District', 'Caldwell Train Depot', 'Canyon County Historical Society Museum', 'Treasure Valley Community College'],
    serviceConsiderations: 'Caldwell features affordable family homes with good school access. Mix of established and new neighborhoods. Growing west Treasure Valley market with development opportunities. We buy homes in all conditions throughout Caldwell.',
    localFactors: {
      climate: 'Semi-arid with hot, dry summers and cold winters',
      soil: 'N/A',
      commonNeeds: ['Family housing', 'Affordability', 'School proximity', 'Community amenities']
    },
    facts: [
      { label: 'Population', value: '60,000+' },
      { label: 'Median Home Price', value: '$340,000' },
      { label: 'County', value: 'Canyon' },
      { label: 'Distance to Boise', value: '30 miles' },
      { label: 'Market Type', value: 'Affordable family' },
      { label: 'Growth Rate', value: 'Steady' }
    ],
    marketStats: {
      medianPrice: '$340,000',
      daysOnMarket: '42 days',
      priceGrowth: '+4.2%'
    },
    faqs: [
      { question: 'How fast can you close on my Caldwell house?', answer: 'We can close in as little as 7 days on Caldwell properties. Most transactions complete within 2-3 weeks.' },
      { question: 'Do you buy houses near downtown Caldwell?', answer: 'Yes! We purchase homes throughout all of Caldwell including downtown, Indian Creek, Canyon Hill, and all surrounding neighborhoods.' },
      { question: 'What condition does my Caldwell home need to be in?', answer: 'Any condition! We buy Caldwell homes as-is whether they\'re move-in ready, need cosmetic updates, or require major repairs.' },
      { question: 'Are there closing costs when I sell to you?', answer: 'No closing costs for you. We pay all typical closing costs, so the cash offer amount is what you receive.' },
      { question: 'How do I know your offer is fair?', answer: 'We base our offers on recent comparable sales in your Caldwell neighborhood and current market conditions. Our process is transparent and we\'re happy to explain how we arrived at our offer.' }
    ]
  }
];

// Helper function to get a city by slug
export function getCityBySlug(slug: string): CityData | undefined {
  return CITIES.find(c => c.slug === slug);
}

// Get all city slugs
export function getAllCitySlugs(): string[] {
  return CITIES.map(c => c.slug);
}

// Get all city names
export function getAllCityNames(): string[] {
  return CITIES.map(c => c.name);
}

// Get cities by county
export function getCitiesByCounty(county: 'ada' | 'canyon'): CityData[] {
  return CITIES.filter(c => c.county === county);
}
