# Prototype source files: Belong, KwicK, ResolveAI

Each folder is a self-contained copy of the working app prototype linked from the case studies.
Nothing outside this folder is needed, and nothing in `website/` was changed.

| Folder | What it is | Run it |
|---|---|---|
| `belong-prototype/` | Belong rental app (React) | double-click `start-windows.bat`, open http://localhost:8101/ |
| `kwick-prototype/` | KwicK home-services app (React) | double-click `start-windows.bat`, open http://localhost:8102/ |
| `resolveai-prototype/` | ResolveAI support platform (React). `app/` = the live prototype, `source/` = the original Next.js project | `start-windows.bat` -> http://localhost:8103/ ; for `source/` see its README |

Why a local server and not double-clicking the HTML: browsers block web fonts and some scripts on `file://`
pages, so the start scripts serve the folder at `localhost`. They use Python 3 if installed, otherwise Node.js (`npx serve`).
Install either one: https://www.python.org/downloads/ or https://nodejs.org/

In each `app/` folder:
- `index.html` = desktop view: the app in a phone-width column on the gradient background (what the portfolio links to).
- `app.html` = the app on its own, full screen (what phones see). Open this to work on the app itself.

Read each folder's README for how its code is organised and what is and isn't original source.
