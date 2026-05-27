# Internal Linking System

The site computes a deterministic internal link graph at build time and
serves it from `data/internal-links.json`. Every page renders a Related
Resources block that pulls from this graph, the footer surfaces the top
articles per blog category from the same data, and a CI audit fails the
build when any candidate URL no longer resolves.

## Commands

```bash
npm run links:build   # regenerate data/internal-links.json
npm run links:audit   # report orphans / weak equity / fail on broken links
npm run build         # prebuild hook runs links:build then links:audit
```

## Page inventory

The generator (`lib/internalLinks.ts`) enumerates:

- **Blog posts** — every entry in `shared/blogContent.ts` (`/blog/<slug>`).
- **Service pages** — every entry in `shared/servicesData.ts`
  (`/services/<slug>`).
- **Area / city pages** — every entry in `CITIES` from
  `shared/contentData.ts` (`/areas/<slug>`).
- **Service x City combo pages** — every (service, city) pair, generated
  from `shared/serviceCityContent.ts` (`/services/<service>/<city>`).
- **Tools** — `/get-quote` and `/savings-calculator`.
- **Static pages** — `/`, `/about`, `/contact`, `/pricing`, `/blog`,
  `/privacy-policy`, `/terms-of-service`.

## Scoring formula

For a source page S and candidate page T, the score is:

| Factor | Weight |
| --- | --- |
| Token overlap between S and T (title + tags + keywords + neighborhoods + category, stopwords removed) | +1 per shared token |
| Blog -> Blog same category | +5 |
| Same parent service slug | +6 |
| Same parent city slug | +4 |
| Same page type | +1 |
| Blog -> Service with token overlap | +3 |
| Blog -> Area with token overlap | +2 |
| Money-page boost on target | +4 |
| Tool boost on target (`/get-quote`, `/savings-calculator`) | +2 |
| Target is legal static page (`/privacy-policy`, `/terms-of-service`) | -10 |

Money pages are: every service page, `/get-quote`, `/savings-calculator`,
`/areas/boise`, `/areas/meridian`, `/areas/kuna`. The boost is applied to
incoming candidacy so these pages accumulate equity from every relevant
source on the site.

Candidates with score <= 0 are dropped. Remaining candidates are sorted
by descending score then by URL (deterministic). The top 10 are stored
per source.

## Anchor text

The anchor text defaults to the target page's H1 / title. Generic
phrases like "click here" or "read more" are never used as anchors — the
"Read more" sub-link in `components/RelatedContent.tsx` is paired with
the descriptive heading link above it and exists only as a visual cue.

## Per-source overrides

`RELATED_LINK_OVERRIDES` in `lib/internalLinks.ts` lets a maintainer
pin specific outgoing links for any source URL. Overrides are placed at
the top of the candidate list, marked `override: true`, and shift the
algorithmic candidates down. Each entry may be a plain target URL or
`{ url, anchor }` to override the anchor text as well.

Example:

```ts
export const RELATED_LINK_OVERRIDES = {
  "/blog/sell-my-house-fast-boise-complete-guide": [
    "/services/sell-house-fast",
    { url: "/get-quote", anchor: "Request a free 24-hour cash offer" },
  ],
};
```

## Audit thresholds

`scripts/audit-internal-links.ts` reports:

- **Broken** — a candidate URL that is not in the page inventory.
  Exits 1 (fails the build).
- **Orphans** — pages with zero incoming internal links.
- **Weak equity** — pages with fewer than 2 incoming links or fewer
  than 3 outgoing candidates. Logged for visibility, not fatal.

## Where the data is consumed

- `components/RelatedContent.tsx` reads `data/internal-links.json` and
  renders the Related Resources block. Wired into the blog post page
  (3 cards), service page (5 cards), area page (5 cards), and
  service-city combo page (5 cards).
- `components/Footer.tsx` reads `byCategoryTopBlog` and renders a
  Popular Articles column with the top 4 posts per blog category,
  ranked by incoming link equity.

## Regenerating after content changes

Any time blog posts, services, or cities change, run `npm run links:build`
(or just `npm run build`, which runs it via the `prebuild` hook).
The JSON is committed so the build is reproducible without re-running
the generator.
