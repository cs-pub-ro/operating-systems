# Instructor Notes: Searching a File With Several Threads

## Purpose

The second half of the session's material: a thread is started with a function and an argument, hands back a result, and is waited for.
The thing to establish here, because every exercise after it depends on it, is **the partition**: every thread gets its own struct and its own region, built before the threads start, and nothing is shared for writing.
That is why no mutex appears in this session, and students should hear that it is a design choice, not an omission.

## Sequencing

1. **Build, generate the file, and read `search_region()` and `struct region` together.**
   One struct per thread, the thread reads it and reports.
   Do not dwell on `map_file()` or `count_matches()`; they are provided, and I/O is not this session's topic.
1. **TODO 1: the regions.**
   Have the room say the formula for `start` and `len` before anyone types it, and ask what happens to the last few bytes when `size / nthreads` does not divide evenly.
1. **TODO 2: `pthread_create()`.**
   The argument is `&regions[i]`.
   Ask what `&i` would do; if time allows, try it and let the counts come out wrong.
   Mention that the return value is an error number, not `-1` and `errno`.
1. **TODO 3: `pthread_join()`.**
   Run once without it, if the file is big enough to show missing output; then with it.
1. **Run with 1, 2, 4, 8 threads.**
   Two things to notice: the output order is not thread order, and the counts add up to one less than `grep -o` per boundary.
   Do not fix the second one here; it is `02-aggregate-matches`.
1. **`strace -f -e trace=clone3,mmap`**, thirty seconds: the same system call as `fork()`, with `CLONE_VM | CLONE_THREAD`, and one 8 MiB stack per thread.

## Points to hammer

* **One struct per thread, filled in before the thread starts.**
  This is the pattern the whole session uses, and the alternative, `&i`, is the bug everyone writes once.
* **Threads share memory; a pointer passed to a thread is the memory, not a copy.**
  That is the difference from `fork()`, and the reason the file is mapped once.
* **No races because nothing is written by two threads.**
  Each `count` is a stack local; the mapping is read-only.
  Say that session 08 is where sharing for writing starts.
* **Join, or the process ends with the threads inside it.**
* **The output order is not the start order**, and anything that needs order has to be collected, which is what the next exercise does.

## Things that go wrong in the room

* **`&i` as the argument.**
  See above.
* **Forgetting `-pthread`.**
  The Makefile has it; a student compiling by hand gets an undefined reference to `pthread_create` on older toolchains, and on glibc 2.34 and later it links anyway, which confuses the explanation.
  Say that the flag is the right thing regardless.
* **`regions[i].len = chunk` for every region**, losing the remainder.
  Invisible on a 64 MiB file and 4 threads, visible with 7.
* **Declaring the regions array inside the loop**, or as a single struct reused for every thread.
  Each thread then reads a struct that has been overwritten, or that no longer exists.
  The array in `main()` outlives the threads because `main()` joins them before returning.
* **`gen_text` is 64 MiB of `malloc()`** and writes 64 MiB to disk; on a VM with little memory or a slow disk use 16.

## Verified reference values

| Fact | Value |
| --- | --- |
| `./gen_text big.txt 64` | 67,108,864 bytes, 0.1 s |
| `grep -o kernel big.txt \| wc -l` | 569,022 |
| 1 thread | 569,022 |
| 2 threads | 284,924 + 284,097 = 569,021 (one boundary) |
| 4 threads | 142,195 + 142,728 + 142,232 + 141,864 = 569,019 (three boundaries) |
| 8 threads | 569,015 (seven boundaries) |
| Single-threaded search time | about 30 ms for 64 MiB; too fast for timing to teach anything |
| `strace -f -e trace=clone3` | one `clone3()` per thread, `CLONE_VM\|CLONE_FS\|CLONE_FILES\|CLONE_SIGHAND\|CLONE_THREAD`, `stack_size=0x7fff80` |

The generator plants `kernel` across the 2-, 4- and 8-way boundaries on purpose, so the missing matches are reproducible: one per boundary for those thread counts.
Other thread counts lose a match only when one happens to fall on a boundary.

## Practical notes

* `big.txt` is git-ignored and regenerated identically by `gen_text` on every machine (its random sequence is its own, not `rand()`).
* The search is memory-bound and finishes in tens of milliseconds; do not promise a speed-up from threads here.
  Session 07 measures that properly.
* The two demos together should take at most half the session; this one is the shorter if the shell demo ran long.
