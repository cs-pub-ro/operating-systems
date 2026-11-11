#!/usr/bin/env bash
#
# Check the count: whatever the number of threads, including the ones that do
# not divide the buffer size, the total has to be the one a single thread
# finds.  A small buffer keeps it quick; correctness does not depend on size.
#
#     ./test.sh

set -u

size_mib=16
failed=0

count_with() {
	./count_chars "$1" "$size_mib" | awk '/occurs/ { print $3 }'
}

expected=$(count_with 1)
echo "1 thread: $expected"

for threads in 2 3 4 7 8 13 32 100 1024; do
	got=$(count_with "$threads")
	if [[ $got == "$expected" ]]; then
		echo "ok:   $threads threads"
	else
		echo "FAIL: $threads threads: expected $expected, got $got"
		failed=1
	fi
done

if ((failed)); then
	echo "FAILED"
	exit 1
fi
echo "PASSED"
