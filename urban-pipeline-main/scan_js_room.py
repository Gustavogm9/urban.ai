import asyncio
import aiohttp
import re
from bs4 import BeautifulSoup

async def fetch_js_for_hash():
    async with aiohttp.ClientSession() as session:
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0 Safari/537.36'
        }
        print("Fetching airbnb room page...")
        # Using a known valid room ID from the audit
        async with session.get('https://www.airbnb.com.br/rooms/31193321', headers=headers) as resp:
            html = await resp.text()

        soup = BeautifulSoup(html, 'html.parser')
        scripts = soup.find_all('script', src=True)
        js_urls = [s['src'] for s in scripts if 'airbnb' in s['src'] and s['src'].endswith('.js')]
        
        print(f"Found {len(js_urls)} JS files on room page. Scanning...")
        
        async def fetch_and_search(url):
            try:
                async with session.get(url, headers=headers) as r:
                    content = await r.text()
                    if "ContextualPublicProfileQuery" in content:
                        print(f"BINGO! Found 'ContextualPublicProfileQuery' in {url}")
                        m = re.search(r'ContextualPublicProfileQuery.*?([a-f0-9]{64})', content)
                        if m:
                            print("REGEX MATCH near name:", m.group(1))
                            return m.group(1)
                        
                        # sometimes Hash is stored before the name in minified code
                        # e.g. {id:"123456789...",name:"ContextualPublicProfileQuery"}
                        hashes = re.findall(r'[a-f0-9]{64}', content)
                        if hashes:
                            print(f"Hashes found in the same file: {list(set(hashes))}")
            except Exception as e:
                pass
            return None

        tasks = [fetch_and_search(u) for u in js_urls]
        results = await asyncio.gather(*tasks)
        
        valid = [r for r in results if r]
        if valid:
            print("FINAL HASH:", valid[0])
        else:
            print("Query name not found in Room JS bundles.")

asyncio.run(fetch_js_for_hash())
