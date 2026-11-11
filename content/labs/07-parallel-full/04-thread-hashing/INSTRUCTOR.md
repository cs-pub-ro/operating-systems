# Instructor Notes: Hashing Files With Several Threads

## Purpose

The previous exercise again, with threads, so that the two can be put side by side: how a worker gets its work, how it hands back a result, who prints.
No mutex is needed, and the argument for why not, four short lines in the README, is what a student should be able to give.

## Expected answers

* **TODO 1**: a struct with the path, a `char hex[MD5_HEX_LEN]`, and a failure flag.
* **TODO 2**: one call to `md5_file()`, its result stored in the struct; no printing.
* **TODO 3**: fill in the path and `pthread_create()` with `&jobs[i]`, for every file.
* **TODO 4**: `pthread_join()`, then count or print from the struct.

Returning the failure through the thread's return value (`return (void *) (long) rc`) instead of a field works and is a fair alternative.

## Things students get wrong

* **One struct, reused for every thread**, or a struct declared inside the loop.
  All threads then share one `hex` and one path: the digests are scrambled and differ between runs.
  The array of jobs is the fix, and the reason for it is the same as in session 06.
* **`&i`, or `files[i]` plus a shared output buffer**, as the argument.
  The same mistake in another shape.
* **A `hex` buffer on the thread's stack, returned by pointer.**
  Gone when the thread returns; gcc warns.
* **Printing in the thread function.**
  Works, loses the order.
  The README asks for this as an experiment after the task is done; if it is the student's first version, ask who should print.
* **Join inside the create loop.**
  Sequential, and correct; the time gives it away.
* **A mutex around `md5_file()`**, "because threads".
  Sequential again.
  Ask what the mutex protects.
* **Concluding that processes are faster than threads** from 0.047 s against 0.20 s.
  The README's last check is there to stop this: the two programs run different MD5 code.
* **The jobs array on the stack of `main()`** is fine at 256 entries of about 48 bytes; the reference makes it `static` out of habit, not need.

## Verified reference values

| Fact | Value |
| --- | --- |
| Sequential skeleton, 16 files of 16 MiB | 0.98 s |
| One thread per file | 0.20 s |
| One file, `md5_file()` / `md5sum` | 0.061 / 0.021 s |
| Output | identical to `md5sum $(cat files.txt)`, unsorted |
| A missing file in the list | `17 files, 1 failed`, exit status 1, message from `perror()` |
| Shared-index pool, 4 / 6 / 12 workers | 0.27 / 0.24 / 0.20 s |
| Pool with the lock held across the hashing, 12 workers | 0.97 s |
| Pool without the mutex, 200 files of 1 MiB, 12 workers | a file hashed twice in 5 runs of 60; never a file skipped |
| `make test` | 16 files, including sizes 0, 1, 55, 56, 63, 64, 65 and 65,599 bytes; equal to `md5sum` |

## Practical notes

* `md5.c` is ours, written for this exercise from RFC 1321, not an imported library; it follows the repository's C style and is checked like any other file.
  Students are told not to read it; the ones who do will find that it has no global state, which is the point.
* It is slow on purpose only in the sense that it is built with `-g` and no optimization, like everything else in the session; with `-O2` it is about twice as fast and still behind the system's `md5sum`.
* `md5_file()` uses `fopen()` and `fread()`, each call on its own `FILE`, so there is no shared stream.
* The sizes in `test.sh` straddle MD5's 64-byte block and its 56-byte padding boundary; they are there to test `md5.c`, not the threads.
* `data/` and `files.txt` can be copied from `03-process-hashing`.
