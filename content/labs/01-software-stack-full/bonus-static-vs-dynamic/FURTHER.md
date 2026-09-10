# Going Further: Make Your Own Library — Static vs Dynamic Linking

## Things to try

1. **Delete the library and re-run.**
   `rm libmystring.a && ./main_static` — still fine, the code was copied in at link time.
   `rm libmystring.so && LD_LIBRARY_PATH=. ./main_dynamic` — dead, the `.so` is a separate file needed at every start-up.

1. **Change the library without recompiling the program.**
   Edit `mystring.c` so `my_strlen` always returns 42, rebuild *only* `libmystring.so`, and re-run the **unchanged** `main_dynamic`.
   The behaviour changes.
   Do the same with `main_static` and nothing happens until it is relinked.
   This is exactly what a security update looks like, and it is the strongest single argument for dynamic linking.

1. **`LD_BIND_NOW=1 ./main_dynamic 20000000`** forces eager symbol resolution.
   Start-up gets slower — all symbols are resolved before `main` runs instead of lazily on first call.
   Steady-state call cost is essentially unchanged: after the warm-up loop the lazy version has already resolved everything anyway.
   Predicting these two separately is the exercise.

1. **`main_fullstatic` is consistently ~9% slower than `main_static`** (5.90 vs 5.42 ns/call), though both use direct calls and neither touches libc in the loop.
   Genuinely open.
   Likely contributors: `main_static` is a PIE and `main_fullstatic` is not (`file` confirms), and code layout and alignment differ.
   A good excuse for `perf` if `perf_event_paranoid` can be lowered.

1. **`-fno-plt`**: `gcc -O2 -fno-plt -o main_noplt main.c -L. -lmystring`.
   The call becomes an indirect call through the GOT directly, with no PLT stub.
   It removes one jump but forces eager binding for those symbols.
   Measure rather than assume.

1. **`LD_DEBUG=all ./main_dynamic 0 2>&1 | head -50`** — the loader narrating its own work.
   `LD_DEBUG=bindings` is the readable subset.
   This is the ~330 µs of start-up, itemised.

1. **Symbol interposition**: put a different `my_strlen` in a second `.so` and `LD_PRELOAD` it.
   It wins, because the dynamic loader resolves by name at run time and preloaded objects come first in the search order.
   A static binary has no name left to resolve — the call site holds a fixed address.
   This is how `valgrind` and many profilers work, and also how malware hooks functions.

## Questions to answer

* **Why does `-L.` not help at run time?**
  It is a *linker* flag, consumed at build time.
  The loader has its own search path and never sees it.

* **You rebuild `libfoo.so` with an extra function. Must you relink?**
  No.
  Adding symbols is backwards compatible.
  *Removing* one that your program uses breaks it at the next start-up, which is what `soname` versioning exists to manage.

* **Why must a `.so` be `-fPIC` but a `.a` need not?**
  A shared object may be mapped at a different address in every process, so it cannot contain absolute addresses.
  An archive's code is copied into the executable at link time, where the final addresses are already known.

* **"Statically link everything, it is 14% faster per call."**
  Two strongest counters: every process would carry its own copy of libc instead of sharing one read-only copy machine-wide, and a libc security fix would require rebuilding and redistributing every binary rather than replacing one file.

* **Which binary for a shell-loop tool, which for a daemon?**
  The tool: start-up dominates, so favour fewer `.so`s.
  The daemon: start-up is paid once and irrelevant; take the shared-memory and patchability benefits.

## Discussion points

* **Static linking wins both measurements and is still the wrong default.**
  That is the whole exercise.
  The costs that decide the question — shared RAM, disk, and shipping a libc fix by replacing one file — are not the costs the benchmark measures.
  "Which is faster?" was the wrong question.
* **The two costs have very different shapes.**
  Per-call: a couple of clock cycles, paid forever.
  Start-up: hundreds of microseconds, paid once per process.
  Dividing gives ~430 000 calls before the per-call cost even matches the load cost — which is why start-up matters for shell utilities and not for servers.
* **`libc.so` is loaded once and shared, read-only, by every process on the machine.**
  That is what "shared" means, and it is the feature the design exists for.
* **Methodology is half the lesson.**
  `make bench` interleaves and repeats because the effect is smaller than run-to-run noise.
  A claim is safe only if the ranges do not overlap.
  A single pair of runs 14% apart proves nothing when the same binary varies 7% between rounds.
* Same shape as `demo-printf-vs-write`: the winner made a different trade, not a cleverer implementation.

## References

* `man 1 ld`, `man 1 ar`, `man 1 nm`, `man 1 objdump`, `man 1 size`, `man 1 ldd`
* `man 8 ld.so` — loader search order, `LD_LIBRARY_PATH`, `LD_PRELOAD`, `LD_BIND_NOW`, `LD_DEBUG`
* Ulrich Drepper, [How To Write Shared Libraries](https://www.akkadia.org/drepper/dsohowto.pdf)
* Eli Bendersky, [Position Independent Code (PIC) in shared libraries](https://eli.thegreenplace.net/2011/11/03/position-independent-code-pic-in-shared-libraries/)
