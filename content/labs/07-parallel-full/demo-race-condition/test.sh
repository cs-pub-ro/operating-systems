#!/usr/bin/env bash
#
# Check the counter: for several thread counts, and several runs of each, the
# final value has to be exactly threads * increments.  A race does not show on
# every run, which is why one run proves nothing.
#
#     ./test.sh

set -u

increments=1000000
runs=5
failed=0

for threads in 1 2 4 8; do
	expected=$((threads * increments))
	for ((run = 1; run <= runs; run++)); do
		got=$(./counter "$threads" "$increments" | awk '/^counter:/ { print $2 }')
		if [[ $got != "$expected" ]]; then
			echo "FAIL: $threads threads, run $run: expected $expected, got $got"
			failed=1
		fi
	done
	echo "ok:   $threads threads, $runs runs of $increments increments each"
done

if ((failed)); then
	echo "FAILED"
	exit 1
fi
echo "PASSED"
