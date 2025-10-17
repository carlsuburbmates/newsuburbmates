# Stripe Webhook - Minimal setup and test flow

This folder contains a minimal webhook endpoint and a test helper to simulate signed Stripe events locally.

Files added:
- `app/api/stripe/webhook/route.ts` - verifies Stripe signatures and handles `checkout.session.completed` events.
- `app/api/stripe/test-event/route.ts` - creates a signed test event and POSTs it to the webhook endpoint.

Environment variables (add to `.env.local`):

```env
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
WEBHOOK_TEST_URL=http://localhost:3000/api/stripe/webhook
```

Quick test steps (local):

1. Install deps:

```bash
pnpm install
```

2. Start dev server:

```bash
pnpm run dev
```

3. Use the test route to send a signed event to the webhook:

```bash
curl -X POST http://localhost:3000/api/stripe/test-event
```

You should see the webhook route log `Checkout session completed: ...` if verification succeeded.

If you're tunneling with ngrok or similar, set `WEBHOOK_TEST_URL` to the public URL and configure Stripe to send real events.

Notes:
- For production, configure the webhook secret from the Stripe dashboard and remove the test helper.
- The test-event route uses Stripe's `generateTestHeaderString` helper to emulate signed events.
