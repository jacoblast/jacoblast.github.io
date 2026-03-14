# CLAUDE.md — Frontend Website Rules

## Always Do First
- **Invoke the `frontend-design` skill** before writing any frontend code, every session, no exceptions.
- **Never automatically commit or push.** Always use the `/commit` skill to commit and the `/push` skill to push. Never run `git commit` or `git push` on your own without being explicitly asked via these skills.

## Reference Images
- If a reference image is provided: match layout, spacing, typography, and color exactly. Swap in placeholder content (images via `https://placehold.co/`, generic copy). Do not improve or add to the design.
- If no reference image: design from scratch with high craft (see guardrails below).
- Screenshot your output, compare against reference, fix mismatches, re-screenshot. Do at least 2 comparison rounds. Stop only when no visible differences remain or user says so.

## Local Server
- **Always serve on localhost** — never screenshot a `file:///` URL.
- Start the dev server: `node serve.mjs` (serves the project root at `http://localhost:3000`)
- `serve.mjs` lives in the project root. Start it in the background before taking any screenshots.
- If the server is already running, do not start a second instance.

## Screenshot Workflow
- Puppeteer is installed at `./node_modules/puppeteer/`. Chrome (Chromium) cache is at `~/.cache/puppeteer/chrome/`.
- **Always screenshot from localhost:** `node screenshot.mjs http://localhost:3000`
- Screenshots are saved automatically to `./temporary screenshots/screenshot-N.png` (auto-incremented, never overwritten).
- Optional label suffix: `node screenshot.mjs http://localhost:3000 label` → saves as `screenshot-N-label.png`
- `screenshot.mjs` lives in the project root. Use it as-is.
- After screenshotting, read the PNG from `temporary screenshots/` with the Read tool — Claude can see and analyze the image directly.
- When comparing, be specific: "heading is 32px but reference shows ~24px", "card gap is 16px but should be 24px"
- Check: spacing/padding, font size/weight/line-height, colors (exact hex), alignment, border-radius, shadows, image sizing
- The screenshot script does not scroll. Use a custom Puppeteer script to scroll the page before capturing if scroll-reveal animations need to be visible.

## Output Defaults
- Styles live in `styles.css` (external file). Do not write inline styles or `<style>` blocks.
- Tailwind CSS via CDN: `<script src="https://cdn.tailwindcss.com"></script>` — used for utilities only; component styles go in `styles.css`.
- Placeholder images: `https://placehold.co/WIDTHxHEIGHT`
- Mobile-first responsive

---

## Whole Tone Piano Works — Design System

### File Structure
- `index.html` — single-page site
- `styles.css` — all component and layout styles
- `images/` — photos and background textures
- `brand_assets/` — logo files (`logo_curves_no_text.png` is primary)

### Color Palette
| Token | Hex | Usage |
|-------|-----|-------|
| `cream` | `#FBFBF9` | Page base, card backgrounds |
| `parchment` | `#F4F2EC` | Hero bg, alternate sections, card hover tint (`#F8F6F0`) |
| `ink` | `#2F2F2F` | Headings, primary text, buttons |
| `mid` | `#4A4A4A` | Body text |
| `muted` | `#6F6F6F` | Secondary text, captions |
| `rule` | `#E6E6E4` | Borders, dividers |
| `accent` | `#8A7A55` | Gold — eyebrows, prices, bullets, active borders, badges |
| `accent-light` | `#C8BA9A` | Badge borders, light accent use |

Never introduce new colors. All tints should be derived from the above.

### Typography
| Role | Font | Notes |
|------|------|-------|
| Display / headings | Goudy Bookletter 1911 | `font-family: 'Goudy Bookletter 1911', serif` |
| Body / serif text | Source Serif 4 | `font-family: 'Source Serif 4', serif` — italic for eyebrows, trust strip, footer tagline |
| UI / labels / nav | Inter | `font-family: 'Inter', sans-serif` — buttons, badges, prices, nav |

- Large headings: `letter-spacing: -0.025em`, `line-height: 1.18–1.22`
- Body: `line-height: 1.75`, `font-size: 0.95–1rem`
- Eyebrows: Inter, `11px`, `letter-spacing: 0.13em`, uppercase, accent color

### Spacing Scale
Sections use `padding: 88px 0` (mobile: `60px 0`). Internal section spacing:
- Between eyebrow → heading: `18px` (via eyebrow `margin-bottom`)
- Between heading → content: `28px`
- Paragraph gap: `18–20px`
- Card padding: `36px 28px`
- Card grid gap: `20px`

Content widths: `.wrap` = `700px` max, `.wrap-wide` = `960px` max, both centered with `padding: 0 28–32px`.

### Section System
Sections alternate between `.section-parchment` (`#F4F2EC`) and `.section-cream` (`#FBFBF9`).

```html
<section class="page-section section-parchment" id="my-section" aria-labelledby="my-heading">
  <div class="section-bg" aria-hidden="true"></div>  <!-- optional background image -->
  <div class="wrap">
    <div class="string-divider reveal" aria-hidden="true"><span></span><span></span><span></span></div>
    <span class="eyebrow reveal">Label</span>
    <h2 id="my-heading" class="reveal">Heading.</h2>
    <!-- content -->
  </div>
</section>
```

To add a background illustration to any section, add a CSS rule:
```css
#my-section .section-bg { background-image: url('images/filename.png'); }
```
The `.section-bg` div renders at `opacity: 0.07` — this works best with high-contrast line drawings or schematic images. Photographs at this opacity lose too much detail.

**Current section backgrounds:**
- Hero: `images/string_scale.png` (parallax via `.hero-bg` div + JS)
- My Approach (`#approach`): `images/grand_action.png` (patent line drawing)
- Services (`#services`): `images/chladni_bg.png` (scientific pattern)
- About and FAQ: flat backgrounds (intentional rest points)
- CTA: `images/piano_prism.png` as full-bleed with dark overlay (different system — uses `::before`/`::after`)

### Animation System
All scroll-triggered elements get class `reveal`. They animate in via IntersectionObserver (JS in `index.html`).

```css
/* Timings */
--reveal-duration: 0.75s
--reveal-easing: cubic-bezier(0.25, 0.46, 0.45, 0.94)  /* ease-out quart — slow tail */
--hero-duration: 1.0s
--hero-stagger: 220ms per element
--string-divider-stagger: 200ms per line
```

- **Reveal:** `opacity 0 → 1`, `translateY(14px) → 0`, `blur(2px) → 0`
- **Hero sequence:** `.hero-seq` elements, staggered by JS: `200 + i * 220ms`
- **String dividers:** `.string-divider` with three `<span>` children, `scaleX` stagger
- **Hero parallax:** `.hero-bg` div translated via scroll handler at `scrollY * 0.28`
- **Header shrink:** `.scrolled` class added at `scrollY > 60` — height `70px → 54px`, logo `50px → 36px`
- Stagger delay via `data-delay="120"` attribute on `.reveal` elements

Rules:
- Only animate `transform`, `opacity`, `filter`. Never `transition-all`.
- Use `cubic-bezier(0.34, 1.56, 0.64, 1)` for spring/bounce entrances (buttons, card lift).
- Use `cubic-bezier(0.25, 0.46, 0.45, 0.94)` for graceful settle (reveals, section transitions).

### Interactive States
Every clickable element must have hover, `focus-visible`, and active states.
- Buttons: hover darkens bg, active `scale(0.97)`
- Nav links: animated underline via `background-size` transition
- Service cards: `translateY(-5px)` lift + deeper shadow + gold border + `#F8F6F0` bg tint + ordinal opacity `0.045 → 0.13`
- About photo: `scale(1.03)` on hover (0.9s ease)
- Logo: opacity `0.78 → 1` on hover

### Service Cards
Three-column grid (`repeat(3, 1fr)`, `gap: 20px`). Each card:
- White bg (`#FBFBF9`), 2px top border (grey default, gold for `.package-featured`)
- Layered shadow, `overflow: hidden`
- Faint ordinal number (`.package-ordinal`) absolutely positioned top-right
- `.package-featured` = Full Service (middle card) — always has gold top border + "Recommended" badge

To add a card hover background image (future — when strings/hammers photos are available):
```css
.package-tune-maintain .package-bg { background-image: url('images/strings.jpeg'); }
/* restore the .package-bg system from git history if needed */
```

### String Divider
Three horizontal hairlines that animate in with staggered `scaleX`. Always placed before eyebrow label at the top of each section. Requires three `<span>` children and both `string-divider` and `reveal` classes.

### CTA Section
Uses `::before` for background image and `::after` for dark overlay (`rgba(18, 12, 6, 0.38)`). Text is cream (`#FBFBF9`). Background position `center 70%` to show keyboard and rainbow in `piano_prism.png`.

Contact layout (top to bottom):
- Two equal cream buttons: "Text to Book" (`sms:`) and "Call (971) 202-0538" (`tel:`) — class `.cta-direct`
- "or send a message" hairline divider — class `.cta-or`
- Formspree contact form (name, phone/email, message, submit) — class `.cta-form`

Form inputs use semi-transparent cream borders/backgrounds over the dark overlay. Formspree action URL: `https://formspree.io/f/YOUR_FORM_ID` — replace with real ID from Formspree dashboard.

### Images
- Photos: `filter: grayscale(15%)` for tonal consistency
- Background illustrations: work best as line drawings / high-contrast schematics at `opacity: 0.07`
- Full-bleed section images (CTA): require dark overlay for text legibility — start at `rgba(18,12,6, 0.38)`, adjust as needed
- HEIF images must be converted to JPEG before web use: `sips -s format jpeg -s formatOptions 85 input.heif --out output.jpeg`

---

## Brand Assets
- Always check the `brand_assets/` folder before designing. It may contain logos, color guides, style guides, or images.
- If assets exist there, use them. Do not use placeholders where real assets are available.
- Logo: `brand_assets/logo_curves_no_text.png` — transparent PNG, circular mark. Use `background-color: #FBFBF9; border-radius: 50%` when placing on dark or textured backgrounds to fill the transparent interior.

## Anti-Generic Guardrails
- **Colors:** Never use default Tailwind palette. Use the design system palette above.
- **Shadows:** Layered, color-tinted. Never flat `shadow-md` alone.
- **Typography:** Never same font for headings and body. See typography table above.
- **Animations:** Only animate `transform`, `opacity`, `filter`. Never `transition-all`.
- **Interactive states:** Every clickable element needs hover, focus-visible, and active states.
- **Spacing:** Use the spacing scale defined above — not arbitrary values.

## Internal Docs
Non-website reference content (marketing copy, instructions, etc.) lives as standalone HTML files in the project root, styled to match the site. All such files are linked from `internal.html`, which serves as the index.

When creating a new internal doc:
1. Create the HTML file in the project root
2. Add a link entry to `internal.html`
3. Include a `← Internal docs` back-link to `internal.html` at the top of the new file

Current internal docs:
- `internal.html` — index
- `blog-instructions.html` — blog post authoring procedure
- `google-business-description.html` — Google Business profile description + Google Ads copy

## Hard Rules
- Do not add sections, features, or content not requested
- Do not use `transition-all`
- Do not use default Tailwind blue/indigo as primary color
- Do not introduce colors outside the defined palette
- Do not add inline styles — all styles go in `styles.css`
