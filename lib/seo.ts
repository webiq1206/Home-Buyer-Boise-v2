/**
 * SEO Utilities for Home Buyer Boise
 * Generates keyword-optimized meta tags, titles, and descriptions
 * for cash home buying services across the Boise metro area
 */

interface SEOMetaData {
  title: string;
  description: string;
  keywords: string[];
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  twitterCard?: string;
}

interface ServiceSEOParams {
  serviceName: string;
  serviceSlug: string;
  city?: string;
  citySlug?: string;
  isHomePage?: boolean;
}

/**
 * Intelligently truncate service name while keeping key words
 * Works on whole words to avoid breaking legitimate terms
 */
function truncateServiceName(serviceName: string, maxLength: number): string {
  if (serviceName.length <= maxLength) return serviceName;
  
  // Split into words
  const words = serviceName.split(' ');
  
  // Remove low-value filler words first (whole word removal only)
  const fillerWords = ['&', 'and', 'or', 'the', 'of', 'for', 'with', 'in', 'a', 'an'];
  let importantWords = words.filter(word => !fillerWords.includes(word.toLowerCase()));
  
  // Rebuild and check length
  let shortened = importantWords.join(' ');
  if (shortened.length <= maxLength) return shortened;
  
  // If still too long, remove words from end until it fits
  while (importantWords.length > 1 && shortened.length > maxLength) {
    importantWords.pop();
    shortened = importantWords.join(' ');
  }
  
  // If single word is too long, truncate it cleanly
  if (shortened.length > maxLength) {
    return shortened.substring(0, maxLength);
  }
  
  return shortened;
}

/**
 * Generate SEO-optimized page title
 * Format: "Sell House Fast City | Home Buyer Boise" - Natural, city-first approach
 * Max 60 characters for optimal Google display
 * Prioritizes target keywords (city + property type/offer) for cash home buyers
 * GUARANTEED ≤60 chars through intelligent truncation
 */
export function generatePageTitle(params: ServiceSEOParams): string {
  const { serviceName, city, isHomePage } = params;
  
  if (isHomePage) {
    return "Home Buyer Boise | Sell Your Boise House Fast for Cash";
  }
  
  if (city) {
    // City-first format prioritizes target keywords: "Boise Cash Home Buyer"
    // Format: "Sell House Fast City | Home Buyer Boise"
    const primaryKeyword = `Sell House Fast ${city}`;
    const brandSuffix = `Home Buyer Boise`;
    const fullTitle = `${primaryKeyword} | ${brandSuffix}`;
    
    // If too long, use compact city-first format
    if (fullTitle.length > 60) {
      // Compact: "Sell House City | Cash Buyer"
      const compactTitle = `Sell House ${city} | Cash Buyer`;
      if (compactTitle.length > 60) {
        // Emergency: Ultra compact
        return `${city} Cash Home Buyer | Home Buyer Boise`;
      }
      return compactTitle;
    }
    return fullTitle;
  }
  
  // Service-only title (defaults to Boise as home base)
  // Format: "Service | Home Buyer Boise"
  const fullTitle = `${serviceName} | Home Buyer Boise`;
  
  // Fallback for very long service names
  if (fullTitle.length > 60) {
    const compactTitle = `${serviceName} | Cash Buyer`;
    if (compactTitle.length > 60) {
      // Truncate service name intelligently
      const maxServiceLength = 60 - ' | Cash Buyer'.length;
      const truncatedService = truncateServiceName(serviceName, maxServiceLength);
      return `${truncatedService} | Cash Buyer`;
    }
    return compactTitle;
  }
  
  return fullTitle;
}

/**
 * Generate SEO-optimized meta description
 * 150-160 characters with compelling CTA and keywords
 * Includes subtle "near me" mention for search intent while sounding natural
 */
export function generateMetaDescription(params: ServiceSEOParams): string {
  const { serviceName, city } = params;
  
  if (params.isHomePage) {
    return "Sell your house fast for cash in Boise & Treasure Valley. No fees, no commissions, close on your timeline. Fair cash offers in 24 hours.";
  }
  
  if (city) {
    // Natural city-focused description for cash home buyers
    return `Sell your house fast for cash in ${city}, Idaho. Fair offers in 24 hours, close on your timeline. No fees, no commissions, no repairs needed. Licensed cash home buyers serving ${city} & Treasure Valley.`;
  }
  
  // Service-focused description for cash home buying
  return `Cash home buyers in Boise metro area. Fast closings, fair offers, no fees or commissions. We buy houses in any condition. Licensed, insured, trusted by Treasure Valley homeowners.`;
}

/**
 * Generate keyword array for meta keywords tag
 * Mix of primary, secondary, and LSI keywords
 * Optimized for "near me" local searches
 */
export function generateKeywords(params: ServiceSEOParams): string[] {
  const { serviceName, city, serviceSlug } = params;
  
  const baseKeywords = [
    'sell house fast',
    'cash home buyers',
    'sell my house',
    'we buy houses',
    'Boise Idaho',
    'Treasure Valley',
    'sell house for cash',
    'cash offer on house',
    'fast home sale',
    'quick house sale',
    'sell house as-is',
  ];
  
  if (city) {
    return [
      `sell house fast ${city}`,
      `cash home buyers ${city}`,
      `we buy houses ${city} Idaho`,
      `sell my house ${city}`,
      `${city} cash buyers`,
      `${city} home buyers`,
      `sell house for cash ${city}`,
      `cash for houses ${city}`,
      `${city} house buyers`,
      ...baseKeywords,
      `sell house quickly ${city}`,
      `fast cash for houses ${city}`,
      `${city} real estate investors`,
    ];
  }
  
  // Property-type specific LSI keywords
  const lsiKeywords: Record<string, string[]> = {
    'single-family': ['sell single family home', 'cash for single family house', 'buy single family home fast'],
    'townhome': ['sell townhome fast', 'cash for townhouse', 'buy townhome as-is'],
    'condo': ['sell condo quickly', 'cash for condo', 'buy condo fast'],
    'duplex': ['sell duplex', 'cash for duplex', 'buy duplex investment'],
    'multi-unit': ['sell multi-unit property', 'cash for apartment building', 'buy rental property'],
    'land': ['sell land fast', 'cash for land', 'buy vacant lot'],
  };
  
  return [...baseKeywords, ...(lsiKeywords[serviceSlug] || [])];
}

/**
 * Get base URL based on environment
 * Production: https://homebuyerboise.com
 * Development: http://localhost:3000
 */
export function getBaseUrl(): string {
  // Check if we're in browser environment
  if (typeof window !== 'undefined') {
    // Use current origin in development, production domain in production
    if (window.location.hostname === 'localhost' || window.location.hostname.includes('replit')) {
      return window.location.origin;
    }
  }
  // Use environment variable or default to production URL for SSR/build time
  return process.env.NEXT_PUBLIC_BASE_URL || 'https://homebuyerboise.com';
}

/**
 * Generate SEO-optimized alt tag for logo/icon featured image
 * Creates page-specific alt text that includes relevant keywords
 */
export function generateLogoAltTag(params: ServiceSEOParams): string {
  const { serviceName, city, isHomePage } = params;
  
  if (isHomePage) {
    return "Home Buyer Boise logo - Professional cash home buyers serving the Boise Treasure Valley";
  }
  
  if (city) {
    // City-specific alt tag with service context
    return `Home Buyer Boise logo - Cash home buyers in ${city} Idaho - We buy houses fast for cash`;
  }
  
  // Service-specific alt tag
  return `Home Buyer Boise logo - Cash home buyers serving Boise metro and Treasure Valley Idaho`;
}

/**
 * Generate complete SEO metadata object for a page
 */
export function generateSEOMetadata(params: ServiceSEOParams & { 
  customCanonical?: string;
  customOgImage?: string;
}): SEOMetaData {
  const title = generatePageTitle(params);
  const description = generateMetaDescription(params);
  const keywords = generateKeywords(params);
  
  // Environment-aware canonical URL
  const baseUrl = getBaseUrl();
  let canonical = params.customCanonical || baseUrl;
  
  if (!params.isHomePage && !params.customCanonical) {
    if (params.citySlug) {
      // City pages use /areas/city-slug format
      canonical = `${baseUrl}/areas/${params.citySlug}`;
    } else if (params.serviceSlug) {
      canonical = `${baseUrl}/${params.serviceSlug}`;
    }
  }
  
  // Use consistent OG image (heart logo) for all pages
  const ogImage = params.customOgImage || `${baseUrl}/og-image.png`;
  
  // Open Graph defaults to meta tags
  return {
    title,
    description,
    keywords,
    canonical,
    ogTitle: title,
    ogDescription: description,
    ogImage,
    twitterCard: 'summary_large_image',
  };
}

/**
 * City-specific data for local SEO
 */
export const CITY_SEO_DATA = {
  Kuna: {
    population: '24,011',
    founded: '1992',
    zipCodes: ['83634'],
    neighborhoods: ['Indian Creek', 'Black Cat', 'Crimson Point', 'Ten Mile Creek'],
    landmarks: ['Kuna Caves', 'Swan Falls Dam', 'Indian Creek Plaza'],
    climate: 'semi-arid high desert climate with hot summers and cold winters',
    coordinates: { lat: 43.4913, lng: -116.4201 },
  },
  Boise: {
    population: '235,421',
    founded: '1863',
    zipCodes: ['83702', '83703', '83704', '83705', '83706', '83709', '83712', '83713', '83714', '83716'],
    neighborhoods: ['North End', 'Bench', 'Downtown', 'East End', 'Southwest Boise'],
    landmarks: ['Idaho State Capitol', 'Boise River Greenbelt', 'Table Rock', 'Hyde Park'],
    climate: 'semi-arid climate with four distinct seasons',
    coordinates: { lat: 43.6150, lng: -116.2023 },
  },
  Meridian: {
    population: '117,635',
    founded: '1893',
    zipCodes: ['83642', '83646'],
    neighborhoods: ['Lochsa Falls', 'Tuscany', 'Paramount', 'Meridian Ranch'],
    landmarks: ['The Village at Meridian', 'Julius M. Kleiner Memorial Park', 'Eagle Island State Park'],
    climate: 'semi-arid with hot, dry summers and cold winters',
    coordinates: { lat: 43.6121, lng: -116.3915 },
  },
  Eagle: {
    population: '30,346',
    founded: '1864',
    zipCodes: ['83616'],
    neighborhoods: ['Shadow Valley', 'Banbury', 'The Estates', 'Floating Feather'],
    landmarks: ['Eagle Island State Park', 'Heritage Park', 'Eagle Hills Golf Course'],
    climate: 'semi-arid with distinct four seasons',
    coordinates: { lat: 43.6954, lng: -116.3540 },
  },
  Star: {
    population: '11,117',
    founded: '1905',
    zipCodes: ['83669'],
    neighborhoods: ['Floating Feather', 'Star Ranch', 'Star Pointe', 'Crossfield'],
    landmarks: ['Star Community Park', 'Willow Creek Park', 'Happy Day Farms'],
    climate: 'semi-arid climate with hot summers and cold winters',
    coordinates: { lat: 43.6921, lng: -116.4935 },
  },
  Middleton: {
    population: '9,480',
    founded: '1863',
    zipCodes: ['83644'],
    neighborhoods: ['Purple Sage', 'Heights', 'Country Club Estates', 'Middleton Mill'],
    landmarks: ['Middleton Mill', 'Middleton Place', 'Lake Lowell'],
    climate: 'semi-arid climate with distinct seasons',
    coordinates: { lat: 43.7077, lng: -116.6185 },
  },
  Nampa: {
    population: '100,200',
    founded: '1886',
    zipCodes: ['83651', '83686', '83687'],
    neighborhoods: ['Centennial', 'Southridge', 'Deer Flat', 'Greenhurst', 'Painted Ridge'],
    landmarks: ['Ford Idaho Center', 'Lake Lowell', 'Nampa Civic Center', 'Northwest Nazarene University'],
    climate: 'semi-arid climate with hot summers and cold winters',
    coordinates: { lat: 43.5407, lng: -116.5635 },
  },
  Caldwell: {
    population: '59,996',
    founded: '1883',
    zipCodes: ['83605', '83607'],
    neighborhoods: ['Indian Creek', 'Purple Sage', 'Ustick West', 'Deer Flat'],
    landmarks: ['College of Idaho', 'Caldwell Event Center', 'Indian Creek Plaza', 'Canyon Hill'],
    climate: 'semi-arid with hot, dry summers and cold winters',
    coordinates: { lat: 43.6629, lng: -116.6874 },
  },
};

/**
 * Business information for NAP consistency
 */
export const BUSINESS_INFO = {
  name: 'Home Buyer Boise',
  legalName: 'Home Buyer Boise LLC',
  phone: '(208) 405-2275',
  email: 'connect@buymyhouse.co',
  address: {
    street: '3024 W Fairview Ave',
    city: 'Boise',
    state: 'Idaho',
    zip: '83702',
    country: 'United States',
  },
  hours: {
    monday: '8:00 AM - 6:00 PM',
    tuesday: '8:00 AM - 6:00 PM',
    wednesday: '8:00 AM - 6:00 PM',
    thursday: '8:00 AM - 6:00 PM',
    friday: '8:00 AM - 6:00 PM',
    saturday: '9:00 AM - 3:00 PM',
    sunday: 'Closed',
  },
  founded: '2018',
  serviceArea: ['Boise', 'Meridian', 'Eagle', 'Kuna', 'Star', 'Middleton', 'Nampa', 'Caldwell'],
  serviceRadius: '30 miles',
  // licenses field intentionally omitted until verified Idaho license numbers are provided
  certifications: ['Certified Real Estate Investor', 'Cash Buyer Network Member'],
  insurance: 'Fully Licensed & Insured - $3M E&O Coverage',
  rating: 4.9,
  reviewCount: 189,
  yearlyServicesCompleted: 85,
};
