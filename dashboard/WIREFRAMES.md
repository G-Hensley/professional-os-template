# Dashboard Wireframes

Visual layout guide for the Professional OS dashboard.

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          PROFESSIONAL OS DASHBOARD                          │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   LOCAL MODE (Template)              HOSTED MODE (Subscription)             │
│   ─────────────────────              ─────────────────────────              │
│   • npm run dev                      • professional-os.app                  │
│   • Reads local JSON                 • GitHub OAuth + API                   │
│   • No auth required                 • Supabase for users/tiers             │
│   • Works offline                    • Lemon Squeezy for billing            │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Subscription Tiers (Hosted Only)

| Tier | Price | Features |
|------|-------|----------|
| **Free** | $0/mo | Public repos, read-only, 7-day history, branded |
| **Dashboard Pro** | $12/mo | Private repos, full features, custom subdomain |
| **Automation Pro** | $19/mo | Auto-apply to jobs, tracking, daily digests |
| **Bundle** | $24/mo | Everything, 20% savings |

---

## Overall Shell Layout

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  TOPBAR                                                [Search] [User] [⚙]  │
├────────────┬─────────────────────────────────────────────────────────────────┤
│            │                                                                 │
│  SIDEBAR   │                        MAIN CONTENT                             │
│            │                                                                 │
│  ┌──────┐  │                                                                 │
│  │ Home │  │                                                                 │
│  ├──────┤  │                                                                 │
│  │Projts│  │                                                                 │
│  ├──────┤  │                                                                 │
│  │ Auto │  │                                                                 │
│  ├──────┤  │                                                                 │
│  │Contnt│  │                                                                 │
│  ├──────┤  │                                                                 │
│  │ Jobs │  │                                                                 │
│  ├──────┤  │                                                                 │
│  │Profle│  │                                                                 │
│  ├──────┤  │                                                                 │
│  │Settngs│ │  ← Hosted only                                                  │
│  └──────┘  │                                                                 │
│            │                                                                 │
│  ┌──────┐  │                                                                 │
│  │ PRO  │  │  ← Upgrade prompt (Free tier)                                   │
│  └──────┘  │                                                                 │
├────────────┴─────────────────────────────────────────────────────────────────┤
│  FOOTER: Last sync: 2025-12-22 • v1.0.0 • [Free/Pro/Automation Pro]         │
└──────────────────────────────────────────────────────────────────────────────┘
```

**Sidebar:** Fixed width (~240px), collapsible to icons on mobile. Dark or accent background.
**TopBar:** Sticky, contains breadcrumb/page title, search, user menu (hosted), settings dropdown.
**Main Content:** Scrollable, max-width container (~1400px) centered.

---

## 1. Home / Ops Overview

The command center. Quick glance at everything.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  Home                                                          Dec 22, 2025 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────┐  ┌─────────────────────────────────────┐   │
│  │  PROFILE CARD               │  │  QUICK STATS                        │   │
│  │  ┌────┐                     │  │                                     │   │
│  │  │ GH │  Gavin Hensley      │  │  Active Projects    3               │   │
│  │  └────┘  Product Engineer   │  │  Planned Projects   5               │   │
│  │          APIsec             │  │  Job Applications   12              │   │
│  │                             │  │  LinkedIn Drafts    4               │   │
│  └─────────────────────────────┘  └─────────────────────────────────────┘   │
│                                                                             │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │  RECENT AUTOMATIONS                                     View All →    │  │
│  │  ┌─────────────────────────────────────────────────────────────────┐  │  │
│  │  │ ✓ Context Snapshot          Today 6:00 AM         success       │  │  │
│  │  │ ✓ Weekly Summary            Dec 21                success       │  │  │
│  │  │ ✓ LinkedIn Posts Generated  Dec 21                success       │  │  │
│  │  │ ✓ Job Monitor               Dec 21                3 new jobs    │  │  │
│  │  └─────────────────────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
│  ┌────────────────────────────────┐  ┌────────────────────────────────┐    │
│  │  ACTIVE PROJECTS               │  │  JOB SEARCH STATUS             │    │
│  │                                │  │                                │    │
│  │  Dev Genesis      70% ████░░   │  │  To Apply: 5                   │    │
│  │  Vibiom MVP       Planning     │  │  Applied: 8                    │    │
│  │  MindTrace        Blocked      │  │  Interviewing: 2               │    │
│  │                                │  │                                │    │
│  │              View Projects →   │  │           View Jobs →          │    │
│  └────────────────────────────────┘  └────────────────────────────────┘    │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Components needed:**
- `ProfileCard` - Avatar, name, title, company
- `QuickStats` - Grid of stat cards with icons
- `RecentAutomations` - List with status badges
- `ActiveProjects` - Mini project list with progress
- `JobSearchStatus` - Application funnel summary

---

## 2. Projects View

Table-first with filters. Cards are optional toggle.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  Projects                                                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  [All] [Active] [Planned] [Completed]        Search: [___________]  │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  NAME            STATUS      PRIORITY   BLOCKED BY    NEXT ACTION   │    │
│  ├─────────────────────────────────────────────────────────────────────┤    │
│  │  Dev Genesis     ● Active    High       —             Ship MVP      │    │
│  │  Vibiom          ● Active    High       Dev Genesis   Design agents │    │
│  │  TemperedUI      ○ Planned   Medium     Vibiom        —             │    │
│  │  MindTrace       ○ Planned   Medium     Vibiom        —             │    │
│  │  DevGauntlet     ○ Planned   Low        —             Spec out      │    │
│  │  ScopeCreep      ○ Planned   Low        Vibiom        —             │    │
│  │  InstAPI         ○ Planned   Low        Vibiom        —             │    │
│  │  OpenOrbit       ○ Planned   Low        —             Research      │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
│  Showing 8 of 8 projects                                                    │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Click a row → Slide-out panel or modal with full details:**

```
┌──────────────────────────────────────────┐
│  Dev Genesis                          ✕  │
├──────────────────────────────────────────┤
│                                          │
│  Status: Active                          │
│  Priority: High                          │
│  Type: SaaS                              │
│  Progress: ~70%                          │
│                                          │
│  PROBLEM                                 │
│  Developers waste hours on boilerplate   │
│  and project setup...                    │
│                                          │
│  SOLUTION                                │
│  AI-powered scaffolding that generates   │
│  production-ready project structures...  │
│                                          │
│  TECH STACK                              │
│  [React] [TypeScript] [Node.js] [AI]     │
│                                          │
│  ─────────────────────────────────────   │
│  [Open in GitHub]  [Edit in Repo]        │
│                                          │
└──────────────────────────────────────────┘
```

---

## 3. Automations View

Timeline of automation runs with artifact links.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  Automations                                                                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  AUTOMATION PIPELINES                                               │    │
│  │                                                                     │    │
│  │  ┌─────────────────────────────────────────────────────────────┐    │    │
│  │  │  Daily Context Snapshot                                     │    │    │
│  │  │  Runs: Daily @ 6:00 AM                    Last: ✓ Today     │    │    │
│  │  │  [View Latest] [View History]                               │    │    │
│  │  └─────────────────────────────────────────────────────────────┘    │    │
│  │                                                                     │    │
│  │  ┌─────────────────────────────────────────────────────────────┐    │    │
│  │  │  Weekly Summary                                             │    │    │
│  │  │  Runs: Sundays @ 8:00 PM                  Last: ✓ Dec 21    │    │    │
│  │  │  [View Latest] [View History]                               │    │    │
│  │  └─────────────────────────────────────────────────────────────┘    │    │
│  │                                                                     │    │
│  │  ┌─────────────────────────────────────────────────────────────┐    │    │
│  │  │  LinkedIn Post Generator                                    │    │    │
│  │  │  Runs: Sundays @ 9:00 PM                  Last: ✓ Dec 21    │    │    │
│  │  │  [View Latest] [View History]                               │    │    │
│  │  └─────────────────────────────────────────────────────────────┘    │    │
│  │                                                                     │    │
│  │  ┌─────────────────────────────────────────────────────────────┐    │    │
│  │  │  Job Posting Monitor                                        │    │    │
│  │  │  Runs: Daily @ 9:00 AM                    Last: ✓ Today     │    │    │
│  │  │  [View Latest] [View History]                               │    │    │
│  │  └─────────────────────────────────────────────────────────────┘    │    │
│  │                                                                     │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  RECENT RUNS                                                        │    │
│  │                                                                     │    │
│  │  Dec 22  06:00  Context Snapshot      ✓ success   [View Log]        │    │
│  │  Dec 22  09:00  Job Monitor           ✓ 3 jobs    [View Jobs]       │    │
│  │  Dec 21  20:00  Weekly Summary        ✓ success   [View Summary]    │    │
│  │  Dec 21  21:00  LinkedIn Generator    ✓ 4 posts   [View Posts]      │    │
│  │  Dec 21  06:00  Context Snapshot      ✓ success   [View Log]        │    │
│  │                                                                     │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  🔒 RUN AUTOMATIONS (Pro)                                           │    │
│  │                                                                     │    │
│  │  Trigger automations directly from the dashboard.                   │    │
│  │  [Upgrade to Pro →]                                                 │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 4. Content (LinkedIn) View

Weekly drafts with easy copy actions.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  Content                                              ← Week → Dec 16-22    │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  LINKEDIN DRAFTS FOR THIS WEEK                                      │    │
│  │                                                                     │    │
│  │  ┌─────────────────────────────────────────────────────────────┐    │    │
│  │  │  Monday - Technical Deep Dive                               │    │    │
│  │  │  ───────────────────────────────────────────────────────    │    │    │
│  │  │  "Just shipped a feature that reduced our API response      │    │    │
│  │  │  time by 40%. Here's the approach I took..."                │    │    │
│  │  │                                                             │    │    │
│  │  │  Hashtags: #webdev #react #performance                      │    │    │
│  │  │  Image: Abstract visualization of speed optimization        │    │    │
│  │  │                                                             │    │    │
│  │  │  [Copy Text] [Copy Hashtags] [Generate Image]               │    │    │
│  │  └─────────────────────────────────────────────────────────────┘    │    │
│  │                                                                     │    │
│  │  ┌─────────────────────────────────────────────────────────────┐    │    │
│  │  │  Wednesday - Career/Growth                                  │    │    │
│  │  │  ───────────────────────────────────────────────────────    │    │    │
│  │  │  "The best career advice I got this year: Stop waiting      │    │    │
│  │  │  for permission to build things..."                         │    │    │
│  │  │                                                             │    │    │
│  │  │  Hashtags: #career #growth #tech                            │    │    │
│  │  │                                                             │    │    │
│  │  │  [Copy Text] [Copy Hashtags] [Generate Image]               │    │    │
│  │  └─────────────────────────────────────────────────────────────┘    │    │
│  │                                                                     │    │
│  │  ┌─────────────────────────────────────────────────────────────┐    │    │
│  │  │  Friday - Wins/Milestones                                   │    │    │
│  │  │  ───────────────────────────────────────────────────────    │    │    │
│  │  │  "This week's wins: ✓ Shipped new feature ✓ Fixed 3 bugs    │    │    │
│  │  │  ✓ Started planning next quarter's roadmap..."              │    │    │
│  │  │                                                             │    │    │
│  │  │  [Copy Text] [Copy Hashtags] [Generate Image]               │    │    │
│  │  └─────────────────────────────────────────────────────────────┘    │    │
│  │                                                                     │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 5. Job Search View

Job opportunities from monitor + application tracking.

### Standard View (All Users)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  Job Search                                                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌──────────────────────┐  ┌──────────────────────┐  ┌──────────────────┐   │
│  │  TO APPLY            │  │  APPLIED             │  │  INTERVIEWING    │   │
│  │       5              │  │       8              │  │       2          │   │
│  └──────────────────────┘  └──────────────────────┘  └──────────────────┘   │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  NEW OPPORTUNITIES (from Job Monitor)                    View All   │    │
│  │                                                                     │    │
│  │  COMPANY          ROLE                    SALARY      SCORE  ACTION │    │
│  │  ─────────────────────────────────────────────────────────────────  │    │
│  │  Acme Corp        Senior React Dev        $150k+      92     [→]    │    │
│  │  TechStartup      Full Stack Engineer     $130-160k   88     [→]    │    │
│  │  BigCo            Product Engineer        $140k       85     [→]    │    │
│  │                                                                     │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  MY APPLICATIONS                                                    │    │
│  │                                                                     │    │
│  │  COMPANY          ROLE               STATUS         APPLIED         │    │
│  │  ─────────────────────────────────────────────────────────────────  │    │
│  │  Company A        Senior Engineer    Interviewing   Dec 15          │    │
│  │  Company B        Staff Engineer     Applied        Dec 18          │    │
│  │  Company C        Product Engineer   Applied        Dec 20          │    │
│  │                                                                     │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Automation Pro View (Additional Features)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  Job Search                                              [Automation Pro]   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  AUTO-APPLY QUEUE                                    [Settings ⚙]   │    │
│  │                                                                     │    │
│  │  ┌─────────────────────────────────────────────────────────────┐    │    │
│  │  │  AUTO-APPLY RULES                                           │    │    │
│  │  │  ✓ Salary > $120k                                           │    │    │
│  │  │  ✓ Remote positions only                                    │    │    │
│  │  │  ✓ Match score > 80                                         │    │    │
│  │  │  ✓ Exclude: "Senior Staff", "Principal"                     │    │    │
│  │  │  [Edit Rules]                                               │    │    │
│  │  └─────────────────────────────────────────────────────────────┘    │    │
│  │                                                                     │    │
│  │  PENDING AUTO-APPLICATIONS                                          │    │
│  │  ─────────────────────────────────────────────────────────────────  │    │
│  │  🔄 TechCorp - Senior Dev          Score: 94    [Apply Now] [Skip]  │    │
│  │  🔄 StartupXYZ - Full Stack        Score: 91    [Apply Now] [Skip]  │    │
│  │  🔄 BigTech - Product Eng          Score: 88    [Apply Now] [Skip]  │    │
│  │                                                                     │    │
│  │  [Apply All (3)] [Pause Auto-Apply]                                 │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  AUTO-APPLY ANALYTICS                                  This Month   │    │
│  │                                                                     │    │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐               │    │
│  │  │  AUTO-APPLIED │  │  RESPONSES   │  │  INTERVIEWS  │               │    │
│  │  │      42       │  │      8       │  │      3       │               │    │
│  │  │              │  │    19%       │  │    7%        │               │    │
│  │  └──────────────┘  └──────────────┘  └──────────────┘               │    │
│  │                                                                     │    │
│  │  Success rate trending ↑ 12% from last month                        │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 6. Profile / Skills View

Read-only display of profile data with skill levels.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  Profile                                                      [Edit in Repo]│
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  ┌────────┐                                                         │    │
│  │  │        │   Gavin Hensley                                         │    │
│  │  │   GH   │   Product Engineer / Customer Success Engineer          │    │
│  │  │        │   APIsec                                                │    │
│  │  └────────┘                                                         │    │
│  │                                                                     │    │
│  │  📍 Portsmouth, OH (Remote)                                         │    │
│  │  📧 gavin@example.com                                               │    │
│  │  🔗 linkedin.com/in/gavinhensley                                    │    │
│  │  🐙 github.com/gavinhensley                                         │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  SKILLS                                         [All] [Gaps] [Top]  │    │
│  │                                                                     │    │
│  │  FRONTEND                                                           │    │
│  │  React          ████████████████████░░░░  Expert                    │    │
│  │  TypeScript     ████████████████░░░░░░░░  Adept                     │    │
│  │  Next.js        ████████████████░░░░░░░░  Adept                     │    │
│  │  Tailwind CSS   ████████████████████░░░░  Expert                    │    │
│  │                                                                     │    │
│  │  BACKEND                                                            │    │
│  │  Node.js        ████████████████░░░░░░░░  Adept                     │    │
│  │  PostgreSQL     ████████████░░░░░░░░░░░░  Apprentice               │    │
│  │  Supabase       ████████████░░░░░░░░░░░░  Apprentice               │    │
│  │                                                                     │    │
│  │  TOOLS                                                              │    │
│  │  Git            ████████████████████░░░░  Expert                    │    │
│  │  VS Code        ████████████████████████  Master                    │    │
│  │                                                                     │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 7. Settings View (Hosted Only)

Account, subscription, and preferences management.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  Settings                                                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  CONNECTED REPOSITORY                                               │    │
│  │                                                                     │    │
│  │  ┌────────────────────────────────────────────────────────────┐     │    │
│  │  │  🔗 github.com/gavinhensley/professional-os                │     │    │
│  │  │     Private • Last synced: 2 minutes ago                   │     │    │
│  │  │     [Sync Now] [Change Repository]                         │     │    │
│  │  └────────────────────────────────────────────────────────────┘     │    │
│  │                                                                     │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  SUBSCRIPTION                                                       │    │
│  │                                                                     │    │
│  │  Current Plan: Dashboard Pro ($12/month)                            │    │
│  │  Next billing: January 22, 2026                                     │    │
│  │                                                                     │    │
│  │  ┌─────────────────────────────────────────────────────────────┐    │    │
│  │  │  🚀 UPGRADE TO AUTOMATION PRO                               │    │    │
│  │  │                                                             │    │    │
│  │  │  Get auto-apply to jobs, daily digests, and more            │    │    │
│  │  │  $19/month (or $24/month for Bundle)                        │    │    │
│  │  │                                                             │    │    │
│  │  │  [Upgrade Now]                                              │    │    │
│  │  └─────────────────────────────────────────────────────────────┘    │    │
│  │                                                                     │    │
│  │  [View Billing History] [Cancel Subscription]                       │    │
│  │                                                                     │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  CUSTOM SUBDOMAIN (Pro)                                             │    │
│  │                                                                     │    │
│  │  Your dashboard URL:                                                │    │
│  │  ┌────────────────────────────────────────────────────────────┐     │    │
│  │  │  gavinhensley.professional-os.app                          │     │    │
│  │  └────────────────────────────────────────────────────────────┘     │    │
│  │  [Change Subdomain]                                                 │    │
│  │                                                                     │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  NOTIFICATIONS                                                      │    │
│  │                                                                     │    │
│  │  ☑ Daily job digest email                   (Automation Pro)        │    │
│  │  ☑ Weekly summary email                                             │    │
│  │  ☐ New job match alerts                     (Automation Pro)        │    │
│  │  ☑ Auto-apply confirmations                 (Automation Pro)        │    │
│  │                                                                     │    │
│  │  [Save Preferences]                                                 │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  ACCOUNT                                                            │    │
│  │                                                                     │    │
│  │  Signed in as: gavin@example.com (via GitHub)                       │    │
│  │                                                                     │    │
│  │  [Sign Out] [Delete Account]                                        │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 8. Onboarding Flow (Hosted Only)

New user signup experience.

```
STEP 1: Sign In
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│                          PROFESSIONAL OS                                    │
│                                                                             │
│              Your professional identity, version-controlled.                │
│                                                                             │
│                    ┌─────────────────────────┐                              │
│                    │  🐙 Sign in with GitHub │                              │
│                    └─────────────────────────┘                              │
│                                                                             │
│              Already have the template? This connects your                  │
│              existing repo to the hosted dashboard.                         │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘

STEP 2: Select Repository
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│                     Select your Professional OS repository                  │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  YOUR REPOSITORIES                                                  │    │
│  │                                                                     │    │
│  │  ○ gavinhensley/professional-os         ✓ Valid structure           │    │
│  │  ○ gavinhensley/my-career-data          ✓ Valid structure           │    │
│  │  ○ gavinhensley/dotfiles                ✗ Not Professional OS       │    │
│  │                                                                     │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
│  Don't have a repo yet? [Get the template →]                                │
│                                                                             │
│                              [Continue]                                     │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘

STEP 3: Choose Plan
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│                          Choose your plan                                   │
│                                                                             │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐             │
│  │      FREE       │  │  DASHBOARD PRO  │  │ AUTOMATION PRO  │             │
│  │     $0/mo       │  │    $12/mo       │  │    $19/mo       │             │
│  ├─────────────────┤  ├─────────────────┤  ├─────────────────┤             │
│  │ • Public repos  │  │ • Private repos │  │ • Everything in │             │
│  │ • Read-only     │  │ • Full features │  │   Dashboard Pro │             │
│  │ • 7-day history │  │ • Custom domain │  │ • Auto-apply    │             │
│  │ • Branded       │  │ • No branding   │  │ • Daily digests │             │
│  │                 │  │                 │  │ • Analytics     │             │
│  ├─────────────────┤  ├─────────────────┤  ├─────────────────┤             │
│  │   [Start Free]  │  │ [Choose Pro]    │  │ [Choose Auto]   │             │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘             │
│                                                                             │
│                   Or get everything: Bundle $24/mo (save 20%)               │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘

STEP 4: Welcome
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│                    🎉 Welcome to Professional OS!                           │
│                                                                             │
│              Your dashboard is syncing with your repository...              │
│                                                                             │
│                          ████████████░░░░ 75%                               │
│                                                                             │
│              • Reading profile data...  ✓                                   │
│              • Loading projects...      ✓                                   │
│              • Syncing automations...   ✓                                   │
│              • Fetching job data...     ⏳                                  │
│                                                                             │
│                         [Go to Dashboard]                                   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Color Palette Suggestion

Based on the Codaissance brand, keeping it professional but distinct:

```
Primary:      #0EA5E9  (Sky blue - action buttons, links)
Accent:       #F97316  (Orange - highlights, badges)
Success:      #22C55E  (Green - success states)
Warning:      #EAB308  (Yellow - warnings)
Error:        #EF4444  (Red - errors)

Background:   #0F172A  (Slate 900 - dark mode bg)
Surface:      #1E293B  (Slate 800 - cards, panels)
Border:       #334155  (Slate 700 - dividers)
Text:         #F8FAFC  (Slate 50 - primary text)
Text Muted:   #94A3B8  (Slate 400 - secondary text)

Light mode alternative:
Background:   #F8FAFC
Surface:      #FFFFFF
Border:       #E2E8F0
Text:         #0F172A
Text Muted:   #64748B

Pro badge:    #8B5CF6  (Violet - pro features)
Auto badge:   #EC4899  (Pink - automation pro)
```

---

## Component Checklist

### Layout
- [x] `Sidebar` - Navigation with icons + labels
- [x] `TopBar` - Page title, search, settings
- [x] `Shell` - Combines sidebar + topbar + main content area
- [ ] `UserMenu` - Avatar dropdown (hosted only)
- [ ] `UpgradePrompt` - Sidebar upgrade CTA (free tier)

### UI Primitives
- [ ] `Button` - Primary, secondary, ghost variants
- [ ] `Badge` - Status badges (success, warning, pro, automation)
- [ ] `Card` - Container with optional header
- [ ] `Table` - Sortable, filterable data table
- [x] `ProgressBar` - Skill levels, project progress (SkillBar)
- [ ] `Chip` - Tags for tech stack, filters
- [ ] `FeatureGate` - Shows upgrade prompt for locked features

### Dashboard
- [x] `ProfileCard` - Mini profile display
- [x] `QuickStats` - Grid of stat cards
- [x] `RecentAutomations` - List with status
- [x] `ActiveProjectsMini` - Condensed project list

### Projects
- [x] `ProjectsTable` - Full project listing
- [x] `ProjectFilters` - Status/priority filters
- [x] `ProjectDetailPanel` - Slide-out details
- [x] `ProjectRow` - Table row component
- [x] `ProjectsTableSkeleton` - Loading skeleton

### Automations
- [x] `AutomationCard` - Pipeline info + last run
- [x] `AutomationPipelines` - Container for pipeline cards
- [x] `RunHistory` - Timeline of runs
- [x] `RunHistoryRow` - Individual run row
- [x] `RunHistorySkeleton` - Loading skeleton
- [ ] `ArtifactViewer` - View generated files
- [ ] `RunAutomationButton` - Pro feature

### Content
- [ ] `WeekSelector` - Navigate weeks
- [ ] `PostDraft` - Single post with copy actions
- [ ] `PostList` - Week's posts

### Jobs
- [ ] `JobStats` - Application funnel
- [ ] `OpportunitiesTable` - New jobs from monitor
- [ ] `ApplicationsTable` - Tracked applications
- [ ] `AutoApplyQueue` - Automation Pro feature
- [ ] `AutoApplyRules` - Rule configuration
- [ ] `AutoApplyAnalytics` - Success metrics

### Profile
- [x] `ProfileHeader` - Full profile display
- [x] `SkillsGrid` - Categorized skills with levels
- [x] `SkillBar` - Individual skill visualization

### Settings (Hosted Only)
- [ ] `RepoConnection` - Connected repo management
- [ ] `SubscriptionCard` - Current plan + upgrade
- [ ] `SubdomainConfig` - Custom subdomain setup
- [ ] `NotificationPrefs` - Email preferences
- [ ] `AccountSettings` - Sign out, delete account

### Onboarding (Hosted Only)
- [ ] `SignInScreen` - GitHub OAuth button
- [ ] `RepoSelector` - Pick repository
- [ ] `PlanSelector` - Choose subscription tier
- [ ] `WelcomeScreen` - Sync progress + redirect

---

## Feature Gates by Tier

| Feature | Free | Dashboard Pro | Automation Pro |
|---------|------|---------------|----------------|
| Public repo access | ✓ | ✓ | ✓ |
| Private repo access | ✗ | ✓ | ✓ |
| Full dashboard views | Read-only | ✓ | ✓ |
| 7-day history | ✓ | ✗ | ✗ |
| Unlimited history | ✗ | ✓ | ✓ |
| Custom subdomain | ✗ | ✓ | ✓ |
| Run automations | ✗ | ✓ | ✓ |
| Auto-apply to jobs | ✗ | ✗ | ✓ |
| Daily job digest | ✗ | ✗ | ✓ |
| Auto-apply analytics | ✗ | ✗ | ✓ |
| Codaissance branding | ✓ | ✗ | ✗ |

---

## Development Phases

### Phase 1: Local Dashboard (Current)
- [x] Sidebar navigation
- [x] Home page with cards
- [x] Profile page with skills
- [x] Projects page
- [x] Automations page
- [ ] Content page
- [ ] Jobs page

### Phase 2: Hosted Infrastructure (April 2026)
- [ ] Supabase setup (users, repos, tiers)
- [ ] GitHub OAuth integration
- [ ] API routes using GitHub API
- [ ] Environment-based data source switching
- [ ] Onboarding flow
- [ ] Settings page

### Phase 3: Subscription Features (April 2026)
- [ ] Lemon Squeezy integration
- [ ] Tier-based feature gates
- [ ] Custom subdomain support
- [ ] Free tier limitations
- [ ] Upgrade prompts

### Phase 4: Automation Pro (July 2026)
- [ ] Auto-apply rules engine
- [ ] Auto-apply queue UI
- [ ] Application tracking
- [ ] Daily digest emails
- [ ] Success analytics
