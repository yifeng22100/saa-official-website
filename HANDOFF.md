# Handoff: crawl the reference sources, then fold findings back in

## Why this file exists

The session that built this site runs in an environment whose network egress
is locked to GitHub only — it could not fetch any of the reference URLs
below directly. Everything currently in `index.html` is built from general
knowledge of this site category plus the real social URLs supplied in the
task, not from crawled content. This doc is the handoff so a
network-enabled session can close that gap.

## Repo state as of this handoff

- Branch: `claude/saa-website-design-j69uax`
- PR: https://github.com/yifeng22100/saa-official-website/pull/1 (open, draft)
- `index.html` / `css/styles.css` / `js/main.js` — full site already built
  and pushed. Sections: Hero, About, What We Do, Open Day Series, Join Us,
  Voices (testimonials), Moments (gallery), Connect (socials).
- Palette (`css/styles.css` `:root`) is a Sunway-red-inspired **placeholder**,
  not verified against any real brand guide.
- `README.md` lists everything currently marked placeholder.

## Strategic decisions already made — don't relitigate without new evidence

1. **Structural reference = sunwayssa.org**, not pottglasses.com. The latter
   is a single-CTA ad-conversion landing page for a retail store (book an
   eye test); SAA is a recruitment/community site, so sunwayssa.org (same
   category: university student-ambassador program) is the right structural
   model.
2. **Open Day Series scope**: SAA's own site recruits/stages ambassadors to
   staff the event. It deliberately does NOT capture prospective-student
   leads — that funnel is owned by Sunway Admissions/Marketing elsewhere.
   The `#open-day` section has two separated CTAs: "Volunteer as an
   Ambassador" (primary) and a hand-off link to Sunway Admissions (currently
   a placeholder pointing at `sunway.edu.my`) for attendees who land here by
   mistake.

## Sources to crawl, and exactly what to pull from each

1. **https://www.sunwayssa.org/** — primary structural reference. Pull: nav
   items, section order/headings, copy tone, CTA wording, imagery style,
   color/branding cues, how they present team/events, footer structure.
2. **https://www.instagram.com/sunway_saa** — pull: bio text/tagline exactly
   as written, visual style and colors used in the grid/profile photo, any
   Highlights categories (e.g. "Join Us", "FAQ", "Events") and what's in them.
3. **https://www.linkedin.com/company/sunway-admissions-ambassador/** —
   pull: the About/description text verbatim, tagline, logo/banner image,
   themes of recent posts.
4. **https://www.xiaohongshu.com/user/profile/60d4b500000000000100b4c3** —
   pull: bio text (translate if needed), content themes.
5. **https://linktr.ee/sunwayadmissionambassador** — pull **every link and
   its label**. Specifically check whether a real recruitment/application
   form URL exists here — if so, it should replace the current "Message Us
   on Instagram" CTA in the `#join` section.
6. **https://pottglasses.com/optical-shop-subang-jaya/** — optional, lower
   priority. Only worth confirming the structural read used to justify
   *not* copying it (single CTA, minimal nav, urgency/offer copy, map,
   click-to-call) is accurate.

## What to bring back / apply

- Real brand colors and logo, if visible anywhere (Instagram profile photo,
  LinkedIn banner, Linktree theme) → replace the placeholder palette in
  `css/styles.css`.
- Real bio/tagline copy from their own channels → replace inferred hero and
  About copy in `index.html` so the site matches their actual voice.
- A real application/recruitment form URL, if one exists → replace the
  Instagram-DM CTA in `#join`.
- Any real, currently-running Open Day Series details (series name, date,
  venue) → fill the `.band-meta` placeholders in `#open-day`.
- Description of real event photography worth sourcing later for the
  `#moments` gallery (can't hotlink external images directly — describe
  what exists so real files can be uploaded).

## How to hand results back

If this session has write access to the repo: apply the findings directly
on `claude/saa-website-design-j69uax` and push — PR #1 picks it up
automatically (it's being watched).

If not: report a structured summary (quoted copy, hex codes, URLs found) so
it can be pasted back into the original conversation
(`session_01UQs3GtJLSZTqkyZ4LmVTu9`) for that session to apply.

Delete this file once the handoff is complete — it's a working note, not
permanent site documentation.
