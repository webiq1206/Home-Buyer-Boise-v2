import { readFileSync, readdirSync, statSync } from "node:fs";
import { resolve, join, extname } from "node:path";
import { writeAuditJson } from "./seo-audit-utils";

const ROOT = process.cwd();
const APP_DIR = resolve(ROOT, "app");
const COMPONENTS_DIR = resolve(ROOT, "components");

interface ImageIssue {
  file: string;
  line?: number;
  issue: string;
  severity: "high" | "medium" | "low";
}

const issues: ImageIssue[] = [];
const scannedFiles: string[] = [];

function walkTsx(dir: string): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) {
      out.push(...walkTsx(full));
    } else if (/\.(tsx|ts|jsx|js)$/.test(entry)) {
      out.push(full);
    }
  }
  return out;
}

function scanFile(filePath: string): void {
  const content = readFileSync(filePath, "utf8");
  const rel = filePath.replace(ROOT + "/", "");
  scannedFiles.push(rel);

  const imageTags = content.matchAll(/<Image[^>]*>/g);
  for (const match of imageTags) {
    const tag = match[0];
    const line = content.substring(0, match.index).split("\n").length;
    if (!/alt=/.test(tag)) {
      issues.push({ file: rel, line, issue: "next/image missing alt attribute", severity: "high" });
    } else if (/alt=["']["']/.test(tag) || /alt=["']\s*["']/.test(tag)) {
      issues.push({ file: rel, line, issue: "next/image has empty alt text", severity: "high" });
    }
    if (!/sizes=/.test(tag) && !/priority/.test(tag)) {
      issues.push({ file: rel, line, issue: "next/image missing sizes prop (non-priority)", severity: "medium" });
    }
  }

  const imgTags = content.matchAll(/<img[^>]*>/gi);
  for (const match of imgTags) {
    const tag = match[0];
    const line = content.substring(0, match.index).split("\n").length;
    if (!/alt=/.test(tag)) {
      issues.push({ file: rel, line, issue: "raw img missing alt attribute", severity: "high" });
    }
  }
}

for (const dir of [APP_DIR, COMPONENTS_DIR, resolve(ROOT, "lib")]) {
  try {
    for (const f of walkTsx(dir)) scanFile(f);
  } catch {
    // directory may not exist
  }
}

const publicAssets = resolve(ROOT, "public");
const assetFiles: Array<{ path: string; sizeKb: number }> = [];
function walkPublic(dir: string, prefix = ""): void {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) {
      walkPublic(full, `${prefix}${entry}/`);
    } else if (/\.(png|jpg|jpeg|gif|webp|svg)$/i.test(entry)) {
      const sizeKb = Math.round(stat.size / 1024);
      assetFiles.push({ path: `${prefix}${entry}`, sizeKb });
      if (sizeKb > 500) {
        issues.push({
          file: `public/${prefix}${entry}`,
          issue: `Large image file (${sizeKb}KB) - consider compression`,
          severity: "medium",
        });
      }
      if (/^img\d|image\d|photo\d|stock/i.test(entry)) {
        issues.push({
          file: `public/${prefix}${entry}`,
          issue: "Generic filename - use descriptive slug",
          severity: "low",
        });
      }
    }
  }
}

try {
  walkPublic(publicAssets);
} catch {
  // public may be sparse
}

const report = {
  generatedAt: new Date().toISOString(),
  filesScanned: scannedFiles.length,
  totalIssues: issues.length,
  high: issues.filter((i) => i.severity === "high").length,
  medium: issues.filter((i) => i.severity === "medium").length,
  low: issues.filter((i) => i.severity === "low").length,
  assetFiles,
  issues,
};

writeAuditJson("image-audit.json", report);

console.log("=== Image Audit ===");
console.log(`Files scanned: ${report.filesScanned}`);
console.log(`Issues: ${report.totalIssues} (high: ${report.high}, medium: ${report.medium})`);

const failOnMissing = process.env.SEO_IMAGE_FAIL === "1";
if (failOnMissing && report.high > 0) {
  console.error("\nFAIL: Missing alt text on images");
  process.exit(1);
}
