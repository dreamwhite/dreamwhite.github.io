# SEO and static output audit

Audit baseline: 2026-11-10.

This site is a static Next.js export. The checks below are intentionally split between the generated artifact and the deployed GitHub Pages origin so a local build cannot be mistaken for a successful deployment.

## Generated artifact

Validated with `pnpm build`, `pnpm check:output`, `pnpm check`, and `pnpm test`:

- every indexable HTML route has exactly one route-specific canonical URL;
- the 404 document has no canonical URL and is marked `noindex, nofollow`;
- `out/robots.txt` exposes the absolute sitemap URL;
- `out/sitemap.xml` contains unique absolute trailing-slash URLs for static pages, projects, and writing posts;
- canonical URLs are included in the sitemap;
- internal links resolve to files in the static `out/` tree;
- Open Graph and Twitter metadata use the shared social image and the route-specific URL/title/description;
- Markdown excerpts are stripped of link syntax and capped to a search-friendly description length.

## Deployment checks

Run after a GitHub Pages deployment with:

```sh
curl -fsSIL https://dreamwhite.dev/
curl -fsSL https://dreamwhite.dev/robots.txt
curl -fsSL https://dreamwhite.dev/sitemap.xml
curl -sS -o /dev/null -w '%{http_code}\n' https://dreamwhite.dev/this-route-does-not-exist/
curl -fsSIL https://dreamwhite.dev/og-image.svg
```

The expected result is a `200` homepage, public `robots.txt` and `sitemap.xml`, a `404` for the missing route, and a `200` social image. The canonical host is `https://dreamwhite.dev`; no `www` host is used by the metadata or sitemap.

GitHub Pages owns the public response headers, so repository code cannot add custom security headers such as CSP or HSTS. The deployment workflow remains responsible for publishing the static artifact; the browser-facing metadata and route checks live in this repository.

Google Search Console verification and Lighthouse scoring are intentionally left as post-deploy operator checks because they require the live property and browser environment, not just the repository.

## Public baseline before this change

The live checks run on 2026-11-10 returned `200` for the homepage, `robots.txt`, `sitemap.xml`, and `og-image.svg`; a missing route returned `404`. GitHub Pages identifies itself as `GitHub.com` and does not expose the local Traefik/Nginx security headers.

Before this branch is deployed, internal live pages still expose the homepage as their canonical URL and Open Graph URL. That is the defect addressed here: the generated artifact already contains the corrected route-specific values, but the public domain will not change until this branch is merged and the Pages workflow completes.
