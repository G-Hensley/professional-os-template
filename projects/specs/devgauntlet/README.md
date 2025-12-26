# DevGauntlet - Project Spec

> No tutorials. Just challenges. Build like a professional developer, not a student.

## Project Identity

**Name**: DevGauntlet

**Type**: SaaS Web Application

**Tagline**: No tutorials. Just challenges. Build like a professional developer, not a student.

---

## The Problem

**Problem Statement**: Most developer education focuses on tutorials that hold your hand through every step, leaving developers unprepared for real work where you get a ticket, research solutions, and ship tested code. Bootcamps teach syntax but not professional workflows. Junior developers struggle to prove they can work independently because they've never practiced taking requirements and delivering working software.

**Current Solutions**: Tutorial-based courses (Udemy, freeCodeCamp), bootcamps, documentation reading. All focus on learning syntax, not professional workflows.

**Cost of Inaction**: Junior developers enter the workforce unprepared. Companies waste time training basics. Developers lack confidence in their professional abilities.

---

## The Solution

**Solution Statement**: DevGauntlet teaches professional development by having you do professional development. You receive Jira-style tickets with requirements and acceptance criteria. You research, implement, and test your solution. Automated testing validates your work. Your completed projects prove you can work professionally from day one. Learn TDD, BDD/DDD, Docker, Kubernetes, CI/CD, and Agile workflows by doing what professional engineers do.

**What This Is NOT**:
- Not a tutorial platform (no step-by-step guides)
- Not a coding bootcamp (no live instruction)
- Not a certification program (proves skills through work, not tests)

---

## Target Audience

**Primary User**: Self-taught developer with 1-2 years of coding experience who wants to prove they can work professionally before applying for jobs.

**User Personas**:
1. Self-taught developers wanting to learn professional workflows
2. Bootcamp graduates needing to prove they can work independently
3. Junior developers preparing for their first engineering role
4. Career changers building a portfolio of real project work
5. Developers wanting to expand into new domains (backend, DevOps, AI)

**Anti-Personas**:
1. Complete beginners who need to learn programming basics first
2. Senior developers who already have professional experience
3. People looking for quick certifications without doing the work

---

## MVP Spec

**MVP Goal**: Prove that developers will complete challenges and find value in the ticket-based learning approach.

**MVP Features**:
1. Backend development challenge track (auth, APIs, databases)
2. Jira-style ticket interface with requirements
3. Automated test validation of submissions
4. Progress tracking and completion badges
5. Basic user authentication

**MVP Technologies**:
- Next.js
- TypeScript
- React
- Tailwind CSS
- TemperedUI
- Supabase
- Vitest
- GitHub Actions

**MVP Timeline**: 6-8 weeks

**MVP Success Criteria**: 15 developers sign up and complete at least one full backend project challenge.

---

## Post-MVP Spec

**Post-MVP Features**:
1. Frontend challenge track
2. DevOps challenge track
3. AI/ML challenge track
4. Leaderboards and competition features
5. Team challenges
6. Company sponsorships for hiring
7. Premium advanced tracks

**Post-MVP Technologies**:
- Docker containerization for sandboxed execution
- Kubernetes for scaling
- GitHub integration for PR-based submissions

**Post-MVP Phases**:

Phase 1 (after MVP validation):
- Frontend challenge track
- Improved test feedback
- User profiles and portfolios

Phase 2 (scaling):
- DevOps track
- Team/company features
- Hiring integration

Phase 3 (expansion):
- AI/ML track
- Desktop/mobile tracks
- Enterprise licensing

---

## Technical Architecture

**Architecture Overview**: Next.js web application with Supabase backend. Sandboxed code execution for validating submissions.

**Key Technical Decisions**:
- Supabase for rapid MVP development
- Server-side test execution (secure sandbox)
- GitHub-style PR workflow for submissions
- Markdown-based challenge content

**Dependencies/Blockers**: TemperedUI (for secure form components)

**Security Considerations**:
- Sandboxed code execution (critical)
- Rate limiting on submissions
- No arbitrary code execution on main servers
- User data isolation

---

## Success Criteria

**Success Milestone**: 15 developers sign up and complete at least one full backend project challenge (MVP phase).

**Key Metrics**:
1. Challenge completion rate
2. Time to complete challenges
3. User retention (return for more challenges)
4. NPS score
5. Portfolio usage (sharing completed work)

---

## Business Model

**Monetization Strategy**: Freemium

**Pricing Thoughts**:
- Free: 3 challenges, basic progress tracking
- Pro ($19/mo): Unlimited challenges, all tracks, portfolio features
- Team ($49/mo per seat): Company dashboards, hiring tools

**Revenue Goal**: $3,000 MRR in first 12 months

---

## Mission Statement

DevGauntlet exists because tutorials don't prepare you for real work. Our mission is to train developers the way they'll actually work—by taking tickets, researching solutions, writing tested code, and shipping. No hand-holding, no step-by-step guides, just the challenge and the tools to figure it out.

---

## Planning Checklist

Before moving to `active.json`:

- [x] Problem is validated (experienced this myself, heard from others)
- [x] Solution is clearly differentiated from tutorial platforms
- [ ] MVP scope is realistic (can ship in 6-8 weeks of focused work)
- [x] MVP and post-MVP are clearly separated
- [x] Success milestone is specific and measurable
- [ ] No unresolved blockers (blocked by TemperedUI)
- [x] Created folder in `projects/specs/devgauntlet/`
