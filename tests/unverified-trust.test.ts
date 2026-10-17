import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
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
import { NAV_CITIES } from "../shared/citiesCatalog";
import { NAV_SERVICES, SERVICES as CATALOG_SERVICES } from "../shared/servicesCatalog";
import { GET as getLlms } from "../app/llms.txt/route";
import { GET as getLlmsFull } from "../app/llms-full.txt/route";
import { GET as getTestimonials } from "../app/api/testimonials/route";
import { SERVICE_CONTENT, SERVICES } from "../shared/servicesData";
import { metadata as aboutMetadata } from "../app/about/page";
import { areaHeroOffer, localCashBuyerHeading } from "../lib/areaCopy";

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
  assert.equal(html.includes("Local Boise Company"), false);
  assert.equal(html.includes("Why Trust"), false);
  assert.equal(html.includes("credentials to back up our promises"), false);
  const credentialsSource = readFileSync(path.join(ROOT, "components/TrustBadges.tsx"), "utf8");
  assert.match(credentialsSource, /Local Boise Company/);
  assert.match(credentialsSource, /Why Trust \{BUSINESS_INFO\.name\}\?/);
  assert.match(credentialsSource, /credentials to back up our promises/);
});

test("about title drops Since 2018 and keeps the rest", () => {
  assert.equal(aboutMetadata.title, "About Home Buyer Boise | Local Cash Home Buyers");
  assert.equal(String(aboutMetadata.description).includes("since 2018"), false);
  assert.equal(String(aboutMetadata.description).toLowerCase().includes("trusted"), false);
  assert.match(String(aboutMetadata.description), /Treasure Valley/);
  assert.match(String(aboutMetadata.description), /local cash home buyers/);
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
    "a trusted cash home buying company",
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

test("client components do not import claim-bearing data modules", () => {
  assert.deepEqual(
    NAV_CITIES.map((city) => `${city.slug}:${city.name}`),
    CITIES.map((city) => `${city.slug}:${city.name}`),
  );
  assert.deepEqual(
    CATALOG_SERVICES.map((service) => service.slug),
    SERVICES.map((service) => service.slug),
  );
  assert.deepEqual(
    NAV_SERVICES.map((service) => service.slug),
    SERVICES.map((service) => service.slug),
  );

  const navigation = readFileSync(path.join(ROOT, "components/Navigation.tsx"), "utf8");
  assert.match(navigation, /NAV_SERVICES/);
  assert.equal(navigation.includes("servicesData"), false);

  const testimonials = readFileSync(path.join(ROOT, "components/Testimonials.tsx"), "utf8");
  assert.equal(testimonials.includes("use client"), false);
  assert.equal(testimonials.includes("Michael R."), false);
  assert.match(testimonials, /SHOW_UNVERIFIED_TRUST/);
  assert.match(readFileSync(path.join(ROOT, "shared/fallbackSellerNotes.ts"), "utf8"), /Michael R\./);

  for (const relativePath of [
    "components/Navigation.tsx",
    "components/QuoteForm.tsx",
    "components/ServiceAreaMap.tsx",
    "components/Testimonials.tsx",
    "components/HeroAddressLookup.tsx",
    "components/ContactForm.tsx",
  ]) {
    const source = readFileSync(path.join(ROOT, relativePath), "utf8");
    for (const forbidden of [
      "servicesData",
      "contentData",
      "blogContent",
      "projectsData",
      "since 2018",
      "hundreds of",
      "dozens of",
    ]) {
      assert.equal(source.includes(forbidden), false, `${relativePath} contains ${forbidden}`);
    }
  }
});

test("llms files do not serve unverified trust lines", async () => {
  assert.equal(existsSync(path.join(ROOT, "public/llms.txt")), false);
  assert.equal(existsSync(path.join(ROOT, "public/llms-full.txt")), false);
  const fullRaw = readFileSync(path.join(ROOT, "content/llms-full.txt"), "utf8");
  const plainRaw = readFileSync(path.join(ROOT, "content/llms.txt"), "utf8");
  const servedFull = hideUnverifiedLlms(fullRaw);
  const servedPlain = hideUnverifiedLlms(plainRaw);
  const served = `${servedPlain}\n${servedFull}`;
  assert.equal(await (await getLlms()).text(), servedPlain);
  assert.equal(await (await getLlmsFull()).text(), servedFull);
  const terms = readFileSync(path.join(ROOT, "scripts/hbb-pr6-grep-terms.txt"), "utf8")
    .split("\n")
    .map((line) => line.replace(/\s+$/, ""))
    .filter((line) => line.length > 0);
  for (const term of terms) {
    assert.equal(new RegExp(term).test(served), false, term);
  }
  assert.match(fullRaw, /\$3M E&O/);
  assert.match(fullRaw, /We've purchased homes with severe fire damage/);
  assert.match(plainRaw, /the trusted local cash home buyer/);
  assert.equal(served.includes("We've purchased homes with severe fire damage"), false);
  assert.equal(served.includes("trusted local cash home buyer"), false);
  assert.match(served, /no condition we won't consider/);
  assert.match(served, /experienced local operators/);
  assert.match(served, /the local cash home buyer/);
  const quotePage = readFileSync(path.join(ROOT, "app/get-quote/page.tsx"), "utf8");
  assert.match(quotePage, /Over 500 homes purchased/);
  assert.match(quotePage, /SHOW_UNVERIFIED_TRUST && <li>✓ Over 500 homes purchased<\/li>/);
  assert.match(quotePage, /SHOW_UNVERIFIED_TRUST && <li>✓ Local, family-owned company<\/li>/);
});

test("testimonials API returns an empty list while the flag is off", async () => {
  const response = await getTestimonials(new Request("http://localhost/api/testimonials"));
  assert.deepEqual(await response.json(), []);
});

test("area pages do not render You Can Trust", () => {
  const source = readFileSync(path.join(ROOT, "app/areas/[city]/page.tsx"), "utf8");
  const copy = readFileSync(path.join(ROOT, "lib/areaCopy.ts"), "utf8");
  assert.match(copy, /You Can Trust/);
  assert.match(copy, /Trust us with your/);
  assert.match(source, /\{localCashBuyerHeading\(city\.name\)\}/);
  assert.match(source, /\{areaHeroOffer\(city\.name\)\}/);
  for (const city of CITIES) {
    const html = renderToStaticMarkup(
      createElement(
        "article",
        null,
        createElement("h2", null, localCashBuyerHeading(city.name)),
        createElement("p", null, areaHeroOffer(city.name)),
      ),
    );
    assert.equal(html.includes("You Can Trust"), false, city.slug);
    assert.equal(html.includes(`Trust us with your ${city.name} home`), false, city.slug);
    assert.match(html, new RegExp(`Local ${city.name} Cash Home Buyers</h2>`));
  }
});

test("desktop grids match the visible card count", () => {
  const home = readFileSync(path.join(ROOT, "app/page.tsx"), "utf8");
  const about = readFileSync(path.join(ROOT, "app/about/page.tsx"), "utf8");
  const areas = readFileSync(path.join(ROOT, "app/areas/page.tsx"), "utf8");
  const city = readFileSync(path.join(ROOT, "app/areas/[city]/page.tsx"), "utf8");
  assert.match(home, /grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6/);
  assert.match(home, /lg:grid-cols-4 gap-4 md:gap-6/);
  assert.match(home, /stars-background\.png/);
  assert.match(about, /lg:grid-cols-3 gap-8/);
  assert.match(about, /lg:grid-cols-4 gap-8/);
  assert.match(areas, /lg:grid-cols-5 gap-6/);
  assert.match(city, /md:grid-cols-3 lg:grid-cols-5 gap-6/);
  assert.match(city, /lg:grid-cols-3 gap-6/);
  assert.match(city, /Why \$\{city\.name\} Homeowners Trust Home Buyer Boise/);
  assert.match(city, /Cash Home Buyers in \$\{city\.name\}/);
  const footer = readFileSync(path.join(ROOT, "components/Footer.tsx"), "utf8");
  assert.match(footer, /Trusted Cash Home Buyers Serving the Boise Metro Area/);
  assert.match(footer, /Cash Home Buyers in Boise/);
  const email = readFileSync(path.join(ROOT, "lib/services/email.ts"), "utf8");
  assert.match(email, /Treasure Valley's Most Trusted Cash Home Buyers/);
  assert.match(email, /Treasure Valley's Cash Home Buyers/);
});
