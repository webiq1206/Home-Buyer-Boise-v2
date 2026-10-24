import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  getAuthorBySlug,
  getAllAuthorSlugs,
} from "@/shared/authorsData";
import { BLOG_POSTS } from "@/shared/blogContent";
import { JsonLd } from "@/components/JsonLd";
import {
  generatePersonSchema,
  generateWebPageSchema,
  generateBreadcrumbSchema,
} from "@/lib/schema";

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return getAllAuthorSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const author = getAuthorBySlug(params.slug);
  if (!author) return {};
  return {
    title: `${author.name} | Home Buyer Boise`,
    ...(author.bio ? { description: author.bio.substring(0, 160) } : {}),
    alternates: {
      canonical: `https://homebuyerboise.com/authors/${author.slug}`,
    },
  };
}

export default function AuthorPage({ params }: PageProps) {
  const author = getAuthorBySlug(params.slug);
  if (!author) notFound();

  const posts = BLOG_POSTS.filter(
    (p) =>
      p.author === author.name ||
      (author.slug === "home-buyer-boise-team" &&
        p.author.includes("Home Buyer Boise"))
  ).slice(0, 12);

  const personSchema = generatePersonSchema({
    name: author.name,
    jobTitle: author.jobTitle,
    description: author.bio,
    url: `/authors/${author.slug}`,
    expertise: author.expertise,
  });

  const webPageSchema = generateWebPageSchema({
    name: author.name,
    description: author.bio,
    url: `/authors/${author.slug}`,
    breadcrumbs: [
      { name: "Home", url: "/" },
      { name: "Authors", url: "/authors" },
      { name: author.name, url: `/authors/${author.slug}` },
    ],
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Authors", url: "/authors" },
    { name: author.name, url: `/authors/${author.slug}` },
  ]);

  return (
    <>
      <JsonLd data={[personSchema, webPageSchema, breadcrumbSchema]} />
      <section className="bg-gradient-to-br from-navy to-primary text-white py-12">
        <div className="container px-4 max-w-3xl">
          <p className="text-white/80 text-sm mb-2">{author.jobTitle}</p>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{author.name}</h1>
          {author.bio ? <p className="text-lg text-white/90">{author.bio}</p> : null}
        </div>
      </section>

      <section className="py-12">
        <div className="container px-4 max-w-3xl space-y-8">
          {author.expertise.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-3">Expertise</h2>
            <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
              {author.expertise.map((e) => (
                <li key={e}>{e}</li>
              ))}
            </ul>
          </div>
          )}

          {author.credentials && author.credentials.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-3">Credentials</h2>
              <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                {author.credentials.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>
          )}

          {posts.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Articles</h2>
              <div className="grid gap-3">
                {posts.map((post) => (
                  <Card key={post.slug}>
                    <CardContent className="pt-4">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="font-medium hover:text-primary"
                      >
                        {post.title}
                      </Link>
                      <p className="text-sm text-muted-foreground mt-1">
                        {post.category}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          <Button asChild>
            <Link href="/get-quote">Get your free cash offer</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
