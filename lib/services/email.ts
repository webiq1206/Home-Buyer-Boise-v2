import { getResendClient, delay } from './resend';
import { SHOW_UNVERIFIED_TRUST } from '@/lib/seo';

const emailFooterTagline = SHOW_UNVERIFIED_TRUST
  ? "Treasure Valley's Most Trusted Cash Home Buyers"
  : "Treasure Valley's Cash Home Buyers";

interface PropertyOfferEmailData {
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  address?: string;
  city: string;
  propertyType: string;
  condition: string;
  beds?: number;
  baths?: number;
  squareFeet?: number;
  estimatedMarketValue?: string;
  offerLow?: string;
  offerHigh?: string;
  anchorOffer?: string;
  reasonForSelling?: string;
  timeline?: string;
  message?: string;
}

const emailStyles = `
  body { 
    margin: 0; 
    padding: 0; 
    font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; 
    background-color: #f5f5f5;
    line-height: 1.6;
  }
  .email-wrapper { 
    max-width: 600px; 
    margin: 0 auto; 
    background-color: #ffffff;
  }
  .header { 
    background: linear-gradient(135deg, #166534 0%, #15803d 100%); 
    color: #ffffff; 
    padding: 40px 30px; 
    text-align: center;
  }
  .content { 
    padding: 40px 30px;
    background-color: #ffffff;
  }
  .greeting {
    font-size: 18px;
    color: #1f2937;
    margin: 0 0 20px 0;
  }
  .section {
    margin: 30px 0;
  }
  .section-title {
    font-size: 16px;
    font-weight: 600;
    color: #166534;
    margin: 0 0 15px 0;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  .info-table {
    width: 100%;
    border-collapse: collapse;
    margin: 15px 0;
  }
  .info-table td {
    padding: 12px 0;
    border-bottom: 1px solid #e5e7eb;
  }
  .info-table .label {
    font-weight: 600;
    color: #4b5563;
    width: 40%;
  }
  .info-table .value {
    color: #1f2937;
  }
  .highlight-box {
    background: linear-gradient(to right, #f0f9f4 0%, #f0fdf4 100%);
    border-left: 4px solid #166534;
    padding: 20px;
    margin: 25px 0;
    border-radius: 4px;
  }
  .footer {
    background-color: #f9fafb;
    padding: 30px;
    text-align: center;
    border-top: 1px solid #e5e7eb;
  }
  .footer-brand {
    font-size: 18px;
    font-weight: 600;
    color: #166534;
    margin: 0 0 8px 0;
  }
  .footer-tagline {
    font-size: 13px;
    color: #6b7280;
    margin: 0 0 15px 0;
  }
  .footer-contact {
    font-size: 13px;
    color: #4b5563;
    margin: 5px 0;
  }
  .footer-contact a {
    color: #166534;
    text-decoration: none;
  }
  .divider {
    height: 1px;
    background-color: #e5e7eb;
    margin: 25px 0;
  }
`;

function formatCurrency(value: string | number | undefined): string {
  if (!value) return 'N/A';
  const num = typeof value === 'string' ? parseFloat(value) : value;
  return '$' + num.toLocaleString();
}

/**
 * Send notification emails for a new property offer submission
 */
export async function sendPropertyOfferNotification(data: PropertyOfferEmailData) {
  console.log('[EMAIL] Starting property offer notification for:', { 
    customerName: data.customerName, 
    customerEmail: data.customerEmail, 
    city: data.city 
  });

  try {
    const { client: resend, fromEmail } = await getResendClient();
    console.log('[EMAIL] Got Resend client, from email:', fromEmail);

    // Email to business owner
    const ownerEmailHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>${emailStyles}</style>
      </head>
      <body>
        <div class="email-wrapper">
          <div class="header">
            <div style="margin-bottom: 20px;">
              <img src="https://homebuyerboise.com/attached_assets/Home Buyer Boise Logo_1764014379793.png" alt="Home Buyer Boise" style="max-width: 400px; height: auto;">
            </div>
            <h2 style="margin: 10px 0 0 0; font-size: 20px; font-weight: 400;">New Property Offer Request</h2>
            <p>Cash Offer System</p>
          </div>
          
          <div class="content">
            <p class="greeting">A new homeowner has requested a cash offer from your website.</p>
            
            <div class="section">
              <h2 class="section-title">Seller Information</h2>
              <table class="info-table">
                <tr>
                  <td class="label">Name:</td>
                  <td class="value">${data.customerName}</td>
                </tr>
                <tr>
                  <td class="label">Email:</td>
                  <td class="value"><a href="mailto:${data.customerEmail}" style="color: #166534; text-decoration: none;">${data.customerEmail}</a></td>
                </tr>
                ${data.customerPhone ? `
                <tr>
                  <td class="label">Phone:</td>
                  <td class="value"><a href="tel:${data.customerPhone}" style="color: #166534; text-decoration: none;">${data.customerPhone}</a></td>
                </tr>
                ` : ''}
              </table>
            </div>

            <div class="divider"></div>

            <div class="section">
              <h2 class="section-title">Property Details</h2>
              <table class="info-table">
                <tr>
                  <td class="label">City:</td>
                  <td class="value">${data.city}, Idaho</td>
                </tr>
                ${data.address ? `
                <tr>
                  <td class="label">Address:</td>
                  <td class="value">${data.address}</td>
                </tr>
                ` : ''}
                <tr>
                  <td class="label">Property Type:</td>
                  <td class="value">${data.propertyType}</td>
                </tr>
                <tr>
                  <td class="label">Condition:</td>
                  <td class="value">${data.condition}</td>
                </tr>
                ${data.beds ? `
                <tr>
                  <td class="label">Bedrooms:</td>
                  <td class="value">${data.beds}</td>
                </tr>
                ` : ''}
                ${data.baths ? `
                <tr>
                  <td class="label">Bathrooms:</td>
                  <td class="value">${data.baths}</td>
                </tr>
                ` : ''}
                ${data.squareFeet ? `
                <tr>
                  <td class="label">Square Feet:</td>
                  <td class="value">${data.squareFeet.toLocaleString()} sq ft</td>
                </tr>
                ` : ''}
              </table>
            </div>

            ${data.estimatedMarketValue || data.anchorOffer ? `
            <div class="divider"></div>

            <div class="section">
              <h2 class="section-title">Offer Calculation</h2>
              <table class="info-table">
                ${data.estimatedMarketValue ? `
                <tr>
                  <td class="label">Estimated Market Value:</td>
                  <td class="value">${formatCurrency(data.estimatedMarketValue)}</td>
                </tr>
                ` : ''}
                ${data.offerLow && data.offerHigh ? `
                <tr>
                  <td class="label">Offer Range:</td>
                  <td class="value">${formatCurrency(data.offerLow)} - ${formatCurrency(data.offerHigh)}</td>
                </tr>
                ` : ''}
                ${data.anchorOffer ? `
                <tr>
                  <td class="label">Recommended Offer:</td>
                  <td class="value" style="font-size: 20px; font-weight: 700; color: #166534;">${formatCurrency(data.anchorOffer)}</td>
                </tr>
                ` : ''}
              </table>
            </div>
            ` : ''}

            ${data.reasonForSelling || data.timeline || data.message ? `
            <div class="divider"></div>

            <div class="section">
              <h2 class="section-title">Additional Information</h2>
              <table class="info-table">
                ${data.reasonForSelling ? `
                <tr>
                  <td class="label">Reason for Selling:</td>
                  <td class="value">${data.reasonForSelling}</td>
                </tr>
                ` : ''}
                ${data.timeline ? `
                <tr>
                  <td class="label">Timeline:</td>
                  <td class="value">${data.timeline}</td>
                </tr>
                ` : ''}
                ${data.message ? `
                <tr>
                  <td class="label">Message:</td>
                  <td class="value">${data.message}</td>
                </tr>
                ` : ''}
              </table>
            </div>
            ` : ''}

            <div class="highlight-box">
              <p style="margin: 0;"><strong>Action Required:</strong> Please follow up with this seller within 24 hours to discuss their property and present a formal offer.</p>
            </div>
          </div>

          <div class="footer">
            <p class="footer-brand">Home Buyer Boise</p>
            <p class="footer-tagline">${emailFooterTagline}</p>
            <p class="footer-contact">Email: <a href="mailto:connect@buymyhouse.co">connect@buymyhouse.co</a></p>
            <p class="footer-contact">Web: <a href="https://homebuyerboise.com">www.homebuyerboise.com</a></p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Email to customer
    const customerEmailHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>${emailStyles}</style>
      </head>
      <body>
        <div class="email-wrapper">
          <div class="header">
            <div style="margin-bottom: 20px;">
              <img src="https://homebuyerboise.com/attached_assets/Home Buyer Boise Logo_1764014379793.png" alt="Home Buyer Boise" style="max-width: 400px; height: auto;">
            </div>
            <h2 style="margin: 10px 0 0 0; font-size: 20px; font-weight: 400;">Thank You for Your Request</h2>
            <p>We're excited to help you sell your home!</p>
          </div>
          
          <div class="content">
            <p class="greeting">Hi ${data.customerName},</p>
            
            <p style="color: #4b5563; margin: 0 0 20px 0;">Thank you for choosing Home Buyer Boise! We've received your request for a cash offer on your property in ${data.city}.</p>

            <div class="highlight-box">
              <p style="margin: 0;"><strong>What happens next?</strong></p>
              <p style="margin: 10px 0 0 0;">Our team will contact you within 24 hours to discuss your property and present you with a fair cash offer. We'll answer any questions and work with you to close on your timeline.</p>
            </div>

            ${data.anchorOffer ? `
            <div class="section">
              <h2 class="section-title">Your Estimated Cash Offer Range</h2>
              <table class="info-table">
                ${data.offerLow && data.offerHigh ? `
                <tr>
                  <td class="label">Offer Range:</td>
                  <td class="value" style="font-size: 20px; font-weight: 700; color: #166534;">${formatCurrency(data.offerLow)} - ${formatCurrency(data.offerHigh)}</td>
                </tr>
                ` : `
                <tr>
                  <td class="label">Estimated Offer:</td>
                  <td class="value" style="font-size: 20px; font-weight: 700; color: #166534;">${formatCurrency(data.anchorOffer)}</td>
                </tr>
                `}
              </table>
              <p style="color: #6b7280; font-size: 13px; margin-top: 10px;">This is a preliminary estimate based on the information you provided. Your final offer may vary after we complete our property assessment.</p>
            </div>
            ` : ''}

            <div class="section">
              <h2 class="section-title">Why Sell to Home Buyer Boise?</h2>
              <ul style="color: #4b5563; padding-left: 20px;">
                <li><strong>Cash offers in 24 hours</strong> - No waiting for bank approvals</li>
                <li><strong>Close on your timeline</strong> - As fast as 7 days</li>
                <li><strong>Sell as-is</strong> - No repairs or cleaning needed</li>
                <li><strong>Zero fees</strong> - We pay all closing costs</li>
                <li><strong>Local experts</strong> - We know the Boise market</li>
              </ul>
            </div>

            <div class="divider"></div>

            <div style="text-align: center; margin: 30px 0;">
              <p style="color: #4b5563; margin: 0 0 10px 0;"><strong>Have questions?</strong></p>
              <p style="color: #6b7280; font-size: 14px; margin: 0;">You can reply to this email or call us at (208) 405-2274</p>
            </div>
          </div>

          <div class="footer">
            <p class="footer-brand">Home Buyer Boise</p>
            <p class="footer-tagline">${emailFooterTagline}</p>
            <p class="footer-contact">Email: <a href="mailto:connect@buymyhouse.co">connect@buymyhouse.co</a></p>
            <p class="footer-contact">Phone: (208) 405-2274</p>
            <p class="footer-contact">Address: 3024 W Fairview Ave, Boise, ID 83702</p>
            <p class="footer-contact">Web: <a href="https://homebuyerboise.com">www.homebuyerboise.com</a></p>
            <p style="font-size: 12px; color: #9ca3af; margin: 15px 0 0 0;">Serving Boise, Meridian, Eagle, Kuna, Star & Middleton</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Send email to business owners
    const adminEmails = ['admin@timberandlove.com', 'connect@buymyhouse.co', 'jb@timberandlove.com'];
    console.log('[EMAIL] Sending admin notification to:', adminEmails.join(', '));
    
    const adminResult = await resend.emails.send({
      from: `Home Buyer Boise <${fromEmail}>`,
      to: adminEmails,
      subject: `New Cash Offer Request - ${data.customerName} (${data.city})`,
      html: ownerEmailHtml,
      replyTo: data.customerEmail
    });
    console.log('[EMAIL] Admin email sent, result:', adminResult);

    // Wait to avoid Resend rate limit
    await delay(2000);

    // Send confirmation email to customer
    if (data.customerEmail) {
      console.log('[EMAIL] Sending customer confirmation to:', data.customerEmail);
      const customerResult = await resend.emails.send({
        from: `Home Buyer Boise <${fromEmail}>`,
        to: data.customerEmail,
        subject: `Your Cash Offer Request Received - Home Buyer Boise`,
        html: customerEmailHtml
      });
      console.log('[EMAIL] Customer email sent, result:', customerResult);
    }

    console.log('[EMAIL] ✅ Property offer notification emails sent successfully');
    return { success: true, message: 'Emails sent successfully' };
  } catch (error) {
    console.error('[EMAIL] ❌ Error sending email:', error);
    if (error instanceof Error) {
      console.error('[EMAIL] Error message:', error.message);
    }
    return { success: false, message: 'Failed to send email', error };
  }
}
