# Render the decks in this directory with Quarto.
#
#   make            HTML (reveal.js), which is what the website publishes
#   make pdf        PDF (beamer), which is published elsewhere
#   make clean
#
# Quarto: https://quarto.org/docs/get-started/
# The PDF target additionally needs a LaTeX installation; the simplest is
# `quarto install tinytex`, which installs one Quarto manages itself.

QUARTO ?= quarto

DECKS := $(wildcard *.qmd)
HTML := $(DECKS:.qmd=.html)
PDF := $(DECKS:.qmd=.pdf)

.PHONY: all html pdf clean

all: html

html: $(HTML)

pdf: $(PDF)

# `embed-resources` is set in the deck, so each one renders to a single
# self-contained .html with the diagrams and reveal.js inlined.  That is what
# makes a deck copyable to the website as one file.
%.html: %.qmd
	$(QUARTO) render $< --to revealjs

%.pdf: %.qmd
	$(QUARTO) render $< --to beamer

clean:
	-rm -f $(HTML) $(PDF)
	-rm -rf $(DECKS:.qmd=_files) .quarto
