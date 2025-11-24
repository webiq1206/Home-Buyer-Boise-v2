import { useState } from "react";
import { useLocation } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Home, MapPin } from "lucide-react";

export function HeroAddressLookup() {
  const [address, setAddress] = useState("");
  const [, setLocation] = useLocation();

  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault();
    if (address.trim()) {
      setLocation(`/savings-calculator?address=${encodeURIComponent(address.trim())}`);
    }
  };

  return (
    <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-2xl">
      <CardContent className="pt-8 pb-8 px-6 md:px-8">
        <div className="space-y-6">
          {/* Icon and Header */}
          <div className="flex items-start gap-4">
            <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 flex-shrink-0">
              <Home className="h-7 w-7 text-primary" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Enter Your Property Address
              </h2>
              <p className="text-sm text-muted-foreground">
                We'll look up your property details from county records
              </p>
            </div>
          </div>

          {/* Address Input Form */}
          <form onSubmit={handleLookup} className="space-y-4">
            <div className="relative">
              <Input
                type="text"
                placeholder="123 Main St, Boise, ID"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="h-14 pl-12 pr-4 text-base border-border/50 focus:border-primary"
                data-testid="input-hero-address"
              />
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full h-12 text-base font-semibold"
              disabled={!address.trim()}
              data-testid="button-hero-lookup"
            >
              Look Up
            </Button>
          </form>

          {/* Trust Badge */}
          <div className="pt-4 border-t border-border/30">
            <p className="text-xs text-muted-foreground text-center">
              Free property valuation • No obligation • Fast cash offers
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
