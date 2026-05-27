import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { buildLinkGraph } from "../lib/internalLinks";

const out = resolve(process.cwd(), "data/internal-links.json");
mkdirSync(dirname(out), { recursive: true });

const graph = buildLinkGraph(10);
// Keep meta.generatedAt as the deterministic epoch value set by
// buildLinkGraph so the JSON only changes when content or scoring changes.
// Use process.env.STAMP_TIMESTAMP=1 to opt into a wall-clock timestamp.
if (process.env.STAMP_TIMESTAMP === "1") {
  graph.meta.generatedAt = new Date().toISOString();
}

writeFileSync(out, JSON.stringify(graph, null, 2) + "\n", "utf8");

console.log(
  `[internal-links] wrote ${out} — ${graph.meta.totalPages} pages, ${graph.meta.totalEdges} edges`
);
