// High-value service pages optimized for local SEO.
// Server-only claim copy. Client components must import servicesCatalog instead.
import "server-only";
import { SHOW_UNVERIFIED_TRUST, unverifiedTrustText } from "@/lib/seo";

export {
  SERVICES,
  getAllServiceSlugs,
  getServiceBySlug,
} from "./servicesCatalog";
export type { Service } from "./servicesCatalog";


// SEO-optimized content for each service
export const SERVICE_CONTENT = {
  "sell-house-fast": {
    heroSubtitle: "Get a fair cash offer in 24 hours. Close in as little as 7 days or take your time - you choose the timeline.",
    intro: "When you need to sell your house fast in the Boise metro area, Home Buyer Boise offers the quickest, most straightforward solution. Whether you're facing relocation, financial difficulties, divorce, or simply need to move quickly, we provide fair cash offers within 24 hours. Unlike traditional real estate transactions that take 30-60 days (or longer), our streamlined cash buying process can close in as little as 7 days. " + unverifiedTrustText("We've helped hundreds of Boise homeowners sell quickly without the stress of repairs, showings, or uncertain buyer financing. ", "") + "Our local team understands the Treasure Valley market and provides competitive offers based on current market conditions, your home's location, and its as-is condition. No hidden fees, no commission deductions, no surprise costs - just a straightforward cash transaction that puts money in your pocket fast.",
    whyChoose: [
      "Cash offer in 24 hours or less",
      "Close in 7 days or on your timeline",
      "No repairs or cleaning required",
      "We pay all closing costs",
      "No realtor fees or commissions (save 6%)",
      "Direct sale - no showings or open houses",
      "No buyer financing contingencies",
      "Avoid months of uncertainty",
      ...(SHOW_UNVERIFIED_TRUST ? ["Local Boise company since 2018"] : []),
      "Close on YOUR schedule",
    ],
    situations: [
      { title: "Job Relocation", description: "Moving for work and need to sell quickly. Start your new position without worrying about an unsold house back in Boise." },
      { title: "Financial Hardship", description: "Behind on payments and need immediate relief. Sell before foreclosure and protect your credit while getting a fresh start." },
      { title: "Divorce", description: "Need to split assets and move forward. Avoid arguments about repairs and get a fast, fair settlement for both parties." },
      { title: "Downsizing", description: "Ready to simplify without the hassle. Empty nesters can skip repairs to worn carpet and outdated kitchens from decades of family life." },
      { title: "Inherited Property", description: "Don't want to deal with estate clean-out or probate delays. Sell the inherited home quickly and split proceeds among heirs." },
      { title: "Problem Rental", description: "Tired of landlord headaches and difficult tenants. Exit the rental business fast, even with tenants still in place." },
    ],
    detailedProcess: [
      {
        step: 1,
        title: "Contact Us",
        description: "Fill out our simple online form or call (208) 405-2274. Provide basic information about your property including address, condition, and your timeline. This takes less than 60 seconds.",
        timeline: "60 seconds"
      },
      {
        step: 2,
        title: "Property Assessment",
        description: "We'll schedule a quick property walkthrough at your convenience (or provide offer sight-unseen if you prefer). Our assessment focuses on location, size, condition, and current market comparables - not nitpicking every minor flaw.",
        timeline: "30 minutes"
      },
      {
        step: 3,
        title: "Receive Your Cash Offer",
        description: "Within 24 hours, you'll receive a fair, no-obligation cash offer via email or phone. We'll explain exactly how we calculated the offer with full transparency. No pressure to accept - take your time to review.",
        timeline: "24 hours"
      },
      {
        step: 4,
        title: "Accept & Choose Closing Date",
        description: "If you accept our offer, YOU choose the closing date. Need to close in 7 days? Done. Need 30-60 days to coordinate your move? No problem. We work on your timeline, not ours.",
        timeline: "Your choice"
      },
      {
        step: 5,
        title: "Simple Paperwork",
        description: "Our local title company handles all paperwork. We use reputable local title companies you can trust. Review and sign documents at your convenience - in person or remotely.",
        timeline: "1-2 hours"
      },
      {
        step: 6,
        title: "Close & Get Paid",
        description: "On closing day, ownership transfers and you receive your cash. Funds are typically wired directly to your account or provided via cashier's check. Walk away with cash in hand.",
        timeline: "Same day"
      },
      {
        step: 7,
        title: "Move Out On Your Schedule",
        description: "Need extra time to move? We can arrange flexible move-out terms. Some sellers move before closing, others need a few days after. We accommodate your needs.",
        timeline: "Flexible"
      }
    ],
    process: "Our process is simple: contact us, receive your cash offer within 24 hours, choose your closing date, and get paid. No waiting for buyer financing, no deal falling through at the last minute.",
    faqs: [
      {
        question: "How fast can you really close?",
        answer: "Our fastest closings have been 5 days from initial contact to funded. Realistically, most closings occur in 7-14 days. The timeline depends primarily on title work and your preferred closing date. We can close faster if needed, or wait 30-60+ days if you need more time to coordinate your move."
      },
      {
        question: "Do I have to fix anything before selling?",
        answer: "Absolutely not. We buy houses in completely as-is condition. Foundation cracks, roof leaks, outdated kitchens, overgrown yards - we buy it all. You don't spend a penny on repairs, cleaning, or staging. We handle all repairs and updates after we purchase."
      },
      {
        question: "How do you determine your offer price?",
        answer: "We analyze recent comparable sales in your neighborhood, assess your home's condition, factor in needed repairs, and calculate holding costs and resale expenses. Our offer reflects fair market value minus the costs we'll incur to repair and resell. We provide full transparency in how we calculated your offer."
      },
      {
        question: "Are there any fees or commissions?",
        answer: "Zero. We pay all closing costs including title fees, escrow fees, and transfer taxes. You don't pay realtor commissions (saving 6% right there). The offer we make is the cash you receive at closing. No deductions, no surprises, no hidden fees."
      },
      {
        question: "What if I'm behind on mortgage payments?",
        answer: "We can still help. We'll calculate your exact mortgage payoff amount (including any arrears) and make an offer accordingly. If there's equity after paying off the mortgage, you receive the difference in cash. Even if you're facing foreclosure, selling to us can help you avoid the credit damage."
      },
      {
        question: "Can you buy my house if it has code violations or liens?",
        answer: "Yes. We regularly purchase properties with code violations, tax liens, IRS liens, and other title issues. We'll research the liens, calculate payoff amounts, and factor those into our offer. We handle all lien payoffs at closing so you walk away clean."
      },
      {
        question: "What areas do you serve?",
        answer: "We buy houses throughout the Treasure Valley including Boise, Meridian, Eagle, Kuna, Star, Middleton, Nampa, and Caldwell. We also purchase properties in surrounding Ada County and Canyon County communities."
      },
      {
        question: "How is selling to you different from listing with a realtor?",
        answer: "Speed, certainty, and convenience. Realtors require you to repair and stage your home, then wait 30-90+ days hoping a buyer gets financing approval. With us, you skip all repairs, avoid showings, get a cash offer in 24 hours, and close on your timeline with 100% certainty. Plus you save the 6% realtor commission."
      },
      {
        question: "Do I have to accept your offer?",
        answer: "Not at all. Our cash offers come with zero obligation and zero pressure. Request your offer, take time to review it, compare it to other options, and make the best decision for your situation. We're here to provide information and solutions, not pressure."
      },
      {
        question: "What condition of houses do you buy?",
        answer: "Any condition. " + unverifiedTrustText("We've purchased everything from pristine move-in ready homes to properties with fire damage, foundation issues, hoarding situations, and complete tear-downs. ", "") + "If it's real estate in the Treasure Valley, we'll make you an offer."
      },
      {
        question: "Can you help if I'm going through divorce?",
        answer: "Absolutely. We work with many divorcing couples who need to sell quickly and split proceeds. We provide neutral third-party purchase, fair market offers, and fast closings so both parties can move forward. We can work with your attorneys to ensure proper asset division."
      },
      {
        question: "What if I inherited a house I don't want?",
        answer: "We specialize in inherited property sales. We can purchase during probate (with court approval), handle estate clean-outs, work with out-of-state heirs, and provide fair offers that benefit all beneficiaries. Many inherited homes sell to us as-is without any family member having to travel to Boise."
      },
      {
        question: "Are you a legitimate company or a scam?",
        answer: unverifiedTrustText(
          "We're a legitimate Idaho LLC that's been buying houses in Boise since 2018. We're licensed, insured, and use reputable local title companies for all closings. You can verify our business status with Idaho Secretary of State. We have real reviews, real track records, and real local presence.",
          "We use reputable local title companies for all closings.",
        )
      },
      {
        question: "What happens after I sell to you?",
        answer: "After closing, the house is ours and becomes our responsibility. We typically invest in repairs and updates, then resell to a new homeowner or keep as a rental. Your responsibility ends at closing - no call-backs for repairs or issues. You walk away with cash and move forward."
      },
      {
        question: "Can I sell my rental property with tenants still in it?",
        answer: "Yes. We buy occupied rental properties regularly. Whether your tenants are current on rent, behind on payments, or you're in eviction proceedings, we can still purchase. We handle all tenant issues after closing so you're completely free from landlord responsibilities."
      }
    ],
    successStories: [
      {
        title: "Kuna Family Avoided Foreclosure",
        location: "Kuna, ID",
        situation: "Behind on mortgage after job loss, foreclosure notice received",
        solution: "Closed in 9 days, paid off mortgage including arrears, homeowners received $12,000 cash and avoided foreclosure",
        quote: "Home Buyer Boise saved our credit and gave us a fresh start. We were 4 months behind and facing foreclosure. They closed in 9 days and we walked away with cash instead of a foreclosure on our record."
      },
      {
        title: "Meridian Relocation Sale",
        location: "Meridian, ID",
        situation: "Job transfer to Seattle with only 3 weeks notice, couldn't wait for traditional sale",
        solution: "Closed in 12 days, seller moved to Seattle without house stress, avoided carrying two mortgages",
        quote: "My company transferred me to Seattle with 3 weeks notice. I couldn't afford to carry two mortgages while waiting for my Meridian house to sell. Home Buyer Boise gave me a fair offer and closed before I started my new job."
      },
      {
        title: "Boise Divorce Settlement",
        location: "Boise, ID (North End)",
        situation: "Divorcing couple couldn't agree on repairs, needed quick sale to finalize divorce",
        solution: "Purchased as-is in 14 days, split proceeds fairly, both parties moved on with their lives",
        quote: "We were arguing about every repair the listing agent recommended. Home Buyer Boise bought our North End home as-is and we split the proceeds fairly. It let us finalize our divorce and both move forward."
      }
    ],
    comparisonData: {
      traditional: {
        timeline: "60-90+ days",
        repairs: "Required ($10,000-$30,000 typical)",
        commissions: "6% (~$18,000 on $300k home)",
        closingCosts: "$5,000-$8,000",
        certainty: "Deals fall through 20% of the time",
        convenience: "Showings, open houses, constant availability"
      },
      cashOffer: {
        timeline: "7-14 days (you choose)",
        repairs: "$0 - we buy as-is",
        commissions: "$0 - no realtors",
        closingCosts: "$0 - we pay them",
        certainty: "100% - cash guaranteed",
        convenience: "One showing, no disruption"
      }
    },
    cta: "Ready to sell your house fast? Get your cash offer today.",
  },
  "we-buy-houses": {
    heroSubtitle: "We buy houses in any condition across Boise, Meridian, Eagle, Kuna, Star, and Middleton. No fees, no repairs, fair cash offers.",
    intro: "Home Buyer Boise is a trusted cash home buying company serving the entire Treasure Valley. We buy houses in any condition - from pristine properties to homes needing major repairs. Unlike traditional buyers, we make the process simple, fast, and certain.",
    whyChoose: [
      "Buy houses in any condition",
      "No contingencies or financing delays",
      "Transparent, fair pricing",
      "Local company, not a franchise",
      ...(SHOW_UNVERIFIED_TRUST ? ["Proven track record since 2018"] : []),
      "Close on your schedule",
    ],
    situations: [
      { title: "Any Condition", description: "Fire damage, foundation issues, outdated - we buy it all" },
      { title: "Any Situation", description: "Foreclosure, probate, divorce, relocation" },
      { title: "Any Timeline", description: "Close in 7 days or take 60+ days" },
      { title: "Any Price Range", description: "We buy properties at all price points" },
    ],
    process: unverifiedTrustText(
      "We're not like other 'we buy houses' companies. We're local, licensed, and have been serving Boise families since 2018. Our offers are based on genuine market analysis, and we're transparent about how we calculate our offers.",
      "We're not like other 'we buy houses' companies. Our offers are based on genuine market analysis, and we're transparent about how we calculate our offers.",
    ),
    detailedProcess: [
      { step: 1, title: "Contact Us", description: "Call (208) 405-2274 or fill out our online form. Tell us about your property and situation.", timeline: "2 minutes" },
      { step: 2, title: "Property Walkthrough", description: "We schedule a quick visit at your convenience to assess the property. No judgment, just evaluation.", timeline: "30 minutes" },
      { step: 3, title: "Receive Cash Offer", description: "Within 24 hours, you'll receive a fair, no-obligation cash offer with transparent pricing breakdown.", timeline: "24 hours" },
      { step: 4, title: "Review & Accept", description: "Take your time to review. No pressure. If you accept, we proceed. If not, no hard feelings.", timeline: "Your pace" },
      { step: 5, title: "Choose Closing Date", description: "You pick the closing date - as fast as 7 days or up to 60+ days. We work on your timeline.", timeline: "Your choice" },
      { step: 6, title: "Get Paid & Move On", description: "Sign closing docs, receive your cash via wire or check. Walk away with cash in hand.", timeline: "Same day" }
    ],
    faqs: [
      {
        question: "Are 'We Buy Houses' companies legitimate?",
        answer: unverifiedTrustText(
          "Yes, reputable cash home buyers like Home Buyer Boise are legitimate businesses. We're a licensed Idaho LLC that's been operating since 2018. However, you should always verify a company's credentials, check reviews, and use a reputable title company for closing. We use established local title companies and are happy to provide references.",
          "Yes, reputable cash home buyers like Home Buyer Boise are legitimate businesses. However, you should always verify a company's credentials, check reviews, and use a reputable title company for closing. We use established local title companies and are happy to provide references.",
        )
      },
      {
        question: "How do 'We Buy Houses' companies make money?",
        answer: "We purchase properties below retail value, invest in repairs and renovations, then resell at market value or hold as rentals. Our profit comes from the value we add through improvements, not from taking advantage of sellers. We're transparent about our offers and how we calculate them."
      },
      {
        question: "What types of houses do you buy?",
        answer: "We buy virtually any type of residential property: single-family homes, townhouses, condos, duplexes, and multi-family properties. We purchase homes in any condition - move-in ready, needing repairs, fire-damaged, hoarded, inherited estates, and everything in between."
      },
      {
        question: "How is your offer calculated?",
        answer: "We analyze comparable recent sales in your neighborhood, assess your property's condition, estimate repair costs, and factor in holding and selling expenses. Our offer reflects fair market value minus the costs we'll incur. We provide full transparency in our calculations upon request."
      },
      {
        question: "Do I have to pay any fees to sell to you?",
        answer: "Absolutely not. There are zero fees when selling to Home Buyer Boise. We pay all closing costs, there are no realtor commissions (saving you 6%), and no hidden charges. The offer we make is the amount you receive at closing."
      },
      {
        question: "How quickly can you close?",
        answer: "Our fastest closings are 5-7 days from accepted offer. Most closings occur in 10-14 days. However, we're flexible - if you need 30-60+ days, we can accommodate your timeline. You choose the closing date that works for you."
      },
      {
        question: "What areas in Idaho do you serve?",
        answer: "We buy houses throughout the Treasure Valley including Boise, Meridian, Eagle, Kuna, Star, Middleton, Nampa, and Caldwell. We also serve surrounding Ada County and Canyon County communities within a 30-mile radius of Boise."
      },
      {
        question: "What makes Home Buyer Boise different from other house buyers?",
        answer: unverifiedTrustText(
          "We're a local Boise company, not a national franchise or out-of-state investor. Our team lives here and knows the Treasure Valley market intimately. We've been buying homes since 2018 with a 4.9-star rating from over 189 reviews. We're transparent, fair, and treat every homeowner with respect.",
          "We're a local Boise company, not a national franchise or out-of-state investor. Our team lives here and knows the Treasure Valley market intimately. We're transparent, fair, and treat every homeowner with respect.",
        )
      }
    ],
    successStories: [
      {
        title: "Eagle Estate Sale",
        location: "Eagle, ID",
        situation: "Family inherited property with 30 years of belongings, couldn't agree on clean-out responsibilities",
        solution: "Purchased property with all contents included, closed in 18 days, heirs split proceeds evenly",
        quote: "We inherited dad's Eagle home but none of us lived nearby and couldn't agree on who would clean it out. Home Buyer Boise bought it with everything inside. Huge weight lifted off our shoulders."
      },
      {
        title: "Star Tired Landlord",
        location: "Star, ID",
        situation: "Rental property with non-paying tenants, owner exhausted from years of landlord stress",
        solution: "Purchased with tenants in place, handled all eviction proceedings, owner received fair cash offer",
        quote: "After 8 years of landlord headaches, I was done. They bought my Star rental with tenants still there. I got my cash and they dealt with everything else. Best decision I made."
      },
      {
        title: "Middleton Fixer-Upper",
        location: "Middleton, ID",
        situation: "Property needed $50,000+ in repairs, traditional buyers kept making low-ball offers",
        solution: "Fair as-is offer based on actual condition, closed in 12 days, seller avoided repair costs",
        quote: "Traditional buyers wanted me to fix the roof, HVAC, and foundation before they'd even make an offer. Home Buyer Boise gave me a fair price for as-is condition. Saved me months and tens of thousands."
      }
    ],
    comparisonData: {
      traditional: {
        timeline: "60-90+ days average",
        repairs: "Required by most buyers",
        commissions: "6% realtor fees",
        closingCosts: "Seller pays portion",
        certainty: "Financing can fall through",
        convenience: "Constant showings required"
      },
      cashOffer: {
        timeline: "7-14 days (your choice)",
        repairs: "$0 - buy as-is",
        commissions: "$0 - no realtors",
        closingCosts: "We pay 100%",
        certainty: "Guaranteed cash closing",
        convenience: "One showing only"
      }
    },
    cta: "See what we'll pay for your house. Get your no-obligation cash offer now.",
  },
  "cash-offer": {
    heroSubtitle: "Receive a fair, no-obligation cash offer on your Boise area home within 24 hours. No pressure, no games, just a honest offer.",
    intro: "Getting a cash offer for your house doesn't have to be complicated. At Home Buyer Boise, we provide straightforward, fair cash offers based on your home's market value and condition. Our offers come with no strings attached - no obligation to accept, no pressure, just information to help you make the best decision.",
    whyChoose: [
      "Fair market-based offers",
      "24-hour response time",
      "No obligation to accept",
      "Transparent pricing breakdown",
      "Competitive with market rates",
      "Local experts who know Boise values",
    ],
    situations: [
      { title: "Market Comparison", description: "See how a cash offer compares to listing" },
      { title: "Time Savings", description: "Skip months of showings and negotiations" },
      { title: "Certainty", description: "No financing contingencies or deal fallthrough" },
      { title: "Flexibility", description: "Accept our offer or explore other options" },
    ],
    process: "We calculate your cash offer based on current market conditions, your home's location, condition, and comparable recent sales. You'll receive a detailed breakdown showing how we arrived at our offer - complete transparency, no hidden calculations.",
    detailedProcess: [
      { step: 1, title: "Request Your Offer", description: "Call (208) 405-2274 or submit our form. Provide basic property details and your timeline.", timeline: "2 minutes" },
      { step: 2, title: "Quick Property Review", description: "We review property records, neighborhood comps, and may schedule a brief walkthrough.", timeline: "Same day" },
      { step: 3, title: "Receive Detailed Offer", description: "Get your cash offer with transparent breakdown of how we calculated it. No surprises.", timeline: "24 hours" },
      { step: 4, title: "Compare & Decide", description: "Compare our offer to other options. No obligation, no pressure to accept.", timeline: "Your pace" },
      { step: 5, title: "Accept & Schedule Closing", description: "If our offer works, we open escrow and schedule closing on your preferred date.", timeline: "Your choice" },
      { step: 6, title: "Close & Collect Cash", description: "Sign final documents, receive your funds. Cash in your account same day.", timeline: "Same day" }
    ],
    faqs: [
      {
        question: "How do you calculate your cash offer?",
        answer: "We analyze recent comparable sales in your neighborhood, assess your property's condition, estimate any needed repairs, and factor in current market conditions. Our offer represents fair market value minus the costs we'll incur for repairs and resale. We're happy to explain our calculation in detail."
      },
      {
        question: "Is a cash offer less than market value?",
        answer: "Cash offers are typically below retail market value because we buy as-is and cover all closing costs. However, when you factor in realtor commissions (6%), repairs, closing costs, and holding costs during a traditional sale, many sellers find our net proceeds are comparable - with far less hassle and risk."
      },
      {
        question: "How quickly can I get a cash offer?",
        answer: "We provide initial offers within 24 hours of receiving your property information. For accurate final offers, we may need a brief property walkthrough, which we can schedule at your convenience. Many sellers receive final offers within 48-72 hours."
      },
      {
        question: "Am I obligated to accept your offer?",
        answer: "Absolutely not. Our offers come with zero obligation. You can take time to consider, compare with other options, or decline without any pressure. We believe in providing information to help you make the best decision for your situation."
      },
      {
        question: "What happens after I accept a cash offer?",
        answer: "Once you accept, we open escrow with a local title company, conduct any necessary inspections (no renegotiation surprises), and close on your chosen date. You sign closing documents, receive your funds, and hand over the keys. Most closings take 7-14 days."
      },
      {
        question: "Do you charge any fees for your cash offer?",
        answer: "Never. There are no fees to receive an offer, and if you accept, we pay all closing costs. The cash offer amount is what you receive at closing. No hidden fees, no realtor commissions, no surprises."
      },
      {
        question: "Can I get a cash offer on a house with a mortgage?",
        answer: "Yes. Most homes we purchase have existing mortgages. We pay off your mortgage at closing, and you receive the remaining equity in cash. If your home is worth more than you owe, you walk away with the difference."
      },
      {
        question: "What if I'm not happy with your cash offer?",
        answer: "No problem at all. Our offer is just information for you to consider. If it doesn't work for your situation, you're free to list traditionally, try other buyers, or hold onto your property. We're here if your situation changes."
      }
    ],
    successStories: [
      {
        title: "Kuna Cash Offer Comparison",
        location: "Kuna, ID",
        situation: "Seller received listing agent estimate but wanted to compare with cash offer",
        solution: "Provided detailed cash offer breakdown, seller chose cash for certainty and speed",
        quote: "I got quotes from a realtor and Home Buyer Boise. When I factored in commissions, repairs they wanted, and 3 months of waiting - the cash offer made more sense. Closed in 10 days."
      },
      {
        title: "Star Quick Decision",
        location: "Star, ID",
        situation: "Homeowner needed to know home value quickly for financial planning",
        solution: "Received cash offer within 24 hours, used as baseline for decision-making",
        quote: "I wasn't sure if I wanted to sell, but needed to know my options. They gave me a fair offer in 24 hours with no pressure. Helped me make an informed decision."
      }
    ],
    comparisonData: {
      traditional: {
        timeline: "60-90+ days average",
        repairs: "Buyers often demand repairs",
        commissions: "6% realtor fees",
        closingCosts: "Seller pays portion",
        certainty: "Offers can fall through",
        convenience: "Weeks of showings"
      },
      cashOffer: {
        timeline: "7-14 days (you choose)",
        repairs: "$0 - we buy as-is",
        commissions: "$0 - no realtors",
        closingCosts: "We pay 100%",
        certainty: "Guaranteed cash close",
        convenience: "One walkthrough only"
      }
    },
    cta: "Curious what your house is worth? Request your free cash offer.",
  },
  "sell-as-is": {
    heroSubtitle: "Sell your house exactly as-is without spending a dime on repairs, cleaning, or staging. We buy houses in any condition.",
    intro: "Selling a house as-is means you don't have to fix anything. Foundation cracks? We'll buy it. Outdated kitchen? We'll buy it. Fire damage or hoarding situation? We'll buy it. At Home Buyer Boise, we specialize in purchasing homes that need work - properties that traditional buyers would pass on.",
    whyChoose: [
      "Absolutely no repairs required",
      "No cleaning or staging needed",
      "Buy houses with major issues",
      "Fair pricing for as-is condition",
      "Close despite property problems",
      "Save tens of thousands in repairs",
    ],
    situations: [
      { title: "Foundation Issues", description: "Cracks, settling, or major structural problems" },
      { title: "Fire or Water Damage", description: "Partial damage or complete restoration needed" },
      { title: "Outdated Properties", description: "Original 1970s kitchen and bathrooms - no problem" },
      { title: "Hoarding Situations", description: "We handle clean-out and removal" },
    ],
    process: "We assess your property's condition, research comparable sales, and make you a fair cash offer that accounts for needed repairs. You won't spend a penny fixing things up - we handle all repairs after closing.",
    detailedProcess: [
      { step: 1, title: "Tell Us About Your Property", description: "Call (208) 405-2274 or submit our form. Describe your property's condition honestly - we've seen it all.", timeline: "2 minutes" },
      { step: 2, title: "As-Is Assessment", description: "We visit to assess condition. We don't nitpick - we evaluate fairly and account for repairs in our offer.", timeline: "30 minutes" },
      { step: 3, title: "Fair As-Is Offer", description: "Receive a cash offer that accounts for the property's current condition. No repair demands.", timeline: "24 hours" },
      { step: 4, title: "Review Without Pressure", description: "Take time to consider. We never pressure you to accept. It's your decision.", timeline: "Your pace" },
      { step: 5, title: "Close When Ready", description: "Accept and choose your closing date. We handle everything - you pack and go.", timeline: "7-14 days" },
      { step: 6, title: "Walk Away With Cash", description: "Close at a local title company, receive your funds, and leave the property to us.", timeline: "Same day" }
    ],
    faqs: [
      {
        question: "What does selling as-is actually mean?",
        answer: "Selling as-is means the buyer purchases your property in its current condition without requiring any repairs, updates, or improvements. You don't fix anything, clean anything, or stage anything. Whatever state your house is in right now is exactly how we'll buy it."
      },
      {
        question: "What condition of houses do you buy?",
        answer: "We buy houses in any condition: foundation problems, roof damage, outdated systems, fire or water damage, hoarding situations, mold, termites, unpermitted additions, and properties that have sat vacant for years. If it has a roof and four walls, we're interested."
      },
      {
        question: "How do you price an as-is property?",
        answer: "We assess the property's condition, estimate repair costs, and compare to similar renovated homes in the area. Our offer reflects fair market value minus the repair investment we'll need to make. We're transparent about how we calculate - you'll see the math."
      },
      {
        question: "Do I have to clean out the house before selling?",
        answer: "No. We buy houses with all contents included if needed. Leave the furniture, the junk in the garage, even items in the attic. We handle all clean-out and disposal after closing. Just take what you want and leave the rest."
      },
      {
        question: "Can I sell as-is if my house has foundation problems?",
        answer: "Absolutely. Foundation issues are one of our specialties. Traditional buyers can't get financing on homes with major foundation problems. We buy for cash, so foundation cracks, settling, and structural issues don't stop us."
      },
      {
        question: "What about houses with mold or environmental issues?",
        answer: "We purchase homes with mold, asbestos, lead paint, and other environmental concerns. These issues can be deal-breakers for traditional buyers, but we have the expertise and resources to handle remediation after purchase."
      },
      {
        question: "Will I get a fair price selling as-is?",
        answer: "Yes. While as-is prices reflect the property's current condition, you save significantly on repairs, realtor commissions, closing costs, and months of carrying costs during a traditional sale. Many sellers net similar amounts with far less stress."
      },
      {
        question: "How fast can you close on an as-is property?",
        answer: "We typically close in 7-14 days on as-is properties. Since we're not waiting for financing approval or requiring repairs, the process moves quickly. You choose the closing date that works for your schedule."
      }
    ],
    successStories: [
      {
        title: "Meridian Foundation Problems",
        location: "Meridian, ID",
        situation: "1970s home with significant foundation settling, quotes for repair exceeded $45,000",
        solution: "Purchased as-is, no foundation repair required, closed in 12 days",
        quote: "Three contractors quoted $45,000+ to fix my foundation. Traditional buyers wouldn't even look. Home Buyer Boise bought it as-is and I didn't spend a penny on repairs."
      },
      {
        title: "Boise Hoarder House",
        location: "Boise, ID (West)",
        situation: "Inherited property filled floor-to-ceiling with 30 years of belongings",
        solution: "Purchased with all contents, family avoided overwhelming clean-out project",
        quote: "We couldn't face cleaning out mom's house. There were paths through the rooms and stuff everywhere. They bought it as-is, contents and all. Saved us months of work and emotional pain."
      }
    ],
    comparisonData: {
      traditional: {
        timeline: "90-120+ days (after repairs)",
        repairs: "Required - often $20,000+",
        commissions: "6% realtor fees",
        closingCosts: "Seller pays portion",
        certainty: "Buyers demand repairs",
        convenience: "Weeks of repair coordination"
      },
      cashOffer: {
        timeline: "7-14 days as-is",
        repairs: "$0 - leave it exactly as-is",
        commissions: "$0 - no realtors",
        closingCosts: "We pay 100%",
        certainty: "No inspection surprises",
        convenience: "One showing, we handle everything"
      }
    },
    cta: "Have a house that needs work? Get a fair as-is cash offer today.",
  },
  "inherited-property": {
    heroSubtitle: "Inherited a house you don't want or need? Sell it quickly without repairs, clean-out, or dealing with probate complications.",
    intro: "Inheriting a house can be overwhelming, especially when it comes with an outdated property, probate complications, or sentimental items to sort through. Home Buyer Boise helps families navigate inherited property sales with compassion and efficiency. We can purchase your inherited home quickly, often handling probate timelines and family situations with sensitivity.",
    whyChoose: [
      "Experience with probate sales",
      "Handle properties with multiple heirs",
      "No need to clean out the house",
      "Work within probate timelines",
      "Compassionate, respectful process",
      "Fair market offers for estates",
    ],
    situations: [
      { title: "Probate Sales", description: "We work with estate attorneys and court timelines" },
      { title: "Out-of-State Heirs", description: "Sell without traveling to Boise" },
      { title: "Multiple Inheritors", description: "Fair distribution among family members" },
      { title: "Overwhelming Clean-Out", description: "We can handle or assist with estate clean-out" },
    ],
    process: "We understand inherited properties often come with emotional and logistical challenges. Our team works respectfully with families, attorneys, and executors to make the sale as smooth as possible while honoring your loved one's memory.",
    detailedProcess: [
      { step: 1, title: "Contact Us About Estate", description: "Call (208) 405-2274. Tell us about the inherited property, probate status, and family situation.", timeline: "5 minutes" },
      { step: 2, title: "Sensitive Property Visit", description: "We visit the property with respect for the situation. Take what you want; we'll handle the rest.", timeline: "30 minutes" },
      { step: 3, title: "Receive Compassionate Offer", description: "We make a fair offer that accounts for probate timeline and property condition.", timeline: "24-48 hours" },
      { step: 4, title: "Coordinate With Family", description: "Review with all heirs. We can provide documentation for probate court if needed.", timeline: "Family's pace" },
      { step: 5, title: "Navigate Closing", description: "We work with probate attorney and court schedule. Close when legal requirements are satisfied.", timeline: "After approval" },
      { step: 6, title: "Distribute Proceeds", description: "Funds distributed to heirs as specified. Property burden lifted from your family.", timeline: "Same day" }
    ],
    faqs: [
      {
        question: "Can I sell an inherited house before probate is complete?",
        answer: "Yes, in many cases. Idaho allows personal representatives to sell real property during probate with proper court approval. We work with estate attorneys regularly and can structure offers that satisfy probate court requirements. The timing depends on whether the will allows unsupervised administration."
      },
      {
        question: "Do I have to clean out the inherited house before selling?",
        answer: "No. We can purchase inherited properties with all contents included. Many families find the clean-out overwhelming, especially for homes with decades of belongings. We'll buy the house as-is, contents and all, and handle disposition after closing."
      },
      {
        question: "What if there are multiple heirs who inherited the property?",
        answer: "We work with multiple heirs regularly. All beneficiaries must agree to the sale, and proceeds are distributed according to the estate documents. We can work with your estate attorney to ensure all parties' interests are represented and proceeds are divided properly."
      },
      {
        question: "How do you determine value for an inherited property in poor condition?",
        answer: "We assess inherited homes the same as any property - analyzing comparable sales, evaluating condition, and estimating repair costs. Many inherited homes are outdated or need significant work. We provide fair offers based on as-is condition, not what the home might sell for after $50,000 in updates."
      },
      {
        question: "Can out-of-state heirs sell an inherited Idaho property?",
        answer: "Absolutely. Many of our inherited property sales involve heirs who live outside Idaho. We handle everything remotely - property evaluation, offer presentation, and closing documents can all be done without you traveling to Boise. We work with local title companies experienced in remote closings."
      },
      {
        question: "What about inherited property taxes and liens?",
        answer: "We research all liens and back taxes on inherited properties. Any property taxes owed by the estate are factored into our offer and paid at closing. The estate receives net proceeds after all obligations are satisfied. We handle the research and payoff process."
      },
      {
        question: "How long does it take to sell an inherited house?",
        answer: "Once probate allows a sale (or if probate isn't required), we can close in as little as 7-14 days. The timeline often depends on court schedules for probate sales. We work within probate timelines and can move quickly once approval is obtained."
      },
      {
        question: "Is selling to a cash buyer better than listing an inherited home?",
        answer: "For many families, yes. Inherited homes often need repairs, cleaning, and updating that traditional buyers expect. Listing means months of showings while managing an estate. Selling to us means immediate cash, no repairs, no clean-out, and closure for the family - often within weeks instead of months."
      }
    ],
    successStories: [
      {
        title: "Boise North End Estate",
        location: "Boise, ID (North End)",
        situation: "Three siblings inherited 1950s home with 40 years of belongings, two lived out of state",
        solution: "Purchased with all contents, closed during probate with court approval, proceeds split three ways",
        quote: "Mom lived in her North End home for 40 years. The thought of cleaning it out was overwhelming. Home Buyer Boise bought it with everything inside and handled probate requirements. We could focus on grieving, not logistics."
      },
      {
        title: "Canyon County Probate Sale",
        location: "Caldwell, ID",
        situation: "Executor managing estate with multiple liens and code violations from deceased parent",
        solution: "Researched all liens, paid off at closing, handled code compliance, executor received net proceeds",
        quote: "As executor, I was overwhelmed by dad's Caldwell property - back taxes, code violations, years of deferred maintenance. They handled everything and the estate still received fair proceeds."
      }
    ],
    comparisonData: {
      traditional: {
        timeline: "90-180+ days (with probate)",
        repairs: "Required + estate clean-out",
        commissions: "6% realtor fees from estate",
        closingCosts: "Estate pays closing costs",
        certainty: "Buyers may back out during probate",
        convenience: "Multiple showings, court approvals"
      },
      cashOffer: {
        timeline: "7-14 days after probate approval",
        repairs: "$0 - buy with contents",
        commissions: "$0 - no realtors",
        closingCosts: "We cover 100%",
        certainty: "Guaranteed cash closing",
        convenience: "One showing, we handle logistics"
      }
    },
    cta: "Inherited a property? Let us make the process easy. Get your cash offer.",
  },
  "avoid-foreclosure": {
    heroSubtitle: "Facing foreclosure? Sell your house fast and protect your credit. Confidential assistance with fair cash offers.",
    intro: "If you're behind on mortgage payments and facing foreclosure, time is critical. Home Buyer Boise can help you sell your house quickly, pay off your mortgage, and avoid the credit damage of foreclosure. " + unverifiedTrustText("We've helped dozens of Boise homeowners navigate this difficult situation with dignity and speed.", ""),
    whyChoose: [
      "Stop foreclosure proceedings",
      "Protect your credit score",
      "Confidential, judgment-free process",
      "Fast closing to beat deadlines",
      "May receive cash after paying mortgage",
      "Avoid public foreclosure auction",
    ],
    situations: [
      { title: "Behind on Payments", description: "Can't catch up on missed mortgage payments" },
      { title: "Notice of Default", description: "Already received foreclosure notices" },
      { title: "Auction Scheduled", description: "Need to sell before foreclosure auction date" },
      { title: "Financial Hardship", description: "Job loss, medical bills, or other financial crisis" },
    ],
    process: "Contact us immediately - timing matters in foreclosure situations. We'll assess your situation, calculate what you owe, and make a cash offer that can pay off your mortgage and potentially leave you with cash. We can often close in days, not weeks.",
    detailedProcess: [
      { step: 1, title: "Call Us Immediately", description: "Call (208) 405-2274 now. Tell us your situation - missed payments, notices received, auction dates.", timeline: "5 minutes" },
      { step: 2, title: "Urgent Assessment", description: "We quickly review your property and mortgage situation. Time is critical in foreclosure.", timeline: "Same day" },
      { step: 3, title: "Emergency Cash Offer", description: "Receive a fair cash offer designed to pay off your mortgage and stop foreclosure proceedings.", timeline: "24 hours" },
      { step: 4, title: "Fast Decision", description: "Review the offer with anyone you need to. We move at your pace but are ready when you are.", timeline: "Your choice" },
      { step: 5, title: "Rapid Closing", description: "We can close in as few as 5-7 days to beat auction dates. We coordinate everything.", timeline: "5-14 days" },
      { step: 6, title: "Mortgage Paid, Credit Protected", description: "Mortgage is paid off, you receive any remaining equity, foreclosure avoided.", timeline: "Same day" }
    ],
    faqs: [
      {
        question: "How does selling avoid foreclosure?",
        answer: "When you sell to us, we pay off your entire mortgage balance (including arrears) at closing. This satisfies your loan and stops foreclosure proceedings. A traditional sale shows on your credit report, while a foreclosure causes major damage for 7 years and can reduce your credit score by 100-150 points."
      },
      {
        question: "How quickly can you close to stop foreclosure?",
        answer: "We can close in as little as 5-7 days when urgently needed. Most foreclosure sales close within 10-14 days. The key is contacting us early - the more time we have before your auction date, the better your options."
      },
      {
        question: "What if I owe more than my house is worth?",
        answer: "If you're underwater on your mortgage, we may still be able to help through a short sale negotiation with your lender. Banks often prefer short sales over foreclosure. We handle lender negotiations and can sometimes get them to accept less than what's owed."
      },
      {
        question: "Will I receive any cash if I'm facing foreclosure?",
        answer: "It depends on your equity. If your home is worth more than what you owe (including arrears), you'll receive the difference in cash at closing. Even if you're underwater, you avoid foreclosure's credit damage and potential deficiency judgment."
      },
      {
        question: "What's the foreclosure timeline in Idaho?",
        answer: "Idaho allows non-judicial foreclosure, which typically takes 120+ days from the first missed payment to auction. After 4 months of missed payments, a Notice of Default is filed. You have about 4 months from that notice until auction. The earlier you contact us, the more options available."
      },
      {
        question: "Is this confidential? Will my neighbors know?",
        answer: "Absolutely confidential. Unlike a public foreclosure auction, selling to us is a private transaction. There are no 'For Sale' signs, no open houses, no public notices. Your neighbors won't know you sold due to financial hardship."
      },
      {
        question: "Can you help if I've already received a foreclosure notice?",
        answer: "Yes, but time is critical. " + unverifiedTrustText("We've helped homeowners sell even after receiving Notice of Default or Notice of Sale. ", "") + "The key is acting immediately. Call us today and we'll assess your timeline and options."
      },
      {
        question: "What happens to my credit after selling vs foreclosure?",
        answer: "A foreclosure stays on your credit for 7 years and can drop your score 100-150+ points. Selling before foreclosure shows as a normal sale. While late payments still impact your score, avoiding foreclosure allows you to recover much faster and buy again sooner."
      }
    ],
    successStories: [
      {
        title: "Meridian Family Saved from Auction",
        location: "Meridian, ID",
        situation: "Medical bills led to 6 months behind on mortgage, foreclosure auction scheduled in 3 weeks",
        solution: "Closed in 11 days before auction, paid off mortgage and arrears, family received $8,000 in remaining equity",
        quote: "We had 3 weeks until auction and thought we'd lose everything. Home Buyer Boise closed in 11 days, paid off our mortgage, and we walked away with $8,000 instead of a foreclosure on our record."
      },
      {
        title: "Nampa Job Loss Recovery",
        location: "Nampa, ID",
        situation: "Job loss and unemployment, 4 months behind on payments, couldn't catch up",
        solution: "Sold quickly, mortgage paid off, owner avoided foreclosure and protected credit for future home purchase",
        quote: "After losing my job, I couldn't catch up on payments. Selling to Home Buyer Boise protected my credit so I can buy again once I'm back on my feet. They treated me with dignity during a really hard time."
      }
    ],
    comparisonData: {
      traditional: {
        timeline: "60-90+ days (if you can wait)",
        repairs: "Required for buyer financing",
        commissions: "6% from your equity",
        closingCosts: "You pay closing costs",
        certainty: "Buyers may not qualify",
        convenience: "Many showings while stressed"
      },
      cashOffer: {
        timeline: "5-14 days to beat auction",
        repairs: "$0 - sell as-is",
        commissions: "$0 - no realtor fees",
        closingCosts: "We pay all costs",
        certainty: "100% cash guaranteed",
        convenience: "One showing, confidential"
      }
    },
    cta: "Facing foreclosure? Don't wait - get help now. Request your cash offer.",
  },
  "sell-house-divorce": {
    heroSubtitle: "Going through divorce? Sell your house quickly for fair market value and split proceeds equitably. Simple, fast, stress-free.",
    intro: "Divorce is emotionally difficult enough without the stress of selling a house. Home Buyer Boise provides a straightforward solution for divorcing couples in the Boise metro area. We buy your house quickly for cash, allowing you to split proceeds fairly and move forward with your separate lives. No arguments about repairs, no waiting for traditional buyers, no prolonging the process.",
    whyChoose: [
      "Quick sale ends property disputes",
      "Fair market value offers",
      "Split proceeds easily and equitably",
      "No repairs or showings needed",
      "Close on your divorce timeline",
      "Neutral third-party purchase",
    ],
    situations: [
      { title: "Asset Division", description: "Simplify property settlement in divorce decree" },
      { title: "Need Quick Cash", description: "Both parties need funds to move forward" },
      { title: "Can't Agree on Repairs", description: "Avoid arguments about updates and fixes" },
      { title: "One Party Moved Out", description: "Empty house sitting while divorce finalizes" },
    ],
    process: "We work with both parties (and attorneys if involved) to provide a fair cash offer that satisfies both spouses. Quick closing means you can finalize your divorce faster and both move on. We've helped dozens of divorcing couples in Boise navigate this difficult transition.",
    detailedProcess: [
      { step: 1, title: "Contact Us Confidentially", description: "Call (208) 405-2274. Both spouses can be involved or one can initiate. We maintain discretion.", timeline: "5 minutes" },
      { step: 2, title: "Neutral Property Assessment", description: "We assess the property fairly. Both parties receive the same information and offer.", timeline: "30 minutes" },
      { step: 3, title: "Fair Cash Offer", description: "Receive an offer both parties can evaluate. We work with divorce attorneys if needed.", timeline: "24 hours" },
      { step: 4, title: "Both Parties Review", description: "Take time for both spouses and attorneys to review. We answer any questions.", timeline: "Your pace" },
      { step: 5, title: "Coordinated Closing", description: "Both parties sign (in person or remotely). We accommodate separate signings if needed.", timeline: "7-21 days" },
      { step: 6, title: "Proceeds Split Fairly", description: "Funds distributed as agreed in divorce settlement. Property dispute resolved.", timeline: "Same day" }
    ],
    faqs: [
      {
        question: "How do you handle divorce sales with both spouses?",
        answer: "We work as a neutral third party with both spouses (and their attorneys if involved). Both parties must agree to the sale. We provide a fair offer that both can evaluate independently. Proceeds are split according to your divorce agreement or decree."
      },
      {
        question: "Do both spouses need to agree to sell?",
        answer: "Yes, if both names are on the title, both must agree to sell. We can work with your divorce attorneys to structure the sale as part of your property settlement. Some divorcing couples find our neutral offer helps resolve disputes about home value."
      },
      {
        question: "Can we sell before the divorce is finalized?",
        answer: "Yes, many couples sell during divorce proceedings. Your attorneys can include the sale in your divorce agreement. Selling early often simplifies asset division and lets both parties move forward faster. We can close on your attorney's timeline."
      },
      {
        question: "What if we can't agree on repairs or updates?",
        answer: "This is one of the biggest advantages of selling to us. We buy as-is - no repairs, no updates, no staging. You don't have to agree on which repairs to make or how much to spend. We handle all repairs after purchase."
      },
      {
        question: "How are proceeds divided in a divorce sale?",
        answer: "Proceeds are distributed according to your divorce agreement. Typically, the title company divides proceeds as directed by your attorneys. If you have a 50/50 split, each party receives half after mortgage payoff. We work with your legal team to ensure proper distribution."
      },
      {
        question: "Can you help if one spouse has already moved out?",
        answer: "Yes, this is common. One showing allows us to evaluate the property. The departed spouse can participate in the sale remotely, reviewing documents and signing via email or notary. We make it easy for both parties regardless of where they live."
      },
      {
        question: "How fast can you close during a divorce?",
        answer: "We can close in as little as 7-14 days, or we can match your divorce proceedings timeline. Some couples prefer fast closing to finalize asset division quickly. Others need more time. We're flexible to work with your situation."
      },
      {
        question: "Is selling during divorce better than listing with a realtor?",
        answer: "For many divorcing couples, yes. Traditional listings require agreement on repairs, staging, pricing, and showing schedules - all potential conflict points. Our as-is cash offer eliminates these disagreements. Plus, fast closing means you both move forward sooner."
      }
    ],
    successStories: [
      {
        title: "Boise Bench Divorce Settlement",
        location: "Boise, ID (Bench)",
        situation: "Divorcing couple couldn't agree on $20,000 in recommended repairs, sale stalled for months",
        solution: "Purchased as-is, closed in 16 days, proceeds split 50/50, both parties moved forward",
        quote: "Our listing agent said we needed $20,000 in repairs but we couldn't agree on what to fix. Home Buyer Boise bought it as-is and we split the proceeds. Finally got our divorce finalized."
      },
      {
        title: "Eagle Contested Property",
        location: "Eagle, ID",
        situation: "One spouse moved to California, couldn't coordinate showings, house sat empty for 5 months",
        solution: "One showing, remote closing for out-of-state spouse, fast cash for both to start new lives",
        quote: "With my ex in California and me in Eagle, coordinating a traditional sale was impossible. Home Buyer Boise did one showing and we both signed remotely. Clean break for both of us."
      }
    ],
    comparisonData: {
      traditional: {
        timeline: "60-90+ days (adds to divorce stress)",
        repairs: "Both spouses must agree on repairs",
        commissions: "6% split between both parties",
        closingCosts: "Divided between spouses",
        certainty: "Can prolong divorce proceedings",
        convenience: "Coordinating showings between parties"
      },
      cashOffer: {
        timeline: "7-21 days (end disputes fast)",
        repairs: "$0 - no repair arguments",
        commissions: "$0 - more proceeds to split",
        closingCosts: "We pay 100%",
        certainty: "Guaranteed fast closure",
        convenience: "One showing, remote signing available"
      }
    },
    cta: "Going through divorce? Simplify your property settlement. Get your cash offer today.",
  },
  "relocation-sale": {
    heroSubtitle: "Relocating for work? Sell your Boise house fast without stress. Cash offer in 24 hours, close before you move.",
    intro: "Job relocation is exciting but stressful. The last thing you need is a house that won't sell while you're trying to start your new position in another city. Home Buyer Boise specializes in helping relocating professionals sell their homes quickly. Get a fair cash offer, close on your timeline, and focus on your career move instead of real estate headaches.",
    whyChoose: [
      "Close before your move date",
      "No showings while you're packing",
      "Sell even if upside down on mortgage",
      "Handle sale from new city",
      "Cash offer in 24 hours",
      "Flexible closing - match your timeline",
    ],
    situations: [
      { title: "Short Notice Transfer", description: "Need to relocate in 30-60 days" },
      { title: "Already Moved", description: "Managing sale from another state" },
      { title: "Company Relocation", description: "Employer moving you to new city" },
      { title: "Can't Wait for Traditional Sale", description: "Need to close before starting new job" },
    ],
    process: "We understand job relocations are time-sensitive. Submit your property info, receive your cash offer within 24 hours, and choose a closing date that works with your move. We can close in as little as 7 days if you're in a rush, or wait 30-60 days if you need time.",
    detailedProcess: [
      { step: 1, title: "Tell Us Your Timeline", description: "Call (208) 405-2274. Share your relocation date and timeline constraints.", timeline: "5 minutes" },
      { step: 2, title: "Quick Property Walkthrough", description: "We schedule a brief visit at your convenience while you're packing.", timeline: "30 minutes" },
      { step: 3, title: "Cash Offer Before You Move", description: "Receive your offer within 24 hours. Plan your finances with certainty.", timeline: "24 hours" },
      { step: 4, title: "Align With Your Move", description: "We match your closing date to your job start date. No double mortgages.", timeline: "Your choice" },
      { step: 5, title: "Close Before You Leave", description: "Sign closing docs in person or remotely if you've already moved.", timeline: "7-21 days" },
      { step: 6, title: "Cash For Your New Start", description: "Receive funds to help with your new location. Focus on your new job.", timeline: "Same day" }
    ],
    faqs: [
      {
        question: "How fast can you close for a job relocation?",
        answer: "We can close in as little as 7 days for urgent relocations. Most relocation sales close within 10-21 days. We match our timeline to your move date - if you're starting your new job in 2 weeks, we'll have you closed before you leave."
      },
      {
        question: "Can I sell if I've already moved to my new city?",
        answer: "Absolutely. Many of our relocation clients have already started their new positions. We can evaluate the property with a trusted local contact or neighbor present, and all documents can be signed remotely. You don't need to fly back to Boise."
      },
      {
        question: "What if my company is offering relocation assistance?",
        answer: "Some companies offer home sale assistance programs. We can work alongside these programs or provide an alternative if your company's timeline doesn't match yours. Our cash offer is often faster and simpler than corporate relocation programs."
      },
      {
        question: "Do I have to show the house while I'm packing?",
        answer: "No. We require just one property walkthrough to make our offer. Unlike traditional sales with weeks of showings, you can focus on packing and planning your move without keeping the house show-ready for strangers."
      },
      {
        question: "What if I can't afford two mortgages while my house sells?",
        answer: "This is exactly why cash offers are ideal for relocations. Traditional sales can take 60-90+ days, meaning months of carrying two mortgages. We close in days, not months, so you're not paying both mortgages for long."
      },
      {
        question: "Can you help if I'm upside down on my mortgage?",
        answer: "Possibly. If you owe more than your home is worth, we can negotiate with your lender for a short sale. Banks often prefer this over the property sitting vacant. We handle the lender negotiation on your behalf."
      },
      {
        question: "What if my job transfer was unexpected and I have no time?",
        answer: "We specialize in urgent relocations. Emergency transfers happen - military orders, corporate reorganizations, family situations. Call us today and we can often present an offer within 24 hours and close within a week if needed."
      },
      {
        question: "Is selling to you better than renting out my Boise house?",
        answer: "It depends on your situation, but many relocating professionals prefer selling. Long-distance landlording is stressful - tenant issues, repairs, property management fees. Selling gives you clean closure and cash to invest in your new location."
      }
    ],
    successStories: [
      {
        title: "HP Relocation to Houston",
        location: "Boise, ID (Southeast)",
        situation: "Software engineer transferred to Houston with 3 weeks notice, couldn't afford two mortgages",
        solution: "Closed in 9 days before starting new job, avoided carrying two mortgages, smooth transition",
        quote: "HP transferred me to Houston with 3 weeks notice. I couldn't afford mortgages in both cities. Home Buyer Boise closed in 9 days and I started my new job with a clean slate."
      },
      {
        title: "Military PCS to Fort Bragg",
        location: "Meridian, ID",
        situation: "Military family received PCS orders, 6 weeks to relocate across country",
        solution: "Purchased home in 14 days, family focused on military move instead of house sale stress",
        quote: "PCS orders don't wait for houses to sell. With two kids and a cross-country move to coordinate, Home Buyer Boise handled the house so we could focus on our family's transition."
      }
    ],
    comparisonData: {
      traditional: {
        timeline: "60-90+ days (paying two mortgages)",
        repairs: "Required before you move",
        commissions: "6% from sale proceeds",
        closingCosts: "Seller pays portion",
        certainty: "Deals can fall through",
        convenience: "Showings while packing/moved"
      },
      cashOffer: {
        timeline: "7-21 days (before you start new job)",
        repairs: "$0 - leave as-is",
        commissions: "$0 - no realtor fees",
        closingCosts: "We cover 100%",
        certainty: "Guaranteed closing date",
        convenience: "One showing, remote closing OK"
      }
    },
    cta: "Relocating? Sell your house fast. Get your no-obligation cash offer now.",
  },
  "problem-tenants": {
    heroSubtitle: "Tired of landlord problems? Sell your rental property even with problem tenants. We handle evictions and buy occupied.",
    intro: "Being a landlord isn't for everyone. If you're dealing with problem tenants, non-payment, property damage, or simply tired of midnight repair calls, Home Buyer Boise offers an exit strategy. We buy rental properties in any condition, even with tenants still occupying the property. Get out of the landlord business today.",
    whyChoose: [
      "Buy properties with tenants in place",
      "Handle eviction process if needed",
      "Purchase despite property damage",
      "No need to make repairs",
      "Fast closing to end landlord stress",
      "Buy single-family or multi-family",
    ],
    situations: [
      { title: "Non-Paying Tenants", description: "Months behind on rent with no resolution" },
      { title: "Property Damage", description: "Tenants destroyed the property" },
      { title: "Tired of Management", description: "Done dealing with repairs and complaints" },
      { title: "Out-of-State Owner", description: "Managing rental from another state is difficult" },
    ],
    process: "We've purchased dozens of rental properties from tired landlords across Boise. Whether tenants are current, behind on rent, or you're in eviction proceedings, we can make you an offer. We handle all tenant issues after closing so you can walk away stress-free.",
    detailedProcess: [
      { step: 1, title: "Share Your Landlord Situation", description: "Call (208) 405-2274. Tell us about your rental, tenant situation, and frustrations.", timeline: "5 minutes" },
      { step: 2, title: "Property Assessment", description: "We evaluate the property (tenant-occupied is fine). We're discreet with tenants.", timeline: "30 minutes" },
      { step: 3, title: "Offer Despite Tenants", description: "Receive an offer that accounts for tenant situation. No eviction required first.", timeline: "24 hours" },
      { step: 4, title: "Review & Accept", description: "Take time to evaluate. Once you accept, the landlord headaches become ours.", timeline: "Your pace" },
      { step: 5, title: "Transfer Ownership", description: "We close and take over all landlord responsibilities including tenant issues.", timeline: "10-21 days" },
      { step: 6, title: "Freedom From Landlording", description: "Receive your cash. Walk away from landlord stress permanently.", timeline: "Same day" }
    ],
    faqs: [
      {
        question: "Can you buy my rental with tenants still living there?",
        answer: "Yes. We purchase rental properties with tenants in place regularly. Whether your tenants are current on rent, behind on payments, or you're in the middle of eviction proceedings, we can still make you an offer and close quickly."
      },
      {
        question: "Do I have to evict tenants before selling?",
        answer: "No. If you're dealing with problem tenants, we handle the eviction process after purchase. You transfer ownership and we take over all landlord responsibilities, including any necessary eviction proceedings."
      },
      {
        question: "What if my tenants have damaged the property?",
        answer: "We buy properties with tenant damage. Holes in walls, damaged appliances, destroyed flooring - we've seen it all. Our offer accounts for the damage and you don't repair anything before selling."
      },
      {
        question: "How do you calculate value for occupied properties?",
        answer: "We assess the property's condition, factor in any needed repairs or tenant-related issues, and compare to similar properties. If eviction is needed, we account for that timeline and cost. Our offer reflects fair value given the circumstances."
      },
      {
        question: "I'm an out-of-state landlord. Can you still help?",
        answer: "Absolutely. Many of our rental property purchases involve out-of-state owners who can't effectively manage from afar. We handle everything locally - property evaluation, tenant communications, and closing. You can complete the entire sale remotely."
      },
      {
        question: "What happens to my tenants after you buy?",
        answer: "That depends on the situation. Good tenants who pay rent may be able to stay. Problem tenants are typically asked to leave or go through eviction. We handle all tenant communications and transitions after closing - you're completely out of the picture."
      },
      {
        question: "Can you buy multi-family properties with tenant issues?",
        answer: "Yes. We purchase duplexes, triplexes, fourplexes, and larger multi-family properties. Even if only some units have problem tenants, we can make an offer on the entire property and handle tenant issues after purchase."
      },
      {
        question: "How fast can you close on a rental property?",
        answer: "We typically close on rental properties in 10-21 days, depending on the situation. Properties with cooperative tenants close faster. Properties requiring eviction may still close quickly - we just take over the eviction process after closing."
      }
    ],
    successStories: [
      {
        title: "Caldwell Multi-Family Nightmare",
        location: "Caldwell, ID",
        situation: "Fourplex with 3 non-paying tenants, $8,000 in back rent owed, significant property damage",
        solution: "Purchased with all tenants in place, handled evictions, owner escaped landlord stress",
        quote: "I had 3 of 4 units not paying rent, holes in every wall, and was losing money every month. Home Buyer Boise bought the whole property and I never had to deal with those tenants again."
      },
      {
        title: "Boise Long-Distance Landlord",
        location: "Boise, ID (Bench)",
        situation: "Owner lived in Seattle, couldn't manage property effectively, tenant stopped paying rent",
        solution: "Purchased remotely, handled eviction, owner never traveled to Boise",
        quote: "Managing a rental from Seattle was impossible. When my tenant stopped paying, I couldn't deal with it anymore. Home Buyer Boise bought it, handled eviction, and I signed everything remotely. Relief."
      }
    ],
    comparisonData: {
      traditional: {
        timeline: "90-180+ days (evict first)",
        repairs: "Required after tenants leave",
        commissions: "6% realtor fees",
        closingCosts: "Seller pays portion",
        certainty: "Must vacate for sale",
        convenience: "Manage eviction + repairs + sale"
      },
      cashOffer: {
        timeline: "10-21 days (tenants can stay)",
        repairs: "$0 - we handle everything",
        commissions: "$0 - no realtors",
        closingCosts: "We pay 100%",
        certainty: "Buy with tenants in place",
        convenience: "We handle all tenant issues"
      }
    },
    cta: "Tired of being a landlord? Sell your rental property today and get your life back.",
  },
  "probate-sale": {
    heroSubtitle: "Selling probate property in Boise? We work with executors and attorneys to simplify estate sales. Fair cash offers.",
    intro: "Probate property sales can be complex, involving court approvals, attorney oversight, and family dynamics. Home Buyer Boise has extensive experience purchasing probate properties in Idaho. We work respectfully with executors, estate attorneys, and family members to provide fair cash offers and navigate the legal requirements efficiently.",
    whyChoose: [
      "Experience with Idaho probate law",
      "Work with estate attorneys",
      "Court-approval friendly offers",
      "Handle properties during probate",
      "Fair market value for estates",
      "Fast closing after approval",
    ],
    situations: [
      { title: "Executor Responsibilities", description: "Simplified sale process for executors" },
      { title: "Court Approval Needed", description: "We understand probate court requirements" },
      { title: "Multiple Beneficiaries", description: "Fair sale benefits all heirs equally" },
      { title: "Attorney Involved", description: "We work directly with estate counsel" },
    ],
    process: "Our team works with your estate attorney and follows Idaho probate procedures. We provide documentation needed for court approval and can adjust our timeline to match probate proceedings. We've successfully closed dozens of probate sales in Ada County.",
    detailedProcess: [
      { step: 1, title: "Contact Us As Executor", description: "Call (208) 405-2274. Tell us about the estate, probate status, and your role.", timeline: "5 minutes" },
      { step: 2, title: "Probate-Aware Assessment", description: "We evaluate the property and review probate requirements with your attorney.", timeline: "30 minutes" },
      { step: 3, title: "Court-Ready Offer", description: "Receive an offer formatted to meet probate court requirements.", timeline: "24-48 hours" },
      { step: 4, title: "Attorney & Court Review", description: "Work with your probate attorney. We provide any documentation needed.", timeline: "Court schedule" },
      { step: 5, title: "Close After Approval", description: "Once court approves, we close quickly. 7-14 days after approval.", timeline: "After approval" },
      { step: 6, title: "Estate Settled", description: "Funds distributed per estate instructions. Property obligation resolved.", timeline: "Same day" }
    ],
    faqs: [
      {
        question: "What is probate and how does it affect selling a house?",
        answer: "Probate is the legal process of settling a deceased person's estate, including transferring property ownership. In Idaho, real property typically requires probate court approval before sale. We understand Idaho probate procedures and work within the legal requirements."
      },
      {
        question: "Can I sell during probate or do I have to wait until it's complete?",
        answer: "In many cases, you can sell during probate. Idaho law allows personal representatives to sell real property with court approval. The timeline depends on whether the will allows unsupervised administration. We structure offers that satisfy probate court requirements."
      },
      {
        question: "Do I need an attorney to sell probate property?",
        answer: "While not always legally required, working with a probate attorney is highly recommended and often necessary for court approval. We work directly with estate attorneys to ensure proper documentation and procedures are followed."
      },
      {
        question: "How long does selling a probate property take?",
        answer: "Probate property sales typically take longer than regular sales due to court approval requirements. However, once approved, we can close quickly - often within 7-14 days. Total timeline depends on probate court schedules in your county."
      },
      {
        question: "What if there are multiple heirs who disagree about selling?",
        answer: "All beneficiaries typically must agree to sell, or the court may need to authorize the sale. We can work with families and their attorneys to present fair offers that all parties can evaluate. Sometimes a neutral cash offer helps resolve family disputes about property value."
      },
      {
        question: "Do you buy probate properties in poor condition?",
        answer: "Yes. Many probate properties have deferred maintenance or need significant updates. We buy as-is regardless of condition. The estate doesn't need to spend money on repairs before selling."
      },
      {
        question: "What documentation do you provide for probate court?",
        answer: "We provide purchase agreements, proof of funds, and any documentation your attorney or the court requires. We're experienced with Ada County and Canyon County probate procedures and can format offers to meet local requirements."
      },
      {
        question: "Is selling to you better than listing probate property?",
        answer: "For many estates, yes. Probate properties often need work, and traditional buyers may not want to wait for court approval. Our cash offers eliminate financing contingencies and we're patient with probate timelines. Many executors find our process simpler."
      }
    ],
    successStories: [
      {
        title: "Ada County Complex Probate",
        location: "Garden City, ID",
        situation: "Executor managing complicated estate with four beneficiaries in different states",
        solution: "Provided court-ready documentation, closed 10 days after probate approval, proceeds distributed to all heirs",
        quote: "As executor with four siblings in four states, selling mom's house seemed impossible. Home Buyer Boise understood probate, provided proper documentation, and made the process manageable. All four of us received our shares without conflict."
      },
      {
        title: "Nampa Estate Simplification",
        location: "Nampa, ID",
        situation: "Elderly estate with property needing $30,000+ in repairs, executor overwhelmed",
        solution: "Purchased as-is, no repairs required, simple probate sale closed within month of approval",
        quote: "Dad's Nampa house needed everything - roof, HVAC, flooring. I couldn't afford repairs as executor and didn't want to manage contractors. Home Buyer Boise bought it as-is and the estate still received fair value."
      }
    ],
    comparisonData: {
      traditional: {
        timeline: "120-180+ days with probate",
        repairs: "Required for financing",
        commissions: "6% from estate proceeds",
        closingCosts: "Estate pays costs",
        certainty: "Financing can fail during probate",
        convenience: "Coordinate court + showings + repairs"
      },
      cashOffer: {
        timeline: "7-14 days after court approval",
        repairs: "$0 - buy as-is",
        commissions: "$0 - no realtors",
        closingCosts: "We pay 100%",
        certainty: "Cash ready upon approval",
        convenience: "One showing, court-ready docs"
      }
    },
    cta: "Executor of an estate? Simplify your probate sale. Request a cash offer today.",
  },
  "tax-liens": {
    heroSubtitle: "House has tax liens or IRS debt? We buy properties with liens and pay them off at closing. Get out from under tax debt.",
    intro: "Tax liens and IRS debt can make selling your house seem impossible. Traditional buyers can't get financing when properties have liens. Home Buyer Boise specializes in purchasing homes with tax liens, IRS liens, and property tax debt. We pay off the liens at closing and you walk away free from tax debt.",
    whyChoose: [
      "Buy houses with tax liens",
      "Pay off liens at closing",
      "Handle IRS and state tax debt",
      "Work with property tax arrears",
      "Still get cash after lien payoff",
      "Resolve tax issues quickly",
    ],
    situations: [
      { title: "IRS Tax Lien", description: "Federal tax debt attached to property" },
      { title: "Property Tax Arrears", description: "Behind on property taxes" },
      { title: "State Tax Liens", description: "Idaho state tax debt" },
      { title: "Multiple Liens", description: "Several tax liens on property" },
    ],
    process: "We research all liens on your property, calculate total payoff amounts, and make you a cash offer. At closing, we pay off all liens and you receive the remaining proceeds. Get out from under tax debt and move forward with a clean slate.",
    detailedProcess: [
      { step: 1, title: "Tell Us About Your Liens", description: "Call (208) 405-2274. Share what you know about tax liens on your property.", timeline: "5 minutes" },
      { step: 2, title: "Comprehensive Lien Research", description: "We research all liens - IRS, state, property tax - to understand the full picture.", timeline: "1-2 days" },
      { step: 3, title: "Offer After Lien Payoff", description: "Receive an offer that accounts for paying off all liens. See what you'll net.", timeline: "24-48 hours" },
      { step: 4, title: "Review Your Options", description: "Understand exactly how liens will be satisfied. No surprises at closing.", timeline: "Your pace" },
      { step: 5, title: "Liens Paid At Closing", description: "We satisfy all tax liens at closing. You're released from the debt.", timeline: "14-21 days" },
      { step: 6, title: "Clean Slate", description: "Liens satisfied, debt resolved, you receive remaining equity. Fresh start.", timeline: "Same day" }
    ],
    faqs: [
      {
        question: "Can I sell a house with tax liens?",
        answer: "Yes. We specialize in buying properties with tax liens. Traditional buyers can't get financing on properties with liens, but we buy with cash and pay off all liens at closing. You receive the remaining equity after lien satisfaction."
      },
      {
        question: "What types of tax liens can you help with?",
        answer: "We handle all types: IRS federal tax liens, Idaho state tax liens, property tax arrears, and even multiple liens on the same property. We research all encumbrances and factor them into our offer."
      },
      {
        question: "Will I receive any money after the liens are paid?",
        answer: "It depends on your equity. If your home is worth more than the total liens plus our costs, you receive the difference in cash at closing. Even if not, you walk away free from the tax debt without foreclosure."
      },
      {
        question: "How do you handle IRS liens?",
        answer: "We work with title companies experienced in IRS lien payoffs. The IRS typically must provide a payoff letter, and we satisfy the lien at closing. This removes the lien from your property and often satisfies the underlying debt."
      },
      {
        question: "What if I owe more in liens than my house is worth?",
        answer: "We may still be able to help. Sometimes we can negotiate with lien holders for less than the full amount. At minimum, selling resolves the property-related debt and prevents tax foreclosure."
      },
      {
        question: "How long does selling with tax liens take?",
        answer: "Lien research and payoff coordination typically add a few days to our process. Most tax lien sales close in 14-21 days. IRS liens may take slightly longer due to federal procedures."
      },
      {
        question: "Do I need to contact the IRS or tax agencies first?",
        answer: "No. We handle all communication with taxing authorities. We obtain payoff amounts, coordinate lien releases, and ensure everything is satisfied at closing. You don't need to negotiate with the IRS yourself."
      },
      {
        question: "What happens to my credit after selling?",
        answer: "Satisfying tax liens is better for your credit than continued delinquency or tax foreclosure. Once liens are paid at closing, they show as satisfied on your record. This is the cleanest resolution for your financial future."
      }
    ],
    successStories: [
      {
        title: "Boise IRS Lien Resolution",
        location: "Boise, ID (Vista)",
        situation: "Homeowner with $47,000 IRS lien and $12,000 in back property taxes, couldn't sell traditionally",
        solution: "Purchased property, paid off all liens at closing, owner received remaining equity and clean slate",
        quote: "The IRS lien scared away every traditional buyer. Home Buyer Boise paid off my $47,000 federal lien and back taxes. I walked away with $23,000 and no more IRS debt. Life-changing."
      },
      {
        title: "Meridian Property Tax Arrears",
        location: "Meridian, ID",
        situation: "Widow fell behind on property taxes during medical crisis, faced tax sale",
        solution: "Closed before tax sale deadline, all arrears paid, preserved homeowner's credit",
        quote: "After my husband passed, I couldn't keep up with property taxes. Home Buyer Boise paid off three years of back taxes and I avoided the tax sale. They were kind during a terrible time."
      }
    ],
    comparisonData: {
      traditional: {
        timeline: "Cannot close - liens block financing",
        repairs: "N/A - can't sell with liens",
        commissions: "N/A",
        closingCosts: "N/A",
        certainty: "No traditional sale possible",
        convenience: "Must resolve liens first"
      },
      cashOffer: {
        timeline: "14-21 days with lien payoff",
        repairs: "$0 - buy as-is",
        commissions: "$0 - no realtors",
        closingCosts: "We pay all costs",
        certainty: "We handle lien resolution",
        convenience: "You don't contact IRS"
      }
    },
    cta: "Have tax liens? We can help. Get a cash offer and resolve your tax debt today.",
  },
  "downsizing": {
    heroSubtitle: "Ready to downsize your Boise home? Sell your large family home fast without repairs or staging. Start your next chapter.",
    intro: "Empty nesters and retirees across Boise are discovering the freedom of downsizing. Home Buyer Boise helps you sell your large family home quickly so you can move into a smaller, more manageable property. No need to repair the worn carpet from decades of kids, update the kitchen, or stage rooms that haven't been used in years.",
    whyChoose: [
      "No repairs to old family home",
      "No staging empty bedrooms",
      "Quick sale to fund new smaller home",
      "Cash offer on any size property",
      "Close on your retirement timeline",
      "Avoid months of showings",
    ],
    situations: [
      { title: "Empty Nest", description: "Kids moved out, house too big now" },
      { title: "Retirement Move", description: "Moving to 55+ community or smaller home" },
      { title: "Too Much Maintenance", description: "Large yard and home upkeep overwhelming" },
      { title: "Fixed Income", description: "Lower expenses with smaller property" },
    ],
    process: "Many of our clients are empty nesters and retirees looking to simplify. We understand you may have lived in your home for decades and have emotional attachments. We provide respectful, fair offers and can close when you've found your perfect next home.",
    detailedProcess: [
      { step: 1, title: "Share Your Downsizing Goals", description: "Call (208) 405-2274. Tell us about your home and timeline for your next chapter.", timeline: "5 minutes" },
      { step: 2, title: "Respectful Home Visit", description: "We visit your family home with appreciation for decades of memories.", timeline: "30-45 minutes" },
      { step: 3, title: "Fair Offer For Your Home", description: "Receive an offer that respects your home's value. No lowball tactics.", timeline: "24 hours" },
      { step: 4, title: "Find Your Next Home First", description: "Take time to find your smaller home. We wait until you're ready.", timeline: "Your timeline" },
      { step: 5, title: "Flexible Closing Date", description: "Close when you've secured your new place. No rush, no pressure.", timeline: "7-90 days" },
      { step: 6, title: "New Chapter Begins", description: "Receive your funds, start your simpler life. Leave belongings for us to handle.", timeline: "Same day" }
    ],
    faqs: [
      {
        question: "Do I have to update my home before selling when downsizing?",
        answer: "Not at all. We buy family homes as-is, regardless of how dated they may be. Original 1970s kitchen? No problem. Worn carpet from decades of kids? We'll take it. You don't spend a penny on updates."
      },
      {
        question: "Can I wait until I find my new smaller home before closing?",
        answer: "Absolutely. We offer flexible closing dates to match your timeline. If you need to find and secure your next home first, we can wait 30, 60, or even 90 days before closing. No rush - this is your transition."
      },
      {
        question: "What if my home has 30+ years of belongings in it?",
        answer: "Take what you want and leave the rest. We can purchase with contents included and handle clean-out after closing. Downsizing is emotionally difficult enough without the pressure of emptying every closet."
      },
      {
        question: "How do you determine value for older family homes?",
        answer: "We assess current condition, compare to similar properties, and factor in any needed updates. Our offers reflect fair market value for the home's current state. Many family homes in original condition still have significant value."
      },
      {
        question: "What if my home is too large for one showing?",
        answer: "We're thorough but efficient. Larger homes may require a longer walkthrough, but it's still just one visit. We respect your time and privacy while ensuring we understand your property's full value."
      },
      {
        question: "Can you help if we're moving to assisted living?",
        answer: "Yes. We work with families transitioning parents to assisted living or memory care facilities. We understand the urgency and sensitivity of these situations. Quick closing provides funds for care expenses."
      },
      {
        question: "Is selling to you faster than listing?",
        answer: "Typically yes. Traditional listings for older homes often require updates, staging, and months of showings. Buyers may demand repairs before closing. We skip all that - one showing, fair offer, close in weeks."
      },
      {
        question: "What if I've lived here 40 years and it's paid off?",
        answer: "That's great - you have full equity to fund your next chapter. We'll make a fair cash offer, you keep everything, and can use the proceeds for your smaller home, retirement, or whatever you choose. No mortgage payoff means more cash for you."
      }
    ],
    successStories: [
      {
        title: "Eagle Empty Nesters",
        location: "Eagle, ID",
        situation: "Retired couple in 4,000 sq ft home with 40 years of belongings, wanted to move to 55+ community",
        solution: "Purchased with timeline flexibility, couple took 45 days to find perfect smaller home, left most contents for us to handle",
        quote: "Our Eagle home was perfect for raising kids but too much for just the two of us. Home Buyer Boise let us take our time finding our retirement condo, then handled everything we left behind. Seamless transition."
      },
      {
        title: "Boise Senior Transition",
        location: "Boise, ID (North End)",
        situation: "Elderly widow moving to assisted living, family needed funds quickly for care costs",
        solution: "Closed in 14 days, funds covered first year of assisted living, family avoided rushed estate sale",
        quote: "Mom needed assisted living immediately. Home Buyer Boise bought her home in two weeks, which funded her care. The alternative was a stressful estate sale while worrying about her health."
      }
    ],
    comparisonData: {
      traditional: {
        timeline: "90-120+ days (updates often needed)",
        repairs: "Expected for dated homes",
        commissions: "6% realtor fees",
        closingCosts: "Seller pays portion",
        certainty: "Buyers may demand updates",
        convenience: "Months of showings, staging"
      },
      cashOffer: {
        timeline: "7-45 days (your timeline)",
        repairs: "$0 - buy as-is",
        commissions: "$0 - no realtors",
        closingCosts: "We pay 100%",
        certainty: "No update demands",
        convenience: "One showing, flexible timing"
      }
    },
    cta: "Ready to downsize? Sell your family home fast and start your next adventure.",
  },
  "fire-water-damage": {
    heroSubtitle: "House damaged by fire or water? Sell it as-is without repairs. We buy damaged homes and handle insurance claims.",
    intro: "Fire and water damage can leave homeowners overwhelmed. Whether from a kitchen fire, flood, burst pipe, or smoke damage, repairing the damage is expensive and time-consuming. Home Buyer Boise buys fire and water damaged homes across the Boise metro area. Sell as-is and move forward without the restoration headache.",
    whyChoose: [
      "Buy fire-damaged properties",
      "Purchase water-damaged homes",
      "Work with insurance settlements",
      "No restoration required",
      "Fast closing on damaged homes",
      "Handle partial or total damage",
    ],
    situations: [
      { title: "Kitchen or Electrical Fire", description: "Partial fire damage and smoke throughout" },
      { title: "Flood Damage", description: "Basement or ground-floor flooding" },
      { title: "Burst Pipe", description: "Water damage from plumbing failure" },
      { title: "Smoke Damage", description: "Structure intact but smoke permeated" },
    ],
    process: "We assess the damage, calculate restoration costs, and make you a fair offer based on as-is condition. If insurance is involved, we can work with settlements. You don't fix anything - we handle all repairs after purchase.",
    detailedProcess: [
      { step: 1, title: "Report Your Damage", description: "Call (208) 405-2274. Tell us about the fire or water damage and your situation.", timeline: "5 minutes" },
      { step: 2, title: "Damage Assessment", description: "We safely assess the damage extent. We've seen major and minor damage - all levels.", timeline: "30-60 minutes" },
      { step: 3, title: "As-Is Offer", description: "Receive a fair cash offer based on current damaged condition. No repairs required.", timeline: "24-48 hours" },
      { step: 4, title: "Coordinate With Insurance", description: "If insurance is involved, we work with your settlement. Take time to review.", timeline: "Your pace" },
      { step: 5, title: "Close On Damaged Property", description: "We close and take ownership of the damaged property. You move on.", timeline: "7-21 days" },
      { step: 6, title: "Relief From Disaster", description: "Receive your cash. Use it for a fresh start while we handle restoration.", timeline: "Same day" }
    ],
    faqs: [
      {
        question: "Do you buy houses with fire damage?",
        answer: "Yes. We purchase homes with all levels of fire damage - from kitchen fires with smoke damage to significant structural damage. We assess the property, estimate repair costs, and make a fair offer based on as-is condition."
      },
      {
        question: "What about water-damaged properties?",
        answer: "We buy all types of water damage: flooding, burst pipes, roof leaks, basement water intrusion, and more. Even if mold has developed, we can still make an offer. You don't need to remediate before selling."
      },
      {
        question: "How do you work with insurance claims?",
        answer: "If you've received an insurance settlement, we can work around that payment. Some owners keep their settlement and sell to us for additional proceeds. Others assign claims or settle after sale. We're flexible with insurance situations."
      },
      {
        question: "What if the damage makes the home unlivable?",
        answer: "That's often when we're most helpful. Uninhabitable homes can't sell traditionally. We provide an exit strategy when you can't live in the property and can't afford restoration. Sell fast and move forward."
      },
      {
        question: "Do I need to get restoration estimates first?",
        answer: "No. We have experience assessing damage and estimating repair costs. You don't need to coordinate contractors or obtain bids. We handle all evaluations during our property walkthrough."
      },
      {
        question: "How do you determine price for damaged homes?",
        answer: "We assess comparable home values, estimate restoration costs, and subtract that from market value. Our offer reflects fair as-is value. We're transparent about our calculations if you want to see our numbers."
      },
      {
        question: "Can you buy if my insurance claim is still pending?",
        answer: "Often yes. The specifics depend on your policy and claim status. We can sometimes purchase before settlement or work with assignment of benefits. Each situation is different - call us to discuss your specifics."
      },
      {
        question: "How fast can you close on a damaged property?",
        answer: "We typically close in 10-21 days on damaged properties. Unlike traditional sales that require repairs, we buy as-is. Insurance coordination may affect timing slightly, but we move quickly."
      }
    ],
    successStories: [
      {
        title: "Nampa Kitchen Fire",
        location: "Nampa, ID",
        situation: "Kitchen fire with smoke damage throughout, insurance offered repair but family didn't want to rebuild",
        solution: "Purchased as-is, family kept insurance settlement and received additional cash from sale",
        quote: "Our kitchen fire left smoke damage in every room. Insurance would pay to repair, but we couldn't face living there again. Home Buyer Boise bought it as-is, and between insurance and the sale, we moved into a better home."
      },
      {
        title: "Caldwell Flood Damage",
        location: "Caldwell, ID",
        situation: "Basement flood from burst pipe while owner was traveling, mold developed before discovery",
        solution: "Purchased with mold damage, no remediation required, closed in 16 days",
        quote: "A pipe burst while I was on vacation. By the time I got back, mold was everywhere. Nobody would buy it. Home Buyer Boise took it as-is and I didn't have to deal with remediation."
      }
    ],
    comparisonData: {
      traditional: {
        timeline: "Cannot sell with damage",
        repairs: "Full restoration required first",
        commissions: "6% after repairs complete",
        closingCosts: "Seller pays after restoration",
        certainty: "Must repair before selling",
        convenience: "Months of contractor coordination"
      },
      cashOffer: {
        timeline: "10-21 days as-is",
        repairs: "$0 - we handle restoration",
        commissions: "$0 - no realtors",
        closingCosts: "We pay 100%",
        certainty: "Buy damaged properties",
        convenience: "Sell and move on immediately"
      }
    },
    cta: "Have a damaged house? Sell as-is and move on. Get your cash offer now.",
  },
  "hoarder-house": {
    heroSubtitle: "Need to sell a hoarder house? We buy hoarded properties with compassion. Clean-out assistance available.",
    intro: "Hoarding situations are sensitive and overwhelming for families. Whether you're dealing with a loved one's estate or your own situation, Home Buyer Boise provides compassionate, judgment-free service for hoarder house sales in Boise. We can assist with clean-out or purchase the property with everything inside.",
    whyChoose: [
      "Compassionate, judgment-free service",
      "Buy houses with contents inside",
      "Clean-out assistance available",
      "Respect family privacy",
      "Handle estate hoarding situations",
      "Fast, discreet closing process",
    ],
    situations: [
      { title: "Estate of Hoarder", description: "Inherited hoarded property from family member" },
      { title: "Overwhelmed by Clean-Out", description: "Don't know where to start with clearing" },
      { title: "Privacy Concerns", description: "Want discreet sale without public showings" },
      { title: "Senior Transition", description: "Moving parent from hoarded home to care" },
    ],
    process: "We approach hoarding situations with sensitivity and respect. You don't need to clean anything - we can purchase with all contents included. We understand these situations are difficult and provide confidential service with compassion.",
    detailedProcess: [
      { step: 1, title: "Confidential Contact", description: "Call (208) 405-2274. We handle these situations with complete discretion and compassion.", timeline: "5 minutes" },
      { step: 2, title: "Non-Judgmental Visit", description: "We assess the property respectfully. No judgment - we've helped many similar situations.", timeline: "30-45 minutes" },
      { step: 3, title: "All-Inclusive Offer", description: "Receive an offer for the property with all contents. We handle removal.", timeline: "24 hours" },
      { step: 4, title: "Take Your Time", description: "Remove any items you want. We handle whatever remains after closing.", timeline: "Your pace" },
      { step: 5, title: "Close With Contents", description: "We close and take responsibility for everything - property and contents.", timeline: "10-21 days" },
      { step: 6, title: "Fresh Start", description: "Receive your cash. We handle clean-out professionally and respectfully.", timeline: "Same day" }
    ],
    faqs: [
      {
        question: "Do I have to clean out the hoarded house before you buy it?",
        answer: "No. We purchase hoarded properties with all contents included. Floor-to-ceiling belongings, pathways through rooms, filled garages - we buy it as-is. You take what you want and leave everything else."
      },
      {
        question: "How do you evaluate a hoarded property?",
        answer: "We walk through as much as accessible, assess the structure beneath the contents, and estimate clean-out costs. Even if we can't see every room, we have experience evaluating these properties and provide fair offers."
      },
      {
        question: "Is this process confidential?",
        answer: "Absolutely. There are no 'For Sale' signs, no open houses, no public showings with strangers walking through. The sale is private between you and us. Your neighbors won't know the details of the property's condition."
      },
      {
        question: "What if we can't agree on what to keep?",
        answer: "Take your time removing items you want to keep. Once you've taken everything meaningful, we purchase with the remainder. There's no pressure to rush the sorting process if you need extra time."
      },
      {
        question: "Can you help with clean-out assistance?",
        answer: "Yes. We can recommend professional clean-out services or include clean-out in our purchase. Some families prefer to handle clean-out themselves; others want us to manage everything. We're flexible."
      },
      {
        question: "How do you handle hoarding estates respectfully?",
        answer: "We understand hoarding is a complex situation, often involving mental health challenges. We treat every seller with dignity and respect. We never judge the condition - we simply help families move forward."
      },
      {
        question: "What if there's damage hidden beneath the clutter?",
        answer: "We assume properties with significant clutter may have underlying issues. Our offer accounts for potential surprises. Once we take ownership, any additional problems we find are our responsibility, not yours."
      },
      {
        question: "How fast can you close on a hoarded property?",
        answer: "We can close in as little as 7-14 days if you're ready. Some families need more time to sort through belongings - we accommodate your timeline. The process moves at your pace."
      }
    ],
    successStories: [
      {
        title: "Boise North End Hoarder Estate",
        location: "Boise, ID (North End)",
        situation: "Four siblings inherited parents' hoarded home, hadn't been cleaned in 20 years, siblings scattered across country",
        solution: "Purchased with all contents, family didn't have to coordinate clean-out from different states",
        quote: "None of us could face cleaning out mom and dad's house. Forty years of memories and twenty years of hoarding. Home Buyer Boise bought it with everything inside. We kept the meaningful items and walked away."
      },
      {
        title: "Meridian Elderly Parent Transition",
        location: "Meridian, ID",
        situation: "Daughter needed to move father with hoarding disorder to assisted living, couldn't manage property clean-out",
        solution: "Discreet purchase, father's dignity preserved, funds used for quality care facility",
        quote: "Dad's hoarding got worse after mom passed. Moving him to assisted living meant selling the house, but cleaning it out seemed impossible. Home Buyer Boise handled everything with such compassion."
      }
    ],
    comparisonData: {
      traditional: {
        timeline: "Months (clean-out + repairs first)",
        repairs: "Full clean-out required",
        commissions: "6% after clean-out",
        closingCosts: "Seller pays after clean-out",
        certainty: "Must clear before listing",
        convenience: "Massive clean-out project first"
      },
      cashOffer: {
        timeline: "7-14 days (buy with contents)",
        repairs: "$0 - buy as-is",
        commissions: "$0 - no realtors",
        closingCosts: "We pay 100%",
        certainty: "No clean-out required",
        convenience: "We handle everything"
      }
    },
    cta: "Need to sell a hoarded property? We can help with compassion. Contact us today.",
  },
  "expired-listing": {
    heroSubtitle: "Listing expired and house won't sell? Get a guaranteed cash offer. No more price reductions, showings, or waiting.",
    intro: "If your listing expired and your house didn't sell, you know the frustration of showings, open houses, and price reductions that led nowhere. Home Buyer Boise provides the solution: a guaranteed cash offer with certain closing. No more waiting for buyers to get financing, no more deals falling through, no more price negotiations.",
    whyChoose: [
      "Guaranteed cash offer - no contingencies",
      "No more showings or open houses",
      "Close in days, not months",
      "No realtor fees this time",
      "Fair price despite failed listing",
      "Certain closing with cash",
    ],
    situations: [
      { title: "Multiple Price Reductions", description: "Lowered price several times with no offers" },
      { title: "Deals Fell Through", description: "Had offers but financing failed" },
      { title: "Tired of Showings", description: "Exhausted from keeping house show-ready" },
      { title: "Need to Move", description: "Can't wait months for another listing attempt" },
    ],
    process: "We've bought dozens of homes that wouldn't sell traditionally. Often these homes just need the right buyer - a cash buyer who doesn't need financing approval. We make fair offers on expired listings and close quickly with certainty.",
    detailedProcess: [
      { step: 1, title: "Tell Us About Your Listing", description: "Call (208) 405-2274. Share your listing history and why you think it didn't sell.", timeline: "5 minutes" },
      { step: 2, title: "Fresh Property Review", description: "We evaluate without the biases of previous buyers or agents.", timeline: "30 minutes" },
      { step: 3, title: "Cash Offer - No Contingencies", description: "Receive a guaranteed cash offer. No financing contingencies that scared off buyers.", timeline: "24 hours" },
      { step: 4, title: "Compare To Listing Price", description: "See how our offer compares. Sometimes cash in hand beats waiting forever.", timeline: "Your choice" },
      { step: 5, title: "Finally Sell Your House", description: "Accept and close. No more showings, no more hoping for the right buyer.", timeline: "7-14 days" },
      { step: 6, title: "Move On With Cash", description: "Listing nightmare over. Receive your cash and close this chapter.", timeline: "Same day" }
    ],
    faqs: [
      {
        question: "Why didn't my house sell with a realtor?",
        answer: "Many factors can cause listings to expire: pricing, condition, location, or market timing. Sometimes properties need a cash buyer who doesn't require financing or inspections. We buy properties that didn't sell traditionally and close with certainty."
      },
      {
        question: "Will you pay less because my listing expired?",
        answer: "Not necessarily. We base our offer on current market value and condition, not on your previous listing history. The failed listing is in the past - we evaluate your home fresh and make a fair cash offer based on today's factors."
      },
      {
        question: "Do I have to pay realtor fees if my listing expired?",
        answer: "Check your listing agreement, but typically if it expired without sale, you owe nothing. Selling to us involves zero realtor commissions - saving you 6% compared to a successful traditional sale."
      },
      {
        question: "What if my listing agent wants me to relist?",
        answer: "That's your decision. Many homeowners who've experienced months of showings, price reductions, and failed deals prefer the certainty of a cash offer. We close quickly with no contingencies. Compare our offer to another listing attempt."
      },
      {
        question: "Can you guarantee the sale won't fall through?",
        answer: "Yes. Unlike traditional buyers who need financing approval, we buy with cash. There are no financing contingencies that could derail the sale. Once you accept our offer, we close - guaranteed."
      },
      {
        question: "What if deals fell through because of inspection issues?",
        answer: "We buy as-is. Whatever caused previous deals to fail - foundation, roof, HVAC, or other issues - we factor into our offer and purchase anyway. No inspection surprises, no renegotiation, no walking away."
      },
      {
        question: "How long will this take compared to relisting?",
        answer: "We typically close in 7-14 days compared to another 3-6 months of listing, showings, and uncertainty. If you're ready to move forward, we can have cash in your hands within two weeks."
      },
      {
        question: "Should I make repairs before getting your offer?",
        answer: "No. We buy as-is regardless of condition. If previous buyers demanded repairs you couldn't or wouldn't make, we don't require them. Save your money and let us handle repairs after purchase."
      }
    ],
    successStories: [
      {
        title: "Star 9-Month Listing Failure",
        location: "Star, ID",
        situation: "Home listed for 9 months with 3 price reductions and 2 failed deals, seller exhausted",
        solution: "Cash offer accepted, closed in 12 days, no more showings or uncertainty",
        quote: "After 9 months, 3 price drops, and 2 failed deals, I was done. Home Buyer Boise made an offer Friday and we closed in 12 days. Should have called them first."
      },
      {
        title: "Meridian Inspection Failure",
        location: "Meridian, ID",
        situation: "Two traditional buyers backed out after inspection found foundation issues, owner couldn't afford repairs",
        solution: "Purchased as-is including foundation issues, no inspection contingency",
        quote: "Two buyers ran after their inspectors found foundation cracks. I couldn't afford the $40,000 fix. Home Buyer Boise bought it anyway and dealt with the foundation themselves."
      }
    ],
    comparisonData: {
      traditional: {
        timeline: "Another 60-90+ days (if it sells)",
        repairs: "Buyers may demand repairs again",
        commissions: "6% realtor fees",
        closingCosts: "Seller pays portion",
        certainty: "May fail again",
        convenience: "More months of showings"
      },
      cashOffer: {
        timeline: "7-14 days guaranteed",
        repairs: "$0 - buy as-is",
        commissions: "$0 - no realtors",
        closingCosts: "We pay 100%",
        certainty: "Cash - guaranteed close",
        convenience: "Done in two weeks"
      }
    },
    cta: "Tired of your house sitting on the market? Get a guaranteed cash offer today.",
  },
  "behind-mortgage": {
    heroSubtitle: "Behind on mortgage payments? Sell before foreclosure starts. Catch up on payments or pay off your loan completely.",
    intro: "If you've missed mortgage payments but aren't in foreclosure yet, you have options. Home Buyer Boise can help you sell your house quickly, pay off your mortgage, and potentially walk away with cash - all before foreclosure proceedings begin. Protect your credit and your financial future.",
    whyChoose: [
      "Sell before foreclosure filing",
      "Protect your credit score",
      "Pay off missed payments",
      "Avoid foreclosure on record",
      "Confidential, judgment-free help",
      "May receive cash after payoff",
    ],
    situations: [
      { title: "Few Months Behind", description: "Missed 2-4 mortgage payments" },
      { title: "Job Loss", description: "Unemployment made payments impossible" },
      { title: "Medical Bills", description: "Healthcare costs depleted savings" },
      { title: "Can't Catch Up", description: "Know you can't get current on loan" },
    ],
    process: "Contact us as soon as you realize you can't catch up on payments. The earlier you act, the more options you have. We'll calculate your payoff amount and make a fair offer. If there's equity, you may receive cash after paying off the mortgage.",
    detailedProcess: [
      { step: 1, title: "Call Before It Gets Worse", description: "Call (208) 405-2274. Tell us how far behind you are and your financial situation.", timeline: "5 minutes" },
      { step: 2, title: "Calculate Your Options", description: "We review your mortgage, payoff amount, and home value to understand options.", timeline: "Same day" },
      { step: 3, title: "Offer To Catch You Up", description: "Receive an offer that pays off your mortgage and may leave you with equity.", timeline: "24 hours" },
      { step: 4, title: "Stop The Stress", description: "Accept and stop worrying about late notices and mounting fees.", timeline: "Your choice" },
      { step: 5, title: "Pay Off Mortgage", description: "We close and satisfy your mortgage. No more missed payments.", timeline: "7-14 days" },
      { step: 6, title: "Financial Relief", description: "Mortgage satisfied, stress ended, receive any remaining equity. Breathe again.", timeline: "Same day" }
    ],
    faqs: [
      {
        question: "How many payments behind triggers foreclosure?",
        answer: "In Idaho, lenders typically start foreclosure proceedings after 3-4 missed payments (90-120 days). However, you don't want to wait until you receive a Notice of Default. The earlier you contact us, the better your options."
      },
      {
        question: "Will selling save my credit score?",
        answer: "Selling before foreclosure significantly protects your credit. While late payments will still appear, a foreclosure drops your score 100-150+ points and stays for 7 years. Selling shows a normal sale, allowing faster credit recovery."
      },
      {
        question: "What if I can eventually catch up on payments?",
        answer: "If you have a plan to catch up, pursue that first. We're here for situations where catching up isn't realistic. If you're uncertain, getting a no-obligation cash offer gives you information to help decide."
      },
      {
        question: "How much will I receive after paying off the mortgage?",
        answer: "It depends on your equity. Our offer minus your mortgage payoff (including arrears, fees, and penalties) equals your cash at closing. Even modest equity can mean a few thousand dollars to help you start fresh."
      },
      {
        question: "Do I have to tell my lender I'm selling?",
        answer: "Not immediately, but they'll learn when we request a payoff. We handle all lender communication as part of the process. Many lenders prefer a sale over the costs of foreclosure."
      },
      {
        question: "What if I'm underwater on my mortgage?",
        answer: "If you owe more than the home is worth, we may be able to negotiate a short sale with your lender. Banks often accept less than the full amount to avoid foreclosure costs. We handle the negotiation."
      },
      {
        question: "Is this process confidential?",
        answer: "Yes. There's no 'For Sale' sign, no public listing, no neighbors knowing your situation. The sale is a private transaction. Protect your privacy during a difficult financial time."
      },
      {
        question: "How fast can you close if I'm behind on payments?",
        answer: "We can close in 7-14 days in most cases. The urgency depends on how close you are to foreclosure. If you've received notices, we move as fast as possible. Earlier contact means more flexibility."
      }
    ],
    successStories: [
      {
        title: "Kuna Medical Emergency",
        location: "Kuna, ID",
        situation: "Medical bills depleted savings, fell 4 months behind on mortgage, foreclosure imminent",
        solution: "Sold before foreclosure filing, mortgage paid off, family preserved credit for future home purchase",
        quote: "A medical emergency wiped out our savings. We fell behind fast. Home Buyer Boise helped us sell before foreclosure hit our credit. Now we're renting while we recover, but we can buy again someday."
      },
      {
        title: "Boise Job Loss Recovery",
        location: "Boise, ID (West)",
        situation: "Software layoff, unemployment exhausted, 3 months behind and unable to catch up",
        solution: "Quick sale, mortgage satisfied, owner avoided foreclosure and received modest equity",
        quote: "After being laid off, I burned through savings trying to keep up. When I realized I couldn't, Home Buyer Boise helped me sell, pay off the mortgage, and walk away with $12,000 instead of a foreclosure."
      }
    ],
    comparisonData: {
      traditional: {
        timeline: "60-90+ days (may not close in time)",
        repairs: "Required for buyer financing",
        commissions: "6% from limited equity",
        closingCosts: "Further reduces equity",
        certainty: "May not close before foreclosure",
        convenience: "Showings while stressed"
      },
      cashOffer: {
        timeline: "7-14 days (before foreclosure)",
        repairs: "$0 - sell as-is",
        commissions: "$0 - keep equity",
        closingCosts: "We pay 100%",
        certainty: "Close before foreclosure starts",
        convenience: "Private, confidential sale"
      }
    },
    cta: "Behind on payments? Act now before foreclosure. Get your cash offer today.",
  },
  "code-violations": {
    heroSubtitle: "House has code violations? We buy properties with municipal violations, unpermitted work, and compliance issues.",
    intro: "Code violations from the city can make selling your house nearly impossible. Traditional buyers can't get financing on properties with open violations or unpermitted work. Home Buyer Boise specializes in purchasing homes with code compliance issues across Boise and the Treasure Valley. We handle violations after closing.",
    whyChoose: [
      "Buy houses with open violations",
      "Purchase properties with unpermitted work",
      "Handle code compliance after closing",
      "Work with municipal issues",
      "No need to fix violations first",
      "Cash purchase despite violations",
    ],
    situations: [
      { title: "Unpermitted Addition", description: "Room added without building permits" },
      { title: "Municipal Violations", description: "Open code violations from city" },
      { title: "Illegal Conversion", description: "Garage converted to living space unpermitted" },
      { title: "Compliance Orders", description: "City issued orders to correct violations" },
    ],
    process: "We research all code violations on your property and factor compliance costs into our offer. You don't need to obtain permits, fix violations, or deal with the city. We buy as-is and handle all compliance issues after purchase.",
    detailedProcess: [
      { step: 1, title: "Tell Us About Violations", description: "Call (208) 405-2274. Share what violations you know about - municipal, permits, etc.", timeline: "5 minutes" },
      { step: 2, title: "Violation Research", description: "We research all open violations and unpermitted work on the property.", timeline: "1-2 days" },
      { step: 3, title: "Offer Despite Violations", description: "Receive a cash offer that accounts for bringing property into compliance.", timeline: "24-48 hours" },
      { step: 4, title: "Review Your Options", description: "Compare to cost of fixing violations yourself. Usually selling to us makes sense.", timeline: "Your pace" },
      { step: 5, title: "Transfer Violation Responsibility", description: "We close and assume all violation resolution responsibilities.", timeline: "14-21 days" },
      { step: 6, title: "Free From City Hassles", description: "Receive your cash. We deal with the city, permits, and compliance.", timeline: "Same day" }
    ],
    faqs: [
      {
        question: "Can I sell a house with open code violations?",
        answer: "Yes. Traditional buyers can't get financing on properties with open violations, but we buy with cash. We purchase homes with code violations regularly and handle compliance after closing."
      },
      {
        question: "What types of code violations can you help with?",
        answer: "All types: unpermitted additions, illegal garage conversions, property maintenance violations, building code issues, zoning violations, and open compliance orders. We research all violations and factor them into our offer."
      },
      {
        question: "Do I have to fix violations before you buy?",
        answer: "No. We buy as-is with open violations. You don't need to obtain permits, hire contractors, or attend city hearings. We take over all compliance responsibilities at closing."
      },
      {
        question: "What if the city is threatening fines or liens?",
        answer: "Contact us quickly. Active enforcement increases urgency, but we can still help. Our cash offer and quick closing can resolve the situation before fines compound or liens attach."
      },
      {
        question: "How do you handle unpermitted work?",
        answer: "We evaluate unpermitted additions, conversions, or modifications. Our offer accounts for the cost of either obtaining permits retroactively or removing unpermitted work. You don't deal with the permitting process."
      },
      {
        question: "Will violations affect your offer price?",
        answer: "Yes, we factor compliance costs into our offer. However, many homeowners still prefer selling as-is to us versus spending money on corrections, dealing with contractors, or fighting with the city."
      },
      {
        question: "What about previous owner violations?",
        answer: "Code violations typically run with the property, not the person. If you inherited or bought a home with existing violations, they're still your responsibility. We can help you sell without resolving them first."
      },
      {
        question: "How fast can you close on a property with violations?",
        answer: "We typically close in 10-21 days on properties with code violations. We need time to research violations with the city, but we move quickly. If enforcement deadlines are approaching, we expedite."
      }
    ],
    successStories: [
      {
        title: "Boise Unpermitted ADU",
        location: "Boise, ID (Bench)",
        situation: "Previous owner added unpermitted accessory dwelling unit, current owner facing $500/day fines",
        solution: "Purchased before fines accumulated, handled permitting process, owner escaped liability",
        quote: "I inherited a house with an unpermitted mother-in-law suite. Boise started threatening $500/day fines. Home Buyer Boise bought it fast and dealt with the permits themselves."
      },
      {
        title: "Nampa Garage Conversion",
        location: "Nampa, ID",
        situation: "Garage converted to bedroom years ago without permits, couldn't sell traditionally",
        solution: "Purchased as-is, handled compliance, seller avoided reconstruction costs",
        quote: "A previous owner turned the garage into a bedroom. Three traditional buyers couldn't get financing because of it. Home Buyer Boise bought it anyway and the violation became their problem."
      }
    ],
    comparisonData: {
      traditional: {
        timeline: "Cannot sell - violations block financing",
        repairs: "Must fix violations first ($10,000+)",
        commissions: "6% after corrections",
        closingCosts: "Seller pays after corrections",
        certainty: "No sale until compliant",
        convenience: "City hearings, contractors, permits"
      },
      cashOffer: {
        timeline: "10-21 days with violations",
        repairs: "$0 - we handle compliance",
        commissions: "$0 - no realtors",
        closingCosts: "We pay 100%",
        certainty: "Buy despite violations",
        convenience: "You don't deal with city"
      }
    },
    cta: "Have code violations? Sell as-is without fixing them. Get your cash offer.",
  },
};
