import { Link } from "wouter";
import { Phone, Mail, MapPin, Home } from "lucide-react";
import { CITIES } from "@shared/contentData";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted border-t">
      <div className="container px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Home className="h-7 w-7 text-primary" />
              <div className="flex flex-col">
                <span className="text-lg font-bold text-primary leading-tight">HomeBuyer</span>
                <span className="text-xs font-semibold text-primary/70 leading-tight -mt-0.5">BOISE</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Trusted Cash Home Buyers Serving the Boise Metro Area
            </p>
            <div className="space-y-2">
              <a href="tel:2084052274" className="flex items-center gap-2 text-sm hover:text-primary transition-colors" data-testid="link-phone-footer">
                <Phone className="h-4 w-4" />
                <span>(208) 405-CASH</span>
              </a>
              <a href="mailto:hello@homebuyerboise.com" className="flex items-center gap-2 text-sm hover:text-primary transition-colors" data-testid="link-email-footer">
                <Mail className="h-4 w-4" />
                <span>hello@homebuyerboise.com</span>
              </a>
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>150 N Capitol Blvd Suite 1, Boise, ID 83702</span>
              </div>
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>Serving Boise, Meridian, Eagle, Kuna, Star & Middleton</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-sm mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-muted-foreground hover:text-primary transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/get-quote" className="text-muted-foreground hover:text-primary transition-colors">
                  Get Cash Offer
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-privacy-policy-footer">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-terms-of-service-footer">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Why Choose Us */}
          <div>
            <h3 className="font-semibold text-sm mb-4">Why Choose Us</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Fast Cash Offers in 24 Hours</li>
              <li>• No Fees or Commissions</li>
              <li>• Close on Your Timeline</li>
              <li>• We Buy As-Is</li>
              <li>• No Repairs Needed</li>
              <li>• Hassle-Free Process</li>
              <li>• Local Boise Buyers</li>
            </ul>
          </div>

          {/* Service Areas */}
          <div>
            <h3 className="font-semibold text-sm mb-4">Service Areas</h3>
            <ul className="space-y-2 text-sm">
              {CITIES.map((city) => (
                <li key={city.slug}>
                  <Link href={`/areas/${city.slug}`} className="text-muted-foreground hover:text-primary transition-colors">
                    {city.name}, Idaho
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-sm text-muted-foreground space-y-2">
          <p className="text-xs">
            <strong>Legal Disclaimer:</strong> HomeBuyerBoise is a professional real estate investment company. All offers are subject to property inspection and market analysis.
          </p>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p>© {currentYear} HomeBuyerBoise. All rights reserved. Serving the Treasure Valley since 2018.</p>
            <div className="flex gap-4 text-xs">
              <span>Licensed & Insured</span>
              <span>•</span>
              <span>No Fees or Commissions</span>
              <span>•</span>
              <span>Free Cash Offers</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
