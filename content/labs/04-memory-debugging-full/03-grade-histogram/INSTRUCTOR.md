# Instructor Notes: The Histogram That Counts Too Much

## Purpose

The exercise that makes the session's central point: **Valgrind has a blind spot, and this is what it looks like.**

Everything before this has been "run Valgrind, read the report".
Here Valgrind says `0 errors from 0 contexts` and the program is still wrong, and there is no crash for GDB either.
If a student leaves with only one thing from this exercise, it should be that a clean Memcheck run is necessary and not sufficient; the second thing is that a print next to the suspicious line finds in a minute what neither tool reports.

## Expected answer

```C
if (bucket >= NBUCKETS)
	bucket = NBUCKETS - 1;
```

Any equivalent is fine: `grade == 100 ? NBUCKETS - 1 : grade / 10`, or declaring eleven buckets and adjusting the printing.
What is *not* fine is tightening the input validation to reject 100; that changes the specification to avoid the bug.
If someone does that, ask what the program is supposed to do with a perfect score.

## The shape of the bug

`counts[10]` is the memory immediately after the array inside `struct stats`, which is `total`.
So a grade of 100 is counted in no bucket **and** increments `total` a second time.
Hence twelve grades in, "processed 13 grades", and bars summing to 11.

Three numbers that should agree and do not is the whole diagnostic surface.
Students who never notice the discrepancy will not find the bug; getting them to *count the bars* is the first intervention.

## Why the tools behave the way they do

Worth having straight before the session, because students will ask:

| Tool | Result | Why |
| --- | --- | --- |
| `-Wall -Wextra` | silent | the index is a runtime value |
| Valgrind Memcheck | silent | the write is inside a block the allocator really handed out |
| AddressSanitizer | silent | redzones go *between* objects; this stays inside one |
| `-fsanitize=undefined` | **catches it** | it checks the index against the declared type `int [10]` |
| a print of `grade` and `bucket` | **shows it** | `grade=100 bucket=10`, against an array of ten |

The name for this class of bug is an **intra-object overflow**, and the reason two of the three memory tools miss it is that they both model memory as a set of allocations.

The demonstration worth doing, if there is time, is in `FURTHER.md`: move `total` *before* the array, and the identical bug becomes an `Invalid write of size 4` in Valgrind, because it now falls off the end of the block instead of onto a neighbouring field.
Same bug, same source line, different verdict, purely because of field order.

## Steering the debugging

Students reach for Valgrind first, get a clean report, and conclude the program is fine.
Do not pre-empt that; it is the experience the exercise is for.
When it happens, ask: *the bars add up to 11 and it says 13; is Valgrind wrong, or is it answering a different question?*

Then push them towards the print:

* *Which function decides where a grade goes?*
  `record_grade()`.
* *What does it compute?*
  `bucket`.
  Print `grade` and `bucket` together, run, read twelve lines.
* *How many indices does an array of ten have?*

The whole thing takes two minutes once they stop reading and start printing.
If someone has twelve thousand grades instead of twelve, that is the moment to show a print with a condition, `if (bucket >= NBUCKETS)` in front of it, and to say that this is what a conditional breakpoint is for, with less to learn.

## Other things students get wrong

* **Clamping the grade instead of the bucket** (`if (grade > 99) grade = 99;`).
  Works, and quietly renames the bug: now the histogram is right but any future use of `grade` is wrong.
* **Changing `NBUCKETS` to 11 and stopping there**, without touching `print_stats()`, which then prints a `100 - 109` row.
* **Concluding the bug is in `main()`'s validation**, because that is the only place a range appears.
* **Printing `total` instead of `bucket`.**
  It shows the symptom again, not the cause; the print has to be of the value that is about to be used as an index.
* **Leaving the print in.**
  Ask for a clean `./histogram < input.txt` with nothing on `stderr` before calling it done.
* **Not rebuilding** before rerunning.

## Verified reference values

| Version | Output |
| --- | --- |
| Buggy | bars sum to 11, "processed 13 grades", Valgrind clean; the print shows `grade=100 bucket=10` |
| Fixed | bars sum to 12, "processed 12 grades", top bucket 3 |

Edge cases on the fixed version: `printf '0\n100\n100\n'` gives 3 processed with 2 in the top bucket and 1 in the first; `printf '101\n-5\n'` rejects both and processes 0; empty input prints an all-zero histogram and does not crash.

## Practical notes

* `input.txt` is `45 78 92 100 67 83 55 71 88 39 95 62`: twelve grades, exactly one of them a 100.
  If a student edits the input and the symptom disappears, that is the bug telling them what triggers it.
* Nothing here needs Valgrind to *work*, so this exercise survives a lab image where Valgrind is broken.
  It is a reasonable one to move earlier if that happens.
