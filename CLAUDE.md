# CLAUDE.md

Project memory for `cg89x.github.io` — the personal academic homepage of **Christian Kontz**, incoming Assistant Professor of Finance at the University of Notre Dame (Stanford GSB Finance PhD, 2026).

## What this is

A hand-written **static site**. No framework, no build step, no package manager, no dependencies to install. Edit the HTML/CSS/JS directly and push.

- **Live at:** https://www.christiankontz.com (custom domain via `CNAME`)
- **Hosting:** GitHub Pages, auto-deployed on every push to `master` (`.github/workflows/static.yml`). `.nojekyll` disables Jekyll — files are served as-is. The deploy uploads the whole repo (`path: '.'`), so dotfiles/docs like `CLAUDE.md` and `.claude/` are also publicly served — keep secrets out of the repo.
- **No local server needed** to preview; open the HTML files directly, or use any static server (e.g. `python3 -m http.server`).

## Layout

| Path | Role |
|------|------|
| `index.html` | The single-page site: Home (hero + **Recent News**) → Research → Media → Tools. Working papers are `<details>` accordions on a CSS timeline. The **Code & Data** section is currently commented out (dormant). |
| `css/style.css` | All styling. Fonts: Manrope + Inter (Google Fonts). |
| `js/main.js` | Vanilla IIFE: fade-in observer, active-nav tracking, BibTeX toggle, live OpenAlex citation fetch, accordion scroll, Recent-News→paper anchor opening, and nav-height-aware `scroll-padding-top`. |
| `betasim.html` | Standalone interactive **CAPM β Simulator** (Plotly + MathJax, both from CDN). Self-contained. |
| `abstracts/<slug>/index.html` | SEO/Google Scholar landing pages with `citation_*` meta tags, one per paper. |
| `files/` | PDFs: CV, paper drafts, online appendix, press clippings. |
| `img/` | Figures and headshot. |
| `404.html`, `robots.txt`, `CNAME`, `favicon.ico` | Standard infra. |

`/editors` and `/cs-explorer/` are referenced in the site and `robots.txt` but are **not in this repo** — they are deployed from separate projects.

## Conventions

- **Indentation:** tabs in `index.html`, `betasim.html`, `css/`, `js/`; two-space in `404.html`. Match the file you're editing.
- **HTML entities** for typography: `&beta;`, `&mdash;`, `&amp;`, `&ouml;`, etc.
- **Security headers** are set as `<meta http-equiv>` tags (CSP, Permissions-Policy, referrer) on every page, since GitHub Pages can't set real HTTP headers. **If you add an external script, font, image, or API origin, update that page's CSP `content`** or the browser will block it.
- **Absolute root-relative paths** for internal links/assets (`/css/style.css`, `/files/...`, `/img/...`).
- External links use `target="_blank" rel="noopener"`.
- Google Analytics tag `G-CL595QMXQ9` is inlined in `<head>` of full pages.
- **Dormant content** (Teaching, Discussions, Code & Data) is commented out with `<!-- -->` rather than deleted, so it can be restored. Follow this when hiding a section, and strip any inner `<!-- -->` comments first (HTML comments can't nest).

## Contact / identity

Current contact is **ckontz@nd.edu** and **University of Notre Dame Mendoza College of Business**. When editing footers/contact info, keep all pages consistent — `404.html` previously lagged behind `index.html` with stale Stanford references.
(Note: `js/main.js` still uses `ckontz@stanford.edu` as the OpenAlex API `mailto=` politeness param — that's an API courtesy contact, not displayed to users.)

## Adding a working paper

Mirror an existing `<article class="timeline-item">` block in `index.html`: title (+ coauthors), award pills, `links` row (Draft/SSRN/BibTeX/etc.), `paper-figure`, abstract, and presentations. Add the PDF to `files/`, the figure to `img/` (with explicit `width`/`height` and `loading="lazy"`), and optionally an SEO page under `abstracts/<slug>/`. The BibTeX toggle and OpenAlex citation badge are wired by `data-bibtex` / `data-openalex` attributes handled in `js/main.js`. Give the `<details>` an `id` (e.g. `paper-<slug>`) so Recent News items and other links can deep-link to it — clicking such a link opens the accordion and scrolls to the card.
