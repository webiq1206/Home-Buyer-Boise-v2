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
import { Menu, FileText, MapPin } from "lucide-react";
import { SERVICES } from "@/shared/servicesData";
import { CITIES } from "@/shared/contentData";

export function Navigation() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/98 backdrop-blur supports-[backdrop-filter]:bg-background/95">
      <nav className="container flex h-16 md:h-20 items-center justify-between gap-4 px-4 md:px-8 lg:px-12">
        <Link href="/" className="flex items-center flex-shrink-0" data-testid="link-home-logo">
          <Image 
            src="/logo.png" 
            alt="Home Buyer Boise - Cash Home Buyers in Boise Idaho" 
            width={200}
            height={50}
            className="h-11 md:h-12 w-auto"
            priority
          />
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
                      pathname === "/pricing" ? "text-primary" : "text-foreground/80 hover:text-foreground"
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
                      pathname === "/savings-calculator" ? "text-primary" : "text-foreground/80 hover:text-foreground"
                    }`}
                    data-testid="nav-calculator"
                  >
                    Calculator
                  </span>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/projects">
                  <span
                    className={`px-4 py-2 text-sm font-medium transition-colors cursor-pointer ${
                      pathname === "/projects" || pathname.startsWith("/projects/") ? "text-primary" : "text-foreground/80 hover:text-foreground"
                    }`}
                    data-testid="nav-projects"
                  >
                    Stories
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
                <Link href="/blog">
                  <span
                    className={`px-4 py-2 text-sm font-medium transition-colors cursor-pointer ${
                      pathname === "/blog" || pathname.startsWith("/blog/") ? "text-primary" : "text-foreground/80 hover:text-foreground"
                    }`}
                    data-testid="nav-blog"
                  >
                    Blog
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

          <div className="flex items-center gap-3 border-l pl-8">
            <Button 
              variant="ghost" 
              size="sm" 
              asChild 
              data-testid="button-phone-desktop"
            >
              <a href="tel:2084052274">
                (208) 405-2274
              </a>
            </Button>

            <Button 
              size="sm" 
              asChild
              data-testid="button-quote-desktop"
            >
              <Link href="/get-quote">
                Get Cash Offer
              </Link>
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

                  <Link href="/blog" onClick={() => setMobileOpen(false)}>
                    <div className="px-4 py-3 text-base font-medium rounded-md hover-elevate active-elevate-2 transition-colors" data-testid="link-blog-mobile">
                      Blog
                    </div>
                  </Link>

                  <Link href="/contact" onClick={() => setMobileOpen(false)}>
                    <div className="px-4 py-3 text-base font-medium rounded-md hover-elevate active-elevate-2 transition-colors" data-testid="link-contact-mobile">
                      Contact
                    </div>
                  </Link>

                  <Button 
                    className="w-full mt-4" 
                    asChild
                    data-testid="button-quote-mobile-final"
                  >
                    <Link href="/get-quote" onClick={() => setMobileOpen(false)}>
                      Get Cash Offer
                    </Link>
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
