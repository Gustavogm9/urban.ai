import urllib.request
import re

api_key = "1f1097481fb2d1412588b082fbfdb12f"
url = "https://www.airbnb.com.br/users/show/1462996042612541438"
scraper_url = f"http://api.scraperapi.com?api_key={api_key}&url={url}"

try:
    print("Fetching via ScraperAPI...")
    req = urllib.request.Request(scraper_url)
    with urllib.request.urlopen(req) as response:
        html = response.read().decode('utf-8')
        print(f"Success! Fetched {len(html)} bytes.")
        
        # Check if login redirect still happened
        if "<title>Entrar" in html or "Cadastrar-se" in html:
            print("WARNING: Might be login page.")
        
        # Save HTML to analyze
        with open('scraper_test.html', 'w', encoding='utf-8') as f:
            f.write(html)
            
        print("HTML saved to scraper_test.html")
except Exception as e:
    print(f"Error fetching: {e}")
