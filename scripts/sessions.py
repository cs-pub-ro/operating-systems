#!/usr/bin/env python3
"""What the repository holds, as the generators see it.

Everything published lives under `content/`, and the tree there is the whole
specification:

    content/<section>/                      a section of the class: labs, lectures, ...
    content/<section>/<session>-live/       what is used during the live session
    content/<section>/<session>-full/       the full version, kept for afterwards
    content/<section>/<session>-<variant>/<task>/   one task of that session

A directory is published if it holds a `README.md`.  The website is not one
tree but two -- a live view and a full view -- and the suffix of a session says
which of them it belongs to, so the halves never appear side by side:

    content/labs/01-software-stack-live/       ->  /live/labs/01-software-stack/
    content/labs/01-software-stack-full/       ->  /full/labs/01-software-stack/
    content/lectures/03-memory-live/           ->  /live/lectures/03-memory/
    content/assignments/                       ->  /assignments/

A section with no split halves, such as `assignments/`, belongs to neither view
and stays at the top level.  Nothing else is registered anywhere: adding a
section, a session or a task means creating the directory and writing its
`README.md`.

The two things that walk this tree -- `gen_pages.py`, which renders the
website, and `gen_zip.py`, which packs the archives handed to students -- both
ask this module, so they can never disagree about what a session is.
"""

import re
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent

# Everything the site is built from.  A path outside this tree is repository
# plumbing -- the scripts, the workflows, the authoring notes in `dev/` -- and
# is never a page.
CONTENT_ROOT = REPO_ROOT / "content"

# Directory names that are never part of the content tree, at any depth.
# `utils` holds support code vendored into a task -- the mpaland/printf library
# under `bonus-printf/utils/` -- which is packed with its task but is not a task
# of its own, so it gets no page and no navigation entry.  `solutions` is the
# name the reference material used to live under, before it moved into the
# `-full/` sessions; it is kept on the list so that such a directory reappearing
# is skipped rather than published.  `old` is the staging area a session keeps
# while it is being rewritten -- the previous version of its material, harvested
# from and then dropped -- and is never part of the published tree.
EXCLUDED_DIRS = {
    ".git",
    ".github",
    ".claude",
    ".venv",
    "_site",
    "archives",
    "docs",
    "node_modules",
    "old",
    "scripts",
    "site",
    "solutions",
    "util",
    "utils",
}

# The same, by suffix rather than by name.  `<deck>_files/` is what Quarto
# leaves beside a deck when it renders it to a format that is not the
# self-contained HTML the website publishes; it is a build byproduct, and it is
# no more part of the content than an object file is.
EXCLUDED_DIR_SUFFIXES = ("_files",)

# Files that are not pages but belong to one: the diagrams a README shows, and
# the slides rendered from a lecture's `slides/*.qmd`.  They are copied into the
# website next to the page that uses them, at the same path they have below the
# session, so a relative link in a README already points at the right place and
# needs no rewriting.  Everything else below a session -- C sources, Makefiles,
# compiled binaries -- has no place on the site and is linked to on GitHub.
ASSET_SUFFIXES = frozenset(
    {
        ".css",
        ".gif",
        ".html",
        ".jpeg",
        ".jpg",
        ".js",
        ".json",
        ".mp4",
        ".otf",
        ".pdf",
        ".png",
        ".svg",
        ".ttf",
        ".webm",
        ".webp",
        ".woff",
        ".woff2",
    }
)

# The order the sections are shown in, which is the order of the class rather
# than the alphabet.  A section not named here is shown after these, by name.
SECTION_ORDER = ("info", "lectures", "labs", "assignments", "extra")

# The two halves of a session.  `-live` is what is used while the session runs:
# for a lab, the skeletons and task descriptions students work on; for a
# lecture, the one-page plan of what the lecture covers.  `-full` is the full
# version, written to be read after the session: reference solutions and
# tutorials for a lab, the worked-through material for a lecture.
#
# They are shown in this order, which is the order they are used in.
VARIANTS = ("live", "full")
VARIANT_LABELS = {"live": "Live", "full": "Full"}
VARIANT_PATTERN = re.compile(rf"^(?P<name>.+)-(?P<variant>{'|'.join(VARIANTS)})$")

# What each view is, for the page that opens it.
VARIANT_DESCRIPTIONS = {
    "live": (
        "The material used while a session runs.\n"
        "For a lab, the skeletons and the task descriptions to work through;"
        " for a lecture, the plan of what it covers and the points to capture."
    ),
    "full": (
        "The full version of each session, written to be read afterwards.\n"
        "Reference solutions, worked explanations and the output to expect."
    ),
}

# What each section that is not split into two views is, for the entry that
# leads to it on the front page.  Keyed by the section's directory name; a
# section with no entry here simply shows no description.
SECTION_DESCRIPTIONS = {
    "info": "General details about the class; rules, grading, etc.",
    "assignments": "Take-home assignments",
    "extra": (
        "Extra fun stuff, not included in the class, labs, assignments or exam."
        " Just for the curious and worthy."
    ),
}

# Student archives are built from the live half of the labs, and from nothing
# else: the `-full/` sessions hold the reference solutions, and for session 05
# the challenge flags and the exploits that find them.
ARCHIVE_SECTION = "labs"
ARCHIVE_VARIANT = "live"

# Words that plain title casing would get wrong when building a label out of a
# directory name.
ACRONYMS = {
    "os": "OS",
    "io": "IO",
    "db": "DB",
    "gdb": "GDB",
    "json": "JSON",
    "cylab": "CyLab",
}

# The `Session NN:` lead-in of a session README title, which the heading built
# from that title carries as its index instead.
SESSION_TITLE_PREFIX = re.compile(r"^session\s*\d+\s*[:.-]?\s*", re.IGNORECASE)

# The trailing `- Full Contents` some `-full` README titles carry.  Which half
# of a session a page belongs to is said by the navigation and by the URL, so
# the title the session is listed under is the same for both halves.
VARIANT_TITLE_SUFFIX = re.compile(
    r"\s*[-–—:]\s*(?:full(?:\s+contents)?|live(?:\s+session)?)\s*$",
    re.IGNORECASE,
)


def prettify(name):
    """Turn a directory name such as `01-string-functions` into a label."""
    without_prefix = re.sub(r"^(?:session-\d+|\d+|bonus|demo)[-_]", "", name)
    words = re.split(r"[-_]+", without_prefix.strip())
    return " ".join(ACRONYMS.get(word.lower(), word.title()) for word in words if word)


def split_variant(name):
    """Split `01-software-stack-live` into `01-software-stack` and `live`.

    A directory that carries no variant suffix -- anything under `assignments/`
    or `extra/`, which are not split into a live and a full half -- comes back
    with its name unchanged and no variant.
    """
    match = VARIANT_PATTERN.match(name)
    if match:
        return match.group("name"), match.group("variant")
    return name, None


def read_title(readme_path, fallback):
    """Return the first level-one heading of a README, or a fallback."""
    for line in readme_path.read_text(encoding="utf-8").splitlines():
        match = re.match(r"^#\s+(.*\S)\s*$", line)
        if match:
            return match.group(1)
    return fallback


def child_dirs(path):
    """The directories directly below `path` that the tree walk descends into."""
    return sorted(
        entry
        for entry in path.iterdir()
        if entry.is_dir()
        and entry.name not in EXCLUDED_DIRS
        and not entry.name.startswith(".")
        and not entry.name.endswith(EXCLUDED_DIR_SUFFIXES)
    )


def has_readme(path):
    return (path / "README.md").is_file()


def node(path, kind, **extra):
    """One published directory: where it is, what it is called, what is under it.

    `slug` is the path of the directory below `content/`, which is also the
    path of the page on the website.  `title` is the first heading of its
    README, or a label built from the directory name when it has none.
    """
    readme = path / "README.md"
    fallback = prettify(path.name)
    return {
        "path": path,
        "slug": path.relative_to(CONTENT_ROOT).as_posix(),
        "readme": readme if readme.is_file() else None,
        "title": read_title(readme, fallback) if readme.is_file() else fallback,
        "kind": kind,
        **extra,
    }


def find_tasks(parent):
    """Every task below `parent`, depth-first, as a tree of nodes.

    A task is a directory with a `README.md`.  A directory without one is not a
    page, so it cannot hold anything either: whatever tasks are below it are
    lifted into its parent, exactly as they were when tasks were listed by their
    path relative to the session.
    """
    tasks = []
    for entry in child_dirs(parent):
        children = find_tasks(entry)
        if has_readme(entry):
            tasks.append(node(entry, "task", tasks=children))
        else:
            tasks.extend(children)
    return tasks


def find_assets(parent, base=None):
    """Every asset below a directory, as paths relative to it.

    Walked exactly the way the tasks are, so a directory the walk never
    descends into -- `old/`, `utils/`, anything whose name starts with a dot --
    keeps its files off the website too.  A `media/` directory holds no README
    and so is not a page, but the diagrams in it are still published: what makes
    a file an asset is its suffix, not the directory it sits in.
    """
    base = base if base is not None else parent
    assets = [
        entry.relative_to(base)
        for entry in sorted(parent.iterdir())
        if entry.is_file() and entry.suffix.lower() in ASSET_SUFFIXES
    ]
    for entry in child_dirs(parent):
        assets.extend(find_assets(entry, base))
    return assets


def walk_tasks(tasks):
    """Every task of a task tree, parents before children."""
    for task in tasks:
        yield task
        yield from walk_tasks(task["tasks"])


def session_title(session_dir):
    """The title of a session, from its README, without the `Session NN:` lead.

    `01-software-stack-live/README.md` opens with `# Session 01: The Software
    Stack`, so the title is `The Software Stack`.  A session without a README,
    or one whose README has no heading, falls back to its directory name.
    """
    name, _ = split_variant(session_dir.name)
    fallback = prettify(name)
    readme = session_dir / "README.md"
    if not readme.is_file():
        return fallback
    title = SESSION_TITLE_PREFIX.sub("", read_title(readme, fallback))
    return VARIANT_TITLE_SUFFIX.sub("", title).strip() or fallback


def session_heading(session_dir):
    """The heading a session is shown under, `01: The Software Stack`.

    The title of the session README, which is what a reader sees at the top of
    the session page, led by the index of the session so that the order the
    sessions are taken in survives.  The `Session` of `Session 01:` is dropped:
    everything listed here is a session, so the word says nothing.
    """
    title = session_title(session_dir)
    name, _ = split_variant(session_dir.name)
    index = re.search(r"\d+", name)
    return f"{index.group(0)}: {title}" if index else title


def find_sessions(section_dir):
    """Every session of a section, in the order they are taken in.

    A session is a directory directly below a section.  Most carry a `-live` or
    a `-full` suffix and so come in pairs; a directory without one -- under
    `assignments/` or `extra/`, which are not split in two -- is a session of
    its own, with no variant.
    """
    sessions = []
    for entry in child_dirs(section_dir):
        directory, variant = split_variant(entry.name)
        sessions.append(
            node(
                entry,
                "session",
                directory=directory,
                variant=variant,
                label=session_title(entry),
                heading=session_heading(entry),
                tasks=find_tasks(entry),
            )
        )
    # Sorted by the directory the pair shares, so that the halves of one session
    # sit together, and within a pair by the order the halves are used in.
    sessions.sort(
        key=lambda session: (
            session["directory"],
            VARIANTS.index(session["variant"]) if session["variant"] else -1,
        )
    )
    return sessions


def section_sort_key(path):
    name = path.name
    index = SECTION_ORDER.index(name) if name in SECTION_ORDER else len(SECTION_ORDER)
    return (index, name)


def find_sections(content_root=CONTENT_ROOT):
    """Every section of the class: the directories directly below `content/`.

    Sections come back whole, with both halves of every session in them.  What
    the website is built from is `site_tree()`, which splits them into views.
    """
    content_root = Path(content_root)
    if not content_root.is_dir():
        return []
    sections = []
    for entry in sorted(child_dirs(content_root), key=section_sort_key):
        sections.append(
            node(
                entry,
                "section",
                sessions=find_sessions(entry),
                description=SECTION_DESCRIPTIONS.get(entry.name, ""),
            )
        )
    return sections


def task_urls(tasks, session_url, session_path):
    """A task tree with the URL of every page filled in, below the session.

    The URL of a task is its path below the session, so a task that sits inside
    a directory which is not itself a page -- the three `demo-copy-file/`
    variants of session 03 -- keeps that directory in its URL even though it is
    listed one level up.
    """
    located = []
    for task in tasks:
        relative = task["path"].relative_to(session_path).as_posix()
        located.append(
            dict(
                task,
                url=f"{session_url}/{relative}",
                tasks=task_urls(task["tasks"], session_url, session_path),
            )
        )
    return located


def locate(section, prefix, sessions):
    """A copy of `section` holding only `sessions`, with every URL filled in.

    `prefix` is the view the copy belongs to -- `live`, `full`, or nothing for a
    section that has no halves.  A session is published under its name without
    the variant suffix, because the view it is in already says which half it is:
    `content/labs/01-software-stack-live/` becomes `/live/labs/01-software-stack/`.
    """
    section_url = f"{prefix}/{section['path'].name}" if prefix else section["path"].name
    located = []
    for session in sessions:
        name = session["directory"] if session["variant"] else session["path"].name
        url = f"{section_url}/{name}"
        located.append(
            dict(
                session,
                url=url,
                tasks=task_urls(session["tasks"], url, session["path"]),
            )
        )
    return dict(section, url=section_url, sessions=located)


def site_tree(content_root=CONTENT_ROOT):
    """The website, as two views plus whatever belongs to neither.

    Returns the views -- `live` and `full`, each holding the sections that have
    a session of that half, and each section holding only those sessions -- and
    the sections that have no halves at all, which stay at the top level.

    A view appears only once something is written for it, so a repository with
    no `-full/` session anywhere has no full view rather than an empty one.
    """
    sections = find_sections(content_root)

    views = []
    for variant in VARIANTS:
        members = [
            locate(section, variant, sessions)
            for section in sections
            if (
                sessions := [
                    session
                    for session in section["sessions"]
                    if session["variant"] == variant
                ]
            )
        ]
        if members:
            views.append(
                {
                    "kind": "view",
                    "slug": variant,
                    "url": variant,
                    "variant": variant,
                    "title": VARIANT_LABELS[variant],
                    "description": VARIANT_DESCRIPTIONS.get(variant, ""),
                    "sections": members,
                }
            )

    # A section with no halves -- `assignments/`, `extra/` -- is not part of
    # either view, and neither is a section that holds nothing yet.
    plain = [
        locate(section, "", sessions)
        for section in sections
        if (
            sessions := [
                session for session in section["sessions"] if not session["variant"]
            ]
        )
        or not section["sessions"]
    ]
    return views, plain


def archive_sessions(content_root=CONTENT_ROOT):
    """The sessions packed into the archives handed to students.

    The live half of the labs, and nothing else.  The `-full/` sessions hold the
    reference solutions, and for session 05 the challenge flags and the exploits
    that find them, so they are never packed; `gen_zip.py` checks that again on
    every file it writes.
    """
    section_dir = Path(content_root) / ARCHIVE_SECTION
    if not section_dir.is_dir():
        return []
    return [
        session
        for session in find_sessions(section_dir)
        if session["variant"] == ARCHIVE_VARIANT
    ]


def is_reference(path):
    """Whether a path belongs to the reference half of a session.

    Such files -- reference solutions, and the session 05 flags and exploits --
    must never appear in a student archive.  The path may be relative to the
    repository root or to `content/`; what is looked at is whether any part of
    it is a `-full` session directory, or the `solutions` directory that
    material used to live in.
    """
    return any(
        part == "solutions" or split_variant(part)[1] == "full"
        for part in Path(path).parts
    )
