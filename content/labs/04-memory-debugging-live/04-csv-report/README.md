# Exercise: The Report That Crashes in the C Library

**Tools:** GCC, Make, GDB, Valgrind

## Goal

Find the cause of a crash that happens inside the C library, by reading a backtrace up to your own code and then printing what that code was given.

## Background

`main.c` reads a CSV file of employees, one `name,department,salary` per line, and prints the payroll of every department and the highest-paid employee.
On `employees.csv` it crashes with a segmentation fault before printing anything.

A crash is the easy case: the program stops where something went wrong, and GDB can show you that place.
The catch is that the place is often not in your code.
Here the top of the backtrace is inside the C library, in a function you never called by name.
The library did nothing wrong; it was handed something it cannot work with.
Your job is to find out what, and by whom.

## Your Task

1. Run the program under GDB and read the backtrace.
   Walk down from the top frame until you reach the first function from `main.c`, and move to it with `frame N`.
   Print the local variables of that frame: one of them has a value that no string should have.
1. Find out which input line produces that value.
   GDB shows the line as it looks after parsing has started, which is not very telling.
   Add a print before the line is parsed, showing the line number and its text, and run again.
1. Fix `parse_employee()` so that a line with a missing field is reported on `stderr` and skipped, and the rest of the file is still processed.
   The report must then come out complete, without the skipped line.

## Build & Run

```console
make
./report employees.csv
gdb ./report
(gdb) run employees.csv
```

## Check Your Work

The program must run to the end on `employees.csv`, print one warning for the bad line, and print the totals of the three departments and the highest-paid employee.
Add up the salaries of one department by hand and compare.

Then feed it worse input:

```console
printf 'x\n,,\nalice,engineering,10\n' > odd.csv && ./report odd.csv
printf '' > empty.csv && ./report empty.csv
```

Neither may crash.

Run the buggy version under Valgrind as well, before you fix it.
Bring to the teaching assistant: what Valgrind said about the crash, and how its report compares with the backtrace from GDB.
