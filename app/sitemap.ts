import { MetadataRoute } from "next";
import { getAllCitySlugs } from "@/shared/contentData";
import { getAllServiceSlugs } from "@/shared/servicesData";
import { getAllBlogSlugs, getBlogPostBySlug } from "@/shared/blogContent";
import { getAllProjectSlugs } from "@/shared/projectsData";
import { getAllAuthorSlugs } from "@/shared/authorsData";

const baseUrl = "https://homebuyerboise.com";

const getCleanDate = () => new Date().toISOString().split("T")[0];

export default function sitemap(): MetadataRoute.Sitemap {
  const citySlugs = getAllCitySlugs();
  const serviceSlugs = getAllServiceSlugs();
  const blogSlugs = getAllBlogSlugs();
  const lastModified = getCleanDate();

  const routes: MetadataRoute.Sitemap = [];

  routes.push({
    url: `${baseUrl}/`,
    lastModified,
    changeFrequency: "weekly",
    priority: 1.0,
  });

  routes.push({
    url: `${baseUrl}/get-quote`,
    lastModified,
    changeFrequency: "weekly",
    priority: 0.95,
  });

  const hubPages: Array<{ path: string; priority: number; freq: "weekly" | "monthly" }> = [
    { path: "/services", priority: 0.9, freq: "weekly" },
    { path: "/areas", priority: 0.9, freq: "weekly" },
    { path: "/savings-calculator", priority: 0.85, freq: "monthly" },
    { path: "/pricing", priority: 0.8, freq: "monthly" },
    { path: "/blog", priority: 0.8, freq: "weekly" },
    { path: "/about", priority: 0.7, freq: "monthly" },
    { path: "/contact", priority: 0.7, freq: "monthly" },
    { path: "/projects", priority: 0.75, freq: "monthly" },
    { path: "/faq", priority: 0.75, freq: "monthly" },
    { path: "/authors", priority: 0.6, freq: "monthly" },
  ];
  for (const p of hubPages) {
    routes.push({
      url: `${baseUrl}${p.path}`,
      lastModified,
      changeFrequency: p.freq,
      priority: p.priority,
    });
  }

  for (const citySlug of citySlugs) {
    routes.push({
      url: `${baseUrl}/areas/${citySlug}`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    });
  }

  for (const serviceSlug of serviceSlugs) {
    routes.push({
      url: `${baseUrl}/services/${serviceSlug}`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.85,
    });

    for (const citySlug of citySlugs) {
      routes.push({
        url: `${baseUrl}/services/${serviceSlug}/${citySlug}`,
        lastModified,
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  }

  for (const slug of getAllAuthorSlugs()) {
    routes.push({
      url: `${baseUrl}/authors/${slug}`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.55,
    });
  }

  for (const slug of getAllProjectSlugs()) {
    routes.push({
      url: `${baseUrl}/projects/${slug}`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.65,
    });
  }

  for (const slug of blogSlugs) {
    const post = getBlogPostBySlug(slug);
    const postDate = post?.publishedAt
      ? post.publishedAt.split("T")[0]
      : lastModified;
    routes.push({
      url: `${baseUrl}/blog/${slug}`,
      lastModified: postDate,
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }

  routes.push(
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms-of-service`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  );

  return routes;
}
