# Sunway Admissions Ambassadors (SAA) — Official Website

A static, dependency-free site for Sunway Admissions Ambassadors: a student-led
community supporting Sunway University's admissions engagement, campus tours,
open days, and mentorship.

## Structure

```
docs/index.html        Single-page site (About, What We Do, Join Us, Moments, Connect)
docs/css/styles.css     All styling — colors/fonts live in the CSS variables at the top
docs/js/main.js         Nav, scroll-spy, carousel, tilt/parallax/marquee, count-up, scroll-reveal
docs/assets/            Real SAA logo (logo.png) and favicon/icon mark (favicon.png)
docs/.nojekyll          Tells GitHub Pages to serve the folder as-is, skip Jekyll processing
```

Everything lives under `docs/` because this repo's GitHub Pages source is
configured as "Deploy from a branch" → `main` → `/docs`. **If that Pages
source setting is ever changed to `/ (root)`, this folder must move back to
the repo root to match**, or the site will 404.

No build step or dependencies. Fonts load from Google Fonts; the real logo
lives in `docs/assets/`, everything else (nav icons, social icons) is inline SVG.

## Running locally

Open `docs/index.html` directly in a browser, or serve it:

```bash
cd docs && python3 -m http.server 8000
```

## Deploying

This is a plain static site — GitHub Pages is enabled on this repo, serving
`main` → `/docs` (see Structure above for why the files live there). Every
push to `main` triggers a `pages-build-deployment` Action; check
Settings → Pages or the Actions tab if a change doesn't show up live — the
`.nojekyll` file bypasses Jekyll processing entirely, which is what a
previous deploy failure here was caused by (Jekyll's SCSS converter choking
on a source-folder mismatch), so builds should just copy files straight
through.

## Interactive/visual pass

Beyond the base structure, the page has a light layer of motion and texture
so it doesn't read as a flat template:

- **Hero**: an infinite marquee of the "what ambassadors do" tags, plus a
  subtle scroll-linked parallax on the background glow (both skipped under
  `prefers-reduced-motion`).
- **At-a-glance stat band**: a gold band under the hero that count-up
  animates three real, derivable facts — the number of program cards in
  What We Do, the number of social channels in Connect, and the next Open
  Day Series year — not fabricated impact metrics.
- **Moments gallery**: textured diagonal-stripe pattern + a faint icon per
  card instead of flat gradient placeholders.
- **Pull-quote break**: a full-width editorial typographic moment between
  Join and Voices.
- **Testimonial carousel**: auto-rotating (pauses on hover/focus, disabled
  under reduced motion), with prev/next buttons and dots.
- **Card tilt + magnetic buttons**: pointer-following 3D tilt on the About
  pillars and What We Do program cards, and a magnetic pull on the primary
  CTAs — both gated to fine-pointer, motion-safe devices only (`.no-tilt`
  class on `<body>` is the CSS fallback for touch/reduced-motion).

## Crawl findings (folded in from HANDOFF.md)

A follow-up, network-enabled session crawled the reference sources listed in
the original handoff and applied what could be verified:

- **Real recruitment forms found on Linktree** — these now drive the
  primary CTAs in `#join` and `#open-day`:
  - Ambassador/volunteer registration: https://forms.gle/u4fjiJt9wT9HAtJ68
  - Section Leader registration: https://forms.gle/GNQfNoEVJJDTGpT39
  - Both are labelled "...for Sunway Education August 2026 Open Day," which
    also confirms the current Open Day Series intake — `#open-day`'s
    `.band-meta` now reads "Sunway Education Open Day — August 2026" /
    venue "Sunway University Campus." The exact date wasn't published on
    Linktree, so it's still marked `[Exact date TBC]`.
  - A photo archive (Google Drive folder) was also found and linked from
    `#moments` as a stopgap until real images are embedded.
- **sunwayssa.org** (structural reference — note: this is Sunway *Student*
  Ambassadors, a related but separate program from Sunway *Admissions*
  Ambassadors) confirmed the general shape already used here: hero →
  mission/objectives cards → team/events showcase → social footer. Its own
  visual identity is a dark navy/white theme with gold accents in the logo,
  which doesn't necessarily carry over to SAA's own brand — see palette
  note below.
- **Instagram** (`@sunway_saa`) — consistently blocked crawling with
  HTTP 429 across multiple attempts. Bio text, Highlights, and profile
  colors remain unverified.
- **LinkedIn / Xiaohongshu** — no verbatim About/bio text could be
  confirmed with confidence (LinkedIn's company page has no dedicated About
  copy; the Xiaohongshu bio came back as a short operating-hours line
  rather than a tagline). Both point to the same conclusion: there isn't a
  distinct "brand voice" paragraph on these channels to adopt in place of
  the hero/About copy already written here.
- **Brand colors** — no reliable hex values were recoverable. Fetched
  descriptions of the LinkedIn banner ("blue/teal") and sunwayssa.org
  ("navy/gold") actively conflict with each other and with the current
  maroon/gold placeholder, and none came from actual pixel sampling — just
  a text-summarization pass over page content. **Palette left unchanged**
  rather than overwritten on low-confidence input; a real logo file or a
  brand guide PDF is needed to do this properly.
- **pottglasses.com** — re-confirmed as a single-location landing page
  (nav + booking CTA + FAQ + map/click-to-call), unlike SAA's
  recruitment/community structure. The original decision to model this
  site on sunwayssa.org instead stands.

## Content still to replace

The site ships with clearly-scoped placeholders so the structure and design
are ready to go live the moment real content is dropped in:

- **`docs/css/styles.css` `:root`** — palette is still a Sunway-red-inspired
  placeholder (`--maroon-*`, `--gold-*`). The real logo (`docs/assets/logo.png`,
  `docs/assets/favicon.png`) is now in use in the header/footer/favicon, but
  it's monochrome black-on-white ink, so it doesn't settle the brand color
  question — crawling turned up no reliable hex values either (see above).
  Swap the palette for the official brand colors once a brand guide or a
  colored logo variant is available.
- **`#voices` section** — sample testimonial quotes in an auto-rotating
  carousel. Replace the three `.quote-card` blocks with real ambassador
  quotes once collected.
- **`#moments` section** — textured gradient placeholder cards (with icon
  overlays) standing in for a photo gallery. Swap each
  `<figure class="moment-card ...">` for a real `<img>` of the captioned
  event; a source photo archive is already linked from this section as a
  stopgap.
- **Footer contact** — no official contact email was available; currently
  points visitors to Instagram DM / Linktree. Replace the `TODO` in
  `docs/index.html` once one exists.
- **`#open-day` section** — a reusable template for the Sunway Education
  Open Day Series, refreshed each intake. The August 2026 intake's
  `Series`/`Venue` are now filled in from the real registration forms;
  update the `Date` field once Sunway Admissions publishes it, and swap the
  "Go to Sunway Admissions" link's placeholder URL (`sunway.edu.my`) for
  the exact Open Day registration page once one exists. This section
  deliberately does **not** capture attendee leads on this site — SAA's own
  site recruits ambassadors to staff the event; the actual event
  registration is owned and hosted by Sunway Admissions/Marketing
  elsewhere.
- **Social links** — already wired to the real, current channels:
  [Instagram](https://www.instagram.com/sunway_saa),
  [LinkedIn](https://www.linkedin.com/company/sunway-admissions-ambassador/),
  [Xiaohongshu](https://www.xiaohongshu.com/user/profile/60d4b500000000000100b4c3),
  [Linktree](https://linktr.ee/sunwayadmissionambassador).
