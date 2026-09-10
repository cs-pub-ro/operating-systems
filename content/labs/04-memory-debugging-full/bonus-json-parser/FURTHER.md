# Going Further: The JSON Parser With a Heap Buffer Overflow

## Things to try

1. **Try AddressSanitizer on the buggy version:**

   ```console
   gcc -Wall -Wextra -g -O0 -fsanitize=address -o jsontool json_value.c main.c
   ./jsontool
   ```

   ```text
   ERROR: AddressSanitizer: heap-buffer-overflow ... in strbuf_finish
   SUMMARY: AddressSanitizer: heap-buffer-overflow json_value.c:65 in strbuf_finish
   ```

   It catches this one instantly, and *aborts* on the first occurrence rather than logging all 49 and carrying on.
   Contrast that with `01-grade-histogram`, where ASan was as blind as Valgrind: there the overflow stayed inside an object, here it crosses a redzone between blocks.
   The difference is not the size of the mistake — both are a single element past the end — it is whether anything was watching that boundary.
1. **Make the corruption matter.**
   The overflow is harmless only because of where the allocator happens to put things.
   Parse a document with many short strings in a row and print the parsed values; then try the same with `MALLOC_PERTURB_` set, which makes glibc fill freed and newly allocated memory with a non-zero pattern:

   ```console
   MALLOC_PERTURB_=42 ./jsontool
   ```

   Anything that changes the heap layout is a candidate for turning "works fine" into "corrupts a neighbour".
1. **Count the strings.**
   The buggy run allocates 7,735 bytes and the fixed one 7,753 — a difference of 18, one byte per string that goes through `strbuf_finish()`.
   Predict that number from the input document before you run either.
1. **Break it the other way.**
   Allocate `sb->len + 1` but keep `memcpy(result, sb->data, sb->len + 1)`.
   Now the *read* is one byte too long instead of the write.
   Memcheck reports it as an `Invalid read of size 1` inside `memcpy`.
   Which of the two would you rather ship, and does it matter?
1. **Remove the terminator entirely.**
   Allocate `sb->len` and do not write `result[sb->len]` at all.
   The overflow is gone and the code is much more broken: every `strcmp()`, `printf("%s")` and `strdup()` in the program now runs off the end of the string.
   A bug that Valgrind reports on every read is easier to live with than one it reports on a single write.
1. **Look for the same shape elsewhere.**
   `strlen(s) + 1`, `snprintf` return values, and any `malloc(n)` followed by a write at index `n`.
   The bug in `bonus-binary-issue` is the same mismatch, one level down: a buffer of 64 bytes and a read of up to 128.

## Questions to answer

* **Why did the program produce perfect output while corrupting the heap?**
  Allocators round requests up to an alignment boundary and keep bookkeeping between blocks.
  A 4-byte request occupies a much larger slot, so the byte just past the end usually lands in padding nothing else is using — and the byte written is a zero, which is the least destructive value there is.
  None of that makes the write defined; it makes it lucky.
* **How many bytes should `strbuf_finish()` allocate, and why is `sb->len` not it?**
  `sb->len + 1`.
  `len` counts characters; a C string is its characters *plus* a terminator.
  The return type `char *` is a promise that the terminator is there, and every caller — `strcmp()`, `strdup()`, `printf("%s")` — depends on it.
* **Valgrind reported 49 errors from 12 contexts. Why so many, for one bug?**
  Two reasons, and it is worth separating them.
  First, the bug fires on **every** string the parser decodes, not once.
  Second, an out-of-bounds byte gets read as well as written: the terminator sits past the end of the block, so later `strlen()` and `printf("%s")` calls walk into it and Memcheck reports those too — five invalid-write contexts and seven invalid-read contexts here.
  A *context* is a distinct stack trace, and Memcheck prints each one once no matter how often it recurs; the 49 is the raw occurrence count.
* **The two stack traces in the report name the same function three lines apart. Why does that make the bug easy?**
  Because the allocation and the overflowing write are in the same piece of code, so the arithmetic relating them is right there.
  Most real overflows put the `malloc` and the write in different files and different weeks.
* **Why can `gdb` not find this one?**
  There is no crash to break on, no wrong value to print, and no variable to watch — the write goes to memory that belongs to no variable at all.
  `gdb` can confirm the bug once you know where it is; it cannot lead you to it.

## Discussion points

* **A C string is its characters plus a terminator.**
  Every `malloc` for a string needs the `+ 1`, and forgetting it is one of the most common bugs in C.
  It is worth writing `malloc(len + 1)` reflexively, before thinking about it.
* **Correct-looking output is not evidence of anything.**
  This program is not nearly correct; it has undefined behaviour on every string it parses.
  It simply has not been unlucky yet.
  "Unlucky" here means a different allocator, a different string length, or a slightly different document.
* **The comment on the buggy line was true.**
  *"Trim the buffer down to exactly the bytes that were written"* is precisely what the code did.
  The mistake was in the specification, not the implementation — the caller needs one more byte than were written.
  Comments describe intent, and intent can be wrong.
* **This is the mirror image of `01-grade-histogram`.**
  There, the write stayed inside an allocation and Valgrind was structurally blind, so only `gdb` worked.
  Here there is nothing for `gdb` to catch, and Valgrind names the line.
  Neither tool is the debugger; the pair is.
* **Tools that instrument boundaries only see the boundaries they instrument.**
  ASan puts redzones between blocks and catches this instantly; it puts nothing between fields and missed the histogram.
  Knowing what a tool models is the difference between trusting it and being misled by it.

## References

* `man 3 malloc`, `man 3 memcpy`, `man 3 strlen`
* `man 1 valgrind`, and the [Memcheck manual](https://valgrind.org/docs/manual/mc-manual.html)
* [AddressSanitizer](https://github.com/google/sanitizers/wiki/AddressSanitizer)
* `man 3 mallopt` — on `MALLOC_PERTURB_` and other glibc heap-debugging knobs
* [RFC 8259](https://www.rfc-editor.org/rfc/rfc8259) — the JSON specification
