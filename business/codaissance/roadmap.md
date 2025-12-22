# Codaissance 2026 Product Roadmap

## Q1 2026 (Jan - Mar)

| Project | Task | Target | Builder | Status |
|---------|------|--------|---------|--------|
| **Dev Genesis** | Finish core features | Dec 23 - Dec 30 | You | In Progress |
| | Testing & documentation | Dec 30 - Jan 3 | You | Pending |
| | **Launch (GitHub Template)** | **Jan 5** | You | Pending |
| **Professional OS** | Sanitize repo structure | Dec 23 - Jan 3 | You | Pending |
| | Write documentation | Jan 6 - Jan 10 | You | Pending |
| | Landing page + payment | Jan 13 - Jan 17 | You | Pending |
| | Build email list | Jan 1 - Jan 15 | You | Pending |
| | **Soft launch (email list)** | **Jan 16** | You | Pending |
| | **Public launch** | **Jan 21** | You | Pending |
| **Vibiom MVP** | CLI scaffold + config | Jan 6 - Jan 10 | You | Pending |
| | Product Agent | Jan 13 - Jan 24 | You | Pending |
| | Backend Agent | Jan 27 - Feb 7 | You | Pending |
| | Security Agent | Feb 10 - Feb 14 | You | Pending |
| | Orchestration + handoffs | Feb 17 - Feb 21 | You | Pending |
| | MVP testing | Feb 24 - Feb 28 | You | Pending |
| | **MVP Launch** | **Feb 28** | You | Pending |
| **TemperedUI** | Project setup + architecture | Mar 3 - Mar 5 | You | Pending |
| | Core secure components | Mar 6 - Mar 21 | You | Pending |
| | Form components + CSRF | Mar 24 - Apr 4 | You | Pending |
| | Documentation + Storybook | Apr 7 - Apr 11 | You | Pending |
| | **v1.0 Release** | **Apr 11** | You | Pending |

## Q2-Q3 2026: Parallel Development

Once TemperedUI v1.0 ships, you and Vibiom work in parallel:

| You Build (Manual) | Vibiom Builds (AI) |
|--------------------|-------------------|
| **DevGauntlet** | **MindTrace** |
| Project structure | Database schema |
| Auth + user system | Core logging UI |
| Ticket system + tests | Search + filtering |
| Backend track content | User auth + multi-tenant |
| **MVP Launch: Jun** | **MVP Launch: May** |
| | |
| **OpenOrbit** (after DevGauntlet) | **InstAPI** |
| Project profiles | Endpoint definition UI |
| Social features | Mock API generation |
| Community features | Hosted API service |
| **MVP Launch: Q3** | **MVP Launch: May** |
| | |
| | **ScopeCreep** |
| | RLS policy parser |
| | Test case generation |
| | CI/CD integration |
| | **MVP Launch: Jun** |

## Q3+ 2026: Post-MVP & Iteration

Post-MVP work is triggered by **user feedback**, not fixed dates:

| Product | Post-MVP Triggers | Likely Additions |
|---------|-------------------|------------------|
| Dev Genesis | User requests for specific stacks | Stack-specific templates, more AI configs |
| Vibiom | 3-agent MVP proven | Add Frontend, Testing, DevOps agents |
| TemperedUI | Used in 3+ products | More components based on actual needs |
| MindTrace | Paying users request features | Reports, exports, integrations |
| DevGauntlet | Users complete backend track | Frontend track, DevOps track |
| InstAPI | Users need more features | Response delays, auth mocking, webhooks |
| ScopeCreep | Enterprise interest | Team features, compliance reports |
| OpenOrbit | Community grows | Discovery, collaboration features |

---

## Parallel Workflow Diagram

```
Q1 2026                          Q2-Q3 2026
────────                         ───────────

Dev Genesis ──┐                  ┌─────────────────────────────────┐
              │                  │         PARALLEL TRACKS          │
Professional  │                  │                                  │
OS ───────────┤                  │  YOU              VIBIOM         │
              │                  │  ───              ──────         │
Vibiom MVP ───┤                  │                                  │
              │                  │  TemperedUI ──→  [waiting]       │
              ↓                  │       ↓              ↓           │
        TemperedUI v1.0 ────────→│  DevGauntlet    MindTrace        │
                                 │                 InstAPI          │
                                 │  OpenOrbit      ScopeCreep       │
                                 │                                  │
                                 └─────────────────────────────────┘
```

## Key Milestones

- **Jan 5**: Dev Genesis public launch (credibility)
- **Jan 21**: Professional OS public launch (first revenue)
- **Feb 28**: Vibiom MVP (3-agent orchestration working)
- **Apr 11**: TemperedUI v1.0 (unblocks all SaaS products)
- **May**: MindTrace MVP (Vibiom-built, first SaaS revenue potential)
- **May**: InstAPI MVP (Vibiom-built)
- **Jun**: DevGauntlet MVP (you-built)
- **Jun**: ScopeCreep MVP (Vibiom-built)
- **Q3**: OpenOrbit MVP (you-built)

## Success Metrics

| Metric | Q1 Target | Q2 Target | EOY Target |
|--------|-----------|-----------|------------|
| Products launched | 3 | 6 | 8 |
| MRR | $0 | $500 | $2,000+ |
| Paying customers | 0 | 10 | 50 |
| Vibiom-built products | 0 | 3 | 4 |
