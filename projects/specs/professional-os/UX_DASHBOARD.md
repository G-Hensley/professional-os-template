# Professional OS Dashboard UX

Opinionated UX plan for the hosted dashboard that sits on top of any Professional OS repository.

---

## Architecture

### Local Mode (Template Buyers)
- Dashboard runs locally via `npm run dev`
- Reads JSON files directly from the repo
- No authentication required
- Works offline

### Hosted Mode (Subscription)
- Dashboard hosted on Vercel at `professional-os.app`
- Connects to user's GitHub repo via OAuth
- Reads data via GitHub API
- User accounts stored in Supabase

```
┌─────────────┐     OAuth      ┌─────────────┐
│   GitHub    │ ◄────────────► │   User      │
│   Repo      │                │   Browser   │
└─────┬───────┘                └──────┬──────┘
      │                               │
      │ API                           │
      ▼                               ▼
┌─────────────┐                ┌─────────────┐
│   GitHub    │                │   Hosted    │
│   API       │ ◄────────────► │   Dashboard │
└─────────────┘                │  (Vercel)   │
                               └──────┬──────┘
                                      │
                               ┌──────┴──────┐
                               │  Supabase   │
                               │  (users,    │
                               │   prefs,    │
                               │   tier)     │
                               └─────────────┘
```

---

## Subscription Tiers

### Free Tier ($0/mo)
- Public repos only
- Read-only dashboard access
- Basic profile and project views
- 7-day data history
- Codaissance branding

### Dashboard Pro ($12/mo)
- Private repo connection
- Full dashboard with all views
- Job search tracking and analytics
- Automation run history
- Custom subdomain (yourname.professional-os.app)
- No Codaissance branding

### Automation Pro ($19/mo)
Everything in Dashboard Pro, plus:
- Auto-apply to jobs (configurable rules)
- Application response monitoring
- Daily opportunity digest emails
- Smart job matching
- Cover letter generation
- Priority application queue

### Bundle ($24/mo)
All features, 20% savings

---

## Core Views

### Home / Ops Overview
- Profile snippet with skills summary
- Active/planned project counts
- Latest automation runs (context snapshot, weekly summary, job monitor)
- Job search status (applications, interviews)
- "Last updated" badges on all panels

### Projects
- Table/cards with status, priority, stale flag
- Last commit date, "next action" chips
- Filters by status/priority
- Quick links to repos

### Automations
- Timeline of workflow runs with success/fail
- Links to generated artifacts (MD/JSON)
- Dry-run/live rerun buttons (guarded)
- **Pro feature:** Run automations from dashboard

### Content (LinkedIn)
- Weekly drafts list with copy buttons
- Hashtags and image prompts
- Week navigation
- Post scheduling status

### Job Search
- Latest opportunities (score, salary, source, apply link)
- "To apply" checklist
- Application tracking (submitted, response, interview)
- **Automation Pro:** Auto-apply queue, success analytics

### Profile/Skills
- Read-only summary
- "Edit in repo" links
- Decay warnings/suggestions
- Skill distribution charts

### Settings (Hosted Only)
- Connected repo selection
- Subscription management
- Notification preferences
- Custom subdomain configuration

---

## Look & Feel

### Typography
One expressive family (Space Grotesk or Manrope). Avoid default system stacks.

### Color
Focused palette with:
- Dark background (charcoal/navy)
- Vibrant accent (teal/cyan)
- Status colors (green/yellow/red)
- CSS variables defined up front

### Layout
- Sidebar navigation
- Dense tables with chips/badges
- Cards only where they add clarity
- Split panels for detail views

### Motion
- Subtle entrance/stagger on data panels
- Crisp hover/focus states on filters/toggles
- Loading skeletons during data fetch

### Data Density
- Tables + chips over oversized cards
- Each panel shows "last updated"
- Collapsible sections for details

---

## Tech Stack

### Frontend
- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- TanStack Query for fetching/caching

### Charts
- Tremor or Recharts for quick, clean visuals

### Auth
- NextAuth.js with GitHub provider
- Or Supabase Auth with GitHub OAuth

### Database
- Supabase (PostgreSQL)
- Tables: users, repos, preferences, subscription_tier

### Payments
- Lemon Squeezy for subscriptions
- Webhooks for tier updates

### Hosting
- Vercel for dashboard
- GitHub Actions for repo automations (unchanged)

---

## Data Access Plan

### Local Mode
- Read JSON files directly from filesystem
- Use `repoPath()` utility for path resolution
- No API calls required

### Hosted Mode
- API routes use GitHub API to fetch repo contents
- Cache responses with TanStack Query (5-minute stale time)
- Rate limiting awareness (GitHub API limits)
- Fallback to cached data if API unavailable

### Environment Switching
```typescript
// Environment-based data source
const dataSource = process.env.NEXT_PUBLIC_DATA_SOURCE || 'local';

if (dataSource === 'github') {
  // Use GitHub API
  return fetchFromGitHub(repoPath, token);
} else {
  // Read local files
  return readLocalFile(repoPath);
}
```

---

## Navigation IA

### Sidebar
- Home
- Projects
- Automations
- Content
- Job Search
- Profile/Skills
- Settings (hosted only)

### Top Bar
- Date range selector (where relevant)
- "Run automation" dropdown (with guard rails)
- Search
- User menu (hosted only)

---

## Hosted-Only Features

### User Onboarding
1. "Sign in with GitHub"
2. "Select repository to connect"
3. "Choose your plan" (Free / Pro / Automation Pro)
4. "Welcome to your dashboard"

### Repo Connection Flow
1. OAuth grants read access to repos
2. User selects which repo to visualize
3. Dashboard validates repo has Professional OS structure
4. Sync starts, data appears in dashboard

### Subscription Management
- Current plan display
- Upgrade/downgrade buttons
- Billing history link (Lemon Squeezy portal)
- Cancel subscription option

### Custom Subdomain
- Pro users get `username.professional-os.app`
- Configured via dashboard settings
- DNS handled by Vercel

---

## Development Phases

### Phase 1: Local Dashboard (Current)
- [x] Sidebar navigation
- [x] Home page with cards
- [x] Profile page
- [ ] Projects page
- [ ] Automations page
- [ ] Content page
- [ ] Jobs page

### Phase 2: Hosted Infrastructure (April 2026)
- [ ] Supabase setup (users, repos, tiers)
- [ ] GitHub OAuth integration
- [ ] API routes using GitHub API
- [ ] Environment-based data source switching

### Phase 3: Subscription Features (April 2026)
- [ ] Lemon Squeezy integration
- [ ] Tier-based feature gates
- [ ] Custom subdomain support
- [ ] Free tier limitations

### Phase 4: Automation Pro (July 2026)
- [ ] Auto-apply rules engine
- [ ] Application tracking
- [ ] Daily digest emails
- [ ] Success analytics
