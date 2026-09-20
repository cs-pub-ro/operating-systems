# Slides

The deck delivered in the room, written in [Quarto](https://quarto.org/docs/presentations/) and rendered to [reveal.js](https://revealjs.com/).

* [`software-stack-live.qmd`](software-stack-live.qmd) --- the source
* [`software-stack-live.html`](software-stack-live.html) --- the rendered deck, published with the website

Fifteen slides: the diagrams, the demo results, and the questions to put to the room.
Everything that reads better than it presents is in the [full deck](../../01-software-stack-full/slides) and in the [full session notes](../../01-software-stack-full).

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

The pacing, which demos to run and what to cut if you are behind are in [`INSTRUCTOR.md`](../../01-software-stack-full/INSTRUCTOR.md).
