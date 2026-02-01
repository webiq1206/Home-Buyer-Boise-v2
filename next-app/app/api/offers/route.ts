import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { propertyOffers, offerSubmissionSchema } from "@/shared/schema";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate the request body
    const validatedData = offerSubmissionSchema.parse(body);
    
    // Insert into database
    const [offer] = await db.insert(propertyOffers).values({
      name: validatedData.name,
      email: validatedData.email,
      phone: validatedData.phone,
      city: validatedData.city,
      propertyType: validatedData.propertyType,
      condition: validatedData.condition,
      consentToContact: validatedData.consentToContact,
      address: validatedData.address,
      street: validatedData.street,
      zip: validatedData.zip,
      fullAddress: validatedData.fullAddress,
      reasonForSelling: validatedData.reasonForSelling,
      timeline: validatedData.timeline,
      beds: validatedData.beds ? Number(validatedData.beds) : null,
      baths: validatedData.baths ? Number(validatedData.baths) : null,
      squareFeet: validatedData.squareFeet ? Number(validatedData.squareFeet) : null,
      estimatedMarketValue: validatedData.estimatedMarketValue?.toString(),
      estimatedRepairs: validatedData.estimatedRepairs?.toString(),
      offerLow: validatedData.offerLow?.toString(),
      offerHigh: validatedData.offerHigh?.toString(),
      anchorOffer: validatedData.anchorOffer?.toString(),
      calculationInputs: validatedData.calculationInputs,
      message: validatedData.message,
      consentToText: validatedData.consentToText,
      consentToEmail: validatedData.consentToEmail,
      status: "pending",
    }).returning();

    return NextResponse.json({ success: true, offer }, { status: 201 });
  } catch (error) {
    console.error("Error creating offer:", error);
    return NextResponse.json(
      { error: "Failed to create offer" },
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
