import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { buildLinkGraph } from "../lib/internalLinks";

const out = resolve(process.cwd(), "data/internal-links.json");
mkdirSync(dirname(out), { recursive: true });

const graph = buildLinkGraph(10);
// Stamp build time outside the deterministic graph so JSON diffs stay minimal.
graph.meta.generatedAt = new Date().toISOString();

writeFileSync(out, JSON.stringify(graph, null, 2) + "\n", "utf8");

console.log(
  `[internal-links] wrote ${out} — ${graph.meta.totalPages} pages, ${graph.meta.totalEdges} edges`
);
