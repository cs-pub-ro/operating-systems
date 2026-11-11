#!/usr/bin/env bash
#
# Check the database against what the command files say should be in it: the
# number of records is the number of `add` lines, the sum of the ids is the
# sum of the ids in those lines, and every `find` finds its record, because
# it looks for one that the same file added earlier.  A race does not show on
# every run, so the check is repeated.
#
# This recreates the commands-*.txt files.
#
#     ./test.sh

set -u

runs=10
failed=0

./gen_commands.sh 8 2000 > /dev/null

adds=$(cat commands-*.txt | grep -c '^add ')
finds=$(cat commands-*.txt | grep -c '^find ')
sum=$(cat commands-*.txt | awk '$1 == "add" { sum += $2 } END { printf "%d\n", sum }')

for ((run = 1; run <= runs; run++)); do
	out=$(./db commands-*.txt 2>&1)
	status=$?
	if [[ $status -ne 0 ]]; then
		echo "FAIL: run $run: exit status $status"
		failed=1
		continue
	fi
	if ! grep -q "^records: $adds " <<< "$out"; then
		echo "FAIL: run $run: expected $adds records, got: $(grep '^records:' <<< "$out")"
		failed=1
	fi
	if ! grep -q "^id sum:  $sum\$" <<< "$out"; then
		echo "FAIL: run $run: expected id sum $sum, got: $(grep '^id sum:' <<< "$out")"
		failed=1
	fi
	if ! grep -q "^finds:   $finds, found $finds\$" <<< "$out"; then
		echo "FAIL: run $run: expected $finds finds, all found, got: $(grep '^finds:' <<< "$out")"
		failed=1
	fi
	if ! grep -q "^errors:  0\$" <<< "$out"; then
		echo "FAIL: run $run: $(grep '^errors:' <<< "$out")"
		failed=1
	fi
done

if ((failed)); then
	echo "FAILED"
	exit 1
fi
echo "ok:   $runs runs, 8 threads: $adds records, id sum $sum, $finds finds all found"
echo "PASSED"
