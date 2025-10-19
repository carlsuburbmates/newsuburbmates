# Suburbmates — Commerce Agent Workflow

## 0) Scope

- **Goal:** Collect payment with Stripe Checkout and persist an `Order` in Neon.
- **Trigger:** User clicks “Pay” in marketplace UI.
- **Success:** Stripe session created → webhook confirms paid → DB upserted with reconciled status.

## 1) Entities and Schemas

- `schemas/user.json` → `{ id, email, suburb }`
- `schemas/order.json` → `{ id, user_id, listing_id, amount, checkout_session_id, status }`
- `schemas/business.json` → `{ id, name, abn, owner_user_id, address, place_id, stripe_product_id }`

## 2) Connectors (`connectors.yaml`)

- `stripe.create_checkout` → `POST /v1/checkout/sessions` (api_key)
- `db.upsert_order` → `SQL statement_id=upsert_order_orders` (service_account)

## 3) Guardrails (`guardrails.yaml`)

- **Allowlist:** `stripe.create_checkout`, `db.upsert_order`
- **PII redaction:** `email`, `user_id`
- **Human gates:** enabled for `refund`
- **Budgets:** max_cost_usd=0.05, max_latency_ms=8000

## 4) Workflow Topology

1. **Trigger**: “Create checkout” (inputs: `user_id`, `listing_id`)
2. **Validate inputs**: JSON-schema check (user, listing exist)
3. **Tool call**: `db.get_listing` to fetch price and name (not yet implemented)
4. **Tool call**: `stripe.create_checkout` with price data
5. **Persist draft order**: `db.upsert_order` with `checkout_session_id`, status=`pending`
6. **Return to UI**: output `session.url` for client redirect
7. **Webhook path**: on `checkout.session.completed` → `db.upsert_order(status='paid')`
8. **Verifier**: compare Stripe status vs DB status; mark reconciled
9. **Error handler**: retry non-2xx with backoff; emit trace; surface actionable error

## 5) Agent Definition (`agents/commerce.yaml`)

```yaml
name: commerce
model: gpt-5
tools:
  - stripe.create_checkout
  - db.upsert_order
budgets: { max_cost_usd: 0.05, max_latency_ms: 8000 }
success_checks:
  - "checkout_session.url startswith https://checkout.stripe.com/"
```

## 6) SQL (idempotent upsert, conceptual)

- `upsert_order(listing_id, user_id, amount, checkout_session_id, status)`
- Unique key: `checkout_session_id` to ensure idempotency.

## 7) Evals (`evals/golden/commerce.yaml`)

- **T1:** create checkout for listing 123 → expect valid `session.url`, latency<8s.
- **T2:** simulate webhook `checkout.session.completed` → expect DB `status=paid`.
- **T3:** invalid listing → expect validation error, no Stripe call.

## 8) Observability (`observability.yaml`)

- Metrics: `agent.success_rate`, `agent.cost_usd_per_run`, `stripe.error_rate`
- Alerts: Stripe error rate >2%

## 9) Promotion Gates

- Evals pass ≥90%
- p95 latency < 8s
- Cost/run ≤ $0.05
- Zero P1 errors during 24h canary

## 10) Phase 9 — Minimal SDK Linking (VS Code)

- See `scripts/agent-link.ts` for a placeholder script to register connectors, import agent config, bind to the draft workflow, and run a test job.
- See VS Code tasks for automation.

---

**Note:** Some SDK calls in the script are placeholders and may need adjustment for your environment.
