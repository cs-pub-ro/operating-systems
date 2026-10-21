# Exercise: The Histogram That Counts Too Much

**Tools:** GCC, Make, Valgrind

## Goal

Find an out-of-bounds write that neither the compiler nor Valgrind reports, with one well-placed print.

## Background

`main.c` reads grades from standard input, rejects anything outside `0..100`, and counts each one into a ten-point bucket.
It compiles without a warning and never crashes, and the histogram it prints looks plausible.
It is still wrong.

`input.txt` holds 12 grades.
The program says it processed 13, and the bars add up to 11.

Valgrind reports nothing, and that is expected: the bad write lands inside a block the allocator really did hand out, on the wrong *field* rather than outside the block, and Valgrind only checks blocks.
There is no crash for GDB to stop at either.
What is left is the oldest tool there is: print what the program computes, and compare it with what you expect.

## Your Task

1. Run the program and find the three numbers that should agree and do not: the number of grades in `input.txt`, the `processed N grades` line, and the sum of the bars.
1. Add a print to `record_grade()` that shows, for every grade, the grade and the bucket it goes into.
   Compare each bucket index with the size of the array.
1. Fix the program so that every valid grade, a perfect 100 included, is counted in the right bucket.
   Remove the print afterwards.

## Build & Run

```console
make
./histogram < input.txt
```

## Check Your Work

The three numbers must agree, on `input.txt` and on these inputs:

```console
printf '0\n100\n100\n' | ./histogram
printf '101\n-5\n' | ./histogram
printf '' | ./histogram
```

The first must count three grades, two of them in the top bucket; the second must reject both values and count nothing; the third must not crash.

`main()` checks that every grade is between 0 and 100, which is what makes the code look safe.
That check is correct.
Bring to the teaching assistant: why the check was not enough, and why Valgrind had nothing to say.
