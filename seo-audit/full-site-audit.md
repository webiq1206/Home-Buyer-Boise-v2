# Full Site Audit — Home Buyer Boise

**Domain:** https://homebuyerboise.com  
**Audit date:** 2026-06-12  
**Total indexable URLs:** 228 (+ 7 project pages = 235 after implementation)

## Executive Summary

| Area | Status | Notes |
|------|--------|-------|
| Sitemap | Fixed | Dynamic `app/sitemap.ts` — all URLs enumerated |
| Robots | Fixed | LLM crawlers explicitly allowed |
| Schema | Improved | Organization/WebSite sitewide; projects added |
| Service×City content | Rewritten | Matrix content; similarity 100% → 71.9% max |
| Internal links | Active | Build-time graph with 0 broken links |
| Security headers | Added | X-Content-Type-Options, Referrer-Policy, X-Frame-Options |

## Technical SEO

- **Canonicals:** Absolute URLs, no trailing slashes
- **HTTPS:** Enforced at hosting (Cloud Run)
- **Sitemap:** `/sitemap.xml` — static, services, areas, combos, blog, projects, legal
- **Robots:** `/robots.txt` — allows AI crawlers, disallows `/api/`
- **JSON-LD:** Organization, WebSite, LocalBusiness, Service, FAQ, BlogPosting, ItemList

## Remaining Gaps

1. OG image still 512×512 (target 1200×630)
2. GSC verification token not installed (awaiting user token)
3. Idaho license numbers not in schema (awaiting verified numbers)
4. Author profile pages not yet built
5. Full blog remediation (56 posts) — cannibalization risk low (2 overlaps)

## Crawl Data

See `seo-audit/data/crawl-inventory.json` for machine-readable per-URL inventory.
