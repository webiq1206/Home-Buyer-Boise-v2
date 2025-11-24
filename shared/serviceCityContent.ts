import { SERVICES } from './servicesData';
import { CITIES } from './contentData';

export interface ServiceCityContent {
  serviceSlug: string;
  citySlug: string;
  title: string; // SEO title
  metaDescription: string;
  h1: string;
  introText: string; // City-specific intro paragraph
  localKeywords: string[];
}

/**
 * Generates unique SEO title for service+city combination
 */
function generateTitle(serviceName: string, cityName: string): string {
  // Remove redundant words and create concise titles
  const cleanServiceName = serviceName
    .replace(/Sell Your /gi, '')
    .replace(/Get a /gi, '')
    .replace(/ Sale$/gi, '')
    .replace(/ Property$/gi, '');
    
  return `${cleanServiceName} ${cityName}, Idaho | HomeBuyerBoise`;
}

/**
 * Generates unique meta description for service+city combination
 */
function generateMetaDescription(service: any, cityName: string, cityData: any): string {
  const population = cityData.population || '';
  const county = cityData.county === 'ada' ? 'Ada County' : 'Canyon County';
  
  // Extract first sentence from service meta description
  const baseDescription = service.metaDescription.split('.')[0];
  
  return `${baseDescription} in ${cityName}, Idaho (${county}). Serving all ${cityName} neighborhoods with fair cash offers and fast closings. Call (208) 405-CASH.`;
}

/**
 * Generates unique H1 heading for service+city combination
 */
function generateH1(serviceH1: string, cityName: string): string {
  // Replace generic location terms with specific city
  return serviceH1
    .replace(/Boise Metro|Treasure Valley|Boise/gi, cityName)
    .replace(/the Area/gi, cityName);
}

/**
 * Generates city-specific intro paragraph
 */
function generateIntroText(service: any, cityName: string, cityData: any): string {
  const landmarks = cityData.landmarks?.slice(0, 2).join(' and ') || `${cityName} area`;
  const neighborhoods = cityData.neighborhoods?.slice(0, 3).join(', ') || 'local neighborhoods';
  const population = cityData.population || 'residents';
  
  // Create situation-aware intro
  const situations = {
    'sell-house-divorce': `Going through a divorce in ${cityName}? We understand how emotional and complex property settlements can be. HomeBuyerBoise provides confidential, professional home buying services throughout ${cityName}, from ${neighborhoods}. We've helped dozens of ${cityName} couples sell their homes quickly and fairly during divorce proceedings, allowing both parties to move forward with their lives.`,
    
    'inherited-property': `Inherited a property in ${cityName}? Many ${cityName} families face the challenge of managing inherited homes, especially in established neighborhoods near ${landmarks}. Whether the property needs extensive repairs, probate is still pending, or you simply want to avoid the hassle of traditional listings, HomeBuyerBoise provides fast cash offers for inherited homes throughout ${cityName}.`,
    
    'avoid-foreclosure': `Facing foreclosure in ${cityName}? You're not alone - many ${cityName} homeowners struggle with mortgage payments due to job loss, medical bills, or unexpected expenses. HomeBuyerBoise has helped hundreds of ${cityName} families avoid foreclosure by purchasing their homes quickly, paying off the mortgage, and helping them avoid credit damage. We serve all ${cityName} neighborhoods and can close in as little as 7 days.`,
    
    'problem-tenants': `Dealing with problem tenants in your ${cityName} rental property? We buy rental properties throughout ${cityName}, tenant and all. Whether your rental is in ${neighborhoods} or anywhere else in ${cityName}, we'll purchase it as-is and handle the eviction process. Stop dealing with late rent, property damage, and legal headaches.`,
    
    'relocation-sale': `Relocating from ${cityName}? Whether you're moving for work, family, or a fresh start, selling your ${cityName} home quickly is crucial. HomeBuyerBoise specializes in fast closings for ${cityName} homeowners who need to relocate. We've helped dozens of families moving from ${cityName} to other states sell their homes in weeks instead of months.`,
    
    'sell-house-fast': `Need to sell your house fast in ${cityName}? HomeBuyerBoise is ${cityName}'s premier cash home buyer, serving over ${population} across all neighborhoods including ${neighborhoods}. We provide fair cash offers within 24 hours and can close in as little as 7 days. From homes near ${landmarks} to new construction throughout ${cityName}, we buy houses in any condition.`,
    
    'we-buy-houses': `Looking for "we buy houses ${cityName}" solutions? You found us! HomeBuyerBoise is ${cityName}'s trusted cash home buyer, purchasing properties throughout all ${cityName} neighborhoods. With over ${population} in the community, ${cityName} has a dynamic real estate market. We buy houses in ${neighborhoods} and throughout ${cityName} - any condition, any situation, fair prices.`,
    
    'cash-offer': `Want a cash offer on your ${cityName} home? HomeBuyerBoise provides fair, no-obligation cash offers for ${cityName} properties within 24 hours. Serving all ${cityName} neighborhoods including ${neighborhoods}, we've purchased hundreds of homes from ${cityName} residents who needed quick, hassle-free sales. Get your ${cityName} home value estimate today.`,
    
    'sell-as-is': `Want to sell your ${cityName} house as-is? No need to make repairs, update kitchens, or fix that foundation issue. HomeBuyerBoise buys ${cityName} homes in any condition. From fixer-uppers in ${neighborhoods} to properties needing major work throughout ${cityName}, we make fair cash offers on houses other buyers won't touch.`,
    
    'probate-sale': `Selling a probate property in ${cityName}? Navigating probate can be complex, especially when dealing with ${cityName} courts and real estate. HomeBuyerBoise specializes in probate sales throughout ${cityName}, helping families settle estates quickly. We understand ${cityName} probate requirements and can work with your timeline.`,
    
    'tax-liens': `Property tax liens in ${cityName}? Don't let tax debt force you into foreclosure. HomeBuyerBoise purchases ${cityName} properties with tax liens, paying off the debt and providing you with cash to start fresh. We've helped many ${cityName} homeowners resolve tax lien situations before they lose their homes.`,
    
    'downsizing': `Ready to downsize in ${cityName}? Many ${cityName} empty-nesters and retirees choose to sell their family homes and move to smaller properties or senior communities. HomeBuyerBoise makes downsizing easy for ${cityName} seniors - we buy your large home quickly so you can transition to your next chapter without stress.`,
    
    'fire-water-damage': `Fire or water damage to your ${cityName} property? Insurance claims can be complicated and repairs expensive. HomeBuyerBoise buys damaged properties throughout ${cityName}, allowing you to walk away without the burden of restoration. We purchase ${cityName} homes with fire damage, flood damage, and water damage in any neighborhood.`,
    
    'hoarder-house': `Need to sell a hoarder house in ${cityName}? These situations are sensitive and overwhelming. HomeBuyerBoise provides compassionate, discreet service for ${cityName} families dealing with hoarding situations. We buy the property as-is and handle all clean-out, allowing families to move forward with dignity.`,
    
    'expired-listing': `Listing expired in ${cityName}? Traditional real estate didn't work out - it happens, especially in ${cityName}'s competitive market. HomeBuyerBoise offers an alternative to relisting. We buy ${cityName} homes that didn't sell, making fair cash offers without showings, repairs, or months of waiting.`,
    
    'behind-mortgage': `Behind on your ${cityName} mortgage? Don't wait for foreclosure. HomeBuyerBoise can purchase your ${cityName} home quickly, pay off your mortgage, and help you avoid foreclosure on your credit report. We've helped hundreds of ${cityName} families escape difficult mortgage situations.`,
    
    'code-violations': `Code violations on your ${cityName} property? Whether it's structural issues, unpermitted work, or city citations, code violations can make selling difficult. HomeBuyerBoise buys ${cityName} properties with code violations, taking on the responsibility of bringing the property up to code or demolition.`,
  };
  
  return situations[service.slug as keyof typeof situations] || 
    `Need to sell your ${cityName} home? HomeBuyerBoise serves all of ${cityName}, providing fast cash offers for homeowners in ${neighborhoods} and throughout the community. With over ${population}, ${cityName} has diverse housing needs. We buy houses in any condition, any situation, with flexible closing timelines.`;
}

/**
 * Generates all service+city content combinations
 */
export function generateAllServiceCityCombinations(): ServiceCityContent[] {
  const combinations: ServiceCityContent[] = [];
  
  SERVICES.forEach(service => {
    CITIES.forEach(city => {
      const content: ServiceCityContent = {
        serviceSlug: service.slug,
        citySlug: city.slug,
        title: generateTitle(service.name, city.name),
        metaDescription: generateMetaDescription(service, city.name, city),
        h1: generateH1(service.h1, city.name),
        introText: generateIntroText(service, city.name, city),
        localKeywords: [
          `${service.keywords[0]} ${city.name}`,
          `${service.keywords[1]} ${city.name} Idaho`,
          `${city.name} ${service.keywords[2]}`,
          `${service.shortName} ${city.name}`,
        ].filter(Boolean),
      };
      
      combinations.push(content);
    });
  });
  
  return combinations;
}

/**
 * Gets content for a specific service+city combination
 */
export function getServiceCityContent(serviceSlug: string, citySlug: string): ServiceCityContent | undefined {
  const service = SERVICES.find(s => s.slug === serviceSlug);
  const city = CITIES.find(c => c.slug === citySlug);
  
  if (!service || !city) {
    return undefined;
  }
  
  return {
    serviceSlug,
    citySlug,
    title: generateTitle(service.name, city.name),
    metaDescription: generateMetaDescription(service, city.name, city),
    h1: generateH1(service.h1, city.name),
    introText: generateIntroText(service, city.name, city),
    localKeywords: [
      `${service.keywords[0]} ${city.name}`,
      `${service.keywords[1]} ${city.name} Idaho`,
      `${city.name} ${service.keywords[2]}`,
      `${service.shortName} ${city.name}`,
    ].filter(Boolean),
  };
}

/**
 * Gets all cities for a specific service
 */
export function getCitiesForService(serviceSlug: string): typeof CITIES {
  return CITIES;
}

/**
 * Gets all services for a specific city
 */
export function getServicesForCity(citySlug: string): typeof SERVICES {
  return SERVICES;
}
