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

## Post-MVP (After Launch Validation)

### Enhanced Automation
- [ ] Skill analysis from GitHub activity
- [ ] Project status detection
- [ ] Weekly summary generation

### Content Features
- [ ] LinkedIn post generation command
- [ ] Content strategy templates
- [ ] Content calendar structure

### Business Features
- [ ] Multi-business documentation structure
- [ ] Business strategy templates
- [ ] Financial tracking schemas

### Job Search Features
- [ ] Application tracking
- [ ] Interview prep command
- [ ] Interview notes structure

### Advanced AI Commands
- [ ] `/generate-post` - LinkedIn content from activity
- [ ] `/prep-interview` - Interview preparation
- [ ] `/quick-check` - Fast status check
- [ ] `/update-project` - Project status updates

---

## What We Explicitly EXCLUDE from MVP

### Too Complex for Launch
- Real-time sync with external platforms
- Web dashboard
- Mobile app
- Team features

### Keep as Competitive Moat
- Automated job posting monitoring
- Application response tracking
- Email integration
- Interview calendar triggers

### Nice but Not Essential
- Portfolio site generation
- GitHub profile sync
- Certification announcement flow
- LinkedIn metrics browser extension

---

## MVP Validation Criteria

The MVP is successful if:

1. **People Pay:** At least 25 sales in first month
2. **People Use:** At least 10 customers generate a resume or use commands
3. **People Like:** At least 5 unsolicited positive testimonials
4. **Refunds Low:** Less than 10% refund rate
5. **Can Improve:** Clear feedback on what to add next

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
