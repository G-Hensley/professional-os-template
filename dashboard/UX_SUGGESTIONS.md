# Dashboard UI/UX Direction

## North Star
- Keep the cyan + orange palette, but elevate it with stronger surface hierarchy, tighter typography, and deliberate motion.
- Use translucent surfaces over a layered gradient background to make the interface feel like a custom OS.

## Design Tokens (CSS)
- Use the CSS variables and utilities in `dashboard/app/globals.css` as the single source of truth for colors, surfaces, text, and glow.
- Apply `.surface-1` for primary containers, `.surface-2` for cards, and `.surface-3` for secondary panels.

## Layout System
- Use a consistent grid across pages. Avoid `w-fit` on cards; prefer `w-full` with max-widths for rhythm.
- Keep a strong vertical rhythm: 24px between sections, 16px within cards.

## Component Hierarchy
- Buttons: primary CTA uses orange accent + subtle glow. Secondary and ghost buttons are muted and minimal.
- Tables: use high-contrast headings and subtle row dividers. Add hover glows for scan-ability.
- Chips/badges: small, rounded, and mono text to communicate status quickly.

## Motion
- Prefer hover translate + glow over scaleX. Use short, confident motion (120–180ms) with slight easing.
- Add a gentle page-load fade and stagger for cards on landing.

## Typography
- Use Space Grotesk for body and headings, JetBrains Mono for code and labels.
- High contrast for headings (`.text-strong`) and muted copy for supporting text (`.text-muted`).

## Immediate Visual Fixes
- Swap the current `neumorphic` shadows for `.surface-*` classes so cards read as distinct layers.
- Add a clear active state in the sidebar using an accent rail and background.
- Bring button styles into a real component so filters and CTAs share a system.

## Suggested Next Steps
- Update core primitives: Card, Button, Badge, ProgressBar.
- Refresh the landing page first as a proof point, then roll the system across feature pages.
