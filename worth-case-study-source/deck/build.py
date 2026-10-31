"""Builds website/worth.html from the editable deck parts in this folder.

Run from anywhere:   python3 build.py
Output:              ../../website/worth.html
Order of parts:      head.html (+ all p*.css inlined into its <style>) -> p1..p4.html -> foot.html
"""
import os
here = os.path.dirname(os.path.abspath(__file__))
out = os.path.normpath(os.path.join(here, '..', '..', 'website', 'worth.html'))
rd = lambda n: open(os.path.join(here, n), encoding='utf8').read()
parts = [p for p in ['p1', 'p2', 'p3', 'p4'] if os.path.exists(os.path.join(here, p + '.html'))]
css = ''.join(rd(p + '.css') for p in parts)
head = rd('head.html').replace('</style>', css + '\n</style>', 1)
body = ''.join(rd(p + '.html') for p in parts)
open(out, 'w', encoding='utf8').write(head + body + rd('foot.html'))
print('built', out, 'from', parts)
