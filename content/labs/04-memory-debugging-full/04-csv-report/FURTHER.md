# Going Further: The Report That Crashes in the C Library

## Things to try

1. **Break it differently.**
   Give the fixed program `grace,support,` and `grace,,2800`.
   Both are rejected as malformed, but print the three fields and look at the second one: `strtok()` treats consecutive separators as one, so `name` is `grace`, `department` is `2800`, and `salary` is `NULL`.
   The verdict is right by accident.
   A CSV reader that has to tell an empty field from a missing one cannot use `strtok()`; `strsep()` keeps empty fields, and is the function to reach for.
1. **Feed it a header line.**
   With `name,department,salary` as the first line, the program stores an employee called `name` in a department called `department` with the salary `atoi("salary")`, which is 0.
   The table grows a row.
   The fix is either to skip the first line, or to check that the salary field is a number, which `strtol()` with its `endptr` argument can do and `atoi()` cannot.
1. **Overflow a field.**
   A forty-character name is truncated by `copy_field()` and nothing else happens.
   Replace the `strncpy()` with `strcpy()` and the name runs into `department` inside the same struct.
   `department` is copied right after and overwrites the spill, so the name no longer has a terminator of its own and prints with the department glued to it: `aaaa...aengineering`.
   Valgrind sees nothing, and neither does `-fsanitize=address`: the write stayed inside `struct employee`, which is the same intra-object blind spot as `03-grade-histogram`, on the stack this time.
   Only the output gives it away, and only to someone who reads it.
1. **Count the lines a second way.**
   Print only the line number, and only when parsing fails.
   That is what the fixed program's message does, and the `file:line:` format is what every editor can jump to.

## Questions to answer

* **The crash was inside `strtol()`, which the program never calls. Who called it, and how did you find out?**
  `atoi()` is implemented as `strtol(nptr, NULL, 10)`; the backtrace shows `atoi` in frame 2 and `parse_employee` in frame 3.
  The backtrace is the only way to know; the crash address alone says nothing about the caller.
* **What value did `salary` have, and where did it come from?**
  `NULL`, from the third `strtok()` call, which found no field after `support`.
* **GDB showed `line` as just `"grace"`. What had happened to the rest of it?**
  `strtok()` modifies the string it splits: it writes a `'\0'` over each separator it finds, so by the time of the crash the buffer reads `grace\0support\0`.
  The data is still there, and `print line + 6` shows it, but a print placed before the parse is the simpler way to see the whole line.
* **What does `Address 0x0 is not stack'd, malloc'd or (recently) free'd` tell you that the backtrace did not?**
  What kind of bad address it was.
  GDB knows the program crashed reading memory; Valgrind classifies the address, and `0x0` belonging to nothing is the signature of a `NULL` dereference, as opposed to an overflow or a use after free.

## Discussion points

* **The crash site is where the effect surfaced, not where the mistake is.**
  The C library crashed because it was handed `NULL`; the mistake was two frames up.
  Walking the backtrace to your own code is the first step of every crash, and it is the same walk whether the library is libc, a graphics toolkit or a database driver.
* **Every function that can return `NULL` eventually does.**
  `strtok()`, `malloc()`, `fopen()`, `strchr()`, `getenv()`: the input that triggers it is a matter of time, and it tends to arrive in production.
* **A print before the suspicious line beats a guess.**
  The backtrace told you which function; the print told you which line of input.
  Together they take a minute, and neither needed a breakpoint.
* **Bad input is not an error in your program; crashing on it is.**
  A parser's job includes saying no, and saying where.

## References

* `man 3 strtok`, `man 3 strsep`
* `man 3 atoi`, `man 3 strtol`
* `man 1 gdb`, and the [GDB documentation on frames](https://sourceware.org/gdb/current/onlinedocs/gdb.html/Frames.html)
