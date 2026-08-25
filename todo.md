# Site Todo

## Pending

### Services restructure — drafted 2026-08-22, awaiting sign-off
- [ ] Drop "Deep Dive", replace with an unpriced third card
  - **Why:** the Deep Dive line "ideal when your piano hasn't been serviced in years" describes almost every
    old upright, so a caller self-selected $450+ when they needed Full Service. Also can't honestly quote
    regulation/voicing sight-unseen. Full Service becomes the diagnostic starting point; quote further work after.
  - **OPEN QUESTION:** third card name — "Additional Work" (unambiguous, better for ad traffic) vs
    "Beyond the Tuning" (better brand voice). Needs a decision before applying.
  - **Watch:** Deep Dive currently anchors $250 as moderate. Without it, $250 becomes the ceiling — the third
    card must convey real depth (regulation, voicing, action work) so the range stays visible without a number.

  Files to change (all five, or they contradict each other):
  - [ ] `index.html:97` — Deep Dive card
  - [ ] `_includes/head.html:143` — `hasOfferCatalog`: drop the 3rd offer, keep 2 priced ones (don't list a
        priceless Offer); update Basic Tune + Full Service descriptions
  - [ ] `_layouts/location.html:17` — `offers` JSON-LD (hits all 27 location pages)
  - [ ] `_layouts/location.html:50` — `loc-service` card
  - [ ] `_drafts/how-much-does-piano-tuning-cost-portland.md` — unpublished pricing post, fix before publishing
  - [ ] CSS: `.package-price` / `.package-deep-dive` assume a short string like "$450+". "Quoted after a visit"
        is much longer — check wrapping/sizing, don't assume it fits.

  Approved copy direction (homepage cards):
  - **Full Service — $250 — Recommended:** "The right choice for almost every piano, and the best place to
    start if I haven't seen yours before. Tuning plus whatever else it needs that day — touch, tone,
    lubrication, minor repairs."
  - **Basic Tune — $175:** "Best as a return visit, once your piano is on a regular tuning schedule and
    holding well. A straightforward tuning — nothing more needed."
  - **Third card — Quoted after a visit:** "Regulation, voicing, action work, and larger repairs — each quoted
    on its own. Start with a full service visit; once I've seen your piano I'll tell you what it needs and
    what it would cost."

  Location-page cards run longer — full drafts were written for those too (Basic Tune reframed as the
  maintenance visit; Full Service adds "the right starting point if your piano hasn't been seen in a while").

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
- [x] Add "piano tuner" to home page title and meta description
- [x] Google Business Profile — update description, add services, upload logo, set hours (Q&A discontinued by Google Dec 2025)
- [x] Switch body font to Spectral
- [x] Add Google rating badge to hero (stars animate on scroll)
- [x] Rebuild favicon from new SVG logo (rsvg-convert, transparent PNGs)
- [x] Add 1200px schema logo, update structured data
- [x] Switch to SVG logo (logo-mark-new.svg) across all references
- [x] Add TJ Thompson review, remove Lisa S.
