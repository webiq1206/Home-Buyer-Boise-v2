import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Home Buyer Boise | We Buy Houses for Cash in Boise Idaho",
    template: "%s | Home Buyer Boise",
  },
  description:
    "Sell your house fast for cash in Boise, Meridian, Eagle, Kuna, Star, and Middleton. Get a fair cash offer in 24 hours. No fees, no commissions, close on your timeline.",
  keywords: [
    "sell house fast Boise",
    "cash home buyers Boise",
    "we buy houses Boise",
    "sell house as is Idaho",
    "cash for homes Meridian",
    "sell house quickly Eagle",
  ],
  authors: [{ name: "Home Buyer Boise" }],
  creator: "Home Buyer Boise",
  publisher: "Home Buyer Boise",
  metadataBase: new URL("https://homebuyerboise.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://homebuyerboise.com",
    siteName: "Home Buyer Boise",
    title: "Home Buyer Boise | We Buy Houses for Cash",
    description:
      "Sell your house fast for cash in Boise and the Treasure Valley. Get a fair offer in 24 hours.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Home Buyer Boise - Cash Home Buyers",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Home Buyer Boise | We Buy Houses for Cash",
    description: "Sell your house fast for cash in Boise and the Treasure Valley.",
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
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Navigation />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
