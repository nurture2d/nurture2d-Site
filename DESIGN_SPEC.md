# Nurture2D — Design Specification
> macOS-inspired dark UI · Version 2026

---

## 1. Design Philosophy

Inspired by macOS Sequoia dark mode and Apple's Human Interface Guidelines.
The core principle: **every surface has a clear role, every layer is visually distinct.**

- Dark backgrounds with clear grey-scale depth (not one flat dark tone)
- White and near-white for cards, panels, and content that needs to stand out
- One accent colour (violet/purple) used sparingly and intentionally
- Text is always high-contrast — white on dark, near-black on light
- Sections alternate between dark and light to create natural visual rhythm
- Frosted glass (backdrop-filter blur) for nav, modals, and floating elements
- Smooth, purposeful animations — nothing decorative for its own sake

---

## 2. Colour Palette

### Backgrounds — Dark Scale (page layers, deepest to lightest)
| Token         | Hex       | Usage                                      |
|---------------|-----------|--------------------------------------------|
| `--grey-950`  | `#0d0d0f` | Page base background (deepest)             |
| `--grey-900`  | `#141416` | Section backgrounds (hero, features)       |
| `--grey-800`  | `#1c1c1f` | Elevated surfaces (stats bar, footer)      |
| `--grey-700`  | `#242428` | Cards on dark backgrounds                  |
| `--grey-600`  | `#2e2e33` | Hover states, borders, dividers            |
| `--grey-500`  | `#3a3a40` | Subtle borders, inactive tab backgrounds   |

### Surfaces — Light Scale (cards, panels on dark sections)
| Token         | Hex / Value              | Usage                                      |
|---------------|--------------------------|--------------------------------------------|
| `--white`     | `#ffffff`                | Primary light cards (specs, download btns) |
| `--grey-100`  | `#f5f5f7`                | Secondary light cards, light section bg    |
| `--grey-200`  | `#e8e8ed`                | Borders on light surfaces                  |
| `--grey-300`  | `#d1d1d6`                | Muted text on light surfaces               |

### Accent — Violet/Purple
| Token           | Hex       | Usage                                        |
|-----------------|-----------|----------------------------------------------|
| `--accent`      | `#6e3aff` | Primary CTA buttons, active states           |
| `--accent-soft` | `#8b5cf6` | Hover states, secondary accents              |
| `--accent-dim`  | `#a78bfa` | Labels, badges, icons on dark backgrounds    |
| `--accent-glow` | `rgba(110,58,255,0.35)` | Box shadows, glows on buttons   |
| `--accent-tint` | `rgba(110,58,255,0.08)` | Subtle tinted backgrounds        |

### Text
| Token        | Value     | Usage                                          |
|--------------|-----------|------------------------------------------------|
| `--t-primary`   | `#ffffff` | Headings, primary text on dark backgrounds  |
| `--t-secondary` | `#ebebf0` | Body text, descriptions on dark backgrounds |
| `--t-muted`     | `#98989f` | Labels, captions, metadata on dark          |
| `--t-faint`     | `#636366` | Placeholder text, disabled states           |
| `--t-dark`      | `#1c1c1e` | Headings on light/white backgrounds         |
| `--t-dark-2`    | `#3a3a3c` | Body text on light/white backgrounds        |
| `--t-dark-3`    | `#6e6e73` | Captions, labels on light/white backgrounds |

### Semantic
| Token        | Hex       | Usage                    |
|--------------|-----------|--------------------------|
| `--green`    | `#30d158` | Success, recommended     |
| `--amber`    | `#ffd60a` | Warning, minimum spec    |
| `--red`      | `#ff453a` | Error, destructive       |

---

## 3. Typography

**Font:** Inter (already loaded) — system-ui fallback

### Scale
| Role            | Size (clamp)              | Weight | Line Height | Letter Spacing |
|-----------------|---------------------------|--------|-------------|----------------|
| Display / Hero  | `clamp(52px, 8vw, 88px)`  | 700    | 1.0         | -2.5px         |
| H1              | `clamp(36px, 5vw, 56px)`  | 700    | 1.05        | -1.5px         |
| H2              | `clamp(28px, 4vw, 44px)`  | 700    | 1.1         | -1px           |
| H3              | `clamp(20px, 2.5vw, 28px)`| 600    | 1.2         | -0.4px         |
| Body Large      | `18px`                    | 400    | 1.7         | 0              |
| Body            | `15px`                    | 400    | 1.65        | 0              |
| Body Small      | `13px`                    | 400    | 1.6         | 0              |
| Label / Eyebrow | `11px`                    | 600    | 1.4         | +1.5px         |
| Caption         | `12px`                    | 400    | 1.5         | 0              |

### Rules
- Headings on dark: `--t-primary` (#ffffff)
- Body on dark: `--t-secondary` (#ebebf0)
- Captions/labels on dark: `--t-muted` (#98989f)
- Headings on light: `--t-dark` (#1c1c1e)
- Body on light: `--t-dark-2` (#3a3a3c)
- Captions on light: `--t-dark-3` (#6e6e73)
- Gradient text (accent spans): light lavender gradient — `#c084fc → #e9d5ff`
- Section eyebrow labels: `--accent-dim`, uppercase, tracked

---

## 4. Spacing System

8px base unit. All spacing is a multiple of 8.

| Token    | Value  | Usage                              |
|----------|--------|------------------------------------|
| `--s-1`  | `4px`  | Micro gaps (icon to text)          |
| `--s-2`  | `8px`  | Tight gaps (list items)            |
| `--s-3`  | `12px` | Small gaps (badge padding)         |
| `--s-4`  | `16px` | Default padding, card inner gaps   |
| `--s-5`  | `20px` | Medium gaps                        |
| `--s-6`  | `24px` | Section inner padding              |
| `--s-8`  | `32px` | Component padding                  |
| `--s-10` | `40px` | Large component padding            |
| `--s-12` | `48px` | Section vertical padding (mobile)  |
| `--s-16` | `64px` | Section vertical padding (desktop) |
| `--s-24` | `96px` | Large section padding              |

---

## 5. Border Radius

| Token        | Value  | Usage                                  |
|--------------|--------|----------------------------------------|
| `--r-sm`     | `8px`  | Buttons, badges, small chips           |
| `--r-md`     | `12px` | Input fields, small cards              |
| `--r-lg`     | `16px` | Cards, panels                          |
| `--r-xl`     | `20px` | Large cards, modals                    |
| `--r-2xl`    | `28px` | Hero cards, CTA blocks                 |
| `--r-full`   | `999px`| Pills, tags, circular buttons          |

---

## 6. Shadows & Elevation

Three elevation levels — used to communicate depth.

| Level | Token         | Value                                                        | Usage                        |
|-------|---------------|--------------------------------------------------------------|------------------------------|
| 1     | `--shadow-sm` | `0 1px 3px rgba(0,0,0,0.3), 0 1px 2px rgba(0,0,0,0.2)`     | Subtle card lift             |
| 2     | `--shadow-md` | `0 4px 16px rgba(0,0,0,0.4), 0 2px 6px rgba(0,0,0,0.25)`   | Cards, dropdowns             |
| 3     | `--shadow-lg` | `0 16px 48px rgba(0,0,0,0.5), 0 6px 16px rgba(0,0,0,0.3)`  | Modals, hero window mockup   |
| Glow  | `--shadow-accent` | `0 0 24px rgba(110,58,255,0.4), 0 4px 16px rgba(0,0,0,0.4)` | CTA buttons, active states |

---

## 7. Component Styles

### Navigation Bar
- Transparent when at top of page
- On scroll: `--grey-900` at 80% opacity + `backdrop-filter: blur(20px) saturate(180%)`
- Bottom border: 1px `--grey-600` (only when scrolled)
- Logo: white filter on dark nav
- Links: `--t-muted` default → `--t-primary` on hover, `--grey-700` background on hover
- CTA button: `--accent` fill, white text, `--shadow-accent` glow

### Buttons
| Variant    | Background    | Text    | Border              | Hover                          |
|------------|---------------|---------|---------------------|--------------------------------|
| Primary    | `--accent`    | white   | none                | lighten + lift + stronger glow |
| Secondary  | `--grey-700`  | white   | 1px `--grey-500`    | `--grey-600` bg                |
| Ghost      | transparent   | white   | 1px `--grey-500`    | `--grey-700` bg                |
| Light      | `--white`     | `--t-dark` | 1px `--grey-200` | lift + accent border           |

### Cards — Dark Context
- Background: `--grey-700`
- Border: 1px `--grey-600`
- Border-radius: `--r-lg`
- Shadow: `--shadow-sm`
- Hover: border → `rgba(110,58,255,0.4)`, lift 4px, `--shadow-md`

### Cards — Light Context (specs, download)
- Background: `--white`
- Border: 1px `--grey-200`
- Border-radius: `--r-xl`
- Shadow: `--shadow-md`
- Text: dark scale
- Hover: lift 4px, accent border tint, stronger shadow

### Section Eyebrow Labels
- Font: 11px, weight 600, uppercase, +1.5px letter-spacing
- Colour: `--accent-dim`
- Margin-bottom: 12px

### Section Titles
- H2 scale
- Colour: `--t-primary` on dark, `--t-dark` on light
- Gradient spans: `#c084fc → #e9d5ff`

### Section Subtitles
- Body Large (18px)
- Colour: `--t-secondary` on dark, `--t-dark-2` on light
- Max-width: 560px, centered

---

## 8. Section Layout & Rhythm

The page alternates between dark and light sections to create clear visual separation:

| Section         | Background    | Text context |
|-----------------|---------------|--------------|
| Nav             | transparent → `--grey-900` | dark |
| Hero            | `--grey-950`  | dark         |
| Stats Bar       | `--grey-800`  | dark         |
| Features/Tabs   | `--grey-900`  | dark         |
| System Specs    | `--grey-100`  | **light**    |
| CTA             | `--grey-950`  | dark         |
| Contact         | `--grey-800`  | dark         |
| Footer          | `--grey-950`  | dark         |

This alternation means every section boundary is immediately visible.
The Specs section being light (`--grey-100`) makes the white cards feel natural and the section itself pops against the dark sections above and below it.

---

## 9. Animation Principles

- **Reveal on scroll:** `opacity 0→1` + `translateY(20px→0)`, duration 0.55s, `cubic-bezier(0.22, 1, 0.36, 1)`
- **Stagger:** siblings stagger by 60ms
- **Hover transitions:** 0.18s ease for colour/border, 0.22s `cubic-bezier(0.22,1,0.36,1)` for transforms
- **No bounce, no spring** — macOS uses ease-out curves, not spring physics
- **Orb floats:** 18–25s, ease-in-out, very subtle (opacity 0.25–0.35)
- **Playhead animation:** ease-in-out, 4s loop
- **Tab/card entrance:** `vcardIn` — 0.35s, staggered 50ms per card

---

## 10. Page-Specific Notes

### index.html
- Hero: `--grey-950` bg, large display title, app window mockup
- Stats bar: `--grey-800` — visually separates hero from features
- Features: `--grey-900` — slightly lighter than hero, tabs + video cards
- Specs: `--grey-100` light section — white cards with dark text, clear contrast
- CTA: `--grey-950` — back to darkest, accent glow, centered
- Contact: `--grey-800` — slightly elevated from CTA
- Footer: `--grey-950` — closes the page

### download.html
- Hero: dark (`--grey-950`) — matches index hero
- Download section: `--grey-100` light — matches specs section style
- Buttons: white cards with dark text and accent accents — already correct, keep this

### Consistency Rules
1. White/light text ONLY on dark backgrounds (`--grey-700` or darker)
2. Dark text ONLY on light backgrounds (`--grey-200` or lighter)
3. `--accent` used ONLY for: primary buttons, active tab/version indicators, focus rings
4. `--accent-dim` used for: eyebrow labels, icons, badges
5. Every section must have a visually distinct background from its neighbours
6. Cards always sit one step lighter than their section background
7. Logo image: `filter: brightness(0) invert(1)` on dark backgrounds (forces white)
