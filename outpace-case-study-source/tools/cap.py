import sys,json,asyncio
from playwright.async_api import async_playwright
# jobs: name route w h dpr [scrollY]
JOBS=[l.split() for l in sys.stdin.read().strip().splitlines()]
INIT="""(()=>{const s=(k,v)=>localStorage.setItem('op:'+k,JSON.stringify(v));
if(!localStorage.getItem('op:cookies'))s('cookies',{essential:true,analytics:false,personal:false,marketing:false,at:'2026-10-25T10:00:00Z'});
if(!localStorage.getItem('op:compare'))s('compare',['cr-bat-g1','cr-bat-kw','cr-bat-tb']);})()"""
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch()
        for j in JOBS:
            n,route,w,h,d=j[:5]; sy=j[5] if len(j)>5 else '0'; nocmp='nocmp' in j
            ctx=await b.new_context(viewport={'width':int(w),'height':int(h)},device_scale_factor=float(d),reduced_motion='no-preference')
            await ctx.add_init_script(INIT)
            if nocmp: await ctx.add_init_script("localStorage.setItem('op:compare','[]')"); pg=await ctx.new_page()
            await pg.goto('file:///home/claude/outpace/site/index.html'+route); await pg.wait_for_timeout(1800)
            if sy!='0':
                if sy[0] in '#.': await pg.evaluate(f"(()=>{{const e=document.querySelector('{sy}');window.scrollTo(0,e.getBoundingClientRect().top+scrollY-90)}})()")
                else: await pg.evaluate(f'window.scrollTo(0,{sy})')
                await pg.wait_for_timeout(1600)
            await pg.mouse.move(5,int(h)-5); await pg.wait_for_timeout(400)
            await pg.screenshot(path=f'cap/{n}.png'); print(n); await ctx.close()
        await b.close()
asyncio.run(main())
