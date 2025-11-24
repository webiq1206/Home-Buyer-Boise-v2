/**
 * HomeBuyerBoise Offer Calculator
 * Calculates cash offer ranges for properties based on ARV, condition, repairs, and market factors
 */

/**
 * Round price to nearest $1,000 for cleaner offer presentations
 * Examples: $247,500 → $248,000, $243,000 → $243,000, $248,500 → $249,000
 */
function roundToNearestThousand(price: number): number {
  return Math.round(price / 1000) * 1000;
}

/**
 * Round price DOWN to nearest $1,000 (for ceiling enforcement)
 */
function roundDownToNearestThousand(price: number): number {
  return Math.floor(price / 1000) * 1000;
}

/**
 * Round price to nearest $100 for repair estimates
 */
function roundToNearestHundred(price: number): number {
  return Math.round(price / 100) * 100;
}

// Condition multipliers - MAX percentage of ARV we'll pay based on condition
export const CONDITION_MULTIPLIERS = {
  excellent: 0.85,     // 85% of ARV - minimal repairs needed
  good: 0.80,          // 80% of ARV - minor cosmetic updates
  fair: 0.75,          // 75% of ARV - moderate repairs needed
  needs_work: 0.68,    // 68% of ARV - significant repairs required
  major_repairs: 0.60, // 60% of ARV - major structural/system issues
};

// Estimated repair costs by condition (per square foot)
export const REPAIR_ESTIMATES_PER_SQFT = {
  excellent: 0,        // $0/sqft - move-in ready
  good: 5,             // $5/sqft - paint, flooring, minor fixes
  fair: 15,            // $15/sqft - kitchen/bath updates, systems
  needs_work: 30,      // $30/sqft - major renovations
  major_repairs: 50,   // $50/sqft - structural, foundation, major systems
};

// Flat repair estimates if square footage not provided
export const REPAIR_ESTIMATES_FLAT = {
  excellent: 0,
  good: 10000,          // $10k - paint, carpet, minor fixes
  fair: 25000,          // $25k - moderate updates
  needs_work: 50000,    // $50k - significant work
  major_repairs: 80000, // $80k - major overhaul
};

// Holding costs (utilities, taxes, insurance while property is held)
export const HOLDING_COSTS_PER_MONTH = 1500; // $1,500/month average for Boise area
export const ESTIMATED_HOLDING_MONTHS = 3;    // 3 months average hold time

// Transaction costs
export const CLOSING_COSTS_RATE = 0.02;       // 2% of purchase price (buyer's costs)
export const SELLER_CLOSING_COSTS_RATE = 0.02; // 2% seller typically pays in traditional sale
export const BUYER_AGENT_COMMISSION = 0.03;   // 3% (buyer's agent fee we absorb)

// Profit margins
export const TARGET_PROFIT_MARGIN = 0.15;     // 15% profit margin (conservative)
export const MINIMUM_PROFIT_MARGIN = 0.10;    // 10% minimum profit (absolute floor)

// Safety limits
export const MINIMUM_VIABLE_DEAL_AMOUNT = 50000; // Deals below $50k may not be worth pursuing

// Realtor savings that seller avoids
export const REALTOR_COMMISSION_RATE = 0.06;  // 6% (listing + buyer's agent)

interface PropertyDetails {
  estimatedMarketValue: number; // ARV (After Repair Value)
  condition: keyof typeof CONDITION_MULTIPLIERS;
  squareFeet?: number;
  beds?: number;
  baths?: number;
  timeline?: string;
  reasonForSelling?: string;
}

interface OfferCalculation {
  arv: number;                      // Estimated market value (after repairs)
  estimatedRepairs: number;         // Estimated repair costs
  holdingCosts: number;             // Carrying costs during hold period
  closingCosts: number;             // Transaction costs (our costs)
  buyerAgentFee: number;           // Buyer's agent commission we absorb
  totalCosts: number;               // Sum of all costs
  targetProfit: number;             // Desired profit margin amount
  minimumProfit: number;            // Minimum acceptable profit
  
  // Offer range
  offerLow: number;                 // Conservative offer (higher margin)
  offerHigh: number;                // Aggressive offer (minimum margin)
  anchorOffer: number;              // Middle/recommended offer
  
  // Profitability check
  isProfitable: boolean;            // Whether deal meets minimum margin
  profitMargin: number;             // Actual profit margin on anchor offer
  belowMinimumViable: boolean;      // Whether offer is below minimum viable amount
  warnings: string[];               // Any concerns about the deal
  
  // Seller comparison
  realtorCommissionSavings: number; // What seller saves vs listing with realtor
  sellerClosingCosts: number;       // Typical seller closing costs in traditional sale
  netAfterRealtor: number;          // What seller would net through realtor
  netWithUs: number;                // What seller nets with our offer
  
  // Calculation inputs (for debugging/transparency)
  calculationInputs: {
    arv: number;
    condition: string;
    conditionMultiplier: number;
    maxOfferByCondition: number;
    squareFeet?: number;
    repairEstimateMethod: 'per_sqft' | 'flat';
    estimatedRepairs: number;
    holdingMonths: number;
    profitMarginTarget: number;
    profitMarginMinimum: number;
  };
}

/**
 * Calculate repair estimate based on condition and square footage
 */
function calculateRepairEstimate(
  condition: keyof typeof CONDITION_MULTIPLIERS,
  squareFeet?: number
): number {
  if (squareFeet && squareFeet > 0) {
    const costPerSqft = REPAIR_ESTIMATES_PER_SQFT[condition];
    return roundToNearestHundred(squareFeet * costPerSqft);
  }
  
  return REPAIR_ESTIMATES_FLAT[condition];
}

/**
 * Calculate comprehensive offer range for a property
 */
export function calculateOfferRange(details: PropertyDetails): OfferCalculation {
  const {
    estimatedMarketValue,
    condition,
    squareFeet,
  } = details;

  const arv = estimatedMarketValue;
  
  // Calculate repair estimate
  const estimatedRepairs = calculateRepairEstimate(condition, squareFeet);
  
  // Calculate holding costs (utilities, taxes, insurance)
  const holdingCosts = HOLDING_COSTS_PER_MONTH * ESTIMATED_HOLDING_MONTHS;
  
  // CRITICAL: Calculate maximum offer allowed by condition multiplier
  // This is our absolute ceiling - we NEVER exceed this percentage of ARV
  const conditionMultiplier = CONDITION_MULTIPLIERS[condition];
  const maxOfferByCondition = arv * conditionMultiplier;
  
  // Calculate transaction costs (closing costs + buyer agent commission)
  // These are estimated based on expected purchase price (use condition multiplier)
  const estimatedPurchasePrice = maxOfferByCondition;
  const closingCosts = estimatedPurchasePrice * CLOSING_COSTS_RATE;
  const buyerAgentFee = estimatedPurchasePrice * BUYER_AGENT_COMMISSION;
  
  // Total acquisition and carrying costs
  const totalCosts = estimatedRepairs + holdingCosts + closingCosts + buyerAgentFee;
  
  // Calculate profit margins
  const targetProfit = arv * TARGET_PROFIT_MARGIN;
  const minimumProfit = arv * MINIMUM_PROFIT_MARGIN;
  
  // Calculate offer range using cost-based approach (BEFORE applying ceiling)
  // Formula: ARV - Repairs - Costs - Profit = Offer
  const costBasedOfferHigh = arv - totalCosts - minimumProfit;  // Minimum profit (higher offer)
  const costBasedOfferLow = arv - totalCosts - targetProfit;    // Target profit (lower offer)
  
  // Apply condition multiplier ceiling BEFORE rounding
  const cappedOfferHigh = Math.min(maxOfferByCondition, costBasedOfferHigh);
  const cappedOfferLow = Math.min(maxOfferByCondition * 0.95, costBasedOfferLow);
  
  // Round offers
  const roundedOfferHigh = roundToNearestThousand(cappedOfferHigh);
  const roundedOfferLow = roundToNearestThousand(cappedOfferLow);
  
  // CRITICAL: Ensure rounding didn't push us above ceiling
  // Use floor rounding for ceiling to be conservative
  const ceilingRounded = roundDownToNearestThousand(maxOfferByCondition);
  
  const offerHigh = Math.max(0, Math.min(roundedOfferHigh, ceilingRounded));
  const offerLow = Math.max(0, Math.min(roundedOfferLow, ceilingRounded));
  const anchorOffer = Math.max(0, roundToNearestThousand((offerHigh + offerLow) / 2));
  
  // Final ceiling check after averaging (to catch any edge cases)
  const finalAnchorOffer = Math.min(anchorOffer, ceilingRounded);
  
  // Check if deal is below minimum viable amount (warning, not override)
  const belowMinimumViable = offerHigh < MINIMUM_VIABLE_DEAL_AMOUNT;
  
  // Validate profitability of anchor offer
  const profitValidation = validateOfferProfitability(
    finalAnchorOffer,
    arv,
    estimatedRepairs,
    squareFeet
  );
  
  // Calculate seller's comparison (what they'd net with realtor vs us)
  const realtorCommissionSavings = arv * REALTOR_COMMISSION_RATE;
  const sellerClosingCosts = arv * SELLER_CLOSING_COSTS_RATE;
  const netAfterRealtor = arv - realtorCommissionSavings - sellerClosingCosts - estimatedRepairs;
  const netWithUs = finalAnchorOffer; // They get cash now, no repairs needed, we pay closing
  
  // Add warning if below minimum viable
  const warnings = [...profitValidation.warnings];
  if (belowMinimumViable) {
    warnings.push(`Offer amount ($${offerHigh.toLocaleString()}) is below minimum viable deal threshold ($${MINIMUM_VIABLE_DEAL_AMOUNT.toLocaleString()})`);
  }
  
  return {
    arv: roundToNearestThousand(arv),
    estimatedRepairs: roundToNearestHundred(estimatedRepairs),
    holdingCosts: roundToNearestHundred(holdingCosts),
    closingCosts: roundToNearestHundred(closingCosts),
    buyerAgentFee: roundToNearestHundred(buyerAgentFee),
    totalCosts: roundToNearestHundred(totalCosts),
    targetProfit: roundToNearestThousand(targetProfit),
    minimumProfit: roundToNearestThousand(minimumProfit),
    
    offerLow: offerLow,
    offerHigh: offerHigh,
    anchorOffer: finalAnchorOffer,
    
    isProfitable: profitValidation.isProfitable,
    profitMargin: profitValidation.profitMargin,
    belowMinimumViable,
    warnings,
    
    realtorCommissionSavings: roundToNearestThousand(realtorCommissionSavings),
    sellerClosingCosts: roundToNearestThousand(sellerClosingCosts),
    netAfterRealtor: roundToNearestThousand(netAfterRealtor),
    netWithUs: roundToNearestThousand(finalAnchorOffer),
    
    calculationInputs: {
      arv,
      condition,
      conditionMultiplier,
      maxOfferByCondition,
      squareFeet,
      repairEstimateMethod: squareFeet ? 'per_sqft' : 'flat',
      estimatedRepairs,
      holdingMonths: ESTIMATED_HOLDING_MONTHS,
      profitMarginTarget: TARGET_PROFIT_MARGIN,
      profitMarginMinimum: MINIMUM_PROFIT_MARGIN,
    },
  };
}

/**
 * Get quick offer estimate range (simplified version for initial forms)
 */
export function getQuickOfferEstimate(
  estimatedMarketValue: number,
  condition: keyof typeof CONDITION_MULTIPLIERS
): { low: number; high: number; anchor: number } {
  // Simplified calculation respecting condition ceiling
  const conditionMultiplier = CONDITION_MULTIPLIERS[condition];
  const maxOffer = estimatedMarketValue * conditionMultiplier;
  
  // Create range within condition limits, with ceiling enforcement
  const ceilingRounded = roundDownToNearestThousand(maxOffer);
  const high = ceilingRounded;
  const low = Math.max(0, roundToNearestThousand(maxOffer * 0.90));
  const anchor = Math.max(0, roundToNearestThousand((high + low) / 2));
  
  // Ensure ceiling compliance after rounding
  const finalLow = Math.min(low, ceilingRounded);
  const finalAnchor = Math.min(anchor, ceilingRounded);
  
  return {
    low: finalLow,
    high: high,
    anchor: finalAnchor,
  };
}

/**
 * Validate that an offer is profitable given our costs
 */
export function validateOfferProfitability(
  offerPrice: number,
  estimatedMarketValue: number,
  estimatedRepairs: number,
  squareFeet?: number
): {
  isProfitable: boolean;
  profitMargin: number;
  profitAmount: number;
  warnings: string[];
} {
  const warnings: string[] = [];
  
  // Prevent division by zero or invalid calculations
  if (estimatedMarketValue <= 0 || offerPrice < 0) {
    return {
      isProfitable: false,
      profitMargin: 0,
      profitAmount: 0,
      warnings: ['Invalid market value or offer price'],
    };
  }
  
  // Allow zero offers (indicate unprofitable deal) but don't validate them
  if (offerPrice === 0) {
    return {
      isProfitable: false,
      profitMargin: 0,
      profitAmount: 0,
      warnings: ['Offer price is zero - deal is not viable'],
    };
  }
  
  // Calculate costs
  const holdingCosts = HOLDING_COSTS_PER_MONTH * ESTIMATED_HOLDING_MONTHS;
  const closingCosts = offerPrice * CLOSING_COSTS_RATE;
  const buyerAgentFee = offerPrice * BUYER_AGENT_COMMISSION;
  const totalCosts = estimatedRepairs + holdingCosts + closingCosts + buyerAgentFee;
  
  // Calculate profit
  const profitAmount = estimatedMarketValue - offerPrice - totalCosts;
  const profitMargin = profitAmount / estimatedMarketValue;
  
  // Check profitability
  const isProfitable = profitMargin >= MINIMUM_PROFIT_MARGIN && profitAmount > 0;
  
  if (profitAmount <= 0) {
    warnings.push('Deal is unprofitable - costs exceed ARV');
  } else if (profitMargin < MINIMUM_PROFIT_MARGIN) {
    warnings.push(`Profit margin (${(profitMargin * 100).toFixed(1)}%) is below minimum (${(MINIMUM_PROFIT_MARGIN * 100).toFixed(1)}%)`);
  } else if (profitMargin < TARGET_PROFIT_MARGIN) {
    warnings.push(`Profit margin (${(profitMargin * 100).toFixed(1)}%) is below target (${(TARGET_PROFIT_MARGIN * 100).toFixed(1)}%)`);
  }
  
  if (profitAmount > 0 && profitAmount < 10000) {
    warnings.push(`Profit amount ($${profitAmount.toLocaleString()}) is very low - deal may not be worth pursuing`);
  }
  
  return {
    isProfitable,
    profitMargin,
    profitAmount: roundToNearestThousand(Math.max(0, profitAmount)),
    warnings,
  };
}

/**
 * Adjust offer based on seller urgency/timeline
 * Urgent sellers may accept lower offers
 */
export function adjustOfferForTimeline(
  baseOffer: number,
  timeline?: string
): number {
  if (!timeline || baseOffer === 0) return baseOffer;
  
  // Sellers who need to close ASAP might accept slightly lower
  if (timeline === 'asap' || timeline === '0-30days') {
    return Math.max(0, roundToNearestThousand(baseOffer * 0.98)); // 2% reduction for speed
  }
  
  return baseOffer;
}

/**
 * Export configuration for admin panel (future use)
 */
export function getOfferCalculatorConfig() {
  return {
    conditionMultipliers: CONDITION_MULTIPLIERS,
    repairEstimates: {
      perSqft: REPAIR_ESTIMATES_PER_SQFT,
      flat: REPAIR_ESTIMATES_FLAT,
    },
    costs: {
      holdingCostsPerMonth: HOLDING_COSTS_PER_MONTH,
      estimatedHoldingMonths: ESTIMATED_HOLDING_MONTHS,
      closingCostsRate: CLOSING_COSTS_RATE,
      sellerClosingCostsRate: SELLER_CLOSING_COSTS_RATE,
      buyerAgentCommission: BUYER_AGENT_COMMISSION,
      realtorCommissionRate: REALTOR_COMMISSION_RATE,
    },
    profitMargins: {
      target: TARGET_PROFIT_MARGIN,
      minimum: MINIMUM_PROFIT_MARGIN,
    },
    limits: {
      minimumViableDealAmount: MINIMUM_VIABLE_DEAL_AMOUNT,
    },
  };
}
