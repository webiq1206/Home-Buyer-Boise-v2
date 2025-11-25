import { useState, useEffect, useRef, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Link, useLocation } from "wouter";
import { DollarSign, TrendingUp, Calculator, Phone, ArrowRight, MapPin, Home, Loader2, AlertCircle } from "lucide-react";
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
  const [homeValue, setHomeValue] = useState(0); // Start at 0 - only set after property lookup
  const [showManualEntry, setShowManualEntry] = useState(false);
  const [manualValue, setManualValue] = useState("");
  const [manualDisplayValue, setManualDisplayValue] = useState("");

  // ENHANCED savings calculations - showing MUCH MORE savings to make cash offers appealing
  // Commission increased from 6% to 7.5% (more realistic with buyer agent concessions)
  const realtorCommission = Math.round(homeValue * 0.075);           // 7.5% commission (up from 6%)
  const closingCosts = Math.round(homeValue * 0.025);                // 2.5% closing costs (up from 1.67%)
  const repairsUpdates = Math.round(homeValue * 0.05);               // 5% repairs (up from 3.33%)
  const stagingPhotosMarketing = Math.round(homeValue * 0.01);       // 1% marketing (up from 0.5%)
  const inspectionAppraisal = Math.round(homeValue * 0.005);         // 0.5% inspections (up from 0.27%)
  const holdingCosts = Math.round(homeValue * 0.02);                 // 2% holding costs (up from 1.33%)
  const contingencyFees = Math.round(homeValue * 0.015);             // NEW: 1.5% contingency/misc fees
  
  const totalSavings = realtorCommission + closingCosts + repairsUpdates + stagingPhotosMarketing + inspectionAppraisal + holdingCosts + contingencyFees;

  // Helper to calculate and format percentage
  const formatPercentage = (amount: number) => {
    if (homeValue === 0) return "0%";
    const percentage = (amount / homeValue) * 100;
    return `${percentage.toFixed(1)}%`;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  const handleManualValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    if (value === '') {
      setManualValue("");
      setManualDisplayValue('');
      return;
    }
    const numValue = parseInt(value);
    setManualValue(value);
    setManualDisplayValue(formatNumber(numValue));
  };

  const handleManualEntry = () => {
    if (!manualValue || parseInt(manualValue) < 50000) {
      setError("Please enter a valid home value (minimum $50,000)");
      return;
    }

    const value = parseInt(manualValue);
    
    // Create a minimal PropertyData object for manual entry
    const manualProperty: PropertyData = {
      parcel: "MANUAL-ENTRY",
      address: address || "Manual Entry",
      city: address.toUpperCase().includes("NAMPA") ? "Nampa" : 
            address.toUpperCase().includes("CALDWELL") ? "Caldwell" :
            address.toUpperCase().includes("MIDDLETON") ? "Middleton" : "Unknown",
      buildingSqFt: Math.round(value / 250), // Reverse estimate
    };

    setSelectedProperty(manualProperty);
    setHomeValue(value);
    setShowManualEntry(false);
    setError(null);
    setSuggestion(null);
  };

  // Core lookup function that can be called with an address parameter
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
      // Detect county from address
      const county = getCountyFromCity(lookupAddress);
      console.log('[SavingsCalculator] Looking up address:', lookupAddress, 'in county:', county);

      const result = await queryAssessor({
        county,
        address: lookupAddress.trim(),
        enableFallback: true,
      });

      if (result.success && result.properties.length > 0) {
        setProperties(result.properties);
        
        if (result.properties.length === 1) {
          // Single property found - auto-select it
          selectProperty(result.properties[0]);
        } else {
          // Multiple properties - show selection UI
          setError(null);
          setSuggestion(`Found ${result.properties.length} properties. Please select one below.`);
        }
      } else {
        setError(result.error || "Property not found");
        setSuggestion(result.suggestion || null);
        // Show manual entry option when lookup fails
        setShowManualEntry(true);
      }
    } catch (err) {
      console.error('[SavingsCalculator] Lookup error:', err);
      setError("Unable to look up property. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handler for button click that uses current address state
  const handleAddressLookup = () => {
    triggerAddressLookup(address);
  };

  // Read address from URL query parameter on mount and auto-trigger lookup
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const addressParam = params.get('address');
    if (addressParam) {
      setAddress(addressParam);
      // Auto-trigger lookup after setting address
      triggerAddressLookup(addressParam);
    }
  }, []);

  const selectProperty = (property: PropertyData) => {
    setSelectedProperty(property);
    setProperties([]);
    setSuggestion(null);
    setError(null);

    // Estimate home value based on property size and city
    const estimatedValue = estimateHomeValue(property);
    setHomeValue(estimatedValue);
  };

  const estimateHomeValue = (property: PropertyData): number => {
    // Guard: ensure we have property data
    if (!property.city || !property.buildingSqFt) {
      console.warn('[SavingsCalculator] Missing property data for estimation:', property);
      return 300000; // Fallback default
    }

    // Base value on city and property characteristics
    let baseValuePerSqFt = 200; // Default

    // Adjust by city
    const city = property.city.toUpperCase();
    if (city.includes('EAGLE')) {
      baseValuePerSqFt = 280;
    } else if (city.includes('MERIDIAN')) {
      baseValuePerSqFt = 250;
    } else if (city.includes('BOISE')) {
      baseValuePerSqFt = 260;
    } else if (city.includes('STAR')) {
      baseValuePerSqFt = 240;
    } else if (city.includes('KUNA')) {
      baseValuePerSqFt = 230;
    } else if (city.includes('NAMPA')) {
      baseValuePerSqFt = 210;
    } else if (city.includes('CALDWELL')) {
      baseValuePerSqFt = 200;
    } else if (city.includes('MIDDLETON')) {
      baseValuePerSqFt = 220;
    }

    // Calculate based on building square footage
    const buildingSqFt = property.buildingSqFt || 1800;
    const estimatedValue = Math.round(buildingSqFt * baseValuePerSqFt);

    // Round to nearest $5,000 for cleaner presentation
    return Math.round(estimatedValue / 5000) * 5000;
  };

  const handleGetOffer = () => {
    // Guard: require selected property
    if (!selectedProperty || homeValue === 0) {
      setError("Please look up your property first");
      return;
    }

    // Navigate to quote form with pre-filled data
    const params = new URLSearchParams({
      address: selectedProperty.address,
      estimatedValue: homeValue.toString(),
      savings: totalSavings.toString(),
    });
    setLocation(`/get-quote?${params.toString()}`);
  };

  const costs = [
    {
      title: "Realtor Commission",
      description: "7.5% split between buyer and seller agents (including concessions)",
      amount: realtorCommission,
      percentage: formatPercentage(realtorCommission),
    },
    {
      title: "Closing Costs",
      description: "Title insurance, escrow, transfer taxes, recording fees",
      amount: closingCosts,
      percentage: formatPercentage(closingCosts),
    },
    {
      title: "Repairs & Updates",
      description: "Average pre-sale improvements and buyer-requested repairs",
      amount: repairsUpdates,
      percentage: formatPercentage(repairsUpdates),
    },
    {
      title: "Staging, Photos, Marketing",
      description: "Professional staging, photography, online listings, open houses",
      amount: stagingPhotosMarketing,
      percentage: formatPercentage(stagingPhotosMarketing),
    },
    {
      title: "Inspection & Appraisal Fees",
      description: "Pre-listing inspection, buyer's inspection, appraisal fees",
      amount: inspectionAppraisal,
      percentage: formatPercentage(inspectionAppraisal),
    },
    {
      title: "Holding Costs",
      description: "Mortgage, insurance, utilities, maintenance while listed (avg 60-90 days)",
      amount: holdingCosts,
      percentage: formatPercentage(holdingCosts),
    },
    {
      title: "Contingency & Misc Fees",
      description: "HOA fees, buyer concessions, price reductions, attorney fees",
      amount: contingencyFees,
      percentage: formatPercentage(contingencyFees),
    },
  ];

  return (
    <>
      <Helmet>
        <title>Savings Calculator - See What You Save Selling to Us | HomeBuyerBoise</title>
        <meta 
          name="description" 
          content="Calculate exactly how much you save selling your house directly to HomeBuyerBoise vs. listing with a realtor. No commissions, no fees, no repairs needed." 
        />
        <meta name="keywords" content="home selling savings calculator, realtor commission calculator, cash home buyer savings, sell house cost comparison" />
        <link rel="canonical" href="https://homebuyerboise.com/savings-calculator" />
        
        <meta property="og:title" content="Savings Calculator - Compare Traditional Sale vs. Cash Offer" />
        <meta property="og:description" content="See exactly how much you save selling to us. No realtor commissions, no closing costs, no repairs." />
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
                <Calculator className="h-3 w-3 mr-1" />
                Interactive Calculator
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white" data-testid="heading-hero">
                What You Save Selling to Us
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
                Enter your address to get an instant valuation and see your potential savings
              </p>
            </div>
          </div>
        </section>

        {/* Calculator Section */}
        <section className="py-16 md:py-20 -mt-12 relative z-10">
          <div className="container px-4">
            <div className="max-w-4xl mx-auto">
              {/* Address Lookup Card */}
              <Card className="mb-12 shadow-xl border-primary/20">
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
                          We'll look up your property details from county records
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
                        <AlertDescription>
                          {error}
                          {suggestion && (
                            <p className="mt-2 text-sm">{suggestion}</p>
                          )}
                        </AlertDescription>
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
                                      Est. {prop.buildingSqFt.toLocaleString()} sq ft
                                    </div>
                                  )}
                                </div>
                              </div>
                            </Button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Manual Entry Option */}
                    {showManualEntry && !selectedProperty && (
                      <div className="p-6 bg-muted/30 border border-border rounded-lg">
                        <div className="mb-4">
                          <h3 className="font-semibold text-lg mb-2">Enter Your Home Value Manually</h3>
                          <p className="text-sm text-muted-foreground">
                            Property lookup isn't available for this location. Please enter your estimated home value to see your potential savings.
                          </p>
                        </div>
                        <div className="flex gap-3">
                          <div className="flex-1">
                            <div className="relative">
                              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl font-bold text-muted-foreground">
                                $
                              </span>
                              <Input
                                type="text"
                                value={manualDisplayValue}
                                onChange={handleManualValueChange}
                                onKeyDown={(e) => e.key === 'Enter' && handleManualEntry()}
                                className="text-2xl font-bold h-14 pl-10 pr-4"
                                placeholder="300,000"
                                data-testid="input-manual-value"
                              />
                            </div>
                            <p className="text-xs text-muted-foreground mt-2">
                              Enter an approximate value - this helps us calculate your savings
                            </p>
                          </div>
                          <Button 
                            onClick={handleManualEntry}
                            disabled={!manualValue || parseInt(manualValue) < 50000}
                            size="lg"
                            className="h-14 px-8"
                            data-testid="button-manual-entry"
                          >
                            Calculate Savings
                          </Button>
                        </div>
                      </div>
                    )}

                    {/* Selected Property Display */}
                    {selectedProperty && (
                      <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                        <div className="flex items-start gap-3">
                          <Home className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <div className="flex-1">
                            <div className="font-semibold text-lg mb-1">{selectedProperty.address}</div>
                            <div className="text-sm text-muted-foreground mb-2">{selectedProperty.city}, Idaho</div>
                            <div className="flex flex-wrap gap-4 text-sm">
                              {selectedProperty.buildingSqFt && (
                                <div>
                                  <span className="text-muted-foreground">Building:</span>{' '}
                                  <span className="font-semibold">{selectedProperty.buildingSqFt.toLocaleString()} sq ft</span>
                                </div>
                              )}
                              {selectedProperty.lotSizeSqFt && (
                                <div>
                                  <span className="text-muted-foreground">Lot:</span>{' '}
                                  <span className="font-semibold">{selectedProperty.lotSizeSqFt.toLocaleString()} sq ft</span>
                                </div>
                              )}
                            </div>
                            <div className="mt-3 pt-3 border-t border-border/50">
                              <div className="text-sm text-muted-foreground mb-1">Estimated Value</div>
                              <div className="text-3xl font-bold text-primary">{formatCurrency(homeValue)}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Cost Breakdown - Only show if we have a selected property AND value */}
              {selectedProperty && homeValue > 0 && (
                <>
                  <Card className="shadow-lg mb-8">
                    <CardContent className="p-8">
                      <div className="mb-6">
                        <h2 className="text-2xl font-bold mb-2">Traditional Sale Costs</h2>
                        <p className="text-muted-foreground">Here's what you'd typically pay selling through a realtor:</p>
                      </div>
                      <div className="space-y-6">
                        {costs.map((cost, index) => (
                          <div 
                            key={index} 
                            className="flex justify-between items-start pb-6 border-b border-border/50 last:border-0 last:pb-0 transition-all duration-300 hover:bg-muted/20 hover:-mx-4 hover:px-4 hover:py-2 rounded-lg"
                            data-testid={`cost-item-${index}`}
                          >
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <div className="font-bold text-lg">{cost.title}</div>
                                <Badge variant="secondary" className="text-xs bg-[hsl(var(--gold))]/10 text-[hsl(var(--gold))] border-[hsl(var(--gold))]/30">
                                  {cost.percentage}
                                </Badge>
                              </div>
                              <div className="text-sm text-muted-foreground">{cost.description}</div>
                            </div>
                            <div className="text-xl font-bold text-destructive ml-4 transition-all duration-300">
                              {formatCurrency(cost.amount)}
                            </div>
                          </div>
                        ))}

                        {/* Total Savings */}
                        <div className="pt-6 border-t-2 border-primary/30">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-3">
                              <TrendingUp className="h-8 w-8 text-primary" />
                              <div>
                                <div className="text-2xl font-bold">Total You Save</div>
                                <div className="text-sm text-muted-foreground">Selling to us instead</div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-5xl font-bold text-primary" data-testid="text-total-savings">
                                {formatCurrency(totalSavings)}
                              </div>
                              <div className="text-lg font-semibold text-[hsl(var(--gold))] mt-1">
                                {formatPercentage(totalSavings)} saved
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Value Proposition */}
                  <div className="mb-8 p-6 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl border border-primary/20">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                        <DollarSign className="h-6 w-6 text-primary" strokeWidth={2.5} />
                      </div>
                      <div>
                        <p className="text-lg font-semibold mb-2">
                          You keep 100% of our offer
                        </p>
                        <p className="text-muted-foreground">
                          No deductions, no surprises, no hidden fees. The cash offer we present is exactly what you'll receive at closing.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Get Offer CTA - Only show when we have a property AND value */}
                  <div className="text-center">
                    <Button 
                      size="lg" 
                      onClick={handleGetOffer}
                      disabled={!selectedProperty || homeValue === 0}
                      className="h-14 px-12 text-lg"
                      data-testid="button-get-offer"
                    >
                      Get Your Free Cash Offer
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                    <p className="mt-3 text-sm text-muted-foreground">
                      Your property details will be pre-filled
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 bg-gradient-to-br from-primary to-primary/80">
          <div className="container px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                Questions About Your Savings?
              </h2>
              <p className="text-xl text-white/90 mb-8">
                Talk to our team to learn more about how we can help you save
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" asChild data-testid="button-cta-quote">
                  <Link href="/get-quote">
                    Get Your Free Cash Offer
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="bg-white/10 text-white border-white/30 hover:bg-white/20" asChild data-testid="button-cta-call">
                  <a href="tel:2084052274">
                    <Phone className="mr-2 h-5 w-5" />
                    Call (208) 405-CASH
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
