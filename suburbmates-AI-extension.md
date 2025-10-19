# Suburbmates: AI Extension Addendum (Phases 7–9)

This addendum extends the original six-phase plan with AI orchestration using OpenAI AgentKit and the Agents SDK.

## Phase 7 — Deployment Validation
**Objective:** Verify live infrastructure and end-to-end flows.
- **Checks:** Env vars (Dev/Preview/Prod), Vercel build, Neon connectivity, Stripe SDK + webhook, Sentry, GA4.
- **Endpoints:** `/health`, `/api/dbtest`, `/api/stripe/test`, `/api/stripe/webhook`.
- **Release:** Canary 5–10% with rollback tested.
- **Exit:** All checks pass; no P1 incidents; on-call runbook updated.

## Phase 8 — AgentKit Integration (UI draft only)
**Objective:** Create draft workflow in OpenAI.
- **Action:** In Agent Builder create **“Suburbmates-Commerce-Workflow”** as draft.
- **Prep Artifacts (in repo):** `connectors.yaml`, `agents/commerce.yaml`, `schemas/*.json`, `guardrails.yaml`, `evals/golden/commerce.yaml`, `observability.yaml`.
- **Exit:** Draft visible in OpenAI project; no tool wiring in UI.

## Phase 9 — SDK Link & Testing (VS Code)
**Objective:** Link local definitions to the draft workflow via SDK and run tests.
- **Steps:**
  1. Install OpenAI SDK (`pnpm add openai`).
  2. Link script registers connectors from `connectors.yaml`.
  3. Import `agents/commerce.yaml`; bind to **Suburbmates-Commerce-Workflow**.
  4. Dry-run job; observe in OpenAI dashboard.
  5. Run golden tasks; enforce budgets and guardrails.
- **Promotion Gate:** Evals ≥ 90%, p95 < 8s, cost/run ≤ $0.05, zero P1 in 24h canary.
