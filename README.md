# Eva Wang — Shoreline portfolio demo

A responsive, buildless personal portfolio. The shoreline and six collectible shells are drawn in SVG, with a softly lit Vanta Waves surface clipped to the sea. English and Chinese interfaces, accessible story dialogs, a project index, résumé summary, and reduced-motion support are included. Research & Notes includes a bilingual GRE preparation review.

## Publish on GitHub Pages

The site is ready to serve from `dist/`, including the walkthrough images and heading fonts. No build step is required. When you're ready to make the site available:

1. Go to **Settings → Pages** in this repository and set **Source** to **GitHub Actions**.
2. Go to **Actions → Publish portfolio to GitHub Pages**, choose **Run workflow**, and select `main`.
3. Once the run succeeds, open the address shown in **Settings → Pages**.

The workflow only runs manually, so uploading or updating files will not publish the site. After future edits to `dist/`, run the workflow again when ready. GitHub Free supports Pages from public repositories; publishing from a private repository requires a [supported paid plan](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

## Preview

Run `python3 -m http.server 4173 --directory dist` from this directory, then visit `http://localhost:4173`.

## Content

- `dist/index.html`: home page and shoreline illustration
- `dist/style.css`: responsive layout, animations, and print styling
- `dist/app.js`: shell illustrations, bilingual content, and dialog interactions
- `dist/zero-waste.js`: full bilingual Zero-Waste Knowledge Base case study and image viewer
- `dist/assets/zero-waste/{en,zh}/`: five original product walkthrough posters for each language

The Zero-Waste case study includes the problem, individual contribution, product walkthrough, retrieval pipeline, design decisions, and delivered system. Language switching updates both text and images. The image viewer supports previous/next controls, arrow keys, Escape, and full-size inspection.

Run `python3 scripts/build-standalone.py` to regenerate `eva-shoreline-demo.html`, a standalone copy with the walkthrough images and title fonts embedded.

The contact dialog links to Eva’s NYU email and GitHub. The résumé is a demo summary with a print/save-as-PDF action.

## Ocean background

Vanta Waves 0.5.24 and Three.js r134 are bundled locally in `dist/assets/vendor/`, including MIT license notices. The ocean uses muted teal, low waves, and slow movement. The animated SVG shoreline and foam remain aligned with the canvas on desktop and mobile. Reduced-motion preferences use the illustrated static coast, and WebGL failure leaves the SVG background visible. Animation pauses while the page is hidden. The standalone HTML includes both libraries, so the waves also work when opened directly.

## Current city temperature

The sea note shows Eva’s current city (Shanghai) and its current temperature in Celsius from Open-Meteo. All visitors see the same city, with no location prompt. The reading refreshes every 15 minutes while the page is visible. Recent results are cached locally; readings older than one hour are replaced by a dash if the service is unavailable. Update the city configuration in `dist/weather.js` when Eva moves cities, then regenerate the standalone page.

## Stargazing Assistant walkthrough

The Under the stars case study includes five real screenshots captured from the live Streamlit app: location setup, ranked observing windows, sky-condition charts, score validation, and the nearby-trip eligibility state. Chinese and English descriptions share the screenshot gallery, with full-size viewing, previous/next navigation, and language switching. The screenshot of the New York forecast shows a score below the travel-planning threshold; the caption explains the observed state. Rebuild the standalone HTML to embed both project galleries.

## Projects directory

Projects is a concise bilingual index of the Zero-Waste Knowledge Base, Stargazing Assistant, and two ongoing research projects. Each entry has a concrete title, one-sentence summary, type/status, and three skill tags. Entries open the existing homepage case studies; a back link returns to the directory. Work experience remains available through its homepage shell.
