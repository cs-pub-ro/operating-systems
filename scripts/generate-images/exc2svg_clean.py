#!/usr/bin/env python3
"""Render an Excalidraw drawing to a clean-line SVG.

The diagrams under content/**/media/ are drawn in Excalidraw and committed as
the `.excalidraw` JSON the tool saves.  A browser will not show that through an
`![...]()`, and the SVG the Excalidraw app exports embeds its whole font and
its own copy of the drawing, so this script renders the JSON itself: every
shape as a plain SVG primitive, text as text, nothing hand-drawn about it
("clean-line render").  It is the SVG the READMEs and the slides point at.

    scripts/exc2svg.py drawing.excalidraw            # writes drawing.svg
    scripts/exc2svg.py drawing.excalidraw out.svg
    scripts/exc2svg.py --font Excalifont.woff2 ...   # embed a (subset) font

The elements it knows are the ones the drawings use: rectangle, ellipse,
diamond, line, arrow, freedraw and text, with stroke colour, fill, width,
dashed or dotted style, rounded corners, arrowheads and rotation.  Anything
else is skipped with a warning.
"""

import argparse
import base64
import json
import math
import sys
from xml.sax.saxutils import escape

FONT_STACK = {
    1: "Virgil, Segoe UI, Comic Sans MS, sans-serif",
    2: "Helvetica, Arial, sans-serif",
    3: "Cascadia, Consolas, Menlo, monospace",
    5: "Excalifont, Segoe UI, Comic Sans MS, sans-serif",
    6: "Lilita One, Segoe UI, sans-serif",
    7: "Nunito, Segoe UI, sans-serif",
    8: "Comic Shanns, Cascadia, monospace",
}
DEFAULT_FONT = "Segoe UI, Helvetica, Arial, sans-serif"
LINE_HEIGHT = {1: 1.25, 2: 1.15, 3: 1.2, 5: 1.25, 6: 1.15, 7: 1.35, 8: 1.25}
PAD = 20.0


def fmt(v):
    return f"{v:.2f}"


def dash(style, width):
    if style == "dashed":
        return f' stroke-dasharray="{fmt(4 * width)} {fmt(3 * width)}"'
    if style == "dotted":
        return f' stroke-dasharray="{fmt(width)} {fmt(3 * width)}"'
    return ""


def fill_of(el):
    bg = el.get("backgroundColor", "transparent")
    return "none" if bg in (None, "transparent") else bg


def rotation(el):
    angle = el.get("angle") or 0
    if abs(angle) < 1e-6:
        return ""
    cx = el["x"] + el["width"] / 2
    cy = el["y"] + el["height"] / 2
    return f' transform="rotate({fmt(math.degrees(angle))} {fmt(cx)} {fmt(cy)})"'


def opacity(el):
    op = el.get("opacity", 100)
    return "" if op is None or op >= 100 else f' opacity="{op / 100:.2f}"'


def corner_radius(el):
    r = el.get("roundness")
    if not r:
        return 0.0
    m = min(el["width"], el["height"])
    if r.get("type") == 3:  # adaptive radius
        return min(32.0, 0.18 * m)
    return 0.25 * m  # proportional radius


class Renderer:
    def __init__(self, elements, font_file=None):
        self.elements = [e for e in elements if not e.get("isDeleted")]
        self.markers = {}
        self.out = []
        self.font_css = ""
        self.font_name = None
        if font_file:
            with open(font_file, "rb") as fh:
                data = base64.b64encode(fh.read()).decode("ascii")
            kind = "woff2" if font_file.endswith(".woff2") else "woff"
            self.font_name = "Excalifont"
            self.font_css = (
                f"@font-face {{ font-family: {self.font_name}; "
                f"src: url(data:font/{kind};base64,{data}) format('{kind}'); }}"
            )

    # -- geometry helpers --------------------------------------------------

    def bbox(self):
        xs, ys = [], []
        for e in self.elements:
            if e["type"] in ("arrow", "line", "freedraw"):
                for px, py in e.get("points", []):
                    xs.append(e["x"] + px)
                    ys.append(e["y"] + py)
            else:
                xs += [e["x"], e["x"] + e["width"]]
                ys += [e["y"], e["y"] + e["height"]]
        return min(xs) - PAD, min(ys) - PAD, max(xs) + PAD, max(ys) + PAD

    def marker(self, color):
        key = color.lstrip("#")
        if key not in self.markers:
            self.markers[key] = (
                f'<marker id="ah-{key}" viewBox="0 0 10 10" refX="8" refY="5" '
                f'markerWidth="7" markerHeight="7" orient="auto-start-reverse">'
                f'<path d="M0,0 L10,5 L0,10 z" fill="{color}"/></marker>'
            )
        return f"url(#ah-{key})"

    # -- element renderers -------------------------------------------------

    def rectangle(self, e):
        r = corner_radius(e)
        rx = f' rx="{fmt(r)}" ry="{fmt(r)}"' if r else ""
        self.out.append(
            f'<rect x="{fmt(e["x"])}" y="{fmt(e["y"])}" width="{fmt(e["width"])}" '
            f'height="{fmt(e["height"])}"{rx} fill="{fill_of(e)}" '
            f'stroke="{e["strokeColor"]}" stroke-width="{e["strokeWidth"]}" stroke-linecap="round"'
            f'{dash(e.get("strokeStyle"), e["strokeWidth"])}{rotation(e)}{opacity(e)}/>'
        )

    def ellipse(self, e):
        self.out.append(
            f'<ellipse cx="{fmt(e["x"] + e["width"] / 2)}" cy="{fmt(e["y"] + e["height"] / 2)}" '
            f'rx="{fmt(e["width"] / 2)}" ry="{fmt(e["height"] / 2)}" fill="{fill_of(e)}" '
            f'stroke="{e["strokeColor"]}" stroke-width="{e["strokeWidth"]}"'
            f'{dash(e.get("strokeStyle"), e["strokeWidth"])}{rotation(e)}{opacity(e)}/>'
        )

    def diamond(self, e):
        x, y, w, h = e["x"], e["y"], e["width"], e["height"]
        pts = [(x + w / 2, y), (x + w, y + h / 2), (x + w / 2, y + h), (x, y + h / 2)]
        d = " ".join(f"{fmt(px)},{fmt(py)}" for px, py in pts)
        self.out.append(
            f'<polygon points="{d}" fill="{fill_of(e)}" stroke="{e["strokeColor"]}" '
            f'stroke-width="{e["strokeWidth"]}" stroke-linejoin="round"'
            f'{dash(e.get("strokeStyle"), e["strokeWidth"])}{rotation(e)}{opacity(e)}/>'
        )

    def path_d(self, e, smooth):
        pts = [(e["x"] + px, e["y"] + py) for px, py in e["points"]]
        if len(pts) < 2:
            return None
        if not smooth or len(pts) == 2:
            return "M" + " L".join(f"{fmt(px)},{fmt(py)}" for px, py in pts)
        # A curve through the points: quadratic segments through the midpoints,
        # which is what a "round" Excalidraw line looks like.
        d = [f"M{fmt(pts[0][0])},{fmt(pts[0][1])}"]
        for i in range(1, len(pts) - 1):
            mx = (pts[i][0] + pts[i + 1][0]) / 2
            my = (pts[i][1] + pts[i + 1][1]) / 2
            d.append(f"Q{fmt(pts[i][0])},{fmt(pts[i][1])} {fmt(mx)},{fmt(my)}")
        d.append(f"L{fmt(pts[-1][0])},{fmt(pts[-1][1])}")
        return " ".join(d)

    def linear(self, e):
        d = self.path_d(e, bool(e.get("roundness")))
        if d is None:
            return
        attrs = ""
        if e["type"] == "arrow":
            if e.get("endArrowhead"):
                attrs += f' marker-end="{self.marker(e["strokeColor"])}"'
            if e.get("startArrowhead"):
                attrs += f' marker-start="{self.marker(e["strokeColor"])}"'
        fill = "none"
        if e["type"] == "line" and e.get("backgroundColor") not in (None, "transparent") and len(e["points"]) > 2:
            fill = e["backgroundColor"]
        self.out.append(
            f'<path d="{d}" fill="{fill}" stroke="{e["strokeColor"]}" '
            f'stroke-width="{e["strokeWidth"]}" stroke-linecap="round" stroke-linejoin="round"'
            f'{dash(e.get("strokeStyle"), e["strokeWidth"])}{attrs}{rotation(e)}{opacity(e)}/>'
        )

    def freedraw(self, e):
        pts = [(e["x"] + px, e["y"] + py) for px, py in e["points"]]
        width = max(1.0, e["strokeWidth"] * 1.5)
        if len(pts) < 2 or all(abs(px - pts[0][0]) < 0.5 and abs(py - pts[0][1]) < 0.5 for px, py in pts):
            self.out.append(
                f'<circle cx="{fmt(pts[0][0])}" cy="{fmt(pts[0][1])}" r="{fmt(width)}" '
                f'fill="{e["strokeColor"]}"{opacity(e)}/>'
            )
            return
        d = "M" + " L".join(f"{fmt(px)},{fmt(py)}" for px, py in pts)
        self.out.append(
            f'<path d="{d}" fill="none" stroke="{e["strokeColor"]}" stroke-width="{fmt(width)}" '
            f'stroke-linecap="round" stroke-linejoin="round"{opacity(e)}/>'
        )

    def text(self, e):
        family = e.get("fontFamily", 1)
        size = e.get("fontSize", 20)
        lh = e.get("lineHeight") or LINE_HEIGHT.get(family, 1.25)
        stack = FONT_STACK.get(family, DEFAULT_FONT)
        if self.font_name is None:
            # No embedded font: render everything in a plain sans-serif stack,
            # which is what makes this a clean-line render.
            stack = DEFAULT_FONT if family != 3 else FONT_STACK[3]
        align = e.get("textAlign", "left")
        if align == "center":
            x, anchor = e["x"] + e["width"] / 2, "middle"
        elif align == "right":
            x, anchor = e["x"] + e["width"], "end"
        else:
            x, anchor = e["x"], "start"
        lines = e.get("text", "").split("\n")
        line_h = size * lh
        # Baseline of the first line: top, plus the half-leading, plus the ascent.
        base = e["y"] + (line_h - size) / 2 + 0.8 * size
        for i, line in enumerate(lines):
            if not line.strip():
                continue
            self.out.append(
                f'<text x="{fmt(x)}" y="{fmt(base + i * line_h)}" font-family="{stack}" '
                f'font-size="{size}" fill="{e["strokeColor"]}" text-anchor="{anchor}" '
                f'xml:space="preserve" style="white-space:pre"{rotation(e)}{opacity(e)}>{escape(line)}</text>'
            )

    # -- driver ------------------------------------------------------------

    def render(self):
        x0, y0, x1, y1 = self.bbox()
        w, h = x1 - x0, y1 - y0
        for e in self.elements:
            kind = e["type"]
            if kind == "rectangle":
                self.rectangle(e)
            elif kind == "ellipse":
                self.ellipse(e)
            elif kind == "diamond":
                self.diamond(e)
            elif kind in ("line", "arrow"):
                self.linear(e)
            elif kind == "freedraw":
                self.freedraw(e)
            elif kind == "text":
                self.text(e)
            else:
                print(f"skipping unsupported element type {kind!r}", file=sys.stderr)
        defs = "".join(self.markers.values())
        if self.font_css:
            defs += f"<style>{self.font_css}</style>"
        head = (
            f'<svg version="1.1" xmlns="http://www.w3.org/2000/svg" '
            f'viewBox="0 0 {fmt(w)} {fmt(h)}" width="{fmt(w)}" height="{fmt(h)}">\n'
            f"<!-- generated from .excalidraw by scripts/exc2svg.py (clean-line render) -->\n"
            f"<defs>{defs}</defs>\n"
            f'<g transform="translate({fmt(-x0)} {fmt(-y0)})">\n'
            f'<rect x="{fmt(x0)}" y="{fmt(y0)}" width="{fmt(w)}" height="{fmt(h)}" fill="#ffffff"/>\n'
        )
        return head + "\n".join(self.out) + "\n</g>\n</svg>\n"


def main():
    ap = argparse.ArgumentParser(description=__doc__.split("\n")[0])
    ap.add_argument("source", help="the .excalidraw file")
    ap.add_argument("output", nargs="?", help="the .svg to write (default: beside the source)")
    ap.add_argument("--font", help="a .woff2/.woff to embed for the hand-drawn font (family 5)")
    args = ap.parse_args()

    with open(args.source, encoding="utf-8") as fh:
        drawing = json.load(fh)
    svg = Renderer(drawing["elements"], args.font).render()
    output = args.output or args.source.rsplit(".", 1)[0] + ".svg"
    with open(output, "w", encoding="utf-8") as fh:
        fh.write(svg)
    print(output)


if __name__ == "__main__":
    main()
