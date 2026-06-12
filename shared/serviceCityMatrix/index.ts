import { SERVICES } from "@/shared/servicesData";
import { CITIES } from "@/shared/contentData";
import { CITY_LAYERS } from "./cityLayers";
import { SERVICE_LAYERS } from "./serviceLayers";
import type { ServiceCityMatrixEntry } from "./types";

function hashPair(serviceSlug: string, citySlug: string): number {
  const s = `${serviceSlug}:${citySlug}`;
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = (h << 5) - h + s.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

const INTRO_VARIANTS = [
  (svc: string, city: string, situation: string, market: string, process: string) =>
    `${svc} in ${city} often starts with ${situation}. ${market} Home Buyer Boise has purchased homes across the area since 2018 — ${process} Every offer is reviewed by our local team (not an automated algorithm), and you pay zero agent commissions or closing costs.`,
  (svc: string, city: string, situation: string, market: string, process: string) =>
    `Homeowners searching for ${svc.toLowerCase()} in ${city} frequently face ${situation}. ${market} We specialize in private, as-is purchases throughout ${city} with flexible closing dates. ${process} Call (208) 405-2275 for a no-obligation conversation — offers are prepared by a real person after reviewing your property.`,
  (svc: string, city: string, situation: string, market: string, process: string) =>
    `If you need ${svc.toLowerCase()} in ${city}, you are not alone — many neighbors have sold to us when ${situation}. ${market} ${process} We are local cash buyers (not a national wholesaler), and ${city} sellers choose us for transparent numbers and timelines they control.`,
];

const COMBO_FAQ_BUILDERS: Array<
  (serviceName: string, cityName: string, county: string, neighborhood: string) => {
    question: string;
    answer: string;
  }
> = [
  (sn, cn, county, nb) => ({
    question: `Why do ${cn} homeowners choose cash instead of listing ${sn.toLowerCase()}?`,
    answer: `Traditional ${cn} listings mean repairs, showings, and buyer financing risk. A cash sale gives ${cn} sellers a guaranteed close — often in 7–14 days — without paying 5–6% in commissions.`,
  }),
  (sn, cn, county, nb) => ({
    question: `Which ${cn} neighborhoods do you buy for ${sn.toLowerCase()}?`,
    answer: `We buy throughout ${cn} including ${nb} and surrounding areas. Condition and price point do not matter — we purchase across ${county} County.`,
  }),
  (sn, cn, county) => ({
    question: `What documents do I need for a ${sn.toLowerCase()} closing in ${cn}?`,
    answer: `Typically a government ID, deed, and any HOA or lien payoff info. Our ${county} County title partner orders title work — most ${cn} sellers need minimal paperwork.`,
  }),
  (sn, cn) => ({
    question: `Can I stay in my ${cn} home after accepting a ${sn.toLowerCase()} offer?`,
    answer: `Yes. Many ${cn} sellers request a short post-closing occupancy period while moving locally or out of state — we accommodate reasonable rent-back terms.`,
  }),
];

function buildEntry(serviceSlug: string, citySlug: string): ServiceCityMatrixEntry {
  const service = SERVICES.find((s) => s.slug === serviceSlug)!;
  const city = CITIES.find((c) => c.slug === citySlug)!;
  const serviceLayer = SERVICE_LAYERS[serviceSlug];
  const cityLayer = CITY_LAYERS[citySlug];
  const h = hashPair(serviceSlug, citySlug);

  const situation = serviceLayer.sellerSituations[h % serviceLayer.sellerSituations.length];
  const introVariant = INTRO_VARIANTS[h % INTRO_VARIANTS.length];
  const neighborhood = city.neighborhoods?.[h % (city.neighborhoods?.length ?? 1)] ?? `${city.name} area`;
  const median =
    city.facts?.find((f) => f.label === "Median Home Price")?.value ?? "local market values";

  const citySlugNote: Record<string, string> = {
    boise: "From North End bungalows to Harris Ranch subdivisions",
    meridian: "Across Paramount, Lochsa Falls, and HOA-managed Meridian communities",
    eagle: "Including Eagle Hills estates and Banbury custom homes",
    kuna: "Throughout Crimson Point, Indian Creek, and Teed Farms",
    star: "On Star acreage lots and river-adjacent suburban pockets",
    middleton: "In Purple Sage, Middleton Place, and Canyon County river corridors",
    nampa: "Near Lake Lowell, Centennial, and downtown Nampa rentals",
    caldwell: "From historic downtown Caldwell to Indian Creek subdivisions",
  };

  const hookVariants = [
    (sn: string, cn: string, nb: string, sit: string, county: string) =>
      `When ${sn.toLowerCase()} becomes urgent in ${cn}, ${nb} sellers tell us they are dealing with ${sit} — a pattern our ${county} County acquisitions team sees every month.`,
    (sn: string, cn: string, nb: string, sit: string) =>
      `${cn}'s ${nb} corridor has distinct buyer expectations for ${sn.toLowerCase()}; we price against ${cn} comps, not generic Treasure Valley averages, especially when sellers face ${sit}.`,
    (sn: string, cn: string, nb: string) =>
      `Owners near ${nb} choose ${sn.toLowerCase()} with Home Buyer Boise because we close without MLS photos, contractor bids, or buyer financing surprises.`,
    (sn: string, cn: string, sit: string, county: string) =>
      `Across ${cn}, ${sn.toLowerCase()} often follows ${sit} — we coordinate title through ${county} County partners who know local parcel quirks.`,
  ];
  const hookIndex = (h + serviceSlug.length * 7 + citySlug.length * 13) % hookVariants.length;
  const comboHook = hookVariants[hookIndex](
    service.name,
    city.name,
    neighborhood,
    situation,
    cityLayer.county
  );

  const citySpecificIntro = [
    comboHook,
    introVariant(service.name, city.name, situation, cityLayer.marketAngle, serviceLayer.processAngle),
    `Typical ${city.name} homes near ${neighborhood} reflect median prices around ${median}. Whether your property is move-in ready or needs work, we buy as-is and cover standard seller closing costs.`,
    serviceLayer.opener,
    `We coordinate closings through ${cityLayer.titleCompany} and can align your sale date with ${situation} — without open houses or repair demands.`,
  ].join(" ");

  const localConsiderations = `${city.name} sellers pursuing ${service.name.toLowerCase()} should know: ${cityLayer.marketAngle} ${city.serviceConsiderations ?? ""}`.trim();

  const whyChooseLocal = [
    `Local ${city.name} acquisitions team — not a national call center`,
    `Closings coordinated with ${cityLayer.county} County title partners`,
    `Experience in ${cityLayer.neighborhoodFocus}`,
    `Human-reviewed offers — no automated instant purchase contracts`,
    `Buy as-is: skip ${city.name} contractor timelines before selling`,
    `No 5–6% realtor commission on ${city.name} sales`,
    `Flexible closing: 7 days to 60+ days for ${city.name} moves`,
    `Confidential option without MLS photos for ${city.name} privacy`,
  ];

  const localProcessNotes = `For ${service.name.toLowerCase()} in ${city.name}, we start with a short property conversation, review ${cityLayer.county} County records and ${city.name} comps, then present a written cash offer. We use ${cityLayer.titleCompany} for title and can close on your schedule. ${serviceLayer.processAngle}`;

  const localSuccessStory = {
    title: `${city.name} ${service.shortName} Success`,
    neighborhood,
    situation: `A ${neighborhood} homeowner ${serviceLayer.successSituation}`,
    solution: `We provided a fair cash offer, bought as-is, and closed without repairs or open houses`,
    quote: `"Home Buyer Boise understood ${city.name} values in ${neighborhood}. The process was straightforward and respectful."`,
    timeline: `${7 + (h % 8)} days from first call to closing`,
  };

  const comboFaqs = COMBO_FAQ_BUILDERS.map((builder, i) =>
    builder(service.name, city.name, cityLayer.county, neighborhood)
  );

  const cityFaqs = [
    ...serviceLayer.serviceFaqs,
    ...cityLayer.cityFaqs,
    ...comboFaqs,
    {
      question: `How much can I net from ${service.name.toLowerCase()} in ${city.name}?`,
      answer: `Your net depends on mortgage payoff, liens, and condition. We provide an itemized estimate before you sign — the ${city.name} offer amount minus payoffs is your walk-away cash.`,
    },
    {
      question: `Is Home Buyer Boise licensed to buy in ${city.name}, Idaho?`,
      answer: `We are established local buyers serving ${city.name} and the Treasure Valley since 2018 — fully insured with documented proof of funds available before you commit.`,
    },
  ];

  const relatedLinks: ServiceCityMatrixEntry["relatedLinks"] = [
    `/services/${serviceSlug}`,
    `/areas/${citySlug}`,
    "/get-quote",
    "/pricing",
  ];

  const relatedSlugs = SERVICE_LAYERS[serviceSlug]
    ? Object.keys(SERVICE_LAYERS).filter((s) => s !== serviceSlug).slice(0, 1)
    : [];
  for (const rs of relatedSlugs) {
    relatedLinks.push(`/services/${rs}/${citySlug}`);
  }

  return {
    citySpecificIntro,
    localConsiderations,
    whyChooseLocal,
    localProcessNotes,
    localSuccessStory,
    cityFaqs,
    relatedLinks,
  };
}

const MATRIX_CACHE = new Map<string, ServiceCityMatrixEntry>();

export function getServiceCityMatrixEntry(
  serviceSlug: string,
  citySlug: string
): ServiceCityMatrixEntry | undefined {
  const key = `${serviceSlug}:${citySlug}`;
  if (!SERVICE_LAYERS[serviceSlug] || !CITY_LAYERS[citySlug]) return undefined;
  if (!MATRIX_CACHE.has(key)) {
    MATRIX_CACHE.set(key, buildEntry(serviceSlug, citySlug));
  }
  return MATRIX_CACHE.get(key);
}

export function hasMatrixEntry(serviceSlug: string, citySlug: string): boolean {
  return Boolean(SERVICE_LAYERS[serviceSlug] && CITY_LAYERS[citySlug]);
}
