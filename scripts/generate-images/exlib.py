"""Build .excalidraw files from Python and render them to SVG.

A figure is a Fig: shapes and text are added with rect(), ellipse(), arrow(),
text() and so on, and save() writes the .excalidraw file and the SVG beside
it.  The SVG is drawn by exlib_render.js (rough.js, the library Excalidraw
draws with) and gets a subset of Excalifont embedded, so it looks like the
Excalidraw app's own export.

Text is measured with the font's own metrics, so centring is exact and box()
warns when a label is wider than its box.

Needs what setup.sh fetches (rough.js, the font) and requirements.txt.
"""
import base64, io, json, os, random, string, subprocess
from fontTools.ttLib import TTFont
from fontTools import subset

HERE = os.path.dirname(os.path.abspath(__file__))
FONT = os.path.join(HERE, 'font', 'Excalifont-Latin.woff2')
if not os.path.exists(FONT):
    raise SystemExit('%s is missing; run setup.sh in %s first.' % (FONT, HERE))
_font = TTFont(FONT)
_cmap = _font.getBestCmap()
_hmtx = _font['hmtx']

INK = '#1e1e1e'
GRAY = ('#495057', '#dee2e6')
ORANGE = ('#e8590c', '#ffe8cc')
BLUE = ('#1971c2', '#a5d8ff')
GREEN = ('#2f9e44', '#b2f2bb')
TEAL = ('#0c8599', '#99e9f2')
RED = ('#e03131', '#ffc9c9')
YELLOW = ('#f08c00', '#ffec99')
VIOLET = ('#7048e8', '#e5dbff')
GRAPE = ('#9c36b5', '#eebefa')
LH = 1.25


def text_width(s, size):
    w = 0
    for ch in s:
        if ord(ch) not in _cmap:
            raise ValueError('glyph missing from Excalifont: %r in %r' % (ch, s))
        w += _hmtx[_cmap[ord(ch)]][0]
    return w * size / 1000.0


class Fig:
    def __init__(self, name):
        self.name = name
        self.els = []
        self.rng = random.Random(name)

    def _el(self, type_, x, y, w, h, stroke, bg='transparent', sw=2, style='solid',
            rough=1, roundness=None, fill='solid', **extra):
        el = {
            'id': ''.join(self.rng.choice(string.ascii_letters + string.digits) for _ in range(20)),
            'type': type_, 'x': x, 'y': y, 'width': w, 'height': h, 'angle': 0,
            'strokeColor': stroke, 'backgroundColor': bg, 'fillStyle': fill,
            'strokeWidth': sw, 'strokeStyle': style, 'roughness': rough, 'opacity': 100,
            'groupIds': [], 'frameId': None, 'index': None, 'roundness': roundness,
            'seed': self.rng.randrange(1, 2**31), 'version': 1,
            'versionNonce': self.rng.randrange(1, 2**31), 'isDeleted': False,
            'boundElements': None, 'updated': 1, 'link': None, 'locked': False,
        }
        el.update(extra)
        self.els.append(el)
        return el

    def rect(self, x, y, w, h, color=GRAY, bg=None, sw=2, style='solid', round=True, fill='solid'):
        stroke, back = color if isinstance(color, tuple) else (color, 'transparent')
        if bg is not None:
            back = bg
        return self._el('rectangle', x, y, w, h, stroke, back, sw, style,
                        roundness={'type': 3} if round else None, fill=fill)

    def ellipse(self, x, y, w, h, color=GRAY, bg=None, sw=2, style='solid'):
        stroke, back = color if isinstance(color, tuple) else (color, 'transparent')
        if bg is not None:
            back = bg
        return self._el('ellipse', x, y, w, h, stroke, back, sw, style, roundness={'type': 2})

    def circle(self, cx, cy, r, color=GRAY, bg=None, sw=2, style='solid'):
        return self.ellipse(cx - r, cy - r, 2 * r, 2 * r, color, bg, sw, style)

    def _path(self, type_, pts, stroke, sw, style, curve, bg='transparent', start=None, end=None):
        x0, y0 = pts[0]
        rel = [[px - x0, py - y0] for px, py in pts]
        xs = [p[0] for p in rel]
        ys = [p[1] for p in rel]
        return self._el(type_, x0, y0, max(xs) - min(xs), max(ys) - min(ys), stroke, bg, sw, style,
                        roundness={'type': 2} if curve else None, points=rel,
                        lastCommittedPoint=None, startBinding=None, endBinding=None,
                        startArrowhead=start, endArrowhead=end, elbowed=False)

    def line(self, pts, color=INK, sw=2, style='solid', curve=False, bg='transparent'):
        stroke = color[0] if isinstance(color, tuple) else color
        return self._path('line', pts, stroke, sw, style, curve, bg)

    def poly(self, pts, color=GRAY, sw=2, bg=None):
        stroke, back = color if isinstance(color, tuple) else (color, 'transparent')
        if bg is not None:
            back = bg
        return self._path('line', list(pts) + [pts[0]], stroke, sw, 'solid', False, back)

    def arrow(self, pts, color=INK, sw=2, style='solid', curve=False, start=None, end='arrow'):
        stroke = color[0] if isinstance(color, tuple) else color
        return self._path('arrow', pts, stroke, sw, style, curve, start=start, end=end)

    def text(self, x, y, s, size=16, color=INK, align='left'):
        """x is the left edge, the centre or the right edge, by `align`."""
        stroke = color[0] if isinstance(color, tuple) else color
        lines = s.split('\n')
        w = max(text_width(l, size) for l in lines)
        h = len(lines) * size * LH
        left = x if align == 'left' else x - w / 2 if align == 'center' else x - w
        self._el('text', round(left, 1), y, round(w, 1), round(h, 1), stroke, text=s, fontSize=size,
                 fontFamily=5, textAlign=align, verticalAlign='top', containerId=None,
                 originalText=s, autoResize=True, lineHeight=LH)
        return w, h

    def ctext(self, cx, cy, s, size=16, color=INK):
        """Text centred on a point, both ways."""
        h = len(s.split('\n')) * size * LH
        return self.text(cx, cy - h / 2, s, size, color, 'center')

    def box(self, x, y, w, h, s, color=GRAY, size=16, tcolor=None, sw=2, style='solid', bg=None):
        self.rect(x, y, w, h, color, sw=sw, style=style, bg=bg)
        tw, _ = self.ctext(x + w / 2, y + h / 2, s, size, tcolor or (color[0] if isinstance(color, tuple) else color))
        if tw > w - 6:
            print('  ! text wider than box in %s: %r (%.0f > %.0f)' % (self.name, s, tw, w))

    def save(self, path_noext):
        os.makedirs(os.path.dirname(path_noext), exist_ok=True)
        doc = {'type': 'excalidraw', 'version': 2, 'source': 'https://excalidraw.com',
               'elements': self.els,
               'appState': {'gridSize': 20, 'gridStep': 5, 'gridModeEnabled': False,
                            'viewBackgroundColor': '#ffffff'},
               'files': {}}
        with open(path_noext + '.excalidraw', 'w') as f:
            json.dump(doc, f, indent=1)
            f.write('\n')
        subprocess.run(['node', os.path.join(HERE, 'exlib_render.js'), path_noext + '.excalidraw',
                        path_noext + '.svg'], check=True)
        chars = set(' ')
        for el in self.els:
            if el['type'] == 'text':
                chars.update(el['text'].replace('\n', ''))
        opts = subset.Options()
        opts.flavor = 'woff2'
        opts.layout_features = ['*']
        # No timestamp in the subset, so the same figure renders to the same bytes.
        font = TTFont(FONT, recalcTimestamp=False)
        sub = subset.Subsetter(opts)
        sub.populate(unicodes=[ord(c) for c in chars])
        sub.subset(font)
        buf = io.BytesIO()
        font.flavor = 'woff2'
        font.save(buf)
        svg = open(path_noext + '.svg').read().replace('@@FONT@@', base64.b64encode(buf.getvalue()).decode())
        open(path_noext + '.svg', 'w').write(svg)
        print('wrote', path_noext + '.svg', len(self.els), 'elements')
