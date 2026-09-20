# Slides

The deck for this lecture, written in [Quarto](https://quarto.org/docs/presentations/) and rendered to [reveal.js](https://revealjs.com/).

* [`software-stack.qmd`](software-stack.qmd) --- the source
* [`software-stack.html`](software-stack.html) --- the rendered deck, published with the website

This is the full deck: it follows the [session `README.md`](../README.md) section by section, and carries the diagrams, the tables and the measured numbers.
The minimal deck used during the live delivery is in [`01-software-stack-live/slides/`](../../01-software-stack-live/slides).

## Building

```console
make            # HTML, via reveal.js -- what the website publishes
make pdf        # PDF, via beamer -- published elsewhere
make clean
```

Quarto has to be installed; see [Get Started](https://quarto.org/docs/get-started/).
The PDF target also needs LaTeX, and the least painful way to get one is to let Quarto manage it:

```console
quarto install tinytex
```

There is a second route to a PDF, which keeps the reveal.js appearance exactly: open the rendered `.html` with `?print-pdf` appended to the URL, and print the page to a file from the browser.
Use it when the PDF is meant to look like the slides rather than like a document.

## Publishing

The `.github/workflows/pages.yml` workflow renders every `slides/*.qmd` under `content/` before building the site, and `scripts/gen_pages.py` copies the resulting `.html` next to the lecture page.
Nothing has to be registered anywhere: a new deck in a `slides/` directory is picked up because it is there.

The rendered output is generated, so it is not committed; `.gitignore` covers it.

## Notes on the source

* `embed-resources: true` makes each deck a single self-contained `.html`, with the diagrams and reveal.js inlined.
  That is why the deck can reference `../media/...` and still be published as one file.
* `#` starts a part of the lecture and renders as a section slide; `##` starts an ordinary slide.
* Blocks marked `::: {.notes}` are speaker notes.
  Press `s` in the rendered deck to open the presenter view with the notes, a timer and the next slide.
* `?` in the rendered deck lists the other keyboard shortcuts; `o` opens the slide overview.
