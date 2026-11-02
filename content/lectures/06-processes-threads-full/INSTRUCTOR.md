# Instructor Notes: Lecture 06, Processes and Threads

Notes for whoever delivers this lecture.
Nothing here is addressed to students.

## Shape of the delivery

The slot is 100 minutes: 50, a 10-minute break, 50.
In practice it is 40 + 10 + 40.
Plan for 80 minutes of content and treat the rest as spare.

The lecture follows [`STORYLINE.md`](STORYLINE.md); the storyline figure is on the fourth slide, and it is worth putting it back up at the break and at the end.
Open from lecture 05's last line: the address space belongs to a process, and this lecture is the process itself.
The three pitch numbers are the lecture's three threads, and it helps to say which part answers which: the process count in part 01, the 641% in parts 03 and 05, the shared address space in part 03.

| Block | Part | Minutes | Notes |
| --- | --- | ---: | --- |
| 1 | 00. Pitch | 8 | `ps` counts, `ffmpeg` at 641%, a 56-thread process with identical `maps`. |
| 1 | 01. Running an application | 10 | The two-halves figure; `ps -L`, `/proc/<pid>/task/`. |
| 1 | 02. The process address space | 6 | One screen: `pmap $$`, the roles-and-origin figure. It is recap. |
| 1 | 03. Threads | 16 | IP and SP; the shared-space figure; `ip_sp`; `new-stack-area` with `pmap`. |
| -- | *break* | 10 | |
| 2 | 04. Process operations | 16 | The lifecycle figure; `posix_spawn`; the tree; `zombie` and `orphan`. |
| 2 | 05. Thread operations | 10 | The thread-ops figure; `create_join`; why no lock. |
| 2 | 06. fork() and exec() | 12 | The fork/exec figure; multi-processing vs multi-threading; `strace`. |
| 2 | 07. Conclusion | 2 | Leave the takeaway slide up during questions. |

## Which demos to run live

Everything runs in seconds.
Have `ffmpeg` (with `libx264`) and `htop` installed for the pitch, and a second terminal ready for the demos that wait at prompts.

* **`00-pitch/processes-and-threads`**: the three `ps` counts; say the thread count is larger than the process count and sit on it for a second.
* **`00-pitch/libx264`**: start the encode, `htop` to show the cores, `ps -o %cpu -C ffmpeg` for the 641%.
  If `ffmpeg` is awkward to set up, any multi-threaded program works; `stress -c 8` or a browser will do.
* **`01-run-apps/threads-in-address-space`**: pick a real multi-threaded process (`ps --sort -nlwp`), `ls /proc/<pid>/task`, then the `diff` of the two `maps`.
  The empty `diff` is the moment.
* **`03-threads/ip-sp`**: run it, then `nm ip_sp | grep thread`; read one IP against `nm` live.
  The point is same-function-same-IP, different-SP; write "IP = what, SP = where" on the board.
* **`03-threads/new-stack-area`**: one `ENTER` at a time, `pmap` in a second terminal between creations; watch a zone appear per thread.
* **`04-process-ops/posix_spawn`**: run it; `ps -ef | grep '[s]leep'` in a second terminal while it waits.
* **`04-process-ops/zombie`**: run it, do **not** press `ENTER`, show `ps -o pid,stat,cmd -C sleep` with the `Z`; then press `ENTER` and show it gone.
* **`04-process-ops/orphan`**: run it, then `ps -o pid,ppid,cmd -C sleep` in a second terminal; the `PPID` is `systemd`, not `orphan`.
* **`05-thread-ops/create-join`**: run it; point at the per-thread sums adding to the total, and say "no lock, because no shared writes".
* **`06-fork-exec/fork-exec`**: run it; it is `posix_spawn` by hand.
* **`06-fork-exec/strace`**: both traces side by side; the same `clone`/`clone3` and `execve` under both.

## What students get wrong

* **"A thread is a lightweight process."**
  True as a slogan, misleading as a model.
  The useful distinction is the address space: a process has its own, threads share one.
  The `diff` of the two `maps` in `01-run-apps` is the cure.
* **"`fork()` returns the child."**
  It returns *twice*: `0` in the child, the PID in the parent.
  `fork-exec`'s `switch` is where this lands; run a version that prints in both branches.
* **"`exec()` creates a process."**
  It replaces the current one.
  Creation is `fork()`; the pair is what makes-and-runs.
  The strace demo separates the two calls.
* **"`posix_spawn` is different from `fork`+`exec`."**
  The strace demo shows the same two system calls under both; `posix_spawn` is the library wrapping them.
* **"Threads need a lock."**
  Not when they do not share writable memory.
  `create_join` is deliberately lock-free: each thread owns its slice.
  Say clearly that lecture 08 is where sharing, and locking, begin, so that they do not reach for a mutex yet.
* **"The stack is shared."**
  Everything is shared *except* the stack.
  The different SPs in `ip_sp` and the per-thread zones in `new-stack-area` are the two pieces of evidence.

## Things that go wrong in the room

* `ip_sp` prints nothing if its output is piped and it is killed before it flushes; run it in a terminal, not through a pipe, and let it print before it sleeps.
* `zombie`: if you press `ENTER` too early (before the child's `sleep` ends) there is no zombie window; wait a second, then look, then press `ENTER`.
* `orphan`: `ps` immediately after `./orphan` sometimes still shows the old parent for an instant; run it twice.
* Matching `sleep` children with `pgrep -f 'sleep 100'` also matches your own command line; use `ps -C sleep` or an exact PID.
* `ffmpeg` built without `libx264`, or no input file: have a fallback multi-threaded program (`stress`, a compile with `make -j`, a browser) to show the `%CPU > 100` effect.
* `strace` output interleaves parent and child lines; `-f` is essential, and reading it top to bottom needs a moment.
* The IP addresses are low (`0x40...`) only because the thread demos build `-no-pie`; with PIE they are high and vary per run, which is fine but less tidy.

## Cuts, if you are behind

In order, the first things to drop:

1. `06-fork-exec/strace` live; the figure and one sentence carry it.
1. `new-stack-area`; the different SPs in `ip_sp` already prove the per-thread stack.
1. `posix_spawn` live; go straight to `fork-exec`, which is the same thing by hand.
1. The `libx264` encode; quote the 641% from the slide.

Do not cut the pitch's `diff` of two `maps`, `ip_sp`, `zombie`, or the `strace` comparison; those are the lecture's four load-bearing demonstrations.

## Links to the rest of the course

Say these explicitly.

* Lecture 03's address space is what a process owns; this lecture is the owner.
* Lecture 05's copy-on-write is what makes `fork()` cheap; point back to it at the fork/exec figure.
* Lab 06 is this lecture by hand: the shell is `fork`/`exec`/`waitpid`, the thread exercises are `pthread_create`/`pthread_join` with each thread kept to its own memory, exactly as part 05 insists.
* Lecture 07 is scheduling: the 3,412 threads on 14 cores mean most are not running, and the scheduler chooses; a thread's states, ready/running/blocked, belong there.
* Lecture 08 is concurrency: the moment part 05's discipline is dropped and threads share writable memory.
* The assignments: `minishell` is `fork`/`exec`/`wait`/pipes; `mini-libc` implements these primitives on raw system calls.

## Further demos worth writing

* **`fork()` alone**: a `fork()` with no `exec()`, both processes running the same code from the fork point, and the classic doubling of buffered output when `stdout` is not flushed first.
* **Copy-on-write, measured from the process side**: `fork()` a process with a large heap and show `RSS` barely moving until the child writes, tying back to lecture 05.
* **A thread race**: `create_join` with a shared running total and no join in between, run many times, to show the wrong answers that lecture 08 fixes. (Keep it as a warning, not a solution.)
* **`vfork()` and `posix_spawn` internals**: the `CLONE_VFORK` in the `strace` output, and why a spawn can be cheaper than a full `fork()`.
