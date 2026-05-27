# Homepage Audit

URL: `/`
Template: `app/page.tsx`

## Defects found

### H1: Missing page-level JSON-LD
- Severity: high
- Symptom: Homepage had metadata only. No `LocalBusiness` (despite being the primary local-intent landing page) and no `WebPage` schema with site-context.
- Fix: rendered `<JsonLd>` near the top of the page body with `generateLocalBusinessSchema()` and `generateWebPageSchema({ name, description, url: "/" })`. Combined with the sitewide `Organization` and `WebSite` from `app/layout.tsx`, the homepage now ships four JSON-LD blocks: Organization, WebSite, LocalBusiness, WebPage.

### H2: Dead link in `howItWorksSteps[1].href`
- Severity: medium
- Symptom: The "Property Evaluation" step in the howItWorksSteps array pointed at `/how-it-works`, which is not a route. Clicking it 404'd. Also leaked into any internal-link surface (sitemap, crawler).
- Fix: retargeted to `/pricing` (the user's chosen canonical for that content).

## Items checked, no change needed
- `title` and `meta description` lengths within Google's display thresholds.
- `canonical` is `https://homebuyerboise.com` (absolute, no trailing slash) - matches site convention.
- Open Graph and Twitter Card metadata inherited from `app/layout.tsx` are correct for the homepage.
- LCP hero image uses `next/image` with `priority` set, descriptive alt, and proper sizing. No change.
- H1 is unique and matches search intent.

## Files touched
- `app/page.tsx`
