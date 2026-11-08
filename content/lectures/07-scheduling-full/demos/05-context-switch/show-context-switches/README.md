# Demo: Counting Context Switches

The per-thread switch counters in `/proc`, read while a thread alternates between burning the CPU and waiting.

## Goal

See that every wait is a voluntary context switch and that a thread which never waits is still switched out, involuntarily, over and over.

## Background

The kernel counts, per thread, how many times it left the CPU, and splits the count in two: **voluntary** switches, where the thread blocked or yielded, and **involuntary** ones, where the kernel took the CPU away because the time slice ended or a higher-priority thread became ready.
The counts are in `/proc/<pid>/task/<tid>/sched`, and `getrusage()` and `/usr/bin/time -v` report the same two numbers.

This demo reuses the `change_state` program of the [change-state demo](../../04-thread-states/change-state).

## Build and run

```console
make -C ../../04-thread-states/change-state
../../04-thread-states/change-state/change_state
```

In a second terminal, at the prompt and during each burst:

```console
pid=$(pgrep -x change_state)
grep switches /proc/$pid/task/$pid/sched
```

## Results and explanations

```text
nr_switches                                  :                    1       waiting at the prompt
nr_voluntary_switches                        :                    1
nr_involuntary_switches                      :                    0

nr_switches                                  :                   99       in the CPU-intensive phase
nr_voluntary_switches                        :                    1
nr_involuntary_switches                      :                   98

nr_switches                                  :                  101       back at the prompt
nr_voluntary_switches                        :                    2
nr_involuntary_switches                      :                   99

nr_switches                                  :                  184       burning again
nr_voluntary_switches                        :                    2
nr_involuntary_switches                      :                  182
```

Each wait at the prompt adds exactly one voluntary switch: the thread called `read()`, had nothing to read, and left the CPU to go into a wait queue.
Each burst of a few seconds adds about a hundred involuntary switches: the thread never asked to leave, but the kernel took the CPU away every few tens of milliseconds, for a timer tick, for another thread that woke up, for its own slice ending, and gave it back each time.

The involuntary count is the scheduler at work on a thread that would happily run forever; the voluntary count is the thread's own behaviour.
An I/O-bound thread has a high voluntary count and a low involuntary one; a CPU-bound thread, the opposite.

## Going further

* `/usr/bin/time -v ./change_state < /dev/null` (it exits at once on end of input) and a long-running `/usr/bin/time -v yes > /dev/null` show the same two counts for a whole run.
* `perf stat -e context-switches,cpu-migrations -p <pid>` counts switches and migrations between CPUs live, if `perf` is installed.
* `vmstat 1` prints the system-wide switch rate per second in the `cs` column; compare an idle desktop with one running `make -j`.

## References

* `man 5 proc`, `/proc/[pid]/sched` (with `CONFIG_SCHED_DEBUG`), `/proc/stat` (`ctxt`)
* `man 2 getrusage`, `ru_nvcsw` and `ru_nivcsw`
* `man 8 vmstat`, `man 1 perf-stat`
