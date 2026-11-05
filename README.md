# Mohammed Adel — Flutter Portfolio

A responsive, English portfolio built with Next.js App Router, React, TypeScript, and Tailwind CSS. Includes six case studies, screenshot galleries, downloadable CV, social previews, and static export.

## Run locally

Requires Node.js 22.16+ and npm.

```sh
npm ci
npm run dev
```

Open http://127.0.0.1:3000. Fonts and screenshot assets are local; the website needs no third-party services, database, or credentials.

## Build and verify

```sh
npm run build
npm run typecheck
npm run check:export
```

The production website is generated in `out/`. Serve that directory with any static HTTP server. For example:

```sh
npm start
```

`npm start` serves the static export locally, including the custom 404 page. Use `npm run dev` for development. Set `PORT` if port 3000 is in use.

## Update content

- Edit profile details, experience, project copy, captions, and links in `src/content/portfolio.ts`.
- All case studies are generated from the `projects` array. Each project has a stable slug, colors, screenshots, contribution, features, and outcome. Set `related` to cross-link companion apps; add `store` only when its exact link is verified.
- Update styling in `src/app/globals.css`; device frames and project visuals are shared components.
- Set `NEXT_PUBLIC_SITE_URL` to your final site origin before building. `src/lib/site.ts` defaults to the provisioned Sites origin. This controls canonical URLs, structured data, sitemap, and robots metadata.
- Replace `public/Mohammed-Adel-Flutter-CV.pdf` to update the download. It is intentionally the supplied, unchanged CV and includes its original contact details.
- Replace `public/images/mohammed-adel.webp` to update the portrait, or run `PORTRAIT_PATH="/absolute/path/to/photo.jpg" node scripts/prepare-portrait.mjs`. The supplied photo is shown in the introduction and experience section, with its metadata stripped during optimization.

## Import or replace screenshots

Optimized assets are already included, so the original screenshot folder is not needed to run or build the site.

To re-import from the supplied originals:

```sh
SCREENSHOTS_DIR="/absolute/path/to/App Screen Shots" \
CV_PATH="/absolute/path/to/cv.pdf" \
npm run prepare:assets
node scripts/generate-social.mjs
npm run build
npm run check:export
```

The importer uses `scripts/asset-manifest.mjs` to select source screenshots and apply opaque privacy rectangles before creating 320/640/960-pixel portrait variants and 560/1120/1600-pixel landscape variants. It strips source metadata; originals remain unchanged. Only processed WebP images are included in the website.

**Before replacing an image:** review its masks against the new source. Coordinates are normalized `[x, y, width, height]` values. Source indexes use the alphabetically sorted PNG filenames in the named folder. Re-check names, photographs, addresses, phone numbers, identifiers, QR codes, and business data at full resolution. Review both galleries and social images after importing. Automated checks confirm masks are baked in, but cannot determine whether every sensitive detail has been selected.

## Accessibility and interaction

The site includes a skip link, semantic landmarks, visible focus states, reduced-motion support, responsive navigation, descriptive gallery buttons, and a native modal dialog. Galleries support Left/Right arrows, Escape, trapped modal focus, and focus restoration to the opening button. Contact links use `mailto:` or verified profile URLs; there is no contact-form backend or tracking script.

The navigation uses the supplied portrait. `src/app/enhancements.css` defines the polished device frames, product stages, and motion treatment. `src/components/motion-controller.tsx` progressively enhances offscreen sections with one-time reveals and adds subtle pointer-driven depth on desktop. Content remains available without JavaScript, reduced-motion preferences disable motion, and animations do not loop continuously. The thin line under the header indicates reading progress.

## Hosting

`.openai/hosting.json` points Sites hosting at `out/`. The same export can be deployed to any static host. If moving to a different hostname, set `NEXT_PUBLIC_SITE_URL` and rebuild. Use a host that serves folder `index.html` files and the exported `404.html` for unknown paths. Public sharing and custom-domain configuration are separate from the application code.
# my_portfolio_website
