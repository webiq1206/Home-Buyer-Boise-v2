"use client";

import type { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { 
  Plane, 
  DollarSign, 
  Heart, 
  Home, 
  Key, 
  Users,
  Clock,
  Shield,
  TrendingDown
} from "lucide-react";

interface Situation {
  icon: ReactNode;
  title: string;
  description: string;
  feature: string;
  featureIcon: ReactNode;
  link: string;
}

const situations: Situation[] = [
  {
    icon: <Plane className="h-8 w-8 text-primary" />,
    title: "Relocating",
    description: "Moving for work, family, or a fresh start? We'll buy your house fast so you can focus on your new chapter.",
    feature: "Close in 7 days",
    featureIcon: <Clock className="h-4 w-4" />,
    link: "/services/relocation",
  },
  {
    icon: <DollarSign className="h-8 w-8 text-primary" />,
    title: "Facing Foreclosure",
    description: "Avoid foreclosure and protect your credit. We can close quickly and help you move forward with dignity.",
    feature: "Stop foreclosure now",
    featureIcon: <Shield className="h-4 w-4" />,
    link: "/services/facing-foreclosure",
  },
  {
    icon: <Heart className="h-8 w-8 text-primary" />,
    title: "Going Through Divorce",
    description: "Simplify your divorce by selling quickly. We make the process smooth and confidential.",
    feature: "Fast, fair split",
    featureIcon: <Users className="h-4 w-4" />,
    link: "/services/divorce",
  },
  {
    icon: <Home className="h-8 w-8 text-primary" />,
    title: "Inherited Property",
    description: "Dealing with a probate property? We handle the complexities and buy houses as-is.",
    feature: "No cleanup needed",
    featureIcon: <Home className="h-4 w-4" />,
    link: "/services/inherited-property",
  },
  {
    icon: <Key className="h-8 w-8 text-primary" />,
    title: "Tired Landlord",
    description: "Ready to exit the rental business? We buy investment properties with tenants in place.",
    feature: "Tenants? No problem",
    featureIcon: <Key className="h-4 w-4" />,
    link: "/services/tired-landlord",
  },
  {
    icon: <TrendingDown className="h-8 w-8 text-primary" />,
    title: "Financial Hardship",
    description: "Medical bills, job loss, or other challenges? We provide fast cash to help you recover.",
    feature: "Get cash quickly",
    featureIcon: <DollarSign className="h-4 w-4" />,
    link: "/services/financial-hardship",
  },
];

export function CommonSituations() {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="/images/superhero.png" 
          alt="Home Buyer Boise helps homeowners in difficult situations sell their house fast"
          className="w-full h-full object-cover"
          style={{ objectPosition: 'left bottom' }}
          width="1920"
          height="1080"
          loading="lazy"
        />
      </div>
      <div className="absolute inset-0 z-[1] bg-background/85"></div>
      
      <div className="container px-4 md:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              We Buy Houses in Any Situation
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Whatever circumstances you&apos;re facing, we provide fast, fair cash offers with no judgment and complete confidentiality.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {situations.map((situation, index) => (
              <Card key={index} className="hover-elevate transition-all duration-200" data-testid={`card-situation-${index}`}>
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-primary/10">
                      {situation.icon}
                    </div>
                    <Badge variant="secondary" className="flex items-center gap-1">
                      {situation.featureIcon}
                      {situation.feature}
                    </Badge>
                  </div>
                  <h3 className="text-xl font-semibold">{situation.title}</h3>
                  <p className="text-muted-foreground">{situation.description}</p>
                  <Button variant="outline" asChild className="w-full">
                    <Link href={situation.link}>
                      Learn More
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
