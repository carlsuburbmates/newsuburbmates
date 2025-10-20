# Suburbmates — Single Source of Truth (SSOT) v1

> Canonical source: /docs/SSOT.md  
> Approved by: You (Project Owner)  
> Every derivative doc must reference this file header.

---

## 1. Purpose
Digital town square for Melbourne suburbs. Combine local commerce, civic forums, and accessible onboarding with privacy-first principles.  
Pilot area: Darebin/Northcote.

---

## 2. North Star & KPIs
- MVP live ≤12 months.  
- 500 users and 50 businesses in 3 months.  
- ≥15 % MAU, ≥90 % satisfaction, WCAG 2.1 AA ≥ 95 %.  
- Trust, inclusion, marketplace usage = phase metrics.

---

## 3. Scope (MVP)
Marketplace, verified profiles (ABN/ID/address), forums, GIS directory, mobile-first UX, consent management, CI/CD, basic admin.

---

## 4. Users
Residents, SMEs/vendors, CALD and older adults, community champions, council partners.

---

## 5. Principles
Evidence-based · inclusion-first · privacy-by-design · local-first partnerships · cloud-native scalability.

---

## 6. Roadmap (authoritative)
- **P1 Planning:** charter, personas, governance, feasibility, KPIs.  
- **P2 Design:** IA, wireframes, design system, accessibility audits, usability tests.  
- **P3 Development (current):** architecture, marketplace, forums, auth + verification, GIS, privacy & performance SLAs.  
- **P4 Content / SEO**  
- **P5 QA & Accessibility**  
- **P6 Launch / Post-Launch**  
- **P7 Deployment Validation:** verify Vercel/Neon/Stripe/Sentry/GA4.  
- **P8 AgentKit Integration:** create draft workflow Suburbmates-Commerce-Workflow.  
- **P9 SDK Link & Testing:** connect VS Code ↔ AgentKit, run evals, promote on gate success.

---


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

---

## 8. Security / Privacy / Compliance
APP-aligned privacy-by-design, granular consent, encryption in transit/at rest, audit logs, DPIA pre-launch, pen testing booked.

---

## 9. Accessibility & Performance
Targets: WCAG 2.1 AA ≥ 95 % coverage · LCP < 2.5 s · INP < 200 ms · CLS < 0.1  
Verification: automated (Lighthouse + axe) + manual SR/keyboard tests.

---

## 10. Governance & Moderation
Moderation SOPs + queues + escalation; quarterly privacy review; monthly accessibility review; stakeholder reporting.

---

## 11. Operating Cadence
Threads per phase, templated checklists, evidence-first collaboration.  
Weekly stand-up, monthly stakeholder update, quarterly community review.

---

## 12. Roles
| Role | Responsibility |
|------|----------------|
| **You** | final decisions, secrets, merges, sign-offs |
| **AI PM** | sprints, tickets, specs, reports |
| **AI Dev** | scaffolds code, tests, infra |
| **AI QA** | test plans, accessibility + UAT |
| **Automation** | CI/CD, SAST/DAST, deps |

---

## 13. Current State (Weeks 0 → 2)
- Week 0 – repo, CI/CD, secrets, docs ✅  
- Week 1 – Auth.js magic link, RBAC ✅  
- Week 2 – Vendor onboarding, Stripe checkout + webhook stub ✅  

---

## 14. ADR / Architecture
ADR-001 stack; use ADRs for auth, payments, GIS; linked in `/docs/architecture.md`.

---

## 15. KPIs & Analytics
Adoption · engagement · inclusion · trust · GMV; dashboards post-launch; feedback integration.

---

## 16. Risks & Mitigations
| Risk | Mitigation |
|-------|-------------|
| Webhook failures | Idempotency + retries |
| Auth mail issues | SMTP fallback |
| DB drift | Migration reviews |
| Accessibility regression | CI budgets + tests |

---

## 17. Artifacts (canonical)
Charter · Lean Canvas · Roadmap v1 · Project Plan · Goals · Organising Guide · Copilot Instructions · Prompting Guide · Session Reset · Citations.

---

## 18. Gaps to Close
- Define UAT exit criteria.  
- Complete data model mapping for marketplace / forum / GIS.  
- Quantify moderation SLAs.

---

## 19. SSOT Change Control
- Every change via PR to `/docs/SSOT.md`.  
- Requires owner approval + release tag.  
- Reference ADRs and link tickets.  

---

## References
- `copilot-instructions.md`  
- `prompting.md`  
- `session-reset.md`  
- `citations.md`  

---

_Last validated (YYYY-MM-DD)_
