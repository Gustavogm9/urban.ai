const { chromium } = require('playwright-extra');
const stealth = require('puppeteer-extra-plugin-stealth')();

chromium.use(stealth);

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  let found = null;
  page.on('request', req => {
      const match = req.url().match(/ContextualPublicProfileQuery\/([\da-f]{64})/);
      if (match) {
          found = match[1];
          console.log("HASH FOUND:", found);
      }
  });

  page.on('framenavigated', frame => {
      if (frame === page.mainFrame()) console.log("Navigated to:", frame.url());
  });

  try {
      console.log("Navigating to user profile...");
      await page.goto('https://www.airbnb.com.br/users/show/1462996042612541438', { waitUntil: 'domcontentloaded', timeout: 15000 });
      console.log("Current URL after load:", page.url());
      
      const title = await page.title();
      console.log("Page title:", title);
      
      // wait extra time
      await new Promise(r => setTimeout(r, 10000));
      
      if (found) {
        console.log("SUCCESS:", found);
      } else {
        console.log("FAIL: Hash not found in requests.");
      }
  } catch (err) {
      console.error(err);
  } finally {
      await browser.close();
  }
})();
