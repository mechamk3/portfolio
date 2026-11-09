# Portfolio

A bilingual (FA / EN) Next.js 16 portfolio, statically exported and ready for
GitHub Pages.

---

## Quick start (local dev)

```bash
npm install
npm run dev
# open http://localhost:3000  (no basePath in dev — URLs are clean)
```

## Build a static export locally

```bash
npm run build         # uses NEXT_PUBLIC_BASE_PATH=/portfolio by default
# output is written to ./out
npm run preview       # serve ./out on http://localhost:3000 for a quick check
```

To build with a different base path (e.g. your repo is named `my-portfolio`):

```bash
NEXT_PUBLIC_BASE_PATH=/my-portfolio npm run build
```

For a root user/org site (`user.github.io`), set it to an empty string:

```bash
NEXT_PUBLIC_BASE_PATH="" npm run build
```

---

## Deploy to GitHub Pages

This repo ships with a GitHub Actions workflow at
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml). It builds the
static export on every push to the **`v1.0`** branch and publishes it to
GitHub Pages.

### One-time setup

1. **Push this code to a branch named `v1.0`** in your GitHub repo. If the
   repo name is **not** `portfolio`, edit the `NEXT_PUBLIC_BASE_PATH` value in
   `.github/workflows/deploy.yml` to match `/your-repo-name`. (Skip this for
   `user.github.io` root sites — see below.)
2. In the GitHub web UI, go to **Settings → Pages → Build and deployment** and
   set **Source** to **GitHub Actions**.
3. Push to `v1.0`. The workflow runs once on push and re-runs on every
   subsequent push to that branch.

### Live URL

- Project site → `https://<username>.github.io/<repo-name>/`
- Root user/org site (`<username>.github.io` repo) → set
  `NEXT_PUBLIC_BASE_PATH: ""` in the workflow file → URL is
  `https://<username>.github.io/`

---

## How the GitHub Pages wiring works

| File | Role |
| --- | --- |
| `next.config.ts` | `output: "export"` produces a fully static `out/` folder. `basePath` makes every URL/asset live under `/repo-name`. `images.unoptimized` because GH Pages can't run the Next image optimizer. `trailingSlash: true` so each route becomes `route/index.html`. |
| `lib/assetPath.ts` | `withBasePath()` prepends the basePath to URLs used by raw DOM APIs (`window.open`, `new Image().src`). **Don't** pass its result into Next's `<Image>` or `<Link>` — those auto-prefix basePath themselves. |
| `public/.nojekyll` | Tells GitHub Pages to skip Jekyll processing, so Next's `_next/` folder (with leading underscore) is served normally. |
| `.github/workflows/deploy.yml` | Builds on push to `main` and publishes `out/` to the Pages environment. |

---

## Project structure

```
app/
  page.tsx                       # root → redirects to /fa/
  [locale]/
    layout.tsx                  # per-locale <html>, fonts, dir=rtl|ltr
    (site)/
      page.tsx                   # home (Work / Experience / About / Contact tabs)
      projects/
        page.tsx                 # all projects list
        hris/page.tsx            # HRIS case study
    projects/[slug]/page.tsx     # placeholder "under construction" pages
    not-found.tsx                # per-locale 404
  global-not-found.tsx           # top-level 404 → /404.html
content/                         # FA/EN dictionaries + HRIS case-study content
components/                      # UI components (case-study, home, layout…)
lib/                             # i18n, fonts, assetPath
public/                          # static assets (screenshots, .nojekyll)
.github/workflows/deploy.yml     # GH Pages build & deploy workflow
```

---

## Notes & gotchas

- **basePath is required** for project pages (`user.github.io/repo-name`). It
  defaults to `/portfolio` — change it in two places if your repo name
  differs: `next.config.ts` (build-time) and `.github/workflows/deploy.yml`
  (CI override).
- **`usePathname()` strips basePath**, so the `LanguageSwitcher` URL
  manipulation logic doesn't need to know about it.
- **`<Link>` and `<Image>` auto-prefix basePath** — never wrap their `href` /
  `src` with `withBasePath()`, or you'll get a doubled prefix.
- **`<a>` tags** that point to internal routes must use `<Link>` instead, OR
  the path must be passed through `withBasePath()` manually. This repo only
  uses raw `<a>` for external links (`target="_blank"`) — safe.
- **The root `app/page.tsx`** does `window.location.replace("fa/")`. This is a
  relative URL, so it resolves against the current path — works on both dev
  (`/`) and production (`/portfolio/`).
