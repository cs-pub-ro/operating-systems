# Going Further: The `nanosleep` System Call

## Things to try

1. **Interrupt the sleep.**
   Install a `SIGALRM` handler, call `alarm(1)`, then sleep for 30 seconds.
   `my_nanosleep()` returns `-4` — negated `EINTR` — and the kernel fills `rem` with roughly 29 seconds (measured: `29.000032063`).
   Without a handler installed, the default action for `SIGALRM` terminates the process instead.

1. **Implement the real `sleep()`.**
   Loop while the return value is `-EINTR`, copying `rem` into `req` each time, and return the seconds left unslept if the loop is abandoned.
   The `alarm()` setup above is the test.

1. **Ask for something invalid.**
   `tv_nsec = 1500000000` returns `-22`, negated `EINVAL`.
   The kernel requires `tv_nsec` in `[0, 999999999]`; anything else is rejected immediately rather than normalised.

1. **Measure the overshoot.**
   1000 sleeps of 1 ms each takes noticeably more than 1 second — typically 1.05–1.10 s.
   The extra is per-call: the syscall itself, the timer setup, and the scheduling latency of becoming runnable again.
   It is a good illustration of why fine-grained sleeping in a loop is a poor way to pace anything.

1. **Compare with `clock_nanosleep`.**
   It can sleep against a chosen clock and, with `TIMER_ABSTIME`, until an *absolute* deadline.
   That removes the drift accumulated by repeated relative sleeps — the correct tool for a fixed-rate loop.

## Questions to answer

* **Why is the elapsed time never less than requested?**
  `nanosleep` guarantees *at least* the requested duration.
  The kernel makes the process runnable once the deadline passes, but it still has to be scheduled onto a CPU.
  A sleep that could return early would be much harder to build on.

* **Why does `strace` print `nanosleep` before the program's first line?**
  Stdout buffering.
  The program's output goes to a pipe, so libc holds it until exit; `strace` writes to the terminal immediately.
  Not a reordering — the session 01 lesson resurfacing inside a debugging tool.

* **What if a pointer referred to memory you do not own?**
  The kernel validates the address and returns `-14` (`EFAULT`) rather than crashing.
  A bad `req` is rejected immediately.
  A bad `rem` is only detected *if the sleep is actually interrupted*, since that is the only time the kernel writes through it — an uninterrupted sleep with a garbage `rem` returns 0 quite happily.
  Validating user-supplied pointers is the kernel's job, and it is one reason a system call costs more than a function call.

* **Why must `tv_nsec` be set explicitly?**
  An automatic `struct timespec` is not zeroed.
  Whatever was on the stack becomes the nanosecond count: either an `EINVAL` or an unexpectedly long sleep.

## Discussion points

* **Pointers are just machine words to a system call.**
  Casting to `long` is the calling convention, not a trick.
  A `NULL` `rem` becomes 0, exactly the value the kernel reads as "do not report the remainder", so no special case is needed.
* **This is the first task where the kernel writes into the caller's memory.**
  Worth pausing on: the kernel validates the address, and a bad pointer is an error return rather than a fault inside the kernel.
* **`EINTR` is a fact of life on Unix.**
  Any blocking call can return early because a signal arrived.
  Code that does not handle it works fine until the day something sends a signal.
* **`nanosleep` overshoots by design.** Students often read the couple of milliseconds as sloppiness; it is a guarantee being honoured.

## References

* `man 2 nanosleep`, `man 2 clock_nanosleep`, `man 3 sleep`
* `man 7 signal` — `EINTR` and interrupted system calls
* `man 2 syscall`
