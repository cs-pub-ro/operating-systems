#!/usr/bin/env python3
# SPDX-License-Identifier: BSD-3-Clause

import os
import re
from typing import List
import yaml

CHAPTERS = ["Software Stack", "Data", "Compute", "IO", "App Interact"]
CHAPTERS_PATH = "chapters/"

viewDir = ".view"
readingDir = f"{viewDir}/reading"
tasksDir = f"{viewDir}/tasks"
guidesDir = f"{viewDir}/guides"
mediaDir = f"{viewDir}/media"
questionsDir = f"{viewDir}/questions"


def hyphenate(text: str) -> str:
    return "-".join(text.strip().split(" ")).lower()


def group_reading():
    """
    Group all the reading files in a single directory.
    """
    os.makedirs(readingDir, exist_ok=True)

    for root, _, files in os.walk(CHAPTERS_PATH):
        for f in files:
            if "reading" in root and f.endswith(".md") and f != "overview.md":
                os.popen(f"cp {os.path.join(root, f)} {readingDir}/")


def group_media():
    """
    Group all the media files in a single directory.
    """
    os.makedirs(mediaDir, exist_ok=True)
    formats = (".jpg", ".jpeg", ".png", ".gif", ".svg")

    for root, _, files in os.walk(CHAPTERS_PATH):
        for f in files:
            if f.endswith(formats):
                os.popen(f"cp {os.path.abspath(os.path.join(root, f))} {mediaDir}/")


def group_tasks():
    """
    Group all the tasks README.md files in a single directory.
    """
    os.makedirs(tasksDir, exist_ok=True)

    for root, _, files in os.walk(CHAPTERS_PATH):
        for f in files:
            if f == "README.md":
                # Copy the README.md file from a task directory
                if "tasks" in root:
                    taskName = os.path.basename(root)
                    os.popen(f"cp {os.path.join(root, f)} {tasksDir}/{taskName}.md")


def group_questions():
    """
    Group all the question files in a single directory.
    """
    os.makedirs(questionsDir, exist_ok=True)

    for root, _, files in os.walk(CHAPTERS_PATH):
        for f in files:
            if "questions" in root:
                os.popen(f"cp {os.path.join(root, f)} {questionsDir}/")


def group_guides():
    """
    Group all the guides README.md files in a single directory.
    """
    os.makedirs(guidesDir, exist_ok=True)

    for root, _, files in os.walk(CHAPTERS_PATH):
        for f in files:
            if f == "README.md":
                # Copy the README.md file from a guide directory
                if "guides" in root:
                    guideName = os.path.basename(root)
                    os.popen(f"cp {os.path.join(root, f)} {guidesDir}/{guideName}.md")


def setup_overview():
    """
    Copy the overview.md file for each chapter to the .view directory.
    """
    hyphenChapters = [hyphenate(c) for c in CHAPTERS]
    for c in hyphenChapters:
        # FIXME: We use "." instead of CHAPTERS_PATH to account for the segregated chapters.
        # This is a temporary solution until all chapters are merged under CHAPTERS_PATH.
        for root, _, files in os.walk("."):
            if c in root and "overview.md" in files:
                dst = f"{viewDir}/{c}-overview.md"
                print(f"Copying {root}/overview.md to {dst}")
                os.popen(f"cp {os.path.join(root, 'overview.md')} {dst}")

    for c in hyphenChapters:
        if not os.path.isfile(f"{viewDir}/{c}-overview.md"):
            continue

        with open(f"{viewDir}/{c}-overview.md") as f:
            text = f.read()
        with open(f"{viewDir}/{c}-overview.md", "w") as f:
            f.write(text)

    print()  # Add a newline for better readability


def solve_links(filename: str, fileToLab: dict) -> str:
    """
    Make relative links work in the final markdown file.

    * Links to media and tasks are solved by referencing the .view directory.
    * Links to questions are solved by referencing the Questions section in the same chapter.
    * Links to other reading files are solved by determining the lab number and the subchapter.
        The lab number is determined by the fileToLab dictionary, and the subchapter is the first line of the file.
        For example, [text](../reading/basic-syscall.md) will become [text](.view/lab1#basic-syscall).
    """
    with open(filename) as f:
        text = f.read()

    # Questions from the same chapter are at Questions/<question>, without the .md extension
    text = re.sub(r"(\[.*?\])\(.*?questions/(.*?)\.md\)", r"\1(questions/\2.md)", text)

    # Remove relative links to reading, media, tasks, and guides
    for section in ["reading", "media", "tasks", "guides"]:
        # Questions are placed in a directory of their own, just like media, so we need to go up one level
        if "questions" in filename and section == "media":
            section = "../" + section
        text = re.sub(
            r"(\[.*?\])\([^\)]*" + section + r"/(.*?)\)", rf"\1({section}/\2)", text
        )

    # Reading links [text](.*/reading/<file>.md) should be replaced with [text](.view/labQ#<chapter>)
    # Where Q is the lab number and chapter is the heading of the file
    matches = re.findall(r"\[[^\]]*\]\(([^\)]+\.md)\)", text)
    for sourceFile in matches:
        if sourceFile.startswith("questions/"):
            continue

        origName = sourceFile  # Save the original name for the regex
        if sourceFile.endswith("README.md"):
            sourceFile = os.path.dirname(sourceFile) + ".md"

        filepath = os.path.join(viewDir, sourceFile)

        # Tasks and guides are prefixed with the section name
        # FIXME: Refactor this.
        prefix = ""
        if "tasks/" in sourceFile:
            prefix = "task-"
        elif "guides/" in sourceFile:
            prefix = "guide-"

        # Get the first line of the file to extract the chapter in hyphenated format
        try:
            with open(filepath) as f:
                title = f.readline().strip("#").replace("`", "").replace(":", "")
                subchapter = prefix + hyphenate(title)
        except:
            print(f"Error: Could not solve link to {filepath} for {filename}")
            continue

        text = re.sub(
            rf"(\[.*\])\({origName}\)",  # Use origName because tasks 'sourceFile' has changed
            rf"\1({fileToLab[sourceFile]}#{subchapter})",
            text,
        )

    with open(filename, "w") as f:
        f.write(text)


def find_broken_links():
    """
    Find potentially broken links in the markdown file.
    """
    prefixes = ["lab", "media", "tasks", "Questions", "reading", "guides", "http"]

    for root, _, files in os.walk(viewDir):
        for f in files:
            if "lab" in f:  # Skip lab files, check source files only
                continue

            if f.endswith(".md"):
                with open(os.path.join(root, f)) as f:
                    text = f.read()

                # Find all links that do not point to a markdown file
                matches = re.findall(r"\[[^\]]*\]\(([^\)]+)\)", text)
                for link in matches:
                    # Questions media links corner case
                    isValidQMediaLink = "questions" in root and link.startswith(
                        "../media/"
                    )

                    if (
                        not any([link.startswith(p) for p in prefixes])
                    ) and not isValidQMediaLink:
                        print(f"Possibly broken link in {f.name}: ({link})")


class Lab:
    def __init__(self, title: str, filename: str, content: List[str]):
        self.text = f"# {title}\n\n"
        for file in content:
            self.process_file(file)

        print(f"Generating lab {viewDir}/{filename}")
        with open(f"{viewDir}/{filename}", "w") as f:
            f.write(self.text)

    def process_file(self, filename: str):
        """
        Process a file and add it to the lab text.
        """
        with open(os.path.join(viewDir, filename)) as f:
            if "reading/" in filename:
                filecontent = f.read()
            else:
                lines = f.readlines()
                # Rename "# Some title" to "## Task: Some title" or "## Guide: Some title"
                if "tasks/" in filename:
                    prefix = "Task"
                elif "guides/" in filename:
                    prefix = "Guide"

                lines[0] = f"# {prefix}:{lines[0].strip('#')}\n"
                filecontent = "".join(lines)

        # Add one more level of indentation to the chapter headings
        filecontent = re.sub(r"^(#+)", r"\1#", filecontent, flags=re.MULTILINE)
        self.text += filecontent + "\n\n"


class ConfigParser:
    def __init__(self, path):
        self.fileToLab = None
        with open(path) as f:
            self.data = yaml.safe_load(f)

    def create_labs(self):
        for entry in self.data["lab_structure"]:
            Lab(entry["title"], entry["filename"], entry["content"])
        print()  # Add a newline for better readability

    def get_file_to_lab_dict(self) -> dict:
        """
        Returns a dictionary mapping the source files to the labs they belong to.
        This is used to transform relative links in the source files to the corresponding lab.
        """
        if self.fileToLab:
            return self.fileToLab

        self.fileToLab = {}
        for id, lab in enumerate(self.data["lab_structure"]):
            for c in lab["content"]:
                self.fileToLab[c] = f"lab{id+1}.md"
        return self.fileToLab


def main():
    """
    1. Group all media, tasks, and questions in their respective folders in .view.
    Will result in .view/media/, .view/tasks/, and .view/questions/ folders.

    2. For each lab, concatenate the lab content and tasks.

    3. For each lab, solve relative links to media, tasks, and questions.

    4. Copy the overview.md file to the .view directory.
    """
    # Prepare directories layout
    group_reading()
    group_media()
    group_tasks()
    group_guides()
    group_questions()

    # Parse the config file
    config = ConfigParser("config.yaml")
    config.create_labs()

    # Copy the overview.md file for each chapter to the .view directory
    setup_overview()

    # Solve links recursively in all markdown files
    for root, _, files in os.walk(viewDir):
        for f in files:
            if f.endswith(".md"):
                solve_links(os.path.join(root, f), config.get_file_to_lab_dict())

    # Check for broken links
    find_broken_links()


if __name__ == "__main__":
    main()
