# Instructor Notes: Lecture 07, Scheduling

Notes for whoever delivers this lecture.
Nothing here is addressed to students.

## Shape of the delivery

The slot is 100 minutes: 50, a 10-minute break, 50.
In practice it is 40 + 10 + 40.
Plan for 80 minutes of content and treat the rest as spare.

The lecture follows [`STORYLINE.md`](STORYLINE.md); the storyline figure is on the fourth slide, and it is worth putting it back up at the break and at the end.
Open from lecture 06's last line: thousands of threads, a couple of dozen cores, so most threads are waiting, and somebody decides which run.
The three pitch numbers are the lecture's three threads, and it helps to say which part answers which: the thread count against the CPU count in parts 03 and 04, the browser's missing 97% in parts 04 and 06, the billions of switches in parts 05 and 06.

Parts 01 and 02 are the tail of lecture 06, not the head of this one.
Keep them short and say so; the hook should already be on the board when you tell them.

| Block | Part | Minutes | Notes |
| --- | --- | ---: | --- |
| 1 | 00. Pitch | 7 | `nproc`, the thread count, the state histogram; `get_times_for_pid.sh` on a browser; `grep ctxt /proc/stat`. |
| 1 | 01. Processes, recapped | 7 | `fork_exec`, then `zombie` with `ps`; mention `orphan`, run it only if asked. |
| 1 | 02. Copy-on-write | 9 | The copy-on-write figure; `fork_faults` with `ps` at every prompt. |
| 1 | 03. Scheduling, an overview | 7 | The scheduler-is-a-function figure; write "input, output, trigger" on the board. |
| 1 | 04. Thread states | 10 | The three-states figure; `show-states`; `change_state` with `ps` in a second terminal. |
| -- | *break* | 10 | |
| 2 | 05. The context switch | 13 | The context-switch figure, the four causes as a table; `show-context-switches`; `buffer-cache` cold and warm. |
| 2 | 06. Queues, waiting and load | 12 | The queues figure; `waiting_time 8` then `512`; `load_average` started before the figure so that the load has climbed by the end. |
| 2 | 07. Nuts and bolts | 12 | The tunables figure; `nice`'s three groups; the interactivity/throughput trade-off on the board. |
| 2 | 08. Conclusion | 3 | Leave the takeaway slide up during questions. |

## Which demos to run live

Everything runs in seconds except `load_average` (about half a minute) and the cold `find` (a few seconds, and only cold once).
Have a second terminal ready for the demos that wait at prompts, `sudo` working for the nice demo and for dropping the page cache, and `htop` installed.
Numbers in the slides come from a 24-CPU desktop; on the lecture machine they will differ, and that is fine as long as you say so.

* **`00-pitch/threads-vs-cpus`**: `nproc`, the thread count, then the state histogram.
  Sit on the `R` line for a second: that is the lecture.
* **`00-pitch/process-times`**: pick a browser or editor that has been open for days; the ratio is the point, not the numbers.
  `ps -o etime,cputime,%cpu` on the same PID is the one-line version.
* **`00-pitch/start-process-times`**: drop the cache first (`sudo sh -c 'echo 3 > /proc/sys/vm/drop_caches'`), run the cold `find`, then the warm one.
  Read only the CPU percentage and the two switch counts; the rest of the `time -v` output is noise here, and the switch counts come back in part 05.
* **`01-process-ops/fork-exec`**: one run; "posix_spawn by hand", nothing more.
* **`01-process-ops/zombie`**: run it, do not press `ENTER`, show the `Z` in the second terminal, press `ENTER`, show it gone.
  Say "a thread that will never be scheduled again" to tie it to this lecture.
* **`02-copy-on-write/fork-faults`**: `ps -o pid,ppid,comm,min_flt,maj_flt,rss` in the second terminal at every prompt.
  The two moments are the child's 22 faults after the fork and its 512 after writing; the parent's 1,025 at the end is the question for the room.
* **`04-thread-states/show-states`**: the histogram again, then `head` of the full listing; map the letters to the three states aloud.
* **`04-thread-states/change-state`**: `ps -o pid,comm,state,etime,cputime` in the second terminal, once at the prompt and once during the burn.
  Point at which of the two times moves.
* **`05-context-switch/show-context-switches`**: same program, `grep switches /proc/<pid>/task/<pid>/sched` in the second terminal.
  One voluntary per `ENTER`, a hundred involuntary per burn.
* **`05-context-switch/buffer-cache`**: reuse the two `find` runs from the pitch if they are still on screen; otherwise run them again.
  26,865 against 1 is the slide.
* **`06-state-transitions/waiting-time`**: `./waiting_time 8` and `./waiting_time 512`; scroll to the end of the second and read a few of the big numbers.
  Pipe through `sort -k5 -n | tail` if the room wants the maximum.
* **`06-state-transitions/load-average`**: start `./load_average $(( 2 * $(nproc) ))` *before* the queues figure, with `uptime` or `htop` in the second terminal, and come back to it after the figure.
  Twice the core count makes the one-minute average climb visibly past the number of CPUs.
* **`07-scheduling-nuts-and-bolts/nice`**: `./start-all.sh` needs `sudo` for the -20 group; have the password typed before the slide.
  `htop` while it runs, then `grep Elapsed pri*.txt | sort -t: -k3` for the three groups.

## What students get wrong

* **"The scheduler is a process that runs in the background."**
  It is a function, called in the context of whatever thread triggered it, on the CPU that is being handed over.
  Part 03's "input, output, trigger" framing is the cure; repeat "the kernel calls `schedule()`" rather than "the scheduler runs".
* **"A blocked thread will run when its event happens."**
  It becomes *ready*; it runs when the scheduler picks it.
  The queues figure has no arrow from blocked to running, and it is worth pointing at the gap.
* **"`S` in `ps` means the process is slow or stuck."**
  It means the thread is waiting for something, which is the normal state of nearly every thread.
  The pitch's histogram is the cure: 4,349 of 4,614.
* **"A context switch is a system call" / "a system call is a context switch".**
  A system call is a domain switch of the *same* thread.
  Part 05 says a context switch begins with a domain switch; make sure the "begins with" lands, or the two will be merged.
* **"Involuntary means the thread did something wrong."**
  It means the kernel took the CPU away: the slice ended, or a higher-priority thread woke up.
  `change_state`'s hundred involuntary switches during a plain loop are the evidence.
* **"Nice +19 stops the process."**
  It shifts the share.
  The +19 group in the nice demo finishes in 9 seconds, not never; say "nothing was starved" explicitly.
* **"Load average is CPU percentage."**
  It is a count of threads running or ready, which can exceed the number of CPUs; 48 on 24 is the demo.
  Linux's inclusion of `D` threads is worth one sentence, not more.
* **"Copy-on-write means `fork()` is free."**
  It is cheap, not free: a page table copied, and a fault per page written afterwards.
  The parent's 1,025 faults at the end of `fork_faults` surprise everyone, and the explanation (entries still read-only, frame no longer shared, so a fault without a copy) is a good two minutes.

## Things that go wrong in the room

* `pidof change_state` returns nothing if the binary was started under another name or via a symlink; `pgrep -x change_state` is safer.
* `fork_faults`: `ps` with two PIDs needs `-p 1,2` or two arguments; `ps -p "$(pgrep -d, -x fork_faults)"` does it in one go.
  The child's row appears only between "child begin" and "child after write".
* The cold `find` is cold only once; drop the page cache again (`echo 3 > /proc/sys/vm/drop_caches` as root) to repeat it, and expect it to take a few seconds on a laptop disk.
* `waiting_time` prints a line per yield; with 512 threads that is 2,560 lines, so redirect to a file and `tail` it rather than let it scroll.
  The small counts (8, 24) show nothing on a big machine; go to at least twice the core count.
* `load_average` takes about half a minute to run and the one-minute average lags, so start it early; if the previous demo (the nice groups) ran just before, the load is already high and the climb is invisible.
  Run the nice demo *after* load average, as the order of the parts already does.
* The nice demo needs `sudo` for the -20 group; without it, drop that group and the demo still shows 0 against +19.
  All three groups start from the same shell, so they share one autogroup; if `sched_autogroup_enabled` is 1 and the groups are started from different terminals, the nice values stop mattering between them.
* `ps -o state` and `top` disagree on letters for stopped and idle threads across versions; the `PROCESS STATE CODES` section of `man ps` on the lecture machine is the reference.
* `/proc/<pid>/sched` is only there if the kernel has `CONFIG_SCHED_DEBUG`, which every distribution kernel does; `getrusage()` (`ru_nvcsw`, `ru_nivcsw`) is the fallback, and `/usr/bin/time -v` prints the same two counts.

## Cuts, if you are behind

In order, the first things to drop:

1. `01-process-ops/orphan` and `posix_spawn` live; the zombie alone carries the recap.
1. `06-state-transitions/load-average`; quote the climb from the slide and keep `uptime` on the lecture machine as the one-liner.
1. `00-pitch/start-process-times`; the same two runs appear in part 05 as `buffer-cache`, and once is enough.
1. The parent's 1,025 faults in `fork_faults`; stop at the child's 512.

Do not cut the pitch's state histogram, `change_state` with `ps`, the 26,865-against-1 comparison, or the nice groups; those are the lecture's four load-bearing demonstrations.

## Links to the rest of the course

Say these explicitly.

* Lecture 06's thread, an IP and an SP, is exactly what the context switch saves and loads; say it at the context-switch figure.
* Lecture 05's copy-on-write is part 02 from the other side; the figure is the same one.
* Lecture 02's domain switch is what part 05 contrasts the context switch with.
* Lab 07 splits a job across processes and threads and measures it; the waiting-time table is the reason more threads than cores stops helping.
* Lecture 08 is concurrency: a context switch can happen between any two instructions, which is where races come from, and a thread blocked on a lock is in a wait queue.

## Further demos worth writing

* **`sched_setaffinity()` / `taskset`**: pin two CPU-bound threads to one core and watch them share it, then unpin; the same code, half the throughput.
* **A real-time policy**: `chrt -f 50` on a CPU hog, and what it does to the shell; a warning, not a recipe.
* **Priority boost after I/O**: a thread that sleeps 1 ms and runs 1 ms against a pure hog, with `perf sched latency` to show who waits.
* **Per-CPU run queues**: `cat /proc/schedstat` or `perf sched map` while `load_average` runs, to show the threads spread across cores and migrated.
* **The cost of a switch, measured**: two threads ping-ponging on a pipe, switches per second against bytes per second, as a number for part 06.
