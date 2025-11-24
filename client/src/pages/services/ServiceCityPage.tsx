import { useParams, useLocation } from "wouter";
import { useEffect } from "react";
import { getServiceCityContent } from "@shared/serviceCityContent";
import { SERVICES } from "@shared/servicesData";
import { CITIES } from "@shared/contentData";
import ServiceTemplate from "./ServiceTemplate";
import NotFound from "../not-found";

export default function ServiceCityPage() {
  const params = useParams<{ serviceSlug: string; citySlug: string }>();
  const [, setLocation] = useLocation();
  
  const { serviceSlug, citySlug } = params;
  
  // Validate service and city exist
  const service = SERVICES.find(s => s.slug === serviceSlug);
  const city = CITIES.find(c => c.slug === citySlug);
  
  if (!service || !city) {
    return <NotFound />;
  }
  
  // Get unique content for this service+city combination
  const content = getServiceCityContent(serviceSlug!, citySlug!);
  
  if (!content) {
    return <NotFound />;
  }
  
  // Render ServiceTemplate with city context
  return (
    <ServiceTemplate
      serviceSlug={serviceSlug!}
      citySlug={citySlug}
      cityName={city.name}
      customTitle={content.title}
      customMetaDescription={content.metaDescription}
      customH1={content.h1}
      customIntro={content.introText}
    />
  );
}
