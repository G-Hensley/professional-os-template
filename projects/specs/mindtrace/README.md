# MindTrace - Project Spec

> Log student behavior in 30 seconds. Simple, fast, and built for educators who don't have time to waste.

## Project Identity

**Name**: MindTrace

**Type**: SaaS Web Application

**Tagline**: Log student behavior in 30 seconds. Simple, fast, and built for educators who don't have time to waste.

---

## The Problem

**Problem Statement**: Teachers, therapists, and school counselors need to document student behavioral incidents quickly and accurately, but existing solutions are either too slow (paper notes that get lost), too clunky (spreadsheets), or too complex (enterprise software designed for administrators, not frontline educators). Every minute spent on documentation is a minute away from students.

**Current Solutions**: Paper notes, Excel spreadsheets, or complex enterprise behavior management systems (PBIS software, etc.) that require extensive training.

**Cost of Inaction**: Lost documentation, inconsistent records, difficulty preparing for IEP meetings, inability to identify behavioral patterns, burnout from administrative burden.

---

## The Solution

**Solution Statement**: MindTrace is built specifically for busy educators who need rapid documentation and easy access to behavioral data. Log an incident in under 30 seconds: select student, choose behavior type and mood, mark if aggressive or sensory-related, add notes, save. Instant search and filtering of historical logs makes it easy to prepare for parent meetings, IEP planning, and intervention tracking.

**What This Is NOT**:
- Not a full PBIS system
- Not a gradebook or academic tracking tool
- Not a communication platform for parents
- Not an administrative reporting tool (yet)

---

## Target Audience

**Primary User**: Special education teacher managing a classroom of 8-15 students with behavioral needs, documenting 5-10 incidents per day.

**User Personas**:
1. Teachers managing classroom behavior documentation
2. School counselors tracking student behavioral patterns
3. Therapists working with children who need incident logging
4. Special education coordinators preparing IEP documentation

**Anti-Personas**:
1. School administrators needing district-wide reporting
2. General education teachers with minimal behavioral documentation needs
3. Schools requiring specific compliance software

---

## MVP Spec

**MVP Goal**: Prove that a simple, fast logging tool is valuable to educators and that they'll use it daily.

**MVP Features**:
1. Quick incident logging (student, behavior type, mood, notes)
2. Student roster management
3. Historical log viewing with search/filter
4. Basic behavior type categories (customizable)
5. Mobile-responsive design (usable on phone in classroom)

**MVP Technologies**:
- Next.js
- TypeScript
- React
- Tailwind CSS
- Supabase (auth + database)
- Vitest

**MVP Timeline**: 4-6 weeks

**MVP Success Criteria**: 5 teachers or counselors use MindTrace for 30 days and report it saves them time compared to their previous system.

---

## Post-MVP Spec

**Post-MVP Features**:
1. Behavioral trend reports and visualizations
2. IEP documentation export
3. Team sharing (multiple staff logging same students)
4. Custom behavior categories per school
5. Offline support (PWA)
6. Parent communication portal
7. Integration with school SIS systems

**Post-MVP Technologies**:
- Chart.js or Recharts for visualizations
- PDF generation for reports
- PWA service workers
- Turborepo (if adding multiple apps)

**Post-MVP Phases**:

Phase 1 (after MVP validation):
- Trend reports and visualizations
- IEP export functionality
- Team sharing

Phase 2 (scaling):
- Offline PWA support
- Custom categories
- Multiple school support

Phase 3 (expansion):
- Parent portal
- SIS integrations
- District-level features

---

## Technical Architecture

**Architecture Overview**: Next.js full-stack application with Supabase backend. Server components for data fetching, client components for interactive logging forms.

**Key Technical Decisions**:
- Supabase for rapid development (auth, database, real-time)
- Next.js App Router for modern React patterns
- Mobile-first design (most logging happens on phone)
- Row-level security for data isolation

**Dependencies/Blockers**: None

**Security Considerations**:
- FERPA compliance considerations (student data)
- Row-level security in Supabase
- No PII in logs beyond necessary (student first name + last initial)
- Data encryption at rest

---

## Success Criteria

**Success Milestone**: 5 teachers or counselors use MindTrace for 30 days and report it saves them time compared to their previous system.

**Key Metrics**:
1. Daily active users
2. Incidents logged per user per day
3. Time to log an incident (target: <30 seconds)
4. User retention (30-day)
5. NPS score from educators

---

## Business Model

**Monetization Strategy**: SaaS Subscription

**Pricing Thoughts**:
- Free tier: 1 user, 10 students, basic features
- Individual: $9/month - unlimited students, reports
- Team: $29/month - up to 5 users, shared students
- School: $99/month - unlimited users, admin features

**Revenue Goal**: $2,000 MRR in first 12 months

---

## Mission Statement

MindTrace exists because educators deserve tools as fast as they need to be. Our mission is to give teachers, counselors, and therapists back their time by making behavioral documentation instant and effortless, so they can focus on what matters: their students.
