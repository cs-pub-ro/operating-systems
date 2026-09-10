# Going Further: `printf` vs `write`

## Things to try

1. **Change the buffer size.**
   Replace the `setvbuf` line with:

   ```C
	static char buf[64];
	setvbuf(stdout, buf, _IOFBF, sizeof(buf));
   ```

   Then try `buf[65536]`.
   Time each, and check the call sizes with `strace`.
   Where do the gains stop, and why?

   > Careful: `setvbuf(stdout, NULL, _IOFBF, 64)` — with `NULL` instead of a real array — **silently ignores the size** and keeps the 4096-byte default.
   > `man setvbuf` contains the sentence that says so.
   > Note that nothing warned you: it compiled, it ran, it did something other than what was asked.
   > `strace` is how you catch it.

   The gains flatten once the buffer is large enough that the per-call cost is amortised — going from 64 to 4096 bytes removes 98% of the calls, going from 4096 to 65536 removes 98% of what little is left. Diminishing returns are the expected shape.

1. Add `fflush(stdout);` inside the loop, after the `printf`, with the `setvbuf` line commented out.
   Predict the time *before* running it.
   (The loop needs `{ }` around two statements now.)

   This reproduces the unbuffered timing almost exactly: an explicit flush per iteration defeats the buffer just as thoroughly as switching it off.

1. `./write_demo > out.txt` versus `> /dev/null`.
   A real file is more work — does the *ranking* change?

   It does not.
   `/dev/null` discards the data but the call is still made, and the call is the expense.

1. Write a third program: a `write()` loop that fills its own 4096-byte buffer and only calls `write()` when it is full.
   That is `printf`'s trick, without `printf`.
   How close to 0.06 s can you get, and what does the remaining difference say about what stdio does for its money?

   It gets *faster* than buffered `printf`, because it skips format-string parsing and `FILE` locking.
   The gap is the 0.10 s of library overhead visible in the `user` column.

1. `printf` writes 37 bytes per line, but `strace` showed 4096-byte calls — which means lines get **split across** calls.
   Find a split in the output of `strace -e trace=write ./printf_demo > /dev/null` with `N` set to 200.

   4096 is not a multiple of 37, so a line straddles the boundary roughly every 111 lines.
   The buffer is flushed when full, not when a line ends.

## Questions to answer

* `printf` does more work than `write`, and is 3× faster.
  Explain in one sentence.

  It makes 9034 system calls instead of 1 000 000; the call is the expense, not the formatting.

* Unbuffered `printf` and `write_demo` have the same `sys` time but very different `user` time.
  Why each?

  Same `sys`: both make exactly one `write()` per line, and `sys` time is the call count.
  Different `user`: `printf` additionally parses `"%s"`, runs `vfprintf`'s general-purpose engine, and locks the `FILE` object a million times.

* Your program writes a log line every few seconds and crashes on the bug you are hunting.
  Which version do you want, and why is it the *slowest* one?

  The unbuffered one.
  Buffered output still sitting inside the process is lost when the process dies, so the fast version loses exactly the lines you need.
  This is why `stderr` is unbuffered by default.

* `write()` returned successfully.
  Are the bytes on the disk?

  No.
  A successful `write()` means the kernel has taken the data, not that it has reached the storage device — there is a second layer of buffering below the one measured here.
  `fsync()` is the answer, and the topic returns in the I/O session.

## Discussion points

* The demo has two lessons and both matter.
  **Buffering beats being close to the metal**: `printf` wins by *avoiding* the expensive operation, paying 0.10 s of library overhead to make 110× fewer calls.
  **Take the buffer away and the abstraction is pure overhead**: unbuffered `printf` pays for the library *and* for every expensive call underneath, making it the only version slower than doing it by hand.
* `printf` is not "fast" or "slow".
  Its buffer is.
* Nobody calls `setvbuf()` in real code, so the C library chooses: full buffering to a file or pipe, line buffering to a terminal.
  That is why the same binary feels slow when a human is watching, and it is worth demonstrating by running without redirection.
* The classic `printf("about to crash"); abort();` losing its message is the same phenomenon, and students remember it.

## References

* `man 3 printf`, `man 3 setvbuf`, `man 3 fflush`
* `man 2 write`, `man 2 fsync`
* `man 1 strace`, `man 1 time`
* [The GNU C Library manual — Stream Buffering](https://www.gnu.org/software/libc/manual/html_node/Stream-Buffering.html)
