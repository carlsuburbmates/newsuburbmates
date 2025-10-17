
# Stripe Webhook Testing Instructions

This guide explains how to test your Stripe webhook integration locally using the Stripe CLI and VS Code.

## 1. Install Stripe CLI (if not already installed)

```
npm i -g stripe
stripe login
```

## 2. Start the webhook listener

You can use the VS Code task runner for one-click listening:

- Open the Command Palette (⇧⌘P) → "Tasks: Run Task" → select **Stripe: Listen**

Or run manually:

```
stripe listen --forward-to http://localhost:3000/api/stripe/webhook
```

Copy the displayed webhook signing secret (e.g. `whsec_...`).

## 3. Add the secret to your environment

Edit `.env.local`:

```
STRIPE_WEBHOOK_SECRET=whsec_********
```

## 4. Start your Next.js app

```
pnpm dev
```

## 5. Trigger a test event

Create a Checkout Session (POST to `/api/stripe/checkout`), open the returned `url`, and complete payment with test card `4242 4242 4242 4242`.

You should see a `checkout.session.completed` event in the terminal running `stripe listen`.

## 6. Verify webhook handling

Check your application/database to confirm the event was processed as expected.

---

For more details, see the [Stripe Webhooks documentation](https://stripe.com/docs/webhooks).

Or, to manually POST (not recommended for signature validation):
```bash
curl -X POST http://localhost:3000/api/stripe/webhook \
	-H "Stripe-Signature: <signature>" \
	-d '{"type":"checkout.session.completed","data":{"object":{"id":"cs_test_123"}}}'
```

## 5. Notes
- The webhook route verifies Stripe signatures using STRIPE_WEBHOOK_SECRET.
- For production, set the webhook secret from your Stripe dashboard.
- See `app/api/stripe/webhook/route.ts` for event handling logic.
- For local development, use the Stripe CLI for best results.
