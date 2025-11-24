import { SERVICES } from "@shared/servicesData";
import { ServiceTemplate } from "./ServiceTemplate";

export default function AvoidForeclosure() {
  const service = SERVICES.find(s => s.slug === "avoid-foreclosure")!;
  return <ServiceTemplate service={service} />;
}
