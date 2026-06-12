import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  PROJECTS,
  getProjectBySlug,
  getAllProjectSlugs,
} from "@/shared/projectsData";
import { CITIES } from "@/shared/contentData";
import { SERVICES } from "@/shared/servicesData";
import { JsonLd } from "@/components/JsonLd";
import {
  generateWebPageSchema,
  generateBreadcrumbSchema,
} from "@/lib/schema";
import { Quote } from "lucide-react";

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const project = getProjectBySlug(params.slug);
  if (!project) return {};
  return {
    title: `${project.title} | Home Buyer Boise`,
    description: project.metaDescription,
    alternates: {
      canonical: `https://homebuyerboise.com/projects/${project.slug}`,
    },
  };
}

export default function ProjectPage({ params }: PageProps) {
  const project = getProjectBySlug(params.slug);
  if (!project) notFound();

  const city = CITIES.find((c) => c.slug === project.citySlug);
  const service = SERVICES.find((s) => s.slug === project.serviceSlug);

  const webPageSchema = generateWebPageSchema({
    name: project.title,
    description: project.metaDescription,
    url: `/projects/${project.slug}`,
    breadcrumbs: [
      { name: "Home", url: "/" },
      { name: "Projects", url: "/projects" },
      { name: project.title, url: `/projects/${project.slug}` },
    ],
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Projects", url: "/projects" },
    { name: project.title, url: `/projects/${project.slug}` },
  ]);

  return (
    <>
      <JsonLd data={[webPageSchema, breadcrumbSchema]} />
      <section className="bg-gradient-to-br from-navy to-primary text-white py-12">
        <div className="container px-4 max-w-3xl">
          <p className="text-white/80 text-sm mb-2">
            {city?.name}, Idaho · {project.neighborhood}
          </p>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{project.title}</h1>
          <p className="text-lg text-white/90">{project.metaDescription}</p>
        </div>
      </section>

      <section className="py-12">
        <div className="container px-4 max-w-3xl space-y-8">
          <div>
            <h2 className="text-2xl font-bold mb-3">The Situation</h2>
            <p className="text-muted-foreground leading-relaxed">{project.situation}</p>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-3">Our Solution</h2>
            <p className="text-muted-foreground leading-relaxed">{project.solution}</p>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-3">Outcome</h2>
            <p className="text-muted-foreground leading-relaxed">{project.outcome}</p>
            <p className="mt-2 font-medium">Timeline: {project.timeline}</p>
          </div>

          {project.testimonialQuote && (
            <Card>
              <CardContent className="pt-6">
                <Quote className="h-8 w-8 text-primary mb-3" />
                <p className="italic text-lg mb-2">&ldquo;{project.testimonialQuote}&rdquo;</p>
                {project.customerName && (
                  <p className="text-sm text-muted-foreground">— {project.customerName}</p>
                )}
              </CardContent>
            </Card>
          )}

          <div className="flex flex-wrap gap-3">
            {service && (
              <Button asChild variant="outline">
                <Link href={`/services/${service.slug}`}>{service.name}</Link>
              </Button>
            )}
            {city && (
              <Button asChild variant="outline">
                <Link href={`/areas/${city.slug}`}>Homes in {city.name}</Link>
              </Button>
            )}
            {service && city && (
              <Button asChild variant="outline">
                <Link href={`/services/${service.slug}/${city.slug}`}>
                  {service.name} in {city.name}
                </Link>
              </Button>
            )}
            <Button asChild>
              <Link href="/get-quote">Get your cash offer</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
