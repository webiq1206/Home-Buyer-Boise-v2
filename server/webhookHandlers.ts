import { getStripeSync } from './stripeClient';
import { storage } from './storage';

export class WebhookHandlers {
  static async processWebhook(payload: Buffer, signature: string, uuid: string): Promise<void> {
    if (!Buffer.isBuffer(payload)) {
      throw new Error(
        'STRIPE WEBHOOK ERROR: Payload must be a Buffer. ' +
        'Received type: ' + typeof payload + '. ' +
        'This usually means express.json() parsed the body before reaching this handler. ' +
        'FIX: Ensure webhook route is registered BEFORE app.use(express.json()).'
      );
    }

    const sync = await getStripeSync();
    await sync.processWebhook(payload, signature, uuid);
  }

  static async handlePaymentIntentSucceeded(paymentIntent: any): Promise<void> {
    const leadId = paymentIntent.metadata?.leadId;
    const userId = paymentIntent.metadata?.userId;
    
    if (!leadId || !userId) {
      console.log('Payment intent succeeded but missing lead metadata:', paymentIntent.id);
      return;
    }

    const lead = await storage.getLeadById(leadId);
    if (!lead) {
      console.error('Lead not found for payment:', leadId);
      return;
    }

    if (lead.status === 'purchased') {
      console.log('Lead already marked as purchased:', leadId);
      return;
    }

    const purchase = await storage.createLeadPurchase({
      leadId: lead.id,
      userId: userId,
      purchasePrice: (paymentIntent.amount / 100).toFixed(2),
      stripePaymentIntentId: paymentIntent.id,
    });

    await storage.updateLead(lead.id, {
      status: 'purchased',
      purchasedBy: userId,
      purchasedAt: new Date(),
      purchasePrice: (paymentIntent.amount / 100).toFixed(2),
      stripePaymentIntentId: paymentIntent.id,
    });

    const admins = await storage.getAllAdmins();
    for (const admin of admins) {
      await storage.createNotification({
        userId: admin.id,
        type: 'lead_purchased',
        title: 'Lead Purchased',
        message: `Lead in ${lead.city} purchased for $${(paymentIntent.amount / 100).toFixed(2)}`,
        leadId: lead.id,
      });
    }

    console.log('Lead purchase completed via webhook:', leadId, paymentIntent.id);
  }
}
