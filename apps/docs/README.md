## SparkNG Docs

Source of [sparkng.bdspark.com](https://sparkng.bdspark.com/) — the SparkNG documentation site: landing page, installation/theming guides, per-component demo pages with live previews and StackBlitz editing, LLM-friendly docs endpoints, and a prerendered + SSR Angular application.

## Local development

From the repository root:

```bash
pnpm install

# CSR dev server
pnpm run dev

# dev server with SSR enabled
pnpm run dev:ssr
```

## Build

The production build generates documentation content before compiling the app:

1. `build:apidoc` — TypeDoc over `packages/sparkng` → `doc/apidoc/index.json` (API tables).
2. `build:democode` — walks `doc/` → `public/demos.json` (source code tabs + StackBlitz payloads).
3. `build:llm-docs` — generates `public/llms/**` (llms.txt, markdown per component).
4. `build:routes` — derives `router/routes.txt` (prerender manifest).
5. `build:sitemap` — derives `public/sitemap.xml`.
6. `ng build` — bundles the app, prerenders the routes from `routes.txt` and emits the Express SSR server into `dist/docs`.

```bash
# content generators only (no ng build)
pnpm run build:docs:content

# full build incl. ng build
pnpm run build:docs
```

Generated artifacts (`doc/apidoc`, `public/demos.json`, `public/llms`, `router/routes.txt`, `public/sitemap.xml`) are gitignored — always regenerate them after pulling.

## Deploying to Vercel

The site deploys as an Angular SSR app behind a serverless function:

- `api/index.mjs` re-exports the Express app from `dist/docs/server/server.mjs` as the function handler.
- `vercel.json` rewrites every request that does not match a static file (prerendered pages, hashed assets, `demos.json`, `llms/*`, …) to that function.
- Static output is served from `dist/docs/browser`.

Project setup (one time, in the Vercel dashboard):

1. Import the repository and create a project.
2. **Root Directory**: `apps/docs`.
3. Enable **"Include source files outside of the Root Directory"** so changes under `packages/*` also trigger deployments (the site compiles against workspace sources).
4. **Framework Preset**: `Other` — `vercel.json` already pins `installCommand`, `buildCommand` and `outputDirectory`; keep them in sync if the build changes.
5. Production branch: `main` (previews for other branches are enabled by default; see `git.deploymentEnabled` in `vercel.json`).

Every push to `main` then runs `pnpm build` inside `apps/docs` and publishes the result. The custom domain (`sparkng.bdspark.com`) is attached in **Settings → Domains**; `server/server.ts` already allows `sparkng.bdspark.com`, `*.sparkng.bdspark.com` and `*.vercel.app` hosts.

## Tailwind integration sandboxes

Small Vite sandboxes for `@bdspark/sparkng-tailwindcss` live in [`apps/tailwind-playgrounds`](../tailwind-playgrounds) — one for Tailwind v3 and one for v4.
