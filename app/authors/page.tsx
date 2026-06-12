import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AUTHORS } from "@/shared/authorsData";
import { JsonLd } from "@/components/JsonLd";
import {
  generateWebPageSchema,
  generateBreadcrumbSchema,
  generateItemListSchema,
} from "@/lib/schema";

export const metadata: Metadata = {
  title: "Our Authors | Home Buyer Boise",
  description:
    "Meet the Home Buyer Boise team — local cash home buying specialists sharing expert guidance for Treasure Valley homeowners.",
  alternates: {
    canonical: "https://homebuyerboise.com/authors",
  },
};

export default function AuthorsIndexPage() {
  const itemList = generateItemListSchema({
    name: "Home Buyer Boise Authors",
    items: AUTHORS.map((a) => ({
      name: a.name,
      url: `/authors/${a.slug}`,
    })),
  });

  const webPageSchema = generateWebPageSchema({
    name: "Our Authors",
    description: metadata.description as string,
    url: "/authors",
    breadcrumbs: [
      { name: "Home", url: "/" },
      { name: "Authors", url: "/authors" },
    ],
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Authors", url: "/authors" },
  ]);

  return (
    <>
      <JsonLd data={[webPageSchema, breadcrumbSchema, itemList]} />
      <section className="py-16">
        <div className="container px-4">
          <h1 className="text-4xl font-bold mb-4">Our Authors</h1>
          <p className="text-muted-foreground max-w-2xl mb-8">
            Local experts writing about selling your home fast for cash in the Treasure Valley.
          </p>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
            {AUTHORS.map((author) => (
              <Card key={author.slug}>
                <CardHeader>
                  <CardTitle>
                    <Link href={`/authors/${author.slug}`} className="hover:text-primary">
                      {author.name}
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-2">{author.jobTitle}</p>
                  <p className="text-sm">{author.bio.substring(0, 180)}...</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
