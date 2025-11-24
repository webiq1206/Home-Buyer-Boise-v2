import { SERVICES } from "@shared/servicesData";
import { ServiceTemplate } from "./ServiceTemplate";

export default function Downsizing() {
  const service = SERVICES.find(s => s.slug === "downsizing")!;
  return <ServiceTemplate service={service} />;
}
