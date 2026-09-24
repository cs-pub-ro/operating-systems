# Scripts

Two things are generated from the repository tree, and both live here:

* `gen_pages.py` builds the [website](#website)
* `gen_zip.py` builds the [lab archives](#lab-archives) handed to students

Both ask `sessions.py` what a section, a session and an exercise are, so the site and the archives can never disagree about it.

Two more generate things a session needs before the site can be built, and are run from the Pages workflow:

* `render_slides.sh` renders the [Quarto decks](#slides) under `content/**/slides/`
* `gen_media.sh` converts the [diagram exports](#diagrams) under `content/**/media/`

A fifth script, `check-prerequisites.sh`, generates nothing: it checks that the [tools a session needs](#prerequisites-check) are installed.

## The content tree

Everything published lives under `content/`, and the tree there is the whole specification:

```text
content/
├── lectures/
│   ├── 01-software-stack-live/      the plan of the lecture, as one page
│   └── 01-software-stack-full/      the full lecture, with a directory per part
├── labs/
│   ├── 01-software-stack-live/      what students work on during the lab
│   │   ├── demo-printf-vs-write/
│   │   └── 01-string-functions/
│   └── 01-software-stack-full/      the reference solutions and tutorials
├── assignments/
└── extra/
```

* A **section** is a directory directly below `content/`: `lectures`, `labs`, `assignments`, `extra`.
  Each becomes a path of the website, and a new one appears simply by creating the directory and writing its `README.md`.
  `SECTION_ORDER` in `sessions.py` says which order they are shown in; a section not named there comes after those, by name.
* A **session** is a directory directly below a section, and comes in two halves: `NN-<name>-live/` and `NN-<name>-full/`.
  `-live` is what is used while the session runs — for a lab the skeletons and task descriptions, for a lecture the one-page plan of what it covers.
  `-full` is the version written to be read afterwards.
  The halves are published in separate [views](#views), so which one a page belongs to is decided by this suffix.
  A directory below a section with neither suffix, such as one under `assignments/`, is a session of its own with no halves, and belongs to neither view.
* An **exercise** is any directory below a session that contains a `README.md`, nested ones included.
  A lecture's `-full` half holds exercises exactly the way a lab's does, and is rendered exactly the same way; a `-live` lecture that is only a one-pager is simply a session with nothing below it, and gains its subdirectories as soon as they are written.

## Website

The repository is published as a static website through GitHub Pages.
The site is built with [MkDocs](https://www.mkdocs.org/) and the [Material](https://squidfunk.github.io/mkdocs-material/) theme, and deployed by the `.github/workflows/pages.yml` workflow on every push to `master`.

### Views

The site is not one tree but two.
A session is written in two halves, and each half is published in a view of its own, so the two are never listed side by side: the live view lists only live material, and the full view only full material.
The view is the first part of the URL, which is why the variant suffix a directory carries is not repeated in it.

| Directory | Page |
| --- | --- |
| `content/labs/01-software-stack-live/` | `/live/labs/01-software-stack/` |
| `content/labs/01-software-stack-live/01-string-functions/` | `/live/labs/01-software-stack/01-string-functions/` |
| `content/labs/01-software-stack-full/` | `/full/labs/01-software-stack/` |
| `content/lectures/03-memory-live/` | `/live/lectures/03-memory/` |
| `content/lectures/03-memory-full/` | `/full/lectures/03-memory/` |
| `content/assignments/` | `/assignments/` |

`navigation.tabs` in `mkdocs.yml` is what makes a view a view: each is a top-level entry of the navigation, so each becomes a tab, and the sidebar of a page shows only the tab it is in.
The tab bar is the one place both views appear, because it is how you switch between them.

A section with no halves — `assignments/`, `extra/` — is part of neither view and stays at the top level, as its own tab.
A view appears only once something is written for it, so a repository with no `-full/` session anywhere would have no full view rather than an empty one.
`site_tree()` in `sessions.py` is what does the splitting.

A README may still link across the views on purpose: each `-full/` session README points at its `-live/` half in prose, and that link is rewritten to the other view.
What the split governs is the navigation and the generated contents lists, not a deliberate cross-reference.

### Structure

```text
/                                        the front page, from the repository README
/info/how-the-lab-works/                 the guide for students
/live/                                   what the live view holds
/live/labs/                              content/labs/README.md
/live/labs/01-software-stack/            content/labs/01-software-stack-live/README.md
/live/labs/01-software-stack/01-string-functions/
/live/lectures/01-software-stack/        the plan of that lecture
/full/labs/01-software-stack/            content/labs/01-software-stack-full/README.md
/full/lectures/01-software-stack/        the full lecture, with its own subpages
/assignments/                            a section with no halves
```

A section `README.md` is published once per view it has sessions in, so `content/labs/README.md` is the page behind both `/live/labs/` and `/full/labs/`; the list of sessions generated below it differs, because it names only the sessions of that view.

### Contents

There are no pages stored in this repository.
`gen_pages.py` discovers everything at build time, by walking `content/`, and hands the pages to MkDocs through the `mkdocs-gen-files` plugin.
The navigation sidebar is generated the same way, as a `SUMMARY.md` read back by the `mkdocs-literate-nav` plugin.

* Directories named `solutions` are skipped, together with `.git`, `.github`, `docs`, `scripts` and `site`, and so is anything whose name starts with a dot.
  The list is the `EXCLUDED_DIRS` set in `sessions.py`.
  `utils` is on it as well: support code vendored inside an exercise, such as the `bonus-printf/utils/printf/` tree, is packed with its exercise but is not an exercise itself, so it gets no page and no navigation entry.
* The title shown for a page is the first level-one heading of its `README.md`.
  If the file has no heading, the directory name is used instead, and the heading is added to the page.
* A session is listed under its index and the title of its `README.md`, not under its directory name: `01-software-stack-live/`, whose README opens with `# Session 01: The Software Stack`, is listed as `01: The Software Stack`.
  The index keeps the sessions in the order they are taken in.
  A trailing `— Full Contents` in a README title is dropped, because the view a page is in already says which half it is.
  The rules are `session_heading()` and `session_title()` in `sessions.py`.
* A section or session `README.md` that is still only a title — no level-two heading anywhere in it — gets a generated list of what is below it appended, so the page is never a dead end.
  One that has been written is left exactly as it is, because whoever wrote it listed its contents the way they wanted them listed; this is why the lab session pages show their own exercise table rather than a generated list.
* Links between READMEs, such as `../demo-puts-write`, are rewritten to point at the generated pages.
  The site is not shaped like the directory tree, so this is done by looking the target up in the map of published pages rather than by keeping the link as written; a link that crosses into the other view is rewritten to that view.
  Links to files that have no page of their own, such as `copy_file.c`, are sent to the file on GitHub.

Adding a section, a session or an exercise requires no change to these scripts: create the directory, write its `README.md` and push.
Which view it lands in follows from the `-live` / `-full` suffix of the session it is under.
The `README.md` files need no front matter and no other metadata.
A new exercise appears in the navigation sidebar automatically; to list it on a written session page as well, add a row to that session's exercise table.

The `docs/` directory only exists because MkDocs insists on one; every page is generated.

### Building locally

Install the dependencies, then build the site into `_site/`:

```console
pip install -r dev/requirements.txt
mkdocs build
```

Better, while writing: serve the site at <http://localhost:8000> and rebuild on every change.

```console
mkdocs serve
```

Add `--strict` to `mkdocs build` to turn warnings, such as a link that points nowhere, into a failed build.

### Enabling GitHub Pages

The workflow deploys the site, but the repository has to allow it first.
In the repository settings, under *Pages*, set *Source* to *GitHub Actions*.
The site is then published at `https://<owner>.github.io/<repository>/`.

## Assets

A session brings more than its READMEs: the figures a page shows, and the slides a lecture is delivered from.
`gen_pages.py` mirrors the tree below a session into the site, copying every file whose suffix is in `ASSET_SUFFIXES` (`sessions.py`) and leaving everything else alone.

Because the mirror keeps the paths, a relative link in a README already points at the right place and is not rewritten:

| In the repository | On the site |
| --- | --- |
| `content/lectures/01-software-stack-full/media/03-kernel/libc.svg` | `/full/lectures/01-software-stack/media/03-kernel/libc.svg` |
| `content/lectures/01-software-stack-full/slides/software-stack.html` | `/full/lectures/01-software-stack/slides/software-stack.html` |

A C source, a Makefile or a compiled binary is not an asset: it has no page, so a link to it is sent to GitHub as before.
Directories the tree walk skips — `old/`, `utils/`, anything beginning with a dot — keep their files off the site as well.

The diagrams are line drawings on a transparent ground, so `docs/stylesheets/extra.css` gives them a white plate in the dark colour scheme.
That file is the only hand-written thing under `docs/`.

### Diagrams

A session's figures live in `media/`, one directory per part of the session.
Drawings made in [Excalidraw](https://excalidraw.com/) are exported as PDF, which is what is committed; a browser will not show a PDF through an `![...]()`, so `gen_media.sh` converts each one to an SVG of the same name in lower case, and it is the SVG the READMEs and the slides point at.

```console
./scripts/gen_media.sh          # needs pdftocairo, from poppler-utils
```

The SVGs are committed next to the PDFs, so building the site needs no conversion tools.
Re-run the script after re-exporting a drawing; it skips whatever is already newer than its source.
Diagrams made in [draw.io](https://www.drawio.com/) keep their `.drawio` source in the same directory, and are exported to SVG from the editor.

### Slides

A lecture's deck lives in `slides/`, written in [Quarto](https://quarto.org/docs/presentations/) and rendered to [reveal.js](https://revealjs.com/).
Each deck sets `embed-resources: true`, so one `.qmd` becomes one self-contained `.html` with the diagrams and reveal.js inlined — which is what makes a deck publishable as a single asset.

```console
./scripts/render_slides.sh                                  # every deck
./scripts/render_slides.sh content/lectures/01-software-stack-live   # just these
make -C content/lectures/01-software-stack-live/slides       # while writing one
```

The Pages workflow runs `render_slides.sh` before `mkdocs build`, so whatever is on disk when `gen_pages.py` walks `content/` is what gets published.
Rendered decks are generated and are not committed; `.gitignore` covers them.

`make pdf` inside a `slides/` directory renders the same deck through beamer, for the PDF that is published elsewhere.
That needs LaTeX (`quarto install tinytex` is the least painful) and `rsvg-convert`, from `librsvg2-bin`, which is what turns the SVG figures into something LaTeX can include.

Nothing is registered anywhere: a new deck is rendered and published because it is in a `slides/` directory, the same way a new exercise appears because it has a `README.md`.

## Prerequisites check

`check-prerequisites.sh` checks a machine against the *Prerequisites and required tools* section of the session READMEs, and says what to install for whatever is missing.
Students run it before a session; it is also the quickest way to tell whether a lab machine has been set up.

```console
./scripts/check-prerequisites.sh          # every session
./scripts/check-prerequisites.sh -q       # only what is missing
```

The script only looks around, it installs nothing and changes nothing.
It exits 0 when everything the checked sessions need is there, and 1 otherwise, so it can also be used in a setup check on a lab machine.

* Tools needed only by a bonus exercise are reported apart, and do not fail the run.
* Three checks are not a plain lookup of a command: the machine is x86-64, where session 02 and session 05 need it; `gcc -static` links, which session 01 needs and which not every distribution installs by default; and pwntools imports in the `python3` that will run the session 05 exploits.
* The install command is written for the package manager the machine has, out of `apt-get`, `dnf`, `pacman` and `zypper`.
  The tool-to-package mapping is `package_for()`.

When a session's prerequisites change, the list to update is the `check_session_NN` function of that session, next to the README section it mirrors.

## Lab archives

Every lab session's `-live/` half is packed into one zip archive of its exercises, published on the `lab-archives` branch, which holds nothing else.
The archives are what students download, so they contain the exercises and nothing more: the `NN-<name>-full/` reference material — solutions, and the session 05 flags and exploits — is never packed, and neither is anything outside `content/labs/`.
`ARCHIVE_SECTION` and `ARCHIVE_VARIANT` in `sessions.py` are what say so.

The `.github/workflows/lab-archive.yml` workflow rebuilds and republishes them on every push to `master` that touches a lab session, and can also be run by hand from the *Actions* tab.

### Contents

An archive is named after the session with the `-live` suffix stripped, and unpacks into a single directory of that name:

```text
03-memory-ops.zip
└── 03-memory-ops/
    ├── 01-in-memory-db/
    ├── bonus-in-mem-database/
    └── demo-copy-file/{global-buffer,malloc,mmap}/
```

* An exercise is the same thing the website calls an exercise, decided by `sessions.py`: any directory below a session's `-live/` tree that has a `README.md`.
  Support code vendored inside an exercise, such as the `bonus-printf/utils/printf/` tree, is packed with its exercise even though it gets no page.
* Only files tracked by git are packed, so an object file or a compiled binary left in the working tree is never shipped by accident.
  The archives are the same whether they are built from a clean checkout or from the tree you have been working in.
* Files named `prompt.txt`, the notes the exercises were written from, are left out; several of them describe the solution.
  The list is the `EXCLUDED_FILES` tuple in `gen_zip.py`.
* As a last line of defence, packing aborts outright if any file from a `-full/` tree, or from a directory named `solutions`, ever reaches an archive; `is_reference()` in `sessions.py` is the guard, and `gen_zip.py` calls it on every file it is about to write.
* Archives are byte-for-byte reproducible: entries are sorted and timestamps are fixed.
  Editing one exercise therefore changes that one archive, and the workflow commits nothing at all when no content has changed.

### Building locally

```console
python3 scripts/gen_zip.py
```

The archives are written to `archives/`, which is ignored by git.
Nothing has to be installed: the script only needs Python and git.
Check what a student would get with:

```console
unzip -l archives/03-memory-ops.zip
```

### Creating the branch for the first time

The workflow creates the `lab-archives` branch itself, so the simplest way is to open the *Actions* tab, pick *Archive Labs on Commit* and run it on `master`.

To do the same by hand, build the archives and commit them onto a fresh orphan branch.
The commands below use a temporary worktree, so your own working tree is left alone:

```console
python3 scripts/gen_zip.py --output /tmp/lab-archives
git worktree add --detach /tmp/archives-branch
cd /tmp/archives-branch
git checkout --orphan lab-archives
git rm -rq --cached .
cp /tmp/lab-archives/*.zip .
git add -f *.zip
git commit -m "Add the initial lab archives"
git push -u origin lab-archives
```

Then go back and remove the temporary worktree:

```console
cd -
git worktree remove --force /tmp/archives-branch
```

The `-f` on `git add` is needed because the repository ignores `*.zip`, which on this branch is exactly what we want to commit.
From here on the workflow keeps the branch up to date on its own.

### Downloading an archive

A file on a branch is served by GitHub at a URL of this shape:

```text
https://github.com/<owner>/<repository>/raw/lab-archives/03-memory-ops.zip
```
