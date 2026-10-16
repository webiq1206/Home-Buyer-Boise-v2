import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import {
  generateWebPageSchema,
  generateBreadcrumbSchema,
} from "@/lib/schema";

export const metadata: Metadata = {
  title: "Terms of Service | Home Buyer Boise",
  description: "Read our terms of service to understand the conditions for using Home Buyer Boise website and services.",
  alternates: {
    canonical: "https://homebuyerboise.com/terms-of-service",
  },
};

export default function TermsOfServicePage() {
  const webPageSchema = generateWebPageSchema({
    name: "Terms of Service | Home Buyer Boise",
    description:
      "Conditions for using the Home Buyer Boise website and services.",
    url: "/terms-of-service",
    breadcrumbs: [
      { name: "Home", url: "/" },
      { name: "Terms of Service", url: "/terms-of-service" },
    ],
  });
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Terms of Service", url: "/terms-of-service" },
  ]);

  return (
    <>
        <JsonLd data={[webPageSchema, breadcrumbSchema]} />
        <section className="py-16 lg:py-24">
          <div className="container px-4">
            <div className="max-w-3xl mx-auto prose prose-lg">
              <h1>Terms of Service</h1>
              <p className="lead">
                Last updated: January 2026
              </p>

              <h2>Agreement to Terms</h2>
              <p>
                By accessing or using the Home Buyer Boise website, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website.
              </p>

              <h2>Our Services</h2>
              <p>
                Home Buyer Boise provides cash offers for residential properties in the Treasure Valley area. All offers are subject to:
              </p>
              <ul>
                <li>Property inspection and verification</li>
                <li>Market analysis and comparable sales review</li>
                <li>Title search and clearance</li>
              </ul>

              <h2>No Guarantees</h2>
              <p>
                While we strive to provide fair cash offers, submitting your information does not guarantee:
              </p>
              <ul>
                <li>That we will make an offer on your property</li>
                <li>A specific offer amount</li>
                <li>A specific closing timeline</li>
              </ul>

              <h2>Limitation of Liability</h2>
              <p>
                Home Buyer Boise shall not be liable for any indirect, incidental, special, or consequential damages arising from the use of our website or services.
              </p>

              <h2>Contact Us</h2>
              <p>
                If you have questions about these terms, please contact us at:
              </p>
              <ul>
                <li>Email: connect@buymyhouse.co</li>
                <li>Phone: (208) 405-2274</li>
                <li>Address: 3024 W Fairview Ave, Boise, ID 83702</li>
              </ul>
            </div>
          </div>
        </section>
    </>
  );
}
