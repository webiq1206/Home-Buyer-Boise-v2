import { SERVICES } from "@shared/servicesData";
import { ServiceTemplate } from "./ServiceTemplate";

export default function TaxLiens() {
  const service = SERVICES.find(s => s.slug === "tax-liens")!;
  return <ServiceTemplate service={service} />;
}
