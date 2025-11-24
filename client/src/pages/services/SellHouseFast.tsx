import { SERVICES } from "@shared/servicesData";
import { ServiceTemplate } from "./ServiceTemplate";

export default function SellHouseFast() {
  const service = SERVICES.find(s => s.slug === "sell-house-fast")!;
  return <ServiceTemplate service={service} />;
}
