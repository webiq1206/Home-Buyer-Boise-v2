# Dynamic Templates Audit

Templates covered:
- `app/services/[service]/page.tsx` (15 service detail pages)
- `app/services/[service]/[city]/page.tsx` (120 service-by-city pages)
- `app/areas/[city]/page.tsx` (8 city pages)

## Findings

All three dynamic templates were already shipping the right structured data and metadata at the time of audit:
- `generateMetadata` per slug with unique title, description, canonical, OG, and Twitter card.
- `Service`, `LocalBusiness`, `BreadcrumbList`, and `FAQPage` JSON-LD emitted directly in the page body via `<script type="application/ld+json">` with `dangerouslySetInnerHTML`.
- City pages also emit a city-scoped `LocalBusiness` and an `ItemList` of nearby cities.

No template-level defects were identified that required changes in this pass.

## Sitewide changes that benefit these templates (no template edits required)
- The new dynamic `app/sitemap.ts` now enumerates every URL these templates produce. Previously the static `public/sitemap.xml` listed only a subset.
- The global `Organization` and `WebSite` JSON-LD from `app/layout.tsx` now appears on every dynamic page, augmenting the page-specific schema with the publisher entity.

## Files touched
- None (no template-level edits required).
