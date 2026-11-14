# Instructor Notes: How Much Faster Do More Threads Make It?

## Purpose

The measuring half of the session.
The code is session 06's partition and takes a few minutes; the time goes into running it and reading the numbers.
Students should leave able to give three separate reasons why a speed-up stops: the cores ran out, part of the program stayed sequential, and threads themselves cost.

## Sequencing

1. **`nproc`, and write the number on the board.**
   Everything is read against it.
1. **Run the sequential program under `time`.**
   Point at the two lines it prints: filling and counting.
   Ask which of them threads could help with.
1. **The four TODOs**, quickly: thread function, regions, create, join and add.
   Ask why no mutex is needed, coming straight from the first demo: nothing is written by two threads.
   Check the total against the sequential run.
1. **Run with 1, 2, 4, 8, 32 and `nproc` threads**, and have the room build the table: counting time, speed-up of the counting, `real` time, speed-up of the whole.
   `make bench` in the full directory prints the same table, and is the fallback if typing is slow.
1. **Three questions, in this order.**
   Why does the counting stop improving near `nproc`?
   Why does the whole program improve so much less than the counting?
   What would 1000 threads do?
   Run the last one.
1. **Amdahl's law**, as arithmetic on the room's own numbers: the sequential fraction, and one over it as the ceiling.
   The formula can wait for the lecture; the ceiling cannot.

## Points to hammer

* **Speed-up is time with one thread over time with *n*.**
  Always against the sequential run, never against the previous row.
* **The correct answer first.**
  A faster program that counts differently is not a faster program.
* **Cores are the first limit, and `nproc` counts hardware threads, not cores.**
  On a 6-core, 12-thread processor the counting peaks around 6.5, not 12.
* **The sequential part is the second limit**, and the one no hardware removes.
* **Threads cost**: creation, stack, scheduling.
  A thousand threads are slower than twelve.
* **`user` time staying constant** while `real` drops is what parallelism looks like in `time`.

## Things that go wrong in the room

* **A VM with one or two cores.**
  The table is flat and the demo fails to make its first point.
  Check before the session; if it cannot be fixed, run on the instructor's machine and project it.
* **Noisy timings.**
  Laptops on battery, browsers running, and frequency scaling give 20% run-to-run noise.
  Take the best of three, as `bench.sh` does, and do not read meaning into small differences.
* **Counting into `r->count` inside the loop** instead of a local.
  Correct, and slower with two threads than with one, through false sharing.
  If it happens, it is a gift; `FURTHER.md` has the numbers.
  Do not go looking for it.
* **Forgetting the remainder** in the last region.
  256 MiB divides evenly by 1, 2, 4, 8 and 32, so it can show only with a count such as 3 or 12, as a total that is a few short.
  `nproc` on a 12-thread machine does catch it.
* **Timing only the count line and announcing a speed-up of 6.**
  That is the point of the two columns.

## Verified reference values

Intel Core i5-12400, 6 cores, 12 hardware threads; best of three.

| Threads | Counting | Speed-up | Whole program | Speed-up |
| --- | --- | --- | --- | --- |
| 1 | 0.262 s | 1.00 | 0.358 s | 1.00 |
| 2 | 0.137 s | 1.91 | 0.230 s | 1.56 |
| 4 | 0.071 s | 3.69 | 0.164 s | 2.18 |
| 8 | 0.057 s | 4.60 | 0.153 s | 2.34 |
| 16 | 0.044 s | 5.95 | 0.139 s | 2.59 |
| 32 | 0.041 s | 6.39 | 0.136 s | 2.64 |
| 64 | 0.040 s | 6.55 | 0.135 s | 2.65 |
| 256 | 0.041 s | 6.39 | 0.137 s | 2.61 |
| 1024 | 0.052 s | 5.04 | 0.149 s | 2.40 |

| Fact | Value |
| --- | --- |
| Occurrences of `e` in 256 MiB | 10,457,088, for every thread count |
| Filling | 0.08 s, always |
| Sequential fraction with one thread | 27%; Amdahl ceiling 3.7 |
| Counting into `r->count`, 1 / 2 / 4 / 12 threads | 0.29 / 0.49 / 0.28 / 0.16 s |
| `-O2`, counting, 1 / 12 threads | 0.065 / 0.012 s |
| `taskset -c 0`, 8 threads | 0.27 s |

## Practical notes

* The program takes up to 1024 threads so that the slow-down can be shown; the exercises stop at 64.
* A second argument sets the buffer size in MiB, for small VMs: `./count_chars 4 64`.
  The times scale with it and the shape does not change.
* The buffer is filled by repeating one 64 KiB block of pseudo-random letters, so that the filling is short next to the counting but not negligible; the 27% is a choice, and makes the two speed-up columns clearly different.
* `bench.sh` needs only `bash`, `awk` and `date`.
