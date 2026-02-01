'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import {
  DollarSign,
  Home,
  Calculator,
  TrendingDown,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  ArrowRight,
  AlertCircle
} from 'lucide-react';

export function SavingsCalculator() {
  const [homeValue, setHomeValue] = useState<number>(400000);
  const [repairCosts, setRepairCosts] = useState<number>(15000);
  const [monthsToSell, setMonthsToSell] = useState<number>(3);
  const [monthlyHolding, setMonthlyHolding] = useState<number>(2500);
  
  // Calculation constants
  const REALTOR_COMMISSION = 0.06; // 6%
  const TRADITIONAL_CLOSING = 0.025; // 2.5%
  const STAGING_CLEANING = 3000;
  const CONCESSIONS = 0.02; // 2% typical buyer concessions
  
  // Cash offer is typically 70-85% of ARV (After Repair Value)
  const CASH_OFFER_PERCENT = 0.82; // 82% of home value
  
  const calculations = useMemo(() => {
    // Traditional sale calculations
    const traditionalGross = homeValue;
    const realtorCommission = traditionalGross * REALTOR_COMMISSION;
    const traditionalClosing = traditionalGross * TRADITIONAL_CLOSING;
    const holdingCosts = monthlyHolding * monthsToSell;
    const concessions = traditionalGross * CONCESSIONS;
    const traditionalTotalCosts = realtorCommission + traditionalClosing + repairCosts + STAGING_CLEANING + holdingCosts + concessions;
    const traditionalNet = traditionalGross - traditionalTotalCosts;
    
    // Cash sale calculations
    const cashOffer = homeValue * CASH_OFFER_PERCENT;
    const cashClosingCosts = 0; // We pay closing costs
    const cashNet = cashOffer - cashClosingCosts;
    
    // Time value calculation (7 days vs months)
    const daysToCloseTraditional = monthsToSell * 30;
    const daysToCloseCash = 7;
    
    // Compare
    const netDifference = traditionalNet - cashNet;
    const percentDifference = ((traditionalNet - cashNet) / traditionalNet) * 100;
    
    return {
      traditional: {
        gross: traditionalGross,
        realtorCommission,
        closingCosts: traditionalClosing,
        repairs: repairCosts,
        staging: STAGING_CLEANING,
        holding: holdingCosts,
        concessions,
        totalCosts: traditionalTotalCosts,
        net: traditionalNet,
        daysToClose: daysToCloseTraditional,
      },
      cash: {
        offer: cashOffer,
        closingCosts: cashClosingCosts,
        repairs: 0,
        net: cashNet,
        daysToClose: daysToCloseCash,
      },
      comparison: {
        netDifference,
        percentDifference,
        timeSaved: daysToCloseTraditional - daysToCloseCash,
        holdingCostsSaved: holdingCosts,
      }
    };
  }, [homeValue, repairCosts, monthsToSell, monthlyHolding]);
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);
  };
  
  return (
    <div className="space-y-8">
      {/* Input Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Enter Your Property Details
          </CardTitle>
          <CardDescription>
            Adjust the values below to see a personalized comparison
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Home Value */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <Label htmlFor="homeValue">Estimated Home Value</Label>
              <span className="text-lg font-semibold text-primary">{formatCurrency(homeValue)}</span>
            </div>
            <Slider
              id="homeValue"
              min={100000}
              max={1000000}
              step={10000}
              value={[homeValue]}
              onValueChange={([val]) => setHomeValue(val)}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>$100K</span>
              <span>$1M</span>
            </div>
          </div>
          
          {/* Repair Costs */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <Label htmlFor="repairs">Estimated Repair Costs</Label>
              <span className="text-lg font-semibold text-destructive">{formatCurrency(repairCosts)}</span>
            </div>
            <Slider
              id="repairs"
              min={0}
              max={100000}
              step={1000}
              value={[repairCosts]}
              onValueChange={([val]) => setRepairCosts(val)}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>$0</span>
              <span>$100K</span>
            </div>
          </div>
          
          {/* Time to Sell */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <Label htmlFor="months">Months to Sell (Traditional)</Label>
              <span className="text-lg font-semibold">{monthsToSell} months</span>
            </div>
            <Slider
              id="months"
              min={1}
              max={12}
              step={1}
              value={[monthsToSell]}
              onValueChange={([val]) => setMonthsToSell(val)}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>1 month</span>
              <span>12 months</span>
            </div>
          </div>
          
          {/* Monthly Holding Costs */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <Label htmlFor="holding">Monthly Holding Costs</Label>
              <span className="text-lg font-semibold">{formatCurrency(monthlyHolding)}/mo</span>
            </div>
            <Slider
              id="holding"
              min={500}
              max={5000}
              step={100}
              value={[monthlyHolding]}
              onValueChange={([val]) => setMonthlyHolding(val)}
              className="w-full"
            />
            <p className="text-xs text-muted-foreground">
              Includes mortgage, taxes, insurance, utilities, HOA
            </p>
          </div>
        </CardContent>
      </Card>
      
      {/* Comparison Results */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Traditional Sale */}
        <Card className="border-2">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Traditional Sale</CardTitle>
              <Badge variant="secondary" className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {calculations.traditional.daysToClose} days
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">List Price</span>
                <span className="font-medium">{formatCurrency(calculations.traditional.gross)}</span>
              </div>
              
              <div className="border-t pt-2 mt-2">
                <p className="font-medium text-destructive mb-2">Deductions:</p>
              </div>
              
              <div className="flex justify-between text-destructive">
                <span>Realtor Commission (6%)</span>
                <span>-{formatCurrency(calculations.traditional.realtorCommission)}</span>
              </div>
              <div className="flex justify-between text-destructive">
                <span>Closing Costs (2.5%)</span>
                <span>-{formatCurrency(calculations.traditional.closingCosts)}</span>
              </div>
              <div className="flex justify-between text-destructive">
                <span>Repairs & Updates</span>
                <span>-{formatCurrency(calculations.traditional.repairs)}</span>
              </div>
              <div className="flex justify-between text-destructive">
                <span>Staging & Cleaning</span>
                <span>-{formatCurrency(calculations.traditional.staging)}</span>
              </div>
              <div className="flex justify-between text-destructive">
                <span>Holding Costs ({monthsToSell} mo)</span>
                <span>-{formatCurrency(calculations.traditional.holding)}</span>
              </div>
              <div className="flex justify-between text-destructive">
                <span>Buyer Concessions (2%)</span>
                <span>-{formatCurrency(calculations.traditional.concessions)}</span>
              </div>
            </div>
            
            <div className="border-t pt-4">
              <div className="flex justify-between items-center">
                <span className="font-semibold">Your Net Proceeds</span>
                <span className="text-2xl font-bold">{formatCurrency(calculations.traditional.net)}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                After {calculations.traditional.daysToClose} days and all fees
              </p>
            </div>
          </CardContent>
        </Card>
        
        {/* Cash Sale */}
        <Card className="border-2 border-primary bg-primary/5">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg text-primary">Cash Sale to Us</CardTitle>
              <Badge className="bg-primary flex items-center gap-1">
                <Clock className="h-3 w-3" />
                7 days
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Cash Offer</span>
                <span className="font-medium">{formatCurrency(calculations.cash.offer)}</span>
              </div>
              
              <div className="border-t pt-2 mt-2">
                <p className="font-medium text-green-600 mb-2">You Save:</p>
              </div>
              
              <div className="flex justify-between text-green-600">
                <span className="flex items-center gap-1"><CheckCircle className="h-3 w-3" /> No Realtor Commission</span>
                <span>$0</span>
              </div>
              <div className="flex justify-between text-green-600">
                <span className="flex items-center gap-1"><CheckCircle className="h-3 w-3" /> No Closing Costs</span>
                <span>$0</span>
              </div>
              <div className="flex justify-between text-green-600">
                <span className="flex items-center gap-1"><CheckCircle className="h-3 w-3" /> No Repairs Needed</span>
                <span>$0</span>
              </div>
              <div className="flex justify-between text-green-600">
                <span className="flex items-center gap-1"><CheckCircle className="h-3 w-3" /> No Staging</span>
                <span>$0</span>
              </div>
              <div className="flex justify-between text-green-600">
                <span className="flex items-center gap-1"><CheckCircle className="h-3 w-3" /> Minimal Holding</span>
                <span>$0</span>
              </div>
              <div className="flex justify-between text-green-600">
                <span className="flex items-center gap-1"><CheckCircle className="h-3 w-3" /> No Concessions</span>
                <span>$0</span>
              </div>
            </div>
            
            <div className="border-t pt-4">
              <div className="flex justify-between items-center">
                <span className="font-semibold">Your Net Proceeds</span>
                <span className="text-2xl font-bold text-primary">{formatCurrency(calculations.cash.net)}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Cash in hand in 7 days
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Summary Comparison */}
      <Card className="bg-muted/50">
        <CardContent className="pt-6">
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Net Difference</p>
              <p className={`text-2xl font-bold ${calculations.comparison.netDifference > 0 ? 'text-green-600' : 'text-primary'}`}>
                {calculations.comparison.netDifference > 0 ? '+' : ''}{formatCurrency(Math.abs(calculations.comparison.netDifference))}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {calculations.comparison.netDifference > 0 
                  ? 'more with traditional (before your time value)' 
                  : 'more with cash sale'}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Time Saved</p>
              <p className="text-2xl font-bold text-primary">
                {calculations.comparison.timeSaved} days
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                faster with cash sale
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Holding Costs Saved</p>
              <p className="text-2xl font-bold text-green-600">
                {formatCurrency(calculations.comparison.holdingCostsSaved)}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {monthsToSell} months of payments avoided
              </p>
            </div>
          </div>
          
          {calculations.comparison.netDifference < 10000 && (
            <div className="mt-6 p-4 bg-primary/10 rounded-lg border border-primary/20">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-primary">Cash Sale May Be Your Best Option</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    When you factor in the stress, time, and uncertainty of a traditional sale, 
                    plus the {formatCurrency(calculations.comparison.holdingCostsSaved)} in holding costs you&apos;ll avoid, 
                    a cash sale could actually put more money in your pocket faster.
                  </p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* CTA */}
      <div className="text-center space-y-4">
        <p className="text-muted-foreground">
          Ready to see your actual cash offer? It&apos;s free, fast, and no obligation.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="bg-gold text-black hover:bg-gold/90">
            <Link href="/get-quote">
              Get Your Free Cash Offer
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a href="tel:2084052275">
              Call (208) 405-2275
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
