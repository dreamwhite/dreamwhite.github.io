# dreamwhite.dev

Personal website and Markdown writing archive for Ivan Cafiero (`dreamwhite`).

## Stack

- Next.js App Router with static export
- React and strict TypeScript
- Tailwind CSS plus a small custom design system
- Next.js Turbopack and Fast Refresh for local development
- TypeScript 7 for project typechecking
- Markdown content in `content/writing/`
- GitHub Pages deployment through `.github/workflows/deploy.yml`

## Local development

```bash
pnpm install
pnpm dev
```

Validation commands:

```bash
pnpm test
pnpm validate:content
pnpm lint
pnpm typecheck
pnpm build
```

`pnpm check` runs the content validator, typecheck and lint together. The same checks run in the Pages workflow before the static export is uploaded.

TypeScript 7 is exposed through the normal `tsc` command. Next.js uses the project-local compiler for its build and typecheck flow; no separate `tsgo` wrapper or compiler alias is required.

ESLint uses the official Next rule plugin with Babel's TypeScript-aware parser. This keeps linting independent from `typescript-eslint`, whose current stable release does not support TypeScript 7 yet; `tsc` remains the single source of truth for type errors.

Writing is rendered from Markdown through an allowlist-based `rehype-sanitize` pipeline. Raw HTML is parsed only where needed for the existing archive, while scripts, event handlers and unsafe URL protocols are removed before the content reaches the page.

The static output is generated in `out/`.

Personal assets and pending editorial material are documented in [`ASSETS_NEEDED.md`](./ASSETS_NEEDED.md).

The public-facing project set currently includes PRG32, Emporion, an abstracted event-driven MQTT integration, and open-source systems work. A separate personal project is intentionally not published yet.

## Docker + Dream Platform

The site has no application backend. Development runs the Next.js dev server directly with Turbopack; production builds the site once and serves the static `out/` directory from Nginx. Both profiles attach only to Dream Platform's external `dream_edge` network for Traefik ingress.

Start Dream Platform first so that `dream_edge` and its Traefik instance exist:

```bash
cd /Users/ivan/dream-platform
./scripts/bootstrap-networks.sh
docker compose -f services/traefik/docker-compose.yml up -d
```

Then, from this repository:

```bash
cp .env.example .env
docker compose --profile dev up --build
```

Development is available at [https://dreamwhite.dream.test](https://dreamwhite.dream.test).

For the production-like static container:

```bash
docker compose --profile prod up -d --build
```

Only one profile should own the domain at a time. Traefik remains the only service publishing ports 80/443; this Compose project does not publish application ports to the host.


