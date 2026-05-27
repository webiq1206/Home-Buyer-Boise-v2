import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import {
  generateWebPageSchema,
  generateBreadcrumbSchema,
} from "@/lib/schema";

export const metadata: Metadata = {
  title: "Privacy Policy | Home Buyer Boise",
  description: "Read our privacy policy to understand how Home Buyer Boise collects, uses, and protects your personal information.",
  alternates: {
    canonical: "https://homebuyerboise.com/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
  const webPageSchema = generateWebPageSchema({
    name: "Privacy Policy | Home Buyer Boise",
    description:
      "How Home Buyer Boise collects, uses, and protects your personal information.",
    url: "/privacy-policy",
    breadcrumbs: [
      { name: "Home", url: "/" },
      { name: "Privacy Policy", url: "/privacy-policy" },
    ],
  });
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Privacy Policy", url: "/privacy-policy" },
  ]);

  return (
    <>
        <JsonLd data={[webPageSchema, breadcrumbSchema]} />
        <section className="py-16 lg:py-24">
          <div className="container px-4">
            <div className="max-w-3xl mx-auto prose prose-lg">
              <h1>Privacy Policy</h1>
              <p className="lead">
                Last updated: January 2026
              </p>

              <h2>Information We Collect</h2>
              <p>
                When you visit our website or submit a form requesting a cash offer, we collect information you provide directly to us, including:
              </p>
              <ul>
                <li>Name and contact information (email, phone number)</li>
                <li>Property address and details</li>
                <li>Information about your selling situation</li>
              </ul>

              <h2>How We Use Your Information</h2>
              <p>
                We use the information we collect to:
              </p>
              <ul>
                <li>Provide you with a cash offer on your property</li>
                <li>Communicate with you about our services</li>
                <li>Improve our website and services</li>
                <li>Comply with legal obligations</li>
              </ul>

              <h2>Information Sharing</h2>
              <p>
                We do not sell your personal information. We may share information with:
              </p>
              <ul>
                <li>Title companies and closing agents necessary to complete transactions</li>
                <li>Service providers who assist in our operations</li>
                <li>Legal authorities when required by law</li>
              </ul>

              <h2>Contact Us</h2>
              <p>
                If you have questions about this privacy policy, please contact us at:
              </p>
              <ul>
                <li>Email: connect@buymyhouse.co</li>
                <li>Phone: (208) 405-2275</li>
                <li>Address: 3024 W Fairview Ave, Boise, ID 83702</li>
              </ul>
            </div>
          </div>
        </section>
    </>
  );
}
