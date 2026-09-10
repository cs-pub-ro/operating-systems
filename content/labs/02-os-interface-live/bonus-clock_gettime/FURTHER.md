# Going Further: `clock_gettime` and `time`

Optional.

## Things to try

1. **Count the syscalls.**
   Run your program under `strace -e trace=clock_gettime` and count the lines.
   Then write the same program using libc's `clock_gettime()` and count again.
   The numbers differ, and the reason is one of the more interesting things in this session — see the discussion below.
1. **Compare the clocks.**
   Read `CLOCK_REALTIME` and `CLOCK_MONOTONIC` one after the other and print both.
   Then run `sudo date -s '+1 hour'` (on a machine you may safely disturb) and read both again.
   Which one jumped?
1. **Time something with the wrong clock.**
   Measure a one-second sleep using `CLOCK_REALTIME` while the clock is being stepped backwards.
   This is the bug that `CLOCK_MONOTONIC` exists to prevent.
1. **Measure the resolution.**
   Call `my_clock_gettime()` in a tight loop and record the smallest non-zero difference between consecutive readings.
   Then compare with `clock_getres(2)`.
1. Look at `CLOCK_PROCESS_CPUTIME_ID` and `CLOCK_THREAD_CPUTIME_ID`.
   What do they measure, and how do they relate to the `user` column from `time`?

## Questions to answer

* Why is `tp` an output parameter rather than a return value?
* `time()` both returns the value and optionally stores it through a pointer.
  Why would an interface do both, and which style would you choose today?
* Your `my_time()` truncates rather than rounds.
  Is that correct? Check what libc does.
* Which clock would you use to timestamp a log file, and which to measure how long a request took?

## Discussion points

* **This is the exercise where the "syscalls always enter the kernel" story breaks down.**
  `clock_gettime` is so frequently called that Linux exposes it through the **vDSO** — a small shared library the kernel maps into every process, containing code that reads the time from a page of memory the kernel keeps updated.
  libc's `clock_gettime()` calls that code and never enters the kernel at all, which is why `strace` shows nothing.
  Your version, going straight to the `syscall` instruction, *does* enter the kernel — and is measurably slower for it.
  Run `ldd` on any dynamically linked binary and you will see `linux-vdso.so.1` listed with no path on disk: it does not exist as a file.
* **This is the same trade as buffering in session 01**, one layer down.
  The fast path avoids the expensive operation rather than performing it faster.
* **`CLOCK_REALTIME` can jump.**
  NTP steps it, administrators set it, and it can move backwards.
  `CLOCK_MONOTONIC` cannot, which is why every duration measurement should use it.
  Getting this wrong produces bugs that only appear twice a year.

## References

* `man 2 clock_gettime`, `man 2 clock_getres`, `man 3 time`
* `man 7 vdso` — what the vDSO is and which calls it accelerates
* `man 7 time` — the different clocks and their semantics
