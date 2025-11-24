import { SERVICES } from "@shared/servicesData";
import { ServiceTemplate } from "./ServiceTemplate";

export default function BehindMortgage() {
  const service = SERVICES.find(s => s.slug === "behind-mortgage")!;
  return <ServiceTemplate service={service} />;
}
