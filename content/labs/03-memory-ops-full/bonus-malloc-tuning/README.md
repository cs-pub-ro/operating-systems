# Bonus: Tune `malloc()` for a Frame Pipeline

**Tools:** GCC, Make, strace

## Goal

Reference walk-through of the tuning exercise: a program that allocates and frees one 63 MiB buffer per frame, measured as shipped, tuned from outside with `GLIBC_TUNABLES` and from inside with `mallopt()`, and then fixed, because the tuning uncovers a bug the default settings were hiding.

## Background

`malloc()` is a policy in the C library on top of two system calls, `brk()` and `mmap()`.
The policy has parameters, documented in `man 3 mallopt`; the ones this exercise turns:

| `mallopt()` | tunable | Meaning |
| --- | --- | --- |
| `M_MMAP_THRESHOLD` | `glibc.malloc.mmap_threshold` | Requests at least this large are served by `mmap()`, not from the heap. 128 KB by default, adjusted upwards dynamically up to 32 MiB; setting it stops the adjustment. |
| `M_MMAP_MAX` | `glibc.malloc.mmap_max` | How many `mmap()`'d blocks may exist at once; 0 disables `mmap()` for requests altogether. |
| `M_TRIM_THRESHOLD` | `glibc.malloc.trim_threshold` | When the free space at the top of the heap exceeds this, it is given back to the kernel. 128 KB by default. |
| `M_TOP_PAD` | `glibc.malloc.top_pad` | Extra space asked for every time the heap grows. |
| `M_PERTURB` | `glibc.malloc.perturb` | Fill freed blocks with this byte and allocated blocks with its complement. |

Every one of them can be set at run time, from outside, with no rebuild:

```console
GLIBC_TUNABLES=glibc.malloc.mmap_max=0:glibc.malloc.trim_threshold=4294967295 ./frames
/lib64/ld-linux-x86-64.so.2 --list-tunables | grep malloc
```

`frames.c` processes 100 frames of 3840 × 2160 pixels at 8 bytes each, 66,355,200 bytes: for each, `malloc()`, `render_frame()`, `check_frame()`, `free()`.
It reports its own time, minor page faults and peak RSS from `getrusage()`, and the number of sampled pixels whose value is not what the renderer should have produced.

Files:

* `frames.c` -- the completed implementation: `tune_allocator()` filled in, allocation by `calloc()`.
* `prompt.txt` -- the note the exercise was written from.

## Build & Run

```console
make
./frames
./frames --tune
strace -c -e trace=brk,mmap,munmap ./frames
```

## Results and Explanations

Measured on Ubuntu 25.04, glibc 2.41, x86-64, with the Makefile's `-g` and no optimisation; the ratios are what matter, the absolute times are the machine's.

### Step 1 -- the default

The skeleton, as shipped:

```text
$ ./frames
100 frames of 63 MiB
  time:            1.748 s
  minor faults:    3240015
  max RSS:         64 MiB
  corrupt pixels:  0
```

```text
$ strace -c -e trace=brk,mmap,munmap ./frames
% time     seconds  usecs/call     calls    errors syscall
------ ----------- ----------- --------- --------- ----------------
 99.64    0.188997        1871       101           munmap
  0.36    0.000680           6       108           mmap
  0.00    0.000007           2         3           brk
```

One `mmap()` and one `munmap()` per frame: 63 MiB is far above the threshold, so every `malloc()` is a fresh anonymous mapping and every `free()` returns it.
A fresh mapping has no pages; the renderer touches all 16,200 of them, and each costs a page fault in which the kernel finds a page and zeroes it.
There are two faults per page, 3.24 million in all, because `render_frame()` reads a pixel before writing it: the read maps the shared zero page, the write faults again for a private copy.
The kernel's zeroing and the fault handling are where the 1.7 s goes; the `munmap()` line in the summary is only the part `strace` can see.

### Step 2 -- tuning from outside

One knob at a time.
Keeping requests off `mmap()`:

```text
$ GLIBC_TUNABLES=glibc.malloc.mmap_max=0 ./frames
  time:            1.747 s
  minor faults:    3233679
```

No better.
`strace` now shows about 200 `brk()` calls instead of the `mmap()`/`munmap()` pairs: the heap grows by a frame for each `malloc()`, and since the freed frame leaves 63 MiB free at the top, far above the 128 KB trim threshold, `free()` gives it straight back.
The next frame faults all its pages in again.
The second knob:

```text
$ GLIBC_TUNABLES=glibc.malloc.mmap_max=0:glibc.malloc.trim_threshold=4294967295 ./frames
100 frames of 63 MiB
  time:            0.354 s
  minor faults:    32512
  max RSS:         64 MiB
  corrupt pixels:  102440700
```

Five times faster, a hundred times fewer page faults, four `brk()` calls in the whole run: the heap grew once and the same block served every frame.
And a hundred million corrupt pixels.

### Step 3 -- tuning from inside

```c
static void tune_allocator(void)
{
	mallopt(M_MMAP_MAX, 0);
	mallopt(M_TRIM_THRESHOLD, -1);
}
```

`./frames --tune` reports the same numbers as the tunables run.
`-1` is the largest `size_t` once converted, i.e. "never trim"; any value above a frame would do.

`M_MMAP_THRESHOLD` set above the frame size (64 MiB, say) works just as well here, together with the same trim setting.
The manual page documents an upper limit of 32 MiB for it (`DEFAULT_MMAP_THRESHOLD_MAX` on 64-bit), which is the ceiling of the *dynamic* adjustment; glibc 2.41 accepts larger values from `mallopt()` and from the tunable.
Check the return value of `mallopt()` whichever knob you use: a rejected setting fails quietly, and so does a misspelt tunable.
The reference uses `M_MMAP_MAX` because it reads as what it means: never serve a request with `mmap()`.

### Step 4 -- the corrupt pixels

```c
frame[i] += expected(i, n);
```

`render_frame()` composites onto the frame: it adds to what is there, written for a frame that starts out black.
Nothing promised one.
With the default settings every frame was a fresh mapping and fresh pages from the kernel are zero, so the assumption held by accident; with the tuned settings every frame after the first is the previous frame's memory, holding the previous frame's pixels, and 99 frames of 1,036,800 sampled pixels come out wrong (bar the few where the stale value happens to match).

The bug was there before the tuning.
`glibc.malloc.perturb` proves it on the untuned program:

```text
$ GLIBC_TUNABLES=glibc.malloc.perturb=170 ./frames
  time:            1.452 s
  minor faults:    1620213
  corrupt pixels:  103680000
```

Every sampled pixel of every frame, because `malloc()` now fills each block with `0x55` (the complement of 170, `0xAA`) before returning it.
Perturb makes "uninitialised" visible, which is what it is for; the page faults halve because the fill touches each page before the renderer reads it.

### Step 5 -- the fix and its price

Two correct fixes: `memset(frame, 0, FRAME_SIZE)` after the allocation, or `calloc(1, FRAME_SIZE)` instead of `malloc()`.
The reference uses `calloc()`:

| Tuned run | time | faults | corrupt |
| --- | --- | --- | --- |
| `malloc()` (skeleton) | 0.354 s | 32,512 | 102,440,700 |
| `malloc()` + `memset()` | 0.53 s | 16,313 | 0 |
| `calloc()` | 0.525 s | 32,478 | 0 |

Clearing 63 MiB a hundred times is about 0.2 s, and the tuned program is still three times faster than the default.
In the *default* run `calloc()` costs nothing extra (1.75 s either way): glibc knows a block that has just come from `mmap()` is zero and skips the clearing.
That is the case for `calloc()` over `memset()`: it clears only when it has to.

The fault counts differ for a reason of their own.
`memset()` writes every page of the first frame before the renderer touches it, so each page faults once.
`calloc()` leaves the first frame's fresh pages untouched, because they are zero already, and the renderer then reads before writing: two faults per page, as in Step 1.
Neither matters after the first frame, when the pages are resident.

### Summary

| | system calls per frame | faults per frame | starts black because |
| --- | --- | --- | --- |
| default, `malloc()` | 2 | 32,400 | the kernel zeroed fresh pages |
| tuned, `malloc()` | 0 | 0 after the first | it does not |
| tuned, `calloc()` | 0 | 0 after the first | `calloc()` cleared it |

What the tuned program gave up: between frames, and after the last one, it holds 63 MiB that the default program had returned to the kernel.
For a pipeline on a machine of its own that is right; `M_TRIM_THRESHOLD` and `malloc_trim()` are the dial for when it is not (`FURTHER.md`).

## References

* `man 3 mallopt`, `man 3 malloc_trim`, `man 3 calloc`
* [glibc manual: Memory Allocation Tunables](https://www.gnu.org/software/libc/manual/html_node/Memory-Allocation-Tunables.html)
* `man 2 getrusage`, `man 1 strace`
