#!/usr/bin/env bash
#
# Check the messages: for several thread counts, and several runs of each,
# every line of the file has to be a whole message, and there have to be
# threads * messages of them.  A race does not show on every run, which is
# why one run proves nothing.
#
#     ./test.sh

set -u

messages=10000
runs=5
failed=0

for threads in 1 2 4 8; do
	expected=$((threads * messages))
	for ((run = 1; run <= runs; run++)); do
		got=$(./messages "$threads" "$messages" | awk '/^whole lines:/ { print $3 }')
		if [[ $got != "$expected" ]]; then
			echo "FAIL: $threads threads, run $run: expected $expected whole lines, got $got"
			failed=1
		fi
	done
	echo "ok:   $threads threads, $runs runs of $messages messages each"
done

rm -f messages.txt

if ((failed)); then
	echo "FAILED"
	exit 1
fi
echo "PASSED"
