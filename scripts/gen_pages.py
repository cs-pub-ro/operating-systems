#!/usr/bin/env python3
"""Generate the MkDocs pages for the Operating Systems class.

The plugin `mkdocs-gen-files` runs this script on every `mkdocs build` and on
every reload of `mkdocs serve`.  Pages are written into the virtual docs tree,
so nothing appears on disk and the repository stays as it is.

The site is two views of `content/`, not one tree.  A session is written in two
halves -- `NN-<name>-live/`, used while the session runs, and `NN-<name>-full/`,
written to be read afterwards -- and each half is published in the view it
belongs to, so the two are never listed side by side:

    index.md                                    front page
    live/index.md                               what the live view is
    live/labs/index.md                          content/labs/README.md
    live/labs/01-software-stack/index.md        content/labs/01-software-stack-live/
    live/labs/01-software-stack/01-string-functions/index.md
    live/lectures/01-software-stack/index.md    the plan of that lecture
    full/labs/01-software-stack/index.md        content/labs/01-software-stack-full/
    full/lectures/01-software-stack/index.md    the full lecture, with its own subpages
    assignments/index.md                        a section with no halves

The view is the first path component, so the variant suffix a directory carries
is not repeated in its URL.  `navigation.tabs` in `mkdocs.yml` is what makes a
view a view: each is a tab of its own, and the sidebar of a page shows only the
tab it is in.

A lecture and a lab are the same thing to this script: a section holds sessions,
and a session holds whatever tasks have been written for it.  A `-live` lecture
that is only a one-page plan is simply a session with no tasks below it, and
gains its subdirectories, rendered like a lab's, as soon as they are added.

A session brings its figures and its slides with it.  Everything below it whose
suffix says it is an asset -- the diagrams under `media/`, the revealjs decks
rendered from `slides/*.qmd` -- is copied into the site at the same path it has
below the session, so the relative links a README makes to them keep working
without being rewritten.

READMEs are used exactly as they are stored in the repository: no front matter,
no extra metadata files.  Everything the site needs is derived from the
directory tree at build time.
"""

import re
import sys
from pathlib import Path

import mkdocs_gen_files
from mkdocs.structure.files import InclusionLevel

# The plugin runs this script from the repository root, so the directory it
# lives in is not on the path yet.
sys.path.insert(0, str(Path(__file__).resolve().parent))

from sessions import (  # noqa: E402  (the path has to be set up first)
    ASSET_SUFFIXES,
    CONTENT_ROOT,
    REPO_ROOT,
    find_assets,
    site_tree,
    walk_tasks,
)

SITE_TITLE = "Operating Systems"
SITE_TAGLINE = "Lecture and lab materials for the Operating Systems class"

# What the front page is called in the navigation.  The tab bar already carries
# the name of the site, so the entry that leads back to it says `Home` instead.
HOME_LABEL = "Home"

# The navigation tree, as the `nav_file` of the mkdocs-literate-nav plugin.
NAV_FILE = "SUMMARY.md"

# Where links to files that are not pages -- source code, headers, Makefiles --
# are sent instead.
REPO_BLOB_URL = "https://github.com/cs-pub-ro/operating-systems-sessions/blob/master"

# The same, for a directory that is not a page: the vendored `utils/printf`
# tree, say, which is excluded from the site but still lives in the repository.
REPO_TREE_URL = "https://github.com/cs-pub-ro/operating-systems-sessions/tree/master"

# A Markdown link target: the `](target)` part, with an optional title.
LINK_PATTERN = re.compile(r"(?<=\]\()([^)\s]+)(?=(?:\s+\"[^\"]*\")?\))")

# A fenced code block, kept out of the link rewriting below.
FENCE_PATTERN = re.compile(r"(^```[\s\S]*?^```[^\n]*$)", re.MULTILINE)

# A URL scheme, a page anchor, or a site-absolute path: left alone.
EXTERNAL_PATTERN = re.compile(r"^(?:[a-z][a-z0-9+.-]*:|#|/|<)", re.IGNORECASE)

# A level-two heading, which is what tells a README that has been written from
# one that is still only a title.  A section or a session whose README has no
# such heading gets a generated list of what is below it appended, so that the
# page is never a dead end; one that has been written is left alone, because
# whoever wrote it listed its contents the way they wanted them listed.
HEADING_PATTERN = re.compile(r"^##\s+\S", re.MULTILINE)

# Where every published directory of `content/` ends up on the site, as
# `{directory: {view: url}}`.  A session or a task belongs to exactly one view,
# so it has one entry; a section README is published once per view it has
# sessions in, so it has one per view.  Filled in by `locate_pages()`.
PAGE_URLS = {}


def locate_pages(views, plain_sections):
    """Record the URL of every page, so that links can be pointed at them."""

    def add(node, view):
        PAGE_URLS.setdefault(node["path"].resolve(), {})[view] = node["url"]

    for view in views:
        for section in view["sections"]:
            add(section, view["slug"])
            for session in section["sessions"]:
                add(session, view["slug"])
                for task in walk_tasks(session["tasks"]):
                    add(task, view["slug"])
    for section in plain_sections:
        add(section, None)
        for session in section["sessions"]:
            add(session, None)
            for task in walk_tasks(session["tasks"]):
                add(task, None)


def page_url(path, view=None):
    """The URL of the page a directory of `content/` is published as, or None.

    A section is published in every view it has sessions in, so which of those
    URLs is meant depends on where the link is being made: a link on a page of
    the live view stays in the live view.  Anything else has a single URL, and
    `view` makes no difference to it.
    """
    urls = PAGE_URLS.get(path.resolve())
    if not urls:
        return None
    if view in urls:
        return urls[view]
    return next(iter(urls.values()))


def rewrite_target(target, readme_dir, root_prefix="", view=None):
    """Point one Markdown link at the page, or the file, it means.

    Links between READMEs are written the way the directory tree looks, such as
    `../demo-puts-write`.  The site is not shaped like that tree -- a session
    loses its variant suffix and gains the view it is in -- so a link to a page
    is rewritten from the root of the site down: `root_prefix` is the way back
    up to that root from the page being written, and the rest is the URL of the
    target.  This is what lets a `-full` README keep pointing at its `-live`
    half with a plain `../NN-<name>-live` even though the two now live in
    different views.

    Links to anything else in the repository -- a `.c` file, a Makefile -- have
    no page, and are sent to GitHub instead.
    """
    if EXTERNAL_PATTERN.match(target):
        return target

    path_part, separator, fragment = target.partition("#")
    if not path_part:
        return target

    resolved = (readme_dir / path_part).resolve()
    if REPO_ROOT not in resolved.parents:
        return target

    url = page_url(resolved, view)
    if url is None and resolved.name == "README.md":
        url = page_url(resolved.parent, view)
    if url is not None:
        return f"{root_prefix}{url}/index.md{separator}{fragment}"

    # A diagram, or a rendered deck of slides, is copied into the site at the
    # path it has below its session, which is the path the link already uses:
    # `media/03-kernel/os-syscall.svg` from the lecture page, `../../media/...`
    # from a demo page below it.  The same holds for a deck that has not been
    # rendered into the working tree yet, which is why this is decided by the
    # suffix rather than by whether the file happens to exist.
    if CONTENT_ROOT in resolved.parents and resolved.suffix.lower() in ASSET_SUFFIXES:
        return target

    if resolved.is_file():
        relative = resolved.relative_to(REPO_ROOT).as_posix()
        return f"{REPO_BLOB_URL}/{relative}{separator}{fragment}"

    # A directory in the repository that is not a page -- excluded support code
    # such as `bonus-printf/utils/printf`, or `content/` itself -- has nowhere
    # on the site to point to, so it is sent to GitHub like a file is.
    if resolved.is_dir():
        relative = resolved.relative_to(REPO_ROOT).as_posix()
        return f"{REPO_TREE_URL}/{relative}{separator}{fragment}"

    return target


def rewrite_links(text, readme_dir, root_prefix="", view=None):
    """Rewrite every Markdown link of a README, outside of code blocks."""
    parts = FENCE_PATTERN.split(text)

    def rewrite(match):
        return rewrite_target(match.group(0), readme_dir, root_prefix, view)

    return "".join(
        part if part.startswith("```") else LINK_PATTERN.sub(rewrite, part)
        for part in parts
    )


def write(path, text):
    with mkdocs_gen_files.open(path, "w") as page:
        page.write(text)


def publish_assets(session):
    """Copy the diagrams and the rendered slides of a session into the site.

    The tree below a session is mirrored as it is, so `media/` and `slides/`
    land next to the pages that use them and every relative link between a
    README and a figure survives untouched.  Only the suffixes in
    `ASSET_SUFFIXES` are copied: a C source or a compiled binary is not part of
    the site, and is linked to on GitHub instead.
    """
    for relative in find_assets(session["path"]):
        source = session["path"] / relative
        with mkdocs_gen_files.open(f"{session['url']}/{relative.as_posix()}", "wb") as out:
            out.write(source.read_bytes())


def root_prefix(url):
    """The way back to the root of the site from the page at `url`."""
    return "../" * len(Path(url).parts)


def render(node, view=None, extra=""):
    """A node's page: its README, with the links rewritten, plus `extra`.

    A README without a heading of its own still needs one on the page, so the
    title the node is known by is added when the file does not open with one.
    """
    prefix = root_prefix(node["url"])
    if node["readme"] is None:
        body = f"# {node['title']}\n"
    else:
        text = node["readme"].read_text(encoding="utf-8")
        body = rewrite_links(text, node["readme"].parent, prefix, view)
        if not re.search(r"^#\s+\S", text, re.MULTILINE):
            body = f"# {node['title']}\n\n{body}"
    if extra:
        body = f"{body.rstrip()}\n\n{extra.strip()}\n"
    write(f"{node['url']}/index.md", body)


def is_written(node):
    """Whether a README says more than its title, and so needs no generated list."""
    if node["readme"] is None:
        return False
    return bool(HEADING_PATTERN.search(node["readme"].read_text(encoding="utf-8")))


def build_front_page(views, plain_sections):
    # The lead of the repository README -- everything before its first `##`
    # section -- doubles as the introduction of the front page.
    intro = ""
    root_readme = REPO_ROOT / "README.md"
    if root_readme.exists():
        text = root_readme.read_text(encoding="utf-8")
        text = re.sub(r"^#\s+.*\n", "", text, count=1)
        text = re.split(r"^##\s", text, maxsplit=1, flags=re.MULTILINE)[0]
        intro = rewrite_links(text.strip(), REPO_ROOT)

    lines = [f"# {SITE_TITLE}", "", SITE_TAGLINE, "", intro, "", "## Contents", ""]
    for view in views:
        first = view["description"].splitlines()[0] if view["description"] else ""
        lines.append(f"* [{view['title']}]({view['url']}/index.md) — {first}".rstrip(" —"))
    for section in plain_sections:
        first = section["description"].splitlines()[0] if section.get("description") else ""
        lines.append(
            f"* [{section['title']}]({section['url']}/index.md) — {first}".rstrip(" —")
        )
    write("index.md", "\n".join(lines) + "\n")


def build_view_page(view):
    """The page a view opens on: what it holds, and the sections in it."""
    lines = [f"# {view['title']}", ""]
    if view["description"]:
        lines += [view["description"], ""]
    lines += ["## Contents", ""]
    for section in view["sections"]:
        lines.append(f"* [{section['title']}]({section['path'].name}/index.md)")
    write(f"{view['url']}/index.md", "\n".join(lines) + "\n")


def build_section_page(section, view=None):
    """A section's page: its README, and a list of the sessions in this view.

    The list is generated only for a README that is still just a title, so that
    a section whose page has been written keeps the contents list its author
    gave it.  Only the sessions of the view being built are listed: the live
    view never mentions a full session, and the other way round.
    """
    extra = ""
    if not is_written(section) and section["sessions"]:
        lines = ["## Sessions", ""]
        for session in section["sessions"]:
            name = Path(session["url"]).name
            lines.append(f"* [{session['heading']}]({name}/index.md)")
        extra = "\n".join(lines)
    render(section, view, extra)


def build_session_page(session, view=None):
    """A session's page: its README, and a list of its tasks.

    A lab session README carries its own task table, so nothing is added to it.
    A session whose README is still only a title -- a lecture that has just been
    given its subdirectories, say -- gets the list generated instead.
    """
    extra = ""
    if not is_written(session) and session["tasks"]:
        lines = ["## Tasks", ""]
        for task in walk_tasks(session["tasks"]):
            relative = Path(task["url"]).relative_to(session["url"]).as_posix()
            lines.append(f"* [`{relative}`]({relative}/index.md) — {task['title']}")
        extra = "\n".join(lines)
    render(session, view, extra)


def nav_tasks(tasks, indent):
    lines = []
    for task in tasks:
        lines.append(f"{indent}* [{task['title']}]({task['url']}/index.md)")
        lines.extend(nav_tasks(task["tasks"], indent + "    "))
    return lines


def nav_sections(sections, indent):
    lines = []
    for section in sections:
        lines.append(f"{indent}* [{section['title']}]({section['url']}/index.md)")
        for session in section["sessions"]:
            lines.append(
                f"{indent}    * [{session['heading']}]({session['url']}/index.md)"
            )
            lines.extend(nav_tasks(session["tasks"], f"{indent}        "))
    return lines


def build_nav(views, plain_sections):
    """The navigation tree, read back by the mkdocs-literate-nav plugin.

    Each view is a top-level entry, which `navigation.tabs` turns into a tab of
    its own: the sidebar of a page inside a view therefore shows that view and
    nothing else, which is the point of splitting the site in two.
    """
    lines = [f"* [{HOME_LABEL}](index.md)"]
    for view in views:
        lines.append(f"* [{view['title']}]({view['url']}/index.md)")
        lines.extend(nav_sections(view["sections"], "    "))
    lines.extend(nav_sections(plain_sections, ""))
    write(NAV_FILE, "\n".join(lines) + "\n")

    # The navigation is read from this file, it is not a page of the site.
    files = mkdocs_gen_files.FilesEditor.current().files
    files.get_file_from_path(NAV_FILE).inclusion = InclusionLevel.EXCLUDED


def main():
    views, plain_sections = site_tree()
    if not views and not plain_sections:
        raise SystemExit(f"no content sections found under {CONTENT_ROOT}")

    locate_pages(views, plain_sections)

    build_front_page(views, plain_sections)
    for view in views:
        build_view_page(view)
        for section in view["sections"]:
            build_section_page(section, view["slug"])
            for session in section["sessions"]:
                build_session_page(session, view["slug"])
                for task in walk_tasks(session["tasks"]):
                    render(task, view["slug"])
                publish_assets(session)
    for section in plain_sections:
        build_section_page(section)
        for session in section["sessions"]:
            build_session_page(session)
            for task in walk_tasks(session["tasks"]):
                render(task)
            publish_assets(session)
    build_nav(views, plain_sections)


main()
