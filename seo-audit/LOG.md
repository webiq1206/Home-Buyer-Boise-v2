# SEO Audit Change Log

Chronological log of every change made under Task #8. Each entry is one commit-worthy unit. Order matches the order changes landed in the working tree.

| # | Scope | Defect ref | File(s) | Summary |
|---|-------|-----------|---------|---------|
| 1 | sitewide | S1 | `public/sitemap.xml` | Deleted static file that was shadowing the dynamic route. |
| 2 | sitewide | S2 | `public/robots.txt` | Deleted static file that was shadowing the dynamic route. |
| 3 | sitewide | S1 | `app/sitemap.ts` | Rewrote to enumerate all 228 URLs (services, service-by-city, areas, blog posts, hubs). |
| 4 | sitewide | S2 | `app/robots.ts` | Rewrote with LLM user-agent rules and single sitemap reference. |
| 5 | sitewide | S3, S4, S5 | `app/layout.tsx` | Removed placeholder GSC verification. Added skip-to-content link. Injected global Organization + WebSite JSON-LD. |
| 6 | sitewide | S6 | `lib/seo.ts` | Removed placeholder Idaho license numbers from `BUSINESS_INFO`. |
| 7 | sitewide | S7 | `lib/schema.ts` | Added `generateBlogPostingSchema` helper. |
| 8 | sitewide | reusable | `components/JsonLd.tsx` | New helper for emitting one or many JSON-LD script tags. |
| 9 | sitewide | S8 | `next.config.js` | Added permanent 301 `/how-it-works -> /pricing`. |
| 10 | sitewide | S8 | `shared/blogContent.ts` | Retargeted two inline `/how-it-works` links to `/pricing`. |
| 11 | homepage | H1, H2 | `app/page.tsx` | Injected LocalBusiness + WebPage JSON-LD. Fixed dead `/how-it-works` href in `howItWorksSteps[1]`. |
| 12 | pricing | P1, P2 | `app/pricing/page.tsx` | Rewrote entire page to true pricing content. Added WebPage, BreadcrumbList, and FAQPage JSON-LD. |
| 13 | static pages | SP1 | `app/about/page.tsx` | Added WebPage + BreadcrumbList JSON-LD. |
| 14 | static pages | SP1 | `app/contact/page.tsx` | Added WebPage + BreadcrumbList + LocalBusiness JSON-LD. |
| 15 | static pages | SP1 | `app/get-quote/page.tsx` | Added WebPage + BreadcrumbList JSON-LD. |
| 16 | static pages | SP1 | `app/services/page.tsx` | Added WebPage + BreadcrumbList JSON-LD. |
| 17 | static pages | SP1 | `app/areas/page.tsx` | Added WebPage + BreadcrumbList JSON-LD. |
| 18 | static pages | SP1 | `app/blog/page.tsx` | Added WebPage + BreadcrumbList JSON-LD. |
| 19 | static pages | SP1 | `app/savings-calculator/page.tsx` | Added WebPage + BreadcrumbList JSON-LD. |
| 20 | static pages | SP1 | `app/privacy-policy/page.tsx` | Added WebPage + BreadcrumbList JSON-LD. |
| 21 | static pages | SP1 | `app/terms-of-service/page.tsx` | Added WebPage + BreadcrumbList JSON-LD. |
| 22 | blog template | B1, B2, B3 | `app/blog/[slug]/page.tsx` | Added BlogPosting + BreadcrumbList + (conditional) FAQPage JSON-LD on all 56 posts. |
| 23 | sitewide | S8, S9 | `public/llms.txt` | Rewrote: removed `/how-it-works` line, fixed phone to (208) 405-2274, fixed email to connect@buymyhouse.co, removed all automated-valuation claims, removed placeholder licensing claim, aligned to /pricing language. |
| 24 | sitewide | S8 | `next.config.js` | Added second redirect `/how-it-works/:slug* -> /pricing` to catch trailing-slash and subpath variants. |

## Untouched (verified, no changes required)
- `app/services/[service]/page.tsx` (15 pages)
- `app/services/[service]/[city]/page.tsx` (120 pages)
- `app/areas/[city]/page.tsx` (8 pages)
- All API routes
- `components/QuoteForm.tsx`, `lib/services/email.ts`, `lib/services/offerCalculator.ts`, `lib/services/resend.ts` (per task guardrail)

## Constraint compliance
- No em dashes were introduced anywhere (reports, new copy, schema descriptions, or commit messages).
- Offer calculator, email flow, forms, and API routes were not touched.
- One logical defect per change unit; the log table maps each row to its audit report defect ID for traceability.
