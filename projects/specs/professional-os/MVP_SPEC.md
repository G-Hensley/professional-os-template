# MVP Specification

## Definition of MVP

The Minimum Viable Product is what we need to ship by January 31, 2026 to validate the market and generate first revenue. It must solve the core problem well enough that people will pay for it.

---

## Current Progress Summary

```
TEMPLATE MVP:     ████████████████████░░░░  ~85% Complete
LOCAL DASHBOARD:  ████████████░░░░░░░░░░░░  ~50% Complete
HOSTED DASHBOARD: ░░░░░░░░░░░░░░░░░░░░░░░░  Not Started (Phase 2)
AUTOMATION PRO:   ░░░░░░░░░░░░░░░░░░░░░░░░  Not Started (Phase 3)
```

---

## MVP Scope (Must Have for Launch)

### Repository Structure
- [x] Clean, well-organized folder structure
- [x] Clear README with setup instructions
- [x] CONTEXT.md explaining the system (auto-updated daily)
- [x] CLAUDE.md for AI tool configuration

### Profile Data (JSON Schemas)
- [x] `skills.json` - Skills with 6-tier proficiency levels
- [x] `experience.json` - Work history with descriptions
- [x] `education.json` - Degrees and certifications
- [x] `contact.json` - Contact information
- [x] `preferences.json` - Work preferences, coding style

### Project Tracking
- [x] `projects/active.json` - Current projects
- [x] `projects/planned.json` - Future projects
- [x] `projects/completed.json` - Shipped projects
- [x] Project schema with required fields (name, repo_url, type, description, technologies, monetization_strategy, status, problem, solution, target_audience, mission_statement)

### AI Commands (Claude Code)
- [x] `/generate-resume` - Generate tailored resume from job description
- [x] `/assessment` - Generate periodic self-assessment
- [x] `/generate-post` - Generate LinkedIn posts
- [x] `/log-application` - Log job applications
- [x] `/prep-interview` - Interview preparation
- [x] `/update-project` - Update project status
- [x] `/quick-check` - Quick status check

### Documentation
- [x] README.md with overview
- [x] CLAUDE.md with AI instructions
- [ ] Setup guide (step-by-step for new users)
- [ ] Schema documentation (field definitions, examples)
- [ ] Customization guide (how to adapt for personal use)
- [ ] FAQ

### Basic Automation (GitHub Actions)
- [x] Daily date update (CONTEXT.md stays current)
- [x] Context snapshot (daily repo state capture)
- [x] Weekly summary generation
- [x] LinkedIn post generator
- [x] Job posting monitor
- [x] Monthly assessment
- [x] Project status updates
- [x] Skill analysis from GitHub activity
- [x] GitHub activity logging

---

## Phase 2: Local Dashboard (Current Focus)

The local dashboard runs via `npm run dev` and works offline. This ships with the template.

### Completed
- [x] Next.js 15 App Router setup
- [x] TanStack Query integration
- [x] Sidebar navigation
- [x] Home page with dashboard cards
- [x] Profile page with skills visualization
- [x] SkillsGrid component with filtering
- [x] ProfileCard component
- [x] API routes for all data sources:
  - [x] `/api/profile` - Profile data
  - [x] `/api/projects` - Project tracking
  - [x] `/api/automations` - Workflow runs + schedules
  - [x] `/api/jobs` - Job applications
  - [x] `/api/content` - LinkedIn drafts

### Remaining (Local Dashboard)
- [ ] Projects page (table with filters, detail panel)
- [ ] Automations page (pipeline list, run history)
- [ ] Content page (week selector, post drafts with copy)
- [ ] Jobs page (application funnel, opportunities table)
- [ ] Dark/light mode toggle
- [ ] Mobile responsive layout

---

## Phase 3: Hosted Dashboard (April 2026)

The hosted dashboard is a subscription service at `professional-os.app`.

### Infrastructure
- [ ] Supabase setup (users, repos, subscription_tier)
- [ ] GitHub OAuth integration
- [ ] Vercel deployment
- [ ] Lemon Squeezy subscription webhooks

### API Conversion
- [ ] GitHub API service for repo data fetching
- [ ] Environment-based data source switching
- [ ] Rate limiting and caching layer
- [ ] Fallback to cached data

### User Features
- [ ] Sign in with GitHub flow
- [ ] Repository selection and validation
- [ ] Plan selection (Free, Pro, Automation Pro)
- [ ] Settings page (repo, subscription, subdomain, notifications)
- [ ] Custom subdomain (yourname.professional-os.app)

### Feature Gates
- [ ] Free tier limitations (public repos, 7-day history, branded)
- [ ] Pro tier unlocks (private repos, full features, custom subdomain)
- [ ] Upgrade prompts throughout dashboard

---

## Phase 4: Automation Pro (July 2026)

These features justify the $19/mo Automation Pro subscription.

### Auto-Apply System
- [ ] Auto-apply rules engine (salary, location, keywords)
- [ ] Auto-apply queue UI with approve/skip
- [ ] Application tracking integration
- [ ] Success analytics dashboard

### Notifications
- [ ] Daily opportunity digest emails
- [ ] New job match alerts
- [ ] Auto-apply confirmation emails

### Advanced Analytics
- [ ] Auto-apply success rate tracking
- [ ] Response rate trends
- [ ] Interview conversion metrics

---

## What We Explicitly EXCLUDE from MVP

### Deferred to Dashboard Phase
- Hosted dashboard (local only in MVP)
- GitHub integration for data fetching
- User accounts and authentication

### Keep as Subscription Features
- Auto-apply to jobs
- Daily digest emails
- Application analytics

### Nice but Not Essential
- Portfolio site generation
- GitHub profile sync
- Certification announcement flow
- LinkedIn metrics browser extension
- Mobile app

---

## MVP Validation Criteria

The MVP is successful if:

1. **People Pay:** At least 25 sales in first month
2. **People Use:** At least 10 customers generate a resume or use commands
3. **People Like:** At least 5 unsolicited positive testimonials
4. **Refunds Low:** Less than 10% refund rate
5. **Can Improve:** Clear feedback on what to add next
6. **Dashboard Interest:** At least 20% express interest in hosted dashboard

---

## MVP Technical Requirements

### Repository
- Public template on GitHub
- Can be forked/cloned easily
- No server dependencies
- Works offline

### File Formats
- JSON for structured data (AI-readable)
- Markdown for documentation (human-readable)
- YAML for GitHub Actions (automation)

### AI Tool Support
- Claude Code (primary)
- Works with Cursor, Copilot, Windsurf
- Gemini CLI compatible

### Automation
- GitHub Actions only (no external services)
- All scripts in Node.js (no additional runtime)
- Graceful failure (never breaks the repo)

### Dashboard (Local Only for MVP)
- Next.js 15 with App Router
- TanStack Query for data fetching
- Tailwind CSS for styling
- Reads from local JSON files
- No authentication required locally

---

## Pre-Launch Checklist

### Content Preparation
- [ ] Sanitize current repo (remove personal data references)
- [ ] Create example/placeholder data for template
- [ ] Write setup documentation
- [ ] Create schema documentation
- [ ] Record demo video
- [ ] Prepare launch content (LinkedIn posts, tweets)

### Technical Validation
- [x] Test `/generate-resume` command
- [x] Test `/assessment` command
- [x] Test all automation workflows
- [ ] Test fresh clone setup process
- [ ] Verify dashboard works with placeholder data

### Launch Infrastructure
- [ ] Create landing page
- [ ] Set up payment (Lemon Squeezy)
- [ ] Build email list (lead magnet)
- [ ] Set up analytics (Plausible/Fathom)

---

## Launch Week Timeline (January 2026)

### Week 1 (Jan 6-12): Polish
- [ ] Complete remaining local dashboard pages
- [ ] Finalize documentation
- [ ] Create template version with placeholder data
- [ ] Record setup walkthrough video

### Week 2 (Jan 13-19): Launch Prep
- [ ] Landing page live
- [ ] Payment integration complete
- [ ] Email sequence ready
- [ ] Social content scheduled

### Week 3 (Jan 20-26): Soft Launch
- [ ] Soft launch to email list
- [ ] Collect initial feedback
- [ ] Fix critical issues
- [ ] Gather testimonials

### Week 4 (Jan 27-31): Public Launch
- [ ] Public launch announcement
- [ ] Launch content blitz
- [ ] Monitor and respond
- [ ] Celebrate first sales

---

## Dashboard Phase Checklist (April 2026)

### Week 1: Infrastructure
- [ ] Set up Supabase project
- [ ] Configure GitHub OAuth
- [ ] Create user schema
- [ ] Set up Vercel project

### Week 2: API Conversion
- [ ] Create GitHub API service
- [ ] Convert dashboard routes to use GitHub API
- [ ] Add environment-based data source
- [ ] Implement caching layer

### Week 3: User Features
- [ ] User registration/login flow
- [ ] Repo connection flow
- [ ] Subscription tier logic
- [ ] Custom subdomain setup

### Week 4: Launch
- [ ] Beta test with early template buyers
- [ ] Set up Lemon Squeezy subscriptions
- [ ] Soft launch dashboard
- [ ] Monitor and iterate

---

## Remaining Work Summary

### High Priority (Before MVP Launch)
1. Complete local dashboard pages (Projects, Automations, Content, Jobs)
2. Write setup documentation for new users
3. Create template version with placeholder data
4. Build landing page and payment integration

### Medium Priority (Nice to Have for Launch)
1. Schema documentation with examples
2. Customization guide
3. FAQ document
4. Demo video

### Post-Launch (Phase 2+)
1. Hosted dashboard infrastructure
2. Subscription system
3. Auto-apply features
