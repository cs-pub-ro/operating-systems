# Exercise: The Report That Crashes in the C Library

**Tools:** GCC, Make, GDB, Valgrind

## Goal

Reference (crash-free) implementation of the salary report.
The exercise is the session's crash: a segmentation fault whose backtrace starts three frames deep inside the C library, and the routine for getting from there to the one input line that caused it.

## Background

The program reads a CSV file, one `name,department,salary` per line, into an array of fixed-size records, then prints the payroll of every department and the highest-paid employee.

```C
static int parse_employee(char *line, struct employee *e)
{
	char *name = strtok(line, ",");
	char *department = strtok(NULL, ",");
	char *salary = strtok(NULL, ",");
```

`strtok()` returns `NULL` when there is no field left, and the buggy version never looked.
Line 7 of `employees.csv` is `grace,support`, with no salary, so `salary` was `NULL` and went straight into `atoi()`.

Files:

* `main.c` — the fixed implementation.
* `employees.csv` — ten lines, one of them short a field.

## Build & Run

```console
make
./report employees.csv
```

```text
employees.csv:7: malformed line, skipped
department      headcount    payroll
engineering             4      21600
marketing               3      11700
support                 2       5900

highest paid: carol (engineering), 6100
```

The warning goes to `stderr`, so `./report employees.csv > report.txt` still produces a clean table.

## Results and Explanations

### The crash

```console
./report employees.csv
```

```text
Segmentation fault (core dumped)
```

Nothing is printed first, because the whole file is read before any output; the crash could be anywhere.

### Where: GDB

```console
gdb ./report
(gdb) run employees.csv
```

```text
Program received signal SIGSEGV, Segmentation fault.
0x00007ffff7c57a0b in __GI_____strtol_l_internal (nptr=0x0, endptr=endptr@entry=0x0, base=base@entry=10, ...) at ../stdlib/strtol_l.c:304
(gdb) backtrace
#0  0x00007ffff7c57a0b in __GI_____strtol_l_internal (nptr=0x0, ...) at ../stdlib/strtol_l.c:304
#1  0x00007ffff7c579bc in __GI___isoc23_strtol (nptr=<optimized out>, endptr=endptr@entry=0x0, base=base@entry=10) at ../stdlib/strtol.c:126
#2  0x00007ffff7c46d64 in __GI_atoi (nptr=<optimized out>) at ./stdlib/atoi.c:27
#3  0x00005555555553b7 in parse_employee (line=0x7fffffffd640 "grace", e=0x7fffffffbd48) at main.c:50
#4  0x000055555555563f in main (argc=2, argv=0x7fffffffd7f8) at main.c:96
```

The top three frames are the C library: `atoi()` calls `strtol()`, which calls an internal helper, which reads the first character of a string at address `0x0`.
None of them is the problem.
The first frame in `main.c` is number 3, and that is where to go:

```text
(gdb) frame 3
#3  0x00005555555553b7 in parse_employee (line=0x7fffffffd640 "grace", e=0x7fffffffbd48) at main.c:50
50		e->salary = atoi(salary);
(gdb) info locals
name = 0x7fffffffd640 "grace"
department = 0x7fffffffd646 "support"
salary = 0x0
```

`salary` is `NULL`: `strtok()` found no third field.
Note that `line` shows as just `"grace"`.
`strtok()` has already written a `'\0'` over the first comma, so the backtrace cannot show what the whole line looked like.

### Which line: a print

The cause is a line of input, and GDB has lost it.
A print before the parse recovers it:

```C
		line[strcspn(line, "\n")] = '\0';
		fprintf(stderr, "line %zu: '%s'\n", nemployees + 1, line);
		parse_employee(line, &employees[nemployees]);
```

```text
line 5: 'erin,marketing,4100'
line 6: 'frank,engineering,4800'
line 7: 'grace,support'
Segmentation fault (core dumped)
```

The last line printed is the one that killed the program.
This is the general technique for a crash somewhere in a long input: print what is about to be processed, and the last message is the culprit.

### What Valgrind says

```console
valgrind ./report employees.csv
```

```text
==1476980== Invalid read of size 1
==1476980==    at 0x48D6A0B: ____strtol_l_internal (strtol_l.c:304)
==1476980==    by 0x48C5D63: atoi (atoi.c:27)
==1476980==    by 0x1093B6: parse_employee (main.c:50)
==1476980==    by 0x10963E: main (main.c:96)
==1476980==  Address 0x0 is not stack'd, malloc'd or (recently) free'd
==1476980== Process terminating with default action of signal 11 (SIGSEGV)
```

The same stack as GDB's, plus one sentence the backtrace does not have: the address is `0x0`, and it belongs to nothing.
That is Valgrind's way of saying "`NULL` dereference".
On a crash the two tools agree; GDB lets you look at the variables, Valgrind tells you what kind of bad address it was.

### The fix

```C
	if (name == NULL || department == NULL || salary == NULL)
		return -1;
```

```C
		if (parse_employee(line, &employees[nemployees]) != 0) {
			fprintf(stderr, "%s:%u: malformed line, skipped\n",
				argv[1], lineno);
			continue;
		}
		nemployees++;
```

Two halves.
`parse_employee()` now says no instead of crashing, and `main()` decides what "no" means: report the line, in the `file:line:` format every compiler and editor understands, and go on with the next one.
The record slot is only counted when a line was parsed, so a skipped line leaves no half-filled employee behind.

### The lesson

**The crash site is where the effect surfaced, not where the mistake is.**
The C library crashed because it was handed `NULL`; the mistake was two frames up, in code that did not check what `strtok()` returned.
Walking the backtrace down to your own file is the first step of every crash, and the library frames above it are the victim, not the culprit.

**Every function that can return `NULL` eventually does.**
`strtok()`, `malloc()`, `fopen()`, `strchr()`, `getenv()`: the input that triggers it is a matter of time, and a parser's job includes saying no to bad input rather than dying on it.

## References

* `man 3 strtok` — the return value, and the fact that it modifies the string
* `man 3 atoi`, `man 3 strtol` — and why `strtol()` is the better choice when the input may be wrong
* `man 1 gdb`, and the [GDB documentation on frames](https://sourceware.org/gdb/current/onlinedocs/gdb.html/Frames.html)
