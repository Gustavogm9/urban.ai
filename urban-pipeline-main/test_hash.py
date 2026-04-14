import asyncio
import re
from playwright.async_api import async_playwright

async def run():
    async with async_playwright() as p:
        b = await p.chromium.launch(headless=True)
        c = await b.new_context(user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36")
        page = await c.new_page()
        found = None
        
        def h(r):
            nonlocal found
            m = re.search(r'ContextualPublicProfileQuery/([\da-f]{64})', r.url)
            if m:
                found = m.group(1)
                
        page.on('request', h)
        await page.goto('https://www.airbnb.com.br/users/show/1462996042612541438', wait_until='networkidle')
        await asyncio.sleep(5)
        print("HASH FOUND:", found)
        await b.close()

asyncio.run(run())
