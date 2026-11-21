#!/usr/bin/env bash
#
# Publish the challenges of session 08 to the live half: for every task
# directory here that has a `flag`, build the executable against the
# reference library and copy to ../../08-concurrency-live/<task>/ what
# students are given:
#
#   * chall, the executable, with the key in it;
#   * chall.c and the header of the library, as they are;
#   * flag.h, with the key taken out.
#
# The skeleton of the library, the Makefile and the README of the live task
# are written by hand and are not touched.
#
#     ./utils/publish.sh            # from 08-concurrency-full/
#     ./utils/publish.sh 03-toctou  # one task

set -eu

full=$(cd "$(dirname "$0")/.." && pwd)
live=${full%-full}-live

if (($# > 0)); then
	tasks=("$@")
else
	tasks=()
	for flag in "$full"/*/flag; do
		tasks+=("$(basename "$(dirname "$flag")")")
	done
fi

for task in "${tasks[@]}"; do
	src=$full/$task
	dst=$live/$task

	if [[ ! -d $dst ]]; then
		echo "$task: no live directory, skipped" >&2
		continue
	fi

	make -s -C "$src" clean all

	cp "$src/chall" "$src/chall.c" "$dst/"
	for header in "$src"/*.h; do
		[[ $(basename "$header") == flag.h ]] || cp "$header" "$dst/"
	done

	# flag.h without the key: the lines of the array are replaced.
	awk '
		/^static const unsigned char flag_key\[\] = \{$/ {
			print "/*"
			print " * The key was removed from this copy of the source.  The executable you"
			print " * were given was built from the complete one."
			print " */"
			print
			print "\t0x00,"
			skipping = 1
			next
		}
		skipping && /^\};$/ { skipping = 0 }
		!skipping { print }
	' "$src/flag.h" > "$dst/flag.h"

	make -s -C "$src" clean
	echo "$task: published"
done
