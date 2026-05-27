# SEO Audit Summary

Task: #8 - Per-page SEO remediation for homebuyerboise.com
Scope: 228 URLs (8 hubs, 15 services, 120 service-by-city, 8 cities, 56 blog posts, 2 legal, plus dynamic sitemap and robots routes).

## Headline outcomes

1. **Search engine discoverability fixed.** The dynamic `app/sitemap.ts` now exposes all 228 URLs to crawlers. Previously the static `public/sitemap.xml` was shadowing the dynamic route and listed only a small subset, so 160+ URLs were effectively invisible to Google.
2. **Crawl policy clarified for LLMs.** The dynamic `app/robots.ts` now declares explicit allow/disallow rules for 13 LLM user-agents (GPTBot, Claude variants, Google-Extended, PerplexityBot, etc.) in addition to the wildcard rule.
3. **Knowledge-graph entity asserted sitewide.** `Organization` and `WebSite` JSON-LD are now emitted from the root layout on every page. Previously they only appeared transitively through `LocalBusiness` on a few pages.
4. **Page-level structured data added to every static page and every blog post.** `WebPage` + `BreadcrumbList` schema is now on all 9 static pages. `BlogPosting` + `BreadcrumbList` + (where applicable) `FAQPage` schema is now on all 56 blog posts. The dynamic service, service-by-city, and city templates already had complete schema and were left untouched.
5. **`/pricing` page rewritten to match its URL intent.** The page was previously a "How It Works" walkthrough. It is now true pricing content with a no-fee cost breakdown, a comparison table, an FAQ block, and an explicit no-automated-offer disclaimer.
6. **Trust-signal integrity restored.** Placeholder Idaho license numbers were removed from `BUSINESS_INFO`. The placeholder GSC verification meta tag was removed from the root layout.
7. **Dead link `/how-it-works` retired safely.** A permanent 301 redirect to `/pricing` was added in `next.config.js`, and the three internal references (homepage and two blog posts) were retargeted directly.
8. **WCAG 2.4.1 compliance gap closed.** A skip-to-content link was added to the root layout.

## Coverage by page group

| Group | URLs | Status |
|---|---|---|
| Sitewide (layout, sitemap, robots, business info, schema lib, redirects) | n/a | Done |
| Homepage | 1 | Done |
| Static pages (about, contact, get-quote, services, areas, blog, savings-calculator, privacy, terms) | 9 | Done |
| Pricing page | 1 | Done (content rewrite + schema) |
| Service detail templates | 15 | No changes required |
| Service-by-city templates | 120 | No changes required |
| City pages | 8 | No changes required |
| Blog index | 1 | Done (in static-pages group) |
| Blog post template | 56 | Done |

## What was deliberately not changed

- `BUSINESS_TYPE` schema array: kept as dual `["LocalBusiness", "RealEstateAgent"]` per user decision.
- `og-image.png`: kept at 512x512 per user decision. Proposed as a follow-up.
- Blog author rendering: emitted as `Organization` rather than `Person` with profile page. Proposed as a follow-up.
- Offer calculator, email flow, forms, API routes: not touched per task guardrail.

## Follow-ups proposed (see Task system)

1. Upgrade `og-image.png` from 512x512 to 1200x630 with brand-correct treatment.
2. Install a real Google Search Console verification token and reinstate the `verification.google` metadata field.
3. Source verified Idaho real estate and business license numbers and reinstate them in `BUSINESS_INFO.licenses` plus surface them in `LocalBusiness` schema.
4. Build per-author profile pages under `/authors/[slug]` and migrate blog `BlogPosting.author` from `Organization` to `Person` with `url` for stronger E-E-A-T.

## Files added or modified

See `LOG.md` for the per-commit table. Per-page detail in `audits/`.
