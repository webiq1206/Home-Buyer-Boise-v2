/**
 * Fail the build when hidden Home Buyer Boise claims ship in client JavaScript.
 * Scans .next/static (the browser bundles). Server RSC output is out of scope.
 *
 * Short tokens only fail when the surrounding text is a claim (reviews, star
 * rating, BBB). That skips React error 189, leaflet keycodes, minified `A+`
 * arithmetic, and SVG path data such as the map-pin "4.993".
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { PROJECTS } from "../shared/projectsData";

const ROOT = path.resolve(__dirname, "..");
const STATIC_DIR = path.join(ROOT, ".next/static");

const PROSE_PHRASES = [
  "since 2018",
  "$3m",
  "e&o",
  "85+",
  "certified real estate investor",
  "cash buyer network",
  "hundreds of",
  "dozens of",
  ...PROJECTS.flatMap((project) =>
    [project.customerName, project.testimonialQuote].filter((value): value is string => Boolean(value)),
  ),
];

const QUOTED_TOKENS: Array<{ label: string; pattern: RegExp; near: RegExp }> = [
  { label: "189", pattern: /(?<!\d)189(?!\d)/g, near: /review|rating|star|customer/i },
  { label: "4.9", pattern: /4\.9(?!\d)/g, near: /star|rating|review/i },
  { label: "BBB", pattern: /BBB/g, near: /accredit|rating|business|A\+/i },
  { label: "A+", pattern: /A\+/g, near: /rating|BBB|accredit/i },
];

function walkJs(dir: string, acc: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    const full = path.join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) walkJs(full, acc);
    else if (entry.endsWith(".js")) acc.push(full);
  }
  return acc;
}

interface Hit {
  file: string;
  label: string;
  context: string;
}

function contextAt(text: string, index: number, length: number): string {
  const start = Math.max(0, index - 70);
  const end = Math.min(text.length, index + length + 70);
  return text.slice(start, end).replace(/\s+/g, " ");
}

function scanFile(file: string): Hit[] {
  const text = readFileSync(file, "utf8");
  const lower = text.toLowerCase();
  const hits: Hit[] = [];
  const rel = path.relative(ROOT, file);

  for (const phrase of PROSE_PHRASES) {
    const needle = phrase.toLowerCase();
    let from = 0;
    while (from < lower.length) {
      const index = lower.indexOf(needle, from);
      if (index === -1) break;
      hits.push({ file: rel, label: phrase, context: contextAt(text, index, phrase.length) });
      from = index + needle.length;
    }
  }

  for (const token of QUOTED_TOKENS) {
    token.pattern.lastIndex = 0;
    let match: RegExpExecArray | null;
    while ((match = token.pattern.exec(text))) {
      const windowText = text.slice(Math.max(0, match.index - 48), match.index + match[0].length + 48);
      if (!token.near.test(windowText)) continue;
      hits.push({
        file: rel,
        label: token.label,
        context: contextAt(text, match.index, match[0].length),
      });
    }
  }

  return hits;
}

function main() {
  if (!statSync(STATIC_DIR, { throwIfNoEntry: false })?.isDirectory()) {
    console.error(`Missing ${STATIC_DIR}. Run next build before this check.`);
    process.exit(1);
  }

  const files = walkJs(STATIC_DIR);
  const hits = files.flatMap(scanFile);
  if (hits.length === 0) {
    console.log(`client trust bundle check: no hidden claims in ${files.length} files under .next/static`);
    return;
  }

  console.error(`client trust bundle check: ${hits.length} hidden claim match(es)`);
  for (const hit of hits) {
    console.error(`\n${hit.file}\n  ${hit.label}\n  ${hit.context}`);
  }
  process.exit(1);
}

main();
