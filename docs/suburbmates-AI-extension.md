# Suburbmates: AI Extension Addendum (Phases 7–9)

## Phase 7 — Deployment Validation
- Live E2E verification of Stripe, Sentry, GA4, and agent endpoints.
- Canary deploy (5–10% traffic) with rollback tested.
- Audit logs and error monitoring enabled.
- Checklist: all connectors, schemas, and guardrails in repo; envs validated.

## Phase 8 — AgentKit Integration
- Create **Suburbmates-Commerce-Workflow** in OpenAI (draft only, not prod).
- Register connectors, schemas, and agents in repo (`connectors.yaml`, `schemas/`, `agents/commerce.yaml`).
- Document workflow in `docs/` and keep up to date.
- Evals: add golden tasks for commerce, moderation, and privacy.

## Phase 9 — SDK Link & Testing
- From VS Code: register connectors, import `agents/commerce.yaml`, bind to workflow, run golden tasks, promote on gates.
- Add VS Code task for SDK link and eval run.
- Document all steps in `docs/`.

---

### File Artifacts
- `connectors.yaml`, `schemas/user.json`, `schemas/order.json`, `schemas/business.json`, `agents/commerce.yaml`, `guardrails.yaml`, `evals/golden/commerce.yaml`, `observability.yaml`
- `docs/WEBHOOKS.md`, `docs/commerce-workflow.md`, `docs/CONTRIBUTING.md`, `docs/suburbmates-AI-extension.md`, `docs/suburbmates-project-plan.md`, `docs/roadmapv1.md`

### Automation
- Husky pre-commit: validate docs and YAML/JSON.
- `auto-update-docs-index.js`: keep docs index up to date.
- VS Code tasks: build, lint, test, webhook check, Sentry/GA4 monitor.

### Compliance
- All documentation and automation must be discoverable and auditable.
- README and docs must reference all automation and compliance steps.
