import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MapPin, Award, Building2, Calendar } from "lucide-react";
import { BUSINESS_INFO } from "@/lib/seo";

interface AuthorInfo {
  name: string;
  role: string;
  bio: string;
  credentials: string[];
  expertise: string[];
  location: string;
  since: string;
}

const defaultAuthorInfo: AuthorInfo = {
  name: `${BUSINESS_INFO.name} Team`,
  role: "Local Real Estate Investment Experts",
  bio: `The ${BUSINESS_INFO.name} team consists of licensed Idaho real estate professionals with experience in the Treasure Valley market since ${BUSINESS_INFO.founded}. We've helped hundreds of homeowners sell their properties quickly and fairly.`,
  credentials: [
    "Licensed Idaho Real Estate Investors",
    "BBB Accredited (A+ Rating)",
    ...BUSINESS_INFO.certifications,
  ],
  expertise: ["Cash Home Buying", "Probate Sales", "Foreclosure Prevention", "As-Is Sales"],
  location: `${BUSINESS_INFO.address.city}, ${BUSINESS_INFO.address.state}`,
  since: BUSINESS_INFO.founded,
};

interface AuthorBioProps {
  authorName?: string;
  variant?: "inline" | "card" | "compact";
  showCredentials?: boolean;
  className?: string;
}

export function AuthorBio({ authorName, variant = "card", showCredentials = true, className = "" }: AuthorBioProps) {
  const author: AuthorInfo = {
    ...defaultAuthorInfo,
    name: authorName || defaultAuthorInfo.name,
  };

  const initials = author.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();

  if (variant === "compact") {
    return (
      <div className={`flex items-center gap-3 ${className}`} data-testid="author-bio-compact">
        <Avatar className="h-10 w-10 border-2 border-primary/20">
          <AvatarFallback className="bg-primary/10 text-primary font-semibold text-sm">{initials}</AvatarFallback>
        </Avatar>
        <div>
          <div className="font-semibold text-sm">{author.name}</div>
          <div className="text-xs text-muted-foreground flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            {author.location}
          </div>
        </div>
      </div>
    );
  }

  if (variant === "inline") {
    return (
      <div className={`flex items-start gap-4 py-4 border-t border-b ${className}`} data-testid="author-bio-inline">
        <Avatar className="h-12 w-12 border-2 border-primary/20">
          <AvatarFallback className="bg-primary/10 text-primary font-semibold">{initials}</AvatarFallback>
        </Avatar>
        <div className="space-y-1">
          <div className="font-semibold">{author.name}</div>
          <div className="text-sm text-muted-foreground">{author.role}</div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <MapPin className="h-3 w-3" />
            <span>{author.location}</span>
            <span className="text-muted-foreground/50">|</span>
            <Calendar className="h-3 w-3" />
            <span>Since {author.since}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Card className={`overflow-hidden ${className}`} data-testid="author-bio-card">
      <CardContent className="p-6 space-y-4">
        <div className="flex items-start gap-4">
          <Avatar className="h-16 w-16 border-2 border-primary/20">
            <AvatarFallback className="bg-primary/10 text-primary font-bold text-xl">{initials}</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <div className="font-bold text-lg">{author.name}</div>
            <div className="text-sm text-muted-foreground">{author.role}</div>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {author.location}
              </span>
              <span className="flex items-center gap-1">
                <Building2 className="h-3 w-3" />
                Since {author.since}
              </span>
            </div>
          </div>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed">
          {author.bio}
        </p>

        {showCredentials && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Award className="h-4 w-4 text-primary" />
              <span>Credentials & Memberships</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {author.credentials.map((credential, index) => (
                <Badge key={index} variant="secondary" className="text-xs font-normal">
                  {credential}
                </Badge>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-2">
          <div className="text-sm font-medium">Areas of Expertise</div>
          <div className="flex flex-wrap gap-2">
            {author.expertise.map((area, index) => (
              <Badge key={index} variant="outline" className="text-xs font-normal">
                {area}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface ArticleBylineProps {
  authorName?: string;
  date?: string;
  className?: string;
}

export function ArticleByline({ authorName, date, className = "" }: ArticleBylineProps) {
  const displayName = authorName || defaultAuthorInfo.name;
  const initials = displayName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();

  return (
    <div className={`flex items-center gap-3 text-sm text-muted-foreground ${className}`} data-testid="article-byline">
      <Avatar className="h-8 w-8 border border-primary/20">
        <AvatarFallback className="bg-primary/10 text-primary font-semibold text-xs">{initials}</AvatarFallback>
      </Avatar>
      <div className="flex items-center gap-2">
        <span className="font-medium text-foreground">{displayName}</span>
        {date && (
          <>
            <span className="text-muted-foreground/50">|</span>
            <span>{date}</span>
          </>
        )}
      </div>
    </div>
  );
}
