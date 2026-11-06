# Compagnie Bela & Côme — website

Website for **Compagnie Bela & Côme**, a contemporary dance and theatre company founded in 2013 by Bela Balsa and Côme Tanguy. It's linked to the association **La Clé du Quai**. The company used to be based in Bordeaux and now runs artist residencies near Belhade in the Landes. The site is entirely in French.

## Pages

**Main page (`index.html`)**, a single scrolling page made of these sections:

- **Hero**: the landing area with navigation (desktop menu plus a separate mobile menu).
- **La Compagnie**: biographies of the two founders.
- **En Liesse**: the current show, with a "Calendrier" popup listing performance dates.
- **Furiosa**: an earlier show, with an accordion-style repertoire list.
- **Galerie**: a photo gallery, with a carousel on desktop and a separate layout on mobile.
- **Accueil en résidence**: a short text about the residency offer that links out to lacleduquai.com.
- **Contact** and **footer**.

**Other pages:**

- `mediation.html`: the education and outreach page (still marked as under construction).
- `code-login.html` → `medias.html`: a private media area behind a 4-digit code. The code is checked by an external API at `belaetcome.herokuapp.com/api/auth`. On success, a token is saved in `localStorage` and the media page shows YouTube videos of school workshops.
- `src/fleurs-davril.html` and `src/components/avril.html`: content for an older show, "Fleurs d'Avril". They're no longer used on the main page.

## How it's built

| Layer | Technology |
| --- | --- |
| Markup | Plain HTML. Each section is a separate "component" file in `src/components/` |
| Logic | Vanilla JavaScript (ES6 classes, no framework). Each section has a small class in `src/js/` (`Company`, `GalleryMobile`, `CalendarModal`, `MobileNav`…) |
| Styles | **Sass (SCSS)** organised in the 7-1 style: `tools/` (variables, mixins), `base/`, `components/`, `pages/`. Main colour is teal `#5dbeba`, accent is yellow `#ffde00` |
| Fonts/icons | Source Code Pro (self-hosted `.otf`), Font Awesome 5 from a CDN |
| Bundler | **Webpack 5**, with config split into `webpack.common.js`, `webpack.dev.js` and `webpack.prod.js` via `webpack-merge` |

### How the page is assembled

`src/index.js` imports each component's HTML as a string using `html-loader`. When the page loads, it concatenates them into `<div id="root">` and then creates each JS class. Because the content is injected by JavaScript, the HTML isn't present in the initial page source, which is worse for SEO. A loader spinner hides the page until this is done.

### Webpack setup

- 4 entry points (`index`, `code`, `mediation`, `medias`), each turned into its own HTML page by `HtmlWebpackPlugin`.
- `sass-loader` → `css-loader` → `style-loader` compiles the SCSS, and the CSS is injected via JS rather than written to a separate `.css` file.
- Images and fonts are emitted as hashed files in `dist/images/`.
- `favicons-webpack-plugin` generates all the favicon and app-icon sizes in `dist/assets/` from `src/images/favicon.svg`.

### Scripts

- `npm run dev`: dev server on port 5678 with hot reload.
- `npm run build`: production build into `dist/`.

### Deployment

- `dist/` is committed to git (it's commented out in `.gitignore`).
- The `.htaccess` file redirects www → non-www and http → https, so the site is most likely hosted on a shared Apache server.
- There's also a small **Express** server (`server/index.js`) that serves `dist/` on port 8099. However, `express` isn't listed in `package.json`, so it looks like a leftover.

### Other folders

- `design/`: Adobe Illustrator files (logo and site mockup). It also contains some accidentally committed junk (`GPUCache/`, `debug.log`).
- `src/*.pdf`: press and artistic kits for the shows.

## Things worth knowing

- **Contact form:** the code that sent messages through the Heroku API is all commented out. Only a scroll animation is left, so the form doesn't send anything.
- **Login backend:** the code login depends on a Heroku app. Heroku ended its free tier in 2022, so check that `belaetcome.herokuapp.com` still responds, or the media area may be unreachable.
- **Weak protection:** the media page is "protected" only by checking in the browser whether a token exists. Anyone can set a value in `localStorage` and get in, and the YouTube videos are public anyway.
- **Debug leftovers:** `src/js/code.js` contains a lot of `console.log` calls.
- **Branches:** active work happens on `master`. The `dev` branch (GitHub's default) has been stale since April 2022.
