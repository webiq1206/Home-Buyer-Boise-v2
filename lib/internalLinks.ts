// Internal linking algorithm for Home Buyer Boise.
// Enumerates every linkable page, tokenizes it, scores similarity between
// every pair, and returns deterministic ranked candidates per source page.

import { BLOG_POSTS } from "@/shared/blogContent";
import { SERVICES } from "@/shared/servicesData";
import { CITIES } from "@/shared/contentData";
import { generateServiceCityContent } from "@/shared/serviceCityContent";

export type PageType =
  | "blog"
  | "service"
  | "area"
  | "service-city"
  | "tool"
  | "static";

export interface LinkablePage {
  url: string;
  type: PageType;
  title: string;
  category?: string;
  isMoneyPage: boolean;
  parentService?: string;
  parentCity?: string;
  tokens: Set<string>;
  rawTokens: string[];
  inlineOverrides?: Array<string | { url: string; anchor?: string }>;
}

export interface LinkCandidate {
  url: string;
  title: string;
  type: PageType;
  category?: string;
  score: number;
  anchor: string;
  override?: boolean;
}

export interface SourceLinks {
  url: string;
  title: string;
  type: PageType;
  category?: string;
  isMoneyPage: boolean;
  candidates: LinkCandidate[];
  incoming: number;
}

export interface LinkGraph {
  meta: {
    generatedAt: string;
    totalPages: number;
    totalEdges: number;
  };
  pages: Record<string, SourceLinks>;
  byCategoryTopBlog: Record<string, Array<{ url: string; title: string }>>;
}

// Optional per-source override: map from source URL -> ordered target URLs
// (or { url, anchor } objects). These appear first in the candidate list with
// override=true and are excluded from the algorithmic ranking below them.
export const RELATED_LINK_OVERRIDES: Record<
  string,
  Array<string | { url: string; anchor?: string }>
> = {};

const STOPWORDS = new Set([
  "a", "an", "the", "and", "or", "but", "of", "in", "on", "at", "to", "for",
  "with", "by", "from", "your", "my", "our", "we", "you", "i", "is", "are",
  "be", "as", "it", "this", "that", "these", "those", "how", "what", "why",
  "when", "where", "can", "do", "does", "will", "should", "any", "all", "more",
  "most", "no", "not", "than", "then", "so", "if", "into", "out", "up", "down",
  "about", "after", "before", "over", "under", "between", "during", "while",
  "house", "houses", "home", "homes", "homeowner", "homeowners", "property",
  "properties", "sell", "selling", "sale", "sales", "sold", "buy", "buyer",
  "buyers", "buying", "bought", "cash", "offer", "offers", "fast", "quick",
  "free", "get", "make", "take", "best", "top", "new", "boise", "idaho",
  "metro", "treasure", "valley", "guide", "complete", "ultimate",
]);

function tokenize(...sources: Array<string | string[] | undefined>): string[] {
  const out: string[] = [];
  for (const src of sources) {
    if (!src) continue;
    const items = Array.isArray(src) ? src : [src];
    for (const item of items) {
      const cleaned = item
        .toLowerCase()
        .replace(/<[^>]*>/g, " ")
        .replace(/[^a-z0-9\s-]/g, " ")
        .split(/[\s-]+/);
      for (const word of cleaned) {
        if (word.length < 3) continue;
        if (STOPWORDS.has(word)) continue;
        out.push(word);
      }
    }
  }
  return out;
}

const PRIMARY_CITY_SLUGS = new Set(
  CITIES.filter((c) => c.isPrimary).map((c) => c.slug)
);
// Treat the largest market cities as money pages too, even when not flagged
// isPrimary in the data file.
const MONEY_CITY_SLUGS = new Set<string>([
  ...Array.from(PRIMARY_CITY_SLUGS),
  "boise",
  "meridian",
  "kuna",
]);

const MONEY_STATIC_URLS = new Set(["/get-quote", "/savings-calculator"]);

function buildPages(): LinkablePage[] {
  const pages: LinkablePage[] = [];

  // Blog posts
  for (const post of BLOG_POSTS) {
    const raw = tokenize(post.title, post.tags, post.category, post.excerpt);
    pages.push({
      url: `/blog/${post.slug}`,
      type: "blog",
      title: post.title,
      category: post.category,
      isMoneyPage: false,
      tokens: new Set(raw),
      rawTokens: raw,
      inlineOverrides: post.relatedLinks,
    });
  }

  // Service pages
  for (const service of SERVICES) {
    const raw = tokenize(
      service.h1,
      service.name,
      service.keywords as unknown as string[],
      service.metaDescription
    );
    pages.push({
      url: `/services/${service.slug}`,
      type: "service",
      title: service.h1,
      isMoneyPage: true,
      parentService: service.slug,
      tokens: new Set(raw),
      rawTokens: raw,
      inlineOverrides: (service as { relatedLinks?: LinkablePage["inlineOverrides"] })
        .relatedLinks,
    });
  }

  // Area / city pages
  for (const city of CITIES) {
    const raw = tokenize(
      `Sell Your ${city.name} House Fast for Cash`,
      city.neighborhoods,
      city.landmarks,
      city.localFactors?.commonNeeds
    );
    pages.push({
      url: `/areas/${city.slug}`,
      type: "area",
      title: `Sell Your ${city.name} House Fast for Cash`,
      isMoneyPage: MONEY_CITY_SLUGS.has(city.slug),
      parentCity: city.slug,
      tokens: new Set(raw),
      rawTokens: raw,
      inlineOverrides: city.relatedLinks,
    });
  }

  // Service x City combo pages
  for (const service of SERVICES) {
    for (const city of CITIES) {
      let content;
      try {
        content = generateServiceCityContent(service.slug, city.slug);
      } catch {
        continue;
      }
      const raw = tokenize(
        content.h1,
        content.keywords,
        service.keywords as unknown as string[],
        city.neighborhoods
      );
      pages.push({
        url: `/services/${service.slug}/${city.slug}`,
        type: "service-city",
        title: content.h1,
        isMoneyPage: MONEY_CITY_SLUGS.has(city.slug),
        parentService: service.slug,
        parentCity: city.slug,
        tokens: new Set(raw),
        rawTokens: raw,
      });
    }
  }

  // Tool pages
  pages.push({
    url: "/get-quote",
    type: "tool",
    title: "Get Your Free Cash Offer",
    isMoneyPage: true,
    tokens: new Set(tokenize("Get Your Free Cash Offer quote estimate request")),
    rawTokens: tokenize("Get Your Free Cash Offer quote estimate request"),
  });
  pages.push({
    url: "/savings-calculator",
    type: "tool",
    title: "Cash Offer Savings Calculator",
    isMoneyPage: true,
    tokens: new Set(
      tokenize("Cash Offer Savings Calculator commission fees closing costs")
    ),
    rawTokens: tokenize(
      "Cash Offer Savings Calculator commission fees closing costs"
    ),
  });

  // Static pages
  const staticPages: Array<{ url: string; title: string }> = [
    { url: "/", title: "Home Buyer Boise" },
    { url: "/about", title: "About Home Buyer Boise" },
    { url: "/contact", title: "Contact Home Buyer Boise" },
    { url: "/pricing", title: "How Our Cash Offer Process Works" },
    { url: "/blog", title: "Home Buyer Boise Blog" },
    { url: "/privacy-policy", title: "Privacy Policy" },
    { url: "/terms-of-service", title: "Terms of Service" },
  ];
  for (const p of staticPages) {
    const raw = tokenize(p.title);
    pages.push({
      url: p.url,
      type: "static",
      title: p.title,
      isMoneyPage: false,
      tokens: new Set(raw),
      rawTokens: raw,
    });
  }

  return pages;
}

function score(source: LinkablePage, target: LinkablePage): number {
  if (source.url === target.url) return -Infinity;

  let s = 0;

  // Token overlap (Jaccard-ish, weighted by raw counts on the target side).
  let overlap = 0;
  source.tokens.forEach((tok) => {
    if (target.tokens.has(tok)) overlap += 1;
  });
  s += overlap;

  // Category match for blog<->blog.
  if (
    source.type === "blog" &&
    target.type === "blog" &&
    source.category &&
    source.category === target.category
  ) {
    s += 5;
  }

  // Service-city correspondences.
  if (source.parentService && source.parentService === target.parentService) {
    s += 6;
  }
  if (source.parentCity && source.parentCity === target.parentCity) {
    s += 4;
  }

  // Same-type subtle nudge so service pages link to other services, etc.
  if (source.type === target.type) s += 1;

  // Blog -> service when token overlap exists already gets the overlap;
  // boost a bit so service money pages outrank sibling blog posts when close.
  if (source.type === "blog" && target.type === "service" && overlap > 0) {
    s += 3;
  }
  // Blog -> area when blog mentions city names.
  if (source.type === "blog" && target.type === "area" && overlap > 0) {
    s += 2;
  }

  // Money-page incoming boost (applied to TARGET, not source).
  if (target.isMoneyPage) s += 4;
  if (MONEY_STATIC_URLS.has(target.url)) s += 2;

  // Slight penalty for static legal pages so they don't pollute related lists.
  if (target.type === "static" && (target.url === "/privacy-policy" || target.url === "/terms-of-service")) {
    s -= 10;
  }

  return s;
}

function resolveOverrides(
  source: LinkablePage,
  byUrl: Map<string, LinkablePage>
): LinkCandidate[] {
  const inline = source.inlineOverrides || [];
  const global = RELATED_LINK_OVERRIDES[source.url] || [];
  const merged = [...inline, ...global];
  if (merged.length === 0) return [];
  const out: LinkCandidate[] = [];
  const seen = new Set<string>();
  for (const entry of merged) {
    const url = typeof entry === "string" ? entry : entry.url;
    const anchorOverride = typeof entry === "string" ? undefined : entry.anchor;
    const target = byUrl.get(url);
    if (!target) continue;
    if (seen.has(target.url)) continue;
    seen.add(target.url);
    out.push({
      url: target.url,
      title: target.title,
      type: target.type,
      category: target.category,
      score: Number.POSITIVE_INFINITY,
      anchor: anchorOverride || target.title,
      override: true,
    });
  }
  return out;
}

export function buildLinkGraph(maxCandidates = 10): LinkGraph {
  const pages = buildPages();
  const byUrl = new Map(pages.map((p) => [p.url, p]));
  const pagesOut: Record<string, SourceLinks> = {};
  const incoming = new Map<string, number>();

  for (const source of pages) {
    const overrides = resolveOverrides(source, byUrl);
    const overrideUrls = new Set(overrides.map((o) => o.url));
    const ranked: LinkCandidate[] = [];

    for (const target of pages) {
      if (target.url === source.url) continue;
      if (overrideUrls.has(target.url)) continue;
      const sc = score(source, target);
      if (sc <= 0) continue;
      ranked.push({
        url: target.url,
        title: target.title,
        type: target.type,
        category: target.category,
        score: sc,
        anchor: target.title,
      });
    }

    ranked.sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return a.url.localeCompare(b.url);
    });

    const candidates = [...overrides, ...ranked].slice(0, maxCandidates);

    pagesOut[source.url] = {
      url: source.url,
      title: source.title,
      type: source.type,
      category: source.category,
      isMoneyPage: source.isMoneyPage,
      candidates,
      incoming: 0,
    };

    for (const c of candidates) {
      incoming.set(c.url, (incoming.get(c.url) || 0) + 1);
    }
  }

  let totalEdges = 0;
  for (const page of Object.values(pagesOut)) {
    page.incoming = incoming.get(page.url) || 0;
    totalEdges += page.candidates.length;
  }

  // Top blog posts per category ranked by incoming equity, then title.
  const byCategoryTopBlog: Record<string, Array<{ url: string; title: string }>> = {};
  const blogPages = Object.values(pagesOut).filter((p) => p.type === "blog");
  const categories = Array.from(
    new Set(blogPages.map((p) => p.category).filter(Boolean) as string[])
  ).sort();
  for (const cat of categories) {
    const inCat = blogPages
      .filter((p) => p.category === cat)
      .sort((a, b) => {
        if (b.incoming !== a.incoming) return b.incoming - a.incoming;
        return a.title.localeCompare(b.title);
      })
      .slice(0, 4)
      .map((p) => ({ url: p.url, title: p.title }));
    byCategoryTopBlog[cat] = inCat;
  }

  return {
    meta: {
      generatedAt: new Date(0).toISOString(),
      totalPages: pages.length,
      totalEdges,
    },
    pages: Object.fromEntries(
      Object.keys(pagesOut)
        .sort()
        .map((k) => [k, pagesOut[k]])
    ),
    byCategoryTopBlog,
  };
}
