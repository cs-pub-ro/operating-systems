#!/usr/bin/env bash
#
# Check the hashing against `md5sum` run by hand on the same list: the lines
# have to be the same ones, in whatever order.  Then check that a name in the
# list that is not a file is counted as a failure and makes the exit status
# non-zero, while the other files are still hashed.
#
# This recreates data/ and files.txt, and removes them at the end.
#
#     ./test.sh

set -u

failed=0

./gen_files.sh 8 2 > /dev/null

mapfile -t names < files.txt
expected=$(md5sum "${names[@]}" | sort)

./hash_files files.txt > hashes.txt 2> summary.txt
status=$?
got=$(sort hashes.txt)
if [[ $got == "$expected" && $status -eq 0 ]]; then
	echo "ok:   8 files, same hashes as md5sum, exit status 0"
else
	echo "FAIL: 8 files: the hashes differ from md5sum's, or the exit status is $status"
	failed=1
fi
if grep -q '^8 files, 0 failed' summary.txt; then
	echo "ok:   summary: $(cat summary.txt)"
else
	echo "FAIL: summary: $(cat summary.txt)"
	failed=1
fi

echo "data/no-such-file.bin" >> files.txt
./hash_files files.txt > hashes.txt 2> summary.txt
status=$?
got=$(sort hashes.txt)
if [[ $got == "$expected" && $status -ne 0 ]] && grep -q '^9 files, 1 failed' summary.txt; then
	echo "ok:   a missing file: 1 failed, exit status $status, the others hashed"
else
	echo "FAIL: a missing file: exit status $status, summary: $(tail -n 1 summary.txt)"
	failed=1
fi

rm -rf data files.txt hashes.txt summary.txt

if ((failed)); then
	echo "FAILED"
	exit 1
fi
echo "PASSED"
