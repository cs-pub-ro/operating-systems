# Instructor Notes: `printf` vs `write`

## Running the demo

The demo depends entirely on **withholding step 3**.
Run steps 1 and 2, let the class conclude that the low-level function is faster and that this is obvious, and only then comment out one line.
If the buffering point is made up front, there is no demo left.

Ask everyone to write down a prediction before anything is measured.
The prediction is almost always "`write` is faster, because `printf` does more work", and it is worth having it on paper when the result flips.

## Sequencing

1. Fill in the TODOs in both files together.
1. Time both.
   `write` wins by ~50%.
   State clearly that the case looks closed.
1. Comment out `setvbuf`, rebuild, time again.
   Let the 5× surprise land before explaining it.
1. Only now go to `strace`, with `N` set to 20.
   The single 740-byte call is the moment the explanation clicks.
1. Return to the `sys` column of the timing table and connect it to the call count.

## Points to hammer

* **`sys` time is the call count.** This is the load-bearing observation.
  `write_demo` and unbuffered `printf_demo` have *identical* `sys` times because they make the same number of calls at the bottom.
* **A `write()` call costs about the same for 37 bytes as for 4096.** The expense is making the call, not moving the data.
  Take this as measured for now; *why* it is expensive is session 02's material, and it is a good hook to end on.
* **The `user` column is where the library's cost shows up** — 0.10 s of format parsing, `vfprintf` generality, and `FILE` locking. It is real and visible, and it is the price paid for the 110× reduction in calls.

## Practical notes

* **Always redirect to `/dev/null`.** Otherwise the terminal is being timed, not the program.
  Someone will forget; the resulting numbers are nonsense and it is worth letting that happen once.
* Numbers here are Ubuntu 24.04 / gcc 13.3 / x86-64 and wobble 10–20% between runs.
  Insist on ratios, not digits.
  Run anything surprising three times before believing it.
* `strace` with `N` at 1 000 000 takes several seconds; trust the *count*, not the clock.
* `-O0` is deliberate — at higher optimisation levels GCC may turn `printf("%s", line)` into `fputs`, which muddies the comparison.

## If time is short

This is the demo to keep.
It reaches the session's main idea fastest and sets up the system-call discussion for session 02.
`demo-copy-string` can be cut or assigned as reading.
