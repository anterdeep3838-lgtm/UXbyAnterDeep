"""Builds outpace.html from the editable deck parts.  python3 build.py [final]
Tokens in p*.html: {{i:name}} -> icon svg, {{mark}} / {{word}} -> Outpace logo svgs."""
import os, re, sys, json
here = os.path.dirname(os.path.abspath(__file__)); root = os.path.dirname(here)
out = os.environ.get('OUT') or ('/home/claude/site/outpace.html' if os.path.isdir('/home/claude/site') else os.path.normpath(os.path.join(root, '..', 'website', 'outpace.html')))
rd = lambda n: open(os.path.join(here, n), encoding='utf8').read()
I = json.load(open(os.path.join(root, 'icons.json'))); M = json.load(open(os.path.join(root, 'logo_mark.json'))); W = json.load(open(os.path.join(root, 'logo_word.json')))
ic = lambda m: f'<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">{I[m.group(1)]}</svg>'
parts = [p for p in ['p1', 'p2', 'p3', 'p4'] if os.path.exists(os.path.join(here, p + '.html'))]
css = ''.join(rd(p + '.css') for p in parts)
body = ''.join(rd(p + '.html') for p in parts)
body = re.sub(r'\{\{i:(\w+)\}\}', ic, body)
body = body.replace('{{mark}}', f'<svg viewBox="{M["vb"]}" aria-hidden="true"><path fill-rule="evenodd" d="{M["d"]}"/></svg>')
body = body.replace('{{word}}', f'<svg viewBox="{W["vb"]}" aria-hidden="true"><path fill-rule="evenodd" d="{W["d"]}"/></svg>')
NXT = {1: 'Next, Phase 2: research and insights, information architecture, key user flows, design iterations, and key decisions with their trade-offs.',
       2: 'Next, Phase 3: the core experience, Build Your Kit, and responsive design with accessibility.',
       3: 'Next, Phase 4: visual identity and design system, UX laws, outcomes, key learnings and the closing slide.'}
if len(parts) < 4 and not (len(sys.argv) > 1 and sys.argv[1] == 'final'):
    body += f'<div class="next"><span class="eb">Phase {len(parts)} of 4</span><p style="margin-top:18px">{NXT[len(parts)]}</p></div>\n'
html = rd('head.html').replace('</style>', css + '\n</style>', 1) + body + rd('foot.html')
html = html.replace('<main class="deck" id="deck">\n' + body, '<main class="deck" id="deck">\n' + body)
open(out, 'w', encoding='utf8').write(html); print('built', out, parts, len(html)//1024, 'KB')
