import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { BLOG_POSTS } from "../shared/blogContent";
import { SERVICES } from "../shared/servicesData";
import { CITIES } from "../shared/contentData";
import { writeAuditJson } from "./seo-audit-utils";

const INTERNAL_PATHS = new Set<string>([
  "/",
  "/about",
  "/contact",
  "/get-quote",
  "/pricing",
  "/services",
  "/areas",
  "/blog",
  "/savings-calculator",
  "/privacy-policy",
  "/terms-of-service",
  "/faq",
  "/projects",
]);

for (const s of SERVICES) {
  INTERNAL_PATHS.add(`/services/${s.slug}`);
  for (const c of CITIES) {
    INTERNAL_PATHS.add(`/services/${s.slug}/${c.slug}`);
  }
}
for (const c of CITIES) INTERNAL_PATHS.add(`/areas/${c.slug}`);
for (const p of BLOG_POSTS) INTERNAL_PATHS.add(`/blog/${p.slug}`);

const linkRegex = /href=["'](\/[^"'#?]+)["']/g;
const broken: Array<{ source: string; target: string }> = [];
const external: Array<{ source: string; target: string }> = [];

function checkContent(source: string, content: string): void {
  let match;
  while ((match = linkRegex.exec(content)) !== null) {
    const target = match[1].replace(/\/$/, "") || "/";
    if (target.startsWith("http")) {
      external.push({ source, target });
      continue;
    }
    if (!INTERNAL_PATHS.has(target)) {
      broken.push({ source, target });
    }
  }
}

for (const post of BLOG_POSTS) {
  checkContent(`/blog/${post.slug}`, post.content ?? "");
}

const report = {
  generatedAt: new Date().toISOString(),
  knownInternalPaths: INTERNAL_PATHS.size,
  brokenInternalLinks: broken,
  externalLinkCount: external.length,
  externalSample: external.slice(0, 20),
};

writeAuditJson("broken-links.json", report);

console.log("=== Broken Link Check ===");
console.log(`Known paths: ${report.knownInternalPaths}`);
console.log(`Broken internal links: ${broken.length}`);
if (broken.length) {
  for (const b of broken.slice(0, 10)) console.log(`  ${b.source} -> ${b.target}`);
}
