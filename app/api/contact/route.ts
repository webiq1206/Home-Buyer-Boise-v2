import { NextRequest, NextResponse } from "next/server";
import { getResendClient, delay } from "@/lib/services/resend";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const { name, email, phone, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    console.log("[Contact] Form submission:", { name, email, phone });

    // Send email notification
    try {
      const { client: resend, fromEmail } = await getResendClient();
      
      // Email to business
      await resend.emails.send({
        from: `Home Buyer Boise <${fromEmail}>`,
        to: ['connect@buymyhouse.co', 'admin@timberandlove.com', 'jb@timberandlove.com'],
        subject: `Contact Form: ${name}`,
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: #166534; color: white; padding: 20px; text-align: center; }
              .content { padding: 20px; background: #f9f9f9; }
              .field { margin-bottom: 15px; }
              .label { font-weight: bold; color: #166534; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>New Contact Form Submission</h1>
              </div>
              <div class="content">
                <div class="field">
                  <span class="label">Name:</span> ${name}
                </div>
                <div class="field">
                  <span class="label">Email:</span> <a href="mailto:${email}">${email}</a>
                </div>
                ${phone ? `
                <div class="field">
                  <span class="label">Phone:</span> <a href="tel:${phone}">${phone}</a>
                </div>
                ` : ''}
                <div class="field">
                  <span class="label">Message:</span>
                  <p>${message.replace(/\n/g, '<br>')}</p>
                </div>
              </div>
            </div>
          </body>
          </html>
        `,
        replyTo: email
      });

      await delay(2000);

      // Confirmation email to sender
      await resend.emails.send({
        from: `Home Buyer Boise <${fromEmail}>`,
        to: email,
        subject: 'We received your message - Home Buyer Boise',
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: #166534; color: white; padding: 20px; text-align: center; }
              .content { padding: 20px; }
              .footer { background: #f9f9f9; padding: 20px; text-align: center; font-size: 12px; color: #666; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Thank You, ${name}!</h1>
              </div>
              <div class="content">
                <p>We've received your message and will get back to you within 24 hours.</p>
                <p>If you need immediate assistance, feel free to call us at <strong>(208) 405-2274</strong>.</p>
                <p>Best regards,<br>The Home Buyer Boise Team</p>
              </div>
              <div class="footer">
                <p>Home Buyer Boise | 3024 W Fairview Ave, Boise, ID 83702</p>
                <p><a href="https://homebuyerboise.com">www.homebuyerboise.com</a></p>
              </div>
            </div>
          </body>
          </html>
        `
      });

      console.log("[Contact] Emails sent successfully");
    } catch (emailError) {
      console.error("[Contact] Failed to send email:", emailError);
      // Don't fail the request if email fails
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error processing contact form:", error);
    return NextResponse.json(
      { error: "Failed to process contact form" },
      { status: 500 }
    );
  }
}
