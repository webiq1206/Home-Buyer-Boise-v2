import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { TrustBadges } from "@/components/TrustBadges";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { QuoteWizard } from "@/components/QuoteWizard";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CheckCircle2, Home, Clock, DollarSign, Shield, ArrowRight, MapPin, Star, Check, X, Phone, Award, Users, Building, TrendingUp, Calendar, Zap, Quote, FileText, Heart } from "lucide-react";
import { 
  generateLocalBusinessSchema, 
  generateServiceSchema, 
  generateBreadcrumbSchema,
  generateFAQSchema,
  injectStructuredData,
  CITY_SEO_DATA,
  BUSINESS_INFO
} from "@/lib/seo";
import { SERVICES } from "@shared/servicesData";

interface AreaTemplateProps {
  cityName: string;
  citySlug: string;
}

const CITY_EXTENDED_CONTENT: Record<string, {
  intro: string;
  marketOverview: string;
  neighborhoods: string[];
  landmarks: string[];
  whyUs: string;
  population: string;
  medianHomePrice: string;
  avgDaysOnMarket: string;
  yearOverYearChange: string;
  localEconomy: string;
  uniqueSellingPoints: string[];
}> = {
  kuna: {
    intro: `Kuna, Idaho has transformed from a small agricultural community into one of the Treasure Valley's fastest-growing cities. Located just 20 miles southwest of downtown Boise, Kuna offers homeowners the perfect blend of rural charm and suburban convenience. If you need to sell your house fast in Kuna, Home Buyer Boise provides the fastest, most reliable cash home buying service in the area. We've been purchasing homes throughout Kuna since 2018, and we understand the unique characteristics of every Kuna neighborhood - from the established areas near downtown to the newer developments along Ten Mile Road.`,
    marketOverview: `The Kuna real estate market has experienced significant growth over the past decade, with home values appreciating substantially. However, selling through traditional methods can still take 60-90+ days with uncertainty around buyer financing. Many Kuna homeowners choose to sell to us when they need guaranteed results - whether they're relocating for work at nearby military bases, dealing with inherited property, or simply want to avoid the hassle of repairs and showings. Our cash offers provide certainty that traditional sales can't match.`,
    neighborhoods: ["Indian Creek", "Black Cat", "Crimson Point", "Ten Mile Creek", "Deer Flat", "Kuna West", "Downtown Kuna", "Meridian Road Corridor"],
    landmarks: ["Kuna Caves", "Swan Falls Dam", "Indian Creek Plaza", "Kuna High School", "Birds of Prey National Conservation Area", "Initial Point", "Celebration Park"],
    whyUs: `As local Treasure Valley residents ourselves, we know Kuna isn't just another suburb - it's a tight-knit community with its own identity. When you sell to Home Buyer Boise, you're working with neighbors who understand Kuna's agricultural heritage, the impact of rapid growth on older properties, and what makes each neighborhood unique. We don't treat Kuna homes like commodities; we understand the local market dynamics that affect your property's value.`,
    population: "24,011",
    medianHomePrice: "$425,000",
    avgDaysOnMarket: "45 days",
    yearOverYearChange: "+8.2%",
    localEconomy: "Kuna's economy benefits from proximity to Boise while maintaining its own commercial base along Meridian Road. Major employers include the school district, local agriculture, and the Birds of Prey Area. Many residents commute to Boise, Meridian, or Mountain Home Air Force Base for employment.",
    uniqueSellingPoints: [
      "Fastest-growing city in Ada County",
      "Lower property taxes than Boise",
      "Strong community schools",
      "Rural feel with city conveniences",
      "Easy access to outdoor recreation"
    ]
  },
  boise: {
    intro: `As Idaho's capital and largest city, Boise offers incredible diversity in neighborhoods, property types, and price points. From the historic North End's craftsman homes to the Bench's mid-century properties, downtown's urban condos to the foothills' luxury estates - Home Buyer Boise has purchased homes throughout every Boise neighborhood. If you need to sell your Boise house fast for cash, we provide fair offers based on deep local market knowledge accumulated over years of buying homes across the city.`,
    marketOverview: `Boise's real estate market gained national attention as one of America's hottest markets, with significant price appreciation and population growth. While the market has stabilized, Boise remains highly desirable with strong buyer demand. Traditional sales still take 30-60+ days with listing agent commissions around 5-6%. For homeowners who need speed, certainty, or want to avoid repairs, our cash buying service offers a compelling alternative. We can close in as little as 7 days or work on your extended timeline.`,
    neighborhoods: ["North End", "Hyde Park", "Bench", "Downtown", "East End", "West Boise", "Southeast Boise", "Southwest Boise", "Boise Highlands", "Morris Hill", "Central Rim", "Depot Bench"],
    landmarks: ["Idaho State Capitol", "Boise River Greenbelt", "Table Rock", "Hyde Park", "Julia Davis Park", "BSU Campus", "Bogus Basin", "Camel's Back Park", "Zoo Boise", "Old Idaho Penitentiary"],
    whyUs: `We've purchased homes in virtually every Boise neighborhood over the past 6+ years. Our experience means we understand the nuances that affect value - why a North End bungalow commands a premium, how Bench homes compare to Southeast Boise, what improvements matter and which don't. This deep local knowledge translates to fairer offers for you. We're not a national corporation using algorithms; we're local investors who know Boise intimately.`,
    population: "235,421",
    medianHomePrice: "$485,000",
    avgDaysOnMarket: "38 days",
    yearOverYearChange: "+5.4%",
    localEconomy: "Boise's diverse economy includes technology (Micron, HP, startups), healthcare (St. Luke's, St. Al's), government, education (BSU, College of Idaho), and a thriving downtown commercial district. The city's economic stability and growth attract relocating professionals who fuel housing demand.",
    uniqueSellingPoints: [
      "Idaho's largest and most diverse housing market",
      "Strong appreciation history",
      "Diverse neighborhoods for every lifestyle",
      "Excellent walkability in older neighborhoods",
      "Access to world-class outdoor recreation"
    ]
  },
  meridian: {
    intro: `Meridian has transformed from a small farming community into Idaho's second-largest city and one of America's fastest-growing cities. This explosive growth means many Meridian homeowners find themselves in properties that have appreciated significantly - but also face the challenge of selling in a competitive market. Home Buyer Boise has purchased homes throughout Meridian since 2018, from original downtown properties to the newest subdivisions near Ten Mile. If you need to sell your Meridian house fast, we offer fair cash offers with guaranteed closing dates.`,
    marketOverview: `Meridian's housing market features predominantly newer construction, with many homes built in the 2000s-2020s. The average Meridian home spends about 40 days on market when listed traditionally, but this varies significantly by price point, location, and condition. Homes needing updates or repairs can sit for months. Our cash buying service is particularly valuable for Meridian sellers with properties that might struggle in the competitive resale market - we buy as-is and close fast.`,
    neighborhoods: ["Lochsa Falls", "Tuscany", "Paramount", "Meridian Ranch", "Silverstone", "Ten Mile", "Ustick Corridor", "Downtown Meridian", "Settlers Bridge", "Heritage", "Bainbridge", "Victory Commons"],
    landmarks: ["The Village at Meridian", "Julius M. Kleiner Memorial Park", "Eagle Island State Park", "Meridian Speedway", "Settlers Park", "Storey Park", "Discovery Park", "Roaring Springs Water Park", "Wahooz Family Fun Zone"],
    whyUs: `Meridian's rapid growth means property values can vary significantly even within the same subdivision. We understand these micro-market dynamics - how proximity to Ten Mile Road affects value differently than proximity to Eagle Road, why some older Meridian neighborhoods have appreciated more than newer ones, and what today's buyers are looking for. This knowledge ensures our cash offers reflect true market conditions, not just algorithm estimates.`,
    population: "117,635",
    medianHomePrice: "$475,000",
    avgDaysOnMarket: "42 days",
    yearOverYearChange: "+6.8%",
    localEconomy: "Meridian's economy centers on retail (The Village, numerous shopping centers), healthcare (St. Luke's Meridian), and proximity to Boise employers. The city has attracted significant commercial development along Eagle Road and Ten Mile, creating local jobs while many residents also commute to Boise for employment.",
    uniqueSellingPoints: [
      "Idaho's second-largest city",
      "Modern infrastructure and amenities",
      "Top-rated schools",
      "Strong family-oriented community",
      "Continued appreciation potential"
    ]
  },
  eagle: {
    intro: `Eagle represents the Treasure Valley's premium residential community, known for larger lots, custom homes, and an affluent lifestyle. From the established neighborhoods near downtown Eagle to the gated communities in the foothills, Eagle properties command premium prices - but selling them can present unique challenges. Home Buyer Boise provides discrete, professional cash buying services for Eagle homeowners who value privacy, speed, or convenience over maximum sale price. We understand Eagle's luxury market and price our offers accordingly.`,
    marketOverview: `Eagle's real estate market features higher price points and longer average days on market compared to neighboring communities. Luxury homes can sit for months waiting for the right buyer, and even mid-range Eagle properties require more marketing to reach qualified buyers. For Eagle homeowners who need to sell quickly - whether due to relocation, divorce, estate settlement, or other life changes - our cash buying service eliminates the uncertainty and extended timeline of luxury home sales.`,
    neighborhoods: ["Shadow Valley", "Banbury", "The Estates", "Floating Feather", "Eagle Hills", "Downtown Eagle", "Eagle Springs", "Dry Creek", "Hidden Springs", "Avimor", "Riverdale"],
    landmarks: ["Eagle Island State Park", "Heritage Park", "Eagle Hills Golf Course", "Downtown Eagle", "Dry Creek Trail", "Eagle Library", "Eagle Sports Complex", "Portneuf Valley Brewing"],
    whyUs: `Eagle's luxury market requires a different approach than standard cash home buying. We understand that Eagle homeowners have higher expectations for professionalism, discretion, and fair dealing. Our team handles Eagle transactions with the care and respect they deserve - no low-ball offers, no pressure tactics, just honest cash offers from local professionals who understand what makes Eagle properties special.`,
    population: "30,346",
    medianHomePrice: "$725,000",
    avgDaysOnMarket: "55 days",
    yearOverYearChange: "+4.2%",
    localEconomy: "Eagle's economy is primarily residential with a charming downtown commercial district. Many residents work in Boise or Meridian, valuing Eagle's quality of life, excellent schools, and larger lot sizes. The city has maintained its semi-rural character despite significant population growth.",
    uniqueSellingPoints: [
      "Premium residential community",
      "Larger lots and custom homes",
      "Excellent schools and low crime",
      "Maintained semi-rural character",
      "Strong property value retention"
    ]
  },
  star: {
    intro: `Star, Idaho offers homeowners the best of both worlds - affordable housing prices with reasonable proximity to Boise's amenities. As one of the Treasure Valley's fastest-growing communities, Star has attracted families seeking more space at lower prices than Boise, Meridian, or Eagle. Home Buyer Boise purchases homes throughout Star, from properties on larger acreage to newer subdivision homes. If you need to sell your Star house fast, we provide fair cash offers and can close on your timeline.`,
    marketOverview: `Star's real estate market features a mix of newer subdivisions and rural properties on larger lots. Home values have appreciated significantly as the city has grown, but the market can be more volatile than established communities. Properties that need updates or repairs can struggle to compete with new construction. Our cash buying service is ideal for Star sellers with older homes, properties needing work, or anyone who needs certainty and speed over maximum price.`,
    neighborhoods: ["Floating Feather", "Star Ranch", "Star Pointe", "Crossfield", "Heron Lake", "Star Creek", "Purple Sage", "Star Falls", "Meadowbrook"],
    landmarks: ["Star Community Park", "Willow Creek Park", "Happy Day Farms", "Star Library", "Star Sewer District Trail", "Star Falls Development"],
    whyUs: `Star's rapid growth means properties here can be harder to value accurately. A 2010 home might sit next to a 2023 new build, creating significant value differentials within the same neighborhood. We understand these complexities and price our offers based on actual market conditions, not just square footage and bedroom count. Our local knowledge ensures fair offers for Star homeowners.`,
    population: "11,117",
    medianHomePrice: "$450,000",
    avgDaysOnMarket: "48 days",
    yearOverYearChange: "+7.5%",
    localEconomy: "Star's economy is primarily residential, with most working residents commuting to Boise, Meridian, or Nampa for employment. The city has seen commercial growth along Highway 44, and new developments continue to attract families seeking affordable housing with good schools.",
    uniqueSellingPoints: [
      "More affordable than Boise or Eagle",
      "Rapid appreciation potential",
      "Larger lots available",
      "Growing commercial amenities",
      "Strong community feel"
    ]
  },
  middleton: {
    intro: `Middleton offers homeowners an affordable alternative to the more expensive communities in Ada County. Located in Canyon County, Middleton has seen significant growth while maintaining its small-town character and agricultural heritage. Home Buyer Boise purchases homes throughout Middleton, from downtown properties to rural homes on acreage. If you need to sell your Middleton house fast, we provide fair cash offers based on honest Canyon County market knowledge.`,
    marketOverview: `Middleton's real estate market offers more affordable options than Ada County communities, attracting first-time buyers and families seeking value. However, this also means homes can take longer to sell through traditional methods, as buyer pools are smaller. Properties needing repairs or updates can sit for months. Our cash buying service is particularly valuable for Middleton sellers who need speed and certainty.`,
    neighborhoods: ["Purple Sage", "Heights", "Country Club Estates", "Middleton Mill", "Middleton Place", "River Ranch", "Mill Creek", "Downtown Middleton"],
    landmarks: ["Middleton Mill", "Middleton Place", "Lake Lowell", "Middleton Library", "Middleton High School", "Purple Sage Golf Course"],
    whyUs: `Canyon County markets like Middleton are often underserved by cash home buyers who focus primarily on Ada County. We actively buy homes throughout Middleton because we know this community and appreciate its value. Our Canyon County experience means fair offers based on actual local market conditions, not Ada County assumptions.`,
    population: "9,480",
    medianHomePrice: "$380,000",
    avgDaysOnMarket: "52 days",
    yearOverYearChange: "+6.1%",
    localEconomy: "Middleton's economy includes agriculture, the school district, and local retail. Many residents commute to Nampa, Caldwell, or Boise for employment. The city has maintained affordable housing while benefiting from Treasure Valley growth.",
    uniqueSellingPoints: [
      "Most affordable Treasure Valley option",
      "Small-town community feel",
      "Agricultural heritage maintained",
      "Good schools",
      "Easy access to Boise via Highway 44"
    ]
  },
  nampa: {
    intro: `Nampa is Canyon County's largest city and the third-largest city in Idaho, offering a diverse mix of historic neighborhoods, newer developments, and affordable housing options. Home Buyer Boise has been actively purchasing homes throughout Nampa since 2018, understanding the unique dynamics of this rapidly growing community. If you need to sell your Nampa house fast, we provide fair cash offers and can close on your timeline, whether you're in downtown Nampa, near the Civic Center, or in one of the many growing subdivisions.`,
    marketOverview: `Nampa's real estate market offers significantly more affordable options than Ada County, making it attractive to first-time buyers and families seeking value. However, this affordability also means competition with new construction can make older homes harder to sell through traditional methods. Properties needing updates can sit for extended periods. Our cash buying service provides Nampa sellers with speed, certainty, and convenience that traditional sales cannot match.`,
    neighborhoods: ["Downtown Nampa", "Karcher Road", "Garrity Boulevard", "12th Avenue", "Nampa-Caldwell Boulevard", "Greenhurst", "Happy Valley", "Stampede", "Centennial", "Hughes", "Vista", "Ridgecrest"],
    landmarks: ["Nampa Civic Center", "Lakeview Park", "Ford Idaho Center", "Northwest Nazarene University", "Mercy Medical Center", "Nampa Gateway Center", "Wilson Springs Ponds", "Lake Lowell"],
    whyUs: `Canyon County markets require different expertise than Ada County. We understand that Nampa values are different from Boise or Meridian, and we price our offers accordingly. Our team knows the difference between older Nampa neighborhoods near downtown and newer developments along Garrity - this local knowledge translates to fairer offers based on actual market conditions, not Ada County assumptions.`,
    population: "106,000",
    medianHomePrice: "$395,000",
    avgDaysOnMarket: "50 days",
    yearOverYearChange: "+5.8%",
    localEconomy: "Nampa's diverse economy includes manufacturing, healthcare (Mercy Medical Center), education (Northwest Nazarene University), and significant retail along Nampa-Caldwell Boulevard and Garrity. The Ford Idaho Center brings events and visitors, while proximity to Boise provides additional employment opportunities.",
    uniqueSellingPoints: [
      "Most affordable major Treasure Valley city",
      "Strong job growth and economic development",
      "Diverse neighborhoods and housing options",
      "Growing downtown revitalization",
      "Easy access to Boise via I-84"
    ]
  },
  caldwell: {
    intro: `Caldwell, as Canyon County's county seat, offers homeowners some of the most affordable housing in the Treasure Valley while maintaining strong community character and excellent access to regional amenities. Home Buyer Boise actively purchases homes throughout Caldwell, from historic homes near downtown to newer developments in growing areas. If you need to sell your Caldwell house fast, we provide fair cash offers based on genuine Canyon County market knowledge.`,
    marketOverview: `Caldwell's real estate market features the most affordable home prices in the Treasure Valley, attracting value-conscious buyers. However, the smaller buyer pool can mean longer selling times through traditional methods, especially for properties needing repairs. Our cash buying service is particularly valuable for Caldwell homeowners who need guaranteed results without the uncertainty of traditional sales.`,
    neighborhoods: ["Downtown Caldwell", "Indian Creek", "Ustick Road", "Cleveland Boulevard", "Farmway", "Middleton Road", "Purple Sage", "Lake Shore Drive", "Karcher Road"],
    landmarks: ["College of Idaho", "Caldwell Fairgrounds", "Indian Creek Plaza", "Canyon County Courthouse", "Caldwell Night Rodeo", "Deer Flat National Wildlife Refuge", "Lake Lowell"],
    whyUs: `As Canyon County specialists, we understand that Caldwell values are different from Ada County communities. We don't apply Boise or Meridian assumptions to Caldwell properties. Our offers reflect actual Caldwell market conditions, local buyer preferences, and realistic repair cost estimates. We treat Caldwell homeowners with the same professionalism and fair dealing we provide throughout the Treasure Valley.`,
    population: "65,000",
    medianHomePrice: "$365,000",
    avgDaysOnMarket: "55 days",
    yearOverYearChange: "+5.2%",
    localEconomy: "Caldwell's economy includes agriculture (wine industry growth), education (College of Idaho), county government, and growing retail and commercial development along Cleveland Boulevard. The city has seen significant investment in downtown revitalization and remains an affordable option for commuters to Boise.",
    uniqueSellingPoints: [
      "Most affordable Treasure Valley community",
      "Strong agricultural and wine industry",
      "College of Idaho brings cultural amenities",
      "Downtown revitalization underway",
      "Growing Hispanic community and culture"
    ]
  }
};

const CITY_FAQS: Record<string, Array<{question: string; answer: string}>> = {
  kuna: [
    { question: "How fast can you buy my house in Kuna?", answer: "We can close on your Kuna home in as little as 7 days from your acceptance of our offer. Most Kuna closings happen within 10-14 days. If you need more time to move, we're happy to accommodate any timeline up to 60+ days. You choose the closing date that works best for your situation." },
    { question: "Do you buy houses in all Kuna neighborhoods?", answer: "Yes, we buy houses throughout all Kuna neighborhoods including Indian Creek, Black Cat, Crimson Point, Ten Mile Creek, downtown Kuna, and all surrounding areas. We also purchase properties on larger acreage in rural Kuna areas." },
    { question: "What if my Kuna house needs major repairs?", answer: "We buy Kuna homes in any condition - foundation issues, roof damage, outdated systems, cosmetic problems, or complete fixer-uppers. You don't need to make any repairs before selling to us. We handle all repairs and renovations after closing." },
    { question: "How do you determine your cash offer for my Kuna home?", answer: "We analyze recent comparable sales in your Kuna neighborhood, assess your home's condition during a brief walkthrough, factor in needed repairs, and calculate our offer based on current market values. We provide full transparency in how we arrive at our offer amount." },
    { question: "Are there any fees when selling my Kuna house to you?", answer: "Absolutely zero fees. We pay all closing costs, there are no realtor commissions (saving you 5-6%), and no hidden charges. The cash offer we make is exactly what you'll receive at closing." },
    { question: "What if I'm behind on my mortgage payments in Kuna?", answer: "We can still help. We'll calculate your mortgage payoff including any arrears, and if there's equity remaining after paying off your loan, you'll receive the difference in cash. Selling to us can help you avoid foreclosure and protect your credit." },
    { question: "How quickly can I get a cash offer for my Kuna property?", answer: "We typically provide cash offers within 24 hours of your initial contact. After a brief property walkthrough (or sight-unseen offer if you prefer), you'll receive a written offer with no obligation to accept." },
    { question: "Can you buy my Kuna house if it's currently rented?", answer: "Yes, we buy occupied rental properties in Kuna. Whether your tenants are current, behind on rent, or you're dealing with eviction, we can purchase your property and handle all tenant issues after closing." }
  ],
  boise: [
    { question: "How fast can you buy my house in Boise?", answer: "We can close on your Boise home in as little as 7 days. Most Boise transactions close within 10-14 days. We use reputable local title companies to ensure smooth, fast closings. You choose the closing date that works for your timeline." },
    { question: "Do you buy houses in all Boise neighborhoods?", answer: "Yes, we purchase homes throughout every Boise neighborhood - North End, Hyde Park, Bench, Downtown, East End, West Boise, Southeast Boise, Southwest Boise, the foothills, and all surrounding areas. From historic craftsman homes to modern construction, we buy them all." },
    { question: "What types of Boise properties do you buy?", answer: "We buy single-family homes, townhomes, condos, duplexes, multi-family properties, and even some commercial properties in Boise. Any condition, any situation, any neighborhood." },
    { question: "How do your offers compare to listing with a Boise realtor?", answer: "Our offers are typically 85-95% of what you might get listing with a realtor, but you save 5-6% in commissions, avoid repair costs ($5,000-$30,000 typical), close faster, and have 100% certainty the deal will close. For many sellers, the net proceeds are comparable while the convenience is vastly superior." },
    { question: "What makes Home Buyer Boise different from other cash buyers?", answer: "We're a local Boise company, not a national franchise or algorithm-driven website. We've purchased over 200 homes in the Treasure Valley since 2018. Our team lives and works in Boise, so our offers reflect real local market knowledge, not generic formulas." },
    { question: "Can you help if I'm going through divorce in Boise?", answer: "Absolutely. We've helped many Boise couples sell quickly during divorce. We provide a neutral third-party sale, fair market offers, fast closings, and can work with your attorneys to ensure proper asset division. It's a way to move forward quickly." },
    { question: "Do you buy houses near Boise State University?", answer: "Yes, we actively purchase properties near BSU including the Depot Bench, Central Bench, and surrounding neighborhoods. We buy student rental properties, family homes, and investment properties throughout the BSU area." },
    { question: "What if my Boise house has a lien or title issue?", answer: "We regularly purchase properties with liens, title issues, code violations, and other complications. Our title company will research all liens and we'll calculate payoffs into our offer. You'll walk away clean with no liens following you." }
  ],
  meridian: [
    { question: "How fast can you close on my Meridian house?", answer: "We can close on your Meridian home in as little as 7 days. Most Meridian closings happen within 10-14 days using local title companies. You choose the date that works for you - whether that's next week or 60 days from now." },
    { question: "Do you buy houses in all Meridian subdivisions?", answer: "Yes, we purchase homes throughout all Meridian neighborhoods and subdivisions - Lochsa Falls, Tuscany, Paramount, Meridian Ranch, Ten Mile area, downtown Meridian, and everywhere in between. New construction or established neighborhoods, we buy them all." },
    { question: "What condition does my Meridian house need to be in?", answer: "Any condition at all. We buy pristine homes and complete fixer-uppers. Outdated kitchens, worn carpets, roof issues, foundation problems - we buy it all as-is without requiring any repairs from you." },
    { question: "Are your Meridian home offers competitive?", answer: "Our offers are based on detailed analysis of recent Meridian sales in your specific neighborhood. We factor in condition, location, lot size, and current market trends. Our goal is fair pricing that makes sense for both parties - we're buying for investment, not trying to lowball." },
    { question: "How is selling to you different from Opendoor or Offerpad?", answer: "Unlike iBuyers like Opendoor, we're local and can actually close in 7 days. We don't charge service fees (iBuyers typically charge 5-8%), and we buy houses in any condition including those that iBuyers would reject. Personal service from locals, not a faceless corporation." },
    { question: "Can you buy my house if I need to relocate from Meridian quickly?", answer: "Absolutely. We specialize in helping relocating homeowners. Whether your company gave you 2 weeks notice or 2 months, we can close before you need to leave. No carrying two mortgages, no house stress in your new city." },
    { question: "Do you buy houses near The Village at Meridian?", answer: "Yes, we purchase homes throughout the Village area, downtown Meridian, and all surrounding neighborhoods. Properties near The Village often command premiums, which we factor into our offers." },
    { question: "What if my Meridian house is worth over $500,000?", answer: "We purchase homes at all price points in Meridian, including higher-value properties. We have the cash resources to buy homes well into the $700,000+ range. Larger purchases just require verification of funds, which we can provide." }
  ],
  eagle: [
    { question: "Do you buy luxury homes in Eagle?", answer: "Yes, we purchase Eagle homes across all price ranges including luxury properties. We have the resources to buy homes valued at $1M+ and understand the unique considerations of Eagle's premium real estate market." },
    { question: "How discreet is your Eagle home buying process?", answer: "Completely discreet. We understand Eagle homeowners value privacy. There are no yard signs, no public open houses, no MLS listing, and no nosy neighbors watching showings. Just a private sale between you and our team." },
    { question: "How quickly can you close on an Eagle property?", answer: "We can close on Eagle homes in as little as 7-14 days, though luxury properties sometimes require 14-21 days for title work. You choose the timeline - fast closing or extended occupancy, we accommodate your needs." },
    { question: "Do you buy acreage properties in Eagle?", answer: "Yes, we purchase Eagle homes on larger lots and acreage. From 1/4 acre lots to 5+ acre properties, we buy them all. We understand that Eagle's larger lots are a significant value factor." },
    { question: "What neighborhoods in Eagle do you serve?", answer: "We buy homes throughout all Eagle areas - Shadow Valley, Banbury, The Estates, Floating Feather, Eagle Hills, downtown Eagle, Hidden Springs, Avimor, and all surrounding communities." },
    { question: "Are your Eagle offers fair for the luxury market?", answer: "Our Eagle offers reflect the premium nature of the market. We're not using generic formulas - we analyze actual Eagle sales data, understand the differences between neighborhoods, and price accordingly. We can't compete with fully-marketed luxury sales, but our offers are fair for the speed and convenience we provide." },
    { question: "Can you help with an inherited Eagle estate?", answer: "Yes, we specialize in inherited property sales. We can work within probate timelines, coordinate with attorneys, handle estate clean-outs, and work with multiple heirs located in different states. Eagle estates often have additional complexities we're experienced with." },
    { question: "What if my Eagle home has a septic system or well?", answer: "No problem. Many Eagle properties have private water and septic. We're experienced with these systems and factor their condition into our offers. You don't need to make any repairs or upgrades before selling." }
  ],
  star: [
    { question: "How fast can you buy my Star house?", answer: "We can close on your Star home in as little as 7 days. Most Star transactions close within 10-14 days. You choose the closing date that works best for your situation." },
    { question: "Do you buy properties on acreage in Star?", answer: "Yes, we purchase Star properties on larger lots and acreage. Whether you have a subdivision home or a property on 5+ acres, we'll provide a fair cash offer." },
    { question: "What Star neighborhoods do you buy in?", answer: "We buy throughout all Star areas - Floating Feather, Star Ranch, Star Pointe, Crossfield, Purple Sage, and all surrounding neighborhoods. Newer subdivisions and established areas alike." },
    { question: "How do you determine the value of my Star home?", answer: "We analyze recent Star sales, consider your home's condition and location, and factor in current market trends. Star's rapidly changing market requires up-to-date analysis, which we provide through actual local market research." },
    { question: "What if my Star house needs significant repairs?", answer: "We buy Star homes in any condition. Foundation issues, roof problems, outdated everything - we handle it all after closing. You don't spend a dime on repairs." },
    { question: "Is there really no commission when selling to you?", answer: "Correct - zero commission. You're not using a realtor, so there's no 5-6% commission to pay. We also cover all closing costs. Our offer is what you receive." },
    { question: "Can you buy my Star house if I still owe on the mortgage?", answer: "Absolutely. We'll work with your lender to determine the payoff amount, and as long as there's equity after paying off the mortgage, you'll receive the difference in cash at closing." },
    { question: "How does selling to you compare to FSBO in Star?", answer: "FSBO (For Sale By Owner) saves commission but still requires repairs, showings, negotiations, and waiting for buyer financing. Selling to us eliminates all of that - no repairs, one showing, cash payment, your timeline. The convenience factor is significant." }
  ],
  middleton: [
    { question: "How fast can you buy my Middleton house?", answer: "We can close on your Middleton home in as little as 7 days. Most Canyon County closings take 10-14 days. You pick the closing date that works for your schedule." },
    { question: "Do you actually buy houses in Canyon County?", answer: "Yes, we actively purchase homes throughout Canyon County including Middleton, Nampa, and Caldwell. While some cash buyers focus only on Ada County, we know Canyon County well and provide fair offers based on local market conditions." },
    { question: "What Middleton areas do you serve?", answer: "We buy throughout all Middleton - Purple Sage, the Heights, Country Club Estates, downtown Middleton, Middleton Mill area, and all surrounding neighborhoods including rural properties." },
    { question: "Are your Middleton offers competitive with the local market?", answer: "Our offers reflect actual Middleton market conditions, not Ada County assumptions. We understand that Middleton values are different from Boise or Meridian, and we price accordingly. Fair offers based on real local data." },
    { question: "What if my Middleton home is older and needs updates?", answer: "We buy homes in any condition. Many Middleton homes are older properties that need updating - we buy them as-is without requiring any repairs or improvements from you." },
    { question: "Can you help if I'm facing foreclosure in Middleton?", answer: "Yes, we've helped many Canyon County homeowners avoid foreclosure. We can close quickly, pay off your mortgage, and help you walk away with cash instead of a foreclosure on your record." },
    { question: "Do you buy mobile homes or manufactured homes in Middleton?", answer: "It depends on the situation. We generally purchase manufactured homes on owned land (not in parks), but each situation is unique. Contact us to discuss your specific property." },
    { question: "How does the Middleton process work?", answer: "Simple: contact us, we'll schedule a brief property visit, you'll receive a cash offer within 24 hours, accept and choose your closing date, sign paperwork at a local title company, and receive your cash. The entire process can take as little as 7 days." }
  ],
  nampa: [
    { question: "How fast can you buy my house in Nampa?", answer: "We can close on your Nampa home in as little as 7 days. Most Nampa closings happen within 10-14 days. You choose the closing date that works best for your situation - fast or extended timeline." },
    { question: "Do you buy houses in all Nampa neighborhoods?", answer: "Yes, we purchase homes throughout all Nampa neighborhoods - downtown, Karcher Road area, Garrity Boulevard, 12th Avenue, Greenhurst, Happy Valley, and all surrounding areas. Older homes and newer subdivisions alike." },
    { question: "What if my Nampa house needs major repairs?", answer: "We buy Nampa homes in any condition. Foundation issues, roof problems, outdated systems, fire damage, hoarder houses - we handle everything. You don't need to make any repairs before selling." },
    { question: "How do your Nampa offers compare to listing with a realtor?", answer: "Our offers are typically 85-90% of full market value, but you save 5-6% in commissions, avoid $10,000+ in repairs, close in days instead of months, and have 100% certainty. For many Nampa sellers, the net proceeds are comparable." },
    { question: "Are there any fees when selling my Nampa house to you?", answer: "Zero fees. We pay all closing costs, there are no realtor commissions, and no hidden charges. The cash offer we make is exactly what you'll receive at closing." },
    { question: "Can you buy my Nampa house if I'm behind on payments?", answer: "Yes, we can help. We'll calculate your mortgage payoff including any arrears. If there's equity remaining after paying off your loan, you'll receive the difference in cash. We can help you avoid foreclosure." },
    { question: "Do you buy houses near Northwest Nazarene University?", answer: "Yes, we actively purchase properties near NNU and throughout the surrounding neighborhoods. We buy student rentals, family homes, and investment properties in the university area." },
    { question: "What makes selling to you better than FSBO in Nampa?", answer: "FSBO saves commission but still requires repairs, dozens of showings, negotiations, and waiting for buyer financing that might fall through. Selling to us means no repairs, one walkthrough, cash payment, and your chosen timeline." }
  ],
  caldwell: [
    { question: "How fast can you buy my Caldwell house?", answer: "We can close on your Caldwell home in as little as 7 days. Most Caldwell closings take 10-14 days. You choose the closing date that works for your schedule." },
    { question: "Do you actually buy houses in Caldwell?", answer: "Yes, we actively purchase homes throughout Caldwell and all of Canyon County. While some cash buyers focus only on Ada County, we specialize in Canyon County and provide fair offers based on local market conditions." },
    { question: "What Caldwell neighborhoods do you serve?", answer: "We buy throughout all Caldwell - downtown, Indian Creek, Cleveland Boulevard, Ustick Road, Farmway, Lake Shore Drive, and all surrounding areas including rural properties." },
    { question: "Are your Caldwell offers fair for the local market?", answer: "Our offers reflect actual Caldwell market conditions. We understand that Caldwell values are different from Boise or Meridian, and we price accordingly. Fair offers based on real Canyon County data." },
    { question: "What if my Caldwell home is older and needs work?", answer: "We buy homes in any condition. Many Caldwell homes are older properties that need significant updating - we buy them completely as-is without requiring any repairs from you." },
    { question: "Can you help if I'm facing foreclosure in Caldwell?", answer: "Absolutely. We've helped many Canyon County homeowners avoid foreclosure. We can close quickly, pay off your mortgage, and help you walk away with cash instead of a foreclosure on your credit." },
    { question: "Do you buy houses near the College of Idaho?", answer: "Yes, we purchase properties throughout the College of Idaho area and surrounding neighborhoods. We buy rental properties, family homes, and investment properties in all Caldwell locations." },
    { question: "How does selling to Home Buyer Boise work in Caldwell?", answer: "Simple: contact us, we schedule a brief property visit, you receive a cash offer within 24 hours, accept and choose your closing date, sign at a local title company, and receive your cash. As quick as 7 days start to finish." }
  ]
};

export default function AreaTemplate({ cityName, citySlug }: AreaTemplateProps) {
  const cityContent = CITY_EXTENDED_CONTENT[citySlug] || CITY_EXTENDED_CONTENT.boise;
  const cityFaqs = CITY_FAQS[citySlug] || CITY_FAQS.boise;
  const citySeoData = CITY_SEO_DATA[cityName as keyof typeof CITY_SEO_DATA];
  
  const situations = [
    { 
      icon: Clock, 
      title: "Need to Sell Fast", 
      features: ["Close in as little as 7 days", "No waiting for buyer financing", "Flexible closing dates", "Move on your timeline"] 
    },
    { 
      icon: Home, 
      title: "Any Condition", 
      features: ["No repairs needed", "Sell as-is", "Foundation issues OK", "Fire or water damage accepted"] 
    },
    { 
      icon: DollarSign, 
      title: "Zero Fees", 
      features: ["No realtor commissions", "We pay all closing costs", "No inspection fees", "No appraisal required"] 
    },
  ];

  const benefits = [
    { icon: Award, title: 'Local Market Expertise', description: `Deep understanding of ${cityName}'s real estate market, neighborhood values, and property conditions specific to this area.` },
    { icon: DollarSign, title: 'Fair Cash Offers', description: 'Competitive offers based on current market comps and property condition - no lowball offers.' },
    { icon: Shield, title: 'Licensed & Insured', description: 'Fully licensed Idaho real estate buyers with complete liability coverage for your protection.' },
    { icon: Calendar, title: 'Flexible Timeline', description: 'Close in 7 days or take up to 90 days - we work on your schedule, not ours.' },
    { icon: Users, title: 'Professional Service', description: 'Clear communication, honest assessments, and respectful treatment throughout the entire process.' },
    { icon: CheckCircle2, title: 'No Hidden Costs', description: 'Our offer is what you get - no deductions, no surprise fees, no commission taken out.' },
  ];

  const processSteps = [
    { step: 1, title: "Contact Us", description: "Fill out our simple form or call us. Share basic details about your property.", timeline: "60 seconds" },
    { step: 2, title: "Property Visit", description: "We schedule a quick walkthrough at your convenience. No cleaning needed.", timeline: "30 minutes" },
    { step: 3, title: "Receive Offer", description: "Get a fair, no-obligation cash offer within 24 hours.", timeline: "24 hours" },
    { step: 4, title: "Accept & Choose Date", description: "If you accept, YOU choose the closing date - 7 days or 60 days.", timeline: "Your choice" },
    { step: 5, title: "Close & Get Paid", description: "Sign at a local title company and receive your cash.", timeline: "Same day" },
  ];

  const localBusinessSchema = generateLocalBusinessSchema(cityName);
  const serviceSchema = generateServiceSchema(cityName);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Service Areas', url: '/areas' },
    { name: `${cityName}, Idaho`, url: `/areas/${citySlug}` }
  ]);
  const faqSchema = generateFAQSchema(cityFaqs);

  return (
    <>
      <Helmet>
        <title>Sell Your House Fast in {cityName} Idaho | Cash Home Buyers | Home Buyer Boise</title>
        <meta 
          name="description" 
          content={`Need to sell your house fast in ${cityName}? Get a fair cash offer in 24 hours. No fees, no commissions, no repairs needed. We buy houses in any condition throughout ${cityName}, Idaho. Close in 7 days.`}
        />
        <meta name="keywords" content={`sell house fast ${cityName}, cash home buyers ${cityName}, we buy houses ${cityName} Idaho, sell my house ${cityName}, ${cityName} cash buyers, sell house for cash ${cityName}, cash for houses ${cityName}, ${cityName} house buyers, sell ${cityName} house quickly, ${cityName} home buyers, fast house sale ${cityName}, cash buyers near me ${cityName}`} />
        <link rel="canonical" href={`https://homebuyerboise.com/areas/${citySlug}`} />
        
        <meta property="og:title" content={`Sell Your House Fast in ${cityName} Idaho | Cash Home Buyers`} />
        <meta property="og:description" content={`Get a fair cash offer in 24 hours for your ${cityName} home. No fees, no commissions, close in 7 days.`} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://homebuyerboise.com/areas/${citySlug}`} />
        <meta property="og:image" content="https://homebuyerboise.com/og-image.png" />
        <meta property="og:locale" content="en_US" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`Sell Your House Fast in ${cityName} Idaho`} />
        <meta name="twitter:description" content={`Cash offer in 24 hours for your ${cityName} home. No fees, no commissions.`} />
        <meta name="twitter:image" content="https://homebuyerboise.com/og-image.png" />
        
        <script type="application/ld+json">
          {injectStructuredData(localBusinessSchema)}
        </script>
        <script type="application/ld+json">
          {injectStructuredData(serviceSchema)}
        </script>
        <script type="application/ld+json">
          {injectStructuredData(breadcrumbSchema)}
        </script>
        <script type="application/ld+json">
          {injectStructuredData(faqSchema)}
        </script>
      </Helmet>

      <div className="flex flex-col">
        {/* Hero Section */}
        <section className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/70">
          <div className="absolute inset-0 bg-grid-white/5"></div>
          
          <div className="container px-4 md:px-8 relative z-10">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="text-center lg:text-left space-y-6">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                    <MapPin className="h-4 w-4 text-white" />
                    <span className="text-sm font-medium text-white">Cash Home Buyers in {cityName}</span>
                  </div>
                  
                  <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight">
                    Sell Your {cityName} House
                    <br />
                    <span className="text-accent">Fast for Cash</span>
                  </h1>
                  
                  <p className="text-lg md:text-xl text-white/90">
                    Get a fair cash offer in 24 hours. No fees, no commissions, no repairs needed. Close on your timeline.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                    <Button 
                      size="lg" 
                      className="bg-accent hover:bg-accent/90 text-primary font-semibold px-8 h-12"
                      asChild
                      data-testid="button-get-offer"
                    >
                      <Link href="/get-quote">
                        Get My Cash Offer
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                    <Button 
                      size="lg" 
                      variant="outline" 
                      className="border-white/30 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 h-12 px-8"
                      asChild
                      data-testid="button-call"
                    >
                      <a href="tel:2084052275">(208) 405-2275</a>
                    </Button>
                  </div>
                  
                  {/* Trust signals */}
                  <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-4 text-white/80 text-sm">
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-accent" />
                      <span>{BUSINESS_INFO.rating} Rating</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-accent" />
                      <span>Licensed & Insured</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-accent" />
                      <span>24hr Offers</span>
                    </div>
                  </div>
                </div>

                <div className="lg:block">
                  <QuoteWizard preselectedCity={citySlug} defaultCity={citySlug} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Local Expertise Section - Extended Content */}
        <section className="py-16 md:py-20 bg-muted/30">
          <div className="container px-4 md:px-8">
            <div className="max-w-4xl mx-auto">
              <Badge className="mb-4">{cityName} Cash Home Buyers</Badge>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
                Local {cityName} Cash Home Buyers You Can Trust
              </h2>
              <div className="prose prose-lg max-w-none space-y-6">
                <p className="text-lg leading-relaxed text-muted-foreground">
                  {cityContent.intro}
                </p>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  {cityContent.marketOverview}
                </p>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  {cityContent.whyUs}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Market Stats Section */}
        <section className="py-16 md:py-20">
          <div className="container px-4 md:px-8">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <Badge className="mb-4">Market Data</Badge>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                  {cityName} Real Estate Market Overview
                </h2>
                <p className="text-lg text-muted-foreground">
                  Current market conditions affecting {cityName} home sales
                </p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <Card className="text-center hover-elevate" data-testid="stat-population">
                  <CardContent className="pt-6">
                    <Users className="h-8 w-8 mx-auto text-primary mb-3" />
                    <p className="text-3xl font-bold text-primary">{cityContent.population}</p>
                    <p className="text-sm text-muted-foreground">Population</p>
                  </CardContent>
                </Card>
                <Card className="text-center hover-elevate" data-testid="stat-median-price">
                  <CardContent className="pt-6">
                    <DollarSign className="h-8 w-8 mx-auto text-primary mb-3" />
                    <p className="text-3xl font-bold text-primary">{cityContent.medianHomePrice}</p>
                    <p className="text-sm text-muted-foreground">Median Home Price</p>
                  </CardContent>
                </Card>
                <Card className="text-center hover-elevate" data-testid="stat-dom">
                  <CardContent className="pt-6">
                    <Calendar className="h-8 w-8 mx-auto text-primary mb-3" />
                    <p className="text-3xl font-bold text-primary">{cityContent.avgDaysOnMarket}</p>
                    <p className="text-sm text-muted-foreground">Avg Days on Market</p>
                  </CardContent>
                </Card>
                <Card className="text-center hover-elevate" data-testid="stat-yoy">
                  <CardContent className="pt-6">
                    <TrendingUp className="h-8 w-8 mx-auto text-primary mb-3" />
                    <p className="text-3xl font-bold text-primary">{cityContent.yearOverYearChange}</p>
                    <p className="text-sm text-muted-foreground">Year-Over-Year</p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="mt-8 p-6 bg-muted/30 rounded-lg">
                <h3 className="font-semibold mb-3">{cityName} Local Economy</h3>
                <p className="text-muted-foreground leading-relaxed">{cityContent.localEconomy}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Neighborhoods Section */}
        <section className="py-16 md:py-20 bg-muted/30">
          <div className="container px-4 md:px-8">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <Badge className="mb-4">Service Areas</Badge>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                  {cityName} Neighborhoods We Serve
                </h2>
                <p className="text-lg text-muted-foreground">
                  We buy houses throughout all {cityName} neighborhoods and surrounding areas
                </p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {cityContent.neighborhoods.map((neighborhood, i) => (
                  <Card key={i} className="hover-elevate" data-testid={`neighborhood-${i}`}>
                    <CardContent className="pt-4 pb-4 text-center">
                      <MapPin className="h-5 w-5 mx-auto text-primary mb-2" />
                      <p className="font-medium text-sm">{neighborhood}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4 text-center">Notable {cityName} Landmarks & Areas</h3>
                <div className="flex flex-wrap justify-center gap-2">
                  {cityContent.landmarks.map((landmark, i) => (
                    <Badge key={i} variant="secondary" className="px-3 py-1">
                      {landmark}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How We Help Section */}
        <section className="py-16 md:py-20">
          <div className="container px-4 md:px-8">
            <div className="max-w-5xl mx-auto space-y-12">
              <div className="text-center max-w-3xl mx-auto">
                <Badge className="mb-4">Our Benefits</Badge>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
                  Why Sell to Home Buyer Boise in {cityName}?
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  We make selling your {cityName} house simple, fast, and hassle-free with no fees or commissions.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {situations.map((situation, index) => (
                  <Card key={index} className="hover-elevate transition-all duration-300" data-testid={`card-situation-${index}`}>
                    <CardHeader className="space-y-4">
                      <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center">
                        <situation.icon className="h-7 w-7 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-xl mb-2">{situation.title}</CardTitle>
                        <CardDescription>For {cityName} homeowners</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2.5">
                        {situation.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm">
                            <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                            <span className="leading-relaxed">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Section */}
        <section className="py-16 md:py-20 bg-gradient-to-br from-muted/20 to-background">
          <div className="container px-4 md:px-8">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <Badge className="mb-4">Compare Options</Badge>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                  Cash Offer vs. Traditional Listing in {cityName}
                </h2>
                <p className="text-lg text-muted-foreground">
                  See how selling to us compares to listing with a realtor
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Traditional Sale */}
                <Card className="border-2 border-muted/50">
                  <CardContent className="pt-6 pb-6">
                    <div className="text-center mb-6">
                      <div className="w-12 h-12 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-3">
                        <Home className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <h3 className="font-bold text-xl text-muted-foreground">Traditional Listing</h3>
                    </div>

                    <div className="space-y-3">
                      {[
                        { label: "Timeline", value: `${cityContent.avgDaysOnMarket} average` },
                        { label: "Repairs", value: "$5,000-$25,000 typical" },
                        { label: "Commissions", value: "5-6% (on $400k = $20-24k)" },
                        { label: "Closing Costs", value: "$3,000-$8,000" },
                        { label: "Certainty", value: "Deals fall through 15-20%" },
                        { label: "Hassle", value: "Showings, open houses, staging" },
                      ].map((item, index) => (
                        <div key={index} className="flex items-start gap-2 pb-3 border-b border-border/30">
                          <X className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                          <div className="flex-1">
                            <p className="font-semibold text-sm">{item.label}</p>
                            <p className="text-sm text-muted-foreground">{item.value}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Cash Offer */}
                <Card className="border-2 border-primary/50 bg-gradient-to-br from-primary/5 to-background shadow-lg">
                  <CardContent className="pt-6 pb-6">
                    <div className="text-center mb-6">
                      <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-3">
                        <Zap className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="font-bold text-xl text-primary">Cash Offer from Us</h3>
                    </div>

                    <div className="space-y-3">
                      {[
                        { label: "Timeline", value: "7-14 days (you choose)" },
                        { label: "Repairs", value: "$0 - we buy as-is" },
                        { label: "Commissions", value: "$0 - no realtors involved" },
                        { label: "Closing Costs", value: "$0 - we pay them all" },
                        { label: "Certainty", value: "100% - cash guaranteed" },
                        { label: "Hassle", value: "One walkthrough, no disruption" },
                      ].map((item, index) => (
                        <div key={index} className="flex items-start gap-2 pb-3 border-b border-primary/10">
                          <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <div className="flex-1">
                            <p className="font-semibold text-sm">{item.label}</p>
                            <p className="text-sm text-primary font-medium">{item.value}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Process Steps Section */}
        <section className="py-16 md:py-20">
          <div className="container px-4 md:px-8">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <Badge className="mb-4">Simple Process</Badge>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                  How to Sell Your {cityName} House Fast
                </h2>
                <p className="text-lg text-muted-foreground">
                  Our streamlined 5-step process gets you from contact to cash quickly
                </p>
              </div>

              <div className="space-y-4">
                {processSteps.map((step, index) => (
                  <Card 
                    key={index}
                    className="hover-elevate transition-all duration-300 border-primary/20 relative overflow-hidden"
                    data-testid={`process-step-${index}`}
                  >
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-primary to-primary/50" />
                    
                    <CardContent className="pt-5 pb-5 pl-8">
                      <div className="grid md:grid-cols-[auto_1fr_auto] gap-4 md:gap-6 items-center">
                        <div className="flex items-center justify-center">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg">
                            <span className="text-xl font-bold text-white">{step.step}</span>
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-lg mb-1">{step.title}</h3>
                          <p className="text-muted-foreground text-sm">{step.description}</p>
                        </div>
                        <Badge variant="secondary" className="bg-accent/10 text-accent border-accent/30">
                          <Clock className="h-3 w-3 mr-1" />
                          {step.timeline}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 md:py-20 bg-muted/30">
          <div className="container px-4 md:px-8">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <Badge className="mb-4">Why Choose Us</Badge>
                <h3 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                  Why {cityName} Homeowners Trust Home Buyer Boise
                </h3>
                <p className="text-lg text-muted-foreground">
                  Local expertise, fair offers, and professional service since 2018
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {benefits.map((benefit, i) => (
                  <div key={i} className="flex gap-4 p-6 rounded-lg bg-card border hover-elevate transition-all" data-testid={`benefit-${i}`}>
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <benefit.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">{benefit.title}</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Unique selling points */}
              <div className="mt-12 p-6 bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg border border-primary/20">
                <h4 className="font-semibold mb-4 text-center">What Makes {cityName} Special</h4>
                <div className="flex flex-wrap justify-center gap-3">
                  {cityContent.uniqueSellingPoints.map((point, i) => (
                    <Badge key={i} variant="secondary" className="px-3 py-1.5">
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                      {point}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Services Section */}
        <section className="py-16 md:py-20">
          <div className="container px-4 md:px-8">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <Badge className="mb-4">Our Services</Badge>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                  Cash Home Buying Services in {cityName}
                </h2>
                <p className="text-lg text-muted-foreground">
                  We help {cityName} homeowners in all situations
                </p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {SERVICES.slice(0, 8).map((service) => (
                  <Link key={service.slug} href={`/services/${service.slug}`}>
                    <Card className="hover-elevate cursor-pointer h-full" data-testid={`service-link-${service.slug}`}>
                      <CardContent className="pt-4 pb-4 text-center">
                        <p className="font-medium text-sm">{service.shortName}</p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 md:py-20 bg-muted/30">
          <div className="container px-4 md:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <Badge className="mb-4">FAQs</Badge>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                  Frequently Asked Questions About Selling in {cityName}
                </h2>
                <p className="text-lg text-muted-foreground">
                  Get answers to common questions about selling your {cityName} home for cash
                </p>
              </div>
              
              <Accordion type="single" collapsible className="space-y-4">
                {cityFaqs.map((faq, index) => (
                  <AccordionItem 
                    key={index} 
                    value={`faq-${index}`}
                    className="border border-border/50 rounded-lg px-6 bg-card"
                    data-testid={`faq-item-${index}`}
                  >
                    <AccordionTrigger className="text-left hover:no-underline py-4">
                      <span className="font-semibold text-base">{faq.question}</span>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-4 leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* Service Areas Section */}
        <section className="py-16 md:py-20">
          <div className="container px-4 md:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4">Service Areas</Badge>
              <h3 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
                Buying Houses Throughout the Treasure Valley
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                In addition to {cityName}, we buy houses throughout the Treasure Valley. Get your cash offer today no matter where your property is located.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {['Boise', 'Meridian', 'Eagle', 'Kuna', 'Star', 'Middleton', 'Nampa', 'Caldwell']
                  .filter(city => city !== cityName)
                  .map((city) => (
                    <Button key={city} variant="outline" asChild data-testid={`button-city-${city.toLowerCase()}`}>
                      <Link href={`/areas/${city.toLowerCase()}`}>
                        <MapPin className="h-4 w-4 mr-1" />
                        {city}, ID
                      </Link>
                    </Button>
                  ))}
              </div>
            </div>
          </div>
        </section>

        {/* Trust Badges Section */}
        <section className="py-12 bg-muted/30">
          <div className="container px-4 md:px-8">
            <div className="max-w-5xl mx-auto">
              <h3 className="text-xl font-semibold text-center mb-8">Why {cityName} Homeowners Trust Us</h3>
              <TrustBadges variant="default" cityName={cityName} />
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-16 md:py-20 bg-gradient-to-br from-primary/10 via-primary/5 to-background">
          <div className="container px-4 md:px-8">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <Badge className="mb-2">Get Started Today</Badge>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                Ready to Sell Your {cityName} House?
              </h2>
              <p className="text-lg text-muted-foreground">
                Get your free, no-obligation cash offer today. It takes less than 2 minutes to get started. Fair offers, fast closings, zero fees.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button size="lg" asChild data-testid="button-get-offer-bottom">
                  <Link href="/get-quote">
                    Get My Cash Offer
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild data-testid="button-call-bottom">
                  <a href="tel:2084052275">
                    <Phone className="mr-2 h-5 w-5" />
                    (208) 405-2275
                  </a>
                </Button>
              </div>
              
              {/* Final trust signals */}
              <div className="flex flex-wrap items-center justify-center gap-6 pt-6 text-muted-foreground text-sm">
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-accent" />
                  <span>{BUSINESS_INFO.rating}/5 Rating ({BUSINESS_INFO.reviewCount} reviews)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-primary" />
                  <span>Licensed & Insured</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-primary" />
                  <span>Serving {cityName} Since 2018</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
