# Anterdeep Singh: Portfolio Website and Case Studies

A UI/UX design portfolio. Plain HTML, CSS and JavaScript. There is no framework and no bundler. Everything runs by opening `website/index.html` in a browser.

**Live version (private Claude artifact):** https://claude.ai/artifact/AzM93jQTfNkEMEHHmjw2Y7
**Contact shown on the site:** anterdeep3838@gmail.com · https://www.linkedin.com/in/anter-deep-021740393/

---

## 1. Folder map (start here)

```
Portfolio website and case study/
├── README.md                      <- this file (give this to any AI first)
├── website/                       <- THE SITE. Upload/serve this folder as-is.
│   ├── index.html                 Home page: hero, project cards, about, contact
│   ├── belong.html                Case study: Belong
│   ├── kwick.html                 Case study: KwicK
│   ├── resolveai.html             Case study: ResolveAI
│   ├── worth.html                 Case study: Worth (GENERATED, see section 3)
│   ├── outpace.html               Case study: Outpace (GENERATED, see outpace-case-study-source/README-OUTPACE.md)
│   ├── assets/                    Home-page images (avatar, character, plate, wave)
│   ├── belong/  kwick/  resolveai/  worth/
│   │                              Images + fonts used by each case study page
│   └── (each page references its folder with relative paths like worth/s-home.webp)
├── outpace-case-study-source/     <- Editable source for the Outpace case study (in progress)
├── worth-case-study-source/       <- Editable source for the Worth case study
│   ├── deck/                      head.html, p1-p4 .html/.css, foot.html, build.py
│   ├── prototype/                 worth-app-prototype.html (the working Worth app)
│   ├── capture-scripts/           Playwright scripts that photographed the prototype
│   ├── raw-captures/              Raw 3x screenshots, section crops
│   ├── composites/                Finished photo composites (webp) used in the deck
│   ├── design-source-images/      Source images for composites and glass textures
│   └── old-spendwise-reference/   Re-rendered old SpendWise screens (before/after)
└── archive/                       Early scratch renders from the home page. Not used.
```

Important: **do not move files inside `website/`.** HTML pages reference images by
relative path (`worth/…`, `kwick/…`, etc.). Some paths are built in JavaScript
(for example `kwick/ch-${name}.webp`), so an image that looks unused may still be needed.

---

## 2. How the home page works

`website/index.html` is one self-contained file (CSS and JS inline). Project cards open
their case study by name:

- `index.html` near the bottom: `if (id === 'worth'){ location.href = 'worth.html'; return; }`
  (same line for `belong`, `kwick`, `resolveai`). A `#hash` redirect exists as well.
- To add a new case study: add a card, add a `NAMES` entry, add the same two routing
  lines (click handler + hash redirect), and add `newname.html` plus a `newname/` folder.

## 3. The Worth case study (generated page)

`website/worth.html` is **built** from the parts in `worth-case-study-source/deck/`.
**Edit the parts, not the output**, then rebuild:

```
cd worth-case-study-source/deck
python3 build.py        # writes ../../website/worth.html
```

| File | Contains |
|---|---|
| `head.html` | `<head>`, design tokens, shared CSS, fonts, top bar |
| `p1.html` / `p1.css` | Slides 1-8: cover, stage, overview, problem, research, persona |
| `p2.html` / `p2.css` | Slides 9-16: existing solutions, success criteria, strategy, evolution, flow, IA |
| `p3.html` / `p3.css` | Slides 17-23: dashboard, Money Left, transactions, analysis, budget, savings |
| `p4.html` / `p4.css` | Slides 24-31: decisions, iterations, UX laws, type, states, AI, results, close |
| `foot.html` | All JavaScript (count-ups, sliders, journey scrubber, carousel, etc.) |

All `p*.css` files are inlined into one `<style>` block at build time. The build was
verified: it reproduces the published `worth.html` byte for byte.

**Slide system:** each slide is `<section class="sl">`, a fixed **1600px wide, minimum
1000px tall** canvas scaled to the viewport with the `--k` variable. `TOTAL = 31` in
`foot.html` drives the "NN / 31" counters, so update it if slides are added or removed.

**Design tokens (in `head.html`):**
- Base `#181818`, secondary `#1E1E1E`, deep `#141414`
- Accent Worth blue `#4D84FF` (use sparingly), light blue `#9CBCFF`, dark blue `#2350E6`
- Fonts: **Urbanist** (headings and UI), **Inter** (dense text, class var `--fi`), **Geist** (typography slide only)
- Persona: **Ashish Sharma**

**Where the screenshots come from:** `prototype/worth-app-prototype.html` is the real
Worth app. `capture-scripts/*.py` open it with Playwright at 393x852, device scale 3,
fixed clock `2026-10-23 19:30 IST`, demo data, user "Ashish Sharma", and save screens.
The scripts contain absolute `/home/claude/...` paths, so change those to your local
paths before running. Images were converted to `.webp` into `website/worth/`.

---

## 4. Content and tone rules to preserve (set by the owner)

- Positive, confident tone about the work.
- **No invented proof**: no fake metrics, user-test results, or "0 measured" style lines,
  and no project durations.
- No personal logo on the pages.
- Case studies avoid box-in-box layouts and floating tags; layouts are dynamic and text stays readable.
- Credit AI tools honestly: Codex and Claude (UI), Perplexity (research), NotebookLM
  (synthesis), Midjourney (photos).
- The Worth closing slide has an "Open Worth" button that links to the live prototype:
  https://claude.ai/artifact/YWM2fsAYYoz2Agq815fugK

## 5. Tips for any AI editing this project

1. Read this README, then open only the file for the page being changed.
2. For Worth, edit `deck/p*.html|css` or `foot.html`, then run `build.py`. Never hand-edit `worth.html`.
3. `belong.html`, `kwick.html`, `resolveai.html` and `index.html` are edited directly.
4. Keep images as `.webp`, keep filenames stable, and keep relative paths unchanged.
5. After edits, open the page in a browser at about 1600px wide and again at a phone width
   (about 390px) to check nothing overflows. Check the browser console for errors.
6. To publish, upload the whole `website/` folder, with `index.html` as the entry point,
   to any static host (or republish it as a Claude artifact).


## 6. Outpace case study

This case study is being built in 4 phases. `website/outpace.html` is generated from `outpace-case-study-source/deck/` with `python3 build.py`. See `outpace-case-study-source/README-OUTPACE.md` for its structure, fonts, colours and the green-screen mockup tools.
