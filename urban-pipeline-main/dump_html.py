import asyncio
from playwright.async_api import async_playwright

async def run():
    async with async_playwright() as p:
        b = await p.chromium.launch(headless=True)
        c = await b.new_context(user_agent="Mozilla/5.0 (Windows; Win64; x64)")
        page = await c.new_page()
        try:
            await page.goto("https://www.airbnb.com.br/users/show/1462996042612541438", wait_until="networkidle", timeout=20000)
            html = await page.content()
            with open("airbnb_dump.html", "w", encoding="utf-8") as f:
                 f.write(html)
            print("Saved to airbnb_dump.html")
        except Exception as e:
            print("Error:", e)
        finally:
            await b.close()

asyncio.run(run())
