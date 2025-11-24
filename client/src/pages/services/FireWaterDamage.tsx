import { SERVICES } from "@shared/servicesData";
import { ServiceTemplate } from "./ServiceTemplate";

export default function FireWaterDamage() {
  const service = SERVICES.find(s => s.slug === "fire-water-damage")!;
  return <ServiceTemplate service={service} />;
}
