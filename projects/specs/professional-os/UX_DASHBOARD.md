# Professional OS Dashboard UX

Opinionated UX plan for the product UI that sits on top of this repo’s data and automations.

## Form Factor
- Web-first dashboard (Next.js/TypeScript). PWA friendly for mobile checks.
- Defer Electron unless you need local file access/tray/background jobs; browser-first ships faster.
- Data remains Git/JSON-backed; UI is a visualization and command surface.

## Core Views (MVP)
- **Home / Ops Overview:** Profile snippet, active/planned project counts, latest automations (context snapshot, weekly summary, job monitor, LinkedIn drafts), job search status; “last updated” badges on panels.
- **Projects:** Table/cards with status, priority, stale flag, last commit, “next action” chips; filters by status/priority.
- **Automations:** Timeline of runs with success/fail, links to generated artifacts (MD/JSON), dry-run/live rerun buttons (guarded).
- **Content (LinkedIn):** Weekly drafts list with copy buttons, hashtags, image prompts; week navigation.
- **Job Search:** Latest opportunities (score, salary, source, apply link); “to apply” checklist.
- **Profile/Skills:** Read-only summary plus “edit in repo” links; show decay warnings/suggestions.

## Look & Feel
- Typography: one expressive family (e.g., Space Grotesk/Manrope). Avoid default system stacks.
- Color: focused palette (light with a strong accent like teal/orange, or charcoal with vibrant accent). Define CSS variables up front.
- Layout: split panels; dense tables with chips/badges. Cards only where they add clarity.
- Motion: subtle entrance/stagger on data panels; crisp hover/focus states on filters/toggles.
- Data density: tables + chips over oversized cards; each panel shows “last updated”.

## Tech Stack
- Next.js (App Router) + TypeScript + Tailwind (or CSS modules) + TanStack Query for fetching/caching.
- Charts: Tremor or Recharts for quick, clean visuals.
- Deploy: Vercel for previews; GitHub Action keeps JSON artifacts fresh on schedule.

## Data Access Plan
- Short term: expose existing JSON/MD artifacts (logs/, projects/, job monitor, weekly summary) as static assets; fetch client-side.
- Medium term: minimal API routes in Next.js to read/cached data; add auth later if needed.

## Navigation IA
- Sidebar: Home, Projects, Automations, Content, Job Search, Profile/Skills, Settings.
- Top bar: date range (where relevant), “Run automation” dropdown (guard rails), search.

## Next Steps
1) Scaffold Next.js dashboard shell with sidebar/top bar and the views above.
2) Wire data fetching to current JSON/MD outputs (logs/context, weekly summary, job monitor, LinkedIn drafts).
3) Add “last updated” badges and safe rerun hooks for automations.
4) Iterate on visual polish (palette, type, motion) after data is live.
