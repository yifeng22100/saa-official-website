# Sunway Admissions Ambassadors (SAA) — Official Website

A static, dependency-free site for Sunway Admissions Ambassadors: a student-led
community supporting Sunway University's admissions engagement, campus tours,
open days, and mentorship.

## Structure

```
index.html        Single-page site (About, What We Do, Join Us, Moments, Connect)
css/styles.css     All styling — colors/fonts live in the CSS variables at the top
js/main.js         Mobile nav, scroll-spy nav highlighting, scroll-reveal animations
```

No build step or dependencies. Fonts load from Google Fonts; everything else
(icons, logo mark) is inline SVG.

## Running locally

Open `index.html` directly in a browser, or serve it:

```bash
python3 -m http.server 8000
```

## Deploying

This is a plain static site — it deploys as-is to GitHub Pages, Netlify,
Vercel, or Cloudflare Pages with no build command. For GitHub Pages: enable
Pages on this repo pointed at the branch/root, no config needed.

## Content still to replace

The site ships with clearly-scoped placeholders so the structure and design
are ready to go live the moment real content is dropped in:

- **`css/styles.css` `:root`** — palette is a Sunway-red-inspired placeholder
  (`--maroon-*`, `--gold-*`). Swap for the official brand hex values and, if
  available, an actual SVG/PNG logo in place of the inline "SA" monogram.
- **`#voices` section** — sample testimonial quotes. Replace with real
  ambassador quotes once collected.
- **`#moments` section** — gradient placeholder cards standing in for a
  photo gallery. Swap each `<figure class="moment-card ...">` for a real
  `<img>` of the captioned event.
- **Footer contact** — no official contact email was available; currently
  points visitors to Instagram DM / Linktree. Replace the `TODO` in
  `index.html` once one exists.
- **`#open-day` section** — a reusable template for the Sunway Education
  Open Day Series, refreshed each intake. Update the `Series` / `Date` /
  `Venue` fields in the `.band-meta` block, and swap the "Go to Sunway
  Admissions" link's placeholder URL (`sunway.edu.my`) for the exact Open
  Day registration page once one exists. This section deliberately does
  **not** capture attendee leads on this site — SAA's own site recruits
  ambassadors to staff the event; the actual event registration is owned
  and hosted by Sunway Admissions/Marketing elsewhere.
- **Social links** — already wired to the real, current channels:
  [Instagram](https://www.instagram.com/sunway_saa),
  [LinkedIn](https://www.linkedin.com/company/sunway-admissions-ambassador/),
  [Xiaohongshu](https://www.xiaohongshu.com/user/profile/60d4b500000000000100b4c3),
  [Linktree](https://linktr.ee/sunwayadmissionambassador).
