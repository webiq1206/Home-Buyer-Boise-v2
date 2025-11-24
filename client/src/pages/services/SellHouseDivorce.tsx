import { SERVICES } from "@shared/servicesData";
import { ServiceTemplate } from "./ServiceTemplate";

export default function SellHouseDivorce() {
  const service = SERVICES.find(s => s.slug === "sell-house-divorce")!;
  return <ServiceTemplate service={service} />;
}
