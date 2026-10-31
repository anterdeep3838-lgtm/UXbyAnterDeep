import sys,asyncio
from playwright.async_api import async_playwright
async def main():
    ids=sys.argv[1:] or [f's{i}' for i in range(1,9)]
    async with async_playwright() as p:
        b=await p.chromium.launch(); pg=await b.new_page(viewport={'width':1600,'height':1000},device_scale_factor=1)
        await pg.goto('file:///home/claude/site/outpace.html'); await pg.wait_for_timeout(800)
        for i in ids:
            await pg.evaluate(f"document.getElementById('{i}').scrollIntoView()"); await pg.wait_for_timeout(2600)
            el=await pg.query_selector('#'+i); await el.screenshot(path=f'/home/claude/outpace/shots/{i}.png')
        msgs=[]; await b.close()
asyncio.run(main())
