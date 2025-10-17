
import Stripe from 'stripe';
import { NextRequest, NextResponse } from 'next/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');
export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  const buf = await req.arrayBuffer();
  const rawBody = Buffer.from(buf);
  const sig = req.headers.get('stripe-signature') || '';
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';

  if (!webhookSecret) {
    console.error('Missing STRIPE_WEBHOOK_SECRET');
    return new NextResponse('Webhook secret not configured', { status: 500 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
  } catch (err) {
    const msg = typeof err === 'object' && err && 'message' in err ? (err as { message: string }).message : String(err);
    console.error('Webhook signature verification failed:', msg);
    return new NextResponse(`Webhook Error: ${msg}`, { status: 400 });
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      console.log('checkout.session.completed:', session.id);
      // Upsert order in DB (stub: replace with actual DB call)
      try {
        // Example: call upsert_order_orders with session fields
        // Replace with actual DB connector logic
        await fetch(process.env.DB_UPSERT_ORDER_URL || '', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: session.id,
            checkout_session_id: session.id,
            amount: session.amount_total,
            currency: session.currency,
            status: 'completed',
            user_id: session.customer_email || null
          })
        });
      } catch (err) {
        console.error('Order upsert failed:', err);
      }
      break;
    }
    case 'payment_intent.succeeded': {
      const pi = event.data.object as Stripe.PaymentIntent;
      console.log('payment_intent.succeeded:', pi.id);
      break;
    }
    default:
      console.log('Unhandled Stripe event:', event.type);
  }

  return NextResponse.json({ received: true });
}

// ...existing code...
