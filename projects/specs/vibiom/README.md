# Vibiom - Project Spec

> Multi-agent development that actually works.

## Project Identity

**Name**: Vibiom

**Type**: CLI Tool

**Tagline**: Multi-agent development that actually works.

---

## The Problem

**Problem Statement**: Solo developers want to build ambitious products but can't afford full engineering organizations. Existing AI coding tools help write code faster, but they're single-agent assistants—you still do all the architecture, security review, testing, and coordination yourself.

**Current Solutions**: Single AI assistants (Claude, Copilot, Cursor) that help with individual tasks but don't coordinate across disciplines.

**Cost of Inaction**: Solo devs remain bottlenecked by their own time and expertise. Complex systems ship with security holes and architectural debt.

---

## The Solution

**Solution Statement**: Vibiom MVP coordinates 3 specialized agents: Product (specs), Backend (implementation), Security (review). Each agent specializes in one domain, validates previous work, and hands off through structured workflows.

**What This Is NOT**:
- Not a replacement for developers (agents assist, humans decide)
- Not a general-purpose AI chat tool
- Not production-ready for enterprise (MVP phase)

---

## Target Audience

**Primary User**: Solo developer building a backend API who wants AI agents to handle the coordination between specification, implementation, and review.

**User Personas**:
1. Solo developers wanting to build complex products
2. Small startups needing rapid prototyping
3. Freelance developers scaling output

**Anti-Personas**:
1. Large teams with dedicated specialists already
2. Non-technical founders expecting turnkey solutions
3. Developers building simple CRUD apps

---

## MVP Spec

**MVP Goal**: Prove that coordinated AI specialists produce better code than single-agent generalists.

**MVP Features**:
1. CLI interface for project orchestration
2. Product Agent - Generates specifications from requirements
3. Backend Agent - Implements code from specifications
4. Security Agent - Reviews code for vulnerabilities
5. Structured handoff workflow between agents

**MVP Technologies**:
- TypeScript
- Node.js
- Commander (CLI)
- Anthropic SDK
- YAML (configuration)
- Zod (validation)

**MVP Timeline**: 4-6 weeks

**MVP Success Criteria**: Successfully orchestrate 3 agents to build a complete backend API from a specification.

---

## Post-MVP Spec

**Post-MVP Features**:
1. Frontend Agent
2. Testing Agent
3. DevOps Agent
4. Web interface for orchestration
5. Project templates
6. Custom agent creation

**Post-MVP Technologies**:
- Web UI (Next.js)
- Agent marketplace
- Plugin system

**Post-MVP Phases**:

Phase 1 (after MVP validation):
- Add Frontend Agent
- Add Testing Agent
- Improve handoff quality

Phase 2 (scaling):
- Web UI for orchestration
- Project templates library
- Multi-project support

Phase 3 (expansion):
- Custom agent creation
- Agent marketplace
- Enterprise features

---

## Technical Architecture

**Architecture Overview**: TypeScript CLI that orchestrates API calls to Anthropic Claude, managing context and handoffs between specialized prompts.

**Key Technical Decisions**:
- CLI-first (web UI comes later)
- Single LLM provider (Anthropic) for consistency
- Structured handoff format (YAML/JSON)
- Human-in-the-loop checkpoints

**Dependencies/Blockers**: Dev Genesis (for project setup patterns)

**Security Considerations**:
- API key management
- No sensitive data in agent context
- Security Agent validates all generated code

---

## Success Criteria

**Success Milestone**: Successfully orchestrate 3 agents to build a complete backend API from a specification.

**Key Metrics**:
1. Time to complete API generation
2. Code quality (security issues found by Security Agent)
3. User satisfaction with generated code
4. Reduction in manual coordination

---

## Business Model

**Monetization Strategy**: Open-source MVP, SaaS later

**Pricing Thoughts**:
- Free: CLI tool with BYO API key
- Pro: Hosted version with usage-based pricing
- Enterprise: Custom agents, priority support

**Revenue Goal**: $0 initially (validation phase), then SaaS later

---

## Mission Statement

Vibiom exists to prove that coordinated AI specialists build better software than single AI generalists. Our mission is to give solo developers access to the kind of specialized coordination that only large teams could afford—allowing one person to build like an entire engineering organization.

---

## Planning Checklist

Before moving to `active.json`:

- [x] Problem is validated (experienced it myself building projects)
- [x] Solution is clearly differentiated from single-agent tools
- [ ] MVP scope is realistic (can ship in 4-6 weeks of focused work)
- [x] MVP and post-MVP are clearly separated
- [x] Success milestone is specific and measurable
- [ ] No unresolved blockers (blocked by Dev Genesis)
- [x] Created folder in `projects/specs/vibiom/`
