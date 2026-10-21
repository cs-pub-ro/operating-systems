# Going Further: The Report That Crashes in the C Library

Optional.

## Things to try

1. **Break it differently.**
   Give the fixed program a line with an empty salary, `grace,support,`, and one with an empty department, `grace,,2800`.
   Both are rejected, but add a print of the three fields and look at the second one.
   What does `strtok()` do with two separators in a row, and is "malformed" the right verdict for that line?
1. **Feed it a header line.**
   Put `name,department,salary` as the first line of the file.
   The program accepts it; find out what it does with it, and decide what it should do.
1. **Overflow a field.**
   Give an employee a name of forty characters.
   Nothing crashes, because `copy_field()` truncates.
   Replace `strncpy()` with `strcpy()` and try again: look closely at the name in the output, then run it under Valgrind and with `-fsanitize=address`.
   Which of the two notices, and why?
1. **Count the lines a second way.**
   Instead of printing every line, print only the line number, and only when parsing fails.
   Then make the failure message of the fixed program say exactly that.

## Questions to answer

* The crash was inside `strtol()`, which the program never calls.
  Who called it, and how did you find out?
* What value did `salary` have in `parse_employee()` when the program crashed, and where did that value come from?
* GDB showed `line` as just `"grace"` in the crashing frame, although the input line was `grace,support`.
  What had happened to the rest of it?
* Valgrind reported `Address 0x0 is not stack'd, malloc'd or (recently) free'd`.
  What does that sentence tell you that the backtrace did not?

## Discussion points

* **The crash site is where the effect surfaced, not where the mistake is.**
  The C library crashed because it was handed `NULL`; the mistake was two frames up, in the code that did not check what `strtok()` returned.
  Walking the backtrace to your own code is the first step of every crash.
* **Every function that can return `NULL` eventually does.**
  `strtok()`, `malloc()`, `fopen()`, `strchr()`: the input that triggers it is a matter of time.
* **A print before the suspicious line beats a guess.**
  The backtrace told you which function; the print told you which line of input.
  Together they take a minute.
* **Bad input is not an error in your program; crashing on it is.**
  A parser's job includes saying no.

## References

* `man 3 strtok`, in particular the return value and what happens to the string
* `man 3 atoi`, and why `strtol()` is the better choice
* `man 1 gdb`, and the [GDB documentation on frames](https://sourceware.org/gdb/current/onlinedocs/gdb.html/Frames.html)
