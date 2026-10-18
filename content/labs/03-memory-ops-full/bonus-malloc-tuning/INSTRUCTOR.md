# Instructor Notes: Tune `malloc()` for a Frame Pipeline

## Purpose

The bonus that looks *inside* `malloc()`.
The core exercises treat it as a primitive; this one shows it is a policy with parameters, that the parameters can be changed from outside the program (`GLIBC_TUNABLES`) and from inside (`mallopt()`), that the right two settings make the same program five times faster, and that a speed-up can expose a bug the defaults were hiding.
Performance, correctness and security in one program, which is what the prompt asked for.

It is a take-home for most of the room: the measuring is quick, the explaining is not.

## Expected solution

* **Step 2** -- `GLIBC_TUNABLES=glibc.malloc.mmap_max=0:glibc.malloc.trim_threshold=<large>`.
  `glibc.malloc.mmap_threshold=<above a frame>` instead of `mmap_max` is equally right on current glibc, and so is `top_pad=<above a frame>` instead of `trim_threshold`; accept any pair that produces the numbers.
* **TODO 1** -- `mallopt(M_MMAP_MAX, 0); mallopt(M_TRIM_THRESHOLD, -1);` (any value above a frame works for the second, and the alternatives above are fine here too).
* **Step 4** -- `render_frame()` does `frame[i] += ...`, assuming a black frame; reused heap memory holds the previous frame.
  Perturb (`glibc.malloc.perturb=170`) shows every pixel wrong in the untuned run too.
* **TODO 2** -- `calloc(1, FRAME_SIZE)` or `memset(frame, 0, FRAME_SIZE)`; both are right.
  `calloc()` is the better answer because it is free in the default configuration and students who can say why have understood the exercise.

## Things worth drawing out

* **Two faults per page in the default run.** Read of an untouched page maps the zero page; the write then takes a copy-on-write fault.
  3.24 M faults for 1.62 M pages (16,200 per frame).
* **`mmap_max=0` alone changes nothing.** The traffic moves from `mmap()`/`munmap()` to about 200 `brk()` calls and the faults stay: the heap is trimmed after every `free()`.
  Both knobs are needed, and the `brk()` count in `strace -c` is how a student tells which one is missing.
* **Why the frame is 63 MiB.** glibc raises the mmap threshold by itself when an `mmap()`'d block is freed, up to 32 MiB; frames smaller than that would be served from the heap after the first `free()` and the default would already be fast (`FURTHER.md` item 5).
  Above 32 MiB the default never adapts, which is what makes the tuning necessary and visible.
  The manual page quotes the same 32 MiB as the upper limit of `M_MMAP_THRESHOLD`; glibc 2.41 accepts larger values, so `mmap_threshold=64 MiB` works as an alternative to `mmap_max=0`, and a student who finds that out has read the right page.
* **The bug was always there.** The perturb run on the *untuned* skeleton is the moment to make the point: a program that works only because the kernel happens to hand out zeroed pages is a broken program.
  Connect to session 04 (uninitialised reads) and to session 05 (stale data in reused memory).
* **What the tuned program keeps.** 63 MiB resident for life, free from the allocator's point of view.
  Ask when that is fine and when it is not.

## Common mistakes

* **A typo in a tunable name** is ignored silently.
  `ld.so --list-tunables` is the check.
* **Setting the tunables for one command and expecting them to stick.** `export` them, or prefix every command.
* **Thinking `./frames --tune` already does something** in the skeleton.
  It calls an empty function; the README says so, but students compare `./frames` with `./frames --tune` first and see no difference.
* **Fixing the bug by zeroing in `render_frame()`** rather than at allocation.
  Correct, but it makes the renderer responsible for the allocator's contract; mention it.
* **`memset()` and then wondering why the tuned run got slower.** That is the intended measurement, not a mistake, but say that the 0.2 s is 100 × 63 MiB of writes and that `calloc()` skips them when it can.

## Verified reference values

Measured on Ubuntu 25.04 / glibc 2.41 / x86-64, 100 frames of 66,355,200 bytes.
Expect the times to differ on the lab machines; the ratios and the counts should not.

| Run | time | minor faults | corrupt pixels | `brk`/`mmap`/`munmap` |
| --- | --- | --- | --- | --- |
| skeleton, default | 1.75 s | 3,240,015 | 0 | 3 / 108 / 101 |
| skeleton, `mmap_max=0` only | 1.75 s | 3,233,679 | 207,697 | 203 / 8 / 1 |
| skeleton, both tunables, or `--tune` with TODO 1 | 0.35 s | 32,512 | 102,440,700 | 4 / 8 / 1 |
| skeleton, default, `perturb=170` | 1.45 s | 1,620,213 | 103,680,000 | as default |
| TODO 2 with `memset()`, `--tune` | 0.53 s | 16,313 | 0 | as tuned |
| TODO 2 with `calloc()`, `--tune` | 0.53 s | 32,478 | 0 | as tuned |
| TODO 2 with `calloc()`, default | 1.75 s | as default | 0 | as default |

Built with the Makefile's `-g` and no optimisation.
With `-O2` the same runs take 1.64 s, 0.33 s and 0.5 s: the compute shrinks, the kernel's share does not, and every ratio stays.
The `memset()` row has half the faults of the `calloc()` row because `memset()` writes before the renderer reads (`README.md`, Step 5).

`max RSS` is 64 MiB in every run; the difference between runs is what is held *between* frames, which `getrusage()` does not show (`FURTHER.md` item 3 does).

## Practical notes

* A run takes about 2 s here and may take 5–10 s on a lab VM; `./frames 10` is fine for everything but the final numbers.
* The program needs 64 MiB free; a VM with 1 GB is plenty.
* `strace -c` adds overhead to the default run (every `munmap()` is traced); quote the program's own time, not `strace`'s.
* `glibc.malloc.perturb` is ignored for set-user-ID programs, like all tunables.
  Nobody runs this one that way; mention it only if asked why tunables are safe to have.
* The tunable names and the 32 MiB ceiling are glibc's; on musl (Alpine) none of this applies.
