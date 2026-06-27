// Extract three wave centerlines from the logo and output smooth bezier SVG paths.
import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const logoFile = 'file://' + path.join(__dirname, 'images/logo-mark-new.svg');

const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 400, height: 400 });
await page.goto(logoFile, { waitUntil: 'networkidle2' });

const allPaths = await page.evaluate(() => {
  const skip = new Set();
  document.querySelectorAll('.cls-5, .cls-6').forEach(el => skip.add(el));
  return Array.from(document.querySelectorAll('path'))
    .filter(p => !skip.has(p))
    .map((p, i) => {
      const N = 600;
      const len = p.getTotalLength();
      const pts = [];
      for (let j = 0; j <= N; j++) {
        const pt = p.getPointAtLength(j / N * len);
        pts.push([+pt.x.toFixed(2), +pt.y.toFixed(2)]);
      }
      return { i, cls: p.getAttribute('class'), pts };
    });
});
await browser.close();

const byIdx = Object.fromEntries(allPaths.map(p => [p.i, p.pts]));
const groups = [
  { name: 'cls-1 (light)',  pts: byIdx[4] },
  { name: 'cls-4 (mid)',    pts: byIdx[3] },
  { name: 'cls-3 (dark)',   pts: [...byIdx[5], ...byIdx[0]] },
];

const allPts = groups.flatMap(g => g.pts);
const xMin = Math.min(...allPts.map(([x]) => x));
const xMax = Math.max(...allPts.map(([x]) => x));
const yMin = Math.min(...allPts.map(([,y]) => y));
const yMax = Math.max(...allPts.map(([,y]) => y));

const BINS = 36;
const sx = i  => +( i / BINS * 72 ).toFixed(2);
const sy = y  => +(1 + (y - yMin) / (yMax - yMin) * 18).toFixed(2);

function centerline(pts) {
  const buckets = Array.from({ length: BINS + 1 }, () => []);
  for (const [x, y] of pts) {
    const b = Math.round((x - xMin) / (xMax - xMin) * BINS);
    if (b >= 0 && b <= BINS) buckets[b].push(y);
  }
  return buckets.map((ys, b) => {
    if (!ys.length) return null;
    const s = [...ys].sort((a, c) => a - c);
    return [sx(b), sy(s[Math.floor(s.length / 2)])];
  });
}

function interpolate(arr) {
  const out = [...arr];
  for (let i = 0; i < out.length; i++) {
    if (out[i]) continue;
    let p = i - 1; while (p >= 0 && !out[p]) p--;
    let n = i + 1; while (n < out.length && !out[n]) n++;
    if (p >= 0 && n < out.length)
      out[i] = [sx(i), out[p][1] + (out[n][1] - out[p][1]) * (i - p) / (n - p)];
    else if (p >= 0) out[i] = [sx(i), out[p][1]];
    else if (n < out.length) out[i] = [sx(i), out[n][1]];
  }
  return out;
}

// Catmull-Rom → cubic bezier (tension = 1 = standard)
function catmullRomToBezier(pts) {
  const n = pts.length;
  let d = `M ${pts[0][0]},${pts[0][1]}`;
  for (let i = 0; i < n - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[Math.min(n - 1, i + 2)];
    const cp1x = +(p1[0] + (p2[0] - p0[0]) / 6).toFixed(2);
    const cp1y = +(p1[1] + (p2[1] - p0[1]) / 6).toFixed(2);
    const cp2x = +(p2[0] - (p3[0] - p1[0]) / 6).toFixed(2);
    const cp2y = +(p2[1] - (p3[1] - p1[1]) / 6).toFixed(2);
    d += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${p2[0]},${p2[1]}`;
  }
  return d;
}

// Approximate path length from keypoints
function pathLen(pts) {
  let len = 0;
  for (let i = 1; i < pts.length; i++)
    len += Math.hypot(pts[i][0]-pts[i-1][0], pts[i][1]-pts[i-1][1]);
  return len;
}

const paths = [];
for (const g of groups) {
  const full = interpolate(centerline(g.pts)).filter(Boolean);
  // Sample at every 4th bin (10 keypoints) for clean bezier
  const thin = full.filter((_, i) => i % 4 === 0);
  const d = catmullRomToBezier(thin);
  const len = pathLen(thin);
  console.log(`\n${g.name} (approx length: ${len.toFixed(1)}px):`);
  console.log(d);
  paths.push({ d, len });
}

const dasharray = Math.ceil(Math.max(...paths.map(p => p.len)) * 1.08);
console.log(`\nRecommended stroke-dasharray: ${dasharray}`);
