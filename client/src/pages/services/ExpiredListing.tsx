import { SERVICES } from "@shared/servicesData";
import { ServiceTemplate } from "./ServiceTemplate";

export default function ExpiredListing() {
  const service = SERVICES.find(s => s.slug === "expired-listing")!;
  return <ServiceTemplate service={service} />;
}
