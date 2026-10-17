/**
 * Fail the build when hidden Home Buyer Boise claims ship in client JavaScript.
 * Scans every .js file under .next/static with scripts/hbb-pr6-grep-terms.txt.
 *
 * Next, React, webpack, Leaflet, and Radix ship a few identifiers that match
 * those terms but are not claims. Those exact library fingerprints are masked
 * before the scan. Every other hit fails the build.
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";

const ROOT = path.resolve(__dirname, "..");
const STATIC_DIR = path.join(ROOT, ".next/static");
const TERMS_FILE = path.join(ROOT, "scripts/hbb-pr6-grep-terms.txt");

const LIBRARY_FINGERPRINTS = [
  "trustedTypes",
  "__unsafeCreateTrustedScriptURL",
  "isTrusted",
  "zoomOut:[189",
  "E-A+y.offsetTop",
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

function maskLibraryFingerprints(text: string): string {
  let out = text;
  for (const fingerprint of LIBRARY_FINGERPRINTS) {
    out = out.split(fingerprint).join(" ".repeat(fingerprint.length));
  }
  return out.replace(/Error\([A-Za-z]\(189\)\)/g, (match) => " ".repeat(match.length));
}

function loadTerms(): RegExp[] {
  return readFileSync(TERMS_FILE, "utf8")
    .split("\n")
    .map((line) => line.replace(/\s+$/, ""))
    .filter((line) => line.length > 0)
    .map((line) => new RegExp(line, "g"));
}

interface Hit {
  file: string;
  term: string;
  context: string;
}

function contextAt(text: string, index: number, length: number): string {
  const start = Math.max(0, index - 60);
  const end = Math.min(text.length, index + length + 60);
  return text.slice(start, end).replace(/\s+/g, " ");
}

function scan(text: string, terms: RegExp[], file: string): Hit[] {
  const hits: Hit[] = [];
  for (const term of terms) {
    term.lastIndex = 0;
    let match: RegExpExecArray | null;
    while ((match = term.exec(text))) {
      hits.push({
        file,
        term: term.source,
        context: contextAt(text, match.index, match[0].length),
      });
      if (match[0].length === 0) term.lastIndex += 1;
    }
  }
  return hits;
}

function main() {
  const terms = loadTerms();
  const files = walkJs(STATIC_DIR);
  const claimHits: Hit[] = [];
  let libraryHits = 0;

  for (const file of files) {
    const raw = readFileSync(file, "utf8");
    const rel = path.relative(ROOT, file);
    const rawHits = scan(raw, terms, rel);
    const maskedHits = scan(maskLibraryFingerprints(raw), terms, rel);
    libraryHits += rawHits.length - maskedHits.length;
    claimHits.push(...maskedHits);
  }

  console.log(
    `client trust bundle check: ${files.length} files, ${terms.length} terms, ${libraryHits} library-fingerprint hits ignored`,
  );

  if (claimHits.length > 0) {
    for (const hit of claimHits) {
      console.error(`${hit.file}: /${hit.term}/ ${hit.context}`);
    }
    console.error(`client trust bundle check: ${claimHits.length} claim hits`);
    process.exit(1);
  }

  console.log("client trust bundle check: no claim hits in .next/static");
}

main();
