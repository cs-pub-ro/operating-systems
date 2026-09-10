# Instructor Notes: The JSON Parser With a Heap Buffer Overflow

## Purpose

A bonus, and the cleanest single illustration of the session's second theme: **a program can produce perfect output on every run you try and still be undefined behaviour from end to end.**

Its value is as the counterpart to `01-grade-histogram`.
There, the write stayed inside an allocation, Valgrind was structurally blind, and only `gdb` could help.
Here there is nothing for `gdb` to catch and Memcheck names the line.
If you get to do a debrief, put the two side by side — that pairing is the point, and neither exercise makes it alone.

## Expected answer

```C
result = malloc(sb->len + 1);
```

One character.
The bug is `malloc(sb->len)` followed by `result[sb->len] = '\0'`.

Anything equivalent is fine — `calloc(sb->len + 1, 1)` and dropping the explicit terminator, for instance.
What is *not* fine is removing the terminator assignment to make the report go away; see "other things students get wrong" below.

## Why the output is perfect anyway

Worth being able to explain properly, because it is the first thing students ask.

The overflow is one byte, and the byte is `'\0'`.
Allocators round requests up to an alignment boundary and keep bookkeeping between blocks, so a 4-byte request occupies a much larger slot and byte 4 lands in padding nothing is using.
Writing a zero there corrupts nothing observable — on this input, on this allocator, today.

The framing that lands: the program is not *nearly* correct.
It has undefined behaviour on every string it parses.
It has merely not been unlucky yet, and "unlucky" means a different allocator, a different string length, or one more field in the document.

## What the tools say

| Tool | Result |
| --- | --- |
| `-Wall -Wextra` | silent |
| Valgrind Memcheck | 49 errors from 12 contexts; first one names `json_value.c:65` |
| AddressSanitizer | `heap-buffer-overflow in strbuf_finish`, aborts on the first occurrence |
| `gdb` | nothing to break on |

The Memcheck report is unusually generous: the invalid write and the `malloc` that created the block are three lines apart in the same function, so the arithmetic relating them is right there on screen.
Point that out — most real overflows put the allocation and the write in different files and different months.

The 49-versus-12 distinction confuses people.
A *context* is a distinct stack trace, printed once however often it recurs; 49 is the raw occurrence count.
Five contexts are the write itself, seven are later out-of-bounds *reads* of the misplaced terminator by `strlen()` and `printf("%s")`.

## Steering the debugging

Students who have done `02-longest-word` will reach for `--leak-check=full` and find nothing, because there is no leak.
Plain `valgrind ./jsontool` is enough here, and the first error block is the whole answer.

The useful questions, in order:

1. How many bytes does `strbuf_finish()` ask for?
1. How many *characters* does the string contain at that point — is there a field that already tracks it?
1. Besides those characters, what else does the function write into the block before handing it over?

Most students get there from question 3 alone.

## Other things students get wrong

* **Dropping the terminator instead of enlarging the block.**
  `malloc(sb->len)` with no `result[sb->len] = '\0'` makes the Valgrind write-error disappear and leaves a far worse program: every `strcmp()`, `strdup()` and `printf("%s")` on that string now runs off the end.
  If someone does this, rerun Valgrind — the invalid *reads* multiply, which is the lesson.
* **Adding `+ 1` to `sb->cap` in `strbuf_reserve()`** instead of to the `malloc` in `strbuf_finish()`.
  It happens to work, because the reserve buffer is then always at least one byte larger than `len`, but it fixes the symptom in the wrong function: `strbuf_finish()` is still allocating the wrong size for what it writes.
* **Also lengthening the `memcpy` to `sb->len + 1`**, which reads one byte past the end of `sb->data`.
  Memcheck reports it as an invalid read inside `memcpy`; a good demonstration that the fix has two independent halves.
* **Concluding the bug is in the parser** because that is where the interesting code is.
  It is in a nine-line helper nobody reads.

## Verified reference values

| Version | Result |
| --- | --- |
| Buggy | exit 0, output correct; 98 allocs, 98 frees, 7,735 bytes; 49 errors from 12 contexts |
| Fixed | identical output; 98 allocs, 98 frees, 7,753 bytes; 0 errors from 0 contexts |

The 18-byte difference is one byte per string that goes through `strbuf_finish()`.
Asking a strong student to predict that number from the document before running anything is a good use of two minutes.

## Practical notes

* This is a bonus and most groups will not reach it in the room; it works well as take-home work, and its README is written to be followed unaided.
* Needs Valgrind. There is no `gdb`-only route to the answer, which is deliberate.
* Two translation units, built with `-g -O0`.
