# Photos

Drop JPGs in this folder with the exact filenames below and they appear on the
site immediately — no code change needed. Any file that is missing falls back to
a scallop-watermarked plate, so the layout never breaks.

| Filename | Where it appears | Crop |
| --- | --- | --- |
| `hero-aerial.jpg` | Home hero, Patios hero | Landscape, ≥2400px wide. The drone shot. |
| `upper-patio.jpg` | Home, Patios | Portrait 4:5 works best |
| `lower-patio.jpg` | Home, Patios | Portrait 4:5 |
| `bar.jpg` | Home, Patios | Portrait 4:5 |
| `story.jpg` | Home, Story hero | Portrait 4:5 |
| `exterior.jpg` | Story, Contact hero | Portrait 3:4 |
| `dish-octopus.jpg` | Home | Square — it is masked to a circle |
| `dish-branzino.jpg` | Home, Menu hero | Square + landscape both used; shoot wide |
| `dish-lamb.jpg` | Home | Square |

Export at roughly 2× the display size and let `next/image` do the resizing.
Anything over ~3000px on the long edge is wasted bytes.
