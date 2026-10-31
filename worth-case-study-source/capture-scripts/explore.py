import asyncio,sys
from playwright.async_api import async_playwright
U='file:///home/claude/worth/app.html'
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(args=['--no-sandbox'])
        ctx=await b.new_context(viewport={'width':393,'height':852},device_scale_factor=1,is_mobile=True,has_touch=True)
        pg=await ctx.new_page()
        await pg.goto(U); await pg.wait_for_timeout(1500)
        for step in sys.argv[1:]:
            await pg.get_by_text(step,exact=True).first.click(); await pg.wait_for_timeout(1200)
            print('>>',step,'|',pg.url.split('#')[-1],'|',(await pg.evaluate('document.body.innerText'))[:400].replace('\n',' | '))
        await pg.screenshot(path='cap/x.png')
        await ctx.storage_state(path='state.json')
        await b.close()
asyncio.run(main())
