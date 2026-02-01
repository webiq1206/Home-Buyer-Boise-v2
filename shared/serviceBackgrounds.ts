// Service-specific hero background images
// Maps service slugs to their custom background images

export interface ServiceBackgroundConfig {
  [key: string]: string;
}

// Service slug to background image mapping
// Use public folder paths for Next.js compatibility
export const SERVICE_BACKGROUNDS: ServiceBackgroundConfig = {
  // Cash home buying services use the default hero background
};

// Default background for services without custom images
export const DEFAULT_SERVICE_BACKGROUND = "/images/hero-background.png";

/**
 * Get the appropriate background image for a service
 * @param serviceSlug - The service slug (e.g., 'sell-house-fast', 'we-buy-houses')
 * @returns The background image URL
 */
export function getServiceBackground(serviceSlug: string): string {
  return SERVICE_BACKGROUNDS[serviceSlug] || DEFAULT_SERVICE_BACKGROUND;
}
