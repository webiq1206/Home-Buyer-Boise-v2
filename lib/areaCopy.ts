import { SHOW_UNVERIFIED_TRUST } from "@/lib/seo";

export function localCashBuyerHeading(cityName: string): string {
  return `Local ${cityName} Cash Home Buyers${SHOW_UNVERIFIED_TRUST ? " You Can Trust" : ""}`;
}

export function areaHeroOffer(cityName: string): string {
  return `Get a fair cash offer in 24 hours. No repairs, no fees, no commissions. Close on your timeline.${SHOW_UNVERIFIED_TRUST ? ` Trust us with your ${cityName} home.` : ""}`;
}
