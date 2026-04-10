# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
bun dev        # Start dev server with Turbopack
bun build      # Production build
bun lint       # ESLint via Next.js
```

There is no test suite configured.

## Architecture

This is a **Next.js 15 portfolio site** (App Router, React 19) for LXNA — a full stack developer and GoHighLevel Technical Specialist.

### Directory structure

- `src/app/` — App Router pages and root layout. `layout.tsx` registers all Google Fonts and wraps every page in `<Header>`.
- `src/layouts/` — Full-viewport page sections (`Header.tsx`, `Hero.tsx`). These are page-level blocks, not reusable components.
- `src/components/ui/` — UI primitives. `button.tsx` is shadcn/ui. `FluidText.tsx` is an SVG-based component that scales text to fill its container — prefer the `@container` + `cqw` CSS approach for new instances instead (see Hero.tsx for the pattern).
- `src/lib/utils.ts` — Exports `cn()` (`clsx` + `tailwind-merge`).
- `src/styles/globals.css` — All Tailwind v4 config and design tokens live here via `@theme inline`.
- `src/types/css.d.ts` — Declares `*.css` modules to suppress TypeScript side-effect import errors.
- `public/animations/` — Lottie JSON files (e.g. `Infinity.json`).

### Styling

Tailwind v4 — no `tailwind.config.js`. All tokens are in `src/styles/globals.css` under `@theme inline`.

Custom color palette (always use these classes, not hex values):
- `onyx` — `#100f10` (near-black)
- `silver` — `#bcbbbc`
- `dim-grey` — `#656465`
- `alabaster` — `#e1e1e2` (default background)
- `flag-red` — `#cd1b25` (sole accent color)

Custom font utilities: `font-sans` (Geist), `font-mono` (Geist Mono), `font-unifraktur` (UnifrakturMaguntia), `font-voltaire` (Voltaire), `font-syne` (Syne Mono).

### Component conventions

- shadcn/ui uses the "new-york" style. Add components via `bunx shadcn@latest add <component>`.
- Icons via `lucide-react`.
- Animations via `motion/react`. The `ease` array on `motion` transitions must be typed as `[number, number, number, number]` to satisfy TypeScript.
- Marquee via `react-fast-marquee`.
- Lottie animations via `lottie-react` — import JSON directly from `public/animations/`.
- Prettier runs `prettier-plugin-tailwindcss` for automatic class sorting.
- Path alias `@/` maps to `src/`.

### Pending integrations

- **Spotify + Discord status** in `Hero.tsx` are currently placeholder constants (`SPOTIFY_PLACEHOLDER`, `DISCORD_PLACEHOLDER`). The intended data source is the [Lanyard API](https://lanyard.rest) (`api.lanyard.rest/v1/users/:id`), which exposes Discord presence and Spotify currently-playing in one unauthenticated endpoint. Replace the placeholder objects with a `useLanyard` hook or `fetch` call when the Discord user ID is available.
- **Stats strip** values (`STATS` array in `Hero.tsx`) are placeholder numbers — replace with real figures.
