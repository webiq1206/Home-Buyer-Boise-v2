import { SERVICES } from "@shared/servicesData";
import { ServiceTemplate } from "./ServiceTemplate";

export default function WeBuyHouses() {
  const service = SERVICES.find(s => s.slug === "we-buy-houses")!;
  return <ServiceTemplate service={service} />;
}
