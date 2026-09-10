# Exercise: The Histogram That Counts Too Much

**Tools:** GCC, Make, GDB

## Goal

Find an out-of-bounds write that neither the compiler nor Valgrind will tell you about, using a conditional breakpoint and a watchpoint in GDB.

## Background

`main.c` reads grades from standard input, rejects anything outside `0..100`, and counts each one into a ten-point bucket.
It compiles without a warning and never crashes, and the histogram it prints looks plausible.
It is still wrong.

## Build & Run

```console
make
./histogram < input.txt
```

`input.txt` holds 12 grades.
The program says it processed 13, and the bucket counts add up to 11.

Valgrind reports nothing, and that is expected: the bad write lands inside a block the allocator really did hand out, so it hits the wrong *field* rather than the wrong *block*.
For this one you need gdb.

## Your Task

1. Find the out-of-bounds access with gdb.
   A conditional breakpoint and a watchpoint are the quickest way in:

    ```console
    gdb ./histogram
    (gdb) break record_grade if grade > 90
    (gdb) watch st->total
    ```

1. Fix it so that every valid grade, a perfect score of 100 included, is counted in the right bucket.

## Check Your Work

Three numbers have to agree, and at the moment none of them does:

* the count of grades in `input.txt`,
* the "processed N grades" line,
* the sum of the bar lengths.

Work out the first from the file, then check the program reports the same for the other two.

Run these as well:

```console
printf '0\n100\n100\n' | ./histogram
printf '101\n-5\n' | ./histogram
printf '' | ./histogram
```

The boundary values `0` and `100` are the interesting ones — one of them is the whole bug.
The second command must reject both values and count nothing at all; the third must not crash.

`main()` validates the input, which is what makes the code look airtight.
The validation is not the problem.
Validating the input is not the same as validating the index you compute from it.
