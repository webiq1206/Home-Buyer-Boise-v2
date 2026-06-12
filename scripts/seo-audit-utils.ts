import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";
import { BLOG_POSTS } from "../shared/blogContent";
import { SERVICES } from "../shared/servicesData";
import { CITIES } from "../shared/contentData";
import { generateServiceCityContent } from "../shared/serviceCityContent";
import { generateBlogSeoTitle, truncateMetaDescription } from "../lib/seo";

export const AUDIT_OUTPUT_DIR = resolve(process.cwd(), "seo-audit/data");

export interface PageAuditRecord {
  url: string;
  type: string;
  title: string;
  metaDescription: string;
  h1: string;
  canonical: string;
  wordCount: number;
  schemaTypes: string[];
  incomingLinks: number;
  outgoingLinks: number;
}

const STOPWORDS = new Set([
  "a", "an", "the", "and", "or", "but", "of", "in", "on", "at", "to", "for",
  "with", "by", "from", "your", "my", "our", "we", "you", "is", "are", "be",
  "as", "it", "this", "that", "how", "what", "why", "when", "where", "can",
  "house", "houses", "home", "homes", "sell", "selling", "sale", "cash", "offer",
  "boise", "idaho", "fast", "buy", "buyer", "buyers",
]);

export function tokenize(text: string): Set<string> {
  const tokens = new Set<string>();
  const words = text
    .toLowerCase()
    .replace(/<[^>]*>/g, " ")
    .replace(/[^a-z0-9\s-]/g, " ")
    .split(/[\s-]+/);
  for (const word of words) {
    if (word.length < 3 || STOPWORDS.has(word)) continue;
    tokens.add(word);
  }
  return tokens;
}

export function jaccardSimilarity(a: Set<string>, b: Set<string>): number {
  if (a.size === 0 && b.size === 0) return 1;
  let intersection = 0;
  for (const t of a) {
    if (b.has(t)) intersection++;
  }
  const union = a.size + b.size - intersection;
  return union === 0 ? 0 : intersection / union;
}

export function ensureAuditDir(): void {
  if (!existsSync(AUDIT_OUTPUT_DIR)) {
    mkdirSync(AUDIT_OUTPUT_DIR, { recursive: true });
  }
}

export function writeAuditJson(filename: string, data: unknown): void {
  ensureAuditDir();
  writeFileSync(
    resolve(AUDIT_OUTPUT_DIR, filename),
    JSON.stringify(data, null, 2),
    "utf8"
  );
}

export function readLinkGraph(): Record<string, { incoming: number; candidates: { url: string }[] }> {
  const path = resolve(process.cwd(), "data/internal-links.json");
  if (!existsSync(path)) return {};
  const graph = JSON.parse(readFileSync(path, "utf8"));
  return graph.pages ?? {};
}

export function enumerateAllPages(): PageAuditRecord[] {
  const pages: PageAuditRecord[] = [];
  const linkGraph = readLinkGraph();

  const staticPages = [
    { url: "/", title: "Home Buyer Boise | Sell Your Boise House Fast for Cash", metaDescription: "", h1: "Sell Your House Fast for Cash", type: "static" },
    { url: "/about", title: "About Home Buyer Boise | Local Cash Home Buyers Since 2018", metaDescription: "", h1: "About Home Buyer Boise", type: "static" },
    { url: "/contact", title: "Contact Home Buyer Boise | Call (208) 405-2275", metaDescription: "", h1: "Contact Us", type: "static" },
    { url: "/get-quote", title: "Get a Free Cash Offer", metaDescription: "", h1: "Get Your Free Cash Offer", type: "tool" },
    { url: "/pricing", title: "Pricing", metaDescription: "", h1: "Pricing", type: "static" },
    { url: "/services", title: "Services", metaDescription: "", h1: "Our Services", type: "static" },
    { url: "/areas", title: "Areas", metaDescription: "", h1: "Areas We Serve", type: "static" },
    { url: "/blog", title: "Blog", metaDescription: "", h1: "Blog", type: "static" },
    { url: "/savings-calculator", title: "Savings Calculator", metaDescription: "", h1: "Savings Calculator", type: "tool" },
    { url: "/privacy-policy", title: "Privacy Policy", metaDescription: "", h1: "Privacy Policy", type: "static" },
    { url: "/terms-of-service", title: "Terms of Service", metaDescription: "", h1: "Terms of Service", type: "static" },
  ];

  for (const p of staticPages) {
    const links = linkGraph[p.url];
    pages.push({
      ...p,
      canonical: `https://homebuyerboise.com${p.url === "/" ? "" : p.url}`,
      wordCount: 0,
      schemaTypes: [],
      incomingLinks: links?.incoming ?? 0,
      outgoingLinks: links?.candidates?.length ?? 0,
    });
  }

  for (const service of SERVICES) {
    const url = `/services/${service.slug}`;
    const links = linkGraph[url];
    pages.push({
      url,
      type: "service",
      title: service.title,
      metaDescription: service.metaDescription,
      h1: service.h1,
      canonical: `https://homebuyerboise.com${url}`,
      wordCount: 0,
      schemaTypes: ["Service", "FAQPage", "BreadcrumbList"],
      incomingLinks: links?.incoming ?? 0,
      outgoingLinks: links?.candidates?.length ?? 0,
    });
  }

  for (const city of CITIES) {
    const url = `/areas/${city.slug}`;
    const links = linkGraph[url];
    pages.push({
      url,
      type: "area",
      title: `Sell Your House Fast in ${city.name}, Idaho`,
      metaDescription: city.extendedDescription?.substring(0, 160) ?? "",
      h1: `Sell Your House Fast in ${city.name}`,
      canonical: `https://homebuyerboise.com${url}`,
      wordCount: 0,
      schemaTypes: ["LocalBusiness", "FAQPage", "BreadcrumbList"],
      incomingLinks: links?.incoming ?? 0,
      outgoingLinks: links?.candidates?.length ?? 0,
    });

    for (const service of SERVICES) {
      const comboUrl = `/services/${service.slug}/${city.slug}`;
      const content = generateServiceCityContent(service.slug, city.slug);
      const links2 = linkGraph[comboUrl];
      const wordCount =
        content.citySpecificIntro.split(/\s+/).length +
        content.cityFaqs.reduce((n, f) => n + f.answer.split(/\s+/).length, 0);
      pages.push({
        url: comboUrl,
        type: "service-city",
        title: content.title,
        metaDescription: content.metaDescription,
        h1: content.h1,
        canonical: content.canonical,
        wordCount,
        schemaTypes: ["Service", "LocalBusiness", "FAQPage", "BreadcrumbList"],
        incomingLinks: links2?.incoming ?? 0,
        outgoingLinks: links2?.candidates?.length ?? 0,
      });
    }
  }

  for (const post of BLOG_POSTS) {
    const url = `/blog/${post.slug}`;
    const links = linkGraph[url];
    const wordCount = (post.content ?? "").replace(/<[^>]*>/g, " ").split(/\s+/).filter(Boolean).length;
    pages.push({
      url,
      type: "blog",
      title: generateBlogSeoTitle(post),
      metaDescription: truncateMetaDescription(post.metaDescription),
      h1: post.title,
      canonical: `https://homebuyerboise.com${url}`,
      wordCount,
      schemaTypes: ["BlogPosting", "BreadcrumbList"],
      incomingLinks: links?.incoming ?? 0,
      outgoingLinks: links?.candidates?.length ?? 0,
    });
  }

  return pages;
}

export function getAllServiceCityCombos(): Array<{ serviceSlug: string; citySlug: string; content: ReturnType<typeof generateServiceCityContent> }> {
  const combos = [];
  for (const service of SERVICES) {
    for (const city of CITIES) {
      combos.push({
        serviceSlug: service.slug,
        citySlug: city.slug,
        content: generateServiceCityContent(service.slug, city.slug),
      });
    }
  }
  return combos;
}
