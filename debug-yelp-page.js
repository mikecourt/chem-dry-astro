/**
 * Debug script to inspect Yelp page structure
 */

const puppeteer = require('puppeteer');
const fs = require('fs');

const YELP_URL = 'https://www.yelp.com/biz/brimleys-white-glove-chem-dry-mesa-2';

async function debugPage() {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({
    headless: false, // Run in visible mode
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

    console.log('Navigating to Yelp page...');
    await page.goto(YELP_URL, { waitUntil: 'networkidle2', timeout: 60000 });

    // Wait a bit for dynamic content
    await new Promise(resolve => setTimeout(resolve, 5000));

    // Take screenshot
    await page.screenshot({ path: 'yelp-page-screenshot.png', fullPage: true });
    console.log('Screenshot saved to yelp-page-screenshot.png');

    // Get page HTML
    const html = await page.content();
    fs.writeFileSync('yelp-page-full.html', html);
    console.log('Full HTML saved to yelp-page-full.html');

    // Log some info about what we found
    const info = await page.evaluate(() => {
      return {
        title: document.title,
        bodyClasses: document.body.className,
        hasReviews: !!document.querySelector('ul[role="list"]'),
        reviewSelectors: [
          { selector: '[data-testid="review-card"]', count: document.querySelectorAll('[data-testid="review-card"]').length },
          { selector: 'li[data-review-id]', count: document.querySelectorAll('li[data-review-id]').length },
          { selector: '.review', count: document.querySelectorAll('.review').length },
          { selector: 'ul[role="list"] > li', count: document.querySelectorAll('ul[role="list"] > li').length }
        ]
      };
    });

    console.log('\nPage info:', JSON.stringify(info, null, 2));

    console.log('\nBrowser will stay open for 30 seconds for manual inspection...');
    await new Promise(resolve => setTimeout(resolve, 30000));

  } finally {
    await browser.close();
  }
}

debugPage().catch(console.error);
