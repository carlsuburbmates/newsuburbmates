import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '')

export async function POST() {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || ''
  if (!webhookSecret) {
    return new NextResponse('Missing STRIPE_WEBHOOK_SECRET in env', { status: 500 })
  }

  // Create a minimal fake event payload
  const event = {
    id: `evt_${Date.now()}`,
    object: 'event',
    type: 'checkout.session.completed',
    data: {
      object: {
        id: `cs_test_${Date.now()}`,
        object: 'checkout.session',
      },
    },
  }

  const payload = JSON.stringify(event)
  const header = stripe.webhooks.generateTestHeaderString({
    payload,
    secret: webhookSecret,
    // timestamp omitted to allow default
  })

  // Post to local webhook endpoint
  const url = process.env.WEBHOOK_TEST_URL || 'http://localhost:3000/api/stripe/webhook'
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Stripe-Signature': header,
    },
    body: payload,
  })

  const text = await res.text()
  return new NextResponse(JSON.stringify({ status: res.status, body: text }), { status: 200 })
}

export const runtime = 'nodejs'
