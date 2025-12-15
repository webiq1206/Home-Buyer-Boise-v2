import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Link, useLocation } from "wouter";
import { Phone, ArrowRight, MapPin, Home, Loader2, AlertCircle, CheckCircle2, Clock, DollarSign, Shield } from "lucide-react";
import { queryAssessor, getCountyFromCity } from "@/lib/assessors";
import type { PropertyData } from "@/lib/adaCountyAssessor";

export default function SavingsCalculator() {
  const [, setLocation] = useLocation();
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [suggestion, setSuggestion] = useState<string | null>(null);
  const [selectedProperty, setSelectedProperty] = useState<PropertyData | null>(null);
  const [properties, setProperties] = useState<PropertyData[]>([]);

  // Core lookup function
  const triggerAddressLookup = async (lookupAddress: string) => {
    if (!lookupAddress.trim()) {
      setError("Please enter an address");
      return;
    }

    setLoading(true);
    setError(null);
    setSuggestion(null);
    setProperties([]);
    setSelectedProperty(null);

    try {
      const county = getCountyFromCity(lookupAddress);
      const result = await queryAssessor({
        county,
        address: lookupAddress.trim(),
        enableFallback: true,
      });

      if (result.success && result.properties.length > 0) {
        setProperties(result.properties);
        
        if (result.properties.length === 1) {
          selectProperty(result.properties[0]);
        }
      } else {
        // No property found - still allow them to proceed
        setSelectedProperty({
          parcel: "MANUAL",
          address: lookupAddress,
          city: "Idaho",
        });
        setSuggestion("We couldn't find your property in county records, but you can still get a personalized offer.");
      }
    } catch (err) {
      console.error('[SavingsCalculator] Error:', err);
      // Still allow proceeding with manual address
      setSelectedProperty({
        parcel: "MANUAL",
        address: lookupAddress,
        city: "Idaho",
      });
      setSuggestion("We couldn't look up your property, but you can still get a personalized offer.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddressLookup = () => {
    triggerAddressLookup(address);
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const addressParam = params.get('address');
    if (addressParam) {
      setAddress(addressParam);
      triggerAddressLookup(addressParam);
    }
  }, []);

  const selectProperty = (property: PropertyData) => {
    setSelectedProperty(property);
    setProperties([]);
    setSuggestion(null);
    setError(null);
  };

  const handleGetOffer = () => {
    if (!selectedProperty) {
      setError("Please enter your property address first");
      return;
    }

    // Navigate to quote form with property address
    const params = new URLSearchParams({
      address: selectedProperty.address,
    });
    setLocation(`/get-quote?${params.toString()}`);
  };

  return (
    <>
      <Helmet>
        <title>Get Your Cash Offer | HomeBuyerBoise</title>
        <meta 
          name="description" 
          content="Get a fair, personalized cash offer for your Boise home. We evaluate every property individually to provide you with the best possible offer. No fees, no commissions." 
        />
        <meta name="keywords" content="cash offer for house, sell house fast Boise, free home offer, cash home buyer Idaho" />
        <link rel="canonical" href="https://homebuyerboise.com/savings-calculator" />
        
        <meta property="og:title" content="Get Your Cash Offer | HomeBuyerBoise" />
        <meta property="og:description" content="Get a fair, personalized cash offer. We evaluate every property individually." />
        <meta property="og:url" content="https://homebuyerboise.com/savings-calculator" />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="flex flex-col">
        {/* Hero Section */}
        <section className="relative py-24 md:py-32 bg-gradient-to-br from-primary via-primary/90 to-primary/70">
          <div className="absolute inset-0 bg-grid-white/5"></div>
          
          <div className="container px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <Badge variant="secondary" className="mb-4 bg-white/20 text-white border-white/30">
                <DollarSign className="h-3 w-3 mr-1" />
                Free, No-Obligation Offer
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white" data-testid="heading-hero">
                Get Your Personalized Cash Offer
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
                Every property is unique. We evaluate each home individually to give you a fair, competitive offer.
              </p>
            </div>
          </div>
        </section>

        {/* Property Lookup Section */}
        <section className="py-16 md:py-20 -mt-12 relative z-10">
          <div className="container px-4">
            <div className="max-w-4xl mx-auto">
              {/* Address Lookup Card */}
              <Card className="mb-8 shadow-xl border-primary/20">
                <CardContent className="p-6 md:p-8 pt-8 md:pt-10">
                  <div className="flex flex-col gap-6">
                    <div className="flex items-center gap-3">
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center flex-shrink-0">
                        <Home className="h-8 w-8 text-primary" strokeWidth={2.5} />
                      </div>
                      <div className="flex-1">
                        <Label htmlFor="address" className="text-lg font-semibold mb-2 block">
                          Enter Your Property Address
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          We'll look up your property details to prepare your personalized offer
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="flex-1">
                        <Input
                          id="address"
                          type="text"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && !loading && handleAddressLookup()}
                          className="text-lg h-12"
                          placeholder="123 Main St, Boise, ID"
                          disabled={loading}
                          data-testid="input-address"
                        />
                      </div>
                      <Button 
                        onClick={handleAddressLookup} 
                        disabled={loading || !address.trim()}
                        size="lg"
                        className="h-12 px-8"
                        data-testid="button-lookup"
                      >
                        {loading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Looking Up...
                          </>
                        ) : (
                          <>
                            <MapPin className="mr-2 h-4 w-4" />
                            Look Up
                          </>
                        )}
                      </Button>
                    </div>

                    {/* Error/Suggestion Messages */}
                    {error && (
                      <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    )}

                    {!error && suggestion && (
                      <Alert>
                        <AlertDescription>{suggestion}</AlertDescription>
                      </Alert>
                    )}

                    {/* Multiple Property Selection */}
                    {properties.length > 1 && (
                      <div className="space-y-3">
                        <p className="font-semibold text-sm">Select your property:</p>
                        <div className="grid gap-2">
                          {properties.map((prop, index) => (
                            <Button
                              key={index}
                              variant="outline"
                              className="h-auto py-3 px-4 justify-start text-left hover:bg-primary/5 hover:border-primary"
                              onClick={() => selectProperty(prop)}
                              data-testid={`button-select-property-${index}`}
                            >
                              <div className="flex items-start gap-3 w-full">
                                <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                                <div className="flex-1">
                                  <div className="font-semibold">{prop.address}</div>
                                  <div className="text-sm text-muted-foreground">{prop.city}, ID</div>
                                  {prop.buildingSqFt && (
                                    <div className="text-xs text-muted-foreground mt-1">
                                      {prop.buildingSqFt.toLocaleString()} sq ft
                                    </div>
                                  )}
                                </div>
                              </div>
                            </Button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Selected Property Display */}
                    {selectedProperty && (
                      <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <div className="flex-1">
                            <div className="font-semibold text-lg mb-1">{selectedProperty.address}</div>
                            <div className="text-sm text-muted-foreground mb-2">{selectedProperty.city}, Idaho</div>
                            {selectedProperty.buildingSqFt && (
                              <div className="flex flex-wrap gap-4 text-sm">
                                <div>
                                  <span className="text-muted-foreground">Size:</span>{' '}
                                  <span className="font-semibold">{selectedProperty.buildingSqFt.toLocaleString()} sq ft</span>
                                </div>
                                {selectedProperty.lotSizeSqFt && (
                                  <div>
                                    <span className="text-muted-foreground">Lot:</span>{' '}
                                    <span className="font-semibold">{selectedProperty.lotSizeSqFt.toLocaleString()} sq ft</span>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* CTA Section - Shows when property is selected */}
              {selectedProperty && (
                <div className="space-y-6">
                  {/* Get Offer Button */}
                  <Card className="shadow-lg border-[hsl(var(--gold))]/30 bg-gradient-to-br from-[hsl(var(--gold))]/5 to-[hsl(var(--gold))]/10">
                    <CardContent className="p-8 text-center">
                      <h2 className="text-2xl font-bold mb-3">Ready for Your Personalized Offer?</h2>
                      <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
                        Complete a quick form and our team will evaluate your property and reach out with a fair cash offer.
                      </p>
                      <Button 
                        size="lg" 
                        onClick={handleGetOffer}
                        className="h-14 px-12 text-lg"
                        data-testid="button-get-offer"
                      >
                        Get Your Free Cash Offer
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Or Call Us */}
                  <div className="text-center">
                    <p className="text-muted-foreground mb-3">Or speak directly with our team:</p>
                    <Button 
                      size="lg" 
                      variant="outline" 
                      className="h-14 px-8 text-lg"
                      asChild
                      data-testid="button-call"
                    >
                      <a href="tel:2084052275">
                        <Phone className="mr-2 h-5 w-5" />
                        (208) 405-2275
                      </a>
                    </Button>
                  </div>
                </div>
              )}

              {/* Benefits Grid - Always visible */}
              <div className="grid md:grid-cols-3 gap-6 mt-12">
                <Card className="text-center p-6">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <DollarSign className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-bold mb-2">Fair Cash Offers</h3>
                  <p className="text-sm text-muted-foreground">
                    We evaluate every property individually to ensure you get a competitive offer
                  </p>
                </Card>
                
                <Card className="text-center p-6">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-bold mb-2">Fast Closing</h3>
                  <p className="text-sm text-muted-foreground">
                    Close in as little as 7 days, or on your timeline - you choose
                  </p>
                </Card>
                
                <Card className="text-center p-6">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-bold mb-2">No Fees or Repairs</h3>
                  <p className="text-sm text-muted-foreground">
                    Zero commissions, no closing costs, sell as-is with no repairs needed
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-16 bg-gradient-to-br from-primary to-primary/80">
          <div className="container px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                Have Questions?
              </h2>
              <p className="text-xl text-white/90 mb-8">
                Our team is ready to answer your questions and provide a personalized evaluation of your property.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" asChild data-testid="button-cta-quote">
                  <Link href="/get-quote">
                    Request Your Offer
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="bg-white/10 text-white border-white/30 hover:bg-white/20" asChild data-testid="button-cta-call">
                  <a href="tel:2084052275">
                    <Phone className="mr-2 h-5 w-5" />
                    Call (208) 405-2275
                  </a>
                </Button>
              </div>
              <p className="mt-6 text-white/70 text-sm">
                Email: connect@buymyhouse.co
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
