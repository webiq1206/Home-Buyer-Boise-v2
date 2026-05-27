# Pricing Page Audit

URL: `/pricing`
Template: `app/pricing/page.tsx`

## Defects found

### P1: Page copy did not match URL intent
- Severity: high
- Symptom: The URL is `/pricing` but the page rendered as a 3-step "How It Works" walkthrough. Title was "How It Works", H1 was "How It Works", and there was no explicit pricing content. Users arriving from a search for "home buyer boise pricing" or "cost to sell house to investor" saw process content instead of cost content. Schema markup, title, and on-page H1 were all misaligned with the URL slug.
- Fix: rewrote the page end-to-end with pricing as the primary topic.
  - `title`: "Pricing: What It Costs to Sell Your House to Home Buyer Boise"
  - `meta description`: explicit "no fees, no commissions, no closing costs" framing
  - H1: "Our Pricing"
  - Hero copy: states selling is free and lists what we cover
  - Three cost-breakdown cards: "Our Fee $0", "Closing Costs $0", "Repairs $0"
  - "What Is Included" checklist (10 items)
  - Cash sale vs traditional listing side-by-side comparison with concrete line items
  - Pricing disclaimer reiterating the no-automated-offer rule (the cash offer is reviewed and presented by a real person, no automated estimates)
  - CTA to `/get-quote`

### P2: No JSON-LD on `/pricing`
- Severity: medium
- Fix: emitted `WebPage` (with breadcrumbs), `BreadcrumbList`, and `FAQPage` (5 pricing-specific FAQs covering cost, closing, repairs, hidden fees, and traditional comparison).

## Constraints respected
- No automated offer language anywhere on the page. The disclaimer is explicit.
- No em dashes used in any of the new copy.
- Existing offer-calculator, email flow, forms, and API routes were not touched.

## Files touched
- `app/pricing/page.tsx` (rewritten)

## Note
A `/how-it-works -> /pricing` 301 redirect was added in `next.config.js` (see sitewide audit) so any pre-existing inbound link to the retired URL lands here.
