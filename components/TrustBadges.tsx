import { Shield, Award, MapPin, Clock, Home, Star, CheckCircle, Users } from "lucide-react";
import { BUSINESS_INFO } from "@/lib/seo";

interface TrustBadgesProps {
  variant?: "default" | "compact" | "hero";
  cityName?: string;
  className?: string;
}

export function TrustBadges({ variant = "default", cityName, className = "" }: TrustBadgesProps) {
  const yearsSince = new Date().getFullYear() - parseInt(BUSINESS_INFO.founded);
  const locationText = cityName || BUSINESS_INFO.address.city;

  const badges = [
    { icon: Clock, label: "Years in Business", value: `Since ${BUSINESS_INFO.founded}` },
    { icon: Home, label: "Yearly Transactions", value: `${BUSINESS_INFO.yearlyServicesCompleted}+` },
    { icon: Star, label: "Customer Rating", value: `${BUSINESS_INFO.rating}/5` },
    { icon: MapPin, label: "Local Company", value: `${locationText}, ID` },
    { icon: Shield, label: "Licensed & Insured", value: "ID Licensed" },
    { icon: CheckCircle, label: "BBB Accredited", value: "A+ Rating" },
  ];

  if (variant === "hero") {
    return (
      <div className={`flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm ${className}`} data-testid="trust-badges-hero">
        <div className="flex items-center gap-2">
          <Shield className="h-4 w-4 text-accent" />
          <span>Licensed & Insured</span>
        </div>
        <div className="flex items-center gap-2">
          <Star className="h-4 w-4 text-accent fill-accent" />
          <span>{BUSINESS_INFO.rating}/5 Rating</span>
        </div>
        <div className="flex items-center gap-2">
          <Home className="h-4 w-4 text-accent" />
          <span>{BUSINESS_INFO.yearlyServicesCompleted}+ Sales/Year</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle className="h-4 w-4 text-accent" />
          <span>BBB A+ Rated</span>
        </div>
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <div className={`flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground ${className}`} data-testid="trust-badges-compact">
        {badges.slice(0, 4).map((badge, index) => (
          <div key={index} className="flex items-center gap-1.5">
            <badge.icon className="h-3.5 w-3.5 text-primary" />
            <span>{badge.value}</span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 ${className}`} data-testid="trust-badges">
      {badges.map((badge, index) => (
        <div 
          key={index}
          className="flex flex-col items-center text-center p-4 rounded-lg bg-muted/30 hover-elevate transition-all duration-200"
        >
          <badge.icon className="h-8 w-8 text-primary mb-2" />
          <span className="font-semibold text-foreground">{badge.value}</span>
          <span className="text-xs text-muted-foreground">{badge.label}</span>
        </div>
      ))}
    </div>
  );
}

interface TrustStatsProps {
  className?: string;
}

export function TrustStats({ className = "" }: TrustStatsProps) {
  const yearsSince = new Date().getFullYear() - parseInt(BUSINESS_INFO.founded);
  
  const stats = [
    { value: `${BUSINESS_INFO.yearlyServicesCompleted}+`, label: "Transactions/Year", description: "Across the Treasure Valley" },
    { value: `${BUSINESS_INFO.reviewCount}+`, label: "Customer Reviews", description: `${BUSINESS_INFO.rating}/5 average rating` },
    { value: `${yearsSince}+`, label: "Years in Business", description: `Serving Idaho since ${BUSINESS_INFO.founded}` },
    { value: "A+", label: "BBB Rating", description: "Better Business Bureau accredited" },
  ];

  return (
    <section className={`py-16 bg-primary text-primary-foreground ${className}`} data-testid="trust-stats-section">
      <div className="container px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-3">Trusted by Treasure Valley Homeowners</h2>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto">
            Real numbers from real transactions. We've built our reputation on fair deals and satisfied sellers.
          </p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {stats.map((stat, index) => (
            <div key={index} className="text-center p-6" data-testid={`stat-${index}`}>
              <div className="text-4xl md:text-5xl font-bold text-accent mb-2">{stat.value}</div>
              <div className="font-semibold text-lg mb-1">{stat.label}</div>
              <div className="text-sm text-primary-foreground/70">{stat.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

interface CompanyCredentialsProps {
  className?: string;
}

export function CompanyCredentials({ className = "" }: CompanyCredentialsProps) {
  const credentials = [
    { 
      icon: Shield, 
      title: "Licensed & Insured",
      description: `Fully licensed real estate investment company in the State of Idaho. ${BUSINESS_INFO.insurance}`
    },
    { 
      icon: Award, 
      title: "BBB Accredited Business",
      description: "Better Business Bureau accredited with an A+ rating. Zero unresolved complaints."
    },
    { 
      icon: MapPin, 
      title: "Local Boise Company",
      description: `Not a national franchise. We're locally owned, headquartered at ${BUSINESS_INFO.address.street}, ${BUSINESS_INFO.address.city}.`
    },
    { 
      icon: Users, 
      title: "Professional Network",
      description: `${BUSINESS_INFO.certifications.join('. ')}. Member of local and national investor associations.`
    },
  ];

  return (
    <section className={`py-16 md:py-24 ${className}`} data-testid="credentials-section">
      <div className="container px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">Why Trust {BUSINESS_INFO.name}?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We're not just another "we buy houses" company. We're a legitimate, established business with credentials to back up our promises.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {credentials.map((cred, index) => (
            <div 
              key={index}
              className="flex items-start gap-4 p-6 rounded-lg bg-card border hover-elevate transition-all duration-200"
              data-testid={`credential-${index}`}
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <cred.icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">{cred.title}</h3>
                <p className="text-muted-foreground text-sm">{cred.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ReviewHighlight({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`} data-testid="review-highlight">
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star key={star} className="h-5 w-5 text-accent fill-accent" />
        ))}
      </div>
      <div className="text-sm">
        <span className="font-semibold">{BUSINESS_INFO.rating} out of 5</span>
        <span className="text-muted-foreground"> based on {BUSINESS_INFO.reviewCount} reviews</span>
      </div>
    </div>
  );
}
