# Demos

The programs and commands run during the lecture, one directory per part.
Each holds the sources, the commands to run, and the question to ask about the result.

| Demo | Shows |
| --- | --- |
| [`00-pitch/`](00-pitch) | One sum, six programs: one wrong, one fast, three right and slow. |
| [`03-root-causes/`](03-root-causes) | A shared counter on every core and on one core, in three, one and one locked instruction. |
| [`04-partitioning-synchronization/`](04-partitioning-synchronization) | A shared list without and with a lock; threads that wait for each other inside the kernel. |
| [`05-synchronization-problems/`](05-synchronization-problems) | What a lock costs, a deadlock, and a race the locks did not prevent. |

Every demo builds with `make`.
`utils/utils.h` holds the shared `DIE()` macro.
