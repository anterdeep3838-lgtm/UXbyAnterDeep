#!/bin/sh
# Starts a local web server for this prototype. Then open http://localhost:8101/
cd "$(dirname "$0")/app"
if command -v python3 >/dev/null; then python3 -m http.server 8101; else npx --yes serve -l 8101 .; fi
