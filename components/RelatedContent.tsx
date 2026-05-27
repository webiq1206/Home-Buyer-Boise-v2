import Link from "next/link";
import graph from "@/data/internal-links.json";
import type { LinkGraph } from "@/lib/internalLinks";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

const TYPE_CTA: Record<string, string> = {
  blog: "Read the full guide",
  service: "Explore this service",
  area: "See how we help here",
  "service-city": "See local details",
  tool: "Use this tool",
  static: "Learn more about us",
};

const TYPE_LABEL: Record<string, string> = {
  blog: "Article",
  service: "Service",
  area: "Service Area",
  "service-city": "Local Service",
  tool: "Tool",
  static: "Page",
};

interface RelatedContentProps {
  sourceUrl: string;
  count?: number;
  heading?: string;
  subheading?: string;
  className?: string;
}

export function RelatedContent({
  sourceUrl,
  count = 5,
  heading = "Related Resources",
  subheading,
  className = "",
}: RelatedContentProps) {
  const typed = graph as unknown as LinkGraph;
  const page = typed.pages[sourceUrl];
  if (!page) return null;
  const items = page.candidates.slice(0, count);
  if (items.length === 0) return null;

  return (
    <section className={`py-12 lg:py-16 bg-muted/50 ${className}`}>
      <div className="container px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-2 text-center">
            {heading}
          </h2>
          {subheading && (
            <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
              {subheading}
            </p>
          )}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((item) => (
              <Card
                key={item.url}
                className="hover-elevate"
                data-testid={`card-related-${item.url.replace(/\//g, "-")}`}
              >
                <CardContent className="p-5">
                  <Badge variant="secondary" className="text-xs mb-3">
                    {item.category || TYPE_LABEL[item.type] || "Page"}
                  </Badge>
                  <h3 className="font-semibold mb-3 line-clamp-3">
                    <Link
                      href={item.url}
                      className="hover:text-primary transition-colors inline-flex items-start gap-1"
                      data-testid={`link-related-${item.url.replace(/\//g, "-")}`}
                    >
                      <span>{item.anchor}</span>
                      <ArrowRight className="h-4 w-4 mt-1 shrink-0" aria-hidden="true" />
                    </Link>
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {TYPE_CTA[item.type] || "Learn more"}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
