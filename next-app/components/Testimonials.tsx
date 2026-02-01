'use client';

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Quote } from "lucide-react";

interface Testimonial {
  id: number;
  customerName: string;
  city: string;
  rating: string;
  situation: string;
  testimonial: string;
}

interface TestimonialsProps {
  serviceType?: string;
  limit?: number;
}

// Static fallback testimonials when database is unavailable
const FALLBACK_TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    customerName: "Michael R.",
    city: "boise",
    rating: "5",
    situation: "Inherited Property",
    testimonial: "After inheriting my parents' home, I didn't know what to do. Home Buyer Boise made the process simple and stress-free. They gave me a fair cash offer and closed in just 10 days."
  },
  {
    id: 2,
    customerName: "Sarah & Tom K.",
    city: "meridian",
    rating: "5",
    situation: "Relocating",
    testimonial: "We had to relocate for work with only 3 weeks notice. Traditional selling wasn't an option. Home Buyer Boise bought our house quickly and we were able to move without the stress of showings."
  },
  {
    id: 3,
    customerName: "Jennifer L.",
    city: "nampa",
    rating: "5",
    situation: "Avoiding Foreclosure",
    testimonial: "I was behind on payments and facing foreclosure. Home Buyer Boise helped me sell quickly, pay off my mortgage, and walk away with cash in my pocket. They truly saved me."
  },
  {
    id: 4,
    customerName: "David M.",
    city: "eagle",
    rating: "5",
    situation: "Tired Landlord",
    testimonial: "After years of dealing with difficult tenants, I was done. Home Buyer Boise purchased my rental property as-is. No repairs, no cleaning, just a fair cash offer."
  },
  {
    id: 5,
    customerName: "Linda & James P.",
    city: "kuna",
    rating: "5",
    situation: "Downsizing",
    testimonial: "We needed to downsize quickly after retirement. Home Buyer Boise gave us a competitive offer and worked around our schedule. The whole team was professional and caring."
  },
  {
    id: 6,
    customerName: "Robert H.",
    city: "caldwell",
    rating: "5",
    situation: "Divorce Settlement",
    testimonial: "Going through a divorce is hard enough. Home Buyer Boise made selling our shared property easy. They handled everything and we both got our share quickly."
  }
];

export function Testimonials({ serviceType, limit }: TestimonialsProps) {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const url = serviceType 
          ? `/api/testimonials?serviceType=${serviceType}`
          : '/api/testimonials';
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          // Use fetched data if available, otherwise use fallback
          setTestimonials(data && data.length > 0 ? data : FALLBACK_TESTIMONIALS);
        } else {
          // API error - use fallback testimonials
          setTestimonials(FALLBACK_TESTIMONIALS);
        }
      } catch (error) {
        console.error('Failed to fetch testimonials, using fallback:', error);
        // Network error - use fallback testimonials
        setTestimonials(FALLBACK_TESTIMONIALS);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTestimonials();
  }, [serviceType]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="border-card-border relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary/5 to-transparent rounded-bl-[3rem]" />
            <CardContent className="p-8 relative">
              <div className="h-4 bg-muted rounded animate-pulse mb-6" />
              <div className="space-y-3">
                <div className="h-3 bg-muted rounded animate-pulse" />
                <div className="h-3 bg-muted rounded animate-pulse" />
                <div className="h-3 bg-muted rounded animate-pulse w-2/3" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  // This should rarely happen with fallback, but safety check
  const displayData = testimonials.length > 0 ? testimonials : FALLBACK_TESTIMONIALS;

  const displayTestimonials = limit ? displayData.slice(0, limit) : displayData;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {displayTestimonials.map((testimonial) => (
        <Card 
          key={testimonial.id} 
          className="hover-elevate transition-all duration-300 border-card-border relative overflow-hidden group" 
          data-testid={`card-testimonial-${testimonial.id}`}
        >
          {/* Decorative corner accent */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary/5 to-transparent rounded-bl-[3rem] transition-all duration-300 group-hover:from-primary/10" />
          
          {/* Large decorative quote mark */}
          <div className="absolute top-6 left-6 opacity-5">
            <Quote className="h-12 w-12 text-primary" strokeWidth={1.5} />
          </div>

          <CardContent className="p-8 space-y-6 relative">
            {/* Situation Badge & Stars */}
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

            {/* Quote */}
            <div className="relative">
              <p className="text-base leading-relaxed text-foreground/90 italic" data-testid="text-testimonial">
                "{testimonial.testimonial}"
              </p>
            </div>

            {/* Author */}
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
