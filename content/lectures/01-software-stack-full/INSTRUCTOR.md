# Instructor Notes: Lecture 01, The Software Stack

Notes for whoever delivers this lecture.
Nothing here is addressed to students.

## Shape of the delivery

The slot is 100 minutes: 50, a 10-minute break, 50.
In practice it is 40 + 10 + 40, because the room fills slowly and the last five minutes go to questions.
Plan for 80 minutes of content and treat anything beyond that as spare.

| Block | Part | Minutes | Notes |
| --- | --- | ---: | --- |
| 1 | 00. Pitch | 12 | Run two demos live, describe the other two. |
| 1 | 01. Lecture map | 2 | Say the five questions out loud once. |
| 1 | 02. The software stack | 16 | Includes the `make strace` demo. |
| 1 | 03. The operating system | 10 | Up to the end of the system call families. |
| -- | *break* | 10 | |
| 2 | 03. The operating system | 5 | Modes, cost, "the kernel is a library". |
| 2 | 04. Trade-offs | 13 | Includes the hashing demo. |
| 2 | 05. Applications and libraries | 8 | The fastest part; do not stretch it. |
| 2 | 06. Interaction | 9 | Docker demo only if it is already running. |
| 2 | 07. Conclusion | 5 | Leave the last slide up during questions. |

This is the first lecture of the course, so a couple of minutes at the start go to housekeeping -- how the course is assessed, where the materials are, what the lab expects.
Take them out of the pitch, not out of part 02.

## Which demos to run live

Run **two** of the four pitch demos, not four.
Four is fifteen minutes and the audience stops being surprised after the second one.

* **`01-copy-string`** is the best opener: it takes twenty seconds, the numbers are unambiguous, and everyone in the room has written that loop.
* **`03-find-buffer-cache`** is the best second one, because it needs no build and the effect is visible while you are still talking.
  It only works on a cold cache, so do *not* rehearse it in the same shell five minutes before the lecture.
  If you have root on the lecture machine, `sync; echo 3 | sudo tee /proc/sys/vm/drop_caches` first.
* `02-const-char-init` is worth showing if the audience is comfortable with C; the `objdump` evidence is the part that lands, and it takes longer than you expect.
* `04-python-string-edit` reads well on a slide and is not worth the terminal time.

In part 02, **`make strace`** in `demos/02-software-stack/` is the single highest-value thing you can run.
It is one command and the table it prints is the whole argument of the part.
Follow it with `strace ./hello-nolibc` -- three lines -- and then `strace ./hello-c | wc -l`, and let the room see the difference.

In part 04, `make run` in `demos/04-versus/` takes about a second.
Run it; the ratio changes slightly every time and that is fine.

The Docker demo in part 06 takes minutes to come up and is not worth doing cold.
Start it before the lecture, or show the diagram and the `docker compose ps` output from a terminal where it is already running.

## What students get wrong

* **"The kernel is a process."**
  This is the most common misconception in the whole course, and it is worth thirty seconds of insistence.
  Ask where it is in `ps`. Say "it runs on behalf of the process" twice.
* **"System calls are just functions."**
  They look like functions because libc wraps them in functions.
  The point is the mode switch and the fact that there is exactly one door.
* **"Higher in the stack is worse."**
  Second-year students often come away from this lecture with the idea that C is virtuous and Python is lazy.
  The `hello-nolibc` slide exists to kill that: nobody writes it, and the reason is not laziness.
  Say explicitly that most programs should be written as high as possible.
* **"`strcat()` is badly implemented."**
  No: it is excellently implemented and still loses.
  The distinction between interface cost and implementation cost is the one idea of the pitch, so do not let it collapse into "glibc is slow".
* **Immutability in Python.**
  Some students will insist the `keep = s` version is the anomaly.
  It is the other way round: the fast version is the anomaly, and it is not in any specification.

## Things that go wrong in the room

* `\time -v` needs `/usr/bin/time`, which is not installed by default on some distributions.
  Check before the lecture, or fall back to the shell's `time`.
* The assembly demos need `nasm`; `make` in `demos/02-software-stack/` fails without it.
* `demos/04-versus/` needs `libssl-dev`.
* `strace` may be blocked by hardened kernel settings (`kernel.yama.ptrace_scope`).
  It works on your own processes on a default Ubuntu; check it on the lecture machine anyway.
* The numbers in the README were taken on Ubuntu 24.04, gcc 13.3, x86-64.
  If the lecture machine gives very different ones, say so rather than reading the slide: the ratios are the point, not the digits.

## Cuts, if you are behind

In order, the first things to drop:

1. The `portability.svg` slide in part 04 --- the point is already made by the one before it.
1. The *Security against usability* and *Maintainability against comprehensibility* slides; mention them in one sentence each.
1. The `interface-implementation.svg` slide in part 02.
1. The whole of part 05 down to the comparison table --- it is the part the students find easiest.

Do not cut the pitch and do not cut "the kernel is a library, not a process".

## Links to the rest of the course

Say these explicitly; students do not connect the lecture and the lab on their own.

* The `strcat()` demo is lab 01's `demo-copy-string` and `01-string-functions`.
* The buffering trade-off is lab 01's `demo-printf-vs-write`.
* The static/dynamic linking cost is lab 01's `bonus-static-vs-dynamic`.
* The system call families table names the lecture each one is covered in; it is the course outline in one slide.

## Further demos worth writing

The trade-offs in part 04 have one demo between them.
Three more would each be about an hour of work, and each would replace a paragraph with a measurement:

* **Portability against performance** --- the same Fibonacci, or the same file-copy loop, in C, Java and Python.
* **Resource efficiency against performance** --- one file copied with buffer sizes from 1 byte to 16 MB, plotted.
* **Maintainability against comprehensibility** --- a real `read_iter` call chain in the Linux kernel, followed from the system call to a filesystem.
