# PROJECT_STATE — ResolveAI

Stage: **Redesign implemented (v1).** Running locally at http://localhost:5173 (`npm run dev`, or double-click `.sites-runtime/start-dev.bat`).
Sources of truth: `RESOLVEAI_PRODUCT_UX_UI_SPEC.md` (visual decisions + Reference-to-Design Map) and the master prompt (product logic).

## What changed in this pass
- **Design system** — new `app/resolve-system.css` (loaded last). Geist type, jade/teal scale, orange = human, grain, ribs, glass, buttons, tags, toggles (rounded-rectangle), dropdowns, dialogs, light + dark app themes.
- **Logo** — original SVG mark (`BrandMark` in `components/product-ui.tsx`): jade wave in a dark disc with an orange "human" dot. Replaces the copied reference image.
- **Hero** (`components/hero.tsx`) — left copy, right layered live Inbox over ribbed jade; looping story (AI answers → confidence drops → handoff summary → Maya joins). Respects reduced motion.
- **Homepage** (`components/marketing.tsx`) — all 16 sections in order: hero, honest trust strip (channels + tools, no fake customers), Unified Inbox, AI vs Human responsibility map, Contextual Support, **Smart Handoff (signature, interactive)**, AI Copilot (working Edit/Regenerate ×5/Dismiss/Use), Knowledge (retry sync), Automation (working toggles), Analytics (single jade glass column chart), NovaWear widget (one tilt), Integrations, Trust & Security bento, Pricing (gradient border on Growth only), Final CTA overlapping the footer, footer (#26 structure, ribbed visual, logo top-right, faint wordmark).
- **Subpages** — Features, Solutions (workflow owners), Integrations, Pricing (+ comparison table, FAQ), Documentation (search, sidebar, breadcrumbs, related), **/demo guided walkthrough** (5 chapters; Help's walkthrough links here, never to Inbox), legal, 404.
- **Auth / trial / demo / onboarding** (`components/onboarding.tsx`) — form left, ResolveAI tile illustration right (ref #24 recoloured), social row, trial trust chips, onboarding progress rail. Fixed literal `<br/>` text bug in headings.
- **App** — frosted light sidebar with gradient active state and collapse; auto icon-only below 1100px; Overview KPIs first (greeting banner removed), sections stacked Urgent → Recent → Trend; Inbox context strip (order/amount/status/handler), collapsible docked context panel (open by default ≥1600px), header = Assign · Escalate · Resolve · context · More (AI→Human handoff lives in More + low-confidence panel), orange Take Over; Team numbers oversized with masked fade; Analytics volume = stacked AI (jade stripes) / Human (orange) bars with custom tooltip.
- **Separation** — NovaWear launcher hidden inside the app and on auth pages; Help chat is ResolveAI Support.

## Verified
- Numbers reconcile: 248 open · 18 urgent · 12 waiting on Ryan · 42 AI · 9 handoffs · 394 resolved.
- Take Over, context toggle, regenerate, retry sync, toggles, pricing toggle work.
- No horizontal overflow at 390px on /, /features, /solutions, /pricing, /documentation, /demo, /sign-in, /book-demo, /onboarding and app routes; tablet Inbox two-pane.
- Light and dark app themes readable.

## Open / next
1. Your visual review in a real browser (screens were checked in a background pane).
2. Arabic RTL styling of the new marketing pages not reviewed (app RTL existed before).
3. Git commit + publish to the existing private Site (not done; git on the E: drive reported a locked index).
4. Original files backed up in `.sites-runtime/backup-before-redesign/` (ignored by git).

## Hard rules (unchanged)
Unified Inbox; six Overview KPIs; six Analytics KPIs; Ryan Smith top-right only; NovaWear fictional; Take Over ≠ handoff ≠ escalation; human approval for refunds; data reconciles; ResolveAI Support ≠ NovaWear widget; walkthrough never redirects to Inbox; no fake proof; no real money/messages.

## QA fixes (case-study review, 21 Oct 2026)
Originals backed up in `.sites-runtime/backup-before-qa-fixes/`. All fixes appended at the end of `app/resolve-system.css` unless noted.
1. **Take Over contrast**: white label on the warm gradient was ~3:1. Now `#B5531E → #A94A17` (5.0–5.7:1, WCAG AA).
2. **Dark theme, Analytics**: first and last KPI cards were forced to `#fff`, giving white text on white. Now dark card colours in `.dark`.
3. **Mobile widget**: Tailwind v4 dialog `translate` was not reset by `transform:none`, so it opened half off-screen. Added `.support-dialog{translate:none!important}`.
4. **Loading state**: `components/experience.tsx` now renders a `LoadingSkeleton` (sidebar, header, six KPI and panel placeholders, shimmer off under reduced motion) with a screen-reader `role="status"` "Loading your workspace…".
Verified live at localhost:5173 (light, dark, 390px).
