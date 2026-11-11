#!/usr/bin/env bash
#
# Check the hashing against `md5sum` run by hand on the same list: the lines
# have to be the same and, unlike with processes, in the same order, because
# the main thread prints them.  Sizes around the 64-byte block of MD5 are in
# the list on purpose.  Then check that a name that is not a file is counted
# as a failure and makes the exit status non-zero.
#
# This recreates data/ and files.txt, and removes them at the end.
#
#     ./test.sh

set -u

failed=0

./gen_files.sh 8 2 > /dev/null
for size in 0 1 55 56 63 64 65 65599; do
	head -c "$size" /dev/urandom > "data/size-$size.bin"
	echo "data/size-$size.bin" >> files.txt
done

mapfile -t names < files.txt
expected=$(md5sum "${names[@]}")

./hash_files files.txt > hashes.txt 2> summary.txt
status=$?
if [[ $(cat hashes.txt) == "$expected" && $status -eq 0 ]]; then
	echo "ok:   16 files, same hashes as md5sum, in the order of the list, exit status 0"
else
	echo "FAIL: 16 files: the output differs from md5sum's, or the exit status is $status"
	failed=1
fi
if grep -q '^16 files, 0 failed' summary.txt; then
	echo "ok:   summary: $(cat summary.txt)"
else
	echo "FAIL: summary: $(cat summary.txt)"
	failed=1
fi

echo "data/no-such-file.bin" >> files.txt
./hash_files files.txt > hashes.txt 2> summary.txt
status=$?
if [[ $(cat hashes.txt) == "$expected" && $status -ne 0 ]] && grep -q '^17 files, 1 failed' summary.txt; then
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
