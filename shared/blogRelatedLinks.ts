import { BLOG_POSTS, type BlogPostData } from "./blogContent";
import { SERVICES } from "./servicesData";
import { CITIES } from "./contentData";

const SERVICE_TAG_MAP: Record<string, string> = {
  foreclosure: "avoid-foreclosure",
  inherited: "inherited-property",
  probate: "probate-sale",
  divorce: "sell-house-divorce",
  tenant: "problem-tenants",
  landlord: "problem-tenants",
  "sell fast": "sell-house-fast",
  "cash offer": "cash-offer",
  "as-is": "sell-as-is",
  relocation: "relocation-sale",
  downsizing: "downsizing",
  lien: "tax-liens",
};

const CITY_TAG_MAP: Record<string, string> = {
  boise: "boise",
  meridian: "meridian",
  eagle: "eagle",
  kuna: "kuna",
  nampa: "nampa",
  caldwell: "caldwell",
  star: "star",
  middleton: "middleton",
};

export function getDefaultBlogRelatedLinks(post: BlogPostData): string[] {
  const links = new Set<string>(["/get-quote", "/pricing"]);
  const haystack = [
    post.title,
    post.category,
    ...post.tags,
    post.excerpt,
  ]
    .join(" ")
    .toLowerCase();

  for (const [needle, slug] of Object.entries(SERVICE_TAG_MAP)) {
    if (haystack.includes(needle)) {
      links.add(`/services/${slug}`);
      break;
    }
  }

  for (const [needle, slug] of Object.entries(CITY_TAG_MAP)) {
    if (haystack.includes(needle)) {
      links.add(`/areas/${slug}`);
      const serviceSlug =
        Object.entries(SERVICE_TAG_MAP).find(([k]) => haystack.includes(k))?.[1] ??
        "sell-house-fast";
      links.add(`/services/${serviceSlug}/${slug}`);
      break;
    }
  }

  if (links.size <= 2) {
    links.add(`/services/${SERVICES[0].slug}`);
    links.add(`/areas/${CITIES[0].slug}`);
  }

  return Array.from(links).slice(0, 5);
}

export function getBlogPostWithLinks(slug: string): BlogPostData | undefined {
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return undefined;
  if (post.relatedLinks?.length) return post;
  return {
    ...post,
    relatedLinks: getDefaultBlogRelatedLinks(post),
  };
}
