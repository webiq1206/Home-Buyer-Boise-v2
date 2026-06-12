/**
 * Inject 2026 freshness intros into blog post content blocks.
 * Run: npx tsx scripts/blog-content-freshness.ts
 */
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { BLOG_POSTS } from "../shared/blogContent";

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

function buildBlock(category: string): string {
  const intro = CATEGORY_INTROS[category] ?? CATEGORY_INTROS["Selling Fast"];
  return `<p class="${UPDATE_MARKER}"><strong>Updated June 2026.</strong> ${intro}</p>`;
}

function remediateContent(content: string, category: string): string {
  let updated = content.replace(/\b2025\b/g, "2026");
  if (updated.includes(UPDATE_MARKER)) return updated;
  const block = buildBlock(category);
  const h2 = updated.search(/<h2>/);
  if (h2 >= 0) {
    return updated.slice(0, h2) + `\n      ${block}\n\n      ` + updated.slice(h2);
  }
  return `\n      ${block}\n${updated}`;
}

function main() {
  let source = readFileSync(BLOG_FILE, "utf8");
  let updated = 0;

  for (const post of BLOG_POSTS) {
    const pattern = new RegExp(
      `(slug:\\s*"${post.slug}"[\\s\\S]*?content:\\s*\`)([\\s\\S]*?)(\`,\\s*\\n\\s*faqs:)`,
      "m"
    );
    if (!pattern.test(source)) {
      console.warn(`Skip content: ${post.slug}`);
      continue;
    }
    source = source.replace(pattern, (_, pre, body, postFix) => {
      const newBody = remediateContent(body, post.category);
      if (newBody !== body) updated++;
      const escaped = newBody.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$\{/g, "\\${");
      return `${pre}${escaped}${postFix}`;
    });
  }

  writeFileSync(BLOG_FILE, source, "utf8");
  console.log(`Content freshness: ${updated} posts updated.`);
}

main();
