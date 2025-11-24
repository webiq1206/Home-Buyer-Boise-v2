import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { DollarSign, TrendingUp, Calculator, Phone, ArrowRight } from "lucide-react";

export default function SavingsCalculator() {
  const [homeValue, setHomeValue] = useState(300000);
  const [displayValue, setDisplayValue] = useState("300,000");

  // Calculate all costs based on home value with Math.round to ensure exact dollar amounts
  // Using exact ratios from $300k example ($39,300 total savings)
  const realtorCommission = Math.round(homeValue * (18000 / 300000));      // Exactly $18,000 on $300k (6%)
  const closingCosts = Math.round(homeValue * (5000 / 300000));            // Exactly $5,000 on $300k (1.67%)
  const repairsUpdates = Math.round(homeValue * (10000 / 300000));         // Exactly $10,000 on $300k (3.33%)
  const stagingPhotosMarketing = Math.round(homeValue * (1500 / 300000));  // Exactly $1,500 on $300k (0.5%)
  const inspectionAppraisal = Math.round(homeValue * (800 / 300000));      // Exactly $800 on $300k (0.27%)
  const holdingCosts = Math.round(homeValue * (4000 / 300000));            // Exactly $4,000 on $300k (1.33%)
  
  const totalSavings = realtorCommission + closingCosts + repairsUpdates + stagingPhotosMarketing + inspectionAppraisal + holdingCosts;

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

  const handleHomeValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    if (value === '') {
      setHomeValue(0);
      setDisplayValue('');
      return;
    }
    const numValue = parseInt(value);
    setHomeValue(numValue);
    setDisplayValue(formatNumber(numValue));
  };

  const costs = [
    {
      title: "Realtor Commission",
      description: "Typically split between buyer and seller agents",
      amount: realtorCommission,
      percentage: formatPercentage(realtorCommission),
    },
    {
      title: "Closing Costs",
      description: "Title, escrow, transfer taxes",
      amount: closingCosts,
      percentage: formatPercentage(closingCosts),
    },
    {
      title: "Repairs & Updates",
      description: "Average pre-sale improvements",
      amount: repairsUpdates,
      percentage: formatPercentage(repairsUpdates),
    },
    {
      title: "Staging, Photos, Marketing",
      description: "Professional presentation costs",
      amount: stagingPhotosMarketing,
      percentage: formatPercentage(stagingPhotosMarketing),
    },
    {
      title: "Inspection & Appraisal Fees",
      description: "Required for traditional sales",
      amount: inspectionAppraisal,
      percentage: formatPercentage(inspectionAppraisal),
    },
    {
      title: "Holding Costs (2 months avg)",
      description: "Mortgage, insurance, utilities, maintenance",
      amount: holdingCosts,
      percentage: formatPercentage(holdingCosts),
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
                Enter your home's value to see your instant savings calculation
              </p>
            </div>
          </div>
        </section>

        {/* Calculator Section */}
        <section className="py-16 md:py-20 -mt-20 relative z-10">
          <div className="container px-4">
            <div className="max-w-4xl mx-auto">
              {/* Home Value Input Card */}
              <Card className="mb-12 shadow-xl border-primary/20">
                <CardContent className="p-8">
                  <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                        <DollarSign className="h-8 w-8 text-primary" strokeWidth={2.5} />
                      </div>
                    </div>
                    <div className="flex-1 w-full">
                      <Label htmlFor="homeValue" className="text-lg font-semibold mb-2 block">
                        Enter Your Home's Value
                      </Label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-bold text-muted-foreground">
                          $
                        </span>
                        <Input
                          id="homeValue"
                          type="text"
                          value={displayValue}
                          onChange={handleHomeValueChange}
                          className="text-3xl font-bold h-16 pl-10 pr-4"
                          placeholder="300,000"
                          data-testid="input-home-value"
                        />
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">
                        Adjust the value to see your personalized savings
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Cost Breakdown */}
              <Card className="shadow-lg">
                <CardContent className="p-8">
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
                            <Badge variant="secondary" className="text-xs">
                              {cost.percentage}
                            </Badge>
                          </div>
                          <div className="text-sm text-muted-foreground">{cost.description}</div>
                        </div>
                        <div className="text-xl font-bold text-primary ml-4 transition-all duration-300">
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
                            <div className="text-2xl font-bold">Total Savings</div>
                            <div className="text-sm text-muted-foreground">When you sell to us</div>
                          </div>
                        </div>
                        <div className="text-4xl font-bold text-primary" data-testid="text-total-savings">
                          {formatCurrency(totalSavings)}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Value Proposition */}
              <div className="mt-8 p-6 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl border border-primary/20">
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
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-gradient-to-br from-primary to-primary/80">
          <div className="container px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                Ready to Get Your Cash Offer?
              </h2>
              <p className="text-xl text-white/90 mb-8">
                See how much you could save on your home sale
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
