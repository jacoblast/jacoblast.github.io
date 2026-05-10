import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const f = x =>  0.7 * Math.cos(0.8*x - 0.3);
const g = x =>  0.4 * Math.cos(0.9*x - 0.3) + 0.6;
const h = x => -0.7 * Math.cos(0.8*x - 0.4) + 0.3;
const j = x => -0.3 * Math.cos(0.8*x - 0.4) - 0.4;

const X_MIN = 0, X_MAX = 4;
const Y_MIN = -0.7, Y_MAX = 1;
const N = 40;

const sx = x => x / X_MAX * 72;
const sy = y => 1 + (Y_MAX - y) / (Y_MAX - Y_MIN) * 18;

function sample(fn) {
  return Array.from({ length: N + 1 }, (_, i) => {
    const x = X_MIN + (X_MAX - X_MIN) * i / N;
    return [+sx(x).toFixed(2), +sy(fn(x)).toFixed(2)];
  });
}

function catmullRom(pts) {
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

function pathLen(pts) {
  let len = 0;
  for (let i = 1; i < pts.length; i++)
    len += Math.hypot(pts[i][0] - pts[i-1][0], pts[i][1] - pts[i-1][1]);
  return len;
}

// Sample every 4th point for clean bezier (10 keypoints)
const fns = [f, g, h, j];
const paths = fns.map(fn => {
  const all = sample(fn);
  const thin = all.filter((_, i) => i % 4 === 0);
  return { d: catmullRom(thin), len: pathLen(thin) };
});

const dasharray = Math.ceil(Math.max(...paths.map(p => p.len)) * 1.08);

const svg = `<div class="string-divider reveal" aria-hidden="true"><svg viewBox="0 0 72 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${
  paths.map(p => `<path d="${p.d}"/>`).join('')
}</svg></div>\n`;

const out = path.join(__dirname, '_includes/string-divider.html');
fs.writeFileSync(out, svg);
console.log(`Written to ${out}`);
console.log(`stroke-dasharray: ${dasharray}`);
