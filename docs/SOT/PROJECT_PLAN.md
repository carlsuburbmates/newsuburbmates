# Suburbmates — Project Plan (Canonical Source)

> This is the single source of truth for project planning. All derivative docs must reference this file in their header.

## 1. Vision
- **Reliability:** p95 < 300 ms for core pages; 99.9% monthly uptime.

### Stack & Versions (authoritative)

* **Next.js:** 15.5.6
* **React:** 19.1.0
* **TypeScript:** ^5
* **Node.js:** 20 (from `.nvmrc`)
* **Neon Postgres (server):** 17
* **pg:** ^8.16.3
* **Stripe:** ^19.1.0
* **@openai/agents:** ^0.1.10
* **zod:** ^4.1.12
* **ts-node:** ^10.9.2 · **tsx:** ^4.20.6 · **dotenv-cli:** ^10.0.0
* **eslint:** ^9 · **tailwindcss:** ^4
* **Note:** These versions are canonical. All code, CI, and deploy targets must match.

### Repo enforcement

1. `package.json` → ensure:

```json
"engines": { "node": "20.x" }
```

2. `.nvmrc`:

```
20
```

3. `vercel.json` (optional but recommended):

```json
{ "build": { "env": { "NODE_VERSION": "20" } } }
```

### Verify now

```
node -v
pnpm ls next react @openai/agents pg stripe zod tsx ts-node dotenv-cli tailwindcss eslint
psql "$DATABASE_URL" -c "show server_version;"
```

Commit:

```
git add docs/SSOT.md docs/SOT/PROJECT_PLAN.md package.json .nvmrc vercel.json
git commit -m "align: pin stack to Next 15.5.6 / Node 20 / Neon 17 and enforce in repo"
git push
```

This locks SSOT ↔ repo ↔ deploy to the versions you listed.
## 3. Scope (MVP)
- Multi-vendor marketplace with Stripe Checkout.
- Community hub (forums, events).
- Verified profiles.
- Map layers for services/amenities.
- Basic admin and moderation.
- Telemetry: Sentry, GA4.

## 4. Architecture
 - **Frontend:** Next.js 15.5.6 (Vercel).
 - **Backend:** Node.js 20 (API routes).
 - **Database:** Neon PostgreSQL 17 (AWS, Sydney).
 - **Auth:** Auth.js.
 - **AI (extension):** OpenAI Agents SDK ^0.1.10, openai ^6.5.0, zod ^4.1.12, pg ^8.16.3, TypeScript ^5, React 19.1.0, tailwindcss ^4, tsx ^4.20.6, dotenv-cli ^10.0.0.

- Data residency preference AU; encrypted in transit/at rest.

## 6. Risk & Mitigation
- **Payment errors:** idempotent Stripe flows; recon via webhooks.
- **PII exposure:** redaction + guardrails; least-privilege access.
- **Model errors:** human gates for destructive actions; eval gating.
- **Cost drift:** budgets per run; alerting on spikes.

## 7. Phases & Deliverables (1–6)
1. **Planning & Foundation:** charter, personas, governance, risks.
All plan updates must reference a PR linked to `/docs/SSOT.md` and carry an SSOT approval tag. No direct edits—derive from SSOT only.
3. **Technical Development:** Next.js + Neon; marketplace + community; Stripe, Maps, Resend; telemetry wiring.
4. **Testing & QA:** unit/e2e; a11y, security, privacy checks.
## 8. AI Extension (Phases 7–9)
- **Phase 7:** Deployment Validation — live E2E verification; canary.
- **Phase 8:** AgentKit Integration — create draft workflow in OpenAI; keep file artifacts in repo.
- **Phase 9:** SDK Link & Testing — register connectors, import agent, run evals; promote on gate success.

## 9. Roles & Ownership
- **AI Architect:** agents, guardrails, evals, budgets.
- **Backend:** connectors, schemas, DB migrations, webhooks.
- **Frontend:** Chat UI, marketplace/community UX.
