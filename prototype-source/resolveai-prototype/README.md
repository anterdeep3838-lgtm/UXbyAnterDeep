# ResolveAI prototype

AI + human customer-support platform with the fictional brand NovaWear. Two versions are included.

## 1. `app/`: the live prototype (linked from the case study)
Run it:
- Windows: double-click `start-windows.bat`, then open http://localhost:8103/
- Mac/Linux: `./start-mac-linux.sh`, then open http://localhost:8103/

```
app/
├── index.html          loads the CSS and JS below
├── css/resolveai.css   all styles, formatted. Includes the Be Vietnam Pro @font-face rules.
├── js/app.js           the whole app (React + marketing pages + product screens), formatted
├── fonts/              Be Vietnam Pro (OFL licence)
└── images/             glass textures and the footer card photo
```
No build step: edit, save, refresh. Search `js/app.js` for on-screen text to find a screen.
This version was delivered as one compiled HTML file; its original TypeScript project is not in these files,
so `app/` is that build split into files and formatted for editing (component names and text intact,
local variable names shortened by the build).

## 2. `source/`: the original ResolveAI Studio project (Next.js / vinext, TypeScript)
The full editable project from your `resolveai-studio` folder: `app/` (pages), `components/`, `hooks/`, `lib/`,
`public/`, configs and `package.json`. Copied without `node_modules`, build output and cache folders.
This is a separate version of ResolveAI with a different visual design from the live prototype in `app/`.

Run it (needs Node.js 22.13 or newer):
```
cd source
npm install
npm run dev
```
then open the address it prints (usually http://localhost:5173). `source/README.md` and
`source/PROJECT_STATE.md` explain the project in detail.
