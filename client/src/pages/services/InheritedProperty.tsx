import { SERVICES } from "@shared/servicesData";
import { ServiceTemplate } from "./ServiceTemplate";

export default function InheritedProperty() {
  const service = SERVICES.find(s => s.slug === "inherited-property")!;
  return <ServiceTemplate service={service} />;
}
