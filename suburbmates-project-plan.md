# Suburbmates — Project Plan

## 1. Vision
Build a trusted, accessible “digital town square” for each suburb, starting in Melbourne (Darebin/Northcote): marketplace + civic hub with strong privacy and inclusion.

## 2. Objectives & KPIs
- **Adoption:** active vendors and residents; MAU growth.
- **Trust:** APP privacy adherence; WCAG 2.1 AA ≥ 95% coverage.
- **Reliability:** p95 < 300 ms for core pages; 99.9% monthly uptime.
- **Safety:** zero material PII leaks; moderated community standards.
- **Commerce:** successful Stripe checkouts; refund accuracy.

## 3. Scope (MVP)
- Multi-vendor marketplace with Stripe Checkout.
- Community hub (forums, events).
- Verified profiles.
- Map layers for services/amenities.
- Basic admin and moderation.
- Telemetry: Sentry, GA4.

## 4. Architecture
- **Frontend:** Next.js (Vercel).
- **Backend:** Node/Next API routes.
- **Database:** Neon PostgreSQL 17 (AWS, Sydney).
- **Auth:** Auth.js.
- **Payments:** Stripe (Hosted Checkout + webhooks).
- **Geo:** Mapbox + Google Maps.
- **Email:** Resend.
- **Observability:** Sentry, GA4.
- **AI (extension):** OpenAI (Responses API, Agents SDK, AgentKit).

## 5. Governance & Compliance
- APP privacy-by-design; deletion within 30 days on request.
- WCAG 2.1 AA targets; keyboard-accessible UI.
- Moderation policy with appeals; audit logging of actions.
- Data residency preference AU; encrypted in transit/at rest.

## 6. Risk & Mitigation
- **Payment errors:** idempotent Stripe flows; recon via webhooks.
- **PII exposure:** redaction + guardrails; least-privilege access.
- **Model errors:** human gates for destructive actions; eval gating.
- **Cost drift:** budgets per run; alerting on spikes.

## 7. Phases & Deliverables (1–6)
1. **Planning & Foundation:** charter, personas, governance, risks.
2. **Design & UX:** design system, Figma, accessibility audit.
3. **Technical Development:** Next.js + Neon; marketplace + community; Stripe, Maps, Resend; telemetry wiring.
4. **Testing & QA:** unit/e2e; a11y, security, privacy checks.
5. **Launch & Optimize:** pilot release; feedback loops; scaling plan.
6. **Monitoring Automation:** VS Code tasks for Sentry + GA4 checks.

## 8. AI Extension (Phases 7–9)
- **Phase 7:** Deployment Validation — live E2E verification; canary.
- **Phase 8:** AgentKit Integration — create draft workflow in OpenAI; keep file artifacts in repo.
- **Phase 9:** SDK Link & Testing — register connectors, import agent, run evals; promote on gate success.

## 9. Roles & Ownership
- **AI Architect:** agents, guardrails, evals, budgets.
- **Backend:** connectors, schemas, DB migrations, webhooks.
- **Frontend:** Chat UI, marketplace/community UX.
- **DevOps:** CI/CD, envs, tracing, alerts, canary.
- **Compliance/Moderation:** policy, approvals, audit reviews.

## 10. Next Steps
- Finalize Phase 7 validation checklist.
- Maintain draft workflow in OpenAI.
- Prepare SDK link script and VS Code task to begin Phase 9.
