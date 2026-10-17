import assert from "node:assert/strict";
import { readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import { createElement } from "react";
import {
  CompanyCredentials,
  ReviewHighlight,
  TrustBadges,
  TrustStats,
} from "../components/TrustBadges";
import { hideUnverifiedLlms } from "../lib/llmsTrust";
import {
  generateArticleSchema,
  generateBlogPostingSchema,
  generateBreadcrumbSchema,
  generateFAQSchema,
  generateItemListSchema,
  generateLocalBusinessSchema,
  generateOrganizationSchema,
  generatePersonSchema,
  generateReviewSchema,
  generateServiceSchema,
  generateWebPageSchema,
  generateWebSiteSchema,
} from "../lib/schema";
import { generateMetaDescription } from "../lib/seo";
import { AUTHORS } from "../shared/authorsData";
import { BLOG_POSTS } from "../shared/blogContent";
import { CITIES } from "../shared/contentData";
import { ORGANIZATION_ENTITY } from "../shared/entityGraph";
import { getSitewideFaqs } from "../shared/faqData";
import { generateServiceCityContent } from "../shared/serviceCityContent";
import { SERVICE_CONTENT, SERVICES } from "../shared/servicesData";
import { metadata as aboutMetadata } from "../app/about/page";

const ROOT = path.resolve(__dirname, "..");

const SCHEMA_SAMPLES = [
  generateLocalBusinessSchema(),
  generateLocalBusinessSchema("Boise"),
  generateLocalBusinessSchema("Meridian"),
  generateOrganizationSchema(),
  generateServiceSchema("Sell House Fast", "Cash offer", "Boise"),
  generateFAQSchema([{ question: "How fast?", answer: "Seven days." }]),
  generateWebPageSchema({ name: "About", description: "Local buyers", url: "/about" }),
  generateWebSiteSchema(),
  generateBreadcrumbSchema([{ name: "Home", url: "/" }]),
  generateArticleSchema({
    title: "Guide",
    description: "A guide",
    url: "/blog/guide",
    datePublished: "2026-01-01",
  }),
  generateBlogPostingSchema({
    title: "Guide",
    description: "A guide",
    slug: "guide",
    datePublished: "2026-01-01",
  }),
  generatePersonSchema({
    name: "Home Buyer Boise Team",
    jobTitle: "Cash Home Buying Specialists",
    description: AUTHORS[0].bio,
    url: "/authors/home-buyer-boise-team",
  }),
  generateItemListSchema({ name: "Projects", items: [{ name: "A sale", url: "/projects/a" }] }),
  generateReviewSchema([
    { author: "Pat", rating: 5, text: "Helpful", date: "2026-01-01" },
  ]),
];

function walkFiles(dir: string, out: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    if (entry === "node_modules" || entry === ".next" || entry === "tests") continue;
    const full = path.join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) walkFiles(full, out);
    else if (/\.(ts|tsx)$/.test(entry)) out.push(full);
  }
  return out;
}

test("generateReviewSchema emits nothing", () => {
  assert.equal(
    generateReviewSchema([{ author: "Pat", rating: 5, text: "Helpful", date: "2026-01-01" }]),
    null,
  );
});

test("no schema generator emits aggregateRating or Review markup", () => {
  const json = JSON.stringify(SCHEMA_SAMPLES);
  assert.equal(json.includes("aggregateRating"), false);
  assert.equal(json.includes("AggregateRating"), false);
  assert.equal(json.includes("ratingValue"), false);
  assert.equal(json.includes("reviewCount"), false);
  assert.equal(json.includes('"@type":"Review"'), false);
  assert.equal(json.includes("legalName"), false);
  assert.equal(json.includes("foundingDate"), false);
  assert.equal(/since 2018/i.test(json), false);
  assert.equal(json.includes("4.9"), false);
  assert.equal(json.includes("Licensed"), false);
});

test("page and component source does not build rating or review schema", () => {
  const roots = ["app", "components", "lib", "shared"].map((dir) => path.join(ROOT, dir));
  const hits: string[] = [];
  for (const root of roots) {
    for (const file of walkFiles(root)) {
      const text = readFileSync(file, "utf8");
      if (
        text.includes("aggregateRating") ||
        text.includes("AggregateRating") ||
        text.includes("'@type': 'Review'") ||
        text.includes('"@type": "Review"') ||
        text.includes('"@type":"Review"')
      ) {
        hits.push(path.relative(ROOT, file));
      }
    }
  }
  assert.deepEqual(hits, []);
});

test("trust badges, stats, and review highlight render nothing", () => {
  const html = [
    renderToStaticMarkup(createElement(TrustBadges)),
    renderToStaticMarkup(createElement(TrustBadges, { variant: "hero" })),
    renderToStaticMarkup(createElement(TrustBadges, { variant: "compact" })),
    renderToStaticMarkup(createElement(TrustStats)),
    renderToStaticMarkup(createElement(ReviewHighlight)),
    renderToStaticMarkup(createElement(CompanyCredentials)),
  ].join("\n").replace(/<[^>]+>/g, " ");

  for (const phrase of [
    "4.9",
    "189",
    "BBB",
    "Better Business Bureau",
    "Licensed & Insured",
    "ID Licensed",
    "Since 2018",
    "since 2018",
    "Sales/Year",
    "Transactions/Year",
    "$3M",
    "Certified Real Estate Investor",
    "Cash Buyer Network",
    "Trusted by Treasure Valley Homeowners",
    "Real numbers from real transactions",
    "out of 5",
  ]) {
    assert.equal(html.includes(phrase), false, phrase);
  }
  assert.match(html, /Local Boise Company/);
});

test("about title drops Since 2018 and keeps the rest", () => {
  assert.equal(aboutMetadata.title, "About Home Buyer Boise | Local Cash Home Buyers");
  assert.equal(String(aboutMetadata.description).includes("since 2018"), false);
  assert.match(String(aboutMetadata.description), /Treasure Valley/);
});

test("rendered copy omits unverified trust phrases", () => {
  const chunks: string[] = [
    ORGANIZATION_ENTITY.description,
    ORGANIZATION_ENTITY.trustSignals.join("\n"),
    AUTHORS.map((author) => `${author.bio} ${(author.credentials ?? []).join(" ")}`).join("\n"),
    getSitewideFaqs().map((faq) => `${faq.question} ${faq.answer}`).join("\n"),
    CITIES.map((city) => city.extendedDescription ?? "").join("\n"),
    Object.values(SERVICE_CONTENT)
      .map((content) =>
        [
          content.intro,
          ...(content.whyChoose ?? []),
          ...(content.faqs ?? []).map((faq) => `${faq.question} ${faq.answer}`),
        ].join("\n"),
      )
      .join("\n"),
    BLOG_POSTS.map((post) => `${post.content}\n${JSON.stringify(post.faqs)}`).join("\n"),
    generateMetaDescription({ serviceName: "Sell House Fast", serviceSlug: "sell-house-fast", city: "Boise" }),
    generateMetaDescription({ serviceName: "Sell House Fast", serviceSlug: "sell-house-fast" }),
  ];

  for (const service of SERVICES) {
    for (const city of CITIES) {
      const content = generateServiceCityContent(service.slug, city.slug);
      chunks.push(
        [
          content.citySpecificIntro,
          content.localProcessNotes,
          content.whyChooseLocal.join("\n"),
          content.heroSubtitle,
          content.cityFaqs.map((faq) => `${faq.question} ${faq.answer}`).join("\n"),
        ].join("\n"),
      );
    }
  }

  const rendered = chunks.join("\n");
  for (const phrase of [
    "since 2018",
    "Since 2018",
    "4.9",
    "189 reviews",
    "189+",
    "BBB A+",
    "Better Business Bureau accredited",
    "$3M",
    "Licensed & Insured",
    "licensed Idaho LLC",
    "Fully licensed",
    "Certified Real Estate Investor",
    "Cash Buyer Network",
    "hundreds of families",
    "hundreds of homeowners",
    "renovated hundreds",
    "dozens of homes throughout Meridian",
    "dozens of Boise homeowners",
    "numerous properties",
    "many families in foreclosure",
    "many homeowners in tax-troubled",
    "many neighbors have sold to us",
    "closed dozens",
    "verifiable track records",
    "We've purchased homes in every condition",
    "We've helped homeowners sell even after",
    "We've closed in as little as 5 days",
    "fastest you've ever closed",
    "We've seen every level",
    "We've seen every type",
    "We've built our business buying",
    "We've purchased properties throughout Kuna",
    "We've helped Boise homeowners relocate",
    "we've worked with many estate sales",
    "we've purchased many homes",
    "we've helped many",
    "Proven track record in",
  ]) {
    assert.equal(rendered.toLowerCase().includes(phrase.toLowerCase()), false, phrase);
  }
  assert.match(rendered, /Check Better Business Bureau ratings/);
  assert.match(rendered, /licensed title compan/i);
  assert.match(rendered, /many homeowners prefer/i);
});

test("llms files do not serve unverified trust lines", () => {
  const full = hideUnverifiedLlms(readFileSync(path.join(ROOT, "public/llms-full.txt"), "utf8"));
  const plain = hideUnverifiedLlms(readFileSync(path.join(ROOT, "public/llms.txt"), "utf8"));
  const served = `${full}\n${plain}`;
  for (const phrase of [
    "$3M",
    "189",
    "4.9",
    "Better Business Bureau",
    "Licensed Idaho real estate investors",
    "85+",
    "85 plus",
    "Founded 2018",
    "Insured and experienced",
  ]) {
    assert.equal(served.includes(phrase), false, phrase);
  }
  assert.match(readFileSync(path.join(ROOT, "public/llms-full.txt"), "utf8"), /\$3M E&O/);
  assert.match(readFileSync(path.join(ROOT, "public/llms-full.txt"), "utf8"), /We've purchased homes with severe fire damage/);
  assert.equal(served.includes("We've purchased homes with severe fire damage"), false);
  assert.match(served, /no condition we won't consider/);
  assert.match(served, /experienced local operators/);
  const quotePage = readFileSync(path.join(ROOT, "app/get-quote/page.tsx"), "utf8");
  assert.match(quotePage, /Over 500 homes purchased/);
  assert.match(quotePage, /SHOW_UNVERIFIED_TRUST && <li>✓ Over 500 homes purchased<\/li>/);
});
