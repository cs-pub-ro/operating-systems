# Demo: Time in the Ready Queue

N threads that each do some work, yield the CPU, and time how long it takes to get it back.

## Goal

Measure the time a ready thread spends waiting for a CPU, and see it grow with the number of threads that want one.

## Background

`sched_yield()` moves the calling thread from running to ready and calls the scheduler; the thread goes to the back of the ready queue and runs again when the scheduler picks it.
The time between the call and the return is time spent ready: not blocked on anything, just waiting for a CPU.
`waiting_time.c` starts N threads; each does a few rounds of a CPU loop followed by a timed `sched_yield()`, and prints the wait in microseconds.

## Build and run

```console
make
./waiting_time 8
./waiting_time 64
./waiting_time 512 > waits.txt
```

With many threads the output is long; redirect it and summarise.

## Results and explanations

On a 24-CPU machine, summarised:

| Threads | Average wait | Longest wait | Waits over 100 µs |
| ---: | ---: | ---: | ---: |
| 1 | 1 µs | 2 µs | 0 of 5 |
| 8 | 0 µs | 1 µs | 0 of 40 |
| 24 | 32 µs | 2.1 ms | 4 of 120 |
| 64 | 2.6 ms | 21 ms | 135 of 320 |
| 128 | 11 ms | 40 ms | 510 of 640 |
| 256 | 24 ms | 92 ms | 1,045 of 1,280 |
| 512 | 52 ms | 175 ms | 2,256 of 2,560 |

With no more threads than CPUs, a yield costs a microsecond: there is a free CPU, so the thread is picked again at once, usually by the same CPU.
From 24 up, every yield is a real wait, because the CPUs are all taken, and the wait grows roughly with the number of threads competing: 512 threads on 24 CPUs is twenty-one threads per CPU, and a thread that yields waits for most of them to take a turn.

A typical line from the 512-thread run:

```text
run 1, time passed 40043 microseconds
```

Forty milliseconds is a wait a user notices in an interactive program; keeping it small for the threads that matter is what the scheduler's priorities are for.

## Going further

* Run with `nproc` threads and `nproc + 1` and see the waits appear with the one extra thread.
* Replace `sched_yield()` with `usleep(1)` and the measured time becomes mostly the timer, not the queue; the two kinds of waiting are different.
* `perf sched latency` (as root) measures the same thing for every thread on the system without instrumenting them.

## References

* `man 2 sched_yield`
* `man 7 sched`, section on `SCHED_OTHER`
* `man 1 perf-sched`
