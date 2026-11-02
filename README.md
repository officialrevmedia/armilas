# armilaslounge.com

Static site for Armila's Restaurant & Lounge, hosted on GitHub Pages. Every page is complete HTML when it reaches the browser, so search engines see all content without running JavaScript.

## Deploy

1. Upload everything in this folder to the repository root, including the hidden files `.nojekyll`, `.gitignore` and the `.well-known` folder.
2. Settings > Pages > Deploy from a branch > `main` / root.
3. Keep the `CNAME` file. It points the site at `armilaslounge.com`. Tick **Enforce HTTPS** once the domain check passes.

## Pages

| URL | File |
|---|---|
| `/` | `index.html` |
| `/menu.html` | `menu.html` |
| `/catering.html` | `catering.html` |
| `/privacy.html` | `privacy.html` |
| any missing URL | `404.html` (served by GitHub Pages with a 404 status, `noindex`) |

## After the site is live

1. **Inquiry form.** Submit one test inquiry on `/catering.html`. FormSubmit sends an activation email to info@armilaslounge.com. Click the link in the newest activation email once and every later inquiry arrives by email. If FormSubmit is slow or down, the form stops waiting after 20 seconds and offers the visitor a prefilled email or the phone number instead.
2. **Google Analytics.** Paste the GA4 Measurement ID (`G-...`) into the first line of `assets/js/site.js`. Nothing loads until it is set.
3. **Search Console.** Add a Domain property for `armilaslounge.com`, verify with the DNS TXT record, then submit `https://armilaslounge.com/sitemap.xml`.
4. **Google Business Profile.** Website `https://armilaslounge.com/`, menu link `https://armilaslounge.com/menu.html`.

## Holiday catering offer

The 10% catering offer appears in four places. Remove or change all four when the season ends:

- the promo bar at the top of every page (`index.html`, `menu.html`, `catering.html`, `privacy.html`, `404.html`, the line with class `promo`)
- the offer box on `catering.html` under the intro, plus the "before the 10% holiday discount" note above the packages table and the "with the 10% holiday discount included" line above the form
- the offer box in the catering section of `index.html`

## Editing

- **Prices and dishes** appear twice in `menu.html`: in the visible menu and in the `Menu` JSON-LD block in the `<head>`. Change both.
- **Hours** appear in the visible tables and footers, the `Restaurant` JSON-LD in `index.html`, and the `hours-data` script near the bottom of `index.html` (which drives the "Open now" line).
- **FAQ answers** on `index.html` and `catering.html` appear in the visible questions and in the `FAQPage` JSON-LD. Keep them word for word the same.
- **Styles** live in `assets/css/site.css`, scripts in `assets/js/site.js`. After changing either, bump the `?v=` number in each page's `<head>` so browsers fetch the new file.
- **Images** are WebP in `assets/img`, in several widths per photo. Keep `width` and `height` on every `<img>` so the page does not shift while loading.

## Credits

Built by RevMedia. Fonts: Cormorant Garamond and Plus Jakarta Sans (SIL Open Font License, licences in `assets/fonts`). Photography (c) Armila's Restaurant & Lounge.
