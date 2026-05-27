import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import type { LinkGraph } from "../lib/internalLinks";

const jsonPath = resolve(process.cwd(), "data/internal-links.json");
const graph: LinkGraph = JSON.parse(readFileSync(jsonPath, "utf8"));

const knownUrls = new Set(Object.keys(graph.pages));
const broken: Array<{ source: string; target: string }> = [];
const orphans: string[] = [];
const weak: Array<{ url: string; incoming: number; candidates: number }> = [];

const MIN_INCOMING = 2;
const MIN_CANDIDATES = 3;

for (const [url, page] of Object.entries(graph.pages)) {
  for (const c of page.candidates) {
    if (!knownUrls.has(c.url)) {
      broken.push({ source: url, target: c.url });
    }
  }
  if (page.incoming === 0) orphans.push(url);
  if (page.incoming < MIN_INCOMING || page.candidates.length < MIN_CANDIDATES) {
    weak.push({
      url,
      incoming: page.incoming,
      candidates: page.candidates.length,
    });
  }
}

console.log("=== Internal Link Audit ===");
console.log(`Pages:       ${graph.meta.totalPages}`);
console.log(`Edges:       ${graph.meta.totalEdges}`);
console.log(`Broken:      ${broken.length}`);
console.log(`Orphans:     ${orphans.length}`);
console.log(`Weak equity: ${weak.length}`);

if (broken.length) {
  console.log("\nBroken links (source -> target):");
  for (const b of broken) console.log(`  ${b.source} -> ${b.target}`);
}
if (orphans.length) {
  console.log("\nOrphan pages (no incoming internal links):");
  for (const o of orphans) console.log(`  ${o}`);
}
if (weak.length) {
  console.log(
    `\nWeak-equity pages (incoming < ${MIN_INCOMING} or candidates < ${MIN_CANDIDATES}):`
  );
  for (const w of weak)
    console.log(`  ${w.url}  in=${w.incoming}  cands=${w.candidates}`);
}

if (broken.length > 0) {
  console.error(`\nFAIL: ${broken.length} broken internal link(s)`);
  process.exit(1);
}
console.log("\nOK");
