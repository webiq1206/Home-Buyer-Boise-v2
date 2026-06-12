import { NextResponse } from "next/server";
import { getAllCitySlugs } from "@/shared/contentData";
import { getAllServiceSlugs, SERVICES } from "@/shared/servicesData";
import { PROJECTS } from "@/shared/projectsData";
import { ORGANIZATION_ENTITY, SERVICE_ENTITIES, LOCATION_ENTITIES } from "@/shared/entityGraph";
import { BUSINESS_INFO } from "@/lib/seo";

export async function GET() {
  const citySlugs = getAllCitySlugs();
  const serviceSlugs = getAllServiceSlugs();
  const baseUrl = "https://homebuyerboise.com";

  const content = `# Home Buyer Boise - LLM Context File
# Last Updated: ${new Date().toISOString().split("T")[0]}

## About This Business
${ORGANIZATION_ENTITY.description}

## Entity Graph Summary
- Organization: ${ORGANIZATION_ENTITY.name} (founded ${ORGANIZATION_ENTITY.founded})
- Services: ${SERVICE_ENTITIES.length} cash home buying situations
- Locations: ${LOCATION_ENTITIES.map((l) => l.name).join(", ")}
- Projects: ${PROJECTS.length} published success stories

## Contact Information
- Phone: ${BUSINESS_INFO.phone}
- Email: ${BUSINESS_INFO.email}
- Address: ${BUSINESS_INFO.address.street}, ${BUSINESS_INFO.address.city}, ${BUSINESS_INFO.address.state} ${BUSINESS_INFO.address.zip}
- Website: ${baseUrl}

## Important Policy
Every cash offer is manually reviewed by a real person. We do NOT publish automated binding offers or instant online purchase contracts.

## Service Areas
${citySlugs.map((slug) => `- ${slug.charAt(0).toUpperCase() + slug.slice(1)}, Idaho (${baseUrl}/areas/${slug})`).join("\n")}

## Services Offered
${SERVICES.map((s) => `- ${s.name} (${baseUrl}/services/${s.slug})`).join("\n")}

## Success Stories
${PROJECTS.map((p) => `- ${p.title} (${baseUrl}/projects/${p.slug})`).join("\n")}

## Key Benefits
- Human-reviewed cash offers (typically within 24 hours of property review)
- Close in as little as 7 days
- No repairs needed - we buy as-is
- No realtor commissions or fees
- We pay all closing costs
- Flexible closing timeline (7-60+ days)

## URL Structure
- Homepage: ${baseUrl}/
- Get Quote: ${baseUrl}/get-quote
- Pricing: ${baseUrl}/pricing
- FAQ: ${baseUrl}/faq
- Projects: ${baseUrl}/projects
- Authors: ${baseUrl}/authors
- Areas: ${baseUrl}/areas/[city]
- Services: ${baseUrl}/services/[service]
- Service+City: ${baseUrl}/services/[service]/[city]
- Blog: ${baseUrl}/blog/[slug]

## Service x City Pages (${serviceSlugs.length * citySlugs.length} combinations)
Example: ${baseUrl}/services/sell-house-fast/boise

## Full Context File
${baseUrl}/llms-full.txt
`;

  return new NextResponse(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
