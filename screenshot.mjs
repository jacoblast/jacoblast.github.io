import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const url      = process.argv[2] || 'http://localhost:4000';
const label    = process.argv[3] || '';
const selector = process.argv[4] || '';  // optional CSS selector to crop to
const PADDING  = 24;                     // px around cropped element

const outDir = path.join(__dirname, 'temporary screenshots');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);

let n = 1;
let filename;
do {
  filename = label ? `screenshot-${n}-${label}.png` : `screenshot-${n}.png`;
  n++;
} while (fs.existsSync(path.join(outDir, filename)));

const outPath = path.join(outDir, filename);

const browser = await puppeteer.launch({
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});

const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });

// Force-reveal all animated elements so scroll position doesn't matter
// and the nav never gets a chance to hide.
await page.evaluate(() => {
  document.querySelectorAll('.reveal, .string-divider').forEach(el => el.classList.add('in-view'));
  document.querySelectorAll('.hero-seq').forEach(el => el.classList.add('visible'));
  document.querySelectorAll('.card-wave').forEach(el => el.classList.add('in-view'));
  const heroReviews = document.querySelector('.hero-reviews');
  if (heroReviews) heroReviews.classList.add('stars-animate');
});

// Wait for CSS transitions to finish (longest reveal is ~0.75s)
await new Promise(r => setTimeout(r, 900));

if (selector) {
  const box = await page.$eval(selector, (el, pad) => {
    const r = el.getBoundingClientRect();
    return {
      x:      Math.max(0, r.left - pad),
      y:      Math.max(0, r.top  - pad),
      width:  r.width  + pad * 2,
      height: r.height + pad * 2,
    };
  }, PADDING);
  await page.screenshot({ path: outPath, clip: box });
} else {
  await page.screenshot({ path: outPath, fullPage: true });
}

await browser.close();
console.log(`Screenshot saved: ${outPath}`);
