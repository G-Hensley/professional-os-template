# MVP Specification

## Definition of MVP

The Minimum Viable Product is what we need to ship by January 31, 2026 to validate the market and generate first revenue. It must solve the core problem well enough that people will pay for it.

---

## MVP Scope (Must Have for Launch)

### Repository Structure
- [ ] Clean, well-organized folder structure
- [ ] Clear README with setup instructions
- [ ] CONTEXT.md explaining the system
- [ ] CLAUDE.md for AI tool configuration

### Profile Data (JSON Schemas)
- [ ] `skills.json` - Skills with proficiency levels
- [ ] `experience.json` - Work history with descriptions
- [ ] `education.json` - Degrees and certifications
- [ ] `contact.json` - Contact information
- [ ] `preferences.json` - Work preferences, coding style

### Project Tracking
- [ ] `projects/active.json` - Current projects
- [ ] `projects/planned.json` - Future projects
- [ ] `projects/completed.json` - Shipped projects
- [ ] Basic schema with required fields

### AI Commands (Claude Code)
- [ ] `/generate-resume` - Generate tailored resume from job description
- [ ] `/assessment` - Generate periodic self-assessment

### Documentation
- [ ] Setup guide (step-by-step)
- [ ] Schema documentation
- [ ] Customization guide
- [ ] FAQ

### Basic Automation
- [ ] Daily date update (CONTEXT.md stays current)
- [ ] Context snapshot (optional but nice)

---

## Phase 2: Dashboard (April 2026)

The hosted dashboard is a key differentiator that enables recurring revenue. This is planned for post-MVP launch.

### Local Dashboard (Template Buyers Get This)
- [ ] Next.js App Router dashboard
- [ ] Profile visualization
- [ ] Project status cards
- [ ] Job search tracking UI
- [ ] Automation run history
- [ ] Works offline via local JSON reads

### Hosted Dashboard (Subscription Service)
- [ ] GitHub OAuth authentication
- [ ] Connect any Professional OS repo
- [ ] Real-time data via GitHub API
- [ ] User accounts in Supabase
- [ ] Tiered access (Free, Pro, Automation Pro)
- [ ] Custom subdomains (yourname.professional-os.app)

### Dashboard Technical Requirements
- [ ] Swap file reads for GitHub API calls
- [ ] Environment-based data source switching
- [ ] Rate limiting and caching for GitHub API
- [ ] User preference storage in Supabase

---

## Phase 3: Advanced Automation (July 2026)

These features justify the Automation Pro subscription tier.

### Job Search Automation
- [ ] Automated job posting monitor
- [ ] Auto-apply to matching jobs (configurable rules)
- [ ] Application response tracking
- [ ] Interview calendar triggers
- [ ] Daily opportunity digest emails

### Content Automation
- [ ] LinkedIn post generation from activity
- [ ] Weekly summary auto-generation
- [ ] Skill analysis from GitHub activity

---

## What We Explicitly EXCLUDE from MVP

### Deferred to Dashboard Phase
- Hosted dashboard (local only in MVP)
- GitHub integration for data fetching
- User accounts and authentication

### Keep as Subscription Features
- Automated job posting monitoring
- Auto-apply to jobs
- Application response tracking
- Interview calendar triggers

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

## MVP Checklist

### Week 1 (Jan 6-12)
- [ ] Sanitize current repo (remove personal data, job automation)
- [ ] Write setup documentation
- [ ] Create schema documentation
- [ ] Test `/generate-resume` command

### Week 2 (Jan 13-19)
- [ ] Create landing page
- [ ] Set up payment (Lemon Squeezy)
- [ ] Build email list
- [ ] Prepare launch content

### Week 3 (Jan 20-26)
- [ ] Soft launch to email list
- [ ] Collect initial feedback
- [ ] Fix critical issues
- [ ] Prepare launch announcements

### Week 4 (Jan 27-31)
- [ ] Public launch
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
