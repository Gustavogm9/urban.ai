import asyncio
import re
import json
from playwright.async_api import async_playwright

async def debug_playwright():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context(
            user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
        )
        page = await context.new_page()

        async def handle_request(request):
            if "graphql" in request.url.lower():
                try:
                    post_data = request.post_data
                    if post_data:
                        data = json.loads(post_data)
                        ops = []
                        if isinstance(data, list):
                            for d in data:
                                ops.append(d.get("operationName"))
                        else:
                            ops.append(data.get("operationName"))
                        print(f"Captured GraphQL: {ops}")
                except Exception as e:
                    pass
        
        async def handle_response(response):
             if response.status in [403, 429]:
                 print(f"Access Denied on {response.url}: Status {response.status}")
             
        page.on("request", handle_request)
        page.on("response", handle_response)
        
        print("Navigating...")
        
        try:
            await page.goto("https://www.airbnb.com.br/users/show/1462996042612541438", wait_until="networkidle", timeout=20000)
            await asyncio.sleep(5)
        except Exception as e:
            print("Error:", e)
            
        print(await page.content())
        await browser.close()

if __name__ == "__main__":
    asyncio.run(debug_playwright())
