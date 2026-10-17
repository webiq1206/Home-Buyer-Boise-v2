import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PROJECTS } from "@/shared/projectsData";
import { CITIES } from "@/shared/contentData";
import { SERVICES } from "@/shared/servicesData";
import { JsonLd } from "@/components/JsonLd";
import {
  generateWebPageSchema,
  generateBreadcrumbSchema,
  generateItemListSchema,
} from "@/lib/schema";
import { SHOW_UNVERIFIED_TRUST } from "@/lib/seo";

const PROJECTS_TITLE = "Success Stories | Boise Cash Home Buyer Projects";

export const metadata: Metadata = {
  title: SHOW_UNVERIFIED_TRUST ? PROJECTS_TITLE : "Boise Cash Home Buyer Projects",
  description:
    "Real Treasure Valley home sales by Home Buyer Boise — inherited properties, relocations, foreclosures, and as-is purchases across Boise, Meridian, Nampa, and more.",
  alternates: {
    canonical: "https://homebuyerboise.com/projects",
  },
};

export default function ProjectsPage() {
  const itemList = generateItemListSchema({
    name: SHOW_UNVERIFIED_TRUST ? "Home Buyer Boise Success Stories" : "Home Buyer Boise Projects",
    items: PROJECTS.map((p) => ({
      name: p.title,
      url: `/projects/${p.slug}`,
    })),
  });

  const webPageSchema = generateWebPageSchema({
    name: SHOW_UNVERIFIED_TRUST ? "Success Stories" : "Projects",
    description: metadata.description as string,
    url: "/projects",
    breadcrumbs: [
      { name: "Home", url: "/" },
      { name: "Projects", url: "/projects" },
    ],
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Projects", url: "/projects" },
  ]);

  return (
    <>
      <JsonLd data={[webPageSchema, breadcrumbSchema, itemList]} />
      <section className="bg-gradient-to-br from-navy to-primary text-white py-16">
        <div className="container px-4">
          <h1 className="text-4xl font-bold mb-4">{SHOW_UNVERIFIED_TRUST ? "Success Stories" : "Boise Cash Home Buyer Projects"}</h1>
          <p className="text-xl text-white/90 max-w-2xl">
            Real situations from Treasure Valley homeowners — how we helped them sell fast for cash.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROJECTS.map((project) => {
              const city = CITIES.find((c) => c.slug === project.citySlug);
              const service = SERVICES.find((s) => s.slug === project.serviceSlug);
              return (
                <Card key={project.slug} className="flex flex-col">
                  <CardHeader>
                    <CardTitle className="text-lg leading-snug">
                      <Link href={`/projects/${project.slug}`} className="hover:text-primary">
                        {project.title}
                      </Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col gap-3">
                    <p className="text-sm text-muted-foreground">
                      {city?.name} · {service?.name} · {project.timeline}
                    </p>
                    <p className="text-sm flex-1">{project.situation}</p>
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/projects/${project.slug}`}>Read story</Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
