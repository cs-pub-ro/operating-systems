# Slides

The full lecture deck, written in [Quarto](https://quarto.org/docs/presentations/) and rendered to [reveal.js](https://revealjs.com/).

* [`scheduling.qmd`](scheduling.qmd) --- the source
* `scheduling.html` --- the rendered deck, published with the website

This is the full deck: it follows the [session notes](../README.md) part by part, with the diagrams and the demos' reference output.
The thin version delivered in the room is the [live deck](../../07-scheduling-live/slides).

What a slide leaves unsaid is in its speaker notes.
Press `s` in the rendered deck for the presenter view, which shows the notes, a timer and the next slide.

## Building

```console
make            # HTML, via reveal.js -- what the website publishes
make pdf        # PDF, via beamer
make clean
```

Quarto has to be installed; see [Get Started](https://quarto.org/docs/get-started/).
The PDF target also needs LaTeX: `quarto install tinytex` is the least painful way to get one.

To get a PDF that looks exactly like the slides rather than like a document, open the rendered `.html` with `?print-pdf` appended to the URL and print the page to a file from the browser.

## Delivering it

* `s` --- presenter view, with the speaker notes and a timer
* `o` --- overview of all slides
* `f` --- full screen, `b` --- black out the screen
* `?` --- every other shortcut

The pacing, which demos to run and what to cut if you are behind are in [`INSTRUCTOR.md`](../INSTRUCTOR.md).
