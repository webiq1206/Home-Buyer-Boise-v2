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
import { Menu, Home, DollarSign, FileText, HelpCircle, Building2, ArrowRight, MapPin } from "lucide-react";
import { SERVICES } from "@shared/servicesData";
import { CITIES } from "@shared/contentData";

export function Navigation() {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/98 backdrop-blur supports-[backdrop-filter]:bg-background/95">
      <nav className="container flex h-20 items-center justify-between gap-4 px-8 md:px-12">
        <Link href="/" className="flex items-center flex-shrink-0" data-testid="link-home-logo">
          <div className="flex items-center gap-2">
            <Home className="h-7 w-7 text-primary" />
            <div className="flex flex-col">
              <span className="text-lg font-bold text-primary leading-tight">HomeBuyer</span>
              <span className="text-xs font-semibold text-primary/70 leading-tight -mt-0.5">BOISE</span>
            </div>
          </div>
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
                <NavigationMenuTrigger className="text-sm font-medium" data-testid="nav-services-trigger">
                  Services
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                    {SERVICES.map((service) => (
                      <li key={service.slug}>
                        <Link href={`/services/${service.slug}`}>
                          <NavigationMenuLink asChild>
                            <div className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover-elevate active-elevate-2" data-testid={`nav-service-${service.slug}`}>
                              <div className="text-sm font-medium leading-none">{service.name}</div>
                              <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">
                                {service.metaDescription.substring(0, 80)}...
                              </p>
                            </div>
                          </NavigationMenuLink>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-sm font-medium" data-testid="nav-areas-trigger">
                  Areas
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[300px] gap-3 p-4">
                    {CITIES.map((city) => (
                      <li key={city.slug}>
                        <Link href={`/areas/${city.slug}`}>
                          <NavigationMenuLink asChild>
                            <div className="flex items-center gap-2 select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover-elevate active-elevate-2" data-testid={`nav-area-${city.slug}`}>
                              <MapPin className="h-4 w-4 text-primary" />
                              <div className="text-sm font-medium">{city.name}, ID</div>
                            </div>
                          </NavigationMenuLink>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/pricing">
                  <span
                    className={`px-4 py-2 text-sm font-medium transition-colors cursor-pointer ${
                      location === "/pricing" ? "text-primary" : "text-foreground/80 hover:text-foreground"
                    }`}
                    data-testid="nav-pricing"
                  >
                    How It Works
                  </span>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/savings-calculator">
                  <span
                    className={`px-4 py-2 text-sm font-medium transition-colors cursor-pointer ${
                      location === "/savings-calculator" ? "text-primary" : "text-foreground/80 hover:text-foreground"
                    }`}
                    data-testid="nav-calculator"
                  >
                    Calculator
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
              <a href="tel:2084052274">
                (208) 405-CASH
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
                <Link href="/" onClick={() => setMobileOpen(false)}>
                  <div className="px-4 py-3 text-base font-medium rounded-md hover-elevate active-elevate-2 transition-colors" data-testid="link-home-mobile">
                    Home
                  </div>
                </Link>

                {/* Services Section */}
                <div className="mt-6">
                  <div className="px-4 py-2 text-xs font-semibold text-muted-foreground">
                    SERVICES
                  </div>
                  {SERVICES.map((service) => (
                    <Link key={service.slug} href={`/services/${service.slug}`} onClick={() => setMobileOpen(false)}>
                      <div className="px-4 py-2 text-sm rounded-md hover-elevate active-elevate-2 transition-colors" data-testid={`link-service-${service.slug}-mobile`}>
                        {service.name}
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Service Areas Section */}
                <div className="mt-6">
                  <div className="px-4 py-2 text-xs font-semibold text-muted-foreground">
                    SERVICE AREAS
                  </div>
                  {CITIES.map((city) => (
                    <Link key={city.slug} href={`/areas/${city.slug}`} onClick={() => setMobileOpen(false)}>
                      <div className="px-4 py-2 text-sm rounded-md hover-elevate active-elevate-2 transition-colors flex items-center gap-2" data-testid={`link-area-${city.slug}-mobile`}>
                        <MapPin className="h-3 w-3" />
                        {city.name}, ID
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Main Pages */}
                <div className="mt-6 pt-6 border-t space-y-0.5">
                  <Link href="/pricing" onClick={() => setMobileOpen(false)}>
                    <div className="px-4 py-3 text-base font-medium rounded-md hover-elevate active-elevate-2 transition-colors" data-testid="link-pricing-mobile">
                      How It Works
                    </div>
                  </Link>

                  <Link href="/savings-calculator" onClick={() => setMobileOpen(false)}>
                    <div className="px-4 py-3 text-base font-medium rounded-md hover-elevate active-elevate-2 transition-colors" data-testid="link-calculator-mobile">
                      Savings Calculator
                    </div>
                  </Link>

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
                    data-testid="button-quote-mobile-final"
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
