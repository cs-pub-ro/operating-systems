# Instructor Notes: The Report That Crashes in the C Library

## Purpose

The crash exercise, and the one place students practise the GDB routine on their own: `run`, `backtrace`, walk down past the library frames, `frame N`, `info locals`.
The second half is the print that recovers the input line GDB cannot show.

The bug is a `NULL` from `strtok()`, chosen because it is the most common crash in C and because it lands three frames deep in libc, which is what students find frightening about backtraces.

## Expected answer

```C
	if (name == NULL || department == NULL || salary == NULL)
		return -1;
```

with `parse_employee()` returning `int`, and the loop in `main()` reporting and skipping a line on `-1`.
The output must then be the three-department table with `carol` on top, and one warning for line 7 on `stderr`.

Any variant that rejects the line is fine.
What is *not* fine is removing line 7 from `employees.csv`, or making `parse_employee()` substitute a salary of 0 silently; ask what the payroll of `support` would then be and whether anyone would notice.

## Steering the debugging

1. **Make them run it under GDB before reading anything.**
   The backtrace has five frames and the top three are `strtol` internals.
   The question to ask is: *which is the first frame in a file you wrote?*
   Frame 3, `parse_employee()` at line 50.
1. **`frame 3`, then `info locals`.**
   `salary = 0x0`.
   Ask what `atoi()` does with that.
1. **Now the input.**
   `line` shows as `"grace"`, which puzzles people; `strtok()` has written over the first comma.
   This is the moment for the print: one `fprintf(stderr, ...)` before the parse, showing the line number and text, and the last message before the crash is the answer.
1. **Then the fix**, and `./report employees.csv` plus one of the worse inputs from the README.

If someone goes to `employees.csv` and spots the short line by eye in ten seconds, fine; have them do the GDB steps anyway, on the grounds that the next file will have ten thousand lines.

## Points to hammer

* **The library is the victim.**
  `strtol()` did exactly what it was asked with the pointer it was given.
  Students' instinct is that a crash inside libc means libc is broken or the machine is; it means the arguments were.
* **Walk down to your own file, and only then look.**
  `frame N` or `up` repeatedly; `info locals` and `info args` once there.
  That is the whole GDB lesson of the session.
* **GDB shows the state at the crash, not the history.**
  The line is already cut by `strtok()`, so the question "which input line?" needs a print placed *before* the damage.
  The last print before a crash is the culprit: say this as a general rule.
* **`file:line:` in the error message.**
  Cheap, and every tool understands it.

## Other things students get wrong

* **Checking only `salary` for `NULL`.**
  `grace,` or a bare `x` then crashes in `copy_field()` instead; the README's `odd.csv` catches it.
* **Counting the slot before the check**, so a skipped line leaves an uninitialised employee in the array that is then summed.
  Valgrind flags the uninitialised reads; a print of `nemployees` shows the count is one too high.
* **Returning a `struct employee` with salary 0** instead of rejecting the line.
  Works, and silently corrupts the `support` payroll and headcount.
* **Enabling debuginfod** when GDB asks, then waiting for a download.
  Tell them `n`.
* **Reading `strtol_l.c:304: No such file or directory` as an error.**
  GDB has debug information for libc but not its source; it is harmless.

## Verified reference values

| Version | Result |
| --- | --- |
| Buggy | segfault, exit 139; backtrace `strtol_l_internal` → `strtol` → `atoi` → `parse_employee` (`main.c:50`) → `main` (`main.c:96`); `salary = 0x0` |
| Fixed | `employees.csv:7: malformed line, skipped`; engineering 4 / 21,600; marketing 3 / 11,700; support 2 / 5,900; highest paid carol, 6,100; exit 0 |

Valgrind on the buggy version: `Invalid read of size 1` at the same stack, `Address 0x0 is not stack'd, malloc'd or (recently) free'd`.
On the fixed version: 3 allocs, 3 frees, 0 errors; the allocations are stdio's.

## Practical notes

* Nothing here needs Valgrind to *work*, so the exercise survives a lab image where Valgrind is broken.
* Line numbers inside libc (`strtol_l.c:304`, `atoi.c:27`) depend on the glibc version; the function names do not.
* The program is on the stack entirely, by design: there is nothing to free, so the whole attention goes to the crash.
