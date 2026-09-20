#!/usr/bin/env bash
#
# Turn the diagram exports under content/**/media/ into web-ready SVG.
#
# The diagrams are drawn in Excalidraw and exported as PDF, which is what is
# kept in the repository: it is the export the drawing tool produces, and it is
# what gets handed to a printer.  A browser will not show a PDF through an
# `![...]()`, so each one is converted to an SVG of the same name, in lower
# case, and it is the SVG the READMEs and the slides point at.
#
# The conversion turns text into outlines, so an SVG is bigger than the PDF and
# its labels are not selectable; both are fine for a figure and neither is worth
# hand-maintaining a second copy of every drawing to avoid.
#
# Run it after adding or re-exporting a diagram, and commit what it writes:
#
#     ./scripts/gen_media.sh
#
# Requires `pdftocairo`, from poppler-utils.

set -eu

root="$(cd "$(dirname "$0")/.." && pwd)"

if ! command -v pdftocairo > /dev/null; then
	echo "pdftocairo is missing; install poppler-utils." >&2
	exit 1
fi

converted=0
while IFS= read -r -d '' pdf; do
	dir="$(dirname "$pdf")"
	stem="$(basename "$pdf" .pdf)"
	# `Software-Software---Versus.pdf` becomes `software-software-versus.svg`:
	# lower case throughout, and a run of dashes collapsed into one.
	name="$(printf '%s' "$stem" | tr '[:upper:]' '[:lower:]' | tr -s '-')"
	svg="$dir/$name.svg"

	if [ -e "$svg" ] && [ "$svg" -nt "$pdf" ]; then
		continue
	fi

	pdftocairo -svg "$pdf" "$svg"
	echo "${svg#"$root"/}"
	converted=$((converted + 1))
done < <(find "$root/content" -path '*/media/*' -name '*.pdf' -print0 | sort -z)

echo "$converted diagram(s) converted."
