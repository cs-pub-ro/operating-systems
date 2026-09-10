# Going Further: Make Your Own Library — Static vs Dynamic Linking

Optional.
Work through these once `make bench` and `make startup` have given you numbers you trust.

## Things to try

1. **Delete the library and re-run.**
   `rm libmystring.a && ./main_static` — still fine.
   `rm libmystring.so && LD_LIBRARY_PATH=. ./main_dynamic` — dead.
   Explain both in one sentence each.
1. **Change the library without recompiling the program.**
   Edit `mystring.c` so `my_strlen` always returns 42, rebuild *only* `libmystring.so` (`make libmystring.so`), and re-run the **unchanged** `main_dynamic`.
   Then try the same with `main_static`.
   This is what a security update looks like.
1. **`LD_BIND_NOW=1 ./main_dynamic 20000000`** forces eager symbol resolution.
   Predict the effect on start-up and on call cost *separately*, then measure.
   Were you right?
1. **`main_fullstatic` is consistently a few percent slower than `main_static`**, even though both use direct calls and neither touches libc in the loop.
   Why?
   Hints: is one of them a PIE and the other not (`file main_static`)?
   Does code alignment change (`objdump -d`)?
   This one is genuinely open — a good excuse to use `perf` if you can lower `perf_event_paranoid`.
1. **`-fno-plt`**: try `gcc -O2 -fno-plt -o main_noplt main.c -L. -lmystring`.
   What does the call site look like now (`objdump -d`)?
   Does it help?
1. **`LD_DEBUG=all ./main_dynamic 0 2>&1 | head -50`** — watch the loader work.
   Try `LD_DEBUG=bindings` too.
   This is the start-up cost, itemised.
1. **Symbol interposition**: write a different `my_strlen` in a second `.so` and `LD_PRELOAD` it in front of `main_dynamic`.
   Why can you do this to a dynamically linked program and not to a static one?
   This is how `valgrind` and many profilers work — and also how malware hooks functions.

## Questions to answer

* Why does `-L.` not help at run time?
* Your program links `libfoo.so`.
  You rebuild `libfoo.so` with an extra function.
  Do you have to relink your program?
  What if you *remove* a function?
* Why must a `.so` be compiled `-fPIC` but a `.a` need not?
* A colleague proposes statically linking everything at your company "because it is faster per call".
  Give the two strongest arguments against.
* Which of the three binaries would you ship as a command-line tool that users run thousands of times in a shell loop?
  Which as a long-running daemon?

## Discussion points

* **Static linking wins both measurements here, and is still the wrong default.**
  That is the whole exercise.
  The costs that decide the question — shared RAM, disk, and being able to ship a libc security fix by replacing one file instead of rebuilding every program on the system — are not the costs the benchmark measures.
  "Which is faster?" was the wrong question; engineering is choosing which cost you would rather pay.
* **The two costs have very different shapes.**
  The per-call penalty is a couple of clock cycles, paid forever.
  The start-up penalty is hundreds of microseconds, paid once per process.
  Divide one by the other and you get the number of calls a program must make before the per-call cost even matters — it is large.
  This is why start-up time is a big deal for shell utilities and irrelevant for a long-running server.
* **`libc.so` is loaded into memory once and shared, read-only, by every process on the machine.**
  That is what the "shared" in "shared library" means, and it is the feature the whole design exists for.
* **Methodology matters as much as the result.**
  `make bench` interleaves the binaries and repeats five times because the effect is smaller than the run-to-run noise.
  A claim is only safe if the ranges for two binaries do not overlap.
  A single pair of runs 14% apart proves nothing when the same binary varies by 7% between rounds.
* This is the same shape of argument as the `printf` vs `write` demo: buffered `printf` beat raw `write` not because the library was clever, but because it made a different trade.

## References

* `man 1 ld`, `man 1 ar`, `man 1 nm`, `man 1 objdump`, `man 1 size`, `man 1 ldd`
* `man 8 ld.so` — loader search order, `LD_LIBRARY_PATH`, `LD_PRELOAD`, `LD_BIND_NOW`, `LD_DEBUG`
* Ulrich Drepper, [How To Write Shared Libraries](https://www.akkadia.org/drepper/dsohowto.pdf)
* Eli Bendersky, [Position Independent Code (PIC) in shared libraries](https://eli.thegreenplace.net/2011/11/03/position-independent-code-pic-in-shared-libraries/)
