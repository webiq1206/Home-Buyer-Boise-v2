import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Menu, Home as HomeIcon, DollarSign, FileText, HelpCircle, Building2, ArrowRight } from "lucide-react";
import logoUrlPng from "@assets/Lawn Care Kuna Logo_1763734387982.png";
import logoUrlWebp from "@assets/Lawn Care Kuna Logo_400x100.webp";

// Cash home buying pages - simple navigation structure
const mainPages = [
  { name: "How It Works", href: "/how-it-works", icon: HelpCircle },
  { name: "Get Cash Offer", href: "/get-quote", icon: DollarSign },
  { name: "About Us", href: "/about", icon: Building2 },
  { name: "Contact", href: "/contact", icon: FileText },
];

export function Navigation() {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/98 backdrop-blur supports-[backdrop-filter]:bg-background/95">
      <nav className="container flex h-20 items-center justify-between gap-4 px-8 md:px-12">
        <Link href="/" className="flex items-center flex-shrink-0">
          <picture>
            <source srcSet={logoUrlWebp} type="image/webp" />
            <img 
              src={logoUrlPng} 
              alt="HomeBuyerBoise - Professional Cash Home Buyers in Boise, Idaho" 
              className="h-10 w-auto"
              width="200"
              height="40"
              loading="eager"
              data-testid="logo-image"
            />
          </picture>
        </Link>

        <div className="flex-1"></div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          <NavigationMenu>
            <NavigationMenuList className="gap-2">
              <NavigationMenuItem>
                <Link href="/">
                  <span
                    className={`px-4 py-2 text-sm font-medium transition-colors cursor-pointer ${
                      location === "/" ? "text-primary" : "text-foreground/80 hover:text-foreground"
                    }`}
                    data-testid="nav-home"
                  >
                    Home
                  </span>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/how-it-works">
                  <span
                    className={`px-4 py-2 text-sm font-medium transition-colors cursor-pointer ${
                      location === "/how-it-works" ? "text-primary" : "text-foreground/80 hover:text-foreground"
                    }`}
                    data-testid="nav-how-it-works"
                  >
                    How It Works
                  </span>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/about">
                  <span
                    className={`px-4 py-2 text-sm font-medium transition-colors cursor-pointer ${
                      location === "/about" ? "text-primary" : "text-foreground/80 hover:text-foreground"
                    }`}
                    data-testid="nav-about"
                  >
                    About
                  </span>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/contact">
                  <span
                    className={`px-4 py-2 text-sm font-medium transition-colors cursor-pointer ${
                      location === "/contact" ? "text-primary" : "text-foreground/80 hover:text-foreground"
                    }`}
                    data-testid="nav-contact"
                  >
                    Contact
                  </span>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex items-center gap-3 border-l pl-8">
            <Button 
              variant="ghost" 
              size="sm" 
              asChild 
              data-testid="button-phone-desktop"
            >
              <a href="tel:2083522011">
                (208) 352-2011
              </a>
            </Button>

            <Button 
              size="sm" 
              onClick={() => window.location.href = "/get-quote"}
              data-testid="button-quote-desktop"
            >
              Get Cash Offer
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="flex lg:hidden items-center gap-2">
          <Button variant="ghost" size="icon" asChild data-testid="button-quote-mobile" aria-label="Get free quote">
            <Link href="/get-quote">
              <FileText className="h-4 w-4" />
            </Link>
          </Button>
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" data-testid="button-menu-mobile" aria-label="Open navigation menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[85vw] sm:w-[400px] overflow-y-auto">
              <nav className="flex flex-col gap-1 mt-8">
                {/* Home */}
                <Link href="/" onClick={() => setMobileOpen(false)}>
                  <div className="px-4 py-3 text-base font-medium rounded-md hover-elevate active-elevate-2 transition-colors" data-testid="link-home-mobile">
                    Home
                  </div>
                </Link>

                <Link href="/how-it-works" onClick={() => setMobileOpen(false)}>
                  <div className="px-4 py-3 text-base font-medium rounded-md hover-elevate active-elevate-2 transition-colors" data-testid="link-how-it-works-mobile">
                    How It Works
                  </div>
                </Link>

                {/* Main Pages */}
                <div className="mt-6 pt-6 border-t space-y-0.5">
                  <Link href="/about" onClick={() => setMobileOpen(false)}>
                    <div className="px-4 py-3 text-base font-medium rounded-md hover-elevate active-elevate-2 transition-colors" data-testid="link-about-mobile">
                      About
                    </div>
                  </Link>

                  <Link href="/contact" onClick={() => setMobileOpen(false)}>
                    <div className="px-4 py-3 text-base font-medium rounded-md hover-elevate active-elevate-2 transition-colors" data-testid="link-contact-mobile">
                      Contact
                    </div>
                  </Link>

                  <Button 
                    className="w-full mt-4" 
                    onClick={() => {
                      window.location.href = "/get-quote";
                      setMobileOpen(false);
                    }}
                    data-testid="button-quote-mobile"
                  >
                    Get Cash Offer
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
