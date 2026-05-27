import { MetadataRoute } from "next";

const SITE_URL = "https://homebuyerboise.com";

const LLM_USER_AGENTS = [
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  "Claude-Web",
  "ClaudeBot",
  "anthropic-ai",
  "Google-Extended",
  "CCBot",
  "cohere-ai",
  "PerplexityBot",
  "FacebookBot",
  "Applebot-Extended",
  "Bytespider",
];

export default function robots(): MetadataRoute.Robots {
  const sharedDisallow = ["/api/", "/admin/"];

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: sharedDisallow,
      },
      ...LLM_USER_AGENTS.map((agent) => ({
        userAgent: agent,
        allow: "/",
        disallow: sharedDisallow,
      })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
