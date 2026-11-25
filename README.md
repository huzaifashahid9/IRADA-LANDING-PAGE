# IRADA landing page 

The landing page for **IRADA** (ارادہ, "intention"): a brain-signal headset, a phone app and a careful AI agent that let people living with paralysis call family, send a message or ask for help, using commands they have practised.

> IRADA is an assistive prototype, not a medical device.

Designed and built by **[Muneeb Mustafa](https://github.com/tf-muneeb)** and **[Huzaifa Shahid](https://github.com/huzaifashahid9)** for Team Hexabytes.

## Tech stack

- [Next.js 16](https://nextjs.org) with the App Router, JavaScript and React 19
- CSS Modules with design tokens in CSS custom properties (no CSS framework)
- [`next/font`](https://nextjs.org/docs/app/api-reference/components/font) for Plus Jakarta Sans and [`next/image`](https://nextjs.org/docs/app/api-reference/components/image) for every render
- [`@google/model-viewer`](https://modelviewer.dev) for the interactive 3D headset, the same `.glb` as the pitch app
- ESLint (`eslint-config-next` core web vitals) and Prettier

The whole page is statically prerendered, so it can be hosted on Vercel or any static host.

## Getting started

Requires Node.js 20.9 or newer (see `.nvmrc`).

```bash
npm install
npm run dev        # http://localhost:3000
```

| Script                 | What it does                     |
| ---------------------- | -------------------------------- |
| `npm run dev`          | Start the development server     |
| `npm run build`        | Create a production build        |
| `npm start`            | Serve the production build       |
| `npm run lint`         | Lint with ESLint                 |
| `npm run lint:fix`     | Lint and fix what can be fixed   |
| `npm run format`       | Format every file with Prettier  |
| `npm run format:check` | Check formatting without writing |

The live site is **[irada.live](https://irada.live)**. The SEO tags, `sitemap.xml` and `robots.txt` point there by default. To use another address, copy `.env.example` to `.env.local` and change `NEXT_PUBLIC_SITE_URL`.

## Project structure

```
src/
├── app/                  # App Router: layout, page, metadata, icon, sitemap, robots, 404
├── components/
│   ├── ui/               # Reusable building blocks: Button, Card, Grid, Pill, Section, SectionHeading, Stat, Icon…
│   ├── layout/           # Navbar (active section + mobile menu), Footer, SkipLink
│   ├── headset/          # HeadsetViewer (3D model) and HeadsetExplorer (parts + hotspots)
│   ├── app-demo/         # PhoneFrame and the three demo phone screens
│   └── sections/         # One component per page section, composed in app/page.js
├── content/              # All page copy and data, one file per section
└── lib/                  # Small helpers
public/
├── images/               # Headset and step renders
└── models/headset.glb    # The 3D headset
```

Sections only arrange components; the words live in `src/content/`. To change copy, edit the content file for that section and the page updates.

## Editing content

- **Placeholders.** Any text in `[square brackets]` renders as a dashed placeholder box, for facts that still need a verified source (market size, patient numbers, headset weight, contact details, surnames). Replace the bracketed text in `src/content/` when the real value is known.
- **Site settings** such as the contact details, the footer credit and the demo link are in `src/content/site.js`.
- **The logo** source is `public/logos/irada-logo-transparent.svg`. The navigation uses the cropped `irada-wordmark.svg`, the footer and 404 page use `irada-logo.svg`, and `irada-mark.svg` is the symbol alone. The favicon is `src/app/icon.svg`; the iOS home-screen icon is `src/app/apple-icon.png`, and the Android icons are in `public/icons/`. All are cut from the source file, so redo them if the logo changes.
- **The 3D model** is `public/models/headset.glb`. Its explode animation names and the hotspot positions for each part are in `src/content/site.js` and `src/content/headset.js`. Use the [model-viewer editor](https://modelviewer.dev/editor/) to find new hotspot positions if the model changes.

## Accessibility

- Semantic landmarks, one `h1`, and every section labelled by its heading
- A skip link, visible focus rings and keyboard-operable controls throughout
- FAQ built on native `<details>`, so it works without JavaScript
- Respects `prefers-reduced-motion` (no auto-rotation, no smooth scrolling)
- The 3D viewer falls back to a static render if WebGL or the model is unavailable

## Content rules

All product facts come from the IRADA master build document. Wheelchair control is left out on purpose because the document marks it out of scope, and the page never claims that IRADA diagnoses, treats or is certified.

## License

[MIT](./LICENSE)
