# SEO Audit Inventory for Home Buyer Boise

Full route map enumerated from `app/`, `generateStaticParams` calls,
`shared/servicesData.ts`, `shared/contentData.ts`, and
`shared/blogContent.ts`.

**Totals: 228 indexable URLs** (11 static + 17 service + 8 area + 136
service x city + 56 blog).

Legend:
- **Render:** SSG (static at build), SSR, or Static-file
- **Meta:** how the page sets `<title>` and meta description
- **Canonical:** what `alternates.canonical` resolves to
- **Schema:** JSON-LD types injected on the page
- **Index:** robots indexability (all default to index/follow unless
  flagged)

---

## A. Static pages (11)

| URL | Source file | Render | Meta | Canonical | Schema | Notes / defects |
|---|---|---|---|---|---|---|
| `/` | `app/page.tsx` | SSG | hardcoded `Metadata` export at `app/page.tsx:28-33` | `https://homebuyerboise.com` | NONE | Highest-priority page; zero JSON-LD; no Organization or WebSite schema even though generators exist |
| `/about` | `app/about/page.tsx` | SSG | hardcoded `Metadata` export at `app/about/page.tsx:6-12` | `/about` | NONE | E-E-A-T page; no team or person schema, no author bios |
| `/contact` | `app/contact/page.tsx` | SSG | hardcoded `Metadata` export at `app/contact/page.tsx:8-14` | `/contact` | NONE | No ContactPoint schema, no embedded map |
| `/pricing` | `app/pricing/page.tsx` | SSG | hardcoded `Metadata` export at `app/pricing/page.tsx:6-12` | `/pricing` | NONE | Title says "How It Works" but slug is `/pricing` (see CONTEXT.md section 6 defect 11); inbound link from old sitemap is `/how-it-works` which 404s |
| `/services` | `app/services/page.tsx` | SSG | `generateMetadata()` returns OG-rich metadata | `/services` | NONE | Hub page; should at least have BreadcrumbList |
| `/areas` | `app/areas/page.tsx` | SSG | `generateMetadata()` returns OG-rich metadata | `/areas` | NONE | Hub page; should at least have BreadcrumbList |
| `/get-quote` | `app/get-quote/page.tsx` | SSG | hardcoded `Metadata` export at `app/get-quote/page.tsx:7-13` | `/get-quote` | NONE | Primary conversion page; no schema |
| `/savings-calculator` | `app/savings-calculator/page.tsx` | SSG | hardcoded `Metadata` export at `app/savings-calculator/page.tsx:5-11` | `/savings-calculator` | NONE | "Estimate, not an offer" disclaimer must remain (per `replit.md`) |
| `/blog` | `app/blog/page.tsx` | SSG | hardcoded `Metadata` export | `/blog` | NONE | Blog index; should have Blog or ItemList schema |
| `/privacy-policy` | `app/privacy-policy/page.tsx` | SSG | hardcoded `Metadata` export | `/privacy-policy` | NONE | OK to leave low-schema; mainly metadata polish |
| `/terms-of-service` | `app/terms-of-service/page.tsx` | SSG | hardcoded `Metadata` export | `/terms-of-service` | NONE | Same as above |

---

## B. Service detail pages (17) `app/services/[service]/page.tsx`

Template render: SSG via `generateStaticParams() = getAllServiceSlugs()`
(defined at `shared/servicesData.ts`).
Per-page metadata: `generateMetadata({params})` reads `getServiceBySlug`
and returns title, description, keywords, canonical, OG, Twitter.
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

## C. Area detail pages (8) `app/areas/[city]/page.tsx`

Template render: SSG via `generateStaticParams() = getAllCitySlugs()`
(defined at `shared/contentData.ts`).
Per-page metadata: `generateMetadata` reads `getCityBySlug`.
Schema injected per page: **LocalBusiness** (geo-localized via
`CITY_SEO_DATA[city].coordinates`), **BreadcrumbList**, **FAQPage**.

| # | URL | City | Geo (lat, lng) |
|---|---|---|---|
| 1 | `/areas/boise` | Boise | 43.6150, -116.2023 |
| 2 | `/areas/meridian` | Meridian | 43.6121, -116.3915 |
| 3 | `/areas/eagle` | Eagle | 43.6954, -116.3540 |
| 4 | `/areas/kuna` | Kuna | 43.4913, -116.4201 |
| 5 | `/areas/star` | Star | 43.6921, -116.4935 |
| 6 | `/areas/middleton` | Middleton | 43.7077, -116.6185 |
| 7 | `/areas/nampa` | Nampa | 43.5407, -116.5635 |
| 8 | `/areas/caldwell` | Caldwell | 43.6629, -116.6874 |

Source: `lib/seo.ts:265-338` `CITY_SEO_DATA`.

---

## D. Service + City pages (136) `app/services/[service]/[city]/page.tsx`

Template render: SSG; one page per (service x city) combination.
Per-page metadata and content generated by
`generateServiceCityContent(service, city)` from
`shared/serviceCityContent.ts`.
Schema injected per page: **Service**, **LocalBusiness**,
**BreadcrumbList**, **FAQPage**.

URL pattern: `/services/{service-slug}/{city-slug}`
Combination count: 17 services x 8 cities = **136 pages**.

Audit strategy for Task #8: audit one representative slug per service
family across one city, then spot-check 5 to 10 other combinations for
content uniqueness, near-duplicate detection, and title or
description distinctness. Full per-page audit reports would be a
separate follow-up if any thin-content issues surface.

---

## E. Blog posts (56) `app/blog/[slug]/page.tsx`

Template render: SSG via `generateStaticParams() = getAllBlogSlugs()`
(defined at `shared/blogContent.ts`).
Per-page metadata: `generateMetadata` reads `getBlogPostBySlug`,
honors `seoTitle` / `metaDescription` overrides, sets
`openGraph.type=article`.
Schema injected per page: **NONE** (no `BlogPosting` JSON-LD; defect).

All posts (source: `shared/blogContent.ts`, regex-extracted from
`slug:` / `publishedAt:` / `title:` fields):

| # | Published | URL | Title |
|---|---|---|---|
| 1 | 2025-01-15 | `/blog/sell-my-house-fast-boise-complete-guide` | Sell My House Fast in Boise: The Complete 2025 Homeowner's Guide |
| 2 | 2025-01-12 | `/blog/we-buy-houses-boise-how-it-works` | We Buy Houses Boise: How Cash Home Buying Actually Works |
| 3 | 2025-01-10 | `/blog/cash-offer-vs-traditional-sale-comparison` | Cash Offer vs. Traditional Sale: Which Is Right for Your Boise Home? |
| 4 | 2025-01-08 | `/blog/sell-house-as-is-boise-guide` | How to Sell a House As-Is in Boise Without Making Repairs |
| 5 | 2025-01-05 | `/blog/how-long-to-sell-house-boise` | How Long Does It Take to Sell a House in Boise? 2025 Timeline Guide |
| 6 | 2025-01-03 | `/blog/avoid-foreclosure-boise-options` | How to Avoid Foreclosure in Boise: Your Complete Options Guide |
| 7 | 2025-01-01 | `/blog/sell-inherited-house-boise` | How to Sell an Inherited House in Boise: Complete Probate Guide |
| 8 | 2024-12-28 | `/blog/selling-house-divorce-boise` | Selling Your House During Divorce in Boise: A Complete Guide |
| 9 | 2024-12-25 | `/blog/boise-real-estate-market-update-2025` | Boise Real Estate Market 2025: What Sellers Need to Know |
| 10 | 2024-12-01 | `/blog/selling-house-with-foundation-problems-boise` | Selling a House with Foundation Problems in Boise |
| 11 | 2024-12-03 | `/blog/selling-house-with-mold-boise` | How to Sell a House with Mold in Boise |
| 12 | 2024-12-05 | `/blog/selling-fire-damaged-house-boise` | Selling a Fire-Damaged House in Boise |
| 13 | 2024-12-07 | `/blog/selling-house-with-bad-roof-boise` | Selling a House with Roof Problems in Boise |
| 14 | 2024-12-09 | `/blog/selling-house-with-outdated-systems-boise` | Selling a House with Outdated Plumbing, Electrical, and HVAC in Boise |
| 15 | 2024-12-11 | `/blog/selling-hoarder-house-boise` | Selling a Hoarder House in Boise: A Compassionate Guide for Families |
| 16 | 2024-12-13 | `/blog/selling-house-with-termite-damage-boise` | Selling a House with Termite Damage in Boise |
| 17 | 2024-12-15 | `/blog/selling-house-needs-major-repairs-boise` | Selling a House That Needs Major Repairs in Boise |
| 18 | 2024-12-17 | `/blog/selling-vacant-house-boise` | Selling a Vacant House in Boise |
| 19 | 2024-12-19 | `/blog/selling-house-with-code-violations-boise` | Selling a House with Code Violations in Boise |
| 20 | 2024-11-01 | `/blog/selling-inherited-house-boise` | Selling an Inherited House in Boise: Complete Guide to Probate, Taxes & Quick Sales |
| 21 | 2024-11-03 | `/blog/selling-house-during-divorce-boise` | Selling Your House During Divorce in Boise: A Complete Guide to Fair, Fast Home Sales |
| 22 | 2024-11-05 | `/blog/selling-house-after-death-spouse-boise` | Selling Your House After the Death of a Spouse in Boise: A Compassionate Guide |
| 23 | 2024-11-07 | `/blog/selling-house-for-job-relocation-boise` | Selling Your Boise House for Job Relocation |
| 24 | 2024-11-09 | `/blog/selling-house-to-avoid-foreclosure-boise` | Selling Your Boise House to Avoid Foreclosure |
| 25 | 2024-11-11 | `/blog/selling-house-behind-on-payments-boise` | Selling Your Boise House When You're Behind on Mortgage Payments |
| 26 | 2024-11-13 | `/blog/selling-rental-property-with-tenants-boise` | Selling Your Boise Rental Property with Tenants |
| 27 | 2024-11-15 | `/blog/selling-house-for-medical-expenses-boise` | Selling Your Boise House to Pay for Medical Expenses |
| 28 | 2024-11-17 | `/blog/selling-house-moving-to-assisted-living-boise` | Selling Your Boise House When Moving to Assisted Living |
| 29 | 2024-11-19 | `/blog/selling-house-bad-neighbors-boise` | Selling Your Boise House When You Have Bad Neighbors |
| 30 | 2024-10-01 | `/blog/selling-house-with-liens-boise` | Selling a House with Liens in Boise |
| 31 | 2024-10-03 | `/blog/capital-gains-tax-selling-house-boise` | Capital Gains Tax When Selling Your Boise House |
| 32 | 2024-10-05 | `/blog/selling-house-without-realtor-boise` | Selling Your House Without a Realtor in Boise: FSBO Guide |
| 33 | 2024-10-07 | `/blog/selling-house-with-reverse-mortgage-boise` | Selling a House with a Reverse Mortgage in Boise |
| 34 | 2024-10-09 | `/blog/closing-costs-when-selling-house-boise` | Closing Costs When Selling a House in Boise |
| 35 | 2024-10-11 | `/blog/how-much-is-my-house-worth-boise` | How Much Is My House Worth in Boise? Valuation Guide |
| 36 | 2024-10-13 | `/blog/selling-house-underwater-boise` | Selling a House Underwater in Boise |
| 37 | 2024-10-15 | `/blog/selling-house-with-unpaid-property-taxes-boise` | Selling a House with Unpaid Property Taxes in Boise |
| 38 | 2024-10-17 | `/blog/title-issues-when-selling-house-boise` | Title Issues When Selling a House in Boise |
| 39 | 2024-10-19 | `/blog/selling-house-in-probate-boise` | Selling a House in Probate in Boise |
| 40 | 2024-09-01 | `/blog/best-time-to-sell-house-boise` | Best Time to Sell a House in Boise: Seasonal Trends |
| 41 | 2024-09-03 | `/blog/how-long-to-close-on-house-boise` | How Long Does It Take to Close on a House in Boise? |
| 42 | 2024-09-05 | `/blog/what-happens-at-closing-boise` | What Happens at Closing When Selling a House in Boise |
| 43 | 2024-09-07 | `/blog/preparing-house-for-sale-boise` | Preparing Your House for Sale in Boise: Complete Checklist |
| 44 | 2024-09-09 | `/blog/home-inspection-before-selling-boise` | Home Inspection Before Selling in Boise |
| 45 | 2024-09-11 | `/blog/steps-to-sell-house-boise` | Steps to Sell Your House in Boise: Complete Guide |
| 46 | 2024-09-13 | `/blog/selling-house-quickly-boise` | Selling Your House Quickly in Boise: Speed Strategies |
| 47 | 2024-09-15 | `/blog/house-not-selling-boise-what-to-do` | House Not Selling in Boise? Here's What to Do |
| 48 | 2024-09-17 | `/blog/accepting-cash-offer-on-house-boise` | Accepting a Cash Offer on Your Boise House |
| 49 | 2024-09-19 | `/blog/negotiating-house-sale-boise` | Negotiating Your House Sale in Boise: Strategies for Sellers |
| 50 | 2024-08-15 | `/blog/cash-home-buyers-vs-realtors-boise` | Cash Home Buyers vs. Realtors in Boise |
| 51 | 2024-08-17 | `/blog/selling-house-meridian-idaho` | Selling Your House in Meridian, Idaho |
| 52 | 2024-08-19 | `/blog/selling-house-eagle-idaho` | Selling Your House in Eagle, Idaho |
| 53 | 2024-08-21 | `/blog/selling-house-nampa-idaho` | Selling Your House in Nampa, Idaho |
| 54 | 2024-08-23 | `/blog/selling-house-kuna-idaho` | Selling Your House in Kuna, Idaho |
| 55 | 2024-08-25 | `/blog/downsizing-home-boise-seniors` | Downsizing Your Home in Boise: A Senior's Complete Guide |
| 56 | 2024-08-27 | `/blog/first-time-home-seller-guide-boise` | First-Time Home Seller Guide for Boise |

Note: the current `app/sitemap.ts:29-34` only lists 4 hardcoded blog
slugs, none of which match the 56 actual posts above. The full
dynamic blog list is missing from the sitemap. This is masked at
runtime because the static `public/sitemap.xml` shadows
`app/sitemap.ts` and that static file has zero blog URLs at all.

Possible near-duplicate / cannibalization risk to flag in Task #8:
post 7 (`/blog/sell-inherited-house-boise`) vs. post 20
(`/blog/selling-inherited-house-boise`), and post 8
(`/blog/selling-house-divorce-boise`) vs. post 21
(`/blog/selling-house-during-divorce-boise`). These pairs cover
substantially the same topic with very similar slugs.

---

## F. Non-indexable / utility routes

| URL | Source | Purpose | Robots |
|---|---|---|---|
| `/api/offers` | `app/api/offers/route.ts` | Lead submission to connect@buymyhouse.co and admin@timberandlove.com | Disallowed |
| `/api/contact` | `app/api/contact/route.ts` | Contact form submission | Disallowed |
| `/api/testimonials` | `app/api/testimonials/route.ts` | Testimonial fetch | Disallowed |
| `/llms.txt` | `app/llms.txt/route.ts` | Dynamic LLM context endpoint | Allowed (good) |
| `/llms-full.txt` | `public/llms-full.txt` | Static LLM context | Allowed |
| `/sitemap.xml` | `public/sitemap.xml` (static) shadows `app/sitemap.ts` | Sitemap | Allowed; stale and incomplete |
| `/robots.txt` | `public/robots.txt` (static) shadows `app/robots.ts` | Robots | Allowed; references dead `/how-it-works` at line 132 |
| `/favicon.png` | `public/favicon.png` | Favicon, 512x512 | n/a |
| `/og-image.png` | `public/og-image.png` | OG image, 512x512 (defect) | n/a |
| `/logo.png` | `public/logo.png` | Logo, 1000x140 | n/a |
| `/images/*` | `public/images/` | Hero backgrounds | n/a |

---

## G. Sitewide issues (cross-cutting, not page-specific)

Re-stated from CONTEXT.md section 6 with the URLs they affect:

| # | Defect | Affects |
|---|---|---|
| 1 | OG image 512x512 instead of 1200x630 | All 228 pages |
| 2 | Placeholder `verification.google` token at `app/layout.tsx:65` | Sitewide (layout) |
| 3 | `public/sitemap.xml` shadows `app/sitemap.ts`; file is stale, references dead `/how-it-works`, omits all 56 blog posts and all 136 service+city pages | Sitemap discoverability for ~192 URLs |
| 4 | `public/robots.txt:132` shadows `app/robots.ts`; references dead `/how-it-works` | Crawler hints sitewide |
| 5 | Zero JSON-LD on 11 static pages including homepage | 11 pages |
| 6 | No BlogPosting schema on any blog post | 56 pages |
| 7 | No skip-to-content link in `app/layout.tsx:78-92` | All 228 pages (accessibility, D9) |
| 8 | `twitter.site` and `twitter.creator` not set at `app/layout.tsx:47-52` | All 228 pages |
| 9 | Unverified `sameAs` social URLs in `lib/schema.ts:82-87` and `217-222` | All pages that emit LocalBusiness or Organization |
| 10 | Pricing URL vs. "How It Works" copy mismatch at `app/pricing/page.tsx:7` | 1 page (`/pricing`) plus cross-page internal links |
| 11 | Placeholder license / business numbers in `lib/seo.ts:367-368` | All pages that emit LocalBusiness or Organization |
| 12 | Hardcoded 4-slug blog list in `app/sitemap.ts:29-34` out of sync with 56 actual posts in `shared/blogContent.ts` | Sitemap once duplicate resolved |
| 13 | `lib/seo.ts:225-260` `generateSEOMetadata` helper is defined but not used by static pages (hand-rolled metadata duplicates effort and risks drift) | Maintenance and consistency |
| 14 | Possible near-duplicate blog pairs (slugs 7 vs. 20 and 8 vs. 21 in section E) | 4 blog pages |

---

## H. Approved audit order (proposed)

Repeated here from CONTEXT.md section 8 for ease of reference.

1. Sitewide first pass (layout, sitemap, robots, og-image,
   Organization plus WebSite schema)
2. Homepage `/`
3. `/get-quote`
4. `/pricing` (resolve slug and title)
5. `/savings-calculator`
6. Service detail template plus all 17 service slugs
7. Service+city template plus spot-check across 136 pages
8. Area detail template plus all 8 cities
9. `/services` and `/areas` hub pages
10. `/about`
11. `/contact`
12. `/blog` index
13. Blog post template plus all 56 posts
14. `/privacy-policy`, `/terms-of-service`

Waiting on your answers in CONTEXT.md section 9 before Task #8 starts.
