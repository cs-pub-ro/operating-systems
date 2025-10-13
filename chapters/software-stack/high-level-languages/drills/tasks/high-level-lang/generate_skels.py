#!/usr/bin/python3 -u
# SPDX-License-Identifier: BSD-3-Clause

import sys
import argparse
import os.path
import re


def process_file(src, dst, pattern, replace, remove, replace_pairs, end_string=None):
    if not pattern or not replace or not remove:
        print(
            f"ERROR: The script behaviour is not properly specified for {src}",
            file=sys.stderr,
        )
        sys.exit(1)

    fin = open(src, "r")
    fout = open(dst, "w")
    remove_lines = 0
    skip_lines = 0
    uncomment_lines = 0
    end_found = True

    for l in fin.readlines():
        # Skip generation of file.
        if "SKIP_GENERATE" in l:
            fout.close()
            os.remove(dst)
            return

        if end_string and end_found == False:
            fout.write(l)
            if end_string in l:
                end_found = True
            continue

        if remove_lines > 0:
            remove_lines -= 1
            continue

        if skip_lines > 0:
            skip_lines -= 1
            m = re.search(pattern, l)
            if m:
                l = "%s%s\n" % (m.group(1), m.group(3))
                fout.write(l)
            continue

        if uncomment_lines > 0:
            uncomment_lines -= 1
            for fro, to in replace_pairs:
                l = re.sub(fro, to, l)
            fout.write(l)
            continue

        m = re.search(pattern, l)
        if m:
            if m.group(2):
                skip_lines = int(m.group(2))
            else:
                skip_lines = 1

            if end_string and end_string not in l:
                end_found = False

            l = "%s%s\n" % (m.group(1), m.group(3))

        m = re.search(replace, l)
        if m:
            if m.group(2):
                uncomment_lines = int(m.group(2))
            else:
                uncomment_lines = 1
            continue

        m = re.search(remove, l)
        if m:
            if m.group(2):
                remove_lines = int(m.group(2))
            else:
                remove_lines = 1
            continue

        fout.write(l)

    fout.close()


def main():
    parser = argparse.ArgumentParser(
        description="Generate skeletons sources from reference solution sources"
    )
    parser.add_argument(
        "--input", help="input directory to process files", required=True
    )
    parser.add_argument(
        "--output", help="output directory to copy processed files", required=True
    )
    args = parser.parse_args()

    for root, dirs, files in os.walk(args.input):
        new_root = os.path.join(args.output, os.path.relpath(root, args.input))
        for d in dirs:
            os.makedirs(os.path.join(new_root, d), exist_ok=True)

        for src in files:
            if (
                re.match("Makefile.*$", src)
                or re.match(r".*\.sh$", src)
                or re.match(r".*\.[sS]$", src)
                or re.match(r".*\.py$", src)
                or re.match(r".*\.go$", src)
            ):
                pattern = r"(^\s*#\s*TODO)( [0-9]*)(:.*)"
                replace = r"(^\s*#\s*REPLACE)( [0-9]*)"
                remove = r"(^\s*#\s*REMOVE)( [0-9]*)"
                replace_pairs = [("# ", "")]
                end_string = None
            elif re.match(r".*\.asm$", src):
                pattern = r"(^\s*;\s*TODO)( [0-9]*)(:.*)"
                replace = r"(^\s*;\s*REPLACE)( [0-9]*)"
                remove = r"(^\s*;\s*REMOVE)( [0-9]*)"
                replace_pairs = [("; ", "")]
                end_string = None
            elif (
                re.match(r".*\.[ch]$", src)
                or re.match(r".*\.cpp$", src)
                or re.match(r".*\.hpp$", src)
            ):
                pattern = r"(.*/\*\s*TODO)([ 0-9]*)(:.*)"
                replace = r"(.*/\*\s*REPLACE)( [0-9]*)"
                remove = r"(.*/\*\s*REMOVE)( [0-9]*)"
                replace_pairs = [(r"/\* ", ""), (r" \*/", "")]
                end_string = "*/"
            elif re.match(r".*\.d$", src):
                pattern = r"(.*//\s*TODO)([ 0-9]*)(:.*)"
                replace = r"(.*//\s*REPLACE)( [0-9]*)"
                remove = r"(.*//\s*REMOVE)( [0-9]*)"
                replace_pairs = [(r"// ", "")]
                end_string = None
            else:
                continue

            dst = os.path.join(new_root, src)
            src = os.path.join(root, src)
            print(dst)
            process_file(src, dst, pattern, replace, remove, replace_pairs, end_string)


if __name__ == "__main__":
    sys.exit(main())
