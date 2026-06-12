import { enumerateAllPages } from "./seo-audit-utils";

const pages = enumerateAllPages();
const errors: string[] = [];
const warnings: string[] = [];

const titleMap = new Map<string, string[]>();
const descMap = new Map<string, string[]>();

for (const page of pages) {
  if (page.title.length > 60) {
    warnings.push(`${page.url}: title ${page.title.length} chars (>${60})`);
  }
  if (page.metaDescription && page.metaDescription.length > 160) {
    warnings.push(`${page.url}: description ${page.metaDescription.length} chars (>${160})`);
  }
  if (!page.title.trim()) errors.push(`${page.url}: missing title`);

  const titles = titleMap.get(page.title) ?? [];
  titles.push(page.url);
  titleMap.set(page.title, titles);

  if (page.metaDescription) {
    const descs = descMap.get(page.metaDescription) ?? [];
    descs.push(page.url);
    descMap.set(page.metaDescription, descs);
  }
}

for (const [title, urls] of titleMap) {
  if (urls.length > 1) errors.push(`Duplicate title "${title}" on ${urls.length} pages`);
}
for (const [desc, urls] of descMap) {
  if (desc && urls.length > 1) errors.push(`Duplicate description on ${urls.length} pages: ${desc.substring(0, 40)}...`);
}

console.log("=== SEO Metadata Check ===");
console.log(`Pages: ${pages.length}`);
console.log(`Errors: ${errors.length}`);
console.log(`Warnings: ${warnings.length}`);

if (errors.length) {
  for (const e of errors.slice(0, 20)) console.error(`  ERROR: ${e}`);
}
if (warnings.length) {
  for (const w of warnings.slice(0, 10)) console.warn(`  WARN: ${w}`);
}

if (process.env.SEO_METADATA_FAIL === "1" && errors.length > 0) {
  process.exit(1);
}
