import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Quote } from "lucide-react";
import { SHOW_UNVERIFIED_TRUST } from "@/lib/seo";

interface TestimonialsProps {
  serviceType?: string;
  limit?: number;
}

export async function Testimonials({ limit }: TestimonialsProps) {
  if (!SHOW_UNVERIFIED_TRUST) return null;

  const { FALLBACK_TESTIMONIALS } = await import("@/shared/fallbackSellerNotes");
  const displayTestimonials = limit ? FALLBACK_TESTIMONIALS.slice(0, limit) : FALLBACK_TESTIMONIALS;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {displayTestimonials.map((testimonial) => (
        <Card
          key={testimonial.id}
          className="hover-elevate transition-all duration-300 border-card-border relative overflow-hidden group"
          data-testid={`card-testimonial-${testimonial.id}`}
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary/5 to-transparent rounded-bl-[3rem] transition-all duration-300 group-hover:from-primary/10" />

          <div className="absolute top-6 left-6 opacity-5">
            <Quote className="h-12 w-12 text-primary" strokeWidth={1.5} />
          </div>

          <CardContent className="p-8 space-y-6 relative">
            <div className="flex items-center justify-between gap-3">
              <Badge variant="secondary" className="text-xs font-normal" data-testid="badge-situation">
                {testimonial.situation}
              </Badge>
              <div className="flex gap-0.5 flex-shrink-0" data-testid="rating-stars">
                {Array.from({ length: parseInt(testimonial.rating) }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary text-primary" strokeWidth={0} />
                ))}
              </div>
            </div>

            <div className="relative">
              <p className="text-base leading-relaxed text-foreground/90 italic" data-testid="text-testimonial">
                "{testimonial.testimonial}"
              </p>
            </div>

            <div className="pt-4 border-t border-border/50">
              <div className="font-semibold text-base text-foreground" data-testid="text-name">
                {testimonial.customerName}
              </div>
              <div className="text-sm text-muted-foreground font-normal mt-0.5" data-testid="text-location">
                {testimonial.city.charAt(0).toUpperCase() + testimonial.city.slice(1)}, Idaho
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
