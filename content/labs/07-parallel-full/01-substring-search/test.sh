#!/usr/bin/env bash
#
# Check the search against `grep -o`, which counts the same thing: for several
# words and several thread counts the total has to be grep's.  The generator
# plants "kernel" across the 2-, 4- and 8-way split points, so a split that
# loses the matches on a boundary fails here.
#
#     ./test.sh

set -u

file=test.txt
failed=0

./gen_text "$file" 16 > /dev/null

for word in kernel "kernel schedules" k "the kernel" process; do
	expected=$(grep -o -- "$word" "$file" | wc -l)
	for threads in 1 2 3 4 7 8 16 64; do
		got=$(./search "$file" "$word" "$threads" | awk '{ print $1 }')
		if [[ $got != "$expected" ]]; then
			echo "FAIL: '$word', $threads threads: expected $expected, got $got"
			failed=1
		fi
	done
	echo "ok:   '$word': $expected matches with 1, 2, 3, 4, 7, 8, 16 and 64 threads"
done

rm -f "$file"

if ((failed)); then
	echo "FAILED"
	exit 1
fi
echo "PASSED"
