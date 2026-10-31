import asyncio,sys
from playwright.async_api import async_playwright
sys.path.insert(0,'/home/claude/worth'); 
SB=open('/home/claude/worth/cap.py').read().split('SB="""')[1].split('"""')[0]
async def m():
    async with async_playwright() as p:
        b=await p.chromium.launch(args=['--no-sandbox'])
        ctx=await b.new_context(viewport={'width':393,'height':852},device_scale_factor=3)
        pg=await ctx.new_page()
        for k in ['add']:
            await pg.goto(f'file:///home/claude/worth/old/{k}.html'); await pg.wait_for_timeout(700)
            await pg.evaluate(SB.replace('.main{padding-top:64px!important}','body>div>div>div>div:first-child{padding-top:44px!important}').replace('#141517','#222222').replace('rgba(20,21,23,0)','rgba(34,34,34,0)'))
            await pg.wait_for_timeout(300); await pg.screenshot(path=f'o-{k.lower()}.png')
        await b.close()
asyncio.run(m())
