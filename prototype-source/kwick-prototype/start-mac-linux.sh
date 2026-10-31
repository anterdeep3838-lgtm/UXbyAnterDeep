#!/bin/sh
# Starts a local web server for this prototype. Then open http://localhost:8102/
cd "$(dirname "$0")/app"
if command -v python3 >/dev/null; then python3 -m http.server 8102; else npx --yes serve -l 8102 .; fi
