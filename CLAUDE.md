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
| `src/index.js` | `src/index.html` | `src/styles/main.scss` |
| `src/js/code.js` | `src/code-login.html` | `src/styles/code.scss` |
| `src/js/mediation.js` | `src/mediation.html` | `src/styles/mediation.scss` |
| `src/js/medias.js` | `src/medias.html` | `src/styles/medias.scss` |

Each entry imports its own SCSS; CSS is injected at runtime by `style-loader` (no separate CSS file).

**Main page assembly:** `src/index.html` is only a shell (`#root`, loader spinner, calendar modal). `src/index.js` imports every `src/components/*.html` as a string (html-loader), concatenates them into `#root.innerHTML` on `window.load` (concatenation order = page order), then instantiates one JS class per section from `src/js/`. Consequences:
- JS classes must be instantiated after the injection, never at module top level.
- The classes run in sequence; a missing element ID throws and stops every class after it.
- Adding a section means: component HTML + optional class in `src/js/` + import/concat/instantiate in `src/index.js` + SCSS partial in `src/styles/components/` imported in `main.scss`.
- Navigation is in `src/components/hero.html` and exists twice (mobile menu and desktop menu) — update both.
- The show calendar popup content lives in `src/index.html`, not in a component.

**Assets:** images/fonts referenced from HTML or SCSS are emitted as hashed files in `dist/images/`. Image paths in components are relative to `src/components/` (e.g. `../images/foo.jpg`). Favicons are generated from `src/images/favicon.svg`. PDFs linked with `<a href>` are **not** processed by webpack: the dev server serves `src/` statically so they work in dev, but they are not copied into `dist/`. When adding or changing a PDF link, check that the file is reachable in `dist/`.

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
