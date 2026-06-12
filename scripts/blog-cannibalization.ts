import { BLOG_POSTS } from "../shared/blogContent";
import { SERVICES } from "../shared/servicesData";
import { CITIES } from "../shared/contentData";
import { jaccardSimilarity, tokenize, writeAuditJson } from "./seo-audit-utils";

interface TargetPage {
  url: string;
  title: string;
  tokens: Set<string>;
}

const targets: TargetPage[] = [];

for (const service of SERVICES) {
  targets.push({
    url: `/services/${service.slug}`,
    title: service.title,
    tokens: tokenize([service.title, service.metaDescription, ...(service.keywords ?? [])].join(" ")),
  });
}

for (const city of CITIES) {
  targets.push({
    url: `/areas/${city.slug}`,
    title: city.name,
    tokens: tokenize([city.name, city.extendedDescription ?? "", city.serviceConsiderations ?? ""].join(" ")),
  });
}

const overlaps: Array<{
  blogSlug: string;
  blogTitle: string;
  targetUrl: string;
  targetTitle: string;
  similarity: number;
  risk: "high" | "medium" | "low";
}> = [];

for (const post of BLOG_POSTS) {
  const postTokens = tokenize([
    post.title,
    post.metaDescription,
    post.excerpt ?? "",
    ...(post.tags ?? []),
  ].join(" "));

  for (const target of targets) {
    const sim = jaccardSimilarity(postTokens, target.tokens);
    if (sim >= 0.25) {
      overlaps.push({
        blogSlug: post.slug,
        blogTitle: post.title,
        targetUrl: target.url,
        targetTitle: target.title,
        similarity: Math.round(sim * 1000) / 1000,
        risk: sim >= 0.5 ? "high" : sim >= 0.35 ? "medium" : "low",
      });
    }
  }
}

const report = {
  generatedAt: new Date().toISOString(),
  totalBlogPosts: BLOG_POSTS.length,
  totalOverlaps: overlaps.length,
  highRisk: overlaps.filter((o) => o.risk === "high").length,
  mediumRisk: overlaps.filter((o) => o.risk === "medium").length,
  overlaps: overlaps.sort((a, b) => b.similarity - a.similarity),
};

writeAuditJson("blog-cannibalization.json", report);

console.log("=== Blog Cannibalization Analysis ===");
console.log(`Blog posts: ${report.totalBlogPosts}`);
console.log(`Overlaps found: ${report.totalOverlaps}`);
console.log(`High risk: ${report.highRisk}`);
console.log(`Medium risk: ${report.mediumRisk}`);
