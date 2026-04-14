import asyncio
import json
from playwright.async_api import async_playwright
from playwright_stealth import stealth_async

async def run():
    async with async_playwright() as p:
        b = await p.chromium.launch(headless=True, args=[
            '--disable-blink-features=AutomationControlled',
        ])
        c = await b.new_context(
            user_agent='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            viewport={'width': 1920, 'height': 1080},
        )
        page = await c.new_page()
        await stealth_async(page)
        
        try:
            print("Navigating to user profile...")
            await page.goto("https://www.airbnb.com.br/users/show/1462996042612541438", wait_until="networkidle", timeout=20000)
            
            # Check if we were redirected to login
            url = page.url
            if "login" in url:
                print("Redirected to login! Stealth failed.")
                return

            print("No login redirect. Analyzing JS variables...")
            
            # Wait for data-state
            try:
                await page.wait_for_selector('#data-state', timeout=5000)
                data = await page.evaluate("() => document.getElementById('data-state')?.innerHTML")
                if data:
                    print("Found #data-state. Length:", len(data))
                    if "ContextualPublicProfileQuery" in data:
                        print("ContextualPublicProfileQuery is inside data-state!")
                    else:
                        print("No ContextualPublicProfileQuery in data-state.")
            except Exception as e:
                print("data-state selector exception:", e)
                
            
            # Since playwright is inside the page, let's see if we can find the data directly inside global apolloState
            has_apollo = await page.evaluate("() => !!window.__APOLLO_STATE__")
            print("window.__APOLLO_STATE__ present?", has_apollo)
            
        except Exception as e:
            print("Error:", e)
        finally:
            await b.close()

asyncio.run(run())
