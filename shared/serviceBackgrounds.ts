// Default hero background for service pages
import type { StaticImageData } from "next/image";
import defaultBackground from "@assets/Home Buyer Boise Background Image_1763675543303.png";

export const DEFAULT_SERVICE_BACKGROUND: StaticImageData = defaultBackground;

export function getServiceBackground(_serviceSlug: string): StaticImageData {
  return DEFAULT_SERVICE_BACKGROUND;
}
