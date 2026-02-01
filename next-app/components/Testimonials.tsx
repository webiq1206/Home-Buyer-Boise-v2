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
          setTestimonials(data);
        }
      } catch (error) {
        console.error('Failed to fetch testimonials:', error);
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

  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  const displayTestimonials = limit ? testimonials.slice(0, limit) : testimonials;

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
