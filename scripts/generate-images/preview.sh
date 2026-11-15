#!/usr/bin/env bash
#
# Rasterise an SVG written by exlib.py, to look at it without a browser.
#
#     ./preview.sh figure.svg figure.png [width]
#
# rsvg-convert does not read the font embedded in the SVG; it asks fontconfig.
# Without Excalifont installed it falls back to a serif font, with other
# widths, and the picture misleads.  So this gives fontconfig a private
# configuration that knows the font setup.sh fetched.
#
# Requires `rsvg-convert` (librsvg2-bin) and the Python side of setup.sh.

set -eu

here="$(cd "$(dirname "$0")" && pwd)"
conf="$here/font/fontconfig"

if [ ! -f "$conf/fonts.conf" ]; then
	mkdir -p "$conf/fonts" "$conf/cache"
	python3 -c "
import sys
from fontTools.ttLib import TTFont
font = TTFont(sys.argv[1])
font.flavor = None
font.save(sys.argv[2])
" "$here/font/Excalifont-Latin.woff2" "$conf/fonts/Excalifont.ttf"
	cat > "$conf/fonts.conf" <<- CONF
	<?xml version="1.0"?>
	<!DOCTYPE fontconfig SYSTEM "fonts.dtd">
	<fontconfig>
	  <dir>$conf/fonts</dir>
	  <dir>/usr/share/fonts</dir>
	  <cachedir>$conf/cache</cachedir>
	</fontconfig>
	CONF
fi

FONTCONFIG_FILE="$conf/fonts.conf" rsvg-convert -w "${3:-1200}" "$1" -o "$2"
