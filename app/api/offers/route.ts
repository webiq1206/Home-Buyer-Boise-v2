import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { propertyOffers, offerSubmissionSchema } from "@/shared/schema";
import { calculateOfferRange } from "@/lib/services/offerCalculator";
import { sendPropertyOfferNotification } from "@/lib/services/email";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    console.log("[Property Offer] Received submission:", JSON.stringify(body, null, 2));
    
    // Validate the request body
    const validatedData = offerSubmissionSchema.parse(body);
    
    // Calculate offer range
    const estimatedValue = validatedData.estimatedMarketValue 
      ? (typeof validatedData.estimatedMarketValue === 'string' 
          ? parseFloat(validatedData.estimatedMarketValue) 
          : validatedData.estimatedMarketValue)
      : 300000; // Default estimate for Boise area
    
    const squareFeet = validatedData.squareFeet
      ? (typeof validatedData.squareFeet === 'string'
          ? parseInt(validatedData.squareFeet)
          : validatedData.squareFeet)
      : undefined;
    
    const beds = validatedData.beds
      ? (typeof validatedData.beds === 'string'
          ? parseInt(validatedData.beds)
          : validatedData.beds)
      : undefined;
    
    const baths = validatedData.baths
      ? (typeof validatedData.baths === 'string'
          ? parseFloat(validatedData.baths)
          : validatedData.baths)
      : undefined;
    
    const offerCalculation = calculateOfferRange({
      estimatedMarketValue: estimatedValue,
      condition: validatedData.condition as any,
      squareFeet,
      beds,
      baths,
      timeline: validatedData.timeline,
      reasonForSelling: validatedData.reasonForSelling,
    });
    
    console.log("[Property Offer] Calculated offer:", offerCalculation);
    
    // Insert into database
    const [offer] = await db.insert(propertyOffers).values({
      name: validatedData.name,
      email: validatedData.email,
      phone: validatedData.phone,
      city: validatedData.city,
      state: validatedData.state || "Idaho",
      propertyType: validatedData.propertyType,
      condition: validatedData.condition,
      consentToContact: validatedData.consentToContact,
      address: validatedData.address,
      street: validatedData.street,
      zip: validatedData.zip,
      fullAddress: validatedData.fullAddress,
      reasonForSelling: validatedData.reasonForSelling,
      timeline: validatedData.timeline,
      beds: beds ?? null,
      baths: baths ?? null,
      squareFeet: squareFeet ?? null,
      estimatedMarketValue: offerCalculation.arv.toFixed(2),
      estimatedRepairs: offerCalculation.estimatedRepairs.toFixed(2),
      offerLow: offerCalculation.offerLow.toFixed(2),
      offerHigh: offerCalculation.offerHigh.toFixed(2),
      anchorOffer: offerCalculation.anchorOffer.toFixed(2),
      calculationInputs: offerCalculation.calculationInputs,
      message: validatedData.message,
      consentToText: validatedData.consentToText,
      consentToEmail: validatedData.consentToEmail,
      status: "pending",
    }).returning();

    console.log("[Property Offer] Created offer:", offer.id);

    // Send email notifications (async - don't block response)
    sendPropertyOfferNotification({
      customerName: validatedData.name,
      customerEmail: validatedData.email,
      customerPhone: validatedData.phone,
      address: validatedData.fullAddress || validatedData.address,
      city: validatedData.city,
      propertyType: validatedData.propertyType,
      condition: validatedData.condition,
      beds,
      baths,
      squareFeet,
      estimatedMarketValue: offerCalculation.arv.toString(),
      offerLow: offerCalculation.offerLow.toString(),
      offerHigh: offerCalculation.offerHigh.toString(),
      anchorOffer: offerCalculation.anchorOffer.toString(),
      reasonForSelling: validatedData.reasonForSelling,
      timeline: validatedData.timeline,
      message: validatedData.message,
    }).catch(err => {
      console.error('[Property Offer] Failed to send notification email:', err);
    });

    return NextResponse.json({ 
      success: true, 
      offer,
      offerRange: {
        low: offerCalculation.offerLow,
        high: offerCalculation.offerHigh,
        anchor: offerCalculation.anchorOffer,
      }
    }, { status: 201 });
  } catch (error: any) {
    console.error("[Property Offer] Submission error:", error);
    
    if (error.name === "ZodError") {
      return NextResponse.json(
        { 
          error: "Invalid property offer data",
          errors: error.errors 
        },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: error.message || "Failed to create offer" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { error: "Method not allowed" },
    { status: 405 }
  );
}
