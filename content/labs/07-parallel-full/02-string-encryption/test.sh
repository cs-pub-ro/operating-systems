#!/usr/bin/env bash
#
# Check the encryption: the program decrypts its own output with one thread
# and says whether the original text came back, so the test is to ask for
# that with the keys and the thread counts that expose a wrong split.  A key
# whose length divides the part size hides a key that restarts in every
# part; "secret", 6 characters, does not divide a power of two, and 3 and 7
# threads leave a remainder.  The small sizes are the ones a student debugs
# with: 20 characters leave a remainder with 3 and 7 threads, and with 1
# character every thread but the last has nothing to do.
#
#     ./test.sh

set -u

failed=0

for size in 16M 20 1; do
	for key in secret k abcd "a longer key, with spaces"; do
		for threads in 1 2 3 4 7 8 16 64; do
			if ! ./encrypt "$key" "$threads" "$size" | grep -q '^round trip: ok$'; then
				echo "FAIL: key '$key', $threads threads, size $size"
				failed=1
			fi
		done
		echo "ok:   key '$key', size $size, with 1, 2, 3, 4, 7, 8, 16 and 64 threads"
	done
done

if ((failed)); then
	echo "FAILED"
	exit 1
fi
echo "PASSED"
