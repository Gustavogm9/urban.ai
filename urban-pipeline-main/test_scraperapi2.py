import urllib.request
import re

api_key = "1f1097481fb2d1412588b082fbfdb12f"
url = "https://www.airbnb.com.br/users/show/1462996042612541438"
scraper_url = f"http://api.scraperapi.com?api_key={api_key}&url={url}&premium=true&render=true"

try:
    print("Fetching via ScraperAPI (premium=true, render=true)...")
    req = urllib.request.Request(scraper_url)
    with urllib.request.urlopen(req, timeout=120) as response:
        html = response.read().decode('utf-8')
        print(f"Success! Fetched {len(html)} bytes.")
        
        m = re.search(r'<title>(.*?)</title>', html)
        if m:
            print(f"Title: {m.group(1)}")
        else:
            print("No <title> found!")
        
        # Save HTML to analyze
        with open('scraper_test2.html', 'w', encoding='utf-8') as f:
            f.write(html)
            
        print("HTML saved to scraper_test2.html")
        
        # Search for hash
        if "ContextualPublicProfileQuery" in html:
            print("YES! FOUND 'ContextualPublicProfileQuery'!")
except Exception as e:
    print(f"Error fetching: {e}")
