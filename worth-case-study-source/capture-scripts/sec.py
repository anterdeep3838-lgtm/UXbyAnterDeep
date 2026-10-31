import asyncio,json
from playwright.async_api import async_playwright
exec(open('cap4.py').read().split('async def main():')[0])
FIND="""(t)=>{const els=[...document.querySelectorAll('body *')].filter(e=>e.children.length<4&&e.textContent.trim()===t);if(!els.length)return null;let e=els[0];
 while(e&&e!==document.body){const cs=getComputedStyle(e);const r=parseFloat(cs.borderTopLeftRadius);const bg=cs.backgroundColor!=='rgba(0, 0, 0, 0)'||cs.backgroundImage!=='none';if(r>=14&&bg&&e.offsetWidth>200)break;e=e.parentElement}
 e.setAttribute('data-shot','1');return true}"""
async def shot(pg,name,sel=None,text=None,pad=10):
    if text:
        await pg.evaluate("document.querySelectorAll('[data-shot]').forEach(e=>e.removeAttribute('data-shot'))")
        ok=await pg.evaluate(FIND,text); sel='[data-shot]'
        if not ok: print('MISS',name); return
    loc=pg.locator(sel).first; await loc.scroll_into_view_if_needed(); await pg.wait_for_timeout(500)
    b=await loc.bounding_box()
    await pg.screenshot(path=f'sec/{name}.png',clip={'x':max(0,b['x']-pad),'y':max(0,b['y']-pad),'width':b['width']+2*pad,'height':b['height']+2*pad})
    print(name,round(b['width']),round(b['height']))
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(args=['--no-sandbox'])
        ctx=await b.new_context(viewport={'width':393,'height':852},device_scale_factor=3,is_mobile=True,has_touch=True)
        pg=await ctx.new_page(); await pg.clock.set_fixed_time('2026-10-23T19:30:00+05:30')
        await pg.goto(U); await pg.wait_for_timeout(1200)
        await pg.get_by_text('Skip',exact=True).first.click(); await pg.wait_for_timeout(800)
        await pg.get_by_text('Explore with demo data',exact=True).first.click(); await pg.wait_for_timeout(1500)
        R=open('cap4.py').read(); import re
        for m in re.findall(r'await pg\.evaluate\("""\(\(\)=>\{const d=JSON.*?"""\)', R)[:1]: await pg.evaluate(eval(m[len('await pg.evaluate('):-1]))
        await pg.evaluate(HEAL); await pg.reload(); await pg.wait_for_timeout(1800)
        await shot(pg,'n-card','.money-card')
        # clean dock
        await pg.add_style_tag(content='.main{visibility:hidden!important} body:before{display:none!important} body{background:#141517!important}')
        await pg.wait_for_timeout(400); await shot(pg,'n-dock','.dock',pad=26)
        await pg.add_style_tag(content='.main{visibility:visible!important}')
        await pg.evaluate("location.hash='#/budget'"); await pg.wait_for_timeout(1700)
        await shot(pg,'n-bud',text='Overall spending')
        await shot(pg,'n-budcat',text='Category budgets')
        await pg.evaluate("location.hash='#/savings'"); await pg.wait_for_timeout(1500)
        await shot(pg,'n-goal',text='Emergency Fund')
        await pg.evaluate("location.hash='#/analysis'"); await pg.wait_for_timeout(1700)
        await shot(pg,'n-where',text='Where it went')
        await pg.evaluate("location.hash='#/'"); await pg.wait_for_timeout(1200)
        await pg.locator('.dock-add').first.click(); await pg.wait_for_timeout(900)
        for k in ['4','2','0']: await pg.locator('.pad-key',has_text=k).first.click(); await pg.wait_for_timeout(100)
        await shot(pg,'n-add','.sheet',pad=0)
        await shot(pg,'n-pad','.pad')
        await pg.get_by_text('Continue',exact=True).first.click(); await pg.wait_for_timeout(1000)
        await pg.locator('.cat-opt').nth(0).click(); await pg.wait_for_timeout(300)
        await shot(pg,'n-cats','.cat-grid',pad=14)
        await pg.locator('.add-actions .btn-primary').first.click(); await pg.wait_for_timeout(2600)
        await shot(pg,'n-rcpt','.saved',pad=14)
        await pg.keyboard.press('Escape'); await pg.wait_for_timeout(800)
        await pg.evaluate("location.hash='#/'"); await pg.wait_for_timeout(1200)
        await pg.locator('.home-actions button').nth(1).click(); await pg.wait_for_timeout(900)
        await pg.locator('.voice-input input').first.fill('Spent about 2k at Phoenix mall'); await pg.get_by_text('Go',exact=True).first.click(); await pg.wait_for_timeout(2600)
        await shot(pg,'n-voice','.voice-review',pad=14)
        # old
        for k in ['home','Budget','add']:
            await pg.goto(f'file:///home/claude/worth/old/{k}.html'); await pg.wait_for_timeout(800)
            if k=='home': await shot(pg,'o-card',text='Money left')
            if k=='Budget':
                await pg.screenshot(path='sec/o-budfull.png',full_page=True); print(await pg.evaluate("document.body.innerText.slice(0,500)"))
            if k=='add': await shot(pg,'o-add','.scroll-area',pad=0)
        await b.close()
asyncio.run(main())
