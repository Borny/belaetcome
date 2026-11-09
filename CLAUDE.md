# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Static website for Compagnie Bela & Côme (contemporary dance/theatre company). All site content is in French — keep new text in French, with proper accents and typographic apostrophes (’). See README.md for the full project overview.

## Commands

- `npm run dev` — webpack dev server on <http://localhost:5678> (hot reload)
- `npm run build` — production build into `dist/`
- There are no tests and no linter.

## Architecture

Vanilla JS (ES6 classes) + SCSS bundled by Webpack 5 (no framework). Don't add frameworks or new dependencies without asking. `webpack.common.js` defines 4 entry points, each paired with an `HtmlWebpackPlugin` page via `chunks`:

| Entry | Page template | Styles |
| --- | --- | --- |
| `src/index.js` | `src/index.ejs` | `src/styles/main.scss` |
| `src/js/code.js` | `src/code-login.html` | `src/styles/code.scss` |
| `src/js/mediation.js` | `src/mediation.html` | `src/styles/mediation.scss` |
| `src/js/medias.js` | `src/medias.html` | `src/styles/medias.scss` |

Each entry imports its own SCSS; CSS is injected at runtime by `style-loader` (no separate CSS file).

**Main page assembly:** `src/index.ejs` is the page template (head, loader spinner, calendar modal, `#root`). It is processed by HtmlWebpackPlugin's lodash template engine, not html-loader (hence the `.ejs` extension): `#root` includes each `src/components/*.html` at build time with `<%= require('./components/foo.html').default %>` (include order = page order), so the built `dist/index.html` contains the full page. The components still go through html-loader, so their image paths are resolved as usual. `src/index.js` then instantiates one JS class per section from `src/js/` on `window.load`. Consequences:
- Keep the JS class instantiation in the `load` handler, never at module top level (the loader spinner is hidden by the `Loader` class).
- The classes run in sequence; a missing element ID throws and stops every class after it.
- Adding a section means: component HTML + `require` line in `src/index.ejs` + optional class in `src/js/` instantiated in `src/index.js` + SCSS partial in `src/styles/components/` imported in `main.scss`.
- Navigation is in `src/components/hero.html` and exists twice (mobile menu and desktop menu) — update both.
- The show calendar popup content and the SEO/Open Graph meta tags live in `src/index.ejs`, not in a component. Images referenced directly in `src/index.ejs` must use `<%= require('./images/foo.jpg') %>` (html-loader doesn't process this file).

**Assets:** images/fonts referenced from HTML or SCSS are emitted as hashed files in `dist/images/`. Image paths in components are relative to `src/components/` (e.g. `../images/foo.jpg`). Favicons are generated from `src/images/favicon.svg`. PDFs linked with `<a href="….pdf">` are processed by html-loader and copied to the root of `dist/` under their own name (rule in `webpack.common.js`), so their paths must be relative to the HTML file like images (e.g. `../foo.pdf` from a component). PDFs that nothing links to are not copied.

**Styles:** `src/styles/tools/_variables.scss` holds colours, breakpoints and the z-index scale — use these instead of hard-coded values.

**Media area:** `code-login.html` posts a 4-digit code to `https://belaetcome.herokuapp.com/api/auth`, stores the returned token in `localStorage` and redirects to `medias.html`, which only checks that a token exists. The contact form's submission code (same Heroku backend) is commented out in `src/js/contact-form.js`. Don't wire new features to this backend.

`server/index.js` is a leftover Express server for `dist/` (`express` is not in `package.json`).

## Workflow

1. **Explore** — read the relevant files first (components, JS classes, SCSS partials, `src/index.js`) before writing any code.
2. **Plan** — present a short plan (files to touch, approach). For anything beyond a trivial fix, wait for approval before coding.
3. **Code** — implement the plan. Verify with `npm run build` (must succeed) and check the result in `npm run dev` when the change is visual.
4. **Commit** — see below.

- `dist/` is committed and deployed as-is (`.htaccess` handles www/https redirects on Apache). Run `npm run build` after changes in `src/` and commit `dist/` with them.
- Active work happens on `master`; branch off and open PRs against `master`. The `dev` branch (GitHub's default) is stale since 2022.
