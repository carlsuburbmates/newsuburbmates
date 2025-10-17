import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST() {
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success?sid={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/cancel`,
    line_items: [{
      price_data: {
        currency: "aud",
        unit_amount: 1000,
        product_data: { name: "Local Starter" }
      },
      quantity: 1
    }],
  });
  return NextResponse.json({ url: session.url });
}
