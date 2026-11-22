#!/usr/bin/env bash
#
# Check the order: every line of the output has to be "1 2 3".  The order
# the scheduler picks changes from run to run, so the check is repeated.
#
#     ./test.sh

set -u

runs=20
rounds=2000
failed=0

for ((run = 1; run <= runs; run++)); do
	out=$(timeout 10 ./ordered "$rounds")
	status=$?
	lines=$(grep -cx '1 2 3' <<< "$out")
	if [[ $status -ne 0 || $lines -ne $rounds || $(wc -l <<< "$out") -ne $rounds ]]; then
		echo "FAIL: run $run: exit status $status, $lines of $rounds lines are '1 2 3'"
		failed=1
	fi
done

if ((failed)); then
	echo "FAILED"
	exit 1
fi
echo "ok:   $runs runs of $rounds rounds, every line '1 2 3'"
echo "PASSED"
