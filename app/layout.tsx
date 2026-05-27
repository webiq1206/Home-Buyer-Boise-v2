import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { StickyBottomNav } from "@/components/StickyBottomNav";
import { ScrollToTop } from "@/components/ScrollToTop";
import {
  generateOrganizationSchema,
  generateWebSiteSchema,
} from "@/lib/schema";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Home Buyer Boise | We Buy Houses for Cash in the Treasure Valley",
    template: "%s | Home Buyer Boise",
  },
  description: "Sell your Boise area house fast for cash. We buy houses in any condition in Boise, Meridian, Eagle, Kuna, Star, Middleton, Nampa, and Caldwell. No repairs, no fees, close on your timeline.",
  keywords: ["sell house fast", "cash home buyers", "we buy houses", "Boise", "Meridian", "Eagle", "Kuna", "Idaho"],
  authors: [{ name: "Home Buyer Boise" }],
  creator: "Home Buyer Boise",
  publisher: "Home Buyer Boise",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://homebuyerboise.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Home Buyer Boise | We Buy Houses for Cash",
    description: "Sell your Boise area house fast for cash. No repairs, no fees, close on your timeline.",
    url: "https://homebuyerboise.com",
    siteName: "Home Buyer Boise",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 512,
        height: 512,
        alt: "Home Buyer Boise - Cash Home Buyers",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Home Buyer Boise | We Buy Houses for Cash",
    description: "Sell your Boise area house fast for cash. No repairs, no fees, close on your timeline.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = generateOrganizationSchema();
  const websiteSchema = generateWebSiteSchema();

  return (
    <html lang="en">
      <body className={inter.className}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-md focus:bg-background focus:text-foreground focus:border focus:border-border focus:shadow-md focus:outline-none focus:ring-2 focus:ring-ring"
          data-testid="link-skip-to-content"
        >
          Skip to main content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <ScrollToTop />
        <Navigation />
        <main id="main-content" className="min-h-screen pb-20 lg:pb-0">
          {children}
        </main>
        <Footer />
        <StickyBottomNav />
        <Toaster />
      </body>
    </html>
  );
}
