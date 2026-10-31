@echo off
REM Starts a local web server for this prototype and opens it in your browser.
REM Needs Python 3 (python.org) OR Node.js (nodejs.org) installed.
cd /d "%~dp0app"
start "" http://localhost:8101/
where python >nul 2>nul && (python -m http.server 8101 & goto :eof)
npx --yes serve -l 8101 .
