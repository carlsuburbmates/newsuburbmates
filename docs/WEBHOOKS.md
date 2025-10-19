

# Stripe Webhook Testing Instructions

This guide explains how to test Stripe webhooks locally using the Stripe CLI and curl.

## Prerequisites
- Stripe CLI installed: https://stripe.com/docs/stripe-cli
- Your local server running and accessible (e.g., `pnpm run dev`)
- `STRIPE_WEBHOOK_SECRET` set in your `.env` file

## 1. Install Stripe CLI (if not already installed)
```bash
npm i -g stripe
stripe login
```

## 2. Start Your Local Server
```bash
pnpm run dev
```

## 3. Forward Events from Stripe to Your Local Webhook Endpoint
Replace `localhost:3000` with your local server address if different.
```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```
This will print a webhook signing secret. Copy it and set it as `STRIPE_WEBHOOK_SECRET` in your `.env` file.

## 4. Trigger a Test Event
You can trigger a test event using the Stripe CLI:
```bash
stripe trigger checkout.session.completed
```
Or for payment intent:
```bash
stripe trigger payment_intent.succeeded
```

## 5. Manually Send a Webhook Event with curl
To manually test your endpoint, you need to generate a Stripe signature. The Stripe CLI does this automatically, but for manual testing:

### Example curl command (without signature verification):
```bash
curl -X POST http://localhost:3000/api/stripe/webhook \
	-H "Content-Type: application/json" \
	-d '{"id": "evt_test_webhook", "object": "event", "type": "checkout.session.completed"}'
```

### To include a Stripe signature (advanced):
Refer to Stripe docs: https://stripe.com/docs/webhooks/signatures

## 6. Check Your Server Logs
Your server should log the received event and process it according to your webhook handler logic.

## Troubleshooting
- Ensure your local server is running and accessible.
- Confirm `STRIPE_WEBHOOK_SECRET` matches the secret from Stripe CLI.
- Check logs for signature verification errors.

---
For more details, see [Stripe Webhooks Documentation](https://stripe.com/docs/webhooks).

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
