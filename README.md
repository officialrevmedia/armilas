# Armila's Restaurant & Lounge — Website

> Hamilton's first authentic Afghan restaurant and lounge. Static site, fully SEO-optimized, ready for GitHub Pages.

Built by [revmedia](https://revmedia.ca) · Olive green theme · HD photography · Sports lounge positioning · Reservation form · Live Google Maps · Open Graph + JSON-LD structured data

---

## Quick Start (Deploy in 5 Minutes)

1. **Create a GitHub repo** (suggested: `armilaslounge-site`).
2. **Upload everything in this folder** — drag-drop into GitHub's web UI, or `git push`. Make sure hidden files like `.nojekyll`, `.gitignore`, and `.well-known/` come along.
3. **Settings → Pages → Source** → "Deploy from a branch" → `main` / `/ (root)` → **Save**.
4. **Done.** Site is live at `https://<username>.github.io/<repo-name>/` within 1–2 minutes.

For a custom domain (e.g. armilaslounge.com), see the [Custom Domain](#custom-domain) section below.

---

## File Structure

```
/
├── index.html              Homepage with sports section, events, reservation form
├── menu.html               Full menu with structured data
├── 404.html                Custom 404 page in brand style
│
├── assets/                 All images, logos, decorative graphics
│   ├── food-*.jpg/webp     Dish photography (HD, JPG + WebP)
│   ├── interior-lounge.*   Real interior shot
│   ├── logo-*.png          Transparent logos (horizontal, icon, stacked)
│   ├── og-image.jpg        1200×630 Open Graph social sharing image
│   ├── favicons/           Full favicon set (16, 32, 96, 192, 512 + Apple touch + Safari pinned tab)
│   ├── smoke-*.png         Atmospheric overlays
│
├── api/                    Cloudflare Worker for Instagram feed (optional)
│   ├── worker.js
│   ├── wrangler.toml
│   └── SETUP.md            Step-by-step Instagram API setup
│
├── .well-known/
│   └── security.txt        RFC 9116 security contact
│
├── _config.yml             Jekyll config (site metadata, for reference)
├── .nojekyll               Tells GitHub Pages to skip Jekyll (HTML is static)
├── manifest.webmanifest    PWA manifest for add-to-home-screen
├── browserconfig.xml       Windows tile config
├── robots.txt              Search engine directives
├── sitemap.xml             XML sitemap with image annotations
├── humans.txt              Team credits
├── README.md               This file
└── .gitignore              Standard ignores
```

---

## SEO Features (Already Built In)

Every page ships with:

- **Title + meta description** with target keywords
- **Canonical URL** to prevent duplicate content
- **Open Graph tags** (og:title, og:description, og:image, og:url, og:type=restaurant)
- **Twitter Card** (summary_large_image)
- **Geo meta** (ICBM coordinates, region, placename)
- **Theme color** for mobile browser chrome
- **Apple touch icon** + **Safari pinned tab** + **Microsoft tile**
- **Favicons** at every standard size (16, 32, 96, 192, 512, plus .ico)
- **PWA manifest** so guests can add to home screen
- **Custom 1200×630 OG image** for social sharing previews

### Structured Data (JSON-LD)

The homepage embeds five Schema.org structured data blocks:

1. **Restaurant** — full business info, hours, cuisine, amenities, opening hours specification, accepts reservations, sameAs profiles
2. **Organization** — logo, contact point, social links
3. **WebSite** — site name, language
4. **FAQPage** — all 8 FAQs as rich-result-eligible Q&A
5. **BreadcrumbList** — navigation breadcrumbs

The menu page adds:

1. **Menu** — every dish with name, description, dietary tags, price, currency
2. **BreadcrumbList**

This makes the restaurant eligible for:
- Knowledge panel in Google Search
- Rich results (FAQ accordion in SERPs)
- Restaurant carousel in Google Maps
- Menu items in Google rich results
- Voice assistant queries ("Hey Google, when is Armila's open?")

Validate at: [search.google.com/test/rich-results](https://search.google.com/test/rich-results)

---

## After Deploy: Two Things to Wire Up

### 1. Reservation Form (Formspree — 2 minutes, free)

The form currently submits to a Formspree placeholder URL. To activate:

1. Sign up at [formspree.io](https://formspree.io) (free: 50 submissions/month).
2. Create a new form, point it at `info@armilaslounge.com`.
3. Copy your form ID (e.g. `xpwzrgbn`).
4. In `index.html`, find:
   ```html
   <form ... action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```
5. Replace `YOUR_FORM_ID` with your actual ID.

**Fallback behavior:** Until you set this up, the form falls back to `mailto:info@armilaslounge.com` with all fields pre-filled — guests can still submit, it just opens their email client.

### 2. Instagram Feed (Cloudflare Worker — 15 minutes, free)

The Instagram grid currently shows curated food photos as placeholders. To pull live posts from @armilaslounge, see `api/SETUP.md` for the walkthrough. Quick version:

1. Convert Instagram to Business account, link to Facebook Page
2. Create Meta app, generate long-lived access token
3. Deploy `api/worker.js` to Cloudflare Workers (free tier)
4. In `index.html`, replace `YOUR-SUBDOMAIN` in `INSTAGRAM_API_URL` with your worker subdomain

**Fallback:** The grid stays graceful — six curated food photos linking to your IG profile.

---

## Custom Domain

To point armilaslounge.com at GitHub Pages:

### Step 1: Tell GitHub which domain you want

1. **Settings → Pages → Custom domain** → enter `armilaslounge.com` → Save.
2. GitHub will create a `CNAME` file in your repo. (If you prefer, manually add a `CNAME` file at the root with just `armilaslounge.com` on a single line — same result.)

### Step 2: Update DNS at your registrar

Add four A records pointing the root domain to GitHub Pages:

| Type | Name | Value             |
|------|------|-------------------|
| A    | @    | 185.199.108.153   |
| A    | @    | 185.199.109.153   |
| A    | @    | 185.199.110.153   |
| A    | @    | 185.199.111.153   |

If you also want `www.armilaslounge.com` to work:

| Type  | Name | Value                       |
|-------|------|-----------------------------|
| CNAME | www  | `<username>.github.io.`     |

### Step 3: Wait + Enforce HTTPS

DNS propagation takes 1 hour to 48 hours. Once Pages confirms the domain ("DNS check successful"), tick **Enforce HTTPS** in **Settings → Pages**.

---

## Submitting to Search Engines

After your site is live and the domain is connected:

1. **Google Search Console** → [search.google.com/search-console](https://search.google.com/search-console) → Add property → verify ownership → submit `https://armilaslounge.com/sitemap.xml`.
2. **Bing Webmaster Tools** → [bing.com/webmasters](https://www.bing.com/webmasters) → Add site → submit sitemap.
3. **Google Business Profile** → make sure the listing for Armila's points to `armilaslounge.com` and uses consistent NAP (Name, Address, Phone). The structured data in the site matches your Google profile to reinforce ranking signals.
4. **Test rich results** → [search.google.com/test/rich-results](https://search.google.com/test/rich-results) → enter `https://armilaslounge.com/` to confirm Restaurant + FAQ schemas validate.

---

## Updating Content

Everything is plain HTML and CSS — no build step, no framework. To update:

| What | Where |
|------|-------|
| Menu items / prices | `menu.html` (visible) AND the JSON-LD Menu schema in `menu.html` head |
| Dish cards on homepage | `index.html` — section with class `signature` |
| Hours | `index.html` — search `.hours` (visible) AND `openingHoursSpecification` in JSON-LD AND `_config.yml` |
| Phone / address / email | Search-replace `(289) 674-9692`, `2200 Rymal`, `info@armilaslounge.com` across all files |
| Promo bar text | `index.html` → top → `<div class="promo-bar">` |
| Images | Drop new JPG/WebP in `/assets/`. Generate WebP from JPG with: `convert input.jpg -quality 88 output.webp` |
| Open Graph image | Replace `/assets/og-image.jpg` with new 1200×630 image |
| Favicons | Replace files in `/assets/favicons/`. Generate from source PNG: `convert source.png -resize 32x32 favicon-32x32.png` |
| Page title / description | Top of `<head>` in each HTML file |

When updating prices on menu, update **both** the visible HTML **and** the JSON-LD schema block at the top of `menu.html` so search engines see the same prices guests do.

---

## Analytics (Add When Ready)

To track visits, add Google Analytics or Plausible by inserting the tag inside `<head>` of `index.html`, `menu.html`, and `404.html`. The site does not currently include any tracking — fast page loads, zero cookie banners needed.

For Google Analytics 4, get your measurement ID and insert:

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

For Plausible (privacy-friendly, no banner needed in EU):

```html
<script defer data-domain="armilaslounge.com" src="https://plausible.io/js/script.js"></script>
```

---

## Browser Support

Modern browsers (Chrome, Safari, Firefox, Edge — last 2 years). Uses CSS Grid, custom properties, `backdrop-filter`, IntersectionObserver. Graceful degradation on older browsers — site stays readable, animations simplify.

---

## Performance Notes

- All food photography is delivered as **WebP** (~30-40% smaller than JPG at same quality) with JPG fallbacks kept in `/assets/` for older browsers
- Hero image is **preloaded** so it paints fast
- Google Fonts use `display=swap` to avoid blocking render
- Lazy-loading on all gallery and below-fold images
- No JavaScript frameworks, no build step, no bundler — total page weight is mostly images
- Animations use GPU-accelerated `transform` and `opacity` only — no layout thrashing

---

## License & Credits

Code © revmedia. Photography © Armila's Restaurant & Lounge. Use freely for armilaslounge.com.

Fonts: [Cormorant Garamond](https://fonts.google.com/specimen/Cormorant+Garamond) (SIL OFL), [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) (SIL OFL).

---

**© 2026 Armila's Restaurant & Lounge · 2200 Rymal Road East, Hamilton, ON · (289) 674-9692**
