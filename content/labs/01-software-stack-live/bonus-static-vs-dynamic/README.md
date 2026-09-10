# Bonus: Make Your Own Library — Static vs Dynamic Linking

**Tools:** GCC, `ar`, `ldd`, `nm`, `objdump`, `size`, `/usr/bin/time`

## Goal

Turn the string functions you wrote earlier into a real library, `libmystring`, ship it in both a static and a shared flavour, link the same program against each, and measure what the difference actually costs.
At the end you will have built by hand the two things `-lc` has been silently giving you since your first `printf()`.

## Background

A static library (`.a`) is an archive: a bag of `.o` files with an index, closer to a `.tar` than to a program.
At link time the linker copies the code you use out of it and into your executable.

A shared library (`.so`) stays a separate file.
It may be mapped at a different address in every process that loads it, so its code must be position-independent (`-fPIC`) and its calls must go through a level of indirection that the dynamic loader fills in at run time.

Both cost something.
Which one costs more depends entirely on what you measure.

## Your Task

1. Copy your solution from the string-functions exercise into this directory:

   ```console
   cp ../01-string-functions/mystring.c ../01-string-functions/mystring.h .
   ```

   `main.c` and the `Makefile` are already here and need no changes.
   `main.c` calls your functions in a tight loop and times them; `./main_x 0` does no work at all, which measures start-up only.

1. Build `libmystring.a` by hand: compile `mystring.c` to an object file, then `ar rcs` it into an archive.
   Inspect the archive with `ar t` and `ar x`.

1. Build `libmystring.so` by hand: compile with `-fPIC`, then link with `-shared`.

1. Link `main.c` three times: against the `.a`, against the `.so`, and fully statically (`-static`, libc included).
   `make` does all of this; do it manually first, then read the `Makefile` to compare.
   Note the `-Wl,-Bstatic ... -Wl,-Bdynamic` pair — work out why it is needed when both `libmystring.a` and `libmystring.so` are present.

1. Run the dynamically linked build directly, *without* setting anything.
   It will fail.
   Understand the error before you fix it, then fix it in all three ways: `LD_LIBRARY_PATH`, `-Wl,-rpath,'$ORIGIN'`, and installing the library system-wide.

1. Inspect what the linker produced:

   ```console
   make inspect
   ```

   Look at the `size` output, the `ldd` output, whether `my_strlen` is an undefined symbol, and how the call to `my_strlen` is encoded in each binary.

1. Measure, twice:

   ```console
   make bench      # steady-state per-call cost
   make startup    # process start-up cost
   ```

## Build & Run

```console
make                  # build all three executables
make run-dynamic      # runs main_dynamic with LD_LIBRARY_PATH set
make clean
```

`ITERS` and `RUNS` can be overridden: `make bench ITERS=50000000`.

## Check Your Work

* `make bench` interleaves the three binaries and repeats five times **on purpose**: the effect being measured is smaller than the run-to-run noise on a normal desktop.
  Do not draw a conclusion from a single pair of runs.
  A claim is only safe if the ranges for two binaries do not overlap.
* Expect the per-call difference between the static and the dynamic build to be a small number of nanoseconds — on the order of a couple of clock cycles, not a factor of two.
  If you measure a large ratio, something else is going on; find it before believing it.
* Expect the start-up difference to be in the hundreds of microseconds per process, i.e. many orders of magnitude larger *per process* than the per-call difference.
  Divide one by the other: how many calls must a program make before the per-call overhead even matches what it paid to load the library? Whether that number is large or small is the actual lesson here.
* From `make inspect`, the two disassembled call sites should differ in exactly one visible way.
  Be able to name it and say who fills in the missing address.
* The `size` column should show one binary vastly larger than the other two.
  Be sure you can say what the extra bytes are.
* Bring your numbers and your reading of them to the teaching assistant.
  Static linking wins both timing measurements — yet nearly everything on your system is dynamically linked.
  Be ready to explain why that is not a contradiction.
