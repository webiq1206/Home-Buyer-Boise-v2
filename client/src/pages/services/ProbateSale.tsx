import { SERVICES } from "@shared/servicesData";
import { ServiceTemplate } from "./ServiceTemplate";

export default function ProbateSale() {
  const service = SERVICES.find(s => s.slug === "probate-sale")!;
  return <ServiceTemplate service={service} />;
}
