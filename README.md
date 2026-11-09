# dreamwhite.dev

Personal website and Markdown writing archive for Ivan Cafiero (`dreamwhite`).

## Stack

- Next.js App Router with static export
- React and strict TypeScript
- Tailwind CSS plus a small custom design system
- `tsx watch` wrapping the Next.js development server
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

The static output is generated in `out/`.

Personal assets and pending editorial material are documented in [`ASSETS_NEEDED.md`](./ASSETS_NEEDED.md).

The public-facing project set currently includes PRG32, Emporion, an abstracted event-driven MQTT integration, and open-source systems work. A separate personal project is intentionally not published yet.

## Docker + Dream Platform

The site has no application backend. Development runs the Next.js dev server; production builds the site once and serves the static `out/` directory from Nginx. Both profiles attach only to Dream Platform's external `dream_edge` network for Traefik ingress.

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


