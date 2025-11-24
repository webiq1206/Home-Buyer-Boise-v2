import { SERVICES } from "@shared/servicesData";
import { ServiceTemplate } from "./ServiceTemplate";

export default function CashOffer() {
  const service = SERVICES.find(s => s.slug === "cash-offer")!;
  return <ServiceTemplate service={service} />;
}
