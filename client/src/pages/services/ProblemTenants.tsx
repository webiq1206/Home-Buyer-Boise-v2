import { SERVICES } from "@shared/servicesData";
import { ServiceTemplate } from "./ServiceTemplate";

export default function ProblemTenants() {
  const service = SERVICES.find(s => s.slug === "problem-tenants")!;
  return <ServiceTemplate service={service} />;
}
