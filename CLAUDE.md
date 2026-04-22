# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repo layout

The root `package.json` declares a pnpm monorepo ("customer-portal-monorepo") with scripts for `public-site`, `user-portal`, and `admin-portal`. Only `public-site/` currently exists — the root scripts for `user`/`admin` (`dev:user`, `lint:user`, etc.) will fail until those workspaces are added. All real work happens inside [public-site/](public-site/).

## Commands

Run from `public-site/`:

| Task | Command |
|------|---------|
| Dev server (localhost:5173) | `pnpm dev` |
| Production build (runs `tsc` then `vite build`) | `pnpm build` |
| Typecheck only | `pnpm typecheck` |
| Lint (zero warnings allowed) | `pnpm lint` |
| Tests (Vitest, happy-dom) | `pnpm test` |
| Single test | `pnpm test path/to/file` (test files match `**/test.{ts,tsx}`) |
| Vitest UI | `pnpm test:ui` |

From the repo root you can use `pnpm dev:public`, `pnpm build:public`, `pnpm typecheck:public`, or `pnpm install:all`.

Package manager: pnpm 10.11 (enforced via `packageManager` field). Node >=18.

## Architecture

### Frontend app (`public-site/src/`)

- React 18 + TypeScript + Vite (SWC plugin), Tailwind 3, React Router v7, happy-dom for tests.
- Entry [src/index.tsx](public-site/src/index.tsx) mounts `<App />` from [src/App.tsx](public-site/src/App.tsx).
- All routes are defined in [App.tsx](public-site/src/App.tsx). The layout branches on pathname: `/courses/:courseId` renders **without** Header/Footer (full-page course experience); every other route is wrapped in `<Header>` + `<Footer>`. When adding a new route, decide which branch it belongs in.
- `<ScrollToTop>` sits outside `<Routes>` and resets scroll on navigation.
- TS `baseUrl` is `./src`, so prefer `import X from "components/X"` over relative paths. `vite-tsconfig-paths` makes this work in dev and tests.

### Styling

- Tailwind config uses HSL CSS variables (`--primary`, `--border`, etc.) defined in `src/styles/globals.css` — this is the shadcn/ui convention. Use the semantic tokens (`bg-primary`, `text-muted-foreground`) rather than raw Tailwind colors when extending theme components.
- [src/components/ui/](public-site/src/components/ui/) holds shadcn-style primitives (`button.tsx`, `card.tsx`). The `cn()` helper at [src/lib/utils.ts](public-site/src/lib/utils.ts) (clsx + tailwind-merge) is the standard for className composition.
- ESLint has `tailwindcss/no-contradicting-classname` as **error** and `tailwindcss/no-custom-classname` as warn — lint will fail on conflicting utilities.

### API proxying (two environments, same URL shape)

The client always calls `/api/eventbrite/...` and `/api/blog/...`. Two different mechanisms serve these paths depending on environment:

1. **Dev** — [public-site/vite.config.ts](public-site/vite.config.ts) defines Vite `server.proxy` entries. The eventbrite proxy injects `Authorization: Bearer ${EVENTBRITE_PRIVATE_TOKEN}` at proxy time so the token never ships to the browser.
2. **Production (Cloudflare Pages)** — [public-site/functions/api/eventbrite/[[path]].ts](public-site/functions/api/eventbrite/[[path]].ts) is a Pages Function that forwards the same paths to `eventbriteapi.com` with the token read from Cloudflare env bindings.

If you add a new upstream API, mirror this pattern: Vite proxy for dev + a matching Pages Function under `functions/api/` for prod. Do not ship secrets to the client.

### Environment variables

- `VITE_EVENTBRITE_ORGANIZATION_ID` — public, exposed to the browser via `import.meta.env`.
- `EVENTBRITE_PRIVATE_TOKEN` — server-only; used by both the Vite dev proxy and the Cloudflare Pages Function. Never prefix with `VITE_`.
- See [public-site/.env.example](public-site/.env.example).

### Static assets

Images and media are served from a Cloudflare R2 CDN at `https://ps-cdn.fundedyouth.org/assets/...` (see recent commits `e5c5cba` / `fc2c3d1`). Reference CDN URLs directly in JSX rather than importing local files; the `public/assets/` directory holds only small data (e.g. [catalog.json](public-site/public/assets/data/catalog.json)) and icons.

### Content data

Learning pathways, courses, and similar static content live in [public-site/public/assets/data/catalog.json](public-site/public/assets/data/catalog.json) and are fetched at runtime. Update JSON rather than hardcoding lists in components.

## Notes when editing

- The root [README.md](README.md) and [_NOTES.md](_NOTES.md) describe a broader "Customer Portal" vision (Supabase, user/admin portals, Stripe invoices). That scope is **aspirational** — only the public marketing site is implemented. Don't treat those docs as a description of current code.
- [public-site/README.md](public-site/README.md) is the unchanged Vite boilerplate readme and isn't project-specific.
