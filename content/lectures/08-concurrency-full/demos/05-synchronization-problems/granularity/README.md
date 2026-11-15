# Demo: Granularity of a Critical Section

A hundred threads each add 1 to a shared counter 100,000 times, under one mutex taken either around each addition or around the whole loop.

## Goal

See what a lock costs when it is taken often, and that how much one critical section covers is a choice with a price on both sides.

## Background

`granularity.c` builds twice.

| Program | One lock/unlock pair covers | Pairs in total |
| --- | --- | ---: |
| `granularity-fine` | one addition | 10,000,000 |
| `granularity-coarse` | a thread's whole loop of 100,000 additions | 100 |

Both are correct: every write to the counter is inside a critical section.

Granularity is the size of what a lock protects.
A fine-grained lock is held briefly and taken often; a coarse-grained lock is held long and taken rarely.

## Build and run

```console
make
./granularity-coarse
./granularity-fine
```

## Results and explanations

```text
$ ./granularity-coarse
value: 10000000  expected: 10000000  time: 3 ms
$ ./granularity-fine
value: 10000000  expected: 10000000  time: 308 ms
```

The same answer, a hundred times apart.

| | `granularity-coarse` | `granularity-fine` |
| --- | ---: | ---: |
| Elapsed | 3 ms | 308 ms |
| User time | 0.00 s | 0.47 s |
| System time | 0.00 s | 6.34 s |
| Voluntary context switches | 122 | 64,016 |
| Involuntary context switches | 0 | 8,941 |

An uncontended `pthread_mutex_lock()` is a few instructions in user space.
A contended one is a system call that puts the thread to sleep, and an unlock that has to wake a sleeper is another.
With a hundred threads after one lock ten million times, most acquisitions are contended: 6.34 seconds in the kernel, 64,016 threads put to sleep and woken up.

The coarse version takes the lock a hundred times, and a thread that has it does all its work before letting go.
The work is serialized either way, since only one thread can add at a time; the coarse version simply stops paying for the turn-taking.

This does not mean coarse is better.
In the coarse version the other 99 threads do nothing at all while one holds the lock; here they had nothing else to do, so it did not matter.
If each thread also had work that does not touch the counter, a coarse lock held across that work would stop the threads from doing it in parallel.
The rule that survives is: hold a lock for as little as possible, and take it as rarely as possible, and when the two disagree, measure.

## Going further

* Change `NUM_THREADS` to 2, then to the number of cores, and compare the two programs again.
  Where does the fine-grained version stop being slow?
* Replace the mutex with a `pthread_spinlock_t`.
  Which of the two programs changes, and in which direction?
* Take the lock once every 1,000 additions.
  Where does that land between 3 ms and 308 ms?
* Remove the counter from the picture: let each thread count locally and add its total under the lock once.
  That is partitioning, and it is the coarse version with the lock held for one addition instead of 100,000.

## References

* `man 3 pthread_mutex_lock`
* `man 7 futex`, the system call a contended mutex ends up in
* Remzi and Andrea Arpaci-Dusseau, *Operating Systems: Three Easy Pieces*, chapter 28, [Locks](https://pages.cs.wisc.edu/~remzi/OSTEP/threads-locks.pdf)
