# Instructor Notes: Make Your Own Library — Static vs Dynamic Linking

## What this directory is

The exercise with the reference `mystring.c` / `mystring.h` already in place, so everything builds out of the box with `make`.
In the work directory the student supplies those two files by copying their own solution from `01-string-functions` — that is the only code they write here.

The exercise is about running commands and reading output, not about writing C.

## The conclusion to steer towards

**Static linking wins both measurements, and is still the wrong default.**

Students reliably stop at "static is faster, therefore static is better".
The exercise is only successful if they get past that.
The costs that actually decide the question — one shared read-only copy of libc across every process on the machine, and the ability to ship a security fix by replacing one file — are precisely the costs the benchmark does *not* measure.

Frame the closing question as "which cost would you rather pay?", not "which is faster?".

## Methodology is half the lesson

`make bench` interleaves the three binaries and repeats five times **on purpose**.
The effect being chased (~0.8 ns/call, ~14%) is smaller than run-to-run noise on a normal desktop, where the same binary varies by ~7% between rounds.

Insist on the standard: a claim is only safe if the ranges for two binaries **do not overlap**.
In the reference run static was 5.18–5.53 and dynamic 5.95–6.42, with static winning all five rounds.
A single pair of runs 14% apart would have proved nothing.

If a student reports a large ratio (2×, 10×), something else is wrong.
Find it before believing it.

## Expected magnitudes

Reference numbers, Ubuntu 24.04 / gcc 13.3 / x86-64, in the README.
What matters is the order of magnitude:

* **Per call:** ~0.8 ns, i.e. 2–3 clock cycles — one extra indirect jump plus a branch predictor learning another target.
* **Per process start-up:** ~330 µs for one extra `.so`.
* **Ratio:** ~430 000 calls before the per-call overhead matches the load cost.

Machines differ widely; on the machine these notes were checked on, absolute call costs were roughly a third of the reference values while the static/dynamic ordering held.
Insist on ratios.

## The failure to let happen

`./main_dynamic` refuses to start until `LD_LIBRARY_PATH` is set.
Let students hit it and read the message.
Same lesson as in `02-stream-ciphers`: `-L.` spoke to the linker at build time and said nothing to the loader at run time.

## Points worth drawing out from `make inspect`

* The two disassembled call sites differ in exactly one visible way — `call <my_strlen>` versus `call <my_strlen@plt>`.
  Make students name it and say who fills in the missing address.
* `nm -u` shows `my_strlen` undefined in the dynamic build only.
* The `size` output shows `main_fullstatic` at ~220× the text of the others.
  Ask what the extra bytes are before telling them.
* `-Wl,-Bstatic` without a matching `-Wl,-Bdynamic` makes the linker attempt to link libc statically too, and it will complain.

## Practical notes

* This is the one timing-sensitive exercise in the session.
  On a loaded lab machine, or in a VM with a shared host, the numbers may be unusable.
  Raise `ITERS`, close everything else, or fall back to discussing the reference numbers in the README.
* `make startup` runs each binary 200 times and needs `/usr/bin/time` (the binary, not the shell builtin).
* `main.c` warms up for 100 000 iterations before timing, so lazy PLT resolution and CPU clock ramping are excluded.
  If a student asks why the warm-up is there, that is the answer, and it is worth the detour.

## Prerequisites

Requires a working `01-string-functions` solution.
A student whose `my_strcat` is wrong will still get plausible-looking timings here, since `main.c` does not check correctness — check `make test` passed in the other directory first.
