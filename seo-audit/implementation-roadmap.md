# Implementation Roadmap

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
