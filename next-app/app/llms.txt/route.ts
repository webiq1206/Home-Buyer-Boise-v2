import { NextResponse } from "next/server";
import { getAllCitySlugs } from "@/shared/contentData";
import { getAllServiceSlugs } from "@/shared/servicesData";

export async function GET() {
  const citySlugs = getAllCitySlugs();
  const serviceSlugs = getAllServiceSlugs();
  const baseUrl = "https://homebuyerboise.com";

  const content = `# Home Buyer Boise - LLM Context File
# Last Updated: ${new Date().toISOString().split('T')[0]}

## About This Business
Home Buyer Boise is a cash home buying company serving the Treasure Valley in Idaho. We purchase residential properties for cash, allowing homeowners to sell quickly without repairs, fees, or traditional listing hassles.

## Contact Information
- Phone: (208) 405-2275
- Email: connect@buymyhouse.co
- Address: 3024 W Fairview Ave, Boise, ID 83702
- Website: ${baseUrl}

## Service Areas
We serve homeowners throughout the Treasure Valley including:
${citySlugs.map(slug => `- ${slug.charAt(0).toUpperCase() + slug.slice(1)}, Idaho`).join('\n')}

## Services Offered
${serviceSlugs.map(slug => `- ${slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}`).join('\n')}

## Key Benefits
- Cash offers within 24 hours
- Close in as little as 7 days
- No repairs needed - we buy as-is
- No realtor commissions or fees
- We pay all closing costs
- Flexible closing timeline (7-60+ days)

## How It Works
1. Contact us with your property details
2. Receive a fair, no-obligation cash offer within 24 hours
3. Accept and choose your closing date
4. Close and get paid - we handle all paperwork

## Target Audience
- Homeowners who need to sell fast
- People facing foreclosure
- Inherited property sellers
- Divorce situations
- Landlords with problem tenants
- Homeowners with properties needing major repairs
- People relocating for work

## URL Structure
- Homepage: ${baseUrl}/
- About: ${baseUrl}/about
- Contact: ${baseUrl}/contact
- Get Quote: ${baseUrl}/get-quote
- Areas: ${baseUrl}/areas/[city]
- Services: ${baseUrl}/services/[service]
- Service+City: ${baseUrl}/services/[service]/[city]
- Blog: ${baseUrl}/blog/[slug]

## Full Context File
For complete information, see: ${baseUrl}/llms-full.txt
`;

  return new NextResponse(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
