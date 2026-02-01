"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
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
import { Menu, Home, DollarSign, FileText, HelpCircle, Building2, ArrowRight, MapPin, Phone } from "lucide-react";
import { SERVICES } from "@shared/servicesData";
import { CITIES } from "@shared/contentData";

export function Navigation() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/98 backdrop-blur supports-[backdrop-filter]:bg-background/95">
      <nav className="container flex h-20 items-center justify-between gap-4 px-8 md:px-12">
        <Link href="/" className="flex items-center flex-shrink-0" data-testid="link-home-logo">
          <Image 
            src="/images/logo.png" 
            alt="Home Buyer Boise - Cash Home Buyers in Boise Idaho" 
            width={200}
            height={40}
            className="h-10 w-auto"
            priority
          />
        </Link>

        <div className="flex-1"></div>

        <div className="hidden lg:flex items-center gap-8">
          <NavigationMenu>
            <NavigationMenuList className="gap-2">
              <NavigationMenuItem>
                <Link href="/">
                  <span
                    className={`px-4 py-2 text-sm font-medium transition-colors cursor-pointer ${
                      pathname === "/" ? "text-primary" : "text-foreground/80 hover:text-foreground"
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
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                {service.metaDescription.slice(0, 100)}...
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
                  <ul className="grid w-[300px] gap-2 p-4">
                    {CITIES.map((city) => (
                      <li key={city.slug}>
                        <Link href={`/areas/${city.slug}`}>
                          <NavigationMenuLink asChild>
                            <div className="flex items-center gap-2 rounded-md p-2 hover-elevate" data-testid={`nav-area-${city.slug}`}>
                              <MapPin className="h-4 w-4 text-primary" />
                              <span className="text-sm font-medium">{city.name}, Idaho</span>
                            </div>
                          </NavigationMenuLink>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/how-it-works">
                  <span
                    className={`px-4 py-2 text-sm font-medium transition-colors cursor-pointer ${
                      pathname === "/how-it-works" ? "text-primary" : "text-foreground/80 hover:text-foreground"
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
                      pathname === "/about" ? "text-primary" : "text-foreground/80 hover:text-foreground"
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
                      pathname === "/contact" ? "text-primary" : "text-foreground/80 hover:text-foreground"
                    }`}
                    data-testid="nav-contact"
                  >
                    Contact
                  </span>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <Button asChild data-testid="button-get-offer">
            <Link href="/get-quote">Get Cash Offer</Link>
          </Button>

          <Button variant="outline" asChild data-testid="button-phone">
            <a href="tel:2084052275">
              <Phone className="mr-2 h-4 w-4" />
              (208) 405-2275
            </a>
          </Button>
        </div>

        <div className="lg:hidden">
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" data-testid="button-mobile-menu">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-4 mt-8">
                <Link href="/" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 p-2 rounded-md hover-elevate">
                  <Home className="h-5 w-5" />
                  <span>Home</span>
                </Link>
                <Link href="/services" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 p-2 rounded-md hover-elevate">
                  <Building2 className="h-5 w-5" />
                  <span>Services</span>
                </Link>
                <Link href="/how-it-works" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 p-2 rounded-md hover-elevate">
                  <HelpCircle className="h-5 w-5" />
                  <span>How It Works</span>
                </Link>
                <Link href="/about" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 p-2 rounded-md hover-elevate">
                  <FileText className="h-5 w-5" />
                  <span>About</span>
                </Link>
                <Link href="/contact" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 p-2 rounded-md hover-elevate">
                  <FileText className="h-5 w-5" />
                  <span>Contact</span>
                </Link>
                <div className="pt-4 border-t">
                  <Button className="w-full" asChild>
                    <Link href="/get-quote" onClick={() => setMobileOpen(false)}>
                      Get Cash Offer
                    </Link>
                  </Button>
                </div>
                <a href="tel:2084052275" className="flex items-center gap-2 p-2 rounded-md hover-elevate text-primary">
                  <Phone className="h-5 w-5" />
                  <span>(208) 405-2275</span>
                </a>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
