# Instructor Notes: Copy String

## Running the demo

Fill in the two TODO blocks together, build, run, and let the times speak.
The gap is large enough to be obvious without any statistical care.

Before revealing the explanation, ask the class what `strcat` has to do *before* it can copy anything.
Most students have used `strcat` for years without ever asking, and the question is usually enough to get them there unaided.

## Points to hammer

* A C string does not carry its length.
  Every consequence in this demo follows from that one sentence.
* Count the scanning out loud: 0, then 6, then 12, then 20 characters scanned, to write 25.
  Then multiply by 100 000 000.
* The fast version calls the *same library* as the slow one.
  Nothing was optimised; information was simply not discarded.

## Practical notes

* The offsets in `copy-string-improved.c` are 6, 6 and 8 — the lengths of `"John, "`, `"Paul, "` and `"George, "`.
  An earlier version of this material had 6, 6 and 7, which silently built a *different* string than the `strcat` version it was being compared against.
  If a student's improved version is suspiciously fast or the output looks subtly wrong, check the offsets first.
  It is worth showing both strings side by side to confirm the two programs really do the same work.
* At `-O0` the comparison is honest.
  At `-O2` GCC may recognise the constant-length copies and fold them, at which point the compiler is being measured, not the code.
* 100 000 000 iterations takes a few seconds; if the room is on slow hardware, reduce `NUM_ROUNDS` rather than waiting.

## Where this leads

This demo is the appetiser for `01-string-functions`, which turns the same observation into a measured O(N²)-versus-O(N) table.
If time is short, this demo can be cut and its point made inside that exercise instead.
