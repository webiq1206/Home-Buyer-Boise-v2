import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// BUSINESS INFO - must match lib/seo.ts
const BUSINESS_INFO = {
  name: "Home Buyer Boise",
  phone: "(208) 405-2275",
  email: "connect@buymyhouse.co",
  notificationEmails: ["connect@buymyhouse.co", "admin@timberandlove.com"],
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    console.log("[Property Offer] Received submission:", JSON.stringify(body, null, 2));

    // Extract lead data
    const {
      name,
      email,
      phone,
      address,
      city,
      state = "Idaho",
      zip,
      propertyType,
      beds,
      baths,
      squareFeet,
      condition,
      reasonForSelling,
      timeline,
      message,
    } = body;

    // Validate required fields
    if (!name || !email || !phone || !city) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Build email content
    const emailHtml = `
      <h1>New Cash Offer Request</h1>
      <h2>Contact Information</h2>
      <ul>
        <li><strong>Name:</strong> ${name}</li>
        <li><strong>Email:</strong> ${email}</li>
        <li><strong>Phone:</strong> ${phone}</li>
      </ul>
      
      <h2>Property Information</h2>
      <ul>
        <li><strong>Address:</strong> ${address || "Not provided"}</li>
        <li><strong>City:</strong> ${city}</li>
        <li><strong>State:</strong> ${state}</li>
        <li><strong>ZIP:</strong> ${zip || "Not provided"}</li>
        <li><strong>Property Type:</strong> ${propertyType || "Not specified"}</li>
        <li><strong>Beds:</strong> ${beds || "Not specified"}</li>
        <li><strong>Baths:</strong> ${baths || "Not specified"}</li>
        <li><strong>Square Feet:</strong> ${squareFeet || "Not specified"}</li>
        <li><strong>Condition:</strong> ${condition || "Not specified"}</li>
      </ul>
      
      <h2>Situation</h2>
      <ul>
        <li><strong>Reason for Selling:</strong> ${reasonForSelling || "Not specified"}</li>
        <li><strong>Timeline:</strong> ${timeline || "Not specified"}</li>
        <li><strong>Additional Message:</strong> ${message || "None"}</li>
      </ul>
      
      <hr>
      <p><strong>IMPORTANT:</strong> All leads require manual evaluation. Do NOT provide automated estimates.</p>
      <p>Contact the homeowner promptly to schedule a property evaluation.</p>
    `;

    // Send email notifications to both addresses
    try {
      if (process.env.RESEND_API_KEY) {
        await resend.emails.send({
          from: "Home Buyer Boise <noreply@homebuyerboise.com>",
          to: BUSINESS_INFO.notificationEmails,
          subject: `New Cash Offer Request - ${address || city}, ${state}`,
          html: emailHtml,
          replyTo: email,
        });
        console.log("[Property Offer] Email notifications sent");
      } else {
        console.log("[Property Offer] RESEND_API_KEY not configured, skipping email");
      }
    } catch (emailError) {
      console.error("[Property Offer] Email error:", emailError);
      // Continue even if email fails - we don't want to lose the lead
    }

    // Return success
    return NextResponse.json({
      success: true,
      message: "Thank you! We've received your information and will contact you within 24 hours with a cash offer.",
    });
  } catch (error) {
    console.error("[Property Offer] Error:", error);
    return NextResponse.json(
      { success: false, message: "An error occurred. Please try again or call us directly." },
      { status: 500 }
    );
  }
}
