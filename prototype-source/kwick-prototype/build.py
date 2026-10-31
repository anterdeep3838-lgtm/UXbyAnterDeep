#!/usr/bin/env python3
"""Rebuild app/app.js from the editable modules in src/.
Usage:  python build.py        (Python 3, no packages needed)
Edit files in src/app/ (the KwicK screens, data and components), then run this script.
Files are joined in the order listed in src/build-order.json."""
import json, os
here = os.path.dirname(os.path.abspath(__file__))
order = json.load(open(os.path.join(here, 'src', 'build-order.json')))
out = ''.join(open(os.path.join(here, 'src', f), encoding='utf8').read() for f in order)
open(os.path.join(here, 'app', 'app.js'), 'w', encoding='utf8', newline='').write(out)
print('Wrote app/app.js', round(len(out) / 1024), 'KB from', len(order), 'files')
