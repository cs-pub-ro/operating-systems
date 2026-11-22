#!/usr/bin/env bash
#
# Check the reference library: the executable has to print the flag kept in
# the `flag` file.  A synchronization bug does not show on every run, so the
# check is repeated.
#
#     ./test.sh

set -u

runs=50
failed=0
flag=$(cat flag)

for ((run = 1; run <= runs; run++)); do
	out=$(./chall 2>&1)
	status=$?
	if [[ $status -ne 0 ]] || ! grep -qxF "flag: $flag" <<< "$out"; then
		echo "FAIL: run $run: exit status $status"
		tail -n 3 <<< "$out" | sed 's/^/      /'
		failed=1
	fi
done

if ((failed)); then
	echo "FAILED"
	exit 1
fi
echo "ok:   $runs runs, the flag every time"
echo "PASSED"
