# Demos

The programs and commands run during the lecture, one directory per part.
Each holds the sources, the commands to run, and the question to ask about the result.

| Demo | Shows |
| --- | --- |
| [`00-pitch/`](00-pitch) | Thousands of threads on two dozen CPUs, a process alive but not running, billions of switches. |
| [`01-process-ops/`](01-process-ops) | Creating, waiting for and ending a process; zombies and orphans. |
| [`02-copy-on-write/`](02-copy-on-write) | What a `fork()` costs, counted in page faults. |
| [`04-thread-states/`](04-thread-states) | The state of every thread, and one thread flipping between `R` and `S`. |
| [`05-context-switch/`](05-context-switch) | Voluntary and involuntary switches, counted; 26,865 against 1. |
| [`06-state-transitions/`](06-state-transitions) | Time in the ready queue, and the load average. |
| [`07-scheduling-nuts-and-bolts/`](07-scheduling-nuts-and-bolts) | Three groups of CPU hogs at nice -20, 0 and +19. |

Every demo with a `Makefile` builds with `make`.
`utils/utils.h` holds the shared `DIE()` macro.
