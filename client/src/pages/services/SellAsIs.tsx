import { SERVICES } from "@shared/servicesData";
import { ServiceTemplate } from "./ServiceTemplate";

export default function SellAsIs() {
  const service = SERVICES.find(s => s.slug === "sell-as-is")!;
  return <ServiceTemplate service={service} />;
}
