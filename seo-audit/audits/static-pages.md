# Static Pages Audit (Group)

Pages covered: `/about`, `/contact`, `/get-quote`, `/services`, `/areas`, `/blog`, `/savings-calculator`, `/privacy-policy`, `/terms-of-service`.

These nine pages all shared the same defect class so they are grouped here. The pricing page is in its own report because it required a content rewrite, not just schema injection.

## Defect (all nine pages)

### SP1: Missing per-page JSON-LD (`WebPage` + `BreadcrumbList`)
- Severity: medium-high
- Symptom: Each of these static pages relied only on `Metadata` (title, description, canonical, OG). None emitted page-level structured data, so Google had no breadcrumb signal and no explicit page-type signal for these URLs. Breadcrumbs were also absent from the visual UI but, more importantly, absent from schema where they directly drive SERP breadcrumb rendering.
- Fix: added `<JsonLd>` at the top of each page's return block with:
  - `generateWebPageSchema({ name, description, url, breadcrumbs })` for `WebPage` with embedded breadcrumb list
  - `generateBreadcrumbSchema([...])` for a standalone `BreadcrumbList`
- Additional fix on `/contact`: also emits `generateLocalBusinessSchema()` because this is the primary NAP page and warrants the entity reaffirmation in line with the playbook.

## Items checked, no change needed
- All nine pages already have unique, intent-matched `title` tags within Google's display thresholds.
- All nine have meta descriptions in the 140-170 char band.
- All nine have absolute `canonical` URLs pointing at the correct path on `homebuyerboise.com`.
- All nine have a single, unique H1 that matches the title intent.
- None contain placeholder/lorem text.
- None use em dashes.

## Files touched
- `app/about/page.tsx`
- `app/contact/page.tsx`
- `app/get-quote/page.tsx`
- `app/services/page.tsx`
- `app/areas/page.tsx`
- `app/blog/page.tsx`
- `app/savings-calculator/page.tsx`
- `app/privacy-policy/page.tsx`
- `app/terms-of-service/page.tsx`
