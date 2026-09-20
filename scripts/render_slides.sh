#!/usr/bin/env bash
#
# Render every Quarto deck under content/ to reveal.js HTML.
#
# A deck lives in a session's `slides/` directory and is written in Quarto
# (https://quarto.org/docs/presentations/).  `embed-resources` is set in each
# deck, so one `.qmd` renders to one self-contained `.html` next to it, with the
# diagrams and reveal.js inlined; `scripts/gen_pages.py` then copies that file
# into the website beside the lecture page, the same way it copies a diagram.
#
# Run it before `mkdocs build` -- which is what .github/workflows/pages.yml
# does -- or run `make` inside a single `slides/` directory while writing one.
#
# Nothing is registered anywhere: a new deck is rendered because it is there.
#
#     ./scripts/render_slides.sh              render every deck
#     ./scripts/render_slides.sh content/lectures/01-software-stack-live
#                                             only the decks below that path
#
# Requires `quarto`.  The rendered files are ignored by git.

set -eu

root="$(cd "$(dirname "$0")/.." && pwd)"
search="${1:-$root/content}"

if ! command -v quarto > /dev/null; then
	echo "quarto is missing; see https://quarto.org/docs/get-started/." >&2
	exit 1
fi

rendered=0
while IFS= read -r -d '' deck; do
	echo "Rendering ${deck#"$root"/}"
	quarto render "$deck" --to revealjs
	rendered=$((rendered + 1))
done < <(find "$search" -type d -name slides -exec find {} -name '*.qmd' -print0 \; | sort -z)

echo "$rendered deck(s) rendered."
