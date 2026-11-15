#!/usr/bin/env bash
#
# Fetch what the figure builders need and the repository does not carry:
# rough.js, into node_modules/, and the Latin part of Excalifont, into font/.
# Both directories are ignored by git.
#
#     ./setup.sh
#
# The Python side is in requirements.txt:
#
#     python3 -m venv .venv && .venv/bin/pip install -r requirements.txt
#
# Requires `npm` and `curl`.

set -eu

cd "$(dirname "$0")"

npm ci

# Excalidraw ships Excalifont in pieces, one per range of characters.  This is
# the piece with ASCII and Latin-1; it has no arrows and no micro sign.
font=Excalifont-Regular-a88b72a24fb54c9f94e3b5fdaa7481c9.woff2
url=https://raw.githubusercontent.com/excalidraw/excalidraw/master/packages/excalidraw/fonts/Excalifont

mkdir -p font
curl -sSfL --retry 3 -o font/Excalifont-Latin.woff2 "$url/$font"

echo "Ready: node_modules/ and font/Excalifont-Latin.woff2."
