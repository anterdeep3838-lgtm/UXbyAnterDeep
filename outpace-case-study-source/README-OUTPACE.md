# Outpace case study: source

The finished page is `website/outpace.html` and its assets are in `website/outpace/`.
It is built from `deck/`. Edit the parts, never the output:

    cd outpace-case-study-source/deck
    python3 build.py          # writes ../../website/outpace.html (adds a "next phase" note)
    python3 build.py final    # same, without the note

- `head.html`: fonts, design tokens, shared styles
- `p1.html` / `p1.css`: slides 1-8 (cover, overview, visual break, role & timeline, problem, users, goals, scope)
- `p2`-`p4`: later phases (added as they are built)
- `foot.html`: all JavaScript (track runner, hurdle race, lane cycling, count-ups, progress bar)
- Tokens in the HTML: `{{i:name}}` inserts an icon from `icons.json`, and `{{mark}}` / `{{word}}` insert the Outpace logo.

Slides use a 1600px-wide canvas (minimum 1000px tall), scaled to the viewport with `--k`. `TOTAL` in `foot.html` sets the slide count (27).

**Fonts:** Barlow Condensed (display, italic 900), Archivo expanded (section titles), Inter Tight (body). These match the Outpace site.
**Colours:** ink `#0b0807`, ember `#ff5a1f`, flare `#ff9a3c`, sun `#ffc272`, blood `#b3200e`.

**Mockups:**
- `tools/cap.py` captures Outpace screens at 2x.
- `tools/comp.py` replaces only the green screen. It fits a four-corner perspective, never enlarges the screenshot, and masks to the green pixels.
- `composites-png/` holds the lossless masters. The web copies are WebP at quality 93.
- The green-screen source photos are in your "outpace green screen photos" folder (G01-G17 = files in name order).
