# Site Todo

## Pending

- [ ] Point the Ads ad groups for repair-flavored terms (`piano repairman`, `piano repair and tuning near
      me`, `fix piano near me`, `broken keys`, `sticky key`, `stuck keys`, `upright piano repair near me`)
      at `/piano-repair/` instead of the homepage/location pages they currently use — Ads-UI task, not a
      site change. Same still-open reminder applies to the grand/upright ad groups (see Done below).
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
- [x] Build `/piano-repair/` (2026-08-29) — landing page for repair-flavored Ads terms and the
      "piano repairman" search term specifically. Own repair-specific bullet list rather than reusing the
      generic capabilities include (didn't fit a repair-only page), a real photo (Jacob's own tool kit,
      grayscale + box-shadow — a normal opaque photo, not a cutout, so it reuses the site's standard photo
      treatment rather than grand/upright's drop-shadow silhouette trick), reused pricing cards, trust
      strip, FAQ with a "tuner vs. repairman" question. Linked from the footer (now 3 items), the homepage
      services note, and the location-page cross-link line (all 27) alongside grand/upright.
      STILL OPEN: point the Ads ad groups for the repair-flavored terms at this URL — see Pending above.
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
