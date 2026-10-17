import type { ServiceLayer } from "./types";
import { unverifiedTrustText } from "@/lib/seo";

export const SERVICE_LAYERS: Record<string, ServiceLayer> = {
  "sell-house-fast": {
    slug: "sell-house-fast",
    opener: "When timing is everything, a traditional listing rarely matches the urgency Treasure Valley sellers face.",
    sellerSituations: [
      "job transfers with hard start dates",
      "divorce timelines tied to court orders",
      "inherited homes that must close before estate deadlines",
      "financial pressure requiring cash before the next payment cycle",
    ],
    processAngle:
      "We skip showings and buyer financing contingencies so you can lock a closing date instead of hoping a retail buyer qualifies.",
    serviceFaqs: [
      {
        question: "How is a fast sale different from listing on the MLS?",
        answer:
          "A fast cash sale removes repairs, staging, open houses, and 30–90 day financing risk. You trade maximum retail price for speed, certainty, and zero agent commissions.",
      },
      {
        question: "What is the fastest realistic closing timeline?",
        answer:
          "We can close in as little as 7 days when title is clear. Most sellers choose 10–14 days to coordinate moving — or 30–60 days if you need more time.",
      },
    ],
    successSituation: "needed to sell before a relocation deadline",
  },
  "we-buy-houses": {
    slug: "we-buy-houses",
    opener: "We buy houses directly from homeowners — not through agents, not with bank financing contingencies.",
    sellerSituations: [
      "properties rejected by retail buyers after inspection",
      "homes with deferred maintenance or outdated systems",
      "landlords ready to exit without listing vacancies",
      "owners who simply want a straightforward private sale",
    ],
    processAngle:
      "As investors we renovate and resell or rent — so condition issues that scare retail buyers are part of our business model, not deal-breakers.",
    serviceFaqs: [
      {
        question: "Do you really buy houses in any condition?",
        answer:
          "Yes — foundation concerns, roof age, outdated kitchens, unfinished basements, and cosmetic issues are all factored into one as-is cash offer.",
      },
      {
        question: "Are you a national franchise or local buyers?",
        answer:
          unverifiedTrustText(
            "We are local Idaho buyers operating since 2018 — not a call-center franchise. You work directly with our Treasure Valley team.",
            "We are local Idaho buyers — not a call-center franchise. You work directly with our Treasure Valley team.",
          ),
      },
    ],
    successSituation: "could not find a retail buyer willing to purchase as-is",
  },
  "cash-offer": {
    slug: "cash-offer",
    opener: "Every cash offer we present is built from local comps, property condition, and your timeline — reviewed by a real person on our team.",
    sellerSituations: [
      "sellers comparing agent estimates to investor offers",
      "owners who want a number before committing to repairs",
      "heirs evaluating whether to keep or liquidate an estate property",
      "homeowners who need transparency without automated algorithms",
    ],
    processAngle:
      "We walk through condition, liens, and closing costs upfront so the number we quote is the number you understand — no hidden deductions at the closing table.",
    serviceFaqs: [
      {
        question: "Is your cash offer automated or reviewed by a person?",
        answer:
          "Every property is manually reviewed. We do not issue binding automated offers — an acquisitions specialist evaluates your home before we present terms.",
      },
      {
        question: "What costs are deducted from the offer?",
        answer:
          "None. We pay standard seller closing costs and charge zero commissions. The agreed cash price is your net unless you choose to clear optional liens from proceeds.",
      },
    ],
    successSituation: "wanted a clear cash number before deciding whether to list",
  },
  "sell-as-is": {
    slug: "sell-as-is",
    opener: "Selling as-is means you stop spending on repairs, permits, and contractor delays before you ever see an offer.",
    sellerSituations: [
      "homes with foundation or roof issues",
      "properties with unpermitted additions",
      "houses with outdated electrical or plumbing",
      "owners who cannot afford repairs before selling",
    ],
    processAngle:
      "We price in renovation costs ourselves — you leave the property exactly as it sits today, including personal items you choose not to take.",
    serviceFaqs: [
      {
        question: "Do I need to fix anything before you buy?",
        answer:
          "No repairs, cleaning standards, or staging are required. Take what you want and leave the rest — we handle cleanout after closing when needed.",
      },
      {
        question: "Will you still buy if the home failed inspection for a retail buyer?",
        answer:
          "Yes. Inspection failures are one of the most common reasons sellers contact us — we buy the same issues that killed the retail contract.",
      },
    ],
    successSituation: "had a pending sale collapse after the buyer's inspection",
  },
  "inherited-property": {
    slug: "inherited-property",
    opener: "Inherited homes carry emotional weight, multiple decision-makers, and often deferred maintenance — we simplify the entire exit.",
    sellerSituations: [
      "siblings inheriting a childhood home",
      "out-of-state heirs managing an Idaho property",
      "estates with furniture and belongings still inside",
      "properties needing probate coordination",
    ],
    processAngle:
      "We buy with contents included, coordinate with attorneys when needed, and close on timelines that respect both legal requirements and family stress.",
    serviceFaqs: [
      {
        question: "Can you buy an inherited house before probate finishes?",
        answer:
          "It depends on title and court status. We work with Idaho probate attorneys to structure purchases when legal authority to sell exists or is imminent.",
      },
      {
        question: "Do we have to clean out the entire house?",
        answer:
          "No. Take sentimental or valuable items; leave everything else. We handle cleanout and donation/disposal after closing at no cost to you.",
      },
    ],
    successSituation: "inherited a family home with siblings living out of state",
  },
  "avoid-foreclosure": {
    slug: "avoid-foreclosure",
    opener: "If foreclosure is on the horizon, selling for cash can protect your credit and preserve equity that a sheriff sale would erase.",
    sellerSituations: [
      "missed mortgage payments after job loss",
      "medical bills disrupting household cash flow",
      "divorce leaving one party unable to pay alone",
      "adjustable-rate payment shocks",
    ],
    processAngle:
      "We move fast enough to beat auction dates when possible, paying off your lender at closing and putting remaining equity in your pocket.",
    serviceFaqs: [
      {
        question: "Can you close before my foreclosure auction date?",
        answer:
          "Often yes. Contact us immediately with your notice dates — we prioritize pre-foreclosure files and expedite title when a sale can satisfy the loan.",
      },
      {
        question: "Will a cash sale stop foreclosure on my credit report?",
        answer:
          "A completed sale that pays off the loan prevents foreclosure completion. Credit impact is typically less severe than a foreclosure notation.",
      },
    ],
    successSituation: "was weeks from foreclosure auction with limited options",
  },
  "sell-house-divorce": {
    slug: "sell-house-divorce",
    opener: "Divorce sales need speed, neutrality, and clean proceeds splits — not months of showings while both parties still share a roof.",
    sellerSituations: [
      "court-ordered sale deadlines",
      "one spouse relocating while the other stays",
      "disagreement over repair investments before listing",
      "joint owners wanting a single clean payout",
    ],
    processAngle:
      "We work with both parties and attorneys to close once, distribute proceeds per agreement, and eliminate ongoing joint mortgage stress.",
    serviceFaqs: [
      {
        question: "Do both spouses have to agree to your offer?",
        answer:
          "Yes — all titled owners must sign. We can meet separately, work through attorneys, and document terms both parties approve before closing.",
      },
      {
        question: "Can you close quickly so we can divide assets?",
        answer:
          "Yes. Many divorce sales close in 10–21 days, allowing faster settlement of marital assets than a traditional listing cycle.",
      },
    ],
    successSituation: "needed a neutral buyer to split proceeds fairly during divorce",
  },
  "relocation-sale": {
    slug: "relocation-sale",
    opener: "Corporate relocations rarely wait for the Boise market — we align your sale date with your move-out flight.",
    sellerSituations: [
      "employer relocation packages with tight windows",
      "military or federal transfers",
      "remote workers moving out of Idaho",
      "families selling before school enrollment elsewhere",
    ],
    processAngle:
      "We let you pick the closing date — before or after move-out — and buy as-is so you are not managing contractors from another state.",
    serviceFaqs: [
      {
        question: "Can I close after I have already moved out of state?",
        answer:
          "Yes. Remote closings with mobile notary or mail-away signing are standard for our relocation sellers.",
      },
      {
        question: "What if my employer needs proof of sale quickly?",
        answer:
          "We provide purchase agreements and closing statements on timelines relocation departments commonly require.",
      },
    ],
    successSituation: "had three weeks to relocate for a new job out of state",
  },
  "problem-tenants": {
    slug: "problem-tenants",
    opener: "Landlord burnout is real — we buy rental properties with tenants in place or vacant, without you evicting first.",
    sellerSituations: [
      "non-paying tenants and cash-flow losses",
      "lease violations and property damage",
      "out-of-state landlords tired of management",
      "inheritance of a tenant-occupied rental",
    ],
    processAngle:
      "We assume leases where required, handle tenant notifications legally, and remove the management burden in one closing.",
    serviceFaqs: [
      {
        question: "Do I have to evict tenants before selling?",
        answer:
          "No. We purchase with tenants in place and handle lease assignments or cash-for-keys when vacancy is required.",
      },
      {
        question: "Can you buy a multi-unit rental in rough condition?",
        answer:
          "Yes. Duplexes and small multi-family with deferred maintenance are common acquisitions for us.",
      },
    ],
    successSituation: "was done managing difficult tenants and late-night maintenance calls",
  },
  "probate-sale": {
    slug: "probate-sale",
    opener: unverifiedTrustText(
      "Probate sales demand title clarity, court awareness, and patience — we have closed dozens across Ada and Canyon Counties.",
      "Probate sales demand title clarity, court awareness, and patience.",
    ),
    sellerSituations: [
      "executors managing estate liquidation",
      "multiple heirs with conflicting timelines",
      "properties with back taxes or utility arrears",
      "homes needing cleanout before distribution",
    ],
    processAngle:
      "We coordinate with personal representatives and probate counsel so the sale satisfies creditors and distributes net proceeds to heirs.",
    serviceFaqs: [
      {
        question: "Who signs the sale documents in a probate transaction?",
        answer:
          "Typically the court-appointed personal representative or executor with authority to sell estate real property under Idaho probate rules.",
      },
      {
        question: "Can you pay off estate debts at closing?",
        answer:
          "Yes. Mortgages, property taxes, and certain estate liens can be satisfied from sale proceeds at closing.",
      },
    ],
    successSituation: "was executor of an estate with a vacant childhood home",
  },
  "tax-liens": {
    slug: "tax-liens",
    opener: "Tax liens and judgment liens do not have to end in auction — a cash sale can pay arrears and recover your equity.",
    sellerSituations: [
      "delinquent property tax certificates",
      "IRS or state tax liens recorded against title",
      "mechanic's liens from unfinished contractor work",
      "judgment liens from prior litigation",
    ],
    processAngle:
      "We research lien priority, payoff amounts, and net proceeds before you commit — then clear liens at closing from sale funds.",
    serviceFaqs: [
      {
        question: "Can you buy a house with a property tax lien?",
        answer:
          "Yes. Tax liens are paid at closing from proceeds so title transfers clean to us and you receive remaining equity.",
      },
      {
        question: "How do you calculate my net if multiple liens exist?",
        answer:
          "We order a preliminary title report, list every lien payoff, and show you net cash before you accept the offer.",
      },
    ],
    successSituation: "faced a tax certificate sale on a rental property",
  },
  downsizing: {
    slug: "downsizing",
    opener: "Downsizing should free you for the next chapter — not trap you in months of showings and packing projects.",
    sellerSituations: [
      "empty-nesters moving to smaller homes",
      "retirees relocating near family",
      "seniors leaving multi-level homes for single-level living",
      "couples selling after kids leave for college",
    ],
    processAngle:
      "We buy as-is so you skip pre-sale renovations and choose a closing date that aligns with your new lease or senior community move-in.",
    serviceFaqs: [
      {
        question: "Can I take months to move after accepting your offer?",
        answer:
          "Yes. Many downsizing sellers close then rent back briefly or schedule closing after their new home is ready — we accommodate reasonable timelines.",
      },
      {
        question: "Do I have to stage or declutter for buyers?",
        answer:
          "No showings means no staging. Pack at your pace and leave unwanted items — we handle the rest after closing.",
      },
    ],
    successSituation: "wanted to downsize without managing contractor projects first",
  },
  "fire-water-damage": {
    slug: "fire-water-damage",
    opener: "Fire and water damage claims rarely cover everything — selling as-is can beat fighting insurers and contractors for months.",
    sellerSituations: [
      "partially repaired insurance claims",
      "mold after plumbing failures",
      "kitchen or attic fire with smoke damage throughout",
      "vacant homes with unrepaired storm damage",
    ],
    processAngle:
      "We estimate restoration costs in-house so you are not waiting on contractor bids before knowing whether selling makes sense.",
    serviceFaqs: [
      {
        question: "Do I have to finish insurance repairs before you buy?",
        answer:
          "No. We buy mid-restoration, denied-claim, or never-started-repair situations regularly.",
      },
      {
        question: "Will you buy a house with active mold?",
        answer:
          "Yes. Mold remediation scope is priced into our offer — you do not need to remediate first.",
      },
    ],
    successSituation: "had a water loss that insurance did not fully cover",
  },
  "hoarder-house": {
    slug: "hoarder-house",
    opener: "Hoarder situations need compassion and privacy — we never require you to clear the home before we purchase.",
    sellerSituations: [
      "family helping a parent transition to care",
      "estate properties with decades of accumulation",
      "landlords reclaiming severely cluttered rentals",
      "owners embarrassed to list publicly",
    ],
    processAngle:
      "Confidential, no-judgment purchases with full cleanout included after closing — neighbors never need to see a dumpster parade before you sell.",
    serviceFaqs: [
      {
        question: "Do I have to clean out a hoarder house first?",
        answer:
          "Never. Take personal items you want; we handle removal, donation, and disposal after closing.",
      },
      {
        question: "Will anyone tour the house before I decide?",
        answer:
          "Only our acquisitions team visits — no MLS photos, no public open houses, no neighbor curiosity.",
      },
    ],
    successSituation: "needed to sell a parent's cluttered home without public listings",
  },
  "expired-listing": {
    slug: "expired-listing",
    opener: "An expired listing is not a verdict on your home's value — it usually signals condition, pricing, or financing barriers retail buyers would not solve.",
    sellerSituations: [
      "90+ days on market with no acceptable offers",
      "price reductions without attracting qualified buyers",
      "buyers canceling after inspection",
      "sellers tired of keeping the home show-ready",
    ],
    processAngle:
      "We reset the process with a private cash purchase — no new listing period, no commission owed on the failed attempt.",
    serviceFaqs: [
      {
        question: "Do I owe my previous agent if I sell to you?",
        answer:
          "That depends on your listing agreement terms. Many expired listings have no ongoing obligation — we recommend checking your contract.",
      },
      {
        question: "Will your offer be lower because my listing expired?",
        answer:
          "Our offer reflects condition and comps — not listing history. Expired listings often simply needed a cash buyer from the start.",
      },
    ],
    successSituation: "had a listing expire after two price reductions",
  },
  "behind-mortgage": {
    slug: "behind-mortgage",
    opener: "Falling behind on payments does not automatically mean foreclosure — a fast sale can reset your finances before notices escalate.",
    sellerSituations: [
      "two or three missed payments",
      "loan modification denials",
      "ARM payment increases",
      "temporary job loss recovering slowly",
    ],
    processAngle:
      "We calculate exact mortgage payoff and show net equity so you can compare selling now versus risking foreclosure later.",
    serviceFaqs: [
      {
        question: "Can you help if I'm only one month behind?",
        answer:
          "Yes. Early intervention preserves more equity and credit than waiting for default notices or trustee sale scheduling.",
      },
      {
        question: "What if I owe more than the house is worth?",
        answer:
          "We can still discuss options including short sale coordination with your lender — transparency upfront is critical.",
      },
    ],
    successSituation: "was two months behind and needed to avoid default notices",
  },
  "code-violations": {
    slug: "code-violations",
    opener: "City code violations and unpermitted work scare retail buyers — we purchase knowing we will resolve compliance after closing.",
    sellerSituations: [
      "open Ada County or city code enforcement cases",
      "unpermitted garage conversions",
      "tall-grass or vacant-property citations",
      "safety orders on aging electrical or structures",
    ],
    processAngle:
      "We factor fines, permit costs, and remediation into one offer so you are not paying contractors just to make the home sellable.",
    serviceFaqs: [
      {
        question: "Do I have to clear code violations before closing?",
        answer:
          "No. We assume responsibility for resolving violations after purchase in most cases.",
      },
      {
        question: "Can you buy with an open lien from the city?",
        answer:
          "Yes. Municipal liens and fines can be paid at closing from proceeds when title allows.",
      },
    ],
    successSituation: "had open code enforcement fines on an unpermitted addition",
  },
};
