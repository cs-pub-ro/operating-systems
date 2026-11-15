# Instructor Notes: Lecture 08, Concurrency

Notes for whoever delivers this lecture.
Nothing here is addressed to students.

## Shape of the delivery

The slot is 100 minutes: 50, a 10-minute break, 50.
In practice it is 40 + 10 + 40.
Plan for 80 minutes of content and treat the rest as spare.

The lecture follows [`STORYLINE.md`](STORYLINE.md); the storyline figure is on the fourth slide, and it is worth putting it back up at the break and at the end.
Open from lecture 07's last line: the threads that share a CPU also share memory, and a switch can land between any two instructions.

The pitch's six programs are the spine, and it helps to say which part answers which: the wrong one in part 03, the fast one in the first half of part 04, the three slow ones in the second half of part 04 and in part 05.
Leave the six-sums figure reachable; you will point back at it four times.

Part 01 is the tail of lecture 07, not the head of this one.
Keep it to the one figure and the word "involuntary".

| Block | Part | Minutes | Notes |
| --- | --- | ---: | --- |
| 1 | 00. Pitch | 10 | `sum_serial`, `sum_threads` three times, then `make run`; the six-sums figure. Ask for guesses before each run. |
| 1 | 01. Reminder: leaving the CPU | 5 | The four-triggers figure; underline 3 and 4. |
| 1 | 02. Concurrency | 10 | The turns-or-at-once figure; coherence and consistency against the three wrong sums; the table of problems, one line each. |
| 1 | 03. Root causes | 15 | `objdump` of `sum += i`; the lost-update figure, drawn or walked; `count` and `count_one_insn`, each with and without `taskset -c 0`. |
| -- | *break* | 10 | |
| 2 | 04. Partitioning and synchronization | 17 | `sum_partition.c` on screen; the list demo crashing, then with the mutex; the three tools as a table; `map_unmap` threads against processes. |
| 2 | 05. Problems with synchronization | 18 | The chain figure; the pitch's three slow sums again; `granularity`; `deadlock` with `ps`; `toctou`. |
| 2 | 06. Conclusion | 5 | Leave the takeaway slide up during questions. |

## Which demos to run live

Everything runs in under two seconds except `sum_spinlock` (about four seconds on a many-core desktop, less on a laptop) and `deadlock`, which runs until you stop it.
Have a second terminal ready for `ps` during the deadlock.
Numbers in the slides come from a 12-core, 24-CPU desktop; on the lecture machine they will differ, and that is fine as long as you say so.
On a machine with fewer than eight cores the contention numbers are smaller and the wrong sums are less wrong; the order of the six programs does not change.

* **`00-pitch/sum`**: `./sum_serial`, then `./sum_threads` three times, and let the room read the three wrong numbers.
  Ask "which of the next four will be right, and which will be fastest?" before `make run`.
  Do not explain `sum_partition` yet; say that one of the six is both right and fast, and that the lecture is about why it is the only one.
* **`03-root-causes/one-core-many-cores`**: four runs, in this order: `./count`, `taskset -c 0 ./count`, `taskset -c 0 ./count_one_insn`, `./count_one_insn`.
  The second is cause A alone, the fourth is cause B alone; say so each time.
  `./count_locked_insn` is the closing run, and the bridge to "atomic".
  Read the involuntary switch count on the `taskset` run: a hundred switches, tens of millions lost.
* **`04-partitioning-synchronization/list`**: `./thread-list-app` two or three times, for the segmentation fault; open `list.c` at `list_add_item()` and count the four pointer writes; then `./thread-list-app-mutex`.
* **`04-partitioning-synchronization/kernel-contention`**: `./map_unmap threads 1`, `./map_unmap threads 8`, `./map_unmap processes 8`.
  Ask where the shared data is before saying it; nobody finds it in the source, which is the point.
* **`05-synchronization-problems/granularity`**: `./granularity-coarse` then `./granularity-fine`; `\time -v` on the second for the system time and the switches, if there is time.
* **`05-synchronization-problems/deadlock`**: `./deadlock`, wait, ask what the program is doing; `ps -L -o pid,tid,state,pcpu,comm -p $(pidof deadlock)` in the second terminal; `Ctrl+C`; `./ordered`.
  The `gdb` session is in the demo README; run it only if the room asks how one finds out who holds what.
* **`05-synchronization-problems/toctou`**: show `buy_one()` first and ask whether it is correct, since every access is locked; then run `./toctou` a few times, then `./check-and-act`.

## What students get wrong

* **"Concurrency and parallelism are the same thing."**
  Run `taskset -c 0 ./count` and ask what is running in parallel.
  Nothing is, and updates are lost.
* **"`sum += i` is one instruction, so it is safe."**
  Two errors in one sentence.
  It is three instructions without optimisation; and when it is one, `count_one_insn` shows it is safe on one core and not on two.
* **"A race needs several cores."**
  Cause A is the cure: a hundred involuntary switches on one core lose 56 million additions.
* **"More threads means faster."**
  The pitch is the cure: `sum_threads` is three times slower than `sum_serial`, and the three synchronized versions are far worse.
  Say "cache line" once, and leave false sharing to the demo's *Going further*.
* **"A lock protects code."**
  It protects data.
  The same lock has to be taken everywhere that data is touched; a lock around one function and not around another function that touches the same list protects nothing.
* **"If every access is locked, the program is correct."**
  `toctou` is the cure, and the most valuable five minutes of the second half.
  Students who have just learned to lock will defend `buy_one()`; let them.
* **"A deadlock is a crash" / "a deadlock uses 100% CPU".**
  `ps` shows `S` and 0.0.
  With spinlocks it would be 100%, and that is worth one sentence.
* **"A spinlock is the fast lock."**
  In the pitch it is the slowest, by a factor of three over the mutex, because eight threads spin on eight cores for a lock that is always taken.
  It is fast when the critical section is short *and* uncontended.
* **"Atomic means thread-safe."**
  An atomic operation makes one operation indivisible.
  Two atomic operations in a row are a TOCTOU race waiting to happen.
* **"Coarse locks are bad" / "fine locks are bad".**
  The granularity demo makes fine look bad; say explicitly that it is rigged, because the threads have nothing to do outside the lock.

## Things that go wrong in the room

* `sum_threads` occasionally prints a number close to a multiple of one thread's share, and on a slow or loaded machine it can even be right once.
  Run it three times; that is why the instructions say so.
* `taskset -c 0 ./count` loses a different share every run: usually around 14%, sometimes twice that, and about once in a dozen runs nothing at all.
  If it prints 0, say that the bug is still there and run it again; it is the best illustration of "passes the test, fails in production" the lecture has.
* On a machine with few cores, or in a VM with one virtual CPU, `./count` and `taskset -c 0 ./count` look the same.
  Check `nproc` before the lecture; with one CPU, cause B cannot be shown at all.
* `count_one_insn` and `count_locked_insn` exist only on x86_64; the `Makefile` skips them elsewhere.
  On an ARM laptop, show the table from the slides and disassemble `count` and `sum_atomic` instead: the three steps, and the load-linked/store-conditional loop or the `ldadd` instruction that replaces them.
* `taskset -c 0 ./thread-list-app` usually survives: on one core the unlocked list is rarely caught mid-change.
  This is a feature for the "race needs cores" discussion, and a trap if you meant to show a crash.
* The unlocked list can loop instead of crashing, if a broken pointer closes a cycle; `Ctrl+C` and run it again.
  Core dumps make the crash take a second; `ulimit -c 0` beforehand avoids that.
* `./deadlock` almost always deadlocks at once on several cores, and usually does *not* under `taskset -c 0`.
  If it finishes, run it again.
* `pidof deadlock` returns nothing if the binary was started under another name; `pgrep -x deadlock` is safer.
  Attaching `gdb -p` needs `ptrace_scope` set to 0 or `sudo`; starting the program under `gdb` and pressing `Ctrl+C` needs neither.
* `toctou` is occasionally exact, with 0 left; run it again.
  The overshoot is never more than seven, one less than the number of buyers.
* `map_unmap threads 8` depends on the kernel version: the numbers in the slides are from Linux 6.14, and kernel developers keep making the address-space lock finer.
  Measure on the lecture machine beforehand, and raise `NUM_ROUNDS` if the gap to processes is too small to see.
* `\time -v` needs the backslash, or the full path `/usr/bin/time`; the shell's `time` has no `-v`.

## Cuts, if you are behind

In order, the first things to drop:

1. The table of six concurrency problems in part 02; name race conditions and deadlocks, and leave the rest to the README.
1. `count_locked_insn`, and the timing comparison between one core and many.
1. `kernel-contention`; say in one sentence that the kernel has shared data and locks too, and show the table.
1. `granularity`; the pitch's three slow sums already carry "locks cost".
1. The `gdb` session of the deadlock; `ps` is enough.

Do not cut the three runs of `sum_threads`, `taskset -c 0 ./count`, the partitioned sum, the list crashing, or `toctou`; those are the lecture's five load-bearing demonstrations.

## Links to the rest of the course

Say these explicitly.

* Lecture 07's involuntary context switch is cause A; the figure of part 01 is that lecture's figure with the triggers numbered.
* Lecture 07's blocked state and wait queue are where a thread waiting for a mutex is; the voluntary switch counts of `sum_mutex` and `granularity-fine` are that lecture's counters.
* Lecture 06's "threads share the address space" is where the shared data comes from, and why `map_unmap` contends as threads and not as processes.
* Lecture 03's stack and lecture 06's per-thread stack are why `mine` in `sum_partition` is private.
* Lab 07 split work across threads and measured speed-up; `sum_partition` is that method, and the pitch shows what happens without it.
* Lab 08 is the practical side of this lecture.
* Lecture 09 is I/O: threads that block for most of their lives, and kernel objects, files and their offsets, shared between threads.

## Further demos worth writing

The previous version of this lecture, on synchronization rather than concurrency, had demos that were not carried over; they are in the repository's history, under `content/lectures/08-concurrency-full/old-session-synchronization/demos/`, and are worth harvesting.

* **Spinlock against mutex, on its own**: the old `spinlock-mutex` demo; the pitch now covers it, and a version with a critical section that sleeps would show the other side.
* **Reentrancy and thread safety**: the old `reentrant` demo, `strtok()` against `strtok_r()`; per-call state as partitioning.
* **Thread-local storage**: the old `tls` demo; `__thread` variables and `errno` as partitioning done by the compiler.
* **Threads against processes**: the old `shared-data` demo; a variable changed by a thread and by a forked child, with copy-on-write keeping the child's change private.
* **Compare-and-swap**: the old 32-bit `sum-threads` builds, where a 64-bit atomic addition becomes a `lock cmpxchg8b` loop; the same on ARM with load-linked and store-conditional.
* **False sharing**: eight per-thread counters in one array, with and without padding to a cache line; it is in the pitch demo's *Going further* and deserves its own directory.
* **Starvation**: a reader-writer lock under a steady stream of readers, with a writer that never gets in.
* **A condition variable**: a bounded queue with a producer and a consumer; waiting for a condition rather than for a lock.
