import { SERVICES } from "@shared/servicesData";
import { ServiceTemplate } from "./ServiceTemplate";

export default function HoarderHouse() {
  const service = SERVICES.find(s => s.slug === "hoarder-house")!;
  return <ServiceTemplate service={service} />;
}
