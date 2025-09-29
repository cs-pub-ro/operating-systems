#!/usr/bin/env python3
# SPDX-License-Identifier: BSD-3-Clause

import yaml
import sys
import re
import subprocess
import os
import zipfile
from pathlib import Path


def load_yaml(yaml_path):
    with open(yaml_path, "r") as f:
        return yaml.safe_load(f)


def extract_task_info_by_lab(data):
    """
    Return a dict:
    lab_title -> {
      'tasks': [ 'tasks/memory-access.md', ... ],
      'basenames': [ 'memory-access.md', ... ],
      'stems': [ 'memory-access', ... ]
    }
    """
    labs = data.get("lab_structure", [])
    lab_info = {}

    for lab in labs:
        title = lab.get("title", "Untitled Lab")
        content = lab.get("content", [])
        task_files = [c for c in content if c.startswith("tasks/")]
        basenames = [Path(t).name for t in task_files]
        stems = [Path(t).stem for t in task_files]

        lab_info[title] = {"tasks": task_files, "basenames": basenames, "stems": stems}

    return lab_info


def get_changed_files_last_commit():
    """Return a list of file paths changed in the last commit."""
    cmd = ["git", "diff", "--name-only", "HEAD~1", "HEAD"]
    result = subprocess.run(cmd, capture_output=True, text=True, check=True)
    return [line.strip() for line in result.stdout.splitlines() if line.strip()]


def find_directories_by_name(dirname):
    """
    Return a list of directories in the repo that match the given base name.
    Example: dirname='memory-access' matches any '.../memory-access' dir.
    """
    matches = []
    for root, dirs, _ in os.walk("."):
        for d in dirs:
            if d == dirname:
                matches.append(os.path.join(root, d))
    return matches


def create_zip_archive(lab_title, directories):
    """
    Create a zip archive named after the lab title containing all directories.
    """
    safe_name = re.sub(r"[^a-zA-Z0-9_]+", "_", lab_title)
    zip_filename = f"{safe_name}.zip"

    with zipfile.ZipFile(zip_filename, "w", zipfile.ZIP_DEFLATED) as zipf:
        for d in directories:
            for folder, _, files in os.walk(d):
                for file in files:
                    file_path = os.path.join(folder, file)
                    arcname = os.path.relpath(file_path, d)
                    zipf.write(file_path, os.path.join(os.path.basename(d), arcname))

    return zip_filename


def main():
    if len(sys.argv) != 2:
        sys.exit(1)

    yaml_path = sys.argv[1]

    # 1. Parse YAML and extract task info
    data = load_yaml(yaml_path)
    lab_info = extract_task_info_by_lab(data)

    # 2. Get changed files from last commit
    changed_files = get_changed_files_last_commit()
    changed_basenames = [Path(f).name for f in changed_files]

    # 3. Identify labs to archive
    for lab_title, info in lab_info.items():
        # Check if any changed filename matches one of the task basenames
        stems = info["stems"]
        lab_changed = any(
            any(stem.lower() in changed_path.lower() for stem in stems)
            for changed_path in changed_files
        )

        if not lab_changed:
            continue

        # Collect all directories for all task stems in this lab
        dirs_to_zip = []
        for stem in info["stems"]:
            found_dirs = find_directories_by_name(stem)
            if found_dirs:
                dirs_to_zip.extend(found_dirs)

        if dirs_to_zip:
            create_zip_archive(lab_title, dirs_to_zip)


if __name__ == "__main__":
    main()
