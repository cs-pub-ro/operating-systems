# Generated Figures

The scripts that draw a lecture's figures from code: a Python program describes each figure, and what comes out is an `.excalidraw` file and, beside it, an SVG that looks like the Excalidraw app's own export.
The `.excalidraw` file stays the source: it opens in [Excalidraw](https://excalidraw.com/), and a figure touched up by hand there is exported from the app as before.

| File | What it is |
| --- | --- |
| `exlib.py` | The library: a `Fig` with `rect()`, `ellipse()`, `arrow()`, `text()`, `box()` and `save()`. |
| `exlib_render.js` | The renderer `save()` calls: an `.excalidraw` file in, an SVG drawn with [rough.js](https://roughjs.com/) out. |
| `build_media08.py` | The ten figures of lecture 08, written with `exlib.py`. |
| `setup.sh` | Fetches rough.js and the font. |
| `preview.sh` | Turns one SVG into a PNG, with the right font. |
| `build_media07.py`, `exc2svg.js`, `exc2svg_clean.py`, `render.sh` | The lecture 07 figures and the renderers they were made with, kept as they were used. |

## Setting up

```console
./setup.sh
python3 -m venv .venv
.venv/bin/pip install -r requirements.txt
```

`setup.sh` needs `npm` and `curl`.
It puts rough.js in `node_modules/` and the Latin part of Excalifont in `font/`; neither is committed.

## Building the figures of a lecture

```console
.venv/bin/python build_media08.py            # into content/lectures/08-concurrency-*/media
.venv/bin/python build_media08.py /tmp/out   # somewhere else, to look first
```

With no argument the figures are written into the `-full/` half, and the SVGs are copied into the `-live/` half.
The output is the same on every run: shapes are seeded from the figure's name and the embedded font carries no timestamp, so `git diff` after a rebuild shows only what was changed.

To look at a figure without a browser:

```console
PATH=.venv/bin:$PATH ./preview.sh /tmp/out/00-pitch/storyline.svg /tmp/storyline.png
```

`preview.sh` needs `rsvg-convert`, from `librsvg2-bin`.
Do not call `rsvg-convert` directly: it ignores the font embedded in the SVG and substitutes another, with other widths.

## Drawing a figure

```python
from exlib import *

f = Fig('thread-states')
f.text(40, 20, 'Three states', 26)
f.box(40, 80, 200, 80, 'RUNNING\non a CPU', GREEN)
f.arrow([(240, 120), (300, 120)], GREEN)
f.save('out/thread-states')        # out/thread-states.excalidraw and .svg
```

Coordinates are in pixels, from the top left.
A colour is a pair, stroke and fill, from the Excalidraw palette: `GRAY`, `ORANGE`, `BLUE`, `GREEN`, `TEAL`, `RED`, `YELLOW`, `VIOLET`, `GRAPE`; `INK` is the text colour.

Three things to know:

* Text is measured with the font's own metrics, and `box()` prints a warning when a label is wider than its box.
* The font piece that is fetched has ASCII and Latin-1 only.
  There are no arrows and no micro sign in it: write `->` and `us`, or `text()` stops with the missing character.
* The name given to `Fig()` seeds the hand-drawn wobble.
  Renaming a figure redraws every stroke slightly differently.

For a new lecture, copy `build_media08.py`, keep `padlock()`, `tcircle()`, `panel()` and `storyline()` as a start, and change `FULL`, `LIVE` and the figures.
