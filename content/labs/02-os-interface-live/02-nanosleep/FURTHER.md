# Going Further: The `nanosleep` System Call

Optional.

## Things to try

1. **Interrupt the sleep.**
   Make the program sleep for 30 seconds, run it, and press `Ctrl-C`... then instead install a handler for `SIGALRM`, call `alarm(1)` before sleeping, and see what `my_nanosleep()` returns.
   Print the return value and the contents of `rem`.
1. **Implement the real `sleep()`.**
   Loop while the kernel reports an interruption, feeding `rem` back in as the next `req`, and return the number of seconds left unslept.
   Test it with the `alarm()` setup above.
1. **Ask for something invalid.**
   Set `tv_nsec` to 1500000000 (more than one second's worth) and see what comes back.
   What does the return value mean, and how would you turn it into an `errno`?
1. **Measure the overshoot.**
   Sleep for 1 millisecond in a loop 1000 times, timing the whole thing.
   How much longer than 1 second does it take, and where does the extra time come from?
1. Compare `nanosleep` with `clock_nanosleep` (`man 2 clock_nanosleep`).
   What does the latter let you express that the former cannot?

## Questions to answer

* Why does `time` report slightly *more* than the requested duration, never less?
* `strace` prints the `nanosleep` line before the program's first `printf` output, even though the program clearly prints first.
  What is going on? (You saw the mechanism in session 01.)
* `rem` is written by the kernel into memory your program owns.
  What would happen if you passed a pointer to memory you do not own, and whose job is it to check?
* Why must `tv_nsec` be set explicitly rather than left uninitialised?

## Discussion points

* **`nanosleep` guarantees *at least* the requested duration.**
  The kernel makes the process runnable again after the deadline, but it still has to be scheduled, and that takes a little longer.
  A sleep that returned early would be far harder to build on than one that overshoots slightly.
* **Pointers are just machine words to a system call.**
  Casting `req` and `rem` to `long` is not a trick; it is the calling convention.
  A `NULL` `rem` becomes 0, which is exactly the value the kernel reads as "do not report the remainder", so no special case is needed.
* **The kernel writes into your memory through `rem`.**
  This is the first time in this session that a system call is an *output* channel as well as an input one, and it is worth pausing on: the kernel validates the address, and a bad pointer is an error return rather than a crash inside the kernel.
* **The `strace` line ordering** is stdout buffering, met again.
  Output to a pipe is held until exit, while `strace` writes to the terminal immediately.

## References

* `man 2 nanosleep`, `man 2 clock_nanosleep`, `man 3 sleep`
* `man 7 signal` — on `EINTR` and interrupted system calls
* `man 2 syscall` — return-value and error conventions
