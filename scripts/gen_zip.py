#!/usr/bin/env python3
"""Pack the tasks of every lab session into one archive per session.

These are the archives handed to students, so they hold the tasks and nothing
else.  What is packed is `content/labs/NN-<name>-live/`, the half of a lab
session students work on during it (see `sessions.py`, the same rule the
website uses, so the two can never disagree).  Its `NN-<name>-full/` sibling --
the reference solutions, and for session 05 the challenge flags and exploits --
is never packed, and neither is anything outside `content/labs/`.  The archive
is named after the session with the `-live` suffix stripped, so students unzip
a clean `NN-<name>/` directory.  As a last line of defence, packing aborts
outright if any file from a `-full/` tree ever reaches an archive.

Only files tracked by git are packed.  A build artefact left in the working
tree -- an object file, a compiled binary, a core dump -- is therefore never
shipped by accident, and the archives are the same whether they are built from
a clean checkout or from the tree you have been working in.

Archives are deterministic: entries are sorted, and every timestamp is fixed.
The same repository contents always produce byte-identical archives, which is
what lets the workflow commit only when something has actually changed.

Usage:

    python3 scripts/gen_zip.py [--output archives] [--quiet]
"""

import argparse
import stat
import subprocess
import sys
import zipfile
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from sessions import (  # noqa: E402
    ARCHIVE_VARIANT,
    REPO_ROOT,
    archive_sessions,
    is_reference,
    walk_tasks,
)

DEFAULT_OUTPUT = REPO_ROOT / "archives"

# The zip epoch: the oldest timestamp the format can hold.  Any fixed value
# would do; what matters is that it does not change between runs.
FIXED_TIMESTAMP = (1980, 1, 1, 0, 0, 0)

# Files that sit inside a task directory but are notes to ourselves rather than
# material for students.  The `prompt.txt` files are the prompts the exercises
# were written from, and several of them describe the solution.
EXCLUDED_FILES = ("prompt.txt", "*-prompt.txt")


def tracked_files(repo_root):
    """Every file git knows about, as paths relative to the repository root."""
    result = subprocess.run(
        ["git", "ls-files", "-z"],
        cwd=repo_root,
        capture_output=True,
        text=True,
        check=True,
    )
    return {Path(name) for name in result.stdout.split("\0") if name}


def is_internal(path):
    """Whether a file is an authoring note rather than material for students."""
    return any(path.match(pattern) for pattern in EXCLUDED_FILES)


def files_of_task(task, tracked, repo_root):
    """The tracked files of one task directory, in a stable order."""
    prefix = task["path"].relative_to(repo_root)
    return sorted(
        path for path in tracked if prefix in path.parents and not is_internal(path)
    )


def add_file(archive, source, arcname):
    """Add one file to the archive, without recording when it was built."""
    info = zipfile.ZipInfo(arcname, date_time=FIXED_TIMESTAMP)
    info.compress_type = zipfile.ZIP_DEFLATED
    # Say the archive was built on a Unix system, so that the mode below is
    # read back rather than ignored: the session 05 challenge binaries have to
    # come out of the archive executable.
    info.create_system = 3
    mode = 0o755 if source.stat().st_mode & stat.S_IXUSR else 0o644
    info.external_attr = (stat.S_IFREG | mode) << 16
    archive.writestr(info, source.read_bytes())


def archive_name(session):
    """The student-facing name of a session's archive, without `-live`.

    Students download `NN-<name>.zip` and unzip a clean `NN-<name>/` directory;
    the `-live` suffix is internal plumbing they never need to see.
    """
    return session["directory"]


def build_archive(session, tracked, output_dir, repo_root):
    """Write one session's archive, and return its path and file count.

    Everything is packed under a single top-level directory named after the
    session (minus `-live`), so that unpacking an archive creates one directory
    instead of scattering task directories into the current one.
    """
    name = archive_name(session)
    # Keyed by archive name so a file reached through more than one task is
    # packed exactly once.  The vendored `bonus-printf/utils/printf/` tree is
    # support code inside the `bonus-printf` task rather than a task of its own,
    # so it is packed with `bonus-printf` even though it gets no page.
    entries = {}
    session_prefix = session["path"].relative_to(repo_root)
    for task in walk_tasks(session["tasks"]):
        for path in files_of_task(task, tracked, repo_root):
            # Never, under any circumstances, ship reference material.
            if is_reference(path):
                sys.exit(f"refusing to pack reference file into an archive: {path}")
            arcname = f"{name}/{path.relative_to(session_prefix)}"
            entries[arcname] = repo_root / path

    if not entries:
        return None, 0

    target = output_dir / f"{name}.zip"
    with zipfile.ZipFile(target, "w") as archive:
        for arcname, source in sorted(entries.items()):
            add_file(archive, source, arcname)
    return target, len(entries)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--output",
        default=DEFAULT_OUTPUT,
        type=Path,
        help="directory to write the archives into (default: archives)",
    )
    parser.add_argument(
        "--quiet",
        action="store_true",
        help="say nothing unless something goes wrong",
    )
    args = parser.parse_args()

    output_dir = args.output.resolve()
    if output_dir == REPO_ROOT:
        sys.exit("refusing to write the archives into the repository root")
    output_dir.mkdir(parents=True, exist_ok=True)
    # Old archives of a session that has since been renamed or removed would
    # otherwise be handed out forever.
    for stale in output_dir.glob("*.zip"):
        stale.unlink()

    tracked = tracked_files(REPO_ROOT)
    sessions = archive_sessions()
    if not sessions:
        sys.exit(f"no `-{ARCHIVE_VARIANT}` lab session directories found")

    built = 0
    for session in sessions:
        target, count = build_archive(session, tracked, output_dir, REPO_ROOT)
        if target is None:
            if not args.quiet:
                print(f"skipped {session['slug']}: no tracked task files")
            continue
        built += 1
        if not args.quiet:
            tasks = len(list(walk_tasks(session["tasks"])))
            print(f"{target.name}: {count} files from {tasks} tasks")

    if not built:
        sys.exit("no archives were built")
    if not args.quiet:
        print(f"built {built} archives into {output_dir}")


if __name__ == "__main__":
    main()
