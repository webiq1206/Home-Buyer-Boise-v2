import { SERVICES } from "@shared/servicesData";
import { ServiceTemplate } from "./ServiceTemplate";

export default function CodeViolations() {
  const service = SERVICES.find(s => s.slug === "code-violations")!;
  return <ServiceTemplate service={service} />;
}
