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
source of truth. **These are placeholders. Verify all of them.**

| Field | Current value | Note |
| --- | --- | --- |
| `address` | 16 West Main Street, Wickford, RI 02852 | Believed correct — confirm. |
| `phone` | (401) 555-0100 | Fictional. `555-01xx` is the reserved range. |
| `email` | hello@tavernbytheseari.com | Not registered. |
| `social` | placeholder URLs | Point at the real profiles. |
| `hours` | Mon–Sun | Confirm, including seasonal patio hours. |
| `metadataBase` | `https://tavernbytheseari.com` | In `src/app/layout.js`. Set to the real domain. |

Set `reservationsUrl` to an OpenTable/Resy link and every **Call to Reserve**
button becomes **Reserve a Table** and points at the booking flow. Until then it
is a `tel:` link, so it is never a dead button.

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

### Known contrast debt

Independent of the above, some small text on light backgrounds is already below WCAG AA
and was left alone rather than silently restyle the brand:

| Text | Ratio | Needs |
| --- | --- | --- |
| `brass` eyebrows on cream | 2.92 | 4.5 |
| `brass` eyebrows on sand | 2.50 | 4.5 |
| `ink/45` eyebrows, `ink/40` price `$` | 2.65 / 2.34 | 4.5 |
| `ink/55` menu descriptions | 3.46 | 4.5 |
| `ink/50` hours note | 3.02 | 4.5 |

Fixing means darkening `brass` (or reserving it for large display accents) and lifting the
`ink/xx` steps. Worth doing before launch.

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
| `brass` | `#b98a45` | eyebrows, rules, small accents |

## Structure

```
src/
  app/          route per page + icon.svg + not-found
  components/   Header, Footer, Logo, Photo, PageHero, Reveal, ui
  lib/          site.js (config) · menu.js (dishes) · photos.js (resolver)
```

The menu is data, not markup — edit [`src/lib/menu.js`](src/lib/menu.js) and both
the menu page and its jump-nav update. A `price` of `null` renders as *market*.
