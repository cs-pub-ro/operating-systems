// Renderer behind exlib.py: draw an .excalidraw file as SVG with rough.js, the library Excalidraw
// itself draws with.  The font is left as a placeholder (@@FONT@@) that the
// caller replaces with a base64 subset of Excalifont.
//
//   node exlib_render.js in.excalidraw out.svg

const fs = require('fs');
const rough = require('roughjs/bundled/rough.cjs.js');

const [, , inPath, outPath] = process.argv;
const doc = JSON.parse(fs.readFileSync(inPath, 'utf8'));
const gen = rough.generator();
const PAD = 20;
const ASCENT = 886, DESCENT = -374, UPM = 1000;

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const r2 = (n) => Math.round(n * 100) / 100;

function dash(el) {
  if (el.strokeStyle === 'dashed') return [8, 8 + el.strokeWidth];
  if (el.strokeStyle === 'dotted') return [1.5, 6 + el.strokeWidth];
  return undefined;
}

function opts(el, extra = {}) {
  const o = {
    seed: el.seed,
    strokeLineDash: dash(el),
    disableMultiStroke: el.strokeStyle !== 'solid',
    strokeWidth: el.strokeStyle !== 'solid' ? el.strokeWidth + 0.5 : el.strokeWidth,
    fillWeight: el.strokeWidth / 2,
    hachureGap: el.strokeWidth * 4,
    roughness: el.roughness,
    stroke: el.strokeColor,
    preserveVertices: el.roughness < 2,
    ...extra,
  };
  if (el.backgroundColor && el.backgroundColor !== 'transparent' && extra.fill !== false) {
    o.fill = el.backgroundColor;
    o.fillStyle = el.fillStyle || 'solid';
  }
  if (o.fill === false) delete o.fill;
  return o;
}

function pathsOf(drawable) {
  let out = '';
  for (const p of gen.toPaths(drawable)) {
    const attrs = [`d="${p.d}"`];
    attrs.push(`stroke="${p.stroke || 'none'}"`);
    attrs.push(`stroke-width="${p.strokeWidth || 0}"`);
    attrs.push(`fill="${p.fill || 'none'}"`);
    if (p.stroke && p.stroke !== 'none') attrs.push('stroke-linecap="round" stroke-linejoin="round"');
    out += `<path ${attrs.join(' ')}/>`;
  }
  return out;
}

function withDash(el, svg) {
  const d = dash(el);
  if (!d) return svg;
  return svg.replace(/<path /g, `<path stroke-dasharray="${d.join(' ')}" `);
}

function arrowhead(el, pts, atEnd, kind) {
  const n = pts.length;
  const tip = atEnd ? pts[n - 1] : pts[0];
  const prev = atEnd ? pts[n - 2] : pts[1];
  const dx = tip[0] - prev[0], dy = tip[1] - prev[1];
  let total = 0;
  for (let i = 1; i < n; i++) total += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
  const size = kind === 'triangle' ? 15 : 30;
  const angle = ((kind === 'triangle' ? 25 : 20) * Math.PI) / 180;
  const len = Math.min(size, total / 2);
  const d = Math.hypot(dx, dy) || 1;
  const ux = dx / d, uy = dy / d;
  const bx = tip[0] - ux * len, by = tip[1] - uy * len;
  const rot = (px, py, a) => {
    const c = Math.cos(a), s = Math.sin(a);
    return [tip[0] + (px - tip[0]) * c - (py - tip[1]) * s, tip[1] + (px - tip[0]) * s + (py - tip[1]) * c];
  };
  const p1 = rot(bx, by, angle), p2 = rot(bx, by, -angle);
  const o = opts(el, { fill: false, strokeLineDash: undefined, disableMultiStroke: false, strokeWidth: el.strokeWidth });
  delete o.fill;
  if (kind === 'triangle') {
    return pathsOf(gen.polygon([tip, p1, p2], { ...o, fill: el.strokeColor, fillStyle: 'solid' }));
  }
  return pathsOf(gen.line(tip[0], tip[1], p1[0], p1[1], o)) + pathsOf(gen.line(tip[0], tip[1], p2[0], p2[1], o));
}

function render(el) {
  const { x, y, width: w, height: h } = el;
  let body = '';
  switch (el.type) {
    case 'rectangle': {
      if (el.roundness) {
        const r = Math.min(w, h) * 0.25 > 32 ? 32 : Math.min(w, h) * 0.25;
        const d = `M ${r} 0 L ${w - r} 0 Q ${w} 0, ${w} ${r} L ${w} ${h - r} Q ${w} ${h}, ${w - r} ${h} L ${r} ${h} Q 0 ${h}, 0 ${h - r} L 0 ${r} Q 0 0, ${r} 0`;
        body = pathsOf(gen.path(d, opts(el)));
      } else {
        body = pathsOf(gen.rectangle(0, 0, w, h, opts(el)));
      }
      body = withDash(el, body);
      break;
    }
    case 'ellipse':
      body = withDash(el, pathsOf(gen.ellipse(w / 2, h / 2, w, h, opts(el, { curveFitting: 1 }))));
      break;
    case 'diamond': {
      const pts = [[w / 2, 0], [w, h / 2], [w / 2, h], [0, h / 2]];
      body = withDash(el, pathsOf(gen.polygon(pts, opts(el))));
      break;
    }
    case 'line':
    case 'arrow': {
      const pts = el.points;
      const closed = pts.length > 2 && pts[0][0] === pts[pts.length - 1][0] && pts[0][1] === pts[pts.length - 1][1];
      const o = opts(el, closed ? {} : { fill: false });
      if (!closed) delete o.fill;
      let shape;
      if (el.roundness && pts.length > 2) shape = gen.curve(pts, o);
      else if (closed) shape = gen.polygon(pts.slice(0, -1), o);
      else shape = gen.linearPath(pts, o);
      body = withDash(el, pathsOf(shape));
      if (el.endArrowhead) body += arrowhead(el, pts, true, el.endArrowhead);
      if (el.startArrowhead) body += arrowhead(el, pts, false, el.startArrowhead);
      break;
    }
    case 'text': {
      const lines = el.text.split('\n');
      const lh = el.lineHeight * el.fontSize;
      const lineGap = el.lineHeight * UPM - (ASCENT - DESCENT);
      const off = (el.fontSize * (ASCENT + lineGap / 2)) / UPM;
      const anchor = { left: 'start', center: 'middle', right: 'end' }[el.textAlign] || 'start';
      const tx = el.textAlign === 'center' ? w / 2 : el.textAlign === 'right' ? w : 0;
      lines.forEach((line, i) => {
        body += `<text x="${r2(tx)}" y="${r2(off + i * lh)}" font-family="Excalifont, Xiaolai, Segoe UI Emoji" font-size="${el.fontSize}px" fill="${el.strokeColor}" text-anchor="${anchor}" style="white-space: pre;" xml:space="preserve">${esc(line)}</text>`;
      });
      break;
    }
    default:
      throw new Error(`unsupported element type ${el.type}`);
  }
  let tr = `translate(${r2(x)} ${r2(y)})`;
  if (el.angle) tr += ` rotate(${r2((el.angle * 180) / Math.PI)} ${r2(w / 2)} ${r2(h / 2)})`;
  const op = el.opacity !== undefined && el.opacity !== 100 ? ` opacity="${el.opacity / 100}"` : '';
  return `<g transform="${tr}"${op}>${body}</g>`;
}

// Bounds.
let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
const els = doc.elements.filter((e) => !e.isDeleted);
for (const el of els) {
  let ex0 = el.x, ey0 = el.y, ex1 = el.x + el.width, ey1 = el.y + el.height;
  if (el.points) {
    const xs = el.points.map((p) => p[0] + el.x), ys = el.points.map((p) => p[1] + el.y);
    ex0 = Math.min(...xs); ex1 = Math.max(...xs); ey0 = Math.min(...ys); ey1 = Math.max(...ys);
  }
  x0 = Math.min(x0, ex0); y0 = Math.min(y0, ey0); x1 = Math.max(x1, ex1); y1 = Math.max(y1, ey1);
}
const W = r2(x1 - x0 + 2 * PAD), H = r2(y1 - y0 + 2 * PAD);

let svg = `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">\n`;
svg += '<!-- svg-source:excalidraw (rendered from the .excalidraw beside it with rough.js) -->\n';
svg += '<defs><style class="style-fonts">@font-face { font-family: "Excalifont"; src: url(data:font/woff2;base64,@@FONT@@); }</style></defs>\n';
svg += `<rect x="0" y="0" width="${W}" height="${H}" fill="${doc.appState.viewBackgroundColor || '#ffffff'}"/>\n`;
svg += `<g transform="translate(${r2(PAD - x0)} ${r2(PAD - y0)})">\n`;
for (const el of els) svg += render(el) + '\n';
svg += '</g>\n</svg>\n';
fs.writeFileSync(outPath, svg);
