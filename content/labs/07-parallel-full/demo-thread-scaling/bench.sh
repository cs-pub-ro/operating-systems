#!/usr/bin/env bash
#
# Time the count for a series of thread counts and print one line for each:
# the time of the counting alone, how many times faster that is than with one
# thread, and the time of the whole program.  Each figure is the best of
# three runs, which is the least noisy of the simple choices.
#
#     ./bench.sh                  # 1 2 4 8 16 32 64 256 1024
#     ./bench.sh 1 2 3 4

set -eu

runs=3

if (($# > 0)); then
	counts=("$@")
else
	counts=(1 2 4 8 16 32 64 256 1024)
fi

# Best of $runs runs: prints "<count time> <whole-program time>".
measure() {
	local threads=$1 start end count

	for ((run = 0; run < runs; run++)); do
		start=$(date +%s.%N)
		count=$(./count_chars "$threads" | awk '/^count:/ { print $2 }')
		end=$(date +%s.%N)
		echo "$count $start $end"
	done | awk '
		{ total = $3 - $2 }
		NR == 1 || $1 < best_count { best_count = $1 }
		NR == 1 || total < best_total { best_total = total }
		END { print best_count, best_total }'
}

echo "cores: $(nproc)"
printf '%8s %10s %9s %10s %9s\n' threads "count (s)" speed-up "total (s)" speed-up

for threads in "${counts[@]}"; do
	echo "$threads $(measure "$threads")"
done | awk '
	NR == 1 { base_count = $2; base_total = $3 }
	{ printf "%8d %10.3f %8.2fx %10.3f %8.2fx\n", $1, $2, base_count / $2, $3, base_total / $3 }'
