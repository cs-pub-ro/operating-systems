#!/usr/bin/env bash
#
# Create the command files the database is driven with: NFILES files of
# NADDS `add` commands each, every `add` followed by a `find` of a record
# that the same file added earlier.  The ids are different in every file, and
# the files are the same on every run.
#
#     ./gen_commands.sh             # 4 files, 5000 adds and 5000 finds each
#     ./gen_commands.sh 8 1000

set -eu

nfiles=${1:-4}
nadds=${2:-5000}

rm -f commands-*.txt

for ((f = 1; f <= nfiles; f++)); do
	awk -v file="$f" -v nadds="$nadds" 'BEGIN {
		base = file * 1000000
		for (i = 0; i < nadds; i++) {
			printf "add %d user-%d-%d\n", base + i, file, i
			# An earlier record of this file, a different one each time.
			printf "find %d\n", base + (i * 7919) % (i + 1)
		}
	}' > "commands-$f.txt"
done

echo "$nfiles files of $nadds adds and $nadds finds each: commands-1.txt .. commands-$nfiles.txt"
