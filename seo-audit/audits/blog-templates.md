# Blog Templates Audit

Templates covered:
- `app/blog/page.tsx` (blog index - see `static-pages.md` for the index defect)
- `app/blog/[slug]/page.tsx` (56 blog post pages)

## Defects found on `app/blog/[slug]/page.tsx`

### B1: No `BlogPosting` JSON-LD
- Severity: high
- Symptom: 56 blog posts each had only metadata. No `BlogPosting`, no `headline`, no `datePublished`, no `dateModified`, no `author`, no `publisher` schema. This is the highest-impact omission for an editorial section because `BlogPosting` is the schema Google uses to surface posts in Discover and Top Stories where eligible.
- Fix: added `generateBlogPostingSchema()` to `lib/schema.ts` (type `BlogPosting`, with `headline`, `datePublished`, `dateModified` falling back to `publishedAt`, `author` as `Organization` per user decision, `publisher` referenced by `@id` to the sitewide Organization, `image` defaulting to the og-image, `keywords` from post tags, `articleSection` from post category, `isPartOf` referenced by `@id` to the sitewide WebSite). Emitted on every post.

### B2: No `BreadcrumbList` on blog posts
- Severity: medium
- Symptom: Posts had no structured breadcrumb signal (`Home > Blog > Post title`), so Google could not render breadcrumb rich result on SERP.
- Fix: emitted `BreadcrumbList` with three levels per post.

### B3: `FAQPage` schema missing on posts that have FAQ content
- Severity: medium
- Symptom: 16+ posts have an `faqs` array in `shared/blogContent.ts` rendered as on-page accordions, but no `FAQPage` JSON-LD was generated.
- Fix: when `post.faqs.length > 0`, the page now appends `generateFAQSchema(post.faqs)` so the FAQ content is eligible for FAQ rich result (where Google still serves it).

## Items checked, no change needed
- Each post has a unique `title`, `metaDescription`, and absolute `canonical`.
- Each post has a unique H1 matching the title.
- No em dashes were introduced in any new schema or copy.
- Content already includes inline links to relevant service and area pages - good internal linking.

## Files touched
- `app/blog/[slug]/page.tsx`
- `lib/schema.ts` (`generateBlogPostingSchema` added - also referenced in sitewide.md)
