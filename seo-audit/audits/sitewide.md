# Sitewide Audit

Scope: cross-page concerns that apply to every URL on homebuyerboise.com.
Reference: Master SEO Audit playbook, sitewide section.

## Defects found

### S1: Duplicate static `public/sitemap.xml` shadowing dynamic `app/sitemap.ts`
- Severity: high
- Symptom: Static file in `public/` was served by Next.js in preference to the dynamic route, so only a hardcoded subset of URLs (services, areas, a few hubs) appeared in the sitemap. None of the 56 blog posts, and none of the 160 service-by-city combinations, were included.
- Fix: deleted `public/sitemap.xml`. Rewrote `app/sitemap.ts` to enumerate all 228 URLs from `getAllServiceSlugs()`, `getAllCitySlugs()`, and `getAllBlogSlugs()`, including per-post `lastModified` from `publishedAt`.

### S2: Duplicate static `public/robots.txt` shadowing dynamic `app/robots.ts`
- Severity: high
- Symptom: Static file was authoritative. Pointed Google at a sitemap URL that did not list the full inventory and did not declare any policy for LLM user-agents.
- Fix: deleted `public/robots.txt`. Rewrote `app/robots.ts` with explicit rules for 13 LLM user-agents (GPTBot, Claude-Web, ClaudeBot, Google-Extended, PerplexityBot, etc.), shared disallow for `/api/` and `/admin/`, and a single sitemap reference to `https://homebuyerboise.com/sitemap.xml`.

### S3: Placeholder Google Search Console verification token
- Severity: medium
- Symptom: `app/layout.tsx` emitted `<meta name="google-site-verification" content="google-site-verification-code">`. Not a real token. User has no GSC property linked yet.
- Fix: removed the `verification` block from the root `metadata` export. To be reinstated once a real token is provided (proposed as follow-up).

### S4: No global Organization or WebSite JSON-LD
- Severity: high
- Symptom: Knowledge-graph entity for Home Buyer Boise existed only on pages that explicitly emitted `LocalBusiness` schema. There was no top-level `Organization` (with `sameAs`, logo, contactPoint) or `WebSite` (with `potentialAction` SearchAction) declared sitewide.
- Fix: in `app/layout.tsx`, injected `generateOrganizationSchema()` and `generateWebSiteSchema()` once in the root layout body. Every page now inherits both.

### S5: No skip-to-content link
- Severity: medium (WCAG 2.1 A failure for `2.4.1 Bypass Blocks`)
- Fix: added a visually-hidden `<a href="#main-content">` as the first focusable element in `<body>`. Becomes visible on focus. Added matching `id="main-content"` to the `<main>` element.

### S6: Placeholder Idaho real estate license numbers in business info
- Severity: medium (E-E-A-T integrity, potential regulatory liability)
- Symptom: `lib/seo.ts` `BUSINESS_INFO.licenses` contained `'Idaho Real Estate License #SP12345'` and `'Idaho Business License #ABC67890'`. These are not real numbers. They were not currently surfaced in any schema or page copy, but were available to anything that imported `BUSINESS_INFO`.
- Fix: removed the `licenses` field entirely. Left a comment indicating it should be added back once verified numbers are supplied. The `certifications` and `insurance` strings were left as-is per user decision.

### S7: Blog schema missing
- Severity: high
- Symptom: Blog posts had only the default page metadata. No `BlogPosting`, no `BreadcrumbList`, no `FAQPage` on posts that contain FAQ blocks.
- Fix: added `generateBlogPostingSchema()` to `lib/schema.ts`. Applied at the page level (see `blog-templates.md`).

### S8: Dead internal link `/how-it-works`
- Severity: medium
- Symptom: `app/page.tsx` (home, in `howItWorksSteps[1].href`), two blog post bodies, and `public/llms.txt` linked to `/how-it-works`, which does not exist. User chose to consolidate this content onto `/pricing` rather than create a new route.
- Fix:
  - Updated the homepage step href to `/pricing`.
  - Rewrote the two blog post inline references to `/pricing`.
  - Rewrote the `public/llms.txt` Core Pages list to point at `/pricing` (and removed the `/how-it-works` line).
  - Added two permanent 301 redirects in `next.config.js`: `/how-it-works -> /pricing` and `/how-it-works/:slug* -> /pricing` (trailing slash and any subpath variant).

### S9: Stale and contradictory facts in `public/llms.txt`
- Severity: medium-high (LLM-facing surface, contradicted the no-automated-offer business rule)
- Symptom: `public/llms.txt` advertised an "AI-powered valuation system" providing offers "within 24 hours" at "70 to 85 percent of estimated value", listed the wrong phone number `(208) 405-CASH (2274)`, listed the wrong email `hello@homebuyerboise.com`, and asserted "Licensed Idaho real estate investors" without verified license numbers. All four are inconsistent with current business facts and with the sitewide remediation we just completed.
- Fix: rewrote `public/llms.txt` end to end. Correct phone `(208) 405-2275`. Correct primary email `connect@buymyhouse.co`. Removed every "AI" or "automated valuation" claim and replaced with explicit human-underwriting language matching the no-automated-offer rule. Removed the placeholder licensing claim. Aligned the FAQ block and Competitive Advantages to the same language used on `/pricing`.

## Decisions left as-is (with rationale)

- `BUSINESS_TYPE` schema array stays `["LocalBusiness", "RealEstateAgent"]`. User confirmed dual-typing is intentional and accurate.
- `og-image.png` remains 512x512 at root path. User decided to leave it for now; replacement with a 1200x630 OG image is proposed as a follow-up task.
- Blog author rendered as `Organization` in `BlogPosting.author` (not as a `Person` with profile URL). User decided not to spin up author profile pages this pass; proposed as follow-up.

## Files touched
- `public/sitemap.xml` (deleted)
- `public/robots.txt` (deleted)
- `app/sitemap.ts` (rewritten)
- `app/robots.ts` (rewritten)
- `app/layout.tsx` (verification removed, skip link added, global JSON-LD injected)
- `lib/seo.ts` (placeholder licenses removed)
- `lib/schema.ts` (`generateBlogPostingSchema` added)
- `components/JsonLd.tsx` (new reusable script-tag renderer)
- `next.config.js` (added `/how-it-works -> /pricing` 301 redirect)
- `shared/blogContent.ts` (two inline `/how-it-works` links retargeted to `/pricing`)
