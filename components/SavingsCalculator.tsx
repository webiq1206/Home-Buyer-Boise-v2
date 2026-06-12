'use client';

import { useState, useMemo, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import Link from 'next/link';
import {
  Calculator,
  Clock,
  CheckCircle,
  ArrowRight,
  AlertCircle,
  Info,
} from 'lucide-react';
import {
  calculateOfferRange,
  CONDITION_MULTIPLIERS,
  REPAIR_ESTIMATES_PER_SQFT,
  REPAIR_ESTIMATES_FLAT,
  HOLDING_COSTS_PER_MONTH,
} from '@/lib/services/offerCalculator';

type ConditionKey = keyof typeof CONDITION_MULTIPLIERS;

const CONDITION_OPTIONS: Array<{
  value: ConditionKey;
  label: string;
  description: string;
}> = [
  {
    value: 'excellent',
    label: 'Excellent — move-in ready',
    description: 'Recently updated, no known issues, ready to list today.',
  },
  {
    value: 'good',
    label: 'Good — minor cosmetic updates',
    description: 'Paint, flooring, or small fixes needed. No major systems work.',
  },
  {
    value: 'fair',
    label: 'Fair — moderate repairs needed',
    description: 'Dated kitchen/baths, aging roof or HVAC, deferred maintenance.',
  },
  {
    value: 'needs_work',
    label: 'Needs work — significant repairs',
    description: 'Multiple major systems aging, larger renovation needed before sale.',
  },
  {
    value: 'major_repairs',
    label: 'Major repairs — structural or system issues',
    description: 'Foundation, roof replacement, full gut, or unsafe to occupy.',
  },
];

const CONCESSIONS_RATE = 0.02;
const STAGING_CLEANING = 3000;
/** 1% of ARV per month after the third month on market */
const PRICE_REDUCTION_RATE_PER_MONTH = 0.01;
const PRICE_REDUCTION_STARTS_AFTER_MONTH = 3;

export function SavingsCalculator() {
  const [homeValue, setHomeValue] = useState<number>(400000);
  const [condition, setCondition] = useState<ConditionKey>('fair');
  const [squareFeet, setSquareFeet] = useState<number>(1800);
  const [monthsToSell, setMonthsToSell] = useState<number>(6);
  const [monthlyHolding, setMonthlyHolding] = useState<number>(HOLDING_COSTS_PER_MONTH);

  // Editable traditional-sale assumptions (Boise / NAR averages by default)
  const [commissionRate, setCommissionRate] = useState<number>(6);
  const [closingRate, setClosingRate] = useState<number>(2.5);
  const [negotiationRate, setNegotiationRate] = useState<number>(3.75);
  const [inspectionCredits, setInspectionCredits] = useState<number>(8000);

  // Suggested repair cost from the same engine used at /get-quote.
  const suggestedRepairs = useMemo(() => {
    if (squareFeet > 0) {
      return Math.round(squareFeet * REPAIR_ESTIMATES_PER_SQFT[condition]);
    }
    return REPAIR_ESTIMATES_FLAT[condition];
  }, [condition, squareFeet]);

  const [repairCosts, setRepairCosts] = useState<number>(suggestedRepairs);
  const [repairsTouched, setRepairsTouched] = useState<boolean>(false);

  // Keep the repair input in sync with condition/sqft unless the user
  // has manually overridden it.
  useEffect(() => {
    if (!repairsTouched) {
      setRepairCosts(suggestedRepairs);
    }
  }, [suggestedRepairs, repairsTouched]);

  const calculations = useMemo(() => {
    // --- Traditional sale (realistic: negotiation, price drops, inspection credits) ---
    const listPrice = homeValue;
    const monthsWithReduction = Math.max(
      0,
      monthsToSell - PRICE_REDUCTION_STARTS_AFTER_MONTH,
    );
    const priceReductionWhileListed =
      monthsWithReduction * homeValue * PRICE_REDUCTION_RATE_PER_MONTH;
    const salePrice = Math.max(
      0,
      homeValue * (1 - negotiationRate / 100) - priceReductionWhileListed,
    );
    const realtorCommission = salePrice * (commissionRate / 100);
    const traditionalClosing = salePrice * (closingRate / 100);
    const holdingCosts = monthlyHolding * monthsToSell;
    const concessions = salePrice * CONCESSIONS_RATE;
    const traditionalTotalCosts =
      realtorCommission +
      traditionalClosing +
      repairCosts +
      STAGING_CLEANING +
      holdingCosts +
      concessions +
      inspectionCredits;
    const traditionalNet = salePrice - traditionalTotalCosts;

    // --- Cash sale: drive from the real offer engine ---
    const offer = calculateOfferRange({
      estimatedMarketValue: homeValue,
      condition,
      squareFeet: squareFeet > 0 ? squareFeet : undefined,
    });

    const daysToCloseTraditional = monthsToSell * 30;
    const daysToCloseCash = 7;

    // The cash anchor already nets out repairs, holding, closing, buyer
    // agent fee, and the buyer's profit margin — it is what the seller
    // walks away with.
    const cashNet = offer.anchorOffer;

    // "Effective" traditional comparison — what the seller actually
    // pockets once the months of holding payments are spent.
    const effectiveTraditionalNet = traditionalNet; // holding already deducted above

    const netDifference = effectiveTraditionalNet - cashNet;
    const closeCallThreshold = Math.max(15000, homeValue * 0.03);
    const feesAndCostsAvoided =
      realtorCommission +
      traditionalClosing +
      STAGING_CLEANING +
      concessions +
      repairCosts +
      inspectionCredits;

    return {
      traditional: {
        listPrice,
        salePrice,
        priceReductionWhileListed,
        realtorCommission,
        closingCosts: traditionalClosing,
        repairs: repairCosts,
        staging: STAGING_CLEANING,
        holding: holdingCosts,
        concessions,
        inspectionCredits,
        totalCosts: traditionalTotalCosts,
        net: traditionalNet,
        daysToClose: daysToCloseTraditional,
      },
      cash: {
        offerLow: offer.offerLow,
        offerHigh: offer.offerHigh,
        anchorOffer: offer.anchorOffer,
        estimatedRepairs: offer.estimatedRepairs,
        holdingCosts: offer.holdingCosts,
        closingCosts: offer.closingCosts,
        buyerAgentFee: offer.buyerAgentFee,
        net: cashNet,
        daysToClose: daysToCloseCash,
        belowMinimumViable: offer.belowMinimumViable,
        warnings: offer.warnings,
        conditionMultiplier: offer.calculationInputs.conditionMultiplier,
      },
      comparison: {
        netDifference,
        cashIsBetter: netDifference <= 0,
        closeCall: Math.abs(netDifference) <= closeCallThreshold,
        timeSaved: daysToCloseTraditional - daysToCloseCash,
        holdingCostsSaved: holdingCosts,
        feesAndCostsAvoided,
      },
    };
  }, [
    homeValue,
    condition,
    squareFeet,
    monthsToSell,
    monthlyHolding,
    repairCosts,
    commissionRate,
    closingRate,
    negotiationRate,
    inspectionCredits,
  ]);

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);

  const formatRange = (low: number, high: number) =>
    `${formatCurrency(low)} – ${formatCurrency(high)}`;

  const conditionMeta = CONDITION_OPTIONS.find((o) => o.value === condition)!;

  return (
    <TooltipProvider>
      <div className="space-y-8">
        {/* Input Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              Enter Your Property Details
            </CardTitle>
            <CardDescription>
              The cash range is calculated using the same engine our team uses
              to evaluate deals — adjust the inputs to match your home.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Home Value */}
            <div className="space-y-3">
              <div className="flex justify-between items-center flex-wrap gap-2">
                <Label htmlFor="homeValueInput">Estimated Home Value (ARV)</Label>
                <Input
                  id="homeValueInput"
                  type="number"
                  className="w-32 text-right font-semibold"
                  value={homeValue}
                  min={50000}
                  max={2000000}
                  step={5000}
                  onChange={(e) => {
                    const v = Number(e.target.value);
                    if (!Number.isNaN(v)) setHomeValue(v);
                  }}
                  data-testid="input-home-value"
                />
              </div>
              <Slider
                id="homeValue"
                min={100000}
                max={1000000}
                step={10000}
                value={[Math.min(1000000, Math.max(100000, homeValue))]}
                onValueChange={([val]) => setHomeValue(val)}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>$100K</span>
                <span>$1M</span>
              </div>
              <p className="text-xs text-muted-foreground">
                After-Repair Value (ARV) is what a fully-renovated comparable
                home in your neighborhood would sell for.
              </p>
            </div>

            {/* Property Condition */}
            <div className="space-y-3">
              <Label htmlFor="condition">Property Condition</Label>
              <Select
                value={condition}
                onValueChange={(v) => {
                  setCondition(v as ConditionKey);
                  setRepairsTouched(false);
                }}
              >
                <SelectTrigger id="condition" data-testid="select-condition">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CONDITION_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">{conditionMeta.description}</p>
            </div>

            {/* Square Footage */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <Label htmlFor="sqft">Square Footage (optional)</Label>
                <Input
                  id="sqft"
                  type="number"
                  className="w-32 text-right"
                  value={squareFeet}
                  min={0}
                  max={10000}
                  step={50}
                  onChange={(e) => {
                    const v = Number(e.target.value);
                    if (!Number.isNaN(v)) {
                      setSquareFeet(v);
                      setRepairsTouched(false);
                    }
                  }}
                  data-testid="input-square-feet"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Used to fine-tune the repair estimate. Leave 0 to use a flat
                per-condition estimate.
              </p>
            </div>

            {/* Repair Costs */}
            <div className="space-y-3">
              <div className="flex justify-between items-center flex-wrap gap-2">
                <Label htmlFor="repairs" className="flex items-center gap-1">
                  Repair Costs to Sell Traditionally
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button type="button" aria-label="More information" className="cursor-help inline-flex"><Info className="h-3 w-3 text-muted-foreground" /></button>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      Auto-suggested from condition and sqft. Editing it here
                      only affects the traditional-sale column — the cash offer
                      already factors in repairs based on condition.
                    </TooltipContent>
                  </Tooltip>
                </Label>
                <span className="text-lg font-semibold text-destructive">
                  {formatCurrency(repairCosts)}
                </span>
              </div>
              <Slider
                id="repairs"
                min={0}
                max={Math.max(100000, suggestedRepairs * 2)}
                step={1000}
                value={[repairCosts]}
                onValueChange={([val]) => {
                  setRepairCosts(val);
                  setRepairsTouched(true);
                }}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>$0</span>
                <span>
                  Suggested:{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setRepairCosts(suggestedRepairs);
                      setRepairsTouched(false);
                    }}
                    className="underline hover:text-primary"
                  >
                    {formatCurrency(suggestedRepairs)}
                  </button>
                </span>
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
                <span className="text-lg font-semibold">
                  {formatCurrency(monthlyHolding)}/mo
                </span>
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
                Mortgage + taxes + insurance + utilities + HOA. Boise-area
                default is {formatCurrency(HOLDING_COSTS_PER_MONTH)}/mo.
              </p>
            </div>

            {/* Editable traditional-sale assumptions */}
            <div className="grid sm:grid-cols-2 gap-4 pt-2 border-t">
              <div className="space-y-2">
                <Label htmlFor="commission" className="flex items-center gap-1">
                  Realtor Commission (%)
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button type="button" aria-label="More information" className="cursor-help inline-flex"><Info className="h-3 w-3 text-muted-foreground" /></button>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      NAR national average is 5–6% (listing + buyer's agent),
                      typically split between the two agents.
                    </TooltipContent>
                  </Tooltip>
                </Label>
                <Input
                  id="commission"
                  type="number"
                  min={0}
                  max={10}
                  step={0.1}
                  value={commissionRate}
                  onChange={(e) => {
                    const v = Number(e.target.value);
                    if (!Number.isNaN(v)) setCommissionRate(v);
                  }}
                  data-testid="input-commission-rate"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="closing" className="flex items-center gap-1">
                  Seller Closing Costs (%)
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button type="button" aria-label="More information" className="cursor-help inline-flex"><Info className="h-3 w-3 text-muted-foreground" /></button>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      Title, escrow, transfer taxes, and prorated property
                      taxes. Treasure Valley sellers typically pay 2–3%.
                    </TooltipContent>
                  </Tooltip>
                </Label>
                <Input
                  id="closing"
                  type="number"
                  min={0}
                  max={5}
                  step={0.1}
                  value={closingRate}
                  onChange={(e) => {
                    const v = Number(e.target.value);
                    if (!Number.isNaN(v)) setClosingRate(v);
                  }}
                  data-testid="input-closing-rate"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="negotiation" className="flex items-center gap-1">
                  Negotiation Discount (%)
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button type="button" aria-label="More information" className="cursor-help inline-flex"><Info className="h-3 w-3 text-muted-foreground" /></button>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      Typical gap between list price and final sale price after
                      buyer negotiation. Most sellers receive less than their
                      asking price.
                    </TooltipContent>
                  </Tooltip>
                </Label>
                <Input
                  id="negotiation"
                  type="number"
                  min={0}
                  max={15}
                  step={0.25}
                  value={negotiationRate}
                  onChange={(e) => {
                    const v = Number(e.target.value);
                    if (!Number.isNaN(v)) setNegotiationRate(v);
                  }}
                  data-testid="input-negotiation-rate"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="inspection" className="flex items-center gap-1">
                  Inspection / Repair Credits ($)
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button type="button" aria-label="More information" className="cursor-help inline-flex"><Info className="h-3 w-3 text-muted-foreground" /></button>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      Credits or price reductions buyers commonly request after
                      inspection — typically $5,000–$20,000 on older homes.
                    </TooltipContent>
                  </Tooltip>
                </Label>
                <Input
                  id="inspection"
                  type="number"
                  min={0}
                  max={50000}
                  step={500}
                  value={inspectionCredits}
                  onChange={(e) => {
                    const v = Number(e.target.value);
                    if (!Number.isNaN(v)) setInspectionCredits(v);
                  }}
                  data-testid="input-inspection-credits"
                />
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Price reductions of 1% of home value per month are applied after
              month {PRICE_REDUCTION_STARTS_AFTER_MONTH} on market.
            </p>
          </CardContent>
        </Card>

        {/* Comparison Results */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Traditional Sale */}
          <Card className="border-2">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
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
                  <span className="text-muted-foreground">List Price (ARV)</span>
                  <span className="font-medium">
                    {formatCurrency(calculations.traditional.listPrice)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Expected Sale Price</span>
                  <span className="font-medium">
                    {formatCurrency(calculations.traditional.salePrice)}
                  </span>
                </div>
                {calculations.traditional.salePrice < calculations.traditional.listPrice && (
                  <p className="text-xs text-muted-foreground">
                    After {negotiationRate}% negotiation
                    {calculations.traditional.priceReductionWhileListed > 0 &&
                      ` and ${formatCurrency(calculations.traditional.priceReductionWhileListed)} in price reductions while listed`}
                  </p>
                )}
                <div className="border-t pt-2 mt-2">
                  <p className="font-medium text-destructive mb-2">Deductions:</p>
                </div>
                <div className="flex justify-between text-destructive">
                  <span>Realtor Commission ({commissionRate}%)</span>
                  <span>-{formatCurrency(calculations.traditional.realtorCommission)}</span>
                </div>
                <div className="flex justify-between text-destructive">
                  <span>Closing Costs ({closingRate}%)</span>
                  <span>-{formatCurrency(calculations.traditional.closingCosts)}</span>
                </div>
                <div className="flex justify-between text-destructive">
                  <span>Repairs &amp; Updates</span>
                  <span>-{formatCurrency(calculations.traditional.repairs)}</span>
                </div>
                <div className="flex justify-between text-destructive">
                  <span>Staging &amp; Cleaning</span>
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
                <div className="flex justify-between text-destructive">
                  <span>Inspection / Repair Credits</span>
                  <span>-{formatCurrency(calculations.traditional.inspectionCredits)}</span>
                </div>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Your Net Proceeds</span>
                  <span className="text-2xl font-bold" data-testid="text-traditional-net">
                    {formatCurrency(calculations.traditional.net)}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  After {calculations.traditional.daysToClose} days and all
                  fees, including {monthsToSell} months of holding payments.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Cash Sale */}
          <Card className="border-2 border-primary bg-primary/5">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <CardTitle className="text-lg text-primary">Cash Sale to Us</CardTitle>
                <Badge className="bg-primary flex items-center gap-1">
                  <Clock className="h-3 w-3" />7 days
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Estimated Offer Range</span>
                  <span className="font-medium" data-testid="text-cash-range">
                    {formatRange(
                      calculations.cash.offerLow,
                      calculations.cash.offerHigh,
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Anchor Offer</span>
                  <span className="font-semibold text-primary">
                    {formatCurrency(calculations.cash.anchorOffer)}
                  </span>
                </div>

                <div className="border-t pt-2 mt-2">
                  <p className="font-medium text-foreground mb-2">
                    What's already factored in:
                  </p>
                </div>
                <div className="flex justify-between">
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <CheckCircle className="h-3 w-3 text-green-600" />
                    Repair cost
                  </span>
                  <span className="text-foreground">
                    Built into offer ({formatCurrency(calculations.cash.estimatedRepairs)})
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <CheckCircle className="h-3 w-3 text-green-600" />
                    Holding costs
                  </span>
                  <span className="text-foreground">Built in</span>
                </div>
                <div className="flex justify-between">
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <CheckCircle className="h-3 w-3 text-green-600" />
                    Closing costs
                  </span>
                  <span className="text-green-600">We pay</span>
                </div>
                <div className="flex justify-between">
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <CheckCircle className="h-3 w-3 text-green-600" />
                    Realtor commission
                  </span>
                  <span className="text-green-600">$0</span>
                </div>
                <div className="flex justify-between">
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <CheckCircle className="h-3 w-3 text-green-600" />
                    Staging &amp; concessions
                  </span>
                  <span className="text-green-600">$0</span>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">You Walk Away With</span>
                  <span
                    className="text-2xl font-bold text-primary"
                    data-testid="text-cash-net"
                  >
                    {formatCurrency(calculations.cash.net)}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Cash in hand in 7 days. The offer already accounts for
                  repairs, holding, and closing — no further deductions.
                </p>
              </div>

              {calculations.cash.belowMinimumViable && (
                <div className="text-xs p-2 rounded border border-destructive/30 bg-destructive/5 text-destructive">
                  This property may be below our minimum deal size. Submit
                  for a manual review at /get-quote.
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Disclaimer */}
        <div className="rounded-md border border-muted-foreground/20 bg-muted/40 p-4 flex items-start gap-3 text-sm">
          <Info className="h-4 w-4 mt-0.5 shrink-0 text-muted-foreground" />
          <p className="text-muted-foreground">
            <span className="font-semibold text-foreground">
              This is an estimate, not an offer.
            </span>{' '}
            The cash range uses the same algorithm our team applies to new
            leads, but every property is manually reviewed before we make an
            official offer. Submit your address at{' '}
            <Link href="/get-quote" className="text-primary underline">
              /get-quote
            </Link>{' '}
            to receive the real, no-obligation cash offer for your home.
          </p>
        </div>

        {/* Summary Comparison */}
        <Card className="bg-muted/50">
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Fees &amp; Costs Avoided</p>
                <p className="text-2xl font-bold text-primary" data-testid="text-fees-avoided">
                  {formatCurrency(calculations.comparison.feesAndCostsAvoided)}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  commission, closing, repairs, staging, and more
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
                <p className="text-sm text-muted-foreground mb-1">Estimated Net Difference</p>
                <p
                  className={`text-2xl font-bold ${
                    calculations.comparison.cashIsBetter ||
                    calculations.comparison.closeCall
                      ? 'text-primary'
                      : 'text-muted-foreground'
                  }`}
                  data-testid="text-net-difference"
                >
                  {calculations.comparison.cashIsBetter ? '+' : ''}
                  {formatCurrency(Math.abs(calculations.comparison.netDifference))}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {calculations.comparison.cashIsBetter
                    ? 'more in your pocket with a cash sale'
                    : calculations.comparison.closeCall
                      ? 'close — factor in time, risk, and hassle'
                      : `on paper with listing — only if the sale closes smoothly over ${monthsToSell} months`}
                </p>
              </div>
            </div>

            <div className="mt-6 p-4 bg-primary/10 rounded-md border border-primary/20">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-primary">
                    {calculations.comparison.cashIsBetter
                      ? 'A cash sale nets you more here'
                      : calculations.comparison.closeCall
                        ? 'This is close — consider the time and certainty'
                        : 'Speed and certainty have real value'}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {calculations.comparison.cashIsBetter
                      ? `After ${monthsToSell} months of holding payments, agent fees, repairs, and negotiation, a traditional sale leaves you with ${formatCurrency(
                          calculations.traditional.net,
                        )} versus ${formatCurrency(
                          calculations.cash.net,
                        )} in cash today.`
                      : calculations.comparison.closeCall
                        ? `A traditional sale nets about ${formatCurrency(
                            Math.abs(calculations.comparison.netDifference),
                          )} more on paper, but only if everything goes smoothly over ${monthsToSell} months. A cash sale removes buyer-financing risk, showings, repairs, and the listing timeline.`
                        : `On paper, listing may net slightly more — but only if the sale closes at full price over ${monthsToSell}+ months with no surprises. Cash removes showings, inspection renegotiation, and the 20–25% risk of buyer financing falling through.`}
                  </p>
                </div>
              </div>
            </div>

            {condition === 'excellent' && !calculations.comparison.cashIsBetter && (
              <p className="text-sm text-muted-foreground mt-4 text-center">
                For move-in ready homes in hot markets, listing traditionally may
                net more. Our cash offers are built for sellers who need speed,
                certainty, or want to skip repairs.
              </p>
            )}
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="text-center space-y-4">
          <p className="text-muted-foreground">
            Ready to see your actual cash offer? It's free, fast, and no obligation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-gold text-black hover:bg-gold/90">
              <Link href="/get-quote">
                Get Your Free Cash Offer
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="tel:2084052275">Call (208) 405-2275</a>
            </Button>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
