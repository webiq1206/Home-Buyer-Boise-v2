import type { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
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
import superheroBackground from "@assets/Super Hero_1764092731439.png";

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
    title: "Job Relocation",
    description: "Moving for work and need to sell quickly. Start your new position without worrying about an unsold house back in Boise.",
    feature: "Close in 7-14 days",
    featureIcon: <Clock className="h-3.5 w-3.5" />,
    link: "/services/relocation-sale",
  },
  {
    icon: <DollarSign className="h-8 w-8 text-primary" />,
    title: "Financial Hardship",
    description: "Behind on payments and need immediate relief. Sell before foreclosure and protect your credit while getting a fresh start.",
    feature: "No upfront fees",
    featureIcon: <Shield className="h-3.5 w-3.5" />,
    link: "/services/avoid-foreclosure",
  },
  {
    icon: <Heart className="h-8 w-8 text-primary" />,
    title: "Divorce",
    description: "Need to split assets and move forward. Avoid arguments about repairs and get a fast, fair settlement for both parties.",
    feature: "Confidential process",
    featureIcon: <Shield className="h-3.5 w-3.5" />,
    link: "/services/sell-house-divorce",
  },
  {
    icon: <Home className="h-8 w-8 text-primary" />,
    title: "Downsizing",
    description: "Ready to simplify without the hassle. Empty nesters can skip repairs to worn carpet and outdated kitchens from decades of family life.",
    feature: "Flexible timeline",
    featureIcon: <Clock className="h-3.5 w-3.5" />,
    link: "/services/downsizing",
  },
  {
    icon: <Key className="h-8 w-8 text-primary" />,
    title: "Inherited Property",
    description: "Don't want to deal with estate clean-out or probate delays. Sell the inherited home quickly and split proceeds among heirs.",
    feature: "Fast & reliable",
    featureIcon: <TrendingDown className="h-3.5 w-3.5" />,
    link: "/services/inherited-property",
  },
  {
    icon: <Users className="h-8 w-8 text-primary" />,
    title: "Problem Rental",
    description: "Tired of landlord headaches and difficult tenants. Exit the rental business fast, even with tenants still in place.",
    feature: "Fast & reliable",
    featureIcon: <TrendingDown className="h-3.5 w-3.5" />,
    link: "/services/problem-tenants",
  },
];

export function CommonSituations() {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      {/* Super Hero Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src={superheroBackground} 
          alt=""
          className="w-full h-full object-cover opacity-30"
          width="1920"
          height="1080"
          loading="lazy"
        />
      </div>
      {/* Overlay for readability */}
      <div className="absolute inset-0 z-[1] bg-background/70"></div>
      <div className="container px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="heading-situations">
              Common Situations We Help With
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Whatever your situation, we provide fast, fair cash offers with no hassles
            </p>
          </div>

          {/* Situations Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {/* First 4 situations - full row */}
            {situations.slice(0, 4).map((situation, index) => (
              <Card 
                key={index} 
                className="relative overflow-hidden border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg group"
                data-testid={`card-situation-${index}`}
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[hsl(var(--gold))] to-primary"></div>
                
                <CardContent className="pt-6 pb-6">
                  <Badge 
                    variant="secondary" 
                    className="mb-4 bg-[hsl(var(--gold))]/10 text-[hsl(var(--gold))] border-[hsl(var(--gold))]/30"
                  >
                    Seller Scenario
                  </Badge>
                  
                  <div className="mb-4 w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                    {situation.icon}
                  </div>

                  <h3 className="font-bold text-xl mb-3">{situation.title}</h3>
                  
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed min-h-[80px]">
                    {situation.description}
                  </p>

                  <div className="flex items-center gap-2 text-sm font-medium text-primary pt-3 border-t border-border/50">
                    {situation.featureIcon}
                    <span>{situation.feature}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Last 2 situations - centered */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-3xl mx-auto mb-8">
            {situations.slice(4, 6).map((situation, index) => (
              <Card 
                key={index + 4} 
                className="relative overflow-hidden border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg group"
                data-testid={`card-situation-${index + 4}`}
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[hsl(var(--gold))] to-primary"></div>
                
                <CardContent className="pt-6 pb-6">
                  <Badge 
                    variant="secondary" 
                    className="mb-4 bg-[hsl(var(--gold))]/10 text-[hsl(var(--gold))] border-[hsl(var(--gold))]/30"
                  >
                    Seller Scenario
                  </Badge>
                  
                  <div className="mb-4 w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                    {situation.icon}
                  </div>

                  <h3 className="font-bold text-xl mb-3">{situation.title}</h3>
                  
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed min-h-[80px]">
                    {situation.description}
                  </p>

                  <div className="flex items-center gap-2 text-sm font-medium text-primary pt-3 border-t border-border/50">
                    {situation.featureIcon}
                    <span>{situation.feature}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <p className="text-lg text-muted-foreground mb-6">
              Don't see your situation? We buy houses in ANY condition, for ANY reason.
            </p>
            <Button size="lg" asChild data-testid="button-get-quote">
              <Link href="/get-quote">
                Get Your Free Cash Offer
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
