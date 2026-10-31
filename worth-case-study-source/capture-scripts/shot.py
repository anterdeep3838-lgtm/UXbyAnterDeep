import asyncio,sys
from playwright.async_api import async_playwright
from PIL import Image
async def main():
    only=[int(x) for x in sys.argv[1:]]
    async with async_playwright() as p:
        b=await p.chromium.launch(args=['--no-sandbox'])
        pg=await b.new_page(viewport={'width':1640,'height':1000})
        await pg.goto('file:///home/claude/site/worth.html'); await pg.wait_for_timeout(500)
        tops=await pg.evaluate("[...document.querySelectorAll('.sl')].map(s=>{const r=s.getBoundingClientRect();return [Math.round(r.top+scrollY),Math.round(r.height)]})")
        for i,(t,h) in enumerate(tops):
            if only and i+1 not in only: continue
            for y in range(t, t+h, 400):
                await pg.evaluate(f'scrollTo(0,{y})'); await pg.wait_for_timeout(350)
        await pg.wait_for_timeout(2500)
        await pg.evaluate("document.querySelector('.backbar').style.display='none';document.getElementById('progress').style.display='none'")
        await pg.screenshot(path='shots/full.png',full_page=True); await b.close()
    im=Image.open('shots/full.png')
    for i,(t,h) in enumerate(tops):
        if only and i+1 not in only: continue
        im.crop((20,t,1620,t+h)).save(f'shots/{i+1:02d}.png')
    print(len(tops))
asyncio.run(main())
