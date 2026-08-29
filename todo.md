# Site Todo

## Pending

### `/piano-repair/` landing page — scoped 2026-08-28, not yet built
- **Why:** audit found "piano repair" present sitewide only as a secondary item inside service-card bullet
  lists and JSON-LD arrays — never in an H1, meta description, or URL. "Piano repairman" doesn't appear
  anywhere. Several Ads terms are repair-flavored with real volume (`piano repairman` 1K–10K,
  `piano repair and tuning near me`, `fix piano near me`, `broken keys`, `sticky key`, `stuck keys`,
  `upright piano repair near me`) and all currently land on the homepage or a location page — weak message
  match, which hurts Quality Score as much as organic ranking.
- Same build pattern as Grand/Upright, reusing what's already in place: `_includes/service-cards.html`,
  `trust-strip.html`, `piano-cta.html`, `piano-capabilities.html` (or a repair-specific equivalent — the
  "What I do" list may not fit a repair-only page as-is), and the `.piano-type-intro` / `.piano-type-photo`
  / `.piano-type-note` CSS. No new conversion wiring needed — click-to-call and the contact-form conversion
  are already delegated sitewide in `_includes/scripts.html`.
- Content must be repair-specific and NOT invented: sticky/broken keys, buzzing, action issues, broken
  strings, phrased the way people actually search — not the generic "minor repairs" bullet already used
  elsewhere. A photo needs a real transparent-background source like grand/upright had (genuine alpha,
  verified by sampling pixel values, not just a format that supports it — see how those two were checked).
- Internal linking, matching how grand/upright were wired in: add a third item to the footer's
  "Grand Pianos · Upright Pianos" line, a note in the homepage services section, and the location-page
  cross-link line (all 27, via `_layouts/location.html`).
- Once live, point the Ads ad groups carrying the repair-flavored terms above at this page instead of the
  homepage/location pages they currently use.

- [ ] Fix `_drafts/how-much-does-piano-tuning-cost-portland.md` before publishing — still built entirely
      around the old three-tier "Deep Dive $450+" pricing (title, description, excerpt, and a whole section).
      Needs a real rewrite to match the new "Beyond the Tuning, quoted after a visit" structure, not a
      find-replace. Unpublished (`_drafts/`), so not live, but will contradict the site the moment it's moved
      to `_posts/`.
- [x] Review and update About page
- [ ] Add client-as-hero photo gallery to About page
- [ ] Add "more services" section/pages: voicing, regulation, pitch raise, cleaning, humidity control
- [ ] Consider dedicated SEO landing pages per service (e.g. /piano-regulation-portland/)
- [x] Get to 15–20 Google reviews before running ads
- [ ] Commission client-as-hero photography (someone at piano post-tuning)
- [ ] Write first blog post (piano care, humidity, tuning frequency)
- [ ] Blog: "Should I get a free piano?"
- [ ] Blog: "How much does piano tuning cost?"
- [ ] Blog: "What to look for when buying a used piano"
- [ ] Blog: "Should I repair or replace my old piano?"
- [ ] Blog: "Can I tune my own piano?"
- [ ] Blog: "My piano has sticky keys — what causes it?"
- [ ] Blog: "What is piano regulation?"
- [ ] Blog: "What is piano voicing?"
- [ ] Blog: "What is a pitch raise — and will I need one?"
- [ ] Blog: "Why do pianos go out of tune?"
- [ ] Blog: "Upright vs. grand — does it actually matter?"
- [ ] Blog: "What piano brands are worth buying used?"
- [ ] Blog: "How to choose a piano tuner"
- [ ] Blog: "How to prepare for a piano tuner visit"

## Done
- [x] Build `/grand-piano-service/` and `/upright-piano-service/` (2026-08-29) — landing pages for the
      "grand piano service" / "upright piano service" Ads terms. Real photos with genuine transparent
      backgrounds (drop-shadow follows the actual silhouette, not a boxed rectangle), capabilities list,
      reused pricing cards, trust strip, FAQ, and cross-links between the two pages. Also linked from the
      footer and all 27 location pages. Along the way, extracted `_includes/service-cards.html`,
      `trust-strip.html`, `piano-cta.html`, and `piano-capabilities.html`, now shared with the homepage and
      location pages too instead of being duplicated a third time.
      STILL OPEN: point the Ads ad groups targeting these two keyword sets at these URLs instead of the
      homepage — that's a change in the Ads UI, not something done here.
- [x] Drop "Deep Dive" tier, replace with "Beyond the Tuning" (quoted after a visit) — homepage cards,
      all 27 location-page cards, and both JSON-LD offer lists. Reframed Basic Tune as the return-visit
      tier and Full Service as the starting point for anyone new. Verified price-slot text wraps cleanly
      at desktop and mobile widths on both card layouts.
- [x] Add "piano tuner" to home page title and meta description
- [x] Google Business Profile — update description, add services, upload logo, set hours (Q&A discontinued by Google Dec 2025)
- [x] Switch body font to Spectral
- [x] Add Google rating badge to hero (stars animate on scroll)
- [x] Rebuild favicon from new SVG logo (rsvg-convert, transparent PNGs)
- [x] Add 1200px schema logo, update structured data
- [x] Switch to SVG logo (logo-mark-new.svg) across all references
- [x] Add TJ Thompson review, remove Lisa S.
