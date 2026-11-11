# Instructor Notes: Parallel String Encryption

## Purpose

Data partitioning with threads that write, and no lock.
The exercise has less scaffolding than session 06's: no struct is given, and the provided cipher function is wrong for a part in the middle of the string, which the student has to notice.
The two things to take away are the argument for why no mutex is needed, and the habit of testing with sizes that do not divide evenly.

## Expected answers

* **TODO 1**: a struct with a start pointer, a length, the key, and the part's position in the string (or the string's base address, from which the position follows).
* **TODO 2**: `xor_buffer()` takes the position and uses `key[(pos + i) % klen]`; the check call passes 0.
  Equally good: leave `xor_buffer()` alone and have the thread function do the loop itself with the right index.
* **TODO 3**: one call.
* **TODO 4**: `chunk = size / nthreads`; part *i* at `i * chunk`; the last part runs to the end.
* **TODO 5**: create and join.

## Things students get wrong

* **The key restarted in every part.**
  The mistake the exercise is built around.
  With a 4-character key and 2, 4 or 8 threads it does not show; the README asks for `secret`, and for the experiment that explains the difference.
  A student who never changes `xor_buffer()` and reports success has tested with a short key, or with one thread.
* **The remainder dropped.**
  Fails the round trip with 3 and 7 threads, passes with 2, 4, 8 and 64.
* **A mutex around `xor_buffer()`.**
  Correct and sequential.
  Ask which variable the mutex protects; there is none.
* **Parallelizing the check as well.**
  The README says to leave it; a student who does it anyway has made the test unable to see the key-phase mistake.
  That is `FURTHER.md`, item 3, and a good conversation.
* **Parts that overlap by one**, from an off-by-one in the length.
  Fails the round trip on every run; point out that it is not a race.
* **`int` arithmetic for the offsets**: `i * chunk` with `i` an `int` and `chunk` a `size_t` is fine, but a `chunk` declared `int` overflows at 2 GiB.
  Not reachable at 256 MiB; worth a remark if someone declares it so.

## Verified reference values

| Fact | Value |
| --- | --- |
| `./encrypt secret`, 1 / 2 / 4 / 8 / 12 / 32 / 64 threads | 0.629 / 0.324 / 0.164 / 0.152 / 0.114 / 0.116 / 0.117 s |
| Round trip, any key, any thread count from 1 to 64 | `ok` |
| Key restarted per part, 16 MiB, `secret`, 2 / 3 / 4 threads | `FAILED` |
| Same, `abcd`, 2 / 3 / 4 threads | `ok` / `FAILED` / `ok` |
| Same, `abc`, 2 / 3 / 4 threads | `FAILED` / `ok` / `FAILED` |
| `time`, whole program, 1 / 8 threads | 1.36 / 0.87 s |
| `-O2`, 1 thread | 0.62 s, unchanged |
| Loop without `%`, 1 thread, `-O0` / `-O2` | 0.34 / 0.14 s |
| `make test` | 4 keys, 8 thread counts, 16 MiB, all `ok` |

## Practical notes

* The string is 256 MiB of `malloc()`; a third argument sets the size in MiB for small VMs, and for quick tests.
* The exit status is 0 for a good round trip and 1 for a failed one, so the program can be used in a shell loop.
* The text is one 64 KiB block of pseudo-random letters, repeated; the check regenerates the block and compares, which is why it is fast.
* The skeleton prints the thread count it was given even while it is sequential; the round trip succeeds from the start, so the first thing a student sees is `ok` with "4 thread(s)" and the one-thread time.
  Say so.
