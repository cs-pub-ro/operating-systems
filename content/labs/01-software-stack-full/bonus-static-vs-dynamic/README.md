# Bonus: Make Your Own Library — Static vs Dynamic Linking

**Tools:** GCC, `ar`, `ldd`, `nm`, `objdump`, `size`, `/usr/bin/time`

## Goal

Build `libmystring` from the string functions written in `01-string-functions`, ship it as both a `.a` and a `.so`, link the same program against each, and measure what dynamic linking actually costs — per call and per process start-up.
The intended conclusion is *not* "static is faster"; it is that both measurements favour static linking and that dynamic linking is still the right default, which forces the question of what is actually being optimised for.

This directory is the exercise with the reference `mystring.c` / `mystring.h` already in place, so everything builds out of the box:

```console
make
```

All output below is what the commands produce here, so you can check your own against it.

## Background

The exercise is mostly about running commands and reading their output, not about writing code.
`main.c` and the `Makefile` are provided; the only step performed by hand is copying `mystring.c` / `mystring.h` in from the string-functions exercise.

`main.c` calls `my_strlen`, `my_strcpy` and `my_memcpy` in a tight loop and reports nanoseconds per call.
It warms up for 100 000 iterations first, so that the CPU clock has ramped and lazy PLT resolution has already happened — otherwise the measurement would include one-off start-up effects.
`./main_x 0` performs no work at all, which is how the start-up measurement is taken.

## Build & Run

```console
make                # build all three executables
make run-dynamic    # main_dynamic with LD_LIBRARY_PATH set
make inspect        # what the linker produced
make bench          # steady-state call cost
make startup        # process start-up cost
make clean
```

`ITERS` (default 20 000 000) and `RUNS` (default 200) can be overridden on the command line.

### What gets built

| Target | How `libmystring` is linked | How libc is linked |
| --- | --- | --- |
| `main_static` | `.a`, copied into the binary | dynamically |
| `main_dynamic` | `.so`, resolved at run time | dynamically |
| `main_fullstatic` | `.a` | statically — everything baked in |

### Part A — the static library (`.a`)

```console
gcc -O2 -c mystring.c -o mystring.o    # 1. compile to an object file
ar rcs libmystring.a mystring.o        # 2. bundle object files into an archive
```

`ar` is an *archiver*, not a linker.
A `.a` file is little more than a bag of `.o` files with an index — closer to a `.tar` than to a program:

```console
ar t libmystring.a      # list members
ar x libmystring.a      # extract them back out
```

```console
gcc -O2 -o main_static main.c -L. -Wl,-Bstatic -lmystring -Wl,-Bdynamic
```

* `-L.` — look for libraries in this directory.
* `-lmystring` — link a library named `mystring`: look for `libmystring.so` first, then `libmystring.a`.
  The `lib` prefix and the extension are added *by the linker*, which is why the file must be named `libmystring.a` and not `mystring.a`.
* `-Wl,-Bstatic` — for libraries named after this flag, prefer the `.a`.
  **Needed here**, because both files exist and the linker would otherwise pick the `.so`.
* `-Wl,-Bdynamic` — switch back, so that **libc** is still linked dynamically.
  Forget this and the linker will try to link libc statically as well.

At link time the linker copies the machine code of the functions actually used **into the executable**.
After that, `libmystring.a` is irrelevant — delete it and `main_static` still runs.

### Part B — the shared library (`.so`)

```console
gcc -O2 -fPIC -c mystring.c -o mystring_pic.o   # 1. position-independent code
gcc -shared -o libmystring.so mystring_pic.o    # 2. link into a shared object
gcc -O2 -o main_dynamic main.c -L. -lmystring   # 3. link the program
```

**Why `-fPIC`?** Position-Independent Code.
A `.so` can be mapped at a different address in every process that loads it — the loader decides at run time, and the same library is shared by many processes at once.
So the code cannot contain hardcoded absolute addresses; it refers to its own data through a table (the GOT, below) instead.
This is the price of sharing, and it is what makes dynamic calls slightly slower.

Running it fails, on purpose:

```console
./main_dynamic 1000
```

```text
./main_dynamic: error while loading shared libraries: libmystring.so:
cannot open shared object file: No such file or directory
```

**This is supposed to happen**, and it is the single most common linking error there is.
`-L.` told the **linker**, at build time, where to find the library.
It said nothing to the **loader**, at run time.
`ld.so` does not know or care about `-L`; it searches `/lib`, `/usr/lib` and a few configured places.
`.` is not among them — and for good reason: running whatever `libmystring.so` happens to sit in the current directory would be a fine way to get a program hijacked.

```console
# 1. Tell the loader where to look, for this run only.
LD_LIBRARY_PATH=. ./main_dynamic 1000        # this is what `make run-dynamic` does

# 2. Bake the search path into the executable at link time ($ORIGIN = "the
#    directory the executable is in"). This is what real projects usually do.
gcc -O2 -o main_rpath main.c -L. -lmystring -Wl,-rpath,'$ORIGIN'
./main_rpath 1000                             # just works

# 3. Install it system-wide (needs root).
sudo cp libmystring.so /usr/local/lib/ && sudo ldconfig
```

## Results and Explanations

### `make inspect`

```text
=== size ===
   text	   data	    bss	    dec	    hex	filename
   3047	    640	     24	   3711	    e7f	main_static
   3040	    680	     24	   3744	    ea0	main_dynamic
 668981	  23376	  22440	 714797	  ae82d	main_fullstatic
```

`main_fullstatic` is ~220× the text size of the other two: that is libc coming along for the ride.

```text
=== ldd main_static ===
	libc.so.6 => /lib/x86_64-linux-gnu/libc.so.6
	/lib64/ld-linux-x86-64.so.2
=== ldd main_dynamic ===
	libmystring.so => ./libmystring.so
	libc.so.6 => /lib/x86_64-linux-gnu/libc.so.6
	/lib64/ld-linux-x86-64.so.2
=== ldd main_fullstatic ===
	not a dynamic executable
```

`main_static` lists only libc — its copy of `my_strlen` is inside the binary.
`main_fullstatic` has no loader at all.

```text
=== is my_strlen an undefined symbol? ===
main_static   : (no - it is inside the binary)
main_dynamic  :                  U my_strlen

=== how main calls my_strlen ===
main_static   :     116b:	e8 d0 02 00 00       	call   1440 <my_strlen>
main_dynamic  :     11cb:	e8 00 ff ff ff       	call   10d0 <my_strlen@plt>
```

This is the whole difference, in one line each.
`main_dynamic` cannot contain the address of `my_strlen`: nobody knows it until `libmystring.so` is mapped.
So the compiler emits a call to a local **stub**, and the stub jumps to whatever address the loader eventually writes down:

```text
your code  --call-->  PLT stub  --jmp *GOT(%rip)-->  the real my_strlen
                      (Procedure      (Global Offset Table:
                       Linkage         a table of addresses
                       Table)          filled in by the loader)
```

By default the resolution is **lazy**: the GOT initially points back into the loader, so the *first* call to each function goes the long way round and gets patched; later calls are just one extra indirect jump.
`LD_BIND_NOW=1` forces all of it to happen at start-up instead.

That extra indirect jump — every call, forever — is what the benchmark measures.

### Call cost — `make bench`

Ubuntu 24.04, gcc 13.3, 20 000 000 iterations × 3 calls, five rounds:

| | ns/call (5 rounds) | mean |
| --- | --- | --- |
| `main_static` | 5.50, 5.49, 5.39, 5.53, 5.18 | **5.42** |
| `main_dynamic` | 6.35, 6.18, 6.07, 5.95, 6.42 | **6.19** |
| `main_fullstatic` | 5.99, 6.10, 5.80, 5.88, 5.74 | **5.90** |

Dynamic linking costs about **0.8 ns per call, roughly 14%**.

Notice *why* this is believable: the static range (5.18–5.53) and the dynamic range (5.95–6.42) **do not overlap**, and static won all five rounds.
A single pair of runs 14% apart would have proved nothing — the same binary varies by ~7% between rounds.
This is why `make bench` interleaves the binaries and repeats; it is the methodological point of the exercise as much as the linking one.

0.8 ns is about 2–3 clock cycles: an extra indirect jump, plus a branch predictor that has to learn one more target.
That is the PLT, and it matches the disassembly exactly.

### Start-up cost — `make startup`

200 runs each of `./main_x 0` (0 iterations = start up and exit immediately):

| | 200 runs | per process |
| --- | --- | --- |
| `main_fullstatic` | 0.50 s | 2.51 ms |
| `main_static` | 0.53 s | 2.65 ms |
| `main_dynamic` | 0.60 s | 2.98 ms |

One extra `.so` costs about **330 µs of start-up** — mapping the file, relocating it, and resolving symbols, before `main` runs at all.

Put the two measurements together:

> 330 µs of extra start-up ÷ 0.8 ns per call ≈ **430 000 calls** before the per-call overhead even *matches* what was already paid to load the library.
>
> For most programs, dynamic linking's real cost is **start-up, not calls**.
> This is why start-up time matters for things that run constantly and briefly — shell utilities, CGI scripts, `git` — and is irrelevant for a long-running server.

### So why does anything use dynamic linking?

Static won *both* measurements.
Yet essentially everything on the system is dynamically linked.
Look at the size column again: `main_fullstatic` carries its own private copy of libc, 220× bigger.
Now imagine that for all ~2000 binaries in `/usr/bin`.

| | static | dynamic |
| --- | --- | --- |
| call cost | ~5.4 ns | ~6.2 ns (+14%) |
| start-up | faster | +~330 µs per `.so` |
| disk | one copy of libc **per program** | one copy **total** |
| RAM | one copy per process | **one copy shared by every process** |
| security fix in libc | rebuild + redistribute **every** program | replace one file |
| upgrade a library | relink everything | drop in a new `.so` |
| plugins (`dlopen`) | impossible | the entire point |
| missing `.so` at run time | cannot happen | the program will not start |

The shared-RAM row is the one that decides it.
`libc.so` is loaded into memory **once** and shared, read-only, by every process on the machine — that is what the "shared" in "shared library" means, and it is the feature the whole design exists for.

> **The real lesson.**
> Dynamic linking is measurably slower on both metrics tested here, and it is still the right default — because RAM, disk, and the ability to ship a security patch without rebuilding the world matter more than 0.8 ns.
> "Which is faster?" was the wrong question.
> Engineering is choosing which cost you would rather pay.

This is the same shape of argument as the `printf` vs `write` demo: buffered `printf` beat raw `write` not because the library was clever, but because it made a different trade.
Measure, then decide what is being optimised *for*.

## References

* `man 1 ld`, `man 1 ar`, `man 1 nm`, `man 1 objdump`, `man 1 size`, `man 1 ldd`
* `man 8 ld.so` — loader search order, `LD_LIBRARY_PATH`, `LD_PRELOAD`, `LD_BIND_NOW`, `LD_DEBUG`
* Ulrich Drepper, [How To Write Shared Libraries](https://www.akkadia.org/drepper/dsohowto.pdf)
* Eli Bendersky, [Position Independent Code (PIC) in shared libraries](https://eli.thegreenplace.net/2011/11/03/position-independent-code-pic-in-shared-libraries/)
