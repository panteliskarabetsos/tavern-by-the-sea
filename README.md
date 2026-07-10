# Tavern by the Sea

Marketing site for Tavern by the Sea — Mediterranean cooking on the water in
Wickford, Rhode Island, est. 2006.

Next.js 16 (App Router) · Tailwind v4 · Motion · JavaScript.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
```

## Before you launch

Everything below lives in [`src/lib/site.js`](src/lib/site.js) — one file, one
source of truth.

| Field | Current value | Note |
| --- | --- | --- |
| `address` | 16 West Main Street, Wickford, RI 02852 | Confirmed against Toast & OpenTable slugs. |
| `phone` | (401) 294-5771 | From the restaurant's live site. Confirm. |
| `hours` | Closed Mon · Tue–Sat 11:30–20:30 · Sun 11:30–16:00 | From the OpenTable listing (Jul 2026). Confirm, esp. seasonal patio hours. |
| `email` / `careersEmail` | @tavernbytheseari.com | **Placeholders** — not registered. Set to real inboxes. |
| `social` | placeholder URLs | Point at the real Instagram/Facebook. |
| `siteUrl` | `https://tavernbytheseari.com` | Drives metadataBase, canonicals, sitemap, robots. Set to the real domain. |

The OpenTable `rid` (`1098700`) and all Toast links (gift cards, rewards,
online ordering) in `external` are the restaurant's real ones, read from its
current site. When `site.hours` changes, update `site.openingHoursSpec`
alongside it — the JSON-LD reads the latter and the two must not drift.

## Reservations, gift cards, ordering

- **`/reservations`** embeds the OpenTable widget ([`OpenTableWidget.jsx`](src/components/OpenTableWidget.jsx))
  keyed by `external.openTable.rid`. If the widget is blocked (ad blockers,
  strict tracking protection) it falls back to a "Book on OpenTable" link after
  6 seconds instead of leaving a blank box.
- **`/gift-cards`** links out to Toast for buying cards, checking a balance,
  joining rewards, and looking up points, plus an Order Online band.
- **Order Online** and **Reserve** are header buttons; the Toast/OpenTable
  links also live in the footer's "Order & Gift" column.

## Careers form

[`/careers`](src/app/careers/page.js) has an application form that emails each
submission via **Resend**, with an optional PDF résumé attached (no file
storage — the PDF rides along in the email).

- Copy [`.env.example`](.env.example) to `.env.local` and set `RESEND_API_KEY`
  (plus `CAREERS_TO` / `CAREERS_FROM`). **The `CAREERS_FROM` domain must be
  verified in Resend or sends fail.**
- Until the key is set, the form renders but tells applicants up front it can't
  deliver and points them at the email/phone — it never silently drops an
  application. The page is `force-dynamic` so adding the key later takes effect
  without a rebuild.
- Validation runs in the Server Action ([`actions.js`](src/app/careers/actions.js)):
  zod + a PDF magic-byte check (a file lying about its MIME type is rejected),
  subject-line header-injection scrubbing, and a `_gotcha` honeypot. On a
  validation error the applicant's typed values, selects and file are preserved
  (React 19 otherwise resets the form).

## Photos

Drop JPGs into `public/images/` using the filenames in
[`public/images/README.md`](public/images/README.md) and they appear — no code
change. Missing files render a scallop-watermarked placeholder rather than a
broken image, and `src/lib/photos.js` resolves what actually exists on the
server so a missing photo never fires a request at the image optimizer.

`hero-aerial.jpg` is in place. Note it is actually a **WebP file with a `.jpg`
extension** — Next's optimizer sniffs content rather than the extension so it works,
but renaming it to `.webp` (and updating the `photo()` call in `src/app/page.js` and
`src/app/patios/page.js`) would avoid confusing the next person. Eight slots remain.

## Backgrounds & texture

There are **no photographic backgrounds behind text**, deliberately. What exists:

- **`hero-scrim` / `page-scrim`** (`globals.css`) — the gradients that make hero copy
  legible over a photograph. These are not decoration; they are load-bearing. The
  values were tuned by sampling the real `hero-aerial.jpg` pixels behind each text
  box: worst-case ratios are wordmark 3.79 (needs 3.0), lede 4.74 and buttons 5.37
  (need 4.5). A plain top-to-bottom gradient measured **2.0:1** on the lede, because
  the hero copy lands right on the white umbrellas.
  **If you swap the hero photograph, re-check this** — a brighter picture will push
  the small type back under AA.
- **`grain`** — one seamless 160px desaturated `feTurbulence` tile (~300 bytes gzipped,
  reused by both variants), painted by a `::before` at 4% multiply. Applied to the sand
  bands only. The cream reading panels stay flat: grain on the lightest, most text-dense
  surface reads as a filter and erodes the display type.
- **`grain-light`** — same tile at 5% screen, for the dark teal panels.
- **`wash-deep`** — a soft radial lift on the flat teal panels so the dish circles have a
  ground to sit on. It lightens the background under the section blurb, which costs
  contrast: `cream/70` goes 5.46 → 5.00. Still passes AA, but don't strengthen it further.

Hero type is opaque on purpose. At 11px over a photograph, translucent text blends toward
whatever is behind it and destroys its own contrast — hierarchy comes from size and tracking.

### Contrast

Text is held to WCAG AA (4.5:1 for body, 3:1 for large/icons), verified by
sampling the actual composited pixels — including hero copy over the photograph.
Two decisions that keep it there:

- `brass` was darkened from `#b98a45` (2.9:1, failing) to **`#946322`** (4.9:1
  on cream). It carries every small eyebrow label and icon, which were the
  lowest-contrast marks on the site.
- Faint body/label text sits at `ink/70` or darker (5.2:1+); the old
  `ink/40`–`ink/55` steps all failed. If you add new muted text, `/70` is the
  floor on cream and sand.

## Search & social (SEO)

Driven off `siteUrl` and the `site` config, so updating those keeps SEO in sync.

- **Per-page metadata** — unique `<title>`, description, and self-referencing
  canonical on every route (`title.template` in `layout.js` appends the brand).
- **Structured data** — a full `Restaurant` JSON-LD block in `layout.js`:
  address, **geo coordinates**, `openingHoursSpecification` (Monday omitted =
  closed), `servesCuisine`, `priceRange`, `hasMenu`, `acceptsReservations` +
  a `ReserveAction` to OpenTable, `hasMap`, `areaServed`, and `sameAs` (only
  **verified** profiles — placeholder socials are filtered out).
- **Social cards** — a branded 1200×630 image generated by
  [`opengraph-image.js`](src/app/opengraph-image.js) (no design asset needed),
  reused for Twitter via [`twitter-image.js`](src/app/twitter-image.js). Every
  page inherits it; `og:title` is per-page.
- **`sitemap.xml`** and **`robots.txt`** are generated routes;
  `robots` metadata sets `max-image-preview:large`.
- **One `<h1>` per page**, including the home hero (the logo wordmark renders as
  `<h1>` via `Logo wordmarkAs="h1"`).

Before launch, the SEO that still needs real values: `siteUrl` (production
domain), the Instagram URL (excluded from `sameAs` until set), and confirming
the `site.geo` pin against the Google Business Profile.

## The logo

The scallop is generated geometrically, not traced: an ellipse arc scalloped
into seven lobes, flanks tapering to a flat hinge with ears, and ribs radiating
from the hinge cut as real holes (`fill-rule="evenodd"`) so the mark sits on any
background. It lives in [`src/components/Logo.jsx`](src/components/Logo.jsx).

- `<ScallopMark />` — icon alone, inherits `currentColor`
- `<Logo />` — mark + wordmark, side by side (header)
- `<Logo stacked />` — centred, with wave rule and town line (hero, footer)

Standalone exports for print, social and email signatures are in
`public/brand/`. The favicon is a simplified five-rib cut of the same geometry
(`src/app/icon.svg`) so it stays legible at 16px.

Palette (defined as Tailwind theme tokens in `src/app/globals.css`):

| Token | Hex | |
| --- | --- | --- |
| `brand` | `#14606b` | the teal carried over from the old sign |
| `brand-deep` | `#0f4a53` | dark sections |
| `seafoam` | `#9bd0d9` | the old sign's light teal, now an accent |
| `cream` | `#fbf8f2` | page background |
| `sand` | `#efe6d3` | alternating sections |
| `brass` | `#946322` | eyebrows, rules, small accents (darkened for AA) |

## Structure

```
src/
  app/          route per page (home, menu, patios, story, reservations,
                gift-cards, careers, contact) + careers/actions.js (Server
                Action) + icon.svg, not-found, sitemap.js, robots.js
  components/   Header, Footer, Logo, Photo, PageHero, Reveal, ui,
                OpenTableWidget, ApplicationForm
  lib/          site.js (config + external links) · menu.js (dishes) ·
                careers.js (form options) · photos.js (image resolver)
```

The menu is data, not markup — edit [`src/lib/menu.js`](src/lib/menu.js) and both
the menu page and its jump-nav update. A `price` of `null` renders as *market*.

Routes are static except `/careers` (dynamic, to read the Resend env flag at
request time). `sitemap.js` lists all eight pages; keep it in sync when adding
routes.
