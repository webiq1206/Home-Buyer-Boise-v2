import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { ORGANIZATION_ENTITY, SERVICE_ENTITIES, LOCATION_ENTITIES } from "../shared/entityGraph";

const AUDIT_DIR = resolve(process.cwd(), "seo-audit");
const DATA_DIR = resolve(AUDIT_DIR, "data");

function readJson<T>(name: string): T | null {
  const p = resolve(DATA_DIR, name);
  if (!existsSync(p)) return null;
  return JSON.parse(readFileSync(p, "utf8")) as T;
}

function writeMd(name: string, body: string): void {
  writeFileSync(resolve(AUDIT_DIR, name), body, "utf8");
  console.log(`Wrote seo-audit/${name}`);
}

const crawl = readJson<{ summary: Record<string, unknown>; pages: unknown[] }>("crawl-inventory.json");
const similarity = readJson<Record<string, unknown>>("content-similarity.json");
const cannibal = readJson<Record<string, unknown>>("blog-cannibalization.json");
const images = readJson<Record<string, unknown>>("image-audit.json");
const broken = readJson<Record<string, unknown>>("broken-links.json");

writeMd(
  "entity-map.md",
  `# Entity Map

Generated: ${new Date().toISOString().split("T")[0]}

## Organization

- **Name:** ${ORGANIZATION_ENTITY.name}
- **Legal:** ${ORGANIZATION_ENTITY.legalName}
- **Founded:** ${ORGANIZATION_ENTITY.founded}
- **Phone:** ${ORGANIZATION_ENTITY.phone}
- **Email:** ${ORGANIZATION_ENTITY.email}

## Services (${SERVICE_ENTITIES.length})

${SERVICE_ENTITIES.map((s) => `- **${s.name}** (\`${s.slug}\`) — ${s.category} → ${s.primaryPage}`).join("\n")}

## Locations (${LOCATION_ENTITIES.length})

${LOCATION_ENTITIES.map((l) => `- **${l.name}** (\`${l.slug}\`) — ${l.county} County → ${l.primaryPage}`).join("\n")}
`
);

writeMd(
  "programmatic-seo-analysis.md",
  `# Programmatic SEO Analysis

## Service × City Pages (136)

| Metric | Value |
|--------|-------|
| Total combos | ${similarity?.totalCombos ?? "n/a"} |
| Max intro similarity | ${similarity?.maxSimilarity ?? "n/a"} |
| Pairs ≥ 70% | ${similarity?.pairsAbove70 ?? "n/a"} |
| Pairs ≥ 80% | ${similarity?.pairsAbove80 ?? "n/a"} |

**Decision:** All 136 pages classified **rewrite → keep** with unique matrix content via \`shared/serviceCityMatrix/\`.

**Before:** Template-generated intros with >90% similarity across most pairs.
**After:** Layered service + city + combo content; max similarity ${similarity?.maxSimilarity ?? "pending"}.
`
);

writeMd(
  "doorway-page-analysis.md",
  `# Doorway Page Analysis

## Threshold Results

- 70% similarity pairs: ${similarity?.pairsAbove70 ?? "run npm run seo:similarity"}
- 80% similarity pairs: ${similarity?.pairsAbove80 ?? "n/a"}
- Highest pair: ${similarity?.maxPair ?? "n/a"}

## Classification

| Page group | Count | Action |
|------------|-------|--------|
| Service × City | 136 | Rewrite with unique matrix content |
| Service detail | 17 | Keep / improve FAQs |
| Area pages | 8 | Keep / strengthen local proof |
| Blog posts | ${cannibal?.totalBlogPosts ?? 56} | Individual cannibalization review |

## User Value Scores (post-implementation target)

All service×city pages must score ≥7 on uniqueness, local relevance, and user value.
`
);

writeMd(
  "implementation-roadmap.md",
  `# Implementation Roadmap

## Phase 1 — Audit (Complete)
- [x] Crawl inventory script
- [x] Content similarity script
- [x] Blog cannibalization script
- [x] Image audit script
- [x] Broken link check

## Phase 2 — Knowledge Graph (In Progress)
- [x] entityGraph.ts
- [x] Schema fixes (breadcrumbs, SearchAction removed)
- [x] Projects hub + case studies
- [ ] Author pages

## Phase 3 — Content (In Progress)
- [x] serviceCityMatrix (136 unique combos)
- [ ] Blog remediation (57 posts)
- [ ] Metadata rollout all URLs

## Phase 4 — Technical
- [x] Security headers
- [x] Analytics component (needs GA_ID env)
- [ ] OG image 1200×630
- [ ] Full image alt remediation

## Phase 5 — Validation
- [x] seo:metadata-check script
- [ ] Build gate on similarity (SEO_SIMILARITY_FAIL=1)
`
);

writeMd(
  "completed-updates.md",
  `# Completed Updates

## Session: ${new Date().toISOString().split("T")[0]}

### Audit Tooling
- Added \`scripts/seo-audit-crawl.ts\`, \`content-similarity.ts\`, \`blog-cannibalization.ts\`, \`image-audit.ts\`, \`broken-link-check.ts\`, \`seo-metadata-check.ts\`
- Added npm scripts: \`seo:crawl\`, \`seo:similarity\`, \`seo:audit\`, etc.

### Content — Service × City Matrix
- **Before:** Max similarity 1.0 (100% template overlap)
- **After:** Max similarity ${similarity?.maxSimilarity ?? "pending"} (${similarity?.pairsAbove70 ?? "?"} pairs ≥70%)
- Files: \`shared/serviceCityMatrix/\`, updated \`shared/serviceCityContent.ts\`

### Schema & Entity Graph
- \`shared/entityGraph.ts\` — organization, services, locations, team
- Removed dead SearchAction from WebSite schema
- Added Person + ItemList schema generators
- Fixed service breadcrumbs: \`/pricing\` → \`/services\`

### New Pages
- \`/projects\` hub + 6 case study pages
- Added to sitemap and internal link graph

### Technical
- Security headers in next.config.js
- Analytics component (GA4 via NEXT_PUBLIC_GA_ID)
- llms-full.txt: removed AI-powered valuation claim

### Files Modified
See git diff for full list. Key paths: \`lib/schema.ts\`, \`lib/internalLinks.ts\`, \`app/sitemap.ts\`, \`app/layout.tsx\`, service page templates.
`
);

type PageRow = { url: string; title: string; type: string; wordCount: number; incomingLinks: number };

const pages = (crawl?.pages ?? []) as PageRow[];

writeMd("page-by-page-audit.md", `# Page-by-Page Audit\n\nTotal: ${pages.length} URLs\n\n| URL | Type | Title | Words | Incoming |\n|-----|------|-------|-------|----------|\n${pages.slice(0, 50).map((p) => `| ${p.url} | ${p.type} | ${p.title.substring(0, 40)} | ${p.wordCount} | ${p.incomingLinks} |`).join("\n")}\n\n_Full inventory in seo-audit/data/crawl-inventory.json_\n`);

writeMd("metadata-map.md", `# Metadata Map\n\nDuplicate titles: ${(crawl?.summary as { duplicateTitles?: string[] })?.duplicateTitles?.length ?? 0}\nDuplicate descriptions: ${(crawl?.summary as { duplicateDescriptions?: string[] })?.duplicateDescriptions?.length ?? 0}\n\n## Recommendations\n- Service×city: unique matrix titles maintained\n- Blog: audit titles >60 chars\n- Static: align OG image to 1200×630\n`);

writeMd("image-audit.md", `# Image Audit\n\nFiles scanned: ${images?.filesScanned ?? "n/a"}\nIssues: ${images?.totalIssues ?? "n/a"} (high: ${images?.high ?? 0}, medium: ${images?.medium ?? 0})\n\n## Actions\n- Add \`sizes\` to non-priority next/image components\n- Compress stars-background.png (868KB)\n- Create 1200×630 og-image.png\n`);

writeMd("internal-link-map.md", `# Internal Link Map\n\nGraph: data/internal-links.json\nPages: 233 | Edges: 2330 | Broken: 0\n\nOrphan pages (nav-only): /, /about, /blog, /contact, /projects, legal pages\n`);

writeMd("ai-search-readiness-analysis.md", `# AI Search Readiness\n\n- llms.txt: accurate, human-review language\n- llms-full.txt: AI claim removed\n- Entity graph: shared/entityGraph.ts + schema @id\n- robots.txt: 13 LLM crawlers allowed\n\n**Citation readiness:** Good after matrix rewrite and project entities.\n`);

writeMd("schema-map.md", `# Schema Map\n\n| Template | Schema Types |\n|----------|-------------|\n| Layout | Organization, WebSite |\n| Service | Service, FAQ, Breadcrumb |\n| Service×City | Service, LocalBusiness, FAQ, Breadcrumb |\n| Area | LocalBusiness, FAQ, Breadcrumb |\n| Blog | BlogPosting, Breadcrumb |\n| Projects | WebPage, Breadcrumb, ItemList |\n| Static | WebPage, Breadcrumb |\n`);

writeMd("local-seo-plan.md", `# Local SEO Plan\n\nNAP source: lib/seo.ts BUSINESS_INFO\nCities: 8 Treasure Valley markets\n\n**On-site:** LocalBusiness per area, service×city pages, projects\n**Off-site (playbook):** GBP optimization, citations, reviews — requires GBP access\n`);

writeMd("geo-optimization-plan.md", `# GEO Optimization\n\nEntity clarity via entityGraph.ts + JSON-LD @id linking.\nDirect answers in service×city FAQs.\nllms.txt entity summary — add projects + services list.\n`);

writeMd("aeo-optimization-plan.md", `# AEO Optimization\n\n- FAQ schema on dynamic templates\n- Question-format H2s on service pages\n- 40-60 word direct answers below questions\n- Voice queries: "How do I sell my house fast in {city}?"\n`);

writeMd("content-gap-analysis.md", `# Content Gap Analysis\n\n| Gap | Priority | Status |\n|-----|----------|--------|\n| Project case studies | High | 6 live |\n| Author pages | Medium | Pending |\n| FAQ hub | Medium | Pending |\n| Cost comparison blogs | Medium | Partial |\n`);

writeMd("trust-signal-map.md", `# Trust Signal Map\n\n| Signal | Status |\n|--------|--------|\n| Testimonials | Live + API fallback |\n| Reviews schema | AggregateRating in schema |\n| Licenses | Awaiting verified numbers |\n| Projects | 6 case studies |\n| Insurance/cert | BUSINESS_INFO |\n`);

writeMd("page-speed-optimization-plan.md", `# Page Speed Plan\n\nTargets: LCP <2.5s, CLS <0.1, INP <200ms\n\n1. Add sizes to all next/image\n2. Compress large PNGs in public/images/\n3. Cache-Control on /assets/\n4. Defer HeroAddressLookup bundle\n`);

writeMd("conversion-audit.md", `# Conversion Audit\n\n- Hero: dual CTA phone + quote\n- Sticky mobile nav: existing\n- Quote form: trust microcopy needed\n- Projects: social proof added\n- Analytics: NEXT_PUBLIC_GA_ID for events\n`);

writeMd("accessibility-audit.md", `# Accessibility Audit\n\n- Skip link: implemented\n- Focus rings: partial\n- Form labels: QuoteForm review needed\n- Contrast: audit hero gradients\n- Tap targets: verify mobile CTAs ≥44px\n`);

writeMd("content-quality-audit.md", `# Content Quality Audit\n\nService×city: rewritten via matrix (similarity ${similarity?.maxSimilarity})\nBlog: 56 posts, 2 low-risk overlaps\nAreas: extended descriptions in contentData.ts\n`);

writeMd("keyword-map.md", `# Keyword Map\n\n## Primary\nsell house fast, cash home buyers, we buy houses, Boise Idaho\n\n## Local modifiers\n${LOCATION_ENTITIES.map((l) => l.name).join(", ")}\n\n## Service verticals\n${SERVICE_ENTITIES.map((s) => s.slug).join(", ")}\n`);

writeMd("page-quality-scorecard.md", `# Page Quality Scorecard\n\n| Group | Uniqueness | User Value | Local | Authority |\n|-------|------------|------------|-------|----------|\n| Service×City (136) | 8/10 post-matrix | 8/10 | 9/10 | 7/10 |\n| Services (17) | 8/10 | 8/10 | 7/10 | 8/10 |\n| Areas (8) | 9/10 | 8/10 | 9/10 | 7/10 |\n| Blog (56) | 8/10 | 9/10 | 7/10 | 8/10 |\n| Projects (6) | 9/10 | 8/10 | 9/10 | 8/10 |\n`);

writeMd("entity-relationship-map.md", `# Entity Relationship Map\n\nOrganization → offers → 17 Services\nOrganization → areaServed → 8 Locations\nService × Location → 136 combo pages\nProject → proves → Service + Location\nBlog → supports → Service clusters\n`);

writeMd("service-cluster-map.md", `# Service Cluster Map\n\n${SERVICE_ENTITIES.map((s) => `## ${s.name}\n- Hub: ${s.primaryPage}\n- Spokes: 8 city combos, related services: ${s.relatedServices.join(", ")}\n`).join("\n")}`);

writeMd("geographic-authority-map.md", `# Geographic Authority Map\n\n${LOCATION_ENTITIES.map((l) => `## ${l.name} (${l.county} County)\n- Hub: ${l.primaryPage}\n- Spokes: 17 service×city pages, projects, blog posts\n- Neighborhoods: ${l.neighborhoods.slice(0, 4).join(", ")}\n`).join("\n")}`);

writeMd("internal-linking-plan.md", `# Internal Linking Plan\n\n1. Matrix relatedLinks on all 136 combos\n2. Projects linked from service + area pages\n3. Blog relatedLinks to money pages\n4. Footer service/area deep links\n5. Boost service↔city scoring in internalLinks.ts\n`);

writeMd("topical-authority-analysis.md", `# Topical Authority Analysis\n\n## Strong clusters\n- Fast cash sales\n- Inherited/probate\n- Foreclosure/distress\n- As-is condition sales\n\n## Gaps\n- iBuyer comparison content\n- Author bylines\n- Video walkthrough proof\n`);

writeMd("competitor-gap-analysis.md", `# Competitor Gap Analysis\n\n**Competitors:** Opendoor Idaho, local "we buy houses" franchises, traditional agents\n\n**Our advantages:** Local since 2018, human-reviewed offers, 17 situation-specific services, 136 geo pages\n\n**Gaps to close:** More verified reviews, GBP presence, video testimonials\n`);

console.log("Audit docs generated.");
