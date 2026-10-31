# Belong prototype

Rental app: tenants find homes and roommates, landlords list properties. React 19 + Tailwind v4.

## Run
- Windows: double-click `start-windows.bat`, then open http://localhost:8101/
- Mac/Linux: `./start-mac-linux.sh`, then open http://localhost:8101/
- `index.html` = desktop view (phone column on red gradient). `app.html` = the app full screen.

## Folders
```
belong-prototype/
└── app/                       <- the runnable site (serve this folder)
    ├── index.html             desktop frame + background
    ├── app.html               the app page
    ├── css/
    │   ├── belong.css         Belong's own styles (screens, cards, sheets). Edit this for visual changes.
    │   └── tailwind.css       Tailwind utility layer (generated, leave as is)
    ├── js/
    │   ├── assets.js          maps every image path the app uses to a file in images/
    │   └── app.js             the app: React + all screens and logic
    ├── images/                46 images: logo, listing photos (p00-p24), sprites, profile photos
    └── fonts/                 Plus Jakarta Sans (self-hosted, OFL licence)
```

## Editing
- Text, screens, data: `js/app.js`. Search for the words you see on screen (for example "Find a place where you belong")
  and edit next to them. Listing data (cities, prices, owners) is near the top of the app section.
- Look and feel: `css/belong.css`.
- Images: replace a file in `images/` with one of the same name, or point `js/assets.js` at a new file.
- No build step: save and refresh.

## About the source
The original React/TypeScript project for Belong is not in these files; the app was delivered as a single
compiled HTML file. This folder splits that file back into separate CSS, JavaScript, image and font files and
formats the JavaScript so it can be read and edited. Component names and all text are intact; local variable
names are short (a, e, t...) because the build shortened them. If you need the original .tsx project, it has to
come from wherever Belong was first built.
