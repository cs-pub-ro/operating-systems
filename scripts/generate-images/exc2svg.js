// Render an .excalidraw file to SVG the way the Excalidraw app exports it:
// shapes through rough.js (hand-drawn strokes), text in Excalifont, which is
// embedded as a (subset) woff2 passed with --font.
//
//   node exc2svg.js in.excalidraw out.svg [--font subset.woff2]
const fs = require('fs');
const rough = require('roughjs/bundled/rough.cjs');

const [,, src, dst, ...rest] = process.argv;
let fontFile = null;
for (let i = 0; i < rest.length; i++) if (rest[i] === '--font') fontFile = rest[i + 1];

const drawing = JSON.parse(fs.readFileSync(src, 'utf8'));
const els = drawing.elements.filter(e => !e.isDeleted);
const gen = rough.generator();
const PAD = 10;
const FONT_FAMILY = 'Excalifont, Xiaolai, Segoe UI Emoji';
const SANS = 'Helvetica, Segoe UI Emoji';
const MONO = 'Cascadia, Segoe UI Emoji';

const f = v => Number(v.toFixed(2));

function bbox() {
  let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
  for (const e of els) {
    if (['arrow', 'line', 'freedraw'].includes(e.type)) {
      for (const [px, py] of e.points) { x0 = Math.min(x0, e.x + px); y0 = Math.min(y0, e.y + py); x1 = Math.max(x1, e.x + px); y1 = Math.max(y1, e.y + py); }
    } else {
      x0 = Math.min(x0, e.x); y0 = Math.min(y0, e.y); x1 = Math.max(x1, e.x + e.width); y1 = Math.max(y1, e.y + e.height);
    }
  }
  return [x0 - PAD, y0 - PAD, x1 + PAD, y1 + PAD];
}

function roughOpts(e, extra) {
  const o = {
    seed: e.seed || 1,
    roughness: e.roughness == null ? 1 : e.roughness,
    stroke: e.strokeColor,
    strokeWidth: e.strokeWidth,
    fill: (e.backgroundColor && e.backgroundColor !== 'transparent') ? e.backgroundColor : undefined,
    fillStyle: e.fillStyle || 'hachure',
    fillWeight: e.strokeWidth / 2,
    hachureGap: e.strokeWidth * 4,
    disableMultiStroke: e.strokeStyle !== 'solid',
    preserveVertices: true,
  };
  if (e.strokeStyle === 'dashed') o.strokeLineDash = [8, 8 + e.strokeWidth];
  if (e.strokeStyle === 'dotted') o.strokeLineDash = [1.5, 6 + e.strokeWidth];
  return Object.assign(o, extra || {});
}

function pathsToSvg(drawable, e, dashed) {
  let out = '';
  for (const p of gen.toPaths(drawable)) {
    const attrs = [`d="${p.d}"`];
    attrs.push(`stroke="${p.stroke}"`, `stroke-width="${p.strokeWidth}"`, `fill="${p.fill}"`);
    if (p.stroke !== 'none' && dashed !== false && e.strokeStyle === 'dashed') attrs.push(`stroke-dasharray="${8} ${8 + e.strokeWidth}"`);
    if (p.stroke !== 'none' && dashed !== false && e.strokeStyle === 'dotted') attrs.push(`stroke-dasharray="${1.5} ${6 + e.strokeWidth}"`);
    if (p.stroke !== 'none') attrs.push('stroke-linecap="round"', 'stroke-linejoin="round"');
    out += `<path ${attrs.join(' ')}/>`;
  }
  return out;
}

function cornerRadius(e) {
  if (!e.roundness) return 0;
  const m = Math.min(e.width, e.height);
  if (e.roundness.type === 3) return Math.min(32, m * 0.25);
  return m * 0.25;
}

function rectangle(e) {
  const r = cornerRadius(e);
  if (!r) return pathsToSvg(gen.rectangle(e.x, e.y, e.width, e.height, roughOpts(e)), e);
  const { x, y, width: w, height: h } = e;
  const d = `M ${x + r} ${y} L ${x + w - r} ${y} Q ${x + w} ${y}, ${x + w} ${y + r} L ${x + w} ${y + h - r} Q ${x + w} ${y + h}, ${x + w - r} ${y + h} L ${x + r} ${y + h} Q ${x} ${y + h}, ${x} ${y + h - r} L ${x} ${y + r} Q ${x} ${y}, ${x + r} ${y}`;
  return pathsToSvg(gen.path(d, roughOpts(e)), e);
}

function ellipse(e) {
  return pathsToSvg(gen.ellipse(e.x + e.width / 2, e.y + e.height / 2, e.width, e.height, roughOpts(e)), e);
}

function diamond(e) {
  const { x, y, width: w, height: h } = e;
  return pathsToSvg(gen.polygon([[x + w / 2, y], [x + w, y + h / 2], [x + w / 2, y + h], [x, y + h / 2]], roughOpts(e)), e);
}

function arrowhead(e, pts, which) {
  // Excalidraw: a 25px head at 20 degrees, shortened on short segments.
  const n = pts.length;
  let [x2, y2] = which === 'end' ? pts[n - 1] : pts[0];
  let [x1, y1] = which === 'end' ? pts[n - 2] : pts[1];
  const len = Math.hypot(x2 - x1, y2 - y1);
  if (len === 0) return '';
  const size = Math.min(25, len / 2);
  const nx = (x2 - x1) / len, ny = (y2 - y1) / len;
  const xs = x2 - nx * size, ys = y2 - ny * size;
  const ang = 20 * Math.PI / 180;
  const rot = (px, py, a) => [x2 + (px - x2) * Math.cos(a) - (py - y2) * Math.sin(a), y2 + (px - x2) * Math.sin(a) + (py - y2) * Math.cos(a)];
  const [x3, y3] = rot(xs, ys, ang);
  const [x4, y4] = rot(xs, ys, -ang);
  const o = roughOpts(e, { fill: undefined, strokeLineDash: undefined, disableMultiStroke: false });
  return pathsToSvg(gen.line(x2, y2, x3, y3, o), e, false) + pathsToSvg(gen.line(x2, y2, x4, y4, o), e, false);
}

function linear(e) {
  const pts = e.points.map(([px, py]) => [e.x + px, e.y + py]);
  if (pts.length < 2) return '';
  const o = roughOpts(e, { fill: undefined });
  let out = '';
  if (e.roundness && pts.length > 2) out += pathsToSvg(gen.curve(pts, o), e);
  else out += pathsToSvg(gen.linearPath(pts, o), e);
  if (e.type === 'arrow') {
    if (e.endArrowhead) out += arrowhead(e, pts, 'end');
    if (e.startArrowhead) out += arrowhead(e, pts, 'start');
  }
  return out;
}

function freedraw(e) {
  const pts = e.points.map(([px, py]) => [e.x + px, e.y + py]);
  const w = Math.max(1, e.strokeWidth * 1.6);
  if (pts.length < 2 || pts.every(([px, py]) => Math.abs(px - pts[0][0]) < 0.5 && Math.abs(py - pts[0][1]) < 0.5)) {
    return `<circle cx="${f(pts[0][0])}" cy="${f(pts[0][1])}" r="${f(w)}" fill="${e.strokeColor}"/>`;
  }
  const d = 'M' + pts.map(([px, py]) => `${f(px)} ${f(py)}`).join(' L');
  return `<path d="${d}" fill="none" stroke="${e.strokeColor}" stroke-width="${f(w)}" stroke-linecap="round" stroke-linejoin="round"/>`;
}

const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function text(e) {
  const fs_ = e.fontSize || 20;
  const fam = e.fontFamily === 2 ? SANS : e.fontFamily === 3 ? MONO : FONT_FAMILY;
  const lh = e.lineHeight || 1.25;
  const lines = (e.text || '').split('\n');
  let x, anchor;
  if (e.textAlign === 'center') { x = e.x + e.width / 2; anchor = 'middle'; }
  else if (e.textAlign === 'right') { x = e.x + e.width; anchor = 'end'; }
  else { x = e.x; anchor = 'start'; }
  // Excalifont metrics: ascender 0.886, descender 0.374 of the em.
  const base = e.y + fs_ * (lh - 1.26) / 2 + 0.886 * fs_;
  const rot = e.angle ? ` transform="rotate(${f(e.angle * 180 / Math.PI)} ${f(e.x + e.width / 2)} ${f(e.y + e.height / 2)})"` : '';
  let out = '';
  lines.forEach((line, i) => {
    if (!line.trim()) return;
    out += `<text x="${f(x)}" y="${f(base + i * lh * fs_)}" font-family="${fam}" font-size="${fs_}px" fill="${e.strokeColor}" text-anchor="${anchor}" style="white-space: pre;" xml:space="preserve"${rot}>${esc(line)}</text>`;
  });
  return out;
}

function group(e, body) {
  const op = (e.opacity != null && e.opacity < 100) ? ` opacity="${e.opacity / 100}"` : '';
  const rot = (e.angle && e.type !== 'text') ? ` transform="rotate(${f(e.angle * 180 / Math.PI)} ${f(e.x + e.width / 2)} ${f(e.y + e.height / 2)})"` : '';
  return `<g${op}${rot}>${body}</g>\n`;
}

const [x0, y0, x1, y1] = bbox();
const W = x1 - x0, H = y1 - y0;
let body = '';
for (const e of els) {
  let s = '';
  switch (e.type) {
    case 'rectangle': s = rectangle(e); break;
    case 'ellipse': s = ellipse(e); break;
    case 'diamond': s = diamond(e); break;
    case 'line': case 'arrow': s = linear(e); break;
    case 'freedraw': s = freedraw(e); break;
    case 'text': s = text(e); break;
    default: process.stderr.write(`skipping ${e.type}\n`);
  }
  if (s) body += group(e, s);
}
let fontCss = '';
if (fontFile) {
  const b64 = fs.readFileSync(fontFile).toString('base64');
  fontCss = `<style class="style-fonts">@font-face { font-family: "Excalifont"; src: url(data:font/woff2;base64,${b64}); }</style>`;
}
const svg = `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${f(W)} ${f(H)}" width="${f(W)}" height="${f(H)}">
<!-- svg-source:excalidraw (rendered from the .excalidraw beside it with rough.js) -->
<defs>${fontCss}</defs>
<rect x="0" y="0" width="${f(W)}" height="${f(H)}" fill="#ffffff"/>
<g transform="translate(${f(-x0)} ${f(-y0)})">
${body}</g>
</svg>
`;
fs.writeFileSync(dst, svg);
console.log(dst);
