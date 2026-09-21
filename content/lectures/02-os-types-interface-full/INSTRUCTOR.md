# Instructor Notes: Lecture 02, OS Types and the OS Interface

Notes for whoever delivers this lecture.
Nothing here is addressed to students.

## Shape of the delivery

The slot is 100 minutes: 50, a 10-minute break, 50.
In practice it is 40 + 10 + 40.
Plan for 80 minutes of content and treat the rest as spare.

This lecture is the sequel to lecture 01, and the first two minutes should say so explicitly: last week we said the OS is a layer, this week we open the layer.
Students who missed lecture 01 need the one-line version -- software is built in layers, the OS is one of them -- or part 01 will not land.

| Block | Part | Minutes | Notes |
| --- | --- | ---: | --- |
| 1 | 00. Pitch | 10 | Run the `perf` demo live; it is one command. |
| 1 | 01. What makes an OS | 12 | Unikraft demo only if pre-built; otherwise show the numbers. |
| 1 | 02. The OS interface | 14 | The `strace` of the asm demo is the centrepiece. |
| 1 | 03. Privileged domains (start) | 6 | The `cli`/`cr3` crash demo. |
| -- | *break* | 10 | |
| 2 | 03. Privileged domains (finish) | 6 | Mode versus root/non-root; insist on it. |
| 2 | 04. Optimizing the interface | 16 | Both demos; they are the quantitative heart. |
| 2 | 05. OS types | 10 | Callback to part 03's cost. |
| 2 | 06. Virtualization | 6 | One diagram, one analogy; do not overrun. |
| 2 | 07. Conclusion | 4 | Leave the last slide up during questions. |

## Which demos to run live

The demos in this lecture are timings, so they run in seconds and are worth doing live rather than reading.

* **`00-pitch`** (`perf stat -e instructions`) is the opener.
  It needs `sudo` for `perf`; check that works on the lecture machine beforehand, because `perf` is often locked down (`kernel.perf_event_paranoid`).
  If it is blocked, fall back to the numbers in the README and say so.
* **`02-os-interface/syscalls`**: run it, type a line, then `strace ./read_write_syscall` and show that the trace *is* the program -- there is nothing between it and the kernel.
  This is the single highest-value thing to run in the first half.
* **`02-os-interface/syscall-overhead`** and **both `04-optimize` demos** are the quantitative spine of the lecture.
  Run `make_syscalls`/`make_libcalls` and `fwrite_buffered`/`fwrite_unbuffered` live; each is two commands and a few seconds.
  The `sendfile` demo needs two terminals (server in one, `./client` in the other); rehearse the terminal layout so it is not fumbled live.
* **`03-privileged-domain`**: run `./cli`, show the crash, then run it again under `sudo` and show it crashes identically.
  That second run is the whole "mode is not identity" point in one gesture; do not skip it.
* **`01-make-os/unikraft`** takes minutes and a toolchain to build.
  Build it before the lecture and show the `ls -lh` and `nm | wc -l` outputs, or just show the numbers from the README.

## The dropped pitch demo

The source material for this lecture included a second pitch demo: a deliberately vulnerable `simple` binary served over the network, exploited with a ROP chain via pwntools to motivate isolation.
It was left out of the published demos to keep the pitch to one clean measurement and to avoid carrying a flag file and prebuilt binaries in the lecture tree.

It is still a strong live demo if you want it and have the time and comfort with binary exploitation.
The isolation argument in part 00 and the reference-monitor point in part 03 are exactly what it dramatises: an application whose control flow has been hijacked, and the OS as the thing that stops one program's compromise from becoming the machine's.
If you run it, keep it to the second half's part 03, not the pitch, so the opening stays short.
The original files live in the source repository the lecture was assembled from.

## What students get wrong

* **"libc calls are system calls."**
  The single most important correction of the lecture.
  Show a `strace` where a hundred `printf`s produce one `write`, and where `strlen` produces none.
  libc *decides* when to cross; that is the whole of part 04.
* **"The kernel is a process."**
  Carried over from lecture 01 and still worth repeating.
  It runs on behalf of a process, through the `syscall` door; `ps` shows nothing for it.
* **"root can run privileged instructions."**
  The `cli`-under-`sudo` demo is there to kill this.
  Root moves the software axis (what the kernel agrees to do), not the hardware axis (what the CPU will execute).
* **"Microkernels are just slower / just better."**
  It is a trade-off, not a ranking.
  Tie it back to the concrete part-04 cost: a microkernel turns filesystem calls into IPC, which is the crossing you just spent a whole part learning to avoid.
* **"A virtual machine is a kind of process."**
  The hypervisor is below the kernel, not above it.
  The analogy hypervisor:OS :: OS:app is the fix; draw it.

## Things that go wrong in the room

* `perf` needs `sudo` and a permissive `kernel.perf_event_paranoid`; check before the lecture.
* The assembly demos need `nasm`; `make` fails without it.
* `strace` may be blocked by `kernel.yama.ptrace_scope` on hardened machines.
* The `sendfile` demo binds to port 8080; make sure nothing else holds it, and run the server before the client.
* The `dmesg` output for the `cli`/`cr3` faults may need `sudo dmesg` depending on `kernel.dmesg_restrict`.
* The numbers in the READMEs are from one machine; if the lecture machine differs a lot, read the ratios, not the digits.

## Cuts, if you are behind

In order, the first things to drop:

1. The Unikraft demo build -- show the two numbers from the README instead.
1. The `sendfile` demo -- the `fwrite` demo already makes the "cross the boundary less" point; mention `sendfile` in one sentence as the kernel-side version.
1. Part 06 down to the one diagram and the one analogy.
1. The families table in part 02 read out in full -- point at it and move on.

Do not cut the pitch, the `strace` of the syscall demo, or the `cli`-under-`sudo` gesture.

## Links to the rest of the course

Say these explicitly.

* The syscall interface and wrappers are lab 02's whole subject: `my_syscall()`, `my_getpid`, `my_nanosleep`, and `strace` to check.
* The buffering trade-off is lab 01's `demo-printf-vs-write` and this lecture's `fwrite` demo -- the same measurement at two layers.
* The system-call families table names the lecture each family is covered in; it is the course outline in one slide.
* Virtualization here sets up nothing in the labs directly, but it is the mental model for the containers demo in lecture 01 and for the cloud everything runs on.

## Further demos worth writing

* **Microkernel IPC cost** -- the filesystem-as-a-process round trip on a microkernel, measured, next to the monolithic function call. It would turn part 05's argument into a number, the way part 04's demos do for part 02.
* **`strace` of a real program** -- `strace -c ls` or `strace -c cat file`, to show the families table populated by an actual workload rather than a toy.
* **The vulnerable-service exploit** described above, if isolation deserves a live dramatisation rather than an assertion.
