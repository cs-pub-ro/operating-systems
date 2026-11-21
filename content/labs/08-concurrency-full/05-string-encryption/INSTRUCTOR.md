# Instructor Notes: A Lock in the Wrong Place

## Purpose

A mutex that is present and misplaced, in code students already know from session 07.
The exercise has one bug with two symptoms, a wrong result and a slow run, and the second is what makes "it gives the flag" not the end of the conversation.

## Expected answers

The read of `next`, the test against `size` and the write of `next` under the lock; `xor_buffer()` outside it.
An `atomic_fetch_add()` on the cursor with no mutex is as good, and is in `FURTHER.md`.

## Things students get wrong

* **Moving the lock up to cover the whole loop body.**
  `round trip: ok`, the flag, and 0.1 s instead of 0.012 s.
  The executable cannot fail it; the second and third checks of the task README are there to catch it.
  Ask what seven of the eight threads are doing.
* **Locking the read and the write separately**, with the test in between and unlocked.
  Still a check-then-act, and still wrong.
* **A `break` with the lock held**, when `pos >= size`.
  Time-out: the first thread to finish leaves the mutex locked.
  The reference tests `pos` twice for this reason, once inside the lock to decide whether to move the cursor and once outside to decide whether to leave.
* **"The threads overlap, so lock the text."**
  They do not overlap once the cursor is right; have them say which two threads could hold the same block.

## Verified reference values

| Fact | Value |
| --- | --- |
| Skeleton | 9 to 60 million of 67,109,864 characters wrong; 0.65 to 0.83 s |
| Lock around the whole loop body | right; 0.097 s |
| Reference, `make test` | the flag, 20 runs out of 20; 0.012 s |
| Atomic cursor, no mutex, 20 runs | 20 flags; 0.012 s |
| Reference with `BLOCK` 16 / 4096 / 1048576 | 0.452 / 0.012 / 0.012 s |
| Proof passed to `flag_print()` | 67109864, 3310092825 |

Times are for a 24-core machine; on four cores the reference is slower, and the order of the three versions is the same.

## Practical notes

* The text is 64 MiB plus 1,000 characters, so that the last block is a short one.
* The second number of the proof is the hash of the encrypted text: the flag depends on the ciphertext being exactly what one pass would produce.
* On a virtual machine with little memory the 64 MiB allocation can fail; the executable then says so and stops.
* `flag.h` is regenerated with `../utils/gen_flag.py flag 67109864 3310092825 > flag.h`.
