# CLAUDE.md

Project overview: see README.md.

## Commands

- `npm run dev` — dev server on <http://localhost:5678> (hot reload)
- `npm run build` — production build into `dist/`
- No tests and no linter.

## How to approach a task: explore → plan → code → commit

```text
Explore gives Claude the relevant context it needs for your project.
Plan creates a plan of action that Claude uses to measure success.
Code is the back and forth between you and Claude before settling on the final outcome.
Commit helps you review and push your code so you can start on your next feature.
```

1. **Explore** — read the relevant files first (components, JS classes, SCSS partials, `src/index.js`) and do not write any code yet.
2. **Plan** — think through the change and present a short plan (files to touch, approach). For anything beyond a trivial fix, wait for approval before coding.
3. **Code** — implement the plan, following the conventions below. Verify with `npm run build` (must succeed) and check the result in `npm run dev` when the change is visual.
4. **Commit** — run `npm run build`, then commit the `src/` changes together with the regenerated `dist/`, with a clear message. Work on a branch off `master` and open PRs against `master`.

## Workflow

- `dist/` is committed and deployed as-is: run `npm run build` after any change in `src/` and commit `dist/` with it.
- Branch off `master` and open PRs against `master`. (`dev` is stale since 2022 — don't use it.)
- All site content is in French — keep new text in French, with proper accents and typographic apostrophes (’).

## Adding or editing a section on the main page

1. HTML in `src/components/<name>.html`
2. Optional JS class in `src/js/<name>.js`, exported and instantiated in `src/index.js` inside the `load` handler
3. Import the HTML in `src/index.js` and add it to the `root.innerHTML` concatenation (order = page order)
4. Styles in `src/styles/components/_<name>.scss`, imported in `src/styles/main.scss`
5. Add nav links in `src/components/hero.html` — there are TWO menus (mobile + desktop), update both

## Gotchas

- Components are injected via `innerHTML` after `window.load`, so JS classes must be instantiated after injection (never at module top level), and a missing element ID will throw and stop every class after it.
- Image paths in component HTML are relative to `src/components/` (e.g. `../images/foo.jpg`) and are resolved by html-loader.
- PDFs linked from pages are not processed by webpack — check they end up reachable in `dist/`.
- The show calendar popup lives in `src/index.html`, not in a component.
- Use SCSS variables from `src/styles/tools/_variables.scss` (colours, breakpoints, z-index scale) instead of hard-coded values.
- Contact form backend and Heroku API are dead/disabled — don't wire new features to `belaetcome.herokuapp.com`.

## Style

- Vanilla JS ES6 classes, no frameworks or new dependencies without asking.
