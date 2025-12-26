# ScopeCreep - Project Spec

> Automated RLS testing for databases. Catch authorization bugs before they reach production.

## Project Identity

**Name**: ScopeCreep

**Type**: SaaS Web Application

**Tagline**: Automated RLS testing for databases. Catch authorization bugs before they reach production.

---

## The Problem

**Problem Statement**: Row-Level Security in PostgreSQL is powerful but notoriously difficult to test correctly. Developers define RLS policies assuming they work, but misconfigurations often go undetected until a data breach occurs. Manual testing is tedious and incomplete. There's no automated way to validate that RLS policies actually enforce the access patterns you intended.

**Current Solutions**: Manual SQL queries to test policies, code review, hoping for the best. No dedicated tooling exists.

**Cost of Inaction**: Data breaches, unauthorized access, compliance failures, multi-tenant data leaks.

---

## The Solution

**Solution Statement**: ScopeCreep automates RLS policy testing. Developers define expected access patterns (user A should see their own data, admin B should see everything, user C should see nothing), and ScopeCreep automatically generates test cases, runs them against your database, and alerts on violations. Continuous testing catches regressions when policies change.

**What This Is NOT**:
- Not a database admin tool
- Not a general security scanner
- Not a replacement for proper policy design

---

## Target Audience

**Primary User**: Backend developer building a multi-tenant SaaS application on PostgreSQL/Supabase who needs to verify RLS policies work correctly.

**User Personas**:
1. Backend developers using PostgreSQL RLS for multi-tenant applications
2. Security engineers auditing database access controls
3. Startups using Supabase who rely heavily on RLS
4. Development teams needing to validate access controls in CI/CD
5. Compliance-focused organizations requiring proof of access control testing

**Anti-Personas**:
1. Developers not using PostgreSQL
2. Applications without multi-tenant or role-based data access
3. Teams preferring application-layer access control

---

## MVP Spec

**MVP Goal**: Prove that automated RLS testing finds real misconfigurations that developers missed.

**MVP Features**:
1. Connect to PostgreSQL database
2. Define expected access patterns in YAML/JSON
3. Generate and run test cases automatically
4. Report violations with clear explanations
5. CI/CD integration (GitHub Actions)

**MVP Technologies**:
- Next.js
- TypeScript
- React
- Tailwind CSS
- PostgreSQL
- Supabase
- TemperedUI

**MVP Timeline**: 4-6 weeks

**MVP Success Criteria**: 3 companies pilot ScopeCreep and identify at least one RLS misconfiguration they weren't aware of.

---

## Post-MVP Spec

**Post-MVP Features**:
1. Continuous monitoring (not just CI/CD)
2. Policy suggestion engine
3. Supabase-specific integration
4. Compliance reporting (SOC2, HIPAA)
5. Slack/email alerts
6. Historical policy change tracking

**Post-MVP Technologies**:
- Background job processing
- Policy analysis engine
- Reporting/PDF generation

**Post-MVP Phases**:

Phase 1 (after MVP validation):
- Continuous monitoring
- Better violation explanations
- More database connectors

Phase 2 (scaling):
- Supabase marketplace integration
- Compliance reports
- Team collaboration

Phase 3 (expansion):
- Policy suggestion AI
- Other databases (MySQL, etc.)
- Enterprise features

---

## Technical Architecture

**Architecture Overview**: Web application that connects to customer databases, runs test queries, and reports results.

**Key Technical Decisions**:
- Read-only database connections (never modify customer data)
- Test in isolated transactions that roll back
- Connection via secure tunnel or direct

**Dependencies/Blockers**: TemperedUI (for secure forms)

**Security Considerations**:
- Database credentials handled securely
- Never store customer data
- Read-only connections enforced
- SOC2 compliance for enterprise

---

## Success Criteria

**Success Milestone**: 3 companies pilot ScopeCreep and identify at least one RLS misconfiguration they weren't aware of.

**Key Metrics**:
1. Misconfigurations found per customer
2. Time to setup and first test
3. CI/CD integration adoption
4. Customer retention

---

## Business Model

**Monetization Strategy**: Freemium

**Pricing Thoughts**:
- Free: 1 database, 5 test patterns, manual runs
- Pro ($29/mo): Unlimited databases, CI/CD, continuous monitoring
- Enterprise ($199/mo): Compliance reports, SSO, support

**Revenue Goal**: $2,000 MRR in first 12 months

---

## Mission Statement

ScopeCreep exists because database authorization is too critical to test manually. Our mission is to bring the same rigor of API security testing to row-level security—automatically validating that your database access controls actually work before misconfigurations become breaches.

---

## Planning Checklist

Before moving to `active.json`:

- [x] Problem is validated (known issue in Supabase community)
- [x] Solution is clearly differentiated (no competitors)
- [ ] MVP scope is realistic (can ship in 4-6 weeks of focused work)
- [x] MVP and post-MVP are clearly separated
- [x] Success milestone is specific and measurable
- [ ] No unresolved blockers (blocked by TemperedUI)
- [x] Created folder in `projects/specs/scopecreep/`
