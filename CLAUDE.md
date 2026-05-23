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
- All routes are defined in [App.tsx](public-site/src/App.tsx). Every route is wrapped in `<Header>` + `<Footer>`. Legacy URLs are redirected via `<Navigate>` elements (e.g. `/classes` → `/learn`, `/catalog` → `/learn`, `/sessions` → `/schedule`).
- `<ScrollToTop>` sits outside `<Routes>` and resets scroll on navigation.
- TS `baseUrl` is `./src`, so prefer `import X from "components/X"` over relative paths. `vite-tsconfig-paths` makes this work in dev and tests.

### Styling

- Tailwind config uses HSL CSS variables (`--primary`, `--border`, etc.) defined in `src/styles/globals.css` — this is the shadcn/ui convention. Use the semantic tokens (`bg-primary`, `text-muted-foreground`) rather than raw Tailwind colors when extending theme components.
- [src/components/ui/](public-site/src/components/ui/) holds shadcn-style primitives (`button.tsx`, `card.tsx`). The `cn()` helper at [src/lib/utils.ts](public-site/src/lib/utils.ts) (clsx + tailwind-merge) is the standard for className composition.
- ESLint has `tailwindcss/no-contradicting-classname` as **error** and `tailwindcss/no-custom-classname` as warn — lint will fail on conflicting utilities.

### API proxying (two environments, same URL shape)

The client calls `/api/calendar/...` and `/api/blog/...`. Two different mechanisms serve these paths depending on environment:

1. **Dev** — [public-site/vite.config.ts](public-site/vite.config.ts) defines Vite `server.proxy` entries that rewrite + forward to the upstream origin (e.g. `cdn.fundedyouth.org/feeds/calendar`).
2. **Production (Cloudflare Pages)** — files under [public-site/functions/api/](public-site/functions/api/) are Pages Functions that forward the same paths and add CORS headers (e.g. [functions/api/calendar/[[path]].ts](public-site/functions/api/calendar/[[path]].ts)).

If you add a new upstream API, mirror this pattern: Vite proxy for dev + a matching Pages Function under `functions/api/` for prod. Use proxies when the upstream lacks CORS, or when secrets need to stay server-side.

### Environment variables

Currently no env vars are required. If you add one, prefix browser-exposed vars with `VITE_` and document the server-only counterparts in a new `.env.example`.

### Static assets

Images and media are served from a Cloudflare R2 CDN at `https://ps-cdn.fundedyouth.org/assets/...`. Reference CDN URLs directly in JSX rather than importing local files.

### Content data

Most public content is hardcoded in the page components (the homepage course cards, the Learn page pathway, etc.) since the set is small and stable. Live session data comes from the calendar feed at `https://cdn.fundedyouth.org/feeds/calendar/sessions.json` (proxied via `/api/calendar/`). Detailed per-course documentation lives at `docs.fundedyouth.org`.

### SEO

[src/lib/useSeo.ts](public-site/src/lib/useSeo.ts) is the shared hook for per-page SEO. Each page calls `useSeo({ title, description, url, schema })` to manage `<title>`, meta tags, canonical link, and one JSON-LD block. Site-wide Organization + WebSite schema lives directly in [index.html](public-site/index.html). Crawler files: [public/robots.txt](public-site/public/robots.txt), [public/sitemap.xml](public-site/public/sitemap.xml).

### Content swaps awaiting real data

See [public-site/CONTENT-TODOS.md](public-site/CONTENT-TODOS.md). Currently lists: homepage testimonials section (hidden behind a JSX comment until real quotes are supplied).

## Claude Code configuration (`.claude/`)

Project-scoped Claude Code config lives in [.claude/](.claude/). The `.claude/*` ignore rules in [.gitignore](.gitignore) are currently commented out, so the whole directory — including `settings.local.json` — is tracked.

- [.claude/settings.local.json](.claude/settings.local.json) — permission allowlist (currently pre-approves `pnpm install`, `pnpm rebuild better-sqlite3 esbuild`, `pnpm build`, `pnpm lint`). Edit via the `/permissions` UI or the `update-config` skill.
- [.claude/skills/](.claude/skills/) — project skills invokable via `/<name>`:
  - `caveman-mode.md` — ultra-compressed output (`/caveman lite|full|ultra`).
  - `compress-docs.md` — compress `.md`/`.txt` files into terse format while preserving substance.
  - `terse-commits.md` — Conventional Commits, no fluff, why-over-what.
  - `terse-reviews.md` — one-line-per-finding code review style (location, problem, fix).
- [.claude/tools/new_git_commit.md](.claude/tools/new_git_commit.md) — house rule: when generating a commit, produce a short title + markdown description in code blocks.

When adding a new skill, drop a `.md` file into `.claude/skills/` with a `# Title` and rules; it becomes available as `/<filename>` automatically.

## Notes when editing

- The root [README.md](README.md) and [_NOTES.md](_NOTES.md) describe a broader "Customer Portal" vision (Supabase, user/admin portals, Stripe invoices). That scope is **aspirational** — only the public marketing site is implemented. Don't treat those docs as a description of current code.
- [public-site/README.md](public-site/README.md) is the unchanged Vite boilerplate readme and isn't project-specific.
