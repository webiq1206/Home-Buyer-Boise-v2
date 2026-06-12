/**
 * Blog remediation: metadata, freshness, related links, intro updates.
 * Run: npx tsx scripts/blog-remediation.ts
 */
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { BLOG_POSTS } from "../shared/blogContent";
import { generateBlogSeoTitle, truncateMetaDescription } from "../lib/seo";
import { getDefaultBlogRelatedLinks } from "../shared/blogRelatedLinks";

const BLOG_FILE = resolve(process.cwd(), "shared/blogContent.ts");
const UPDATE_MARKER = "blog-freshness-2026";

const CATEGORY_INTROS: Record<string, string> = {
  "Selling Fast":
    "Treasure Valley homeowners still face tight timelines in 2026 — job moves, estate deadlines, and equity needs do not wait on a 90-day listing cycle.",
  "Property Issues":
    "In 2026, Boise-area buyers remain picky about condition while repair costs stay elevated — selling as-is to a cash buyer is a practical path when fixes are not realistic.",
  "Legal & Financial":
    "Idaho title, tax, and probate rules have not changed the core fact: liens and legal complexity slow traditional sales — cash buyers who work with local title partners can close cleanly.",
  "Life Situations":
    "Divorce, relocation, and family transitions in the Treasure Valley rarely align with a perfect listing season — flexible closing dates matter as much as price in 2026.",
  "Foreclosure Prevention":
    "Ada and Canyon County foreclosure timelines still move quickly once notices are filed — acting before auction protects credit and preserves equity.",
  "Process & Timing":
    "Boise metro closings in 2026 still average 30–45 days with financed buyers; cash purchases routinely close in 7–21 days when title is clear.",
  "Local Markets":
    "Each Treasure Valley city has its own buyer pool and days-on-market profile in 2026 — local strategy beats a one-size-fits-all listing plan.",
};

function escapeForTs(str: string): string {
  return str.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

function formatRelatedLinks(links: string[]): string {
  if (!links.length) return "";
  const items = links.map((url) => `      "${url}"`).join(",\n");
  return `\n    relatedLinks: [\n${items}\n    ],`;
}

function buildFreshnessBlock(category: string): string {
  const intro = CATEGORY_INTROS[category] ?? CATEGORY_INTROS["Selling Fast"];
  return `<p class="${UPDATE_MARKER}"><strong>Updated June 2026.</strong> ${intro}</p>`;
}

function remediateContent(content: string, category: string): string {
  let updated = content.replace(/\b2025\b/g, "2026");
  if (updated.includes(UPDATE_MARKER)) return updated;
  const block = buildFreshnessBlock(category);
  const match = updated.match(/^\s*<h2>/);
  if (match && match.index !== undefined) {
    return updated.slice(0, match.index) + `\n      ${block}\n\n` + updated.slice(match.index);
  }
  return `\n      ${block}\n${updated}`;
}

function main() {
  let source = readFileSync(BLOG_FILE, "utf8");
  let changes = 0;

  for (const post of BLOG_POSTS) {
    const newSeoTitle = generateBlogSeoTitle(post);
    const newMeta = truncateMetaDescription(post.metaDescription);
    const newContent = remediateContent(post.content, post.category);
    const relatedLinks = post.relatedLinks?.length
      ? post.relatedLinks.map((l) => (typeof l === "string" ? l : l.url))
      : getDefaultBlogRelatedLinks(post);

    const slugPattern = new RegExp(
      `(slug:\\s*"${post.slug}"[\\s\\S]*?seoTitle:\\s*")([^"]*)(")`,
      "m"
    );
    if (!slugPattern.test(source)) {
      console.warn(`Could not find seoTitle for ${post.slug}`);
      continue;
    }
    source = source.replace(slugPattern, `$1${escapeForTs(newSeoTitle)}$3`);

    const descPattern = new RegExp(
      `(slug:\\s*"${post.slug}"[\\s\\S]*?metaDescription:\\s*")([^"]*)(")`,
      "m"
    );
    source = source.replace(descPattern, `$1${escapeForTs(newMeta)}$3`);

    // Title field (display H1) — update year only
    const titlePattern = new RegExp(
      `(slug:\\s*"${post.slug}"[\\s\\S]*?title:\\s*")([^"]*)(")`,
      "m"
    );
    source = source.replace(titlePattern, (_, pre, title, postQuote) => {
      return `${pre}${escapeForTs(title.replace(/\b2025\b/g, "2026"))}${postQuote}`;
    });

    // Content block
    const contentPattern = new RegExp(
      `(slug:\\s*"${post.slug}"[\\s\\S]*?content:\\s*\`)([\\s\\S]*?)(\`,\\s*\\n\\s*faqs:)`,
      "m"
    );
    const escapedContent = newContent.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$\{/g, "\\${");
    source = source.replace(contentPattern, `$1${escapedContent}$3`);

    // relatedLinks — add or replace
    const blockStart = source.search(new RegExp(`slug:\\s*"${post.slug}"`));
    const nextSlug = source.indexOf('slug: "', blockStart + 10);
    const blockEnd = nextSlug > blockStart ? nextSlug : source.length;
    let block = source.slice(blockStart, blockEnd);

    if (block.includes("relatedLinks:")) {
      block = block.replace(/relatedLinks:\s*\[[\s\S]*?\]/, `relatedLinks: [\n${relatedLinks.map((u) => `      "${u}"`).join(",\n")}\n    ]`);
    } else {
      block = block.replace(
        /(publishedAt:\s*"[^"]+",)\n/,
        `$1${formatRelatedLinks(relatedLinks)}\n`
      );
    }
    source = source.slice(0, blockStart) + block + source.slice(blockEnd);

    changes++;
    if (newSeoTitle.length > 60) {
      console.warn(`Title still >60 (${newSeoTitle.length}): ${post.slug}`);
    }
  }

  writeFileSync(BLOG_FILE, source, "utf8");
  console.log(`Blog remediation complete: ${changes} posts updated.`);
}

main();
