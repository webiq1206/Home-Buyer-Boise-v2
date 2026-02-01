import { MetadataRoute } from "next";
import { getAllCitySlugs } from "@/shared/contentData";
import { getAllServiceSlugs } from "@/shared/servicesData";

const baseUrl = "https://homebuyerboise.com";

// Helper to get clean YYYY-MM-DD date format
const getCleanDate = () => new Date().toISOString().split('T')[0];

export default function sitemap(): MetadataRoute.Sitemap {
  const citySlugs = getAllCitySlugs();
  const serviceSlugs = getAllServiceSlugs();
  const lastModified = getCleanDate();
  
  // Static pages
  const staticPages = [
    "",
    "/about",
    "/contact",
    "/pricing",
    "/get-quote",
    "/blog",
    "/savings-calculator",
    "/privacy-policy",
    "/terms-of-service",
  ];

  // Blog posts (sample - in production, fetch from database)
  const blogSlugs = [
    "how-to-sell-house-fast-boise",
    "cash-offer-vs-traditional-sale",
    "selling-inherited-property-idaho",
    "avoid-foreclosure-boise",
  ];

  const routes: MetadataRoute.Sitemap = [];

  // Add static pages
  for (const page of staticPages) {
    routes.push({
      url: `${baseUrl}${page}`,
      lastModified,
      changeFrequency: page === "" ? "weekly" : "monthly",
      priority: page === "" ? 1 : 0.8,
    });
  }

  // Add area pages
  for (const citySlug of citySlugs) {
    routes.push({
      url: `${baseUrl}/areas/${citySlug}`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    });
  }

  // Add service pages
  for (const serviceSlug of serviceSlugs) {
    routes.push({
      url: `${baseUrl}/services/${serviceSlug}`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    });

    // Add service + city combination pages
    for (const citySlug of citySlugs) {
      routes.push({
        url: `${baseUrl}/services/${serviceSlug}/${citySlug}`,
        lastModified,
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  }

  // Add blog posts
  for (const blogSlug of blogSlugs) {
    routes.push({
      url: `${baseUrl}/blog/${blogSlug}`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }

  return routes;
}
