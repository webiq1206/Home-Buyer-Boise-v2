import {
  getAllServiceCityCombos,
  jaccardSimilarity,
  tokenize,
  writeAuditJson,
} from "./seo-audit-utils";

const combos = getAllServiceCityCombos();
const introTokens = combos.map((c) => ({
  key: `${c.serviceSlug}/${c.citySlug}`,
  tokens: tokenize(c.content.citySpecificIntro),
}));

const pairs: Array<{
  a: string;
  b: string;
  similarity: number;
  threshold: "70" | "80" | "90";
}> = [];

let maxSimilarity = 0;
let maxPair = "";

for (let i = 0; i < introTokens.length; i++) {
  for (let j = i + 1; j < introTokens.length; j++) {
    const sim = jaccardSimilarity(introTokens[i].tokens, introTokens[j].tokens);
    if (sim > maxSimilarity) {
      maxSimilarity = sim;
      maxPair = `${introTokens[i].key} vs ${introTokens[j].key}`;
    }
    if (sim >= 0.7) {
      pairs.push({
        a: introTokens[i].key,
        b: introTokens[j].key,
        similarity: Math.round(sim * 1000) / 1000,
        threshold: sim >= 0.9 ? "90" : sim >= 0.8 ? "80" : "70",
      });
    }
  }
}

const report = {
  generatedAt: new Date().toISOString(),
  totalCombos: combos.length,
  maxSimilarity: Math.round(maxSimilarity * 1000) / 1000,
  maxPair,
  pairsAbove70: pairs.filter((p) => p.threshold === "70").length,
  pairsAbove80: pairs.filter((p) => p.threshold === "80").length,
  pairsAbove90: pairs.filter((p) => p.threshold === "90").length,
  pairs: pairs.sort((a, b) => b.similarity - a.similarity).slice(0, 50),
};

writeAuditJson("content-similarity.json", report);

console.log("=== Content Similarity (Service x City) ===");
console.log(`Combos: ${report.totalCombos}`);
console.log(`Max similarity: ${report.maxSimilarity} (${maxPair})`);
console.log(`Pairs >= 70%: ${report.pairsAbove70}`);
console.log(`Pairs >= 80%: ${report.pairsAbove80}`);
console.log(`Pairs >= 90%: ${report.pairsAbove90}`);

const failOnHigh = process.env.SEO_SIMILARITY_FAIL === "1";
if (failOnHigh && report.maxSimilarity >= 0.7) {
  console.error("\nFAIL: Max similarity exceeds 70% threshold");
  process.exit(1);
}
