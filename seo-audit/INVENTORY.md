# SEO Audit Inventory — Home Buyer Boise

Full route map enumerated from `app/`, `generateStaticParams` calls,
`shared/servicesData.ts`, `shared/contentData.ts`, and `shared/blogContent.ts`.

**Totals:** 191 indexable URLs (11 static + 17 service + 8 area + 136 service×city + 19 blog).

Legend:
- **Render:** SSG (static at build) / SSR / Static-file
- **Meta:** how the page sets `<title>` and meta description
- **Canonical:** what `alternates.canonical` resolves to
- **Schema:** JSON-LD types injected on the page
- **Index:** robots indexability (all default to index/follow unless flagged)

---

## A. Static pages (11)

| URL | Source file | Render | Meta | Canonical | Schema | Notes / defects |
|---|---|---|---|---|---|---|
| `/` | `app/page.tsx` | SSG | hardcoded `Metadata` export, line ~28 | `https://homebuyerboise.com` | NONE | Highest-priority page; zero JSON-LD; no Organization/WebSite schema even though generators exist |
| `/about` | `app/about/page.tsx` | SSG | hardcoded `Metadata` export | `/about` | NONE | E-E-A-T page; no team/person schema, no author bios |
| `/contact` | `app/contact/page.tsx` | SSG | hardcoded `Metadata` export | `/contact` | NONE | No ContactPoint schema, no embedded map |
| `/pricing` | `app/pricing/page.tsx` | SSG | hardcoded; title says "How It Works" | `/pricing` | NONE | Slug/title mismatch (see CONTEXT.md #6 defect 11); inbound link from old sitemap is `/how-it-works` which 404s |
| `/services` | `app/services/page.tsx` | SSG | `generateMetadata()` returns OG-rich metadata | `/services` | NONE | Hub page; should at least have BreadcrumbList |
| `/areas` | `app/areas/page.tsx` | SSG | `generateMetadata()` returns OG-rich metadata | `/areas` | NONE | Hub page; should at least have BreadcrumbList |
| `/get-quote` | `app/get-quote/page.tsx` | SSG | hardcoded `Metadata` export | `/get-quote` | NONE | Primary conversion page; no schema |
| `/savings-calculator` | `app/savings-calculator/page.tsx` | SSG | hardcoded `Metadata` export | `/savings-calculator` | NONE | "Estimate, not an offer" disclaimer must remain (replit.md) |
| `/blog` | `app/blog/page.tsx` | SSG | hardcoded `Metadata` export | `/blog` | NONE | Blog index; should have Blog/ItemList schema |
| `/privacy-policy` | `app/privacy-policy/page.tsx` | SSG | hardcoded `Metadata` export | `/privacy-policy` | NONE | OK to leave low-schema; mainly metadata polish |
| `/terms-of-service` | `app/terms-of-service/page.tsx` | SSG | hardcoded `Metadata` export | `/terms-of-service` | NONE | Same as above |

---

## B. Service detail pages (17) — `app/services/[service]/page.tsx`

Template render: SSG via `generateStaticParams() = getAllServiceSlugs()`.
Per-page metadata: `generateMetadata({params})` reads `getServiceBySlug` and
returns title/description/keywords/canonical/OG/Twitter.
Schema injected per page: **Service**, **FAQPage**, **BreadcrumbList**.

Slugs (source: `shared/servicesData.ts`):

| # | URL | Service name |
|---|---|---|
| 1 | `/services/sell-house-fast` | Sell House Fast |
| 2 | `/services/we-buy-houses` | We Buy Houses |
| 3 | `/services/cash-offer` | Cash Offer |
| 4 | `/services/sell-as-is` | Sell As-Is |
| 5 | `/services/inherited-property` | Inherited Property |
| 6 | `/services/avoid-foreclosure` | Avoid Foreclosure |
| 7 | `/services/sell-house-divorce` | Sell House in Divorce |
| 8 | `/services/relocation-sale` | Relocation Sale |
| 9 | `/services/problem-tenants` | Problem Tenants |
| 10 | `/services/probate-sale` | Probate Sale |
| 11 | `/services/tax-liens` | Tax Liens |
| 12 | `/services/downsizing` | Downsizing |
| 13 | `/services/fire-water-damage` | Fire / Water Damage |
| 14 | `/services/hoarder-house` | Hoarder House |
| 15 | `/services/expired-listing` | Expired Listing |
| 16 | `/services/behind-mortgage` | Behind on Mortgage |
| 17 | `/services/code-violations` | Code Violations |

Template-level defects to audit once and roll out:
- Verify FAQ entries are not duplicated across slugs (would cause FAQ
  schema duplicate-content risk).
- Verify each service has a unique meta description (not just the
  template defaulting to one string).

---

## C. Area detail pages (8) — `app/areas/[city]/page.tsx`

Template render: SSG via `generateStaticParams() = getAllCitySlugs()`.
Per-page metadata: `generateMetadata` reads `getCityBySlug`.
Schema injected per page: **LocalBusiness** (geo-localized via
`CITY_SEO_DATA[city].coordinates`), **BreadcrumbList**, **FAQPage**.

| # | URL | City | Geo |
|---|---|---|---|
| 1 | `/areas/boise` | Boise | 43.6150, -116.2023 |
| 2 | `/areas/meridian` | Meridian | 43.6121, -116.3915 |
| 3 | `/areas/eagle` | Eagle | 43.6954, -116.3540 |
| 4 | `/areas/kuna` | Kuna | 43.4913, -116.4201 |
| 5 | `/areas/star` | Star | 43.6921, -116.4935 |
| 6 | `/areas/middleton` | Middleton | 43.7077, -116.6185 |
| 7 | `/areas/nampa` | Nampa | 43.5407, -116.5635 |
| 8 | `/areas/caldwell` | Caldwell | 43.6629, -116.6874 |

---

## D. Service + City pages (136) — `app/services/[service]/[city]/page.tsx`

Template render: SSG; one page per (service × city) combination.
Per-page metadata + content generated by `generateServiceCityContent(service, city)`
from `shared/serviceCityContent.ts`.
Schema injected per page: **Service**, **LocalBusiness**, **BreadcrumbList**, **FAQPage**.

URL pattern: `/services/{service-slug}/{city-slug}`
Combination count: 17 services × 8 cities = **136 pages**.

Audit strategy for Task #8: audit one representative slug per service
family across one city, then spot-check 5–10 other combinations for
content uniqueness, near-duplicate detection, and title/description
distinctness. Full per-page audit reports would be a separate follow-up
if any thin-content issues surface.

---

## E. Blog posts (19) — `app/blog/[slug]/page.tsx`

Template render: SSG via `generateStaticParams() = getAllBlogSlugs()`.
Per-page metadata: `generateMetadata` reads `getBlogPostBySlug`,
honors `seoTitle` / `metaDescription` overrides, sets `openGraph.type=article`.
Schema injected per page: **NONE** (no `BlogPosting` JSON-LD — defect).

Posts (source: `shared/blogContent.ts`):

| # | URL | Published | Title |
|---|---|---|---|
| 1 | `/blog/sell-my-house-fast-boise-complete-guide` | 2025-01-15 | Sell My House Fast in Boise: The Complete 2025 Homeowner's Guide |
| 2 | `/blog/we-buy-houses-boise-how-it-works` | 2025-01-12 | We Buy Houses Boise: How Cash Home Buying Actually Works |
| 3 | `/blog/cash-offer-vs-traditional-sale-comparison` | 2025-01-10 | Cash Offer vs. Traditional Sale: Which Is Right for Your Boise Home? |
| 4 | `/blog/sell-house-as-is-boise-guide` | 2025-01-08 | How to Sell a House As-Is in Boise Without Making Repairs |
| 5 | `/blog/how-long-to-sell-house-boise` | 2025-01-05 | How Long Does It Take to Sell a House in Boise? 2025 Timeline Guide |
| 6 | `/blog/avoid-foreclosure-boise-options` | 2025-01-03 | How to Avoid Foreclosure in Boise: Your Complete Options Guide |
| 7 | `/blog/sell-inherited-house-boise` | 2025-01-01 | How to Sell an Inherited House in Boise: Complete Probate Guide |
| 8 | `/blog/selling-house-divorce-boise` | 2024-12-28 | Selling Your House During Divorce in Boise: A Complete Guide |
| 9 | `/blog/boise-real-estate-market-update-2025` | 2024-12-25 | Boise Real Estate Market 2025: What Sellers Need to Know |
| 10 | `/blog/selling-house-with-outdated-systems-boise` | 2024-12-09 | Selling a House with Outdated Plumbing, Electrical, and HVAC in Boise |
| 11 | `/blog/selling-house-with-bad-roof-boise` | 2024-12-07 | Selling a House with Roof Problems in Boise: Costs, Challenges, and Solutions |
| 12 | `/blog/selling-fire-damaged-house-boise` | 2024-12-05 | Selling a Fire-Damaged House in Boise: Insurance, Repairs, and Cash Sale Options |
| 13 | `/blog/selling-house-with-mold-boise` | 2024-12-03 | How to Sell a House with Mold in Boise: Your Complete Idaho Guide |
| 14 | `/blog/selling-house-with-foundation-problems-boise` | 2024-12-01 | Selling a House with Foundation Problems in Boise: Complete Guide for Idaho Homeowners |
| 15 | `/blog/selling-hoarder-house-boise` | 2024-12-11 | Selling a Hoarder House in Boise: A Compassionate Guide for Families |
| 16 | `/blog/selling-house-with-termite-damage-boise` | 2024-12-13 | Selling a House with Termite Damage in Boise: Treatment, Disclosure, and Options |
| 17 | `/blog/selling-house-needs-major-repairs-boise` | 2024-12-15 | Selling a House That Needs Major Repairs in Boise: The Complete Guide |
| 18 | `/blog/selling-vacant-house-boise` | 2024-12-17 | Selling a Vacant House in Boise: Carrying Costs, Security, and Fast Sale Options |
| 19 | `/blog/selling-house-with-code-violations-boise` | 2024-12-19 | Selling a House with Code Violations in Boise: Resolution, Disclosure, and Options |

Note: the current `app/sitemap.ts` only lists 4 hardcoded blog slugs (lines
29-34), none of which match the 19 actual posts above. The dynamic blog
list is missing from the sitemap. (This is masked at runtime because the
static `public/sitemap.xml` shadows `app/sitemap.ts` — and that static file
has zero blog URLs at all.)

---

## F. Non-indexable / utility routes

| URL | Source | Purpose | Robots |
|---|---|---|---|
| `/api/offers` | `app/api/offers/route.ts` | Lead submission to connect@buymyhouse.co + admin@timberandlove.com | Disallowed |
| `/api/contact` | `app/api/contact/route.ts` | Contact form submission | Disallowed |
| `/api/testimonials` | `app/api/testimonials/route.ts` | Testimonial fetch | Disallowed |
| `/llms.txt` | `app/llms.txt/route.ts` | Dynamic LLM context endpoint | Allowed (good) |
| `/llms-full.txt` | `public/llms-full.txt` | Static LLM context | Allowed |
| `/sitemap.xml` | `public/sitemap.xml` (static) shadows `app/sitemap.ts` | Sitemap | Allowed; stale and incomplete |
| `/robots.txt` | `public/robots.txt` (static) shadows `app/robots.ts` | Robots | Allowed; references dead `/how-it-works` |
| `/favicon.png` | `public/favicon.png` | Favicon, 512×512 | n/a |
| `/og-image.png` | `public/og-image.png` | OG image, 512×512 (defect) | n/a |
| `/logo.png` | `public/logo.png` | Logo, 1000×140 | n/a |
| `/images/*` | `public/images/` | Hero backgrounds | n/a |

---

## G. Sitewide issues (cross-cutting, not page-specific)

Re-stated from CONTEXT.md §6 with the URLs they affect:

| # | Defect | Affects |
|---|---|---|
| 1 | OG image 512×512 instead of 1200×630 | All 191 pages |
| 2 | Placeholder `verification.google` token | Sitewide (layout) |
| 3 | `public/sitemap.xml` shadows `app/sitemap.ts`, file is stale, references dead `/how-it-works`, omits all 19 blog posts and all 136 service×city pages | Sitemap discoverability for 155 URLs |
| 4 | `public/robots.txt` shadows `app/robots.ts`; references dead `/how-it-works` | Crawler hints sitewide |
| 5 | Zero JSON-LD on 11 static pages including homepage | 11 pages |
| 6 | No BlogPosting schema on any blog post | 19 pages |
| 7 | No skip-to-content link in `app/layout.tsx` | All 191 pages (accessibility / D9) |
| 8 | `twitter.site` / `twitter.creator` not set | All 191 pages |
| 9 | Unverified `sameAs` social URLs in schema | All pages that emit LocalBusiness or Organization |
| 10 | Pricing URL vs. "How It Works" copy mismatch | 1 page (`/pricing`) + cross-page internal links |
| 11 | Placeholder license / business numbers in `BUSINESS_INFO` | All pages that emit LocalBusiness or Organization |
| 12 | Hardcoded 4-slug blog list in `app/sitemap.ts` out of sync with 19 actual posts | Sitemap once duplicate resolved |
| 13 | `lib/seo.ts` `generateSEOMetadata` helper is defined but not used by static pages (hand-rolled metadata duplicates effort and risks drift) | Maintenance / consistency |

---

## H. Approved audit order (proposed)

(Repeated here from CONTEXT.md §8 for ease of reference.)

1. Sitewide first pass (layout, sitemap, robots, og-image, Organization+WebSite schema)
2. Homepage `/`
3. `/get-quote`
4. `/pricing` (resolve slug/title)
5. `/savings-calculator`
6. Service detail template + all 17 service slugs
7. Service+city template + spot-check across 136 pages
8. Area detail template + all 8 cities
9. `/services` and `/areas` hub pages
10. `/about`
11. `/contact`
12. `/blog` index
13. Blog post template + all 19 posts
14. `/privacy-policy`, `/terms-of-service`

Waiting on your answers in CONTEXT.md §9 before Task #8 starts.
