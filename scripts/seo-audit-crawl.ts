import { enumerateAllPages, writeAuditJson } from "./seo-audit-utils";

const pages = enumerateAllPages();

const summary = {
  generatedAt: new Date().toISOString(),
  totalPages: pages.length,
  byType: {} as Record<string, number>,
  duplicateTitles: [] as string[],
  duplicateDescriptions: [] as string[],
};

const titleMap = new Map<string, string[]>();
const descMap = new Map<string, string[]>();

for (const page of pages) {
  summary.byType[page.type] = (summary.byType[page.type] ?? 0) + 1;

  const titles = titleMap.get(page.title) ?? [];
  titles.push(page.url);
  titleMap.set(page.title, titles);

  const descs = descMap.get(page.metaDescription) ?? [];
  descs.push(page.url);
  descMap.set(page.metaDescription, descs);
}

for (const [title, urls] of titleMap) {
  if (urls.length > 1) summary.duplicateTitles.push(`${title} (${urls.length} pages)`);
}
for (const [desc, urls] of descMap) {
  if (desc && urls.length > 1) summary.duplicateDescriptions.push(`${desc.substring(0, 60)}... (${urls.length} pages)`);
}

writeAuditJson("crawl-inventory.json", { summary, pages });

console.log("=== SEO Crawl Inventory ===");
console.log(`Total pages: ${summary.totalPages}`);
console.log(`By type:`, summary.byType);
console.log(`Duplicate titles: ${summary.duplicateTitles.length}`);
console.log(`Duplicate descriptions: ${summary.duplicateDescriptions.length}`);
console.log(`Output: seo-audit/data/crawl-inventory.json`);
