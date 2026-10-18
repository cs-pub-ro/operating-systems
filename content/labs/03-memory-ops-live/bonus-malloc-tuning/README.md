# Bonus: Tune `malloc()` for a Frame Pipeline

**Tools:** GCC, Make, strace

## Goal

Take a program that allocates and frees one 63 MiB buffer per frame, measure what that costs, and make it several times faster without changing what it does -- by changing how the allocator behaves.
Along the way, find the bug that the speed-up uncovers.

## Background

`malloc()` is not a system call.
It is a policy in the C library, sitting on `brk()` and `mmap()`, and the policy has knobs.
`mallopt(3)` turns them from inside the program; the `GLIBC_TUNABLES` environment variable turns the same ones from outside, with no rebuild:

```console
GLIBC_TUNABLES=glibc.malloc.mmap_threshold=65536 ./frames
```

`frames.c` is a toy video pipeline.
For each of 100 frames it takes a buffer of 4K pixels at 16 bits per channel, composites a layer onto it, checks the result, and frees it.
It prints its own measurements: time, minor page faults, peak resident memory, and how many pixels came out wrong.
Open it; there are two TODOs.

## Your Task

1. **Measure the default.**
   Build, run `./frames`, then run it under `strace -c -e trace=brk,mmap,munmap`.
   Explain the system-call counts and the page-fault count from what one frame of 63 MiB costs the kernel.
1. **Tune it from outside.**
   With `GLIBC_TUNABLES` and `man 3 mallopt` next to you, find the setting that keeps requests this large away from `mmap()`, and the one that keeps freed memory at the top of the heap from being given back.
   Measure after each one.
   `/lib64/ld-linux-x86-64.so.2 --list-tunables | grep malloc` lists the names.
1. **Tune it from inside** -- **TODO 1**: make `./frames --tune` do the same thing with `mallopt()`.
1. **Explain the corrupt pixels.**
   The tuned run reports millions of them; the default run reported none.
   Find the assumption in `render_frame()`, and why reusing memory breaks it.
   Then run the *untuned* program with `glibc.malloc.perturb=170` and look at the count again.
1. **Fix it** -- **TODO 2**: make the assumption hold, and measure what the fix costs in the tuned run.
   There is more than one way; `man 3 calloc` is worth reading before choosing.

## Build & Run

```console
make
./frames
./frames --tune
strace -c -e trace=brk,mmap,munmap ./frames
```

A smaller count (`./frames 10`) is fine while experimenting.

## Check Your Work

* After step 2 the system-call summary should be a handful of calls instead of a hundred, and the page faults should have dropped by about two orders of magnitude.
  If only one of the two changed, you have set one knob and not the other; the `brk()` count says which.
* After step 3, `./frames --tune` and the `GLIBC_TUNABLES` run report the same numbers.
* After step 5, both runs report zero corrupt pixels, and the tuned run is still well ahead of the default.
  Be able to say where the remaining time went.
* Bring to the teaching assistant: what the tuned program now keeps that the default one gave back, and when you would not want that.
