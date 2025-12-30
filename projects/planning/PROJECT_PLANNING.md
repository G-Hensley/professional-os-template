# Project Planning Template

Use this template when starting a new project. Fill out each section, then create the JSON entry and project spec folder.

---

## Quick Start

1. Create a folder: `projects/specs/{project-key}/`
2. Copy this template to `projects/specs/{project-key}/README.md`
3. Fill in each section (skip none, even if brief)
4. Create JSON entry in `projects/planned.json` (or `active.json` if starting immediately)

### Folder Structure

```
projects/
├── active.json              # All active projects (source of truth for status)
├── planned.json             # Planned/blocked projects
├── completed.json           # Completed projects
├── planning/
│   └── PROJECT_PLANNING.md  # This template
└── specs/
    ├── dev-genesis/
    │   ├── README.md        # Filled planning template
    │   └── ...              # Diagrams, notes, research
    ├── tempered-ui/
    ├── mindtrace/
    └── {your-project}/
```

---

## Project Planning Template

### Project Identity

**Name**:
<!-- Clear, memorable name. Check for domain/npm availability if relevant. -->

**Type**:
<!-- Examples: SaaS Web Application, CLI Tool, Component Library, GitHub Template, Browser Extension, Mobile App -->

**Tagline**:
<!-- One sentence that captures the value. Format: "[Verb] [benefit] [for whom]" -->

---

### The Problem

**Problem Statement**:
<!-- What specific pain exists? Who feels it? How often? Be concrete. -->

**Current Solutions**:
<!-- What do people do today? Why is it inadequate? -->

**Cost of Inaction**:
<!-- What happens if this problem isn't solved? Time lost? Money lost? Frustration? -->

---

### The Solution

**Solution Statement**:
<!-- How does this project solve the problem? Be specific about the mechanism. -->

**What This Is NOT**:
<!-- Explicitly state what's out of scope. Helps prevent scope creep. -->

---

### Target Audience

**Primary User**:
<!-- Describe the ideal first user. Be specific: role, company size, technical level. -->

**User Personas** (2-4):
<!-- Brief descriptions of different user types -->
1.
2.

**Anti-Personas** (who is this NOT for):
<!-- Explicitly exclude user types to maintain focus -->
1.

---

### MVP Spec

The minimum viable product. Ship this first, validate, then expand.

**MVP Goal**:
<!-- What does the MVP prove? What question does it answer? -->

**MVP Features** (3-5 max):
<!-- Core features only. If you can cut it, cut it. -->
1.
2.
3.

**MVP Technologies**:
<!-- Tech stack for MVP. Keep it simple. -->
-

**MVP Timeline**:
<!-- Realistic estimate. 2-4 weeks is ideal for MVP. -->

**MVP Success Criteria**:
<!-- How do you know MVP worked? Be specific and measurable. -->
<!-- Example: "5 users complete the core flow without asking for help" -->

---

### Post-MVP Spec

Features and improvements after MVP validation. Only build these if MVP succeeds.

**Post-MVP Features**:
<!-- Features that enhance but aren't essential for validation -->
1.
2.
3.
4.
5.

**Post-MVP Technologies**:
<!-- Additional tech that comes later (e.g., analytics, payments, advanced integrations) -->
-

**Post-MVP Phases**:
<!-- Break post-MVP into phases if helpful -->

Phase 1 (after MVP validation):
-

Phase 2 (scaling):
-

Phase 3 (expansion):
-

---

### Technical Architecture

**Architecture Overview**:
<!-- Brief description. Monolith? Microservices? Serverless? -->

**Key Technical Decisions**:
<!-- Important choices and why -->
-

**Dependencies/Blockers**:
<!-- Other projects or external factors this depends on -->

**Security Considerations**:
<!-- Auth, data protection, common vulnerabilities to address -->

---

### Success Criteria

**Success Milestone**:
<!-- Specific, measurable outcome that proves the project works. -->
<!-- Format: "[Number] [users/downloads/etc.] [action] [timeframe]" -->

**Key Metrics**:
<!-- 3-5 metrics to track progress -->
1.
2.
3.

---

### Business Model

**Monetization Strategy**:
<!-- Options: Open-source, Freemium, SaaS Subscription, One-time Purchase, Consulting/Services -->

**Pricing Thoughts** (if applicable):
<!-- Early pricing ideas, even rough -->

**Revenue Goal** (first 12 months):
<!-- Realistic target. $0 is fine for open-source. -->

---

### Mission Statement

**Mission**:
<!-- Why does this project exist? What change does it create in the world? -->
<!-- Format: "[Project] exists to/because [reason]. Our mission is to [outcome]." -->

---

### Planning Checklist

Before moving to `active.json`:

- [ ] Problem is validated (talked to potential users or experienced it myself)
- [ ] Solution is clearly differentiated from alternatives
- [ ] MVP scope is realistic (can ship in 2-4 weeks of focused work)
- [ ] MVP and post-MVP are clearly separated
- [ ] Success milestone is specific and measurable
- [ ] No unresolved blockers
- [ ] Created folder in `projects/specs/{project-key}/`

---

## JSON Schema

Add to `projects/active.json` or `projects/planned.json`:

```json
{
  "project-key": {
    "name": "Project Name",
    "repo_url": "https://github.com/yourusername/repo-name",
    "type": "SaaS Web Application",
    "description": "2-3 sentence description covering what it does and key features.",
    "technologies": ["Tech1", "Tech2", "Tech3"],
    "post_mvp_technologies": ["Tech4", "Tech5"],
    "monetization_strategy": "Freemium",
    "status": "In Progress",
    "priority": 8,
    "due_date": "2025-MM-DD",
    "problem": "Full problem statement from above.",
    "solution": "Full solution statement from above.",
    "target_audience": [
      "Persona 1 description",
      "Persona 2 description"
    ],
    "mission_statement": "Full mission statement from above.",
    "success_milestone": "Specific measurable milestone.",
    "tagline": "Short tagline from above."
  }
}
```

### Optional Fields

```json
{
  "blocked_by": "Other Project Name",
  "stale": true,
  "stale_since": "2025-MM-DD",
  "completed_at": "2025-MM-DD",
  "paused_at": "2025-MM-DD",
  "spec_folder": "projects/specs/project-key"
}
```

### Status Values

- `"In Progress"` - Actively being worked on (use in `active.json`)
- `"Blocked"` - Waiting on another project (use in `planned.json`)
- `"Not Started"` - Planned but not begun (use in `planned.json`)
- `"Paused"` - Started but on hold (use in `planned.json`)
- `"Completed"` - Done (use in `completed.json`)

### Priority Scale

- `10` - Top priority, working on now
- `8-9` - High priority, next up
- `5-7` - Medium priority, planned
- `1-4` - Low priority, someday/maybe

---

## Examples

See existing projects for reference:
- `projects/specs/my-saas-app/` - SaaS Application example
