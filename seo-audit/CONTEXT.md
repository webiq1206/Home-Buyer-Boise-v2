# SEO Audit Context — Home Buyer Boise

Auto-extracted from the codebase on 2026-05-27. Read-only. Source paths and
line numbers are cited for every value. Confidence is HIGH when the value
comes directly from a code/config file, MEDIUM when it required interpretation
across two or more files, LOW when assumptions were made.

---

## 1. Site identity

| Field | Value | Source | Confidence |
|---|---|---|---|
| Business name (display) | Home Buyer Boise | `lib/seo.ts:344` | HIGH |
| Legal name | Home Buyer Boise LLC | `lib/seo.ts:345` | HIGH |
| Domain | homebuyerboise.com | `lib/seo.ts:199`, `app/layout.tsx:27`, `app/sitemap.ts:5` | HIGH |
| Canonical base URL | https://homebuyerboise.com | `app/layout.tsx:27` | HIGH |
| Phone | (208) 405-2275 | `lib/seo.ts:346` | HIGH |
| Primary email | connect@buymyhouse.co | `lib/seo.ts:347` | HIGH |
| Lead notification emails | connect@buymyhouse.co AND admin@timberandlove.com | `replit.md`, `lib/services/email.ts` (referenced) | HIGH |
| NAP street | 3024 W Fairview Ave | `lib/seo.ts:349` | HIGH |
| NAP city/state/zip | Boise, Idaho 83702 | `lib/seo.ts:350-352` | HIGH |
| Hours | Mon–Fri 8a–6p, Sat 9a–3p, Sun closed | `lib/seo.ts:355-363` | HIGH |
| Founded | 2018 | `lib/seo.ts:364` | HIGH |
| Service radius | 30 miles, Boise metro | `lib/seo.ts:365-366` | HIGH |
| Service area cities | Boise, Meridian, Eagle, Kuna, Star, Middleton, Nampa, Caldwell | `lib/seo.ts:365` | HIGH |

---

## 2. Tech stack and rendering

| Field | Value | Source | Confidence |
|---|---|---|---|
| Framework | Next.js 14.2.18 (App Router) | `package.json`, route files under `app/` | HIGH |
| Language | TypeScript | `tsconfig.json`, `.tsx` files | HIGH |
| Styling | Tailwind CSS + shadcn/ui | `tailwind.config.ts`, `components/ui/` | HIGH |
| Font loader | next/font Inter (latin subset) | `app/layout.tsx:10` | HIGH |
| Rendering | Static at build time (SSG via `generateStaticParams`) for `[service]`, `[city]`, `[service]/[city]`, `blog/[slug]` | `app/services/[service]/page.tsx`, `app/areas/[city]/page.tsx`, etc. | HIGH |
| Trailing slash policy | OFF (canonicals are slashless) | `next.config.js:16` | HIGH |
| Image domains | self, images.unsplash.com | `next.config.js:4-13` | HIGH |
| Image optimization | next/image with WebP/AVIF (Next defaults) | imports in page files | HIGH |

---

## 3. SEO infrastructure (what already exists)

| Capability | Where it lives | Notes |
|---|---|---|
| Per-page metadata API | Next.js `Metadata` export on every page | All 11 static pages + 4 dynamic page templates set title/description/canonical |
| Helper to build titles/descriptions | `lib/seo.ts` `generateSEOMetadata`, `generatePageTitle`, `generateMetaDescription` | Not consistently used (homepage, about, contact, pricing, get-quote, savings-calculator, blog, legal pages all hand-roll metadata instead of calling this helper) |
| NAP / business info constant | `lib/seo.ts` `BUSINESS_INFO` (line 343-373) | Single source of truth, good |
| City SEO data (geo, ZIPs, neighborhoods, landmarks) | `lib/seo.ts` `CITY_SEO_DATA` (line 265-338) | All 8 cities covered |
| JSON-LD generators | `lib/schema.ts` exports: `generateLocalBusinessSchema`, `generateServiceSchema`, `generateBreadcrumbSchema`, `generateOrganizationSchema`, `generateReviewSchema`, `generateFAQSchema`, `generateWebPageSchema`, `generateWebSiteSchema`, `generateArticleSchema` | Comprehensive library exists; injection is incomplete (see #5) |
| Sitemap | `app/sitemap.ts` (Next.js native) | Covers static + dynamic routes |
| Robots | `app/robots.ts` (Next.js native) | Allows everything, disallows `/api/` and `/admin/` |
| LLM context | `app/llms.txt/route.ts` (server route) + `public/llms.txt`, `public/llms-full.txt` | Custom AI-crawler-friendly endpoint |
| Internal link map | `lib/internalLinks.ts` | Powers `RelatedContent` component |
| OG image | `public/og-image.png` | 512×512 (defect — see #6) |
| Favicon | `public/favicon.png` | 512×512 |
| Logo | `public/logo.png` | 1000×140 |

---

## 4. Voice and target keywords

| Field | Value | Source | Confidence |
|---|---|---|---|
| Brand voice | Direct, reassuring, no-jargon, local-trusted; emphasizes "fast cash", "no fees", "no repairs", "any condition", "close on your timeline" | Copy in `app/page.tsx`, `app/about/page.tsx`, `lib/seo.ts:120-130`, all service pages | HIGH |
| Primary keywords | "sell house fast", "cash home buyers", "we buy houses", "sell house for cash", "cash offer on house" | `lib/seo.ts:140-152` | HIGH |
| Local modifiers | Boise, Meridian, Eagle, Kuna, Star, Middleton, Nampa, Caldwell, Treasure Valley, Idaho, Ada County, Canyon County | `lib/seo.ts:154-169`, `app/areas/page.tsx` metadata | HIGH |
| Service vertical keywords | inherited property, avoid foreclosure, divorce sale, relocation, problem tenants, probate, tax liens, downsizing, fire/water damage, hoarder house, expired listing, behind on mortgage, code violations | `shared/servicesData.ts` slugs | HIGH |
| Tone constraints | No automated offers ever — calculator is "estimate, not an offer"; leads always routed to humans | `replit.md`, `app/savings-calculator/page.tsx` | HIGH |

---

## 5. Schema injection coverage

| Page template | LocalBusiness | Service | Breadcrumb | FAQ | Article | WebPage | Organization |
|---|---|---|---|---|---|---|---|
| Homepage (`app/page.tsx`) | NO | NO | NO | NO | n/a | NO | NO |
| About (`app/about/page.tsx`) | NO | NO | NO | NO | n/a | NO | NO |
| Contact (`app/contact/page.tsx`) | NO | NO | NO | NO | n/a | NO | NO |
| Pricing (`app/pricing/page.tsx`) | NO | NO | NO | NO | n/a | NO | NO |
| Services index (`app/services/page.tsx`) | NO | NO | NO | NO | n/a | NO | NO |
| Areas index (`app/areas/page.tsx`) | NO | NO | NO | NO | n/a | NO | NO |
| Get Quote (`app/get-quote/page.tsx`) | NO | NO | NO | NO | n/a | NO | NO |
| Savings Calculator (`app/savings-calculator/page.tsx`) | NO | NO | NO | NO | n/a | NO | NO |
| Blog index (`app/blog/page.tsx`) | NO | NO | NO | NO | n/a | NO | NO |
| Blog post (`app/blog/[slug]/page.tsx`) | NO | NO | NO | NO | NO (only `openGraph.type=article`) | NO | NO |
| Privacy / Terms | NO | NO | NO | NO | n/a | NO | NO |
| Service detail (`app/services/[service]/page.tsx`) | NO | YES | YES | YES | n/a | NO | NO |
| Service + City (`app/services/[service]/[city]/page.tsx`) | YES | YES | YES | YES | n/a | NO | NO |
| Area detail (`app/areas/[city]/page.tsx`) | YES (uses schema lib) | n/a | YES | YES | n/a | NO | NO |

Source: `rg -l "JSON.stringify\|application/ld" app/`.

The library in `lib/schema.ts` is well-built but only wired into the three
dynamic templates. Every static page is missing JSON-LD entirely. The
Organization and WebSite schemas should live in `app/layout.tsx` so they
render once site-wide.

---

## 6. Sitewide defects spotted during scan (sneak preview)

These will be re-stated with severity in the per-page audits during Task #8.
Listed here so you can confirm scope before the audit begins.

1. **OG image is 512×512** (`public/og-image.png`). Facebook/LinkedIn require
   1200×630 minimum, Twitter summary_large_image needs 1200×675. Current
   image will be downscaled or rejected by some scrapers. Declared as
   512×512 in `app/layout.tsx:41-42`.
2. **Placeholder Google verification token** in `app/layout.tsx:64-66`
   (`"google-site-verification-code"`). Either remove or replace with the
   real token.
3. **Duplicate sitemap sources.** `app/sitemap.ts` generates a complete
   dynamic sitemap, but `public/sitemap.xml` also exists as a static file
   AND public/ takes precedence over app routes in Next.js. Result: the
   dynamic sitemap is currently dead code and the static file is served
   instead. The static file is also stale (last `<lastmod>` 2025-11-25) and
   references `/how-it-works`, a route that no longer exists (it was
   renamed to `/pricing` — the page title still says "How It Works" at
   `app/pricing/page.tsx`).
4. **Duplicate robots sources.** `app/robots.ts` and `public/robots.txt`
   both exist; `public/robots.txt` wins. The static file is much more
   detailed (LLM bots, etc.) but also lists `/how-it-works` as Allow,
   pointing at a dead URL.
5. **Schema gaps on every static page** (see table above). Homepage in
   particular ships zero JSON-LD despite a complete generator library.
6. **No `BlogPosting` schema on blog posts**, only `openGraph.type=article`.
7. **No author bios anywhere.** E-E-A-T is weak on blog content; posts
   list "author" only as a string field with no person schema or visible
   bio block.
8. **Skip-to-content link missing** from `app/layout.tsx`. Required for
   WCAG keyboard navigation per the playbook's D9 / accessibility rule.
9. **Twitter handle config missing.** Schema `sameAs` lists `x.com/homebuyerboise`
   but `app/layout.tsx` does not set `twitter.site` or `twitter.creator`.
10. **Unverified social `sameAs` URLs** in `lib/schema.ts:82-87` and
    `217-222`. These accounts may or may not exist; bad `sameAs` entries
    can hurt entity recognition.
11. **Pricing page slug/title mismatch.** URL is `/pricing` but title is
    "How It Works | Sell Your House Fast to Home Buyer Boise"
    (`app/pricing/page.tsx`). Either rename the URL to `/how-it-works`
    with a 301 redirect, or change the title to match the slug.
12. **Stub license/certification strings** in `lib/seo.ts:367-368`
    (`"Idaho Real Estate License #SP12345"`, `"Idaho Business License #ABC67890"`)
    look like placeholders. These end up in schema-visible E-E-A-T text.
13. **Hardcoded blog slug list in `app/sitemap.ts:29-34`** (only 4 slugs)
    is out of sync with `shared/blogContent.ts` (19 published posts). The
    other 15 posts are absent from the dynamic sitemap. (Moot today
    because the static `public/sitemap.xml` shadows it, but a defect once
    the duplicate is removed.)
14. **No `metadataBase`-anchored OG URLs on most pages.** Several pages
    pass full absolute URLs to `openGraph.url` which works, but mixing
    that with `metadataBase` and inconsistent canonical strategy
    (`/some-path` vs. full URL) creates risk of duplicate or wrong
    canonicals.

---

## 7. Integrations to preserve (do not touch in Task #8)

Per `replit.md` and source scan:

- `lib/services/offerCalculator.ts` — algorithm that powers savings calculator output
- `lib/services/email.ts` + `lib/services/resend.ts` — Resend email delivery
- `app/api/offers/route.ts` — lead submission API; routes to connect@buymyhouse.co and admin@timberandlove.com
- `app/api/contact/route.ts` — contact form API; same routing
- `app/api/testimonials/route.ts` — testimonial display API
- `components/QuoteForm.tsx`, `components/ContactForm.tsx`, `components/HeroAddressLookup.tsx` — lead capture entry points
- `lib/db/` and Drizzle ORM connections — database persistence
- The "estimate, not an offer" disclaimer language on the savings calculator (no automated estimates policy)
- Phone number `(208) 405-2275` and the tel: link in Navigation + Footer + StickyBottomNav

---

## 8. Audit order proposal

Recommended order. Rationale per group in parentheses. The per-page audits
in Task #8 will follow this list unless you change it.

1. **Sitewide first pass** (`app/layout.tsx`, `app/sitemap.ts` vs
   `public/sitemap.xml`, `app/robots.ts` vs `public/robots.txt`,
   `og-image.png`, Organization + WebSite schema injection).
   Reason: most defects above are sitewide and unlocking them improves
   every subsequent page audit.
2. **Homepage** (`app/page.tsx`). Highest traffic, highest conversion.
3. **Get Quote** (`app/get-quote/page.tsx`) — primary conversion page.
4. **Pricing / How It Works** (`app/pricing/page.tsx`) — resolve the
   slug/title mismatch.
5. **Savings Calculator** (`app/savings-calculator/page.tsx`).
6. **Service detail pages** — `app/services/[service]/page.tsx` template
   audited once, then re-validated across all 17 slugs.
7. **Service + City pages** — `app/services/[service]/[city]/page.tsx`
   template audited once, then spot-check across 136 combinations for
   uniqueness / thin-content risk.
8. **Area detail pages** — `app/areas/[city]/page.tsx` template plus
   each of 8 cities.
9. **Services index** (`app/services/page.tsx`) and **Areas index**
   (`app/areas/page.tsx`) — hub pages.
10. **About** (`app/about/page.tsx`) — E-E-A-T page, needs author / team
    detail for trust signals.
11. **Contact** (`app/contact/page.tsx`) — NAP, ContactPoint schema,
    embedded map (per playbook D11).
12. **Blog index** (`app/blog/page.tsx`).
13. **Blog posts** — `app/blog/[slug]/page.tsx` template, then all 19
    posts (BlogPosting schema, datePublished/dateModified, author).
14. **Legal pages** (`/privacy-policy`, `/terms-of-service`) — lowest
    priority, mainly noindex/metadata polish.

Total indexable pages: 11 static + 17 service + 8 area + 136 service+city
+ 19 blog = **191 URLs**.

---

## 9. Batched user-confirmation questions

These are the only items the codebase cannot answer on its own. Please
answer before Task #8 begins.

1. **BUSINESS_TYPE.** Current `LocalBusiness` schema uses dual type
   `["LocalBusiness", "RealEstateAgent"]`. Google prefers a single most-
   specific type. For a cash home buying business, the closest fit is
   typically `RealEstateAgent` or the more specific
   `HomeAndConstructionBusiness`. Which do you want as the primary?
   - a) Keep dual `["LocalBusiness", "RealEstateAgent"]`
   - b) Single `RealEstateAgent`
   - c) Single `LocalBusiness`
   - d) Other (specify)

2. **Twitter / X handle.** Schema `sameAs` lists `x.com/homebuyerboise`.
   Should `twitter.site` and `twitter.creator` in metadata be set to
   `@homebuyerboise`? If the account does not actually exist, we should
   remove the `sameAs` entry rather than ship a broken link.

3. **Social account verification.** `lib/schema.ts` references Facebook,
   Instagram, LinkedIn, and X profiles. Are all four live and owned by
   you? Any we should remove?

4. **Google Search Console verification.** `app/layout.tsx:65` has the
   placeholder `"google-site-verification-code"`. Do you have a real
   verification token to drop in, or should we remove the `verification`
   block until you do? (Removing is safer than shipping a placeholder
   that breaks verification handshake.)

5. **License and business numbers.** `lib/seo.ts:367-368` reads
   `"Idaho Real Estate License #SP12345"` and
   `"Idaho Business License #ABC67890"`. These look like placeholders.
   Please provide the real numbers or confirm you want these fields
   removed from schema until they are available.

6. **`/pricing` vs `/how-it-works`.** The URL is `/pricing`, but the
   page title and content frame it as "How It Works". Inbound links
   (`public/robots.txt`, the old `public/sitemap.xml`) still reference
   `/how-it-works`. Which do you want as the canonical?
   - a) Keep URL at `/pricing`, change page title to "Our Pricing /
     Cost to Sell" wording
   - b) Move URL to `/how-it-works` with a 301 redirect from `/pricing`
   - c) Keep `/pricing` URL and keep "How It Works" copy (status quo,
     no change)

7. **Author bios for E-E-A-T.** Blog posts list a string author but
   show no bio or person profile. For E-E-A-T credibility (especially
   on real estate / financial topics), Google rewards visible author
   credentials. Three options:
   - a) Create a single "Home Buyer Boise Team" generic author bio
   - b) Create named author profiles (you would provide names, headshots,
     bios) and add an `/authors/[slug]` page set
   - c) Skip author bios for this audit pass
   Note: option (b) is larger scope and would likely require a separate
   follow-up task.

8. **Real estate market / property data citations.** The playbook's
   D10 (AEO/GEO) section rewards specific numbers and outbound citations
   to authoritative sources. May we add citations to Boise Regional
   Realtors, Intermountain MLS reports, U.S. Census, or Ada/Canyon
   County records where claims are made (e.g. median sale prices,
   population)? Confirm yes/no.

9. **OG image replacement.** Current 512×512 image needs to be replaced
   with a 1200×630 PNG/JPG. Do you have a branded OG image you want to
   provide, or should we generate one from the existing logo + brand
   colors during Task #8?

10. **Embedded map on Contact page.** Playbook D11 calls for an embedded
    map. Site already uses `components/ServiceAreaMap.tsx` (Leaflet) on
    the homepage. Want us to add a Leaflet embed centered on
    `3024 W Fairview Ave` to `app/contact/page.tsx`, or skip?

---

Awaiting your answers + audit-order approval before kicking off Task #8.
