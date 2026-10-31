# ResolveAI — Product + UX + UI Specification (v1 DRAFT)

Status: planning only. No code until this draft is approved.
Product scope, features, pages, flows, data and technical rules: see the **Product Definition and Website Brief** (the source for all product content). This document adds the **design decisions** made in the interview and the **Reference-to-Design Map**.

Legend: **[A]** = approved by you · **[R]** = my recommendation, needs your OK · **[?]** = still open

---

## 1. Scope

- **[A]** Planning covers the whole product in the brief: marketing site, logged-in app, NovaWear widget, onboarding, help and support.
- **[A]** The 45 images are a **quality bar and a source of ideas**. Nothing is copied. Principles are extracted into one design system.
- **[A]** Implementation continues the existing project (`E:\ResolveAI moodboard\resolveai-studio`). No rewrites, no duplicate pages.
- **[?]** The existing project is not connected to this session yet, so I have not seen the current code, logo, routes or components.

## 2. Art direction in one paragraph

Dark jade marketing with ribbed light, grain and calm depth. A quiet, light, warm app with a slim frosted sidebar. Jade and teal carry the brand and AI. Orange appears for one reason only: a human is involved. One clean sans-serif. Depth comes from real UI panels, not glossy 3D objects.

## 3. Design system

### 3.1 Colour
- **[A]** Base: jade and teal only. Shading may move toward **cyan-teal** at the brightest edge of glows. No true blue. No purple.
- **[A]** One accent: **warm orange**, meaning *human handling* (takeover, handoff, escalation, human reply). Used sparingly as a highlight on marketing.
- **[R]** Jade scale (tuned from refs #3 and #5, to be contrast-checked):
  - Deep: `#0B2E27`, `#126650`
  - Mid: `#288760`, `#3CBFA0`
  - Bright: `#21F4BD` (glow only, never text on light)
  - Pale: `#CFFFF1`
  - Orange: one base + one tint, chosen at build time for AA contrast
- **[R]** Neutrals in the app are warm off-white, not cold grey.
- **[R]** Status never relies on colour alone: always icon + text label.

### 3.2 Base theme
- **[A]** Marketing: dark jade, alternating with light sections.
- **[A]** App: light and warm.
- **[R]** App dark mode is a later option (brief lists it as secondary).

### 3.3 Typography
- **[A]** One clean modern sans-serif family. No serif or italic accent.
- **[R]** Scale: display / H1 / H2 / H3 / body / small / label. Weights limited to regular, medium, semibold.
- **[R]** Messages in the Inbox: 15–16px body, generous line height. No tiny message text.
- **[R]** Large numbers only for the six Overview KPIs, the six Analytics KPIs, and hero/marketing stats.

### 3.4 Texture and atmosphere (marketing)
- **[A]** Sharp glowing vertical ribs (refs #20, #29) behind the hero.
- **[A]** Fine grain finish (refs #21, #29).
- **[A]** Wide soft light beams (ref #21) between sections.
- **[R]** Rules: sharp ribs only on the hero and one other dark section. Beams between sections. Grain global but subtle. Never stack all three in one place.
- **[R]** All built in CSS/SVG/canvas-free code. No heavy image or video files.

### 3.5 Glass
- **[A]** Frosted glass cards on marketing panels (ref #2).
- **[A]** App sidebar: light, with a bit of glass.
- **[R]** Sidebar: soft jade glow behind a frosted light surface, thin light border, solid enough for contrast. No glass inside chat, tables, forms or dialogs.

### 3.6 Layout and grid
- **[R]** Marketing: 12-column grid, max content width ~1200px, generous vertical rhythm, alternating compositions (no repeated equal three-card rows).
- **[A]** Bento layouts with tiles of different sizes for Features and Trust (refs #40, #24, recoloured to jade).
- **[R]** App: 8px spacing base; compact-but-comfortable density.

### 3.7 Components (shared)
- **[A]** App shell: light sidebar + top bar (refs #12, #15). Ryan Smith fixed top right.
- **[A]** Charts: striped/hatched fills (refs #8, #15) in jade tones; orange only for human-handled series.
- **[A]** One jade glass column chart (ref #44) in the Analytics marketing section, built in code, using NovaWear demo numbers.
- **[R]** Buttons: one filled primary (jade), one outline secondary, orange reserved for human actions (Take Over, Escalate). Visible focus ring on everything.
- **[R]** Cards: used sparingly in the app. Prefer rows, dividers and whitespace.
- **[R]** Forms, dialogs, tabs, menus, tooltips: accessible by default (Radix). States: default, hover, focus, selected, loading, empty, error, retry, success, disabled.

### 3.8 Motion
- **[A]** Marketing: slow light drift, scroll reveals (once), animated Smart Handoff demo.
- **[R]** App: motion only for takeover, handoff, AI generation, loading and success.
- **[A/R]** Everything stops under reduced-motion. No bounce, confetti or constant motion.

### 3.9 Imagery
- Code-built product panels, consistent avatars, channel icons. No stock photos. No fake reviews or customer logos. Trust strip shows **real integrations and channels only**.

## 4. Marketing site

| Area | Decision |
|---|---|
| Hero **[A]** | Left: headline, one sentence, two buttons. Right: layered live Inbox, AI draft and order panels bleeding off the edge over ribbed jade. |
| Signature section **[A]** | Smart Handoff (AI to human): biggest layout, most motion. |
| Handoff human side **[R]** | Orange shown through badges, avatar ring and a small glow, not large orange ribs (ref #28 not selected). |
| Analytics section **[A]** | The one jade glass column chart. |
| Widget / Integrations **[A]** | One slight perspective tilt on a product screen (ref #45), used once. |
| Features / Trust **[A]** | Bento tiles of different sizes. |
| Pricing **[A]** | Dark jade, raised Growth plan with jade glow border, comparison table below, Monthly/Annual toggle, clear "prototype, no charge" strip. |
| Sign in / Create account / Trial **[A]** | Split layout (ref #23): dark jade brand panel + clean form. Orange only on the main button **[R]**. |
| Footer **[R]** | Compact links and newsletter; large faint ResolveAI word (refs #14, #26 not selected, so this stays a recommendation). |
| Trust strip **[R]** | Integration and channel names only. |
| Product Walkthrough / Demo **[A]** | Dedicated full-screen guided page: chapters on the left, live panels with captions on the right, "Open this in the app" at the end of each chapter. Never a generic redirect to Inbox. |

Homepage order stays as the brief lists it (16 sections).

## 5. App

- **[A]** Shell: light, frosted sidebar; top bar with search and Ryan Smith top right.
- **[A]** Inbox desktop (1440px): two columns, list + wide chat.
- **[A]** Context: slim strip above the chat always shows order, status, amount and handler. Full customer/order panel opens from the right as a **docked push panel** (chat narrows, nothing is covered). On tablet and mobile it is a full overlay.
- **[R]** Overview: six KPIs in a plain row (no dark hero card), urgent issues first, recent conversations, compact resolution trend. Each KPI links to the matching Inbox view.
- **[R]** Human vs AI: jade = AI, orange = human, shown with label and icon in list rows, message bubbles and the context strip. Internal notes and system events look clearly different from replies.
- **[A]** Tablet (768px): slim icon sidebar, two-pane list + chat.
- **[A]** Mobile (390px): bottom tab bar (5 tabs), list opens a full-screen chat with a back button, context opens as a full overlay.

## 6. Customer widget (NovaWear)
- **[A]** Launcher bottom-right. Desktop: tall fixed-size panel anchored to the corner with margins. Mobile: full-screen with a clear close button.
- **[R]** Branded as NovaWear (fictional). Separate from ResolveAI Support.

## 7. Accessibility and performance
- **[R]** WCAG AA contrast, keyboard paths, visible focus, semantic headings, ARIA where needed, reduced-motion support, status not colour-only.
- **[R]** Code-native visuals, lazy-load large sections, stable charts after hydration, `backdrop-filter` limited to a few elements.

---

## 8. Reference-to-Design Map

| Ref | What it is | What you selected | Used where | Do NOT copy |
|---|---|---|---|---|
| #1 | Gradient + line wordmark | Mix (with #2, #4) | Hero glow mood | Its wordmark or exact gradient |
| #2 | Frosted cards on deep teal | Mix | Glass marketing panels | Its text or layout |
| #3 | Jade gradient + palette | Palette idea (via "mix") **[R]** | Jade colour scale | Exact hex values |
| #4 | Blue gradient + grid | Teal edges toward cyan | Glow edges | The blue colour |
| #5 | Mint vertical gradient | Palette idea **[R]** | Jade scale, light sections | Exact look |
| #6 | Aurora + node diagram | Not selected | — | — |
| #7/#19 | Duplicate small dashboard | Not selected | — | — |
| #8 | Zentra dashboard | Striped chart style | App + marketing charts | Its card grid, gradient highlight card |
| #9, #13 | Orange-framed dashboards | Not selected | — | Orange frames |
| #10, #11 | Dark green dashboards | Not selected (sidebar decision was light) | — | Dark sidebar |
| #12 | OripioFin | Sidebar + top bar structure | App shell | Green hero card |
| #15, #18 | Donezo | Sidebar/top bar; striped bars | App shell, charts | Dark hero cards, big % tiles |
| #16, #17 | FINAI, Finpoint | Not selected | — | AI "insight" card style |
| #20 | Sharp green ribs | Selected | Hero background | Exact colours |
| #21 | Grainy jade + beams | Grain + soft beams | Global grain, section dividers | — |
| #22 | TrueEarth rounded photo frame | Not selected | — | Photo-led layout |
| #23 | Split sign-up | Selected | Auth, trial, demo forms | Its brown/orange palette |
| #24 | Glowing dark tiles | Bento tile sizes | Features, Trust | Neon blue glow |
| #25 | Circular mark | Flowing circular mark | New original logo | The mark itself |
| #26, #14 | Kresna footer/page | Not selected | Footer idea stays a recommendation **[R]** | 3D icon |
| #27, #31, #34, #35 | Live-preview, AI lab, purple pages | Not selected | — | Purple/blue |
| #28 | Orange ribs | Not selected | Orange via small accents only | Orange ribbed texture |
| #29 | FortiShield hero | Ribs + grain | Hero texture | Centred layout (hero is left/right) |
| #30 | Composio hero | Not selected | — | Serif italic type |
| #32, #33 | Axiom Zero, Neone | Not selected | — | Neon green, blue glow arc |
| #36, #37, #38 | Pricing pages | Raised middle plan, toggle | Pricing | Purple/blue styling, prices |
| #39 | Case-study bars | Not selected | — | Fake result stats |
| #40 | Bento with glow | Tile variety | Features, Trust | Blue glow, 3D steps |
| #41, #42, #43 | 3D icons, swipe, dart | Not selected | — | Glossy objects |
| #44 | Glass columns | Selected | Analytics chart | Non-English UI, car layout |
| #45 | Tilted UI | Slight tilt, once | Widget/Integrations | Desert backdrop |

## 9. Open questions **[?]**
1. Connect the existing project (logo, components, routes) so the plan matches what already exists.
2. Confirm the recommendations marked **[R]** above, especially jade hex values, orange use in Smart Handoff, footer, and app motion.
3. Onboarding visual style (stepper layout) and ResolveAI Support page layout: not yet discussed. Default: follow the app system, with a calm left progress list.
4. Language and Arabic RTL: confirm how far to go (brief says "where practical").
5. Publishing: confirm the existing private Site is updated, not replaced.
