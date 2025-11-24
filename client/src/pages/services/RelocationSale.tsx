import { SERVICES } from "@shared/servicesData";
import { ServiceTemplate } from "./ServiceTemplate";

export default function RelocationSale() {
  const service = SERVICES.find(s => s.slug === "relocation-sale")!;
  return <ServiceTemplate service={service} />;
}
