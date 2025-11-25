import { storage } from "../storage";
import type { Lead } from "@shared/schema";

/**
 * Round price UP to nearest $5 or $0
 * Examples: $147 → $150, $143 → $145, $152 → $155, $198 → $200
 */
function roundToNearestFive(price: number): number {
  return Math.ceil(price / 5) * 5;
}

// Calculate lead price based on quote details
// Wholesaling leads are priced at 0.005% of the estimated offer price
export function calculateLeadPrice(params: {
  finalQuote: number;
  frequency: string;
  serviceType: string;
}): { basePrice: number; currentPrice: number } {
  const { finalQuote } = params;

  // Calculate base price as 0.005% of the estimated offer price
  let basePrice = finalQuote * 0.00005;

  // Ensure minimum price of $25, round to nearest $5
  basePrice = Math.max(25, basePrice);
  basePrice = roundToNearestFive(basePrice);

  return {
    basePrice,
    currentPrice: basePrice,
  };
}

// Update all lead prices (runs daily via cron)
export async function updateLeadPrices(): Promise<Lead[]> {
  const leads = await storage.getAllLeads();
  const updatedLeads: Lead[] = [];

  for (const lead of leads) {
    if (lead.status !== "available") continue; // Only update available leads

    const currentPrice = parseFloat(lead.currentLeadPrice);
    const basePrice = parseFloat(lead.baseLeadPrice);
    const reductionRate = parseFloat(lead.priceReductionRate || "5.00");

    // Calculate days since last price update
    const lastUpdate = new Date(lead.lastPriceUpdate || lead.createdAt);
    const now = new Date();
    const daysSinceUpdate = Math.floor((now.getTime() - lastUpdate.getTime()) / (1000 * 60 * 60 * 24));

    if (daysSinceUpdate < 1) continue; // Don't update if less than a day

    // Calculate new price (reduce by 5% daily)
    const reductionAmount = currentPrice * (reductionRate / 100);
    let newPrice = currentPrice - reductionAmount;

    // Set minimum price (20% of base price)
    const minimumPrice = basePrice * 0.20;
    newPrice = Math.max(minimumPrice, newPrice);
    
    // Round to nearest $5
    newPrice = roundToNearestFive(newPrice);

    // Only update if price changed
    if (Math.abs(newPrice - currentPrice) > 0.01) {
      const updated = await storage.updateLead(lead.id, {
        currentLeadPrice: newPrice.toFixed(2),
        lastPriceUpdate: now,
      });

      if (updated) {
        updatedLeads.push(updated);

        // Notify investors of price drop
        const investors = await storage.getAllInvestors();
        for (const investor of investors) {
          await storage.createNotification({
            userId: investor.id,
            type: "lead_price_drop",
            title: "Lead Price Reduced",
            message: `Wholesale lead in ${lead.city} now $${newPrice.toFixed(2)} (was $${currentPrice.toFixed(2)})`,
            leadId: lead.id,
          });
        }
      }
    }
  }

  return updatedLeads;
}
