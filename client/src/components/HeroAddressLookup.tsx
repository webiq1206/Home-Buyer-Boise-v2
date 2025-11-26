import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Home, MapPin, Loader2 } from "lucide-react";
import { OpenStreetMapProvider } from "leaflet-geosearch";

interface AddressResult {
  label: string;
  x: number;
  y: number;
}

export function HeroAddressLookup() {
  const [address, setAddress] = useState("");
  const [, setLocation] = useLocation();
  const [suggestions, setSuggestions] = useState<AddressResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const debounceRef = useRef<NodeJS.Timeout>();
  const provider = useRef(new OpenStreetMapProvider());
  const wrapperRef = useRef<HTMLDivElement>(null);

  const fetchSuggestions = async (query: string) => {
    if (!query.trim() || query.length < 3) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);
    try {
      const searchQuery = `${query}, Boise, Idaho`;
      console.log('[HeroAddressLookup] Searching for:', searchQuery);
      
      const results = await provider.current.search({ query: searchQuery });
      console.log('[HeroAddressLookup] Found results:', results.length);
      
      const formattedResults = results.slice(0, 5).map((result: any) => ({
        label: result.label,
        x: result.x,
        y: result.y,
      }));
      
      setSuggestions(formattedResults);
      if (formattedResults.length > 0) {
        setShowSuggestions(true);
      }
    } catch (error) {
      console.error("[HeroAddressLookup] Error fetching suggestions:", error);
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      fetchSuggestions(address);
    }, 300);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [address]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectAddress = (result: AddressResult) => {
    const addressParts = result.label.split(',');
    let streetAddress = addressParts.length >= 2 
      ? addressParts.slice(0, 2).map(p => p.trim()).join(' ')
      : result.label;
    
    setAddress(streetAddress);
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault();
    if (address.trim()) {
      setLocation(`/savings-calculator?address=${encodeURIComponent(address.trim())}`);
    }
  };

  return (
    <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-2xl overflow-visible">
      <CardContent className="pt-8 pb-8 px-6 md:px-8 overflow-visible">
        <div className="space-y-6">
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

          <form onSubmit={handleLookup} className="space-y-4">
            <div ref={wrapperRef} className="relative">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="123 Main St, Boise, ID"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
                  className="h-14 pl-12 pr-10 text-base border-border/50 focus:border-primary"
                  data-testid="input-hero-address"
                />
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                {isLoading && (
                  <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground animate-spin" />
                )}
              </div>

              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-border rounded-lg shadow-lg z-[9999] max-h-64 overflow-y-auto">
                  <div className="p-1">
                    <p className="px-3 py-2 text-xs font-medium text-muted-foreground">
                      Suggested Addresses
                    </p>
                    {suggestions.map((result, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => handleSelectAddress(result)}
                        className="w-full flex items-center gap-2 px-3 py-2 text-left text-sm hover:bg-primary/5 rounded-md transition-colors"
                        data-testid={`address-suggestion-${index}`}
                      >
                        <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
                        <span className="truncate">{result.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
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
