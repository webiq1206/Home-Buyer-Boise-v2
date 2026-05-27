/**
 * JSON-LD Schema Markup Generators for Home Buyer Boise
 * Creates structured data for Google rich snippets and search features
 * Optimized for cash home buying / real estate investor business
 */

import { BUSINESS_INFO, CITY_SEO_DATA, getBaseUrl } from './seo';

interface SchemaContext {
  '@context': string;
  '@type': string | string[];
  [key: string]: any;
}

/**
 * Generate LocalBusiness + RealEstateAgent schema for homepage and location pages
 * Uses dual-type for better SEO coverage in real estate searches
 */
export function generateLocalBusinessSchema(city?: string): SchemaContext {
  const baseUrl = getBaseUrl();
  const coordinates = city 
    ? CITY_SEO_DATA[city as keyof typeof CITY_SEO_DATA]?.coordinates 
    : CITY_SEO_DATA.Boise.coordinates;
  
  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'RealEstateAgent'],
    '@id': `${baseUrl}#organization`,
    name: BUSINESS_INFO.name,
    legalName: BUSINESS_INFO.legalName,
    description: `Professional cash home buyers serving ${city || 'the Boise metro area'}. We buy houses in any condition with fair cash offers in 24 hours. No fees, no commissions, close on your timeline.`,
    image: `${baseUrl}/og-image.png`,
    logo: `${baseUrl}/og-image.png`,
    url: baseUrl,
    telephone: BUSINESS_INFO.phone,
    email: BUSINESS_INFO.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: BUSINESS_INFO.address.street,
      addressLocality: BUSINESS_INFO.address.city,
      addressRegion: BUSINESS_INFO.address.state,
      postalCode: BUSINESS_INFO.address.zip,
      addressCountry: BUSINESS_INFO.address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: coordinates.lat,
      longitude: coordinates.lng,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '09:00',
        closes: '15:00',
      },
    ],
    priceRange: '$$',
    areaServed: BUSINESS_INFO.serviceArea.map(area => ({
      '@type': 'City',
      name: area,
      addressRegion: 'ID',
      addressCountry: 'US',
    })),
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: BUSINESS_INFO.rating,
      reviewCount: BUSINESS_INFO.reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
    foundingDate: BUSINESS_INFO.founded,
    slogan: 'Sell Your House Fast for Cash in Boise',
    paymentAccepted: 'Cash, Wire Transfer, Certified Check',
    currenciesAccepted: 'USD',
    sameAs: [
      'https://www.facebook.com/homebuyerboise',
      'https://www.instagram.com/homebuyerboise',
      'https://www.linkedin.com/company/homebuyerboise',
      'https://x.com/homebuyerboise',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Cash Home Buying Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Fast Cash Offers',
            description: 'Receive a fair cash offer for your home within 24 hours',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Sell As-Is',
            description: 'Sell your house in any condition with no repairs needed',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Flexible Closing',
            description: 'Close in as little as 7 days or on your timeline',
          },
        },
      ],
    },
  };
}

/**
 * Generate Service schema for individual service pages
 */
export function generateServiceSchema(serviceName: string, serviceDescription: string, city?: string): SchemaContext {
  const baseUrl = getBaseUrl();
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: serviceName,
    description: serviceDescription,
    provider: {
      '@type': ['LocalBusiness', 'RealEstateAgent'],
      '@id': `${baseUrl}#organization`,
      name: BUSINESS_INFO.name,
      telephone: BUSINESS_INFO.phone,
      email: BUSINESS_INFO.email,
      address: {
        '@type': 'PostalAddress',
        addressLocality: city || BUSINESS_INFO.address.city,
        addressRegion: BUSINESS_INFO.address.state,
        addressCountry: BUSINESS_INFO.address.country,
      },
    },
    areaServed: city ? {
      '@type': 'City',
      name: city,
      addressCountry: 'US',
      addressRegion: 'ID',
    } : BUSINESS_INFO.serviceArea.map(area => ({
      '@type': 'City',
      name: area,
      addressRegion: 'ID',
      addressCountry: 'US',
    })),
    serviceType: 'Real Estate Investment',
    category: 'Cash Home Buyer',
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      priceCurrency: 'USD',
      price: '0',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: '0',
        priceCurrency: 'USD',
        description: 'No fees or commissions - 100% free service',
      },
    },
  };
}

/**
 * Generate BreadcrumbList schema for navigation
 */
export function generateBreadcrumbSchema(breadcrumbs: Array<{ name: string; url: string }>): SchemaContext {
  const baseUrl = getBaseUrl();
  
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: `${baseUrl}${crumb.url}`,
    })),
  };
}

/**
 * Generate Organization schema for brand identity
 */
export function generateOrganizationSchema(): SchemaContext {
  const baseUrl = getBaseUrl();
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${baseUrl}#organization`,
    name: BUSINESS_INFO.name,
    legalName: BUSINESS_INFO.legalName,
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    description: 'Professional cash home buyers serving the Boise Treasure Valley since 2018. We buy houses in any condition with fair cash offers. Licensed, insured, and committed to helping homeowners sell fast.',
    foundingDate: BUSINESS_INFO.founded,
    telephone: BUSINESS_INFO.phone,
    email: BUSINESS_INFO.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: BUSINESS_INFO.address.street,
      addressLocality: BUSINESS_INFO.address.city,
      addressRegion: BUSINESS_INFO.address.state,
      postalCode: BUSINESS_INFO.address.zip,
      addressCountry: BUSINESS_INFO.address.country,
    },
    sameAs: [
      'https://www.facebook.com/homebuyerboise',
      'https://www.instagram.com/homebuyerboise',
      'https://www.linkedin.com/company/homebuyerboise',
      'https://x.com/homebuyerboise',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: BUSINESS_INFO.phone,
      contactType: 'Customer Service',
      areaServed: 'US-ID',
      availableLanguage: 'English',
    },
  };
}

/**
 * Generate Review schema for testimonials
 */
export function generateReviewSchema(reviews: Array<{
  author: string;
  rating: number;
  text: string;
  date: string;
}>): SchemaContext {
  const baseUrl = getBaseUrl();
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${baseUrl}#organization`,
    name: BUSINESS_INFO.name,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: BUSINESS_INFO.rating,
      reviewCount: BUSINESS_INFO.reviewCount,
    },
    review: reviews.map(review => ({
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: review.author,
      },
      datePublished: review.date,
      reviewRating: {
        '@type': 'Rating',
        ratingValue: review.rating,
        bestRating: 5,
      },
      reviewBody: review.text,
    })),
  };
}

/**
 * Generate FAQPage schema for FAQ sections
 */
export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>): SchemaContext {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/**
 * Generate WebPage schema for individual pages
 */
export function generateWebPageSchema(params: {
  name: string;
  description: string;
  url: string;
  breadcrumbs?: Array<{ name: string; url: string }>;
}): SchemaContext {
  const baseUrl = getBaseUrl();
  
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${baseUrl}${params.url}#webpage`,
    url: `${baseUrl}${params.url}`,
    name: params.name,
    description: params.description,
    isPartOf: {
      '@id': `${baseUrl}#website`,
    },
    about: {
      '@id': `${baseUrl}#organization`,
    },
    breadcrumb: params.breadcrumbs ? {
      '@type': 'BreadcrumbList',
      itemListElement: params.breadcrumbs.map((crumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: crumb.name,
        item: `${baseUrl}${crumb.url}`,
      })),
    } : undefined,
  };
}

/**
 * Generate WebSite schema for the overall site
 */
export function generateWebSiteSchema(): SchemaContext {
  const baseUrl = getBaseUrl();
  
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${baseUrl}#website`,
    url: baseUrl,
    name: BUSINESS_INFO.name,
    description: 'Professional cash home buyers serving the Boise Treasure Valley. Fast cash offers, flexible closing, no fees or commissions.',
    publisher: {
      '@id': `${baseUrl}#organization`,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${baseUrl}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

/**
 * Generate Article schema for blog posts
 */
export function generateArticleSchema(params: {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
  image?: string;
}): SchemaContext {
  const baseUrl = getBaseUrl();
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: params.title,
    description: params.description,
    url: `${baseUrl}${params.url}`,
    datePublished: params.datePublished,
    dateModified: params.dateModified || params.datePublished,
    author: {
      '@type': 'Organization',
      name: BUSINESS_INFO.name,
      url: baseUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: BUSINESS_INFO.name,
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/logo.png`,
      },
    },
    image: params.image || `${baseUrl}/og-image.png`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}${params.url}`,
    },
  };
}

/**
 * Generate BlogPosting schema for blog posts
 * Uses BlogPosting type (more specific than Article) for blog content.
 * Author is emitted as Organization until per-person author profiles exist.
 */
export function generateBlogPostingSchema(params: {
  title: string;
  description: string;
  slug: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
  image?: string;
  keywords?: string[];
  articleSection?: string;
}): SchemaContext {
  const baseUrl = getBaseUrl();
  const url = `${baseUrl}/blog/${params.slug}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${url}#blogposting`,
    headline: params.title,
    description: params.description,
    url,
    datePublished: params.datePublished,
    dateModified: params.dateModified || params.datePublished,
    author: {
      '@type': 'Organization',
      name: params.author || BUSINESS_INFO.name,
      url: baseUrl,
    },
    publisher: {
      '@type': 'Organization',
      '@id': `${baseUrl}#organization`,
      name: BUSINESS_INFO.name,
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/logo.png`,
      },
    },
    image: params.image || `${baseUrl}/og-image.png`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    ...(params.keywords && params.keywords.length > 0
      ? { keywords: params.keywords.join(', ') }
      : {}),
    ...(params.articleSection ? { articleSection: params.articleSection } : {}),
    isPartOf: {
      '@id': `${baseUrl}#website`,
    },
  };
}

/**
 * Render schema as JSON-LD script tag
 */
export function renderSchemaScript(schema: SchemaContext | SchemaContext[]): string {
  const schemaArray = Array.isArray(schema) ? schema : [schema];
  return schemaArray.map(s => 
    `<script type="application/ld+json">${JSON.stringify(s, null, 2)}</script>`
  ).join('\n');
}
