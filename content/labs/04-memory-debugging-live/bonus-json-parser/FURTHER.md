# Going Further: The JSON Parser With a Heap Buffer Overflow

Optional.

## Things to try

1. **Try AddressSanitizer on the buggy version:**

   ```console
   gcc -Wall -Wextra -g -fsanitize=address -o jsontool json_value.c main.c
   ./jsontool
   ```

   It catches this one, unlike the histogram exercise.
   What does ASan put between allocations that it does not put between the fields of a struct — and why does that decide which of the two bugs it can see?
1. **Make the corruption matter.**
   The overflow is harmless only because of where the allocator happens to put things.
   Run under `MALLOC_PERTURB_=42 ./jsontool`, which makes glibc fill fresh memory with a non-zero pattern, and see whether anything changes.
1. **Count the strings.**
   The fixed program allocates a few more bytes than the buggy one.
   Predict the difference from the input document before you measure it.
1. **Break it the other way.**
   Allocate `sb->len + 1` but copy `sb->len + 1` bytes.
   Now the *read* is one byte too long instead of the write. What does Valgrind call it?
1. **Remove the terminator entirely.**
   Allocate `sb->len` and do not write the `'\0'` at all.
   The write-overflow is gone and the program is more broken, not less. Where does it go wrong now, and how often does Valgrind say so?
1. **Look for the same shape elsewhere** in any C you have written: a `malloc(n)` followed by a write at index `n`, or a forgotten `+ 1` after `strlen`.

## Questions to answer

* Why did the program produce perfect output while corrupting the heap on every string it parsed?
* How many bytes should the function allocate, and why is the character count not enough?
* Valgrind reported many errors from a smaller number of contexts. What is a "context", and why is one bug more than one of them here?
* The two stack traces in the report name the same function a few lines apart. Why does that make this bug easy compared with most overflows?
* Why can `gdb` confirm this bug but not lead you to it?

## Discussion points

* **A C string is its characters plus a terminator.**
  Every `malloc` for a string needs the `+ 1`, and forgetting it is one of the most common bugs in C.
* **Correct-looking output is not evidence of anything.**
  This program has undefined behaviour on every string it parses; it has simply not been unlucky yet.
* **The comment on the buggy line was true.**
  The mistake was in what the code was trying to do, not in whether it did it — the caller needs one more byte than were written.
* **This is the mirror image of `01-grade-histogram`.**
  There, only `gdb` could help; here, only Valgrind.
  Neither tool is the debugger; the pair is.
* **A tool only sees the boundaries it instruments.**
  Knowing what a tool models is the difference between trusting it and being misled by it.

## References

* `man 3 malloc`, `man 3 memcpy`, `man 3 strlen`
* `man 1 valgrind`, and the [Memcheck manual](https://valgrind.org/docs/manual/mc-manual.html)
* [AddressSanitizer](https://github.com/google/sanitizers/wiki/AddressSanitizer)
