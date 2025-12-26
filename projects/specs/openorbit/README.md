# OpenOrbit - Project Spec

> Build in public, together. A social platform for tech creators sharing projects, not resumes.

## Project Identity

**Name**: OpenOrbit

**Type**: SaaS Web Application / Social Platform

**Tagline**: Build in public, together. A social platform for tech creators sharing projects, not resumes.

---

## The Problem

**Problem Statement**: LinkedIn is resume-focused—your profile is about where you worked, not what you're building. Twitter/X is noisy and not structured for project updates. There's no dedicated platform for tech professionals to share their building journey in a structured way that connects them with collaborators and builds reputation through work, not credentials.

**Current Solutions**: Twitter/X threads, LinkedIn posts, personal blogs, Discord communities. All fragmented, none project-centric.

**Cost of Inaction**: Builders lack a dedicated home for their work. Building in public is scattered. Hard to find collaborators. Reputation tied to employers, not creations.

---

## The Solution

**Solution Statement**: OpenOrbit makes "building in public" the core social experience. Users create project profiles with milestones, get feedback from the community, find collaborators, and showcase their building process. Projects can be shared externally, building reputation through transparent progress rather than polished portfolios. Connect with people through what you're creating rather than where you work.

**What This Is NOT**:
- Not LinkedIn (not resume-focused)
- Not Twitter (structured, not stream-of-consciousness)
- Not GitHub (social first, not code hosting)
- Not a project management tool

---

## Target Audience

**Primary User**: Indie hacker building a SaaS product in public who wants to document progress, get feedback, and connect with other builders.

**User Personas**:
1. Indie hackers and solo developers building in public
2. Designers sharing their design process and getting feedback
3. Security researchers documenting their work
4. Open-source maintainers engaging with their community
5. Tech creators who want to be known for what they build, not where they work

**Anti-Personas**:
1. Passive content consumers (not builders)
2. Corporate marketing accounts
3. People seeking traditional job networking

---

## MVP Spec

**MVP Goal**: Prove that tech builders want a dedicated platform for project updates and will actively use it over Twitter.

**MVP Features**:
1. User profiles centered on projects
2. Project creation with description and milestones
3. Progress update posts (text, images, links)
4. Following and feed of project updates
5. Comments and feedback on updates

**MVP Technologies**:
- Next.js
- TypeScript
- React
- Tailwind CSS
- Supabase
- TemperedUI
- ScopeCreep (for RLS testing)

**MVP Timeline**: 6-8 weeks

**MVP Success Criteria**: 100 users create accounts and post at least 3 project updates each, with measurable engagement (comments/feedback) on their posts.

---

## Post-MVP Spec

**Post-MVP Features**:
1. Collaborator discovery and matching
2. Project showcase pages (shareable externally)
3. Milestone celebrations and badges
4. Topic-based communities
5. Weekly digest emails
6. API for cross-posting
7. Premium features for serious builders

**Post-MVP Technologies**:
- Email service (digest)
- API for integrations
- Analytics for engagement

**Post-MVP Phases**:

Phase 1 (after MVP validation):
- External project pages
- Better discovery
- Mobile optimization

Phase 2 (scaling):
- Collaborator matching
- Communities by topic
- Notifications improvements

Phase 3 (expansion):
- API for cross-posting
- Premium features
- Sponsored content (carefully)

---

## Technical Architecture

**Architecture Overview**: Next.js social application with Supabase for auth, database, and real-time features.

**Key Technical Decisions**:
- Supabase for rapid development
- Real-time feeds with Supabase subscriptions
- Row-level security for data isolation
- Image hosting via Supabase Storage

**Dependencies/Blockers**: TemperedUI (for secure forms), ScopeCreep (for RLS testing)

**Security Considerations**:
- Content moderation
- Spam prevention
- User data privacy
- RLS policies for data access

---

## Success Criteria

**Success Milestone**: 100 users create accounts and post at least 3 project updates each, with measurable engagement (comments/feedback) on their posts.

**Key Metrics**:
1. Active users (weekly)
2. Project updates posted per week
3. Engagement rate (comments per post)
4. User retention (30-day)
5. External shares of project pages

---

## Business Model

**Monetization Strategy**: Freemium

**Pricing Thoughts**:
- Free: Unlimited projects and updates
- Pro ($9/mo): Custom project page URLs, analytics, priority support
- Sponsor: Companies pay for visibility to hire builders

**Revenue Goal**: $1,000 MRR in first 12 months

---

## Mission Statement

OpenOrbit exists because your best work isn't a resume bullet—it's what you're building right now. Our mission is to create a social platform where tech professionals connect through active projects, not past credentials. We believe reputation should come from transparent progress and real work, not polished portfolios and job titles.

---

## Planning Checklist

Before moving to `active.json`:

- [x] Problem is validated (personal experience, community feedback)
- [x] Solution is clearly differentiated (project-centric vs resume-centric)
- [ ] MVP scope is realistic (can ship in 6-8 weeks of focused work)
- [x] MVP and post-MVP are clearly separated
- [x] Success milestone is specific and measurable
- [ ] No unresolved blockers (blocked by TemperedUI, ScopeCreep)
- [x] Created folder in `projects/specs/openorbit/`
