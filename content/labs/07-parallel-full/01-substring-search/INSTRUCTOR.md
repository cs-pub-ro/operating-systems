# Instructor Notes: A Parallel Substring Search

## Purpose

The two demos in one program: a partition for the work, a mutex for the result.
The lesson that is new is in the last two checks: a lock taken once per thread costs nothing, the same lock taken once per match makes twelve threads slower than four, and both programs are correct.

## Expected answers

* **TODO 1**: `static pthread_mutex_t total_lock = PTHREAD_MUTEX_INITIALIZER;`, or a plain declaration and `pthread_mutex_init()` in `main()` before the threads.
* **TODO 2**: count into a local with `count_matches()`, then lock, `total += count`, unlock.
* **TODO 3**: `chunk = size / nthreads`; region *i* starts at `i * chunk`; every region but the last is `chunk + strlen(needle) - 1` long, the last runs to the end.
* **TODO 4, 5**: the create and join loops of session 06.

A student who keeps a `count` field in the region and adds up after the joins, with no mutex, has written the better program and not done the exercise.
Say both things, and ask for the shared total.

## Things students get wrong

* **No overlap.**
  The total is short by one per cut with 2, 4 and 8 threads, because the generator plants `kernel` on those cuts.
  They did this in session 06; most remember.
* **Overlap of `strlen(needle)`**, one too many: a match that starts exactly on the cut is counted by both sides.
* **The last region extended by the overlap as well**: it reads past the end of the mapping.
  Whether that faults depends on what is mapped next, so it may well appear to work.
* **Locking around the call to `count_matches()`.**
  Correct, and exactly as fast as one thread: the threads search one at a time.
  Ask what the lock is protecting during the search; nothing shared is being written.
* **The mutex as a local variable of the thread function**, as in the first demo.
* **Printing `total` before the joins**, or joining each thread right after creating it.
  The first gives a partial total, the second a sequential program.
* **Comparing with `grep -c`**, which counts lines.
* **Timing with a cold page cache.**
  The first run after `gen_text` on a small VM can be slow while the file is read from disk; time the second.

## Verified reference values

| Fact | Value |
| --- | --- |
| `./gen_text big.txt 256` | 268,435,456 bytes |
| `grep -o kernel big.txt \| wc -l` | 2,275,966 |
| `./gen_text big.txt 64` | 67,108,864 bytes; 569,022 matches |
| 1 / 2 / 4 / 8 / 12 / 32 / 64 threads, 256 MiB | 0.511 / 0.293 / 0.140 / 0.114 / 0.085 / 0.088 / 0.086 s |
| `total++` per match, no lock, 4 threads | 2,241,436; 2,237,440; 2,241,472 |
| `total++` per match, locked, 1 / 4 / 12 threads | 0.526 / 0.234 / 0.336 s |
| `kernel schedules`, 64 MiB | 26,131 |
| `time`, whole program, 1 / 8 threads | 0.532 / 0.129 s |
| `make test` | 5 needles, 8 thread counts, all equal to `grep -o` |

## Practical notes

* `gen_text.c` is session 06's, unchanged; 256 MiB is asked for here because 64 MiB is searched too quickly to time.
  It holds the file in memory while writing it; on a small VM use 64 and expect 0.13 s with one thread.
* `count_matches()` compares at every position, with no `memchr()` to skip ahead, unlike session 06's.
  That is deliberate: it makes the search slow enough to measure.
* The mapping uses `MAP_POPULATE`, so that the page faults are taken before the clock starts and the printed time is the search alone.
* For the per-match experiment students have to make `count_matches()` touch `total`; it is fine for them to edit the provided function, and they should put it back.
