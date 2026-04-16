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

- `src/app/` — App Router pages and root layout. `layout.tsx` registers all Google Fonts and wraps every page in `<SidebarLayout>`.
- `src/layouts/` — Full-viewport page sections and shell components. `SidebarLayout.tsx` is the root shell (see below). `Hero.tsx` is the main landing section. `Header.tsx` is unused — the trigger button now lives inside `SidebarLayout`.
- `src/hooks/` — Custom hooks. `useLanyard.ts` wraps `src/lib/lanyard.ts` with client-side polling every 30s; accepts `initialData` for SSR hydration.
- `src/components/ui/` — UI primitives. `button.tsx` is shadcn/ui. `FluidText.tsx` is an SVG-based text scaler — prefer the `@container` + `cqw` CSS approach for new instances.
- `src/lib/utils.ts` — Exports `cn()` (`clsx` + `tailwind-merge`).
- `src/lib/lanyard.ts` — Lanyard types (`LanyardData`, `LanyardSpotify`, etc.), `parseResponse()`, and `fetchLanyard()`. Import types from here, not from the hook.
- `src/lib/animations.ts` — Shared `motion/react` animation presets: `fadeUp`, `fadeDown`, `fadeIn`, `fadeLeft`, `fadeRight`. Each takes an optional `delay` number and returns spread-ready `initial/animate/transition` props.
- `src/styles/globals.css` — All Tailwind v4 config and design tokens via `@theme inline`.
- `src/types/css.d.ts` — Declares `*.css` modules to suppress TypeScript side-effect import errors.
- `public/animations/` — Lottie JSON files.
- `public/assets/` — Static images including `sidebarbg.jpg` (sidebar background).

### SidebarLayout

`SidebarLayout` is the root shell wrapping all pages. Key behaviours:

- **Desktop**: An invisible flex spacer + a `position: fixed` visual sidebar animate to `SIDEBAR_WIDTH` (currently 500px) simultaneously — the spacer pushes content while the fixed div renders the triangle. The sidebar uses `clip-path: polygon(0 0, 100% 0, 0 100%)` to create a right-triangle shape that tapers from full width at the top to a point at the bottom.
- **Mobile**: Standard `position: fixed` overlay with backdrop.
- **Content animation**: When the sidebar opens, the main content shifts right (`x: 24`) and tilts (`rotate: 3`) with `transformOrigin: "bottom left"` — a paper-slide effect. The outer container is `fixed inset-0` with the sidebar background image, and the content area is `bg-alabaster` with a left-edge box shadow for depth.
- **Background**: `public/assets/sidebarbg.jpg` with `background-attachment: fixed` is applied to the outer container, the clipped triangle div, and the mobile overlay — all three share the same viewport-anchored image coordinates for a seamless appearance.

### Page sections

`src/app/page.tsx` is an async Server Component that server-fetches Lanyard data and passes it as `initialData` to `<Hero>`, avoiding a client-side loading flash. Sections render in order: `Hero` → `Specializations` → `Projects` → `Contact`.

Each section in `src/layouts/` follows the same pattern: a meta bar (`— 0N` index + section name, `font-syne text-dim-grey text-xs tracking-widest uppercase`) at the top, then content, all wrapped in `<section className="flex flex-col px-3">`. Use `fadeUp()` from `@/lib/animations` for entrance animations.

`Work.tsx` exists but is not currently rendered in `page.tsx` — add it between `Specializations` and `Projects` when ready.

### Lanyard integration

`src/lib/lanyard.ts` owns all types and API logic. `src/hooks/useLanyard.ts` is the client-side consumer — it skips the initial fetch when `initialData` is provided and starts the 30s polling interval immediately. Returns:
- `discord_user` — avatar URL, display name
- `discord_status` — online/idle/dnd/offline
- `custom_status` — parsed from activities type 4
- `spotify` — song, artist, album, album art URL, timestamps (used for live progress bar)
- `vscode` — active VS Code activity with elapsed start timestamp
- `active_on_discord_web/desktop/mobile` — platform booleans

`Hero.tsx` consumes this hook and renders live Discord, Spotify, and VS Code cards in the right-column widget area. Requires the Discord account to be in the Lanyard server (`discord.gg/lanyard`).

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

### Pending

- **Stats strip** values (`STATS` array in `Hero.tsx`) are placeholder numbers — replace with real figures.
