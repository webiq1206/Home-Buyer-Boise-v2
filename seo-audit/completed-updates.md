# Completed Updates

## Session: 2026-06-12

### Audit Tooling
- Added `scripts/seo-audit-crawl.ts`, `content-similarity.ts`, `blog-cannibalization.ts`, `image-audit.ts`, `broken-link-check.ts`, `seo-metadata-check.ts`
- Added npm scripts: `seo:crawl`, `seo:similarity`, `seo:audit`, etc.

### Content — Service × City Matrix
- **Before:** Max similarity 1.0 (100% template overlap)
- **After:** Max similarity 0.719 (4 pairs ≥70%)
- Files: `shared/serviceCityMatrix/`, updated `shared/serviceCityContent.ts`

### Schema & Entity Graph
- `shared/entityGraph.ts` — organization, services, locations, team
- Removed dead SearchAction from WebSite schema
- Added Person + ItemList schema generators
- Fixed service breadcrumbs: `/pricing` → `/services`

### New Pages
- `/projects` hub + 6 case study pages
- Added to sitemap and internal link graph

### Technical
- Security headers in next.config.js
- Analytics component (GA4 via NEXT_PUBLIC_GA_ID)
- llms-full.txt: removed AI-powered valuation claim

### Session 2 (continued implementation)
- Removed 2,500+ lines legacy landscaping data from `contentData.ts`
- Simplified `serviceBackgrounds.ts` to default background only
- Author pages: `/authors`, `/authors/[slug]` with Person schema on blog posts
- FAQ hub: `/faq` with FAQPage schema
- Blog auto `relatedLinks` via `shared/blogRelatedLinks.ts`
- New 1200×630 `public/og-image.png`
- Image `sizes` props on homepage, footer, CommonSituations
- ItemList schema on services, areas, blog hubs
- Analytics events on quote + contact form submit
- Security headers, llms.txt route synced with entity graph
- Footer + nav links to Projects, FAQ

### Files Modified
See git diff for full list. Key paths: `lib/schema.ts`, `lib/internalLinks.ts`, `app/sitemap.ts`, `app/layout.tsx`, `shared/serviceCityMatrix/`, `shared/contentData.ts`, author/faq/project routes.
