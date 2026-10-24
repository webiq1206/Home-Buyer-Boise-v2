import { SHOW_UNVERIFIED_TRUST } from "@/lib/seo";

/** Exact lines kept in content/llms*.txt. Omitted from the served body while the flag is off. */
export const HIDDEN_LLMS_SNIPPETS = [
  "Licensed Idaho real estate investors",
  "Bonded and insured ($3M E&O coverage)",
  "Better Business Bureau member",
  "189+ verified customer reviews (4.9 star average)",
  "85+ successful transactions completed annually",
  "Founded 2018, serving Treasure Valley for 7+ years",
  "Insured ($3M E&O coverage)",
  "189 plus verified reviews (4.9 star average)",
  "85 plus successful transactions annually",
];

const INSURED_OPERATORS = "6. **Professional Team**: Insured and experienced local operators";
const OPERATORS_WITHOUT_INSURANCE_CLAIM = "6. **Professional Team**: experienced local operators";
const PURCHASED_CONDITION_CLAIM =
  "We've purchased homes with severe fire damage, extensive water damage, foundation issues, mold, hoarding situations, and complete gut rehab needs. ";
const TRUSTED_LOCAL_BUYER = "the trusted local cash home buyer";
const LOCAL_BUYER = "the local cash home buyer";

export function hideUnverifiedLlms(text: string): string {
  if (SHOW_UNVERIFIED_TRUST) return text;
  return text
    .split("\n")
    .filter((line) => !HIDDEN_LLMS_SNIPPETS.some((snippet) => line.includes(snippet)))
    .map((line) => {
      if (line.includes(INSURED_OPERATORS)) return OPERATORS_WITHOUT_INSURANCE_CLAIM;
      return line.replace(PURCHASED_CONDITION_CLAIM, "").replace(TRUSTED_LOCAL_BUYER, LOCAL_BUYER);
    })
    .join("\n");
}
