import asyncio
import json
from playwright.async_api import async_playwright

async def run():
    async with async_playwright() as p:
        b = await p.chromium.launch(headless=True)
        c = await b.new_context(user_agent="Mozilla/5.0 (Windows; Win64; x64)")
        page = await c.new_page()
        try:
            await page.goto("https://www.airbnb.com.br/users/show/1462996042612541438", wait_until="networkidle", timeout=20000)
            data = await page.evaluate("() => document.getElementById('data-state')?.innerHTML")
            if data:
                print("Length of data-state:", len(data))
                # Try to find the properties
                if "staySupplyListings" in data:
                    print("staySupplyListings found in data-state!")
                elif "ContextualPublicProfileQuery" in data:
                    print("ContextualPublicProfileQuery found in data-state!")
            else:
                print("No data-state element found.")
        except Exception as e:
            print("Error:", e)
        finally:
            await b.close()

asyncio.run(run())
