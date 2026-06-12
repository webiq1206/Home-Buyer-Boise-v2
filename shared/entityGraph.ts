/**
 * Canonical entity registry for knowledge graph, schema, and AI surfaces.
 */

import { BUSINESS_INFO } from "@/lib/seo";
import { SERVICES } from "@/shared/servicesData";
import { CITIES } from "@/shared/contentData";

export interface OrganizationEntity {
  id: string;
  name: string;
  legalName: string;
  description: string;
  founded: string;
  phone: string;
  email: string;
  trustSignals: string[];
  sameAs: string[];
}

export interface ServiceEntity {
  slug: string;
  name: string;
  category: string;
  primaryPage: string;
  relatedServices: string[];
}

export interface LocationEntity {
  slug: string;
  name: string;
  county: "Ada" | "Canyon";
  neighborhoods: string[];
  primaryPage: string;
}

export interface TeamEntity {
  slug: string;
  name: string;
  role: string;
  expertise: string[];
  contributesToEEAT: string;
}

export const ORGANIZATION_ENTITY: OrganizationEntity = {
  id: "#organization",
  name: BUSINESS_INFO.name,
  legalName: BUSINESS_INFO.legalName,
  description:
    "Local cash home buyers serving the Boise Treasure Valley since 2018. Fair, human-reviewed offers with no fees or commissions.",
  founded: BUSINESS_INFO.founded,
  phone: BUSINESS_INFO.phone,
  email: BUSINESS_INFO.email,
  trustSignals: [
    BUSINESS_INFO.insurance,
    ...BUSINESS_INFO.certifications,
    `${BUSINESS_INFO.rating}/5 from ${BUSINESS_INFO.reviewCount} reviews`,
    "No automated offers — every property manually reviewed",
  ],
  sameAs: [
    "https://www.facebook.com/homebuyerboise",
    "https://www.instagram.com/homebuyerboise",
    "https://www.linkedin.com/company/homebuyerboise",
    "https://x.com/homebuyerboise",
  ],
};

const SERVICE_CATEGORIES: Record<string, string> = {
  "sell-house-fast": "Speed & Convenience",
  "we-buy-houses": "General Cash Purchase",
  "cash-offer": "Valuation & Offers",
  "sell-as-is": "Condition-Based Sale",
  "inherited-property": "Estate & Probate",
  "avoid-foreclosure": "Financial Distress",
  "sell-house-divorce": "Life Transitions",
  "relocation-sale": "Life Transitions",
  "problem-tenants": "Rental Exit",
  "probate-sale": "Estate & Probate",
  "tax-liens": "Financial Distress",
  downsizing: "Life Transitions",
  "fire-water-damage": "Property Condition",
  "hoarder-house": "Property Condition",
  "expired-listing": "Failed Traditional Sale",
  "behind-mortgage": "Financial Distress",
  "code-violations": "Property Condition",
};

const RELATED_SERVICES: Record<string, string[]> = {
  "sell-house-fast": ["we-buy-houses", "cash-offer", "sell-as-is"],
  "we-buy-houses": ["sell-house-fast", "cash-offer", "sell-as-is"],
  "cash-offer": ["sell-house-fast", "we-buy-houses", "sell-as-is"],
  "sell-as-is": ["we-buy-houses", "fire-water-damage", "code-violations"],
  "inherited-property": ["probate-sale", "sell-as-is", "hoarder-house"],
  "avoid-foreclosure": ["behind-mortgage", "sell-house-fast", "tax-liens"],
  "sell-house-divorce": ["sell-house-fast", "relocation-sale", "sell-as-is"],
  "relocation-sale": ["sell-house-fast", "sell-house-divorce", "cash-offer"],
  "problem-tenants": ["sell-as-is", "we-buy-houses", "expired-listing"],
  "probate-sale": ["inherited-property", "sell-as-is", "hoarder-house"],
  "tax-liens": ["avoid-foreclosure", "behind-mortgage", "code-violations"],
  downsizing: ["sell-as-is", "sell-house-fast", "relocation-sale"],
  "fire-water-damage": ["sell-as-is", "code-violations", "hoarder-house"],
  "hoarder-house": ["sell-as-is", "inherited-property", "probate-sale"],
  "expired-listing": ["sell-as-is", "we-buy-houses", "sell-house-fast"],
  "behind-mortgage": ["avoid-foreclosure", "sell-house-fast", "tax-liens"],
  "code-violations": ["sell-as-is", "fire-water-damage", "tax-liens"],
};

export const SERVICE_ENTITIES: ServiceEntity[] = SERVICES.map((s) => ({
  slug: s.slug,
  name: s.name,
  category: SERVICE_CATEGORIES[s.slug] ?? "Cash Home Buying",
  primaryPage: `/services/${s.slug}`,
  relatedServices: RELATED_SERVICES[s.slug] ?? [],
}));

const CITY_COUNTIES: Record<string, "Ada" | "Canyon"> = {
  boise: "Ada",
  meridian: "Ada",
  eagle: "Ada",
  kuna: "Ada",
  star: "Ada",
  middleton: "Canyon",
  nampa: "Canyon",
  caldwell: "Canyon",
};

export const LOCATION_ENTITIES: LocationEntity[] = CITIES.map((c) => ({
  slug: c.slug,
  name: c.name,
  county: CITY_COUNTIES[c.slug] ?? "Ada",
  neighborhoods: c.neighborhoods ?? [],
  primaryPage: `/areas/${c.slug}`,
}));

export const TEAM_ENTITIES: TeamEntity[] = [
  {
    slug: "home-buyer-boise-team",
    name: "Home Buyer Boise Team",
    role: "Cash Home Buying Specialists",
    expertise: [
      "Treasure Valley residential acquisitions",
      "Probate and inherited property sales",
      "Pre-foreclosure and distressed sales",
      "As-is property evaluation",
    ],
    contributesToEEAT:
      "Local team with direct experience closing hundreds of Treasure Valley transactions since 2018.",
  },
];

export function getServiceEntity(slug: string): ServiceEntity | undefined {
  return SERVICE_ENTITIES.find((s) => s.slug === slug);
}

export function getLocationEntity(slug: string): LocationEntity | undefined {
  return LOCATION_ENTITIES.find((l) => l.slug === slug);
}
