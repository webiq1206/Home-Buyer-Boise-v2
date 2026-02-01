import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin } from "lucide-react";
import { SiFacebook, SiInstagram, SiLinkedin, SiX } from "react-icons/si";
import { CITIES } from "@shared/contentData";
import { SERVICES } from "@shared/servicesData";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted border-t">
      <div className="container px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div>
            <div className="mb-4">
              <Image 
                src="/images/logo.png" 
                alt="Home Buyer Boise - Trusted Cash Home Buyers Serving the Treasure Valley" 
                width={200}
                height={48}
                className="h-12 w-auto"
              />
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Trusted Cash Home Buyers Serving the Boise Metro Area
            </p>
            <div className="space-y-2">
              <a href="tel:2084052275" className="flex items-center gap-2 text-sm hover:text-primary transition-colors" data-testid="link-phone-footer">
                <Phone className="h-4 w-4" />
                <span>(208) 405-2275</span>
              </a>
              <a href="mailto:connect@buymyhouse.co" className="flex items-center gap-2 text-sm hover:text-primary transition-colors" data-testid="link-email-footer">
                <Mail className="h-4 w-4" />
                <span>connect@buymyhouse.co</span>
              </a>
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>3024 W Fairview Ave, Boise, ID 83702</span>
              </div>
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>Serving Boise, Meridian, Eagle, Kuna, Star, Middleton, Nampa & Caldwell</span>
              </div>
            </div>
            <div className="flex gap-4 mt-4">
              <a 
                href="https://facebook.com/homebuyerboise" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Follow Home Buyer Boise on Facebook"
                data-testid="link-facebook"
              >
                <SiFacebook className="h-5 w-5" />
              </a>
              <a 
                href="https://instagram.com/homebuyerboise" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Follow Home Buyer Boise on Instagram"
                data-testid="link-instagram"
              >
                <SiInstagram className="h-5 w-5" />
              </a>
              <a 
                href="https://linkedin.com/company/homebuyerboise" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Follow Home Buyer Boise on LinkedIn"
                data-testid="link-linkedin"
              >
                <SiLinkedin className="h-5 w-5" />
              </a>
              <a 
                href="https://x.com/homebuyerboise" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Follow Home Buyer Boise on X"
                data-testid="link-x"
              >
                <SiX className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              {SERVICES.slice(0, 8).map((service) => (
                <li key={service.slug}>
                  <Link 
                    href={`/services/${service.slug}`}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    data-testid={`footer-service-${service.slug}`}
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">More Services</h3>
            <ul className="space-y-2">
              {SERVICES.slice(8).map((service) => (
                <li key={service.slug}>
                  <Link 
                    href={`/services/${service.slug}`}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    data-testid={`footer-service-${service.slug}`}
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Service Areas</h3>
            <ul className="space-y-2">
              {CITIES.map((city) => (
                <li key={city.slug}>
                  <Link 
                    href={`/areas/${city.slug}`}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    data-testid={`footer-area-${city.slug}`}
                  >
                    {city.name}, Idaho
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/how-it-works" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/get-quote" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Get Cash Offer
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {currentYear} Home Buyer Boise. All rights reserved.</p>
          <p className="mt-2">
            Licensed & Insured | Idaho Real Estate Investors
          </p>
        </div>
      </div>
    </footer>
  );
}
