# Operating Systems

Temporary repository to store contents for the Operating Systems class.
Everything lives under `content/`, one directory per part of the class: `lectures/`, `labs/`, `assignments/` and `extra/`.
Every session is written in two halves — `NN-<name>-live/`, used while the session runs, and `NN-<name>-full/`, written to be read afterwards — and the website publishes them as two separate views, so the two are never listed side by side.

[`LEARNER.md`](LEARNER.md) is the guide for students: how a session is put together, how to work through a task, and what is expected of them.

## Website

The contents of this repository are published as a website, built with MkDocs from the `README.md` files under `content/`.
The site is two views of that tree, one per half of a session, and the view is the first part of the URL:

| Directory | Page |
| --- | --- |
| `content/labs/01-software-stack-live/` | `/live/labs/01-software-stack/` |
| `content/labs/01-software-stack-full/` | `/full/labs/01-software-stack/` |
| `content/lectures/03-memory-live/` | `/live/lectures/03-memory/` |
| `content/assignments/` | `/assignments/` |

Each view is a tab of its own, so a page in the live view lists only live material, and a page in the full view only full material.
A section with no halves, such as `assignments/`, belongs to neither view and stays at the top level.
The generator lives in the `scripts/` directory, see [`scripts/README.md`](scripts/README.md) for details.

### Building the website locally

The site needs Python 3 and the packages listed in [`dev/requirements.txt`](dev/requirements.txt).
Install them into a virtual environment, so nothing lands in the system Python:

```console
python3 -m venv .venv
source .venv/bin/activate
pip install -r dev/requirements.txt
```

On Debian and Ubuntu, `python3 -m venv` needs the `python3-venv` package.

With the environment active, serve the site and open <http://localhost:8000>:

```console
mkdocs serve
```

Every page is generated from the `README.md` files at build time, so editing one and saving it rebuilds the page and reloads the browser.
Adding a section, a session or a task means creating the directory under `content/` and writing its `README.md`; nothing has to be registered anywhere.

To build the site instead of serving it, into the git-ignored `_site/` directory:

```console
mkdocs build
```

This is the command the `.github/workflows/pages.yml` workflow runs to publish the site on every push to `master`.
Add `--strict` to it to turn warnings, such as a link that points nowhere, into a failed build.
Leave the environment with `deactivate`; on later sessions, `source .venv/bin/activate` is enough.

## Prerequisites

Every session README lists the tools that session needs.
[`scripts/check-prerequisites.sh`](scripts/check-prerequisites.sh) checks a machine against those lists and prints the command that installs whatever is missing:

```console
./scripts/check-prerequisites.sh
```

It installs nothing and changes nothing, and exits non-zero when something needed is missing.
See the *Prerequisites check* section of [`scripts/README.md`](scripts/README.md) for what it checks and how to extend it.

## Lab archives

Each lab session's `-live/` half is packed into a zip archive of its exercises, without the reference solutions, and published on the `lab-archives` branch.
The `.github/workflows/lab-archive.yml` workflow rebuilds them on every push to `master` that touches a lab session.
Build them locally with `python3 scripts/gen_zip.py`; see [`scripts/README.md`](scripts/README.md) for what goes in and how to create the branch the first time.

## Linting

The `.github/workflows/lint.yml` workflow checks style on every push and every pull request.

* Markdown is checked with [markdownlint](https://github.com/DavidAnson/markdownlint-cli2), configured in `.markdownlint-cli2.jsonc` to follow [`dev/content-rules.md`](dev/content-rules.md).
* Shell scripts are checked with [ShellCheck](https://www.shellcheck.net/).
* C sources are checked with the Linux kernel's `checkpatch.pl`.
  Only the lines a push or a pull request changes have to be clean.
  The findings for the rest of the tree are listed in the run summary, to be worked through a session at a time.

To run the first two locally:

```console
npx markdownlint-cli2 "**/*.md"
git ls-files -z '*.sh' | xargs -0 shellcheck
```

`markdownlint-cli2 --fix <file>` repairs what can be repaired automatically.
